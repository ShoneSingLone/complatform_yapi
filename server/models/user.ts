const ModelBase = require("server/models/base");

class ModelUser extends ModelBase {
	getName() {
		return "user";
	}

	getSchema() {
		return {
			/* 用户名 */
			username: {
				type: String,
				required: true
			},
			/* 昵称 */
			nickname: {
				type: String,
				required: true
			},
			password: {
				type: String,
				required: true
			},
			email: {
				type: String,
				required: true
			},
			/* 手机 */
			phone: {
				type: String
			},
			passsalt: String,
			study: { type: Boolean, default: false },
			role: String,
			add_time: Number,
			up_time: Number,
			//site用户是网站注册用户, third是第三方登录过来的用户
			type: { type: String, enum: ["site", "third"], default: "site" },
			/* 网盘总大小，单位:kb */
			cloudDiskSizeTotal: {
				type: Number,
				default: 0
			},
			/* 网盘已使用，单位:kb */
			cloudDiskSizeUsed: {
				type: Number,
				default: 0
			}
		};
	}

	save(data) {
		let user = new this.model(data);
		return user.save();
	}

	count(email) {
		return this.model.countDocuments({
			email: email
		});
	}

	list() {
		return this.model
			.find()
			.select("_id username email role type  add_time up_time study")
			.exec(); //显示id name email role
	}

	findByUids(uids) {
		return this.model
			.find({
				_id: { $in: uids }
			})
			.select("_id username email role type  add_time up_time study")
			.exec();
	}

	listWithPaging(page, limit) {
		page = parseInt(page);
		limit = parseInt(limit);
		return this.model
			.find()
			.sort({ _id: -1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.select("_id username email role type  add_time up_time study")
			.exec();
	}

	listCount() {
		return this.model.countDocuments();
	}

	findByEmail(email) {
		return this.model.findOne({
			$or: [{ email: new RegExp(email, "i") }]
		});
	}

	findById(id) {
		return this.model.findOne({
			_id: id
		});
	}

	del(id) {
		return this.model.remove({
			_id: id
		});
	}

	/**
	 * @description
	 *
	 * @param {any} id
	 * @param {any} data
	 * @returns
	 *
	 * @memberOf ModelUser
	 */
	update(id, data) {
		return this.model.update(
			{
				_id: id
			},
			data
		);
	}

	search(keyword) {
		return this.model
			.find(
				{
					$or: [
						{ email: new RegExp(keyword, "i") },
						{ username: new RegExp(keyword, "i") }
					]
				},
				{
					passsalt: 0,
					password: 0
				}
			)
			.limit(10);
	}
}

module.exports = ModelUser;
