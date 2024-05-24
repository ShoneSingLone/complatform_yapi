const ModelBase = require("server/models/base");

class ResourceChunck extends ModelBase {
	getName() {
		return "ResourceChunck";
	}

	getSchema() {
		return {
			/* 文件名称 */
			fileHash: { type: String },
			/* 分片序号 */
			chunkIndex: { type: Number },
			/* 分片大小 */
			chunckSize: { type: String },
			/* 总分片数 */
			chunckTotal: { type: String }
		};
	}

	/* @typescriptDeclare (data: any)=> Promise<any> */
	save(data) {
		let modelVM = new this.model(data);
		return modelVM.save();
	}

	/**
	 * @description 根据md5查询分片信息
	 *
	 * @param {any} md5
	 * @returns
	 *
	 * @memberOf ResourceChunck
	 */
	/* @typescriptDeclare (md5: string)=> Promise<any> */
	findByMd5(fileHash) {
		return this.model
			.find({ fileHash })
			.sort({ chunkIndex: -1 })
			.select("_id chunckHash chunkIndex chunckSize fileHash chunckTotal")
			.exec();
	}
}

module.exports = ResourceChunck;
