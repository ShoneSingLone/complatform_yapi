# DocFlow 功能移植文档

## 1. 项目现状分析

### 1.1 business_yapi 项目架构

**技术栈：**

-   前端：Vue 2.x + TypeScript（仅为 IDE 识别，不经过构建处理）
-   后端：Node.js + Koa + MongoDB
-   编辑器：Toast UI Editor
-   状态管理：Vue 实例状态
-   路由：Vue Router
-   模块加载：`_.$importVue()` 动态加载机制

**核心模块：**

-   `entry.vue`：应用入口，负责组件注册和路由初始化
-   `TuiEditor.vue`：Toast UI Editor 实现，支持 Markdown 编辑和图片上传
-   组件体系：完整的 Vue 组件库，包括接口管理、项目管理等功能

**前端代码规则：**

-   所有 .vue 文件使用 `export default async function ({ PRIVATE_GLOBAL })` 结构
-   使用 `<script lang="ts">` 仅为 IDE 识别，不经过构建处理
-   只能使用浏览器原生支持的 JavaScript 语法
-   无法使用需要编译的 TypeScript 特性（如泛型、命名空间、装饰器）
-   没有标准 package.json，使用 `_.$importVue()` 动态加载模块

### 1.2 现有编辑器功能

**Toast UI Editor 特性：**

-   Markdown 编辑与预览
-   图片上传与管理
-   文件上传（Excel、PDF 等）
-   基本文本格式化
-   表格编辑

**局限性：**

-   基于 Markdown 的线性编辑模式
-   无块级内容架构
-   无实时协作功能
-   无 AI 辅助功能
-   无拖拽排序能力

## 2. 移植目标与规划

### 2.1 核心移植功能

| 功能模块    | 优先级 | 技术难度 | 预期效果                   |
| ----------- | ------ | -------- | -------------------------- |
| 块级编辑器  | 高     | 中       | 支持 20+ 种内容块类型      |
| 拖拽排序    | 高     | 低       | 支持块级元素的拖拽调整     |
| AI 辅助功能 | 中     | 中       | 集成头脑风暴、文本润色功能 |
| 实时协作    | 低     | 高       | 基于 Yjs 的多人同步编辑    |
| 评论系统    | 低     | 中       | 文档评论和协作反馈         |

### 2.2 技术架构设计

**前端架构调整：**

1. **编辑器升级**：从 Toast UI Editor 迁移到 Tiptap + ProseMirror
2. **组件体系**：构建块级组件系统，支持扩展
3. **模块加载**：使用 `_.$importVue()` 动态加载机制
4. **状态管理**：使用 Vue 实例状态管理（保持与现有架构一致）
5. **AI 集成**：实现 SSE 流式响应处理

**后端架构调整：**

1. **协作服务**：集成 Hocuspocus 服务器
2. **AI 服务**：对接大语言模型 API
3. **存储优化**：扩展现有文件存储系统

## 3. 技术实现方案

### 3.1 块级编辑器实现

**技术选型：**

-   核心：Tiptap + ProseMirror
-   扩展：自定义 Tiptap 扩展
-   样式：Tailwind CSS（适配现有样式系统）

**实现步骤：**

1. **创建编辑器核心组件**：`TiptapEditor.vue`
2. **实现块级内容系统**：text、heading、list、code、table、image 等
3. **集成现有上传功能**：复用图片上传 API
4. **实现拖拽排序**：使用原生 Drag & Drop API

**关键代码结构：**

```vue
<template>
	<div class="tiptap-editor">
		<div class="editor-toolbar">
			<!-- 工具栏按钮 -->
		</div>
		<div class="editor-content" ref="editorContainer"></div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载 Tiptap 相关模块
	const [useEditor, EditorContent, StarterKit, DragDrop] = await _.$importVue([
		"@/components/TiptapEditor/useEditor.vue",
		"@/components/TiptapEditor/EditorContent.vue",
		"@/components/TiptapEditor/StarterKit.vue",
		"@/components/TiptapEditor/DragDrop.vue"
	]);

	return {
		data() {
			return {
				editor: null
			};
		},
		mounted() {
			this.editor = useEditor({
				extensions: [
					StarterKit,
					DragDrop
					// 自定义扩展
				],
				content: "",
				onUpdate: ({ editor }) => {
					// 处理内容更新
				}
			});
		}
	};
}
</script>
```

### 3.2 AI 功能集成

**技术方案：**

-   前端：SSE 流式响应处理
-   后端：集成大语言模型 API
-   功能：头脑风暴、文本润色、文档续写

**实现步骤：**

1. **创建 AI 服务模块**：`@/utils/ai.vue`（使用 .vue 格式，符合项目规范）
2. **实现 SSE 客户端**：处理流式响应
3. **添加 AI 工具栏**：编辑器顶部的 AI 功能入口
4. **集成现有 API 系统**：复用 `_api.xspace` 调用方式
5. **遵循前端代码规则**：使用 `export default async function ({ PRIVATE_GLOBAL })` 结构

### 3.3 实时协作实现（可选）

**技术方案：**

-   前端：Yjs + Tiptap 协作扩展
-   后端：Hocuspocus 服务器
-   通信：WebSocket

**实现步骤：**

