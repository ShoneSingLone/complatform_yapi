<template>
	<xDialog style="--xDialog-wrapper-width: 1024px">
		<xTablebar
			:configs="configsTable"
			style="--xItem-wrapper-width: 300px; --xItem-label-width: 80px">
			<xItem :configs="searchForm.name" />
		</xTablebar>
		<div style="height: 500px">
			<xTableVir class="mt" :columns="configsTable.columns" :data="configsTable.data.list" />
		</div>
		<xPagination :configs="configsTable" />
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ refreshTableData, listData }) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.configsTable.onQuery();
		},
		data(vm) {
			return {
				count: 0,
				errorCount: 0,
				searchForm: defItems({
					name: {
						value: "",
						resetValue: "",
						clearable: true,
						placeholder: i18n("请输入项目名称")
					}
				}),
				configsTable: defTable({
					isShowReset: true,
					data: {
						set: new Set(),
						list: listData || []
					},
					columns: [
						defTable.colSingle({
							by: "_id",
							getConfigs() {
								return vm.configsTable;
							}
						}),
						{
							label: i18n("ID"),
							prop: "_id"
						},
						{ label: i18n("分组"), prop: "group_id" },
						{ label: i18n("名称"), prop: "name" },
						{ label: i18n("描述"), prop: "desc" }
					],
					async onQuery(pagination) {
						_.$loading(true);
						try {
							const { page, size } = _.$setPagination(vm.configsTable, pagination);
							const {
								data: { list, total }
							} = await _api.yapi.project_page({
								page,
								size,
								name: vm.searchForm.name.value
							});
							_.$setTableData(vm.configsTable, {
								list,
								total
							});
						} catch (error) {
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				})
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						refreshTableData();
						vm.closeModal();
					}
				};
			}
		},
		methods: {}
	});
}
</script>
<style lang="less"></style>
