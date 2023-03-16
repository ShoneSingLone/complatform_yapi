const fs = require('fs');
const path = require('path');
/* require 如果没有用相对路径，就优先从node_modules里面找，找不到就从NODE_PATH 开始找 */
process.env.NODE_PATH = path.resolve(__dirname);
require('module').Module._initPaths();

async function main(params) {
  /* preset */
  const { initDbAndCommon } = require('./utils/initConfig');
  const yapi = await initDbAndCommon();
  const { useGzipWhenPrd } = require('./middleware/prdGzip.js');
  const { useMockServer } = require('./middleware/mockServer.js');
  const { useCORS } = require('./middleware/cors');
  const { useHistoryMode } = require('./middleware/historyMode');
  const { useYapiDevHeaderInfo } = require('./middleware/yapiDevHeaderInfo');

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

  function appListen(PORT, tips = '服务已启动，请打开下面链接访问:') {
    app.listen(PORT);
    if (process.send) {
      process.send(JSON.stringify({ type: 'CHANGE_PORT', PORT }));
    }

    yapi.commons.log(`${tips} http://127.0.0.1${PORT == '80' ? '' : ':' + PORT}/ `);

    function getIPAdress() {
      var interfaces = require('os').networkInterfaces();
      const content = JSON.stringify(interfaces);
      const contentArray = content.split(`",`).filter(s => s.match(/"address":"(.*)/));
      contentArray.forEach(s => {
        const res = s.match(/address":"192.(.*)/);
        if (res) {
          console.log(`    http://192.${res[1]}:${PORT}/`);
        }
      });
    }
    getIPAdress();
  }

  appListen(currentPort);
  app.server.on('error', function handleAppError(e) {
    if (e.code === 'EADDRINUSE') {
      setTimeout(() => {
        appListen(++currentPort, 'Address in use, retrying...');
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
