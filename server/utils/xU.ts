const { SparkMD5 } = require("./SparkMD5");
const { async_get_local_repo_branch_info } = require("./git_local_branch_info");
const { spawn } = require("child_process");
const {
	SOCKET_TYPE_HANDLERS,
	SOCKET_CONNECTIONS,
	SSE_TYPE
} = require("../middleware/websocket.handlers");
const _ = require("lodash");
const CryptoJS = require("crypto-js");
const dayjs = require("dayjs");
const sha1 = require("sha1");
const json5 = require("json5");
const Ajv = require("ajv");
const Mock = require("mockjs");
const sandboxFn = require("./sandbox");
const ejs = require("easy-json-schema");
const jsf = require("json-schema-faker");

const http = require("http");
const path = require("path");
const fs = require("fs-extra");
const nodemailer = require("nodemailer");

/* 数据库Orm预处理 */
global.orm = new Proxy(
	{},
	{
		get(target, modelName) {
			return (
				target[modelName] ||
				(function () {
					let Model = require(`server/models/${String(modelName)}`);
					target[modelName] = new Model();
					return target[modelName];
				})()
			);
		},
		set(target, modelName, value) {
			target[modelName] = value;
			return true;
		}
	}
);

const mail = (function () {
	if (yapi_configs.mail) {
		return nodemailer.createTransport(yapi_configs.mail);
	} else {
		return () => null;
	}
})();

const MAP_ORM = new Map();
const APP_ROOT_DIR = path.resolve(__dirname, "../.."); //路径
const APP_ROOT_SERVER_DIR = path.resolve(__dirname, "..");
const YAPI_LOGS_DIR = "yapi_logs";

const APP_LOG_DIR = path.join(APP_ROOT_SERVER_DIR, YAPI_LOGS_DIR);
fs.ensureDirSync(APP_LOG_DIR);

const STATIC_VAR = {
	pickUserInfo: [
		"__v",
		"_id",
		"study",
		"type",
		"username",
		"email",
		"role",
		"add_time",
		"up_time",
		"cloudDiskSizeUsed",
		"cloudDiskSizeTotal"
	],
	FILE_NOT_DIR: 0,
	FILE_DIR: 1,
	FILE_ALL: 2,
	DESC: -1,
	PRIVATE: "private",
	ALL: "all",
	GROUP: "group",
	PROJECT: "project",
	APP_ROOT_DIR,
	APP_ROOT_SERVER_DIR,
	UPLOADS: "uploads",
	RESOURCE_ASSETS: "RESOURCE_ASSETS",
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
};

const TARGET_PREFIX = path.join(
	yapi_configs.RESOURCE_ASSETS_REMOTE,
	STATIC_VAR.UPLOADS,
	STATIC_VAR.RESOURCE_ASSETS
);

async function getSystemDiskSize() {
	if (getSystemDiskSize.total) {
		return getSystemDiskSize.total;
	}
	return new Promise(resolve => {
		var diskinfo = require("diskinfo");
		//当前盘符
		var current_disk = __dirname.substr(0, 2).toLowerCase();

		//获得所有磁盘空间
		diskinfo.getDrives(function (err, aDrives) {
			let total = "0";
			if (err) {
				resolve(total);
			}
			//遍历所有磁盘信息
			for (var i = 0; i < aDrives.length; i++) {
				//只获取当前磁盘信息
				if (aDrives[i].mounted.toLowerCase() == current_disk) {
					//盘符号
					var mounted = "mounted " + aDrives[i].mounted;
					total = aDrives[i].blocks;
					//总量
					const total_label =
						"total " +
						(aDrives[i].blocks / 1024 / 1024 / 1024).toFixed(2) +
						"gb";
					//已使用
					var used =
						"used " + (aDrives[i].used / 1024 / 1024 / 1024).toFixed(0) + "gb";
					//可用
					var available =
						"available " +
						(aDrives[i].available / 1024 / 1024 / 1024).toFixed(0) +
						"gb";
					//使用率
					var capacity = "capacity " + aDrives[i].capacity;

					console.log(
						mounted +
							"\r\n" +
							total +
							"\r\n" +
							used +
							"\r\n" +
							available +
							"\r\n" +
							capacity
					);
				}
			}
			getSystemDiskSize.total = total;
			resolve(total);
		});
	});
}

