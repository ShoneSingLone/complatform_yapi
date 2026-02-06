<template>
	<div>
		<h3>行样式定制</h3>
		<p>通过配置 rowStyleOption，可以实现行样式的定制，包括斑马纹、悬停高亮和点击高亮。</p>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="400"
			borderX
			borderY
			rowKeyFieldName="id"
			:rowStyleOption="rowStyleOption" />
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
						address: "上海市普陀区金沙江路 1518 弄",
						score: 95,
						status: 1
					},
					{
						id: 2,
						name: "李四",
						age: 20,
						sex: "女",
						phone: "13800000002",
						address: "上海市浦东新区张江高科技园区",
						score: 88,
						status: 2
					},
					{
						id: 3,
						name: "王五",
						age: 22,
						sex: "男",
						phone: "13800000003",
						address: "北京市海淀区中关村大街 1 号",
						score: 76,
						status: 3
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
						colKey: "address",
						field: "address",
						title: "地址",
						width: 250,
						align: "left"
					},
					{
						colKey: "score",
						field: "score",
						title: "分数",
						width: 100,
						align: "center"
					}
				],
				// 行样式配置
				rowStyleOption: {
					// 斑马纹
					stripe: true,
					// 悬停高亮
					hoverHighlight: true,
					// 点击高亮
					clickHighlight: true,
					// 自定义行样式
					rowStyle: (row, rowIndex) => {
						// 根据分数动态设置行背景色
						if (row.score >= 90) {
							return { backgroundColor: "rgba(72, 187, 120, 0.1)" };
						} else if (row.score >= 80) {
							return { backgroundColor: "rgba(64, 158, 255, 0.1)" };
						} else if (row.score >= 60) {
							return { backgroundColor: "rgba(250, 173, 20, 0.1)" };
						} else {
							return { backgroundColor: "rgba(245, 108, 108, 0.1)" };
						}
					},
					// 自定义行类名
					rowClass: (row, rowIndex) => {
						return {
							"row-high-score": row.score >= 90,
							"row-middle-score": row.score >= 80 && row.score < 90,
							"row-low-score": row.score < 60
						};
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

/* 自定义行样式类 */
:deep(.x-table-easy) {
	.row-high-score {
		td {
			font-weight: bold;
			color: #67c23a;
		}
	}

	.row-middle-score {
		td {
			font-weight: bold;
			color: #409eff;
		}
	}

	.row-low-score {
		td {
			font-weight: bold;
			color: #f56c6c;
		}
	}
}
</style>
