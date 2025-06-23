<template>
	<section id="ViewCiCd">
		<AppHeader />
		<div class="flex1-overflow-auto flex container">
			<!-- 侧边栏 -->
			<CiCdSidebar />
			<!-- 主内容区域 -->
			<main class="main-content">
				<RouterView />
			</main>
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			AppHeader: () => _.$importVue("@/views/Api/Header/ApiHeader.vue"),
			CiCdSidebar: () => _.$importVue("@/views/CiCd/CiCdSidebar.vue")
		},
		async mounted() {
			(() => {
				document.title = `Y-API-用户管理`;
			})();
		},
		provide() {
			const inject_im = this;
			return {
				inject_im
			};
		},
		data() {
			return {
				isCollapse: true,
				expandedKeys: [],
				isShowEditor: false
			};
		},
		methods: {},
		computed: {}
	});
}
</script>

<style lang="less">
#ViewCiCd {
	height: 100vh;
	display: flex;
	flex-flow: column nowrap;

	/* 主内容区域 */
	.main-content {
		flex: 1;
		padding: var(--ui-one);
		overflow: auto;
	}

	.page-header {
		background: white;
		padding: var(--ui-one);
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		margin-bottom: var(--ui-one);
	}

	.page-title {
		font-size: 28px;
		font-weight: 700;
		color: #1a202c;
		margin-bottom: 8px;
	}

	.page-subtitle {
		color: #718096;
		font-size: 16px;
	}

	/* 卡片样式 */
	.card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		margin-bottom: var(--ui-one);
		overflow: hidden;
	}

	.card-header {
		padding: 20px var(--ui-one);
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-title {
		font-size: 18px;
		font-weight: 600;
		color: #1a202c;
	}

	.card-content {
		padding: var(--ui-one);
	}

	/* 表单样式 */
	.form-group {
		margin-bottom: 20px;
	}

	.form-label {
		display: block;
		margin-bottom: 8px;
		font-weight: 500;
		color: #2d3748;
	}

	.form-input {
		width: 100%;
		padding: 12px 16px;
		border: 1px solid #e2e8f0;
		border-radius: 6px;
		font-size: 14px;
		transition: border-color 0.2s;
	}

	.form-input:focus {
		outline: none;
		border-color: #63b3ed;
		box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.1);
	}

	.form-textarea {
		min-height: 120px;
		resize: vertical;
		font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
	}

	.form-select {
		width: 100%;
		padding: 12px 16px;
		border: 1px solid #e2e8f0;
		border-radius: 6px;
		background: white;
		font-size: 14px;
	}

	/* 按钮样式 */
	.btn {
		display: inline-flex;
		align-items: center;
		padding: 10px 20px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.2s;
		gap: 8px;
	}

	.btn-primary {
		background: #3182ce;
		color: white;
	}

	.btn-primary:hover {
		background: #2c5282;
	}

	.btn-secondary {
		background: #e2e8f0;
		color: #2d3748;
	}

	.btn-secondary:hover {
		background: #cbd5e0;
	}

	.btn-success {
		background: #38a169;
		color: white;
	}

	.btn-success:hover {
		background: #2f855a;
	}

	.btn-danger {
		background: #e53e3e;
		color: white;
	}

	.btn-danger:hover {
		background: #c53030;
	}

	.btn-sm {
		padding: 6px 12px;
		font-size: 12px;
	}

	/* 状态标签 */
	.status-badge {
		display: inline-flex;
		align-items: center;
		padding: 4px 12px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 500;
		gap: 6px;
	}

	.status-success {
		background: #c6f6d5;
		color: #22543d;
	}

	.status-error {
		background: #fed7d7;
		color: #742a2a;
	}

	.status-warning {
		background: #fefcbf;
		color: #744210;
	}

	.status-info {
		background: #bee3f8;
		color: #2a4365;
	}

	.status-running {
		background: #e9d8fd;
		color: #44337a;
	}

	/* 表格样式 */
	.table {
		width: 100%;
		border-collapse: collapse;
	}

	.table th,
	.table td {
		padding: 12px 16px;
		text-align: left;
		border-bottom: 1px solid #e2e8f0;
	}

	.table th {
		background: #f7fafc;
		font-weight: 600;
		color: #2d3748;
	}

	.table tr:hover {
		background: #f7fafc;
	}

	/* 构建历史样式 */
	.build-item {
		display: flex;
		align-items: center;
		padding: 16px;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		margin-bottom: 12px;
		transition: all 0.2s;
	}

	.build-item:hover {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.build-info {
		flex: 1;
	}

	.build-id {
		font-weight: 600;
		color: #1a202c;
		margin-bottom: 4px;
	}

	.build-meta {
		font-size: 14px;
		color: #718096;
	}

	.build-actions {
		display: flex;
		gap: 8px;
	}

	/* 进度条 */
	.progress {
		width: 100%;
		height: 8px;
		background: #e2e8f0;
		border-radius: 4px;
		overflow: hidden;
		margin: 12px 0;
	}

	.progress-bar {
		height: 100%;
		background: #3182ce;
		transition: width 0.3s;
	}

	.progress-bar.success {
		background: #38a169;
	}

	.progress-bar.error {
		background: #e53e3e;
	}

	/* 代码块样式 */
	.code-block {
		background: #1a202c;
		color: #e2e8f0;
		padding: 16px;
		border-radius: 6px;
		font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
		font-size: 13px;
		line-height: 1.5;
		overflow-x: auto;
		margin: 12px 0;
	}

	/* 标签页 */
	.tabs {
		display: flex;
		border-bottom: 1px solid #e2e8f0;
		margin-bottom: var(--ui-one);
	}

	.tab {
		padding: 12px var(--ui-one);
		background: none;
		border: none;
		cursor: pointer;
		font-size: 14px;
		color: #718096;
		border-bottom: 2px solid transparent;
		transition: all 0.2s;
	}

	.tab.active {
		color: #3182ce;
		border-bottom-color: #3182ce;
	}

	.tab-content {
	}

	.tab-content.active {
		display: block;
	}

	/* 文件列表 */
	.file-list {
		max-height: 400px;
		overflow-y: auto;
	}

	.file-item {
		display: flex;
		align-items: center;
		padding: 12px 16px;
		border-bottom: 1px solid #e2e8f0;
		transition: background 0.2s;
	}

	.file-item:hover {
		background: #f7fafc;
	}

	.file-icon {
		margin-right: 12px;
		font-size: 16px;
	}

	.file-info {
		flex: 1;
	}

	.file-name {
		font-weight: 500;
		color: #1a202c;
	}

	.file-size {
		font-size: 12px;
		color: #718096;
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.sidebar {
			transform: translateX(-100%);
			transition: transform 0.3s;
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.main-content {
			margin-left: 0;
			padding: 16px;
		}

		.card-content {
			padding: 16px;
		}
	}

	/* 动画效果 */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.spinning {
		animation: spin 1s linear infinite;
	}

	/* 通知样式 */
	.notification {
		position: fixed;
		top: 20px;
		right: 20px;
		padding: 16px 20px;
		border-radius: 8px;
		color: white;
		font-weight: 500;
		z-index: 1000;
		transform: translateX(100%);
		transition: transform 0.3s;
	}

	.notification.show {
		transform: translateX(0);
	}

	.notification.success {
		background: #38a169;
	}

	.notification.error {
		background: #e53e3e;
	}
}
</style>
