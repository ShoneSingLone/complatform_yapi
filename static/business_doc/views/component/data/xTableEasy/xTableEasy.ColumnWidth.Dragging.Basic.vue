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
				mdDoc: `## 列宽拖动功能

### 基本用法
通过设置 \`columnWidthResizeOption\` 属性来启用列宽拖动功能。

### 功能特性

1. **启用列宽拖动**：设置 \`columnWidthResizeOption.enable = true\`
2. **最小列宽**：通过 \`columnWidthResizeOption.minWidth\` 设置列拖动的最小宽度（默认50px）
3. **列宽变化回调**：通过 \`columnWidthResizeOption.sizeChange\` 获取列宽拖动变化的回调信息

### 使用方法

\`\`\`javascript
// 启用列宽拖动
<xTableEasy
  :columns="columns"
  :table-data="tableData"
  :column-width-resize-option="columnWidthResizeOption"
/>

// 配置选项
columnWidthResizeOption: {
  enable: true,        // 启用列宽拖动
  minWidth: 30,         // 最小列宽
  sizeChange: ({ column, differWidth, columnWidth }) => {
    // 列宽变化回调
    console.log('列:', column);
    console.log('宽度变化:', differWidth);
    console.log('当前列宽:', columnWidth);
  }
}
\`\`\`

### 实现原理

#### 核心机制
1. **鼠标事件监听**：在表头单元格的右边缘（8px范围内）检测鼠标悬停和点击
2. **拖动状态管理**：使用 \`isColumnResizing\` 标记当前是否正在拖动
3. **全局事件绑定**：拖动开始时绑定全局 \`mousemove\` 和 \`mouseup\` 事件
4. **列宽实时更新**：通过 \`_columnResizeWidth\` 属性存储拖动后的列宽

#### 技术实现
1. **表头组件**：
   - 添加 \`column-resizer\` 元素作为拖动手柄
   - 监听 \`mousemove\`、\`mousedown\`、\`mouseup\` 事件
   - 触发 \`column-width-change\` 和 \`column-width-resize-end\` 事件

2. **列宽存储**：
   - 使用 \`_columnResizeWidth\` 属性存储调整后的列宽
   - colgroup 和 header 组件优先使用 \`_columnResizeWidth\`，回退到 \`width\`

3. **最小列宽限制**：
   - 拖动时限制最小宽度为 \`minWidth\` 或默认50px
   - 防止列宽过小导致内容无法显示

#### 事件流程
1. 鼠标悬停在列边缘 → 显示拖动手柄，光标变为 \`col-resize\`
2. 鼠标按下 → 记录起始位置和宽度，绑定全局事件
3. 鼠标移动 → 计算新宽度，触发 \`column-width-change\` 事件
4. 鼠标释放 → 解绑全局事件，触发 \`column-width-resize-end\` 事件

### 注意事项
- 列宽拖动需要 \`columnWidthResizeOption.enable = true\`
- 拖动时禁止文本选择（\`user-select: none\`）
- 列宽变化会实时更新到 \`_columnResizeWidth\` 属性
- 如果列没有设置宽度，默认使用50px`,
				columnWidthResizeOption: {
					enable: true,
					minWidth: 30,
					sizeChange: ({ column, differWidth, columnWidth }) => {
						console.log('列宽变化:', {
							column: column.field,
							differWidth: differWidth,
							columnWidth: columnWidth
						});
					}
				},
				columns: [
					{ field: "name", key: "a", title: "Name", width: 100 },
					{ field: "date", key: "b", title: "Tel", width: 200 },
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
