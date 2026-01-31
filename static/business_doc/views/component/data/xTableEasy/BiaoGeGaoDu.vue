<template>
	<div>
		<h3>表格高度</h3>
		<p>通过配置 maxHeight 属性，可以设置表格的最大高度，当内容超过时会显示滚动条。</p>

		<h4>固定高度</h4>
		<xTableEasy :columns="columns" :tableData="tableData" :maxHeight="300" borderX borderY />

		<h4 style="margin-top: 20px">自适应高度</h4>
		<xTableEasy :columns="columns" :tableData="tableData" borderX borderY />

		<h4 style="margin-top: 20px">百分比高度</h4>
		<div
			style="height: 300px; border: 1px solid #e8e8e8; padding: 10px; box-sizing: border-box">
			<xTableEasy
				:columns="columns"
				:tableData="tableData"
				:maxHeight="'100%'"
				borderX
				borderY />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	// 生成大量测试数据
	const generateTestData = () => {
		const data = [];
		for (let i = 0; i < 20; i++) {
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
