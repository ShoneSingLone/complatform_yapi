const dayjs = require("dayjs");
const sha1 = require("sha1");
const modelLog = require("../models/log");
const modelProject = require("../models/project");
const { ModelUser } = require("../models/user");
const interfaceColModel = require("../models/interfaceCol");
const interfaceCaseModel = require("../models/interfaceCase");
const interfaceModel = require("../models/interface");
const json5 = require("json5");
const _ = require("underscore");
const Ajv = require("ajv");
const Mock = require("mockjs");
const sandboxFn = require("./sandbox");
const ejs = require("easy-json-schema");
const jsf = require("json-schema-faker");
const { schemaValidator } = require("../../common/utils");
const http = require("http");
const path = require("path");
const fs = require("fs-extra");
const nodemailer = require("nodemailer");
const { isUsePlugin } = require("./isUsePlugin");

WEBCONFIG.isUsePlugin = isUsePlugin;

let mail = () => null;
if (WEBCONFIG.mail && WEBCONFIG.mail.enable) {
	mail = nodemailer.createTransport(WEBCONFIG.mail);
}

const MAP_ORM = new Map();
const APP_ROOT_DIR = path.resolve(__dirname, "../.."); //路径
const APP_ROOT_SERVER_DIR = path.resolve(__dirname, "..");

const APP_LOG_DIR = path.join(APP_ROOT_SERVER_DIR, "log");
fs.ensureDirSync(APP_LOG_DIR);

/**
 * 获取一个model实例，如果不存在则创建一个新的返回
 * @param {*} ormModel class
 * @example
 * orm(groupModel, arg1, arg2)
 */
function orm(ormModel, ...args) {
	if (!MAP_ORM.get(ormModel)) {
		MAP_ORM.set(ormModel, new ormModel(args));
	}
	return MAP_ORM.get(ormModel);
}

function delInst(m) {
	try {
		MAP_ORM.delete(m);
	} catch (err) {
		console.error(err); // eslint-disable-line
	}
}

function storageCreator(id) {
	const storageModel = require("../models/storage");
	const defaultData = {};
	return {
		getItem: async (name = "") => {
			let inst = orm(storageModel);
			let data = await inst.get(id);
			data = data || defaultData;
			if (name) return data[name];
			return data;
		},
		setItem: async (name, value) => {
			let orm_storage = orm(storageModel);
			let curData = await orm_storage.get(id);
			let data = curData || defaultData;
			let result;
			data[name] = value;
			if (!curData) {
				result = await orm_storage.save(id, data, true);
			} else {
				result = await orm_storage.save(id, data, false);
			}
			return result;
		}
	};
}

const applog = {
	info(msg) {
		log(msg, "info");
	},
	error(msg) {
		log(msg, "error");
	},
	warn(msg) {
		log(msg, "warn");
	}
};

