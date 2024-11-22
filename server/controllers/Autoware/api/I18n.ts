const md5 = require("md5");

module.exports = {
	definitions: {},
	tag: {
		description: "国际化翻译相关"
	},
	paths: {
		/* 获取动态列表 */
		"/i18n/translate": {
			post: {
				/* 不需要token */
				auth: true,
				summary: "翻译（百度）",
				description: "",
				request: {
					body: {
						query: {
							type: "string",
							required: true,
							description: "国际化需要翻译的中文"
						},
						appId: {
							type: "string",
							description: "百度翻译appId"
						},
						appKey: {
							type: "string",
							description: "百度翻译appKey"
						}
					}
				},
				async handler(ctx) {
					const { query, appId, appKey } = ctx.payload;
					// var appid = "";
					var _appid = appId || yapi_configs?.baiduTranslate?.appId;
					if (!_appid) {
						return (ctx.body = xU.$response(null, 408, "缺少百度appId appKey"));
					}
					var key = appKey || yapi_configs?.baiduTranslate?.appKey;
					var salt = new Date().getTime();
					var str1 = _appid + query + salt + key;
					var sign = md5(str1);

					ctx.body = xU.$response({
						q: query,
						appid: _appid,
						salt,
						sign
					});
				}
			}
		},
		"/i18n/get_list": {
			post: {
				/* 不需要token */
				auth: true,
				summary: "获取国际化信息列表",
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
		"/i18n/get": {
			post: {
				/* 不需要token */
				auth: true,
				summary: "获取国际化信息，by key",
				description: "",
				request: {
					body: {
						key: {
							type: "string",
							description: "i18n的key，支持：el.select.placeholder形式"
						}
					}
				},
				async handler(ctx) {
					const result = await orm.I18n.detailByKey(ctx.payload.key);
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

					if (i18n._id) {
						res = await orm.I18n.up(i18n._id, i18n);
					} else {
						const existedRecord = await orm.I18n.detailByKey(i18n?.key);
						if (existedRecord?._id) {
							res = await orm.I18n.up(i18n._id, i18n);
						} else {
							res = await orm.I18n.save(i18n);
						}
					}
					ctx.body = xU.$response(res);
				}
			}
		}
	}
};
