<template>
	<div>
		<h3>Checkbox选择</h3>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="300"
			borderX
			borderY
			:checkboxOption="checkboxOption"
			rowKeyFieldName="id" />

		<h3 style="margin-top: 20px">Radio选择</h3>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="300"
			borderX
			borderY
			:radioOption="radioOption"
			rowKeyFieldName="id" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				// 表格数据
				tableData: [
					{
						id: 1,
						name: "张三",
						age: 18,
						sex: "男",
						phone: "13800000001",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						id: 2,
						name: "李四",
						age: 20,
						sex: "女",
						phone: "13800000002",
						address: "上海市浦东新区张江高科技园区"
					},
					{
						id: 3,
						name: "王五",
						age: 22,
						sex: "男",
						phone: "13800000003",
						address: "北京市海淀区中关村大街 1 号"
					},
					{
						id: 4,
						name: "赵六",
						age: 25,
						sex: "女",
						phone: "13800000004",
						address: "广州市天河区天河路 385 号"
					},
					{
						id: 5,
						name: "钱七",
						age: 28,
						sex: "男",
						phone: "13800000005",
						address: "深圳市南山区科技园南区"
					}
				],
				// 列配置
				columns: [
					{
						colKey: "name",
						field: "name",
						title: "姓名",
						width: 120,
						align: "left"
					},
					{
						colKey: "age",
						field: "age",
						title: "年龄",
						width: 80,
						align: "center"
					},
					{
						colKey: "sex",
						field: "sex",
						title: "性别",
						width: 80,
						align: "center"
					},
					{
						colKey: "phone",
						field: "phone",
						title: "电话号码",
						width: 150,
						align: "left"
					}
				],
				// Checkbox选择配置
				checkboxOption: {
					enable: true,
					selectedRowKeys: [],
					selectAll: false,
					onChange: (selectedRowKeys, selectedRows) => {
						console.log("Checkbox选择变化:", selectedRowKeys, selectedRows);
					}
				},
				// Radio选择配置
				radioOption: {
					enable: true,
					selectedRowKey: null,
					onChange: (selectedRowKey, selectedRow) => {
						console.log("Radio选择变化:", selectedRowKey, selectedRow);
					}
				}
			};
		}
	};
}
</script>
<style lang="less">
h3 {
	margin: 0 0 10px 0;
	font-size: 16px;
	font-weight: 500;
}
</style>
