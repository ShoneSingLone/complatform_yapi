var http = require("http");
var https = require("https");

// const _url = new URL('http://10.143.133.190:18036/vdc/api/1.0/cloudDesktop/list/1/10');
const _url = new URL(
	"https://192.168.3.166:8093/rest/vdun/v1.0/hub/list"
);
// const _url = new URL('https://192.168.3.166:8093//rest/vdun/v1.0/license/validate');
console.log(_url);

const { hostname, pathname, port } = _url;

const httpRequestOptions = {
	host: hostname,
	path: pathname,
	method: "GET"
};

if (port) {
	httpRequestOptions.port = port;
}

let ajax = http.request;
if (_url.protocol === "https:") {
	ajax = https.request;
}

const handler = response => {
	const chunks = [];
	let totallength = 0;

	response.on("data", chunk => {
		chunks.push(chunk);
		totallength += chunk.length;
	});

	response.on("end", () => {
		console.log({
			headers: response.headers,
			body: Buffer.concat(chunks, totallength).toString()
		});
	});
};

const httpRequest = https.request(
	_url,
	{
		method: "post",
		rejectUnauthorized: false,
		headers: {
			"content-type": "application/json",
			"x-auth-token": "123412341234"
		}
	},
	handler
);

httpRequest.on("error", e => {
	console.log("Error with the request:", e);
});

httpRequest.write('{"serviceConfigId":"9b05adae830a470d35b8ee2bb304b99b"}');
httpRequest.end();
