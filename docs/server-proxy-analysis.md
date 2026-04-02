# YAPI 服务器代理过程分析

## 1. 代理整体流程

YAPI 的代理功能主要通过以下几个模块实现：

1. **中间件拦截**：`mockServer.ts` 中间件拦截所有 `/mock/` 开头的请求
2. **代理判断**：根据接口配置或请求头决定是否启用代理
3. **请求处理**：`requestProxy.ts` 处理代理请求的构建和发送
4. **响应处理**：接收并转发代理服务器的响应

### 核心流程示意图

```
客户端 → YAPI 服务器 → 代理中间件 → 目标服务器 → 响应返回
```

## 2. 代理触发条件

代理功能在以下情况被触发：

1. **接口配置**：接口设置了 `isProxy` 为 true
2. **请求头**：请求中包含 `yapi-run-test` 头

## 3. 核心代码分析

### 3.1 代理中间件 (mockServer.ts)

```typescript
// 检查是否启用代理
const isRunWithYapiProxy = (() => {
	return current_request_interface_data_in_yapi_db?.isProxy || ctx.headers["yapi-run-test"];
})();

if (isRunWithYapiProxy) {
	// 获取代理环境配置
	const ENV_VAR = ((/* 获取对应的代理环境 */) => {
		return xU._.find(project.env, i => {
			try {
				const id = ObjectId(i._id).toString();
				return id === current_request_interface_data_in_yapi_db.witchEnv;
			} catch (error) {
				console.log("ERROR:获取对应的代理环境", error);
			}
			return false;
		});
	})();

	// 执行代理请求
	await setResponseByRunProxy(ctx, {
		project_id: project._id,
		ENV_VAR,
		yapiRun: ctx.headers["yapi-run-test"]
	});

	// 备份成功响应
	ifSuccessfulStoreResponse({
		ctx,
		modelInterface: orm.interface,
		interfaceData: current_request_interface_data_in_yapi_db
	});

	return;
}
```

### 3.2 代理请求处理 (setResponseByRunProxy)

```typescript
async function setResponseByRunProxy(ctx, { ENV_VAR, project_id }) {
	const { domain, header: ENV_VAR_HEADER_ARRAY } = ENV_VAR || {};
	const targetURL = ctx.originalUrl.replace(`/mock/${project_id}`, "");

	// 构建请求头
	const headers = (() => {
		if (xU._.isEmpty(ENV_VAR_HEADER_ARRAY)) {
			return { ...ctx.headers };
		}
		return xU._.reduce(
			ENV_VAR_HEADER_ARRAY,
			(_headers, { name, value }) => {
				if (!_headers[name]) {
					_headers[name] = value;
				}
				return _headers;
			},
			{ ...ctx.headers }
		);
	})();

	// 解析代理路径和配置
	const [path, proxyHOST, proxyPORT] = (() => {
		let path, proxyHOST, proxyPORT;
		if (headers["yapi-run-test"]) {
			path = headers["yapi-run-test"];
		} else {
			path = `${domain}${targetURL}`;
		}

		if (headers["yapi-proxy-host"]) {
			proxyHOST = headers["yapi-proxy-host"];
		}

		if (headers["yapi-proxy-port"]) {
			proxyPORT = headers["yapi-proxy-port"];
		}

		return [path, proxyHOST, proxyPORT];
	})();

	// 执行代理请求
	let response;
	try {
		const ResponseThroghProxyOptions = {
			ctx,
			path,
			headers,
			host: proxyHOST,
			port: proxyPORT
		};
		response = await execProxyRequest(ResponseThroghProxyOptions);
	} catch (error) {
		console.error(error);
		// 错误处理
	}

	// 处理响应
	if (response) {
		body = response.body;
		// 设置响应头
		xU._.each(response.headers, (value, prop) => {
			if (prop === "transfer-encoding" || prop === "content-length") {
				return;
			}
			ctx.set(prop, value);
		});

		// 设置响应状态码
		if (response.statusCode) {
			ctx.status = response.statusCode;
		}
	}

	ctx.body = body || {};
	return ctx.body;
}
```

