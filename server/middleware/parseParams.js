const path = require("path");
const koaBody = require("koa-body");

exports.middlewareParseParams = () =>
	koaBody({
		strict: false,
		multipart: true,
		formidable: {
			// 上传目录
			uploadDir: path.join(__dirname, xU._v_UPLOADS),
			// 保留文件扩展名
			keepExtensions: true
		},
		jsonLimit: "4mb",
		formLimit: "4mb",
		textLimit: "4mb"
	});
