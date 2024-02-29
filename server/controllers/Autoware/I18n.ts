module.exports = {
	definitions: {},
	tag: {
		description: "日志记录"
	},
	paths: {
		/* 获取动态列表 */
		"/i18n/get_list": {
			post: {
				/* 不需要token */
				auth: true,
				summary: "获取动态列表",
				description: "",
				request: {
					body: {}
				},
				async handler(ctx) {
					const result = await orm.I18n.list();
					ctx.body = xU.$response(result);
				}
			}
		},
		"/i18n/upsert_one": {
			post: {
				summary: "存储i18n数据",
				description: "",
				request: {
					body: {
						i18n: {
							key: {
								type: "string",
								description: "i18n的key，支持：el.select.placeholder形式"
							},
							desc: {
								type: "string",
								description: `可以转成数据的字符串：["中文","English"]`
							},
							isRectified: {
								type: "boolean",
								description: "是否经过认证"
							}
						}
					}
				},
				async handler(ctx) {
					const { i18n } = ctx.payload;
					let res;
					const existedRecord = await orm.I18n.detailByKey(i18n?.key);
					if (existedRecord?._id) {
						res = await orm.I18n.up(i18n);
					} else {
						res = await orm.I18n.save(i18n);
					}
					ctx.body = xU.$response(res);
				}
			}
		}
	}
};
