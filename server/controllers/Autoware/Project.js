const _ = require("lodash");
async function checkProjectName(name, groupId) {
	if (!name) {
		return "项目名不能为空";
	}
	let count = await this.orm.project.checkNameRepeat(name, groupId);

	if (count > 0) {
		return "已存在的项目名";
	}
}


module.exports = {
	definitions: {},
	tag: {
		description: "项目信息"
	},
	paths: {
		"/project/up": {
			post: {
				summary: "更新项目配置",
				description: "",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id，不能为空",
							type: "number"
						},
						name: {
							required: true,
							description: "项目名称，不能为空",
							type: "string"
						},
						basepath: {
							required: true,
							description: "项目基本路径，不能为空",
							type: "string"
						},
						desc: { description: "项目描述", type: "string" }
					}
				},
				async handler(ctx) {
					try {
						let id = ctx.request.body.id;
						let params = ctx.payload;

						params = xU.ensureParamsType(params, {
							name: "string",
							basepath: "string",
							group_id: "number",
							desc: "string",
							pre_script: "string",
							after_script: "string",
							project_mock_script: "string"
						});

						if (!id) {
							return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
						}

						if ((await this.checkAuth(id, "project", "danger")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						let projectData = await this.orm.project.get(id);

						if (basepath) {
							if (
								(basepath = this.handleBasepath(basepath)) ===
								false
							) {
								return (ctx.body = xU.$response(null, 401, "basepath格式有误"));
							}
						}

						if (projectData.name === name) {
							delete name;
						}

						if (name) {
							let count = await xU
								.orm(ModelProject)
								.checkNameRepeat(name, group_id);
							if (count > 0) {
								return (ctx.body = xU.$response(null, 401, "已存在的项目名"));
							}
						}

						let data = {
							up_time: xU.time()
						};

						data = Object.assign({}, data, params);

						let result = await this.orm.project.up(id, data);
						let username = this.getUsername();
						xU.saveLog({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${projectData.name
								}</a>`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: id
						});
						xU.emitHook("project_up", result).then();
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/project/add": {
			post: {
				summary: "添加项目",
				description: "",
				request: {
					body: {
						name: { required: true, description: "项目名称，不能为空", type: "string" },
						basepath: { required: true, description: "项目基本路径，不能为空", type: "string" },
						group_id: { required: true, description: "项目分组id，不能为空", type: "string" },
						group_name: { required: true, description: "项目分组名称，不能为空", "type": "string", },
						project_type: { required: true, description: "项目类型", type: "string", "enum": ["private", "public"], "default": "public" },
						desc: { description: "描述", type: "string" }
					}
				},
				async handler(ctx) {

					let { name, basepath, group_id, group_name, project_type, desc, icon, color } = ctx.payload;

					if ((await this.checkAuth(group_id, "group", "edit")) !== true) {
						return (ctx.body = xU.$response(null, 405, "没有权限"));
					}

					let errorMsg = await checkProjectName(name, group_id);
					if (errorMsg) {
						ctx.body = xU.$response(null, 401, errorMsg);
						return;
					}

					basepath = basepath || "";

					if ((basepath = this.handleBasepath(basepath)) === false) {
						return (ctx.body = xU.$response(null, 401, "basepath格式有误"));
					}

					const requestCode = function ({
						title,
						projectId,
						interfaceId,
						path,
						method,
						xU
					}) {
						return `\`\`\`js
/**
*  ${title}
*  ${window.location.href}
*  http://10.143.133.216:3001/project/${projectId}/interface/api/${interfaceId}
*/
async ${xU.camelCase(path)}({params,data}) {
return await request({
method: "${method}",
url: \`${path}\`,
params:params||{},
data:data||{}
});
}
\`\`\`
`;
					};


					let data = {
						name: name,
						desc: desc,
						basepath: basepath,
						members: [],
						project_type: project_type || "private",
						uid: this.getUid(),
						group_id: group_id,
						group_name: group_name,
						icon: icon || "3d",
						color: color || "white",
						add_time: xU.time(),
						up_time: xU.time(),
						is_json5: false,
						env: [{ name: "local", domain: "http://127.0.0.1" }],
						requestCode: requestCode.toString()
					};
					const modelProject = this.orm.project;
					let result = await modelProject.save(data);
					let colInst = this.orm.interfaceCol;
					let catInst = this.orm.interfaceCategory;
					if (result._id) {
						await colInst.save({
							name: "公共测试集",
							project_id: result._id,
							desc: "公共测试集",
							uid: this.getUid(),
							add_time: xU.time(),
							up_time: xU.time()
						});
						await catInst.save({
							name: "公共分类",
							project_id: result._id,
							desc: "公共分类",
							uid: this.getUid(),
							add_time: xU.time(),
							up_time: xU.time()
						});
					}
					let uid = this.getUid();
					// 将项目添加者变成项目组长,除admin以外
					if (this.getRole() !== "admin") {
						let userdata = await xU.getUserdata(uid, "owner");
						await modelProject.addMember(result._id, [userdata]);
					}
					let username = this.getUsername();
					xU.saveLog({
						content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了项目 <a href="/project/${result._id
							}">${name}</a>`,
						type: "project",
						uid,
						username: username,
						typeid: result._id
					});
					xU.emitHook("project_add", result).then();
					ctx.body = xU.$response(result);
					return;
				}
			}
		},
		"/project/check_project_name": {
			get: {
				summary: "检查项目名是否重复",
				description: "",
				request: {
					query: {
						name: { required: true, description: "项目名称，不能为空", type: "string" },
						group_id: { required: true, description: "项目分组id，不能为空", type: "string" }
					}
				}, handler(ctx) {
					let { name, group_id } = ctx.payload;
					let count = checkProjectName(name, group_id);
					if (count) {
						return (ctx.body = xU.$response(401, null, count));
					} else {
						ctx.body = xU.$response(count);
					}
				}
			}
		},
		"/project/list": {
			get: {
				summary: "获取项目列表",
				description: "",
				request: {
					query: {
						group_id: { required: true, description: "项目分组id，不能为空", type: "string" }
					}
				},
				async handler(ctx) {
					let { group_id } = ctx.payload;
					let project_list = [];
					const uid = this.getUid();

					let groupData = await this.orm.group.get(group_id);

					let isPrivateGroup = false;
					if (groupData.type === "private" && uid === groupData.uid) {
						isPrivateGroup = true;
					}
					let auth = await this.checkAuth(group_id, "group", "view");
					let result = await this.orm.project.list(group_id);
					let follow = await this.orm.follow.list(uid);
					if (isPrivateGroup === false) {
						for (let index = 0, item, r = 1; index < result.length; index++) {
							item = result[index].toObject();
							if (item.project_type === "private" && auth === false) {
								r = await this.orm.project.checkMemberRepeat(item._id, uid);
								if (r === 0) {
									continue;
								}
							}

							let f = _.find(follow, { projectid: item.id });
							// 排序：收藏的项目放前面
							if (f) {
								item.follow = true;
								project_list.unshift(item);
							} else {
								item.follow = false;
								project_list.push(item);
							}
						}
					} else {
						follow = follow.map(item => {
							item = item.toObject();
							item._id = item.projectid;
							item.follow = true;
							return item;
						});
						project_list = _.uniq(follow.concat(result), item => item._id);
					}

					ctx.body = xU.$response({
						list: project_list
					});
				}
			}
		},
		/* 拷贝项目分组 */
		"/project/copy": {
			post: {
				summary: "拷贝项目",
				description: "",
				request: {
					query: {
						name: { required: true, description: "项目名称，不能为空", type: "string" },
						basepath: { required: true, description: "项目基本路径，不能为空", type: "string" },
						group_id: { required: true, description: "项目分组id，不能为空", type: "number" },
						group_name: { required: true, description: "项目分组名称，不能为空", type: "number" },
						project_type: { required: true, description: "类型", type: "string", enum: ["private", "public"] },
						desc: { required: true, description: "项目描述", type: "string" },
					}
				},
				async handler(ctx) {
					try {
						let { payload } = ctx;
						// 拷贝项目的ID
						let copyId = payload._id;
						if ((await this.checkAuth(payload.group_id, "group", "edit")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						payload.basepath = payload.basepath || "";

						let data = Object.assign(payload, {
							project_type: payload.project_type || "private",
							uid: this.getUid(),
							add_time: xU.time(),
							up_time: xU.time(),
							env: payload.env || [{ name: "local", domain: "http://127.0.0.1" }]
						});

						delete data._id;
						let result = await this.model.save(data);
						let colInst = this.orm.interfaceCol;
						let catInst = this.orm.interfaceCategory;

						// 增加集合
						if (result._id) {
							await colInst.save({
								name: "公共测试集",
								project_id: result._id,
								desc: "公共测试集",
								uid: this.getUid(),
								add_time: xU.time(),
								up_time: xU.time()
							});

							// 拷贝接口列表
							let cat = payload.cat;
							for (let i = 0; i < cat.length; i++) {
								let item = cat[i];
								let catDate = {
									name: item.name,
									project_id: result._id,
									desc: item.desc,
									uid: this.getUid(),
									add_time: xU.time(),
									up_time: xU.time()
								};
								let catResult = await catInst.save(catDate);

								// 获取每个集合中的interface
								let interfaceData = await this.modelInterface.listByInterStatus(
									item._id
								);

								// 将interfaceData存到新的catID中
								for (let key = 0; key < interfaceData.length; key++) {
									let interfaceItem = interfaceData[key].toObject();
									let data = Object.assign(interfaceItem, {
										uid: this.getUid(),
										catid: catResult._id,
										project_id: result._id,
										add_time: xU.time(),
										up_time: xU.time()
									});
									delete data._id;

									await this.modelInterface.save(data);
								}
							}
						}

						// 增加member
						let copyProject = await this.model.get(copyId);
						let copyProjectMembers = copyProject.members;

						let uid = this.getUid();
						// 将项目添加者变成项目组长,除admin以外
						if (this.getRole() !== "admin") {
							let userdata = await xU.getUserdata(uid, "owner");
							let check = await this.model.checkMemberRepeat(copyId, uid);
							if (check === 0) {
								copyProjectMembers.push(userdata);
							}
						}
						await this.model.addMember(result._id, copyProjectMembers);

						// 在每个测试结合下添加interface

						let username = this.getUsername();
						xU.saveLog({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 复制了项目 ${payload.preName
								} 为 <a href="/project/${result._id}">${payload.name}</a>`,
							type: "project",
							uid,
							username: username,
							typeid: result._id
						});
						ctx.body = xU.$response(result);
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
	}
};
