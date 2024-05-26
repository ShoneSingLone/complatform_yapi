const ModelBase = require("server/models/base");

class ResourceChunk extends ModelBase {
	getName() {
		return "ResourceChunk";
	}

	getSchema() {
		return {
			/* 文件名称 */
			fileHash: { type: String },
			/* 分片名称 */
			chunkName: { type: String },
			/* 分片序号 */
			chunkIndex: { type: Number },
			/* 分片大小 */
			chunkSize: { type: Number },
			/* 总分片数 */
			chunkTotal: { type: Number }
		};
	}

	/* @typescriptDeclare (data: any)=> Promise<any> */
	save(data) {
		let modelVM = new this.model(data);
		return modelVM.save();
	}

	delChunksByFileHash(fileHash) {
		return this.model.remove({
			fileHash
		});
	}
	/**
	 * 根据md5查询分片信息
	 * @param {any} md5
	 * @returns
	 */
	/* @typescriptDeclare (md5: string)=> Promise<any> */
	findByMd5(fileHash) {
		return this.model
			.find({ fileHash })
			.sort({ chunkIndex: 1 })
			.select("_id chunkName chunkIndex chunkSize fileHash chunkTotal")
			.exec();
	}
}

module.exports = ResourceChunk;
