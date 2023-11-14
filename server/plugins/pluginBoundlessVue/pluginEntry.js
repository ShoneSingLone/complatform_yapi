const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");


module.exports = async function (app) {
    app.use(async (ctx, next) => {
        if (ctx.path === "/doc") {
            ctx.status = 200;
            ctx.set("Content-Type", "text/html");
            const docPath = path.resolve(app._root_path, "static/doc.html");
            const indexHtmlString = await fs.promises.readFile(docPath, "utf-8");
            const $ = cheerio.load(indexHtmlString);
            $("#src-root").attr("data-app-version", app._version);
            ctx.body = $.html();
            return;
        }

        if (/^\/boundless\//.test(ctx.path)) {
            let indexPath = path.join(app._root_path, "static", ctx.path.substring("/boundless".length + 1));
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
