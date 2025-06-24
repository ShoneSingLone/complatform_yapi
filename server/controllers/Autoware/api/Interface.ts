const showDiffMsg = require("common/diff-view");
const jsondiffpatch = require("jsondiffpatch");
const formattersHtml = jsondiffpatch.formatters.html;
const mergeJsonSchema = require("../../../../common/mergeJsonSchema");
const { parse: urlParse } = require("url");
const {
	upsertInterface,
	handleHeaders,
	autoAddTag,
	interface_add_cat
} = require("./Interface.service");

function diffHTML(html) {
	if (html.length === 0) {
		return `<span style="color: #555">没有改动，该操作未改动Api数据</span>`;
	}

	return html.map(item => {
		return `<div>
  <h4 class="title">${item.title}</h4>
  <div>${item.content}</div>
</div>`;
	});
}

const interfaceUpsertRequest = {
	body: {
		project_id: {
			required: true,
			description: "项目id，不能为空",
			type: "number"
		},
		title: {
			required: true,
			description: "接口标题，不能为空",
			type: "string"
		},
		path: {
			required: true,
			description: "接口请求路径，不能为空",
			type: "string"
		},
		method: { required: true, description: "请求方式", type: "string" },
		req_headers: {
			description: "请求的header信息",
			type: "array",
			items: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "请求的header信息名"
					},
					value: {
						type: "string",
						description: "请求的header信息值"
					},
					required: {
						type: "string",
						description: "是否是必须，默认为否"
					},
					type: {
						type: "string",
						description: "header描述",
						enum: ["text", "file"]
					}
				}
			}
		},
		req_body_type: {
			description: "请求方式",
			type: "string",
			enum: ["form", "json", "text", "xml"]
		},
		req_params: {
			description: "url search params",
			type: "array",
			items: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "key"
					},
					desc: {
						type: "string",
						description: "value"
					}
				}
			}
		},
		req_body_form: {
			description:
				"请求参数,如果请求方式是form，参数是Array数组，其他格式请求参数是字符串",
			type: "array",
			items: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "请求的body"
					},
					value: {
						type: "string",
						description:
							"请求参数值，可填写生成规则（mock）。如@email，随机生成一条email"
					},
					type: {
						type: "string",
						description: "请求参数类型",
						enum: ["text", "file"]
					}
				}
			}
		},
		req_body_other: {
			description: "非form类型的请求参数可保存到此字段",
			type: "string"
		},
		/* 响应 */
		res_body_type: {
			description: "响应方式",
			type: "string",
			default: "json",
			enum: ["json", "text", "xml"]
		},
		res_body: {
			type: "string",
			description:
				"响应信息，可填写任意字符串，如果res_body_type是json,则会调用mock功能"
		},
		resBackupJson: {
			type: "string",
			description: "备份数据的json字符串"
		},
		desc: {
			type: "string",
			description: "header描述"
		}
	}
};

const minLengthStringField = {
	type: "string",
	minLength: 1
};

const addAndUpCommonField = {
	desc: "string",
	status: "string",
	isProxy: "boolean",
	witchEnv: "string",
	req_query: [
		{
			name: "string",
			value: "string",
			example: "string",
			desc: "string",
			required: "string"
		}
	],
	req_headers: [
		{
			name: "string",
			value: "string",
			example: "string",
			desc: "string",
			required: "string"
		}
	],
	req_body_type: "string",
	req_params: [
		{
			name: "string",
			example: "string",
			desc: "string"
		}
	],
	req_body_form: [
		{
			name: "string",
			type: {
				type: "string"
			},
			example: "string",
			desc: "string",
			required: "string"
		}
	],
	req_body_other: "string",
	res_body_type: "string",
	res_body: "string",
	resBackupJson: "string",
	custom_field_value: "string",
	api_opened: "boolean",
	req_body_is_json_schema: "string",
	res_body_is_json_schema: "string",
	markdown: "string",
	tag: "array"
};

