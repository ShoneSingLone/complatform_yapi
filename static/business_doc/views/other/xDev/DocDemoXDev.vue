<template>
	<DocContentOfDemo class="demo-xdev">
		<xMd :md="mdTips" />
		<DemoAndCode title="基础用法" path="@/views/other/xDev/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				mdTips: "xDev 是一个可折叠、可拖动的调试信息展示组件，用于开发过程中展示和调试数据。\n\n**主要特性：**\n- 可折叠/展开的内容区域\n- 支持鼠标拖动调整位置\n- 默认折叠状态，节省页面空间\n- 现代化的UI设计\n- 支持关闭功能\n\n**适用场景：**\n- 开发调试过程中展示临时数据\n- 实时监控应用状态\n- 展示API返回结果\n- 调试复杂数据结构",
				apiString: `### xDev Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| contents         | 要展示的内容，可以是任意JavaScript对象   | any  | — | — |

### xDev Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| close | 在点击关闭按钮时触发 | — |

### xDev Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| toggleCollapse | 切换折叠/展开状态 | — |
| close | 关闭组件 | — |
`
			};
		}
	};
}
</script>

<style lang="less">
.demo-xdev {
	.x-dev-component {
		width: 300px;
	}
}
</style>