global.xU = new Proxy({
	_,
	fs,
	path,
	MAP_ORM,
	var: {
		APP_ROOT_DIR,
		APP_ROOT_SERVER_DIR,
		UPLOADS: "uploads",
		RESOURCE_ASSETS: "db",
		INDEX_FILE: "index.html",
		PAGE_LIMIT: 10, // 默认每页展示10条数据
		NAME_LIMIT: 100, // 限制名称的字符长度(中文算两个长度)
		HTTP_METHOD: {
			GET: {
				request_body: false,
				default_tab: "query"
			},
			POST: {
				request_body: true,
				default_tab: "body"
			},
			PUT: {
				request_body: true,
				default_tab: "body"
			},
			DELETE: {
				request_body: true,
				default_tab: "body"
			},
			HEAD: {
				request_body: false,
				default_tab: "query"
			},
			OPTIONS: {
				request_body: false,
				default_tab: "query"
			},
			PATCH: {
				request_body: true,
				default_tab: "body"
			}
		},
		PROJECT_COLOR: {
			blue: "#2395f1",
			green: "#00a854",
			yellow: "#ffbf00",
			red: "#f56a00",
			pink: "#f5317f",
			cyan: "#00a2ae",
			gray: "#bfbfbf",
			purple: "#7265e6"
		},
		PROJECT_ICON: [
			"code-o",
			"swap",
			"clock-circle-o",
			"unlock",
			"calendar",
			"play-circle-o",
			"file-text",
			"desktop",
			"hdd",
			"appstore-o",
			"line-chart",
			"mail",
			"mobile",
			"notification",
			"picture",
			"poweroff",
			"search",
			"setting",
			"share-alt",
			"shopping-cart",
			"tag-o",
			"video-camera",
			"cloud-o",
			"star-o",
			"environment-o",
			"camera-o",
			"team",
			"customer-service",
			"pay-circle-o",
			"rocket",
			"database",
			"tool",
			"wifi",
			"idcard",
			"medicine-box",
			"coffee",
			"safety",
			"global",
			"api",
			"fork",
			"android-o",
			"apple-o"
		],
		HTTP_REQUEST_HEADER: [
			"Accept",
			"Accept-Charset",
			"Accept-Encoding",
			"Accept-Language",
			"Accept-Datetime",
			"Authorization",
			"Cache-Control",
			"Connection",
			"Cookie",
			"Content-Disposition",
			"Content-Length",
			"Content-MD5",
			"Content-Type",
			"Date",
			"Expect",
			"From",
			"Host",
			"If-Match",
			"If-Modified-Since",
			"If-None-Match",
			"If-Range",
			"If-Unmodified-Since",
			"Max-Forwards",
			"Origin",
			"Pragma",
			"Proxy-Authorization",
			"Range",
			"Referer",
			"TE",
			"User-Agent",
			"Upgrade",
			"Via",
			"Warning",
			"X-Requested-With",
			"DNT",
			"X-Forwarded-For",
			"X-Forwarded-Host",
			"X-Forwarded-Proto",
			"Front-End-Https",
			"X-Http-Method-Override",
			"X-ATT-DeviceId",
			"X-Wap-Profile",
			"Proxy-Connection",
			"X-UIDH",
			"X-Csrf-Token"
		],
		METHOD_COLOR: {
			post: {
				bac: "#d2eafb",
				color: "#108ee9"
			},
			get: {
				bac: "#cfefdf",
				color: "#00a854"
			},
			put: {
				bac: "#fff3cf",
				color: "#ffbf00"
			},
			delete: {
				bac: "#fcdbd9",
				color: "#f04134"
			},
			head: {
				bac: "#fff3cf",
				color: "#ffbf00"
			},
			patch: {
				bac: "#fff3cf",
				color: "#ffbf00"
			},
			options: {
				bac: "#fff3cf",
				color: "#ffbf00"
			}
		},
		MOCK_SOURCE: [
			{ name: "字符串", mock: "@string" },
			{ name: "自然数", mock: "@natural" },
			{ name: "浮点数", mock: "@float" },
			{ name: "字符", mock: "@character" },
			{ name: "布尔", mock: "@boolean" },
			{ name: "url", mock: "@url" },
			{ name: "域名", mock: "@domain" },
			{ name: "ip地址", mock: "@ip" },
			{ name: "id", mock: "@id" },
			{ name: "guid", mock: "@guid" },
			{ name: "当前时间", mock: "@now" },
			{ name: "时间戳", mock: "@timestamp" },
			{ name: "日期", mock: "@date" },
			{ name: "时间", mock: "@time" },
			{ name: "日期时间", mock: "@datetime" },
			{ name: "图片连接", mock: "@image" },
			{ name: "图片data", mock: "@imageData" },
			{ name: "颜色", mock: "@color" },
			{ name: "颜色hex", mock: "@hex" },
			{ name: "颜色rgba", mock: "@rgba" },
			{ name: "颜色rgb", mock: "@rgb" },
			{ name: "颜色hsl", mock: "@hsl" },
			{ name: "整数", mock: "@integer" },
			{ name: "email", mock: "@email" },
			{ name: "大段文本", mock: "@paragraph" },
			{ name: "句子", mock: "@sentence" },
			{ name: "单词", mock: "@word" },
			{ name: "大段中文文本", mock: "@cparagraph" },
			{ name: "中文标题", mock: "@ctitle" },
			{ name: "标题", mock: "@title" },
			{ name: "姓名", mock: "@name" },
			{ name: "中文姓名", mock: "@cname" },
			{ name: "中文姓", mock: "@cfirst" },
			{ name: "中文名", mock: "@clast" },
			{ name: "英文姓", mock: "@first" },
			{ name: "英文名", mock: "@last" },
			{ name: "中文句子", mock: "@csentence" },
			{ name: "中文词组", mock: "@cword" },
			{ name: "地址", mock: "@region" },
			{ name: "省份", mock: "@province" },
			{ name: "城市", mock: "@city" },
			{ name: "地区", mock: "@county" },
			{ name: "转换为大写", mock: "@upper" },
			{ name: "转换为小写", mock: "@lower" },
			{ name: "挑选（枚举）", mock: "@pick" },
			{ name: "打乱数组", mock: "@shuffle" },
			{ name: "协议", mock: "@protocol" }
		],
		IP_REGEXP:
			/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
		docHref: {
			adv_mock_case: "https://hellosean1025.github.io/yapi/documents/mock.html",
			adv_mock_script:
				"https://hellosean1025.github.io/yapi/documents/adv_mock.html"
		}
	},
	autowareController(Controller, info) {
		_.each(info, (value, key) => {
			Controller[key] = value;
		});
		return Controller;
	},
}, {
	get(obj, prop) {
		if (_[prop]) {
			return _[prop];
		}
		if (exports[prop]) {
			return exports[prop];
		}
		return obj[prop];
	},
	set(obj, prop, val) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			throw new Error(`重复设置 xU ${prop} `);
		} else {
			obj[prop] = val;
			return true;
		}
	}
});

