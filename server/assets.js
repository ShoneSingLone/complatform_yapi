const { middlewareGzipWhenProd } = require("server/middleware/prdGzip");
const { middlewareNormaoAssets } = require("server/middleware/normalAssets");

module.exports = async function (app) {
	app.use(middlewareGzipWhenProd());
	/* static */
	app.use(middlewareNormaoAssets());
};
