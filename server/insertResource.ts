(async function () {
	await require("./utils/onFirstLine.ts")();
	const fs = require("fs");
	const path = require("path");
	let cacheMap = {};
	let files = [];
	const SparkMD5 = getSparkMD5(undefined);
	const { getType } = require("mime");
	const { _n } = require("@ventose/utils-node");

	const { INSERT_RESOURCE_ENTRY_PATH, INSERT_RESOURCE_ENTRY_PATH_PARENT } =
		yapi_configs;

	const uploadBy = "1";
	const SEP = path.sep;
	let count = 0;

	async function ensureDir(currentAbsolutePath) {
		let item = await (async () => {
			/* 1.缓存 */
			let _item = cacheMap[currentAbsolutePath];
			if (!_item) {
				const currentPath =
					currentAbsolutePath
						.split(INSERT_RESOURCE_ENTRY_PATH_PARENT)[1]
						.split(SEP)
						.join("/") || "root";

				const params = {
					path: currentPath,
					uploadBy
				};
				/* 2.数据库查询 */
				[_item] = await orm.Resource.search(params);
				if (!_item) {
					/* 3.创建目录 */
					// const name = currentAbsolutePath .split(INSERT_RESOURCE_ENTRY_PATH_PARENT)[1] .split(SEP);
					const name = path.basename(currentAbsolutePath);

					const parentItem = await (() => {
						const [, relativePath] = currentAbsolutePath.split(
							INSERT_RESOURCE_ENTRY_PATH_PARENT
						);
						const parent = relativePath.split(SEP);
						parent.pop();
						// const parent = path.dirname(currentAbsolutePath);
						if (parent.length === 0) {
							return { _id: "0" };
						} else {
							return ensureDir(
								`${INSERT_RESOURCE_ENTRY_PATH_PARENT}${parent.join(SEP)}`
							);
						}
					})();

					const resourceInfo = {
						name: name,
						ext: "SYSTEM_DIR",
						path: currentPath,
						type: "SYSTEM_DIR",
						size: 0,
						fileId: parentItem?._id || "0",
						uploadBy,
						add_time: xU.time(),
						isdir: xU.var.FILE_DIR
					};

					_item = await orm.Resource.save(resourceInfo);
				}
			}
			return _item;
		})();
		cacheMap[currentAbsolutePath] = { _id: item._id };
		return item;
	}

	async function insert_files({ filePath }) {
		let params;
		try {
			const [isExit] = await orm.Resource.search({
				path: filePath,
				uploadBy
			});

			if (isExit) {
				return;
			}

			const fileArray = filePath.split(SEP);
			const _p = _n.dropRight(fileArray).join(SEP);
			const parentItem = cacheMap[_p];

			if (!parentItem) {
			}
			const { _id: fileId } = parentItem;
			const fileBlob = fs.readFileSync(filePath);
			const md5 = SparkMD5.ArrayBuffer.hash(fileBlob);
			const stat = await fs.promises.stat(filePath);

			const ext = xU.path.extname(filePath);
			params = {
				name: xU.path.basename(filePath),
				ext,
				size: stat.size,
				type: getType(filePath) || ext || "unknow",
				useFor: "CloudDisk",
				md5,
				path: filePath,
				uploadBy,
				add_time: xU.time(),
				isdir: 0,
				fileId
			};
			await orm.Resource.save(params);
			console.log("file", params.name);
		} catch (error) {
			console.log(params, error);
		}
	}

	async function scanFolder({ folderPath }) {
		try {
			await ensureDir(folderPath);
			// 读取文件夹内容
			const items = fs.readdirSync(folderPath);

			let item;
			// 遍历所有文件和文件夹
			while ((item = items.shift())) {
				const subDirPath = path.join(folderPath, item);
				const stats = fs.statSync(subDirPath);

				if (stats.isDirectory()) {
					// 如果是文件夹，递归遍历
					await scanFolder({
						folderPath: subDirPath
					});
				} else {
					// 如果是文件，调用回调函数处理
					await insert_files({ filePath: subDirPath });
				}
			}
			throw new Error("EOF");
		} catch (error) {
			console.error(error);
		}
	}

	scanFolder({ folderPath: INSERT_RESOURCE_ENTRY_PATH });
})();
