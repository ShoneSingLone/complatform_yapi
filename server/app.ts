const Koa = require("koa");
const KoaWS = require("koa-websocket");

async function main() {
	const koaInstance = new Koa();
	const app = KoaWS(koaInstance);
	app._version = Date.now();

	/*
	!!!!!!!!!!!!!!!必先调用!!!!!!!!!!!!!!!
	 * await require("./utils/onFirstLine.ts")(); // 使用了相对路径，且有.ts后缀,
	 * 调用之后:
	 * 1. 后面的代码才可以直接使用根目录下的文件夹名作为别名，例如server
	 * 2. 可以不添加.ts后缀，不然只会加载js文件
	 */
	await require("./utils/onFirstLine.ts")();
	/*
	!!!!!!!!!!!!!!!必先调用!!!!!!!!!!!!!!!
	 */
	
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
