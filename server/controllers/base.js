const modelProject = require("../models/project");
const { ModelUser } = require("../models/user");
const interfaceModel = require("../models/interface");
const ModelGroup = require("../models/group");
const tokenModel = require("../models/token");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { parseToken } = require("../utils/token");
const { customCookies } = require("../utils/customCookies");

class ControllerBase {
	constructor(ctx) {
		this.ctx = ctx;
		ctx.$instance = this;
		//网站上线后，role对象key是不能修改的，value可以修改
		this.roles = {
			admin: "Admin",
			member: "网站会员"
		};
	}

	handleBasepath(basepath) {
		if (!basepath) {
			return "";
		}
		if (basepath === "/") {
			return "";
		}
		if (basepath[0] !== "/") {
			basepath = "/" + basepath;
		}
		if (basepath[basepath.length - 1] === "/") {
			basepath = basepath.substr(0, basepath.length - 1);
		}
		if (!/^\/[a-zA-Z0-9\-\/\._]+$/.test(basepath)) {
			return false;
		}
		return basepath;
	}

	async init(ctx) {
		this.$user = null;
		this.tokenModel = xU.orm(tokenModel);
		this.modelProject = xU.orm(modelProject);
		let ignoreRouter = [
			"/api/user/login_by_token",
			"/api/user/login",
			"/api/user/reg",
			"/api/user/logout",
			"/api/user/avatar",
			"/api/user/login_by_ldap"
		];
		if (ignoreRouter.indexOf(ctx.path) > -1) {
			this.$auth = true;
		} else {
			await this.checkLogin(ctx);
		}

		let openApiRouter = [
			"/api/open/run_auto_test",
			"/api/open/import_data",
			"/api/interface/add",
			"/api/interface/save",
			"/api/interface/up",
			"/api/interface/get",
			"/api/interface/list",
			"/api/interface/list_menu",
			"/api/interface/add_cat",
			"/api/interface/getCatMenu",
			"/api/interface/list_cat",
			"/api/project/get",
			"/api/plugin/export",
			"/api/project/up",
			"/api/plugin/exportSwagger"
		];

		let params = Object.assign({}, ctx.query, ctx.request.body);
		let token = params.token;

		if (!token) {
			token = customCookies(ctx, "_yapi_token");
		}

		// 如果前缀是 /api/open，执行 parse token 逻辑
		if (
			token &&
			(openApiRouter.indexOf(ctx.path) > -1 ||
				ctx.path.indexOf("/api/open/") === 0)
		) {
			let tokens = parseToken(token);

			const oldTokenUid = "999999";

			let tokenUid = oldTokenUid;

			if (!tokens) {
				let checkId = await this.getProjectIdByToken(token);
				if (!checkId) return;
			} else {
				token = tokens.projectToken;
				tokenUid = tokens.uid;
			}

			let checkId = await this.getProjectIdByToken(token);
			if (!checkId) {
				ctx.body = xU.resReturn(null, 42014, "token 无效");
			}
			let projectData = await this.modelProject.get(checkId);
			if (projectData) {
				ctx.query.pid = checkId; // 兼容：/api/plugin/export
				ctx.params.project_id = checkId;
				this.$tokenAuth = true;
				this.$uid = tokenUid;
				let result;
				if (tokenUid === oldTokenUid) {
					result = {
						_id: tokenUid,
						role: "member",
						username: "system"
					};
				} else {
					let userInst = xU.orm(ModelUser); //创建user实体
					result = await userInst.findById(tokenUid);
				}

				this.$user = result;
				this.$auth = true;
			}
		}
	}
	async checkLogin(ctx) {
		let token = customCookies(ctx, "_yapi_token");
		let uid = customCookies(ctx, "_yapi_uid");

		try {
			/* 未携带认证信息 */
			if (!token || !uid) {
				xU.applog.info("未携带认证信息");
				return false;
			}
			let userDBCollection = xU.orm(ModelUser); //创建user实体
			let currUserInfo = await userDBCollection.findById(uid);
			/* 用户不存在 */
			if (!currUserInfo) {
				xU.applog.info("用户不存在");
				return false;
			}

			const { passsalt } = currUserInfo;
			console.log(
				"🚀 ~ file: base.js:56 ~ ControllerBase ~ checkLogin ~ currUserInfo.passsalt:",
				currUserInfo.passsalt
			);

			let decoded;
			try {
				decoded = jwt.verify(token, passsalt);
			} catch (err) {
				xU.applog.info("JWT 信息不匹配");
				return false;
			}
			/* 身份验证 */
			if (decoded.uid == uid) {
				this.$uid = uid;
				this.$auth = true;
				this.$user = currUserInfo;
				xU.applog.info(`身份验证成功 ID: ${currUserInfo.id}`);
				return true;
			}
			return false;
		} catch (e) {
			xU.applog.error(e);
			return false;
		}
	}

