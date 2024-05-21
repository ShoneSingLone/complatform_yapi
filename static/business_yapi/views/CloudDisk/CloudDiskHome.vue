<template>
	<div id="app">
		<AppHeader />
		<main class="x-app-layout-main">
			<div class="AppLayoutContent">
				<RouterView />
			</div>
		</main>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		mounted() {
			document.title = "网盘+";
		},
		components: {
			AppHeader: () => _.$importVue("@/views/CloudDisk/CloudDiskHeader.vue")
		},
		inject: ["APP"],
		data() {
			return { isMobile: true };
		},
		computed: {
			isShowLoading() {
				return;
			}
		}
	};
}
</script>
