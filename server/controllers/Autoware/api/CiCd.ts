module.exports = {
	definitions: {},
	tag: {
		description: "持续集成相关的接口"
	},
	paths: {
		/* 获取项目相关的git仓库地址 */
		"/cicd/git_address_list": {
			get: {
				summary: "获取项目相关的git仓库地址",
				description: "获取项目相关的git仓库地址",
				query: {
					project_id: {
						required: true,
						description: "项目ID",
						type: "string"
					}
				},
				async handler(ctx) {
					let { project_id } = ctx.payload;
					try {
						let result = await orm.CiCd.list({ project_id });

						const ids = xU._.map(result, row => row._id);
						result = await orm.GitRepo.list_in({ ids });

						ctx.body = xU.$response({
							list: result
						});
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		"/cicd/git_address_add": {
			post: {
				summary: "添加项目相关的git仓库地址",
				description: "添加项目相关的git仓库地址",
				request: {
					body: {
						project_id: {
							required: true,
							description: "项目分组ID",
							type: "number"
						},
						alias: {
							required: true,
							description: "git地址别名，可用于关联的项目",
							type: "string"
						},
						git_address: {
							required: true,
							description: "git地址",
							type: "string"
						},
						username: {
							required: true,
							description: "git 用户名",
							type: "string"
						},
						password: {
							required: true,
							description: "git 密码",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let payload = xU.ensureParamsType(ctx.payload, {
						project_id: "number"
					});

					try {
						const { project_id, alias, git_address, username, password } =
							payload;

						if (!project_id) {
							return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
						}

						let [git_repo] = await orm.GitRepo.find({
							git_address: git_address
						});

						let git_repo_id;

						if (git_repo) {
							/* 仓库已经有记录 */
							return (ctx.body = xU.$response({
								project_id,
								git_repo_id: git_repo._id
							}));
						}

						git_repo = await orm.GitRepo.save({
							alias,
							git_address,
							username,
							password
						});

						git_repo_id = git_repo._id;

						let result = await orm.CiCd.save({
							project_id,
							git_repo_id
						});
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		}
	}
};
