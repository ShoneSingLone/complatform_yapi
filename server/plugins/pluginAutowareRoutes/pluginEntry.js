const koaStatic = require("koa-static");
const ControllerBase = require("server/controllers/base");
const RouteMap = new Map();

/* 便捷使用schema */
xU.schema = schema => ({ $ref: `#/definitions/${schema}` });
xU.swagger_id = desc => ({
	description: desc,
	type: "string"
});

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
	routes.forEach(({ url, method, handler }) => {
		url = `${WEBCONFIG?.isUsePlugin?.AutowareRoutes?.swaggerInfo?.basePath || ""
			}${url}`;
		const urlObj = RouteMap.get(url) || {};
		urlObj[String(method).toLowerCase()] = handler;
		RouteMap.set(url, urlObj);
	});

	app.use(async (ctx, next) => {
		const isDone = await (async () => {
			const urlObj = RouteMap.get(ctx.path);
			if (urlObj) {
				const handler = urlObj[String(ctx.method).toLowerCase()];
				if (handler) {
					/* AOP */
					const vm = new ControllerBase(ctx);
					try {
						await vm.init(ctx);
						if (vm.$auth) {
							vm.ctx.payload = xU.merge(
								{},
								ctx.params || {},
								ctx.query || {},
								ctx.request.body || {}
							);
							try {
								await handler.call(vm, ctx);
							} catch (error) {
								error.message += `\n${ctx.path} ${ctx.method} handler error`;
								throw error;
							}
							return true;
						} else {
							ctx.body = xU.resReturn(
								{ msg: "未获取授权" },
								40011,
								"请登录..."
							);
						}
					} catch (err) {
						xU.applog.error(err);
					}
				} else {
					ctx.body = xU.resReturn(null, 404, "API 使用了错误的 METHOD");
				}
			}
		})();
		if (!isDone) {
			await next();
		}
	});
}

exports.useAutowareRoutes = async function (app) {
	/*autoware controllers文件夹下面带有Auto前缀的controller*/
	const { routes, swaggerJSON } = await require("./utils/scanAllAutowareController")(app);
	appAddRoutes(app, routes);
	/*是否开启swagger: 用环境变量也可以，用配置文件也行，内网使用，一直开启也无妨，当然，默认是关闭*/
	if (WEBCONFIG?.isUsePlugin?.AutowareRoutes?.isUseSwagger) {
		appUseSwagger(app, swaggerJSON);
	}
};
