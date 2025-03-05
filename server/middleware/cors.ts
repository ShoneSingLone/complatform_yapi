var cors = require("koa2-cors");
var chalk = require("chalk");
var _ = require("lodash");

const middlewareCORS = () => {
	return cors({
		credentials: true,
		origin: ctx => {
			ctx.callme.push("middlewareCORS");
			xU.applog.info(ctx.path, ctx.callme);

			if (yapi_configs?.cors?.allow) {
				const url = String(
					ctx.headers.origin || ctx.headers.referer || ctx.host
				).toLowerCase();

				const inCorsWhiteList = xU._.some(
					yapi_configs.cors.allow,
					allow => ~url.indexOf(String(allow).toLowerCase())
				);

				if (inCorsWhiteList) {
					/* 允许在header中携带额外的字段 */
					// ctx.set("Access-Control-Expose-Headers", "x_token");
					// ctx.url = ctx.url.replace(/^\/1/, "");
					console.log("🚀 ~ middlewareCORS ~ url:", url);
					return url;
				} else {
					console.log(chalk.blue.bgRed.bold(`not in cors.allow: `), ctx.href);
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
