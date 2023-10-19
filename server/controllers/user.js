const { ModelUser } = require("../models/user");
const ControllerBase = require("./base");
const { ldapQuery } = require("../utils/ldap");
const { ModelInterface } = require("../models/interface");
const ModelGroup = require("../models/group");
const ModelProject = require("../models/project");
const avatarModel = require("../models/avatar");
const { customCookies } = require("../utils/customCookies");

class userController extends ControllerBase {
	constructor(ctx) {
		super(ctx);
		this.modelUser = xU.orm(ModelUser);
	}

	/**
	 * 退出登录接口
	 * @interface /user/logout
	 * @method GET
	 * @category user
	 * @foldnumber 10
	 * @returns {Object}
	 * @example ./api/user/logout.json
	 */

	async logout(ctx) {
		customCookies(ctx, "_yapi_token", null);
		customCookies(ctx, "_yapi_uid", null);
		ctx.body = xU.resReturn("ok");
	}

	/**
	 * 更新
	 * @interface /user/up_study
	 * @method GET
	 * @category user
	 * @foldnumber 10
	 * @returns {Object}
	 * @example
	 */

	async upStudy(ctx) {
		let userInst = xU.orm(ModelUser); //创建user实体
		let data = {
			up_time: xU.time(),
			study: true
		};
		try {
			let result = await userInst.update(this.getUid(), data);
			ctx.body = xU.resReturn(result);
		} catch (e) {
			ctx.body = xU.resReturn(null, 401, e.message);
		}
	}

	async loginByToken(ctx) {
		try {
			let ret = await xU.emitHook("third_login", ctx);
			let login = await this.handleThirdLogin(ret.email, ret.username);
			if (login === true) {
				xU.applog.info("login success");
				ctx.redirect("/group");
			}
		} catch (e) {
			xU.applog.error(e.message);
			ctx.redirect("/");
		}
	}

	/**
	 * ldap登录
	 * @interface /user/login_by_ldap
	 * @method
	 * @category user
	 * @foldnumber 10
	 * @param {String} email email名称，不能为空
	 * @param  {String} password 密码，不能为空
	 * @returns {Object}
	 *
	 */
	async getLdapAuth(ctx) {
		try {
			const { email, password } = ctx.request.body;
			// const username = email.split(/\@/g)[0];
			const { info: ldapInfo } = await ldapQuery(email, password);
			const emailPrefix = email.split(/\@/g)[0];
			const emailPostfix = WEBCONFIG.ldapLogin.emailPostfix;

			const emailParams =
				ldapInfo[WEBCONFIG.ldapLogin.emailKey || "mail"] ||
				(emailPostfix ? emailPrefix + emailPostfix : email);
			const username = ldapInfo[WEBCONFIG.ldapLogin.usernameKey] || emailPrefix;

			let login = await this.handleThirdLogin(emailParams, username);

			if (login === true) {
				let userInst = xU.orm(ModelUser); //创建user实体
				let result = await userInst.findByEmail(emailParams);
				return (ctx.body = xU.resReturn(
					{
						username: result.username,
						role: result.role,
						uid: result._id,
						email: result.email,
						add_time: result.add_time,
						up_time: result.up_time,
						type: result.type || "third",
						study: result.study
					},
					0,
					"logout success..."
				));
			}
		} catch (e) {
			xU.applog.error(e.message);
			return (ctx.body = xU.resReturn(null, 401, e.message));
		}
	}

	// 处理第三方登录
	async handleThirdLogin(email, username) {
		let user, data, passsalt;
		let userInst = xU.orm(ModelUser);

		try {
			user = await userInst.findByEmail(email);

			// 新建用户信息
			if (!user || !user._id) {
				passsalt = xU.randStr();
				data = {
					username: username,
					password: xU.generatePassword(passsalt, passsalt),
					email: email,
					passsalt: passsalt,
					role: "member",
					add_time: xU.time(),
					up_time: xU.time(),
					type: "third"
				};
				user = await userInst.save(data);
				await this.handlePrivateGroup(user._id, username, email);
				xU.sendMail({
					to: email,
					contents: `<h3>亲爱的用户：</h3><p>您好，感谢使用YApi平台，你的邮箱账号是：${email}</p>`
				});
			}

			return true;
		} catch (e) {
			console.error("third_login:", e.message); // eslint-disable-line
			throw new Error(`third_login: ${e.message}`);
		}
	}

