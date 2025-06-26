const { NodeVM } = require("vm2");
const { getType } = require("mime");
const adm_zip = require("adm-zip");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const { _n } = require("@ventose/utils-node");
const { TARGET_PREFIX } = xU;
const { socket_const } = require("../../../middleware/websocket");

const auth_url = ({ git_address, username, password }) =>
	git_address
		.replace("https://", `https://${username}:${password}@`)
		.replace("http://", `http://${username}:${password}@`);

async function vmRun(code, options = {}) {
	options = options || {};
	const sandbox = options.sandbox || {};
	const _require = options.require || {};
	const timeout = options.timeout || 1000; // 执行超时时间（毫秒）
	const memoryLimit = options.memoryLimit || 128; // 最大内存使用（MB）
	return new Promise((resolve, reject) => {
		const vm = new NodeVM({
			// 限制可用的 Node.js 模块
			require: xU._.merge(
				{
					external: false, // 禁止加载外部模块
					builtin: [], // 允许使用的内置模块（示例中仅允许 fs 和 path）
					root: "./" // 模块根路径
				},
				_require
			),
			// 定义沙箱内可用的全局变量
			sandbox: xU._.merge(
				{
					// 允许访问 console（可选）
					// 提供当前目录信息（可选）
					// 可以添加自定义工具函数
					// 定义回调函数
					VM_REJECT: reject,
					VM_RESOLVE: resolve
				},
				sandbox
			),
			// 限制资源使用
			timeout,
			memoryLimit
		});
		vm.run(code);
	});
}
async function initRepo({ git_repo, uid }) {
	xU.applog.info("[initRepo] 开始初始化仓库，参数:", { git_repo, uid });

	const { git_address, username } = git_repo;
	xU.applog.info("[initRepo] 从git_repo中提取配置:", { git_address, username });

	const AUTH_URL = auth_url(git_repo);

	/* 根据日期生成仓库名称 */
	const repo_name = _n._.snakeCase(git_address);
	const git_repo_root = path.join(TARGET_PREFIX, "git_repo", repo_name);
	xU.applog.info("[initRepo] 生成仓库名称和路径:", {
		repo_name,
		git_repo_root
	});

	const emit = msg => {
		const currentSocket = global.APP.socket.yapi.connections.get(uid);
		if (currentSocket) {
			try {
				currentSocket.emit(
					socket_const.clone_git_repo_terminal_output,
					`${msg.replace(TARGET_PREFIX, "❀")}`
				);
				xU.applog.info("[emit] 通过socket发送消息:", msg);
			} catch (error) {
				currentSocket.emit(socket_const.clone_git_repo_terminal_output, msg);
				console.error("[emit] 发送格式化消息失败，使用原始消息:", msg, error);
			}
		} else {
			xU.applog.info("[emit] 无可用socket连接，直接打印消息:", msg);
		}
	};

	const exeCmdCloneRepo = async () => {
		xU.applog.info("[exeCmdCloneRepo] 开始克隆仓库");
		try {
			// 配置仓库信息和认证信息
			xU.applog.info("[exeCmdCloneRepo] 构建认证URL:", AUTH_URL);

			emit(`克隆仓库地址: \n${git_address}`);

			// 执行克隆命令
			xU.applog.info(
				"[exeCmdCloneRepo] 执行命令: git clone",
				AUTH_URL,
				git_repo_root
			);
			await xU.executeCommand(
				"git",
				["clone", AUTH_URL, git_repo_root],
				{},
				emit
			);
			xU.applog.info("[exeCmdCloneRepo] 仓库克隆成功");
			emit("克隆成功");
		} catch (error) {
			console.error("[exeCmdCloneRepo] 克隆失败:", error);
			emit(`操作失败: ${error.message}`);
		}
	};

	const exeCmdPullRepo = async () => {
		xU.applog.info("[pullRepo] 开始拉取仓库更新");
		try {
			xU.applog.info("[pullRepo] 执行命令: git pull");
			await xU.executeCommand(
				"git",
				["pull", AUTH_URL],
				{ cwd: git_repo_root },
				emit
			);
			xU.applog.info("[pullRepo] 仓库拉取成功");
			emit("拉取成功");
		} catch (error) {
			console.error("[pullRepo] 拉取失败:", error);
			emit(`操作失败: ${error.message}`);
			throw error; // 确保错误向上传播
		}
	};

	const set_repo_status = async status => {
		xU.applog.info("[set_repo_status] 更新仓库状态:", status);
		git_repo.status = status;
		await orm.GitRepo.update(git_repo);
		emit(`git仓库状态：${status}`);
		xU.applog.info("[set_repo_status] 状态更新成功");
	};

	const set_repo_initializing = () => set_repo_status("initializing");
	const set_repo_done = () => set_repo_status("done");

	try {
		xU.applog.info("[initRepo] 修改状态为正在初始化");
		/* 修改状态为正在初始化 */
		await set_repo_initializing();

		xU.applog.info("[initRepo] 确保放代码的文件夹存在");
		/* 确保放代码的文件夹存在 */
		await _n.asyncSafeMakeDir(git_repo_root);
		git_repo.git_repo_root = git_repo_root;
		xU.applog.info("[initRepo] 代码文件夹创建成功:", git_repo_root);
		emit(`代码的文件夹已创建:\n${git_repo_root}`);

		xU.applog.info("[initRepo] 开始执行克隆操作");
		await exeCmdCloneRepo();

		xU.applog.info("[initRepo] 开始执行拉取操作");
		// 执行拉取命令（注意：这里需要指定cwd为仓库目录）
		await exeCmdPullRepo();
		xU.applog.info("[initRepo] 拉取操作成功");
		emit("拉取成功");

		xU.applog.info("[initRepo] 修改状态为已完成");
		await set_repo_done();
		xU.applog.info("[initRepo] 仓库初始化流程全部完成");
	} catch (error) {
		console.error("[initRepo] 初始化过程中发生错误:", error);
		git_repo.status = "unset";
		await orm.GitRepo.update(git_repo);
		xU.applog.info("[initRepo] 已将仓库状态重置为unset");
	}
}

