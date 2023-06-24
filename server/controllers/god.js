
const BaseController = require("server/controllers/base");
const { I18nModel } = require("server/models/I18n");
const _ = require("lodash");
const fs = require("fs");
const json5 = require("json5");

class GodController extends BaseController {
	constructor(ctx) {
		super(ctx);
		this.orm_i18n = xU.getInst(I18nModel);
	}

	/*
	 * 神说要啥就有啥
	 *
	 * @param {any} ctx
	 *
	 * @memberOf GodController
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

exports.GodController = GodController;
