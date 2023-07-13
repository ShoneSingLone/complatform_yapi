const path = require("path");

exports.middlewareGzipWhenProd = () => async (ctx, next) => {
	if (/\/prd/.test(ctx.path)) {
		ctx.set("Cache-Control", "max-age=8640000000");
		if (
			xU.fileExist(path.join(xU.var.APP_ROOT_DIR, "static", ctx.path + ".gz"))
		) {
			ctx.set("Content-Encoding", "gzip");
			ctx.path = ctx.path + ".gz";
		}
	}
	await next();
};
