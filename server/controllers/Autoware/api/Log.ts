module.exports = {
	definitions: {},
	tag: {
		description: "日志记录"
	},
	paths: {
		/* 获取动态列表 */
		"/log/list": {
			get: {
				summary: "获取动态列表",
				description: "",
				request: {
					query: {
						typeid: {
							required: true,
							description: "动态类型id， 不能为空",
							type: "number"
						},
						type: {
							required: true,
							description: "动态类型",
							type: "string",
							enum: ["wiki", "group"]
						},
						page: {
							required: true,
							description: "分页页码",
							type: "number"
						},
						size: {
							required: true,
							description: "分页大小",
							type: "number"
						},
						selectValue: {
							description: "********",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					const { typeid, type, selectValue, page, size } = ctx.payload;

					if (!typeid) {
						return (ctx.body = xU.$response(null, 400, "typeid不能为空"));
					}
					if (!type) {
						return (ctx.body = xU.$response(null, 400, "type不能为空"));
					}

					/* 策略 */
					const strategies = {
						async wiki_doc() {
							let result = await orm.log.listWithPaging(
								typeid,
								type,
								page,
								size,
								selectValue
							);
							let count = await orm.log.listCount(typeid, type, selectValue);
							ctx.body = xU.$response({
								total: count,
								list: result
							});
						},

						async project() {
							let result = await orm.log.listWithPaging(
								typeid,
								type,
								page,
								size,
								selectValue
							);
							let count = await orm.log.listCount(typeid, type, selectValue);

							ctx.body = xU.$response({
								total: count,
								list: result
							});
						},
						async group() {
							let projectList = await orm.project.list(typeid);
							let projectIds = [],
								projectDatas = {};
							for (let i in projectList) {
								projectDatas[projectList[i]._id] = projectList[i];
								projectIds[i] = projectList[i]._id;
							}
							let projectLogList = await orm.log.listWithPagingByGroup(
								typeid,
								projectIds,
								page,
								size
							);
							projectLogList.forEach((item, index) => {
								item = item.toObject();
								if (item.type === "project") {
									item.content =
										`在 <a href="/project/${item.typeid}">${
											projectDatas[item.typeid].name
										}</a> 项目: ` + item.content;
								}
								projectLogList[index] = item;
							});
							let total = await orm.log.listCountByGroup(typeid, projectIds);
							ctx.body = xU.$response({
								list: projectLogList,
								total
							});
						}
					};

					try {
						await strategies[type]();
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		"/log/list_by_update": {
			post: {
				summary: "获取特定cat_id下最新修改的动态信息",
				description: "",
				request: {
					body: {
						type: {
							required: true,
							description:
								"日志记录的分类，分别属性何种类型，需要配合动态ID才能查询出对应的记录",
							type: "string",
							enum: ["wiki", "group", "project", "interface"]
						},
						typeid: {
							required: true,
							description: "动态类型id， 不能为空",
							type: "number"
						},
						apis: {
							required: true,
							description: "",
							type: "array"
						}
					}
				},
				async handler(ctx) {
					const modelLog = orm.log;

					try {
						let { typeid, type, apis } = ctx.payload;
						let list = [];
						let projectDatas = await orm.project.getBaseInfo(
							typeid,
							"basepath"
						);

						let basePath = projectDatas.toObject().basepath;

						for (let i = 0; i < apis.length; i++) {
							let api = apis[i];
							if (basePath) {
								api.path =
									api.path.indexOf(basePath) === 0
										? api.path.substr(basePath.length)
										: api.path;
							}
							let interfaceIdList = await orm.interface.getByPath(
								typeid,
								api.path,
								api.method,
								"_id"
							);

							for (let j = 0; j < interfaceIdList.length; j++) {
								let interface_id = interfaceIdList[j];
								let id = interface_id.id;
								let result = await modelLog.listWithCatid(typeid, type, id);

								list = list.concat(result);
							}
						}
						ctx.body = xU.$response(list);
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		}
	}
};
