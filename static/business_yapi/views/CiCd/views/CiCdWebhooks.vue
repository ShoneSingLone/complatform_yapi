<style lang="less">
#CiCdWebhooks {
}
</style>
<template>
	<!-- Webhook配置 -->
	<div id="CiCdWebhooks">
		<div class="page-header">
			<h1 class="page-title">Webhook配置</h1>
			<p class="page-subtitle">配置Git仓库的自动触发钩子</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">Webhook设置</h3>
				<button class="btn btn-primary" onclick="addWebhook()">
					添加Webhook
				</button>
			</div>
			<div class="card-content">
				<div class="form-group">
					<label class="form-label">Webhook URL</label>
					<div style="display: flex; gap: 12px">
						<input
							type="text"
							class="form-input"
							id="webhookUrl"
							value="https://ci.example.com/webhook/trigger"
							readonly />
						<button class="btn btn-secondary" onclick="copyWebhookUrl()">
							复制
						</button>
					</div>
					<small style="color: #718096; margin-top: 4px; display: block">
						将此URL添加到您的Git仓库的Webhook设置中
					</small>
				</div>

				<div class="form-group">
					<label class="form-label">触发事件</label>
					<div
						style="
							display: grid;
							grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
							gap: 12px;
						">
						<label style="display: flex; align-items: center; gap: 8px">
							<input type="checkbox" checked /> Push事件
						</label>
						<label style="display: flex; align-items: center; gap: 8px">
							<input type="checkbox" checked /> Pull Request
						</label>
						<label style="display: flex; align-items: center; gap: 8px">
							<input type="checkbox" /> Tag创建
						</label>
						<label style="display: flex; align-items: center; gap: 8px">
							<input type="checkbox" /> Release发布
						</label>
					</div>
				</div>

				<div class="form-group">
					<label class="form-label">分支过滤</label>
					<input
						type="text"
						class="form-input"
						placeholder="main,develop,feature/*"
						value="main,develop" />
					<small style="color: #718096; margin-top: 4px; display: block">
						只有匹配的分支才会触发构建，支持通配符
					</small>
				</div>

				<div class="form-group">
					<label class="form-label">Secret密钥</label>
					<div style="display: flex; gap: 12px">
						<input
							type="password"
							class="form-input"
							id="webhookSecret"
							value="your-secret-key" />
						<button class="btn btn-secondary" onclick="generateSecret()">
							生成
						</button>
					</div>
				</div>

				<button class="btn btn-primary">保存Webhook配置</button>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">Webhook历史</h3>
			</div>
			<div class="card-content">
				<table class="table">
					<thead>
						<tr>
							<th>时间</th>
							<th>事件类型</th>
							<th>分支</th>
							<th>提交信息</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2024-01-15 14:30</td>
							<td>push</td>
							<td>main</td>
							<td>feat: 添加用户登录功能</td>
							<td>
								<span class="status-badge status-success">✅ 已触发</span>
							</td>
							<td>
								<button
									class="btn btn-sm btn-secondary"
									onclick="viewWebhookDetails()">
									详情
								</button>
							</td>
						</tr>
						<tr>
							<td>2024-01-15 13:45</td>
							<td>pull_request</td>
							<td>feature/login</td>
							<td>fix: 修复登录验证问题</td>
							<td>
								<span class="status-badge status-error">❌ 失败</span>
							</td>
							<td>
								<button
									class="btn btn-sm btn-secondary"
									onclick="viewWebhookDetails()">
									详情
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
