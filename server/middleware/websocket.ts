const ControllerBase = require("server/controllers/base");
const KoaSocket = require("koa-socket");

var cps = require("current-processes");

const ONLINE_USERS = new Map();
xU.users = ONLINE_USERS;

/*
 *
 * @param {string} type
 * @param {any} payload
 * @returns {string}
 * */
function newWsPayload(type, payload = {}) {
	try {
		return JSON.stringify({ type, payload });
	} catch (error) {
		return "{type:'error',payload:{}}";
	}
}

/**
 * @param {any} paramsString ws的参数，默认{type,payload}
 * @returns {any} {handler, wsPayload,payload} wsPayload是String payload是object
 */
function getWsHanderAndPayloadBy(paramsString) {
	try {
		const params = JSON.parse(paramsString) || {};
		const { type } = params;
		const handler = HANDLER[type] || (() => null);
		return {
			handler,
			payload: params,
			wsPayload: newWsPayload(params.type, params.payload)
		};
	} catch (error) {
		console.error(error);
		const params = { type: "error", payload: {} };
		return {
			handler: () => null,
			wsPayload: newWsPayload(params.type, params.payload),
			payload: params
		};
	}
}

/**
 *
 *
 * @param {any} { currentCtx, currentVM, wsPayload }
 */
const wsHandler = {
	toAllClient: ({ wsPayload }) => {
		ONLINE_USERS.forEach(({ currentCtx }) => {
			currentCtx.websocket.send(wsPayload);
		});
	},
	userLogoutAndNoticeAllClient: ({ ctx, vm }) => {
		console.log("ws close", ctx.path, vm.$user);
		ONLINE_USERS.delete(vm.$uid);
		const users = Array.from(ONLINE_USERS, ([uid, payload]) => {
			const { currentVM: onlineVM } = payload;
			return xU._.pick(onlineVM.$user, ["_id", "username", "email"]);
		});
		wsHandler.toAllClient({
			wsPayload: newWsPayload("logout", {
				username: vm.$user.username,
				users
			})
		});
	},
	SendUserInfoAndNoticeAllClient: ({ ctx, vm }) => {
		/* 自己 */
		ctx.websocket.send(
			newWsPayload("connected", { username: vm.$user.username })
		);
		/* 所有人（包括自己） */
		const users = Array.from(ONLINE_USERS, ([uid, payload]) => {
			const { currentVM: onlineVM } = payload;
			return xU._.pick(onlineVM.$user, ["_id", "username", "email"]);
		});
		wsHandler.toAllClient({
			wsPayload: newWsPayload("login", {
				newJoinUsername: vm.$user.username,
				users
			})
		});
	},
	solveConflict: ({ ctx, vm }) => {
		debugger;
		/* 是否已经在编辑 */

		wsHandler.toAllClient({
			wsPayload: newWsPayload("login", {
				newJoinUsername: vm.$user.username,
				users
			})
		});
	}
};

const HANDLER = {
	solveConflict: wsHandler.solveConflict,
	login: wsHandler.SendUserInfoAndNoticeAllClient,
	message: wsHandler.toAllClient,
	typing: wsHandler.toAllClient,
	"stop-typing": wsHandler.toAllClient,
	logout: wsHandler.toAllClient
};

const old_middlewareWebsocket = () => async (ctx, next) => {
	console.log("app websocket", ctx.path);
	const PATH_STRATEGY = new Map();

	PATH_STRATEGY.set(`/ws`, async () => {
		debugger;
		/* 默认的root */
		const vm = new ControllerBase(ctx);
		await vm.checkLogin(ctx);
		/* 异步，不能用open来确定可以发消息的事件，只有通过权限校验才接受client发送的消息 */
		if (vm.$user) {
			console.log("ws", ctx.path, vm.$user);
			vm.handleProcessUseage = xU._.debounce((err, processes) => {
				try {
					const currentProcess = xU._.find(processes, { pid: process.pid });
					ctx.websocket.send(
						newWsPayload("current-processes", {
							info: xU._.pick(currentProcess, ["cpu", "mem"])
						})
					);
				} catch (error) {}
			}, 1000 * 10);
			ctx.websocket.on("message", paramsString => {
				try {
					cps.get(vm.handleProcessUseage);
					console.log("🚀:", "ctx.websocket.onMessage", paramsString);
					const { handler, wsPayload, payload } =
						getWsHanderAndPayloadBy(paramsString);
					handler({ vm, ctx, wsPayload, payload });
				} catch (error) {
					console.error(error);
				}
			});
			ctx.websocket.on("close", async () => {
				wsHandler.userLogoutAndNoticeAllClient({ vm, ctx });
			});

			const alreadyOnline = ONLINE_USERS.get(vm.$uid);
			if (alreadyOnline) {
				wsHandler.userLogoutAndNoticeAllClient(alreadyOnline[1]);
			}
			/* 加入在线的用户map */
			ONLINE_USERS.set(vm.$uid, { currentVM: vm, currentCtx: ctx });
			ctx.websocket.send(newWsPayload("_$auth"));
		}
	});

	try {
		/* complatform项目使用 /ws/api前缀 */
		const controller = PATH_STRATEGY.get(ctx.path);
		if (controller) {
			return controller();
		}
		return next();
	} catch (error) {
		xU.applog.error(error);
	}
};

