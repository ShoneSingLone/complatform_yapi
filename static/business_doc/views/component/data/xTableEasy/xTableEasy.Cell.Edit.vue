<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				:edit-option="editOption"
				borderX
				borderY
				@cell-edit="handleCellEdit" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdDoc: "通过 editOption 属性来启用单元格编辑功能",
				editOption: {
					enable: true,
					editMode: "click"
				},
				columns: [
					{ field: "name", key: "a", title: "Name", width: 150, edit: true },
					{
						field: "age",
						key: "b",
						title: "Age",
						width: 100,
						align: "center",
						edit: true
					},
					{ field: "date", key: "c", title: "Tel", width: 200, edit: true },
					{ field: "hobby", key: "d", title: "Hobby", width: 300, edit: true }
				],
				tableData: [
					{
						name: "John",
						age: 28,
						date: "1900-05-20",
						hobby: "coding and coding repeat"
					},
					{
						name: "Dickerson",
						age: 32,
						date: "1910-06-20",
						hobby: "coding and coding repeat"
					},
					{
						name: "Larsen",
						age: 25,
						date: "2000-07-20",
						hobby: "coding and coding repeat"
					},
					{
						name: "Geneva",
						age: 35,
						date: "2010-08-20",
						hobby: "coding and coding repeat"
					}
				]
			};
		},
		methods: {
			handleCellEdit(row, rowIndex, column, colIndex, value) {
				// 单元格编辑事件处理
				console.log("Cell edited:", row, rowIndex, column, colIndex, value);
				// 保存编辑后的值
				this.tableData[rowIndex][column.field] = value;
			}
		}
	});
}
</script>
