const { ModelInterface } = require("server/models/interface");
const { ModelInterfaceCategory } = require("server/models/interfaceCategory");
const { ModelProject } = require("server/models/project");

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
					const modelProject = await xU.orm(ModelProject);

					/**
					 * @type ModelInterface
					 */
					const modelInterface = await xU.orm(ModelInterface);

					let { project_id, page, limit, status, tag } = ctx.payload || {};

					page = page || 1;
					limit = limit || 10;

					let project = modelProject.getBaseInfo(project_id);
					if (!project) {
						return (ctx.body = xU.resReturn(null, 407, "不存在的项目"));
					}
					if (project.project_type === "private") {
						if (
							(await this.checkAuth(project._id, "project", "view")) !== true
						) {
							return (ctx.body = xU.resReturn(null, 406, "没有权限"));
						}
					}
					if (!project_id) {
						return (ctx.body = xU.resReturn(null, 400, "项目id不能为空"));
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

						ctx.body = xU.resReturn({
							total: count,
							list: result
						});
						xU.emitHook("interface_list", result).then();
					} catch (err) {
						ctx.body = xU.resReturn(null, 402, err.message);
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
					/**
					 * @type ModelProject
					 */
					const modelProject = await xU.orm(ModelProject);
					/**
					 * @type ModelInterfaceCategory
					 */
					const modelInterfaceCategory = await xU.orm(ModelInterfaceCategory);
					/**
					 * @type ModelInterface
					 */
					const modelInterface = await xU.orm(ModelInterface);

					let { project_id } = ctx.payload;

					if (!project_id) {
						return (ctx.body = xU.resReturn(null, 400, "项目id不能为空"));
					}

					let project = await modelProject.getBaseInfo(project_id);

					if (!project) {
						return (ctx.body = xU.resReturn(null, 406, "不存在的项目"));
					}

					if (project.project_type === "private") {
						if (
							(await this.checkAuth(project._id, "project", "view")) !== true
						) {
							return (ctx.body = xU.resReturn(null, 406, "没有权限"));
						}
					}

					try {
						/* 获取项目接口的分类 */
						let categoryArray = await modelInterfaceCategory.list(project_id);
						const interfaceMenuTree = [];
						for (const categoryMongoose of categoryArray) {
							let category = categoryMongoose.toObject();
							let interfaceArray = await modelInterface.listByCatid(
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
						ctx.body = xU.resReturn(interfaceMenuTree);
					} catch (err) {
						ctx.body = xU.resReturn(null, 402, err.message);
					}
				}
			}
		}
	}
};
