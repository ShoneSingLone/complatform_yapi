const ModelBase = require("server/models/base");

const schemaObj = {
	/* 文件名 */
	name: String,
	/* ext */
	ext: String,
	/* 文件MD5 */
	md5: String,
	/* 目录id 对应的就是resource 的_id 类似pid的意思，通常fileId对应的类型是文件夹*/
	fileId: {
		type: String,
		default: 0
	},
	/* 资源存放在服务器的真实url */
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
	basecode: String,
	useFor: {
		type: String,
		default: 0,
		enum: ["all", "CloudDisk", "wiki"]
	}
};

class ModelResource extends ModelBase {
	getName() {
		return "resource";
	}

	getSchema() {
		return schemaObj;
	}

	/* @typescriptDeclare (data:object)=> Promise<any> */
	save(data) {
		let modelVM = new this.model(data);
		return modelVM.save();
	}

	/* @typescriptDeclare (id:number|number[],modify:object)=> Promise<any> */
	update(_id, newResource) {
		if (xU._.isArray(_id)) {
			return this.model.updateMany({ _id: { $in: _id } }, newResource);
		} else {
			return this.model.updateOne({ _id }, newResource);
		}
	}
	/* @typescriptDeclare (...args:any)=> Promise<any> */
	async updateOneByMd5(md5, newResource) {
		const findFileInResource = await this.findByMd5(md5);
		if (findFileInResource) {
			return this.model.update({ md5 }, newResource);
		} else {
			return this.save(newResource);
		}
	}

	getResourceById(_id, uploadBy = "") {
		const params = {
			_id
		};

		if (uploadBy) {
			params.uploadBy = uploadBy;
		}
		return this.model.findOne(params).exec();
	}
	getResourceByName(name, fileId) {
		const params = { name };
		if (fileId || fileId === 0) {
			params.fileId = fileId;
		}
		return this.model.findOne(params).exec();
	}
	findByMd5(md5) {
		return this.model
			.findOne({
				md5
			})
			.exec();
	}

	findAll() {
		return this.model
			.find()
			.select("_id name type size desc uploadBy add_time basecode")
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
	/* @typescriptDeclare (condition:object,orderBy?:object,select?:string)=> Promise<any> */
	search(condition, orderBy = {}, select = "") {
		if (select) {
			return this.model.find(condition).select(select).sort(orderBy).exec();
		}
		const defaultSelect = Object.keys(schemaObj);
		xU._.remove(defaultSelect, ["path"]);

		return this.model
			.find(condition)
			.select(["_id", ...defaultSelect].join(" "))
			.sort(orderBy)
			.exec();
	}
}

module.exports = ModelResource;
