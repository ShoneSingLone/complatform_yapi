<style lang="less"></style>
<template>
	<div>
		<div>{{ cptPercent }}</div>
		<div>{{ _.$bytesToSize(cloudDiskSizeUsed) }}</div>
		<div>{{ _.$bytesToSize(cloudDiskSizeTotal) }}</div>
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
