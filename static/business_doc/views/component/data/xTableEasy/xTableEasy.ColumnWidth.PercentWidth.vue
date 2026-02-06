<template>
	<div>
		<h2>百分比宽度</h2>
		<xMd :md="mdDoc" />
		<xTableEasy :columns="columns" :table-data="data" border-x border-y :row-height="40" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdDoc: `通过在 columns 配置中设置 width 属性为百分比值来定义列宽`,
				columns: [
					{
						field: "name",
						title: "Name",
						width: "20%"
					},
					{
						field: "date",
						title: "Date",
						width: "25%"
					},
					{
						field: "hobby",
						title: "Hobby",
						width: "25%"
					},
					{
						field: "address",
						title: "Address",
						width: "30%"
					}
				],
				data: [
					{
						name: "John",
						date: "2023-01-01",
						hobby: "Reading",
						address: "New York"
					},
					{
						name: "Mike",
						date: "2023-01-02",
						hobby: "Gaming",
						address: "London"
					},
					{
						name: "Lisa",
						date: "2023-01-03",
						hobby: "Cooking",
						address: "Paris"
					}
				]
			};
		}
	};
}
</script>

<style lang="less"></style>
