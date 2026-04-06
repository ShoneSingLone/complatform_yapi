const fs = require("fs").promises;
const path = require("path");

// 目标目录（当前目录）
const targetDir = __dirname;

async function renameYapiFolders() {
	try {
		// 读取目录下所有文件/文件夹
		const items = await fs.readdir(targetDir, { withFileTypes: true });
		let count = 0;

		for (const item of items) {
			// 只处理：是文件夹 + 名字以 yapi- 开头
			if (item.isDirectory() && item.name && item.name.startsWith("yapi-")) {
				count++;
				const oldPath = path.join(targetDir, item.name);
				// 新名字：可自行修改
				const newName = `xspace-${count}`;
				const newPath = path.join(targetDir, newName);

				// 检查新路径是否已存在
				try {
					await fs.access(newPath);
					console.log(`⚠️  跳过：新文件夹 ${newName} 已存在`);
					continue;
				} catch {
					// 新路径不存在，可以重命名
				}

				await fs.rename(oldPath, newPath);
				console.log(`✅ 重命名成功：${item.name} → ${newName}`);
			}
		}

		console.log(`\n🎉 全部完成！共重命名 ${count} 个文件夹`);
	} catch (err) {
		console.error("❌ 出错：", err.message);
	}
}

// 执行
renameYapiFolders();
