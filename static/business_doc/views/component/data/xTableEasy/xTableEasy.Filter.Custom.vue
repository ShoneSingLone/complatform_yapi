<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<div class="demo-controls">
				<el-select v-model="selectedHobby" placeholder="选择爱好" style="width: 150px">
					<el-option label="全部" value=""></el-option>
					<el-option label="编程" value="coding"></el-option>
					<el-option label="阅读" value="reading"></el-option>
					<el-option label="运动" value="sports"></el-option>
				</el-select>
				<el-button type="primary" @click="handleFilter">筛选</el-button>
				<el-button type="info" @click="resetFilter">重置</el-button>
			</div>
			<xTableEasy :columns="columns" :table-data="filteredData" borderX borderY />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdDoc: "通过自定义筛选条件，实现更复杂的筛选逻辑",
				selectedHobby: "",
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
						hobby: "reading and coding",
						address: "No.1 Century Avenue, Beijing"
					},
					{
						name: "Larsen",
						date: "2000-07-20",
						hobby: "sports and music",
						address: "No.1 Century Avenue, Chongqing"
					},
					{
						name: "Geneva",
						date: "2010-08-20",
						hobby: "coding and sports",
						address: "No.1 Century Avenue, Xiamen"
					},
					{
						name: "Jami",
						date: "2020-09-20",
						hobby: "reading and music",
						address: "No.1 Century Avenue, Shenzhen"
					}
				],
				columns: [
					{ field: "name", key: "a", title: "Name", width: 100 },
					{ field: "date", key: "b", title: "Tel", width: 200 },
					{ field: "hobby", key: "c", title: "Hobby", width: 300 },
					{ field: "address", key: "d", title: "Address", width: 400 }
				]
			};
		},
		computed: {
			filteredData() {
				if (!this.selectedHobby) {
					return this.originalData;
				}
				return this.originalData.filter(item => {
					return item.hobby.toLowerCase().includes(this.selectedHobby.toLowerCase());
				});
			}
		},
		methods: {
			handleFilter() {
				// 筛选逻辑已在 computed 中实现
			},
			resetFilter() {
				this.selectedHobby = "";
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
