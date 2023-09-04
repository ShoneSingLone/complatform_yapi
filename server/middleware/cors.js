var cors = require("koa2-cors");

const middlewareCORS = () => {
	return cors({
		credentials: true,
		origin: ctx => {
			if (WEBCONFIG?.cors?.allow) {
				if (WEBCONFIG.cors.allow.includes(ctx.headers.origin)) {
					/* 允许在header中携带额外的字段 */
					// ctx.set("Access-Control-Expose-Headers", "x_token");
					ctx.url = ctx.url.replace(/^\/0/, "");
					return ctx.headers.origin;
				} else {
					return false;
				}
			} else {
				/* 如果不设置，默认允许所有，一般内部部署，可以不用 */
				return ctx.headers.origin;
			}
		}
	});
};

module.exports = async function (app) {
	app.use(middlewareCORS());
};
