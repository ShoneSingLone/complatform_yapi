# 编辑器模块移植

## 1. Tiptap 编辑器实现

### 1.1 目录结构设计

```
components/TiptapEditor/
├── TiptapEditor.vue          # 主编辑器组件
├── extensions/               # 自定义扩展
│   ├── block-types/          # 块类型扩展
│   │   ├── Heading.vue       # 标题块
│   │   ├── Paragraph.vue     # 段落块
│   │   ├── List.vue          # 列表块
│   │   ├── CodeBlock.vue     # 代码块
│   │   ├── Image.vue         # 图片块
│   │   └── Table.vue         # 表格块
│   └── features/             # 功能扩展
│       ├── DragDrop.vue      # 拖拽排序
│       ├── AIIntegration.vue # AI 集成
│       └── Collaboration.vue # 实时协作
├── plugins/                  # 编辑器插件
│   ├── uploader.vue          # 上传插件
│   ├── toolbar.vue           # 工具栏插件
│   └── history.vue           # 历史记录插件
├── tools/                    # 工具栏组件
│   ├── Toolbar.vue           # 主工具栏
│   ├── BlockMenu.vue         # 块菜单
│   └── FormatMenu.vue        # 格式菜单
└── utils/                    # 工具函数
    ├── editor-utils.vue      # 编辑器工具
    ├── schema.vue            # 内容 schema
    └── conversions.vue       # 格式转换
```

### 1.2 核心组件实现

#### 1.2.1 TiptapEditor.vue (主编辑器组件)

```vue
<template>
	<div class="tiptap-editor">
		<!-- 工具栏 -->
		<div class="editor-toolbar" v-if="showToolbar">
			<component :is="toolbarComponent" :editor="editor" />
		</div>

		<!-- 编辑器内容区 -->
		<div class="editor-content" ref="editorContainer"></div>

		<!-- 块菜单 -->
		<div class="block-menu" v-if="showBlockMenu">
			<component :is="blockMenuComponent" :editor="editor" />
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载 Tiptap 相关模块
	const [useEditor, Toolbar, BlockMenu] = await _.$importVue([
		"@/components/TiptapEditor/utils/useEditor.vue",
		"@/components/TiptapEditor/tools/Toolbar.vue",
		"@/components/TiptapEditor/tools/BlockMenu.vue"
	]);

	return {
		data() {
			return {
				editor: null,
				showToolbar: true,
				showBlockMenu: false,
				toolbarComponent: Toolbar,
				blockMenuComponent: BlockMenu
			};
		},
		mounted() {
			// 初始化编辑器
			this.initEditor();
		},
		methods: {
			async initEditor() {
				// 动态加载扩展
				const [StarterKit, DragDrop, Image, Table] = await _.$importVue([
					"@/components/TiptapEditor/extensions/StarterKit.vue",
					"@/components/TiptapEditor/extensions/features/DragDrop.vue",
					"@/components/TiptapEditor/extensions/block-types/Image.vue",
					"@/components/TiptapEditor/extensions/block-types/Table.vue"
				]);

				// 初始化编辑器实例
				this.editor = useEditor({
					extensions: [
						StarterKit,
						DragDrop,
						Image,
						Table
						// 其他扩展
					],
					content: this.initialContent || "",
					onUpdate: ({ editor }) => {
						// 处理内容更新
						this.$emit("update:content", editor.getHTML());
					},
					onSelectionUpdate: ({ editor }) => {
						// 处理选区更新
						this.updateBlockMenu(editor);
					}
				});

				// 挂载编辑器到 DOM
				if (this.editor && this.$refs.editorContainer) {
					this.editor.mount(this.$refs.editorContainer);
				}
			},
			updateBlockMenu(editor) {
				// 更新块菜单状态
				const { state } = editor;
				const { selection } = state;
				this.showBlockMenu = selection.$from.parent.type.name !== "doc";
			},
			setContent(content) {
				// 设置编辑器内容
				if (this.editor) {
					this.editor.commands.setContent(content);
				}
			},
			getContent() {
				// 获取编辑器内容
				return this.editor ? this.editor.getHTML() : "";
			}
		},
		props: {
			initialContent: {
				type: String,
				default: ""
			},
			showToolbar: {
				type: Boolean,
				default: true
			}
		},
		beforeDestroy() {
			// 销毁编辑器实例
			if (this.editor) {
				this.editor.destroy();
			}
		}
	};
}
</script>

<style scoped>
.tiptap-editor {
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	overflow: hidden;
}

.editor-toolbar {
	border-bottom: 1px solid #e0e0e0;
	padding: 8px;
	background-color: #f5f5f5;
}

.editor-content {
	min-height: 300px;
	padding: 16px;
	outline: none;
}

.block-menu {
	position: absolute;
	z-index: 1000;
	background-color: white;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
```

