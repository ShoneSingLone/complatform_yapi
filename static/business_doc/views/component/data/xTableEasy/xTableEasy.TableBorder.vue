<template>
	<DocContentOfDemo class="x-table-easy-table-border">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="完整边框（横向和纵向）"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.AutoBorder.vue"
			unfold />
		<DemoAndCode
			title="只显示横向边框"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.HorizontalBorder.vue"
			unfold />
		<DemoAndCode
			title="只显示纵向边框"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.VerticalBorder.vue"
			unfold />
		<DemoAndCode
			title="无边框"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.NoBorder.vue"
			unfold />
		<DemoAndCode
			title="外边框"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.BorderAround.vue"
			unfold />
		<DemoAndCode
			title="外边框 + 横向边框"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.AroundXBorder.vue"
			unfold />
		<DemoAndCode
			title="外边框 + 纵向边框"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.AroundYBorder.vue"
			unfold />
		<DemoAndCode
			title="边框圆角"
			path="@/views/component/data/xTableEasy/xTableEasy.TableBorder.BorderRadius.vue"
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
- 1、通过配置 borderX 属性，可以显示表格的横向边框
- 2、通过配置 borderY 属性，可以显示表格的纵向边框
- 3、同时配置 borderX 和 borderY，可以显示完整的表格边框
- 4、borderAround 属性可以显示表格的外边框

### 实现原理
表格边框的实现原理基于以下几点：
1. **边框控制**：通过不同的边框属性控制表格的边框显示
2. **横向边框**：borderX 属性控制表格行之间的横向边框
3. **纵向边框**：borderY 属性控制表格列之间的纵向边框
4. **外边框**：borderAround 属性控制表格的外边框显示
5. **内部实现**：表格组件会根据设置的边框属性，为表格添加相应的CSS类，实现边框的显示和隐藏

### 边框类型
- **完整边框**：同时设置 borderX 和 borderY，显示所有边框
- **只显示横向边框**：只设置 borderX，只显示行之间的边框
- **只显示纵向边框**：只设置 borderY，只显示列之间的边框
- **无边框**：不设置任何边框属性，表格无任何边框
						`,
				apiString: `
## API

### 表格边框设置
| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| borderX | 是否显示纵向边框 | Boolean | false |
| borderY | 是否显示横向边框 | Boolean | false |
| borderAround | 是否显示外边框 | Boolean | false |
`
			};
		}
	};
}
</script>

<style lang="less">
.x-table-easy-table-border {
}
</style>
