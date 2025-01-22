module.exports = {
	definitions: {},
	tag: {
		description: "标签"
	},
	paths: {
		/* 通过ID获取group */
		"/tag/list": {
			get: {
				summary: "获取好友申请列表",
				description: "获取好友申请列表",
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
					let { page, size } = ctx.payload;
					const { list, total } = await orm.ChatApply.paging({
						page,
						size,
						friendId: this.$uid
					});

					ctx.body = xU.$response({
						list,
						total
					});
				}
			}
		}
	}
};
