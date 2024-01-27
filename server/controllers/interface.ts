const ModelUser = require("server/models/user");
const ModelInterface = require("server/models/interface");
const ModelInterfaceCategory = require("server/models/interfaceCategory");
const ModelInterfaceCase = require("server/models/interfaceCase");
const ModelFollow = require("../models/follow");
const ModelGroup = require("server/models/group");
const ModelProject = require("server/models/project");
const _ = require("lodash");
const url = require("url");
const ControllerBase = require("./base");

const jsondiffpatch = require("jsondiffpatch");
const formattersHtml = jsondiffpatch.formatters.html;
const showDiffMsg = require("../../common/diff-view");
const mergeJsonSchema = require("../../common/mergeJsonSchema");
const fs = require("fs-extra");
const path = require("path");

// const annotatedCss = require("jsondiffpatch/public/formatters-styles/annotated.css");
// const htmlCss = require("jsondiffpatch/public/formatters-styles/html.css");

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

class ControllerInterface extends ControllerBase {
	constructor(ctx) {
		super(ctx);
		this.model = orm.interface;
		this.modelInterfaceCategory = orm.interfaceCategory;

		this.modelCase = orm.interfaceCase;
		this.modelFollow = orm.follow;
		this.modelGroup = orm.group;

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

		this.schemaMap = {
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
	}

	async autoAddTag(params) {
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
						!_.find(tagsInProject, item => {
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

	/**
	 * 获取项目分组
	 * @interface /interface/get
	 * @method GET
	 * @category interface
	 * @foldnumber 10
	 * @param {Number}   id 接口id，不能为空
	 * @returns {Object}
	 * @example ./api/interface/get.json
	 */
	async get(ctx) {
		let params = ctx.params;
		if (!params.id) {
			return (ctx.body = xU.$response(null, 400, "接口id不能为空"));
		}

		try {
			let result = await this.model.get(params.id);
			if (this.$tokenAuth) {
				if (params.project_id !== result.project_id) {
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
				if ((await this.checkAuth(project._id, "project", "view")) !== true) {
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

	async downloadCrx(ctx) {
		let filename = "crossRequest.zip";
		let dataBuffer = xU.fs.readFileSync(
			path.join(xU.var.APP_ROOT_DIR, "static/attachment/cross-request.zip")
		);
		ctx.set("Content-disposition", "attachment; filename=" + filename);
		ctx.set("Content-Type", "application/zip");
		ctx.body = dataBuffer;
	}

	async listByCat(ctx) {
		let catid = ctx.request.query.catid;
		let page = ctx.request.query.page || 1,
			limit = ctx.request.query.limit || 10;
		let status = ctx.request.query.status,
			tag = ctx.request.query.tag;

		if (!catid) {
			return (ctx.body = xU.$response(null, 400, "catid不能为空"));
		}
		try {
			let catdata = await this.modelInterfaceCategory.get(catid);

			let project = await orm.project.getBaseInfo(catdata.project_id);
			if (project.project_type === "private") {
				if ((await this.checkAuth(project._id, "project", "view")) !== true) {
					return (ctx.body = xU.$response(null, 406, "没有权限"));
				}
			}

			let option = { catid };
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

			let result = await this.model.listByOptionWithPage(option, page, limit);

			let count = await this.model.listCount(option);

			ctx.body = xU.$response({
				total: count,
				list: result
			});
		} catch (err) {
			ctx.body = xU.$response(null, 402, err.message + "1");
		}
	}

	/**
	 * 编辑接口
	 * @interface /interface/up
	 * @method POST
	 * @category interface
	 * @foldnumber 10
	 * @param {Number}   id 接口id，不能为空
	 * @param {String}   [path] 接口请求路径
	 * @param {String}   [method] 请求方式
	 * @param {Array}  [req_headers] 请求的header信息
	 * @param {String}  [req_headers[].name] 请求的header信息名
	 * @param {String}  [req_headers[].value] 请求的header信息值
	 * @param {Boolean}  [req_headers[].required] 是否是必须，默认为否
	 * @param {String}  [req_headers[].desc] header描述
	 * @param {String}  [req_body_type] 请求参数方式，有["form", "json", "text", "xml"]四种
	 * @param {Mixed}  [req_body_form] 请求参数,如果请求方式是form，参数是Array数组，其他格式请求参数是字符串
	 * @param {String} [req_body_form[].name] 请求参数名
	 * @param {String} [req_body_form[].value] 请求参数值，可填写生成规则（mock）。如@email，随机生成一条email
	 * @param {String} [req_body_form[].type] 请求参数类型，有["text", "file"]两种
	 * @param {String} [req_body_other]  非form类型的请求参数可保存到此字段
	 * @param {String}  [res_body_type] 相应信息的数据格式，有["json", "text", "xml"]三种
	 * @param {String} [res_body] 响应信息，可填写任意字符串，如果res_body_type是json,则会调用mock功能
	 * @param  {String} [desc] 接口描述
	 * @returns {Object}
	 * @example ./api/interface/up.json
	 */
	async up(ctx) {
		let params = ctx.params;

		if (!_.isUndefined(params.method)) {
			params.method = params.method || "GET";
			params.method = params.method.toUpperCase();
		}

		let id = params.id;
		params.message = params.message || "";
		params.message = params.message.replace(/\n/g, "<br>");
		// params.res_body_is_json_schema = _.isUndefined (params.res_body_is_json_schema) ? true : params.res_body_is_json_schema;
		// params.req_body_is_json_schema = _.isUndefined(params.req_body_is_json_schema) ?  true : params.req_body_is_json_schema;

		handleHeaders(params);

		let interfaceData = await this.model.get(id);
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
			http_path = url.parse(params.path, true);

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
			let count = await this.model.count(
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

		if (!_.isUndefined(data.req_params)) {
			if (Array.isArray(data.req_params) && data.req_params.length > 0) {
				data.type = "var";
			} else {
				data.type = "static";
				data.req_params = [];
			}
		}
		let result = await this.model.up(id, data);
		let username = this.getUsername();
		let CurrentInterfaceData = await this.model.get(id);
		let logData = {
			interface_id: id,
			cat_id: data.catid,
			current: CurrentInterfaceData.toObject(),
			old: interfaceData.toObject()
		};

		this.modelInterfaceCategory.get(interfaceData.catid).then(cate => {
			let diffView2 = showDiffMsg(jsondiffpatch, formattersHtml, logData);
			if (diffView2.length <= 0) {
				return; // 没有变化时，不写日志
			}
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 
                    更新了分类 <a href="/project/${
											cate.project_id
										}/interface/api/cat_${data.catid}">${cate.name}</a> 
                    下的接口 <a href="/project/${
											cate.project_id
										}/interface/api/${id}">${interfaceData.title}</a><p>${
					params.message
				}</p>`,
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

			let project = await orm.project.getBaseInfo(interfaceData.project_id);

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
        <p>详细改动日志: ${this.diffHTML(diffView)}</p></div>
        </body>
        </html>`
			});
		}

		xU.emitHook("interface_update", id).then();
		await this.autoAddTag(params);

		ctx.body = xU.$response(result);
		return 1;
	}

	diffHTML(html) {
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

	/**
	 * 删除接口
	 * @interface /interface/del
	 * @method GET
	 * @category interface
	 * @foldnumber 10
	 * @param {Number}   id 接口id，不能为空
	 * @returns {Object}
	 * @example ./api/interface/del.json
	 */

	async del(ctx) {
		try {
			let id = ctx.request.body.id;

			if (!id) {
				return (ctx.body = xU.$response(null, 400, "接口id不能为空"));
			}

			let data = await this.model.get(id);

			if (data.uid != this.getUid()) {
				let auth = await this.checkAuth(data.project_id, "project", "danger");
				if (!auth) {
					return (ctx.body = xU.$response(null, 400, "没有权限"));
				}
			}

			// let inter = await this.model.get(id);
			let result = await this.model.del(id);
			xU.emitHook("interface_del", id).then();
			await this.modelCase.delByInterfaceId(id);
			let username = this.getUsername();
			this.modelInterfaceCategory.get(data.catid).then(cate => {
				xU.saveLog({
					content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了分类 <a href="/project/${
						cate.project_id
					}/interface/api/cat_${data.catid}">${cate.name}</a> 下的接口 "${
						data.title
					}"`,
					type: "project",
					uid: this.getUid(),
					username: username,
					typeid: cate.project_id
				});
			});
			orm.project.up(data.project_id, { up_time: new Date().getTime() }).then();
			ctx.body = xU.$response(result);
		} catch (err) {
			ctx.body = xU.$response(null, 402, err.message);
		}
	}
	// 处理编辑冲突
	async solveConflict(ctx) {
		try {
			let id = parseInt(ctx.query.id, 10),
				result,
				userInst,
				userinfo,
				data;
			if (!id) {
				return ctx.websocket.send("id 参数有误");
			}
			result = await this.model.get(id);

			if (result.edit_uid !== 0 && result.edit_uid !== this.$uid) {
				userInst = orm.user;
				userinfo = await userInst.findById(result.edit_uid);
				data = {
					errno: result.edit_uid,
					data: { uid: result.edit_uid, username: userinfo.username }
				};
			} else {
				await this.model.upEditUid(id, this.getUid()).then();
				data = {
					errno: 0,
					data: result
				};
			}
			ctx.websocket.send(JSON.stringify(data));
			ctx.websocket.on("close", () => {
				this.model.upEditUid(id, 0).then();
			});
		} catch (err) {
			xU.applog.error(err);
		}
	}

	async delCat(ctx) {
		try {
			let id = ctx.request.body.catid;
			let catData = await this.modelInterfaceCategory.get(id);
			if (!catData) {
				ctx.body = xU.$response(null, 400, "不存在的分类");
			}

			if (catData.uid !== this.getUid()) {
				let auth = await this.checkAuth(
					catData.project_id,
					"project",
					"danger"
				);
				if (!auth) {
					return (ctx.body = xU.$response(null, 400, "没有权限"));
				}
			}

			let username = this.getUsername();
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了分类 "${
					catData.name
				}" 及该分类下的接口`,
				type: "project",
				uid: this.getUid(),
				username: username,
				typeid: catData.project_id
			});

			let interfaceData = await this.model.listByCatid(id);

			interfaceData.forEach(async item => {
				try {
					xU.emitHook("interface_del", item._id).then();
					await this.modelCase.delByInterfaceId(item._id);
				} catch (e) {
					xU.applog.error(e.message);
				}
			});
			await this.modelInterfaceCategory.del(id);
			let r = await this.model.delByCatid(id);
			return (ctx.body = xU.$response(r));
		} catch (e) {
			xU.$response(null, 400, e.message);
		}
	}

	/**
	 * 获取分类列表
	 * @interface /interface/getCatMenu
	 * @method GET
	 * @category interface
	 * @foldnumber 10
	 * @param {Number}   project_id 项目id，不能为空
	 * @returns {Object}
	 * @example ./api/interface/getCatMenu
	 */
	async getCatMenu(ctx) {
		let project_id = ctx.params.project_id;

		if (!project_id || isNaN(project_id)) {
			return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
		}

		try {
			let project = await orm.project.getBaseInfo(project_id);
			if (project.project_type === "private") {
				if ((await this.checkAuth(project._id, "project", "edit")) !== true) {
					return (ctx.body = xU.$response(null, 406, "没有权限"));
				}
			}
			let res = await this.modelInterfaceCategory.list(project_id);
			return (ctx.body = xU.$response(res));
		} catch (e) {
			xU.$response(null, 400, e.message);
		}
	}

	/**
	 * 获取自定义接口字段数据
	 * @interface /interface/get_custom_field
	 * @method GET
	 * @category interface
	 * @foldnumber 10
	 * @param {String}   app_code = '111'
	 * @returns {Object}
	 *
	 */
	async getCustomField(ctx) {
		let params = ctx.request.query;

		if (Object.keys(params).length !== 1) {
			return (ctx.body = xU.$response(null, 400, "参数数量错误"));
		}
		let customFieldName = Object.keys(params)[0];
		let customFieldValue = params[customFieldName];

		try {
			//  查找有customFieldName的分组（group）
			let groups = await this.modelGroup.getcustomFieldName(customFieldName);
			if (groups.length === 0) {
				return (ctx.body = xU.$response(null, 404, "没有找到对应自定义接口"));
			}

			// 在每个分组（group）下查找对应project的id值
			let interfaces = [];
			for (let i = 0; i < groups.length; i++) {
				let projects = await orm.project.list(groups[i]._id);

				// 在每个项目（project）中查找interface下的custom_field_value
				for (let j = 0; j < projects.length; j++) {
					let data = {};
					let inter = await this.model.getcustomFieldValue(
						projects[j]._id,
						customFieldValue
					);
					if (inter.length > 0) {
						data.project_name = projects[j].name;
						data.project_id = projects[j]._id;
						inter = inter.map((item, i) => {
							item = inter[i] = inter[i].toObject();
							item.res_body = xU.json_parse(item.res_body);
							item.req_body_other = xU.json_parse(item.req_body_other);

							return item;
						});

						data.list = inter;
						interfaces.push(data);
					}
				}
			}
			return (ctx.body = xU.$response(interfaces));
		} catch (e) {
			xU.$response(null, 400, e.message);
		}
	}

	requiredSort(params) {
		return params.sort((item1, item2) => {
			return item2.required - item1.required;
		});
	}

	/**
	 * 更新多个接口case index
	 * @interface /interface/up_index
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {Array}  [id, index]
	 * @returns {Object}
	 * @example
	 */
	async upIndex(ctx) {
		try {
			let params = ctx.request.body;
			if (!params || !Array.isArray(params)) {
				ctx.body = xU.$response(null, 400, "请求参数必须是数组");
			}
			await Promise.all(
				params.map(item => {
					if (item.id) {
						return this.model.upIndex(item.id, item.index);
					}
				})
			);

			return (ctx.body = xU.$response("成功！"));
		} catch (e) {
			xU.applog.error(e.message);
			ctx.body = xU.$response(null, 400, e.message);
		}
	}

	/**
	 * 更新多个接口cat index
	 * @interface /interface/up_cat_index
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {Array}  [id, index]
	 * @returns {Object}
	 * @example
	 */
	async upCatIndex(ctx) {
		try {
			let params = ctx.request.body;
			if (!params || !Array.isArray(params)) {
				ctx.body = xU.$response(null, 400, "请求参数必须是数组");
			}
			await Promise.all(
				params.map(item => {
					if (item.id) {
						return this.modelInterfaceCategory.upCatIndex(item.id, item.index);
					}
				})
			);
			/* ???? 都没有保证事务，能返回成功？ */
			return (ctx.body = xU.$response("成功！"));
		} catch (e) {
			xU.applog.error(e.message);
			ctx.body = xU.$response(null, 400, e.message);
		}
	}

	async schema2json(ctx) {
		let schema = ctx.request.body.schema;
		let required = ctx.request.body.required;

		let res = xU.schemaToJson(schema, {
			alwaysFakeOptionals: _.isUndefined(required) ? true : required
		});
		// console.log('res',res)
		return (ctx.body = res);
	}

	// 获取开放接口数据
	async listByOpen(ctx) {
		let project_id = ctx.request.query.project_id;

		if (!project_id) {
			return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
		}

		let project = await orm.project.getBaseInfo(project_id);
		if (!project) {
			return (ctx.body = xU.$response(null, 406, "不存在的项目"));
		}
		if (project.project_type === "private") {
			if ((await this.checkAuth(project._id, "project", "view")) !== true) {
				return (ctx.body = xU.$response(null, 406, "没有权限"));
			}
		}

		let basepath = project.basepath;
		try {
			let result = await this.modelInterfaceCategory.list(project_id),
				newResult = [];

			for (let i = 0, item, list; i < result.length; i++) {
				item = result[i].toObject();
				list = await this.model.listByInterStatus(item._id, "open");
				for (let j = 0; j < list.length; j++) {
					list[j] = list[j].toObject();
					list[j].basepath = basepath;
				}

				newResult = [].concat(newResult, list);
			}

			ctx.body = xU.$response(newResult);
		} catch (err) {
			ctx.body = xU.$response(null, 402, err.message);
		}
	}
}

exports.ControllerInterface = ControllerInterface;
