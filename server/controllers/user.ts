const ControllerBase = require("./base");
const { ldapQuery } = require("../utils/ldap");

class userController extends ControllerBase {
	constructor(ctx) {
		super(ctx);
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
		let userInst = orm.user; //创建user实体
		let data = {
			up_time: xU.time(),
			study: true
		};
		try {
			let result = await userInst.update(this.getUid(), data);
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 401, e.message);
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
			const emailPostfix = yapi_configs.ldapLogin.emailPostfix;

			const emailParams =
				ldapInfo[yapi_configs.ldapLogin.emailKey || "mail"] ||
				(emailPostfix ? emailPrefix + emailPostfix : email);
			const username =
				ldapInfo[yapi_configs.ldapLogin.usernameKey] || emailPrefix;

			let login = await this.handleThirdLogin(emailParams, username);

			if (login === true) {
				let userInst = orm.user; //创建user实体
				let result = await userInst.findByEmail(emailParams);
				return (ctx.body = xU.$response(
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
			return (ctx.body = xU.$response(null, 401, e.message));
		}
	}

	// 处理第三方登录
	async handleThirdLogin(email, username) {
		let user, data, passsalt;
		let userInst = orm.user;

		try {
			user = await userInst.findByEmail(email);

			// 新建用户信息
			if (!user || !user._id) {
				passsalt = xU.randStr();
				data = {
					username: username,
					password: xU.$saltIt(passsalt, passsalt),
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

		const userInst = orm.user;
		try {
			let user = await userInst.listWithPaging(page, limit);
			let count = await userInst.listCount();
			return (ctx.body = xU.$response({
				total: count,
				list: user
			}));
		} catch (e) {
			return (ctx.body = xU.$response(null, 402, e.message));
		}
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
				let interfaceInst = orm.interface;
				let interfaceData = await interfaceInst.get(id);
				result.interface = interfaceData;
				type = "project";
				id = interfaceData.project_id;
			}

			if (type === "project") {
				let projectData = await orm.project.get(id);
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
				let groupInst = orm.group;
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

			return (ctx.body = xU.$response(result));
		} catch (e) {
			return (ctx.body = xU.$response(result, 422, e.message));
		}
	}
}

module.exports = userController;
