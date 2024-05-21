<style lang="less"></style>
<template>
	<div class="flex vertical height100">
		<div class="x-padding">
			<xInput placeholder="搜索网盘内容" v-model="searchKey">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</xInput>
		</div>
		<div class="flex flex1">asdfasf</div>
		<xMobileTabBar v-model="APP.currentTabName" :data="tabArray" style="background-color: white" />
		<xDrawer :visible.sync="APP.homeListDrawer" :with-header="false" direction="btt">
			<span>我来啦!</span>
		</xDrawer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {
				searchKey: "",
				tabArray: [
					{ label: "首页", icon: "_cloud_home_tab" },
					{ label: "传输", icon: "_cloud_trans_tab" },
					{ label: "我的", icon: "_UserOutlined" }
				]
			};
		},
		methods: {
			handleClick() {}
		}
	});
}
</script>
