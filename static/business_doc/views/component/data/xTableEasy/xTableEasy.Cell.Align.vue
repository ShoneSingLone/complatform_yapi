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
	return defineComponent({
		data() {
			return {
				mdDoc: "通过在 columns 配置中设置 align 属性来控制单元格对齐方式",
				columns: [
					{ field: "name", key: "a", title: "左对齐", width: 150, align: "left" },
					{ field: "age", key: "b", title: "居中对齐", width: 150, align: "center" },
					{ field: "date", key: "c", title: "右对齐", width: 200, align: "right" },
					{ field: "hobby", key: "d", title: "左对齐", width: 300, align: "left" }
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
						age: 30,
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
