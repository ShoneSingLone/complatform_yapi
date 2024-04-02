const { iconv, fs } = require("../../common/utils");
var exec = require("child_process").exec;

const log = content => {
	content = iconv.decode(content, "gbk");
	return content.replace("\r", "").replace("\n", "");
};

const content = fs.readFileSync("../../server/app.ts", "utf8");

// var cmd = `pwd`;
var cmd = `dts-gen -e ${JSON.stringify(content)} -f test.d.ts`;
console.log("🚀cmd:\n", cmd);
const result = exec(cmd, { maxBuffer: 1024 * 2000, encoding: "gbk" });

result.stdout.on("data", function (data) {
	console.log(log(data));
});
result.stderr.on("data", function (data) {
	console.log(log(data));
});
result.on("close", function (code) {
	console.log("child process exited with code :" + code);
});
