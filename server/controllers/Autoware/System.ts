module.exports = {
	definitions: {},
	tag: {
		description: "系统工具"
	},
	paths: {
		/* 获取options：[{label:"",value:"",...}] */
		"/system/dicts": {
			post: {
				summary: "获取options",
				description: "",
				request: {
					body: {
						types: {
							required: true,
							description: "动态类型",
							type: "array",
							items: {
								type: "string",
								enum: ["group", "project"]
							}
						}
					}
				},
				async handler(ctx) {
					try {
						const { types } = ctx.payload;

						const data = {};
						await Promise.all(
							xU._.map(types, async type => {
								let allItems = [];
								try {
									if (type === "group") {
										allItems = await orm.group.list();
										if (allItems.length) {
											data.group = xU._.map(allItems, item => {
												return {
													value: item._id,
													label: item.group_name
												};
											});
										}
									}

									if (type === "project") {
										allItems = await orm.project.search();
										if (allItems.length) {
											data.project = xU._.map(allItems, item => {
												return {
													value: item._id,
													label: item.name 
												};
											});
										}
									}
								} catch (err) {
									xU.log.error(err);
								} finally {
									return allItems;
								}
							})
						);
						return (ctx.body = xU.$response(data));
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		}
	}
};
