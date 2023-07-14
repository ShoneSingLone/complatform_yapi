const ControllerBase = require("server/controllers/base");
const { ModelI18n } = require("server/models/I18n");
const { ModelResource } = require("server/models/Resource");
const { _n } = require("@ventose/utils-node");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const json5 = require("json5");
const mime = require("mime-types");

let TARGET_PREFIX = path.join(
	xU.var.APP_ROOT_SERVER_DIR,
	xU.var.UPLOADS,
	xU.var.RESOURCE_ASSETS
);

class ControllerGod extends ControllerBase {
	constructor(ctx) {
		super(ctx);
		this.orm_i18n = xU.orm(ModelI18n);
		this.orm_resource = xU.orm(ModelResource);
	}

	/**
	 *
	 *
	 * @param {any} ctx
	 *
	 * @memberOf ControllerGod
	 */
	async getResource(ctx) {
		try {
			const res = await this.orm_resource.getResourceById(ctx.query.id);
			if (res) {
				let targetPath = path.resolve(`${TARGET_PREFIX}${res.path}`);
				const isExist = xU.fileExist(targetPath);
				if (isExist) {
					xU.applog.info("targetPath", targetPath);
					ctx.status = 200;
					ctx.set("Content-Type", mime.lookup(res.path));
					ctx.body = fs.createReadStream(targetPath);
				} else {
					ctx.body = xU.resReturn(null, 404, "not found");
				}
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
	 * @memberOf ControllerGod
	 *
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

	/*
	 * 神说要啥就有啥
	 *
	 * @param {any} ctx
	 *
	 * @memberOf ControllerGod
	 * */
	async say(ctx) {
		const { incantations } = ctx.params;
		const strategy = STRATEGY[incantations];
		if (strategy) {
			try {
				const res = await strategy.call(this, ctx);
				ctx.body = xU.resReturn(res);
			} catch (err) {
				ctx.body = xU.resReturn(null, 402, err.message);
			}
		} else {
			ctx.body = xU.resReturn(null, 404, incantations);
		}
	}
}

const STRATEGY = {
	async upsertOneI18nRecord(ctx) {
		const params = _.omit(ctx.params, ["incantations"]);
		let res;
		if (params._id) {
			res = await this.orm_i18n.up(params._id, params);
		} else {
			const existedRecord = await this.orm_i18n.detailByKey(params?.key);
			if (existedRecord?._id) {
				throw new Error(`Key ${params?.key} Duplicated`);
			}
			res = await this.orm_i18n.save(params);
		}
		return { msg: res };
	},
	async upsertI18nRecordMany(ctx) {
		return {
			msg: await Promise.all(
				_.map(_.omit(ctx.params, ["incantations"]), async row => {
					if (row._id) {
						return this.orm_i18n.up(row._id, row);
					} else {
						return this.orm_i18n.save(row);
					}
				})
			)
		};
	},
	async i18nRecords(ctx) {
		const { condition } = ctx.params;
		if (condition && Object.keys(condition)?.length > 0) {
			return this.orm_i18n.keyValue(condition);
		} else {
			return this.orm_i18n.list();
		}
	},
	async i18nRecordById(ctx) {
		const _id = ctx.params._id;
		return this.orm_i18n.detail({ _id });
	},
	async deleteI18nRecords(ctx) {
		const ids = ctx.params.ids;
		return this.orm_i18n.deleteMany({ ids });
	},
	async importI18nJSON(ctx) {
		let path = ctx.params?.files?.file?.path;
		let msg = "";
		if (path) {
			try {
				const content = await fs.promises.readFile(path, "utf-8");

				function InnerScope(_content) {
					try {
						const getJSON = new Function(`return ${_content}`);
						const i18nObj = getJSON();
						if (typeof i18nObj === "object") {
							return i18nObj;
						}
					} catch (error) {}
					return [];
				}

				const i18nObj = InnerScope(content);
				const newRecords = _.map(i18nObj, (valueArray, key) => {
					return {
						key,
						isRectified: false,
						desc: "",
						valueArray: JSON.stringify(valueArray)
					};
				});
				return this.orm_i18n.insertMany(newRecords);
			} catch (error) {
				msg = error.message;
			} finally {
				await fs.promises.unlink(path);
			}
			if (msg) {
				throw new Error(msg);
			}
		} else {
			throw new Error("upload fail");
		}
	}
};

exports.ControllerGod = ControllerGod;
