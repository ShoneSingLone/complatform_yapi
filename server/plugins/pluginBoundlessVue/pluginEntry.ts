const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const DIRS_ARRAY = fs.readdirSync(path.resolve(xU.var.APP_ROOT_DIR, "static"));

let APP_NAME_ARRAY = DIRS_ARRAY.reduce((target, dirname) => {
	const [, appName] = String(dirname).match(/business_(.*)/) || [];
	if (appName) {
		target.push(appName);
	}
	return target;
}, []);

APP_NAME_ARRAY = APP_NAME_ARRAY.concat(["static"]);

module.exports = async function (app) {
	app.use(async (ctx, next) => {
		const fileURI = (() => {
			const [, dirname, entryName, ...suburl] = ctx.path.split("/");

			if (ctx.path.includes("/business_")) {
				return businessAssets(ctx);
			} else if (APP_NAME_ARRAY.includes(dirname)) {
				if (entryName) {
					if (suburl.length) {
						if (entryName === "common") {
							return commonAssets(ctx);
						}
						debugger;
						// else {
						// 	return subhtml({ dirname, entryName, suburl });
						// }
					}
					return otherEntry({ dirname, entryName });
				} else {
					return defaultEntry({ dirname });
				}
			} else if (!dirname && !entryName) {
				ctx.status = 301;
				ctx.redirect("/yapi");
			}

			return false;
		})();

		if (xU._.isString(fileURI)) {
			if (fileURI && /.html$/.test(fileURI)) {
				const $ = await loadHtmlEntry({
					ctx,
					app,
					fileURI
				});
				return (ctx.body = $.html());
			} else {
				return loadAssets({
					ctx,
					app,
					fileURI
				});
			}
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
	/* 添加版本号:每次重启服务 */
	$("#src-root").attr("data-app-version", app._version);
	$("#src-root").attr("src", "./common/libs/min/seed.js");
	return $;
}

async function loadAssets({ ctx, app, fileURI }) {
	ctx.status = 200;
	const docPath = path.resolve(xU.var.APP_ROOT_DIR, "static", fileURI);
	const contentType = mime.lookup(docPath);
	ctx.set("Content-Type", contentType);
	ctx.body = fs.createReadStream(docPath);
}
function returnAsstes(ctx, spl) {
	const arr = ctx.path.split(spl);
	arr.shift();
	return `${spl}${arr.join(spl)}`.substring(1);
}
function businessAssets(ctx) {
	return returnAsstes(ctx, "/business_");
}
function commonAssets(ctx) {
	return returnAsstes(ctx, "/common");
}
function subhtml({ dirname, entryName, suburl }) {
	`business_${dirname}/${entryName}/${suburl.join("/")}.html`;
}
function defaultEntry({ dirname }) {
	return `business_${dirname}/${dirname}.html`;
}
function otherEntry({ dirname, entryName }) {
	return `business_${dirname}/${entryName}.html`;
}
