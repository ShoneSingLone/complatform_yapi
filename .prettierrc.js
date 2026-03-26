// Prettier 配置文件
// 参考文档：https://prettier.io/docs/en/options.html
module.exports = {
	// 每行代码的最大字符数，超过则换行
	printWidth: 100,
	// 使用双引号而非单引号
	singleQuote: false,
	// 使用制表符而非空格进行缩进
	useTabs: true,
	// 制表符的宽度（相当于4个空格）
	tabWidth: 4,
	// 在语句末尾添加分号
	semi: true,
	// 不使用尾随逗号（如对象、数组的最后一项）
	trailingComma: "none",
	// 箭头函数只有一个参数时省略括号
	arrowParens: "avoid",
	// JSX中使用双引号而非单引号
	jsxSingleQuote: false,
	// 标签的闭合括号与内容在同一行
	bracketSameLine: true,
	// 对象字面量的括号内添加空格（如 { foo: bar }）
	bracketSpacing: true,
	// 自动检测换行符类型（LF/CRLF）
	endOfLine: "auto",
	// HTML空白敏感度：根据CSS规则处理
	htmlWhitespaceSensitivity: "css",
	// 对象属性名只在必要时添加引号
	quoteProps: "as-needed",
	// 不需要文件头部有格式化指令才格式化
	requirePragma: false,
	// 不自动在文件头部插入格式化指令
	insertPragma: false,
	// Markdown文本保持原有换行
	proseWrap: "preserve",
	// Vue文件中脚本和样式标签缩进
	vueIndentScriptAndStyle: false,
	// 自动格式化嵌入在其他文件中的代码
	embeddedLanguageFormatting: "auto",
	// 针对特定文件类型的配置覆盖
	overrides: [
		{
			// Vue文件
			files: "*.vue",
			options: {
				// HTML空白敏感度：严格模式
				htmlWhitespaceSensitivity: "strict"
			}
		},
		{
			// TypeScript文件
			files: ["*.ts", "*.tsx"],
			options: {
				// 语句末尾添加分号
				semi: true,
				// 不使用尾随逗号
				trailingComma: "none",
				// 对象属性名只在必要时添加引号
				quoteProps: "as-needed"
			}
		},
		{
			// JavaScript文件
			files: ["*.js", "*.jsx"],
			options: {
				// 语句末尾添加分号
				semi: true,
				// 不使用尾随逗号
				trailingComma: "none",
				// 对象属性名只在必要时添加引号
				quoteProps: "as-needed"
			}
		},
		{
			// JSON文件
			files: "*.json",
			options: {
				// 制表符宽度为2
				tabWidth: 2,
				// 使用制表符缩进
				useTabs: true,
				// 对象属性名只在必要时添加引号
				quoteProps: "as-needed"
			}
		},
		{
			// Markdown文件
			files: "*.md",
			options: {
				// 每行最大字符数120
				printWidth: 120,
				// 总是换行以适应printWidth
				proseWrap: "always",
				// 制表符宽度为4
				tabWidth: 4
			}
		},
		{
			// CSS相关文件
			files: ["*.css", "*.less", "*.scss"],
			options: {
				// 每行最大字符数120
				printWidth: 120,
				// 制表符宽度为2
				tabWidth: 2,
				// 使用制表符缩进
				useTabs: true,
				// 语句末尾添加分号
				semi: true,
				// 括号内添加空格
				bracketSpacing: true,
				// 使用双引号
				singleQuote: false
			}
		},
		{
			// HTML文件
			files: "*.html",
			options: {
				// 每行最大字符数120
				printWidth: 120,
				// 制表符宽度为2
				tabWidth: 2,
				// 使用制表符缩进
				useTabs: true,
				// HTML空白敏感度：严格模式
				htmlWhitespaceSensitivity: "strict"
			}
		},
		{
			// YAML文件
			files: "*.yml",
			options: {
				// 缩进宽度为2
				tabWidth: 2,
				// 使用空格而非制表符
				useTabs: false
			}
		},
		{
			// .gitignore文件
			files: ".gitignore",
			options: {
				// 每行最大字符数100
				printWidth: 100,
				// 缩进宽度为2
				tabWidth: 2,
				// 使用空格而非制表符
				useTabs: false
			}
		},
		{
			// tsconfig.json文件
			files: "tsconfig.json",
			options: {
				// 制表符宽度为2
				tabWidth: 2,
				// 使用制表符缩进
				useTabs: true,
				// 对象属性名只在必要时添加引号
				quoteProps: "as-needed"
			}
		},
		{
			// Windows批处理文件
			files: "*.bat",
			options: {
				// 使用CRLF换行符
				endOfLine: "crlf"
			}
		}
	]
};
