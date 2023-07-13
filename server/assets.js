const { middlewareGzipWhenProd } = require("server/middleware/prdGzip");
const { middlewareNormaoAssets } = require("server/middleware/normalAssets");

module.exports = function (app) {
	app.use(middlewareGzipWhenProd());
	/* static */
	app.use(middlewareNormaoAssets());
};
