<template>
	<DocContentOfDemo class="x-table-easy-table-height">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="表格自动高度"
			path="@/views/component/data/xTableEasy/xTableEasy.TableHeight.AutoHeight.vue"
			unfold />
		<DemoAndCode
			title="表格固定高度"
			path="@/views/component/data/xTableEasy/xTableEasy.TableHeight.FixedHeight.vue"
			unfold />
		<DemoAndCode
			title="表格动态高度（calc css函数）"
			path="@/views/component/data/xTableEasy/xTableEasy.TableHeight.DynamicHeight.vue"
			unfold />
		<DemoAndCode
			title="表格动态高度（百分比）"
			path="@/views/component/data/xTableEasy/xTableEasy.TableHeight.PercentHeight.vue"
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
- 1、表格高度可以设置固定值。如：maxHeight: 500
- 2、表格高度可以设置动态值。如：maxHeight: 'calc(100vh - 210px)'
- 3、不设置maxHeight时，表格会根据内容自动调整高度

### 实现原理
表格高度的实现原理基于以下几点：
1. **自动高度**：如果不设置maxHeight，表格会根据内容自动调整高度，没有滚动条
2. **固定高度**：通过设置maxHeight属性为固定像素值，当内容超过此高度时会显示垂直滚动条
3. **动态高度**：
   - 使用calc()函数可以根据视窗或其他元素尺寸计算高度
   - 使用百分比可以实现响应式高度，随父容器高度变化
4. **内部实现**：表格组件会根据设置的maxHeight值，计算并应用到表格容器上，实现内容的滚动显示
`,
			apiString: `
## API

### 表格高度设置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| maxHeight | 表格最大高度，超过此高度会显示滚动条 | Number/String | undefined |
| fixedHeader | 是否固定表头 | Boolean | false |
`
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-table-height {
}
</style>