	/**
	 * 修改用户密码
	 * @interface /user/change_password
	 * @method POST
	 * @category user
	 * @param {Number} uid 用户ID
	 * @param {Number} [old_password] 旧密码, 非admin用户必须传
	 * @param {Number} password 新密码
	 * @return {Object}
	 * @example ./api/user/change_password.json
	 */
	async changePassword(ctx) {
		let params = ctx.request.body;
		let userInst = xU.orm(ModelUser);

		if (!params.uid) {
			return (ctx.body = xU.resReturn(null, 400, "uid不能为空"));
		}

		if (!params.password) {
			return (ctx.body = xU.resReturn(null, 400, "密码不能为空"));
		}

		let user = await userInst.findById(params.uid);
		if (this.getRole() !== "admin" && params.uid != this.getUid()) {
			return (ctx.body = xU.resReturn(null, 402, "没有权限"));
		}

		if (this.getRole() !== "admin" || user.role === "admin") {
			if (!params.old_password) {
				return (ctx.body = xU.resReturn(null, 400, "旧密码不能为空"));
			}

			if (
				xU.generatePassword(params.old_password, user.passsalt) !==
				user.password
			) {
				return (ctx.body = xU.resReturn(null, 402, "旧密码错误"));
			}
		}

		let passsalt = xU.randStr();
		let data = {
			up_time: xU.time(),
			password: xU.generatePassword(params.password, passsalt),
			passsalt: passsalt
		};
		try {
			let result = await userInst.update(params.uid, data);
			ctx.body = xU.resReturn(result);
		} catch (e) {
			ctx.body = xU.resReturn(null, 401, e.message);
		}
	}

	async handlePrivateGroup(uid) {
		var groupInst = xU.orm(ModelGroup);
		await groupInst.save({
			uid: uid,
			group_name: "User-" + uid,
			add_time: xU.time(),
			up_time: xU.time(),
			type: "private"
		});
	}

	/**
	 * 用户注册接口
	 * @interface /user/reg
	 * @method POST
	 * @category user
	 * @foldnumber 10
	 * @param {String} email email名称，不能为空
	 * @param  {String} password 密码，不能为空
	 * @param {String} [username] 用户名
	 * @returns {Object}
	 * @example ./api/user/login.json
	 */
	async reg(ctx) {
		//注册
		if (WEBCONFIG.closeRegister) {
			return (ctx.body = xU.resReturn(null, 400, "禁止注册，请联系管理员"));
		}
		let userInst = xU.orm(ModelUser);
		let params = ctx.request.body; //获取请求的参数,检查是否存在用户名和密码

		params = xU.handleParams(params, {
			username: "string",
			password: "string",
			email: "string"
		});

		if (!params.email) {
			return (ctx.body = xU.resReturn(null, 400, "邮箱不能为空"));
		}

		if (!params.password) {
			return (ctx.body = xU.resReturn(null, 400, "密码不能为空"));
		}

		let checkRepeat = await userInst.checkRepeat(params.email); //然后检查是否已经存在该用户

		if (checkRepeat > 0) {
			return (ctx.body = xU.resReturn(null, 401, "该email已经注册"));
		}

		let passsalt = xU.randStr();
		let data = {
			username: params.username,
			password: xU.generatePassword(params.password, passsalt), //加密
			email: params.email,
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
			ctx.body = xU.resReturn({
				uid: user._id,
				email: user.email,
				username: user.username,
				add_time: user.add_time,
				up_time: user.up_time,
				role: "member",
				type: user.type,
				study: false
			});
			xU.sendMail({
				to: user.email,
				contents: `<h3>亲爱的用户：</h3><p>您好，感谢使用YApi可视化接口平台,您的账号 ${params.email} 已经注册成功</p>`
			});
		} catch (e) {
			ctx.body = xU.resReturn(null, 401, e.message);
		}
	}

