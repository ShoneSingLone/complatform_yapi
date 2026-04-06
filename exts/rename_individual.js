const fs = require("fs").promises;
const path = require("path");

// 目标目录（当前目录）
const targetDir = __dirname;

async function renameYapiFolders() {
	try {
		// 读取目录下所有文件/文件夹
		const items = await fs.readdir(targetDir, { withFileTypes: true });
		let count = 0;

		// 过滤出以 yapi- 开头的文件夹
		const yapiFolders = items.filter(item => item.isDirectory() && item.name && item.name.startsWith("yapi-"));

		console.log(`Found ${yapiFolders.length} yapi-* folders`);

		for (const item of yapiFolders) {
			count++;
			const oldPath = path.join(targetDir, item.name);
			const newName = `xspace-${count}`;
			const newPath = path.join(targetDir, newName);

			console.log(`
Attempting to rename: ${item.name} → ${newName}`);

			// 检查新路径是否已存在
			try {
				await fs.access(newPath);
				console.log(`⚠️  Skipped: New folder ${newName} already exists`);
				continue;
			} catch {
				// 新路径不存在，可以重命名
			}

			try {
				await fs.rename(oldPath, newPath);
				console.log(`✅ Success: ${item.name} → ${newName}`);
			} catch (renameErr) {
				console.error(`❌ Error renaming ${item.name}:`, renameErr.message);
				
				// 尝试获取更详细的信息
				try {
					const stats = await fs.stat(oldPath);
					console.log(`Folder stats:`, stats);
				} catch (statErr) {
					console.error(`❌ Error getting stats:`, statErr.message);
				}
			}
		}

		console.log(`\n🎉 All done! Processed ${count} folders`);
	} catch (err) {
		console.error("❌ Fatal error:", err.message);
	}
}

// 执行
renameYapiFolders();
