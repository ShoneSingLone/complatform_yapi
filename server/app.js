const fs = require("fs");
const path = require("path");
const { Module } = require("module");
/* ********************************************************************************  */
/* require 如果没有用相对路径，就优先从node_modules里面找，找不到就从NODE_PATH 开始找 */
const NODE_PATH = path.resolve(__dirname, "..");
process.env.NODE_PATH = NODE_PATH;
Module._initPaths();
/*
 * 享受TS类型检查便利，不用TSC转译
 * commonJS不以后缀为判断依据
 * "type":"module"则严格需要后缀
 */
require.extensions[".ts"] = require.extensions[".js"];
/* ********************************************************************************  */

async function main() {
	/* preset */
	await require("server/utils/initConfig")();
	/* 最先调用initDbAndCommon，再使用中间件 */
	const {
		useGzipWhenPrd,
		useMockServer,
		useCORS,
		useHistoryMode,
		useYapiDevHeaderInfo
	} = require("./middleware/middleware");

	require("./plugin");
	const websockify = require("koa-websocket");
	const { appUseWebsocket } = require("./websocket");

	require("server/utils/notice");

	const Koa = require("koa");
	const koaStatic = require("koa-static");
	const koaBody = require("koa-body");
	const router = require("./router");

	const INDEX_FILE = "index.html";
	const app = websockify(new Koa());
	xU.app = app;
	app.proxy = true;
	app.use(useCORS());
	app.use(
		koaBody({
			strict: false,
			multipart: true,
			formidable: {
				// 上传目录
				uploadDir: path.join(__dirname, "uploads"),
				// 保留文件扩展名
				keepExtensions: true
			},
			jsonLimit: "4mb",
			formLimit: "4mb",
			textLimit: "4mb"
		})
	);
	app.use(useYapiDevHeaderInfo());
	/* router */
	app.use(useMockServer());
	app.use(router.routes());
	app.use(router.allowedMethods());
	/* websocket */
	appUseWebsocket(app);
	/* router */
	app.use(useGzipWhenPrd());
	/* static */
	app.use(
		koaStatic(path.join(xU.WEBROOT, "static"), {
			index: INDEX_FILE,
			gzip: true
		})
	);
	/* index.html */
	app.use(useHistoryMode());
	require("./utils/appListen")(app);
}

try {
	main();
} catch (error) {
	console.log("🚀 ~ file: app.js:99 ~ error", error);
}
