const ModelBase = require("server/models/base");
const mongoose = require("mongoose");

class ModelStroage extends ModelBase {
	getName() {
		return "storage";
	}

	getSchema() {
		return {
			key: { type: Number, required: true },
			data: {
				type: String,
				default: ""
			} //用于原始数据存储
		};
	}
	save(key, data = {}, isInsert = false) {
		let saveData = {
			key,
			data: JSON.stringify(data, null, 2)
		};
		if (isInsert) {
			let r = new this.model(saveData);
			return r.save();
		}
		return this.model.updateOne(
			{
				key
			},
			saveData
		);
	}

	del(key) {
		return this.model.remove({
			key
		});
	}

	get(key) {
		return this.model
			.findOne({
				key
			})
			.exec()
			.then(data => {
				this.save(key, {});
				if (!data) return null;
				data = data.toObject().data;
				try {
					return JSON.parse(data);
				} catch (e) {
					return {};
				}
			});
	}
}

module.exports = ModelStroage;
