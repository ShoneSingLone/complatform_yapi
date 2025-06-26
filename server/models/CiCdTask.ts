const ModelBase = require("server/models/base");

class ModelCiCdTask extends ModelBase {
	getName() {
		return "CiCdTask";
	}

	getSchema() {
		return {
			/* 所属cicd */
			cicd_id: { type: Number, required: true },
			/* 当前任务名称 */
			task_name: { type: String, required: true },
			/* task_token,发送请求是需要验证 */
			task_token: { type: String, required: true },
			task_action: {
				required: true,
				type: String
			},
			task_remark: {
				required: true,
				type: String
			},
			/* 触发job的分支 */
			task_ref: {
				required: true,
				type: [String]
			},
			task_output_type: {
				required: true,
				type: String,
				default: "DO_NOTHING",
				enum: ["ARCHIVE_FILE", "DO_NOTHING"]
			}
		};
	}
	find(condition) {
		return this.model.find(condition).exec();
	}

	remove({ key }) {
		return this.model.remove({
			key: key
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

module.exports = ModelCiCdTask;
