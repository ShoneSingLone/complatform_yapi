var http = require("http");
var https = require("https");
var _ = require("lodash");
var fs = require("fs");

exports.getResponseThroghProxy = function ({ ctx, path, host, port }) {
	host = host === "undefined" ? "" : host;
	port = port === "undefined" ? "" : port;

	return new Promise(resolve => {
		let requestBody = "",
			body,
			headers,
			bodyFields,
			bodyFiles,
			boundaryKey,
			boundary,
			endData,
			filesLength;

		function hanldeError(error) {
			console.log("Error=====================>\n", error);
			console.log(`Error===${new Date().toDateString()}======>\n\n`);
			resolve({ headers, body: { errormsg: error.message, code: 555 } });
		}

		delete ctx.request?.header.host;
		let httpRequestOptions = new URL(path);
		httpRequestOptions.method = ctx.request.method;
		httpRequestOptions.headers = ctx.request?.header;
		if (ctx.request.body && JSON.stringify(ctx.request.body) != "{}") {
			(() => {
				if (ctx.request?.header["content-type"]) {
					if (
						String(ctx.request.header["content-type"]).includes(
							"application/x-www-form-urlencoded"
						)
					) {
						requestBody = JSON.stringify(ctx.request.body);
						httpRequestOptions.headers["Content-Length"] =
							Buffer.byteLength(requestBody);
						return;
					}

					if (
						String(ctx.request.header["content-type"]).includes(
							"application/json"
						)
					) {
						requestBody = JSON.stringify(ctx.request.body);
						httpRequestOptions.headers["Content-Length"] =
							Buffer.byteLength(requestBody);
						return;
					}

					if (
						String(ctx.request.header["content-type"]).includes(
							"multipart/form-data"
						)
					) {
						bodyFields = ctx.request.body.fields;
						bodyFiles = ctx.request.body.files;
						boundaryKey = Math.random().toString(16);
						boundary = `\r\n----${boundaryKey}\r\n`;
						endData = `\r\n----${boundaryKey}--`;
						filesLength = 0;

						Object.keys(bodyFields).forEach(key => {
							requestBody += `${boundary}Content-Disposition:form-data;name="${key}"\r\n\r\n${bodyFields[key]}`;
						});

						Object.keys(bodyFiles).forEach(key => {
							requestBody += `${boundary}Content-Type: application/octet-stream\r\nContent-Disposition: form-data; name="${key}";filename="${bodyFiles[key].name}"\r\nContent-Transfer-Encoding: binary\r\n\r\n`;
							filesLength +=
								Buffer.byteLength(requestBody, "utf-8") + bodyFiles[key].size;
						});

						httpRequestOptions.headers[
							"Content-Type"
						] = `multipart/form-data; boundary=--${boundaryKey}`;
						httpRequestOptions.headers[`Content-Length`] =
							filesLength + Buffer.byteLength(endData);
						return;
					}
				}
				requestBody = JSON.stringify(ctx.request.body);
				httpRequestOptions.headers["Content-Length"] =
					Buffer.byteLength(requestBody);
			})();
		}

		try {
			/* TODO: 开启了代理直接走代理，目前是使用whistle起的服务，所以只考虑http */
			let httpRequest = newHttpRequest(httpRequestOptions);
			httpRequest.on("error", hanldeError);

			if (bodyFiles) {
				let fileKeyArray = Object.keys(bodyFiles);
				let uploadConnt = 0;

				function logError(error) {
					console.log("发生错误", error);
				}
				async function handleUploadFileOnEnd() {
					await fs.promises.unlink(bodyFiles[key].path);
					uploadConnt++;
					if (uploadConnt == fileKeyArray.length) {
						httpRequest.end(endData);
					}
				}
				_.each(fileKeyArray, key => {
					let frs = fs.createReadStream(bodyFiles[key].path);
					frs.on("err", logError);
					frs.on("end", handleUploadFileOnEnd);
					if (requestBody) {
						httpRequest.write(requestBody);
					}
					frs.pipe(httpRequest, { end: false });
				});
			} else if (requestBody) {
				httpRequest.write(requestBody);
				httpRequest.end();
			} else {
				httpRequest.end();
			}
		} catch (error) {
			hanldeError(error);
		}

		function handleResponse(response) {
			const chunks = [];
			let totallength = 0;
			const handleResponseOnData = chunk => {
				chunks.push(chunk);
				totallength += chunk.length;
			};
			const handleResponseOnEnd = () => {
				resolve({
					headers: response.headers,
					body: Buffer.concat(chunks, totallength)
				});
			};
			response.on("data", handleResponseOnData);
			response.on("end", handleResponseOnEnd);
		}

		function newHttpRequest(httpRequestOptions) {
			console.log("httpRequestOptions", httpRequestOptions);
			const { method, headers } = httpRequestOptions;

			/* 开启了代理 */
			if (host && port) {
				return http.request(
					{ host, port, path, method, headers },
					handleResponse
				);
			}

			/* https */
			if (httpRequestOptions.protocol === "https:") {
				return https.request(
					path,
					{ method, headers, rejectUnauthorized: false },
					handleResponse
				);
			}

			/* http */
			return http.request(
				httpRequestOptions,
				{ method, headers },
				handleResponse
			);
		}
	});
};
