const ModelInterface = require("server/models/interface");
const ModelInterfaceCategory = require("server/models/interfaceCategory");
const ModelProject = require("server/models/project");

module.exports = {
	definitions: {},
	tag: {
		description: "接口信息"
	},
	paths: {
		"/interface/list": {
			get: {
				summary: "interface list",
				description: "interface list",
				request: {
					query: {
						project_id: {
							description: "项目id，不能为空",
							required: true,
							type: "number"
						},
						page: { description: "当前页", type: "number" },
						limit: { description: "每一页限制条数", type: "number" }
					}
				},
				async handler(ctx) {
					/**
					 * @type ModelProject
					 */
					const modelProject = await orm.project;

					/**
					 * @type ModelInterface
					 */
					const modelInterface = await orm.interface;

					let { project_id, page, limit, status, tag } = ctx.payload || {};

					page = page || 1;
					limit = limit || 10;

					let project = modelProject.getBaseInfo(project_id);
					if (!project) {
						return (ctx.body = xU.$response(null, 407, "不存在的项目"));
					}
					if (project.project_type === "private") {
						if (
							(await this.checkAuth(project._id, "project", "view")) !== true
						) {
							return (ctx.body = xU.$response(null, 406, "没有权限"));
						}
					}
					if (!project_id) {
						return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
					}

					try {
						let result, count;
						if (limit === "all") {
							result = await modelInterface.list(project_id);
							count = await modelInterface.listCount({ project_id });
						} else {
							let option = { project_id };
							if (status) {
								if (Array.isArray(status)) {
									option.status = { $in: status };
								} else {
									option.status = status;
								}
							}
							if (tag) {
								if (Array.isArray(tag)) {
									option.tag = { $in: tag };
								} else {
									option.tag = tag;
								}
							}

							result = await modelInterface.listByOptionWithPage(
								option,
								page,
								limit
							);
							count = await modelInterface.listCount(option);
						}

						ctx.body = xU.$response({
							total: count,
							list: result
						});
						xU.emitHook("interface_list", result).then();
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		"/interface/list_menu": {
			get: {
				summary: "list_menu",
				description: "list_menu有嵌套",
				request: {
					query: {
						project_id: {
							description: "项目id，不能为空",
							required: true,
							type: "number"
						}
					}
				},
				async handler(ctx) {
					let { project_id } = ctx.payload;

					if (!project_id) {
						return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
					}

					let project = await orm.project.getBaseInfo(project_id);

					if (!project) {
						return (ctx.body = xU.$response(null, 406, "不存在的项目"));
					}

					if (project.project_type === "private") {
						if (
							(await this.checkAuth(project._id, "project", "view")) !== true
						) {
							return (ctx.body = xU.$response(null, 406, "没有权限"));
						}
					}

					try {
						/* 获取项目接口的分类 */
						let categoryArray = await orm.interfaceCategory.list(project_id);
						const interfaceMenuTree = [];
						for (const categoryMongoose of categoryArray) {
							let category = categoryMongoose.toObject();
							let interfaceArray = await orm.interface.listByCatid(
								category._id
							);
							category.list = [];
							for (const interfaceMongooose of interfaceArray) {
								let interface = interfaceMongooose.toObject();
								// interface.isSetBackupData = !!interface.resBackupJson;
								/* 菜单里面不需要resBackupJson */
								delete interface.resBackupJson;
								category.list.push(interface);
							}
							interfaceMenuTree.push(category);
						}
						ctx.body = xU.$response(interfaceMenuTree);
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		"/interface/up_cat": {
			post: {
				summary: "更新分类",
				description: "更新分类",
				request: {
					body: {
						catid: {
							required: true,
							description: "分类ID",
							type: "string"
						},
						name: {
							required: false,
							description: "分类名称",
							type: "string"
						},
						desc: {
							required: true,
							description: "分类描述",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						let { payload } = ctx;
						let username = this.getUsername();
						let cate = await orm.interfaceCategory.get(payload.catid);
						let auth = await this.checkAuth(cate.project_id, "project", "edit");

						if (!auth) {
							return (ctx.body = xU.$response(null, 400, "没有权限"));
						}

						let result = await orm.interfaceCategory.up(payload.catid, {
							name: payload.name,
							desc: payload.desc,
							up_time: xU.time()
						});

						xU.saveLog({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了分类 <a href="/project/${
								cate.project_id
							}/interface/api/cat_${payload.catid}">${cate.name}</a>`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: cate.project_id
						});

						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 400, e.message);
					}
				}
			}
		},
		"/interface/add_cat": {
			post: {
				summary: "新增分类",
				description: "新增分类",
				request: {
					body: {
						project_id: {
							required: true,
							description: "所属项目ID",
							type: "string"
						},
						name: {
							required: false,
							description: "分类名称",
							type: "string"
						},
						desc: {
							required: true,
							description: "分类描述",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						let params = ctx.request.body;
						params = xU.ensureParamsType(params, {
							name: "string",
							project_id: "number",
							desc: "string"
						});

						if (!params.project_id) {
							return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
						}
						if (!this.$tokenAuth) {
							let auth = await this.checkAuth(
								params.project_id,
								"project",
								"edit"
							);
							if (!auth) {
								return (ctx.body = xU.$response(null, 400, "没有权限"));
							}
						}

						if (!params.name) {
							return (ctx.body = xU.$response(null, 400, "名称不能为空"));
						}

						let result = await orm.interfaceCategory.save({
							name: params.name,
							project_id: params.project_id,
							desc: params.desc,
							uid: this.getUid(),
							add_time: xU.time(),
							up_time: xU.time()
						});

						let username = this.getUsername();
						xU.saveLog({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了分类  <a href="/project/${
								params.project_id
							}/interface/api/cat_${result._id}">${params.name}</a>`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: params.project_id
						});

						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		}
	}
};
