const ModelBase = require("server/models/base");

class ModelCiCd extends ModelBase {
	getName() {
		return "CiCd";
	}

	getSchema() {
		return {
			/* 所属项目 */
			project_id: { type: Number, required: true },
			git_repo_id: { type: Number, required: true }
		};
	}
	list({ project_id }) {
		return this.model.find({ project_id }).exec();
	}

	remove({ key }) {
		return this.model.remove({
			key: key
		});
	}

	save(data) {
		let m = new this.model(data);
		return m.save();
	}
}

module.exports = ModelCiCd;
