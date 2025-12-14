const { getAudioDetail } = require("./Audio.service");
const mime = require("mime-types");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const { _n } = require("@ventose/utils-node");
const { getType } = require("mime");
const { TARGET_PREFIX } = xU;
const {
	returnBase64Body,
	isAudioType,
	asyncResolvePathFileOrDir
} = require("./Resource.service");

let types = {};

let DEFAULT_NOT_FOUND_IMG;

module.exports = {
	definitions: {
		ResponseSelf: {
			type: "object",
			properties: {
				code: { type: "integer", format: "int32" },
				type: { type: "string" },
				message: { type: "string" }
			}
		},
		UploadSuccess: {
			type: "object",
			properties: {
				errcode: { type: "integer" },
				message: { type: "int32" },
				data: {
					type: "object",
					properties: {
						_id: { type: "integer" }
					}
				}
			}
		}
	},
	tag: {
		description: "文件资源的管理，例如wiki 截图的上传下载"
	},
	paths: {
		"/resource/base64img": {
			post: {
				summary: "上传图片",
				description: "以base64形式",
				request: {
					body: {
						basecode: {
							description: "base64",
							type: "string"
						},
						name: { description: "name", type: "string" },
						size: { description: "size", type: "string" },
						type: { description: "type", type: "string" },
						useFor: {
							required: true,
							type: "string",
							enum: ["wiki"],
							default: "wiki"
						}
					}
				},
				async handler(ctx) {
					try {
						const { useFor, basecode, name, size, type } = ctx.payload;
						const add_time = xU.time();
						const wikiInfo = {
							name: `${useFor}_${add_time}_${name}`,
							useFor: useFor,
							type,
							path: `${useFor}/${add_time}/${name}/`,
							size,
							basecode,
							uploadBy: this.$uid,
							add_time
						};
						const res = await orm.Resource.save(wikiInfo);
						ctx.body = xU.$response({ _id: res._id });
					} catch (e) {
						ctx.body = xU.$response(null, 400, e.message);
						xU.applog.error(e.message);
					}
				}
			}
		},
		"/resource/single_upload": {
			post: {
				summary: "上传单个文件",
				description: "文件保存在服务器上",
				request: {
					formData: {
						useFor: {
							description: "资源的用处，如wiki",
							required: true,
							type: "string"
						},
						file: {
							description: "上传的文件 single_upload",
							required: true,
							type: "file"
						}
					}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const { files, fields } = ctx.payload;
						const { file } = files;
						const { useFor } = fields;
						const sourcePath = file.path;
						let targetPath = path.resolve(
							TARGET_PREFIX,
							useFor,
							this.$uid,
							xU.dayjs().format("YYYY_MM_DD")
						);
						await _n.asyncSafeMakeDir(targetPath);
						const basename = path.basename(sourcePath);
						targetPath = path.resolve(targetPath, basename);
						await xU.fs.promises.copyFile(sourcePath, targetPath);
						await xU.fs.promises.unlink(sourcePath);
						const wikiInfo = {
							name: file.name,
							path: xU._.last(String(targetPath).split(xU.var.RESOURCE_ASSETS)),
							type: file.type,
							useFor: useFor,
							size: file.size,
							uploadBy: this.$uid,
							add_time: xU.time()
						};
						const res = await orm.Resource.save(wikiInfo);
						ctx.body = xU.$response({ _id: res._id });
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/resource/get": {
			get: {
				summary: "根据ID获取资源",
				description: `根据ID获取资源文件
				1- 获取base64形式存储的文件
				2- 获取文件形式存储的文件`,
				request: {
					query: {
						id: {
							description: "资源id",
							required: true,
							type: "integer"
						},
						uri: {
							description:
								"资源uri;资源管理器，直接读取磁盘文件,explore接口使用",
							type: "string"
						},
						preview: {
							description: "是否是预览,会返回大小适合预览的图片",
							type: "boolean"
						}
					}
				},
				async handler(ctx) {
					try {
						let { uri, preview } = ctx.query;
						if (uri) {
							const uri_array = JSON.parse(uri);
							if (xU._.isArray(uri_array)) {
								const resource_path = path.resolve.apply(path, uri_array);
								let isExist = xU.fileExist(resource_path);
								if (isExist) {
									/* 返回文件形式存储的文件 */
									return returnFileByPath(resource_path, {
										path: resource_path
									});
								}
							}
						}
						const targetResource = await orm.Resource.getResourceById(
							ctx.query.id
						);
						var type;
						debugger;
						if (targetResource?.basecode) {
							/* 返回base64形式存储的文件 */
							return returnFileByBase64(targetResource);
						}

						if (targetResource) {
							/* 如果存在path路径 */
							let isExist = xU.fileExist(targetResource.path);
							if (isExist) {
								/* 返回文件形式存储的文件 */
								return returnFileByPath(targetResource.path, targetResource);
							}
							let targetPath = path.resolve(
								`${TARGET_PREFIX}${targetResource.path}`
							);
							isExist = xU.fileExist(targetPath);
							if (isExist) {
								/* 返回文件形式存储的文件 */
								return returnFileByPath(targetPath, targetResource);
							}
						}

						/* 没找到 */
						return returnDefautNotFoundImage();
					} catch (e) {
						xU.applog.error(e.message);
					}

					function returnFileByBase64(targetResource) {
						type = targetResource.type;
						ctx.set("Content-type", type);
						ctx.body = returnBase64Body(targetResource.basecode);
						return;
					}

					function returnFileByPath(targetPath, targetResource) {
						xU.applog.info("targetPath", targetPath);
						ctx.status = 200;
						ctx.set("Content-Type", mime.lookup(targetResource.path));
						ctx.body = xU.fs.createReadStream(targetPath);
					}

					async function returnDefautNotFoundImage() {
						if (!DEFAULT_NOT_FOUND_IMG) {
							DEFAULT_NOT_FOUND_IMG = await orm.Resource.getResourceByName(
								"SYSTEM_404"
							);
						}

						if (!DEFAULT_NOT_FOUND_IMG) {
							const bitmapPath = path.resolve(
								__dirname,
								"../../../assets/404.svg"
							);
							var bitmap = fs.readFileSync(bitmapPath);
							const basecode = new Buffer(bitmap).toString("base64");

							await orm.Resource.save({
								name: `SYSTEM_404`,
								useFor: "all",
								type: mime.lookup(bitmapPath),
								path: `server/assets/404.svg`,
								basecode: basecode,
								add_time: Date.now()
							});

							DEFAULT_NOT_FOUND_IMG = await orm.Resource.getResourceByName(
								"SYSTEM_404"
							);
						}

						ctx.set("Content-type", DEFAULT_NOT_FOUND_IMG.type);
						ctx.body = returnBase64Body(DEFAULT_NOT_FOUND_IMG.basecode);
					}
				}
			}
		},
		"/resource/ls": {
			post: {
				summary: "根据提供的path",
				description: "文件保存在服务器上",
				request: {
					body: {
						path: {
							description: "文件夹路径",
							type: "array",
							items: "strig"
						}
					}
				},
				async handler(ctx) {
					try {
						if (this.$user?.role === "admin") {
							let { path: pathStack } = ctx.payload;
							pathStack = xU._.isArray(pathStack) ? pathStack : [];
							const path_full_string = pathStack.join(path.sep);

							let dirOrFileArray = [];

							/* 如果路径不在预设的路径中，则返回设定的根目录路径 */
							if (
								!xU._.some(yapi_configs.RESOURCE_ASSETS_REMOTE, item =>
									xU._.startsWith(path_full_string, item)
								)
							) {
								dirOrFileArray = await Promise.all(
									xU._.map(yapi_configs.RESOURCE_ASSETS_REMOTE, dirname =>
										asyncResolvePathFileOrDir(dirname, [])
									)
								);
							} else {
								let dirlsArray = await fs.promises.readdir(path_full_string);

								dirOrFileArray = await Promise.all(
									xU._.map(dirlsArray, dirname => {
										return asyncResolvePathFileOrDir(dirname, pathStack);
									})
								);
							}

							ctx.body = xU.$response(
								xU._.filter(dirOrFileArray, item => item?.type)
							);
						} else {
							throw new Error("auth");
						}
					} catch (e) {
						ctx.body = xU.$response(null, 404, "not found");
						xU.applog.error(e.message);
					}
				}
			}
		},
		"/resource/status": {
			post: {
				summary: "根据提供的path",
				description: "资源状态信息，并返回对应的信息",
				request: {
					body: {
						path: {
							description: "资源路径",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					try {
						if (this.$user?.role === "admin") {
							let { path: dirpath } = ctx.payload;
							if (dirpath === "/") {
								throw new Error("auth");
							}
							dirpath = dirpath.replace(/^\//, "");
							let targetPath = path.resolve(
								yapi_configs.CLOUD_DISK_ROOT,
								dirpath || ""
							);

							const stat = await fs.promises.stat(targetPath);
							if (stat.isDirectory()) {
								const dirlsArray = await fs.promises.readdir(targetPath);
								const dirname = path.dirname(targetPath);
								const rootDirName = path.resolve(yapi_configs.CLOUD_DISK_ROOT);

								let parentDir;
								if (dirname.length < rootDirName.length) {
									parentDir = "";
								} else {
									parentDir = dirname.substring(rootDirName.length);
									parentDir = parentDir
										.split(path.sep)
										.filter(Boolean)
										.join("/");
								}

								const current = dirpath;
								ctx.body = xU.$response({
									type: "directory",
									parent: parentDir,
									current,
									children: dirlsArray
								});
								return;
							}
							if (stat.isFile()) {
								const type = getType(targetPath);
								if (isAudioType(type)) {
									const record = await getAudioDetail({});
									ctx.body = xU.$response({ type: "audio", record });
									return;
								}
							}
						}

						throw new Error("auth");
					} catch (e) {
						ctx.body = xU.$response(null, 404, "not found");
						xU.applog.error(e.message);
					}
				}
			}
		},
		"/resource/audio": {
			get: {
				summary: "媒体文件流",
				description: "媒体文件流",
				request: {
					query: {
						id: {
							description: "资源id",
							type: "number"
						},
						uri: {
							description: "资源uri;资源管理器，直接读取磁盘文件",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					const { headers, payload } = ctx;
					const { id, uri } = payload;
					let resourcePath;
					let resource;

					if (uri) {
						try {
							const rootDirName = path.resolve(yapi_configs.CLOUD_DISK_ROOT);
							resourcePath = path.resolve.apply(path, [
								rootDirName,
								...JSON.parse(uri)
							]);
						} catch (error) {
							return (ctx.body = xU.$response(null, 404, "Not Found"));
						}
					} else {
						try {
							resource = await orm.Resource.getResourceById(id);
							resourcePath = resource.path;
						} catch (error) {
							return (ctx.body = xU.$response(null, 404, "Not Found"));
						}
					}
					const type = getType(resourcePath);
					let total;
					if (isAudioType(type)) {
						if (resource) {
							const { size, type } = await getAudioDetail({
								resource,
								uid: this.$uid
							});
							total = size;
						} else {
							const stat = await fs.promises.stat(resourcePath);
							total = stat.size;
						}
						try {
							if (headers.range) {
								return RangeAudio({
									headers,
									total,
									ctx,
									type,
									resourcePath
								});
							} else {
								return StaticAudio(ctx, type, total, resourcePath);
							}
						} catch (error) {
							return (ctx.body = xU.$response(null, 400, error));
						}
					} else {
						return (ctx.body = xU.$response(null, 404, "Not Found"));
					}
				}
			}
		},
		"/resource/video": {
			get: {
				summary: "媒体文件流_video",
				description: "媒体文件流_video",
				request: {
					query: {
						id: {
							description: "资源id",
							type: "number"
						},
						uri: {
							description: "资源uri;资源管理器，直接读取磁盘文件",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					const { headers, payload } = ctx;
					const { id, uri } = payload;
					let resourcePath = [];
					let response_not_found = xU.$response(
						{
							msg: "not found"
						},
						404,
						"Not Found"
					);

					if (id) {
						try {
							const resource = await orm.Resource.getResourceById(id);
							resourcePath = resource.path;
						} catch (error) {
							ctx.body = response_not_found;
						}
					} else if (uri) {
						try {
							const rootDirName = path.resolve(yapi_configs.CLOUD_DISK_ROOT);
							resourcePath = path.resolve.apply(path, [
								rootDirName,
								...JSON.parse(uri)
							]);
						} catch (error) {
							ctx.body = response_not_found;
						}
					}

					try {
						// 检查文件是否存在
						await fs.promises.access(resourcePath, fs.constants.R_OK);

						// 设置响应头，包括Content-Type和Content-Length（可选）
						const contentType = getType(resourcePath) || "video/mp4";
						ctx.set("Content-Type", contentType);

						const total = await new Promise((resolve, reject) => {
							// 获取文件大小（可选，用于Content-Length头）
							fs.stat(resourcePath, (err, stats) => {
								if (err) {
									reject(err);
								} else {
									resolve(stats.size);
								}
							});
						});
						// 返回文件流

						if (headers.range) {
							const range = headers.range;
							const parts = range.replace(/bytes=/, "").split("-");
							const partialstart = parseInt(parts[0], 10);
							const partialend = parseInt(parts[1], 10);

							let start = partialstart;
							const end = partialend ? partialend : total - 1;
							const chunksize = end - start + 1;

							ctx.status = 206;
							ctx.set({
								"Content-Range": "bytes " + start + "-" + end + "/" + total,
								"Accept-Ranges": "bytes",
								"Content-Length": chunksize,
								"Content-Type": contentType
							});
							ctx.body = fs.createReadStream(resourcePath, { start, end });
						} else {
							ctx.set({
								"Content-Type": contentType,
								"Accept-Ranges": "bytes",
								"Content-Length": total
							});
							ctx.body = fs.createReadStream(resourcePath);
						}
					} catch (error) {
						ctx.body = response_not_found;
					}

					return;
				}
			}
		},
		"/resource/cloud_disk_file_list": {
			get: {
				summary: "网盘——根据file id获取资源",
				description: "文件保存在服务器上",
				request: {
					query: {
						name: {
							required: true,
							type: "string",
							default: "",
							description: "文件名；支持模糊查询"
						},
						fileId: {
							required: true,
							type: "number",
							default: 0,
							description: "目录id"
						},
						orderby: {
							required: false,
							type: "string",
							default: "name",
							enum: ["name", "add_time"],
							description: "排序"
						},
						type: {
							required: false,
							type: "string",
							description: "类型"
						},
						isdir: {
							required: false,
							type: "number",
							default: 2,
							enum: [0, 1, 2],
							description: `是否为目录  	
							- FILE_NOT_DIR: 0,
							- FILE_DIR: 1,
							- FILE_ALL: 2,
						`
						}
					}
				},
				async handler(ctx) {
					let { fileId, orderby, isdir, name } = ctx.payload;

					isdir = isdir || xU.var.FILE_ALL;
					const uploadBy = this.$uid;

					const sort = {};
					if (orderby) {
						sort[orderby] = xU.var.DESC;
					}

					let condition = [{ uploadBy }];

					if (name) {
						condition.push({ name: new RegExp(name, "ig") });
					} else {
						condition.push({ fileId });
					}

					if (isdir != xU.var.FILE_ALL) {
						condition.push({ isdir });
					}

					const res = await orm.Resource.search(
						{
							$and: condition
						},
						sort
					);
					ctx.body = xU.$response(res);
				}
			}
		},
		"/resource/cloud_disk_rename": {
			put: {
				summary: "重命名",
				description: "文件重命名",
				request: {
					body: {
						name: {
							description: "文件名称",
							required: true,
							type: "string"
						},
						id: {
							description: "文件ID",
							required: true,
							default: 0,
							type: "number"
						}
					}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const { name, id } = ctx.payload;
						let result = await orm.Resource.update(id, { name });
						ctx.body = xU.$response(result);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/resource/cloud_disk_dir": {
			post: {
				summary: "创建文件夹",
				description: "创建文件夹",
				request: {
					body: {
						name: {
							description: "文件夹名称",
							required: true,
							type: "string"
						},
						fileId: {
							description: "目录id 对应的就是resource 的_id;类似pid的作用",
							required: true,
							default: 0,
							type: "number"
						}
					}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const { name, fileId } = ctx.payload;
						let parentPath = "";

						if (fileId !== 0) {
							let res = await orm.Resource.getResourceById(fileId);

							if (res) {
								parentPath = res.path;
							} else {
								return (ctx.body = xU.$response(null, 402, "目录不存在"));
							}
						}

						let result = await orm.Resource.getResourceByName(name, fileId);

						if (result) {
							return (ctx.body = xU.$response(
								{
									msg: "目录已存在"
								},
								402,
								"目录已存在"
							));
						}
						const resourceInfo = {
							name: name,
							ext: "SYSTEM_DIR",
							/* 目录的path是虚拟path，文件的path是物理主机上的path */
							path: `${parentPath}/${name}`,
							type: "SYSTEM_DIR",
							size: 0,
							fileId: fileId || 0,
							uploadBy: this.$uid,
							add_time: xU.time(),
							isdir: xU.var.FILE_DIR
						};
						result = await orm.Resource.save(resourceInfo);
						ctx.body = xU.$response(result);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/resource/cloud_disk_move_dir": {
			post: {
				summary: "移动文件",
				description: "移动文件",
				request: {
					body: {
						ids: {
							description: "待移动文件/文件夹",
							required: true,
							type: "array",
							items: {
								type: "number"
							}
						},
						targetDirId: {
							description: "目标文件夹",
							required: true,
							default: 0,
							type: "number"
						}
					}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const { ids, targetDirId } = ctx.payload;

						const isExist = await (() => {
							if (targetDirId === 0) {
								return true;
							} else {
								return orm.Resource.getResourceById(targetDirId);
							}
						})();

						if (isExist) {
							let result = await orm.Resource.update(ids, {
								fileId: targetDirId
							});
							ctx.body = xU.$response(result);
						} else {
							return (ctx.body = xU.$response(null, 402, "目标目录不存在"));
						}
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/resource/cloud_disk_get_dirs": {
			get: {
				summary: "获取当前用户存储空间的文件夹",
				description: `response:
				- file:已经上传完成(已合并chunk);
				- chunks：已上传的片段数组;`,
				request: {
					query: {}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const myDirs = await orm.Resource.search(
							{
								uploadBy: this.$uid,
								isdir: xU.var.FILE_DIR
							},
							{ fileId: 1 },
							`_id fileId name`
						);
						ctx.body = xU.$response(myDirs);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/resource/cloud_disk_upload": {
			post: {
				summary: "上传单个文件",
				description: "文件保存在服务器上",
				request: {
					query: {
						fileId: {
							description: "目录id",
							required: true,
							default: 0,
							type: "number"
						}
					},
					formData: {
						file: {
							description: "上传的文件 cloud_disk_upload",
							required: true,
							type: "file"
						}
					}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const { files, fields, fileId } = ctx.payload;
						if (fileId > 0) {
							if (!(await xU.isCloudDiskDirExist(fileId, this.$uid))) {
								return (ctx.body = xU.$response(null, 402, "目录不存在"));
							}
						}
						const { file } = files;
						const sourcePath = file.path;
						let targetPath = path.resolve(TARGET_PREFIX, "user", this.$uid);
						await _n.asyncSafeMakeDir(targetPath);
						const basename = path.basename(sourcePath);
						targetPath = path.resolve(targetPath, basename);
						await xU.fs.promises.copyFile(sourcePath, targetPath);
						await xU.fs.promises.unlink(sourcePath);

						const resourceInfo = {
							name: file.name,
							ext: file.mimeType || xU.path.extname(file.name),
							path: String(targetPath),
							type: file.type,
							size: file.size,
							uploadBy: this.$uid,
							add_time: xU.time(),
							isdir: xU.var.FILE_NOT_DIR
						};
						const res = await orm.Resource.save(resourceInfo);

						let cloudDiskSizeUsed = this.$user.cloudDiskSizeUsed || 0;
						cloudDiskSizeUsed += file.size;

						let userData = {
							cloudDiskSizeUsed,
							cloudDiskSizeTotal: await xU.getSystemDiskSize(),
							up_time: xU.time()
						};
						await orm.user.update(this.$uid, userData);

						const currentUserStatus = await orm.user.findById(this.$uid);

						ctx.body = xU.$response({
							_id: res._id,
							status: xU._.pick(currentUserStatus, xU.var.pickUserInfo)
						});
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/resource/cloud_disk_shard_upload": {
			post: {
				summary: "分片上传单个文件",
				description: "文件保存在服务器上",
				request: {
					formData: {
						fileId: {
							required: true,
							type: "number",
							default: 0,
							description: "目录id"
						},
						fileHash: {
							description: "文件名称",
							required: true,
							type: "string"
						},
						chunkIndex: {
							description: "分片序号",
							required: true,
							type: "number"
						},
						chunkSize: {
							description: "分片大小",
							required: true,
							type: "number"
						},
						chunkTotal: {
							description: "总分片数",
							required: true,
							type: "number"
						}
					}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const {
							files: { file },
							fields: { fileHash, chunkIndex, chunkSize, chunkTotal, fileId }
						} = ctx.payload;

						const { path: filePathStamp, name: fileName } = file;

						let dirPathChuncks = path.resolve(
							TARGET_PREFIX,
							"user",
							this.$uid,
							fileHash
						);
						await _n.asyncSafeMakeDir(dirPathChuncks);
						const chunkName = path.basename(filePathStamp);
						const filePathChunck = path.resolve(dirPathChuncks, chunkName);
						await xU.fs.promises.copyFile(filePathStamp, filePathChunck);
						await xU.fs.promises.unlink(filePathStamp);

						const res = await orm.ResourceChunk.save({
							fileHash,
							chunkIndex,
							chunkSize,
							chunkTotal,
							chunkName
						});

						ctx.body = xU.$response(res);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		},
		"/resource/cloud_disk_check_chunks": {
			post: {
				summary: "检查是否上传过文件",
				description: `response:
				- file:已经上传完成(已合并chunk);
				- chunks：已上传的片段数组;`,
				request: {
					body: {
						md5: { description: "文件hash", required: true, type: "string" },
						fileName: {
							description: "文件名称",
							required: true,
							type: "string"
						},
						fileId: { description: "当前空间", required: true, type: "string" }
					}
				},
				response: {
					200: {
						description: "成功",
						schema: xU.schema("UploadSuccess")
					}
				},
				async handler(ctx) {
					try {
						const { md5, fileName, fileId } = ctx.payload;
						const findFileInResource = await orm.Resource.findByMd5(md5);
						if (findFileInResource) {
							return (ctx.body = xU.$response({
								chunks: [],
								file: true
							}));
						}
						const chunks = await orm.ResourceChunk.findByMd5(md5);

						let dirPathChuncks = path.resolve(
							TARGET_PREFIX,
							"user",
							this.$uid,
							md5
						);

						let response = {
							chunks,
							file: false
						};
						if (chunks.length && chunks.length === chunks[0].chunkTotal) {
							const hasResponse = await ifUploadAllChunckMergeIt({
								fileHash: md5,
								chunkTotal: chunks.length,
								dirPathChuncks,
								fileName,
								fileId,
								$uid: this.$uid
							});

							if (hasResponse) {
								response.file = hasResponse;
							}
						}

						ctx.body = xU.$response(response);
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.$response(null, 402, e.message);
					}
				}
			}
		}
	}
};

function StaticAudio(ctx, type, total, resourcePath) {
	ctx.set({
		"Content-Type": type || "audio/mp3",
		"Accept-Ranges": "bytes",
		"Content-Length": total
	});
	ctx.body = fs.createReadStream(resourcePath);
}

function RangeAudio({ headers, total, ctx, type, resourcePath }) {
	const range = headers.range;
	const parts = range.replace(/bytes=/, "").split("-");
	const partialstart = parseInt(parts[0], 10);
	const partialend = parseInt(parts[1], 10);

	let start = partialstart;
	const end = partialend ? partialend : total - 1;
	const chunksize = end - start + 1;

	ctx.status = 206;
	ctx.set({
		"Content-Range": "bytes " + start + "-" + end + "/" + total,
		"Accept-Ranges": "bytes",
		"Content-Length": chunksize,
		"Content-Type": type || "audio/mp3"
	});
	ctx.body = fs.createReadStream(resourcePath, { start, end });
}

async function ifUploadAllChunckMergeIt({
	fileHash,
	chunkTotal,
	fileName,
	dirPathChuncks,
	fileId,
	$uid
}) {
	const chunks = await orm.ResourceChunk.findByMd5(fileHash);
	if (String(chunks.length) === String(chunkTotal)) {
		try {
			/* 可以合并chuncks */
			//创建合并后的文件夹
			let file_merged_path = path.join(
				TARGET_PREFIX,
				"user",
				$uid,
				"merged",
				dayjs().format("YYYYMMDD")
			);
			await _n.asyncSafeMakeDir(file_merged_path);
			file_merged_path = path.resolve(file_merged_path, fileName);
			//创建储存文件
			fs.writeFileSync(file_merged_path, "");

			for (let i = 0; i < chunks.length; i++) {
				const { chunkName } = chunks[i];
				const currentChunckPath = path.resolve(dirPathChuncks, chunkName);
				const chunck = fs.readFileSync(currentChunckPath);
				//写入当前切片
				fs.appendFileSync(file_merged_path, chunck);
			}

			let resSaveResource = {};
			try {
				resSaveResource = await orm.Resource.updateOneByMd5(fileHash, {
					name: fileName,
					ext: xU.path.extname(fileName) || "unknown",
					size: xU._.reduce(
						chunks,
						(total, chunk) => {
							total += Number(chunk.chunkSize);
							return total;
						},
						0
					),
					type: getType(file_merged_path) || "unknown",
					useFor: "CloudDisk",
					md5: fileHash,
					path: String(file_merged_path),
					uploadBy: $uid,
					add_time: xU.time(),
					isdir: 0,
					fileId
				});

				/*合成成功后清理 */
				await orm.ResourceChunk.delChunksByFileHash(fileHash);
				await _n.asyncRmDir(dirPathChuncks);
			} catch (error) {
				resSaveResource = { msg: error.message };
				console.error(error);
			}
			return resSaveResource;
		} catch (error) {
			return false;
		}
	}
}
