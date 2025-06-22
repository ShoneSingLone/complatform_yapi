<style lang="less">
#ProjectCi {
}
</style>
<template>
	<div id="ProjectCi" class="x-page-view flex1" v-if="isShow">
		<!-- <xPageTitle :title="i18n('标题使用i18n的key')" /> -->
		<xPageContent>
			<div class="x-padding">
				<xMd :md="mdString" />
				<xGap t />
			</div>
			<div>
				<xBtn :configs="configsAddNewGitrepo" />
			</div>
			<xTablebar :configs="configsTable">
				<xBtn @click="test">test</xBtn>
			</xTablebar>
			<div class="mt" style="height: 500px">
				<xTableVir :columns="configsTable.columns" :data="configsTable.data.list" />
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project"],
		setup() {
			const vm = this;

			const configsTable = reactive(
				defTable({
					// isHideQuery: true,
					// isHideFilter: true,
					// isHidePagination: true,
					async onQuery(pagination = {}) {
						try {
							const { errcode, data } = await _api.yapi.apiCicdGitAddressList({
								project_id: vm.APP.cptProjectId
							});
							if (_.$isSame(errcode, 0)) {
								_.$setTableData(configsTable, { list: data.list });
							}
						} catch (error) {}
					},
					data: {
						set: new Set(),
						list: []
					},
					columns: [
						{ prop: "alias", label: "别名" },
						{ prop: "git_address", label: "Git地址" },
						{ prop: "status", label: "仓库状态" },
						defTable.colActions({
							width: 210,
							cellRenderer({ rowData }) {
								return hBtnWithMore({
									children: [
										{
											label: "初始化仓库",
											isHide: rowData.status !== "unset",
											async onClick() {
												return _.$openModal({
													parent: vm,
													title: "CloneRepo",
													url: "@/views/Api/Project/Tabs/ProjectCi/ProjectCi.GitRepo.Clone.dialog.vue",
													row: rowData,
													isHideHeader: true,
													onSuccess() {
														configsTable.onQuery();
													}
												});
											}
										}
									]
								});
							}
						})
					]
				})
			);
			onMounted(() => {
				configsTable.onQuery();
			});
			return {
				test() {
					return _.$sleep(1000 * 500);
				},
				configsTable,
				isShow: computed(() => {
					return vm.inject_project.cpt_tab_name === "CI";
				}),
				configsAddNewGitrepo: {
					label: "添加代码仓库",
					async onClick() {
						_.$openModal({
							project_id: vm.APP.cptProjectId,
							title: "添加代码仓库",
							url: "@/views/Api/Project/Tabs/ProjectCi/ProjectCi.GitRepo.Add.dialog.vue",
							onSuccess() {
								configsTable.onQuery();
							}
						});
					}
				},
				mdString: `# CI项目
1.添加代码仓库
- 可以有多个代码仓库，但是属于同一个项目
1.代码仓库状态？是否已经初始化（下载到服务器）
                `
			};
		}
	});
}
</script>
