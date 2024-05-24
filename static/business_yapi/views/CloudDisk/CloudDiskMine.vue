<style lang="less"></style>
<template>
	<div>
		<xTabs v-model="activeName" @tabClick="handleClick">
			<xTabPane label="用户管理" name="first">{{ APP.user }}</xTabPane>
			<xTabPane label="配置管理" name="second">
				<div>{{ cptPercent }}</div>
				<div>{{ _.$bytesToSize(cloudDiskSizeUsed) }}</div>
				<div>{{ _.$bytesToSize(cloudDiskSizeTotal) }}</div>
			</xTabPane>
			<xTabPane label="角色管理" name="third">角色管理</xTabPane>
			<xTabPane label="定时任务补偿" name="fourth">定时任务补偿</xTabPane>
		</xTabs>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		inject: ["APP"],

		data() {
			return {
				activeName: "second"
			};
		},
		computed: {
			cloudDiskSizeUsed() {
				return this.APP.user.cloudDiskSizeUsed || 0;
			},
			cloudDiskSizeTotal() {
				return this.APP.user.cloudDiskSizeTotal || 0;
			},
			cptPercent() {
				if (!this.cloudDiskSizeTotal) {
					return 0;
				}
				return Number(this.cloudDiskSizeUsed / this.cloudDiskSizeTotal).toFixed(2);
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	});
}
</script>
