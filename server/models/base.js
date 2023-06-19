const { yapi } = global;
const { Schema } = require("mongoose");
const { model: dbModel } = require("server/utils/db");
const autoIncrement = require("mongoose-auto-increment");

/**
 * 所有的model都需要继承baseModel, 且需要 getSchema和getName方法，不然会报错
 */

class ModelBase {
	constructor() {
		/* 约定优于配置，不要东搞西搞 */
		const IS_NEED_AUTO_INCREMENT = true;
		const PRIMARY_KEY = "_id";

		this.schema = new Schema(this.getSchema());
		this.name = this.getName();

		if (IS_NEED_AUTO_INCREMENT) {
			this.schema.plugin(autoIncrement.plugin, {
				model: this.name,
				field: PRIMARY_KEY,
				startAt: 1,
				incrementBy: 1
			});
		}

		this.model = dbModel(this.name, this.schema);
	}

	/**
	 * 获取collection的schema结构
	 */
	getSchema() {
		xU.log("Model Class need getSchema function", "error");
	}

	getName() {
		xU.log("Model Class need name", "error");
	}
}

module.exports = ModelBase;
