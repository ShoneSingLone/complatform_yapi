const ModelBase = require("server/models/base");

class ModelCiCdTaskQueue extends ModelBase {
	getName() {
		return "CiCdTaskQueue";
	}

	getSchema() {
		return {
			task_id: { type: Number, required: true },
			task_status: {
				type: String,
				required: true,
				default: "stop",
				enum: [
					"stop" /* 未触发 */,
					"running" /* 正在执行 */,
					"success" /* 执行成功 */,
					"fail" /* 执行失败 */,
					"waiting" /* 等待中 */
				]
			},
			/* 产出物地址 */
			artifacts: String,
			/* 运行日志 */
			task_log: String,
			/* git提交的hash值，可以作为唯一标识符 */
			commit_hash: String,
			/* 最新运行时间，如果短时间内，1分钟内多次运行，则只运行一次 */
			last_time: Number
		};
	}
	find(condition) {
		return this.model.find(condition).exec();
	}

	remove({ _id }) {
		return this.model.remove({
			_id
		});
	}

	save(data) {
		let model = new this.model(data);
		return model.save();
	}
}

module.exports = ModelCiCdTaskQueue;
