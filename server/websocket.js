const koaRouter = require("koa-router");
const interfaceController = require("./controllers/interface");

const wsRouter = koaRouter();
const { useWS } = require("./websocket.controller");

let pluginsRouterPath = [];

function addPluginRouter(config) {
	if (!config.path || !config.controller || !config.action) {
		throw new Error("Plugin Route config Error");
	}
	let method = config.method || "GET";
	let routerPath = "/ws_plugin/" + config.path;
	if (pluginsRouterPath.indexOf(routerPath) > -1) {
		throw new Error("Plugin Route path conflict, please try rename the path");
	}
	pluginsRouterPath.push(routerPath);
	xU.createAction(
		wsRouter,
		"/api",
		config.controller,
		config.action,
		routerPath,
		method,
		true
	);
}

exports.appSetupWebsocket = function appSetupWebsocket(app) {
	xU.createAction(
		wsRouter,
		"/api",
		interfaceController,
		"solveConflict",
		"/interface/solve_conflict",
		"get"
	);
	xU.emitHookSync("add_ws_router", addPluginRouter);
	app.ws.use(useWS());
	app.ws.use(wsRouter.routes());
	app.ws.use(wsRouter.allowedMethods());
	app.ws.use((ctx, next) => {
		return ctx.websocket.send(
			JSON.stringify({
				errcode: 404,
				errmsg: "No Fount."
			})
		);
	});
};
