# 实施步骤与测试

## 1. 准备工作

### 1.1 环境检查

**操作步骤：**

1. **检查当前项目状态**

    ```bash
    # 检查当前目录
    pwd
    # 检查 Git 状态
    git status
    # 检查项目结构
    ls -la
    ```

2. **检查依赖项**

    ```bash
    # 检查是否存在 node_modules
    ls -la node_modules
    # 检查 package.json（如果存在）
    cat package.json
    ```

3. **检查现有编辑器**

    ```bash
    # 检查 Toast UI Editor 相关文件
    ls -la static/business_yapi/components/TuiEditor/
    # 检查编辑器配置
    cat static/business_yapi/components/TuiEditor/TuiEditor.vue
    ```

4. **检查 UI 组件库**
    ```bash
    # 检查 ui-x 组件库目录
    ls -la static/common/ui-x/
    # 检查核心组件
    ls -la static/common/ui-x/common/
    # 检查 xItem 系列组件
    ls -la static/common/ui-x/common/xItem/
    ```

### 1.2 目录结构准备

**操作步骤：**

1. **创建 DocFlow 相关目录**

    ```bash
    # 创建 DocFlow 组件目录
    mkdir -p static/business_yapi/components/DocFlow/
    # 创建 DocFlow 视图目录
    mkdir -p static/business_yapi/views/docflow/
    # 创建 AI 工具目录
    mkdir -p static/business_yapi/utils/ai/
    # 创建样式目录
    mkdir -p static/business_yapi/styles/docflow/
    ```

2. **创建临时工作目录**
    ```bash
    # 创建临时目录用于存放下载的依赖
    mkdir -p temp/docflow/
    ```

### 1.3 依赖项准备

**操作步骤：**

1. **下载 Tiptap 核心文件**

    ```bash
    # 进入临时目录
    cd temp/docflow/
    # 下载 Tiptap 核心
    curl -O https://unpkg.com/@tiptap/core@2.5.8/dist/tiptap-core.js
    # 下载 Starter Kit
    curl -O https://unpkg.com/@tiptap/starter-kit@2.11.7/dist/tiptap-starter-kit.js
    # 下载 Document
    curl -O https://unpkg.com/@tiptap/extension-document@2.1.13/dist/tiptap-extension-document.js
    # 下载 Text
    curl -O https://unpkg.com/@tiptap/extension-text@2.1.13/dist/tiptap-extension-text.js
    # 下载 Paragraph
    curl -O https://unpkg.com/@tiptap/extension-paragraph@2.1.13/dist/tiptap-extension-paragraph.js
    # 下载 Heading
    curl -O https://unpkg.com/@tiptap/extension-heading@2.1.13/dist/tiptap-extension-heading.js
    # 下载 Bold
    curl -O https://unpkg.com/@tiptap/extension-bold@2.1.13/dist/tiptap-extension-bold.js
    # 下载 Italic
    curl -O https://unpkg.com/@tiptap/extension-italic@2.1.13/dist/tiptap-extension-italic.js
    ```

2. **下载 Yjs 相关文件**

    ```bash
    # 下载 Yjs
    curl -O https://unpkg.com/yjs@13.6.16/dist/y.js
    # 下载 Y-WebRTC
    curl -O https://unpkg.com/y-webrtc@10.2.6/dist/y-webrtc.js
    # 下载 Y-Array
    curl -O https://unpkg.com/y-array@1.0.8/dist/y-array.js
    # 下载 Y-Map
    curl -O https://unpkg.com/y-map@1.0.8/dist/y-map.js
    # 下载 Y-Text
    curl -O https://unpkg.com/y-text@1.0.8/dist/y-text.js
    ```

3. **下载 ProseMirror 相关文件**

    ```bash
    # 下载 ProseMirror State
    curl -O https://unpkg.com/prosemirror-state@1.4.4/dist/prosemirror-state.js
    # 下载 ProseMirror View
    curl -O https://unpkg.com/prosemirror-view@1.32.12/dist/prosemirror-view.js
    # 下载 ProseMirror Model
    curl -O https://unpkg.com/prosemirror-model@1.24.3/dist/prosemirror-model.js
    # 下载 ProseMirror Commands
    curl -O https://unpkg.com/prosemirror-commands@1.5.2/dist/prosemirror-commands.js
    # 下载 ProseMirror History
    curl -O https://unpkg.com/prosemirror-history@1.3.2/dist/prosemirror-history.js
    # 下载 ProseMirror Keymap
    curl -O https://unpkg.com/prosemirror-keymap@1.2.2/dist/prosemirror-keymap.js
    ```

4. **复制依赖到项目目录**

    ```bash
    # 创建依赖目录
    mkdir -p static/business_yapi/common/tiptap/
    mkdir -p static/business_yapi/common/yjs/
    mkdir -p static/business_yapi/common/prosemirror/

    # 复制 Tiptap 文件
    cp tiptap-*.js static/business_yapi/common/tiptap/
    # 复制 Yjs 文件
    cp y-*.js static/business_yapi/common/yjs/
    # 复制 ProseMirror 文件
    cp prosemirror-*.js static/business_yapi/common/prosemirror/
    ```

## 2. 核心模块实现

### 2.1 编辑器模块实现

**操作步骤：**

