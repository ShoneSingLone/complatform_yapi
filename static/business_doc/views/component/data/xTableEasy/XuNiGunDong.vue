<template>
	<div>
		<h3>虚拟滚动 (4000 条数据)</h3>
		<p>虚拟滚动可以高效渲染大量数据，只渲染可视区域内的数据行，提升性能。</p>

		<h4>实现原理</h4>
		<div class="principle-explanation">
			<ol>
				<li
					><strong>只渲染可视区域数据</strong
					>：根据容器高度和行高计算可视区域能显示的行数，只渲染这些行及其前后的缓冲行。</li
				>
				<li
					><strong>占位符技术</strong
					>：使用一个高度等于所有数据行总高度的占位符元素，确保滚动条能正常工作。</li
				>
				<li
					><strong>滚动事件监听</strong
					>：监听滚动容器的scroll事件，根据滚动位置动态计算当前应该显示的数据范围。</li
				>
				<li
					><strong>数据切片</strong
					>：根据计算出的起始和结束索引，从完整数据中切片出需要显示的部分。</li
				>
				<li
					><strong>缓冲机制</strong
					>：为了避免滚动时频繁更新，会在可视区域前后添加一定比例的缓冲数据。</li
				>
			</ol>
		</div>

		<h4>核心配置</h4>
		<div class="config-explanation">
			<ul>
				<li><code>enable: true</code> - 启用虚拟滚动</li>
				<li><code>bufferScale: 1</code> - 缓冲比例，可视区域行数的倍数</li>
				<li><code>minRowHeight: 40</code> - 最小行高，用于计算可视区域行数</li>
				<li><code>scrolling</code> - 滚动回调函数，可用于监控滚动状态</li>
			</ul>
		</div>

		<h4>性能优势</h4>
		<div class="performance-explanation">
			<ul>
				<li>大幅减少DOM节点数量，提升渲染性能</li>
				<li>降低内存占用，避免浏览器卡顿</li>
				<li>支持渲染数万条甚至更多数据</li>
				<li>滚动体验流畅，无明显卡顿</li>
			</ul>
		</div>

		<xTableEasy
			:columns="columns"
			:tableData="tableData"
			:maxHeight="500"
			borderX
			borderY
			rowKeyFieldName="id"
			:virtualScrollOption="virtualScrollOption" />
	</div>
</template>
<script lang="ts">
export default async function () {
	// 生成大量测试数据
	const generateTestData = () => {
		const data = [];
		for (let i = 0; i < 4000; i++) {
			data.push({
				id: i + 1,
				name: `用户${i + 1}`,
				age: 18 + Math.floor(Math.random() * 30),
				sex: Math.random() > 0.5 ? "男" : "女",
				phone: `1380000${String(i).padStart(4, "0")}`,
				address: `上海市浦东新区张江高科技园区 ${i + 1} 号`,
				status: Math.floor(Math.random() * 3) + 1,
				score: Math.floor(Math.random() * 100) + 1
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
						width: 100,
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
					},
					{
						colKey: "status",
						field: "status",
						title: "状态",
						width: 120,
						align: "center",
						cellRenderer: (row, column, rowIndex, colIndex) => {
							const statusMap = {
								1: "<span style='color: green;'>正常</span>",
								2: "<span style='color: orange;'>待审核</span>",
								3: "<span style='color: red;'>已禁用</span>"
							};
							return statusMap[row.status] || "未知";
						}
					},
					{
						colKey: "score",
						field: "score",
						title: "分数",
						width: 100,
						align: "center"
					}
				],
				// 虚拟滚动配置
				virtualScrollOption: {
					enable: true,
					bufferScale: 1, // 缓冲比例
					minRowHeight: 40, // 最小行高
					scrolling: (
						startRowIndex,
						visibleStartIndex,
						visibleEndIndex,
						visibleAboveCount,
						visibleBelowCount
					) => {
						console.log("虚拟滚动数据范围:", {
							startRowIndex,
							visibleStartIndex,
							visibleEndIndex,
							visibleAboveCount,
							visibleBelowCount
						});
					}
				}
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
	margin: 20px 0 10px 0;
	font-size: 14px;
	font-weight: 500;
	color: #303133;
}

p {
	margin: 0 0 15px 0;
	color: #606266;
	font-size: 14px;
}

.principle-explanation,
.config-explanation,
.performance-explanation {
	margin: 0 0 20px 0;
	padding: 15px;
	background-color: #f5f7fa;
	border-radius: 4px;
	border-left: 4px solid #409eff;
}

.principle-explanation ol {
	margin: 0;
	padding-left: 20px;
}

.config-explanation ul,
.performance-explanation ul {
	margin: 0;
	padding-left: 20px;
}

.principle-explanation li,
.config-explanation li,
.performance-explanation li {
	margin: 8px 0;
	color: #606266;
	font-size: 14px;
}

code {
	background-color: #f0f0f0;
	padding: 2px 4px;
	border-radius: 2px;
	font-family: "Courier New", Courier, monospace;
	font-size: 13px;
}
</style>
