const path = require('path');
/* require 如果没有用相对路径，就优先从node_modules里面找，找不到就从NODE_PATH 开始找 */
process.env.NODE_PATH = path.resolve(__dirname);
require('module').Module._initPaths();

async function main(params) {
  const { initDbAndCommon } = require('./utils/initConfig');
  const yapi = await initDbAndCommon();

  const useMockServer = require('./middleware/mockServer.js');
  require('./plugin.js');
  const websockify = require('koa-websocket');
  const websocket = require('./websocket.js');
  var cors = require('koa2-cors');

  require('./utils/notice');

  const Koa = require('koa');
  const koaStatic = require('koa-static');
  const koaBody = require('koa-body');
  const router = require('./router.js');

  let indexFile = 'index.html';

  const app = websockify(new Koa());
  app.proxy = true;
  yapi.app = app;

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('yapi-Response-Time', `${ms}ms`);
  });

  app.use(cors());

  app.use(
    koaBody({
      strict: false,
      multipart: true,
      jsonLimit: '4mb',
      formLimit: '4mb',
      textLimit: '4mb'
    })
  );
  app.use(useMockServer);
  app.use(async (ctx, next) => {
    console.clear();
    console.log('ctx.params', ctx.path, ctx.params, ctx.request.body);
    await next();
  });
  app.use(router.routes());
  app.use(router.allowedMethods());

  websocket(app);

  app.use(async (ctx, next) => {
    if (ctx.path.indexOf('/prd') === 0) {
      ctx.set('Cache-Control', 'max-age=8640000000');
      if (yapi.commons.fileExist(path.join(yapi.WEBROOT, 'static', ctx.path + '.gz'))) {
        ctx.set('Content-Encoding', 'gzip');
        ctx.path = ctx.path + '.gz';
      }
    }
    await next();
  });

  app.use(koaStatic(path.join(yapi.WEBROOT, 'static'), { index: indexFile, gzip: true }));

  const server = app.listen(global.WEBCONFIG.port);

  server.setTimeout(global.WEBCONFIG.timeout);

  yapi.commons.log(
    `服务已启动，请打开下面链接访问:
      http://127.0.0.1${global.WEBCONFIG.port == '80' ? '' : ':' + global.WEBCONFIG.port}/`
  );
}

main();
