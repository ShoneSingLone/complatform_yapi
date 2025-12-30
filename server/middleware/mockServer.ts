const ModelProject = require("server/models/project");
const ModelInterface = require("server/models/interface");
const mockExtra = require("../../common/mock-extra");
const { schemaValidator } = require("../../common/utils");
const { customCookies } = require("../utils/customCookies");

const Mock = require("mockjs");
const { ObjectId } = require("mongodb");
const { execProxyRequest } = require("./requestProxy");
/**
 * @description 如果是成功的响应，需要备一个份
 * @param {any} {
 * 	ctx, modelInterface, interfaceData
 * }
 */
async function ifSuccessfulStoreResponse({ ctx, modelInterface, interfaceData }) {
	if (interfaceData.resBackupJson) {
		return;
	}
	if (ctx.status != 200 || ["text/html"].includes(ctx.type)) {
		return;
	}

	/* 'application/json' */
	const data = {};
	try {
		let res;
		if (Object.prototype.toString.call(ctx.body) === `[object Uint8Array]`) {
			res = JSON.parse(ctx.body.toString());
		} else if (typeof ctx.body === "object") {
			res = ctx.body;
		}

		if (xU._.isPlainObject(res)) {
			data.resBackupJson = JSON.stringify(res, null, 2);
			await modelInterface.up(interfaceData._id, data);
		} else {
			console.error(res);
		}
	} catch (error) {
		xU.applog.error(error);
	}
}

async function setResponseByRunProxy(ctx, { ENV_VAR, project_id }) {
	const { domain, header: ENV_VAR_HEADER_ARRAY } = ENV_VAR || {};
	const targetURL = ctx.originalUrl.replace(`/mock/${project_id}`, "");
	const headers = (() => {
		/* 如果有ENV_VAR,那么用ENV_VAR覆盖，否则直接用ctx的headers */

		if (xU._.isEmpty(ENV_VAR_HEADER_ARRAY)) {
			return { ...ctx.headers };
		}
		return xU._.reduce(
			ENV_VAR_HEADER_ARRAY,
			(_headers, { name, value }) => {
				/* TODO:如果value是表达式，还需要处理表达式=》比如全局变量， */
				if (!_headers[name]) {
					_headers[name] = value;
				}
				return _headers;
			},
			{ ...ctx.headers }
		);
	})();

	const [path, proxyHOST, proxyPORT] = (() => {
		let path, proxyHOST, proxyPORT;
		if (headers["yapi-run-test"]) {
			path = headers["yapi-run-test"];
		} else {
			path = `${domain}${targetURL}`;
		}

		if (headers["yapi-proxy-host"]) {
			proxyHOST = headers["yapi-proxy-host"];
		}

		if (headers["yapi-proxy-port"]) {
			proxyPORT = headers["yapi-proxy-port"];
		}

		return [path, proxyHOST, proxyPORT];
	})();

	let response;
	let body = xU.$response(null, 500, `ResponseByRunProxy=>${path}`);

	try {
		const ResponseThroghProxyOptions = {
			ctx,
			path,
			headers,
			host: proxyHOST,
			port: proxyPORT
		};
		response = await execProxyRequest(ResponseThroghProxyOptions);
	} catch (error) {
		console.error(error);
		/* 返回的原始数据 */
		if (error.message) {
			body.errorMessage = error.message;
		} else if (error?.response?.data) {
			const { data, status } = error.response;
			body = data;
			ctx.status = status || 500;
		}
	}

	try {
		if (response) {
			body = response.body;
			// console.log("response.body", response.body.toString('utf-8'));
			xU._.each(response.headers, (value, prop) => {
				/* TODO: */
				/* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding */
				if (prop === "transfer-encoding" || prop === "content-length") {
					return;
				}
				ctx.set(prop, value);
			});

			// 设置响应状态码为被代理服务器返回的状态码
			if (response.statusCode) {
				ctx.status = response.statusCode;
			}

			try {
				/* yapi 接口请求参数 */
				ctx.set("httpRequestOptions", JSON.stringify(response.httpRequestOptions));
			} catch (error) {
				console.error(error);
			}
		}
	} catch (error) {
		body = xU.$response(null, 555, `错误来自yapi服务器： ${error.message}`);
	} finally {
		ctx.body = body || {};
		return ctx.body;
	}
}

/**
 *
 * @param {*} apiPath /user/tom
 * @param {*} apiRule /user/:username
 */
