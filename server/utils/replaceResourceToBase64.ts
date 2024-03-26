const path = require("path");
const fs = require("fs");

async function main() {
	/* 将以前的资源文件，转换成base64 */
	await require("./onFirstLine.ts")();
	const { TARGET_PREFIX } = xU;

	const { ModelResource } = require("../models/Resource");

	let resourceInst = orm.Resource;

	const res = await resourceInst.findAll();
	await Promise.all(
		Object.entries(res).map(async ([key, targetResource]) => {
			try {
				if (!targetResource.basecode) {
					let targetPath = path.resolve(
						`${TARGET_PREFIX}${targetResource.path}`
					);
					const isExist = xU.fileExist(targetPath);
					if (isExist) {
						console.log("targetPath", targetPath);
						var bitmap = fs.readFileSync(targetPath);
						const basecode = new Buffer(bitmap).toString("base64");
						await resourceInst.update(targetResource._id, { basecode });
					}
				}
			} catch (error) {
				console.error(error);
			}
		})
	);

	throw new Error("nothing just exit");
}

main();
