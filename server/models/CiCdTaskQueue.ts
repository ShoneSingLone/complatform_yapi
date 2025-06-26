const ModelBase = require("server/models/base");

class ModelCiCdTaskQueue extends ModelBase {
	getName() {
		return "CiCdTaskQueue";
	}

	getSchema() {
		return {
			task_id: { type: Number, required: true },
			/* 所属cicd */
			cicd_id: { type: Number, required: true },
			task_status: {
				type: String,
				required: true,
				default: "stop",
				enum: [
					"stop" /* 未触发 */,
					"running" /* 正在执行 */,
					"success" /* 执行成功 */,
					"failed" /* 执行失败 */,
					"waiting" /* 等待中 */
				]
			},
			/* 产出物地址 */
			resource: Object,
			/* 运行日志 */
			task_log: String,
			/* 触发任务的分支信息 */
			task_ref: String,
			/* git commit信息 */
			message: String,
			/* git提交的hash值，可以作为唯一标识符 */
			commit_hash: String,
			/* 最新运行时间，如果短时间内，1分钟内多次运行，则只运行一次 */
			last_time: Number,
			payload: Object
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

	upsert(data) {
		if (data._id) {
			return this.model.update(
				{
					_id: data._id
				},
				data
			);
		} else {
			let m = new this.model(data);
			return m.save();
		}
	}
}

module.exports = ModelCiCdTaskQueue;
