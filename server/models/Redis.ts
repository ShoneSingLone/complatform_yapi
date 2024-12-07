const ModelBase = require("server/models/base");

class ModelRedis extends ModelBase {
	getName() {
		return "redis";
	}
	getSchema() {
		return {
			key: String,
			value: String
		};
	}
	list({key}) {
		return this.model.find({ key }).exec();
	}
}

module.exports = ModelRedis;
