<style lang="less">
#CiCdDashboard {
}
</style>
<template>
	<!-- 仪表板 -->
	<div id="CiCdDashboard" class="tab-content active">
		<div class="page-header">
			<h1 class="page-title">仪表板</h1>
			<p class="page-subtitle">持续集成系统概览</p>
		</div>

		<div
			style="
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: var(--ui-one);
				margin-bottom: var(--ui-one);
			">
			<div class="card">
				<div class="card-content" style="text-align: center">
					<div
						style="
							font-size: 32px;
							font-weight: 700;
							color: #3182ce;
							margin-bottom: 8px;
						">
						12
					</div>
					<div style="color: #718096">活跃项目</div>
				</div>
			</div>
			<div class="card">
				<div class="card-content" style="text-align: center">
					<div
						style="
							font-size: 32px;
							font-weight: 700;
							color: #38a169;
							margin-bottom: 8px;
						">
						156
					</div>
					<div style="color: #718096">成功构建</div>
				</div>
			</div>
			<div class="card">
				<div class="card-content" style="text-align: center">
					<div
						style="
							font-size: 32px;
							font-weight: 700;
							color: #e53e3e;
							margin-bottom: 8px;
						">
						8
					</div>
					<div style="color: #718096">失败构建</div>
				</div>
			</div>
			<div class="card">
				<div class="card-content" style="text-align: center">
					<div
						style="
							font-size: 32px;
							font-weight: 700;
							color: #805ad5;
							margin-bottom: 8px;
						">
						3
					</div>
					<div style="color: #718096">运行中</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">最近构建</h3>
				<button class="btn btn-primary" onclick="triggerBuild()">
					<span>🔨</span> 触发构建
				</button>
			</div>
			<div class="card-content">
				<div class="build-item">
					<div class="build-info">
						<div class="build-id">#1234 - frontend-app</div>
						<div class="build-meta">main分支 • 2分钟前 • 张三</div>
						<div class="progress">
							<div class="progress-bar" style="width: 75%"></div>
						</div>
					</div>
					<div class="build-actions">
						<span class="status-badge status-running">
							<span class="spinning">⚡</span> 构建中
						</span>
					</div>
				</div>

				<div class="build-item">
					<div class="build-info">
						<div class="build-id">#1233 - backend-api</div>
						<div class="build-meta">develop分支 • 15分钟前 • 李四</div>
					</div>
					<div class="build-actions">
						<span class="status-badge status-success">✅ 成功</span>
						<button class="btn btn-sm btn-secondary" onclick="downloadArtifact(1233)">
							下载
						</button>
					</div>
				</div>

				<div class="build-item">
					<div class="build-info">
						<div class="build-id">#1232 - mobile-app</div>
						<div class="build-meta">feature/login分支 • 1小时前 • 王五</div>
					</div>
					<div class="build-actions">
						<span class="status-badge status-error">❌ 失败</span>
						<button class="btn btn-sm btn-secondary" onclick="viewLogs(1232)">
							查看日志
						</button>
					</div>
				</div>
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