### 3.3 代理请求执行 (execProxyRequest)

```typescript
exports.execProxyRequest = function ({ ctx, headers, path, host, port }) {
	host = host === "undefined" ? "" : host;
	port = port === "undefined" ? "" : port;

	return new Promise(resolve => {
		let requestBody = "";
		let bodyFields;
		let bodyFiles;
		let boundaryKey;
		let boundary;
		let endData;
		let filesLength;

		// 删除 host 头
		delete ctx.request?.header.host;

		let request_url_obj = new URL(path);

		// 设置请求方法和头
		setOptions("method", ctx.request.method);
		setOptions("headers", headers);

		// 处理请求体
		const hasRequestBody = JSON.stringify(ctx.request?.body) != "{}";
		const CONTENT_TYPE = String(ctx.request?.header["content-type"] || "");

		// 根据内容类型处理请求体
		((/* set headers properties */) => {
			if (!CONTENT_TYPE) {
				upsertHeader("content-type", "application/json");
			}
			if (!hasRequestBody) {
				return;
			}

			// 处理 JSON 和 x-www-form-urlencoded
			const isApplication = xU._.some([URLENCODED_LABEL, APPLICATION_JSON_LABEL], label =>
				CONTENT_TYPE.includes(label)
			);

			if (isApplication) {
				requestBody = JSON.stringify(ctx.request.body);
				upsertHeader("Content-Length", Buffer.byteLength(requestBody));
				return;
			}

			// 处理 multipart/form-data (文件上传)
			const isFormData = CONTENT_TYPE.includes(FORM_DATA_LABEL);
			if (isFormData) {
				// 处理文件上传逻辑
				// ...
			}

			// 默认处理
			requestBody = JSON.stringify(ctx.request.body);
			upsertHeader("Content-Length", Buffer.byteLength(requestBody));
		})();

		// 执行 HTTP 请求
		let httpRequest = execHttpRequest({ request_url_obj });

		// 发送请求体
		if (bodyFiles) {
			/* 文件上传 */
			handleFilesUpload({ bodyFiles, httpRequest, endData, requestBody });
		} else if (requestBody) {
			httpRequest.write(requestBody);
			httpRequest.end();
		} else {
			httpRequest.write("{}");
			httpRequest.end();
		}

		// 处理响应
		function onResponse(response) {
			const chunks = [];
			let totallength = 0;

			response.on("data", chunk => {
				chunks.push(chunk);
				totallength += chunk.length;
			});

			response.on("end", () => {
				resolve({
					httpRequestOptions: request_url_obj.headers,
					headers: response.headers,
					body: Buffer.concat(chunks, totallength),
					statusCode: response.statusCode
				});
			});
		}

		// 执行 HTTP 请求
		function execHttpRequest({ request_url_obj }) {
			const { method, headers, protocol } = request_url_obj;
			const isUseOtherHostProxy = host && port;

			try {
				// 处理 content-length 为 0 的情况
				if (!Number(headers["content-length"])) {
					delete headers["content-length"];
				}

				// 基础请求配置
				options = {
					method,
					headers,
					rejectUnauthorized: false // 忽略SSL证书验证
				};

				// 使用指定的代理服务器
				if (isUseOtherHostProxy) {
					return http.request(
						{
							host,
							port,
							path,
							method,
							headers
						},
						onResponse
					);
				}

				// 使用 HTTPS
				const isUseHttps = protocol === "https:";
				if (isUseHttps) {
					return https.request(new URL(path), options, onResponse);
				}

				// 默认使用 HTTP
				return http.request(request_url_obj, onResponse);
			} catch (error) {
				console.error("代理请求出错:", error);
				throw error;
			}
		}
	});
};
```

