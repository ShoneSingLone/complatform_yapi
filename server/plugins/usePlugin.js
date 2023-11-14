const fs = require("fs");
const useAutowareRoutes = require("./pluginAutowareRoutes/pluginEntry");
const useBoundlessVue = require("./pluginBoundlessVue/pluginEntry");

/**
 * plugin 文件夹需要以plugin开头，文件中pluginEntry.js作为入口，module.exports 作为默认函数
 * @param {*} app
 */
module.exports = async app => {
	await useAutowareRoutes(app);
	await useBoundlessVue(app);
	return Promise.resolve();


	/*
	let dirs = await fs.promises.readdir(xU.path.resolve(__dirname));
	await Promise.all(
		dirs.map(async dirname => {
			const [pluginDirname, pluginName] =
				String(dirname).match(/^plugin(.*)$/) || [];
			if (pluginName && WEBCONFIG?.isUsePlugin?.[pluginName]) {
				const pluginPath = xU.path.resolve(
					__dirname,
					pluginDirname,
					"pluginEntry"
				);
				await require(pluginPath)(app);
			}
			return Promise.resolve();
		})
	);
 */};
