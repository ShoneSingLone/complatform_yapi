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
	const safeSearchKey = String(search_key || "").toLowerCase();

	async function getFileInfo(itemName, parentPathArray) {
		const absolutePath = path.resolve.apply(path, [...parentPathArray, itemName]);
		try {
			const stat = await fs.promises.stat(absolutePath);
			if (absolutePath.includes(".preview")) return null;

			let type = "file";
			if (stat.isDirectory()) {
				type = "directory";
			} else if (stat.isFile()) {
				const mimeType = getType(absolutePath);
				if (isAudioType(mimeType)) type = "audio";
				else if (isVideoType(mimeType)) type = "video";
				else if (isImageType(mimeType)) type = "img";
			} else {
				return null;
			}

			return {
				type,
				path: [...parentPathArray, itemName],
				name: path.basename(itemName),
				size: stat.size,
				mtime: stat.mtime
			};
		} catch (error) {
			return null;
		}
	}

	async function walk(itemName, parentPathArray, depth = 0) {
		const info = await getFileInfo(itemName, parentPathArray);
		if (!info) return [];

		let matches = [];
		// 如果有搜索词，检查名称是否匹配
		if (safeSearchKey) {
			if (info.name.toLowerCase().includes(safeSearchKey)) {
				matches.push(info);
			}
		} else {
			// 如果没有搜索词，直接添加（列表模式）
			matches.push(info);
		}

		// 如果是目录且（处于搜索模式 OR 是顶层列表项），则继续递归
		// 注意：列表模式通常只列出当前层级，但 asyncResolvePathFileOrDir 的原有逻辑在列表模式下是由外部循环调用的
		if (info.type === "directory" && safeSearchKey && depth < 10) {
			const absolutePath = path.resolve.apply(path, [...parentPathArray, itemName]);
			try {
				const items = await fs.promises.readdir(absolutePath);
				for (const subItem of items) {
					const subMatches = await walk(subItem, [...parentPathArray, itemName], depth + 1);
					matches.push(...subMatches);
				}
			} catch (error) {
				// 忽略读取失败的目录
			}
		}

		return matches;
	}

	let finalResults = [];
	const itemsToProcess = Array.isArray(fileOrDirPath) ? fileOrDirPath : [fileOrDirPath];

	for (const item of itemsToProcess) {
		const results = await walk(item, relativePathArray, 0);
		finalResults.push(...results);
	}

	// 统一去重处理
	return xU._.uniqBy(finalResults, item => JSON.stringify(item.path));
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
