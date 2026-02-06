<template>
	<DocContentOfDemo class="x-table-easy-column-width">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="像素宽度"
			path="@/views/component/data/xTableEasy/xTableEasy.ColumnWidth.PxWidth.vue"
			unfold />
		<DemoAndCode
			title="百分比宽度"
			path="@/views/component/data/xTableEasy/xTableEasy.ColumnWidth.PercentWidth.vue"
			unfold />
		<DemoAndCode
			title="自动宽度"
			path="@/views/component/data/xTableEasy/xTableEasy.ColumnWidth.NoWidth.vue"
			unfold />
		<DemoAndCode
			title="长文本破坏布局"
			path="@/views/component/data/xTableEasy/xTableEasy.ColumnWidth.LongWord.vue"
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
- 1、通过在 columns 配置中设置 width 属性来定义列宽
- 2、宽度可以是数字（像素）或字符串（支持百分比等）
- 3、不设置 width 时，列会自动分配宽度
- 4、当列宽设置百分比时，单元格宽度按照百分比缩放
- 5、当列宽设置像素值时，单元格宽度按照像素比缩放
- 6、表格的固定宽度，需要设置外层容器宽度

### 实现原理
列宽设置的实现原理基于以下几点：
1. **列宽配置**：通过在 columns 数组中的每个列配置对象中设置 width 属性
2. **宽度类型**：支持数字（默认单位为px）和字符串（支持px、%等单位）
3. **自动宽度**：当不设置 width 时，表格会根据内容自动计算列宽
4. **内部实现**：表格组件会将列宽配置转换为 colgroup 中的 col 元素的 width 属性
5. **兼容性**：支持不同单位的宽度值，确保在不同场景下的正确显示
`,
				apiString: `
## API

### 列宽设置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| width | 列宽设置，可以是数字（像素）或字符串（支持百分比等） | Number/String | - |
`
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-column-width {
}
</style>
