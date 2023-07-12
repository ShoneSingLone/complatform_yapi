
async function main() {
	await require("./utils/onFirstLine")();
	const path = require("path");

	const INDEX_FILE = "index.html";
	/* preset */
	const {
		useGzipWhenPrd,
		useMockServer,
		useCORS,
		useHistoryMode,
		useYapiDevHeaderInfo
	} = require("server/middleware/middleware");
	require("./plugin");
	const websockify = require("koa-websocket");
	const { appUseWebsocket } = require("./websocket");


	require("server/utils/notice");

	const Koa = require("koa");
	const koaStatic = require("koa-static");
	const koaBody = require("koa-body");
	const router = require("./router");

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
				uploadDir: path.join(__dirname, UPLOADS),
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
	require("server/utils/appListen")(app);
}

try {
	main();
} catch (error) {
	console.log("🚀 ~ file: app.js:99 ~ error", error);
}
