const path = require("path");
const koaBody = require("koa-body");

module.exports = async function (app) {
	app.use(
		koaBody({
			strict: false,
			multipart: true,
			formidable: {
				// 上传目录
				uploadDir: path.join(xU.var.APP_ROOT_SERVER_DIR, xU.var.UPLOADS),
				// 保留文件扩展名
				keepExtensions: true
			},
			jsonLimit: "4mb",
			formLimit: "4mb",
			textLimit: "4mb"
		})
	);
};
