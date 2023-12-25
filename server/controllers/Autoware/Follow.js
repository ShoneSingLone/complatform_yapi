
module.exports = {
	definitions: {},
	tag: {
		description: "日志记录"
	},
	paths: {
		/* 获取关注项目列表 */
		"/follow/list": {
			get: {
				summary: "获取关注项目列表",
				description: "获取关注项目列表",
				async handler(ctx) {
					let uid = this.getUid();
					if (!uid) {
						return (ctx.body = xU.$response(null, 400, "用户id不能为空"));
					}
					try {
						let result = await this.orm.project.list(uid);

						ctx.body = xU.$response({
							list: result
						});
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		/* 取消关注 */
		"/follow/del": {
			post: {
				summary: "取消关注",
				description: "取消关注",
				request: {
					body: {
						projectId: {
							required: true,
							description: "项目分组ID",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { projectid } = ctx.payload;

					let uid = this.getUid();

					if (!projectid) {
						return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
					}

					let count = await this.orm.follow.checkProjectRepeat(uid, projectid);

					if (count == 0) {
						return (ctx.body = xU.$response(null, 401, "项目未关注"));
					}

					try {
						let result = await this.orm.follow.del(projectid, this.getUid());
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 添加关注 */
		"/follow/add": {
			post: {
				summary: "添加关注",
				description: "添加关注",
				request: {
					body: {
						projectid: {
							required: true,
							description: "项目分组ID",
							type: "number"
						},
						projectname: {
							required: true,
							description: "项目名",
							type: "string"
						},
						icon: {
							// required: true,
							description: "项目icon",
							type: "string"
						},
					}
				},
				async handler(ctx) {

					let payload = xU.ensureParamsType(ctx.payload, { projectid: "number" });

					let uid = this.getUid();

					if (!payload.projectid) {
						return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
					}

					let count = await this.orm.follow.checkProjectRepeat(uid, payload.projectid);

					if (count) {
						return (ctx.body = xU.$response(null, 401, "项目已关注"));
					}

					try {
						let project = await this.orm.project.get(payload.projectid);
						let data = {
							uid: uid,
							projectid: payload.projectid,
							projectname: project.name,
							icon: project.icon,
							color: project.color
						};
						let result = await this.orm.follow.save(data);
						result = xU.fieldSelect(result, [
							"_id",
							"uid",
							"projectid",
							"projectname",
							"icon",
							"color"
						]);
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}


				}
			}
		}
	}
};
