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
		<xMobileTabBar :value="APP.currentTabName" :data="tabArray" style="background-color: white" @change="mTabChange" />
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
					{ label: "资源", icon: "_cloud_home_tab", path: "/resource" },
					{ label: "传输", icon: "_cloud_trans_tab", path: "/transfer" },
					{ label: "我的", icon: "_UserOutlined", path: "/me" }
				]
			};
		},
		computed: {
			isShowLoading() {
				return;
			}
		},
		methods: {
			mTabChange(label) {
				this.APP.currentTabName = label;
				const { path } = _.find(this.tabArray, { label });
				this.$nextTick(() => {
					this.$router.push({
						path,
						query: {
							...this.$route.query
						}
					});
				});
			}
		}
	};
}
</script>
