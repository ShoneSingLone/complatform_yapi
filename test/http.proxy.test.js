var http = require("http");
var https = require("https");

const _url = new URL("https://console.821type1.com/vdun/rest/product/v3.0/apply/products?region_id=ghca-test-region&service_type=vdunbpcinstance&start=1&limit=4&name=");
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
		method: "get",
		rejectUnauthorized: false,
		headers: {
			host: "localhost:3001",
			"sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
			"x-request-from": "Framework",
			cftk: "6239cbdb28bc2dd3af92a1d6c24ef204",
			"x-language": "zh-cn",
			"sec-ch-ua-mobile": "?0",
			agencyid: "72055c6c87bd46b0a8e3dd981a48813e",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
			"content-type": "application/json",
			region: "ghca-test-region",
			accept: "application/json, text/javascript, */*; q=0.01",
			"x-requested-with": "XMLHttpRequest, XMLHttpRequest",
			projectname: "ghca_test_project",
			"sec-ch-ua-platform": "\"Windows\"",
			"sec-fetch-site": "same-origin",
			"sec-fetch-mode": "cors",
			"sec-fetch-dest": "empty",
			referer: "https://console.821type1.com/vdun/?agencyId=72055c6c87bd46b0a8e3dd981a48813e&region=ghca_test_project&locale=zh-cn",
			"accept-encoding": "gzip, br",
			"accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
			cookie: "locale=zh-cn; popup_max_time=1440; SID=Set2; agencyID=72055c6c87bd46b0a8e3dd981a48813e; CF2_SESSION_ID=VN-7UiSGVCIHORkcuiHI2w..|dtlnUKTI7ErFcr7Q0gjefA..; selectedRegion=ghca-test-region; projectName=ghca_test_project; projectId=497d0d0674cc49828431445349e43294; cfRefreshFlag=1725000911075",
			priority: "u=1, i",
			connection: "close",
			"x-auth-token": "MIIFKgYJKoZIhvcNAQcCoIIFGzCCBRcCAQExDTALBglghkgBZQMEAgEwggL4BgkqhkiG9w0BBwGgggLpBIIC5XsidG9rZW4iOnsiZXhwaXJlc19hdCI6IjIwMjQtMDYtMDdUMDk6NTA6NTMuMTczMDAwWiIsIm1ldGhvZHMiOlsicGFzc3dvcmQiXSwiY2F0YWxvZyI6W10sImRvbWFpbiI6eyJuYW1lIjoiR0hDQV9OMk9ORV9GVVNJT05PTkVfSENJIiwiaWQiOiI1YzUzNzc0MjZhMTY0MmMyYmU2Y2MzNTMzZTYxNmFlNiJ9LCJyb2xlcyI6W3sibmFtZSI6ImFwcHJvdl9hZG0iLCJpZCI6IjJhYjYxZGRiMTgxMzQ5M2NhNDBmOGUwMDkzMmRkOGE3In0seyJuYW1lIjoidmRjX293bmVyIiwiaWQiOiJmYTE2M2UzMGVkZDc0M2UzMGIyMGRkZDc3OTJjMmQwNSJ9LHsibmFtZSI6InZkY19hZG0iLCJpZCI6IjljMzRkOTE2MmFmZDQ2YTliYmViYmY4Y2FkZmJiMjE4In0seyJuYW1lIjoidGVfYWRtaW4iLCJpZCI6ImZhMTYzZTMwZWRkNzQzZTMwYjIwZGRkNzc1ZWMyY2ZhIn0seyJuYW1lIjoidGFnX2FkbSIsImlkIjoiNmU0ZTAzNjM4NmZhNDJjMDk0NWQyYzVjYjY0ZGE0NTkifSx7Im5hbWUiOiJzZWN1X2FkbWluIiwiaWQiOiJmYTE2M2UzMGVkZDc0M2UzMGIyMGRkZDc3NjJjMmNmYiJ9XSwiaXNzdWVkX2F0IjoiMjAyNC0wNi0wNlQwOTo1MDo1My4xNzMwMDBaIiwidXNlciI6eyJkb21haW4iOnsibmFtZSI6IkdIQ0FfTjJPTkVfRlVTSU9OT05FX0hDSSIsImlkIjoiNWM1Mzc3NDI2YTE2NDJjMmJlNmNjMzUzM2U2MTZhZTYifSwibmFtZSI6ImdoY2EtbHAiLCJpZCI6IjBmOTBiYjQ5OGUxMzQxOTNiMmI4NmQ2MjI4MjAxOTYwIn19fTGCAgUwggIBAgEBMFwwVjELMAkGA1UEBhMCQ04xCzAJBgNVBAgMAnNjMQswCQYDVQQHDAJjZDELMAkGA1UECgwCSFcxEDAOBgNVBAsMB0Nsb3VkQlUxDjAMBgNVBAMMBXRva2VuAgIQADALBglghkgBZQMEAgEwDQYJKoZIhvcNAQEBBQAEggGAIVF9AIKjZT7DeAFkvxKW+OLiFHU4XU2rwGAVlDHOHXmGWcXG1ZOlqhT5AZ6kZwxP-Wr1TDbYsyQSCiO8Iy9-OUmBUEl6nV8RWSApSczH1d6xwa7lmxAxtdrKx78ax94Su32OlPXIQKgy34k9SGC3eWa9U2dgbG2PxOVy3kAdUG7CFAS1injDLlRQ-hsa4U8c98k9aV8yPKVDp+w2o79jhBW8ni6zBKkjJaWuevEpckb5mJj8jmi1Pupx3VV-8-U4duOfYWCIbPyup5uGwOWhZtgVAmN6CrZ9FQJPDB0SV0JZ-hSHLgPB3MZmi4Hn9ZPJ4hXJCJ0n20gE9uewx1EwTX8rgGQSxOd+tHeukGK9VyHK2uG-TyiW4ZyKDd8zg-zYiwR-fNpQfV7qEZGbTH0H5mbuSNlC6rWswfND2-kHe4gg1ZP6rQdTT9Lk6JdtQFSbfUb2stAgs2ARoy7goUbyPc1-9bpE08cRwfaWLQmJgHoXVSdkTwBiirzAPAJVzT2H",
		}
	},
	handler
);

httpRequest.on("error", e => {
	console.log("Error with the request:", e);
});

httpRequest.write('{"serviceConfigId":"9b05adae830a470d35b8ee2bb304b99b"}');
httpRequest.end();