#### 1.2.2 useEditor.vue (编辑器初始化工具)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 这里将 Tiptap 的 useEditor 函数包装成符合项目规范的形式
	return function useEditor(options) {
		// 实际的 Tiptap 编辑器初始化逻辑
		// 由于项目不使用构建工具，需要通过 CDN 或其他方式引入 Tiptap
		const { Editor } = window.Tiptap || {};

		if (!Editor) {
			console.error("Tiptap Editor not loaded");
			return null;
		}

		return new Editor({
			...options
			// 适配项目需求的配置
		});
	};
}
</script>
```

### 1.3 块级内容系统设计

#### 1.3.1 核心块类型

| 块类型   | 功能描述             | 实现文件                                    | 优先级 |
| -------- | -------------------- | ------------------------------------------- | ------ |
| 段落     | 基本文本段落         | `extensions/block-types/Paragraph.vue`      | 高     |
| 标题     | 多级标题（H1-H6）    | `extensions/block-types/Heading.vue`        | 高     |
| 列表     | 有序列表和无序列表   | `extensions/block-types/List.vue`           | 高     |
| 代码块   | 语法高亮的代码块     | `extensions/block-types/CodeBlock.vue`      | 高     |
| 图片     | 支持上传和管理的图片 | `extensions/block-types/Image.vue`          | 高     |
| 表格     | 可编辑的表格         | `extensions/block-types/Table.vue`          | 中     |
| 引用     | 引用块               | `extensions/block-types/Blockquote.vue`     | 中     |
| 分隔线   | 内容分隔线           | `extensions/block-types/HorizontalRule.vue` | 低     |
| 任务列表 | 带复选框的列表       | `extensions/block-types/TaskList.vue`       | 低     |
| 数学公式 | LaTeX 数学公式       | `extensions/block-types/Math.vue`           | 低     |

#### 1.3.2 图片块实现 (Image.vue)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 图片块扩展实现
	return {
		name: "image",
		priority: 1000,
		group: "block",
		draggable: true,
		parseHTML() {
			return [
				{
					tag: "img[src]"
				}
			];
		},
		renderHTML({ HTMLAttributes }) {
			return ["img", HTMLAttributes];
		},
		addCommands() {
			return {
				insertImage: options => (state, dispatch) => {
					const { selection } = state;
					const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;

					if (dispatch) {
						const node = state.schema.nodes.image.create({
							src: options.src,
							alt: options.alt || "",
							title: options.title || ""
						});

						const transaction = state.tr.insert(position, node);
						dispatch(transaction);
					}

					return true;
				}
			};
		},
		addAttributes() {
			return {
				src: {
					default: null
				},
				alt: {
					default: null
				},
				title: {
					default: null
				},
				width: {
					default: null
				},
				height: {
					default: null
				}
			};
		}
	};
}
</script>
```

### 1.4 上传功能集成

