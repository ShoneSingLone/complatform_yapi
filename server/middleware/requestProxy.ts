var http = require("http");
var https = require("https");
var _ = require("lodash");
var fs = require("fs");

exports.getResponseThroghProxy = function ({ ctx, headers, path, host, port }) {
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

		let httpRequestOptions = new URL(path);
		const setOptions = (key, value) => {
			httpRequestOptions[key] = value;
		};

		const upsertHeader = (key, value) => {
			httpRequestOptions.headers[key] = value;
		};

		setOptions("method", ctx.request.method);
		setOptions("headers", headers);

		const hasRequestBody = JSON.stringify(ctx.request?.body) != "{}";
		const CONTENT_TYPE = String(ctx.request?.header["content-type"] || "");

		(() => {
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
				if (
					xU._.some([URLENCODED_LABEL, APPLICATION_JSON_LABEL], label =>
						CONTENT_TYPE.includes(label)
					)
				) {
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
		let httpRequest = execHttpRequest(httpRequestOptions);

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
					httpRequestOptions: httpRequestOptions.headers,
					headers: response.headers,
					body: Buffer.concat(chunks, totallength)
				});
			};
			response.on("data", handleResponseOnData);
			response.on("end", handleResponseOnEnd);
		}

		function execHttpRequest(httpRequestOptions) {
			const { method, headers, protocol } = httpRequestOptions;

			const isUseOtherHostProxy = host && port;

			const httpRequest = (() => {
				if (isUseOtherHostProxy) {
					/* 开启了代理 (maybe局域网，可达)*/
					return http.request(
						{ host, port, path, method, headers },
						onResponse
					);
				} else if (protocol === "https:") {
					const httpRequest = https.request(
						new URL(path),
						{
							method,
							headers,
							rejectUnauthorized: false
						},
						onResponse
					);
					return httpRequest;
				} else {
					/* http */
					return http.request(
						httpRequestOptions,
						{ method, headers },
						onResponse
					);
				}
			})();

			httpRequest.on("error", error => {
				xU.applog.error(error);
				resolve({ headers, body: { error, code: "Y-API_server_500" } });
			});

			return httpRequest;
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
