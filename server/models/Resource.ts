const ModelBase = require("server/models/base");

class ModelResource extends ModelBase {
	getName() {
		return "resource";
	}

	getSchema() {
		return {
			name: String,
			path: {
				type: String,
				required: true
			},
			type: {
				type: String,
				required: true
			},
			size: Number,
			desc: String,
			uploadBy: String,
			add_time: Number,
			basecode: String
		};
	}

	save(data) {
		let modelVM = new this.model(data);
		return modelVM.save();
	}

	update(_id, newResource) {
		return this.model.updateOne({ _id }, newResource);
	}

	getResourceById(_id) {
		return this.model
			.findOne({
				_id
			})
			.exec();
	}
	getResourceByName(name) {
		return this.model
			.findOne({
				name
			})
			.exec();
	}

	findAll() {
		return this.model
			.find()
			.select("_id name path type size desc uploadBy add_time basecode")
			.exec();
	}

	search(keyword) {
		return this.model
			.find(
				{
					$or: [
						{ email: new RegExp(keyword, "i") },
						{ username: new RegExp(keyword, "i") }
					]
				},
				{
					passsalt: 0,
					password: 0
				}
			)
			.limit(10);
	}
}

module.exports = ModelResource;
