const { _n } = require("@ventose/utils-node");

async function getInterfaceInfo(app) {
	try {
		const [dirs, files] = await _n.asyncAllDirAndFile([
			xU.path.resolve(xU.var.APP_ROOT_SERVER_DIR, "controllers")
		]);
		const autoControllers = _n.reduce(
			files,
			(target, file) => {
				const fileName = xU.path.basename(file);
				const [_, controllerName] =
					String(fileName).match(/^Auto(.*).js/) || [];
				if (controllerName) {
					target.push([file, controllerName, _n.snakeCase(controllerName)]);
				}
				return target;
			},
			[]
		);
		console.log(autoControllers);
		let info,
			CONTROLLERS = [];
		while ((info = autoControllers.pop())) {
			const controller = require(info[0]);
			_n.each(controller, (info, path) => {
				console.log(path, info);
			});
		}
	} catch (error) {
		console.error(error);
	}
}

module.exports = getInterfaceInfo;
