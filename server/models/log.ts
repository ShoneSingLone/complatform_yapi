const ModelBase = require("server/models/base");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

class ModelLog extends ModelBase {
	getName() {
		return "log";
	}

	getSchema() {
		return {
			uid: { type: Number, required: true },
			payload: {
				/* 其他数据，比如wiki的title变动 */
				old_title: {
					type: String
				},
				new_title: {
					type: String
				}
				/* 其他数据，比如wiki的title变动 */
			},
			type: {
				type: String,
				enum: [
					"user",
					"group",
					"interface",
					"project",
					"other",
					"interface_col",
					/* wiki note */
					"wiki_doc"
				],
				required: true
			},
			/* 针对不同type，比如wiki_doc,typeid就是修改的wiki_doc的id */
			typeid: { type: Number, required: true },
			content: { type: String, required: true },
			username: { type: String, required: true },
			add_time: Number,
			data: Schema.Types.Mixed //用于原始数据存储
		};
	}

	/**
	 * @param {String} content log内容
	 * @param {Enum} type log类型， ['user', 'group', 'interface', 'project', 'other']
	 * @param {Number} uid 用户id
	 * @param {String} username 用户名
	 * @param {Number} typeid 类型id
	 * @param {Number} add_time 时间
	 */
	save(data) {
		let saveData = {
			...data,
			payload: data.payload || {},
			content: data.content,
			type: data.type,
			uid: data.uid,
			username: data.username,
			typeid: data.typeid,
			add_time: xU.time(),
			data: data.data
		};

		let log = new this.model(saveData);

		return log.save();
	}

	del(id) {
		return this.model.remove({
			_id: id
		});
	}

	list(typeid, type) {
		return this.model
			.find({
				typeid: typeid,
				type: type
			})
			.exec();
	}

	listWithPaging({ typeid, type, page, size, selectValue, query_params }) {
		page = parseInt(page);
		size = parseInt(size);
		const params = {
			type: type,
			typeid: typeid
		};

		if (selectValue === "wiki") {
			params["data.type"] = selectValue;
		}
		if (selectValue && !isNaN(selectValue)) {
			params["data.interface_id"] = +selectValue;
		}
		if (query_params) {
			if (query_params.type === "wiki_log") {
				const { key } = query_params;
				// 处理关键字搜索
				if (key) {
					// 构建多字段模糊匹配条件
					params.$or = [
						{ data: { $regex: key, $options: "i" } }, // 匹配data字段
						{ content: { $regex: key, $options: "i" } }, // 匹配content字段
						{ "payload.old_title": { $regex: key, $options: "i" } }, // 匹配payload.old_title
						{ "payload.new_title": { $regex: key, $options: "i" } } // 匹配payload.new_title
					];
				}
			}
		}
		return this.model
			.find(params)
			.sort({ add_time: -1 })
			.skip((page - 1) * size)
			.limit(size)
			.exec();
	}

	listWithPagingByGroup(typeid, pidList, page, limit) {
		page = parseInt(page);
		limit = parseInt(limit);
		return this.model
			.find({
				$or: [
					{
						type: "project",
						typeid: { $in: pidList }
					},
					{
						type: "group",
						typeid: typeid
					}
				]
			})
			.sort({ add_time: -1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.exec();
	}

	listCountByGroup(typeid, pidList) {
		return this.model.countDocuments({
			$or: [
				{
					type: "project",
					typeid: { $in: pidList }
				},
				{
					type: "group",
					typeid: typeid
				}
			]
		});
	}

	listCount(typeid, type, selectValue) {
		const params = {
			type: type,
			typeid: typeid
		};

		if (selectValue === "wiki") {
			params["data.type"] = selectValue;
		}

		if (selectValue && !isNaN(selectValue)) {
			params["data.interface_id"] = +selectValue;
		}
		return this.model.countDocuments(params);
	}

	listWithCatid(typeid, type, interface_id) {
		const params = {
			type: type,
			typeid: typeid
		};
		if (interface_id && !isNaN(interface_id)) {
			params["data.interface_id"] = +interface_id;
		}
		return this.model
			.find(params)
			.sort({ add_time: -1 })
			.limit(1)
			.select("uid content type username typeid add_time")
			.exec();
	}
}

module.exports = ModelLog;
