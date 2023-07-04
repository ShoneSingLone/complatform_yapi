const ModelBase = require("server/models/base");

class WikiOrderModel extends ModelBase {
	getName() {
		return "wiki_order";
	}

	getSchema() {
		return {
			belong_type: {
				type: String,
				enum: ["private", "group", "project", "all"],
				default: "private"
			},
			belong_id: { type: Number },
			order: { type: Array }
		};
	}
	save(data) {
		let m = new this.model(data);
		return m.save();
	}
	async detail(params) {
		params = params || {};
		if ("all" === params.belong_type) {
			delete params.belong_id;
		}
		return this.model.findOne(params).exec();
	}
	async upsertOne({ belong_type, belong_id, order }) {
		let msg;
		let params = (await this.detail({ belong_type, belong_id })) || {};
		if (params._id) {
			params.order = order;
			msg = await this.up(params._id, params);
		} else {
			params = { belong_type, belong_id, order };
			msg = await this.save(params);
		}
		return { msg };
	}
	delete(_id) {
		return this.up(_id, { del_tag: 1 });
	}
	up(_id, data) {
		return this.model.update({ _id }, data, { runValidators: true });
	}
}

exports.WikiOrderModel = WikiOrderModel;