	/**
	 * 获取用户列表
	 * @interface /user/list
	 * @method GET
	 * @category user
	 * @foldnumber 10
	 * @param {Number} [page] 分页页码
	 * @param {Number} [limit] 分页大小,默认为10条
	 * @returns {Object}
	 * @example
	 */
	async list(ctx) {
		let page = ctx.request.query.page || 1,
			limit = ctx.request.query.limit || 10;

		const userInst = xU.orm(ModelUser);
		try {
			let user = await userInst.listWithPaging(page, limit);
			let count = await userInst.listCount();
			return (ctx.body = xU.resReturn({
				count: count,
				total: Math.ceil(count / limit),
				list: user
			}));
		} catch (e) {
			return (ctx.body = xU.resReturn(null, 402, e.message));
		}
	}

	/**
	 * 获取用户个人信息
	 * @interface /user/find
	 * @method GET
	 * @param id 用户uid
	 * @category user
	 * @foldnumber 10
	 * @returns {Object}
	 * @example
	 */
	async findById(ctx) {
		//根据id获取用户信息
		try {
			let userInst = xU.orm(ModelUser);
			let id = ctx.request.query.id;

			if (!id) {
				return (ctx.body = xU.resReturn(null, 400, "uid不能为空"));
			}

			let result = await userInst.findById(id);

			if (!result) {
				return (ctx.body = xU.resReturn(null, 402, "不存在的用户"));
			}

			return (ctx.body = xU.resReturn({
				uid: result._id,
				username: result.username,
				email: result.email,
				role: result.role,
				type: result.type,
				add_time: result.add_time,
				up_time: result.up_time
			}));
		} catch (e) {
			return (ctx.body = xU.resReturn(null, 402, e.message));
		}
	}

	/**
	 * 删除用户,只有admin用户才有此权限
	 * @interface /user/del
	 * @method POST
	 * @param id 用户uid
	 * @category user
	 * @foldnumber 10
	 * @returns {Object}
	 * @example
	 */
	async del(ctx) {
		//根据id删除一个用户
		try {
			if (this.getRole() !== "admin") {
				return (ctx.body = xU.resReturn(null, 402, "Without permission."));
			}

			let userInst = xU.orm(ModelUser);
			let id = ctx.request.body.id;
			if (id == this.getUid()) {
				return (ctx.body = xU.resReturn(null, 403, "禁止删除管理员"));
			}
			if (!id) {
				return (ctx.body = xU.resReturn(null, 400, "uid不能为空"));
			}

			let result = await userInst.del(id);

			ctx.body = xU.resReturn(result);
		} catch (e) {
			ctx.body = xU.resReturn(null, 402, e.message);
		}
	}

	/**
	 * 更新用户个人信息
	 * @interface /user/update
	 * @method POST
	 * @param uid  用户uid
	 * @param [role] 用户角色,只有管理员有权限修改
	 * @param [username] String
	 * @param [email] String
	 * @category user
	 * @foldnumber 10
	 * @returns {Object}
	 * @example
	 */
	async update(ctx) {
		//更新用户信息
		try {
			let params = ctx.request.body;

			params = xU.handleParams(params, {
				username: "string",
				email: "string"
			});

			if (this.getRole() !== "admin" && params.uid != this.getUid()) {
				return (ctx.body = xU.resReturn(null, 401, "没有权限"));
			}

			let userInst = xU.orm(ModelUser);
			let id = params.uid;

			if (!id) {
				return (ctx.body = xU.resReturn(null, 400, "uid不能为空"));
			}

			let userData = await userInst.findById(id);
			if (!userData) {
				return (ctx.body = xU.resReturn(null, 400, "uid不存在"));
			}

			let data = {
				up_time: xU.time()
			};

			params.username && (data.username = params.username);
			params.email && (data.email = params.email);

			if (data.email) {
				var checkRepeat = await userInst.checkRepeat(data.email); //然后检查是否已经存在该用户
				if (checkRepeat > 0) {
					return (ctx.body = xU.resReturn(null, 401, "该email已经注册"));
				}
			}

			let member = {
				uid: id,
				username: data.username || userData.username,
				email: data.email || userData.email
			};
			let groupInst = xU.orm(ModelGroup);
			await groupInst.updateMember(member);
			let projectInst = xU.orm(ModelProject);
			await projectInst.updateMember(member);

			let result = await userInst.update(id, data);
			ctx.body = xU.resReturn(result);
		} catch (e) {
			ctx.body = xU.resReturn(null, 402, e.message);
		}
	}

