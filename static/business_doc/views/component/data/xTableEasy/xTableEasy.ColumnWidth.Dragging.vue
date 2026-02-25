<template>
	<DocContentOfDemo class="x-table-easy-column-width-dragging">
		<xMd :md="mdDoc" />
		<DemoAndCode
			title="列宽拖动"
			path="@/views/component/data/xTableEasy/xTableEasy.ColumnWidth.Dragging.Basic.vue"
			unfold />
		<DemoAndCode
			title="禁用列宽拖动"
			path="@/views/component/data/xTableEasy/xTableEasy.ColumnWidth.Dragging.Disable.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdDoc: `- 1、当存在大文本时，列宽调整将会很有用
- 2、通过 \`columnWidthResizeOption\` 设置列宽拖动功能
- 3、建议设置 \`scroll-width=0\`，那么当列宽总和大于容器宽度时，将会出横向滚动条
- 4、通过 \`column.width\` 设置列的默认宽度，如果所有列宽总和小于容器宽度，列宽度将会自适应`,
				apiString: `
## API

### columnWidthResizeOption
列宽拖动配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| enable | 是否开启列宽拖动 | Boolean | false |
| minWidth | 可改变列的最小宽度 | Number | 30px |
| sizeChange | 列宽改变后的回调函数。参数说明：<br>1、\`column\`：宽度改变的列信息<br>2、\`differWidth\`：列宽改变后差异的宽度<br>3、\`columnWidth\`：列宽改变后的宽度 | Function({ column, differWidth, columnWidth }) | - |

### columns
列配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| disableResizing | 禁用此列的拖动功能。仅在 \`columnWidthResizeOption\` 启用时有效 | Boolean | false |`
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-column-width-dragging {
}
</style>
