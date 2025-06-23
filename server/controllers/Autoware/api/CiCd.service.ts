const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const { _n } = require("@ventose/utils-node");
const { TARGET_PREFIX } = xU;
const { spawn } = require("child_process");

module.exports = {
	async initRepo({ git_repo, uid }) {
		try {
			const currentSocket = global.APP.socket.yapi.connections.get(uid);
			const { git_address, username, password } = git_repo;
			const emit = msg => {
				try {
					currentSocket.emit(
						"clone_git_repo_terminal_output",
						`${msg.replace(TARGET_PREFIX, "❀")}`
					);
				} catch (error) {
					currentSocket.emit("clone_git_repo_terminal_output", msg);
				}
			};
			/* 修改状态为正在初始化 */
			git_repo.status = "initializing";
			await orm.GitRepo.update(git_repo);
			emit("正在初始化git仓库...");

			/* 根据日期生成仓库名称 */
			const repo_name = _n._.snakeCase(git_address);
			const gir_repo_root = path.join(TARGET_PREFIX, "git_repo", repo_name);
			/* 确保放代码的文件夹存在 */
			await _n.asyncSafeMakeDir(gir_repo_root);
			emit(`代码的文件夹已创建:\n${gir_repo_root}`);

			const cloneRepo = () => {
				// 配置仓库信息和认证信息
				// const git_address = "https://github.com/username/repo.git";
				// const username = "your_username";
				// const password = "your_password";
				// const gir_repo_root = "./local-repo";

				// 构建带有认证信息的 URL
				const authUrl = git_address.replace(
					"https://",
					`https://${username}:${password}@`
				);

				emit(`克隆仓库地址: \n${authUrl}`);

				// 执行克隆命令
				const gitClone = spawn("git", ["clone", authUrl, gir_repo_root]);
				emit("开始克隆仓库...");

				gitClone.stdout.on("data", data => {
					emit(`${data}`);
				});
				gitClone.stderr.on("data", data => {
					emit(`${data}`);
				});

				// 监听命令执行结束
				gitClone.on("close", async code => {
					if (code !== 0) {
						emit(`克隆命令失败，退出码: ${code}`);
						return;
					}

					git_repo.status = "done";
					git_repo.gir_repo_root = gir_repo_root;
					await orm.GitRepo.update(git_repo);
					emit("克隆成功");

					const pullRepo = () => {
						// 可以继续执行其他命令
						const gitPull = spawn("git", ["pull"], { cwd: gir_repo_root });

						gitPull.stdout.on("data", data => {
							emit(`拉取输出: ${data}`);
						});

						gitPull.on("close", code => {
							if (code !== 0) {
								emit(`拉取命令失败，退出码: ${code}`);
								return;
							}

							emit("拉取成功");
						});
					};

					pullRepo();
				});
			};

			await cloneRepo();

			try {
				git_repo.status = "done";
				await orm.GitRepo.save(git_repo);
				throw new Error("初始化成功");
			} catch (err) {
				git_repo.status = "unset";
				await orm.GitRepo.update(git_repo);
				throw new Error(`初始化git仓库失败: ${err.message}`);
			}
		} catch (error) {
			xU.applog.error(error.message);
		}
	}
};
