```js
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
```
