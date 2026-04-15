const fs = require("fs");
const path = require("path");
const { getType } = require("mime");

function returnBase64Body(basecode) {
	if (basecode.indexOf("base64") > -1) {
		return new Buffer(basecode.split("base64")[1], "base64");
	} else {
		return new Buffer(basecode, "base64");
	}
}
exports.returnBase64Body = returnBase64Body;

/**
 * 判断给定路径是文件还是目录，并返回对应信息
 * @param {Object} params - 参数对象
 * @param {string|Array} params.fileOrDirPath - 目标目录名或文件名，或目录名数组
 * @param {Array} params.relativePathArray - 记录路径的数组，用于构建返回结果中的路径信息
 * @param {string} params.search_key - 搜索关键词（可选）
 * @returns 返回一个数组，包含文件或目录的类型、路径和名称；如果路径不存在或无法访问，则返回空数组；如果路径是音频文件，返回特定的音频信息数组。
 */
async function asyncResolvePathFileOrDir({
	fileOrDirPath,
	relativePathArray = [],
	search_key = ""
}) {
	async function just_show_list_of_files_and_directories({
		fileOrDirPath,
		relativePathArray
	}) {
		const absolutePath = path.resolve.apply(path, [...relativePathArray, fileOrDirPath]); // 将基础路径和目录名解析为绝对路径
		let stat;
		try {
			stat = await fs.promises.stat(absolutePath); // 尝试获取绝对路径的文件状态
		} catch (error) {} // 忽略可能发生的错误，如果没有找到文件或目录，则stat将为undefined

		if (!stat) {
			return; // 如果无法获取文件状态，函数直接返回undefined
		}

		// 判断目标是目录还是文件，并返回相应的信息
		if (stat.isDirectory()) {
			return {
				type: "directory",
				path: [...relativePathArray, fileOrDirPath],
				name: fileOrDirPath
			};
		}
		if (stat.isFile()) {
			/* 排除.preview */
			if (absolutePath.includes(".preview")) {
				return null;
			}
			const type = getType(absolutePath); // 获取文件类型
			let fileType = "file";
			if (isAudioType(type)) {
				fileType = "audio";
			} else if (isVideoType(type)) {
				fileType = "video";
			} else if (isImageType(type)) {
				fileType = "img";
			}

			asyncResolvePathFileOrDir.types[type] = type;

			// 返回所有文件类型的信息
			return {
				type: fileType,
				path: [...relativePathArray, fileOrDirPath],
				name: fileOrDirPath
			};
		}

		return null; // 如果不是目录也不是文件，则返回null
	}

	async function search_list_of_files_and_directories({
		fileOrDirPath,
		relativePathArray,
		search_key = ""
	}) {
		let result = [];
		const safeSearchKey = String(search_key).toLowerCase();

		// 获取当前项信息
		const currentItem = await just_show_list_of_files_and_directories({
			fileOrDirPath,
			relativePathArray
		});

		if (!currentItem) {
			return result;
		}

		// 如果当前项名称包含搜索关键词，添加到结果中
		// 使用 toLowerCase 替代 _.lowerCase，以支持更准确的文件名搜索
		if (String(currentItem.name).toLowerCase().includes(safeSearchKey)) {
			result.push(currentItem);
		}

		// 如果是目录，递归处理其子项
		if (currentItem.type === "directory") {
			const absolutePath = path.resolve.apply(path, [...relativePathArray, fileOrDirPath]);
			let items = [];
			try {
				items = await fs.promises.readdir(absolutePath);
			} catch (error) {
				return result;
			}

			for (const item of items) {
				const subResults = await search_list_of_files_and_directories({
					fileOrDirPath: item,
					relativePathArray: [...relativePathArray, fileOrDirPath],
					search_key: safeSearchKey
				});
				result.push(...subResults);
			}
		}

		return result;
	}

	if (Array.isArray(fileOrDirPath)) {
		// 如果fileOrDirPath是数组，遍历处理每个路径
		let result = [];
		for (const path of fileOrDirPath) {
			const pathResult = await asyncResolvePathFileOrDir({
				fileOrDirPath: path,
				relativePathArray,
				search_key
			});
			result = [...result, ...pathResult];
		}
		// 搜索结果需要去重，因为递归过程中可能存在重复添加（例如目录匹配时）
		return xU._.uniqBy(result, item => JSON.stringify(item.path));
	} else if (search_key) {
		// 如果有search_key，使用search_list_of_files_and_directories函数
		return await search_list_of_files_and_directories({
			fileOrDirPath,
			relativePathArray,
			search_key
		});
	} else {
		// 如果没有search_key，使用just_show_list_of_files_and_directories函数
		const result = await just_show_list_of_files_and_directories({
			fileOrDirPath,
			relativePathArray
		});
		// 确保始终返回数组，并使用字符串化的 path 进行去重
		return xU._.uniqBy(result ? [result] : [], item => JSON.stringify(item.path));
	}
}
asyncResolvePathFileOrDir.types = {};

exports.asyncResolvePathFileOrDir = asyncResolvePathFileOrDir;

function isAudioType(type) {
	return /^audio/.test(type) || ["audio/mpeg", "audio/x-flac", "audio/mp4"].includes(type);
}

exports.isAudioType = isAudioType;
function isImageType(type) {
	return /^image/.test(type) || ["image/webp"].includes(type);
}

exports.isImageType = isImageType;

function isVideoType(type) {
	return /^video/.test(type) || ["video/mp4", "video/x-flv", "video/flv", "video/x-pn-realvideo", "application/vnd.rn-realmedia"].includes(type);
}

exports.isVideoType = isVideoType;

function scanResource() {
	let count = 0;

	async function handleFile({ filePath, parentPath = "", fileId = 0 }) {
		const name = path.basename(filePath);
	}
	/**
	 * 递归遍历文件夹
	 * @param {string} folderPath - 要遍历的文件夹路径
	 */
	async function scanFolder({ folderPath, parentPath = "", fileId = 0 }) {
		const name = path.dirname(folderPath);
		/* 创建文件夹 */
		let may_dir = await orm.Resource.getResourceByName(name, fileId);

		if (!may_dir) {
			const resourceInfo = {
				name: name,
				ext: "SYSTEM_DIR",
				/* 目录的path是虚拟path，文件的path是物理主机上的path */
				path: `${parentPath}/${name}`,
				type: "SYSTEM_DIR",
				size: 0,
				fileId: fileId || 0,
				uploadBy: 1,
				add_time: xU.time(),
				isdir: xU.var.FILE_DIR
			};
			may_dir = await orm.Resource.save(resourceInfo);
		}
		debugger;

		// 读取文件夹内容
		const items = fs.readdirSync(folderPath);

		let item;
		// 遍历所有文件和文件夹
		while ((item = items.shift())) {
			const fullPath = path.join(folderPath, item);
			const stats = fs.statSync(folderPath);

			if (stats.isDirectory()) {
				// 如果是文件夹，递归遍历
				await scanFolder({
					folderPath: fullPath,
					parentPath: folderPath,
					fileId: may_dir._id
				});
			} else {
				// 如果是文件，调用回调函数处理
				await handleFile(fullPath);
			}
		}
	}

	const absolutePath = path.resolve("E:\\books\\Library");
	console.log(`开始扫描文件夹: ${absolutePath}`);
	// 开始扫描
	try {
		scanFolder({ folderPath: absolutePath });
		console.log("扫描完成");
	} catch (error) {
		console.error("扫描过程中发生错误:", error.message);
	}
}
