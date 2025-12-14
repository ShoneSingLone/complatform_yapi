<style lang="less">
#CiCdProjects {
}
</style>
<template>
	<!-- 项目配置 -->
	<div id="CiCdProjects">
		<div class="page-header">
			<h1 class="page-title">项目配置</h1>
			<p class="page-subtitle">配置Git仓库和构建参数</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">Git仓库配置</h3>
			</div>
			<div class="card-content">
				<form id="projectForm">
					<div class="form-group">
						<label class="form-label">项目名称</label>
						<input
							type="text"
							class="form-input"
							id="projectName"
							placeholder="输入项目名称"
							value="frontend-app" />
					</div>

					<div class="form-group">
						<label class="form-label">Git仓库地址</label>
						<input
							type="url"
							class="form-input"
							id="gitUrl"
							placeholder="https://github.com/username/repo.git"
							value="https://github.com/example/frontend-app.git" />
					</div>

					<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
						<div class="form-group">
							<label class="form-label">默认分支</label>
							<input
								type="text"
								class="form-input"
								id="defaultBranch"
								placeholder="main"
								value="main" />
						</div>
						<div class="form-group">
							<label class="form-label">构建环境</label>
							<select class="form-select" id="buildEnv">
								<option value="node">Node.js</option>
								<option value="python">Python</option>
								<option value="java">Java</option>
								<option value="docker">Docker</option>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label class="form-label">构建脚本</label>
						<textarea
							class="form-input form-textarea"
							id="buildScript"
							placeholder="输入构建脚本...">
#!/bin/bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建项目
npm run build

# 打包产出物
tar -czf dist.tar.gz dist/</textarea
						>
					</div>

					<div class="form-group">
						<label class="form-label">环境变量</label>
						<textarea
							class="form-input form-textarea"
							id="envVars"
							placeholder="KEY=value"
							style="min-height: 80px">
NODE_ENV=production
API_URL=https://api.example.com
BUILD_VERSION=1.0.0</textarea
						>
					</div>

					<div style="display: flex; gap: 12px">
						<button type="submit" class="btn btn-primary">保存配置</button>
						<button
							type="button"
							class="btn btn-secondary"
							onclick="testConnection()">
							测试连接
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return { THIS_FILE_URL };
		}
	});
}
</script>
