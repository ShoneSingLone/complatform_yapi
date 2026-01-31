<template>
	<div>
		<h3>列宽拖动</h3>
		<p>通过配置 columnWidthResizeOption，可以实现列宽的拖动调整功能。</p>

		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="300"
			:scrollWidth="1000"
			borderX
			borderY
			:columnWidthResizeOption="columnWidthResizeOption" />

		<p style="margin-top: 10px; color: #606266; font-size: 14px">
			提示：将鼠标悬停在列头之间的分隔线上，拖动调整列宽。
		</p>
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
				// 列配置
				columns: [
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
				// 列宽调整配置
				columnWidthResizeOption: {
					enable: true,
					// 最小宽度
					minWidth: 50,
					// 最大宽度
					maxWidth: 500,
					// 宽度调整前回调
					beforeResize: (colKey, colIndex, oldWidth) => {
						console.log("调整前", { colKey, colIndex, oldWidth });
						return true;
					},
					// 宽度调整后回调
					afterResize: (colKey, colIndex, newWidth) => {
						console.log("调整后", { colKey, colIndex, newWidth });
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

p {
	margin: 0 0 15px 0;
	color: #606266;
	font-size: 14px;
}
</style>
