const { ModelUser } = require("server/models/user");
const jwt = require("jsonwebtoken");
const { customCookies } = require("server/utils/customCookies");

module.exports = {
	definitions: {},
	tag: {
		description: "用户信息"
	},
	paths: {
		"/user/login": {
			post: {
				summary: "用户登录接口",
				description: "",
				request: {
					body: {
						email: {
							required: true,
							description: "email名称，不能为空",
							type: "string"
						},
						password: {
							required: true,
							description: "密码，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					//登录
					let userInst = xU.orm(ModelUser); //创建user实体
					let email = ctx.payload.email;
					email = (email || "").trim();
					let password = ctx.payload.password;

					if (!email) {
						return (ctx.body = xU.resReturn(null, 400, "email不能为空"));
					}
					if (!password) {
						return (ctx.body = xU.resReturn(null, 400, "密码不能为空"));
					}

					let result = await userInst.findByEmail(email);

					if (!result) {
						return (ctx.body = xU.resReturn(null, 404, "该用户不存在"));
					} else if (
						xU.generatePassword(password, result.passsalt) === result.password
					) {
						this.$user = result;
						const { _id: uid, passsalt } = result;
						const TOKEN = jwt.sign({ uid }, passsalt);
						const COOKIES_OPTIONS = {
							expires: xU.expireDate(7),
							httpOnly: true
						};

						customCookies(this.ctx, "_yapi_token", TOKEN, COOKIES_OPTIONS);
						customCookies(this.ctx, "_yapi_uid", uid, COOKIES_OPTIONS);

						ctx.body = xU.resReturn(
							{
								uid,
								username: result.username,
								role: result.role,
								email: result.email,
								add_time: result.add_time,
								up_time: result.up_time,
								type: "site",
								study: result.study,
								x_token: {
									_yapi_token: TOKEN,
									_yapi_uid: uid
								}
							},
							null,
							"登录成功"
						);
					} else {
						ctx.body = xU.resReturn(null, 405, "登录信息错误");
					}
				}
			}
		},
		"/user/status": {
			get: {
				summary: "获取用户信息",
				description: "header x-cookies 获取 token 解析当前用户信息",
				request: {
					query: {
						id: {
							description: "ID",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						ctx.body = xU.resReturn(this.$user);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.resReturn(null, 402, e.message);
					}
				}
			}
		}
	}
};