1. **创建 Tiptap 编辑器核心组件**

    ```bash
    # 创建编辑器核心组件
    touch static/business_yapi/components/DocFlow/Editor.vue
    ```

    **文件内容：**

    ```vue
    <template>
    	<div class="docflow-editor">
    		<div class="editor-toolbar">
    			<button :class="{ active: editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
    				粗体
    			</button>
    			<button
    				:class="{ active: editor.isActive('italic') }"
    				@click="editor.chain().focus().toggleItalic().run()">
    				斜体
    			</button>
    			<button @click="editor.chain().focus().setNode('heading', { level: 1 }).run()">H1</button>
    			<button @click="editor.chain().focus().setNode('heading', { level: 2 }).run()">H2</button>
    			<button @click="editor.chain().focus().setNode('paragraph').run()">段落</button>
    		</div>
    		<div class="editor-content" ref="editorContent"></div>
    	</div>
    </template>

    <script lang="ts">
    export default async function ({ PRIVATE_GLOBAL }) {
    	// 动态加载依赖
    	await _.$importVue(["/common/tiptap/tiptap-core.js", "/common/tiptap/tiptap-starter-kit.js"]);

    	return {
    		props: {
    			initialContent: {
    				type: String,
    				default: ""
    			}
    		},
    		data() {
    			return {
    				editor: null
    			};
    		},
    		mounted() {
    			this.initEditor();
    		},
    		beforeUnmount() {
    			if (this.editor) {
    				this.editor.destroy();
    			}
    		},
    		methods: {
    			initEditor() {
    				const { Editor } = window.TiptapCore;
    				const { StarterKit } = window.TiptapStarterKit;

    				this.editor = new Editor({
    					element: this.$refs.editorContent,
    					extensions: [StarterKit],
    					content: this.initialContent || "<p>开始编辑...</p>",
    					onUpdate: ({ editor }) => {
    						const content = editor.getHTML();
    						this.$emit("update:content", content);
    					}
    				});
    			}
    		}
    	};
    }
    </script>

    <style scoped>
    .docflow-editor {
    	border: 1px solid #ddd;
    	border-radius: 4px;
    	overflow: hidden;
    }

    .editor-toolbar {
    	background: #f8f9fa;
    	border-bottom: 1px solid #ddd;
    	padding: 8px 12px;
    	display: flex;
    	gap: 8px;
    }

    .editor-toolbar button {
    	padding: 6px 12px;
    	border: 1px solid #ddd;
    	border-radius: 4px;
    	background: white;
    	cursor: pointer;
    	font-size: 14px;
    	transition: all 0.2s;
    }

    .editor-toolbar button:hover {
    	background: #e9ecef;
    }

    .editor-toolbar button.active {
    	background: #007bff;
    	color: white;
    	border-color: #007bff;
    }

    .editor-content {
    	padding: 16px;
    	min-height: 400px;
    	font-size: 16px;
    	line-height: 1.6;
    }

    .editor-content :deep(h1) {
    	font-size: 24px;
    	margin: 20px 0 10px;
    }

    .editor-content :deep(h2) {
    	font-size: 20px;
    	margin: 16px 0 8px;
    }

    .editor-content :deep(p) {
    	margin: 10px 0;
    }

    .editor-content :deep(strong) {
    	font-weight: bold;
    }

    .editor-content :deep(em) {
    	font-style: italic;
    }
    </style>
    ```

2. **创建编辑器工具函数**

    ```bash
    # 创建编辑器工具函数
    touch static/business_yapi/utils/docflow/editor.js
    ```

    **文件内容：**

    ```javascript
    // 编辑器工具函数
    const editorUtils = {
    	// 初始化编辑器配置
    	getEditorConfig() {
    		return {
    			extensions: [],
    			content: "<p>开始编辑...</p>",
    			onUpdate: () => {}
    		};
    	},

    	// 生成编辑器内容
    	generateContent(text) {
    		return `<p>${text}</p>`;
    	},

    	// 解析编辑器内容
    	parseContent(html) {
    		const temp = document.createElement("div");
    		temp.innerHTML = html;
    		return temp.textContent || temp.innerText || "";
    	},

    	// 检查内容是否为空
    	isContentEmpty(content) {
    		const text = this.parseContent(content);
    		return !text || text.trim() === "";
    	}
    };

    export default editorUtils;
    ```

### 2.2 AI 功能实现

**操作步骤：**

1. **创建 AI 服务核心文件**

    ```bash
    # 创建 AI 服务核心文件
    touch static/business_yapi/utils/ai/ai.vue
    ```

    **文件内容：**

    ```vue
    <script lang="ts">
    export default function () {
    	return function AIService() {
    		let config = {};

    		return {
    			// 初始化服务
    			init(options = {}) {
    				config = {
    					apiBaseUrl: options.apiBaseUrl || "/api/docflow",
    					timeout: options.timeout || 30000,
    					...options
    				};
    			},

    			// 头脑风暴功能
    			brainstorming: {
    				generate(prompt) {
    					return {
    						type: "brainstorming",
    						prompt,
    						parameters: {
    							maxIdeas: 5,
    							creativity: 0.7
    						}
    					};
    				}
    			},

    			// 文本润色功能
    			textPolish: {
    				polish(text) {
    					return {
    						type: "text_polish",
    						text,
    						parameters: {
    							style: "professional",
    							tone: "neutral"
    						}
    					};
    				}
    			},

    			// 内容续写功能
    			contentComplete: {
    				complete(text) {
    					return {
    						type: "content_complete",
    						text,
    						parameters: {
    							maxLength: 500,
    							temperature: 0.6
    						}
    					};
    				}
    			},

    			// 流式请求
    			streamRequest(url, data, callbacks = {}) {
    				return new Promise((resolve, reject) => {
    					const { onMessage, onError, onComplete, onOpen } = callbacks;

    					try {
    						// 创建 SSE 连接
    						const eventSource = new EventSource(`${config.apiBaseUrl}${url}`);

    						// 监听消息
    						eventSource.addEventListener("message", event => {
    							try {
    								const data = JSON.parse(event.data);
    								if (onMessage) onMessage(data);
    							} catch (error) {
    								if (onError) onError(error);
    							}
    						});

    						// 监听错误
    						eventSource.addEventListener("error", error => {
    							if (onError) onError(error);
    							eventSource.close();
    							reject(error);
    						});

    						// 监听完成
    						eventSource.addEventListener("complete", () => {
    							if (onComplete) onComplete();
    							eventSource.close();
    							resolve();
    						});

    						// 监听打开
    						if (onOpen) {
    							eventSource.addEventListener("open", onOpen);
    						}
    					} catch (error) {
    						if (onError) onError(error);
    						reject(error);
    					}
    				});
    			},

    			// 普通请求
    			request(url, options = {}) {
    				return fetch(`${config.apiBaseUrl}${url}`, {
    					method: options.method || "POST",
    					headers: {
    						"Content-Type": "application/json",
    						...options.headers
    					},
    					body: JSON.stringify(options.data || {}),
    					timeout: config.timeout
    				}).then(response => {
    					if (!response.ok) {
    						throw new Error(`HTTP error! status: ${response.status}`);
    					}
    					return response.json();
    				});
    			}
    		};
    	};
    }
    </script>
    ```

