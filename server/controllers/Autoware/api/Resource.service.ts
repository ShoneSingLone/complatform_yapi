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
 * @param fileOrDirPath 目标目录名或文件名。
 * @param relativePathArray 记录路径的数组，用于构建返回结果中的路径信息。
 * @returns 返回一个对象，包含文件或目录的类型、路径和名称；如果路径不存在或无法访问，则返回undefined；如果路径是音频文件，返回特定的音频信息。
 */
async function asyncResolvePathFileOrDir(fileOrDirPath, relativePathArray) {
	const absolutePath = path.resolve.apply(path, [
		...relativePathArray,
		fileOrDirPath
	]); // 将基础路径和目录名解析为绝对路径
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
		const type = getType(absolutePath); // 获取文件类型
		if (isAudioType(type)) {
			// 如果文件是音频类型
			// 此处注释掉的代码是获取音频记录的逻辑，但实际代码已被省略
			return {
				type: "audio",
				path: [...relativePathArray, fileOrDirPath],
				name: fileOrDirPath
			};
		}
		if (isVideoType(type)) {
			return {
				type: "video",
				path: [...relativePathArray, fileOrDirPath],
				name: fileOrDirPath
			};
		}
		asyncResolvePathFileOrDir.types[type] = type;
	}

	return null; // 如果不是目录也不是音频文件，则返回null
}
asyncResolvePathFileOrDir.types = {};

exports.asyncResolvePathFileOrDir = asyncResolvePathFileOrDir;

function isAudioType(type) {
	return (
		/^audio/.test(type) ||
		["audio/mpeg", "audio/x-flac", "audio/mp4"].includes(type)
	);
}

exports.isAudioType = isAudioType;
function isImageType(type) {}

exports.isImageType = isImageType;
function isVideoType(type) {
	return ["video/mp4"].includes(type);
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
