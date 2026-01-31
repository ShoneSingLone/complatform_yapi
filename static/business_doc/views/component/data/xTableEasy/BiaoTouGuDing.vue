<template>
	<div>
		<h3>表头固定</h3>
		<p>通过配置 fixedHeader 属性，可以实现表头的固定功能，当表格内容滚动时，表头保持可见。</p>

		<h4>固定表头</h4>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="300"
			fixedHeader
			borderX
			borderY />

		<h4 style="margin-top: 20px">不固定表头</h4>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="300"
			:fixedHeader="false"
			borderX
			borderY />

		<h4 style="margin-top: 20px">同时固定表头和表尾</h4>
		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:footerData="footerData"
			:maxHeight="300"
			fixedHeader
			fixedFooter
			borderX
			borderY />
	</div>
</template>
<script lang="ts">
export default async function () {
	// 生成大量测试数据
	const generateTestData = () => {
		const data = [];
		for (let i = 0; i < 30; i++) {
			data.push({
				id: i + 1,
				name: `用户${i + 1}`,
				age: 18 + Math.floor(Math.random() * 30),
				sex: Math.random() > 0.5 ? "男" : "女",
				phone: `138000000${String(i).padStart(2, "0")}`,
				address: `上海市浦东新区张江高科技园区 ${i + 1} 号`
			});
		}
		return data;
	};

	return {
		data() {
			return {
				// 表格数据
				tableData: generateTestData(),
				// 表尾数据
				footerData: [
					{
						id: "合计",
						name: "",
						age: 0,
						sex: "",
						phone: "",
						address: ""
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
