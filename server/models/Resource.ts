const ModelBase = require("server/models/base");

class ModelResource extends ModelBase {
	getName() {
		return "resource";
	}

	getSchema() {
		return {
			/* 文件名 */
			name: String,
			/* ext */
			ext: String,
			/* 文件MD5 */
			md5: String,
			/* 目录id */
			fileId: {
				type: String,
				default: 0
			},
			/* 资源真实url */
			path: {
				type: String,
				required: true
			},
			type: {
				type: String,
				required: true
			},
			/* 文件大小 kb */
			size: { type: Number, default: 0 },
			/* 是否为文件夹 */
			isdir: {
				type: Number,
				default: 0,
				enum: [0, 1, 2]
			},
			desc: String,
			/* 用户id */
			uploadBy: String,
			add_time: Number,
			basecode: String
		};
	}

	/* @typescriptDeclare (data:object)=> Promise<any> */
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

	/**
	 * @description
	 *
	 * @param {any} condition
	 * @returns
	 *
	 * @memberOf ModelResource
	 */
	/* @typescriptDeclare (condition:object,orderBy?:object)=> Promise<any> */
	search(condition, orderBy = {}) {
		return this.model.find(condition).sort(orderBy).exec();
	}
}

module.exports = ModelResource;
