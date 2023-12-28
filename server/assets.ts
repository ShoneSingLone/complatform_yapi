const { middlewareGzipWhenProd } = require("server/middleware/prdGzip");
const { middlewareNormalAssets } = require("server/middleware/normalAssets");

module.exports = async function (app) {
	app.use(middlewareGzipWhenProd());
	/* static */
	app.use(middlewareNormalAssets());
};
