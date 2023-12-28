var cors = require("koa2-cors");
var chalk = require("chalk");
var _ = require("lodash");

const middlewareCORS = () => {
	return cors({
		credentials: true,
		origin: ctx => {
			if (yapi_configs?.cors?.allow) {
				const url = String(
					ctx.headers.origin || ctx.headers.referer
				).toLowerCase();

				if (
					_.some(yapi_configs.cors.allow, allow => {
						return ~url.indexOf(String(allow).toLowerCase());
					})
				) {
					/* 允许在header中携带额外的字段 */
					// ctx.set("Access-Control-Expose-Headers", "x_token");
					ctx.url = ctx.url.replace(/^\/0/, "");
					return url;
				} else {
					console.log(chalk.blue.bgRed.bold(`cors fail: `), url, ctx.url);
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
