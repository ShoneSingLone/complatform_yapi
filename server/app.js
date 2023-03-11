const fs = require('fs');
const _ = require('lodash');
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

  let currentPort = global.WEBCONFIG.port;

  const Koa = require('koa');
  const koaStatic = require('koa-static');
  const koaBody = require('koa-body');
  const router = require('./router.js');

  const INDEX_FILE = 'index.html';
  const app = websockify(new Koa());
  app.proxy = true;
  yapi.app = app;

  app.use(cors({
    credentials: true,
    origin: (ctx) => {
      ctx.set('Access-Control-Expose-Headers', "x-cookies");
      if (ctx.headers.origin === 'https://shonesinglone.github.io') {
        return ctx.headers.origin;
      } else {
        return false;
      }
    }
  }));
  app.use(
    koaBody({
      strict: false,
      multipart: true,
      jsonLimit: '4mb',
      formLimit: '4mb',
      textLimit: '4mb'
    })
  );

  app.use(async (ctx, next) => {
    try {
      console.log(
        '\nctx.path',
        ctx.path,
        '\nquery:\n',
        JSON.stringify(ctx?.query || {}, null, 2),
        '\nbody:\n',
        JSON.stringify(ctx?.request?.body || {}, null, 2),
      );
      const start = Date.now();
      await next();
      const yapiTips = {
        ..._.pick(ctx, ['headers', 'method', 'url'])
      };

      function flattenDeep(obj, target) {
        return _.reduce(obj, (target, value, key) => {
          if (_.isPlainObject(value)) {
            return flattenDeep(value, target);
          } else {
            target[`yapi-${key}`] = value;
          }
          return target;
        }, target);
      }
      _.each(
        flattenDeep(yapiTips, { 'response-time': `${Date.now() - start}ms`, }),
        (value, key) => {
          ctx.set(key, value);
        });
    } catch (error) {
      console.error(error);
    }
  });

  app.use(useMockServer);
  app.use(router.routes());
  app.use(router.allowedMethods());
  websocket(app);
  app.use(async (ctx, next) => {
    if (/\/prd/.test(ctx.path)) {
      ctx.set('Cache-Control', 'max-age=8640000000');
      if (yapi.commons.fileExist(path.join(yapi.WEBROOT, 'static', ctx.path + '.gz'))) {
        ctx.set('Content-Encoding', 'gzip');
        ctx.path = ctx.path + '.gz';
      }
    }
    await next();
  });
  app.use(koaStatic(path.join(yapi.WEBROOT, 'static'), { index: INDEX_FILE, gzip: true }));

  app.use(async (ctx, next) => {
    /* history 模式，除了api，都返回index.html */
    if (ctx.status === 404) {
      const indexPath = path.join(yapi.WEBROOT, 'static', 'index.html');
      ctx.status = 200;
      ctx.set('Content-Type', 'text/html');
      ctx.body = fs.createReadStream(indexPath);
    }
  });

  function appListen(PORT, tips = '服务已启动，请打开下面链接访问:') {
    app.listen(PORT);
    if (process.send) {
      process.send(JSON.stringify({ type: 'CHANGE_PORT', PORT }));
    }
    yapi.commons.log(`
    ${tips}
    http://127.0.0.1${PORT == '80' ? '' : ':' + PORT}/ `);

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
