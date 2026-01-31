<template>
	<DocContentOfDemo class="x-table-easy-header">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="表头固定"
			path="@/views/component/data/xTableEasy/xTableEasy.Header.Fixed.vue"
			unfold />
		<DemoAndCode
			title="表头分组"
			path="@/views/component/data/xTableEasy/xTableEasy.Header.Group.vue"
			unfold />
		<DemoAndCode
			title="表头隐藏"
			path="@/views/component/data/xTableEasy/xTableEasy.Header.Hidden.vue"
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
- 1、通过设置 fixedHeader 属性为 true 来实现表头固定，需要配合 maxHeight 属性使用
- 2、通过在 columns 配置中设置 children 属性来实现表头分组
- 3、通过设置 showHeader 属性来控制表头的显示与隐藏

### 实现原理
表头相关功能的实现原理基于以下几点：
1. **表头固定**：
   - 通过设置 fixedHeader 属性为 true 来实现
   - 需要配合 maxHeight 属性使用，以确保表格内容可滚动
   - 内部实现：表格组件会为表头创建单独的容器，并在滚动时保持固定位置

2. **表头分组**：
   - 通过在 columns 配置中设置 children 属性来实现
   - children 属性是一个列配置数组，可以嵌套多层
   - 内部实现：表格组件会根据 columns 配置的层级结构，渲染出对应的表头分组

3. **表头隐藏**：
   - 通过设置 showHeader 属性为 false 来实现
   - 可以通过外部控件动态控制表头的显示和隐藏
   - 内部实现：表格组件会根据 showHeader 属性决定是否渲染表头部分
`,
			apiString: `
## API

### 表头配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| fixedHeader | 是否固定表头 | Boolean | false |
| showHeader | 是否显示表头 | Boolean | true |

### 列配置（表头分组）
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| title | 列标题 | String | - |
| children | 子列配置 | Array | - |
| width | 列宽度 | Number/String | - |
| align | 列对齐方式 | String | "left" |
`
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-header {
}
</style>