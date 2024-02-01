<template>
	<div class="page-view flex1" id="ProjectSetting">
		<xTabs v-model="cptProjectInterfaceTab">
			<xTabPane label="预览" name="1"> <ProjectInterfaceSectionInterfaceDetailPreview /> </xTabPane>
			<xTabPane label="编辑" name="2" ><ProjectInterfaceSectionInterfaceDetailEditor v-if="detailInfo" :detailInfo="detailInfo" /> </xTabPane>
		</xTabs>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { useTabName } = await _.$importVue("/common/utils/hooks.vue");

	return {
		inject: ["APP", "inject_project"],
		provide() {
			return {
				inject_interface_section_interface_detail: this
			};
		},
		components: {
			ProjectInterfaceSectionInterfaceDetailPreview: () => _.$importVue("@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetailPreview.vue"),
			ProjectInterfaceSectionInterfaceDetailEditor: () => _.$importVue("@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetailEditor.vue")
		},
		setup() {
			const cptProjectInterfaceTab = useTabName({ vm: this, propName: "project_interface_tab", defaultName: "2" });
			return {
				cptProjectInterfaceTab
			};
		},
		data() {
			return {
				detailInfo: false
			};
		},
		computed: {
			isShow() {
				return this.inject_project.cptTabName === "设置";
			}
		},
		methods: {
			async updateInterface() {
				let { data: detailInfo } = await _api.yapi.interface_get_by_id({ id: this.APP.cptInterfaceId });
				this.detailInfo = detailInfo;
			}
		},
		watch: {
			"APP.cptInterfaceId": {
				immediate: true,
				handler(id) {
					if (id) {
						this.updateInterface();
					}
				}
			}
		}
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
			.el-tab-pane {
				height: 100%;
			}
		}
	}
}
</style>