#### 1.4.1 图片上传实现

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 图片上传工具
	return {
		uploadImage: async file => {
			try {
				// 使用项目现有的上传 API
				const response = await _api.xspace.uploadFile({
					file: file,
					type: "image",
					projectId: PRIVATE_GLOBAL.currentProjectId
				});

				if (response.success) {
					return {
						default: response.data.url
					};
				} else {
					throw new Error(response.message || "上传失败");
				}
			} catch (error) {
				console.error("Image upload failed:", error);
				throw error;
			}
		},

		uploadFile: async file => {
			try {
				// 使用项目现有的文件上传 API
				const response = await _api.xspace.uploadFile({
					file: file,
					type: "file",
					projectId: PRIVATE_GLOBAL.currentProjectId
				});

				if (response.success) {
					return {
						url: response.data.url,
						name: file.name,
						size: file.size
					};
				} else {
					throw new Error(response.message || "上传失败");
				}
			} catch (error) {
				console.error("File upload failed:", error);
				throw error;
			}
		}
	};
}
</script>
```

## 2. 拖拽排序功能

### 2.1 实现方案

#### 2.1.1 DragDrop 扩展

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 拖拽排序扩展实现
	return {
		name: "drag-drop",
		priority: 50,
		addProseMirrorPlugins() {
			return [
				// 基于 ProseMirror 的拖拽排序插件
				new window.ProseMirrorPlugins.DragDrop({
					// 配置选项
					dragHandleSelector: ".drag-handle",
					onDragStart: (view, event, node) => {
						// 拖拽开始处理
						event.dataTransfer.setData(
							"application/tiptap-node",
							JSON.stringify({
								type: node.type.name,
								attrs: node.attrs
							})
						);
					},
					onDrop: (view, event, node, position) => {
						// 拖拽结束处理
						// 实现节点的移动逻辑
					}
				})
			];
		}
	};
}
</script>
```

### 2.2 拖拽 UI 实现

#### 2.2.1 块拖拽手柄

```vue
<template>
	<div class="block-drag-handle" :class="{ active: isDragging }">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M4 5H12M4 8H12M4 11H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return {
		data() {
			return {
				isDragging: false
			};
		},
		methods: {
			startDrag(event) {
				this.isDragging = true;
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.setData("text/plain", "block-drag");
			},
			endDrag() {
				this.isDragging = false;
			}
		}
	};
}
</script>

<style scoped>
.block-drag-handle {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	margin-right: 8px;
	cursor: grab;
	color: #999;
	opacity: 0;
	transition: opacity 0.2s;
}

.block-drag-handle:hover {
	opacity: 1;
	color: #666;
}

.block-drag-handle:active {
	cursor: grabbing;
}

.block-drag-handle.active {
	opacity: 1;
	color: #333;
}

/* 当块被选中时显示拖拽手柄 */
.block-content.selected .block-drag-handle {
	opacity: 1;
}
</style>
```

## 3. 工具栏实现

### 3.1 主工具栏 (Toolbar.vue)