2. **创建 AI 助手视图**

    ```bash
    # 创建 AI 助手视图
    touch static/business_yapi/views/docflow/ai.vue
    ```

    **文件内容：**

    ```vue
    <template>
    	<div class="docflow-ai-page">
    		<div class="ai-header">
    			<h2>AI 助手</h2>
    			<p>智能辅助创作工具</p>
    		</div>

    		<div class="ai-tools">
    			<div class="tool-card" @click="openBrainstorming">
    				<div class="tool-icon">
    					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    						<path
    							d="M12 2L15 5V11L12 14L9 11V5L12 2Z"
    							stroke="currentColor"
    							stroke-width="2"
    							stroke-linecap="round"
    							stroke-linejoin="round" />
    						<path d="M12 8V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    						<path d="M12 5V2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    					</svg>
    				</div>
    				<h3>头脑风暴</h3>
    				<p>快速生成创意想法和解决方案</p>
    			</div>

    			<div class="tool-card" @click="openTextPolish">
    				<div class="tool-icon">
    					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    						<path
    							d="M6 16L10 12L6 8"
    							stroke="currentColor"
    							stroke-width="2"
    							stroke-linecap="round"
    							stroke-linejoin="round" />
    						<path
    							d="M14 16L18 12L14 8"
    							stroke="currentColor"
    							stroke-width="2"
    							stroke-linecap="round"
    							stroke-linejoin="round" />
    					</svg>
    				</div>
    				<h3>文本润色</h3>
    				<p>优化文本表达，提升专业度</p>
    			</div>

    			<div class="tool-card" @click="openContentComplete">
    				<div class="tool-icon">
    					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    						<path
    							d="M19 14V20H5V14"
    							stroke="currentColor"
    							stroke-width="2"
    							stroke-linecap="round"
    							stroke-linejoin="round" />
    						<path
    							d="M12 12L19 14V20H5V14L12 12Z"
    							stroke="currentColor"
    							stroke-width="2"
    							stroke-linecap="round"
    							stroke-linejoin="round" />
    						<path
    							d="M8 12V8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V12"
    							stroke="currentColor"
    							stroke-width="2"
    							stroke-linecap="round"
    							stroke-linejoin="round" />
    						<path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    					</svg>
    				</div>
    				<h3>内容续写</h3>
    				<p>智能续写内容，保持风格一致</p>
    			</div>
    		</div>

    		<div class="ai-chat" v-if="showChat">
    			<div class="chat-header">
    				<h3>{{ currentTool }}</h3>
    				<button class="close-button" @click="closeChat">&times;</button>
    			</div>

    			<div class="chat-messages">
    				<div class="message user-message">
    					<div class="message-content">{{ userInput }}</div>
    				</div>

    				<div class="message ai-message">
    					<div class="message-content" v-html="aiResponse"></div>
    					<div class="message-status" v-if="aiStatus === 'loading'">
    						<div class="loading-spinner"></div>
    						<span>AI 思考中...</span>
    					</div>
    				</div>
    			</div>

    			<div class="chat-input">
    				<input
    					v-model="userInput"
    					class="form-control"
    					placeholder="输入您的需求..."
    					@keyup.enter="sendMessage" />
    				<button
    					class="btn btn-primary"
    					@click="sendMessage"
    					:disabled="!userInput || aiStatus === 'loading'">
    					{{ aiStatus === "loading" ? "处理中..." : "发送" }}
    				</button>
    			</div>
    		</div>
    	</div>
    </template>

    <script lang="ts">
    export default async function ({ PRIVATE_GLOBAL }) {
    	// 动态加载 AI 服务
    	const [AIService] = await _.$importVue(["@/utils/ai/ai.vue"]);

    	return {
    		data() {
    			return {
    				showChat: false,
    				currentTool: "",
    				userInput: "",
    				aiResponse: "",
    				aiStatus: "idle", // idle, loading, success, error
    				aiService: new AIService()
    			};
    		},
    		methods: {
    			openBrainstorming() {
    				this.showChat = true;
    				this.currentTool = "头脑风暴";
    				this.userInput = "请针对 API 文档设计进行头脑风暴，生成 5 个创意想法";
    			},
    			openTextPolish() {
    				this.showChat = true;
    				this.currentTool = "文本润色";
    				this.userInput =
    					"请润色以下文本，使其更加专业和流畅：\n\n这是一段需要润色的文本，希望能够更加专业和流畅。";
    			},
    			openContentComplete() {
    				this.showChat = true;
    				this.currentTool = "内容续写";
    				this.userInput =
    					"请续写以下内容，保持风格一致：\n\nAPI 文档是软件开发中非常重要的组成部分，它能够帮助开发者快速理解和使用 API。";
    			},
    			closeChat() {
    				this.showChat = false;
    				this.currentTool = "";
    				this.userInput = "";
    				this.aiResponse = "";
    				this.aiStatus = "idle";
    			},
    			async sendMessage() {
    				if (!this.userInput || this.aiStatus === "loading") return;

    				this.aiStatus = "loading";
    				this.aiResponse = "";

    				try {
    					let serviceMethod;

    					switch (this.currentTool) {
    						case "头脑风暴":
    							serviceMethod = this.aiService.brainstorming.generate;
    							break;
    						case "文本润色":
    							serviceMethod = this.aiService.textPolish.polish;
    							break;
    						case "内容续写":
    							serviceMethod = this.aiService.contentComplete.complete;
    							break;
    						default:
    							return;
    					}

    					// 生成请求数据
    					const data = await serviceMethod(this.userInput);

    					// 模拟 AI 响应
    					setTimeout(() => {
    						this.aiResponse = "这是 AI 生成的响应内容...";
    						this.aiStatus = "success";
    					}, 2000);
    				} catch (error) {
    					console.error("AI service error:", error);
    					this.aiStatus = "error";
    					this.aiResponse = "抱歉，AI 服务暂时不可用，请稍后重试。";
    				}
    			}
    		},
    		mounted() {
    			// 初始化 AI 服务
    			this.aiService.init({});
    		}
    	};
    }
    </script>

    <style scoped>
    .docflow-ai-page {
    	padding: 20px;
    	background: #f5f5f5;
    	min-height: 100vh;
    }

    .ai-header {
    	text-align: center;
    	margin-bottom: 40px;
    }

    .ai-header h2 {
    	font-size: 32px;
    	color: #333;
    	margin-bottom: 10px;
    }

    .ai-header p {
    	font-size: 18px;
    	color: #666;
    }

    .ai-tools {
    	display: grid;
    	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    	gap: 20px;
    	margin-bottom: 40px;
    }

    .tool-card {
    	background: white;
    	border-radius: 8px;
    	padding: 30px;
    	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    	cursor: pointer;
    	transition: all 0.3s ease;
    	text-align: center;
    }

    .tool-card:hover {
    	transform: translateY(-5px);
    	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .tool-icon {
    	width: 80px;
    	height: 80px;
    	margin: 0 auto 20px;
    	background: #f0f4ff;
    	border-radius: 50%;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	color: #4a6cf7;
    }

    .tool-card h3 {
    	font-size: 20px;
    	color: #333;
    	margin-bottom: 10px;
    }

    .tool-card p {
    	font-size: 14px;
    	color: #666;
    	line-height: 1.5;
    }

    .ai-chat {
    	background: white;
    	border-radius: 8px;
    	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    	max-width: 800px;
    	margin: 0 auto;
    	overflow: hidden;
    }

    .chat-header {
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    	padding: 20px;
    	background: #f8f9fa;
    	border-bottom: 1px solid #e0e0e0;
    }

    .chat-header h3 {
    	margin: 0;
    	font-size: 18px;
    	color: #333;
    }

    .close-button {
    	background: none;
    	border: none;
    	font-size: 24px;
    	cursor: pointer;
    	color: #666;
    	padding: 0;
    	width: 24px;
    	height: 24px;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	border-radius: 4px;
    	transition: background-color 0.2s;
    }

    .close-button:hover {
    	background-color: #e0e0e0;
    }

    .chat-messages {
    	padding: 20px;
    	max-height: 500px;
    	overflow-y: auto;
    }

    .message {
    	margin-bottom: 20px;
    }

    .user-message {
    	text-align: right;
    }

    .user-message .message-content {
    	display: inline-block;
    	background: #e3f2fd;
    	padding: 12px 16px;
    	border-radius: 18px 18px 0 18px;
    	max-width: 80%;
    	text-align: left;
    }

    .ai-message .message-content {
    	background: #f5f5f5;
    	padding: 12px 16px;
    	border-radius: 18px 18px 18px 0;
    	max-width: 80%;
    }

    .message-status {
    	display: flex;
    	align-items: center;
    	gap: 10px;
    	margin-top: 10px;
    	font-size: 14px;
    	color: #666;
    }

    .loading-spinner {
    	width: 16px;
    	height: 16px;
    	border: 2px solid #f3f3f3;
    	border-top: 2px solid #007bff;
    	border-radius: 50%;
    	animation: spin 1s linear infinite;
    }

    @keyframes spin {
    	0% {
    		transform: rotate(0deg);
    	}
    	100% {
    		transform: rotate(360deg);
    	}
    }

    .chat-input {
    	display: flex;
    	gap: 10px;
    	padding: 20px;
    	border-top: 1px solid #e0e0e0;
    	background: #f8f9fa;
    }

    .chat-input .form-control {
    	flex: 1;
    	padding: 10px 16px;
    	border: 1px solid #ddd;
    	border-radius: 20px;
    	font-size: 14px;
    }

    .chat-input .btn {
    	padding: 10px 20px;
    	border-radius: 20px;
    	font-size: 14px;
    }
    </style>
    ```

