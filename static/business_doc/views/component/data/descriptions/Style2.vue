<style lang="less">
.descriptions-style2 {
	&.xForm {
		--xItem-label-width: 200px;
		border-left: 1px solid var(--el-border-color);
		border-bottom: 1px solid var(--el-border-color);
		.xFormItem {
			border-top: 1px solid var(--el-border-color);
			border-right: 1px solid var(--el-border-color);
			margin-top: 0;
			margin-right: 0;
			.xDesc-wrapper {
				padding: 0;
				height: 100%;
				> div {
					height: 100%;
					line-height: 48px;
					&.xDesc-wrapper_label {
						padding-left: var(--ui-one);
						border-right: 1px solid var(--el-border-color);
						background-color: var(--el-fill-color-lighter);
					}
					&.xDesc-wrapper_content {
						padding-left: var(--ui-one);
					}
				}
			}
		}
	}
}
</style>
<template>
	<div>
		<xMd :md="md" />
		<xForm col="3" class="descriptions-style2">
			<xDesc
				v-for="(item, index) in DemoDescriptions.items"
				:key="index"
				:item="item"
				:span="item.span" />
			<xDesc :item="DemoDescriptions.items[0]" />
			<xDesc :item="DemoDescriptions.items[1]" />
			<xDesc :item="{ isEmpty: true }" />
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoDescriptions"],
		data() {
			return {
				md: `> 边界条件没有覆盖到，暂时散装处理`
			};
		}
	});
}
</script>
