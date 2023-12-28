module.exports = {
	/* 为真值则不扫描，不会加入route 也不会在swagger中展示 */
	isHideInSwagger: true,
	definitions: {
		Response200: {
			type: "object",
			properties: {
				code: { type: "integer", format: "int32" },
				type: { type: "string" },
				message: { type: "string" }
			}
		}
	},
	tag: {
		/*自动拼接: name: UseSwagger*/
		description: "演示项目",
		/* 可选项，右侧点击链接 */
		externalDocs: {
			description: "Find out more",
			url: "http://swagger.io"
		}
	},
	paths: {
		"/use_swagger/pet/{petId}/uploadImage": {
			post: {
				/*自动拼接: tags: UseSwagger*/
				description: "演示项目",
				request: {
					header: {},
					query: {},
					body: {},
					path: {
						petId: {
							description: "ID of pet to update",
							required: true,
							type: "integer",
							format: "int64"
						}
					},
					/*'consumes': ['application/json',], */
					/*'produces': ['application/json',], */
					/* 如果有formData 添加 'multipart/form-data' */
					formData: {
						additionalMetadata: {
							description: "Additional data to pass to server",
							required: false,
							type: "string"
						},
						file: {
							description: "file to upload",
							required: false,
							type: "file"
						}
					}
				},
				responses: {
					200: {
						description: "successful operation",
						schema: { $ref: "#/definitions/ApiResponse" }
					}
				},
				handler(ctx) {}
			}
		}
	}
};
