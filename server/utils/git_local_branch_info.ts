const { exec } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

// 获取当前目录下的Git分支信息
async function getCurrentBranch(git_repo_root) {
	return new Promise((resolve, reject) => {
		exec(
			"git rev-parse --abbrev-ref HEAD",
			{ cwd: git_repo_root },
			(error, stdout, stderr) => {
				if (error) {
					reject(new Error(`获取分支信息失败: ${stderr}`));
					return;
				}
				resolve(stdout.trim());
			}
		);
	});
}

// 获取所有分支列表
async function getAllBranches(git_repo_root) {
	return new Promise((resolve, reject) => {
		exec("git branch -a", { cwd: git_repo_root }, (error, stdout, stderr) => {
			if (error) {
				reject(new Error(`获取分支列表失败: ${stderr}`));
				return;
			}

			const branches = stdout
				.split("\n")
				.map(branch => branch.trim())
				.filter(branch => branch !== "");

			resolve(branches);
		});
	});
}

async function pull(git_repo_root) {
	return new Promise(async (resolve, reject) => {
		exec("git pull", { cwd: git_repo_root }, (error, stdout, stderr) => {
			if (error) {
				reject(new Error(`pull失败: ${stderr}`));
				return;
			}
			resolve("pull成功");
		});
	});
}
// 获取远程分支列表
async function getRemoteBranches(git_repo_root) {
	return new Promise(async (resolve, reject) => {
		exec("git branch -r", { cwd: git_repo_root }, (error, stdout, stderr) => {
			if (error) {
				reject(new Error(`获取远程分支列表失败: ${stderr}`));
				return;
			}

			const branches = stdout
				.split("\n")
				.map(branch => branch.trim())
				.filter(branch => branch !== "" && !branch.includes("->"))
				.map(branch => branch.replace("origin/", ""));

			resolve(branches);
		});
	});
}

// 检查路径是否为有效的Git仓库
async function isGitRepository(git_repo_root) {
	try {
		await fs.access(path.join(git_repo_root, ".git"));
		return true;
	} catch (error) {
		return false;
	}
}

// 获取指定本地仓库的分支信息
async function async_get_local_repo_branch_info({ git_repo_root, is_pull }) {
	const resolvedPath = path.resolve(git_repo_root);

	if (!(await isGitRepository(resolvedPath))) {
		throw new Error(`路径 '${resolvedPath}' 不是一个有效的Git仓库`);
	}

	try {
		if (is_pull) {
			await pull(resolvedPath);
		}
		const [currentBranch, allBranches, remoteBranches] = await Promise.all([
			getCurrentBranch(resolvedPath),
			getAllBranches(resolvedPath),
			getRemoteBranches(resolvedPath)
		]);

		return {
			repositoryPath: resolvedPath,
			currentBranch,
			allBranches,
			remoteBranches,
			localBranches: allBranches
				.filter(branch => !branch.startsWith("remotes/"))
				.map(branch => branch.replace("* ", ""))
		};
	} catch (error) {
		console.error("获取分支信息失败:", error.message);
		throw error;
	}
}

// 示例用法
async function main() {
	try {
		if (process.argv.length < 3) {
			console.log("用法: node git_local_branch_info.js <本地仓库路径>");
			return;
		}

		const git_repo_root = process.argv[2];
		const branchInfo = await async_get_local_repo_branch_info(git_repo_root);

		console.log("\n分支信息:");
		console.log(`仓库路径: ${branchInfo.repositoryPath}`);
		console.log(`当前分支: ${branchInfo.currentBranch}`);

		console.log("\n所有分支:");
		branchInfo.allBranches.forEach(branch => console.log(branch));

		console.log("\n远程分支:");
		branchInfo.remoteBranches.forEach(branch => console.log(branch));

		console.log("\n本地分支:");
		branchInfo.localBranches.forEach(branch => console.log(branch));

		// 显示分支统计信息
		console.log(`\n分支统计:`);
		console.log(`  本地分支数量: ${branchInfo.localBranches.length}`);
		console.log(`  远程分支数量: ${branchInfo.remoteBranches.length}`);
		console.log(`  总分支数量: ${branchInfo.allBranches.length}`);
	} catch (error) {
		console.error("操作失败:", error.message);
		process.exit(1);
	}
}

module.exports = {
	async_get_local_repo_branch_info
};
