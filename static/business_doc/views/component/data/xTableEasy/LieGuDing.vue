<template>
	<div>
		<h3>列固定</h3>
		<p>通过配置 columns 的 fixed 属性，可以实现列的固定，支持 left 和 right 两种固定方式。</p>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="400"
			:scrollWidth="1200"
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
						address: "上海市普陀区金沙江路 1518 弄",
						status: 1,
						score: 95,
						rank: 1,
						class: "一班",
						school: "第一中学"
					},
					{
						id: 2,
						name: "李四",
						age: 20,
						sex: "女",
						phone: "13800000002",
						email: "lisi@example.com",
						address: "上海市浦东新区张江高科技园区",
						status: 2,
						score: 88,
						rank: 2,
						class: "二班",
						school: "第二中学"
					}
				],
				// 列配置 - 包含固定列
				columns: [
					{
						colKey: "id",
						field: "id",
						title: "ID",
						width: 80,
						align: "center",
						// 固定在左侧
						fixed: "left"
					},
					{
						colKey: "name",
						field: "name",
						title: "姓名",
						width: 120,
						align: "left",
						// 固定在左侧
						fixed: "left"
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
					},
					{
						colKey: "class",
						field: "class",
						title: "班级",
						width: 100,
						align: "center"
					},
					{
						colKey: "school",
						field: "school",
						title: "学校",
						width: 150,
						align: "left"
					},
					{
						colKey: "status",
						field: "status",
						title: "状态",
						width: 120,
						align: "center",
						cellRenderer: (row, column, rowIndex, colIndex) => {
							const statusMap = {
								1: "<span style='color: green;'>正常</span>",
								2: "<span style='color: orange;'>待审核</span>",
								3: "<span style='color: red;'>已禁用</span>"
							};
							return statusMap[row.status] || "未知";
						}
					},
					{
						colKey: "score",
						field: "score",
						title: "分数",
						width: 100,
						align: "center",
						// 固定在右侧
						fixed: "right"
					},
					{
						colKey: "rank",
						field: "rank",
						title: "排名",
						width: 80,
						align: "center",
						// 固定在右侧
						fixed: "right"
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

p {
	margin: 0 0 15px 0;
	color: #606266;
	font-size: 14px;
}
</style>
