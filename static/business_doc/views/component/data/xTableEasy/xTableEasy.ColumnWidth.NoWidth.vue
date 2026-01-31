<template>
	<div>
		<h2>自动宽度</h2>
		<xMd :md="mdDoc" />
		<xTableEasy :columns="columns" :table-data="data" border-x border-y :row-height="40" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdDoc: `当不设置 width 属性时，列会根据内容自动分配宽度`,
				columns: [
					{
						field: "name",
						title: "Name"
					},
					{
						field: "date",
						title: "Date"
					},
					{
						field: "hobby",
						title: "Hobby"
					},
					{
						field: "address",
						title: "Address"
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
