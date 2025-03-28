/*
{

	isCloseRegister:false,
	passsalt:"xxxxxx",
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

/**
 *
 */

module.exports = async function () {
	const path = require("path");
	const { Module } = require("module");
	/* ********************************************************************************  */
	/* require 如果没有用相对路径，就优先从node_modules里面找，找不到就从NODE_PATH 开始找 */
	const NODE_PATH = path.resolve(__dirname, "../..");
	process.env.NODE_PATH = NODE_PATH;
	Module._initPaths();
	/* 然后可以使用root下的文件名开头 */
	/*  */
	/*
	 * 享受TS类型检查便利，不用TSC转译
	 * commonJS不以后缀为判断依据
	 * "type":"module"则严格需要后缀
	 */
	require.extensions[".ts"] = require.extensions[".js"];
	/* ********************************************************************************  */
	const yapi_configs = require("../../../yapi_configs.js");
	const { isUsePlugin } = require("../plugins/isUsePlugin");
	yapi_configs.isUsePlugin = isUsePlugin;
	/* global.yapi_configs  */
	global.yapi_configs = yapi_configs;

	/*上面的代码运行之后，server就可以直接访问到*/
	require("server/utils/xU");
	await require("server/utils/db")();
};
