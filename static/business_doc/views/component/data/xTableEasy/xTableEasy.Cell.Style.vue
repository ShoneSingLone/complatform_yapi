<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				:cell-style-option="cellStyleOption"
				borderX
				borderY />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdDoc: "通过 cellStyleOption 属性来自定义单元格样式",
				cellStyleOption: {
					cellStyle: (row, column, rowIndex, colIndex) => {
						// 自定义单元格样式
						if (rowIndex % 2 === 0) {
							return {
								backgroundColor: "#f9f9f9"
							};
						}
						if (column.field === "age" && row.age > 30) {
							return {
								color: "#ff4d4f",
								fontWeight: "bold"
							};
						}
						return {};
					}
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
					},
					{
						name: "Jami",
						age: 26,
						date: "2020-09-20",
						hobby: "coding and coding repeat"
					}
				]
			};
		}
	});
}
</script>
