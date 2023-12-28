const ModelBase = require("server/models/base");

module.exports = class ModelVerifyCode extends ModelBase {
	getName() {
		return "VerifyCode";
	}
	getSchema() {
		return {
			email: { type: String, required: true },
			code: String,
			expires: Number
		};
	}
	upsertOne(data) {
		return this.model.update(
			{
				email: data.email
			},
			data,
			{
				upsert: true
			}
		);
	}
	findByEmail(email) {
		return this.model.findOne({
			email
		});
	}
	del(email) {
		return this.model.remove({
			email
		});
	}
};
