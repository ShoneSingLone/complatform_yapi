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
	const { initDbAndCommon, appListen } = require("server/utils/utils");
	const yapi = await initDbAndCommon();
	/* 最先调用initDbAndCommon，再使用中间件 */
	const {
		useGzipWhenPrd,
		useMockServer,
		useCORS,
		useHistoryMode,
		useYapiDevHeaderInfo
	} = require("./middleware");

	require("./plugin");
	const websockify = require("koa-websocket");
	const { DecoratorWebsocket } = require("./websocket");

	require("./utils/notice");

	let currentPort = WEBCONFIG.port;

	const Koa = require("koa");
	const koaStatic = require("koa-static");
	const koaBody = require("koa-body");
	const router = require("./router");

	const INDEX_FILE = "index.html";
	const app = websockify(new Koa());
	app.proxy = true;
	xU.app = app;

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
	DecoratorWebsocket(app);

	app.use(useGzipWhenPrd(yapi));
	/* static */
	app.use(
		koaStatic(path.join(xU.WEBROOT, "static"), {
			index: INDEX_FILE,
			gzip: true
		})
	);
	/* index.html */
	app.use(useHistoryMode(yapi));

	appListen(app, currentPort).server.on("error", function handleAppError(e) {
		if (e.code === "EADDRINUSE") {
			setTimeout(() => {
				appListen(app, ++currentPort, "Address in use, retrying...");
			}, 100);
		}
	});
	app.server.setTimeout(WEBCONFIG.timeout);
}

try {
	main();
} catch (error) {
	console.log("🚀 ~ file: app.js:99 ~ error", error);
}
