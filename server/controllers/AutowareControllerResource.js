const mime = require("mime-types");
const { ModelResource } = require("server/models/Resource");
const { _n } = require("@ventose/utils-node");

let TARGET_PREFIX = xU.path.join(
	xU.var.APP_ROOT_SERVER_DIR,
	xU.var.UPLOADS,
	xU.var.RESOURCE_ASSETS
);

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
				errmsg: { type: "int32" },
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
							description: "上传的文件",
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
						const { files, fields } = ctx.request.body;
						const { file } = files;
						const { useFor } = fields;
						const sourcePath = file.path;
						let targetPath = xU.path.resolve(
							TARGET_PREFIX,
							useFor,
							xU.dayjs().format("YYYY_MM_DD")
						);
						await _n.asyncSafeMakeDir(targetPath);
						const basename = xU.path.basename(sourcePath);
						targetPath = xU.path.resolve(targetPath, basename);
						await xU.fs.promises.copyFile(sourcePath, targetPath);
						await xU.fs.promises.unlink(sourcePath);
						const res = await xU.orm(ModelResource).save({
							name: file.name,
							path: xU.last(String(targetPath).split(xU.var.RESOURCE_ASSETS)),
							type: file.type,
							useFor: useFor,
							size: file.size,
							uploadBy: this.$uid,
							add_time: xU.time()
						});
						ctx.body = xU.resReturn({ _id: res._id });
					} catch (e) {
						xU.applog.error(e.message);
						ctx.body = xU.resReturn(null, 402, e.message);
					}
				}
			}
		},
		"/resource/get": {
			get: {
				summary: "根据ID获取资源",
				description: "文件保存在服务器上",
				request: {
					query: {
						id: {
							description: "资源id",
							required: true,
							type: "integer"
						}
					}
				},
				async handler(ctx) {
					try {
						const res = await xU
							.orm(ModelResource)
							.getResourceById(ctx.query.id);
						if (res) {
							let targetPath = xU.path.resolve(`${TARGET_PREFIX}${res.path}`);
							const isExist = xU.fileExist(targetPath);
							if (isExist) {
								xU.applog.info("targetPath", targetPath);
								ctx.status = 200;
								ctx.set("Content-Type", mime.lookup(res.path));
								ctx.body = xU.fs.createReadStream(targetPath);
							} else {
								ctx.body = xU.resReturn(null, 404, "not found");
							}
						}
					} catch (e) {
						xU.applog.error(e.message);
					}
				}
			}
		}
	}
};
