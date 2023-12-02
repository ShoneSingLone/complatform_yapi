const { ModelUser } = require("server/models/user");
const { ModelVerifyCode } = require("server/models/VerifyCode");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
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
						return (ctx.body = xU.$response(null, 400, "email不能为空"));
					}
					if (!password) {
						return (ctx.body = xU.$response(null, 400, "密码不能为空"));
					}

					let result = await userInst.findByEmail(email);

					if (!result) {
						return (ctx.body = xU.$response(null, 404, "该用户不存在"));
					} else if (
						xU.$saltIt(password, result.passsalt) === result.password
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

						ctx.body = xU.$response(
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
						ctx.body = xU.$response(null, 405, "登录信息错误");
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
						ctx.body = xU.$response(this.$user);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 获取邮箱校验验证码 */
		"/user/NewVarifyCode": {
			post: {
				/* 授权所有人可以访问 */
				auth: true,
				summary: "获取邮箱校验验证码",
				description: "",
				request: {
					body: {
						email: {
							required: true,
							description: "email名称，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { email } = ctx.payload;

					if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
						return (ctx.body = xU.$response(null, 405, "非法邮箱字符"));
					}
					/* email用户是否存在 */
					let userInst = xU.orm(ModelUser); //创建user实体
					let verifyCodeInst = xU.orm(ModelVerifyCode); //创建user实体
					let result = await userInst.findByEmail(email);

					async function sendNewVarifyCode() {
						const code = xU.$hashCode(yapi_configs.passsalt + email);
						await verifyCodeInst.upsertOne({
							email,
							code,
							expires: xU.expireDay(1)
						});
						xU.sendMail({
							to: email,
							contents: `<h3>亲爱的用户：</h3>
							<p>您好，感谢使用YApi可视化接口平台</p>
							<p>验证码为：</p>
							<h1>${code}</h1>
							<p>请在24小时内填写，如非本人操作，请忽略此邮件。</p>`
						});
						ctx.body = xU.$response({ msg: "验证码已发送，请检查邮箱" });
					}

					if (result) {
						ctx.body = xU.$response(null, 405, "用户已存在");
					} else {
						let verifyCode = await verifyCodeInst.findByEmail(email);
						if (verifyCode?.code) {
							/* 验证码未使用 */
							return (ctx.body = xU.$response(
								null,
								405,
								"验证码未使用，请检查邮箱"
							));
						} else {
							return sendNewVarifyCode();
						}
					}
				}
			}
		},
		/* 用户注册接口 */
		"/user/reg": {
			post: {
				auth: true,
				summary: "用户注册接口",
				description: "",
				request: {
					body: {
						username: {
							required: true,
							description: "用户名，显示给其他人看",
							type: "string"
						},
						password: {
							required: true,
							description: "密码，不能为空",
							type: "string"
						},
						code: {
							required: true,
							description: "邮箱验证码",
							type: "string"
						},
						email: {
							required: true,
							description: "E-mail，登录和收邮件用",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					//注册
					if (yapi_configs.isCloseRegister) {
						return (ctx.body = xU.$response(
							null,
							400,
							"禁止注册，请联系管理员"
						));
					}
					let userInst = xU.orm(ModelUser);
					//获取请求的参数,检查是否存在用户名和密码
					let payload = xU.ensureParamsType(ctx.payload, {
						username: "string",
						password: "string",
						email: "string"
					});

					if (!payload.email) {
						return (ctx.body = xU.$response(null, 400, "邮箱不能为空"));
					}

					if (!payload.password) {
						return (ctx.body = xU.$response(null, 400, "密码不能为空"));
					}

					if (!payload.verifyCode) {
						return (ctx.body = xU.$response(null, 400, "验证码不能为空"));
					} else {
						let verifyCodeInst = xU.orm(ModelVerifyCode);
						let verifyCode = await verifyCodeInst.findByEmail(payload.email);
						if (verifyCode !== parent.verifyCode) {
							return (ctx.body = xU.$response(null, 400, "验证码有误，请确认"));
						}
					}

					//然后检查是否已经存在该用户
					let count = await userInst.count(payload.email);

					if (count) {
						return (ctx.body = xU.$response(null, 401, "该email已经注册"));
					}

					let passsalt = xU.randStr();
					let data = {
						username: payload.username,
						email: payload.email,
						password: xU.$saltIt(payload.password, passsalt), //加密
						passsalt: passsalt,
						role: "member",
						add_time: xU.time(),
						up_time: xU.time(),
						type: "site"
					};

					if (!data.username) {
						data.username = data.email.substr(0, data.email.indexOf("@"));
					}

					try {
						let user = await userInst.save(data);
						await this.handlePrivateGroup(user._id, user.username, user.email);
						xU.sendMail({
							to: user.email,
							contents: `<h3>亲爱的用户：</h3><p>您好，感谢使用YApi可视化接口平台,您的账号 ${payload.email} 已经注册成功</p>`
						});
						/* 删除验证码 */
						await verifyCodeInst.del(payload.email);

						ctx.body = xU.$response({
							uid: user._id,
							email: user.email,
							username: user.username,
							add_time: user.add_time,
							up_time: user.up_time,
							role: "member",
							type: user.type,
							study: false
						});
					} catch (e) {
						ctx.body = xU.$response(null, 401, e.message);
					}
				}
			}
		}
	}
};
