<template>
	<div class="x-page-view flex1" id="ProjectSetting">
		<xPageContent>
			<xTabs v-model="cpt_project_setting_tab_name">
				<xTabPane
					:label="item.label"
					:name="item.name"
					v-for="(item, index) in tabArray"
					:key="index" />
			</xTabs>
			<div class="slide-container">
				<div class="slide-wrapper" :style="cpt_item_style">
					<component
						:is="item.component"
						v-for="item in tabArray"
						:key="item.label"
						class="slide" />
				</div>
			</div>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { useTabName } = await _.$importVue("/common/utils/hooks.vue");

	return {
		name: "ProjectSettingVue",
		inject: ["APP", "inject_project"],
		setup() {
			const tabArray = [
				{
					label: "项目配置",
					name: "common",
					component: () =>
						_.$importVue(
							"@/views/Api/Project/Tabs/ProjectSettingPanelCommon.vue"
						)
				},
				{
					label: "项目成员",
					name: "member_list",
					component: () =>
						_.$importVue(
							"@/views/Api/Project/Tabs/ProjectSettingPanelMemberList.vue"
						)
				},
				{
					label: "请求配置",
					name: "req_frontend_code",
					component: () =>
						_.$importVue(
							"@/views/Api/Project/Tabs/ProjectSettingPanelReqFrontendCode.vue"
						)
				},
				{
					label: "数据导入导出",
					name: "data_import_export",
					component: () =>
						_.$importVue(
							"@/views/Api/Project/Tabs/ProjectSettingPanelDataImportExport.vue"
						)
				}
				/* 
环境配置
token配置
全局mock脚本
Swagger自动同步 */
			];
			const cpt_project_setting_tab_name = useTabName({
				vm: this,
				propName: "project_setting_tab",
				defaultName: _.first(tabArray).name
			});

			const cpt_current_index = computed(() => {
				return _.findIndex(tabArray, {
					name: cpt_project_setting_tab_name.value
				});
			});

			const cpt_item_style = computed(() => {
				return {
					transform: "translateX(" + -cpt_current_index.value * 100 + "%)"
				};
			});

			return {
				cpt_project_setting_tab_name,
				cpt_item_style,
				tabArray
			};
		},
		computed: {},
		methods: {}
	};
}
</script>

<style scoped lang="scss">
#ProjectSetting {
	position: relative;
	width: 100%;

	.slide-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		.slide-wrapper {
			display: flex;
			height: 100%;
			transition: transform 0.5s ease-in-out;
		}

		.slide {
			min-width: 100%;
			max-width: 100%;
			height: 100%;
			display: flex;
			overflow: auto;
		}
	}
}
</style>
