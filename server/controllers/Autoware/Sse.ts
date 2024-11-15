const { PassThrough } = require("stream");
let count = 0;

module.exports = {
	definitions: {
		UserAvatar: {
			type: "string",
			format: "binary"
		}
	},
	tag: {
		description: "用户信息"
	},
	paths: {
		"/sse": {
			get: {
				summary: "sse服务",
				description: "sse服务",
				request: {},
				async handler(ctx) {
					// 设置响应头，表明这是一个SSE连接
					ctx.set({
						"Content-Type": "text/event-stream",
						"Cache-Control": "no-cache",
						Connection: "keep-alive"
					});
					ctx.status = 200;
					const stream = new PassThrough();
					ctx.body = stream;
					stream.write(`data: {"type":"connected"}\n\n`);
					xU.setSseStream(this.$user._id, stream);
					ctx.req.on("close", () => {
						xU.removeSseStream(this.$user._id);
					});
				}
			}
		}
	}
};
