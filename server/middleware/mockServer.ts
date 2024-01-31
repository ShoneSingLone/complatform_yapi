const ModelProject = require("server/models/project");
const ModelInterface = require("server/models/interface");
const mockExtra = require("../../common/mock-extra");
const { schemaValidator } = require("../../common/utils");
const { customCookies } = require("../utils/customCookies");
const _ = require("lodash");
const Mock = require("mockjs");
const { ObjectId } = require("mongodb");
const { getResponseThroghProxy } = require("./requestProxy");

/**
 * @description 如果是成功的响应，需要备一个份
 * @param {any} {
 * 	ctx, modelInterface, interfaceData
 * }
 */
async function ifTheResponseIsSuccessfulACopyIsRequired({
	ctx,
	modelInterface,
	interfaceData
}) {
	if (ctx.status != 200 || ["text/html"].includes(ctx.type)) {
		return;
	}
	console.log(
		"ifTheResponseIsSuccessfulACopyIsRequired: ctx.type===",
		ctx.type
	);
	const data = {};
	try {
		let res;
		if (Object.prototype.toString.call(ctx.body) === `[object Uint8Array]`) {
			res = JSON.parse(ctx.body.toString());
		} else if (typeof ctx.body === "object") {
			res = ctx.body;
		}

		if (String(res.code) === "0") {
			data.resBackupJson = JSON.stringify(res);
			await modelInterface.up(interfaceData._id, data);
		} else {
			console.error(res);
		}
	} catch (error) {
		xU.applog.error(error);
	}
}

