<template>
	<xDialog>
		<xCard>
			<xMd :md="logString" />
		</xCard>
		<template #footer>
			<xBtn @click="closeModal" preset="primary">{{ i18n("关闭") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ logString }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		props: useDialogProps(),
		inject: ["APP"],

		setup() {
			return { logString };
		}
	});
}
</script>