### 2.3 实时协作实现

**操作步骤：**

1. **创建协作服务核心文件**

    ```bash
    # 创建协作服务核心文件
    touch static/business_yapi/components/DocFlow/Collaboration.vue
    ```

    **文件内容：**

    ```vue
    <template>
      <div class="docflow-collaboration">
        <div class="collaboration-header">
          <h3>实时协作</h3>
          <div class="collaboration-status">
            <span :class="{ active: isConnected }">
              {{ isConnected ? '已连接' : '未连接' }}
            </span>
          </div>
        </div>

        <div class="collaboration-users">
          <h4>在线用户</h4>
          <div class="user-list">
            <div
              v-for="user in onlineUsers"
              :key="user.id"
              class="user-item"
            >
              <div class="user-avatar">{{ user.name.charAt(0) }}</div>
              <span class="user-name">{{ user.name }}</span>
              <span class="user-status">{{ user.status }}</span>
            </div>
          </div>
        </div>

        <div class="collaboration-editor">
          <DocFlowEditor
            ref="editor"
            :initial-content="document.content"
            @update:content="handleContentUpdate"
          />
        </div>
      </div>
    </template>

    <script lang="ts">
    export default async function ({ PRIVATE_GLOBAL }) {
      // 动态加载依赖
      await _.$importVue([
        '@/components/DocFlow/Editor.vue',
        '/common/yjs/y.js'
      ]);

      return {
        props: {
          documentId: {
            type: String,
            default: ''
          }
        },
        data() {
          return {
            isConnected: false,
            onlineUsers: [],
            document: {
              id: '',
              title: '协作文档',
              content: '<p>开始协作编辑...</p>',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            ydoc: null,
            provider: null
          };
        },
        mounted() {
          this.initCollaboration();
        },
        beforeUnmount() {
          this.destroyCollaboration();
        },
        methods: {
          // 初始化协作
          initCollaboration() {
            try {
              // 初始化 Yjs 文档
              this.ydoc = new window.Y.Doc();

              // 模拟连接状态
              setTimeout(() => {
                this.isConnected = true;
                this.onlineUsers = [
                  { id: '1', name: '用户1', status: '编辑中' },
                  { id: '2', name: '用户2', status: '查看中' }
                ];
              }, 1000);
            } catch (error) {
              console.error('初始化协作失败:', error);
            }
          },

          // 销毁协作
          destroyCollaboration() {
            if (this.provider) {
              this.provider.disconnect();
              this.provider = null;
            }
            if (this.ydoc) {
              this.ydoc.destroy();
              this.ydoc = null;
            }
          },

          // 处理内容更新
          handleContentUpdate(content) {
            this.document.content = content;
            this.document.updatedAt = new Date();
            this.$emit('update:content', content);
          },

          // 邀请用户
          inviteUser() {
            // 邀请用户逻辑
          },

          // 离开协作
          leaveCollaboration() {
            this.destroyCollaboration();
            this.$emit('leave');
          }
        }
      };
    }
    </script>

    <style scoped>
    .docflow-collaboration {
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    .collaboration-header {
      background: #f8f9fa;
      border-bottom: 1px solid #ddd;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ```