	async getProjectIdByToken(token) {
		let projectId = await this.tokenModel.findId(token);
		if (projectId) {
			return projectId.toObject().project_id;
		}
	}

	getUid() {
		return parseInt(this.$uid, 10);
	}

	async checkRegister() {
		// console.log('config', WEBCONFIG);
		if (WEBCONFIG.closeRegister) {
			return false;
		} else {
			return true;
		}
	}

	async checkLDAP() {
		// console.log('config', WEBCONFIG);
		if (!WEBCONFIG.ldapLogin) {
			return false;
		} else {
			return WEBCONFIG.ldapLogin.enable || false;
		}
	}
	/**
	 *
	 * @param {*} ctx
	 */

	async getLoginStatus(ctx) {
		let body;
		const isLogin = await this.checkLogin(ctx);
		if (isLogin) {
			let result = xU.fieldSelect(this.$user, [
				"_id",
				"username",
				"email",
				"up_time",
				"add_time",
				"role",
				"type",
				"study"
			]);
			body = xU.resReturn(result);
		} else {
			body = xU.resReturn(null, 40011, "请登录...");
		}

		body.ladp = await this.checkLDAP();
		body.canRegister = await this.checkRegister();
		ctx.body = body;
	}

	getRole() {
		return this.$user.role;
	}

	getUsername() {
		return this.$user.username;
	}

	getEmail() {
		return this.$user.email;
	}

	async getProjectRole(id, type) {
		let result = {};
		try {
			if (this.getRole() === "admin") {
				return "admin";
			}
			if (type === "interface") {
				let interfaceInst = xU.orm(interfaceModel);
				let interfaceData = await interfaceInst.get(id);
				result.interfaceData = interfaceData;
				// 项目创建者相当于 owner
				if (interfaceData.uid === this.getUid()) {
					return "owner";
				}
				type = "project";
				id = interfaceData.project_id;
			}

			if (type === "project") {
				let projectInst = xU.orm(modelProject);
				let projectData = await projectInst.get(id);
				if (projectData.uid === this.getUid()) {
					// 建立项目的人
					return "owner";
				}
				let memberData = _.find(projectData.members, m => {
					if (m && m.uid === this.getUid()) {
						return true;
					}
				});

				if (memberData && memberData.role) {
					if (memberData.role === "owner") {
						return "owner";
					} else if (memberData.role === "dev") {
						return "dev";
					} else {
						return "guest";
					}
				}
				type = "group";
				id = projectData.group_id;
			}

			if (type === "group") {
				let groupInst = xU.orm(ModelGroup);
				let groupData = await groupInst.get(id);

				// 建立分组的人
				if (groupData.uid === this.getUid()) {
					return "owner";
				}

				let groupMemberData = _.find(groupData.members, m => {
					if (m.uid === this.getUid()) {
						return true;
					}
				});
				if (groupMemberData && groupMemberData.role) {
					if (groupMemberData.role === "owner") {
						return "owner";
					} else if (groupMemberData.role === "dev") {
						return "dev";
					} else {
						return "guest";
					}
				}
			}

			return "member";
		} catch (e) {
			xU.applog.error(e);
			return false;
		}
	}
	/**
	 * 身份验证
	 * @param {*} id type对应的id
	 * @param {*} type enum[interface, project, group]
	 * @param {*} action enum[ danger, edit, view ] danger只有owner或管理员才能操作,edit只要是dev或以上就能执行
	 */
	async checkAuth(id, type, action) {
		let role = await this.getProjectRole(id, type);

		if (action === "danger") {
			if (role === "admin" || role === "owner") {
				return true;
			}
		} else if (action === "edit") {
			if (role === "admin" || role === "owner" || role === "dev") {
				return true;
			}
		} else if (action === "view") {
			if (
				role === "admin" ||
				role === "owner" ||
				role === "dev" ||
				role === "guest"
			) {
				return true;
			}
		}
		return false;
	}
}

module.exports = ControllerBase;
