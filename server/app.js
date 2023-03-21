const fs = require('fs');
const path = require('path');

/* require 如果没有用相对路径，就优先从node_modules里面找，找不到就从NODE_PATH 开始找 */
process.env.NODE_PATH = path.resolve(__dirname, "..");
require('module').Module._initPaths();

async function main() {
  /* preset */
  const { initDbAndCommon, appListen } = require('server/utils');

  const yapi = await initDbAndCommon();
  /* 最先调用initDbAndCommon，再使用中间件 */
  const { useGzipWhenPrd, useMockServer, useCORS, useHistoryMode, useYapiDevHeaderInfo } = require("server/middleware");

  require('./plugin.js');
  const websockify = require('koa-websocket');
  const { DecoratorWebsocket } = require('./websocket.js');

  require('./utils/notice');

  let currentPort = global.WEBCONFIG.port;

  const Koa = require('koa');
  const koaStatic = require('koa-static');
  const koaBody = require('koa-body');
  const router = require('./router.js');

  const INDEX_FILE = 'index.html';
  const app = websockify(new Koa());
  app.proxy = true;
  yapi.app = app;

  app.use(useCORS());
  app.use(koaBody({ strict: false, multipart: true, jsonLimit: '4mb', formLimit: '4mb', textLimit: '4mb' }));
  app.use(useYapiDevHeaderInfo());
  /* router */
  app.use(useMockServer());
  app.use(router.routes());
  app.use(router.allowedMethods());
  /* websocket */
  DecoratorWebsocket(app);

  app.use(useGzipWhenPrd(yapi));
  /* static */
  app.use(koaStatic(path.join(yapi.WEBROOT, 'static'), { index: INDEX_FILE, gzip: true }));
  /* index.html */
  app.use(useHistoryMode(yapi));


  appListen(app, currentPort).server.on('error', function handleAppError(e) {
    if (e.code === 'EADDRINUSE') {
      setTimeout(() => {
        appListen(app, ++currentPort, 'Address in use, retrying...');
      }, 100);
    }
  });
  app.server.setTimeout(global.WEBCONFIG.timeout);
}

try {
  main();
} catch (error) {
  console.log('🚀 ~ file: app.js:99 ~ error', error);
}