### 3.4 文件上传处理

```typescript
function handleFilesUpload({ bodyFiles, httpRequest, endData, requestBody }) {
	let fileKeyArray = Object.keys(bodyFiles);
	let uploadConnt = 0;

	function logError(error) {
		console.log("发生错误", error);
	}

	xU._.each(fileKeyArray, key => {
		async function handleUploadFileOnEnd() {
			await fs.promises.unlink(bodyFiles[key].path);
			uploadConnt++;
			if (uploadConnt == fileKeyArray.length) {
				httpRequest.end(endData);
			}
		}

		let frs = fs.createReadStream(bodyFiles[key].path);
		frs.on("err", logError);
		frs.on("end", handleUploadFileOnEnd);

		if (requestBody) {
			httpRequest.write(requestBody);
		}
		frs.pipe(httpRequest, { end: false });
	});
}
```

## 4. 代理配置方式

### 4.1 接口级配置

1. 在 YAPI 接口编辑页面，开启「启用代理」选项
2. 选择对应的「环境」，环境中需配置正确的域名

### 4.2 请求头配置

| 请求头            | 说明                 | 示例                           |
| ----------------- | -------------------- | ------------------------------ |
| `yapi-run-test`   | 直接指定代理目标 URL | `https://api.example.com/user` |
| `yapi-proxy-host` | 指定代理服务器主机   | `127.0.0.1`                    |
| `yapi-proxy-port` | 指定代理服务器端口   | `8888`                         |

## 5. 代理支持的请求类型

1. **JSON**：`application/json`
2. **表单**：`application/x-www-form-urlencoded`
3. **文件上传**：`multipart/form-data`

## 6. 特殊处理

### 6.1 SSL 证书验证

默认忽略 SSL 证书验证：

```typescript
options = {
	method,
	headers,
	rejectUnauthorized: false // 忽略SSL证书验证
};
```

### 6.2 响应备份

当代理请求成功（状态码 200 且非 HTML 响应）时，会自动备份响应数据：

```typescript
async function ifSuccessfulStoreResponse({ ctx, modelInterface, interfaceData }) {
	if (interfaceData.resBackupJson) {
		return;
	}
	if (ctx.status != 200 || ["text/html"].includes(ctx.type)) {
		return;
	}

	// 备份响应数据
	const data = {};
	try {
		let res;
		if (Object.prototype.toString.call(ctx.body) === `[object Uint8Array]`) {
			res = JSON.parse(ctx.body.toString());
		} else if (typeof ctx.body === "object") {
			res = ctx.body;
		}

		if (xU._.isPlainObject(res)) {
			data.resBackupJson = JSON.stringify(res, null, 2);
			await modelInterface.up(interfaceData._id, data);
		}
	} catch (error) {
		xU.applog.error(error);
	}
}
```

## 7. 代理流程总结

1. **请求拦截**：`mockServer.ts` 中间件拦截 `/mock/` 开头的请求
2. **代理判断**：检查接口是否启用代理或是否有代理请求头
3. **环境配置**：获取项目环境配置中的域名和请求头
4. **请求构建**：
    - 解析目标 URL
    - 构建请求头
    - 处理请求体（支持 JSON、表单、文件上传）
5. **请求发送**：
    - 支持 HTTP/HTTPS
    - 支持指定代理服务器
    - 处理文件上传流
6. **响应处理**：
    - 接收并转发响应头
    - 接收并转发响应体
    - 设置响应状态码
7. **响应备份**：自动备份成功的响应数据

## 8. 代码优化建议

1. **错误处理增强**：

    - 增加更详细的错误日志
    - 对代理失败的情况提供更友好的错误信息

2. **性能优化**：

    - 考虑使用连接池管理 HTTP 请求
    - 对大文件上传进行分块处理

3. **安全性**：

    - 增加代理目标的白名单验证
    - 对敏感头信息进行过滤