function matchApi(apiPath, apiRule) {
	let apiRules = apiRule.split("/");
	let apiPaths = apiPath.split("/");
	let pathParams = {
		__weight: 0
	};

	if (apiPaths.length !== apiRules.length) {
		return false;
	}
	for (let i = 0; i < apiRules.length; i++) {
		if (apiRules[i]) {
			apiRules[i] = apiRules[i].trim();
		} else {
			continue;
		}
		if (
			apiRules[i].length > 2 &&
			apiRules[i][0] === "{" &&
			apiRules[i][apiRules[i].length - 1] === "}"
		) {
			pathParams[apiRules[i].substr(1, apiRules[i].length - 2)] = apiPaths[i];
		} else if (apiRules[i].indexOf(":") === 0) {
			pathParams[apiRules[i].substr(1)] = apiPaths[i];
		} else if (
			apiRules[i].length > 2 &&
			apiRules[i].indexOf("{") > -1 &&
			apiRules[i].indexOf("}") > -1
		) {
			let params = [];
			apiRules[i] = apiRules[i].replace(/\{(.+?)\}/g, function (src, match) {
				params.push(match);
				return "([^\\/\\s]+)";
			});
			apiRules[i] = new RegExp(apiRules[i]);
			if (!apiRules[i].test(apiPaths[i])) {
				return false;
			}

			let matchs = apiPaths[i].match(apiRules[i]);

			params.forEach((item, index) => {
				pathParams[item] = matchs[index + 1];
			});
		} else {
			if (apiRules[i] !== apiPaths[i]) {
				return false;
			} else {
				pathParams.__weight++;
			}
		}
	}
	return pathParams;
}

function parseCookie(str) {
	if (!str || typeof str !== "string") {
		return str;
	}
	if (str.split(";")[0]) {
		let c = str.split(";")[0].split("=");
		return { name: c[0], value: c[1] || "" };
	}
	return null;
}

function handleCorsRequest(ctx) {
	let header = ctx.request.header;
	ctx.set("Access-Control-Allow-Origin", header.origin);
	ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEADER, PATCH, OPTIONS");
	ctx.set("Access-Control-Allow-Headers", header["access-control-request-headers"]);
	ctx.set("Access-Control-Allow-Credentials", true);
	ctx.set("Access-Control-Max-Age", 1728000);
	ctx.body = "ok";
}

// 必填字段是否填写好
function mockValidator(interfaceData, ctx) {
	let i,
		j,
		l,
		len,
		noRequiredArr = [];
	let method = interfaceData.method.toUpperCase() || "GET";
	// query 判断
	for (i = 0, l = interfaceData.req_query.length; i < l; i++) {
		let curQuery = interfaceData.req_query[i];
		if (curQuery && typeof curQuery === "object" && curQuery.required === "1") {
			if (!ctx.query[curQuery.name]) {
				noRequiredArr.push(curQuery.name);
			}
		}
	}
	// form 表单判断
	if (xU.var.HTTP_METHOD[method].request_body && interfaceData.req_body_type === "form") {
		for (j = 0, len = interfaceData.req_body_form.length; j < len; j++) {
			let curForm = interfaceData.req_body_form[j];
			if (curForm && typeof curForm === "object" && curForm.required === "1") {
				if (
					ctx.request.body[curForm.name] ||
					(ctx.request.body.fields && ctx.request.body.fields[curForm.name]) ||
					(ctx.request.body.files && ctx.request.body.files[curForm.name])
				) {
					continue;
				}

				noRequiredArr.push(curForm.name);
			}
		}
	}
	let validResult;
	// json schema 判断
	if (
		xU.var.HTTP_METHOD[method].request_body &&
		interfaceData.req_body_type === "json" &&
		interfaceData.req_body_is_json_schema === true
	) {
		const schema = xU.json_parse(interfaceData.req_body_other);
		const params = xU.json_parse(ctx.request.body);
		validResult = schemaValidator(schema, params);
	}
	if (noRequiredArr.length > 0 || (validResult && !validResult.valid)) {
		let message = `错误信息：`;
		message += noRequiredArr.length > 0 ? `缺少必须字段 ${noRequiredArr.join(",")}  ` : "";
		message +=
			validResult && !validResult.valid ? `schema 验证请求参数 ${validResult.message}` : "";

		return {
			valid: false,
			message
		};
	}

	return { valid: true };
}

