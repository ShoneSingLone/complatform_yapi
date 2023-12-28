const ModelGroup = require("server/models/group");

const ControllerBase = require("./base");
const ModelProject = require("server/models/project");
const ModelUser = require("server/models/user");
const ModelInterface = require("server/models/interface");
const ModelInterfaceCase = require("server/models/interfaceCase");
const ModelInterfaceCol = require("server/models/interfaceCol");
const _ = require("lodash");

const ROLE_NAME = {
	owner: "组长",
	dev: "开发者",
	guest: "访客"
};

class groupController extends ControllerBase {
	constructor(ctx) {
		super(ctx);

		const id = "number";
		const group_name = {
			type: "string",
			minLength: 1
		};

		const group_desc = "string";
		const role = {
			type: "string",
			enum: ["owner", "dev", "guest"]
		};

		const member_uids = {
			type: "array",
			items: "number",
			minItems: 1
		};

		this.schemaMap = {
			get: {
				"*id": id
			},
			add: {
				"*group_name": group_name,
				group_desc: group_desc,
				owner_uids: ["number"]
			},
			addMember: {
				"*id": id,
				role: role,
				"*member_uids": member_uids
			},
			changeMemberRole: {
				"*member_uid": "number",
				"*id": id,
				role: role
			},
			getMemberList: {
				"*id": id
			},
			delMember: {
				"*id": id,
				"*member_uid": "number"
			},
			del: {
				"*id": id
			},
			up: {
				"*id": id,
				"*group_name": group_name,
				group_desc: group_desc,
				custom_field1: {
					name: "string",
					enable: "boolen"
				},
				custom_field2: {
					name: "string",
					enable: "boolen"
				},
				custom_field3: {
					name: "string",
					enable: "boolen"
				}
			}
		};
	}

	/**
	 * 获取用户数据
	 * @param uid
	 * @param role
	 * @returns {Promise.<*>}
	 */

	async getUserdata(uid, role) {
		role = role || "dev";
		let userInst = orm.user;
		let userData = await userInst.findById(uid);
		if (!userData) {
			return null;
		}
		return {
			_role: userData.role,
			role: role,
			uid: userData._id,
			username: userData.username,
			email: userData.email
		};
	}

