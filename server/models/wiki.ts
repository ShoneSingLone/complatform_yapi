const ModelBase = require("server/models/base");

class ModelWiki extends ModelBase {
	getName() {
		return "wiki_doc";
	}

	getSchema() {
		return {
			belong_type: {
				type: String,
				enum: [
					"private",
					"group",
					"project",
					"all",
					"chat_all",
					"chat_one",
					"chat_group",
					"chat_project"
				],
				default: "private"
			},
			belong_id: { type: String },
			del_tag: { type: Number, default: 0 },
			/* article */
			type: String,
			title: String,
			p_id: { type: Number, default: 0 },
			project_id: { type: Number },
			username: String,
			/* 创建者_id */
			uid: { type: Number },
			/* 修改者_id */
			edit_uid: { type: Number, default: 0 },
			desc: String,
			markdown: String,
			add_time: Number,
			up_time: Number
		};
	}

	search(condition) {
		return this.model.find(xU._.merge(condition, { del_tag: 0 })).exec();
	}

	save(data) {
		let m = new this.model(data);
		return m.save();
	}

	/**
	 *
	 * 带单，无markdown detail
	 *
	 * @param {any} [params={}]
	 * @returns
	 *
	 * @memberOf ModelWiki
	 */

	/* @typescriptDeclare (parems:{belong_type?:string,belong_id?:string,select?:string,search_params?:object})=>Promise<any> */
	menu(params = {}) {
		const select =
			params.select ||
			"_id p_id type title project_id username uid edit_uid add_time up_time desc belong_type belong_id";
		const belong_type = params.belong_type || "all";
		let belong_id = params.belong_id;
		let content = params.search_params?.content || "";
		let title = params.search_params?.title || content || "";
		const condition = {
			del_tag: 0,
			belong_type
		};

		if (belong_id || 0 == belong_id) {
			condition.belong_id = belong_id;
		}
		condition.$or = [];

		if (content) {
			condition.$or.push({
				markdown: {
					$regex: content,
					$options: "i"
				}
			});
		}
		if (title) {
			condition.$or.push({
				title: {
					$regex: title,
					$options: "i"
				}
			});
		}

		if (xU._.isEmpty(condition.$or)) {
			delete condition.$or;
		}

		return this.model.find(condition).select(select).exec();
	}

	detail(_id) {
		return this.model.findOne({ _id, del_tag: 0 }).exec();
	}

	/* find  find  find  find  find  find  find  find  find  find  find  */

	delete(_id) {
		return this.up(_id, { del_tag: 1 });
	}

	up(_id, data) {
		return this.model.update({ _id }, data, { runValidators: true });
	}
}

module.exports = ModelWiki;
