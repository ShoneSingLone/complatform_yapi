const ModelBase = require("server/models/base");

class ModelRedis extends ModelBase {
	getName() {
		return "ChatFriend";
	}

	getSchema() {
		return {
			/*用户自己的ID*/
			uid: { type: Number, required: true },
			/*外键，好友ID*/
			friendId: { type: Number, required: true },
			projectname: { type: String, required: true },
			/*备注*/
			nickname: String,
			/*看我*/
			lookme: Number,
			/*看他*/
			lookhim: Number,
			/*星标朋友*/
			star: Number,
			/*是否黑名单*/
			isblack: Number,
			add_time: Number,
			up_time: Number
		};
	}

	list_all({ uid }) {
		return this.model.find({ uid }).exec();
	}

	get({ uid, friendId }) {
		return this.model .findOne({
				uid,
				friendId
			})
			.exec();
	}
}

module.exports = ModelRedis;
