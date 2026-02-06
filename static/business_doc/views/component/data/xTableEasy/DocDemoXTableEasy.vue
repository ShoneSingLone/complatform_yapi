<template>
	<DocContentOfDemo>
		<xMd :md="descString" />
		<!-- 基础用法 -->
		<DemoAndCode
			title="基础用法"
			path="@/views/component/data/xTableEasy/JiChuYongFa.vue"
			unfold />
	</DocContentOfDemo>
</template>
<script lang="ts">
export default async function () {
	const totalData = _.map(new Array(4000), (i, ii) => {
		return {
			id: ii,
			name: `name${ii}`,
			age: 18,
			sex: "男",
			phone: "13800000000",
			address: "上海市普陀区金沙江路 1518 弄"
		};
	});
	return {
		provide() {
			return {
				totalData
			};
		},
		data() {
			return {
				descString: `## vue-easytable
一个基于 Vue2.x 的表格组件。`
			};
		}
	};
}
</script>
<style lang="less"></style>
