<style lang="less">
#CiCdArtifacts {
}
</style>
<template>
	<!-- 产出物管理 -->
	<div id="CiCdArtifacts">
		<div class="page-header">
			<h1 class="page-title">产出物管理</h1>
			<p class="page-subtitle">管理构建产出的文件和包</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">产出物列表</h3>
				<button class="btn btn-secondary" onclick="cleanupArtifacts()">清理过期文件</button>
			</div>
			<div class="card-content">
				<div class="file-list">
					<div class="file-item">
						<div class="file-icon">📦</div>
						<div class="file-info">
							<div class="file-name">frontend-app-v1.2.3.tar.gz</div>
							<div class="file-size">构建 #1233 • 15.2 MB • 2024-01-15 14:18</div>
						</div>
						<div style="display: flex; gap: 8px">
							<button
								class="btn btn-sm btn-success"
								onclick="downloadFile('frontend-app-v1.2.3.tar.gz')">
								📥 下载
							</button>
							<button
								class="btn btn-sm btn-secondary"
								onclick="viewFileInfo('frontend-app-v1.2.3.tar.gz')">
								ℹ️ 详情
							</button>
							<button
								class="btn btn-sm btn-danger"
								onclick="deleteFile('frontend-app-v1.2.3.tar.gz')">
								🗑️ 删除
							</button>
						</div>
					</div>

					<div class="file-item">
						<div class="file-icon">📱</div>
						<div class="file-info">
							<div class="file-name">mobile-app-release.apk</div>
							<div class="file-size">构建 #1231 • 28.7 MB • 2024-01-15 12:45</div>
						</div>
						<div style="display: flex; gap: 8px">
							<button
								class="btn btn-sm btn-success"
								onclick="downloadFile('mobile-app-release.apk')">
								📥 下载
							</button>
							<button
								class="btn btn-sm btn-secondary"
								onclick="viewFileInfo('mobile-app-release.apk')">
								ℹ️ 详情
							</button>
							<button
								class="btn btn-sm btn-danger"
								onclick="deleteFile('mobile-app-release.apk')">
								🗑️ 删除
							</button>
						</div>
					</div>

					<div class="file-item">
						<div class="file-icon">🐳</div>
						<div class="file-info">
							<div class="file-name">backend-api:latest.docker</div>
							<div class="file-size">构建 #1230 • 156.3 MB • 2024-01-15 11:20</div>
						</div>
						<div style="display: flex; gap: 8px">
							<button
								class="btn btn-sm btn-success"
								onclick="downloadFile('backend-api:latest.docker')">
								📥 下载
							</button>
							<button
								class="btn btn-sm btn-secondary"
								onclick="viewFileInfo('backend-api:latest.docker')">
								ℹ️ 详情
							</button>
							<button
								class="btn btn-sm btn-danger"
								onclick="deleteFile('backend-api:latest.docker')">
								🗑️ 删除
							</button>
						</div>
					</div>

					<div class="file-item">
						<div class="file-icon">📊</div>
						<div class="file-info">
							<div class="file-name">test-report.html</div>
							<div class="file-size">构建 #1233 • 2.1 MB • 2024-01-15 14:18</div>
						</div>
						<div style="display: flex; gap: 8px">
							<button
								class="btn btn-sm btn-success"
								onclick="downloadFile('test-report.html')">
								📥 下载
							</button>
							<button
								class="btn btn-sm btn-info"
								onclick="previewFile('test-report.html')">
								👁️ 预览
							</button>
							<button
								class="btn btn-sm btn-danger"
								onclick="deleteFile('test-report.html')">
								🗑️ 删除
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">存储统计</h3>
			</div>
			<div class="card-content">
				<div
					style="
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
						gap: 16px;
					">
					<div
						style="
							text-align: center;
							padding: 16px;
							background: #f7fafc;
							border-radius: 8px;
						">
						<div style="font-size: var(--ui-one); font-weight: 700; color: #3182ce">
							2.3 GB
						</div>
						<div style="color: #718096; font-size: 14px">总存储使用</div>
					</div>
					<div
						style="
							text-align: center;
							padding: 16px;
							background: #f7fafc;
							border-radius: 8px;
						">
						<div style="font-size: var(--ui-one); font-weight: 700; color: #38a169">
							47
						</div>
						<div style="color: #718096; font-size: 14px">产出物数量</div>
					</div>
					<div
						style="
							text-align: center;
							padding: 16px;
							background: #f7fafc;
							border-radius: 8px;
						">
						<div style="font-size: var(--ui-one); font-weight: 700; color: #805ad5">
							7天
						</div>
						<div style="color: #718096; font-size: 14px">平均保留时间</div>
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
