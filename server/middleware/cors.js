var cors = require("koa2-cors");

const middlewareCORS = () => {
	return cors({
		credentials: true,
		origin: ctx => {
			console.log('🚀 ctx.headers.origin', JSON.stringify(ctx.headers.origin, null, 2));
			if (WEBCONFIG.cors.allow.includes(ctx.headers.origin)) {
				/* 允许在header中携带额外的字段 */
				// ctx.set("Access-Control-Expose-Headers", "x_token");
				ctx.url = ctx.url.replace(/^\/0/, "");
				return ctx.headers.origin;
			} else {
				return false;
			}
		}
	});
};

module.exports = async function (app) {
	app.use(middlewareCORS());
};
