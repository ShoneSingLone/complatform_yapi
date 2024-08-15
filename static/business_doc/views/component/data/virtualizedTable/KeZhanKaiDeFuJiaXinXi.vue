<template>
	<div>
		<xMd :md="md" />
		<div>configsTable.data.expandedRowKeys: {{ configsTable.data.expandedRowKeys }}</div>
		<xTableVir
			fixed
			:columns="configsTable.columns"
			:data="configsTable.data.list"
			:height="500"
			:expandedRowKeys.sync="configsTable.data.expandedRowKeys"
			:estimated-row-height="50"
			:slotsRow="customizedRender"
			:expandColumnKey="'detail'" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		mounted() {
			this.configsTable.onQuery();
		},
		data() {
			const vm = this;
			return {
				md: `使用动态高度渲染，您也可以在表格中显示详细的视图。`,
				selected: {},
				configsTable: defTable({
					onQuery() {
						const list = _.map(new Array(20), (i, rowIndex) => {
							return {
								id: rowIndex,
								column1: `row_${rowIndex + 1}`,
								column2: `row_${rowIndex + 1}`,
								column3: `row_${rowIndex + 1}`,
								children: _.map(new Array(1), (i, subRowIndex) => {
									return {
										parentId: rowIndex,
										id: `${rowIndex}-${subRowIndex}`,
										column1: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										column2: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										column3: `sub_row_${rowIndex + 1}_${subRowIndex + 1}`,
										detail: true
									};
								})
							};
						});

						_.$setTableData(vm.configsTable, {
							list,
							total: list.length
						});
					},
					data: {
						list: [],
						expandedRowKeys: [0]
					},
					columns: [
						defTable.colExpandArrow({
							width: 30
						}),
						{ prop: "column1", label: i18n("column1") },
						{ prop: "column2", label: i18n("column2") },
						{ prop: "column3", label: i18n("column3") }
					]
				})
			};
		},
		methods: {
			customizedRender(props) {
				const { cells, rowIndex, rowData } = props;
				if (rowData.detail) {
					return h("div", [JSON.stringify(rowData)]);
				} else {
					return cells;
				}
			}
		}
	});
}
</script>
