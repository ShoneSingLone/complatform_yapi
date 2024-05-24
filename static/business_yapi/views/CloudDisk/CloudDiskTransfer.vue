<style lang="less"></style>
<template>
	<div>
		<xTabs v-model="activeName" @tabClick="handleClick">
			<xTabPane label="用户管理" name="first">用户管理</xTabPane>
			<xTabPane label="配置管理" name="second">配置管理</xTabPane>
		</xTabs>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return {
				activeName: "second"
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	});
}
</script>
