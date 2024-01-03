const Koa = require("koa");
const KoaWS = require("koa-websocket");

async function main() {
	const koaInstance = new Koa();
	const app = KoaWS(koaInstance);
	app._version = Date.now();

	/* 此代码必先调用,后面的代码才可以使用根目录下的文件夹名为别名  */
	await require("./utils/onFirstLine.ts")();
	/* base */
	await require("server/plugin");
	await require("server/utils/notice");
	/* middleware */
	await require("server/middleware/yapiDevHeaderInfo")(app);
	await require("server/middleware/cors")(app);
	await require("server/middleware/parseParams")(app);
	await require("server/middleware/mockServer")(app);
	/* plugin */
	await require("server/plugins/usePlugin")(app);

	await require("server/assets")(app);
	await require("server/router")(app);
	/*  */
	// await require("server/middleware/historyMode")(app);
	await require("server/utils/appListen")(app);
}

try {
	main();
} catch (error) {
	console.log("🚀app error", error);
}
