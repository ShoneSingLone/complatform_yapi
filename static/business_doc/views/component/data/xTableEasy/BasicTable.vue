<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy :columns="columns" :table-data="tableData" borderX borderY />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdDoc: "这是一个基础的 xTableEasy 表格示例，展示了最基本的表格功能。",
				columns: [
					{ field: "name", key: "a", title: "Name", width: 100 },
					{ field: "date", key: "b", title: "Date", width: 150 },
					{ field: "hobby", key: "c", title: "Hobby", width: 200 },
					{ field: "address", key: "d", title: "Address", width: 300 }
				],
				tableData: [
					{
						name: "John",
						date: "1900-05-20",
						hobby: "coding",
						address: "No.1 Century Avenue, Shanghai"
					},
					{
						name: "Dickerson",
						date: "1910-06-20",
						hobby: "reading",
						address: "No.1 Century Avenue, Beijing"
					},
					{
						name: "Larsen",
						date: "2000-07-20",
						hobby: "swimming",
						address: "No.1 Century Avenue, Chongqing"
					},
					{
						name: "Geneva",
						date: "2010-08-20",
						hobby: "running",
						address: "No.1 Century Avenue, Xiamen"
					},
					{
						name: "Jami",
						date: "2020-09-20",
						hobby: "painting",
						address: "No.1 Century Avenue, Shenzhen"
					}
				]
			};
		}
	};
}
</script>
<style lang="less"></style>