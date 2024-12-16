const { sendAndSaveMessage } = require("./Chat.service");
module.exports = {
	definitions: {
		UserAvatar: {
			type: "string",
			format: "binary"
		}
	},
	tag: {
		description: "chat接口"
	},
	paths: {
		/* 获取离线消息 */
		"/chat/getmessage": {
			post: {
				summary: "获取离线消息",
				description: "获取离线消息",
				request: {
					query: {
						page: {
							required: true,
							description: "当前页",
							type: "number",
							default: 1
						},
						size: {
							required: true,
							description: "每页数量",
							type: "number",
							default: 10
						}
					}
				},
				async handler(ctx) {
					const key = `getmessage_${this.$uid}`;
					const list = await orm.Redis.list({ key });
					// 清除离线消息
					await orm.Redis.remove({ key });
					// 批量推送
					list.forEach(async ({ value: message }) => {
						let d = JSON.parse(message);
						sendAndSaveMessage(this.$uid, d.message, d.msg);
					});

					ctx.body = xU.$response({ list });
				}
			}
		}
	}
};
