/**
 * 根据名字生成SVG格式的头像
 * @param {string} name - 输入的名字
 * @param {number} size - 头像尺寸（默认100x100）
 * @returns {string} SVG格式的头像字符串
 */
function generateAvatarSvg(name, size = 100) {
	// 计算名字的哈希值，用于生成一致的颜色
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	// 生成基于哈希的RGB颜色
	const r = (hash & 0xff0000) >> 16;
	const g = (hash & 0x00ff00) >> 8;
	const b = hash & 0x0000ff;

	// 确保颜色不太暗，提高文字可读性
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	const textColor = brightness > 125 ? "#000000" : "#ffffff";

	// 获取名字首字母（支持中文名字取第一个字符）
	const initial = name.charAt(0).toUpperCase();

	// 构建SVG字符串
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="rgb(${r}, ${g}, ${b})"/>
    <text x="${size / 2}" y="${
		size / 2
	}" font-family="Arial, sans-serif" font-size="${size / 2}" 
          text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${initial}</text>
</svg>`;
}

/**
 * 将SVG转换为base64编码
 * @param {string} svg - SVG字符串
 * @returns {string} base64编码的SVG
 */
function svgToBase64(svg) {
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// 示例使用
// if (require.main === module) {
// 	const names = ["张三", "李四", "王五", "Alice", "Bob"];

// 	names.forEach(name => {
// 		const svg = generateAvatarSvg(name, 200);
// 		const base64Svg = svgToBase64(svg);

// 		console.log(`SVG头像 (${name}):`);
// 		console.log(base64Svg.substring(0, 100) + "...");

// 		// 保存到文件
// 		const fs = require("fs");
// 		fs.writeFileSync(`${name}.svg`, svg);
// 		console.log(`已保存 ${name}.svg`);
// 	});
// }

module.exports = { generateAvatarSvg, svgToBase64 };
