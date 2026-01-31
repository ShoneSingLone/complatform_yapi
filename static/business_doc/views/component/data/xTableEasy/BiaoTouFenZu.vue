<template>
	<div>
		<h3>表头分组</h3>
		<p>通过配置 columns 的 children 属性，可以创建多级表头，使表格结构更加清晰。</p>
		<xTableEasy :columns="columns" :tableData="tableData" :maxHeight="400" borderX borderY />
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
						rank: 1
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
						rank: 2
					},
					{
						id: 3,
						name: "王五",
						age: 22,
						sex: "男",
						phone: "13800000003",
						email: "wangwu@example.com",
						address: "北京市海淀区中关村大街 1 号",
						status: 3,
						score: 76,
						rank: 3
					},
					{
						id: 4,
						name: "赵六",
						age: 25,
						sex: "女",
						phone: "13800000004",
						email: "zhaoliu@example.com",
						address: "广州市天河区天河路 385 号",
						status: 1,
						score: 92,
						rank: 4
					},
					{
						id: 5,
						name: "钱七",
						age: 28,
						sex: "男",
						phone: "13800000005",
						email: "qianqi@example.com",
						address: "深圳市南山区科技园南区",
						status: 2,
						score: 84,
						rank: 5
					}
				],
				// 列配置 - 包含多级表头
				columns: [
					{
						colKey: "id",
						field: "id",
						title: "ID",
						width: 80,
						align: "center"
					},
					{
						title: "基本信息",
						children: [
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
							}
						]
					},
					{
						title: "联系方式",
						children: [
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
						]
					},
					{
						title: "学习信息",
						children: [
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
								title: "成绩信息",
								children: [
									{
										colKey: "score",
										field: "score",
										title: "分数",
										width: 100,
										align: "center"
									},
									{
										colKey: "rank",
										field: "rank",
										title: "排名",
										width: 80,
										align: "center"
									}
								]
							}
						]
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