const SCHEMA_MAP = {
	add: Object.assign(
		{
			"*project_id": "number",
			"*path": minLengthStringField,
			"*title": minLengthStringField,
			"*method": minLengthStringField,
			"*catid": "number"
		},
		addAndUpCommonField
	),
	up: Object.assign(
		{
			"*id": "number",
			project_id: "number",
			path: minLengthStringField,
			title: minLengthStringField,
			method: minLengthStringField,
			catid: "number",
			switch_notice: "boolean",
			message: minLengthStringField
		},
		addAndUpCommonField
	),
	save: Object.assign(
		{
			project_id: "number",
			catid: "number",
			title: minLengthStringField,
			path: minLengthStringField,
			method: minLengthStringField,
			message: minLengthStringField,
			switch_notice: "boolean",
			dataSync: "string"
		},
		addAndUpCommonField
	)
};

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
					let { project_id, page, limit, status, tag } = ctx.payload || {};

					page = page || 1;
					limit = limit || 10;

					let project = orm.project.getBaseInfo(project_id);
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
							result = await orm.interface.list(project_id);
							count = await orm.interface.listCount({ project_id });
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

							result = await orm.interface.listByOptionWithPage(
								option,
								page,
								limit
							);
							count = await orm.interface.listCount(option);
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
		"/interface/up": {
			post: {
				summary: `更新接口`,
				description: "更新接口",
				request: interfaceUpsertRequest,
				async handler(ctx) {
					let params = ctx.payload;

					if (!xU._.isUndefined(params.method)) {
						params.method = params.method || "GET";
						params.method = params.method.toUpperCase();
					}
					let id = params.id;
					params.message = params.message || "";
					params.message = params.message.replace(/\n/g, "<br>");
					// params.res_body_is_json_schema = _.isUndefined (params.res_body_is_json_schema) ? true : params.res_body_is_json_schema;
					// params.req_body_is_json_schema = _.isUndefined(params.req_body_is_json_schema) ?  true : params.req_body_is_json_schema;

					handleHeaders(params);

					let interfaceData = await orm.interface.get(id);
					if (!interfaceData) {
						return (ctx.body = xU.$response(null, 400, "不存在的接口"));
					}
					if (!this.$tokenAuth) {
						let auth = await this.checkAuth(
							interfaceData.project_id,
							"project",
							"edit"
						);
						if (!auth) {
							return (ctx.body = xU.$response(null, 400, "没有权限"));
						}
					}

					let data = Object.assign(
						{
							up_time: xU.time()
						},
						params
					);

					if (params.path) {
						let http_path;
						http_path = urlParse(params.path, true);
						http_path.pathname = this.handleBasepath(http_path.pathname);
						if (!xU.verifyPath(http_path.pathname)) {
							return (ctx.body = xU.$response(
								null,
								400,
								"path第一位必需为 /, 只允许由 字母数字-/_:.! 组成"
							));
						}
						params.query_path = {};
						params.query_path.path = http_path.pathname;
						params.query_path.params = [];
						Object.keys(http_path.query).forEach(item => {
							params.query_path.params.push({
								name: item,
								value: http_path.query[item]
							});
						});
						data.query_path = params.query_path;
					}

					if (
						params.path &&
						(params.path !== interfaceData.path ||
							params.method !== interfaceData.method)
					) {
						let count = await orm.interface.count(
							interfaceData.project_id,
							params.path,
							params.method
						);
						if (count > 0) {
							return (ctx.body = xU.$response(
								null,
								401,
								"已存在的接口:" + params.path + "[" + params.method + "]"
							));
						}
					}

					if (!xU._.isUndefined(data.req_params)) {
						if (Array.isArray(data.req_params) && data.req_params.length > 0) {
							data.type = "var";
						} else {
							data.type = "static";
							data.req_params = [];
						}
					}

					let result = await orm.interface.up(id, data);
					let username = this.getUsername();
					let CurrentInterfaceData = await orm.interface.get(id);
					let logData = {
						interface_id: id,
						cat_id: data.catid,
						current: CurrentInterfaceData.toObject(),
						old: interfaceData.toObject()
					};

					orm.interfaceCategory.get(interfaceData.catid).then(cate => {
						let diffView2 = showDiffMsg(jsondiffpatch, formattersHtml, logData);
						if (diffView2.length <= 0) {
							return; // 没有变化时，不写日志
						}
						xU.saveLog({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 
								更新了分类 <a href="/project/${cate.project_id}/interface/api/cat_${
								data.catid
							}">${cate.name}</a> 
								下的接口 <a href="/project/${cate.project_id}/interface/api/${id}">${
								interfaceData.title
							}</a><p>${params.message}</p>`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: cate.project_id,
							data: logData
						});
					});

					orm.project
						.up(interfaceData.project_id, { up_time: new Date().getTime() })
						.then();
					if (params.switch_notice === true) {
						let diffView = showDiffMsg(jsondiffpatch, formattersHtml, logData);
						let annotatedCss = fs.readFileSync(
							path.resolve(
								xU.var.APP_ROOT_DIR,
								"node_modules/jsondiffpatch/dist/formatters-styles/annotated.css"
							),
							"utf8"
						);
						let htmlCss = fs.readFileSync(
							path.resolve(
								xU.var.APP_ROOT_DIR,
								"node_modules/jsondiffpatch/dist/formatters-styles/html.css"
							),
							"utf8"
						);

						let project = await orm.project.getBaseInfo(
							interfaceData.project_id
						);

						let interfaceUrl = `${ctx.request.origin}/project/${interfaceData.project_id}/interface/api/${id}`;

						xU.sendNotice(interfaceData.project_id, {
							title: `${username} 更新了接口`,
							content: `<html>
					<head>
					<style>
					${annotatedCss}
					${htmlCss}
					</style>
					</head>
					<body>
					<div><h3>${username}更新了接口(${data.title})</h3>
					<p>项目名：${project.name} </p>
					<p>修改用户: ${username}</p>
					<p>接口名: <a href="${interfaceUrl}">${data.title}</a></p>
					<p>接口路径: [${data.method}]${data.path}</p>
					<p>详细改动日志: ${diffHTML(diffView)}</p></div>
					</body>
					</html>`
						});
					}

					xU.emitHook("interface_update", id).then();
					await autoAddTag(params);

					ctx.body = xU.$response(result);
					return 1;
				}
			}
		},
		"/interface/copy_to_project": {
			post: {
				summary: `复制所选接口到指定项目`,
				description: "复制所选接口到指定项目",
				request: {
					body: {
						project_id: {
							required: true,
							description: "项目id，不能为空",
							type: "number"
						},
						interfaceIds: {
							required: true,
							description: "接口id数组，不能为空",
							type: "array",
							items: {
								type: "number"
							}
						}
					}
				},
				async handler(ctx) {
					let { project_id, interfaceIds } = ctx.payload;
					interfaceIds = interfaceIds || [];
					ctx.body = xU.$response("success");
					/* 获取对应项目的所有分类 */
					const category = await orm.interfaceCategory.list(project_id);
					let categoryPublic = xU._.find(category, { name: "复用接口" });
					if (!categoryPublic) {
						categoryPublic = await interface_add_cat.call(this, {
							payload: {
								name: "复用接口",
								project_id: project_id,
								desc: "复用接口"
							}
						});
					}
					/* 获取对应项目的所有接口 */
					const projectInterfaceList = await orm.interface.list(
						project_id,
						"_id title path"
					);
					/* 获取所选接口的详细信息 */
					const interfaceList = await orm.interface.getByIds(interfaceIds);
					/* 过滤需要复制的接口，（已存在的不需要复制） */
					const needInsertInterfaceList = xU._.reduce(
						interfaceList,
						(_needInsertInterfaceList, interface) => {
							interface = interface.toObject();
							const { title, path } = interface;
							const isExist = xU._.find(projectInterfaceList, {
								title,
								path
							});
							/* 如果不存在 */
							if (!isExist) {
								/* 修改接口所属项目id */
								interface.project_id = project_id;
								/* 默认放在公共分类下 */
								interface.catid = categoryPublic._id;
								/* 删除自己的id */
								delete interface._id;
								delete interface.id;
								_needInsertInterfaceList.push(interface);
							}
							return _needInsertInterfaceList;
						},
						[]
					);

					await Promise.all(
						xU._.map(needInsertInterfaceList, interface => {
							return upsertInterface.call(this, { payload: interface });
						})
					);
				}
			}
		},
		"/interface/upsert": {
			post: {
				summary: `更新接口`,
				description:
					"保存接口数据，如果接口存在则更新数据，如果接口不存在则添加数据会用path和method来判断是否已经添加",
				request: interfaceUpsertRequest,
				async handler(ctx) {
					let payload = ctx.payload;

					if (!this.$tokenAuth) {
						let auth = await this.checkAuth(
							payload.project_id,
							"project",
							"edit"
						);
						if (!auth) {
							return (ctx.body = xU.$response(null, 40033, "没有权限"));
						}
					}
					payload.method = payload.method || "GET";
					payload.method = payload.method.toUpperCase();

					let http_path = urlParse(payload.path, true);
					http_path.pathname = this.handleBasepath(http_path.pathname);

					if (!xU.verifyPath(http_path.path)) {
						return (ctx.body = xU.$response(
							null,
							400,
							"path第一位必需为 /, 只允许由 字母数字-/_:.! 组成"
						));
					}

					let result = await orm.interface.getByPath(
						payload.project_id,
						payload.path,
						payload.method,
						"_id res_body"
					);

					/* 证明存在 */
					if (result.length > 0) {
						/* 证明存在 更新 */
						result.forEach(async interfaceInfo => {
							payload.id = interfaceInfo._id;
							let validParams = Object.assign({}, payload);
							let validResult = xU.validateParams(SCHEMA_MAP.up, validParams);
							if (validResult.valid) {
								let data = Object.assign({}, ctx);
								data.params = validParams;
								/* 智能合并 */
								if (
									payload.res_body_is_json_schema &&
									payload.dataSync === "good"
								) {
									try {
										let new_res_body = xU.json_parse(payload.res_body);
										let old_res_body = xU.json_parse(interfaceInfo.res_body);
										data.params.res_body = JSON.stringify(
											mergeJsonSchema(old_res_body, new_res_body),
											null,
											2
										);
									} catch (err) {}
								}
								await orm.interface.up(interfaceInfo._id, data.params);
							} else {
								return (ctx.body = xU.$response(
									null,
									400,
									validResult.message
								));
							}
						});
					} else {
						/* 新增 */
						let validResult = xU.validateParams(SCHEMA_MAP.add, payload);
						if (validResult.valid) {
							const data = { payload };
							await upsertInterface.call(this, data);
						} else {
							return (ctx.body = xU.$response(null, 400, validResult.message));
						}
					}
					ctx.body = xU.$response(result);
				}
			}
		},
		"/interface/add": {
			post: {
				summary: "添加项目接口",
				description: "添加项目接口",
				request: interfaceUpsertRequest,
				async handler(ctx) {
					const response = await upsertInterface.call(this, ctx);
					return (ctx.body = response);
				}
			}
		},
		/**
		 *
		 * @param {Number}   id 接口id，不能为空
		 */
		"/interface/get": {
			get: {
				summary: "获取项目接口详情",
				description: "获取项目接口详情",
				request: {
					query: {
						id: {
							required: true,
							description: "接口ID",
							type: "number"
						},
						project_id: {
							description: "项目ID，如果是带有token的访问，一般可以不用",
							type: "number"
						}
					}
				},
				async handler(ctx) {
					let { id, project_id } = ctx.payload;
					if (!id) {
						return (ctx.body = xU.$response(null, 400, "接口id不能为空"));
					}

					try {
						let result = await orm.interface.get(id);
						if (this.$tokenAuth) {
							if (project_id !== result.project_id) {
								ctx.body = xU.$response(null, 400, "token有误");
								return;
							}
						}
						// console.log('result', result);
						if (!result) {
							return (ctx.body = xU.$response(null, 490, "不存在的"));
						}
						let userinfo = await orm.user.findById(result.uid);
						let project = await orm.project.getBaseInfo(result.project_id);
						if (project.project_type === "private") {
							if (
								(await this.checkAuth(project._id, "project", "view")) !== true
							) {
								return (ctx.body = xU.$response(null, 406, "没有权限"));
							}
						}
						xU.emitHook("interface_get", result).then();
						result = result.toObject();
						if (userinfo) {
							result.username = userinfo.username;
						}
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/interface/del": {
			post: {
				summary: "删除接口",
				description: "获取项目接口详情",
				request: {
					body: {
						ids: {
							required: true,
							description: "接口ID 数组",
							type: "array",
							items: {
								type: "number"
							}
						}
					}
				},
				async handler(ctx) {
					try {
						let { ids } = ctx.payload;

						let selectedInterfaceArray = await orm.interface.getByIds(ids);

						const isForbidden = await (async () => {
							let interface;
							let index = 0;
							while ((interface = selectedInterfaceArray[index])) {
								if (interface.uid != this.getUid()) {
									let auth = await this.checkAuth(
										interface.project_id,
										"project",
										"danger"
									);

									if (!auth) {
										return true;
									}
								}
								index++;
							}
							return false;
						})();

						if (isForbidden) {
							return (ctx.body = xU.$response(null, 400, "没有权限"));
						}

						const result = await (async () => {
							let interface;
							let index = 0;
							let count = 0;
							while ((interface = selectedInterfaceArray[index])) {
								try {
									const id = interface._id;
									await orm.interface.del([id]);
									xU.emitHook("interface_del", id).then();
									await orm.interfaceCase.delByInterfaceId(id);
									let username = this.getUsername();
									const category = await orm.interfaceCategory.get(
										interface.catid
									);

									xU.saveLog({
										content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了分类 <a href="/project/${
											category.project_id
										}/interface/api/cat_${interface.catid}">${
											category.name
										}</a> 下的接口 "${interface.title}"`,
										type: "project",
										uid: this.getUid(),
										username: username,
										typeid: category.project_id
									});
									await orm.project.up(interface.project_id, {
										up_time: new Date().getTime()
									});
									count++;
									index++;
								} catch (error) {
									console.log("🚀 ~ await ~ error:", error);
								}
							}
							return {
								success: count
							};
						})();

						ctx.body = xU.$response(result);
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
				handler: hander_interface_up_cat
			}
		},
		"/interface/add_cat": {
			post: {
				summary: "新增分类",
				description: "新增分类,不允许有同名的",
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
					const response = await interface_add_cat.call(this, ctx);
					return (ctx.body = response);
				}
			}
		}
	}
};

async function hander_interface_up_cat(ctx) {
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
