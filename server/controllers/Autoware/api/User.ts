const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { customCookies } = require("server/utils/customCookies");
const { PassThrough } = require("stream");

const IMAGE_BUFFER_CACHE = {};
async function makeNewUserPrivateGroup(uid) {
	var groupInst = orm.group;
	await groupInst.save({
		uid: uid,
		group_name: "User-" + uid,
		add_time: xU.time(),
		up_time: xU.time(),
		type: "private"
	});
}
let count = 0;

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
		"/user/sse": {
			get: {
				summary: "sse服务",
				description: "sse服务",
				request: {},
				async handler(ctx) {
					// 设置响应头，表明这是一个SSE连接
					ctx.set({
						"Content-Type": "text/event-stream",
						"Cache-Control": "no-cache",
						Connection: "keep-alive"
					});
					ctx.status = 200;
					const stream = new PassThrough();
					ctx.body = stream;
					// 每隔一段时间（这里设置为3秒）发送一次数据
					const interval = setInterval(async () => {
						/* NOTICE: 需要换行，两个！！！！\n\n；
						 * 不然onmessage无效
						 */
						stream.write(`data: hi from koa sse ${count++}\n\n`);
					}, 1000);
					ctx.req.on("close", () => {
						clearInterval(interval);
						stream.end();
					});
				}
			}
		},
		"/user/update": {
			post: {
				auth: true,
				summary: "用户角色,只有管理员有权限修改",
				description: "",
				request: {
					body: {
						uid: {
							required: true,
							description: "用户ID",
							type: "string"
						},
						role: {
							description: "角色",
							type: "string"
						},
						username: {
							description: "用户名",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					//更新用户信息
					try {
						let params = ctx.payload;

						params = xU.ensureParamsType(params, {
							username: "string"
						});

						if (this.getRole() !== "admin" && params.uid != this.getUid()) {
							return (ctx.body = xU.$response(null, 401, "没有权限"));
						}

						let userInst = orm.user;
						let uid = params.uid;

						if (!uid) {
							return (ctx.body = xU.$response(null, 400, "uid不能为空"));
						}

						let targetUser = await userInst.findById(uid);

						if (!targetUser) {
							return (ctx.body = xU.$response(null, 400, "uid不存在"));
						}

						let member = {
							uid: uid,
							username: params.username || targetUser.username,
							up_time: xU.time()
						};

						let groupInst = orm.group;
						await groupInst.updateMember(member);
						await orm.project.updateMember(member);

						let result = await userInst.update(uid, member);
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/user/change_password": {
			post: {
				auth: true,
				summary: "修改用户密码",
				description: "",
				request: {
					body: {
						uid: {
							required: true,
							description: "email名称，不能为空",
							type: "string"
						},
						old_password: {
							required: true,
							description: "旧密码, 非admin用户必须传",
							type: "string"
						},
						password: {
							required: true,
							description: "新密码，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { uid, password, old_password } = ctx.payload;
					let userInst = orm.user;

					if (!uid) {
						return (ctx.body = xU.$response(null, 400, "uid不能为空"));
					}

					if (!password) {
						return (ctx.body = xU.$response(null, 400, "密码不能为空"));
					}

					let userWhoWillBeModifyPwd = await userInst.findById(uid);
					if (this.getRole() !== "admin" && uid != this.getUid()) {
						return (ctx.body = xU.$response(null, 402, "没有权限"));
					}

					if (
						this.getRole() !== "admin" ||
						userWhoWillBeModifyPwd.role === "admin"
					) {
						if (!old_password) {
							return (ctx.body = xU.$response(null, 400, "旧密码不能为空"));
						}

						if (
							xU.$saltIt(old_password, userWhoWillBeModifyPwd.passsalt) !==
							userWhoWillBeModifyPwd.password
						) {
							return (ctx.body = xU.$response(null, 402, "旧密码错误"));
						}
					}

					let passsalt = xU.randStr();
					let data = {
						up_time: xU.time(),
						password: xU.$saltIt(password, passsalt),
						passsalt: passsalt
					};
					try {
						let result = await userInst.update(uid, data);
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 401, e.message);
					}
				}
			}
		},
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
					let userInst = orm.user; //创建user实体
					let email = ctx.payload.email;
					email = (email || "").trim();
					let password = ctx.payload.password;

					if (!email) {
						return (ctx.body = xU.$response(null, 400, "email不能为空"));
					}
					if (!password) {
						return (ctx.body = xU.$response(null, 400, "密码不能为空"));
					}

					let userInfo = await userInst.findByEmail(email);

					if (!userInfo) {
						return (ctx.body = xU.$response(null, 404, "该用户不存在"));
					}
					const saltPwd = xU.$saltIt(password, userInfo.passsalt);
					if (saltPwd === userInfo.password) {
						this.$user = userInfo;
						const { _id: uid, passsalt } = userInfo;
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
								username: userInfo.username,
								role: userInfo.role,
								email: userInfo.email,
								add_time: userInfo.add_time,
								up_time: userInfo.up_time,
								type: "site",
								study: userInfo.study,
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
						const response = xU._.pick(this.$user, xU.var.pickUserInfo);
						/* 只暴露必要的信息 */
						ctx.body = xU.$response(response);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 获取邮箱校验验证码 */
		"/user/new_varify_code": {
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

					let userInst = orm.user;
					let verifyCodeInst = orm.VerifyCode;
					let result = await userInst.findByEmail(email);

					async function sendNewVarifyCode() {
						const code = xU.$hashCode(yapi_configs.passsalt + email);

						await verifyCodeInst.upsertOne({
							email,
							code,
							expires: xU.expireDay(1)
						});

						return new Promise((resolve, reject) => {
							xU.sendMail(
								{
									subject: "验证码",
									to: email,
									contents: `<h3>亲爱的用户：</h3>
<p>您好，感谢使用YApi可视化接口平台</p>
<p>验证码为：</p>
<h1 style="color:#34ff34;background-color:black;padding:16px;"> ${code} </h1>
<p>请在24小时内填写，如非本人操作，请忽略此邮件。</p>`
								},
								error => {
									if (error) {
										reject(error?.message);
									} else {
										resolve("验证码已发送，请检查邮箱");
									}
								}
							);
						});
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
							try {
								const msg = await sendNewVarifyCode();
								ctx.body = xU.$response(msg);
							} catch (error) {
								ctx.body = xU.$response(null, 500, error);
							}
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
					let userInst = orm.user;
					//获取请求的参数,检查是否存在用户名和密码
					let payload = xU.ensureParamsType(ctx.payload, {
						username: "string",
						password: "string",
						email: "string",
						code: "string"
					});

					if (payload.email) {
						let result = await orm.user.findByEmail(payload.email);
						if (result) {
							return (ctx.body = xU.$response(
								null,
								405,
								"用户已存在，请直接登录"
							));
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
						let verifyCodeInst = orm.VerifyCode;
						let verifyCode = await verifyCodeInst.findByEmail(payload.email);
						if (verifyCode) {
							if (verifyCode.code !== payload.code) {
								return (ctx.body = xU.$response(
									null,
									400,
									"验证码不匹配，请确认"
								));
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
						await orm.VerifyCode.del(payload.email);

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
							let userInst = orm.user;
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

					let userInst = orm.user;

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
						},
						usedBy: {
							description: "头像类型：分组、项目、接口。。。有_id的都可以",
							type: "array",
							items: {
								type: "string",
								enum: ["user", "group", "project"],
								default: "user"
							}
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
						let { uid, usedBy } = ctx.payload;
						uid = uid ? uid : this.getUid();
						let avatarInst = orm.avatar;
						let data = await (function () {
							if (usedBy) {
								return avatarInst.getBy(uid, usedBy);
							} else {
								/* 默认是用户头像 */
								return avatarInst.get(uid);
							}
						})();
						let dataBuffer, type;

						if (!data || !data.basecode) {
							let imagePath = "static/image/setting.png";
							if (!usedBy) {
								imagePath = "static/image/avatar.png";
							}

							dataBuffer = (function () {
								if (!IMAGE_BUFFER_CACHE[imagePath]) {
									IMAGE_BUFFER_CACHE[imagePath] = xU.fs.readFileSync(
										xU.path.join(xU.var.APP_ROOT_DIR, imagePath)
									);
								}
								return IMAGE_BUFFER_CACHE[imagePath];
							})();
							type = "image/png";
						} else {
							type = data.type;
							dataBuffer = new Buffer(data.basecode, "base64");
							const CONTENT_LENGTH = Buffer.byteLength(data.basecode);
							ctx.set("Content-Length", CONTENT_LENGTH);
						}

						ctx.set("Content-type", type);
						ctx.body = dataBuffer;
					} catch (err) {
						ctx.body = "error:" + err.message;
					}
				}
			}
		},
		/* 上传用户头像 */
		"/user/upload_avatar": {
			post: {
				summary: "上传用户头像",
				description: "上传用户头像",
				request: {
					body: {
						basecode: {
							required: true,
							description: "base64编码，通过h5 api传给后端",
							type: "string"
						},
						uid: {
							description:
								"用户uid 与usedBy对应：分组、项目、接口。。。有_id的都可以",
							type: "string"
						},
						usedBy: {
							required: true,
							description: "头像类型：分组、项目、接口。。。有_id的都可以",
							type: "array",
							items: {
								type: "string",
								enum: ["user", "group", "project"],
								default: "user"
							}
						}
					}
				},
				async handler(ctx) {
					try {
						let { basecode, uid, usedBy } = ctx.payload;
						const currentUserUid = this.getUid();
						/* 如果没有usedBy，则默认是用户头像 ，用户头像只能由用户自己修改*/
						if (!usedBy && uid !== String(currentUserUid)) {
							return (ctx.body = xU.$response(null, 403, "没有权限"));
						}
						usedBy = usedBy || "user";
						uid = uid || currentUserUid;

						if (!basecode) {
							return (ctx.body = xU.$response(null, 400, "basecode不能为空"));
						}
						let pngPrefix = "data:image/png;base64,";
						let jpegPrefix = "data:image/jpeg;base64,";
						let type;
						if (basecode.substr(0, pngPrefix.length) === pngPrefix) {
							basecode = basecode.substr(pngPrefix.length);
							type = "image/png";
						} else if (basecode.substr(0, jpegPrefix.length) === jpegPrefix) {
							basecode = basecode.substr(jpegPrefix.length);
							type = "image/jpeg";
						} else {
							return (ctx.body = xU.$response(
								null,
								400,
								"仅支持jpeg和png格式的图片"
							));
						}
						let strLength = basecode.length;
						if (parseInt(strLength - (strLength / 8) * 2) > 200000) {
							return (ctx.body = xU.$response(
								null,
								400,
								"图片大小不能超过200kb"
							));
						}

						let result = await orm.avatar.upsert({
							uid,
							basecode,
							type,
							usedBy
						});
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 401, e.message);
					}
				}
			}
		},

		/* 获取用户个人信息 */
		"/user/find": {
			get: {
				summary: "根据用户uid获取用户个人信息",
				description: "根据用户uid获取用户个人信息",
				request: {
					query: {
						uid: {
							description: "用户uid",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					//根据id获取用户信息
					try {
						let userInst = orm.user;
						let { id } = ctx.payload;

						if (!id) {
							return (ctx.body = xU.$response(null, 400, "uid不能为空"));
						}

						let result = await userInst.findById(id);

						if (!result) {
							return (ctx.body = xU.$response(null, 402, "不存在的用户"));
						}

						return (ctx.body = xU.$response({
							uid: result._id,
							username: result.username,
							email: result.email,
							role: result.role,
							type: result.type,
							add_time: result.add_time,
							up_time: result.up_time
						}));
					} catch (e) {
						return (ctx.body = xU.$response(null, 402, e.message));
					}
				}
			}
		}
	}
};
