<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<div class="demo-controls">
				<el-checkbox-group v-model="hiddenColumns" @change="handleColumnHiddenChange">
					<el-checkbox label="name">隐藏姓名列</el-checkbox>
					<el-checkbox label="date">隐藏电话列</el-checkbox>
					<el-checkbox label="hobby">隐藏爱好列</el-checkbox>
				</el-checkbox-group>
			</div>
			<xTableEasy :columns="visibleColumns" :table-data="tableData" borderX borderY />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdDoc: "通过控制 columns 数组中列的显示与隐藏来实现列隐藏功能",
				originalColumns: [
					{ field: "name", key: "a", title: "Name", width: 100 },
					{ field: "date", key: "b", title: "Tel", width: 200 },
					{ field: "hobby", key: "c", title: "Hobby", width: 300 },
					{ field: "address", key: "d", title: "Address", width: 400 }
				],
				hiddenColumns: [],
				tableData: [
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
				]
			};
		},
		computed: {
			visibleColumns() {
				return this.originalColumns.filter(col => !this.hiddenColumns.includes(col.field));
			}
		},
		methods: {
			handleColumnHiddenChange() {
				// 列隐藏状态变化时的处理
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
}
</style>
