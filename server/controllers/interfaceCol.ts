const ModelInterfaceCol = require("server/models/interfaceCol");
const ModelInterfaceCase = require("server/models/interfaceCase");
const ModelInterface = require("server/models/interface");
const ModelProject = require("server/models/project");
const ControllerBase = require("./base");

class interfaceColController extends ControllerBase {
	constructor(ctx) {
		super(ctx);
		this.colModel = orm.interfaceCol;
		this.modelCase = orm.interfaceCase;
		this.modelInterface = orm.interface;
	}

	/**
	 * 获取所有接口集
	 * @interface /col/list
	 * @method GET
	 * @category col
	 * @foldnumber 10
	 * @param {String} project_id email名称，不能为空
	 * @returns {Object}
	 * @example
	 */
	async list(ctx) {
		try {
			let id = ctx.query.project_id;
			let project = await orm.project.getBaseInfo(id);
			if (project.project_type === "private") {
				if ((await this.checkAuth(project._id, "project", "view")) !== true) {
					return (ctx.body = xU.$response(null, 406, "没有权限"));
				}
			}
			let result = await this.colModel.list(id);
			result = result.sort((a, b) => {
				return a.index - b.index;
			});

			for (let i = 0; i < result.length; i++) {
				result[i] = result[i].toObject();
				let caseList = await this.modelCase.list(result[i]._id);

				for (let j = 0; j < caseList.length; j++) {
					let item = caseList[j].toObject();
					let interfaceData = await this.modelInterface.getBaseinfo(
						item.interface_id
					);
					item.path = interfaceData.path;
					caseList[j] = item;
				}

				caseList = caseList.sort((a, b) => {
					return a.index - b.index;
				});
				result[i].caseList = caseList;
			}
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 增加接口集
	 * @interface /col/add_col
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {Number} project_id
	 * @param {String} name
	 * @param {String} desc
	 * @returns {Object}
	 * @example
	 */

	async addCol(ctx) {
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
			if (!params.name) {
				return (ctx.body = xU.$response(null, 400, "名称不能为空"));
			}

			let auth = await this.checkAuth(params.project_id, "project", "edit");
			if (!auth) {
				return (ctx.body = xU.$response(null, 400, "没有权限"));
			}

			let result = await this.colModel.save({
				name: params.name,
				project_id: params.project_id,
				desc: params.desc,
				uid: this.getUid(),
				add_time: xU.time(),
				up_time: xU.time()
			});
			let username = this.getUsername();
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了接口集 <a href="/project/${
					params.project_id
				}/interface/col/${result._id}">${params.name}</a>`,
				type: "project",
				uid: this.getUid(),
				username: username,
				typeid: params.project_id
			});
			// orm.project.up(params.project_id,{up_time: new Date().getTime()}).then();
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 获取一个接口集下的所有的测试用例
	 * @interface /col/case_list
	 * @method GET
	 * @category col
	 * @foldnumber 10
	 * @param {String} col_id 接口集id
	 * @returns {Object}
	 * @example
	 */
	async getCaseList(ctx) {
		try {
			let id = ctx.query.col_id;
			if (!id || id == 0) {
				return (ctx.body = xU.$response(null, 407, "col_id不能为空"));
			}

			let colData = await this.colModel.get(id);
			let project = await orm.project.getBaseInfo(colData.project_id);
			if (project.project_type === "private") {
				if ((await this.checkAuth(project._id, "project", "view")) !== true) {
					return (ctx.body = xU.$response(null, 406, "没有权限"));
				}
			}

			ctx.body = await xU.getCaseList(id);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 获取一个接口集下的所有的测试用例的环境变量
	 * @interface /col/case_env_list
	 * @method GET
	 * @category col
	 * @foldnumber 10
	 * @param {String} col_id 接口集id
	 * @returns {Object}
	 * @example
	 */
	async getCaseEnvList(ctx) {
		try {
			let id = ctx.query.col_id;
			if (!id || id == 0) {
				return (ctx.body = xU.$response(null, 407, "col_id不能为空"));
			}

			let colData = await this.colModel.get(id);
			let project = await orm.project.getBaseInfo(colData.project_id);
			if (project.project_type === "private") {
				if ((await this.checkAuth(project._id, "project", "view")) !== true) {
					return (ctx.body = xU.$response(null, 406, "没有权限"));
				}
			}

			// 通过col_id 找到 caseList
			let projectList = await this.modelCase.list(id, "project_id");
			// 对projectList 进行去重处理
			projectList = this.unique(projectList, "project_id");

			// 遍历projectList 找到项目和env
			let projectEnvList = [];
			for (let i = 0; i < projectList.length; i++) {
				let result = await orm.project.getBaseInfo(projectList[i], "name  env");
				projectEnvList.push(result);
			}
			ctx.body = xU.$response(projectEnvList);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	requestParamsToObj(arr) {
		if (!arr || !Array.isArray(arr) || arr.length === 0) {
			return {};
		}
		let obj = {};
		arr.forEach(item => {
			obj[item.name] = "";
		});
		return obj;
	}

	/**
	 * 获取一个接口集下的所有的测试用例
	 * @interface /col/case_list_by_var_params
	 * @method GET
	 * @category col
	 * @foldnumber 10
	 * @param {String} col_id 接口集id
	 * @returns {Object}
	 * @example
	 */

	async getCaseListByVariableParams(ctx) {
		try {
			let id = ctx.query.col_id;
			if (!id || id == 0) {
				return (ctx.body = xU.$response(null, 407, "col_id不能为空"));
			}
			let resultList = await this.modelCase.list(id, "all");
			if (resultList.length === 0) {
				return (ctx.body = xU.$response([]));
			}
			let project = await orm.project.getBaseInfo(resultList[0].project_id);

			if (project.project_type === "private") {
				if ((await this.checkAuth(project._id, "project", "view")) !== true) {
					return (ctx.body = xU.$response(null, 406, "没有权限"));
				}
			}

			for (let index = 0; index < resultList.length; index++) {
				let result = resultList[index].toObject();
				let item = {},
					body,
					query,
					bodyParams,
					pathParams;
				let data = await this.modelInterface.get(result.interface_id);
				if (!data) {
					await this.modelCase.del(result._id);
					continue;
				}
				item._id = result._id;
				item.casename = result.casename;
				body = xU.json_parse(data.res_body);
				body = typeof body === "object" ? body : {};
				if (data.res_body_is_json_schema) {
					body = xU.schemaToJson(body, {
						alwaysFakeOptionals: true
					});
				}
				item.body = Object.assign({}, body);
				query = this.requestParamsToObj(data.req_query);
				pathParams = this.requestParamsToObj(data.req_params);
				if (data.req_body_type === "form") {
					bodyParams = this.requestParamsToObj(data.req_body_form);
				} else {
					bodyParams = xU.json_parse(data.req_body_other);
					if (data.req_body_is_json_schema) {
						bodyParams = xU.schemaToJson(bodyParams, {
							alwaysFakeOptionals: true
						});
					}
					bodyParams = typeof bodyParams === "object" ? bodyParams : {};
				}
				item.params = Object.assign(pathParams, query, bodyParams);
				item.index = result.index;
				resultList[index] = item;
			}

			ctx.body = xU.$response(resultList);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 增加一个测试用例
	 * @interface /col/add_case
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {String} casename
	 * @param {Number} col_id
	 * @param {Number} project_id
	 * @param {String} domain
	 * @param {String} path
	 * @param {String} method
	 * @param {Object} req_query
	 * @param {Object} req_headers
	 * @param {String} req_body_type
	 * @param {Array} req_body_form
	 * @param {String} req_body_other
	 * @returns {Object}
	 * @example
	 */

	async addCase(ctx) {
		try {
			let params = ctx.request.body;
			params = xU.ensureParamsType(params, {
				casename: "string",
				project_id: "number",
				col_id: "number",
				interface_id: "number",
				case_env: "string"
			});

			if (!params.project_id) {
				return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
			}

			if (!params.interface_id) {
				return (ctx.body = xU.$response(null, 400, "接口id不能为空"));
			}

			let auth = await this.checkAuth(params.project_id, "project", "edit");
			if (!auth) {
				return (ctx.body = xU.$response(null, 400, "没有权限"));
			}

			if (!params.col_id) {
				return (ctx.body = xU.$response(null, 400, "接口集id不能为空"));
			}

			if (!params.casename) {
				return (ctx.body = xU.$response(null, 400, "用例名称不能为空"));
			}

			params.uid = this.getUid();
			params.index = 0;
			params.add_time = xU.time();
			params.up_time = xU.time();
			let result = await this.modelCase.save(params);
			let username = this.getUsername();

			this.colModel.get(params.col_id).then(col => {
				xU.saveLog({
					content: `<a href="/user/profile/${this.getUid()}">${username}</a> 在接口集 <a href="/project/${
						params.project_id
					}/interface/col/${params.col_id}">${
						col.name
					}</a> 下添加了测试用例 <a href="/project/${
						params.project_id
					}/interface/case/${result._id}">${params.casename}</a>`,
					type: "project",
					uid: this.getUid(),
					username: username,
					typeid: params.project_id
				});
			});
			orm.project
				.up(params.project_id, { up_time: new Date().getTime() })
				.then();

			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	async addCaseList(ctx) {
		try {
			let params = ctx.request.body;
			params = xU.ensureParamsType(params, {
				project_id: "number",
				col_id: "number"
			});
			if (!params.interface_list || !Array.isArray(params.interface_list)) {
				return (ctx.body = xU.$response(null, 400, "interface_list 参数有误"));
			}

			if (!params.project_id) {
				return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
			}

			let auth = await this.checkAuth(params.project_id, "project", "edit");
			if (!auth) {
				return (ctx.body = xU.$response(null, 400, "没有权限"));
			}

			if (!params.col_id) {
				return (ctx.body = xU.$response(null, 400, "接口集id不能为空"));
			}

			let data = {
				uid: this.getUid(),
				index: 0,
				add_time: xU.time(),
				up_time: xU.time(),
				project_id: params.project_id,
				col_id: params.col_id
			};

			for (let i = 0; i < params.interface_list.length; i++) {
				let interfaceData = await this.modelInterface.get(
					params.interface_list[i]
				);
				data.interface_id = params.interface_list[i];
				data.casename = interfaceData.title;

				// 处理json schema 解析
				if (
					interfaceData.req_body_type === "json" &&
					interfaceData.req_body_other &&
					interfaceData.req_body_is_json_schema
				) {
					let req_body_other = xU.json_parse(interfaceData.req_body_other);
					req_body_other = xU.schemaToJson(req_body_other, {
						alwaysFakeOptionals: true
					});

					data.req_body_other = JSON.stringify(req_body_other);
				} else {
					data.req_body_other = interfaceData.req_body_other;
				}

				data.req_body_type = interfaceData.req_body_type;
				let caseResultData = await this.modelCase.save(data);
				let username = this.getUsername();
				this.colModel.get(params.col_id).then(col => {
					xU.saveLog({
						content: `<a href="/user/profile/${this.getUid()}">${username}</a> 在接口集 <a href="/project/${
							params.project_id
						}/interface/col/${params.col_id}">${
							col.name
						}</a> 下导入了测试用例 <a href="/project/${
							params.project_id
						}/interface/case/${caseResultData._id}">${data.casename}</a>`,
						type: "project",
						uid: this.getUid(),
						username: username,
						typeid: params.project_id
					});
				});
			}

			orm.project
				.up(params.project_id, { up_time: new Date().getTime() })
				.then();

			ctx.body = xU.$response("ok");
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	async cloneCaseList(ctx) {
		try {
			let params = ctx.request.body;
			params = xU.ensureParamsType(params, {
				project_id: "number",
				col_id: "number",
				new_col_id: "number"
			});

			const { project_id, col_id, new_col_id } = params;

			if (!project_id) {
				return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
			}

			let auth = await this.checkAuth(params.project_id, "project", "edit");

			if (!auth) {
				return (ctx.body = xU.$response(null, 400, "没有权限"));
			}

			if (!col_id) {
				return (ctx.body = xU.$response(null, 400, "被克隆的接口集id不能为空"));
			}

			if (!new_col_id) {
				return (ctx.body = xU.$response(null, 400, "克隆的接口集id不能为空"));
			}

			let oldColCaselistData = await this.modelCase.list(col_id, "all");

			oldColCaselistData = oldColCaselistData.sort((a, b) => {
				return a.index - b.index;
			});

			const newCaseList = [];
			const oldCaseObj = {};
			let obj = {};

			const handleTypeParams = (data, name) => {
				let res = data[name];
				const type = Object.prototype.toString.call(res);
				if (type === "[object Array]" && res.length) {
					res = JSON.stringify(res);
					try {
						res = JSON.parse(handleReplaceStr(res));
					} catch (e) {
						console.log("e ->", e);
					}
				} else if (type === "[object String]" && data[name]) {
					res = handleReplaceStr(res);
				}
				return res;
			};

			const handleReplaceStr = str => {
				if (str.indexOf("$") !== -1) {
					str = str.replace(/\$\.([0-9]+)\./g, function (match, p1) {
						p1 = p1.toString();
						return `$.${newCaseList[oldCaseObj[p1]]}.` || "";
					});
				}
				return str;
			};

			// 处理数据里面的$id;
			const handleParams = data => {
				data.col_id = new_col_id;
				delete data._id;
				delete data.add_time;
				delete data.up_time;
				delete data.__v;
				data.req_body_other = handleTypeParams(data, "req_body_other");
				data.req_query = handleTypeParams(data, "req_query");
				data.req_params = handleTypeParams(data, "req_params");
				data.req_body_form = handleTypeParams(data, "req_body_form");
				return data;
			};

			for (let i = 0; i < oldColCaselistData.length; i++) {
				obj = oldColCaselistData[i].toObject();
				// 将被克隆的id和位置绑定
				oldCaseObj[obj._id] = i;
				let caseData = handleParams(obj);
				let newCase = await this.modelCase.save(caseData);
				newCaseList.push(newCase._id);
			}

			orm.project
				.up(params.project_id, { up_time: new Date().getTime() })
				.then();
			ctx.body = xU.$response("ok");
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 更新一个测试用例
	 * @interface /col/up_case
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {number} id
	 * @param {String} casename
	 * @param {String} domain
	 * @param {String} path
	 * @param {String} method
	 * @param {Object} req_query
	 * @param {Object} req_headers
	 * @param {String} req_body_type
	 * @param {Array} req_body_form
	 * @param {String} req_body_other
	 * @returns {Object}
	 * @example
	 */

	async upCase(ctx) {
		try {
			let params = ctx.request.body;
			params = xU.ensureParamsType(params, {
				id: "number",
				casename: "string"
			});

			if (!params.id) {
				return (ctx.body = xU.$response(null, 400, "用例id不能为空"));
			}

			// if (!params.casename) {
			//   return (ctx.body = xU.$response(null, 400, '用例名称不能为空'));
			// }

			let caseData = await this.modelCase.get(params.id);
			let auth = await this.checkAuth(caseData.project_id, "project", "edit");
			if (!auth) {
				return (ctx.body = xU.$response(null, 400, "没有权限"));
			}

			params.uid = this.getUid();

			//不允许修改接口id和项目id
			delete params.interface_id;
			delete params.project_id;
			let result = await this.modelCase.up(params.id, params);
			let username = this.getUsername();
			this.colModel.get(caseData.col_id).then(col => {
				xU.saveLog({
					content: `<a href="/user/profile/${this.getUid()}">${username}</a> 在接口集 <a href="/project/${
						caseData.project_id
					}/interface/col/${caseData.col_id}">${
						col.name
					}</a> 更新了测试用例 <a href="/project/${
						caseData.project_id
					}/interface/case/${params.id}">${
						params.casename || caseData.casename
					}</a>`,
					type: "project",
					uid: this.getUid(),
					username: username,
					typeid: caseData.project_id
				});
			});

			orm.project
				.up(caseData.project_id, { up_time: new Date().getTime() })
				.then();

			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 402, e.message);
		}
	}

	/**
	 * 获取一个测试用例详情
	 * @interface /col/case
	 * @method GET
	 * @category col
	 * @foldnumber 10
	 * @param {String} caseid
	 * @returns {Object}
	 * @example
	 */

	async getCase(ctx) {
		try {
			let id = ctx.query.caseid;
			let result = await this.modelCase.get(id);
			if (!result) {
				return (ctx.body = xU.$response(null, 400, "不存在的case"));
			}
			result = result.toObject();
			let data = await this.modelInterface.get(result.interface_id);
			if (!data) {
				return (ctx.body = xU.$response(
					null,
					400,
					"找不到对应的接口，请联系管理员"
				));
			}
			data = data.toObject();

			let projectData = await orm.project.getBaseInfo(data.project_id);
			result.path = projectData.basepath + data.path;
			result.method = data.method;
			result.req_body_type = data.req_body_type;
			result.req_headers = xU.handleParamsValue(
				data.req_headers,
				result.req_headers
			);
			result.res_body = data.res_body;
			result.res_body_type = data.res_body_type;
			result.req_body_form = xU.handleParamsValue(
				data.req_body_form,
				result.req_body_form
			);
			result.req_query = xU.handleParamsValue(data.req_query, result.req_query);
			result.req_params = xU.handleParamsValue(
				data.req_params,
				result.req_params
			);
			result.interface_up_time = data.up_time;
			result.req_body_is_json_schema = data.req_body_is_json_schema;
			result.res_body_is_json_schema = data.res_body_is_json_schema;
			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 400, e.message);
		}
	}

	/**
	 * 更新一个接口集name或描述
	 * @interface /col/up_col
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {String} name
	 * @param {String} desc
	 * @returns {Object}
	 * @example
	 */

	async upCol(ctx) {
		try {
			let params = ctx.request.body;
			let id = params.col_id;
			if (!id) {
				return (ctx.body = xU.$response(null, 400, "缺少 col_id 参数"));
			}
			let colData = await this.colModel.get(id);
			if (!colData) {
				return (ctx.body = xU.$response(null, 400, "不存在"));
			}
			let auth = await this.checkAuth(colData.project_id, "project", "edit");
			if (!auth) {
				return (ctx.body = xU.$response(null, 400, "没有权限"));
			}
			delete params.col_id;
			let result = await this.colModel.up(id, params);
			let username = this.getUsername();
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了测试集合 <a href="/project/${
					colData.project_id
				}/interface/col/${id}">${colData.name}</a> 的信息`,
				type: "project",
				uid: this.getUid(),
				username: username,
				typeid: colData.project_id
			});

			ctx.body = xU.$response(result);
		} catch (e) {
			ctx.body = xU.$response(null, 400, e.message);
		}
	}

	/**
	 * 更新多个接口case index
	 * @interface /col/up_case_index
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {Array}  [id, index]
	 * @returns {Object}
	 * @example
	 */

	async upCaseIndex(ctx) {
		try {
			let params = ctx.request.body;
			if (!params || !Array.isArray(params)) {
				ctx.body = xU.$response(null, 400, "请求参数必须是数组");
			}
			params.forEach(item => {
				if (item.id) {
					this.modelCase.upCaseIndex(item.id, item.index).then(
						res => {},
						err => {
							xU.applog.error(err.message);
						}
					);
				}
			});

			return (ctx.body = xU.$response("成功！"));
		} catch (e) {
			ctx.body = xU.$response(null, 400, e.message);
		}
	}

	/**
	 * 更新多个测试集合 index
	 * @interface /col/up_col_index
	 * @method POST
	 * @category col
	 * @foldnumber 10
	 * @param {Array}  [id, index]
	 * @returns {Object}
	 * @example
	 */

	async upColIndex(ctx) {
		try {
			let params = ctx.request.body;
			if (!params || !Array.isArray(params)) {
				ctx.body = xU.$response(null, 400, "请求参数必须是数组");
			}
			params.forEach(item => {
				if (item.id) {
					this.colModel.upColIndex(item.id, item.index).then(
						res => {},
						err => {
							xU.applog.error(err.message);
						}
					);
				}
			});

			return (ctx.body = xU.$response("成功！"));
		} catch (e) {
			ctx.body = xU.$response(null, 400, e.message);
		}
	}

	/**
	 * 删除一个接口集
	 * @interface /col/del_col
	 * @method GET
	 * @category col
	 * @foldnumber 10
	 * @param {String}
	 * @returns {Object}
	 * @example
	 */

	async delCol(ctx) {
		try {
			let id = ctx.query.col_id;
			let colData = await this.colModel.get(id);
			if (!colData) {
				ctx.body = xU.$response(null, 400, "不存在的id");
			}

			if (colData.uid !== this.getUid()) {
				let auth = await this.checkAuth(
					colData.project_id,
					"project",
					"danger"
				);
				if (!auth) {
					return (ctx.body = xU.$response(null, 400, "没有权限"));
				}
			}
			let result = await this.colModel.del(id);
			await this.modelCase.delByCol(id);
			let username = this.getUsername();
			xU.saveLog({
				content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了接口集 ${
					colData.name
				} 及其下面的接口`,
				type: "project",
				uid: this.getUid(),
				username: username,
				typeid: colData.project_id
			});
			return (ctx.body = xU.$response(result));
		} catch (e) {
			xU.$response(null, 400, e.message);
		}
	}

	/**
	 *
	 * @param {*} ctx
	 */

	async delCase(ctx) {
		try {
			let caseid = ctx.query.caseid;
			let caseData = await this.modelCase.get(caseid);
			if (!caseData) {
				ctx.body = xU.$response(null, 400, "不存在的caseid");
			}

			if (caseData.uid !== this.getUid()) {
				let auth = await this.checkAuth(
					caseData.project_id,
					"project",
					"danger"
				);
				if (!auth) {
					return (ctx.body = xU.$response(null, 400, "没有权限"));
				}
			}

			let result = await this.modelCase.del(caseid);

			let username = this.getUsername();
			this.colModel.get(caseData.col_id).then(col => {
				xU.saveLog({
					content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了接口集 <a href="/project/${
						caseData.project_id
					}/interface/col/${caseData.col_id}">${col.name}</a> 下的接口 ${
						caseData.casename
					}`,
					type: "project",
					uid: this.getUid(),
					username: username,
					typeid: caseData.project_id
				});
			});

			orm.project
				.up(caseData.project_id, { up_time: new Date().getTime() })
				.then();
			return (ctx.body = xU.$response(result));
		} catch (e) {
			xU.$response(null, 400, e.message);
		}
	}

	async runCaseScript(ctx) {
		let params = ctx.request.body;
		ctx.body = await xU.runCaseScript(
			params,
			params.col_id,
			params.interface_id,
			this.getUid()
		);
	}

	// 数组去重
	unique(array, compare) {
		let hash = {};
		let arr = array.reduce(function (item, next) {
			hash[next[compare]]
				? ""
				: (hash[next[compare]] = true && item.push(next));
			// console.log('item',item.project_id)
			return item;
		}, []);
		// 输出去重以后的project_id
		return arr.map(item => {
			return item[compare];
		});
	}
}

module.exports = interfaceColController;
