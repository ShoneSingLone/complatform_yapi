const KoaSocket = require("koa-socket");

function namespace_yapi({ app, ioUtils }) {
	const { msg } = ioUtils;
	const appSocket = new KoaSocket("/ws_yapi");
	appSocket.attach(app);
	global.APP.socket = global.APP.socket || {};
	global.APP.socket.yapi = { socket: appSocket };
	global.APP.socket.yapi.connections = new Map();

	/**
	 * Socket handlers
	 */
	appSocket.on("connection", ctx => {
		ctx.socket.emit("connection", ctx.socket.id);
		let { uid } = ctx.socket.request?._query;
		if (uid) {
			uid = String(uid);
			global.APP.socket.yapi.connections.set(uid, ctx.socket);
			/* 通知自己已连接 */

			/* 通知所有在线用户 用户登录 */
			appSocket.broadcast("message", { type: "online", payload: { uid } });
		}
	});

	appSocket.on("disconnect", ctx => {
		let uid;

		global.APP.socket.yapi.connections.forEach((socket, _uid) => {
			if (socket.id === ctx.socket.id) {
				uid = _uid;
			}
		});

		if (uid) {
			global.APP.socket.yapi.connections.delete(uid);
			/* 通知所有在线用户 用户登出 */
			appSocket.broadcast("disconnect", uid);
		}
	});
}

exports.namespace_yapi = namespace_yapi;
