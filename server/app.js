async function main() {
	/* 此代码必先最开始就调用：增加了当前运行目录 */
	await require("./utils/onFirstLine")();
	const path = require("path");
	const { middlewareGzipWhenProd } = require("server/middleware/prdGzip");
	const { middlewareMockServer } = require("server/middleware/mockServer");
	const { middlewareCORS } = require("server/middleware/cors");
	const { middlewareNotFound } = require("server/middleware/historyMode");
	const { middlewareWhenDev } = require("server/middleware/yapiDevHeaderInfo");
	const { middlewareParseParams } = require("server/middleware/parseParams");

	require("./plugin");
	const websockify = require("koa-websocket");
	const { appSetupWebsocket } = require("./websocket");

	require("server/utils/notice");

	const Koa = require("koa");
	const koaStatic = require("koa-static");
	const { appAsyncSetupRoutes } = require("./router");
	const app = websockify(new Koa());

	app.proxy = true;
	app.use(middlewareCORS());
	app.use(middlewareParseParams());
	app.use(middlewareWhenDev());
	/* static */
	app.use(
		koaStatic(path.join(xU.var.APP_ROOT_DIR, "static"), {
			index: xU.var.INDEX_FILE,
			gzip: true
		})
	);
	/* router */
	app.use(middlewareMockServer());
	await appAsyncSetupRoutes(app);
	/* websocket */
	appSetupWebsocket(app);
	/* router */
	app.use(middlewareGzipWhenProd());
	/* index.html */
	app.use(middlewareNotFound());
	require("server/utils/appListen")(app);
}

try {
	main();
} catch (error) {
	console.log("🚀 ~ file: app.js:99 ~ error", error);
}
