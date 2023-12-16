const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

module.exports = async function (app) {
	app.use(async (ctx, next) => {
		if (ctx.path === "/") {
			ctx.status = 200;
			ctx.set("Content-Type", "text/html");
			const docPath = path.resolve(
				xU.var.APP_ROOT_DIR,
				"static/index.html"
			);
			const indexHtmlString = await fs.promises.readFile(docPath, "utf-8");
			const $ = cheerio.load(indexHtmlString);
			$("#src-root").attr("data-app-version", app._version);
			ctx.body = $.html();
			return;
		}

		if (/^\/boundless\//.test(ctx.path)) {
			let indexPath = path.join(
				xU.var.APP_ROOT_DIR,
				"static",
				ctx.path.substring("/boundless".length + 1)
			);
			if (xU.fileExist(indexPath)) {
				ctx.status = 200;
				ctx.set("Content-Type", mime.lookup(indexPath));
				ctx.body = xU.fs.createReadStream(indexPath);
				return;
			}
		}
		await next();
	});
};
