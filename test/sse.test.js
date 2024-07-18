const Koa = require("koa");
const Router = require("koa-router");
const { ServerSentEvent } = require("sse");

const app = new Koa();
const router = new Router();

// 处理 SSE 连接的路由
router.get("/events", async ctx => {
	ctx.req.socket.setTimeout(0);
	ctx.req.socket.setNoDelay(true);
	ctx.req.socket.setKeepAlive(true);

	ctx.type = "text/event-stream";
	ctx.set("Cache-Control", "no-cache");
	ctx.set("Connection", "keep-alive");

	const sse = new ServerSentEvent();

	// 每隔 5 秒发送一条消息
	setInterval(() => {
		sse.send({ data: `Message at ${new Date().toISOString()}` });
	}, 5000);

	ctx.body = sse;
});

app.use(router.routes());

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
