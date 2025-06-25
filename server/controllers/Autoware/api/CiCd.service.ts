const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const { _n } = require("@ventose/utils-node");
const { TARGET_PREFIX } = xU;
const { socket_const } = require("../../../middleware/websocket");

async function initRepo({ git_repo, uid }) {
	const { git_address, username, password } = git_repo;
	/* 根据日期生成仓库名称 */
	const repo_name = _n._.snakeCase(git_address);
	const git_repo_root = path.join(TARGET_PREFIX, "git_repo", repo_name);

	const emit = msg => {
		const currentSocket = global.APP.socket.yapi.connections.get(uid);
		if (currentSocket) {
			try {
				currentSocket.emit(
					socket_const.clone_git_repo_terminal_output,
					`${msg.replace(TARGET_PREFIX, "❀")}`
				);
			} catch (error) {
				currentSocket.emit(socket_const.clone_git_repo_terminal_output, msg);
			}
		} else {
			console.log(msg);
		}
	};

	const cloneRepo = async () => {
		try {
			// 配置仓库信息和认证信息
			// const git_address = "https://github.com/username/repo.git";
			// const username = "your_username";
			// const password = "your_password";
			// const git_repo_root = "./local-repo";

			// 构建带有认证信息的 URL
			const authUrl = git_address.replace(
				"https://",
				`https://${username}:${password}@`
			);

			emit(`克隆仓库地址: \n${authUrl}`);

			// 执行克隆命令
			await xU.executeCommand(
				"git",
				["clone", authUrl, git_repo_root],
				{},
				emit
			);
			emit("克隆成功");
		} catch (error) {
			emit(`操作失败: ${error.message}`);
		}
	};

	const pullRepo = async () => {
		try {
			// 执行拉取命令
			await xU.executeCommand("git", ["pull"], { cwd: git_repo_root }, emit);
			emit("拉取成功");
		} catch (error) {
			emit(`操作失败: ${error.message}`);
		}
	};

	const set_repo_status = async status => {
		git_repo.status = status;
		await orm.GitRepo.update(git_repo);
		emit(`git仓库状态：${status}`);
	};

	const set_repo_initializing = () => set_repo_status("initializing");
	const set_repo_done = () => set_repo_status("done");

	try {
		/* 修改状态为正在初始化 */
		await set_repo_initializing();
		/* 确保放代码的文件夹存在 */
		await _n.asyncSafeMakeDir(git_repo_root);
		git_repo.git_repo_root = git_repo_root;
		emit(`代码的文件夹已创建:\n${git_repo_root}`);

		await cloneRepo();
		await pullRepo();
		await set_repo_done();
	} catch (error) {
		git_repo.status = "unset";
		await orm.GitRepo.update(git_repo);
	}
}

async function runTask({
	task: { _id: task_id, cicd_id },
	commit_hash,
	task_ref,
	payload
}) {
	let task_log = [];
	task_ref = task_ref.replace("refs/heads/", "");
	const emit = msg => {
		const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
		task_log.push(`- ***${time}*** ${msg}`);
		const currentSocket = global.APP.socket.yapi.socket;
		if (currentSocket) {
			/* to all online users */
			currentSocket.broadcast(socket_const.task_run_output, { task_id, msg });
		} else {
			console.log(msg);
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
	try {
		if (taskInstance) {
			if (taskInstance.task_status === "running") {
				return emit(`已有相同务在运行中，请勿重复提交任务`);
			} else {
				/* 更新状态 */
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
				task_ref,
				// task_status: "running",
				task_status: "failed",
				last_time: xU.time(),
				commit_hash
				// payload/*  */
			});
		}
		emit(`加入任务队列成功`);
		/* 运行脚本，记录日志 */
		/* task_id => cicd_id => git_repo_id */
		const [task] = await orm.CiCdTask.find({ _id: task_id });
		const [cicd] = await orm.CiCd.find({ _id: task.cicd_id });
		const [git_repo] = await orm.GitRepo.find({ _id: cicd.git_repo_id });
		const { git_repo_root } = git_repo;
		await xU.executeCommand(
			"git",
			["reset", "--hard", "HEAD"],
			{ cwd: git_repo_root },
			emit
		);
		emit(`工作台清空完毕，开始运行脚本...`);
		await xU.executeCommand(
			"git",
			["checkout", task_ref],
			{ cwd: git_repo_root },
			emit
		);
		await xU.executeCommand("git", ["pull"], { cwd: git_repo_root }, emit);
		throw new Error(`脚本执行失败！`);
		taskInstance.task_status = "success";
		taskInstance.task_log = task_log.join("\n");
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
