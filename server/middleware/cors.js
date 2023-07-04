var cors = require("koa2-cors");

exports.useCORS = () =>
	cors({
		credentials: true,
		origin: ctx => {
			ctx.set("Access-Control-Expose-Headers", "x-cookies");
			return ctx.headers.origin;
			if (ctx.headers.origin === "https://shonesinglone.github.io") {
				return ctx.headers.origin;
			} else {
				return false;
			}
		}
	});