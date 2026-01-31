<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				:contextmenu-body-option="contextmenuBodyOption"
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
				mdDoc: "通过 contextmenuBodyOption 属性来启用右键菜单功能",
				contextmenuBodyOption: {
					contextmenus: [
						{
							label: "查看详情",
							action: (row, rowIndex) => {
								console.log("查看详情:", row, rowIndex);
							}
						},
						{
							label: "编辑",
							action: (row, rowIndex) => {
								console.log("编辑:", row, rowIndex);
							}
						},
						{
							label: "删除",
							action: (row, rowIndex) => {
								console.log("删除:", row, rowIndex);
							}
						}
					]
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
		}
	});
}
</script>