### 2.4 UI 组件库复用

**操作步骤：**

1. **创建 UI 组件工具文件**

    ```bash
    # 创建 UI 组件工具文件
    touch static/business_yapi/utils/docflow/ui.js
    ```

    **文件内容：**

    ```javascript
    // UI 组件库工具函数
    const uiUtils = {
    	// 打开模态框
    	openModal(options = {}) {
    		return _.$openModal({
    			title: options.title || "提示",
    			url: options.url,
    			parent: options.parent,
    			...options
    		});
    	},

    	// 创建表单项
    	createFormItem(config = {}) {
    		return {
    			label: config.label || "",
    			value: config.value || "",
    			placeholder: config.placeholder || "",
    			onChange: config.onChange || (() => {})
    		};
    	}
    };

    export default uiUtils;
    ```

2. **在编辑器中使用 UI 组件**

    ```bash
    # 修改编辑器组件，添加 UI 组件支持
    edit static/business_yapi/components/DocFlow/Editor.vue
    ```

    **修改内容：**

    ```vue
    <script lang="ts">
    export default async function ({ PRIVATE_GLOBAL }) {
    	// 动态加载依赖
    	await _.$importVue(["/common/tiptap/tiptap-core.js", "/common/tiptap/tiptap-starter-kit.js"]);

    	return {
    		props: {
    			initialContent: {
    				type: String,
    				default: ""
    			}
    		},
    		data() {
    			return {
    				editor: null
    			};
    		},
    		methods: {
    			initEditor() {
    				// 编辑器初始化逻辑
    			},

    			// 打开设置对话框
    			openSettingsDialog() {
    				_.$openModal({
    					title: "文档设置",
    					url: "@/components/DocFlow/Settings.dialog.vue",
    					parent: this,
    					editor: this.editor,
    					onSave: settings => {
    						console.log("保存设置:", settings);
    					}
    				});
    			}
    		}
    	};
    }
    </script>
    ```

3. **在 AI 助手中使用 UI 组件**

    ```bash
    # 修改 AI 助手视图，添加 UI 组件支持
    edit static/business_yapi/views/docflow/ai.vue
    ```

    **修改内容：**

    ```vue
    <script lang="ts">
    export default async function ({ PRIVATE_GLOBAL }) {
    	// 动态加载 AI 服务
    	const [AIService] = await _.$importVue(["@/utils/ai/ai.vue"]);

    	return {
    		data() {
    			return {
    				showChat: false,
    				currentTool: "",
    				userInput: "",
    				aiResponse: "",
    				aiStatus: "idle",
    				aiService: new AIService()
    			};
    		},
    		methods: {
    			// 打开设置对话框
    			openSettingsDialog() {
    				_.$openModal({
    					title: "AI 助手设置",
    					url: "@/components/DocFlow/AISettings.dialog.vue",
    					parent: this,
    					onSave: settings => {
    						console.log("保存 AI 设置:", settings);
    					}
    				});
    			}
    		}
    	};
    }
    </script>
    ```

4. **查看 UI 组件文档**

    ```bash
    # 查看 UI 组件文档
    start static/business_doc/index.html
    ```

    **文档结构：**

    - `static/business_doc/views/base/`：基础组件文档
    - `static/business_doc/views/component/`：高级组件文档
    - `static/business_doc/doc/reuseElementUI.md`：组件复用指南

**使用示例：**

