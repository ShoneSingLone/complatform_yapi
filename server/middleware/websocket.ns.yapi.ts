const KoaSocket = require("koa-socket");

const ws_event = {
	user_login: {
		name: "user_login",
		handler({ username, _id }) {
			debugger;
		}
	}
};

function namespace_yapi({ app, ioUtils }) {
	const { msg } = ioUtils;
	const appSocket = new KoaSocket("/yapi");
	appSocket.attach(app);
	global.APP.socket = global.APP.socket || {};
	global.APP.socket.yapi = { socket: appSocket };
	global._app_socket_yapi_connections = {
		obj: [],
		set(uid, socket) {
			this.obj.push([uid, socket]);
		},
		get(uid) {
			return this.obj.filter(item => item[0] === uid);
		},
		each(handler) {
			this.obj.forEach(([uid, socket]) => {
				handler(socket, uid);
			});
		},
		delete(ctx_socket_id) {
			let uid;
			this.obj = this.obj.filter(item => {
				if (item[1].id !== ctx_socket_id) {
					return true;
				} else {
					[uid] = item;
					return false;
				}
			});
			return uid;
		}
	};

	/**
	 * Socket handlers
	 */
	appSocket.on("connection", ctx => {
		let { uid } = ctx.socket.request?._query;
		if (uid) {
			uid = String(uid);
			global._app_socket_yapi_connections.set(uid, ctx.socket);
			ctx.socket.emit("connection", { id: ctx.socket.id });
		} else {
			debugger;
		}
	});

	appSocket.on("disconnect", ctx => {
		const uid = global._app_socket_yapi_connections.delete(ctx.socket.id);
		if (uid) {
			/* 如果没有其他的socket在线，则广播 */
			const user = global._app_socket_yapi_connections.get(uid);
			if (Array.isArray(user) && user.length === 0) {
				appSocket.broadcast("message", {
					type: xU.SSE_TYPE.USER_LOGOUT,
					payload: { uid }
				});
			}
		}
	});

	appSocket.on("all", ctx => {
		appSocket.broadcast("message", ctx.data);
	});
	appSocket.on("other", ctx => {
		ctx.socket.broadcast("message", ctx.data);
		/* 回执 */
		ctx.acknowledge(`done`);
	});
}

exports.namespace_yapi = namespace_yapi;
