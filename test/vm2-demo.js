const { NodeVM } = require("vm2");

// 创建一个受限的沙箱环境
const vm = new NodeVM({
	// 限制可用的 Node.js 模块
	require: {
		external: false, // 禁止加载外部模块
		builtin: ["fs", "path"], // 允许使用的内置模块（示例中仅允许 fs 和 path）
		root: "./" // 模块根路径
	},
	// 定义沙箱内可用的全局变量
	sandbox: {
		console: console, // 允许访问 console（可选）
		__dirname: __dirname, // 提供当前目录信息（可选）
		// 可以添加自定义工具函数
		// 定义回调函数
		resolve: data => {
			console.log("沙箱返回数据:", data);
		}
	},
	// 限制资源使用
	timeout: 1000, // 执行超时时间（毫秒）
	memoryLimit: 128 // 最大内存使用（MB）
});

// 不受const { NodeVM } = require('vm2');

// 沙箱代码（异步示例）
const untrustedCode = `
  // 模拟异步操作
  setTimeout(() => {
    // 调用外部传递的回调函数
    resolve({
      asyncData: '异步数据',
      timestamp: Date.now()
    });
  }, 1000);
`;

vm.run(untrustedCode); // 执行后1秒输出: 沙箱返回数据: { asyncData: '异步数据', timestamp: ... }
