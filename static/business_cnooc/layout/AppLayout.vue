<template>
	<div id="app" v-xloading="APP.isLoading">
		<!-- <AppHeader /> -->
		<main class="x-app-layout-main">
			<AppLeft class="AppLayoutLeft" />
			<div class="AppLayoutContent">
				<RouterView />
			</div>
		</main>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		components: {
			AppHeader: () => _.$importVue("@/layout/AppLayoutHeader.vue"),
			AppLeft: () => _.$importVue("@/layout/AppLayoutLeft.vue")
		},
		inject: ["APP"],
		computed: {
			isShowLoading() {
				return;
			}
		}
	};
}
</script>

<style lang="less">
.x-app-layout-main {
	display: flex;
	flex-flow: row nowrap;
	height: 100%;
	width: 100%;
	overflow: hidden;

	> .AppLayoutLeft,
	> .AppLayoutContent {
		height: 100%;
	}

	> .AppLayoutContent {
		flex: 1;
		width: 1px;
		display: flex;
		flex-flow: column nowrap;
	}
}
</style>