/**
 * 获取一个model实例，如果不存在则创建一个新的返回
 * @param {*} ormModel class
 * @example
 * orm(ModelGroup, arg1, arg2)
 */
/**
 * @description MongoDB model
 * @typedef {function} orm
 *
 * @param {any} ormModel
 * @param {any} args
 * @returns
 */
function $orm(ormModel, ...args) {
	let inst = MAP_ORM.get(ormModel);
	if (!inst) {
		try {
			inst = new ormModel(args);
			MAP_ORM.set(ormModel, inst);
		} catch (error) {
			xU.applog.error(error);
		}
	}
	return inst;
}

function storageCreator(id) {
	const defaultData = {};
	return {
		getItem: async (name = "") => {
			let data = await orm.storage.get(id);
			data = data || defaultData;
			if (name) return data[name];
			return data;
		},
		setItem: async (name, value) => {
			let curData = await orm.storage.get(id);
			let data = curData || defaultData;
			let result;
			data[name] = value;
			if (!curData) {
				result = await orm.storage.save(id, data, true);
			} else {
				result = await orm.storage.save(id, data, false);
			}
			return result;
		}
	};
}

const applog = {
	info(...msg) {
		log(msg, "info");
	},
	error(msg, payload = "") {
		console.log(payload);
		log(msg, "error");
	},
	warn(msg) {
		log(msg, "warn");
	}
};

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

function $response(data, errcode = 0, message = "") {
	if (errcode !== 0) {
		xU.applog.error(message);
	}
	return {
		errcode: errcode || 0,
		message: message || "",
		data: data || {}
	};
}

