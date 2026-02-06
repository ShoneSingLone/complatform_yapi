<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				:cell-span-option="cellSpanOption"
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
				mdDoc: "通过 cellSpanOption 属性来自定义单元格合并",
				cellSpanOption: {
					cellSpan: (row, column, rowIndex, colIndex) => {
						// 自定义单元格合并逻辑
						if (rowIndex === 0 && colIndex === 0) {
							return {
								rowspan: 2,
								colspan: 1
							};
						}
						if (rowIndex === 0 && colIndex === 1) {
							return {
								rowspan: 1,
								colspan: 2
							};
						}
						if (rowIndex === 1 && colIndex === 1) {
							return {
								rowspan: 1,
								colspan: 0 // 隐藏当前单元格
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
					}
				]
			};
		}
	});
}
</script>
