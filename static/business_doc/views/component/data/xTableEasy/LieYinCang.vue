<template>
	<div>
		<h3>列隐藏</h3>
		<p>通过配置 columnHiddenOption，可以实现列的隐藏和显示功能。</p>

		<div style="margin-bottom: 15px">
			<h4>列显示控制</h4>
			<div style="display: flex; gap: 10px; flex-wrap: wrap">
				<label
					v-for="column in columns"
					:key="column.colKey"
					style="display: flex; align-items: center; gap: 5px">
					<input
						type="checkbox"
						v-model="visibleColumns[column.colKey]"
						@change="handleColumnVisibilityChange" />
					{{ column.title }}
				</label>
			</div>
		</div>

		<xTableEasy
			:columns="filteredColumns"
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
				// 原始列配置
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
				// 列可见性配置
				visibleColumns: {
					id: true,
					name: true,
					age: true,
					sex: true,
					phone: true,
					email: false,
					address: true
				}
			};
		},
		computed: {
			// 过滤后的列配置
			filteredColumns() {
				return this.columns.filter(column => this.visibleColumns[column.colKey]);
			}
		},
		methods: {
			// 处理列可见性变化
			handleColumnVisibilityChange() {
				console.log("列可见性变化", this.visibleColumns);
				// 可以在这里保存列的可见性配置
			}
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
