const ControllerBase = require("server/controllers/base");
const KoaSocket = require("koa-socket");

var cps = require("current-processes");

const ONLINE_USERS = new Map();
xU.users = ONLINE_USERS;

function msg(msg, ctx, payload = {}) {
	return {
		msg,
		id: ctx.socket.id,
		payload
	};
}

const ioUtils = {
	msg
};

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
		ctx.websocket.send(newWsPayload("connected", { username: vm.$user.username }));
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
					const { handler, wsPayload, payload } = getWsHanderAndPayloadBy(paramsString);
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



exports.appSetupWebsocket = function (app) {
	const { namespace_yapi } = require("./websocket.ns.yapi");
	namespace_yapi({ app, ioUtils });
};

exports.socket_const = {
	clone_git_repo_terminal_output: "clone_git_repo_terminal_output",
	task_run_output: "task_run_output"
};
