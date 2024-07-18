function msg(msg, ctx, payload = {}) {
	return {
		msg,
		id: ctx.socket.id,
		payload
	};
}

module.exports = {
	definitions: {},
	tag: {
		description: "运维相关的接口，只有管理员有权限"
	},
	paths: {
		/* 获取音频 */
		"/super_admin/deploy": {
			get: {
				summary: "部署",
				description: "git pull && pnpm i && pm2 restart yapi",
				async handler(ctx) {
					let body = xU.$response("部署中...");
					if (this.$user?.role !== "admin") {
						body = xU.$response(null, 401, "权限不足");
						return;
					}
					try {
						const { execCmd } = require("../../../common/utils");
						await execCmd("npm run redeploy", {
							log(data) {
								// ctx.app["/ws"].socket.emit(
								ctx.app["/ws"].broadcast(
									"message",
									xU.socketMsg("self", ctx, { data })
								);
							}
						});
					} catch (error) {
						xU.applog.error(error);
						body = xU.$response(null, 401, "权限不足");
					} finally {
						return (ctx.body = body);
					}
				}
			}
		}
	}
};
