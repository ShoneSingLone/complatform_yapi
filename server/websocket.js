const koaRouter = require('koa-router');
const interfaceController = require('./controllers/interface.js');
const BaseController = require('server/controllers/base.js');

const { yapi } = global;

const wsRouter = koaRouter();
const { createAction } = require('./utils/commons.js');

let pluginsRouterPath = [];

function addPluginRouter(config) {
  if (!config.path || !config.controller || !config.action) {
    throw new Error('Plugin Route config Error');
  }
  let method = config.method || 'GET';
  let routerPath = '/ws_plugin/' + config.path;
  if (pluginsRouterPath.indexOf(routerPath) > -1) {
    throw new Error('Plugin Route path conflict, please try rename the path');
  }
  pluginsRouterPath.push(routerPath);
  createAction(wsRouter, '/api', config.controller, config.action, routerPath, method, true);
}



exports.DecoratorWebsocket = function DecoratorWebsocket(app) {
  createAction(wsRouter, '/api', interfaceController, 'solveConflict', '/interface/solve_conflict', 'get');

  yapi.emitHookSync('add_ws_router', addPluginRouter);

  app.ws.use(async (ctx, next) => {
    try {

      /* complatform项目使用 /ws/api前缀 */
      if (ctx.path === `/ws/api/interface/solve_conflict`) {
        const vm = new interfaceController(ctx);
        await vm.checkLogin(ctx);
        return await vm.solveConflict(ctx);
      }
      const vm = new BaseController(ctx);
      await vm.checkLogin(ctx);
      console.log("ws", ctx.path, vm.$user);
      if (vm.$user) {
        ctx.websocket.send(JSON.stringify({ msg: `Hello ${vm.$user.username}`, id: vm.$uid }));
        ctx.websocket.on('message', (message) => {
          ctx.websocket.send(JSON.stringify({ id: vm.$uid, msg: message.toString() }));
        });
        ctx.websocket.on('close', async () => {
          debugger;
        });
      }
      return next();
    } catch (error) {
      yapi.commons.log(error, 'error');
    }
  });

  app.ws.use(wsRouter.routes());
  app.ws.use(wsRouter.allowedMethods());
  app.ws.use(function (ctx, next) {
    return ctx.websocket.send(
      JSON.stringify({
        errcode: 404,
        errmsg: 'No Fount.'
      })
    );
  });
};