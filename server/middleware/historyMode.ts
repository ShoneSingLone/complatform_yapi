const fs = require("fs");
const path = require("path");

exports.useHistoryMode = () => async (ctx, next) => {
	/* history 模式，除了api，都返回index.html */
	if (ctx.status === 404) {
		const indexPath = path.join(xU.WEBROOT, "static", "index.html");
		ctx.status = 200;
		ctx.set("Content-Type", "text/html");
		ctx.body = fs.createReadStream(indexPath);
	}
};
