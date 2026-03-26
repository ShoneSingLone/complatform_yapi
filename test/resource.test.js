import test from "ava";

// 模拟目录结构
const mockDirectoryStructure = {
	"": ["dir1", "file1.txt"],
	dir1: ["dir2", "file2.txt"],
	dir2: ["testfile3.txt"]
};

// 模拟文件状态
function mockStat(path) {
	const isDir = mockDirectoryStructure[path] !== undefined;
	return {
		isDirectory: () => isDir,
		isFile: () => !isDir
	};
}

// 模拟读取目录
async function mockReadDir(path) {
	return mockDirectoryStructure[path] || [];
}

// 模拟 asyncResolvePathFileOrDir 函数
async function mockAsyncResolvePathFileOrDir(item, pathArray) {
	if (item.includes(".")) {
		// 模拟非媒体文件返回 null
		return null;
	} else {
		// 模拟目录返回对象
		return {
			type: "directory",
			path: [...pathArray, item],
			name: item
		};
	}
}

// 递归搜索函数（核心逻辑，从Resource.ts复制并修改）
async function recursiveSearch(currentPath, currentPathArray, searchKey) {
	let result = [];
	try {
		// 读取当前目录内容
		const items = await mockReadDir(currentPath);

		// 处理目录中的每个项
		for (const item of items) {
			const itemPath = currentPath ? `${currentPath}/${item}` : item;
			const itemPathArray = [...currentPathArray, item];

			// 获取文件/目录状态
			const stat = mockStat(itemPath);

			if (stat.isDirectory()) {
				// 如果是目录，递归搜索
				const dirResult = await mockAsyncResolvePathFileOrDir(item, currentPathArray);
				if (dirResult) {
					// 检查目录名是否匹配搜索关键词
					const dirNameLower = dirResult.name.toLowerCase();
					if (dirNameLower.includes(searchKey)) {
						result.push(dirResult);
					}
				}
				// 递归搜索子目录
				const subDirResults = await recursiveSearch(itemPath, itemPathArray, searchKey);
				result = [...result, ...subDirResults];
			} else if (stat.isFile()) {
				// 如果是文件，检查是否匹配
				const fileNameLower = item.toLowerCase();
				if (fileNameLower.includes(searchKey)) {
					result.push({
						type: "file",
						path: itemPathArray,
						name: item
					});
				}
			}
		}
	} catch (error) {
		// 忽略无法访问的目录
		console.error("Error in recursive search:", error.message);
	}
	return result;
}

// 测试用例
test("test recursive search with 'file' keyword", async t => {
	const result = await recursiveSearch("", [], "file");
	t.is(result.length, 3);

	const resultNames = result.map(item => item.name);
	t.true(resultNames.includes("file1.txt"));
	t.true(resultNames.includes("file2.txt"));
	t.true(resultNames.includes("testfile3.txt"));
});

test("test recursive search with 'test' keyword", async t => {
	const result = await recursiveSearch("", [], "test");
	t.is(result.length, 1);
	t.is(result[0].name, "testfile3.txt");
});

test("test recursive search with 'dir' keyword", async t => {
	const result = await recursiveSearch("", [], "dir");
	t.is(result.length, 2);

	const resultNames = result.map(item => item.name);
	t.true(resultNames.includes("dir1"));
	t.true(resultNames.includes("dir2"));
});

test("test recursive search with non-existent keyword", async t => {
	const result = await recursiveSearch("", [], "nonexistent");
	t.is(result.length, 0);
});

test("test recursive search with empty keyword", async t => {
	const result = await recursiveSearch("", [], "");
	t.is(result.length, 0);
});

test("test recursive search from subdirectory", async t => {
	const result = await recursiveSearch("dir1", ["dir1"], "file");
	t.is(result.length, 2);

	const resultNames = result.map(item => item.name);
	t.true(resultNames.includes("file2.txt"));
	t.true(resultNames.includes("testfile3.txt"));
});
