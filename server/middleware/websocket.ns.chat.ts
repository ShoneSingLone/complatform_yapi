const KoaSocket = require("koa-socket");

function namespace_chat({ app, ioUtils }) {
	const { msg } = ioUtils;
	const appSocket = new KoaSocket("/chat");
	appSocket.attach(app);
	/**
	 * Socket middlewares
	 */
	// appSocket.use(async function (ctx, next) {
	// 	const start = new Date();
	// 	await next();
	// 	const ms = new Date() - start;
	// 	console.log(`${ctx.event} WS ${ms}ms`, app);
	// });
	/**
	 * Socket handlers
	 */
	appSocket.on("connection", ctx => {
		let { _yapi_uid } = ctx.socket.request?._query;
		if (_yapi_uid) {
			_yapi_uid = String(_yapi_uid);
			xU.SOCKET_CONNECTIONS.set(_yapi_uid, ctx.socket);
			ctx.socket.emit("connection", _yapi_uid);
			appSocket.broadcast("message", {
				type: "online",
				payload: { uid: _yapi_uid }
			});
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

exports.namespace_chat = namespace_chat;
