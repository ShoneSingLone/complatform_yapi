const ModelBase = require("server/models/base");

class ModelAudio extends ModelBase {
	getName() {
		return "ChatApply";
	}

	getSchema() {
		return {
			/* 用来搜索我提出的申请 */
			uid: Number,
			/* 用来搜索我收到的申请 */
			friendId: Number,
			/*  */
			nickname: String,
			/*  */
			lookme: Number,
			/*  */
			lookhim: Number,
			/* 申请状态 */
			status: {
				type: String,
				enum: ["pending", "refuse", "agree", "ignore"]
			},
			created_at: Number,
			updated_at: Number
		};
	}

	save(data) {
		let apply = new this.model(data);
		return apply.save();
	}

	async findOne({ uid, friendId, status }) {
		return this.model.find({ uid, friendId, status }).exec();
	}

	async paging({ page, size, friendId }) {
		const condition = {
			friendId
		};

		if (page === 0 && size === -1) {
			/* 查询所有 */
			const list = await this.model
				.find(condition)
				.sort({
					created_at: -1
				})
				.exec();
			return {
				list,
				total: list.length
			};
		} else {
			/* 分页查询 */
			return {
				list: await this.model
					.find(condition)
					.sort({
						created_at: -1
					})
					.skip((page - 1) * size)
					.limit(size)
					.exec(),
				total: await this.model.countDocuments(condition)
			};
		}
	}
}

module.exports = ModelAudio;
