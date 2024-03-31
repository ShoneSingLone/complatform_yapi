<style lang="less"></style>
<template><xBtn :configs="configs" /></template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_explore"],
		computed: {
			stateMusicPlayer() {
				return this.inject_explore.stateMusicPlayer;
			},
			methodsMusicPlayer() {
				return this.inject_explore.methodsMusicPlayer;
			},
			configs() {
				const vm = this;
				const { LOOP_TYPE_NAME_ARRAY } = vm.inject_explore;
				return {
					label: () => h("xIcon", { icon: `_${LOOP_TYPE_NAME_ARRAY[vm.stateMusicPlayer.loopType]}` }),
					onClick() {
						vm.methodsMusicPlayer.togglePlayModel();
					}
				};
			}
		}
	});
}
</script>
