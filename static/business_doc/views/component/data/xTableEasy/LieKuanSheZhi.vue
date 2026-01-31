<template>
	<div>
		<h3>列宽设置</h3>
		<p>通过配置 columns 的 width 属性，可以设置列的宽度，支持像素和百分比两种单位。</p>

		<h4>像素宽度</h4>
		<xTableEasy
			:columns="columnsPixel"
			:tableData="tableData"
			:maxHeight="300"
			borderX
			borderY />

		<h4 style="margin-top: 20px">百分比宽度</h4>
		<xTableEasy
			:columns="columnsPercent"
			:tableData="tableData"
			:maxHeight="300"
			:scrollWidth="1000"
			borderX
			borderY />

		<h4 style="margin-top: 20px">自动宽度</h4>
		<xTableEasy
			:columns="columnsAuto"
			:tableData="tableData"
			:maxHeight="300"
			borderX
			borderY />
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
						email: "zhangsan@example.com",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						id: 2,
						name: "李四",
						age: 20,
						sex: "女",
						phone: "13800000002",
						email: "lisi@example.com",
						address: "上海市浦东新区张江高科技园区"
					}
				],
				// 像素宽度列配置
				columnsPixel: [
					{
						colKey: "id",
						field: "id",
						title: "ID",
						width: 80,
						align: "center"
					},
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
					},
					{
						colKey: "email",
						field: "email",
						title: "邮箱",
						width: 200,
						align: "left"
					},
					{
						colKey: "address",
						field: "address",
						title: "地址",
						width: 250,
						align: "left"
					}
				],
				// 百分比宽度列配置
				columnsPercent: [
					{
						colKey: "id",
						field: "id",
						title: "ID",
						width: "5%",
						align: "center"
					},
					{
						colKey: "name",
						field: "name",
						title: "姓名",
						width: "10%",
						align: "left"
					},
					{
						colKey: "age",
						field: "age",
						title: "年龄",
						width: "8%",
						align: "center"
					},
					{
						colKey: "sex",
						field: "sex",
						title: "性别",
						width: "8%",
						align: "center"
					},
					{
						colKey: "phone",
						field: "phone",
						title: "电话号码",
						width: "15%",
						align: "left"
					},
					{
						colKey: "email",
						field: "email",
						title: "邮箱",
						width: "20%",
						align: "left"
					},
					{
						colKey: "address",
						field: "address",
						title: "地址",
						width: "34%",
						align: "left"
					}
				],
				// 自动宽度列配置
				columnsAuto: [
					{
						colKey: "id",
						field: "id",
						title: "ID",
						align: "center"
					},
					{
						colKey: "name",
						field: "name",
						title: "姓名",
						align: "left"
					},
					{
						colKey: "age",
						field: "age",
						title: "年龄",
						align: "center"
					},
					{
						colKey: "sex",
						field: "sex",
						title: "性别",
						align: "center"
					},
					{
						colKey: "phone",
						field: "phone",
						title: "电话号码",
						align: "left"
					},
					{
						colKey: "email",
						field: "email",
						title: "邮箱",
						align: "left"
					},
					{
						colKey: "address",
						field: "address",
						title: "地址",
						align: "left"
					}
				]
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

h4 {
	margin: 15px 0 10px 0;
	font-size: 14px;
	font-weight: 500;
}

p {
	margin: 0 0 15px 0;
	color: #606266;
	font-size: 14px;
}
</style>
