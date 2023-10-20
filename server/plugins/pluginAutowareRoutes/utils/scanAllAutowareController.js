const { _n } = require("@ventose/utils-node");
const { newSwaggerJSON } = require("./swagger.json");
const swaggerJSON = newSwaggerJSON(
	WEBCONFIG?.isUsePlugin?.AutowareRoutes?.swaggerInfo
);
const routes = [];
async function scanAllAutowareController(app) {
	try {
		const [_, files] = await _n.asyncAllDirAndFile([
			xU.path.resolve(xU.var.APP_ROOT_SERVER_DIR, "controllers")
		]);
		const autoControllers = _n.reduce(
			files,
			(target, file) => {
				const fileName = xU.path.basename(file);
				const [_, controllerName] =
					String(fileName).match(/^AutowareController(.*).js/) || [];
				if (controllerName) {
					target.push([file, controllerName]);
				}
				return target;
			},
			[]
		);
		let controllerInfo;
		while ((controllerInfo = autoControllers.pop())) {
			/* Demo:AutowareControllerUseSwagger.js 获取的 info:["AutowareControllerUseSwagger","UseSwagger","use_swagger"] */
			autowareRoute({
				controller: require(controllerInfo[0]),
				controllerName: controllerInfo[1]
			});
		}
	} catch (error) {
		console.error(error);
	}

	return {
		routes,
		swaggerJSON
	};
}

function autowareRoute({ controller, controllerName }) {
	if (controller.isHideInSwagger) {
		return;
	}
	swaggerJSON.tags.push({ ...controller.tag, name: controllerName });
	/* 各个controller definitions合并,所以除了通用的定义，命名需要加上命名空间 */
	if (controller.definitions) {
		swaggerJSON.definitions = _n.merge(
			swaggerJSON.definitions,
			controller.definitions
		);
	}
	_n.each(controller.paths, (pathInfo, propPath) => {
		swaggerJSON.paths[propPath] = {};
		_n.each(pathInfo, (handlerInfo, method) => {
			/* 注册路由 */
			routes.push({
				url: propPath,
				method,
				Controller: controller,
				prefix: _n.snakeCase(controllerName),
				handler: handlerInfo.handler
			});
			swaggerJSON.paths[propPath][method] = {
				tags: [controllerName],
				consumes: ["application/json"],
				produces: ["application/json"],
				responses: {
					200: {
						description: "通用成功响应，换句话说就是没有添加response",
						schema: {
							$ref: "#/definitions/ApiResponse"
						}
					}
				},
				..._n.pick(handlerInfo, [
					"tags",
					"summary",
					"description",
					"operationId",
					"consumes",
					"produces",
					"responses"
				])
			};

			/* case by case TODO: */
			const { request, responses, parameters, deprecated } = handlerInfo;

			if (parameters) {
				swaggerJSON.paths[propPath][method].parameters = parameters;
			} else if (request) {
				addParameters(propPath, method, request);
			}

			if (responses) {
				swaggerJSON.paths[propPath][method].responses = responses;
			}

			if (deprecated) {
				swaggerJSON.paths[propPath][method].deprecated = deprecated;
			}
		});
	});
	return swaggerJSON;
}

function addParameters(propPath, method, request) {
	swaggerJSON.paths[propPath][method].parameters = [];
	if (request.formData) {
		swaggerJSON.paths[propPath][method].consumes.push("multipart/form-data");
	}
	/*
  request: {
	  header: {},
	  query: {},
	  body: {},
	  formData: {}
  }
  */

	const inBody = {
		in: "body",
		name: "body",
		required: true,
		schema: {
			type: "object",
			required: [],
			properties: {}
		}
	};

	_n.each(request, (paramInfo, propIn) => {
		/*
	propIn: {
	  propName: descInfo
	},
	 */
		_n.each(paramInfo, (descInfo, propName) => {
			/*
	  propName: {
		'description': 'ID of pet to update',
		'required': true,
		'type': 'integer',
		'format': 'int64'
	  }
	  */

			if (propIn === "body") {
				inBody.schema.properties[propName] = descInfo;
				if (descInfo.required) {
					inBody.schema.required.push(propName);
				}
			} else {
				swaggerJSON.paths[propPath][method].parameters.push({
					name: propName,
					in: propIn,
					...descInfo
				});
			}
		});
	});

	if (Object.keys(inBody.schema.properties).length > 0) {
		swaggerJSON.paths[propPath][method].parameters.push(inBody);
	}
}

module.exports = scanAllAutowareController;
exports.autowareRoute = autowareRoute;
