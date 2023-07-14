module.exports = {
	definitions: {
		ResponseSelf: {
			type: "object",
			properties: {
				code: { type: "integer", format: "int32" },
				type: { type: "string" },
				message: { type: "string" }
			}
		}
	},
	tag: {
		description: "文件资源的管理，例如wiki 截图的上传下载"
	},
	paths: {
		"/resource/get/{id}": {
			get: {
				description: "根据ID获取资源",
				request: {
					path: {
						id: {
							description: "资源id",
							required: true,
							type: "integer"
						}
					}
				},
				responses: {
					200: {
						description: "successful operation",
						schema: { $ref: "#/definitions/ResponseSelf" }
					}
				},
				async handler(ctx) {
					try {
						const res = await this.orm_resource.getResourceById(ctx.query.id);
						if (res) {
							let targetPath = path.resolve(`${TARGET_PREFIX}${res.path}`);
							const isExist = xU.fileExist(targetPath);
							if (isExist) {
								xU.applog.info("targetPath", targetPath);
								ctx.status = 200;
								ctx.set("Content-Type", mime.lookup(res.path));
								ctx.body = fs.createReadStream(targetPath);
							} else {
								ctx.body = xU.resReturn(null, 404, "not found");
							}
						}
					} catch (e) {
						xU.applog.eerror(e.message);
					}
				}
			}
		}
	}
};
