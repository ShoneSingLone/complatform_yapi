<template>
	<div id="app">
		<AppHeader />
		<main class="x-app-layout-main">
			<div class="AppLayoutContent">
				<KeepAlive>
					<RouterView />
				</KeepAlive>
			</div>
		</main>
		<xMobileTabBar v-model="APP.currentTabName" :data="tabArray" style="background-color: white" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		mounted() {
			document.title = "网盘+";
		},
		components: {
			AppHeader: () => _.$importVue("@/views/CloudDisk/CloudDiskHeader.vue")
		},
		data() {
			return {
				isMobile: true,
				tabArray: [
					{ label: "资源", icon: "_cloud_home_tab" },
					{ label: "传输", icon: "_cloud_trans_tab" },
					{ label: "我的", icon: "_UserOutlined" }
				]
			};
		},
		computed: {
			isShowLoading() {
				return;
			}
		}
	};
}
</script>
