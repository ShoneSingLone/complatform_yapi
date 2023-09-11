const ModelGroup = require("server/models/group");
const ModelProject = require("server/models/project");

module.exports = {
	definitions: {},
	tag: {
		description: "分组信息"
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

						params = xU.handleParams(params, {
							name: "string",
							basepath: "string",
							group_id: "number",
							desc: "string",
							pre_script: "string",
							after_script: "string",
							project_mock_script: "string"
						});

						if (!id) {
							return (ctx.body = xU.resReturn(null, 405, "项目id不能为空"));
						}

						if ((await this.checkAuth(id, "project", "danger")) !== true) {
							return (ctx.body = xU.resReturn(null, 405, "没有权限"));
						}

						let projectData = await xU.orm(ModelProject).get(id);

						if (params.basepath) {
							if (
								(params.basepath = this.handleBasepath(params.basepath)) ===
								false
							) {
								return (ctx.body = xU.resReturn(null, 401, "basepath格式有误"));
							}
						}

						if (projectData.name === params.name) {
							delete params.name;
						}

						if (params.name) {
							let checkRepeat = await xU
								.orm(ModelProject)
								.checkNameRepeat(params.name, params.group_id);
							if (checkRepeat > 0) {
								return (ctx.body = xU.resReturn(null, 401, "已存在的项目名"));
							}
						}

						let data = {
							up_time: xU.time()
						};

						data = Object.assign({}, data, params);

						let result = await xU.orm(ModelProject).up(id, data);
						let username = this.getUsername();
						xU.saveLog({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${
								projectData.name
							}</a>`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: id
						});
						xU.emitHook("project_up", result).then();
						ctx.body = xU.resReturn(result);
					} catch (e) {
						ctx.body = xU.resReturn(null, 402, e.message);
					}
				}
			}
		}
	}
};
