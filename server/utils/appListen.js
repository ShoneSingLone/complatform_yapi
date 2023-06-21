function appListen(app, PORT, tips = "服务已启动，请打开下面链接访问:") {
	app.listen(PORT);
	if (process.send) {
		process.send(JSON.stringify({ type: "CHANGE_PORT", PORT }));
	}
	console.log(`${tips}\nhttp://127.0.0.1${PORT == "80" ? "" : ":" + PORT}/ `);
	var interfaces = require("os").networkInterfaces();
	const content = JSON.stringify(interfaces);
	const contentArray = content
		.split(`",`)
		.filter(s => s.match(/"address":"(.*)/));
	contentArray.forEach(s => {
		const res = s.match(/address":"192.(.*)/);
		if (res) {
			console.log(`http://192.${res[1]}:${PORT}/`);
		}
	});
	return app;
}

exports.appListen = appListen;