4. **代码结构**：
    - 将代理逻辑拆分为更小的函数
    - 增加更多的注释和文档

## 9. 输入输出示例

### 输入：

```bash
# 启用代理的请求
curl -X POST "http://localhost:3000/mock/123/user/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "123456"}'

# 使用请求头指定代理目标
curl -X GET "http://localhost:3000/mock/123/api" \
  -H "yapi-run-test: https://api.example.com/api"

# 使用代理服务器
curl -X GET "http://localhost:3000/mock/123/api" \
  -H "yapi-run-test: https://api.example.com/api" \
  -H "yapi-proxy-host: 127.0.0.1" \
  -H "yapi-proxy-port: 8888"
```

### 输出：

```
# 成功响应
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

# 代理错误
{
  "code": 500,
  "message": "ResponseByRunProxy=>https://api.example.com/api"
}
```

## 10. 总结

YAPI 的代理功能通过 `mockServer.ts` 和 `requestProxy.ts` 实现，支持以下特性：

-   **灵活的代理配置**：支持接口级配置和请求头配置
-   **多种请求类型**：支持 JSON、表单和文件上传
-   **协议支持**：同时支持 HTTP 和 HTTPS
-   **代理服务器**：支持指定代理服务器
-   **响应备份**：自动备份成功的响应数据
-   **错误处理**：完善的错误处理机制

代理功能为 YAPI 提供了强大的接口测试能力，使开发者可以轻松地在开发环境中测试真实的 API 接口。

## 11. 代理模式扩展：支持真实转发与自定义响应

### 11.1 两种代理模式

YAPI 代理功能现在支持两种模式：

1. **真实转发模式**：

    - 将请求转发到真实的后端服务器
    - 获取并返回真实的接口数据
    - 支持完整的请求/响应流程

2. **自定义响应模式**：
    - 忽略或修改传入的请求参数
    - 返回用户自定义的响应数据
    - 可选择是否执行真实的代理请求

### 11.2 需求分析

**目标**：

1. 保持现有的真实转发功能
2. 新增自定义响应功能，返回与真实代理不同的 JSON 数据
3. 支持忽略传入的 body 参数
4. 提供灵活的配置方式

### 11.3 适用场景

**真实转发模式**：

-   测试真实后端接口
-   验证接口集成
-   调试后端问题

**自定义响应模式**：

-   **测试不同响应场景**：模拟各种 API 响应情况（成功、失败、异常等）
-   **数据脱敏**：返回不包含敏感信息的响应
-   **性能测试**：返回固定响应，避免依赖真实后端
-   **前端开发**：在后端未就绪时提供稳定的响应
-   **边界测试**：测试前端对各种响应格式的处理能力

### 11.4 实现方案

#### 11.4.1 核心实现：响应处理增强

**修改位置**：`mockServer.ts` 的 `setResponseByRunProxy` 函数

**修改思路**：

1. 保持原有的真实转发逻辑
2. 新增自定义响应处理逻辑
3. 优先使用自定义响应，其次使用真实代理响应

**具体修改**：

