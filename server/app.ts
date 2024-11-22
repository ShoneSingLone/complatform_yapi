const Koa = require("koa");
/**
 * @description 启动服务
 *
 */
async function main() {
	const app = new Koa();
	app._version = Date.now();

	/*
	!!!!!!!!!!!!!!!必先调用!!!!!!!!!!!!!!!
	 * await require("./utils/onFirstLine.ts")(); // 使用了相对路径，且必须有.ts后缀,
	 * 调用之后:
	 * 1. 后面的代码才可以直接使用根目录下的文件夹名作为别名，例如server
	 * 2. 可以不添加.ts后缀
	 */
	await require("./utils/onFirstLine.ts")();
	/*
	!!!!!!!!!!!!!!!必先调用!!!!!!!!!!!!!!!
	 */

	/* base */
	await require("./plugin");
	await require("./utils/notice");
	/* 静态资源 */
	await require("./assets")(app);
	await require("./middleware/parseParams")(app);
	/* middleware */
	await require("./middleware/yapiDevHeaderInfo")(app);
	/* 跨域 */
	await require("./middleware/cors")(app);
	/* 转发代理 */
	await require("./middleware/mockServer")(app);

	/* plugin */
	/* - 路由 autoware */
	/* - boundless vue project */
	await require("./plugins/usePlugin")(app);
	/* 原来yapi的路由 TODO: 移除*/
	await require("./router")(app);

	/* 启动 */
	/* await require("./middleware/historyMode")(app); */
	await require("./utils/appListen")(app);
}

try {
	main();
} catch (error) {
	console.log("🚀app error", error);
}