jsf.extend("mock", function () {
	return {
		mock: function (xx) {
			return Mock.mock(xx);
		}
	};
});

const defaultOptions = {
	failOnInvalidTypes: false,
	failOnInvalidFormat: false
};

function schemaToJson(schema, options = {}) {
	Object.assign(options, defaultOptions);

	jsf.option(options);
	let result;
	try {
		result = jsf(schema);
	} catch (err) {
		result = err.message;
	}
	jsf.option(defaultOptions);
	return result;
}

function resReturn(data, errcode, errmsg) {
	errcode = errcode || 0;
	return {
		errcode,
		errmsg: errmsg || "成功！",
		data
	};
}

function log(msg, type = "info") {
	let errorThrowAt = ``;
	if (!msg) {
		return;
	}

	if (typeof msg === "object") {
		if (msg instanceof Error) msg = msg.message;
		else msg = JSON.stringify(msg);
	}

	try {
		throw new Error("common.info");
	} catch (error) {
		try {
			const contentArray = String(error.stack).split("\n");
			let errorAt = String(contentArray[3]);
			const res = errorAt.match(/\((.*)\)/);
			if (res && res[1]) {
				errorThrowAt += `\n(${res[1]})`;
			} else {
				errorThrowAt += `\n(${errorAt.split("    at ")[1]})`;
			}
		} catch (error) { }
	}
	/* let date = new Date(); let year = date.getFullYear();
  let month = date.getMonth() + 1; */
	const date = Date.now();
	let logfile = path.join(
		APP_LOG_DIR,
		`${dayjs(date).format("YYYY-MM-DD_HH")}.log`
	);
	const errorContent = `===\n【${dayjs(date).format(
		"YYYY-MM-DD HH:mm:ss"
	)}-${date}】：【${type}】：【${msg}】${errorThrowAt}\n===`;
	fs.writeFileSync(logfile, errorContent, {
		flag: "a"
	});
	let logFn = console[type];
	logFn(errorContent);
}

