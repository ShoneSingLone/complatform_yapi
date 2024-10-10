const ModelBase = require("server/models/base");
const { ObjectId } = require("mongodb");

/**
 * @namespace {type} ModelProject
 * @class ModelProject
 * @extends {ModelBase}
 */
class ModelProject extends ModelBase {
	getName() {
		return "project";
	}

	getSchema() {
		return {
			uid: { type: Number, required: true },
			name: { type: String, required: true },
			basepath: { type: String },
			switch_notice: { type: Boolean, default: true },
			desc: String,
			group_id: { type: Number, required: true },
			project_type: {
				type: String,
				required: true,
				enum: ["public", "private"]
			},
			members: [
				{
					uid: Number,
					role: {
						type: String,
						enum: ["owner", "dev"]
					},
					username: String,
					email: String,
					email_notice: {
						type: Boolean,
						default: true
					}
				}
			],
			env: [
				{
					name: String,
					domain: String,
					header: Array,
					global: [
						{
							name: String,
							value: String
						}
					]
				}
			],
			icon: String,
			color: String,
			add_time: Number,
			up_time: Number,
			pre_script: String,
			after_script: String,
			project_mock_script: String,
			requestCode: String,
			is_mock_open: { type: Boolean, default: false },
			strice: { type: Boolean, default: false },
			is_json5: { type: Boolean, default: true },
			tag: [{ name: String, desc: String }]
		};
	}

	constructor() {
		super();
		this.handleEnvNullData = this.handleEnvNullData.bind(this);
	}

	getAuthList(uid) {
		return this.model
			.find({
				$or: [
					{
						"members.uid": uid,
						project_type: "private"
					},
					{
						uid,
						project_type: "private"
					},
					{
						project_type: "public"
					}
				]
			})
			.select("group_id")
			.exec();
	}

	updateMember(data) {
		return this.model.update(
			{
				"members.uid": data.uid
			},
			{
				$set: {
					"members.$.username": data.username,
					"members.$.email": data.email
				}
			}
		);
	}

	save(data) {
		let m = new this.model(data);
		return m.save();
	}

	handleEnvNullData(data) {
		if (!data) {
			console.log("🚀 ~ ModelProject ~ handleEnvNullData ~ data:", data);
		}
		data = data.toObject();
		data.toObject = () => data;
		let isFix = false;
		if (Array.isArray(data.env)) {
			data.env = data.env.map(item => {
				item.global = item.global.filter(global_value => {
					if (!global_value || typeof global_value !== "object") {
						isFix = true;
						return false;
					}
					return true;
				});
				return item;
			});
		}

		if (isFix) {
			this.model.update(
				{
					_id: data._id
				},
				{
					$set: { env: data.env }
				},
				{ runValidators: true }
			);
		}
		return data;
	}

	get(id) {
		const _id = Number(id);
		return this.model
			.findOne({ _id })
			.exec()
			.then(data => {
				return this.handleEnvNullData(data);
			});
	}

	getByEnv(id) {
		return this.model
			.findOne({
				_id: id
			})
			.select("env")
			.exec()
			.then(data => {
				return this.handleEnvNullData(data);
			});
	}

	getProjectWithAuth(group_id, uid) {
		return this.model.countDocuments({
			group_id: group_id,
			"members.uid": uid
		});
	}

	getBaseInfo(id, select) {
		select =
			select ||
			"_id uid name basepath switch_notice desc group_id project_type env icon color add_time up_time pre_script after_script project_mock_script is_mock_open strice is_json5 tag requestCode";
		return this.model
			.findOne({
				_id: id
			})
			.select(select)
			.exec()
			.then(data => {
				return this.handleEnvNullData(data);
			});
	}

	getByDomain(domain) {
		return this.model
			.find({
				prd_host: domain
			})
			.exec()
			.then(data => {
				return this.handleEnvNullData(data);
			});
	}

	checkNameRepeat(name, groupid) {
		return this.model.countDocuments({
			name: name,
			group_id: groupid
		});
	}

	checkDomainRepeat(domain, basepath) {
		return this.model.countDocuments({
			prd_host: domain,
			basepath: basepath
		});
	}

	list(group_id) {
		let params = { group_id: group_id };
		return (
			this.model
				.find(params)
				// .select( "_id uid name basepath switch_notice desc group_id project_type color icon env add_time up_time requestCode" )
				.sort({ _id: -1 })
				.exec()
		);
	}

	// 获取项目数量统计
	getProjectListCount() {
		return this.model.countDocuments();
	}

	countWithPublic(group_id) {
		let params = { group_id: group_id, project_type: "public" };
		return this.model.countDocuments(params);
	}

	async paging({ group_id, page, size, name, uid, isAdmin }) {
		name = name || ".*";

		const condition = {
			"members.uid": { $in: [uid] },
			group_id: { $ne: null },
			$or: [
				/* TODO: _id 作为字符串的模糊查询*/
				{
					name: { $regex: new RegExp(name, "i") }
				}
			]
		};
		if (isAdmin) {
			/* 管理员可以查看所有项目 */
			delete condition["members.uid"];
		}

		if (xU.isInput(group_id)) {
			condition.group_id = group_id;
		}

		if (page === 0 && size === -1) {
			/* 查询所有 */
			return {
				list: await this.model
					.find(condition)
					.sort({
						group_id: -1
					})
					.exec(),
				total: await this.model.countDocuments(condition)
			};
		} else {
			/* 分页查询 */
			return {
				list: await this.model
					.find(condition)
					.sort({
						group_id: -1
					})
					.skip((page - 1) * size)
					.limit(size)
					.exec(),
				total: await this.model.countDocuments(condition)
			};
		}
	}

	listCount(group_id) {
		return this.model.countDocuments({
			group_id: group_id
		});
	}

	countByGroupId(group_id) {
		return this.model.countDocuments({
			group_id: group_id
		});
	}

	del(id) {
		return this.model.remove({
			_id: id
		});
	}

	delByGroupid(groupId) {
		return this.model.remove({
			group_id: groupId
		});
	}

	up(id, data) {
		data.up_time = xU.time();
		return this.model.update(
			{
				_id: id
			},
			data,
			{ runValidators: true }
		);
	}

	addMember(id, data) {
		return this.model.update(
			{
				_id: id
			},
			{
				// $push: { members: data }
				$push: { members: { $each: data } }
			}
		);
	}

	delMember(id, uid) {
		return this.model.update(
			{
				_id: id
			},
			{
				$pull: { members: { uid: uid } }
			}
		);
	}

	checkMemberRepeat(id, uid) {
		return this.model.countDocuments({
			_id: id,
			"members.uid": uid
		});
	}

	changeMemberRole(id, uid, role) {
		return this.model.update(
			{
				_id: id,
				"members.uid": uid
			},
			{
				$set: { "members.$.role": role }
			}
		);
	}

	changeMemberEmailNotice(id, uid, notice) {
		return this.model.update(
			{
				_id: id,
				"members.uid": uid
			},
			{
				$set: { "members.$.email_notice": notice }
			}
		);
	}

	search(keyword = "") {
		return this.model
			.find({
				name: new RegExp(keyword, "ig")
			})
			.limit(10);
	}
}

module.exports = ModelProject;
