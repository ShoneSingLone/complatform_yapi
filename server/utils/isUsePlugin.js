/* swagger 通用的schema */

const definitions = {
	ApiResponse: {
		type: "object",
		properties: {
			code: { type: "integer", format: "int32" },
			type: { type: "string" },
			message: { type: "string" }
		}
	}
};

const AutowareRoutes = {
	isUseSwagger: true,
	swaggerInfo: {
		swagger: "2.0",
		info: {
			title: "Y-API 【本项目不支持使用路径参数】",
			version: "0.0.1",
			description: `本项目用的接口[yapi](./api/swagger-doc)
            填写字段主要参考[swagger.json](./swagger_assets/swagger.json)复制地址到Explore可以参考结果`,
			contact: {
				email: "xinglong.xiang@gh-ca.com"
			},
			license: {
				name: "Apache 2.0",
				url: "http://www.apache.org/licenses/LICENSE-2.0.html"
			},
			termsOfService: "http://swagger.io/terms/"
		},
		host: "",
		basePath: "/api",
		definitions
	}
};

exports.isUsePlugin = {
	AutowareRoutes
};
