const ModelProject = require("server/models/project");

const ControllerBase = require("./base");
const { getToken } = require("../utils/token");
const sha = require("sha.js");
const axios = require("axios").default;

class projectController extends ControllerBase {
	constructor(ctx) {
		super(ctx);
		this.model = orm.project;
		this.modelGroup = orm.group;
		this.ModelLog = orm.log;
		this.modelFollow = orm.follow;
		this.tokenModel = orm.token;
		this.modelInterface = orm.interface;

		const id = "number";
		const member_uid = ["number"];
		const name = {
			type: "string",
			minLength: 1
		};
		const role = {
			type: "string",
			enum: ["owner", "dev", "guest"]
		};
		const basepath = {
			type: "string",
			default: ""
		};
		const group_id = "number";
		const group_name = "string";
		const project_type = {
			type: "string",
			enum: ["private", "public"],
			default: "private"
		};
		const desc = "string";
		const icon = "string";
		const color = "string";
		const env = "array";

		const cat = "array";
		this.schemaMap = {
			add: {
				"*name": name,
				basepath: basepath,
				"*group_id": group_id,
				group_name,
				desc: desc,
				color,
				icon,
				project_type
			},
			copy: {
				"*name": name,
				preName: name,
				basepath: basepath,
				"*group_id": group_id,
				_id: id,
				cat,
				pre_script: desc,
				after_script: desc,
				env,
				group_name,
				desc,
				color,
				icon,
				project_type
			},
			addMember: {
				"*id": id,
				"*member_uids": member_uid,
				role: role
			},
			delMember: {
				"*id": id,
				"*member_uid": id
			},
			getMemberList: {
				"*id": id
			},
			get: {
				id: id,
				project_id: id
			},
			list: {
				"*group_id": group_id
			},
			del: {
				"*id": id
			},
			changeMemberRole: {
				"*id": id,
				"*member_uid": id,
				role
			},
			token: {
				"*project_id": id
			},
			updateToken: {
				"*project_id": id
			}
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

	verifyDomain(domain) {
		if (!domain) {
			return false;
		}
		if (/^[a-zA-Z0-9\-_\.]+?\.[a-zA-Z0-9\-_\.]*?[a-zA-Z]{2,6}$/.test(domain)) {
			return true;
		}
		return false;
	}
	/**
	 * 获取项目成员列表
	 * @interface /project/get_member_list
	 * @method GET
	 * @category project
	 * @foldnumber 10
	 * @param {Number} id 项目id，不能为空
	 * @return {Object}
	 * @example ./api/project/get_member_list.json
	 */

	async getMemberList(ctx) {
		let params = ctx.params;
		if (!params.id) {
			return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
		}

		let project = await this.model.get(params.id);
		ctx.body = xU.$response(project.members);
	}

	/**
	 * 获取项目信息
	 * @interface /project/get
	 * @method GET
	 * @category project
	 * @foldnumber 10
	 * @param {Number} id 项目id，不能为空
	 * @returns {Object}
	 * @example ./api/project/get.json
	 */

	async get(ctx) {
		let params = ctx.params;
		let project_id = params.id || params.project_id; // 通过 token 访问
		let result = await this.model.getBaseInfo(project_id);

		if (!result) {
			return (ctx.body = xU.$response(null, 400, "不存在的项目"));
		}
		if (result.project_type === "private") {
			if ((await this.checkAuth(result._id, "project", "view")) !== true) {
				return (ctx.body = xU.$response(null, 406, "没有权限"));
			}
		}
		result = result.toObject();
		let catInst = orm.interfaceCategory;
		let cat = await catInst.list(params.id);
		result.cat = cat;
		if (result.env.length === 0) {
			result.env.push({ name: "local", domain: "http://127.0.0.1" });
		}
		result.role = await this.getProjectRole(params.id, "project");

		xU.emitHook("project_get", result).then();
		ctx.body = xU.$response(result);
	}

	/**
	 * 修改项目成员是否收到邮件通知
	 * @interface /project/change_member_email_notice
	 * @method POST
	 * @category project
	 * @foldnumber 10
	 * @param {String} id 项目id
	 * @param {String} member_uid 项目成员uid
	 * @param {String} role 权限 ['owner'|'dev']
	 * @returns {Object}
	 * @example
	 */
	async changeMemberEmailNotice(ctx) {
		try {
			let params = ctx.request.body;

			var check = await orm.project.checkMemberRepeat(
				params.id,
				params.member_uid
			);
			if (check === 0) {
				return (ctx.body = xU.$response(null, 400, "项目成员不存在"));
			}

			let result = await orm.project.changeMemberEmailNotice(
				params.id,
				params.member_uid,
				params.notice
			);
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 项目头像设置
	 * @interface /project/upset
	 * @method POST
	 * @category project
	 * @foldnumber 10
	 * @param {Number} id 项目id，不能为空
	 * @param {String} icon 项目icon
	 * @param {Array} color 项目color
	 * @returns {Object}
	 * @example ./api/project/upset
	 */
	async upSet(ctx) {
		let id = ctx.request.body.id;
		let data = {};
		if ((await this.checkAuth(id, "project", "danger")) !== true) {
			return (ctx.body = xU.$response(null, 405, "没有权限"));
		}
		data.color = ctx.request.body.color;
		data.icon = ctx.request.body.icon;
		if (!id) {
			return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
		}
		try {
			let result = await this.model.up(id, data);
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
		try {
			this.modelFollow.updateById(this.getUid(), id, data).then(() => {
				let username = this.getUsername();
				xU.saveLog({
					content: `<a href="/user/profile/${this.getUid()}">${username}</a> 修改了项目图标、颜色`,
					type: "project",
					uid: this.getUid(),
					username: username,
					typeid: id
				});
			});
		} catch (e) {
			xU.applog.error(e); // eslint-disable-line
		}
	}

	/**
	 * 编辑项目
	 * @interface /project/up_env
	 * @method POST
	 * @category project
	 * @foldnumber 10
	 * @param {Number} id 项目id，不能为空
	 * @param {Array} [env] 项目环境配置
	 * @param {String} [env[].name] 环境名称
	 * @param {String} [env[].domain] 环境域名
	 * @param {Array}  [env[].header] header
	 * @returns {Object}
	 * @example
	 */
	async upEnv(ctx) {
		try {
			let id = ctx.request.body.id;
			let params = ctx.request.body;
			if (!id) {
				return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
			}

			if ((await this.checkAuth(id, "project", "edit")) !== true) {
				return (ctx.body = xU.$response(null, 405, "没有权限"));
			}

			if (!params.env || !Array.isArray(params.env)) {
				return (ctx.body = xU.$response(null, 405, "env参数格式有误"));
			}

			let projectData = await this.model.get(id);
			let data = {
				up_time: xU.time()
			};

			data.env = params.env;
			let isRepeat = this.arrRepeat(data.env, "name");
			if (isRepeat) {
				return (ctx.body = xU.$response(null, 405, "环境变量名重复"));
			}
			let result = await this.model.up(id, data);
			let username = this.getUsername();
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${
					projectData.name
				}</a> 的环境`,
				type: "project",
				uid: this.getUid(),
				username: username,
				typeid: id
			});
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 编辑项目
	 * @interface /project/up_tag
	 * @method POST
	 * @category project
	 * @foldnumber 10
	 * @param {Number} id 项目id，不能为空
	 * @param {Array} [tag] 项目tag配置
	 * @param {String} [tag[].name] tag名称
	 * @param {String} [tag[].desc] tag描述
	 * @returns {Object}
	 * @example
	 */
	async upTag(ctx) {
		try {
			let id = ctx.request.body.id;
			let params = ctx.request.body;
			if (!id) {
				return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
			}

			if ((await this.checkAuth(id, "project", "edit")) !== true) {
				return (ctx.body = xU.$response(null, 405, "没有权限"));
			}

			if (!params.tag || !Array.isArray(params.tag)) {
				return (ctx.body = xU.$response(null, 405, "tag参数格式有误"));
			}

			let projectData = await this.model.get(id);
			let data = {
				up_time: xU.time()
			};
			data.tag = params.tag;

			let result = await this.model.up(id, data);
			let username = this.getUsername();
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${
					projectData.name
				}</a> 的tag`,
				type: "project",
				uid: this.getUid(),
				username: username,
				typeid: id
			});
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
   * 获取项目的环境变量值
   * @interface /project/get_env
   * @method GET
   * @category project
   * @foldnumber 10
   * @param {Number} id 项目id，不能为空

   * @returns {Object}
   * @example
   */
	async getEnv(ctx) {
		try {
			// console.log(ctx.request.query.project_id)
			let project_id = ctx.request.query.project_id;
			// let params = ctx.request.body;
			if (!project_id) {
				return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
			}

			// 去掉权限判断
			// if ((await this.checkAuth(project_id, 'project', 'edit')) !== true) {
			//   return (ctx.body = xU.$response(null, 405, '没有权限'));
			// }

			let env = await this.model.getByEnv(project_id);

			ctx.body = xU.$response(env);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	arrRepeat(arr, key) {
		const s = new Set();
		arr.forEach(item => s.add(item[key]));
		return s.size !== arr.length;
	}

	/**
	 * 获取token数据
	 * @interface /project/token
	 * @method GET
	 * @category project
	 * @foldnumber 10
	 * @param {Number} id 项目id，不能为空
	 * @param {String} q
	 * @return {Object}
	 */
	async token(ctx) {
		try {
			let project_id = ctx.params.project_id;
			let data = await this.tokenModel.get(project_id);
			let token;
			if (!data) {
				let passsalt = xU.randStr();
				token = sha("sha1").update(passsalt).digest("hex").substr(0, 20);

				await this.tokenModel.save({ project_id, token });
			} else {
				token = data.token;
			}

			token = getToken(token, this.getUid());

			ctx.body = xU.$response(token);
		} catch (err) {
			ctx.body = xU.$response(null, 402, err.message);
		}
	}

	/**
	 * 更新token数据
	 * @interface /project/update_token
	 * @method GET
	 * @category project
	 * @foldnumber 10
	 * @param {Number} id 项目id，不能为空
	 * @param {String} q
	 * @return {Object}
	 */
	async updateToken(ctx) {
		try {
			let project_id = ctx.params.project_id;
			let data = await this.tokenModel.get(project_id);
			let token, result;
			if (data && data.token) {
				let passsalt = xU.randStr();
				token = sha("sha1").update(passsalt).digest("hex").substr(0, 20);
				result = await this.tokenModel.up(project_id, token);
				token = getToken(token);
				result.token = token;
			} else {
				ctx.body = xU.$response(null, 402, "没有查到token信息");
			}

			ctx.body = xU.$response(result);
		} catch (err) {
			ctx.body = xU.$response(null, 402, err.message);
		}
	}

	/**
	 * 模糊搜索项目名称或者分组名称或接口名称
	 * @interface /project/search
	 * @method GET
	 * @category project
	 * @foldnumber 10
	 * @param {String} q
	 * @return {Object}
	 * @example ./api/project/search.json
	 */
	async search(ctx) {
		const { q } = ctx.request.query;

		if (!q) {
			return (ctx.body = xU.$response(void 0, 400, "No keyword."));
		}

		if (!xU.validateSearchKeyword(q)) {
			return (ctx.body = xU.$response(void 0, 400, "Bad query."));
		}

		let projectList = await this.model.search(q);
		let groupList = await this.modelGroup.search(q);
		let interfaceList = await this.modelInterface.search(q);

		let projectRules = [
			"_id",
			"name",
			"basepath",
			"uid",
			"env",
			"members",
			{ key: "group_id", alias: "groupId" },
			{ key: "up_time", alias: "upTime" },
			{ key: "add_time", alias: "addTime" }
		];
		let groupRules = [
			"_id",
			"uid",
			{ key: "group_name", alias: "groupName" },
			{ key: "group_desc", alias: "groupDesc" },
			{ key: "add_time", alias: "addTime" },
			{ key: "up_time", alias: "upTime" }
		];
		let interfaceRules = [
			"_id",
			"uid",
			{ key: "title", alias: "title" },
			{ key: "project_id", alias: "project_id" },
			{ key: "add_time", alias: "addTime" },
			{ key: "up_time", alias: "upTime" }
		];

		projectList = xU.filterRes(projectList, projectRules);
		groupList = xU.filterRes(groupList, groupRules);
		interfaceList = xU.filterRes(interfaceList, interfaceRules);
		let queryList = {
			project: projectList,
			group: groupList,
			interface: interfaceList
		};

		return (ctx.body = xU.$response(queryList, 0, "ok"));
	}
}

module.exports = projectController;
