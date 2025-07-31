const ModelGroup = require("server/models/group");
const ModelProject = require("server/models/project");

async function getMineGroup(ctx) {
	var groupInst = orm.group;

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
		let groupByProject = await orm.project.getAuthList(this.getUid());
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
					query: {
						id: {
							required: true,
							description: "项目分组ID",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { id: groupId } = ctx.payload;
					let groupInst = orm.group;
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
		"/group/add": {
			/*  */
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
							description: "分组描述"
						},
						owner_uids: {
							required: true,
							description: "分组拥有者uids",
							type: "array"
						}
					}
				},
				async handler(ctx) {
					let { owner_uids, group_desc, group_name } = ctx.payload;

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

					let groupInst = orm.group;

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
					xU.save_log({
						content: `<a href="/user/profile/${this.getUid()}"> ${username} </a> 新增了分组 <a href="/group/${
							result._id
						}"> ${group_name} </a>`,
						type: "group",
						uid: this.getUid(),
						username: username,
						typeid: result._id
					});
					ctx.body = xU.$response(result);
				}
			}
		},
		/* 更新项目分组 */
		"/group/up": {
			post: {
				summary: "更新项目分组",
				description: "更新项目分组",
				request: {
					body: {
						group_id: {
							required: true,
							description: "分组ID",
							type: "number"
						},
						group_name: {
							required: true,
							description: "分组名称",
							type: "string"
						},
						group_desc: {
							required: false,
							description: "分组描述"
						},
						custom_field1: {
							required: true,
							description: "分组描述",
							type: "object",
							properties: {
								enable: {
									type: "boolean",
									description: "是否启用自定义字段"
								},
								name: {
									type: "string",
									description: "自定义字段"
								}
							}
						}
					}
				},
				async handler(ctx) {
					let { group_id, group_name, group_desc, custom_field1 } = ctx.payload;

					if ((await this.checkAuth(group_id, "group", "danger")) !== true) {
						return (ctx.body = xU.$response(null, 405, "没有权限"));
					}

					let result = await orm.group.up(group_id, {
						group_name,
						group_desc,
						custom_field1
					});
					let username = this.getUsername();
					xU.save_log({
						content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了 <a href="/group/${group_id}">${group_name}</a> 分组`,
						type: "group",
						typeid: group_id,
						uid: this.getUid(),
						username: username
					});
					ctx.body = xU.$response(result);
				}
			}
		},
		"/group/del_member": {
			/*  */
			post: {
				summary: "删除分组成员",
				description: "删除分组成员",
				request: {
					body: {
						id: { required: true, description: "分组id", type: "number" },
						member_uid: {
							required: true,
							description: "分组成员uid",
							type: "number"
						}
					}
				},
				async handler(ctx) {
					let { id: groupId, member_uid } = ctx.payload;
					var check = await orm.group.checkMemberRepeat(groupId, member_uid);
					if (check === 0) {
						return (ctx.body = xU.$response(null, 400, "分组成员不存在"));
					}
					if ((await this.checkAuth(groupId, "group", "danger")) !== true) {
						return (ctx.body = xU.$response(null, 405, "没有权限"));
					}

					let result = await orm.group.delMember(groupId, member_uid);
					let username = this.getUsername();
					let groupUserdata = await xU.getUserdata(member_uid);
					xU.save_log({
						content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了分组成员 <a href="/user/profile/${member_uid}">${
							groupUserdata ? groupUserdata.username : ""
						}</a>`,
						type: "group",
						uid: this.getUid(),
						username: username,
						typeid: groupId
					});
					ctx.body = xU.$response(result);
				}
			}
		},
		/* 获取所有项目成员 */
		"/group/get_member_list": {
			get: {
				summary: "获取所有项目成员",
				description: "获取所有项目成员",
				request: {
					query: {
						id: {
							required: true,
							description: "项目分组ID",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { id } = ctx.payload;
					let group = await orm.group.get(id);
					ctx.body = xU.$response(group.members);
				}
			}
		}
	}
};
