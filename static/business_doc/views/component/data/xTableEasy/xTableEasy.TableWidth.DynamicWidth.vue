<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				:scrollWidth="'calc(100% - 20px)'"
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
				mdDoc: '表格的动态宽度，可以通过 `style="width:calc(100vw - 300px)"` 方式设置。此表格容器宽度为100vw - 300px',
				columns: [
					{ field: "name", key: "a", title: "Name", width: 100 },
					{ field: "date", key: "b", title: "Tel", width: 200 },
					{ field: "hobby", key: "c", title: "Hobby", width: 300 },
					{ field: "address", key: "d", title: "Address", width: 300 }
				],
				tableData: [
					{
						name: "John",
						date: "1900-05-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Shanghai"
					},
					{
						name: "Dickerson",
						date: "1910-06-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Beijing"
					},
					{
						name: "Larsen",
						date: "2000-07-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Chongqing"
					},
					{
						name: "Geneva",
						date: "2010-08-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Xiamen"
					},
					{
						name: "Jami",
						date: "2020-09-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Shenzhen"
					}
				]
			};
		}
	});
}
</script>