```typescript
async function setResponseByRunProxy(ctx, { ENV_VAR, project_id }) {
	const { domain, header: ENV_VAR_HEADER_ARRAY } = ENV_VAR || {};
	const targetURL = ctx.originalUrl.replace(`/mock/${project_id}`, "");

	// 构建请求头
	const headers = (() => {
		if (xU._.isEmpty(ENV_VAR_HEADER_ARRAY)) {
			return { ...ctx.headers };
		}
		return xU._.reduce(
			ENV_VAR_HEADER_ARRAY,
			(_headers, { name, value }) => {
				if (!_headers[name]) {
					_headers[name] = value;
				}
				return _headers;
			},
			{ ...ctx.headers }
		);
	})();

	// 解析代理路径和配置
	const [path, proxyHOST, proxyPORT] = (() => {
		let path, proxyHOST, proxyPORT;
		if (headers["yapi-run-test"]) {
			path = headers["yapi-run-test"];
		} else {
			path = `${domain}${targetURL}`;
		}

		if (headers["yapi-proxy-host"]) {
			proxyHOST = headers["yapi-proxy-host"];
		}

		if (headers["yapi-proxy-port"]) {
			proxyPORT = headers["yapi-proxy-port"];
		}

		return [path, proxyHOST, proxyPORT];
	})();

	let response;
	let body = xU.$response(null, 500, `ResponseByRunProxy=>${path}`);

	try {
		const ResponseThroghProxyOptions = {
			ctx,
			path,
			headers,
			host: proxyHOST,
			port: proxyPORT
		};

		// 执行代理请求（仅当不忽略代理时）
		if (!headers["yapi-ignore-proxy"]) {
			response = await execProxyRequest(ResponseThroghProxyOptions);
		}
	} catch (error) {
		console.error(error);
		/* 返回的原始数据 */
		if (error.message) {
			body.errorMessage = error.message;
		} else if (error?.response?.data) {
			const { data, status } = error.response;
			body = data;
			ctx.status = status || 500;
		}
	}

	try {
		// 检查是否需要返回自定义响应（优先级最高）
		if (headers["yapi-custom-response"]) {
			try {
				// 从请求头获取自定义响应
				body = JSON.parse(headers["yapi-custom-response"]);
			} catch (error) {
				console.error("自定义响应解析失败:", error);
				body = xU.$response(null, 400, "自定义响应格式错误");
			}
		} else if (headers["yapi-response-template"]) {
			// 使用预定义的响应模板
			const template = headers["yapi-response-template"];
			body = getResponseTemplate(template);
		} else if (response) {
			// 使用真实代理响应（默认行为）
			body = response.body;
			// 设置响应头
			xU._.each(response.headers, (value, prop) => {
				if (prop === "transfer-encoding" || prop === "content-length") {
					return;
				}
				ctx.set(prop, value);
			});
		}

		// 设置响应状态码
		if (headers["yapi-status-code"]) {
			ctx.status = parseInt(headers["yapi-status-code"]);
		} else if (response && response.statusCode) {
			ctx.status = response.statusCode;
		}

		// 设置自定义响应头
		if (headers["yapi-custom-headers"]) {
			try {
				const customHeaders = JSON.parse(headers["yapi-custom-headers"]);
				Object.keys(customHeaders).forEach(key => {
					ctx.set(key, customHeaders[key]);
				});
			} catch (error) {
				console.error("自定义响应头解析失败:", error);
			}
		} else if (response) {
			// 已经在上面设置了代理响应头
		}
	} catch (error) {
		body = xU.$response(null, 555, `错误来自yapi服务器： ${error.message}`);
	} finally {
		ctx.body = body || {};
		return ctx.body;
	}
}

// 预定义响应模板
function getResponseTemplate(template) {
	const templates = {
		success: { code: 0, message: "success", data: {} },
		error: { code: 500, message: "internal error" },
		"not-found": { code: 404, message: "resource not found" },
		unauthorized: { code: 401, message: "unauthorized" },
		forbidden: { code: 403, message: "forbidden" },
		"validation-error": { code: 422, message: "validation error" },
		timeout: { code: 408, message: "request timeout" }
	};
	return templates[template] || templates["success"];
}
```

#### 11.4.2 请求处理增强：支持忽略 body

**修改位置**：`requestProxy.ts` 的 `execProxyRequest` 函数

**修改思路**：

1. 检查是否需要忽略 body 参数
2. 如果需要，不发送 body 数据
3. 保持对真实转发模式的兼容性

**具体修改**：

