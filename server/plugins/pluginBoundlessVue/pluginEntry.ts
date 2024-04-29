const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const DIRS_ARRAY = fs.readdirSync(path.resolve(xU.var.APP_ROOT_DIR, "static"));

const APP_NAME_ARRAY = DIRS_ARRAY.reduce((target, dirname) => {
	const [, appName] = String(dirname).match(/business_(.*)/) || [];
	if (appName) {
		target.push(appName);
	}
	return target;
}, []);

module.exports = async function (app) {
	app.use(async (ctx, next) => {
		const fileURI = (() => {
			const [, dirname, entryName] = ctx.path.split("/");

			if (APP_NAME_ARRAY.includes(dirname)) {
				if (entryName) {
					return `business_${dirname}/${entryName}.html`;
				} else {
					return `business_${dirname}/${dirname}.html`;
				}
			} else if (!dirname && !entryName) {
				ctx.status = 301;
				ctx.redirect("/yapi");
			}

			return false;
		})();

		if (xU._.isString(fileURI)) {
			const $ = await loadHtmlEntry({
				ctx,
				app,
				fileURI
			});
			return (ctx.body = $.html());
		} else {
			return next();
		}
	});
};
async function loadHtmlEntry({ ctx, app, fileURI }) {
	ctx.status = 200;
	ctx.set("Content-Type", "text/html");
	const docPath = path.resolve(xU.var.APP_ROOT_DIR, "static", fileURI);
	const indexHtmlString = await fs.promises.readFile(docPath, "utf-8");
	const $ = cheerio.load(indexHtmlString);
	$("#src-root").attr("data-app-version", app._version);
	$("#src-root").attr("src", "./common/libs/seed.js");
	return $;
}