	/**
	 * 上传用户头像
	 * @interface /user/upload_avatar
	 * @method POST
	 * @param {*} basecode  base64编码，通过h5 api传给后端
	 * @category user
	 * @returns {Object}
	 * @example
	 */

	async uploadAvatar(ctx) {
		try {
			let basecode = ctx.request.body.basecode;
			if (!basecode) {
				return (ctx.body = xU.resReturn(null, 400, "basecode不能为空"));
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
				return (ctx.body = xU.resReturn(
					null,
					400,
					"仅支持jpeg和png格式的图片"
				));
			}
			let strLength = basecode.length;
			if (parseInt(strLength - (strLength / 8) * 2) > 200000) {
				return (ctx.body = xU.resReturn(null, 400, "图片大小不能超过200kb"));
			}

			let avatarInst = xU.orm(avatarModel);
			let result = await avatarInst.up(this.getUid(), basecode, type);
			ctx.body = xU.resReturn(result);
		} catch (e) {
			ctx.body = xU.resReturn(null, 401, e.message);
		}
	}

	/**
	 * 根据用户uid头像
	 * @interface /user/avatar
	 * @method GET
	 * @param {*} uid
	 * @category user
	 * @returns {Object}
	 * @example
	 */
	async avatar(ctx) {
		try {
			let uid = ctx.query.uid ? ctx.query.uid : this.getUid();
			let avatarInst = xU.orm(avatarModel);
			let data = await avatarInst.get(uid);
			let dataBuffer, type;
			if (!data || !data.basecode) {
				dataBuffer = xU.fs.readFileSync(
					xU.path.join(xU.var.WEBROOT, "static/image/avatar.png")
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

	/**
	 * 模糊搜索用户名或者email
	 * @interface /user/search
	 * @method GET
	 * @category user
	 * @foldnumber 10
	 * @param {String} q
	 * @return {Object}
	 * @example ./api/user/search.json
	 */
	async search(ctx) {
		const { q } = ctx.request.query;

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

		if (!q) {
			let queryList = await this.modelUser.list();
			let filteredRes = xU.filterRes(queryList, rules);
			return (ctx.body = xU.resReturn(filteredRes, 0, "ok"));
		}

		if (!xU.validateSearchKeyword(q)) {
			return (ctx.body = xU.resReturn(void 0, 400, "Bad query."));
		}

		let queryList = await this.modelUser.search(q);

		let filteredRes = xU.filterRes(queryList, rules);

		return (ctx.body = xU.resReturn(filteredRes, 0, "ok"));
	}

	/**
	 * 根据路由id初始化项目数据
	 * @interface /user/project
	 * @method GET
	 * @category user
	 * @foldnumber 10
	 * @param {String} type 可选group|interface|project
	 * @param {Number} id
	 * @return {Object}
	 * @example
	 */
	async project(ctx) {
		let { id, type } = ctx.request.query;
		let result = {};
		try {
			if (type === "interface") {
				let interfaceInst = xU.orm(ModelInterface);
				let interfaceData = await interfaceInst.get(id);
				result.interface = interfaceData;
				type = "project";
				id = interfaceData.project_id;
			}

			if (type === "project") {
				let projectInst = xU.orm(ModelProject);
				let projectData = await projectInst.get(id);
				result.project = projectData.toObject();
				let ownerAuth = await this.checkAuth(id, "project", "danger"),
					devAuth;
				if (ownerAuth) {
					result.project.role = "owner";
				} else {
					devAuth = await this.checkAuth(id, "project", "site");
					if (devAuth) {
						result.project.role = "dev";
					} else {
						result.project.role = "member";
					}
				}
				type = "group";
				id = projectData.group_id;
			}

			if (type === "group") {
				let groupInst = xU.orm(ModelGroup);
				let groupData = await groupInst.get(id);
				result.group = groupData.toObject();
				let ownerAuth = await this.checkAuth(id, "group", "danger"),
					devAuth;
				if (ownerAuth) {
					result.group.role = "owner";
				} else {
					devAuth = await this.checkAuth(id, "group", "site");
					if (devAuth) {
						result.group.role = "dev";
					} else {
						result.group.role = "member";
					}
				}
			}

			return (ctx.body = xU.resReturn(result));
		} catch (e) {
			return (ctx.body = xU.resReturn(result, 422, e.message));
		}
	}
}

module.exports = userController;