```typescript
exports.execProxyRequest = function ({ ctx, headers, path, host, port }) {
	host = host === "undefined" ? "" : host;
	port = port === "undefined" ? "" : port;

	return new Promise(resolve => {
		let requestBody = "";
		let bodyFields;
		let bodyFiles;
		let boundaryKey;
		let boundary;
		let endData;
		let filesLength;

		/* TODO: why?*/
		delete ctx.request?.header.host;

		let request_url_obj = new URL(path);
		const setOptions = (key, value) => {
			request_url_obj[key] = value;
		};

		const upsertHeader = (key, value) => {
			request_url_obj.headers[key] = value;
		};

		setOptions("method", ctx.request.method);
		setOptions("headers", headers);

		// 检查是否忽略 body
		const ignoreBody = headers["yapi-ignore-body"] === "true";
		const hasRequestBody = !ignoreBody && JSON.stringify(ctx.request?.body) != "{}";
		const CONTENT_TYPE = String(ctx.request?.header["content-type"] || "");

		((/* set headers properties */) => {
			if (!CONTENT_TYPE) {
				upsertHeader("content-type", "application/json");
			}
			if (!hasRequestBody) {
				return;
			}
			const APPLICATION_JSON_LABEL = "application/json";
			const URLENCODED_LABEL = "application/x-www-form-urlencoded";
			const FORM_DATA_LABEL = "multipart/form-data";

			if (CONTENT_TYPE) {
				const isApplication = xU._.some([URLENCODED_LABEL, APPLICATION_JSON_LABEL], label =>
					CONTENT_TYPE.includes(label)
				);

				if (isApplication) {
					requestBody = JSON.stringify(ctx.request.body);
					upsertHeader("Content-Length", Buffer.byteLength(requestBody));
					return;
				}

				const isFormData = CONTENT_TYPE.includes(FORM_DATA_LABEL);
				if (isFormData) {
					bodyFields = ctx.request.body.fields;
					bodyFiles = ctx.request.body.files;
					boundaryKey = Math.random().toString(16);
					boundary = `\r\n----${boundaryKey}\r\n`;
					endData = `\r\n----${boundaryKey}--`;
					filesLength = 0;

					xU._.each(bodyFields, (content, key) => {
						requestBody += `${boundary}Content-Disposition:form-data;name="${key}"\r\n\r\n${content}`;
					});

					xU._.each(bodyFiles, (content, key) => {
						requestBody += `${boundary}Content-Type: application/octet-stream\r\nContent-Disposition: form-data; name="${key}";filename="${content.name}"\r\nContent-Transfer-Encoding: binary\r\n\r\n`;
						filesLength += Buffer.byteLength(requestBody, "utf-8") + content.size;
					});

					upsertHeader("Content-Type", `multipart/form-data; boundary=--${boundaryKey}`);
					upsertHeader(`Content-Length`, filesLength + Buffer.byteLength(endData));
					return;
				}
			}

			requestBody = JSON.stringify(ctx.request.body);
			upsertHeader("Content-Length", Buffer.byteLength(requestBody));
		})();

		/* TODO: 开启了代理直接走代理，目前是使用whistle起的服务，所以只考虑http */
		let httpRequest = execHttpRequest({
			request_url_obj
		});

		// 发送请求体（如果不忽略）
		if (!ignoreBody) {
			if (bodyFiles) {
				/* 文件上传 */
				handleFilesUpload({ bodyFiles, httpRequest, endData, requestBody });
			} else if (requestBody) {
				httpRequest.write(requestBody);
				httpRequest.end();
			} else {
				httpRequest.write("{}");
				httpRequest.end();
			}
		} else {
			// 忽略 body，直接结束请求
			httpRequest.end();
		}

		function onResponse(response) {
			const chunks = [];
			let totallength = 0;
			const handleResponseOnData = chunk => {
				chunks.push(chunk);
				totallength += chunk.length;
			};
			const handleResponseOnEnd = () => {
				resolve({
					httpRequestOptions: request_url_obj.headers,
					headers: response.headers,
					body: Buffer.concat(chunks, totallength),
					statusCode: response.statusCode
				});
			};
			response.on("data", handleResponseOnData);
			response.on("end", handleResponseOnEnd);
		}
		function execHttpRequest({ request_url_obj }) {
			const { method, headers, protocol } = request_url_obj;

			const isUseOtherHostProxy = host && port;

			const HTTP_REQUEST = (() => {
				let options;

				try {
					/* content-length 为0 导致400 */
					if (!Number(headers["content-length"])) {
						delete headers["content-length"];
					}

					/* 基础请求配置 */
					options = {
						method,
						headers,
						rejectUnauthorized: false // 忽略SSL证书验证
					};

					/* use local proxy */
					if (isUseOtherHostProxy) {
						/* 使用指定的代理服务器 */
						return http.request(
							{
								host,
								port,
								path,
								method,
								headers
							},
							onResponse
						);
					}

					/* use https */
					const isUseHttps = protocol === "https:";
					if (isUseHttps) {
						return https.request(new URL(path), options, onResponse);
					}

					/* default use http */
					return http.request(request_url_obj, onResponse);
				} catch (error) {
					console.error("代理请求出错:", error);
					throw error;
				}
			})();

			HTTP_REQUEST.on("error", error => {
				xU.applog.error("代理请求错误:", error);
				resolve({
					headers,
					body: { error, code: "Y_API_SERVER_500" }
				});
			});

			return HTTP_REQUEST;
		}
	});
};
```

