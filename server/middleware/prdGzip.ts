const path = require("path");

exports.useGzipWhenPrd = yapi => async (ctx, next) => {
	if (/\/prd/.test(ctx.path)) {
		ctx.set("Cache-Control", "max-age=8640000000");
		if (xU.fileExist(path.join(xU.WEBROOT, "static", ctx.path + ".gz"))) {
			ctx.set("Content-Encoding", "gzip");
			ctx.path = ctx.path + ".gz";
		}
	}
	await next();
};