```javascript
// 打开文档设置模态框
function openDocumentSettings() {
  _.$openModal({
    title: '文档设置',
    url: '@/components/DocFlow/Settings.dialog.vue',
    parent: this,
    documentTitle: this.documentTitle,
    documentType: this.documentType,
    onSave: (settings) => {
      this.documentTitle = settings.documentTitle;
      this.documentType = settings.documentType;
    }
  });
}

// 标准对话框组件 (Settings.dialog.vue)
<template>
  <xDialog style="--xDialog-wrapper-width: 800px">
    <!-- 使用 xForm 组件 -->
    <xForm col="1">
      <!-- 使用 xItem 组件 -->
      <xItem :configs="form.documentTitle" />
      <xItem :configs="form.documentType" />
    </xForm>

    <!-- 对话框底部按钮 -->
    <template #footer>
      <!-- 使用 xBtn 组件 -->
      <xBtn :configs="btnOk" />
      <xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
    </template>
  </xDialog>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL, closeModal, documentTitle, documentType, onSave }) {
  /* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
  const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

  return defineComponent({
    inject: ["APP"],
    props: useDialogProps(),
    data() {
      const vm = this;
      return {
        form: defItems({
          documentTitle: {
            label: i18n("文档标题"),
            value: documentTitle || '',
            rules: [_rules.required()]
          },
          documentType: {
            label: i18n("文档类型"),
            type: "select",
            value: documentType || 'document',
            options: [
              { label: i18n("文档"), value: "document" },
              { label: i18n("文章"), value: "article" },
              { label: i18n("报告"), value: "report" }
            ],
            rules: [_rules.required()]
          }
        }),
        btnOk: {
          label: i18n("ok"),
          preset: "blue",
          async onClick() {
            const [atLestOne] = await _.$validateForm(vm.$el);
            if (atLestOne) return;

            const formData = _.$pickFormValues(vm.form);
            if (onSave) {
              onSave(formData);
            }
            closeModal();
          }
        }
      };
    }
  });
}
</script>
```

**注意**：

1. UI 组件已经在框架初始化时通过 `useXui.vue` 被全局注册和懒加载，因此在业务组件中无需再显式引入这些组件，可以直接在模板
   中使用。
2. 对话框组件通常使用 `<xDialog>` 作为根容器，通过 `#footer` 插槽添加底部按钮。
3. 表单组件通常使用 `<xForm>` 作为容器，内部使用 `<xItem>` 作为表单项。
4. 按钮组件通常使用 `<xBtn>` 组件，通过 `configs` 属性传递配置。
5. 表单项通常使用 `<xItem>` 组件，通过 `configs` 属性传递配置，包括 label、value、rules、type、options 等。
6. 对话框组件需要使用 `useDialogProps()` 混入必要的属性和方法。

## 3. 菜单与路由集成

### 3.1 菜单配置修改

**操作步骤：**

1. **修改菜单配置文件**

    ```bash
    # 检查现有菜单配置
    cat static/business_yapi/config/menu.js
    # 备份菜单配置
    cp static/business_yapi/config/menu.js static/business_yapi/config/menu.js.bak
    # 修改菜单配置
    vi static/business_yapi/config/menu.js
    ```

    **修改内容：**

    ```javascript
    // 菜单配置文件
    module.exports = {
    	// 现有菜单...
    	doc: {
    		name: "文档管理",
    		icon: "file-text",
    		children: [
    			// 现有子菜单...
    		]
    	},

    	// 新增 DocFlow 菜单
    	docflow: {
    		name: "DocFlow",
    		icon: "docflow",
    		children: [
    			{
    				name: "块级编辑器",
    				path: "/docflow/editor",
    				component: "@/views/docflow/editor.vue",
    				icon: "block-editor"
    			},
    			{
    				name: "AI 助手",
    				path: "/docflow/ai",
    				component: "@/views/docflow/ai.vue",
    				icon: "ai-assistant"
    			},
    			{
    				name: "实时协作",
    				path: "/docflow/collaboration",
    				component: "@/views/docflow/collaboration.vue",
    				icon: "collaboration"
    			},
    			{
    				name: "文档模板",
    				path: "/docflow/templates",
    				component: "@/views/docflow/templates.vue",
    				icon: "templates"
    			}
    		]
    	}

    	// 其他现有菜单...
    };
    ```

2. **修改路由配置文件**

    ```bash
    # 检查现有路由配置
    cat static/business_yapi/config/routes.js
    # 备份路由配置
    cp static/business_yapi/config/routes.js static/business_yapi/config/routes.js.bak
    # 修改路由配置
    vi static/business_yapi/config/routes.js
    ```

    **修改内容：**

    ```javascript
    // 路由配置文件
    module.exports = [
    	// 现有路由...

    	// 新增 DocFlow 路由
    	{
    		path: "/docflow",
    		component: "@/views/docflow/index.vue",
    		meta: {
    			title: "DocFlow",
    			requireAuth: true
    		},
    		children: [
    			{
    				path: "editor",
    				component: "@/views/docflow/editor.vue",
    				meta: {
    					title: "块级编辑器",
    					requireAuth: true
    				}
    			},
    			{
    				path: "ai",
    				component: "@/views/docflow/ai.vue",
    				meta: {
    					title: "AI 助手",
    					requireAuth: true
    				}
    			},
    			{
    				path: "collaboration",
    				component: "@/views/docflow/collaboration.vue",
    				meta: {
    					title: "实时协作",
    					requireAuth: true
    				}
    			},
    			{
    				path: "templates",
    				component: "@/views/docflow/templates.vue",
    				meta: {
    					title: "文档模板",
    					requireAuth: true
    				}
    			}
    		]
    	}

    	// 其他现有路由...
    ];
    ```

### 3.2 图标注册

**操作步骤：**

1. **创建图标注册文件**

    ```bash
    # 创建图标注册文件
    touch static/business_yapi/utils/icons.js
    ```

    **文件内容：**

    ```javascript
    // 图标注册文件
    const icons = {
    	// 现有图标...

    	// 新增 DocFlow 图标
    	docflow: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    	blockEditor: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 8H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 4V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    	aiAssistant: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 4V6M8 10V12M12 8H10M6 8H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    	collaboration: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 7C14 9.76142 11.7614 12 9 12C7.82889 12 6.74346 11.6586 5.85786 11.1213" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6C10.1046 6 11 5.10457 11 4C11 2.89543 10.1046 2 9 2C7.89543 2 7 2.89543 7 4C7 5.10457 7.89543 6 9 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 7C2 4.23858 4.23858 2 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    	templates: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 10H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
    };

    export default icons;
    ```

### 3.3 应用入口集成

**操作步骤：**

