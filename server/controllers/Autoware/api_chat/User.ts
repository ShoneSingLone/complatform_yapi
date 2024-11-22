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
		"/login": {
			post: {
				auth: true,
				summary: "用户登录接口",
				description: "",
				request: {
					body: {
						username: {
							required: true,
							description: "用户名不能为空",
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
					let { username, password } = ctx.payload;
					username = (username || "").trim();

					if (!username) {
						return (ctx.body = xU.$response(null, 400, "username不能为空"));
					}
					if (!password) {
						return (ctx.body = xU.$response(null, 400, "密码不能为空"));
					}

					let userInfo = await userInst.findByEmail(username);

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
		}
	}
};
