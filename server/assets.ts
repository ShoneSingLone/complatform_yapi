const { middlewareGzipWhenProd } = require("server/middleware/prdGzip");
const { middlewareNormalAssets } = require("server/middleware/normalAssets");
const proxy = require("koa2-proxy-middleware");

module.exports = async function (app) {
	if (global.xspace_configs?.proxyOptions) {
		app.use(proxy(global.xspace_configs.proxyOptions));
	}
	app.use(middlewareGzipWhenProd());
	/* static */
	app.use(middlewareNormalAssets());
};
