<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<div class="demo-controls">
				<el-button type="info" @click="clearSelection">清除选择</el-button>
			</div>
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				:cell-selection-option="cellSelectionOption"
				borderX
				borderY
				@cell-click="handleCellClick" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdDoc: "通过 cellSelectionOption 属性来启用单元格选择功能",
				cellSelectionOption: {
					enable: true
				},
				columns: [
					{ field: "name", key: "a", title: "Name", width: 150 },
					{ field: "age", key: "b", title: "Age", width: 100, align: "center" },
					{ field: "date", key: "c", title: "Tel", width: 200 },
					{ field: "hobby", key: "d", title: "Hobby", width: 300 }
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
			handleCellClick(row, rowIndex, column, colIndex, event) {
				// 单元格点击事件处理
				console.log("Cell clicked:", row, rowIndex, column, colIndex);
			},
			clearSelection() {
				// 清除选择
				this.$refs.table.clearCellSelectionCurrentCell();
			}
		}
	});
}
</script>
<style scoped>
.demo-controls {
	margin-bottom: 16px;
	padding: 12px;
	background-color: #f5f7fa;
	border-radius: 4px;
}
</style>
