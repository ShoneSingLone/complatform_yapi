<template>
	<DesktopWorkspace />
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const [DesktopWorkspace] = await _.$importVue([
		"@/components/DesktopWorkspace/DesktopWorkspace.vue"
	]);

	return {
		components: {
			DesktopWorkspace
		}
	};
}
</script>
