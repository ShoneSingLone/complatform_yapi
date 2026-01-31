<template>
	<DocContentOfDemo class="x-table-easy-filter">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="基本筛选"
			path="@/views/component/data/xTableEasy/xTableEasy.Filter.vue"
			unfold />
		<DemoAndCode
			title="自定义筛选"
			path="@/views/component/data/xTableEasy/xTableEasy.Filter.Custom.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: `
- 1、可以通过外部筛选控件实现表格数据的筛选
- 2、可以根据业务需求自定义筛选逻辑和筛选控件
- 3、筛选后的数据直接传递给 table-data 属性
`,
				apiString: ``
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-filter {
}
</style>