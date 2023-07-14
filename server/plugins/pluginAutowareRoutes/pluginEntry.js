const koaStatic = require("koa-static");
const Router = require("koa-router");
const ControllerBase = require("server/controllers/base");
const router = new Router();



/* 便捷使用schema */
xU.schema = (schema) => ({ $ref: `#/definitions/${schema}` });


function appUseSwagger(app, swaggerJSON) {
	app.use(async (ctx, next) => {
		if (ctx.path === "/swagger") {
			ctx.status = 200;
			ctx.set("Content-Type", "text/html");
			ctx.body = xU.fs.createReadStream(
				xU.path.resolve(__dirname, "swagger_assets/swagger.html")
			);
			return;
		}
		if (ctx.path === "/api/swagger-doc") {
			ctx.status = 200;
			ctx.set("Content-Type", "application/json");
			ctx.body = swaggerJSON;
			return;
		}
		await next();
	});
	app.use(koaStatic(xU.path.join(__dirname)));
}

function appAddRoutes(app, routes) {
	routes.forEach(({ url, method, Controller, handler, prefix }) => {
		url = `${WEBCONFIG?.isUsePlugin?.AutowareRoutes?.swaggerInfo?.basePath || ""
			}${url}`;
		router[method](url, async ctx => {
			/* AOP */
			await handler.call(new ControllerBase(ctx), ctx);
		});
	});
	app.use(router.routes());
	app.use(
		router.allowedMethods({
			// throw: true, // 抛出错误，代替设置响应头状态
			// notImplemented: () => '不支持当前请求所需要的功能',
			// methodNotAllowed: () => '不支持的请求方式'
		})
	);
}

module.exports = async function (app) {
	/*autoware controllers文件夹下面带有Auto前缀的controller*/
	const { routes, swaggerJSON } =
		await require("./utils/scanAllAutowareController")(app);
	appAddRoutes(app, routes);

	/*是否开启swagger: 用环境变量也可以，用配置文件也行，内网使用，一直开启也无妨，当然，默认是关闭*/
	if (WEBCONFIG?.isUsePlugin?.AutowareRoutes?.isUseSwagger) {
		appUseSwagger(app, swaggerJSON);
	}
};
