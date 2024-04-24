<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xBtn v-xtips="manual" @click="manual.visible = true">click 激活</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	const DemoTips = await _.$importVue("@/views/other/popover/QianTaoCaoZuo.confirm.vue");
	return defineComponent({
		data() {
			const vm = this;
			return {
				mdTitle: `还可以嵌套操作，这相比 Dialog 更为轻量`,
				visible: false,
				manual: {
					content() {
						return h(DemoTips, {
							onSelected({ isOk }) {
								_.$msgSuccess(isOk ? "操作成功" : "操作失败");
								vm.manual.visible = false;
							}
						});
					},
					trigger: "manual",
					visible: false,
					placement: "top"
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
