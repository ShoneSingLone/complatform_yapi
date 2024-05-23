const ControllerBase = require("server/controllers/base");

const fs = require("fs");

class ControllerGod extends ControllerBase {
	constructor(ctx) {
		super(ctx);
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
				ctx.body = xU.$response(res);
			} catch (err) {
				ctx.body = xU.$response(null, 402, err.message);
			}
		} else {
			ctx.body = xU.$response(null, 404, incantations);
		}
	}
}

const STRATEGY = {
	async upsertOneI18nRecord(ctx) {
		const params = xU._.omit(ctx.params, ["incantations"]);
		let res;
		if (params._id) {
			res = await orm.I18n.up(params._id, params);
		} else {
			const existedRecord = await orm.I18n.detailByKey(params?.key);
			if (existedRecord?._id) {
				throw new Error(`Key ${params?.key} Duplicated`);
			}
			res = await orm.I18n.save(params);
		}
		return { msg: res };
	},
	async upsertI18nRecordMany(ctx) {
		return {
			msg: await Promise.all(
				xU._.map(xU._.omit(ctx.params, ["incantations"]), async row => {
					if (row._id) {
						return orm.I18n.up(row._id, row);
					} else {
						return orm.I18n.save(row);
					}
				})
			)
		};
	},
	async i18nRecords(ctx) {
		const { condition } = ctx.params;
		if (condition && Object.keys(condition)?.length > 0) {
			return orm.I18n.keyValue(condition);
		} else {
			return orm.I18n.list();
		}
	},
	async i18nRecordById(ctx) {
		const _id = ctx.params._id;
		return orm.I18n.detail({ _id });
	},
	async deleteI18nRecords(ctx) {
		const ids = ctx.params.ids;
		return orm.I18n.deleteMany({ ids });
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
				const newRecords = xU._.map(i18nObj, (valueArray, key) => {
					return {
						key,
						isRectified: false,
						desc: "",
						valueArray: JSON.stringify(valueArray)
					};
				});
				return orm.I18n.insertMany(newRecords);
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
