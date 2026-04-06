const fs = require("fs").promises;
const path = require("path");

// 目标目录（当前目录）
const targetDir = __dirname;

async function renameYapiFolders() {
	try {
		// 读取目录 + 判断文件类型
		const items = await fs.readdir(targetDir, { withFileTypes: true });
		let count = 0;

		for (const item of items) {
			const itemName = item.name;

			// ✅ 只处理：文件夹 + 名称以 yapi- 开头（不区分大小写）
			if (item.isDirectory() && /^yapi-/i.test(itemName)) {
				count++;
				const oldPath = path.join(targetDir, itemName);

				// 替换前缀：yapi- → xspace-（不区分大小写）
				const newName = itemName.replace(/^yapi-/i, "xspace-");
				const newPath = path.join(targetDir, newName);

				// ✅ 原生 fs 只需要这一句重命名
				await fs.rename(oldPath, newPath);

				console.log(`✅ 重命名成功：${itemName} → ${newName}`);
			}
		}

		console.log(`\n🎉 全部完成！共重命名 ${count} 个文件夹`);
	} catch (err) {
		console.error("❌ 出错：", err.message);
	}
}

// 执行
renameYapiFolders();
