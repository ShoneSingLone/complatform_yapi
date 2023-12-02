module.exports = function appListen(
	app,
	tips = "服务已启动，请打开下面链接访问:"
) {
	let currPort = Number(yapi_configs.port) || "80";
	app.listen(currPort);
	if (process.send) {
		process.send(JSON.stringify({ type: "CHANGE_PORT", PORT: currPort }));
	}
	console.log(
		`${tips}\nhttp://127.0.0.1${currPort == "80" ? "" : ":" + currPort}/ `
	);
	var interfaces = require("os").networkInterfaces();
	const content = JSON.stringify(interfaces);
	const contentArray = content
		.split(`",`)
		.filter(s => s.match(/"address":"(.*)/));
	contentArray.forEach(s => {
		const res = s.match(/address":"192.(.*)/);
		if (res) {
			console.log(`http://192.${res[1]}:${currPort}/`);
		}
	});
	app.server.on("error", function handleAppError(e) {
		if (e.code === "EADDRINUSE") {
			setTimeout(() => {
				appListen(app, ++currPort, "Address in use, retrying...");
			}, 100);
		}
	});
	app.server.setTimeout(yapi_configs.timeout);
	return app;
};
