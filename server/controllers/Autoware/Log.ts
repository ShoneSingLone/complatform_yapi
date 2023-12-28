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
						limit: {
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
					const modelLog = orm.log;
					const modelProject = orm.project;
					try {
						const { typeid, page, limit, type, selectValue } = ctx.payload;
						if (!typeid) {
							return (ctx.body = xU.$response(null, 400, "typeid不能为空"));
						}
						if (!type) {
							return (ctx.body = xU.$response(null, 400, "type不能为空"));
						}

						try {
							if (type === "group") {
								let projectList = await modelProject.list(typeid);
								let projectIds = [],
									projectDatas = {};
								for (let i in projectList) {
									projectDatas[projectList[i]._id] = projectList[i];
									projectIds[i] = projectList[i]._id;
								}
								let projectLogList = await modelLog.listWithPagingByGroup(
									typeid,
									projectIds,
									page,
									limit
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
								let total = await modelLog.listCountByGroup(typeid, projectIds);
								ctx.body = xU.$response({
									list: projectLogList,
									total
								});
							} else if (type === "project") {
								let result = await modelLog.listWithPaging(
									typeid,
									type,
									page,
									limit,
									selectValue
								);
								let count = await modelLog.listCount(typeid, type, selectValue);

								ctx.body = xU.$response({
									total: count,
									list: result
								});
							}
						} catch (err) {
							ctx.body = xU.$response(null, 402, err.message);
						}
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 获取特定cat_id下最新修改的动态信息 */
		"/log/list_by_update": {
			post: {
				summary: "获取动态列表",
				description: "",
				request: {
					body: {
						typeid: {
							required: true,
							description: "动态类型id， 不能为空",
							type: "number"
						}
					}
				},
				async handler(ctx) {
					const modelLog = orm.log;

					try {
						let { typeid, type, apis } = ctx.payload;
						let list = [];
						let projectDatas = await modelProject.getBaseInfo(
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
							let interfaceIdList = await this.modelInterface.getByPath(
								typeid,
								api.path,
								api.method,
								"_id"
							);

							for (let j = 0; j < interfaceIdList.length; j++) {
								let interfaceId = interfaceIdList[j];
								let id = interfaceId.id;
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
