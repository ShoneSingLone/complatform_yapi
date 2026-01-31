<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<div class="demo-controls">
				<el-button type="primary" @click="sortByName">按姓名排序</el-button>
				<el-button type="primary" @click="sortByDate">按电话排序</el-button>
				<el-button type="info" @click="resetSort">重置顺序</el-button>
			</div>
			<xTableEasy :columns="columns" :table-data="sortedData" borderX borderY />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdDoc: "通过在外部实现排序逻辑，然后将排序后的数据传递给表格组件",
				originalData: [
					{
						name: "John",
						date: "1900-05-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Shanghai"
					},
					{
						name: "Dickerson",
						date: "1910-06-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Beijing"
					},
					{
						name: "Larsen",
						date: "2000-07-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Chongqing"
					},
					{
						name: "Geneva",
						date: "2010-08-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Xiamen"
					},
					{
						name: "Jami",
						date: "2020-09-20",
						hobby: "coding and coding repeat",
						address: "No.1 Century Avenue, Shenzhen"
					}
				],
				sortedData: [],
				columns: [
					{ field: "name", key: "a", title: "Name", width: 100 },
					{ field: "date", key: "b", title: "Tel", width: 200 },
					{ field: "hobby", key: "c", title: "Hobby", width: 300 },
					{ field: "address", key: "d", title: "Address", width: 400 }
				]
			};
		},
		mounted() {
			this.sortedData = [...this.originalData];
		},
		methods: {
			sortByName() {
				this.sortedData = [...this.sortedData].sort((a, b) => {
					return a.name.localeCompare(b.name);
				});
			},
			sortByDate() {
				this.sortedData = [...this.sortedData].sort((a, b) => {
					return new Date(a.date) - new Date(b.date);
				});
			},
			resetSort() {
				this.sortedData = [...this.originalData];
			}
		}
	});
}
</script>
<style scoped>
.demo-controls {
	margin-bottom: 16px;
	padding: 12px;
	background-color: #f5f7fa;
	border-radius: 4px;
	display: flex;
	align-items: center;
	gap: 12px;
}
</style>
