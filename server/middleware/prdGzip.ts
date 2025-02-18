const path = require("path");

exports.middlewareGzipWhenProd = () => async (ctx, next) => {
	if (/\/min/.test(ctx.path)) {
		const assets_path = path.join(xU.var.APP_ROOT_DIR, `${ctx.path}.gz`);
		const isExist = xU.fileExist(assets_path);
		if (isExist) {
			ctx.set("Cache-Control", "max-age=8640000000");
			ctx.set("Content-Encoding", "gzip");
			ctx.path = ctx.path + ".gz";
		}
	}
	await next();
};