### 11.5 配置与使用

#### 11.5.1 模式选择

| 模式       | 说明                               | 配置方式                                                       |
| ---------- | ---------------------------------- | -------------------------------------------------------------- |
| 真实转发   | 转发请求到真实后端                 | 默认行为，无需特殊配置                                         |
| 自定义响应 | 返回自定义数据                     | 使用 `yapi-custom-response` 或 `yapi-response-template` 请求头 |
| 混合模式   | 执行真实请求但返回自定义响应       | 不使用 `yapi-ignore-proxy`，但使用自定义响应头                 |
| 完全模拟   | 不执行真实请求，直接返回自定义响应 | 使用 `yapi-ignore-proxy: true`                                 |

#### 11.5.2 请求头配置

| 请求头                   | 说明                 | 示例                               | 适用模式        |
| ------------------------ | -------------------- | ---------------------------------- | --------------- |
| `yapi-ignore-body`       | 是否忽略 body 参数   | `true`                             | 所有模式        |
| `yapi-custom-response`   | 自定义响应 JSON      | `{"code": 0, "data": {"id": 123}}` | 自定义响应/混合 |
| `yapi-response-template` | 使用预定义响应模板   | `success`                          | 自定义响应/混合 |
| `yapi-status-code`       | 自定义响应状态码     | `200`                              | 自定义响应/混合 |
| `yapi-custom-headers`    | 自定义响应头         | `{"X-Custom": "value"}`            | 自定义响应/混合 |
| `yapi-ignore-proxy`      | 是否完全忽略代理请求 | `true`                             | 完全模拟        |

#### 11.5.3 预定义响应模板

| 模板名称           | 响应内容                                         | 状态码 |
| ------------------ | ------------------------------------------------ | ------ |
| `success`          | `{"code": 0, "message": "success", "data": {}}`  | 200    |
| `error`            | `{"code": 500, "message": "internal error"}`     | 500    |
| `not-found`        | `{"code": 404, "message": "resource not found"}` | 404    |
| `unauthorized`     | `{"code": 401, "message": "unauthorized"}`       | 401    |
| `forbidden`        | `{"code": 403, "message": "forbidden"}`          | 403    |
| `validation-error` | `{"code": 422, "message": "validation error"}`   | 422    |
| `timeout`          | `{"code": 408, "message": "request timeout"}`    | 408    |

#### 11.5.4 详细使用示例

**1. 真实转发模式（默认）**