```vue
<template>
	<div class="editor-toolbar">
		<!-- 格式工具 -->
		<div class="toolbar-group format-tools">
			<button class="toolbar-button" @click="toggleBold" :class="{ active: isBold }" title="加粗">
				<strong>B</strong>
			</button>
			<button class="toolbar-button" @click="toggleItalic" :class="{ active: isItalic }" title="斜体">
				<em>I</em>
			</button>
			<button class="toolbar-button" @click="toggleUnderline" :class="{ active: isUnderline }" title="下划线">
				<u>U</u>
			</button>
			<button class="toolbar-button" @click="toggleStrike" :class="{ active: isStrike }" title="删除线">
				<s>S</s>
			</button>
		</div>

		<!-- 块工具 -->
		<div class="toolbar-group block-tools">
			<select class="toolbar-select" @change="changeBlockType($event.target.value)" :value="currentBlockType">
				<option value="paragraph">段落</option>
				<option value="heading-1">标题 1</option>
				<option value="heading-2">标题 2</option>
				<option value="heading-3">标题 3</option>
				<option value="code-block">代码块</option>
				<option value="blockquote">引用</option>
			</select>
		</div>

		<!-- 列表工具 -->
		<div class="toolbar-group list-tools">
			<button class="toolbar-button" @click="toggleBulletList" :class="{ active: isBulletList }" title="无序列表">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<circle cx="4" cy="8" r="1.5" fill="currentColor" />
					<path d="M8 8H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
			<button
				class="toolbar-button"
				@click="toggleOrderedList"
				:class="{ active: isOrderedList }"
				title="有序列表">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path
						d="M4 7V5H2V11H4V9H12"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</button>
		</div>

		<!-- 上传工具 -->
		<div class="toolbar-group upload-tools">
			<button class="toolbar-button" @click="insertImage" title="插入图片">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5" />
					<circle cx="8" cy="6.5" r="1.5" fill="currentColor" />
					<path
						d="M11 11L8 8.5L5 11"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</button>
			<button class="toolbar-button" @click="insertTable" title="插入表格">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path
						d="M3 3H13M3 7H13M3 11H13M7 3V13M11 3V13"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round" />
				</svg>
			</button>
		</div>

		<!-- AI 工具 -->
		<div class="toolbar-group ai-tools" v-if="showAI">
			<button class="toolbar-button ai-button" @click="openAIMenu" title="AI 助手">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" />
					<path
						d="M8 4V6M8 10V12M12 8H10M6 8H4"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round" />
				</svg>
				<span>AI</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return {
		props: {
			editor: {
				type: Object,
				required: true
			},
			showAI: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			isBold() {
				return this.editor && this.editor.isActive("bold");
			},
			isItalic() {
				return this.editor && this.editor.isActive("italic");
			},
			isUnderline() {
				return this.editor && this.editor.isActive("underline");
			},
			isStrike() {
				return this.editor && this.editor.isActive("strike");
			},
			isBulletList() {
				return this.editor && this.editor.isActive("bulletList");
			},
			isOrderedList() {
				return this.editor && this.editor.isActive("orderedList");
			},
			currentBlockType() {
				if (!this.editor) return "paragraph";

				const { state } = this.editor;
				const { $from } = state.selection;
				const node = $from.node();

				return node.type.name || "paragraph";
			}
		},
		methods: {
			toggleBold() {
				if (this.editor) {
					this.editor.commands.toggleBold();
				}
			},
			toggleItalic() {
				if (this.editor) {
					this.editor.commands.toggleItalic();
				}
			},
			toggleUnderline() {
				if (this.editor) {
					this.editor.commands.toggleUnderline();
				}
			},
			toggleStrike() {
				if (this.editor) {
					this.editor.commands.toggleStrike();
				}
			},
			toggleBulletList() {
				if (this.editor) {
					this.editor.commands.toggleBulletList();
				}
			},
			toggleOrderedList() {
				if (this.editor) {
					this.editor.commands.toggleOrderedList();
				}
			},
			changeBlockType(type) {
				if (this.editor) {
					// 处理块类型切换
					this.editor.commands.setBlockType(type);
				}
			},
			insertImage() {
				// 打开图片上传对话框
				// 集成项目现有的上传功能
			},
			insertTable() {
				if (this.editor) {
					this.editor.commands.insertTable({
						rows: 2,
						cols: 3,
						withHeaderRow: true
					});
				}
			},
			openAIMenu() {
				// 打开 AI 功能菜单
				this.$emit("open-ai-menu");
			}
		}
	};
}
</script>

<style scoped>
.editor-toolbar {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px;
	background-color: #f5f5f5;
	border-bottom: 1px solid #e0e0e0;
}

.toolbar-group {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 4px;
	border-right: 1px solid #e0e0e0;
}

.toolbar-group:last-child {
	border-right: none;
}

.toolbar-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	border: none;
	border-radius: 4px;
	background-color: transparent;
	cursor: pointer;
	font-size: 14px;
	color: #666;
	transition: all 0.2s;
}

.toolbar-button:hover {
	background-color: #e0e0e0;
	color: #333;
}

.toolbar-button.active {
	background-color: #d0d0d0;
	color: #333;
	font-weight: bold;
}

.toolbar-select {
	height: 32px;
	padding: 0 8px;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	background-color: white;
	font-size: 14px;
	color: #666;
	cursor: pointer;
}

.ai-button {
	position: relative;
	color: #4a6cf7;
}

.ai-button span {
	margin-left: 4px;
	font-size: 12px;
	font-weight: bold;
}
</style>
```

