async function main(params) {
  process.env.NODE_PATH = __dirname;
  require('module').Module._initPaths();

  /* 
  // 初始化全局的依赖加载路径
  Module._initPaths = function() {
    ...
    var paths = [path.resolve(process.execPath, '..', '..', 'lib', 'node')];
  
    ...
    // 我们需要着重关注此处，获取环境变量“NODE_PATH”
    var nodePath = process.env['NODE_PATH'];
    if (nodePath) {
      paths = nodePath.split(path.delimiter).concat(paths);
    }
  
    // modulePaths记录了全局加载依赖的根目录，在Module._resolveLookupPaths中有使用
    modulePaths = paths;
  };
  
  // @params: request为加载的模块名 
  // @params: parent为当前模块（即加载依赖的模块）
  Module._resolveLookupPaths = function(request, parent) {
    ...
   
    var start = request.substring(0, 2);
    // 若为引用模块名的方式，即require('moduleA')
    if (start !== './' && start !== '..') {
      // 此处的modulePaths即为Module._initPaths函数中赋值的变量
      var paths = modulePaths;
      if (parent) {
        if (!parent.paths) parent.paths = [];
        paths = parent.paths.concat(paths);
      }
      return [request, paths];
    } 
    ...
  };
  
  */
  const { initDbAndCommon } = require("./utils/initConfig");
  const yapi = await initDbAndCommon();
  const path = require('path');

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


  let indexFile = process.argv[2] === 'dev' ? 'dev.html' : 'index.html';

  const app = websockify(new Koa());
  app.proxy = true;
  yapi.app = app;

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('yapi-Response-Time', `${ms}ms`);
  });

  // app.use(bodyParser({multipart: true}));
  app.use(cors());

  app.use(koaBody({ strict: false, multipart: true, jsonLimit: '4mb', formLimit: '4mb', textLimit: '4mb' }));
  app.use(useMockServer);
  app.use(async (ctx, next) => {
    console.clear();
    console.log('ctx.params', ctx.originalUrl, ctx.params);
    await next();
  });
  app.use(router.routes());
  app.use(router.allowedMethods());

  websocket(app);

  app.use(async (ctx, next) => {
    if (/^\/(?!api)[a-zA-Z0-9\/\-_]*$/.test(ctx.path)) {
      ctx.path = '/';
      await next();
    } else {
      await next();
    }
  });

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

  const server = app.listen(yapi.WEBCONFIG.port);

  server.setTimeout(yapi.WEBCONFIG.timeout);

  yapi.commons.log(
    `服务已启动，请打开下面链接访问:
      http://127.0.0.1${yapi.WEBCONFIG.port == '80' ? '' : ':' + yapi.WEBCONFIG.port}/`
  );


}

main();