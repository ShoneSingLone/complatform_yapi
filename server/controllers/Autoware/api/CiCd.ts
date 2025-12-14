const { initRepo, runTask } = require("./CiCd.service");

const ID_TYPE = (required = false) => ({
	required,
	description: "CICD ID",
	type: "string"
});

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
					project_id: ID_TYPE(true)
				},
				async handler(ctx) {
					let { project_id } = ctx.payload;
					try {
						let cicd_array = await orm.CiCd.find({ project_id });
						/* 跟项目相关的git仓库id */
						const git_repo_array = await Promise.all(
							xU._.map(cicd_array, async cicd => {
								let [git_repo] = await orm.GitRepo.find({
									_id: cicd.git_repo_id
								});
								/* _id是git_repo */
								const repoInfo = xU._.merge(
									{
										cicd_id: cicd._id
									},
									cicd.toObject(),
									xU._.omit(git_repo.toObject(), ["username", "password"])
								);

								return repoInfo;
							})
						);

						ctx.body = xU.$response({
							list: git_repo_array
						});
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		"/cicd/git_init_repo": {
			post: {
				summary:
					"根据git仓库地址初始化git仓库（clone repo到服务器特定地址，方便后续操作）",
				description:
					"根据git仓库地址初始化git仓库（clone repo到服务器特定地址，方便后续操作）",
				request: {
					body: {
						git_address: {
							required: true,
							description: "git地址",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						const { git_address } = ctx.payload;
						/* 项目状态为unset才处理 */
						let [git_repo] = await orm.GitRepo.find({ git_address });
						if (git_repo) {
							if (git_repo.status === "unset" || !git_repo.git_repo_root) {
								initRepo({ git_repo, uid: this.$uid });
							}
						}
						ctx.body = xU.$response({});
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/cicd/git_address_add": {
			post: {
				summary: "添加CICD下的任务",
				description: "添加CICD下的任务",
				request: {
					body: {
						project_id: ID_TYPE(true),
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

						if (!git_repo) {
							git_repo = await orm.GitRepo.save({
								alias,
								git_address,
								username,
								password
							});
						}

						git_repo_id = git_repo._id;

						let [thisProjectCicd] = await orm.CiCd.find({
							project_id,
							git_repo_id
						});

						if (!thisProjectCicd) {
							await orm.CiCd.save({
								project_id,
								git_repo_id
							});
						}
						ctx.body = xU.$response({
							project_id,
							git_repo_id
						});
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/cicd/task_list": {
			get: {
				summary: "获取任务列表",
				description: "获取任务列表",
				query: {
					cicd_id: ID_TYPE(),
					task_id: ID_TYPE()
				},
				async handler(ctx) {
					let { cicd_id, task_id } = ctx.payload;
					try {
						let result = await orm.CiCdTask.find(
							xU.newCondition({ cicd_id, _id: task_id })
						);
						/* 跟项目相关的git仓库id */

						ctx.body = xU.$response({
							list: result
						});
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},

		"/cicd/task_add": {
			post: {
				summary: "添加CICD下的任务",
				description: "添加CICD下的任务",
				request: {
					body: {
						cicd_id: ID_TYPE(true),
						task_name: {
							required: true,
							description: "任务名，同一个cici条目下，唯一",
							type: "string"
						},
						task_ref: {
							required: true,
							type: "string"
						},
						task_action: {
							required: true,
							description: "此任务调用的脚本",
							type: "string"
						},
						task_output_type: {
							required: true,
							description: "此任务最终的产出类型",
							type: "string",
							default: "ARCHIVE_FILE",
							enum: ["ARCHIVE_FILE", "DO_NOTHING"]
						},
						task_remark: {
							required: true,
							description: "说明",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						let {
							cicd_id,
							task_name,
							task_action,
							task_token,
							task_triggers,
							task_output_type,
							task_remark,
							_id
						} = ctx.payload;

						if (!cicd_id) {
							return (ctx.body = xU.$response(null, 400, "CICD ID不能为空"));
						}
						/* 同一个cicd下task_name不可重复 */
						let [task] = await orm.CiCdTask.find({
							cicd_id,
							task_name
						});

						if (task) {
							if (task._id === _id) {
								/* 这是更新，无事发生 */
							} else {
								return (ctx.body = xU.$response(null, 400, "任务名称重复"));
							}
						}

						task_token =
							task_token ||
							xU.$hashCode(yapi_configs.passsalt + task_name + Date.now());

						task = await orm.CiCdTask.upsert({
							...ctx.payload,
							cicd_id,
							task_name,
							task_token,
							task_triggers,
							task_action,
							task_output_type,
							task_remark
						});

						ctx.body = xU.$response(task);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/cicd/task_run": {
			post: {
				/* 未登录，可访问 */
				auth: true,
				summary: "执行CICD下的任务",
				description: "执行CICD下的任务",
				request: {
					query: {
						task_id: {
							required: true,
							description: "任务名，同一个cici条目下，唯一",
							type: "number"
						},
						task_token: {
							required: true,
							description: "调用脚本的token",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						let {
							task_id,
							task_token,
							after: commit_hash,
							ref: ref_trigger_this_job,
							commits,
							message
						} = ctx.payload;

						message = message || xU._.last(commits)?.message || "";

						if (!task_id) {
							return (ctx.body = xU.$response(null, 400, "任务 ID不能为空"));
						}

						let [task] = await orm.CiCdTask.find({
							_id: task_id
						});

						if (!task) {
							return (ctx.body = xU.$response(null, 400, "任务不存在"));
						}

						if (
							xU._.some(task.task_triggers, trigger =>
								message.includes(trigger)
							)
						) {
							/* 在commit里面自定义的特殊字段，只要推送的commit信息有，则通过 */
							if (task.task_token === task_token) {
								runTask({
									task,
									message,
									commit_hash,
									ref_trigger_this_job,
									payload: ctx.payload
								});
								ctx.body = xU.$response("任务开始执行");
							} else {
								throw new Error("token 过期");
							}
						} else {
							return (ctx.body = xU.$response(null, 400, "当前推送未触发作业"));
						}
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/cicd/job_list": {
			get: {
				summary: "获取作业列表",
				description: "获取作业列表",
				query: {
					cicd_id: ID_TYPE(true)
				},
				async handler(ctx) {
					let { cicd_id } = ctx.payload;
					try {
						let result = await orm.CiCdTaskQueue.find({ cicd_id });
						/* 跟项目相关的git仓库id */

						ctx.body = xU.$response({
							list: result
						});
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		"/cicd/git_branch_info": {
			get: {
				summary: "获取git的branch信息",
				description: "获取git的branch信息",
				query: {
					git_repo_id: {
						required: true,
						description: "git 仓库的 ID",
						type: "string"
					},
					is_pull: {
						type: Boolean
					}
				},
				async handler(ctx) {
					let { git_repo_id, is_pull } = ctx.payload;
					try {
						let [git_repo] = await orm.GitRepo.find({ _id: git_repo_id });
						/* 跟项目相关的git仓库id */

						if (git_repo.git_repo_root) {
							const branch_info = await xU.async_get_local_repo_branch_info({
								git_repo_root: git_repo.git_repo_root,
								is_pull
							});
							ctx.body = xU.$response({
								git_repo,
								branch_info
							});
						} else {
							ctx.body = xU.$response(
								{
									git_repo: xU._.omit(git_repo.toObject(), [
										"username",
										"password"
									])
								},
								400,
								"GIT仓库未初始化"
							);
						}
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		}
	}
};