function fileExist(filePath) {
	try {
		return fs.statSync(filePath).isFile();
	} catch (err) {
		return false;
	}
}

function time() {
	return Date.parse(new Date()) / 1000;
}

function fieldSelect(data, field) {
	if (!data || !field || !Array.isArray(field)) {
		return null;
	}

	var arr = {};

	field.forEach(f => {
		typeof data[f] !== "undefined" && (arr[f] = data[f]);
	});

	return arr;
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function json_parse(json) {
	try {
		return json5.parse(json);
	} catch (e) {
		return json;
	}
}

function randStr() {
	return Math.random().toString(36).substr(2);
}

function getIp(ctx) {
	let ip;
	try {
		ip = ctx.ip.match(/\d+.\d+.\d+.\d+/)
			? ctx.ip.match(/\d+.\d+.\d+.\d+/)[0]
			: "localhost";
	} catch (e) {
		ip = null;
	}
	return ip;
}

function generatePassword(password, passsalt) {
	return sha1(password + sha1(passsalt));
}

function expireDate(day) {
	let date = new Date();
	date.setTime(date.getTime() + day * 86400000);
	return date;
}

function sendMail(options, cb) {
	if (!xU.mail) return false;
	options.subject = options.subject
		? options.subject + "-YApi 平台"
		: "YApi 平台";

	cb =
		cb ||
		function (err) {
			if (err) {
				xU.applog.error("send mail " + options.to + " error," + err.message);
			} else {
				xU.applog.info("send mail " + options.to + " success");
			}
		};

	try {
		xU.mail.sendMail(
			{
				from: WEBCONFIG.mail.from,
				to: options.to,
				subject: options.subject,
				html: options.contents
			},
			cb
		);
	} catch (e) {
		xU.applog.error(e.message);
		console.error(e.message); // eslint-disable-line
	}
}

function validateSearchKeyword(keyword) {
	if (/^\*|\?|\+|\$|\^|\\|\.$/.test(keyword)) {
		return false;
	}

	return true;
}

function filterRes(list, rules) {
	return list.map(item => {
		let filteredRes = {};

		rules.forEach(rule => {
			if (typeof rule == "string") {
				filteredRes[rule] = item[rule];
			} else if (typeof rule == "object") {
				filteredRes[rule.alias] = item[rule.key];
			}
		});

		return filteredRes;
	});
}

function handleVarPath(pathname, params) {
	function insertParams(name) {
		if (!_.find(params, { name: name })) {
			params.push({
				name: name,
				desc: ""
			});
		}
	}

	if (!pathname) return;
	if (pathname.indexOf(":") !== -1) {
		let paths = pathname.split("/"),
			name,
			i;
		for (i = 1; i < paths.length; i++) {
			if (paths[i] && paths[i][0] === ":") {
				name = paths[i].substr(1);
				insertParams(name);
			}
		}
	}
	pathname.replace(/\{(.+?)\}/g, function (str, match) {
		insertParams(match);
	});
}

/**
 * 验证一个 path 是否合法
 * path第一位必需为 /, path 只允许由 字母数字-/_:.{}= 组成
 */
function verifyPath(path) {
	// if (/^\/[a-zA-Z0-9\-\/_:!\.\{\}\=]*$/.test(path)) {
	//   return true;
	// } else {
	//   return false;
	// }
	return /^\/[a-zA-Z0-9\-\/_:!\.\{\}\=]*$/.test(path);
}

/**
 * 沙盒执行 js 代码
 * @sandbox Object context
 * @script String script
 * @return sandbox
 *
 * @example let a = sandbox({a: 1}, 'a=2')
 * a = {a: 2}
 */
function sandbox(sandbox, script) {
	try {
		const vm = require("vm");
		sandbox = sandbox || {};
		script = new vm.Script(script);
		const context = new vm.createContext(sandbox);
		script.runInContext(context, {
			timeout: 3000
		});
		return sandbox;
	} catch (err) {
		throw err;
	}
}

function trim(str) {
	if (!str) {
		return str;
	}

	str = str + "";

	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function ltrim(str) {
	if (!str) {
		return str;
	}

	str = str + "";

	return str.replace(/(^\s*)/g, "");
}

function rtrim(str) {
	if (!str) {
		return str;
	}

	str = str + "";

	return str.replace(/(\s*$)/g, "");
}

/**
 * 处理请求参数类型，String 字符串去除两边空格，Number 使用parseInt 转换为数字
 * @params Object {a: ' ab ', b: ' 123 '}
 * @keys Object {a: 'string', b: 'number'}
 * @return Object {a: 'ab', b: 123}
 */
function handleParams(params, keys) {
	if (
		!params ||
		typeof params !== "object" ||
		!keys ||
		typeof keys !== "object"
	) {
		return false;
	}

	for (var key in keys) {
		var filter = keys[key];
		if (params[key]) {
			switch (filter) {
				case "string":
					params[key] = trim(params[key] + "");
					break;
				case "number":
					params[key] = !isNaN(params[key]) ? parseInt(params[key], 10) : 0;
					break;
				default:
					params[key] = trim(params + "");
			}
		}
	}

	return params;
}

function validateParams(schema2, params) {
	const flag = schema2.closeRemoveAdditional;
	const ajv = new Ajv({
		allErrors: true,
		coerceTypes: true,
		useDefaults: true,
		removeAdditional: flag ? false : true
	});

	var localize = require("ajv-i18n");
	delete schema2.closeRemoveAdditional;

	const schema = ejs(schema2);

	schema.additionalProperties = flag ? true : false;
	const validate = ajv.compile(schema);
	let valid = validate(params);

	let message = "请求参数 ";
	if (!valid) {
		localize.zh(validate.errors);
		message += ajv.errorsText(validate.errors, { separator: "\n" });
	}

	return {
		valid: valid,
		message: message
	};
}

function saveLog(logData) {
	try {
		let logInst = orm(modelLog);
		let data = {
			content: logData.content,
			type: logData.type,
			uid: logData.uid,
			username: logData.username,
			typeid: logData.typeid,
			data: logData.data
		};

		logInst.save(data).then();
	} catch (e) {
		xU.applog.error(e); // eslint-disable-line
	}
}

/**
 *
 * @param {*} router router
 * @param {*} baseurl base_url_path
 * @param {*} routerController controller
 * @param {*} path  routerPath
 * @param {*} method request_method , post get put delete ...
 * @param {*} action controller action_name
 * @param {*} ws enable ws
 */

function createAction(
	router,
	baseurl,
	routerController,
	action,
	path,
	method,
	ws
) {
	router[method](baseurl + path, async ctx => {
		let inst = new routerController(ctx);
		try {
			await inst.init(ctx);
			ctx.params = Object.assign(
				{},
				ctx.request.query,
				ctx.request.body,
				ctx.params
			);
			if (
				inst.schemaMap &&
				typeof inst.schemaMap === "object" &&
				inst.schemaMap[action]
			) {
				let validResult = xU.validateParams(inst.schemaMap[action], ctx.params);

				if (!validResult.valid) {
					return (ctx.body = xU.resReturn(null, 400, validResult.message));
				}
			}
			if (inst.$auth === true) {
				await inst[action].call(inst, ctx);
			} else {
				if (ws === true) {
					ctx.ws.send("请登录...");
				} else {
					ctx.body = xU.resReturn(null, 40011, "请登录...");
				}
			}
		} catch (err) {
			ctx.body = xU.resReturn(null, 40011, "服务器出错...");
			xU.applog.error(err);
		}
	});
}

/**
 *
 * @param {*} params 接口定义的参数
 * @param {*} val  接口case 定义的参数值
 */
function handleParamsValue(params, val) {
	let value = {};
	try {
		params = params.toObject();
	} catch (e) { }
	if (params.length === 0 || val.length === 0) {
		return params;
	}
	val.forEach(item => {
		value[item.name] = item;
	});
	params.forEach((item, index) => {
		if (!value[item.name] || typeof value[item.name] !== "object") return null;
		params[index].value = value[item.name].value;
		if (!_.isUndefined(value[item.name].enable)) {
			params[index].enable = value[item.name].enable;
		}
	});
	return params;
}

async function getCaseList(id) {
	const caseInst = orm(interfaceCaseModel);
	const colInst = orm(interfaceColModel);
	const projectInst = orm(modelProject);
	const interfaceInst = orm(interfaceModel);

	let resultList = await caseInst.list(id, "all");
	let colData = await colInst.get(id);
	for (let index = 0; index < resultList.length; index++) {
		let result = resultList[index].toObject();
		let data = await interfaceInst.get(result.interface_id);
		if (!data) {
			await caseInst.del(result._id);
			continue;
		}
		let projectData = await projectInst.getBaseInfo(data.project_id);
		result.path = projectData.basepath + data.path;
		result.method = data.method;
		result.title = data.title;
		result.req_body_type = data.req_body_type;
		result.req_headers = handleParamsValue(
			data.req_headers,
			result.req_headers
		);
		result.res_body_type = data.res_body_type;
		result.req_body_form = handleParamsValue(
			data.req_body_form,
			result.req_body_form
		);
		result.req_query = handleParamsValue(data.req_query, result.req_query);
		result.req_params = handleParamsValue(data.req_params, result.req_params);
		resultList[index] = result;
	}
	resultList = resultList.sort((a, b) => {
		return a.index - b.index;
	});
	let ctxBody = xU.resReturn(resultList);
	ctxBody.colData = colData;
	return ctxBody;
}

function convertString(variable) {
	if (variable instanceof Error) {
		return variable.name + ": " + variable.message;
	}
	try {
		if (variable && typeof variable === "string") {
			return variable;
		}
		return JSON.stringify(variable, null, "   ");
	} catch (err) {
		return variable || "";
	}
}

async function runCaseScript(params, colId, interfaceId) {
	const colInst = orm(interfaceColModel);
	let colData = await colInst.get(colId);
	const logs = [];
	const context = {
		assert: require("assert"),
		status: params.response.status,
		body: params.response.body,
		header: params.response.header,
		records: params.records,
		params: params.params,
		log: msg => {
			logs.push("log: " + convertString(msg));
		}
	};

	let result = {};
	try {
		if (colData.checkHttpCodeIs200) {
			let status = +params.response.status;
			if (status !== 200) {
				throw "Http status code 不是 200，请检查(该规则来源于于 [测试集->通用规则配置] )";
			}
		}

		if (colData.checkResponseField.enable) {
			if (
				params.response.body[colData.checkResponseField.name] !=
				colData.checkResponseField.value
			) {
				throw `返回json ${colData.checkResponseField.name} 值不是${colData.checkResponseField.value}，请检查(该规则来源于于 [测试集->通用规则配置] )`;
			}
		}

		if (colData.checkResponseSchema) {
			const interfaceInst = orm(interfaceModel);
			let interfaceData = await interfaceInst.get(interfaceId);
			if (interfaceData.res_body_is_json_schema && interfaceData.res_body) {
				let schema = JSON.parse(interfaceData.res_body);
				let result = schemaValidator(schema, context.body);
				if (!result.valid) {
					throw `返回Json 不符合 response 定义的数据结构,原因: ${result.message}
数据结构如下：
${JSON.stringify(schema, null, 2)}`;
				}
			}
		}

		if (colData.checkScript.enable) {
			let globalScript = colData.checkScript.content;
			// script 是断言
			if (globalScript) {
				logs.push("执行脚本：" + globalScript);
				result = await sandboxFn(context, globalScript);
			}
		}

		let script = params.script;
		// script 是断言
		if (script) {
			logs.push("执行脚本:" + script);
			result = await sandboxFn(context, script);
		}
		result.logs = logs;
		return xU.resReturn(result);
	} catch (err) {
		logs.push(convertString(err));
		result.logs = logs;
		return xU.resReturn(result, 400, err.name + ": " + err.message);
	}
}

async function getUserdata(uid, role) {
	role = role || "dev";
	let userInst = orm(ModelUser);
	let userData = await userInst.findById(uid);
	if (!userData) {
		return null;
	}
	return {
		role: role,
		uid: userData._id,
		username: userData.username,
		email: userData.email
	};
}

// 处理mockJs脚本
async function handleMockScript(script, context) {
	let sandbox = {
		header: context.ctx.header,
		query: context.ctx.query,
		body: context.ctx.request.body,
		mockJson: context.mockJson,
		params: Object.assign({}, context.ctx.query, context.ctx.request.body),
		resHeader: context.resHeader,
		httpCode: context.httpCode,
		delay: context.httpCode,
		Random: Mock.Random
	};
	sandbox.cookie = {};

	context.ctx.header.cookie &&
		context.ctx.header.cookie.split(";").forEach(function (Cookie) {
			var parts = Cookie.split("=");
			sandbox.cookie[parts[0].trim()] = (parts[1] || "").trim();
		});
	sandbox = await sandboxFn(sandbox, script);
	sandbox.delay = isNaN(sandbox.delay) ? 0 : +sandbox.delay;

	context.mockJson = sandbox.mockJson;
	context.resHeader = sandbox.resHeader;
	context.httpCode = sandbox.httpCode;
	context.delay = sandbox.delay;
}

function createWebAPIRequest(ops) {
	return new Promise(function (resolve, reject) {
		let req = "";
		let http_client = http.request(
			{
				host: ops.hostname,
				method: "GET",
				port: ops.port,
				path: ops.path
			},
			function (res) {
				res.on("error", function (err) {
					reject(err);
				});
				res.setEncoding("utf8");
				if (res.statusCode != 200) {
					reject({ message: "statusCode != 200" });
				} else {
					res.on("data", function (chunk) {
						req += chunk;
					});
					res.on("end", function () {
						resolve(req);
					});
				}
			}
		);
		http_client.on("error", e => {
			reject({ message: `request error: ${e.message}` });
		});
		http_client.end();
	});
}

exports.applog = applog;
exports.mail = mail;
exports.orm = orm;
exports.schemaToJson = schemaToJson;
exports.resReturn = resReturn;
exports.log = log;
exports.fileExist = fileExist;
exports.time = time;
exports.fieldSelect = fieldSelect;
exports.rand = rand;
exports.json_parse = json_parse;
exports.randStr = randStr;
exports.getIp = getIp;
exports.generatePassword = generatePassword;
exports.expireDate = expireDate;
exports.sendMail = sendMail;
exports.validateSearchKeyword = validateSearchKeyword;
exports.filterRes = filterRes;
exports.handleVarPath = handleVarPath;
exports.verifyPath = verifyPath;
exports.sandbox = sandbox;
exports.trim = trim;
exports.ltrim = ltrim;
exports.rtrim = rtrim;
exports.handleParams = handleParams;
exports.validateParams = validateParams;
exports.saveLog = saveLog;
exports.createAction = createAction;
exports.handleParamsValue = handleParamsValue;
exports.getCaseList = getCaseList;
exports.runCaseScript = runCaseScript;
exports.getUserdata = getUserdata;
exports.handleMockScript = handleMockScript;
exports.createWebAPIRequest = createWebAPIRequest;
exports.storageCreator = storageCreator;