function log(msg, type = "info") {
	let errorThrowAt = ``;
	if (!msg?.length) {
		return;
	}

	if (typeof msg === "object") {
		if (msg instanceof Error) {
			msg = msg.message;
		} else {
			msg = JSON.stringify(msg);
		}
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
		} catch (error) {}
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
	)}-${date}】：【${type}】：${msg} ${errorThrowAt}\n===`;

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

/* 用配置的密码加密，纯函数*/
function $saltIt(password, passsalt) {
	return sha1(password + sha1(passsalt));
}

function expireDate(day) {
	let date = new Date();
	date.setTime(date.getTime() + day * 86400000);
	return date;
}

function expireDay(day) {
	return Date.now() + day * 86400000;
}

const defaultSendmailCallback = function (err, options) {
	if (err) {
		xU.applog.error("send mail " + options.to + " error," + err.message);
	} else {
		xU.applog.info("send mail " + options.to + " success");
	}
};

/* 用配置的邮件发送邮件 */
function sendMail(options, cb) {
	if (!xU.mail) return false;
	let subject = (function () {
		if (options.subject) {
			return "Y-API_" + options.subject;
		}
		return "Y-API";
	})();

	cb = cb || defaultSendmailCallback;
	try {
		xU.mail.sendMail(
			{
				from: yapi_configs.mail.from,
				to: options.to,
				html: options.contents,
				subject
			},
			error => cb(error, options)
		);
	} catch (e) {
		xU.applog.error(e.message);
		console.error(e.message);
		// eslint-disable-line
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
		if (!xU._.find(params, { name: name })) {
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
function ensureParamsType(params, keys) {
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
		let logInst = orm.log;
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
					return (ctx.body = xU.$response(null, 400, validResult.message));
				}
			}
			if (inst.$auth === true) {
				if (!inst[action]?.call) {
					debugger;
				}
				await inst[action].call(inst, ctx);
			} else {
				if (ws === true) {
					ctx.ws.send("请登录...");
				} else {
					ctx.body = xU.$response(null, 40011, "请登录...");
				}
			}
		} catch (err) {
			ctx.body = xU.$response(null, 40012, err.message);
			xU.applog.error(err);
			console.error(err);
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
	} catch (e) {}
	if (params.length === 0 || val.length === 0) {
		return params;
	}
	val.forEach(item => {
		value[item.name] = item;
	});
	params.forEach((item, index) => {
		if (!value[item.name] || typeof value[item.name] !== "object") return null;
		params[index].value = value[item.name].value;
		if (!xU._.isUndefined(value[item.name].enable)) {
			params[index].enable = value[item.name].enable;
		}
	});
	return params;
}

async function getCaseList(id) {
	const caseInst = orm.interfaceCase;
	const colInst = orm.interfaceCol;
	const interfaceInst = orm.interface;

	let resultList = await caseInst.list(id, "all");
	let colData = await colInst.get(id);
	for (let index = 0; index < resultList.length; index++) {
		let result = resultList[index].toObject();
		let data = await interfaceInst.get(result.interface_id);
		if (!data) {
			await caseInst.del(result._id);
			continue;
		}
		let projectData = await orm.project.getBaseInfo(data.project_id);
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
	let ctxBody = xU.$response(resultList);
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

async function runCaseScript(params, colId, interface_id) {
	const { schemaValidator } = require("server/common/utils");
	const colInst = orm.interfaceCol;
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
			const interfaceInst = orm.interface;
			let interfaceData = await interfaceInst.get(interface_id);
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
		return xU.$response(result);
	} catch (err) {
		logs.push(convertString(err));
		result.logs = logs;
		return xU.$response(result, 400, err.name + ": " + err.message);
	}
}

async function getUserdata(uid, role) {
	role = role || "dev";
	let userData = await orm.user.findById(uid);

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

const SSE_STREAM_MAP = new Map();

const SSE_TYPE_HANDLERS = {
	[SSE_TYPE.CHAT_ONE](id, message) {
		const stream = SSE_STREAM_MAP.get(id);
		if (stream) {
			stream.write(`data: ${JSON.stringify(message)}\n\n`);
		}
	}
};

/* ======================================================== */
const xU = new Proxy(
	{
		SparkMD5,
		newCondition(obj) {
			return _.reduce(
				obj,
				(condition, value, key) => {
					if (xU.isInput(value)) {
						condition[key] = value;
					}
					return condition;
				},
				{}
			);
		},
		/**
		 * 执行shell命令的通用函数
		 * @param {string} command - 要执行的命令
		 * @param {string[]} args - 命令参数数组
		 * @param {object} options - spawn选项
		 * @param {function} emit - 输出信息的函数
		 * @returns {Promise<void>}
		 */
		executeCommand: (command, args, options, emit) => {
			return new Promise((resolve, reject) => {
				// 打印开始执行的命令信息
				const fullCommand = `${command} ${args.join(" ")}`;
				emit(`开始执行命令: ${fullCommand}`);

				const cmd = spawn(command, args, options);

				cmd.stdout.on("data", data => {
					emit(`${data}`);
				});

				cmd.stderr.on("data", data => {
					emit(`${data}`);
				});

				cmd.on("close", code => {
					if (code !== 0) {
						emit(`命令执行失败，退出码: ${code}`);
						reject(new Error(`Command failed with exit code ${code}`));
						return;
					}

					emit(`命令执行成功，退出码: ${code}`);
					resolve(code);
				});

				cmd.on("error", error => {
					emit(`命令执行出错: ${error.message}`);
					reject(error);
				});
			});
		},
		async_get_local_repo_branch_info,
		SSE_TYPE,
		SSE_TYPE_HANDLERS,
		setSseStream(id, stream) {
			id = String(id);
			const _stream = SSE_STREAM_MAP.get(id);
			if (_stream) {
				SSE_STREAM_MAP.delete(id);
			}
			SSE_STREAM_MAP.set(id, stream);
		},
		removeSseStream(id) {
			id = String(id);
			const _stream = SSE_STREAM_MAP.get(id);
			if (_stream) {
				_stream.end();
			}
			SSE_STREAM_MAP.delete(id);
		},
		sseOn(type) {},
		sseOff() {},
		sseTrigger(type, clientID, payload) {
			const handler = SSE_TYPE_HANDLERS[type];
			handler && handler(clientID, { type, payload });
		},
		SOCKET_CONNECTIONS,
		socketTrigger(type, clientID, payload) {
			const handler = SOCKET_TYPE_HANDLERS[type];
			handler && handler(clientID, { type, payload });
		},
		_,
		fs,
		path,
		MAP_ORM,
		var: STATIC_VAR,
		TARGET_PREFIX,
		applog,
		mail,
		$orm,
		schemaToJson,
		$response,
		log: log,
		fileExist,
		time,
		fieldSelect,
		rand,
		json_parse,
		randStr,
		getIp,
		$saltIt,
		expireDate,
		expireDay,
		sendMail,
		validateSearchKeyword,
		filterRes,
		handleVarPath,
		verifyPath,
		sandbox,
		trim,
		ltrim,
		rtrim,
		ensureParamsType,
		validateParams,
		saveLog,
		createAction,
		handleParamsValue,
		getCaseList,
		runCaseScript,
		getUserdata,
		handleMockScript,
		createWebAPIRequest,
		storageCreator,
		dayjs,
		handleBasepath(basepath) {
			if (!basepath) {
				return "";
			}
			if (basepath === "/") {
				return "";
			}
			if (basepath[0] !== "/") {
				basepath = "/" + basepath;
			}
			if (basepath[basepath.length - 1] === "/") {
				basepath = basepath.substr(0, basepath.length - 1);
			}
			if (!/^\/[a-zA-Z0-9\-\/\._]+$/.test(basepath)) {
				return false;
			}
			return basepath;
		},
		socketMsg(type, payload = {}) {
			return {
				type,
				payload
			};
		},
		isInput(val) {
			if (val) {
				return true;
			}
			if (val === "") {
				return true;
			}
			if (val === false) {
				return true;
			}
			if (val === null) {
				return true;
			}
			if (val === 0) {
				return true;
			}
			return false;
		},
		isSame(a, b) {
			return String(a) === String(b);
		},
		autowareController(Controller, info) {
			xU._.each(info, (value, key) => {
				Controller[key] = value;
			});
			return Controller;
		},
		$hashCode(Salt) {
			/* https://cryptojs.gitbook.io/docs/ */
			const hash = CryptoJS.SHA256(Salt + Date.now());
			return hash.toString(CryptoJS.enc.Hex);
		},
		/* 便捷使用schema auto entry router */
		schema: schema => ({ $ref: `#/definitions/${schema}` }),
		swagger_id: desc => ({
			description: desc,
			type: "string"
		}),
		/**
		 *
		 * @param _id file_id,
		 * @param uploadBy
		 * @returns
		 */
		async isCloudDiskDirExist(fileId, uploadBy) {
			let res = await orm.Resource.search({
				$and: [{ fileId }, { uploadBy }, { isdir: 1 }]
			});
			return xU._.isArray(res) && res.length;
		},
		// 文件是否存在
		async isExist(id) {
			let f = await this.app.model.File.findOne({
				where: {
					id,
					user_id: this.ctx.authUser.id
				}
			});
			if (!f) {
				return this.ctx.throw(404, "文件不存在");
			}
			return f;
		},
		getSystemDiskSize
	},
	{
		get(_xU, prop) {
			if (_xU[prop]) {
				return _xU[prop];
			}
			return _xU[prop];
		},
		set(_xU, prop, val) {
			if (Object.prototype.hasOwnProperty.call(_xU, prop)) {
				throw new Error(`重复设置 xU ${prop} `);
			} else {
				_xU[prop] = val;
				return true;
			}
		}
	}
);

global.xU = xU;
