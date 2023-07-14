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
            description: "Y-API 平台接口 Swagger",
            version: "0.0.1",
            title: "Y-API Swagger",
            termsOfService: "http://swagger.io/terms/",
            contact: {
                email: "xinglong.xiang@gh-ca.com"
            },
            license: {
                name: "Apache 2.0",
                url: "http://www.apache.org/licenses/LICENSE-2.0.html"
            }
        },
        host: "",
        basePath: "/api",
        definitions
    }
};

exports.isUsePlugin = {
    AutowareRoutes
};