## 4. 与现有系统集成

### 4.1 编辑器替换策略

#### 4.1.1 渐进式替换

1. **保留 Toast UI Editor**：作为降级方案，确保系统稳定性
2. **新增 Tiptap Editor**：作为高级编辑器选项
3. **用户选择**：允许用户在编辑模式之间切换
4. **数据兼容**：实现两种编辑器格式之间的转换

#### 4.1.2 集成点设计

| 集成点       | 现有文件                   | 修改方式               | 影响范围 |
| ------------ | -------------------------- | ---------------------- | -------- |
| 接口文档编辑 | `views/interface/edit.vue` | 添加 Tiptap 编辑器选项 | 中       |
| 项目文档编辑 | `views/project/doc.vue`    | 添加 Tiptap 编辑器选项 | 中       |
| 测试用例编辑 | `views/testcase/edit.vue`  | 添加 Tiptap 编辑器选项 | 小       |
| 全局组件注册 | `entry.vue`                | 注册 Tiptap 编辑器组件 | 小       |

### 4.2 数据格式转换

#### 4.2.1 Markdown 到块级内容的转换

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// Markdown 到块级内容的转换工具
	return {
		markdownToBlocks(markdown) {
			// 实现 Markdown 到 Tiptap 块级内容的转换
			// 可以使用 markdown-it 或其他库进行解析
			try {
				const md = window.markdownit();
				const html = md.render(markdown);
				// 基于 HTML 生成 Tiptap 内容结构
				return this.htmlToBlocks(html);
			} catch (error) {
				console.error("Markdown conversion failed:", error);
				return [{ type: "paragraph", content: [{ type: "text", text: markdown }] }];
			}
		},

		htmlToBlocks(html) {
			// 实现 HTML 到 Tiptap 块级内容的转换
			// 解析 HTML 并生成对应的块结构
			return []; // 实际实现
		},

		blocksToMarkdown(blocks) {
			// 实现 Tiptap 块级内容到 Markdown 的转换
			return ""; // 实际实现
		},

		blocksToHtml(blocks) {
			// 实现 Tiptap 块级内容到 HTML 的转换
			return ""; // 实际实现
		}
	};
}
</script>
```

### 4.3 性能优化策略

#### 4.3.1 编辑器性能优化

| 优化策略   | 实现方式                 | 预期效果               | 优先级 |
| ---------- | ------------------------ | ---------------------- | ------ |
| 虚拟滚动   | 实现编辑器内容的虚拟滚动 | 大文档编辑流畅         | 高     |
| 懒加载     | 按需加载编辑器扩展       | 编辑器初始化速度提升   | 高     |
| 防抖处理   | 对内容更新事件进行防抖   | 减少频繁更新的性能开销 | 中     |
| 缓存机制   | 缓存编辑器状态和配置     | 提升编辑器恢复速度     | 中     |
| Web Worker | 复杂计算移至 Web Worker  | 避免阻塞主线程         | 低     |

## 5. 总结

通过实现 Tiptap 编辑器模块，我们将为 business*xspace 项目带来现代化的块级编辑体验，支持灵活的内容组织、拖拽排序、AI 辅助
等高级功能。实施过程中，我们将严格遵循项目现有的前端代码规则，使用 `*.$importVue()` 动态加载机制，确保与现有架构的一致性
和兼容性。

核心实现包括：

1. **Tiptap 编辑器核心**：基于 ProseMirror 的强大编辑引擎
2. **块级内容系统**：支持多种内容块类型，提供灵活的内容组织能力
3. **拖拽排序功能**：提升内容编辑和组织的效率
4. **工具栏系统**：提供直观的编辑工具和 AI 功能入口
5. **与现有系统集成**：渐进式替换现有编辑器，确保系统稳定性

通过这些实现，我们将显著提升 business_xspace 项目的编辑体验和功能能力，使其具备与现代文档编辑工具相媲美的能力。
