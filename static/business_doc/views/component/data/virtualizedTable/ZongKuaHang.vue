<template>
	<div>
		<xMd :md="md" />
		<xTableVir
			:columns="columns"
			:data="data"
			:height="400"
			fixed
			:slotsRow="customRowRender"
			:rowHeight="rowHeight" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		setup() {
			const dataGenerator = (_, index) => ({
				id: `random-id-${++index}`,
				group: index % 10,
				name: `Tom_${index % 3}`
			});
			const columns = [
				{
					prop: "no",
					label: "no",
					width: 30,
					align: "center",
					cellRenderer: ({ rowIndex }) => {
						return rowIndex + 1;
					}
				},
				{
					prop: "group",
					label: "Group",
					align: "center",
					cellRenderer: ({ cellData: name, rowIndex }) => {
						return h("xTag", [name, "-", rowIndex]);
					}
				},
				{
					prop: "name",
					label: "Name",
					align: "center",
					cellRenderer: ({ cellData: name }) => {
						return h("xTag", [name]);
					}
				}
			];
			/* 处理数据 */
			/* 分组 */
			const rowArray = Array.from({ length: 100 }).map(dataGenerator);
			/* rowHeight需要保持一致，所以不要妄图动态行高，都是计算量 */
			const rowHeight = 50;
			const GroupPropArray = ["group", "name"];
			return {
				md: `**rowHeight**需要保持一致，所以不要妄图使用动态行高，都是计算量`,
				rowHeight,
				columns,
				data: xTableVirMergeData({
					rowArray,
					GroupPropArray
				}),
				customRowRender({ cells, columns, depth, isScrolling, rowData, rowIndex, style }) {
					return xTableVirCells({
						GroupPropArray,
						columns,
						cells,
						rowData,
						rowHeight,
						setStyle({ rowSpan, prop, colIndex }) {
							if (prop === "name") {
								return {
									outline: "1px solid var(--el-border-color-lighter)",
									backgroundColor: "gray",
									height: `${rowSpan * rowHeight}px`,
									alignSelf: "flex-start",
									zIndex: rowSpan
								};
							} else {
								return {
									outline: "1px solid var(--el-border-color-lighter)",
									backgroundColor: "#fff",
									height: `${rowSpan * rowHeight}px`,
									alignSelf: "flex-start",
									zIndex: rowSpan
								};
							}
						}
					});
				}
			};
		}
	});
}
</script>
<style lang="less"></style>
