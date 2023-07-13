const BaseController = require("server/controllers/base");
const { ModelResource } = require("server/models/Resource");
const { _n } = require("@ventose/utils-node");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const mime = require("mime-types");

let TARGET_PREFIX = path.resolve(__dirname, "../../..", xU.var.RESOURCE_ASSETS);

module.exports = class ResourceController extends BaseController {
	constructor(ctx) {
		super(ctx);
		this.orm_resource = xU.getInst(ModelResource);
	}

	/**
	 *
	 *
	 * @param {string} id
	 * @action getResource
	 * @url /
	 *
	 */
	async getResource(ctx) {
		try {
			const res = await this.orm_resource.getResourceById(ctx.query.id);
			if (res) {
				let targetPath = path.resolve(`${TARGET_PREFIX}${res.path}`);
				ctx.status = 200;
				ctx.set("Content-Type", mime.lookup(res.path));
				ctx.body = fs.createReadStream(targetPath);
			}
		} catch (e) {
			xU.applog.eerror(e.message);
		}
	}

	/*
	 *
	 *
	 * @param {any} ctx
	 *
	 * @memberOf ResourceController
	 * */
	async SingleUpload(ctx) {
		try {
			const { files, fields } = ctx.params;
			const { file } = files;
			const { useFor } = fields;
			const sourcePath = file.path;
			let targetPath = path.resolve(
				TARGET_PREFIX,
				useFor,
				dayjs().format("YYYY_MM_DD")
			);
			await _n.asyncSafeMakeDir(targetPath);
			const basename = path.basename(sourcePath);
			targetPath = path.resolve(targetPath, basename);
			await fs.promises.copyFile(sourcePath, targetPath);
			await fs.promises.unlink(sourcePath);
			const res = await this.orm_resource.save({
				name: file.name,
				path: _.last(String(targetPath).split(xU.var.RESOURCE_ASSETS)),
				type: file.type,
				useFor: useFor,
				size: file.size,
				uploadBy: this.$uid,
				add_time: xU.time()
			});
			ctx.body = xU.resReturn({ _id: res._id });
		} catch (e) {
			xU.applog.error(e.message);
			ctx.body = xU.resReturn(null, 402, e.message);
		}
	}
};
