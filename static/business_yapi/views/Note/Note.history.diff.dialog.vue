<template>
	<div class="x-padding flex vertical height100 note-history-dialog-vue">
		<!-- 搜索框 -->
		<div class="search-container">
			<i class="search-icon">🔍</i>
			<input type="text" class="search-input" placeholder="搜索历史记录..." />
		</div>
		<!-- 历史记录列表 -->
		<div class="history-list">
			<div class="history-item">
				<div class="history-title">
					<span>修改标题</span>
				</div>
				<div class="history-preview">
					这是您当前正在编辑的笔记内容...在这里可以看到您的笔记正文内容。
				</div>
				<div class="history-meta">
					<span>今天 13:20</span>
					<button class="restore-btn">Diff查看</button>
				</div>
			</div>
		</div>
		<xPagination :configs="cpt_pagination" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				cpt_pagination: defTable({
					onQuery(pagination) {},
					data: {
						list: []
					},
					columns: []
				})
			};
		},
		computed: {},
		watch: {},
		methods: {}
	});
}
</script>
<style lang="less">
.note-history-dialog-vue {
	/* 基础样式重置 */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}

	body {
		background-color: #f5f5f5;
		color: #333;
		min-height: 100vh;
		overflow-x: hidden;
	}

	/* 主内容区样式 */
	.main-container {
		display: flex;
		min-height: 100vh;
		position: relative;
	}

	.main-content {
		flex: 1;
		padding: 2rem;
		transition: transform 0.3s ease;
	}

	.main-content.shifted {
		transform: translateX(-300px);
	}

	.note-card {
		max-width: 800px;
		margin: 0 auto;
		background: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.note-card h1 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
		color: #2c3e50;
	}

	.note-content {
		color: #555;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	/* 按钮样式 */
	.btn {
		background-color: var(--el-color-primary);
		color: white;
		border: none;
		padding: 0.7rem 1.2rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		display: inline-flex;
		align-items: center;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background-color: #2980b9;
	}

	.btn i {
		margin-right: 0.5rem;
	}

	/* 抽屉样式 */
	.history-drawer {
		position: fixed;
		top: 0;
		right: 0;
		width: 300px;
		height: 100vh;
		background: white;
		box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);
		transform: translateX(100%);
		transition: transform 0.3s ease;
		z-index: 100;
		display: flex;
		flex-direction: column;
	}

	.history-drawer.open {
		transform: translateX(0);
	}

	/* 抽屉头部 */
	.drawer-header {
		padding: 1rem;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.drawer-header h2 {
		font-size: 1.2rem;
		color: #2c3e50;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 1.2rem;
		cursor: pointer;
		color: #7f8c8d;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s;
	}

	.close-btn:hover {
		background-color: #f1f1f1;
	}

	/* 搜索框 */
	.search-container {
		padding: 1rem;
		border-bottom: 1px solid #eee;
		position: relative;
	}

	.search-input {
		width: 100%;
		padding: 0.7rem 0.7rem 0.7rem 2.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--el-color-primary);
	}

	.search-icon {
		position: absolute;
		left: 1.5rem;
		top: 50%;
		transform: translateY(-50%);
		color: #999;
	}

	/* 历史记录列表 */
	.history-list {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
	}

	/* 隐藏滚动条但保留功能 */
	.history-list::-webkit-scrollbar {
		display: none;
	}

	.history-list {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	/* 历史记录项 */
	.history-item {
		padding: 1rem;
		border-radius: 6px;
		margin-bottom: 0.5rem;
		background: white;
		border-left: 3px solid #ddd;
		transition: all 0.2s;
		cursor: pointer;
	}

	.history-item:hover {
		background-color: #f9f9f9;
		transform: translateX(3px);
	}

	.history-item.current {
		border-left-color: var(--el-color-primary);
	}

	.history-title {
		font-weight: 500;
		margin-bottom: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.history-badge {
		font-size: 0.7rem;
		background-color: rgba(52, 152, 219, 0.1);
		color: var(--el-color-primary);
		padding: 0.1rem 0.5rem;
		border-radius: 10px;
	}

	.history-preview {
		font-size: 0.85rem;
		color: #666;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-bottom: 0.7rem;
	}

	.history-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
		color: #999;
	}

	.restore-btn {
		color: var(--el-color-primary);
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.75rem;
		transition: color 0.2s;
	}

	.restore-btn:hover {
		color: #2980b9;
	}
}
</style>