async function runTask({ task, message, commit_hash, ref_trigger_this_job }) {
	const { _id: task_id, cicd_id, task_action, task_output_type } = task;
	try {
		let task_log = [];
		const emit = msg => {
			const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
			task_log.push(`- ***${time}*** ${msg}`);
			const currentSocket = global.APP.socket.yapi.socket;
			if (currentSocket) {
				/* to all online users */
				currentSocket.broadcast(socket_const.task_run_output, { task_id, msg });
			} else {
				xU.applog.info(msg);
			}
		};

		/*  */
		/* TODO:执行定时任务 */

		/* 判断参数是否完全一样 */
		let [taskInstance] = await orm.CiCdTaskQueue.find({
			task_id,
			/* task_action, */
			commit_hash
		});
		emit("查找是否已有作业");
		if (taskInstance) {
			if (taskInstance.task_status === "running") {
				return emit(`已有相同务在运行中，请勿重复提交任务`);
			} else {
				/* 更新状态 */
				// taskInstance.task_status = "failed";
				taskInstance.task_status = "running";
				await orm.CiCdTaskQueue.upsert(taskInstance);
			}
		} else {
			/* 如果没有任务正在运行，先在队列中添加任务 */
			taskInstance = await orm.CiCdTaskQueue.upsert({
				task_id,
				/* 查找列表需要查找 */
				cicd_id,
				/* task_action, */
				task_ref: ref_trigger_this_job,
				// task_status: "running",
				task_status: "failed",
				last_time: xU.time(),
				message,
				commit_hash
			});
		}
		emit(`加入任务队列成功`);
		/* 运行脚本，记录日志 */
		/* task_id => cicd_id => git_repo_id */
		const [cicd] = await orm.CiCd.find({ _id: task.cicd_id });
		const [git_repo] = await orm.GitRepo.find({ _id: cicd.git_repo_id });
		const { git_repo_root, git_address } = git_repo;
		const AUTH_URL = auth_url(git_repo);

		const ExecCmdOnRepoRoot = (command, args) =>
			xU.executeCommand(command, args, { cwd: git_repo_root }, emit);

		await ExecCmdOnRepoRoot("git", ["reset", "--hard", "HEAD"]);

		emit(`工作台清空完毕`);
		// emit(`开始安装依赖...`);
		// await ExecCmdOnRepoRoot("pnpm ", ["i"]);
		// emit(`安装依赖完成，开始运行脚本...`);
		emit(`开始运行脚本...`);

		await ExecCmdOnRepoRoot("git", ["checkout", ref_trigger_this_job]);

		emit(`切换到${ref_trigger_this_job}分支成功，开始拉取最新代码...`);

		await ExecCmdOnRepoRoot("git", ["pull", AUTH_URL]);

		emit(`拉取最新代码成功，开始切换到${commit_hash}提交...`);

		await ExecCmdOnRepoRoot("git", ["reset", "--hard", commit_hash]);
		if (task_output_type === "ARCHIVE_FILE") {
			/* TODO: 打包文件,目前以约定的方式 */
			const getTargetDir = new Function("return " + task_action);
			const TargetDirArray = await vmRun(
				`
			try {
				const TargetDirArray = getTargetDir();
				console(TargetDirArray)
				if (_.every(TargetDirArray,validateFolderConfig)) {
					console(TargetDirArray)
					VM_RESOLVE(TargetDirArray);
				}
				VM_RESOLVE([]);
			} catch (error) {
				VM_REJECT(error);
			}
				`,
				{
					sandbox: {
						getTargetDir,
						_: xU._,
						console: xU.applog.info,
						validateFolderConfig(obj) {
							// 获取对象所有属性名并排序
							const keys = Object.keys(obj).sort();
							// 定义合法属性名并排序
							const validKeys = ["source", "target"].sort();

							// 比较属性名数组是否完全一致
							return (
								keys.length === validKeys.length &&
								keys.every((key, index) => key === validKeys[index])
							);
						}
					}
				}
			);

			emit(TargetDirArray);

			const repo_name = _n._.snakeCase(git_address);
			const git_repo_archive_path = path.join(
				TARGET_PREFIX,
				"git_repo_archive",
				repo_name
			);
			_n.asyncSafeMakeDir(git_repo_archive_path);

			var zip = new adm_zip();
			const archive_name = commit_hash;
			xU._.each(TargetDirArray, ({ source, target }) => {
				zip.addLocalFolder(path.resolve(git_repo_root, source), target);
			});
			const archive_path = `${git_repo_archive_path}/${archive_name}.zip`;
			zip.writeZip(archive_path);

			const fileBlob = fs.readFileSync(archive_path);
			const md5 = xU.SparkMD5.ArrayBuffer.hash(fileBlob);
			const stat = await fs.promises.stat(archive_path);

			const ext = xU.path.extname(archive_path);
			const params = {
				name: xU.path.basename(archive_path),
				ext,
				size: stat.size,
				type: getType(archive_path) || ext || "unknow",
				useFor: "cicd/archive",
				md5,
				path: archive_path,
				uploadBy: "1",
				add_time: xU.time(),
				isdir: 0,
				fileId: 0
			};
			const resource = await orm.Resource.upsertCicdArchive(params);
			taskInstance.resource = resource;
			taskInstance.task_status = "success";
			taskInstance.task_log = task_log.join("\n");
			await orm.CiCdTaskQueue.upsert(taskInstance);
		} else {
			throw new Error("测试异常");
		}
	} catch (error) {
		console.error(error);
		emit(`作业执行失败，请检查！` + error.message);
		if (taskInstance) {
			taskInstance.task_status = "failed";
			taskInstance.task_log = task_log.join("\n");
			await orm.CiCdTaskQueue.upsert(taskInstance);
		}
	}
}

module.exports = {
	initRepo,
	runTask
};
