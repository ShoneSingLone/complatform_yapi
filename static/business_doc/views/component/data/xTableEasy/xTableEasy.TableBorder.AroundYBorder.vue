<template>
	<div>
		<h2>外边框 + 纵向边框</h2>
		<xTableEasy :columns="columns" :table-data="data" border-around border-y :row-height="40" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				columns: [
					{
						field: "name",
						title: "Name",
						width: 100
					},
					{
						field: "date",
						title: "Date",
						width: 100
					},
					{
						field: "hobby",
						title: "Hobby",
						width: 100
					},
					{
						field: "address",
						title: "Address",
						width: 200
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
