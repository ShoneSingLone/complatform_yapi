<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				borderX
				borderY
				@row-click="handleRowClick" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdDoc: "通过在 columns 配置中添加操作列，实现对表格行的操作",
				columns: [
					{ field: "name", key: "a", title: "Name", width: 150 },
					{ field: "age", key: "b", title: "Age", width: 100, align: "center" },
					{ field: "date", key: "c", title: "Tel", width: 200 },
					{
						field: "action",
						key: "d",
						title: "操作",
						width: 150,
						align: "center",
						render: (row, column, rowIndex, colIndex) => {
							// 自定义操作列渲染
							return `
								<el-button type="primary" size="small" @click="handleEdit('${rowIndex}')">编辑</el-button>
								<el-button type="danger" size="small" @click="handleDelete('${rowIndex}')">删除</el-button>
							`;
						}
					}
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
			handleRowClick(row, rowIndex, event) {
				// 行点击事件处理
				console.log("Row clicked:", row, rowIndex);
			},
			handleEdit(rowIndex) {
				// 编辑操作处理
				console.log("Edit row:", rowIndex);
			},
			handleDelete(rowIndex) {
				// 删除操作处理
				console.log("Delete row:", rowIndex);
			}
		}
	});
}
</script>
