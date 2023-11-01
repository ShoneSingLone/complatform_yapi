const path = require("path");

function getIPAdress() {
	var interfaces = require("os").networkInterfaces();
	const content = JSON.stringify(interfaces);
	const contentArray = content
		.split(`",`)
		.filter(s => s.match(/"address":"(.*)/));
	contentArray.forEach(s => {
		const res = s.match(/address":"192.(.*)/);
		if (res) {
			console.log(`192.${res[1]}`);
		}
	});
}

console.log(path.dirname(path.resolve("./")));

getIPAdress();
