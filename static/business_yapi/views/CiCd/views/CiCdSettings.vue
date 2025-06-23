<style lang="less">
#CiCdSettings {
}
</style>
<template>
	<!-- 系统设置 -->
	<div id="CiCdSettings">
		<div class="page-header">
			<h1 class="page-title">系统设置</h1>
			<p class="page-subtitle">配置系统参数和用户权限</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h3 class="card-title">构建设置</h3>
			</div>
			<div class="card-content">
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
					<div class="form-group">
						<label class="form-label">最大并发构建数</label>
						<input type="number" class="form-input" value="5" min="1" max="20" />
					</div>
					<div class="form-group">
						<label class="form-label">构建超时时间(分钟)</label>
						<input type="number" class="form-input" value="30" min="5" max="120" />
					</div>
				</div>

				<div class="form-group">
					<label class="form-label">产出物保留天数</label>
					<input type="number" class="form-input" value="30" min="1" max="365" />
				</div>

				<div class="form-group">
					<label class="form-label">构建日志保留天数</label>
					<input type="number" class="form-input" value="90" min="7" max="365" />
				</div>

				<button class="btn btn-primary">保存设置</button>
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
