const showDiffMsg = require("common/diff-view");
const jsondiffpatch = require("jsondiffpatch");
const formattersHtml = jsondiffpatch.formatters.html;
const mergeJsonSchema = require("../../../common/mergeJsonSchema");
const { parse: urlParse } = require("url");

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

async function autoAddTag(params) {
	//检查是否提交了目前不存在的tag
	let tags = params.tag;
	if (tags && Array.isArray(tags) && tags.length > 0) {
		if (!params.project_id) return;
		let projectData = await orm.project.get(params.project_id);
		let tagsInProject = projectData.tag;
		let needUpdate = false;
		if (
			tagsInProject &&
			Array.isArray(tagsInProject) &&
			tagsInProject.length > 0
		) {
			tags.forEach(tag => {
				if (
					!xU._.find(tagsInProject, item => {
						return item.name === tag;
					})
				) {
					//tag不存在
					needUpdate = true;
					tagsInProject.push({
						name: tag,
						desc: tag
					});
				}
			});
		} else {
			needUpdate = true;
			tagsInProject = [];
			tags.forEach(tag => {
				tagsInProject.push({
					name: tag,
					desc: tag
				});
			});
		}
		if (needUpdate) {
			//需要更新tag
			let data = {
				tag: tagsInProject,
				up_time: xU.time()
			};
			await orm.project.up(params.project_id, data);
		}
	}
}

function handleHeaders(values) {
	let isfile = false,
		isHaveContentType = false;
	if (values.req_body_type === "form") {
		values.req_body_form.forEach(item => {
			if (item.type === "file") {
				isfile = true;
			}
		});

		values.req_headers.map(item => {
			if (item.name === "Content-Type") {
				item.value = isfile
					? "multipart/form-data"
					: "application/x-www-form-urlencoded";
				isHaveContentType = true;
			}
		});
		if (isHaveContentType === false) {
			values.req_headers.unshift({
				name: "Content-Type",
				value: isfile
					? "multipart/form-data"
					: "application/x-www-form-urlencoded"
			});
		}
	} else if (values.req_body_type === "json") {
		values.req_headers
			? values.req_headers.map(item => {
					if (item.name === "Content-Type") {
						item.value = "application/json";
						isHaveContentType = true;
					}
			  })
			: [];
		if (isHaveContentType === false) {
			values.req_headers = values.req_headers || [];
			values.req_headers.unshift({
				name: "Content-Type",
				value: "application/json"
			});
		}
	}
}

async function hander_interface_add(ctx) {
	let { payload } = ctx;

	if (!this.$tokenAuth) {
		let auth = await this.checkAuth(payload.project_id, "project", "edit");

		if (!auth) {
			return (ctx.body = xU.$response(null, 40033, "没有权限"));
		}
	}
	payload.method = payload.method || "GET";

	payload.res_body_is_json_schema = payload.res_body_is_json_schema || false;
	payload.req_body_is_json_schema = payload.req_body_is_json_schema || false;

	payload.method = payload.method.toUpperCase();
	payload.req_params = payload.req_params || [];
	payload.res_body_type = payload.res_body_type
		? payload.res_body_type.toLowerCase()
		: "backup";

	let http_path = urlParse(payload.path, true);

	http_path.pathname = this.handleBasepath(http_path.pathname);
	if (!xU.verifyPath(http_path.pathname)) {
		return (ctx.body = xU.$response(
			null,
			400,
			"path第一位必需为 /, 只允许由 字母数字-/_:.! 组成"
		));
	}

	handleHeaders(payload);

	payload.query_path = {};
	payload.query_path.path = http_path.pathname;
	payload.query_path.params = [];
	xU._.each(http_path.query, (value, name) => {
		payload.query_path.params.push({
			name: name,
			value: value
		});
	});

	let count = await orm.interface.count(
		payload.project_id,
		payload.path,
		payload.method
	);

	if (count > 0) {
		return (ctx.body = xU.$response(
			null,
			40022,
			"已存在的接口:" + payload.path + "[" + payload.method + "]"
		));
	}

	let data = Object.assign(payload, {
		uid: this.getUid(),
		add_time: xU.time(),
		up_time: xU.time()
	});

	xU.handleVarPath(payload.path, payload.req_params);

	if (payload.req_params.length > 0) {
		data.type = "var";
		data.req_params = payload.req_params;
	} else {
		data.type = "static";
	}

	// 新建接口的人成为项目dev  如果不存在的话
	// 命令行导入时无法获知导入接口人的信息，其uid 为 999999
	let uid = this.getUid();

	if (this.getRole() !== "admin" && uid !== 999999) {
		let userdata = await xU.getUserdata(uid, "dev");
		// 检查一下是否有这个人
		let check = await orm.project.checkMemberRepeat(payload.project_id, uid);
		if (check === 0 && userdata) {
			await orm.project.addMember(payload.project_id, [userdata]);
		}
	}

	let result = await orm.interface.save(data);
	xU.emitHook("interface_add", result).then();
	orm.interfaceCategory.get(payload.catid).then(cate => {
		let username = this.getUsername();
		let title = `<a href="/user/profile/${this.getUid()}">${username}</a> 为分类 <a href="/project/${
			payload.project_id
		}/interface/api/cat_${payload.catid}">${
			cate.name
		}</a> 添加了接口 <a href="/project/${payload.project_id}/interface/api/${
			result._id
		}">${data.title}</a> `;

		xU.saveLog({
			content: title,
			type: "project",
			uid: this.getUid(),
			username: username,
			typeid: payload.project_id
		});
		orm.project
			.up(payload.project_id, { up_time: new Date().getTime() })
			.then();
	});

	await autoAddTag(payload);

	ctx.body = xU.$response(result);
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
			required: true,
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
			required: true,
			description: "非form类型的请求参数可保存到此字段",
			type: "string"
		},
		/* 响应 */
		res_body_type: {
			required: true,
			description: "响应方式",
			type: "string",
			enum: ["json", "text", "xml"]
		},
		res_body: {
			type: "string",
			description:
				"响应信息，可填写任意字符串，如果res_body_type是json,则会调用mock功能"
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

		"/interface/upsert": {
			post: {
				summary: `保存接口数据，如果接口存在则更新数据，如果接口不存在则添加数据
会用path和name来判断是否已经添加`,
				description: "更新分类",
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
							await hander_interface_add.call(this, data);
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
				handler: hander_interface_add
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
				handler: handler_interface_add_cat
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

async function handler_interface_add_cat(ctx) {
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
			let auth = await this.checkAuth(params.project_id, "project", "edit");
			if (!auth) {
				return (ctx.body = xU.$response(null, 400, "没有权限"));
			}
		}

		if (!params.name) {
			return (ctx.body = xU.$response(null, 400, "名称不能为空"));
		}

		const res = await orm.interfaceCategory.search({
			project_id: params.project_id,
			name: params.name
		});
		if (res?.length) {
			return (ctx.body = xU.$response(null, 400, "名称已存在"));
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
