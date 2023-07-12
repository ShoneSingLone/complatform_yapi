const { Schema, model } = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

function dbModel(modelName, schema) {
	if (!(schema instanceof Schema)) {
		schema = new Schema(schema);
	}
	schema.set("autoIndex", false);
	return model(modelName, schema, modelName);
}

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
		xU.applog.error("Model Class need getSchema function");
	}

	getName() {
		xU.applog.error("Model Class need name");
	}
}

module.exports = ModelBase;