1. **修改应用入口文件**

    ```bash
    # 检查现有入口文件
    cat static/business_yapi/entry.vue
    # 备份入口文件
    cp static/business_yapi/entry.vue static/business_yapi/entry.vue.bak
    # 修改入口文件
    vi static/business_yapi/entry.vue
    ```

    **修改内容：**

    ```vue
    <template>
    	<div id="app">
    		<!-- 现有应用结构 -->
    		<router-view v-if="isLogin" />
    		<login v-else />
    	</div>
    </template>

    <script lang="ts">
    export default async function ({ PRIVATE_GLOBAL }) {
    	// 动态加载现有组件
    	const [Login, Menu] = await _.$importVue(["@/components/Login/Login.vue", "@/components/Menu/Menu.vue"]);

    	// 动态注册 DocFlow 组件
    	_.each(
    		{
    			DocFlowEditor: "@/components/DocFlow/Editor.vue",
    			DocFlowAI: "@/components/DocFlow/AI.vue",
    			DocFlowCollaboration: "@/components/DocFlow/Collaboration.vue"
    		},
    		(componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
    	);

    	return {
    		components: {
    			Login,
    			Menu
    		},
    		data() {
    			return {
    				isLogin: false
    			};
    		},
    		mounted() {
    			// 初始化逻辑
    			this.checkLogin();
    		},
    		methods: {
    			checkLogin() {
    				// 登录状态检查
    			}
    		}
    	};
    }
    </script>
    ```

## 4. 样式与资源集成

### 4.1 样式文件创建

**操作步骤：**

1. **创建样式文件**

    ```bash
    # 创建主样式文件
    touch static/business_yapi/styles/docflow/editor.scss
    # 创建 AI 样式文件
    touch static/business_yapi/styles/docflow/ai.scss
    # 创建协作样式文件
    touch static/business_yapi/styles/docflow/collaboration.scss
    # 创建变量文件
    touch static/business_yapi/styles/docflow/variables.scss
    ```

    **变量文件内容：**

    ```scss
    // DocFlow 样式变量
    $docflow-primary-color: #4a6cf7;
    $docflow-secondary-color: #28a745;
    $docflow-warning-color: #ffc107;
    $docflow-info-color: #17a2b8;
    $docflow-danger-color: #dc3545;

    $docflow-bg-color: #f5f5f5;
    $docflow-card-bg: #ffffff;
    $docflow-border-color: #e0e0e0;

    $docflow-text-primary: #333333;
    $docflow-text-secondary: #666666;
    $docflow-text-light: #999999;

    $docflow-border-radius: 8px;
    $docflow-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    $docflow-transition: all 0.3s ease;
    ```

    **编辑器样式文件内容：**

    ```scss
    // 编辑器样式
    @import "./variables.scss";

    .docflow-editor {
    	border: 1px solid $docflow-border-color;
    	border-radius: $docflow-border-radius;
    	overflow: hidden;

    	.editor-toolbar {
    		background: #f8f9fa;
    		border-bottom: 1px solid $docflow-border-color;
    		padding: 8px 12px;
    		display: flex;
    		gap: 8px;

    		button {
    			padding: 6px 12px;
    			border: 1px solid $docflow-border-color;
    			border-radius: 4px;
    			background: $docflow-card-bg;
    			cursor: pointer;
    			font-size: 14px;
    			transition: $docflow-transition;

    			&:hover {
    				background: #e9ecef;
    			}

    			&.active {
    				background: $docflow-primary-color;
    				color: white;
    				border-color: $docflow-primary-color;
    			}
    		}
    	}

    	.editor-content {
    		padding: 16px;
    		min-height: 400px;
    		font-size: 16px;
    		line-height: 1.6;

    		:deep(h1) {
    			font-size: 24px;
    			margin: 20px 0 10px;
    			color: $docflow-text-primary;
    		}

    		:deep(h2) {
    			font-size: 20px;
    			margin: 16px 0 8px;
    			color: $docflow-text-primary;
    		}

    		:deep(p) {
    			margin: 10px 0;
    			color: $docflow-text-primary;
    		}

    		:deep(strong) {
    			font-weight: bold;
    		}

    		:deep(em) {
    			font-style: italic;
    		}
    	}
    }
    ```

2. **修改主样式文件**

    ```bash
    # 检查现有主样式文件
    cat static/business_yapi/styles/main.scss
    # 备份主样式文件
    cp static/business_yapi/styles/main.scss static/business_yapi/styles/main.scss.bak
    # 修改主样式文件
    vi static/business_yapi/styles/main.scss
    ```

    **修改内容：**

    ```scss
    // 现有样式导入
    @import "./variables.scss";
    @import "./components.scss";

    // 新增 DocFlow 样式导入
    @import "./docflow/variables.scss";
    @import "./docflow/editor.scss";
    @import "./docflow/ai.scss";
    @import "./docflow/collaboration.scss";

    // 全局样式
    body {
    	font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
    	// 现有样式...
    }

    // DocFlow 全局样式
    .docflow-container {
    	// 容器样式
    }
    ```

### 4.2 资源文件处理

**操作步骤：**

1. **创建图标文件**

    ```bash
    # 创建图标目录
    mkdir -p static/business_yapi/assets/icons/
    # 创建 DocFlow 图标文件
    touch static/business_yapi/assets/icons/docflow-icons.js
    ```

    **文件内容：**

    ```javascript
    // DocFlow 图标定义
    const docflowIcons = {
    	docflow: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    	blockEditor: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 8H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 4V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    	aiAssistant: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 4V6M8 10V12M12 8H10M6 8H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,

    	collaboration: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 7C14 9.76142 11.7614 12 9 12C7.82889 12 6.74346 11.6586 5.85786 11.1213" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6C10.1046 6 11 5.10457 11 4C11 2.89543 10.1046 2 9 2C7.89543 2 7 2.89543 7 4C7 5.10457 7.89543 6 9 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 7C2 4.23858 4.23858 2 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    	templates: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 10H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
    };

    export default docflowIcons;
    ```

