<template>
	<div id="app">
		<AppHeader />
		<main class="x-app-layout-main">
			<div class="AppLayoutContent" style="--xPageTitle-padding: var(--ui-one)">
				<RouterView />
			</div>
		</main>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		mounted() {
			document.title = "Y-API-接口管理";
		},
		components: {
			AppHeader: () => _.$importVue("@/views/Api/Header/ApiHeader.vue")
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