	/**
	 * 添加项目分组成员
	 * @interface /group/add_member
	 * @method POST
	 * @category group
	 * @foldnumber 10
	 * @param {String} id 项目分组id
	 * @param {String} member_uids 项目分组成员[uid]
	 * @param {String} role 成员角色，owner or dev or guest
	 * @returns {Object}
	 * @example
	 */
	async addMember(ctx) {
		let params = ctx.params;

		params.role =
			["owner", "dev", "guest"].find(v => v === params.role) || "dev";
		let add_members = [];
		let exist_members = [];
		let no_members = [];
		for (let i = 0, len = params.member_uids.length; i < len; i++) {
			let id = params.member_uids[i];
			let check = await orm.group.checkMemberRepeat(params.id, id);
			let userdata = await xU.getUserdata(id, params.role);
			if (check > 0) {
				exist_members.push(userdata);
			} else if (!userdata) {
				no_members.push(id);
			} else {
				userdata.role !== "admin" && add_members.push(userdata);
				delete userdata._role;
			}
		}

		let result = await orm.group.addMember(params.id, add_members);
		let username = this.getUsername();
		if (add_members.length) {
			let members = add_members.map(item => {
				return `<a href = "/user/profile/${item.uid}">${item.username}</a>`;
			});
			members = members.join("、");
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 新增了分组成员 ${members} 为 ${
					ROLE_NAME[params.role]
				}`,
				type: "group",
				uid: this.getUid(),
				username: username,
				typeid: params.id
			});
		}
		ctx.body = xU.$response({
			result,
			add_members,
			exist_members,
			no_members
		});
	}

	/**
	 * 修改项目分组成员角色
	 * @interface /group/change_member_role
	 * @method POST
	 * @category group
	 * @foldnumber 10
	 * @param {String} id 项目分组id
	 * @param {String} member_uid 项目分组成员uid
	 * @param {String} role 权限 ['owner'|'dev']
	 * @returns {Object}
	 * @example
	 */
	async changeMemberRole(ctx) {
		let params = ctx.request.body;

		var check = await orm.group.checkMemberRepeat(params.id, params.member_uid);
		if (check === 0) {
			return (ctx.body = xU.$response(null, 400, "分组成员不存在"));
		}
		if ((await this.checkAuth(params.id, "group", "danger")) !== true) {
			return (ctx.body = xU.$response(null, 405, "没有权限"));
		}

		params.role =
			["owner", "dev", "guest"].find(v => v === params.role) || "dev";

		let result = await orm.group.changeMemberRole(
			params.id,
			params.member_uid,
			params.role
		);
		let username = this.getUsername();

		let groupUserdata = await xU.getUserdata(params.member_uid, params.role);
		xU.saveLog({
			content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更改了分组成员 <a href="/user/profile/${
				params.member_uid
			}">${groupUserdata ? groupUserdata.username : ""}</a> 的权限为 "${
				ROLE_NAME[params.role]
			}"`,
			type: "group",
			uid: this.getUid(),
			username: username,
			typeid: params.id
		});
		ctx.body = xU.$response(result);
	}

	/**
	 * 删除项目成员
	 * @interface /group/del_member
	 * @method POST
	 * @category group
	 * @foldnumber 10
	 * @param {String} id 项目分组id
	 * @param {String} member_uid 项目分组成员uid
	 * @returns {Object}
	 * @example
	 */

	async delMember(ctx) {
		let params = ctx.params;
		var check = await orm.group.checkMemberRepeat(params.id, params.member_uid);
		if (check === 0) {
			return (ctx.body = xU.$response(null, 400, "分组成员不存在"));
		}
		if ((await this.checkAuth(params.id, "group", "danger")) !== true) {
			return (ctx.body = xU.$response(null, 405, "没有权限"));
		}

		let result = await orm.group.delMember(params.id, params.member_uid);
		let username = this.getUsername();

		let groupUserdata = await xU.getUserdata(params.member_uid, params.role);
		xU.saveLog({
			content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了分组成员 <a href="/user/profile/${
				params.member_uid
			}">${groupUserdata ? groupUserdata.username : ""}</a>`,
			type: "group",
			uid: this.getUid(),
			username: username,
			typeid: params.id
		});
		ctx.body = xU.$response(result);
	}

	/**
	 * 获取项目分组列表
	 * @interface /group/list
	 * @method get
	 * @category group
	 * @foldnumber 10
	 * @returns {Object}
	 * @example ./api/group/list.json
	 */
	async list(ctx) {
		let privateGroup = await orm.group.getByPrivateUid(this.getUid());
		let newResult = [];

		/* 固定的个人中心，不可修改名称，如果不存在就添加 */
		if (!privateGroup) {
			privateGroup = await orm.group.save({
				uid: this.getUid(),
				group_name: "User-" + this.getUid(),
				add_time: xU.time(),
				up_time: xU.time(),
				type: "private"
			});
		}

		/* 可查看所有分组 */
		if (this.getRole() === "admin") {
			let result = await orm.group.list();
			if (result && result.length > 0) {
				for (let i = 0; i < result.length; i++) {
					result[i] = result[i].toObject();
					newResult.unshift(result[i]);
				}
			}
		} else {
			/* 只能查看自己参与的分组 */
			let result = await orm.group.getAuthList(this.getUid());
			if (result && result.length > 0) {
				for (let i = 0; i < result.length; i++) {
					result[i] = result[i].toObject();
					newResult.unshift(result[i]);
				}
			}

			const groupIds = newResult.map(item => item._id);
			const newGroupIds = [];

			/* 从项目里面直接加的人，但是没有在group中添加member， */
			let groupByProject = await orm.project.getAuthList(this.getUid());
			if (groupByProject && groupByProject.length > 0) {
				groupByProject.forEach(_data => {
					const _temp = [...groupIds, ...newGroupIds];
					/* 不在已确认的分组中则添加进来 */
					if (!_.find(_temp, id => id === _data.group_id)) {
						newGroupIds.push(_data.group_id);
					}
				});
			}
			/* 根据group_id获取group */
			let newData = await orm.group.findByGroups(newGroupIds);
			newData.forEach(_data => {
				_data = _data.toObject();
				newResult.push(_data);
			});
		}

		if (privateGroup) {
			privateGroup = privateGroup.toObject();
			privateGroup.group_name = "个人空间";
			privateGroup.role = "owner";
			newResult.unshift(privateGroup);
		}

		ctx.body = xU.$response(newResult);
	}

	/**
	 * 删除项目分组
	 * @interface /group/del
	 * @method post
	 * @param {String} id 项目分组id
	 * @category group
	 * @foldnumber 10
	 * @returns {Object}
	 * @example ./api/group/del.json
	 */
	async del(ctx) {
		if (this.getRole() !== "admin") {
			return (ctx.body = xU.$response(null, 401, "没有权限"));
		}

		let interfaceInst = orm.interface;
		let interfaceColInst = orm.interfaceCol;
		let interfaceCaseInst = orm.interfaceCase;
		let id = ctx.params.id;

		let projectList = await orm.project.list(id, true);
		projectList.forEach(async p => {
			await interfaceInst.delByProjectId(p._id);
			await interfaceCaseInst.delByProjectId(p._id);
			await interfaceColInst.delByProjectId(p._id);
		});
		if (projectList.length > 0) {
			await orm.project.delByGroupid(id);
		}

		let result = await orm.group.del(id);
		ctx.body = xU.$response(result);
	}

	/**
	 * 更新项目分组
	 * @interface /group/up
	 * @method post
	 * @param {String} id 项目分组id
	 * @param {String} group_name 项目分组名称
	 * @param {String} group_desc 项目分组描述
	 * @category group
	 * @foldnumber 10
	 * @returns {Object}
	 * @example ./api/group/up.json
	 */
	async up(ctx) {
		let params = ctx.params;

		if ((await this.checkAuth(params.id, "group", "danger")) !== true) {
			return (ctx.body = xU.$response(null, 405, "没有权限"));
		}

		let result = await orm.group.up(params.id, params);
		let username = this.getUsername();
		xU.saveLog({
			content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了 <a href="/group/${
				params.id
			}">${params.group_name}</a> 分组`,
			type: "group",
			uid: this.getUid(),
			username: username,
			typeid: params.id
		});
		ctx.body = xU.$response(result);
	}
}

module.exports = groupController;