## 5. 测试与验证

### 5.1 功能测试

**操作步骤：**

1. **启动开发服务器**

    ```bash
    # 启动开发服务器
    npm run dev
    # 或使用其他启动命令
    node server.js
    ```

2. **访问 DocFlow 页面**

    - 打开浏览器，访问 `http://localhost:3000/docflow`
    - 检查菜单是否显示正确
    - 检查页面是否加载正常

3. **测试编辑器功能**

    - 访问 `http://localhost:3000/docflow/editor`
    - 测试文本输入
    - 测试格式化功能（粗体、斜体、标题等）
    - 测试内容保存

4. **测试 AI 功能**

    - 访问 `http://localhost:3000/docflow/ai`
    - 测试头脑风暴功能
    - 测试文本润色功能
    - 测试内容续写功能

5. **测试协作功能**
    - 访问 `http://localhost:3000/docflow/collaboration`
    - 测试连接状态
    - 测试用户列表显示
    - 测试协作编辑（可使用多个浏览器窗口模拟）

### 5.2 集成测试

**操作步骤：**

1. **测试与现有系统集成**

    - 访问现有功能页面，检查是否正常
    - 测试 DocFlow 与现有编辑器的切换
    - 测试用户登录状态在 DocFlow 中的保持

2. **测试样式一致性**

    - 检查 DocFlow 页面与系统其他页面的样式一致性
    - 测试不同屏幕尺寸下的响应式表现
    - 检查图标和按钮的样式统一

3. **测试性能**
    - 测试页面加载时间
    - 测试编辑器操作的响应速度
    - 测试 AI 功能的响应时间

### 5.3 兼容性测试

**操作步骤：**

1. **测试主流浏览器**

    - Google Chrome
    - Mozilla Firefox
    - Microsoft Edge
    - Apple Safari（如果可用）

2. **测试移动设备**
    - 使用浏览器开发者工具模拟移动设备
    - 测试触摸操作
    - 测试响应式布局

### 5.4 问题排查

**常见问题与解决方案：**

| 问题          | 可能原因       | 解决方案                     |
| ------------- | -------------- | ---------------------------- |
| 菜单不显示    | 菜单配置错误   | 检查 `config/menu.js` 配置   |
| 页面无法访问  | 路由配置错误   | 检查 `config/routes.js` 配置 |
| 编辑器不加载  | 依赖文件缺失   | 检查 Tiptap 相关文件是否存在 |
| AI 功能无响应 | API 配置错误   | 检查 AI 服务配置和网络连接   |
| 样式不一致    | 样式文件未加载 | 检查样式导入是否正确         |
| 协作功能失败  | Yjs 依赖缺失   | 检查 Yjs 相关文件是否存在    |

**调试命令：**

1. **检查浏览器控制台**

    ```javascript
    // 在浏览器控制台输入
    console.log("DocFlow 测试");
    console.log(window.TiptapCore);
    console.log(window.Y);
    ```

2. **检查网络请求**

    - 使用浏览器开发者工具的 Network 面板
    - 检查依赖文件是否成功加载
    - 检查 API 请求是否正常

3. **检查 Git 状态**
    ```bash
    # 检查 Git 状态
    git status
    # 检查修改的文件
    git diff
    ```

## 6. 部署与发布

### 6.1 构建与打包

**操作步骤：**

1. **检查构建配置**

    ```bash
    # 检查构建脚本
    cat package.json | grep scripts
    # 检查构建配置文件
    ls -la build/
    ```

2. **执行构建**

    ```bash
    # 执行构建命令
    npm run build
    # 或使用其他构建命令
    node build.js
    ```

3. **检查构建结果**
    ```bash
    # 检查构建输出
    ls -la dist/
    # 检查文件大小
    du -sh dist/
    ```

### 6.2 部署

**操作步骤：**

1. **准备部署文件**

    ```bash
    # 创建部署目录
    mkdir -p deploy/docflow/
    # 复制构建结果
    cp -r dist/* deploy/docflow/
    # 复制配置文件
    cp static/business_yapi/config/* deploy/docflow/config/
    ```

2. **部署到服务器**

    ```bash
    # 使用 scp 复制文件
    scp -r deploy/docflow/ user@server:/path/to/deploy/
    # 或使用其他部署工具
    ```

3. **重启服务**
    ```bash
    # 登录服务器
    ssh user@server
    # 进入部署目录
    cd /path/to/deploy/
    # 重启服务
    pm2 restart app
    # 或使用其他重启命令
    ```

### 6.3 发布验证

**操作步骤：**

1. **验证部署结果**

    - 访问生产环境 URL
    - 检查 DocFlow 功能是否正常
    - 检查性能和响应时间

2. **监控运行状态**

    - 检查服务器日志
    - 监控 API 调用频率
    - 监控错误率

3. **收集用户反馈**
    - 发布公告通知用户
    - 收集用户使用反馈
    - 跟踪功能使用情况

## 7. 总结

**实施完成后，我们将：**

1. **完成 DocFlow 核心功能的移植**

    - 块级编辑器（基于 Tiptap）
    - AI 辅助功能（头脑风暴、文本润色、内容续写）
    - 实时协作功能（基于 Yjs）
    - 文档模板管理

2. **实现与现有系统的无缝集成**

    - 菜单与路由集成
    - 用户认证与权限集成
    - 样式与资源集成
    - 数据存储集成

3. **确保系统稳定性与性能**

    - 功能测试与集成测试
    - 兼容性测试
    - 性能优化
    - 错误处理与日志

4. **为后续功能扩展奠定基础**
    - 模块化的代码结构
    - 清晰的依赖管理
    - 完善的文档
    - 可扩展的架构

通过以上实施步骤，我们将成功将 DocFlow 的核心功能移植到 business_yapi 项目中，为用户提供更加现代化、高效的文档编辑与协作
体验。
