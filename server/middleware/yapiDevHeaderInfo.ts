const middlewareWhenDev = () => async (ctx, next) => {
	ctx.callme = ctx.callme || ["middlewareWhenDev"];
	xU.applog.info(ctx.path, ctx.callme);
	try {
		/* console.log(
	  '\nctx.path',
	  ctx.path,
	  '\nquery:\n',
	  JSON.stringify(ctx?.query || {}, null, 2),
	  '\nbody:\n',
	  JSON.stringify(ctx?.request?.body || {}, null, 2),
	); */

		const start = Date.now();
		await next();
		const yapiTips = {
			...xU._.pick(ctx, ["headers", "method", "url"])
		};

		function flattenDeep(obj, target) {
			return xU._.reduce(
				obj,
				(target, value, key) => {
					if (xU._.isPlainObject(value)) {
						return flattenDeep(value, target);
					} else {
						target[`yapi-${key}`] = value;
					}
					return target;
				},
				target
			);
		}

		const duration = Date.now() - start;
		xU.applog.info(ctx.path, ctx.ip, ctx.ips.join(","), `${duration}ms`);

		xU._.each(
			flattenDeep(yapiTips, { "response-time": `${duration}ms` }),
			(value, key) => {
				ctx.set(key, value);
			}
		);
	} catch (error) {
		console.error(error);
		ctx.body = xU.$response(null, 503, error.message);
	}
};

module.exports = async function (app) {
	app.use(middlewareWhenDev());
};
