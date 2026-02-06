<template>
	<div>
		<h3>单元格编辑</h3>
		<p>通过配置 editOption，可以实现单元格的编辑功能，支持多种编辑类型。</p>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="400"
			borderX
			borderY
			rowKeyFieldName="id"
			:editOption="editOption" />
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
						score: 95,
						status: 1
					},
					{
						id: 2,
						name: "李四",
						age: 20,
						sex: "女",
						phone: "13800000002",
						email: "lisi@example.com",
						score: 88,
						status: 2
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
						align: "left",
						// 启用编辑
						edit: true
					},
					{
						colKey: "age",
						field: "age",
						title: "年龄",
						width: 80,
						align: "center",
						// 启用编辑
						edit: true,
						// 数字类型编辑
						editType: "number",
						editOption: {
							min: 0,
							max: 120,
							step: 1
						}
					},
					{
						colKey: "sex",
						field: "sex",
						title: "性别",
						width: 80,
						align: "center",
						// 启用编辑
						edit: true,
						// 下拉选择类型编辑
						editType: "select",
						editOption: {
							options: [
								{ value: "男", label: "男" },
								{ value: "女", label: "女" }
							]
						}
					},
					{
						colKey: "phone",
						field: "phone",
						title: "电话号码",
						width: 150,
						align: "left",
						// 启用编辑
						edit: true
					},
					{
						colKey: "email",
						field: "email",
						title: "邮箱",
						width: 200,
						align: "left",
						// 启用编辑
						edit: true
					},
					{
						colKey: "score",
						field: "score",
						title: "分数",
						width: 100,
						align: "center",
						// 启用编辑
						edit: true,
						// 数字类型编辑
						editType: "number",
						editOption: {
							min: 0,
							max: 100,
							step: 1
						}
					},
					{
						colKey: "status",
						field: "status",
						title: "状态",
						width: 120,
						align: "center",
						// 启用编辑
						edit: true,
						// 开关类型编辑
						editType: "switch",
						cellRenderer: (row, column, rowIndex, colIndex) => {
							return row.status === 1
								? `<span style='color: green;'>启用</span>`
								: `<span style='color: red;'>禁用</span>`;
						}
					}
				],
				// 编辑配置
				editOption: {
					enable: true,
					// 双击编辑
					mode: "dblclick",
					// 编辑前回调
					beforeEdit: (row, column, rowIndex, colIndex) => {
						console.log("编辑前", { row, column, rowIndex, colIndex });
						// 返回false可以阻止编辑
						return true;
					},
					// 编辑中回调
					onEditing: (row, column, value, rowIndex, colIndex) => {
						console.log("编辑中", { row, column, value, rowIndex, colIndex });
					},
					// 编辑完成回调
					afterEdit: (row, column, oldValue, newValue, rowIndex, colIndex) => {
						console.log("编辑完成", {
							row,
							column,
							oldValue,
							newValue,
							rowIndex,
							colIndex
						});
						// 这里可以发送请求保存数据
						// return false; // 返回false可以回滚编辑
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
