const path = require("path");
const { Module } = require("module");
/* ********************************************************************************  */
/* require 如果没有用相对路径，就优先从node_modules里面找，找不到就从NODE_PATH 开始找 */
const NODE_PATH = path.resolve(__dirname, "../..");
process.env.NODE_PATH = NODE_PATH;
Module._initPaths();
/* 然后可以使用root下的文件名开头 */
/*
* 享受TS类型检查便利，不用TSC转译
* commonJS不以后缀为判断依据
* "type":"module"则严格需要后缀
*/
require.extensions[".ts"] = require.extensions[".js"];
/* ********************************************************************************  */

global.WEBCONFIG = require("../../../yapiConfigs");

module.exports = async () => {
	require("server/utils/xU");
	require("server/utils/commons");
	await require("server/utils/db")();
};

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
