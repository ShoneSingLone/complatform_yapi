<style lang="less"></style>
<template>
	<xSwitch v-model="APP.darkMode" />
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		inject: ["APP"],
		data() {
			return { THIS_FILE_URL };
		}
	});
}
</script>
