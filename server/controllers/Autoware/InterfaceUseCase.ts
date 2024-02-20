module.exports = {
	definitions: {},
	tag: {
		description: "接口用例-test"
	},
	paths: {
		"/usecase/upsert": {
			post: {
				summary: "",
				description: "保存或修改单个测试用例",
				request: {
					body: {
						interfaceId: {
							required: true,
							description: "所属接口ID， 不能为空",
							type: "number"
						},
						projectId: {
							required: true,
							description: "用例所属项目ID， 不能为空",
							type: "number"
						},
						usecaseCode: {
							required: true,
							description: "用例代码",
							type: "string"
						}
					}
				},
				async handler(ctx) {
					const { interfaceId, projectId, usecaseCode, id } = ctx.payload;

					if (id && interfaceId && projectId && usecaseCode) {
						let result = await orm.interfaceCase.up(id, {
							interface_id: interfaceId,
							project_id: projectId,
							usecaseCode
						});
						ctx.body = xU.$response(result);
					} else if (interfaceId && projectId && usecaseCode) {
						let result = await orm.interfaceCase.save({
							interface_id: interfaceId,
							project_id: projectId,
							usecaseCode
						});
						ctx.body = xU.$response(result);
					} else {
						ctx.body = xU.$response(null, 400, "参数不全");
					}
				}
			}
		},
		"/usecase/get": {
			get: {
				summary: "",
				description: "获取用例信息",
				request: {
					query: {
						id: {
							required: true,
							description: "测试用例ID",
							type: "number"
						}
					}
				},
				async handler(ctx) {
					const { id } = ctx.payload;

					let result = await orm.interfaceCase.get(id);
					ctx.body = xU.$response(result);
				}
			}
		},
		"/usecase/get_all": {
			get: {
				summary: "",
				description: "获取接口相关用例",
				request: {
					query: {
						id: {
							required: true,
							description: "接口ID",
							type: "number"
						}
					}
				},
				async handler(ctx) {
					const { id } = ctx.payload;

					let result = await orm.interfaceCase.getAll(id);
					ctx.body = xU.$response(result);
				}
			}
		}
	}
};
