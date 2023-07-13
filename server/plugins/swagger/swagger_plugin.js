const koaStatic = require("koa-static");

module.exports = async function (app) {
	/*autoware controllers文件夹下面带有Auto前缀的controller*/
	await require("server/plugins/swagger/utils/getInterfaceInfo")(app);
	/*是否开启swagger*/
	/*用环境变量也可以，用配置文件也可以，一般是内网使用，开启也无妨*/
	app.use(async (ctx, next) => {
		if (ctx.path === "/swagger") {
			ctx.status = 200;
			ctx.set("Content-Type", "text/html");
			ctx.body = xU.fs.createReadStream(
				xU.path.resolve(__dirname, "swagger_assets/swagger.html")
			);
			return;
		}

		if (ctx.path === "/api/swagger-doc") {
			ctx.status = 200;
			ctx.set("Content-Type", "application/json");
			ctx.body = xU.fs.createReadStream(
				xU.path.resolve(__dirname, "swagger_assets/swagger.json")
			);
			return;
		}

		await next();
	});
	app.use(koaStatic(xU.path.join(__dirname)));
};
