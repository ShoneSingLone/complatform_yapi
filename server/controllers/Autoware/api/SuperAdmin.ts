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
			post: {
				summary: "部署",
				description: "git pull && pnpm i && pm2 restart yapi",
				request: {
					body: {
						id: {
							description: "socketId",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { id } = ctx.payload;

					let body = xU.$response("部署中...");
					try {
						if (this.$user?.role !== "admin") {
							body = xU.$response(null, 401, "权限不足");
							return;
						}
						const { execCmd } = require("../../../../common/utils");
						const callback = {
							log(data) {
								const socket = ctx.app["/ws"].connections.get(id);
								if (socket) {
									socket.emit(
										"message",
										xU.socketMsg("self", { socket: { id } }, { data })
									);
								}
							}
						};
						await execCmd("git reset --hard HEAD", callback);
						await execCmd("npm run redeploy", callback);
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