const middlewareWebsocket = () => async (ctx, next) => {
	console.log("app websocket", ctx.path);
	const PATH_STRATEGY = new Map();

	PATH_STRATEGY.set(`/ws`, async () => {
		debugger;
		/* 默认的root */
		const vm = new ControllerBase(ctx);
		await vm.checkLogin(ctx);
		if (vm.$user) {
		}
	});

	try {
		/* complatform项目使用 /ws/api前缀 */
		const controller = PATH_STRATEGY.get(ctx.path);
		if (controller) {
			return controller();
		}
		return next();
	} catch (error) {
		xU.applog.error(error);
	}
};

const koaRouter = require("koa-router");
const { ControllerInterface } = require("server/controllers/interface");

const wsRouter = koaRouter();
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

exports.old_appSetupWebsocket = function ({ app, appSocket }) {
	xU.createAction(
		wsRouter,
		"/api",
		ControllerInterface,
		"solveConflict",
		"/interface/solve_conflict",
		"get"
	);
	xU.emitHookSync("add_ws_router", addPluginRouter);
	app.ws.use(middlewareWebsocket());
	app.ws.use(wsRouter.routes());
	app.ws.use(wsRouter.allowedMethods());
	app.ws.use((ctx, next) => {
		return ctx.websocket.send(
			JSON.stringify({
				errcode: 404,
				message: "No Fount."
			})
		);
	});
};

function msg(msg, ctx, payload = {}) {
	return {
		msg,
		id: ctx.socket.id,
		payload
	};
}

exports.appSetupWebsocket = function (app) {
	namespace_ws(app);
	namespace_yapi(app);
};
function namespace_ws(app) {
	const appSocket = new KoaSocket("/ws");
	appSocket.attach(app);

	/**
	 * Socket handlers
	 */
	appSocket.on("connection", ctx => {
		xU.SOCKET_CONNECTIONS.set(ctx.socket.id, app);
		ctx.socket.emit("connection", msg("self", ctx));
	});

	appSocket.on("disconnect", ctx => {
		xU.SOCKET_CONNECTIONS.delete(ctx.socket.id);
		appSocket.broadcast("disconnect", msg("disconnect", ctx));
	});
	appSocket.on("all", ctx => {
		appSocket.broadcast("message", msg("all", ctx));
	});
	appSocket.on("other", ctx => {
		ctx.socket.broadcast("message", msg("other", ctx));
		/* 回执 */
		ctx.acknowledge(`send to other,callback with ctx.acknowledge`);
	});
	appSocket.on("self", ctx => {
		try {
			ctx.socket.emit("message", msg("other", ctx));
		} catch (error) {
			console.error(error);
		}
	});
}
function namespace_yapi(app) {
	const appSocket = new KoaSocket("/ws_yapi");
	appSocket.attach(app);
	/**
	 * Socket middlewares
	 */
	appSocket.use(async function (ctx, next) {
		const start = new Date();
		await next();
		const ms = new Date() - start;
		console.log(`${ctx.event} WS ${ms}ms`, app);
	});
	/**
	 * Socket handlers
	 */
	appSocket.on("connection", ctx => {
		let { uid } = ctx.socket.request?._query;
		if (uid) {
			uid = String(uid);
			xU.SOCKET_CONNECTIONS.set(uid, ctx.socket);
			ctx.socket.emit("connection", uid);
			appSocket.broadcast("message", { type: "online", payload: { uid } });
		}
	});
	appSocket.on("disconnect", ctx => {
		let uid;
		xU.SOCKET_CONNECTIONS.forEach((socket, _uid) => {
			if (socket.id === ctx.socket.id) {
				uid = _uid;
			}
		});
		if (uid) {
			xU.SOCKET_CONNECTIONS.delete(uid);
			appSocket.broadcast("disconnect", uid);
		}
	});
	appSocket.on("all", ctx => {
		appSocket.broadcast("message", msg("all", ctx));
	});
	appSocket.on("chat_one", ctx => {
		appSocket.broadcast("message", msg("all", ctx));
	});
	appSocket.on("other", ctx => {
		ctx.socket.broadcast("message", msg("other", ctx));
		/* 回执 */
		ctx.acknowledge(`send to other,callback with ctx.acknowledge`);
	});
	appSocket.on("self", ctx => {
		try {
			ctx.socket.emit("message", msg("other", ctx));
		} catch (error) {
			console.error(error);
		}
	});
}
