<template>
	<div class="AppLayoutHeader">
		<xGap f />
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"]
	});
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	padding-right: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
}
</style>