1. **搭建 Hocuspocus 服务**：`server/services/hocuspocus.ts`
2. **集成 Yjs**：通过 `_.$importVue()` 动态加载 `@tiptap/extension-collaboration`
3. **实现用户状态管理**：在线用户、光标跟踪
4. **添加协作状态显示**：编辑器顶部的用户头像显示
5. **遵循前端代码规则**：使用 `export default async function ({ PRIVATE_GLOBAL })` 结构

## 4. 实施步骤

### 4.1 准备阶段

1. **依赖引入**：

    - 通过 CDN 或公共库引入 Tiptap 相关依赖
    - 创建本地包装模块，使用 `_.$importVue()` 动态加载

2. **创建编辑器组件目录**：

    ```
    components/TiptapEditor/
    ├── TiptapEditor.vue          # 主编辑器组件
    ├── extensions/               # 自定义扩展
    ├── plugins/                  # 编辑器插件
    └── tools/                    # 工具栏组件
    ```

3. **模块包装**：
    - 为 Tiptap 核心模块创建 Vue 包装组件
    - 确保所有模块符合 `export default async function ({ PRIVATE_GLOBAL })` 结构

### 4.2 核心实现阶段

**阶段 1：块级编辑器基础**

1. 创建 `TiptapEditor.vue` 核心组件（使用 `export default async function ({ PRIVATE_GLOBAL })` 结构）
2. 实现基础块类型：文本、标题、列表、代码
3. 集成图片上传功能（复用现有的 `_api.xspace` 上传接口）
4. 使用 `_.$importVue()` 动态加载 Tiptap 核心模块

**阶段 2：高级功能**

1. 实现拖拽排序功能（使用原生 Drag & Drop API）
2. 添加表格编辑能力
3. 集成文件上传功能（复用现有的文件上传逻辑）

**阶段 3：AI 功能**

1. 创建 `@/utils/ai.vue` 服务模块（符合项目规范）
2. 实现 AI 工具栏
3. 集成头脑风暴和文本润色功能
4. 实现 SSE 流式响应处理

**阶段 4：实时协作（可选）**

1. 搭建 Hocuspocus 服务
2. 实现 Yjs 协作集成（通过 `_.$importVue()` 动态加载）
3. 添加用户状态管理
4. 实现 WebSocket 通信

### 4.3 集成与测试阶段

1. **组件集成**：将新编辑器集成到现有页面
2. **API 适配**：确保与现有后端 API 兼容
3. **性能测试**：评估编辑器性能和响应速度
4. **兼容性测试**：确保在不同浏览器中正常工作

## 5. 技术风险评估

### 5.1 主要风险

| 风险项             | 影响程度 | 缓解措施                                                       |
| ------------------ | -------- | -------------------------------------------------------------- |
| Vue 2.x 兼容性     | 中       | 使用 @tiptap/vue-2 适配器                                      |
| 编辑器性能         | 中       | 实现虚拟滚动和懒加载                                           |
| 后端服务压力       | 高       | 优化 AI 调用频率，添加缓存                                     |
| 数据迁移           | 中       | 实现 Markdown 到块级内容的转换                                 |
| 用户体验一致性     | 中       | 保持与现有界面风格一致                                         |
| 动态模块加载复杂度 | 中       | 合理设计模块包装，确保 `_.$importVue()` 正确加载               |
| TypeScript 限制    | 低       | 避免使用需要编译的 TypeScript 特性，仅使用浏览器原生支持的语法 |
| 依赖管理           | 中       | 通过 CDN 或公共库引入依赖，确保版本兼容性                      |

### 5.2 解决方案

1. **性能优化**：

    - 实现编辑器内容分块加载
    - 使用 Web Worker 处理复杂计算
    - 优化图片和文件上传流程

2. **兼容性保障**：

    - 提供 Toast UI Editor 作为降级方案
    - 实现渐进式功能增强
    - 充分测试主流浏览器

3. **数据安全**：

    - 实现 AI 内容过滤机制
    - 加强文件上传安全校验
    - 保护用户协作数据

4. **模块加载优化**：

    - 合理设计模块依赖关系，避免循环依赖
    - 实现模块懒加载，提高首屏性能
    - 为 Tiptap 核心模块创建轻量级包装组件

5. **TypeScript 兼容性**：
    - 仅使用浏览器原生支持的 JavaScript 语法
    - 利用 JSDoc 提供类型提示
    - 确保代码可在浏览器中直接运行，不依赖编译过程

## 6. 预期效果

### 6.1 功能提升

-   **编辑体验**：从线性 Markdown 到块级内容的飞跃
-   **协作能力**：支持多人实时编辑和评论反馈
-   **智能辅助**：AI 辅助创作，提高文档质量
-   **灵活性**：拖拽排序和丰富的内容块类型

### 6.2 技术价值

-   **现代化架构**：引入 Tiptap 和 Yjs 等前沿技术
-   **可扩展性**：模块化设计，支持功能扩展
-   **竞争力**：具备与 Notion、飞书等产品相近的编辑体验
-   **技术积累**：为后续功能迭代打下基础

## 7. 结论

通过本次移植，business_yapi 项目将获得现代化的块级编辑器能力，显著提升文档编辑和协作体验。建议采用渐进式实施策略，优先实
现核心编辑器功能，再逐步添加 AI 和协作能力，确保系统稳定性和用户体验的平滑过渡。
