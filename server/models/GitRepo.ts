const ModelBase = require("server/models/base");

class ModeGitRepo extends ModelBase {
	getName() {
		return "GitRepo";
	}

	getSchema() {
		return {
			/* 别名 */
			alias: { type: String, required: true },
			/* git地址 */
			git_address: { type: String, required: true },
			/* 仓库在物理主机上的地址 */
			git_repo_root: { type: String },
			/* 状态是否已经从仓库下载到服务器：已下载 */
			status: {
				type: String,
				enum: ["done", "unset", "initializing"],
				default: "unset"
			},
			/* git 用户名 */
			username: { type: String, required: true },
			/* git 密码 */
			password: { type: String, required: true }
		};
	}
	git_address_list({ project_id }) {
		return this.model.find({ project_id }).exec();
	}
	list_in({ ids }) {
		return this.model
			.find({
				_id: {
					$in: ids
				}
			})
			.select("_id alias git_address status")
			.exec();
	}
	find(condition) {
		return this.model.find(condition).exec();
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
	update(data) {
		return this.model.update({ _id: data._id }, data, { runValidators: true });
	}
}

module.exports = ModeGitRepo;
