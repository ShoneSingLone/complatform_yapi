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
		/* 通过ID获取group */
		"/apply/list": {
			get: {
				summary: "获取好友申请列表",
				description: "获取好友申请列表",
				request: {
					query: {
						// page: {
						// 	required: true,
						// 	description: "当前页",
						// 	type: "number",
						// 	default: 1
						// },
						// size: {
						// 	required: true,
						// 	description: "每页数量",
						// 	type: "number",
						// 	default: 10
						// }
					}
				},
				async handler(ctx) {
					let { page, size } = ctx.payload;
					const { list, total } = await orm.ChatApply.paging({
						page: 0,
						size: -1,
						friendId: this.$uid
					});

					ctx.body = xU.$response({
						list: Promise.all(
							xU._.map(list, async i => {
								return xU._.merge(i, {
									apply: await orm.user.findById(i.uid)
								});
							})
						),
						total
					});
				}
			}
		},
		"/apply/addfriend": {
			post: {
				summary: "申请添加好友",
				description: "申请添加好友",
				request: {
					body: {
						friendId: {
							type: "number",
							required: true,
							description: "好友id"
						},
						nickname: {
							type: "string",
							required: false,
							description: "昵称"
						},
						lookme: {
							type: "number",
							required: true,
							range: {
								in: [0, 1]
							},
							description: "看我"
						},
						lookhim: {
							type: "number",
							enum: [0, 1],
							required: true,
							description: "看他"
						}
					}
				},
				async handler(ctx) {
					let { friendId, nickname, lookme, lookhim } = ctx.payload;
					const current_user_id = this.$uid;
					// 不能添加自己
					if (current_user_id === friendId) {
						ctx.body = xU.$response(null, 400, "不能添加自己");
					}
					// 对方是否存在
					let user = await orm.user.findById(friendId);

					if (!user) {
						ctx.body = xU.$response(null, 400, "该用户不存在或者已被禁用");
					}
					// 之前是否申请过了
					const [isApplied] = await await orm.ChatApply.findOne({
						/*我提出申请*/
						uid: Number(current_user_id),
						/*申请这一个*/
						friendId,
						status: {
							$in: ["pending", "agree"]
						}
					});

					if (isApplied) {
						ctx.body = xU.$response(null, 400, "你之前已经申请过了");
						return;
					}

					// 创建申请
					let apply = await orm.ChatApply.save({
						uid: Number(current_user_id),
						nickname,
						friendId,
						lookme,
						lookhim,
						status: "pending"
					});

					if (!apply) {
						ctx.body = xU.$response(null, 400, "申请失败");
					} else {
						ctx.body = xU.$response(apply);
						// 消息推送
						xU.socketTrigger(xU.SSE_TYPE.CHAT_NEW_APPLY, friendId, {
							action: "updateApplyList"
						});
					}
				}
			}
		}
	}
};
