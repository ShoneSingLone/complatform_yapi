var http = require("http");
var https = require("https");
var _ = require("lodash");
var fs = require("fs");

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

		const hasRequestBody = JSON.stringify(ctx.request?.body) != "{}";
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
				const isApplication = xU._.some(
					[URLENCODED_LABEL, APPLICATION_JSON_LABEL],
					label => CONTENT_TYPE.includes(label)
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
						filesLength +=
							Buffer.byteLength(requestBody, "utf-8") + content.size;
					});

					upsertHeader(
						"Content-Type",
						`multipart/form-data; boundary=--${boundaryKey}`
					);
					upsertHeader(
						`Content-Length`,
						filesLength + Buffer.byteLength(endData)
					);
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
					body: Buffer.concat(chunks, totallength)
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
						/* 
当请求的头部中`Content-Length`为 0 时，有以下一些作用：

**一、表明无请求体**

1. 清晰地向服务器传达该请求没有携带任何主体内容。例如，在某些 GET 请求中，通常不包含请求体，此时设置`Content-Length`为 0 可以准确地告知服务器这一情况。
2. 有助于服务器快速判断请求的类型和处理方式。服务器在接收到请求时，可以根据`Content-Length`的值来确定是否需要读取请求体，如果为 0，则可以直接进行后续处理，无需等待和处理不存在的请求体内容。

**二、节省资源**

1. 对于客户端来说，设置`Content-Length`为 0 可以避免不必要的资源消耗。如果客户端错误地发送了一个非零的`Content-Length`值，但实际上没有请求体内容，服务器可能会一直等待接收请求体，导致客户端资源被占用，如网络连接、内存等。
2. 对于网络传输来说，明确没有请求体可以减少不必要的数据包传输，节省网络带宽。

**三、符合规范和一致性**

1. 遵循 HTTP 协议规范，准确地表示请求的特征。在 HTTP 中，`Content-Length`头用于指示请求体的长度，设置为 0 是一种明确的方式来表明没有请求体，有助于确保通信的准确性和一致性。
2. 在一些复杂的网络环境或与多个系统进行交互时，遵循规范设置`Content-Length`可以提高系统的稳定性和可维护性。
*/
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
