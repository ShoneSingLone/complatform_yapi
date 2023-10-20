const url = require("url");
const mime = require("mime-types");
const path = require("path");
const fs = require("fs");
const Buffer = require("buffer").Buffer;

const { ArgvWeb, responseError } = require("./common");

function handlePostParams(request) {
	return new Promise(resolve => {
		var postParamsString = "";

		request.on("data", function (chunk) {
			postParamsString += chunk;
		});

		request.on("end", function () {
			let searchParams;
			if (request.headers["content-type"] === "application/json") {
				searchParams = JSON.parse(postParamsString);
			} else {
				const params = new URLSearchParams(postParamsString);
				searchParams = {};
				for (const [key, value] of params.entries()) {
					searchParams[key] = value;
				}
			}
			resolve(searchParams);
		});
	});
}

exports.handleHttp = async function handleHttp(request, response) {
	// Process an HTTP static file request

	const currentURL = url.parse(request.url);
	const { pathname } = currentURL;
	console.log("pathname: " + pathname);

	if (pathname === "/save_author_info") {
		async function handle_save_author_info() {
			const postParmas = await handlePostParams(request);
			const vnc_duration = postParmas["vnc_duration"] || 60;
			const vnc_password = postParmas["vnc_password"];
			const vnc_ip = postParmas["vnc_ip"];
			const vnc_por = postParmas["vnc_por"];
			const vnc_token = postParmas["vnc_token"];

			if (!vnc_ip || !vnc_por || !vnc_token) {
				return responseError(
					response,
					401,
					"vnc_ip vnc_por vnc_token required!!"
				);
			}

			fs.writeFileSync(
				path.resolve(__dirname, "authInfo", `${vnc_token}.js`),
				`module.exports = ${JSON.stringify({
					vnc_duration,
					vnc_password,
					vnc_ip,
					vnc_por,
					vnc_token
				})}`
			);

			response.writeHead(200, { "Content-Type": "text/plain" });
			response.end("ok");
		}

		return handle_save_author_info();
	}

	var filename = path.join(ArgvWeb, pathname);
	fs.exists(filename, function (exists) {
		if (!exists) {
			return responseError(response, 404, "404 Not Found");
		}

		if (fs.statSync(filename).isDirectory()) {
			filename += "/index.html";
		}

		fs.readFile(filename, "binary", function (err, file) {
			if (err) {
				return responseError(response, 500, err);
			}

			var headers = {};
			var contentType = mime.contentType(path.extname(filename));
			if (contentType !== false) {
				headers["Content-Type"] = contentType;
			}

			response.writeHead(200, headers);
			response.write(file, "binary");
			response.end();
		});
	});
};

function proxyHttp(response, response) {
	var u = url.parse(request.url);
	var options = {
		hostname: u.hostname,
		port: u.port || 80,
		path: u.path,
		method: request.method,
		headers: request.headers
	};
	var pReq = http
		.request(options, function (pRes) {
			response.writeHead(pRes.statusCode, pRes.headers);
			pRes.pipe(response);
		})
		.on("error", function (e) {
			response.end();
		});
	request.pipe(pReq);
}
