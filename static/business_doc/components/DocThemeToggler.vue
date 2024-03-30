<style lang="less"></style>
<template>
	<el-switch v-model="APP.darkMode"></el-switch>
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
