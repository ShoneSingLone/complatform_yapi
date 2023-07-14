const _ = require("lodash");

const middlewareWhenDev = () => async (ctx, next) => {
	ctx.callme = ["middlewareWhenDev"];
	try {
		/* console.log(
	  '\nctx.path',
	  ctx.path,
	  '\nquery:\n',
	  JSON.stringify(ctx?.query || {}, null, 2),
	  '\nbody:\n',
	  JSON.stringify(ctx?.request?.body || {}, null, 2),
	); */

		xU.applog.info(ctx.path, ctx.ips.join(","));
		const start = Date.now();
		await next();
		const yapiTips = {
			..._.pick(ctx, ["headers", "method", "url"])
		};

		function flattenDeep(obj, target) {
			return _.reduce(
				obj,
				(target, value, key) => {
					if (_.isPlainObject(value)) {
						return flattenDeep(value, target);
					} else {
						target[`yapi-${key}`] = value;
					}
					return target;
				},
				target
			);
		}

		_.each(
			flattenDeep(yapiTips, { "response-time": `${Date.now() - start}ms` }),
			(value, key) => {
				ctx.set(key, value);
			}
		);
	} catch (error) {
		console.error(error);
	}
};

module.exports = async function (app) {
	app.use(middlewareWhenDev());
};