async function handleProxy(ctx, { domain, projectId }) {
	const targetURL = ctx.originalUrl.replace(`/mock/${projectId}`, "");
	const headers = (() => {
		return { ...ctx.headers };
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

	let body = xU.$response(null, 500, "代理失败");
	let response;
	try {
		response = await getResponseThroghProxy({
			ctx,
			path,
			host: proxyHOST,
			port: proxyPORT
		});
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
			_.each(response.headers, (value, prop) => {
				/* TODO: */
				/* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding */
				if (prop === "transfer-encoding") {
					return;
				}
				ctx.set(prop, value);
			});
		}
	} catch (error) {
		body = xU.$response(null, 555, `错误来自yapi服务器： ${error.message}`);
	}
	ctx.body = body || {};
	return ctx.body;
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
	ctx.set(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, HEADER, PATCH, OPTIONS"
	);
	ctx.set(
		"Access-Control-Allow-Headers",
		header["access-control-request-headers"]
	);
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
	if (
		xU.var.HTTP_METHOD[method].request_body &&
		interfaceData.req_body_type === "form"
	) {
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
		message +=
			noRequiredArr.length > 0
				? `缺少必须字段 ${noRequiredArr.join(",")}  `
				: "";
		message +=
			validResult && !validResult.valid
				? `schema 验证请求参数 ${validResult.message}`
				: "";

		return {
			valid: false,
			message
		};
	}

	return { valid: true };
}

const middlewareMockServer = () => async (ctx, next) => {
	ctx.callme.push("middlewareMockServer");
	let path = ctx.path;
	let header = ctx.request.header;
	/*** 如果不是/Mock/链接，不做代理 */
	if (path.indexOf("/mock/") !== 0) {
		if (next) await next();
		return true;
	}
	console.log(`🚀useMockServer: ${ctx.path}`);
	let paths = path.split("/");
	let projectId = paths[2];
	paths.splice(0, 3);
	path = "/" + paths.join("/");

	ctx.set("Access-Control-Allow-Origin", header.origin);
	ctx.set("Access-Control-Allow-Credentials", true);

	if (!projectId) {
		return (ctx.body = xU.$response(null, 400, "projectId不能为空"));
	}

	let project;
	try {
		project = await orm.project.get(projectId);
	} catch (e) {
		return (ctx.body = xU.$response(null, 403, e.message));
	}

	if (!project) {
		return (ctx.body = xU.$response(null, 400, "不存在的项目"));
	}

	/*用于初步确定Interface的中间变量*/
	let interfaceArray;
	/*具体的interfac数据*/
	let interfaceData;
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
		const REAL_URL_PATH = path.substr(project.basepath.length);
		/*直接通过url获取接口信息*/
		interfaceArray = await orm.interface.getByPath(
			project._id,
			REAL_URL_PATH,
			ctx.method
		);

		//处理query_path情况  url 中有 ?params=xxx
		if (!interfaceArray) {
			/* 通过realUrlPath，method 来获取API的信息 */
			const interfaceArray_byQueryPath = await orm.interface.getByQueryPath(
				project._id,
				REAL_URL_PATH,
				ctx.method
			);

			interfaceArray = handleQueryInUrlPath(
				ctx.query,
				interfaceArray_byQueryPath
				// interfaceArray
			);
			//处理动态路由
		} else if (interfaceArray.length === 0) {
			let newData = await orm.interface.getVar(project._id, ctx.method);

			let findInterface;
			let weight = 0;
			/* fixed: /{xxxId} ：简直是陋习*/
			_.some(newData, item => {
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

				return (ctx.body = xU.$response(
					null,
					404,
					`当前使用yAPI代理，${ctx.method} ${REAL_URL_PATH}，但API不存在。请确认GET?POST?URL?是否正确`
				));
			}
			interfaceArray = [await orm.interface.get(findInterface._id)];
		} else if (interfaceArray.length > 1) {
			return (ctx.body = xU.$response(null, 405, "存在多个api，请检查数据库"));
		} 
		interfaceData = interfaceArray[0];

		// 必填字段是否填写好
		if (project.strice) {
			const validResult = mockValidator(interfaceData, ctx);
			if (!validResult.valid) {
				return (ctx.body = xU.$response(
					null,
					404,
					`接口字段验证不通过, ${validResult.message}`
				));
			}
		}

		if (interfaceData?.isProxy || ctx.headers["yapi-run-test"]) {
			const env = _.find(project.env, i => {
				try {
					const id = ObjectId(i._id).toString();
					return id === interfaceData.witchEnv;
				} catch (error) {}
				return false;
			});
			await handleProxy(ctx, {
				projectId: project._id,
				domain: env && env.domain,
				yapiRun: ctx.headers["yapi-run-test"]
			});

			ifTheResponseIsSuccessfulACopyIsRequired({
				ctx,
				modelInterface: orm.interface,
				interfaceData
			});
			return;
		}

		let res;
		// mock 返回值处理
		res = interfaceData.res_body;
		try {
			if (interfaceData.res_body_type === "json") {
				if (interfaceData.res_body_is_json_schema === true) {
					//json-schema
					const schema = xU.json_parse(interfaceData.res_body);
					res = xU.schemaToJson(schema, {
						alwaysFakeOptionals: true
					});
				} else {
					// console.log('header', ctx.request.header['content-type'].indexOf('multipart/form-data'))
					// 处理 format-data

					if (
						_.isString(ctx.request.header["content-type"]) &&
						ctx.request.header["content-type"].indexOf("multipart/form-data") >
							-1
					) {
						ctx.request.body = ctx.request.body.fields;
					}
					// console.log('body', ctx.request.body)

					res = mockExtra(xU.json_parse(interfaceData.res_body), {
						query: ctx.request.query,
						body: ctx.request.body,
						params: Object.assign({}, ctx.request.query, ctx.request.body)
					});
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
				interfaceData: interfaceData,
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
						if (
							context.resHeader[i] &&
							typeof context.resHeader[i] === "string"
						) {
							cookie = parseCookie(context.resHeader[i]);
							if (cookie && typeof cookie === "object") {
								customCookies(ctx, cookie.name, cookie.value, {
									maxAge: 864000000,
									httpOnly: false
								});
							}
						} else if (
							context.resHeader[i] &&
							Array.isArray(context.resHeader[i])
						) {
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
			let msg = "ok";
			let A_TIPS = `由yAPI MockJson 模拟数据`;
			try {
				/* 使用备份的JSON数据，通过代理，如果没有，自动保存200的数据，用例的数据也可以用 */
				/* isUseBackup */
				if (interfaceData.res_body_type === "backup") {
					responseByMock = JSON.parse(interfaceData.resBackupJson);
					A_TIPS = `使用备份的JSON数据`;
				} else if (_.isPlainObject(context.mockJson)) {
					responseByMock = context.mockJson;
				}
			} catch (error) {
				msg = error.message;
			}
			ctx.body = {
				A_NOTICE: {
					A_TIPS,
					msg
				},
				...responseByMock
			};
			return;
		} catch (e) {
			xU.applog.error(e);
			return (ctx.body = {
				errcode: 400,
				message: "解析出错，请检查。Error: " + e.message,
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

function handleQueryInUrlPath(ctxQuery, interfaceArray_byQueryPath) {
	let i,
		l,
		j,
		len,
		curQuery,
		match = false;
	for (const currentInterfaceData of interfaceArray_byQueryPath) {
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
			/* 这是个啥意思？ */
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
