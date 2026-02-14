<template>
	<div>
		<div class="flex vertical">
			<xMd :md="mdDoc" />
			<xTableEasy
				:columns="columns"
				:table-data="tableData"
				:column-width-resize-option="columnWidthResizeOption"
				borderX
				borderY />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdDoc: `## 禁用特定列拖动

### 功能说明
通过列配置中的 \`disableResizing\` 属性禁用特定列的拖动功能，其他列仍然可以拖动调整宽度。

### 使用方法

\`\`\`javascript
// 禁用特定列拖动
columns: [
  {
    field: 'index',
    key: 'index',
    title: '#',
    width: 50,
    disableResizing: true  // 禁用此列拖动
  },
  {
    field: 'col1',
    key: 'col1',
    title: 'Col1',
    width: 220,
    disableResizing: true  // 禁用此列拖动
  },
  {
    field: 'col2',
    key: 'col2',
    title: 'Col2',
    width: 220,
    disableResizing: true  // 禁用此列拖动
  },
  { field: 'col3', key: 'col3', title: 'Col3', width: 220 },  // 可以拖动
  { field: 'col4', key: 'col4', title: 'Col4', width: 220 }   // 可以拖动
]
\`\`\`

### 应用场景
1. **固定列**：对于序号列、操作列等固定宽度的列，禁用拖动
2. **重要列**：对于需要保持特定宽度的列，禁用拖动
3. **部分启用**：只允许部分列拖动，其他列保持固定宽度

### 注意事项
- \`disableResizing\` 属性只在 \`columnWidthResizeOption.enable = true\` 时有效
- 设置了 \`disableResizing: true\` 的列不会显示拖动手柄
- 鼠标悬停在禁用拖动的列边缘时，光标不会变为 \`col-resize\``,
				columnWidthResizeOption: {
					enable: true,
					minWidth: 30
				},
				columns: [
					{
						field: "index",
						key: "index",
						title: "#",
						width: 50,
						align: "center",
						disableResizing: true
					},
					{
						field: "name",
						key: "a",
						title: "Name",
						width: 100,
						disableResizing: true
					},
					{
						field: "date",
						key: "b",
						title: "Tel",
						width: 200,
						disableResizing: true
					},
					{ field: "hobby", key: "c", title: "Hobby", width: 300 },
					{ field: "address", key: "d", title: "Address", width: 400 }
				],
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
		}
	};
}
</script>
