<template>
	<xDialog>
		<video
			:src="videoSrc"
			controls="true"
			style="max-width: 600px; width: 100%; margin: auto" />
	</xDialog>
</template>
<script lang="ts">
export default async function ({ uri, id }) {
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
				// return `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`;
				return Vue._common_utils.appendToken(
					_.$ajax.urlWrapper(`/api/resource/video?id=${id}`)
				);
			}
		}
	});
}
</script>
<style lang="less"></style>
