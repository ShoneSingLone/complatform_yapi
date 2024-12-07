const ModelBase = require("server/models/base");

class ModelAudio extends ModelBase {
	getName() {
		return "ChatApply";
	}

	getSchema() {
		return {
			/* 申请人id */
			user_id: Number,
			/* 好友id */
			friend_id: Number,
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

	async paging({ page, size, name, uid }) {
		name = name || ".*";

		const condition = {
			friend_id: uid
		};

		if (page === 0 && size === -1) {
			/* 查询所有 */
			return {
				list: await this.model
					.find(condition)
					.sort({
						created_at: -1
					})
					.exec(),
				total: await this.model.countDocuments(condition)
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
