const { _n } = require("@ventose/utils-node");
const { newSwaggerJSON } = require("./swagger.json");
const swaggerJSON = newSwaggerJSON(
	yapi_configs?.isUsePlugin?.AutowareRoutes?.swaggerInfo
);
const routes = [];
async function scanAllAutowareController(app) {
	try {
		const AUTOWARE_ROOT_DIR = xU.path.resolve(
			xU.var.APP_ROOT_SERVER_DIR,
			"controllers/Autoware"
		);
		const [_, files] = await _n.asyncAllDirAndFile([AUTOWARE_ROOT_DIR]);

		const CONTROLLERS_PATH_INFO_ARRAY = _n.reduce(
			xU._.sortBy(files, i => i),
			(_autoControllers, file) => {
				try {
					const FILE_NAME = xU.path.basename(file);
					const BASE_PATH = String(file)
						.replace(AUTOWARE_ROOT_DIR, "")
						.replace(FILE_NAME, "")
						.replaceAll(xU.path.sep, "");
					const [controllerName, ext] = String(FILE_NAME).split(".");
					if (controllerName && ext === "ts") {
						_autoControllers.push([file, controllerName, BASE_PATH]);
					}
				} catch (error) {
					xU.applog.error(error);
				}
				return _autoControllers;
			},
			[]
		);

		let controllerInfo;
		while ((controllerInfo = CONTROLLERS_PATH_INFO_ARRAY.pop())) {
			try {
				/* Demo:AutowareControllerUseSwagger.js 获取的 info:["AutowareControllerUseSwagger","UseSwagger","use_swagger"] */
				handle_each_controller_info({
					controller_info: require(controllerInfo[0]),
					controller_name: controllerInfo[1],
					controller_parent_dir: controllerInfo[2]
				});
			} catch (error) {
				debugger;
				xU.applog.error(error);
			}
		}
	} catch (error) {
		xU.applog.error(error);
	}

	return {
		routes,
		swaggerJSON
	};
}

function handle_each_controller_info({
	controller_info,
	controller_name,
	controller_parent_dir
}) {
	if (controller_info.isHideInSwagger) {
		return;
	}

	const tag_name = `${controller_parent_dir}_${controller_name}`;
	swaggerJSON.tags.push({
		...controller_info.tag,
		name: tag_name
	});
	/* 各个controller definitions合并,所以除了通用的定义，命名需要加上命名空间 */
	if (controller_info.definitions) {
		swaggerJSON.definitions = _n.merge(
			swaggerJSON.definitions,
			controller_info.definitions
		);
	}
	_n.each(controller_info.paths, (api_info, url) => {
		/* 将文件夹的名称作为路由前缀 */
		const url_path = `/${controller_parent_dir}${url}`;
		swaggerJSON.paths[url_path] = {};

		_n.each(api_info, (handlerInfo, method) => {
			/* 注册路由 */
			const route = {
				...handlerInfo,
				prefix: _n.snakeCase(controller_name),
				url: url_path,
				method
			};

			routes.push(route);

			const url_path_method_info = {
				tags: [tag_name],
				consumes: ["application/json"],
				produces: ["application/json"],
				responses: {
					200: {
						description:
							"默认的success response，换句话说就是没有添加自定义的 response",
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

			swaggerJSON.paths[url_path][method] = url_path_method_info;

			/* case by case TODO: */
			const { request, responses, parameters, deprecated } = handlerInfo;

			if (parameters) {
				swaggerJSON.paths[url_path][method].parameters = parameters;
			} else if (request) {
				addParameters(url_path, method, request);
			}

			if (responses) {
				swaggerJSON.paths[url_path][method].responses = responses;
			}

			if (deprecated) {
				swaggerJSON.paths[url_path][method].deprecated = deprecated;
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
exports.handle_each_controller_info = handle_each_controller_info;
