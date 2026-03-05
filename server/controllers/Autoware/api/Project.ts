const axios = require("axios");
const https = require("https");
const { getToken } = require("../../../utils/token");
const sha = require("sha.js");
async function checkProjectName(name, groupId) {
	if (!name) {
		return "项目名不能为空";
	}
	let count = await orm.project.checkNameRepeat(name, groupId);

	if (count > 0) {
		return "已存在的项目名";
	}
}

function handleBasepath(basepath) {
  if (!basepath) {
    return "";
  }
  if (basepath === "/") {
    return "";
  }
  if (basepath[0] !== "/") {
    basepath = "/" + basepath;
  }
  if (basepath[basepath.length - 1] === "/") {
    basepath = basepath.substr(0, basepath.length - 1);
  }
  if (!/^\/[a-zA-Z0-9\-\/\._]+$/.test(basepath)) {
    return false;
  }
  return basepath;
}

function verifyDomain(domain) {
  if (!domain) {
    return false;
  }
  if (/^[a-zA-Z0-9\-_\.]+?\.[a-zA-Z0-9\-_\.]*?[a-zA-Z]{2,6}$/.test(domain)) {
    return true;
  }
  return false;
}

function arrRepeat(arr, key) {
  const s = new Set();
  arr.forEach(item => s.add(item[key]));
  return s.size !== arr.length;
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
						let { basepath, name, group_id, id, requestCode } = params;

						if (!id) {
							return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
						}

						if ((await this.checkAuth(id, "project", "danger")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						let projectData = await orm.project.get(id);

						basepath = this.handleBasepath(basepath);

						if (!basepath) {
							return (ctx.body = xU.$response(null, 401, "basepath格式有误"));
						}

						if (projectData.name === name) {
							delete projectData.name;
						}

						if (projectData.name) {
							let count = await orm.project.checkNameRepeat(name, group_id);
							if (count > 0) {
								return (ctx.body = xU.$response(null, 401, "已存在的项目名"));
							}
						}

						let data = {
							up_time: xU.time()
						};

						data = Object.assign({}, projectData, data, params);

						let result = await orm.project.up(id, data);
						let username = this.getUsername();
						xU.save_log({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${
								projectData.name
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
						group_id: {
							required: true,
							description: "项目分组id，不能为空",
							type: "string"
						},
						group_name: {
							required: true,
							description: "项目分组名称，不能为空",
							type: "string"
						},
						project_type: {
							required: true,
							description: "项目类型",
							type: "string",
							enum: ["private", "public"],
							default: "public"
						},
						desc: { description: "描述", type: "string" }
					}
				},
				async handler(ctx) {
					let { name, basepath, group_id, group_name, project_type, desc, icon, color } =
						ctx.payload;

					if ((await this.checkAuth(group_id, "group", "edit")) !== true) {
						return (ctx.body = xU.$response(null, 405, "没有权限"));
					}

					let errorMsg = await checkProjectName(name, group_id);
					if (errorMsg) {
						ctx.body = xU.$response(null, 401, errorMsg);
						return;
					}

					basepath = this.handleBasepath(basepath);
					const group = await orm.group.get(group_id);
					if (!group) {
						return (ctx.body = xU.$response(null, 404, "分组信息有误"));
					}

					if (!basepath) {
						return (ctx.body = xU.$response(null, 401, "basepath格式有误"));
					}

					let data = {
						name: name,
						desc: desc,
						basepath: basepath,
						members: group.members || [],
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
						requestCode: ""
					};
					const modelProject = orm.project;
					let result = await modelProject.save(data);
					let colInst = orm.interfaceCol;
					let catInst = orm.interfaceCategory;
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
					xU.save_log({
						content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了项目 <a href="/project/${
							result._id
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
		"/project/del": {
			post: {
				summary: "删除项目",
				description: "",
				request: {
					body: {
						id: {
							required: true,
							description: "项目分组id，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { id } = ctx.payload;
					if ((await this.checkAuth(id, "project", "danger")) !== true) {
						return (ctx.body = xU.$response(null, 405, "没有权限"));
					}

					await orm.interface.delByProjectId(id);
					await orm.interfaceCol.delByProjectId(id);
					await orm.interfaceCase.delByProjectId(id);
					await orm.follow.delByProjectId(id);
					xU.emitHook("project_del", id).then();
					let result = await orm.project.del(id);
					ctx.body = xU.$response(result);
				}
			}
		},
		"/project/check_project_name": {
			get: {
				summary: "检查项目名是否重复",
				description: "",
				request: {
					query: {
						name: {
							required: true,
							description: "项目名称，不能为空",
							type: "string"
						},
						group_id: {
							required: true,
							description: "项目分组id，不能为空",
							type: "string"
						}
					}
				},
				handler(ctx) {
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
						group_id: {
							required: true,
							description: "项目分组id，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let { group_id } = ctx.payload;
					let project_list = [];
					const uid = this.getUid();

					let groupData = await orm.group.get(group_id);

					let isPrivateGroup = false;
					if (groupData.type === "private" && uid === groupData.uid) {
						isPrivateGroup = true;
					}
					let auth = await this.checkAuth(group_id, "group", "view");
					let result = await orm.project.list(group_id);
					let follow = await orm.follow.list(uid);
					/** 函数首先检查是否为私有群组，
					 * 如果不是，则遍历结果数组中的每个项目。
					 * 对于每个项目，它会检查是否属于私有项目并且用户是否有权限访问。
					 * 如果项目是私有的并且用户没有权限访问，则会检查用户是否重复加入了该项目。
					 * 如果用户重复加入了该项目，则继续处理下一个项目。
					 * 如果用户没有重复加入该项目，则在 follow 数组中查找是否存在与该项目相同的项目id。
					 * 如果存在相同的项目id，则将该项目标记为已收藏，并将其放在项目列表的开头。
					 * 如果不存在相同的项目id，则将该项目标记为未收藏，并将其放在项目列表的末尾。
					 * 最后，如果群组是私有的，则执行特定的逻辑
					 */
					if (isPrivateGroup === false) {
						for (let index = 0, item, r = 1; index < result.length; index++) {
							item = result[index].toObject();
							if (item.project_type === "private" && auth === false) {
								r = await orm.project.checkMemberRepeat(item._id, uid);
								if (r === 0) {
									continue;
								}
							}

							let f = xU._.find(follow, { projectid: item.id });
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
						project_list = xU._.uniq(follow.concat(result), item => item._id);
					}

					ctx.body = xU.$response({
						list: project_list
					});
				}
			}
		},
		"/project/page": {
			get: {
				summary: "获取项目列表,以分页的方式",
				description: "",
				request: {
					query: {
						name: {
							description: "项目名称",
							type: "string"
						},
						page: {
							required: true,
							description: "当前页",
							type: "number",
							default: 1
						},
						size: {
							required: true,
							description: "每页数量",
							type: "number",
							default: 10
						}
					}
				},
				async handler(ctx) {
					let { name, page, size } = ctx.payload;
					const { list, total } = await orm.project.paging({
						uid: this.$uid,
						page,
						size,
						name,
						isAdmin: this.$user.role === "admin"
					});

					ctx.body = xU.$response({
						list,
						total
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
						group_id: {
							required: true,
							description: "项目分组id，不能为空",
							type: "number"
						},
						group_name: {
							required: true,
							description: "项目分组名称，不能为空",
							type: "number"
						},
						project_type: {
							required: true,
							description: "类型",
							type: "string",
							enum: ["private", "public"]
						},
						desc: { required: true, description: "项目描述", type: "string" }
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
						let result = await orm.project.save(data);
						let colInst = orm.interfaceCol;
						let catInst = orm.interfaceCategory;

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
								let interfaceData = await orm.interface.listByInterStatus(item._id);

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

									await orm.interface.save(data);
								}
							}
						}

						// 增加member
						let copyProject = await orm.project.get(copyId);
						let copyProjectMembers = copyProject.members;

						let uid = this.getUid();
						// 将项目添加者变成项目组长,除admin以外
						if (this.getRole() !== "admin") {
							let userdata = await xU.getUserdata(uid, "owner");
							let check = await orm.project.checkMemberRepeat(copyId, uid);
							if (check === 0) {
								copyProjectMembers.push(userdata);
							}
						}
						await orm.project.addMember(result._id, copyProjectMembers);

						// 在每个测试结合下添加interface

						let username = this.getUsername();
						xU.save_log({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 复制了项目 ${
								payload.preName
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
		"/project/swagger_url": {
			post: {
				summary: " 输入 swagger url 的时候 node 端请求数据",
				description: "",
				request: {
					body: {
						url: {
							required: false,
							description: "去取数据的url",
							type: "string"
						},
						type: {
							required: true,
							description: "数据对应的标准类型",
							type: "string",
							/* "postman" */
							enum: ["swagger"]
						},
						json: {
							required: false,
							description: "数据JSON的字符串源码；用于上传读取本地的jons文件",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						const { url, type, json } = ctx.payload;
						const { data } = await (async function () {
							if (json) {
								return {
									data: JSON.parse(json)
								};
							}

							if (/^https/.test(url)) {
								return axios({
									httpsAgent: new https.Agent({
										rejectUnauthorized: false
									}),
									method: "get",
									url
								});
							}
							return axios.get(url);
						})();
						let res;
						if (data == null || typeof data !== "object") {
							throw new Error("返回数据格式不是 JSON");
						}

						if (type === "swagger") {
							const swaggerParse = require("exts/yapi-plugin-import-swagger/run");
							res = await swaggerParse(data);
						}

						if (res) {
							ctx.body = xU.$response(res);
						} else {
							throw new Error("获取失败");
						}
					} catch (err) {
						ctx.body = xU.$response(null, 402, String(err));
					}
				}
			}
		},
		"/project/add_member": {
			post: {
				summary: "添加项目成员",
				description: "",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id",
							type: "number"
						},
						member_uids: {
							required: true,
							description: "项目成员uid",
							type: "array",
							items: "number"
						},
						role: {
							required: true,
							description: "项目成员角色",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						let { id: project_id, role, member_uids } = ctx.payload;
						if ((await this.checkAuth(project_id, "project", "edit")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						role = ["owner", "dev", "guest"].find(v => v === role) || "dev";

						let add_members = [];
						let exist_members = [];
						let no_members = [];

						for (let i = 0, len = member_uids.length; i < len; i++) {
							let member_uid = member_uids[i];
							let check = await orm.project.checkMemberRepeat(project_id, member_uid);
							let userdata = await xU.getUserdata(member_uid, role);
							if (check > 0) {
								exist_members.push(userdata);
							} else if (!userdata) {
								no_members.push(member_uid);
							} else {
								add_members.push(userdata);
							}
						}

						let result = await orm.project.addMember(project_id, add_members);
						if (add_members.length) {
							let members = add_members
								.map(item => {
									return `<a href = "/user/profile/${item.uid}">${item.username}</a>`;
								})
								.join("、");

							let username = this.getUsername();
							xU.save_log({
								content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了项目成员 ${members}`,
								type: "project",
								uid: this.getUid(),
								username: username,
								typeid: project_id
							});
						}
						ctx.body = xU.$response({
							result,
							add_members,
							exist_members,
							no_members
						});
					} catch (err) {
						ctx.body = xU.$response(null, 402, String(err));
					}
				}
			}
		},
		"/project/del_member": {
			post: {
				summary: "移除项目成员",
				description: "",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id",
							type: "number"
						},
						member_uid: {
							required: true,
							description: "项目成员uid",
							type: "number"
						}
					}
				},
				async handler(ctx) {
					try {
						let { id: project_id, member_uid } = ctx.payload;
						var check = await orm.project.checkMemberRepeat(project_id, member_uid);
						if (check === 0) {
							return (ctx.body = xU.$response(null, 400, "项目成员不存在"));
						}

						if ((await this.checkAuth(project_id, "project", "danger")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						let result = await orm.project.delMember(project_id, member_uid);
						let username = this.getUsername();

						orm.user.findById(member_uid).then(member => {
							xU.save_log({
								content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了项目中的成员 <a href="/user/profile/${member_uid}">${
									member ? member.username : ""
								}</a>`,
								type: "project",
								typeid: project_id,
								uid: this.getUid(),
								username: username
							});
						});
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/project/change_member_role": {
			post: {
				summary: "修改项目成员角色",
				description: "",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id",
							type: "number"
						},
						member_uid: {
							required: true,
							description: "项目成员uid",
							type: "number"
						},
						role: {
							required: true,
							description: "项目成员角色",
							type: "string",
							enum: ["owner", "dev", "guest"]
						}
					}
				},
				async handler(ctx) {
					try {
						let params = ctx.request.body;
						let { id: project_id, member_uid, role } = ctx.payload;

						var check = await orm.project.checkMemberRepeat(project_id, member_uid);
						if (check === 0) {
							return (ctx.body = xU.$response(null, 400, "项目成员不存在"));
						}
						if ((await this.checkAuth(project_id, "project", "danger")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						role = ["owner", "dev", "guest"].find(v => v === role) || "dev";
						let rolename = {
							owner: "组长",
							dev: "开发者",
							guest: "访客"
						};

						let result = await orm.project.changeMemberRole(
							project_id,
							member_uid,
							role
						);

						let username = this.getUsername();
						orm.user.findById(member_uid).then(member => {
							xU.save_log({
								content: `<a href="/user/profile/${this.getUid()}">${username}</a> 修改了项目中的成员 <a href="/user/profile/${member_uid}">${
									member.username
								}</a> 的角色为 "${rolename[role]}"`,
								type: "project",
								uid: this.getUid(),
								username: username,
								typeid: project_id
							});
						});
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 获取项目成员列表 */
		"/project/get_member_list": {
			get: {
				summary: "获取项目成员列表",
				description: "获取项目成员列表",
				request: {
					query: {
						id: {
							required: true,
							description: "项目id，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let params = ctx.payload;
					if (!params.id) {
						return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
					}

					let project = await orm.project.get(params.id);
					ctx.body = xU.$response(project.members);
				}
			}
		},
		/* 获取项目信息 */
		"/project/get": {
			get: {
				summary: "获取项目信息",
				description: "获取项目信息",
				request: {
					query: {
						id: {
							description: "项目id，不能为空",
							type: "string"
						},
						project_id: {
							description: "项目id，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					let params = ctx.payload;
					let project_id = params.id || params.project_id; // 通过 token 访问
					let result = await orm.project.getBaseInfo(project_id);

					if (!result) {
						return (ctx.body = xU.$response(null, 400, "不存在的项目"));
					}
					if (result.project_type === "private") {
						if ((await this.checkAuth(result._id, "project", "view")) !== true) {
							return (ctx.body = xU.$response(null, 406, "没有权限"));
						}
					}
					result = result.toObject();
					let catInst = orm.interfaceCategory;
					let cat = await catInst.list(params.id);
					result.cat = cat;
					if (result.env.length === 0) {
						result.env.push({ name: "local", domain: "http://127.0.0.1" });
					}
					result.role = await this.getProjectRole(params.id, "project");

					xU.emitHook("project_get", result).then();
					ctx.body = xU.$response(result);
				}
			}
		},
		/* 修改项目成员是否收到邮件通知 */
		"/project/change_member_email_notice": {
			post: {
				summary: "修改项目成员是否收到邮件通知",
				description: "修改项目成员是否收到邮件通知",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id",
							type: "string"
						},
						member_uid: {
							required: true,
							description: "项目成员uid",
							type: "string"
						},
						notice: {
							required: true,
							description: "是否通知",
							type: "boolean"
						}
					}
				},
				async handler(ctx) {
					try {
						let params = ctx.payload;

						var check = await orm.project.checkMemberRepeat(params.id, params.member_uid);
						if (check === 0) {
							return (ctx.body = xU.$response(null, 400, "项目成员不存在"));
						}

						let result = await orm.project.changeMemberEmailNotice(
							params.id,
							params.member_uid,
							params.notice
						);
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 项目头像设置 */
		"/project/upset": {
			post: {
				summary: "项目头像设置",
				description: "项目头像设置",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id，不能为空",
							type: "number"
						},
						icon: {
							description: "项目icon",
							type: "string"
						},
						color: {
							description: "项目color",
							type: "array"
						}
					}
				},
				async handler(ctx) {
					let id = ctx.payload.id;
					let data = {};
					if ((await this.checkAuth(id, "project", "danger")) !== true) {
						return (ctx.body = xU.$response(null, 405, "没有权限"));
					}
					data.color = ctx.payload.color;
					data.icon = ctx.payload.icon;
					if (!id) {
						return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
					}
					try {
						let result = await orm.project.up(id, data);
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
					try {
						orm.follow.updateById(this.getUid(), id, data).then(() => {
							let username = this.getUsername();
							xU.save_log({
								content: `<a href="/user/profile/${this.getUid()}">${username}</a> 修改了项目图标、颜色`,
								type: "project",
								uid: this.getUid(),
								username: username,
								typeid: id
							});
						});
					} catch (e) {
						xU.applog.error(e); // eslint-disable-line
					}
				}
			}
		},
		/* 编辑项目环境 */
		"/project/up_env": {
			post: {
				summary: "编辑项目环境",
				description: "编辑项目环境",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id，不能为空",
							type: "number"
						},
						env: {
							required: true,
							description: "项目环境配置",
							type: "array",
							items: {
								type: "object",
								properties: {
									name: {
										description: "环境名称",
										type: "string"
									},
									domain: {
										description: "环境域名",
										type: "string"
									},
									header: {
										description: "header",
										type: "array"
									}
								}
							}
						}
					}
				},
				async handler(ctx) {
					try {
						let id = ctx.payload.id;
						let params = ctx.payload;
						if (!id) {
							return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
						}

						if ((await this.checkAuth(id, "project", "edit")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						if (!params.env || !Array.isArray(params.env)) {
							return (ctx.body = xU.$response(null, 405, "env参数格式有误"));
						}

						let projectData = await orm.project.get(id);
						let data = {
							up_time: xU.time()
						};

						data.env = params.env;
						let isRepeat = arrRepeat(data.env, "name");
						if (isRepeat) {
							return (ctx.body = xU.$response(null, 405, "环境变量名重复"));
						}
						let result = await orm.project.up(id, data);
						let username = this.getUsername();
						xU.save_log({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${projectData.name}</a> 的环境`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: id
						});
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 编辑项目标签 */
		"/project/up_tag": {
			post: {
				summary: "编辑项目标签",
				description: "编辑项目标签",
				request: {
					body: {
						id: {
							required: true,
							description: "项目id，不能为空",
							type: "number"
						},
						tag: {
							required: true,
							description: "项目tag配置",
							type: "array",
							items: {
								type: "object",
								properties: {
									name: {
										description: "tag名称",
										type: "string"
									},
									desc: {
										description: "tag描述",
										type: "string"
									}
								}
							}
						}
					}
				},
				async handler(ctx) {
					try {
						let id = ctx.payload.id;
						let params = ctx.payload;
						if (!id) {
							return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
						}

						if ((await this.checkAuth(id, "project", "edit")) !== true) {
							return (ctx.body = xU.$response(null, 405, "没有权限"));
						}

						if (!params.tag || !Array.isArray(params.tag)) {
							return (ctx.body = xU.$response(null, 405, "tag参数格式有误"));
						}

						let projectData = await orm.project.get(id);
						let data = {
							up_time: xU.time()
						};
						data.tag = params.tag;

						let result = await orm.project.up(id, data);
						let username = this.getUsername();
						xU.save_log({
							content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了项目 <a href="/project/${id}/interface/api">${projectData.name}</a> 的tag`,
							type: "project",
							uid: this.getUid(),
							username: username,
							typeid: id
						});
						ctx.body = xU.$response(result);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 获取项目的环境变量值 */
		"/project/get_env": {
			get: {
				summary: "获取项目的环境变量值",
				description: "获取项目的环境变量值",
				request: {
					query: {
						project_id: {
							required: true,
							description: "项目id，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						// console.log(ctx.request.query.project_id)
						let project_id = ctx.payload.project_id;
						// let params = ctx.request.body;
						if (!project_id) {
							return (ctx.body = xU.$response(null, 405, "项目id不能为空"));
						}

						// 去掉权限判断
						// if ((await this.checkAuth(project_id, 'project', 'edit')) !== true) {
						//   return (ctx.body = xU.$response(null, 405, '没有权限'));
						// }

						let env = await orm.project.getByEnv(project_id);

						ctx.body = xU.$response(env);
					} catch (e) {
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		/* 获取token数据 */
		"/project/token": {
			get: {
				summary: "获取token数据",
				description: "获取token数据",
				request: {
					query: {
						project_id: {
							required: true,
							description: "项目id，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						let project_id = ctx.payload.project_id;
						let data = await orm.token.get(project_id);
						let token;
						if (!data) {
							let passsalt = xU.randStr();
							token = sha("sha1").update(passsalt).digest("hex").substr(0, 20);

							await orm.token.save({ project_id, token });
						} else {
							token = data.token;
						}

						token = getToken(token, this.getUid());

						ctx.body = xU.$response(token);
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		/* 更新token数据 */
		"/project/update_token": {
			get: {
				summary: "更新token数据",
				description: "更新token数据",
				request: {
					query: {
						project_id: {
							required: true,
							description: "项目id，不能为空",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						let project_id = ctx.payload.project_id;
						let data = await orm.token.get(project_id);
						let token, result;
						if (data && data.token) {
							let passsalt = xU.randStr();
							token = sha("sha1").update(passsalt).digest("hex").substr(0, 20);
							result = await orm.token.up(project_id, token);
							token = getToken(token);
							result.token = token;
						} else {
							ctx.body = xU.$response(null, 402, "没有查到token信息");
						}

						ctx.body = xU.$response(result);
					} catch (err) {
						ctx.body = xU.$response(null, 402, err.message);
					}
				}
			}
		},
		/* 模糊搜索项目名称或者分组名称或接口名称 */
		"/project/search": {
			get: {
				summary: "模糊搜索项目名称或者分组名称或接口名称",
				description: "模糊搜索项目名称或者分组名称或接口名称",
				request: {
					query: {
						q: {
							required: true,
							description: "搜索关键词",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					const { q } = ctx.payload;

					if (!q) {
						return (ctx.body = xU.$response(void 0, 400, "No keyword."));
					}

					if (!xU.validateSearchKeyword(q)) {
						return (ctx.body = xU.$response(void 0, 400, "Bad query."));
					}

					let projectList = await orm.project.search(q);
					let groupList = await orm.group.search(q);
					let interfaceList = await orm.interface.search(q);

					let projectRules = [
						"_id",
						"name",
						"basepath",
						"uid",
						"env",
						"members",
						{ key: "group_id", alias: "groupId" },
						{ key: "up_time", alias: "upTime" },
						{ key: "add_time", alias: "addTime" }
					];
					let groupRules = [
						"_id",
						"uid",
						{ key: "group_name", alias: "groupName" },
						{ key: "group_desc", alias: "groupDesc" },
						{ key: "add_time", alias: "addTime" },
						{ key: "up_time", alias: "upTime" }
					];
					let interfaceRules = [
						"_id",
						"uid",
						{ key: "title", alias: "title" },
						{ key: "project_id", alias: "project_id" },
						{ key: "add_time", alias: "addTime" },
						{ key: "up_time", alias: "upTime" }
					];

					projectList = xU.filterRes(projectList, projectRules);
					groupList = xU.filterRes(groupList, groupRules);
					interfaceList = xU.filterRes(interfaceList, interfaceRules);
					let queryList = {
						project: projectList,
						group: groupList,
						interface: interfaceList
					};

					return (ctx.body = xU.$response(queryList, 0, "ok"));
				}
			}
		}
	}
};
