const fs = require("fs");

(async function () {
	await require("./onFirstLine")();
	const { ModelResource } = require("../models/Resource");
	const path = require("path");

	let resourceInst = xU.orm(ModelResource);

	let TARGET_PREFIX = xU.path.join(
		xU.var.APP_ROOT_SERVER_DIR,
		xU.var.UPLOADS,
		xU.var.RESOURCE_ASSETS
	);


	const res = await resourceInst.findAll();
	await Promise.all(Object.entries(res).map(async ([key, targetResource]) => {
		try {
			if (!targetResource.basecode) {
				let targetPath = xU.path.resolve(`${TARGET_PREFIX}${targetResource.path}`);
				const isExist = xU.fileExist(targetPath);
				if (isExist) {
					console.log("targetPath", targetPath);
					var bitmap = fs.readFileSync(targetPath);
					const basecode = new Buffer(bitmap).toString('base64');
					await resourceInst.update(targetResource._id, { basecode });
				}
			}
		} catch (error) {
			console.error(error);
		}
	}));

	throw new Error("nothing just exit");
})();