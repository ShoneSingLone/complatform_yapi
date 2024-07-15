// const HttpsProxyAgent = require("https-proxy-agent");
let axios = require("axios");
const https = require("https");

// 在 axios 请求时，选择性忽略 SSL
const agent = new https.Agent({
	rejectUnauthorized: false
});

// const httpsAgent = new HttpsProxyAgent({
// 	host: "proxyhost",
// 	port: "proxyport",
// 	auth: "username:password"
// });

// //use axios as you normally would, but specify httpsAgent in the config
// axios = axios.create({ httpsAgent });

(async () => {
	try {
		const res = await axios({
			method: "post",
			url: `https://192.168.3.166:8093/rest/vdun/v1.0/businessSystem/list`,
			headers: {
				"x-auth-token": 1234,
				"Content-Type": "application/json"
			},
			httpsAgent: agent,
			data: {}
		});
		console.log("🚀 ~ res:", res);
		debugger;
	} catch (error) {
		debugger;
		console.error(error);
	} finally {
	}
})();

// (() => {

// 	const _url = new URL(
// 		"https://192.168.3.166:8093/rest/vdun/v1.0/businessSystem/list"
// 	);
// 	const options = {
// 		rejectUnauthorized: false,
// 		method: 'POST',
// 	};

// 	https
// 		.request(_url, options, (res) => {
// 			let data = '';

// 			res.on('data', (chunk) => {
// 				data += chunk;
// 			});

// 			res.on('end', () => {
// 				console.log(data);
// 			});
// 		}).on('error', (e) => {
// 			console.error(e);
// 		});

// })();
