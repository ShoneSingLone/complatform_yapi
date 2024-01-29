<template>
	<div class="page-view flex1" v-if="isShow" id="ProjectSetting">
		<xPageContent>
			<xTabs v-model="cptProjectSettingTab">
				<xTabPane label="项目配置" name="1"> <ProjectSettingPanelCommon /> </xTabPane>
				<xTabPane label="环境配置" name="2"> RegForm </xTabPane>
				<xTabPane label="请求配置" name="3"> RegForm </xTabPane>
				<xTabPane label="token配置" name="4"> RegForm </xTabPane>
				<xTabPane label="全局mock脚本" name="5"> RegForm </xTabPane>
				<xTabPane label="Swagger自动同步" name="6"> RegForm </xTabPane>
				<xTabPane label="数据导入导出" name="7">
					<ProjectSettingPanelDataImportExport />
				</xTabPane>
			</xTabs>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { useTabName } = await _.$importVue("/common/utils/hooks.vue");

	return {
		name: "CtyunecsEvsList",
		inject: ["APP", "inject_project"],
		components: {
			ProjectSettingPanelCommon: () => _.$importVue("@/views/Api/Project/Tabs/ProjectSettingPanelCommon.vue"),
			ProjectSettingPanelDataImportExport: () => _.$importVue("@/views/Api/Project/Tabs/ProjectSettingPanelDataImportExport.vue")
		},
		setup() {
			const cptProjectSettingTab = useTabName({ vm: this, propName: "project_setting_tab", defaultName: "1" });
			return {
				cptProjectSettingTab
			};
		},
		data() {
			return {};
		},
		computed: {
			isShow() {
				return this.inject_project.cptTabName === "设置";
			}
		},
		methods: {}
	};
}
</script>

<style scoped lang="scss">
#ProjectSetting {
	.el-tabs {
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		> .el-tabs__content {
			flex: 1;
			.el-tab-pane{
				height: 100%;
			}
		}
	}
}
</style>
