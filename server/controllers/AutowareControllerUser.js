const { ModelUser } = require("server/models/user");
const { ModelGroup } = require("server/models/group");
const { ModelVerifyCode } = require("server/models/VerifyCode");
const { ModelAvatar } = require("server/models/avatar");

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { customCookies } = require("server/utils/customCookies");
async function makeNewUserPrivateGroup(uid) {
	var groupInst = xU.orm(ModelGroup);
	await groupInst.save({
		uid: uid,
		group_name: "User-" + uid,
		add_time: xU.time(),
		up_time: xU.time(),
		type: "private"
	});
}

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
		"/user/login": {
			post: {
				auth: true,
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
		/* 退出 */
		"/user/logout": {
			post: {
				auth: true,
				summary: "用户退出接口",
				description: "",
				async handler(ctx) {
					customCookies(ctx, "_yapi_token", null);
					customCookies(ctx, "_yapi_uid", null);
					ctx.body = xU.$response("ok");
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
							subject: "验证码",
							to: email,
							contents: `<h3>亲爱的用户：</h3>
							<p>您好，感谢使用YApi可视化接口平台</p>
							<p>验证码为：</p>
							<h1 style="color:#34ff34;background-color:black;padding:16px;">
								${code}
							</h1>
							<p>请在24小时内填写，如非本人操作，请忽略此邮件。</p>`
						});
						ctx.body = xU.$response({ msg: "验证码已发送，请检查邮箱" });
					}

					if (result) {
						ctx.body = xU.$response(null, 405, "用户已存在，请直接登录");
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
						email: "string",
						code: "string"
					});

					if (payload.email) {
						let result = await xU.orm(ModelUser).findByEmail(payload.email);
						if (result) {
							return (ctx.body = xU.$response(null, 405, "用户已存在，请直接登录"));
						}
					} else {
						return (ctx.body = xU.$response(null, 400, "邮箱不能为空"));
					}

					if (!payload.password) {
						return (ctx.body = xU.$response(null, 400, "密码不能为空"));
					}

					if (!payload.code) {
						return (ctx.body = xU.$response(null, 400, "验证码不能为空"));
					} else {
						let verifyCodeInst = xU.orm(ModelVerifyCode);
						let verifyCode = await verifyCodeInst.findByEmail(payload.email);
						if (verifyCode) {
							if (verifyCode.code !== payload.code) {
								return (ctx.body = xU.$response(null, 400, "验证码不匹配，请确认"));
							}
						} else {
							return (ctx.body = xU.$response(null, 400, "请重新获取验证码"));
						}
					}

					//然后检查是否已经存在该用户
					let count = await userInst.count(payload.email);

					if (count) {
						return (ctx.body = xU.$response(null, 401, "该E-mail已经注册"));
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
					let user;
					try {
						user = await userInst.save(data);
						await makeNewUserPrivateGroup(user._id);
						xU.sendMail({
							subject: "注册成功",
							to: user.email,
							contents: `<h3>亲爱的用户：</h3><p>您好，感谢使用YApi可视化接口平台,您已经注册成功</p>
							<pre>
								<code>${JSON.stringify(payload)}</code>
							</pre>`
						});
						/* 删除验证码 */
						await xU.orm(ModelVerifyCode).del(payload.email);

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
		},
		/* 删除用户 */
		"/user/del": {
			post: {
				summary: "根据id删除一个用户",
				description: "只有`admin`用户才有此权限",
				request: {
					body: {
						id: {
							required: true,
							description: "用户id",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					/* TODO:真的不考虑从group 项目里面清除？ */
					try {
						if (this.getRole() === "admin") {
							let { id } = ctx.payload;

							if (!id) {
								return (ctx.body = xU.$response(null, 400, "uid不能为空"));
							}
							if (id == this.getUid()) {
								/* 管理员能删除其他人员，但是管理员不能删除自己 */
								return (ctx.body = xU.$response(null, 403, "禁止删除管理员"));
							}
							let userInst = xU.orm(ModelUser);
							let result = await userInst.del(id);
							ctx.body = xU.$response(result);
						} else {
							return (ctx.body = xU.$response(
								null,
								402,
								"Without permission."
							));
						}
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},

		/* 模糊搜索用户名或者email */
		"/user/search": {
			get: {
				summary: "模糊搜索用户名或者email",
				description: "搜索用户名或者email",
				request: {
					query: {
						q: {
							description: "搜索内容",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					const { q } = ctx.payload;

					let rules = [
						{
							key: "_id",
							alias: "uid"
						},
						"username",
						"email",
						"role",
						{
							key: "add_time",
							alias: "addTime"
						},
						{
							key: "up_time",
							alias: "upTime"
						}
					];

					let userInst = xU.orm(ModelUser);


					if (!q) {
						let queryList = await userInst.list();
						let filteredRes = xU.filterRes(queryList, rules);
						return (ctx.body = xU.$response(filteredRes, 0, "ok"));
					}

					if (!xU.validateSearchKeyword(q)) {
						return (ctx.body = xU.$response(void 0, 400, "Bad query."));
					}

					let queryList = await userInst.search(q);

					let filteredRes = xU.filterRes(queryList, rules);

					return (ctx.body = xU.$response(filteredRes, 0, "ok"));
				}
			}
		},
		/* 根据用户uid获取头像 */
		"/user/avatar": {
			get: {
				summary: "根据用户uid获取头像",
				description: "根据用户uid获取头像",
				request: {
					query: {
						uid: {
							description: "用户uid",
							type: "string"
						}
					}
				},
				response: {
					200: {
						description: "成功",
						content: {
							"image/png": {
								schema: {
									type: "string",
									format: "binary"
								}
							}
						}
					}
				},
				async handler(ctx) {
					try {
						let { uid } = ctx.payload;
						uid = uid ? uid : this.getUid();
						let avatarInst = xU.orm(ModelAvatar);
						let data = await avatarInst.get(uid);
						let dataBuffer, type;
						if (!data || !data.basecode) {
							dataBuffer = xU.fs.readFileSync(
								xU.path.join(xU.var.APP_ROOT_DIR, "static/image/avatar.png")
							);
							type = "image/png";
						} else {
							type = data.type;
							dataBuffer = new Buffer(data.basecode, "base64");
						}

						ctx.set("Content-type", type);
						ctx.body = dataBuffer;
					} catch (err) {
						ctx.body = "error:" + err.message;
					}


				}
			}
		}
	}
};
