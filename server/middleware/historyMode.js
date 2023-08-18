const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const middlewareNotFound = () => async (ctx, next) => {
	/* history 模式，除了api，都返回index.html */
	if (ctx.status === 404) {
		xU.applog.info("middlewareNotFound return index", ctx.path);
		let indexPath = path.join(xU.var.APP_ROOT_DIR, "static", ctx.path.substring(1));
		if (xU.fileExist(indexPath)) {
			ctx.status = 200;
			ctx.set("Content-Type", mime.lookup(indexPath));
			ctx.body = xU.fs.createReadStream(indexPath);
		} else {
			/* 返回首页 */
			indexPath = path.join(xU.var.APP_ROOT_DIR, "static", "index.html");
			ctx.status = 200;
			ctx.set("Content-Type", mime.lookup(indexPath));
			ctx.body = xU.fs.createReadStream(indexPath);
		}
	}
	next();
};

module.exports = async function (app) {
	app.use(middlewareNotFound());
	app.use(middlewareNotFound());
};
