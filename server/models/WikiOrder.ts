const ModelBase = require("server/models/base");

class ModelWikiOrder extends ModelBase {
	/**
	 * @description 获取表名
	 *
	 * @returns
	 *
	 * @memberOf ModelWikiOrder
	 */
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
	/**
	 * @description 保存
	 *
	 * @param {any} data
	 * @returns
	 *
	 * @memberOf ModelWikiOrder
	 */
	/* @typescriptDeclare (data: any)=>Promise<any> */
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
	/* @typescriptDeclare (_id: string)=>Promise<any> */
	delete(_id) {
		return this.up(_id, { del_tag: 1 });
	}
	/* @typescriptDeclare (_id: any, data: any)=>Promise<any> */
	up(_id, data) {
		return this.model.update({ _id }, data, { runValidators: true });
	}
}

module.exports = ModelWikiOrder;
