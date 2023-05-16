const koaRouter = require('koa-router');
const interfaceController = require('./controllers/interface.js');

const { yapi } = global;

const wsRouter = koaRouter();
const { createAction } = require('./utils/commons.js');
const { useWS } = require('./websocket.controller.js');

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
  app.ws.use(useWS());
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