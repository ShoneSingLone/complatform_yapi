const { ModelGroup } = require("server/models/group");
const { ModelProject } = require("server/models/project");

async function getMineGroup(ctx) {
	var groupInst = xU.orm(ModelGroup);
	let projectInst = xU.orm(ModelProject);

	let privateGroup = await groupInst.getByPrivateUid(this.getUid());
	let newResult = [];

	/* 固定的个人中心，不可修改名称，如果不存在就添加 */
	if (!privateGroup) {
		privateGroup = await groupInst.save({
			uid: this.getUid(),
			group_name: "User-" + this.getUid(),
			add_time: xU.time(),
			up_time: xU.time(),
			type: "private"
		});
	}

	/* 可查看所有分组 */
	if (this.getRole() === "admin") {
		let result = await groupInst.list();
		if (result && result.length > 0) {
			for (let i = 0; i < result.length; i++) {
				result[i] = result[i].toObject();
				if (xU.isSame(result[i].uid, this.$uid)) {
					result[i].role = "owner";
				} else {
					result[i].role = "member";
				}
				newResult.unshift(result[i]);
			}
		}
	} else {
		/* 只能查看自己参与的分组 */
		let result = await groupInst.getAuthList(this.getUid());
		if (result && result.length > 0) {
			for (let i = 0; i < result.length; i++) {
				result[i] = result[i].toObject();
				if (xU.isSame(result[i].uid, this.$uid)) {
					result[i].role = "owner";
				} else {
					result[i].role = "member";
				}
				newResult.unshift(result[i]);
			}
		}

		const groupIds = newResult.map(item => item._id);
		const newGroupIds = [];

		/* 从项目里面直接加的人，但是没有在group中添加member， */
		let groupByProject = await projectInst.getAuthList(this.getUid());
		if (groupByProject && groupByProject.length > 0) {
			groupByProject.forEach(_data => {
				/* 不在已确认的分组中则添加进来 */
				if (![...groupIds, ...newGroupIds].includes(_data.group_id)) {
					newGroupIds.push(_data.group_id);
				}
			});
		}
		/* 根据group_id获取group */
		let newData = await groupInst.findByGroups(newGroupIds);
		newData.forEach(_data => {
			_data = _data.toObject();
			_data.notInGroup = true;
			newResult.push(_data);
		});
	}

	if (privateGroup) {
		privateGroup = privateGroup.toObject();
		privateGroup.group_name = "个人空间";
		privateGroup.role = "owner";
		privateGroup.privateSpace = true;
		newResult.unshift(privateGroup);
	}

	ctx.body = xU.$response(newResult);
}

module.exports = {
	definitions: {},
	tag: {
		description: "分组信息"
	},
	paths: {
		"/group/get_mygroup": {
			get: {
				deprecated: true,
				summary: "获取分组信息 原Yapi用的名字，我不喜欢",
				description:
					"不需要参数，获取当前登录用户能够访问的分组，个人空间，作为成员所在的分组，作为成员所在项目关联的分组",
				request: {},
				handler: getMineGroup
			}
		},
		"/group/mine": {
			get: {
				summary: "获取分组信息",
				description:
					"不需要参数，获取当前登录用户能够访问的分组，个人空间，作为成员所在的分组，作为成员所在项目关联的分组",
				request: {},
				handler: getMineGroup
			}
		},
		/* 通过ID获取group */
		"/group/get": {
			get: {
				summary: "通过ID获取分组信息",
				description: "通过ID获取分组信息",
				request: {
					body: {
						id: {
							required: true,
							description: "项目分组ID",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { id: groupId } = ctx.payload;
					let groupInst = xU.orm(ModelGroup);
					let result = {};
					result = await groupInst.getGroupById(groupId);
					if (result) {
						result = result.toObject();
					} else {
						result = {};
					}

					let role = await this.getProjectRole(groupId, "group");
					result.role = role;
					if (result.type === "private") {
						result.group_name = "个人空间";
					}
					ctx.body = xU.$response(result);

				}
			}
		},
		/* 添加项目分组 */
		"/group/add": {/*  */
			post: {
				summary: "添加项目分组",
				description: "添加项目分组",
				request: {
					body: {
						group_name: {
							required: true,
							description: "分组名称",
							type: "string"
						},
						group_desc: {
							required: false,
							description: "分组描述",
						},
						owner_uids: {
							required: true,
							description: "分组拥有者uids",
							type: "array"
						},
					}
				},
				async handler(ctx) {
					let { owner_uids,
						group_desc,
						group_name } = ctx.payload;

					// 新版每个人都有权限添加分组

					// if (this.getRole() !== 'admin') {
					//   return (ctx.body = xU.$response(null, 401, '没有权限'));
					// }

					let owners = [];

					if (owner_uids.length === 0) {
						owner_uids.push(this.getUid());
					}

					if (owner_uids) {
						for (let i = 0, len = owner_uids.length; i < len; i++) {
							let id = owner_uids[i];
							let groupUserdata = await xU.getUserdata(id, "owner");
							if (groupUserdata) {
								owners.push(groupUserdata);
							}
						}
					}

					let groupInst = xU.orm(ModelGroup);

					let count = await groupInst.count(group_name);

					if (count > 0) {
						return (ctx.body = xU.$response(null, 401, "项目分组名已存在"));
					}

					let data = {
						group_name: group_name,
						group_desc: group_desc,
						uid: this.getUid(),
						add_time: xU.time(),
						up_time: xU.time(),
						members: owners
					};

					let result = await groupInst.save(data);
					result = xU.fieldSelect(result, [
						"_id",
						"group_name",
						"group_desc",
						"uid",
						"members",
						"type"
					]);
					let username = this.getUsername();
					xU.saveLog({
						content: `<a href="/user/profile/${this.getUid()}">${username}</a> 新增了分组 <a href="/group/${result._id
							}">${group_name}</a>`,
						type: "group",
						uid: this.getUid(),
						username: username,
						typeid: result._id
					});
					ctx.body = xU.$response(result);
				}
			}
		}
	}
};
