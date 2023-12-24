const { ModelGroup } = require("server/models/group");
const { ModelProject } = require("server/models/project");



async function checkProjectName(name, groupId) {
	if (!name) {
		return "项目名不能为空";
	}
	let count = await xU.orm(ModelProject).checkNameRepeat(name, groupId);

	if (count > 0) {
		return "已存在的项目名";
	}
}


module.exports = {
	definitions: {},
	tag: {
		description: "项目信息"
	},
	paths: {
		"/project/up": {
			post: {
				summary: "更新项目配置",
				description: "",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id，不能为空",
							type: "number"
						},
						name: {
							required: true,
							description: "项目名称，不能为空",
							type: "string"
						},
						basepath: {
							required: true,
							description: "项目基本路径，不能为空",
							type: "string"
						},
						desc: { description: "项目描述", type: "string" }
					}
				},
				async handler(ctx) {
					try {
						let id = ctx.request.body.id;
						let params = ctx.payload;

						params = xU.ensureParamsType(params, {
							name: "string",
							basepath: "string",
							group_id: "number",
							desc: "string",
							pre_script: "string",
							after_script: "string",
							project_mock_script: "string"
						});

						if (!id) {
							return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
						}

						if ((await this.checkAuth(id, "project", "danger")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						let projectData = await xU.orm(ModelProject).get(id);

						if (basepath) {
							if (
								(basepath = this.handleBasepath(basepath)) ===
								false
							) {
								return (ctx.body = xU.$response(null, 401, "basepath格式有误"));
							}
						}

						if (projectData.name === name) {
							delete name;
						}

						if (name) {
							let count = await xU
								.orm(ModelProject)
								.checkNameRepeat(name, group_id);
							if (count > 0) {
								return (ctx.body = xU.$response(null, 401, "已存在的项目名"));
							}
						}

						let data = {
							up_time: xU.time()
						};

						data = Object.assign({}, data, params);

						let result = await xU.orm(ModelProject).up(id, data);
						let username = this.getUsername();
						xU.saveLog({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${projectData.name
								}</a>`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: id
						});
						xU.emitHook("project_up", result).then();
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/project/add": {
			post: {
				summary: "添加项目",
				description: "",
				request: {
					body: {
						name: { required: true, description: "项目名称，不能为空", type: "string" },
						basepath: { required: true, description: "项目基本路径，不能为空", type: "string" },
						group_id: { required: true, description: "项目分组id，不能为空", type: "string" },
						group_name: { required: true, description: "项目分组名称，不能为空", "type": "string", },
						project_type: { required: true, description: "项目类型", type: "string", "enum": ["private", "public"], "default": "public" },
						desc: { description: "描述", type: "string" }
					}
				},
				async handler(ctx) {

					let { name, basepath, group_id, group_name, project_type, desc, icon, color } = ctx.payload;

					if ((await this.checkAuth(group_id, "group", "edit")) !== true) {
						return (ctx.body = xU.$response(null, 405, "没有权限"));
					}

					let count = await checkProjectName(name, group_id);

					if (count) {
						return (ctx.body = xU.$response(null, 401, "已存在的项目名"));
					}

					basepath = basepath || "";

					if ((basepath = this.handleBasepath(basepath)) === false) {
						return (ctx.body = xU.$response(null, 401, "basepath格式有误"));
					}

					const requestCode = function ({
						title,
						projectId,
						interfaceId,
						path,
						method,
						xU
					}) {
						return `\`\`\`js
/**
*  ${title}
*  ${window.location.href}
*  http://10.143.133.216:3001/project/${projectId}/interface/api/${interfaceId}
*/
async ${xU.camelCase(path)}({params,data}) {
return await request({
method: "${method}",
url: \`${path}\`,
params:params||{},
data:data||{}
});
}
\`\`\`
`;
					};


					let data = {
						name: name,
						desc: desc,
						basepath: basepath,
						members: [],
						project_type: project_type || "private",
						uid: this.getUid(),
						group_id: group_id,
						group_name: group_name,
						icon: icon,
						color: color,
						add_time: xU.time(),
						up_time: xU.time(),
						is_json5: false,
						env: [{ name: "local", domain: "http://127.0.0.1" }],
						requestCode: requestCode.toString()
					};

					let result = await xU.orm(ModelProject).save(data);
					let colInst = xU.orm(ModelInterfaceCol);
					let catInst = xU.orm(ModelInterfaceCategory);
					if (result._id) {
						await colInst.save({
							name: "公共测试集",
							project_id: result._id,
							desc: "公共测试集",
							uid: this.getUid(),
							add_time: xU.time(),
							up_time: xU.time()
						});
						await catInst.save({
							name: "公共分类",
							project_id: result._id,
							desc: "公共分类",
							uid: this.getUid(),
							add_time: xU.time(),
							up_time: xU.time()
						});
					}
					let uid = this.getUid();
					// 将项目添加者变成项目组长,除admin以外
					if (this.getRole() !== "admin") {
						let userdata = await xU.getUserdata(uid, "owner");
						await this.model.addMember(result._id, [userdata]);
					}
					let username = this.getUsername();
					xU.saveLog({
						content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了项目 <a href="/project/${result._id
							}">${name}</a>`,
						type: "project",
						uid,
						username: username,
						typeid: result._id
					});
					xU.emitHook("project_add", result).then();
					ctx.body = xU.$response(result);

				}
			}
		},
		"/project/check_project_name": {
			get: {
				summary: "检查项目名是否重复",
				description: "",
				request: {
					query: {
						name: { required: true, description: "项目名称，不能为空", type: "string" },
						group_id: { required: true, description: "项目分组id，不能为空", type: "string" }
					}
				}, handler(ctx) {
					let { name, group_id } = ctx.payload;
					let count = checkProjectName(name, group_id);
					if (count) {
						return (ctx.body = xU.$response(401, null, count));
					} else {
						ctx.body = xU.$response(count);
					}
				}
			}
		}
	}
};
