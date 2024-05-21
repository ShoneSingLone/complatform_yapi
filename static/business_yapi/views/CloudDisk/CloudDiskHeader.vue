<template>
	<header class="AppLayoutHeader flex middle">
		<span class="flex middle pointer"> {{ APP.currentTabName }} </span>
		<xGap f />
		<xBtn circle icon="el-icon-plus" @click="APP.homeListDrawer = true" />
		<xBtn circle icon="el-icon-more" @click="APP.homeListDrawer = true" style="transform: rotate(90deg)" />
		<xGap r />
	</header>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		name: "AppLayoutHeader",
		components: {},
		data() {
			return {};
		},
		computed: {},
		methods: {}
	};
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
	.YapiLogo {
		box-shadow: var(--el-box-shadow-lighter);
		// border: 1px solid gray;
		border-radius: 50%;
		margin-right: var(--ui-one);
	}
}
</style>
