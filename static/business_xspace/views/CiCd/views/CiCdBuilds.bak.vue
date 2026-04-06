<style lang="less">
#CiCdBuilds {
}
</style>
<template>
	<!-- 构建历史 -->
	<div id="CiCdBuilds">
		<div class="page-header">
			<h1 class="page-title">构建历史</h1>
			<p class="page-subtitle">查看所有构建记录和状态</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">构建记录</h3>
				<div style="display: flex; gap: 12px">
					<select
						class="form-select"
						style="width: auto"
						onchange="filterBuilds(this.value)">
						<option value="all">所有状态</option>
						<option value="success">成功</option>
						<option value="error">失败</option>
						<option value="running">运行中</option>
					</select>
					<button class="btn btn-primary" onclick="refreshBuilds()">刷新</button>
				</div>
			</div>
			<div class="card-content">
				<table class="table">
					<thead>
						<tr>
							<th>构建ID</th>
							<th>项目</th>
							<th>分支</th>
							<th>提交者</th>
							<th>状态</th>
							<th>开始时间</th>
							<th>耗时</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody id="buildsTable">
						<tr>
							<td>#1234</td>
							<td>frontend-app</td>
							<td>main</td>
							<td>张三</td>
							<td>
								<span class="status-badge status-running"
									><span class="spinning">⚡</span> 构建中</span
								>
							</td>
							<td>2024-01-15 14:30</td>
							<td>2m 15s</td>
							<td>
								<button class="btn btn-sm btn-secondary" onclick="viewLogs(1234)">
									日志
								</button>
								<button class="btn btn-sm btn-danger" onclick="cancelBuild(1234)">
									取消
								</button>
							</td>
						</tr>
						<tr>
							<td>#1233</td>
							<td>backend-api</td>
							<td>develop</td>
							<td>李四</td>
							<td>
								<span class="status-badge status-success">✅ 成功</span>
							</td>
							<td>2024-01-15 14:15</td>
							<td>3m 42s</td>
							<td>
								<button class="btn btn-sm btn-secondary" onclick="viewLogs(1233)">
									日志
								</button>
								<button
									class="btn btn-sm btn-success"
									onclick="downloadArtifact(1233)">
									下载
								</button>
							</td>
						</tr>
						<tr>
							<td>#1232</td>
							<td>mobile-app</td>
							<td>feature/login</td>
							<td>王五</td>
							<td>
								<span class="status-badge status-error">❌ 失败</span>
							</td>
							<td>2024-01-15 13:45</td>
							<td>1m 28s</td>
							<td>
								<button class="btn btn-sm btn-secondary" onclick="viewLogs(1232)">
									日志
								</button>
								<button
									class="btn btn-sm btn-primary"
									onclick="rebuildProject(1232)">
									重新构建
								</button>
							</td>
						</tr>
					</tbody>
				</table>
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
