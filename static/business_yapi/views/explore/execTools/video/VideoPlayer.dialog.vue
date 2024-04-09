<template>
	<xDialog style="--xDialog-wrapper-width: 1024px">
		<video :src="videoSrc" controls="true" />
	</xDialog>
</template>
<script lang="ts">
export default async function ({ uri }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {},
		data() {
			return {};
		},
		computed: {
			uri() {
				return "";
			},
			videoSrc() {
				return Vue._yapi_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/resource/video?uri=${uri}`);
			}
		}
	});
}
</script>
<style lang="less"></style>
