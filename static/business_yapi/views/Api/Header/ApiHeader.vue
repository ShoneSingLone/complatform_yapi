<template>
	<header class="AppLayoutHeader flex middle">
		<span class="flex middle YapiLogo pointer" @click="goToGroup">
			<xIcon :icon="icon" :style="logoStyle" />
		</span>
		<YapiBreadcrumbNavigation />
		<xGap f />
		<a class="flex middle" :href="i18nHref" target="_blank">
			<xIcon icon="_icon_i18n" />
		</a>
		<xGap r="4" />
		<a class="flex middle" :href="publicNoteHref" target="_blank">
			<xIcon icon="_wikidoc" />
		</a>
		<xGap r="4" />
		<a class="flex middle" :href="privateExploreHref" target="_blank">
			<xIcon icon="_wikidoc" />
		</a>
		<xGap f />
		<YapiToolUserBar />
	</header>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		name: "AppLayoutHeader",
		components: {
			YapiToolUserBar: () => _.$importVue("@/components/YapiToolUserBar.vue"),
			YapiBreadcrumbNavigation: () => _.$importVue("@/components/YapiBreadcrumbNavigation.vue")
		},
		data() {
			return {};
		},
		computed: {
			i18nHref() {
				return _.$aHashLink("/i18n", {});
			},
			publicNoteHref() {
				return _.$aHashLink("/note", {});
			},
			privateExploreHref() {
				return _.$aHashLink("/explore", {});
			},
			icon() {
				if (["/api/group", "/wiki", "/xI"].includes(this.$route.path)) {
					return "_yapi_logo";
				}
				return "_yapi_logo";
			},
			logoStyle() {
				return { width: "48px", height: "48px" };
			}
		},
		methods: {
			goToGroup() {
				this.$router.push("/api/group");
			}
		}
	};
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
	.YapiLogo {
		box-shadow: var(--el-box-shadow-lighter);
		// border: 1px solid gray;
		border-radius: 50%;
		margin-right: var(--ui-one);
	}
}
</style>
