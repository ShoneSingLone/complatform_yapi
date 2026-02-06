<template>
	<div>
		<xMd :md="mdDoc" />
		<p>
			word-break：
			<xRadioGroup v-model="wordBreak">
				<xRadio label="normal">normal</xRadio>
				<xRadio label="keep-all">keep-all</xRadio>
				<xRadio label="break-all">break-all</xRadio>
				<xRadio label="break-word">break-word</xRadio>
			</xRadioGroup>
		</p>
		<br />
		<xTableEasy
			:style="{ 'word-break': wordBreak }"
			:table-data="tableData"
			:columns="columns"
			:border-around="true"
			:border-x="true"
			:border-y="true" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				wordBreak: "normal",
				mdDoc: `1、当单元格文本内容过多时会破坏布局，此时可以通过样式word-break控制
				
2、你也可以结合单元格省略功能一起使用
				
## 实现原理

### 核心问题
默认情况下，表格单元格使用white-space: nowrap样式，这会导致长文本不换行，从而破坏表格布局。

### 解决方案
1. **修改默认样式**：将td元素的white-space从nowrap改为pre-wrap，允许文本换行
2. **添加word-break支持**：添加word-break: inherit样式，继承父元素的word-break设置
3. **添加wordBreakMode属性**：新增wordBreakMode prop，支持设置不同的文本换行模式

### 使用方法
\`\`\`javascript
// 通过props设置word-break模式
<xTableEasy
	word-break-mode="break-all"
	:table-data="tableData"
	:columns="columns"
/>

// 或者通过style设置
<xTableEasy
	:style="{ 'word-break': 'keep-all' }"
	:table-data="tableData"
	:columns="columns"
/>
\`\`\`

### 支持的word-break模式
- **normal**：使用默认的换行规则
- **keep-all**：不允许在单词内部换行，适合中文文本
- **break-all**：允许在单词内部换行，适合英文长单词
- **break-word**：优先在单词边界换行，如果单词太长则在内部换行

### 技术实现
在xTableEasy组件中，我们：
1. 修改了td元素的默认样式，移除了white-space: nowrap限制
2. 添加了wordBreakMode prop，支持设置不同的文本换行模式
3. 在tableClass计算属性中，根据wordBreakMode自动添加对应的CSS类
4. 为不同的word-break模式定义了对应的CSS样式

这样，当用户设置不同的wordBreakMode时，表格会自动应用对应的文本换行样式，确保长文本不会破坏布局。`,

				columns: [
					{
						field: "name",
						key: "a",
						title: "Name 40%",
						width: "40%"
					},
					{ field: "date", key: "b", title: "Tel 20%", width: "20%" },
					{
						field: "hobby",
						key: "c",
						title: "Hobby 20%",
						width: "20%"
					},
					{
						field: "address",
						key: "d",
						title: "Address 20%",
						width: "20%"
					}
				],
				tableData: [
					{
						name: "John",
						date: "1900-05-20",
						hobby: "Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 大江东去浪淘尽千古风流人物故垒西边人道是三国周郎赤壁乱石穿空惊涛拍岸卷起千堆雪江山如画一时多少豪杰",
						address: "No.1 Century Avenue, Xiamen"
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

<style lang="less"></style>