const middlewareMockServer = () => async (ctx, next) => {
	ctx.callme.push("middlewareMockServer");
	xU.applog.info(ctx.path, ctx.callme);

	let ctx_path = ctx.path;
	let header = ctx.request.header;
	/*** 如果不是/Mock/链接，不做代理 */
	if (ctx_path.indexOf("/mock/") !== 0) {
		if (next) await next();
		return true;
	}
	console.log(`🚀useMockServer: ${ctx.path}`);
	let paths = ctx_path.split("/");
	let project_id = paths[2];
	paths.splice(0, 3);
	ctx_path = "/" + paths.join("/");

	ctx.set("Access-Control-Allow-Origin", header.origin);
	ctx.set("Access-Control-Allow-Credentials", true);

	if (!project_id) {
		return (ctx.body = xU.$response(null, 400, "projectId不能为空"));
	}

	let project;
	try {
		project = await orm.project.get(project_id);
	} catch (e) {
		console.error(e);
		return (ctx.body = xU.$response(null, 404, "不存在的项目"));
	}

	if (!project) {
		return (ctx.body = xU.$response(null, 400, "不存在的项目"));
	}

	/*用于初步确定Interface的中间变量*/
	let interface_array;
	/*具体的interfac数据*/
	let current_request_interface_data_in_yapi_db;
	/**
	 * @type ModelInterface
	 */

	try {
		/**
		 * TODO：
		 * 获取当前链接的对应代理地址
		 * 如果该接口是已完成状态
		 * 尝试访问实际的主机
		 * 获取真实的响应数据
		 * 否则 -
		 */

		/* 使用mock设定 */
		/* basepath 有前缀，去掉前缀，方便匹配链接 */
		const REAL_URL_PATH = (function () {
			let _path = ctx_path;
			if (project.basepath !== "/") {
				_path = ctx_path.replace(project.basepath, "");
			}
			return String(_path).replace(/\/\//g, "/");
		})();
		/*直接通过url获取接口信息*/
		interface_array = await orm.interface.getByPath(project._id, REAL_URL_PATH, ctx.method);

		//处理query_path情况  url 中有 ?params=xxx
		if (!interface_array) {
			/* 通过realUrlPath，method 来获取API的信息 */
			const interface_array_by_query_path = await orm.interface.getByQueryPath(
				project._id,
				REAL_URL_PATH,
				ctx.method
			);

			interface_array = handleQueryInUrlPath(
				ctx.query,
				interface_array_by_query_path
				// interfaceArray
			);
			//处理动态路由
		} else if (interface_array.length === 0) {
			let newData = await orm.interface.getVar(project._id, ctx.method);

			let findInterface;
			let weight = 0;
			/* fixed: /{xxxId} ：简直是陋习*/
			xU._.some(newData, item => {
				let m = matchApi(REAL_URL_PATH, item.path);
				console.log(item.path);
				if (m !== false) {
					if (m.__weight >= weight) {
						findInterface = item;
					}
					delete m.__weight;
					ctx.request.query = Object.assign(m, ctx.request.query);
					return true;
				}
				return false;
			});

			if (!findInterface) {
				//非正常跨域预检请求回应
				if (
					ctx.method === "OPTIONS" &&
					ctx.request.header["access-control-request-method"]
				) {
					return handleCorsRequest(ctx);
				}

				/* 返回标准404响应 */
				ctx.status = 404;
				return (ctx.body = xU.$response(
					null,
					404,
					`当前使用yAPI代理，${ctx.method} ${REAL_URL_PATH}，但API不存在。请确认GET?POST?URL?是否正确`
				));
			}
			interface_array = [await orm.interface.get(findInterface._id)];
		} else if (interface_array.length > 1) {
			return (ctx.body = xU.$response(null, 405, "存在多个api，请检查数据库"));
		}
		current_request_interface_data_in_yapi_db = interface_array[0];

		// 必填字段是否填写好
		if (project.strice) {
			const validResult = mockValidator(current_request_interface_data_in_yapi_db, ctx);
			if (!validResult.valid) {
				return (ctx.body = xU.$response(
					null,
					404,
					`接口字段验证不通过, ${validResult.message}`
				));
			}
		}

		/* 是否启用代理，在局域网中访问其他主机 */
		const isRunWithYapiProxy = (() => {
			return (
				current_request_interface_data_in_yapi_db?.isProxy || ctx.headers["yapi-run-test"]
			);
		})();

		if (isRunWithYapiProxy) {
			const ENV_VAR = ((/* 获取对应的代理环境 */) => {
				return xU._.find(project.env, i => {
					try {
						const id = ObjectId(i._id).toString();
						return id === current_request_interface_data_in_yapi_db.witchEnv;
					} catch (error) {
						console.log("ERROR:获取对应的代理环境", error);
					}
					return false;
				});
			})();

			await setResponseByRunProxy(ctx, {
				project_id: project._id,
				ENV_VAR,
				yapiRun: ctx.headers["yapi-run-test"]
			});

			ifSuccessfulStoreResponse({
				ctx,
				modelInterface: orm.interface,
				interfaceData: current_request_interface_data_in_yapi_db
			});

			return;
		}

		let res;
		// mock 返回值处理
		res = current_request_interface_data_in_yapi_db.res_body;
		try {
			if (current_request_interface_data_in_yapi_db.res_body_type === "json") {
				const isUseJsonSchema =
					current_request_interface_data_in_yapi_db.res_body_is_json_schema === true;

				if (isUseJsonSchema) {
					//json-schema
					const schema = xU.json_parse(
						current_request_interface_data_in_yapi_db.res_body
					);
					res = xU.schemaToJson(schema, {
						alwaysFakeOptionals: true
					});
				} else {
					// console.log('header', ctx.request.header['content-type'].indexOf('multipart/form-data'))
					// 处理 format-data

					if (
						xU._.isString(ctx.request.header["content-type"]) &&
						ctx.request.header["content-type"].indexOf("multipart/form-data") > -1
					) {
						ctx.request.body = ctx.request.body.fields;
					}
					// console.log('body', ctx.request.body)

					res = mockExtra(
						xU.json_parse(current_request_interface_data_in_yapi_db.res_body),
						{
							query: ctx.request.query,
							body: ctx.request.body,
							params: Object.assign({}, ctx.request.query, ctx.request.body)
						}
					);
					// console.log('res',res)
				}

				try {
					res = Mock.mock(res);
				} catch (e) {
					console.log("err", e.message);
					xU.applog.error(e);
				}
			}

			let context = {
				projectData: project,
				interfaceData: current_request_interface_data_in_yapi_db,
				ctx: ctx,
				mockJson: res,
				resHeader: {},
				httpCode: 200,
				delay: 0
			};

			/* 使用Mock.js 利用参数属性生成发 */
			if (project.is_mock_open && project.project_mock_script) {
				// 项目层面的mock脚本解析
				let script = project.project_mock_script;
				xU.handleMockScript(script, context);
			}

			await xU.emitHook("mock_after", context);

			let handleMock = new Promise(resolve => {
				setTimeout(() => {
					resolve(true);
				}, context.delay);
			});
			await handleMock;
			if (context.resHeader && typeof context.resHeader === "object") {
				for (let i in context.resHeader) {
					let cookie;
					if (i === "Set-Cookie") {
						if (context.resHeader[i] && typeof context.resHeader[i] === "string") {
							cookie = parseCookie(context.resHeader[i]);
							if (cookie && typeof cookie === "object") {
								customCookies(ctx, cookie.name, cookie.value, {
									maxAge: 864000000,
									httpOnly: false
								});
							}
						} else if (context.resHeader[i] && Array.isArray(context.resHeader[i])) {
							context.resHeader[i].forEach(item => {
								cookie = parseCookie(item);
								if (cookie && typeof cookie === "object") {
									customCookies(ctx, cookie.name, cookie.value, {
										maxAge: 864000000,
										httpOnly: false
									});
								}
							});
						}
					} else {
						ctx.set(i, context.resHeader[i]);
					}
				}
			}

			ctx.status = context.httpCode;
			let responseByMock = {};
			/* 使用备份的JSON数据，通过代理，如果没有，自动保存200的数据，用例的数据也可以用 */
			/* isUseBackup */
			(() => {
				if (current_request_interface_data_in_yapi_db.res_body_type === "backup") {
					try {
						const getJsonFn = new Function(
							`return ${current_request_interface_data_in_yapi_db.resBackupJson}`
						);
						responseByMock = getJsonFn.call(null);
					} catch (error) {
						/* 直接使用备份数据，不需要添加额外的 */
						ctx.type = "html";
						responseByMock = current_request_interface_data_in_yapi_db.resBackupJson;
						return;
					}
				} else if (xU._.isPlainObject(context.mockJson)) {
					/* TODO:这是干嘛用的？ */
					responseByMock = context.mockJson;
				}

				/* 使用备份的JSON数据 */
				responseByMock.A_NOTICE = {
					A_TIPS: `使用备份的JSON数据`
				};
			})();

			return (ctx.body = responseByMock);
		} catch (e) {
			xU.applog.error(e);
			return (ctx.body = {
				errcode: 400,
				message: "X-API server error: " + e.message,
				data: null
			});
		}
	} catch (e) {
		xU.applog.error(e);
		return (ctx.body = xU.$response(null, 409, e.message));
	}
};

module.exports = async function (app) {
	app.use(middlewareMockServer());
};

function handleQueryInUrlPath(ctxQuery, interface_array_by_query_path) {
	let i,
		l,
		j,
		len,
		curQuery,
		match = false;
	for (const currentInterfaceData of interface_array_by_query_path) {
		match = false;
		curQuery = currentInterfaceData.query_path;
		if (!curQuery || typeof curQuery !== "object" || !curQuery.path) {
			continue;
		}

		let j = 0;
		for (const queryParmas of curQuery.params) {
			if (ctxQuery[queryParmas.name] !== queryParmas.value) {
				continue;
			}
			/*TODO: 这是个啥意思？ */
			if (++j === curQuery.params.length) {
				match = true;
			}
		}
		if (match) {
			return [currentInterfaceData];
		}
	}
	return [];
}