```bash
# 正常转发请求到后端
curl -X POST "http://localhost:3000/mock/123/user/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "123456"}'
```

**2. 忽略 body 的真实转发**

```bash
# 忽略传入的body，转发空请求
curl -X POST "http://localhost:3000/mock/123/user/login" \
  -H "Content-Type: application/json" \
  -H "yapi-ignore-body: true" \
  -d '{"username": "test", "password": "123456"}'
```

**3. 自定义响应模式**

```bash
# 执行真实请求，但返回自定义响应
curl -X POST "http://localhost:3000/mock/123/user/login" \
  -H "Content-Type: application/json" \
  -H "yapi-custom-response: {\"code\": 0, \"data\": {\"token\": \"mock-token\"}}" \
  -d '{"username": "test", "password": "123456"}'
```

**4. 使用预定义模板**

```bash
# 返回错误响应模板
curl -X GET "http://localhost:3000/mock/123/api" \
  -H "yapi-response-template: error"
```

**5. 完全模拟模式**

```bash
# 不执行真实请求，直接返回自定义响应
curl -X GET "http://localhost:3000/mock/123/api" \
  -H "yapi-ignore-proxy: true" \
  -H "yapi-custom-response: {\"code\": 200, \"data\": {\"message\": \"direct response\"}}"
```

**6. 自定义状态码和响应头**

```bash
# 自定义状态码和响应头
curl -X GET "http://localhost:3000/mock/123/api" \
  -H "yapi-ignore-proxy: true" \
  -H "yapi-custom-response: {\"code\": 200, \"data\": {\"message\": \"custom\"}}" \
  -H "yapi-status-code: 201" \
  -H "yapi-custom-headers: {\"X-API-Version\": \"1.0\", \"X-Request-ID\": \"12345\"}"
```

### 11.6 实现细节与注意事项

#### 11.6.1 优先级顺序

响应处理的优先级顺序：

1. `yapi-custom-response` 请求头（最高优先级）
2. `yapi-response-template` 请求头
3. 真实代理响应（默认行为）

#### 11.6.2 错误处理

-   自定义响应解析失败时，返回 400 错误
-   代理请求失败时，返回错误信息
-   其他服务器错误时，返回 555 错误

#### 11.6.3 安全性考虑

-   自定义响应内容会被解析为 JSON，需确保格式正确
-   建议限制自定义响应的大小，防止 DoS 攻击
-   生产环境中应谨慎使用完全模拟模式

### 11.7 代码优化建议

1. **配置管理**：

    - 在项目设置中添加响应模板配置
    - 支持接口级别的响应配置
    - 提供可视化的响应编辑界面

2. **功能扩展**：

    - 支持响应延迟模拟
    - 支持条件响应（基于请求参数）
    - 支持响应数据随机化

3. **性能优化**：

    - 缓存常用的响应模板
    - 对忽略代理的请求，避免建立网络连接
    - 优化大响应的处理

4. **可维护性**：
    - 将响应模板和处理逻辑分离到单独的模块
    - 添加详细的日志记录
    - 编写完整的单元测试

### 11.8 预期效果

通过以上实现，YAPI 将具备以下能力：

**真实转发模式**：

-   保持原有功能，正常转发请求到后端
-   支持忽略 body 参数的转发

**自定义响应模式**：

-   灵活的响应控制：根据需要返回不同的 JSON 数据
-   模板化响应：使用预定义模板快速生成响应
-   完全绕过代理：在不需要真实后端时直接返回响应
-   自定义状态码和响应头：全面控制响应内容

**综合优势**：

-   增强测试能力：支持各种场景的 API 测试
-   提高开发效率：前端开发不依赖后端进度
-   简化调试过程：可以模拟各种错误情况
-   保持向后兼容：不影响现有功能

这些功能将使 YAPI 成为一个更加全面和强大的 API 管理和测试工具。
