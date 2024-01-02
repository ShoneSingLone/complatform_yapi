const ModelBase = require("server/models/base");

class ModelAvatar extends ModelBase {
	getName() {
		return "avatar";
	}
	getSchema() {
		return {
			uid: { type: Number, required: true },
			basecode: String,
			type: String,
			usedBy: String
		};
	}
	getBy(uid, usedBy = "user") {
		return this.model.findOne({
			uid: uid,
			usedBy
		});
	}
	get(uid) {
		return this.model.findOne({
			uid: uid
		});
	}

	upsert({ uid, basecode, type, usedBy }) {
		return this.model.update(
			{
				uid
			},
			{
				type,
				basecode,
				usedBy
			},
			{
				upsert: true
			}
		);
	}
}

module.exports = ModelAvatar;
