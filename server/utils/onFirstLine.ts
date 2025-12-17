/*
{
	//资源管理器 根目录（共享目录）
	RESOURCE_ASSETS_REMOTE: ["********"],
	//云盘物理目录
	CLOUD_DISK_ROOT: "********",
	cors: {
		allow: ["*****"]
	},
	port: "3001",
	adminAccount: "****",
	db: {
		servername: "****",
		DATABASE: "****",
		port: "****"
	},
	mail: {
		enable: true,
		host: "smtp.qq.com",
		port: **,
		from: "****",
		auth: {
			user: "****",
			pass: "*****"
		}
	},
	baiduTranslate: {
		appId: "****",
		appKey: "*******"
	},
	proxyOptions: {
		targets: {
			"(.*)/dev-api/(.*)": {
				target: `*******`,
				secure: false,
				changeOrigin: true,
				pathRewrite(url, req) {
					const [_, target] = url.split("/dev-api");
					return `/prod-api${target}`;
				}
			}
		}
	}
}
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
