<template>
	<DocContentOfDemo class="x-table-easy-column">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="列固定"
			path="@/views/component/data/xTableEasy/xTableEasy.Column.Fixed.vue"
			unfold />
		<DemoAndCode
			title="列隐藏"
			path="@/views/component/data/xTableEasy/xTableEasy.Column.Hidden.vue"
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
- 1、通过在 columns 配置中设置 fixed 属性来实现列固定，可选值为 "left" 或 "right"
- 2、通过在 columns 配置中设置 visible 属性来控制列的显示和隐藏
- 3、固定列需要设置固定宽度

### 实现原理
列相关功能的实现原理基于以下几点：
1. **列固定**：
   - 通过设置 columns 配置中的 fixed 属性为 "left" 或 "right" 来实现
   - 固定列需要设置固定宽度，以确保在滚动时正确显示
   - 内部实现：表格组件会为固定列创建单独的容器，并在滚动时保持固定位置

2. **列隐藏**：
   - 通过控制 columns 数组中列的 visible 属性或直接过滤 columns 数组来实现
   - 可以通过外部控件动态控制列的显示和隐藏
   - 内部实现：表格组件会根据 columns 配置渲染可见的列

3. **列宽设置**：
   - 通过在 columns 配置中设置 width 属性来定义列宽
   - 宽度可以是数字（像素）或字符串（支持百分比等）
   - 内部实现：表格组件会根据设置的宽度值计算并应用到列上

4. **列宽拖动**：
   - 通过设置 columnWidthResizeOption 属性来启用列宽拖动功能
   - 可以通过拖动列头边界来调整列宽
   - 内部实现：表格组件会监听鼠标事件，计算拖动距离并更新列宽
`,
			apiString: `
## API

### 列配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| field | 列字段名 | String | - |
| title | 列标题 | String | - |
| width | 列宽度 | Number/String | - |
| fixed | 列固定方向 | String | - |
| visible | 列是否可见 | Boolean | true |
| align | 列对齐方式 | String | "left" |
| edit | 列是否可编辑 | Boolean | false |

### 列宽拖动配置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| columnWidthResizeOption | 列宽拖动配置 | Object | {enable: false} |
`
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-column {
}
</style>