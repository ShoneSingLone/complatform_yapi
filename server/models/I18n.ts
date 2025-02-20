const { diff } = require("jsondiffpatch");
const ModelBase = require("server/models/base");

class ModelI18n extends ModelBase {
	getName() {
		return "i18n";
	}
	getSchema() {
		return {
			key: { type: String, unique: true },
			zhCn: { type: String },
			enUs: { type: String },
			desc: { type: String },
			isRectified: { type: Boolean, default: false },
			valueArray: { type: String }
		};
	}
	deleteMany({ ids }) {
		return this.model.deleteMany({ _id: { $in: ids } });
	}
	save(data) {
		let m = new this.model(data);
		return m.save();
	}
	up(_id, data) {
		return this.model.update({ _id }, data, { runValidators: true });
	}
	list() {
		return this.model
			.find({})
			.sort({ key: -1 })
			.select("_id key zhCn enUs desc valueArray isRectified")
			.exec();
	}
	keyValue(condition = {}) {
		if (xU._.isArray(condition?.ids)) {
			const ids = condition.ids;
			delete condition.ids;
			condition._id = {
				$in: ids
			};
		}
		return this.model
			.find(condition)
			.sort({ key: -1 })
			.select("key valueArray")
			.exec();
	}
	detail(_id) {
		return this.model.findOne({ _id }).exec();
	}
	detailByKey(key) {
		return this.model.findOne({ key }).exec();
	}
	async insertMany(dataArray) {
		const start = Date.now();
		// await this.model.insertMany(dataArray);
		const insert = [];
		const existed = [];
		const different = [];
		await Promise.all(
			dataArray.map(async record => {
				const existedRecord = await this.detailByKey(record?.key);
				if (existedRecord?._id) {
					const diffRes = diff(
						record,
						xU._.pick(existedRecord, [
							"key",
							"isRectified",
							"desc",
							"valueArray"
						])
					);
					if (diffRes) {
						different.push({ existedRecord, diffRes });
					} else {
						existed.push(existedRecord);
					}
				} else {
					const insertResult = await this.save(record);
					insert.push(insertResult);
				}
			})
		);

		return {
			insert,
			existed,
			different,
			time: Date.now() - start
		};
	}
}

module.exports = ModelI18n;
