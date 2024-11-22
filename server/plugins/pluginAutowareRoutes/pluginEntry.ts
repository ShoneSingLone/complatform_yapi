const ControllerBase = require("server/controllers/base");
const koaStatic = require("koa-static");
const RouteMap = new Map();

/* isHideInSwagger */
/* auth */

function getRoute(url, method) {
	const urlObj = RouteMap.get(url);
	if (urlObj) {
		return urlObj[String(method).toLowerCase()];
	}
}

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
	routes.forEach(route => {
		const { url, method } = route;
		const version = yapi_configs?.isUsePlugin?.AutowareRoutes?.swaggerInfo?.version || "";
		let url_path = `${version}${url}`;
		const url_collection = RouteMap.get(url_path) || {};
		url_collection[String(method).toLowerCase()] = route;
		RouteMap.set(url_path, url_collection);
	});

	app.use(async (ctx, next) => {
		ctx.callme.push("plugin-AutowareRoutes");
		xU.applog.info(ctx.path, ctx.callme);
		const isDone = await (async () => {
			/* AOP */
			const route = getRoute(ctx.path, ctx.method);
			if (route) {
				const { handler, auth } = route;
				const vm = new ControllerBase(ctx);
				try {
					await vm.init(ctx);
					/* TODO: 权限控制  */
					if (vm.$auth || auth) {
						/* TODO:数据校验 */
						vm.ctx.payload = xU._.merge(
							{},
							ctx.params || {},
							ctx.query || {},
							ctx.request.body || {}
						);

						const { request } = route;

						if (request) {
							xU._.each(request, (query, queryName) => {
								xU._.each(query, (fieldInfo, field) => {
									if (queryName === "formData") {
										return;
									} else {
										checkParamsAndParse({ info: fieldInfo, ctx, field });
									}
								});
							});
						}

						xU.applog.info(
							ctx.path,
							xU._.omit(vm.ctx.payload, ["_yapi_token", "_yapi_uid"])
						);
						/* TODO: 参数校验 根据route的schema校验 */
						/* let validResult = xU.validateParams(inst.schemaMap[action], ctx.params); */

						try {
							await handler.call(vm, ctx);
						} catch (error) {
							error.message += `\n${ctx.path} ${ctx.method} handler error`;
							throw error;
						}
						return true;
					} else {
						ctx.body = xU.$response({ msg: "未获取授权" }, 40011, "请登录...");
					}
				} catch (err) {
					ctx.body = xU.$response(null, 500, err.message);
					xU.applog.error(err, route);
					return true;
				}
			} else {
				// ctx.body = xU.$response(null, 404, `API ${ctx.url} 使用了错误的 METHOD`);
				return false;
			}
		})();
		if (!isDone) {
			await next();
		}
	});
}

module.exports = async function (app) {
	/*autoware controllers文件夹下面带有Auto前缀的controller*/
	const { routes, swaggerJSON } = await require("./utils/scanAllAutowareController")(app);
	appAddRoutes(app, routes);

	/*是否开启swagger: 用环境变量也可以，用配置文件也行，内网使用，一直开启也无妨，当然，默认是关闭*/
	if (yapi_configs?.isUsePlugin?.AutowareRoutes?.isUseSwagger) {
		appUseSwagger(app, swaggerJSON);
	}
};

function checkParamsAndParse({ info, ctx, field }) {
	const { default: defaultValue, required, type } = info;
	const fieldValue = xU._.get(ctx.payload, field);

	/* 校验必填项 */
	if (required) {
		if (!xU.isInput(fieldValue)) {
			if (xU.isInput(defaultValue)) {
				xU._.set(ctx.payload, field, defaultValue);
			} else {
				ctx.body = xU.$response(null, 500, `${field} required`);
			}
		}
	}

	/* 转换和校验 */
	if (xU.isInput(fieldValue)) {
		if (type === "number") {
			ctx.payload[field] = Number(fieldValue);
		} else if (type === "string") {
			ctx.payload[field] = String(fieldValue || "");
		} else if (type === "array") {
			/* TODO: */
		}
	}
}
