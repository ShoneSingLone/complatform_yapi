/* 
{
	port: "0000",
	adminAccount: "xxx@xxx.xxx",
	db: {
		servername: "xx.xx.xx.xx",
		DATABASE: "xx",
		port: "xxxx",
		user
	},
	mail: {
		enable: true,
		host: "smtp.qq.com",
		port: 0,
		from: "xxxxxx",
		auth: {
			user: "xxxxxxx",
			pass: "xxxxxx"
		}
	}
};
*/

global.WEBCONFIG = require("../../../yapiConfigs");

module.exports = async () => {
	require("../utils/xU");
	require("../utils/commons");
	await require("../utils/db").setYapiMongooseAsync();
};
