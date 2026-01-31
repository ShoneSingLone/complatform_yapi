<template>
	<DocContentOfDemo class="x-table-easy-table-width">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="表格自动宽度"
			path="@/views/component/data/xTableEasy/xTableEasy.TableWidth.AutoWidth.vue"
			unfold />
		<DemoAndCode
			title="表格固定宽度"
			path="@/views/component/data/xTableEasy/xTableEasy.TableWidth.FixedWidth.vue"
			unfold />
		<DemoAndCode
			title="表格动态宽度（calc css函数）"
			path="@/views/component/data/xTableEasy/xTableEasy.TableWidth.DynamicWidth.vue"
			unfold />
		<DemoAndCode
			title="表格动态宽度（百分比）"
			path="@/views/component/data/xTableEasy/xTableEasy.TableWidth.PercentWidth.vue"
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
- 1、表格宽度可以设置固定值。如：\`style="width:900px;"\`
- 2、表格宽度可以设置动态值。如：\`style="width:calc(100vh - 210px)"\` 或者 \`style="width:80%"\`

### 实现原理
表格宽度的实现原理基于以下几点：
1. **默认宽度**：如果不设置宽度，表格默认宽度为100%，会自适应父容器宽度
2. **固定宽度**：通过设置style属性的width值为固定像素值来实现
3. **动态宽度**：
   - 使用calc()函数可以根据视窗或其他元素尺寸计算宽度
   - 使用百分比可以实现响应式宽度，随父容器宽度变化
4. **内部实现**：表格组件会根据设置的宽度值，计算并应用到表格容器上，确保表格正确显示
`,
			apiString: `
## API

### 表格宽度设置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| style | 表格样式，可设置width属性 | Object/String | {width: '100%'} |
`
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-table-width {
}
</style>
