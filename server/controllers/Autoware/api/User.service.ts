/**
 * 根据名字生成SVG格式的头像
 * @param {string} name - 输入的名字
 * @param {number} size - 头像尺寸（默认100x100）
 * @returns {string} SVG格式的头像字符串
 */
function generateAvatarSvg(name, size = 100) {
	// 处理空名称情况
	if (!name) name = "用户";

	// 计算名字的哈希值，用于生成一致的颜色
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}

	// 生成基于哈希的HSL颜色（更美观）
	const hue = Math.abs(hash % 360);
	const saturation = 65 + Math.abs((hash >> 8) % 20); // 65-85%
	const lightness = 45 + Math.abs((hash >> 16) % 20); // 45-65%

	// 确保文字颜色与背景对比度高
	const textColor = lightness > 50 ? "#333333" : "#ffffff";

	// 处理用户名显示
	let displayText = name;
	let lines = [];
	let fontSize;
	
	// 检测是否需要换行显示
	if (name.length <= 2) {
		// 1-2个字符：单行显示，大字体
		lines = [name];
		fontSize = size / 2.5;
	} else if (name.length <= 4) {
		// 3-4个字符：单行显示，中等字体
		lines = [name];
		fontSize = size / 3.5;
	} else if (name.length <= 6) {
		// 5-6个字符：单行显示，较小字体
		lines = [name];
		fontSize = size / 5;
	} else if (name.length <= 10) {
		// 7-10个字符：考虑分两行显示
		// 尝试在中间位置分割
		const midPoint = Math.ceil(name.length / 2);
		lines = [name.substring(0, midPoint), name.substring(midPoint)];
		fontSize = size / 5;
	} else {
		// 超过10个字符：分多行显示
		// 每行最多5个字符
		for (let i = 0; i < name.length; i += 5) {
			lines.push(name.substring(i, Math.min(i + 5, name.length)));
		}
		fontSize = size / 6;
		// 如果行数过多，限制最多显示3行
		if (lines.length > 3) {
			lines = lines.slice(0, 3);
			// 最后一行添加省略号
			lines[2] = lines[2].substring(0, lines[2].length - 1) + "...";
		}
	}

	// 构建渐变背景
	const gradientId = `grad-${Math.abs(hash).toString(16).substring(0, 6)}`;
	const gradientAngle = hash % 360;
	const secondHue = (hue + 40) % 360;

	// 构建SVG字符串（带渐变和圆角）
	let textElements = '';
	
	// 计算多行文本的垂直位置
	const lineHeight = fontSize * 1.2; // 行高为字体大小的1.2倍
	const totalHeight = lines.length * lineHeight;
	const startY = (size - totalHeight) / 2 + fontSize / 2;
	
	// 为每行文本创建一个text元素
	lines.forEach((line, index) => {
		const yPos = startY + index * lineHeight;
		textElements += `
    <text x="${size / 2}" y="${yPos}" 
          font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold"
          text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${line}</text>`;
	});
	
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="hsl(${hue}, ${saturation}%, ${lightness}%)" />
            <stop offset="100%" stop-color="hsl(${secondHue}, ${saturation}%, ${lightness - 10}%)" />
        </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size * 0.2}" ry="${size * 0.2}" fill="url(#${gradientId})"/>${textElements}
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
