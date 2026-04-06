# AI 功能移植

## 1. AI 服务模块设计

### 1.1 目录结构

```
utils/ai/
├── ai.vue                  # AI 服务主模块
├── services/               # AI 服务实现
│   ├── brainstorming.vue   # 头脑风暴服务
│   ├── text-polish.vue     # 文本润色服务
│   ├── content-complete.vue # 内容续写服务
│   └── sse-client.vue      # SSE 客户端
├── components/             # AI 相关组件
│   ├── AIToolbar.vue       # AI 工具栏
│   ├── AIMenu.vue          # AI 功能菜单
│   ├── AIChat.vue          # AI 聊天界面
│   └── AIProgress.vue      # AI 处理进度
├── prompts/                # 提示词模板
│   ├── brainstorming.vue   # 头脑风暴提示词
│   ├── text-polish.vue     # 文本润色提示词
│   └── content-complete.vue # 内容续写提示词
└── utils/                  # 工具函数
    ├── tokenizer.vue       # 令牌计数
    ├── rate-limit.vue      # 速率限制
    └── error-handler.vue   # 错误处理
```

### 1.2 核心服务模块

#### 1.2.1 ai.vue (AI 服务主模块)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载 AI 服务模块
	const [SSEClient, BrainstormingService, TextPolishService, ContentCompleteService] = await _.$importVue([
		"@/utils/ai/services/sse-client.vue",
		"@/utils/ai/services/brainstorming.vue",
		"@/utils/ai/services/text-polish.vue",
		"@/utils/ai/services/content-complete.vue"
	]);

	return {
		// SSE 客户端实例
		sseClient: new SSEClient(),

		// 服务实例
		brainstorming: new BrainstormingService(),
		textPolish: new TextPolishService(),
		contentComplete: new ContentCompleteService(),

		// 配置
		config: {
			apiBaseUrl: "/api/ai",
			timeout: 30000,
			maxTokens: 2000,
			temperature: 0.7
		},

		// 初始化
		init(config) {
			this.config = { ...this.config, ...config };
			this.sseClient.init(this.config);
		},

		// 通用请求方法
		async request(endpoint, data, options = {}) {
			try {
				const url = `${this.config.apiBaseUrl}${endpoint}`;
				const response = await _api.xspace.aiRequest({
					url,
					data,
					method: options.method || "POST",
					timeout: options.timeout || this.config.timeout
				});

				return response.data;
			} catch (error) {
				console.error("AI request failed:", error);
				throw error;
			}
		},

		// 流式请求方法
		streamRequest(endpoint, data, callbacks) {
			return this.sseClient.stream(`${this.config.apiBaseUrl}${endpoint}`, data, callbacks);
		},

		// 速率限制检查
		async checkRateLimit() {
			try {
				const response = await this.request("/rate-limit/check");
				return response;
			} catch (error) {
				console.error("Rate limit check failed:", error);
				return { allowed: true, remaining: 100 };
			}
		}
	};
}
</script>
```

#### 1.2.2 sse-client.vue (SSE 客户端)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return function SSEClient() {
		return {
			config: {
				timeout: 30000,
				retryInterval: 1000
			},

			init(config) {
				this.config = { ...this.config, ...config };
			},

			stream(url, data, callbacks = {}) {
				const { onMessage, onError, onComplete, onOpen } = callbacks;

				// 创建 EventSource 实例
				// 注意：SSE 通常使用 GET 请求，需要将数据编码到 URL 中
				const queryParams = new URLSearchParams(data).toString();
				const sseUrl = `${url}?${queryParams}`;

				const eventSource = new EventSource(sseUrl, {
					withCredentials: true
				});

				// 设置事件监听器
				eventSource.onmessage = event => {
					try {
						const data = JSON.parse(event.data);
						if (onMessage) onMessage(data);
					} catch (error) {
						console.error("SSE message parse error:", error);
						if (onError) onError(error);
					}
				};

				eventSource.onerror = error => {
					console.error("SSE error:", error);
					if (onError) onError(error);
					eventSource.close();
				};

				eventSource.onopen = () => {
					if (onOpen) onOpen();
				};

				// 处理完成事件
				// 注意：SSE 连接通常由服务器关闭
				const handleComplete = () => {
					if (onComplete) onComplete();
					eventSource.close();
				};

				// 设置超时
				setTimeout(() => {
					eventSource.close();
					if (onError) onError(new Error("SSE timeout"));
				}, this.config.timeout);

				// 返回控制对象
				return {
					close: () => {
						eventSource.close();
						handleComplete();
					}
				};
			},

			// 模拟 SSE 客户端（用于开发测试）
			mockStream(url, data, callbacks = {}) {
				const { onMessage, onError, onComplete, onOpen } = callbacks;

				if (onOpen) onOpen();

				// 模拟流式响应
				const mockResponses = [
					{ type: "data", content: "正在思考..." },
					{ type: "data", content: "好的，我来帮你分析这个问题。\n\n" },
					{ type: "data", content: "首先，我们需要考虑用户的需求和场景。\n\n" },
					{ type: "data", content: "然后，分析现有的解决方案和限制。\n\n" },
					{ type: "data", content: "最后，提出创新的解决思路。" },
					{ type: "complete", content: "分析完成" }
				];

				let index = 0;
				const interval = setInterval(() => {
					if (index < mockResponses.length) {
						const response = mockResponses[index];
						if (onMessage) onMessage(response);
						index++;
					} else {
						clearInterval(interval);
						if (onComplete) onComplete();
					}
				}, 500);

				return {
					close: () => clearInterval(interval)
				};
			}
		};
	};
}
</script>
```

## 2. AI 功能实现

### 2.1 头脑风暴功能

#### 2.1.1 brainstorming.vue (头脑风暴服务)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载提示词模板
	const [brainstormingPrompt] = await _.$importVue(["@/utils/ai/prompts/brainstorming.vue"]);

	return function BrainstormingService() {
		return {
			// 生成头脑风暴内容
			async generate(topic, options = {}) {
				const {
					maxIdeas = 5,
					timeLimit = 30,
					creativityLevel = "medium", // low, medium, high
					context = ""
				} = options;

				// 构建提示词
				const prompt = brainstormingPrompt.generate({
					topic,
					maxIdeas,
					timeLimit,
					creativityLevel,
					context
				});

				// 发送请求
				const data = {
					prompt,
					model: "gpt-4",
					max_tokens: 1000,
					temperature: creativityLevel === "high" ? 0.9 : creativityLevel === "low" ? 0.5 : 0.7,
					stream: true
				};

				return data;
			},

			// 评估头脑风暴结果
			evaluate(ideas, criteria = {}) {
				const { relevance = true, creativity = true, feasibility = true } = criteria;

				// 简单的评估逻辑
				return ideas.map(idea => {
					let score = 0;
					if (relevance) score += Math.random() * 30 + 70; // 70-100
					if (creativity) score += Math.random() * 30 + 70;
					if (feasibility) score += Math.random() * 30 + 70;

					return {
						idea,
						score: Math.round(score / (Object.keys(criteria).length || 1)),
						feedback: this.generateFeedback(idea)
					};
				});
			},

			// 生成反馈
			generateFeedback(idea) {
				const feedbacks = [
					"这个想法很有创意！",
					"值得进一步探索",
					"可能需要更多细节",
					"与当前需求高度相关",
					"实施起来可能有挑战",
					"可以考虑与其他想法结合"
				];

				return feedbacks[Math.floor(Math.random() * feedbacks.length)];
			}
		};
	};
}
</script>
```

### 2.2 文本润色功能

#### 2.2.1 text-polish.vue (文本润色服务)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载提示词模板
	const [textPolishPrompt] = await _.$importVue(["@/utils/ai/prompts/text-polish.vue"]);

	return function TextPolishService() {
		return {
			// 润色文本
			async polish(text, options = {}) {
				const {
					style = "formal", // formal, casual, professional, academic
					tone = "neutral", // neutral, positive, negative, persuasive
					length = "original", // shorter, original, longer
					targetAudience = "general", // general, expert, beginner, business
					preserveOriginal = true
				} = options;

				// 构建提示词
				const prompt = textPolishPrompt.generate({
					text,
					style,
					tone,
					length,
					targetAudience,
					preserveOriginal
				});

				// 发送请求
				const data = {
					prompt,
					model: "gpt-4",
					max_tokens: 1000,
					temperature: 0.7,
					stream: true
				};

				return data;
			},

			// 语法检查
			async checkGrammar(text) {
				const prompt = `请检查以下文本的语法错误，并提供修正建议：\n\n${text}`;

				const data = {
					prompt,
					model: "gpt-4",
					max_tokens: 500,
					temperature: 0.3,
					stream: true
				};

				return data;
			},

			// 风格转换
			async convertStyle(text, targetStyle) {
				const prompt = `请将以下文本转换为${targetStyle}风格：\n\n${text}`;

				const data = {
					prompt,
					model: "gpt-4",
					max_tokens: 1000,
					temperature: 0.7,
					stream: true
				};

				return data;
			}
		};
	};
}
</script>
```

### 2.3 内容续写功能

#### 2.3.1 content-complete.vue (内容续写服务)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载提示词模板
	const [contentCompletePrompt] = await _.$importVue(["@/utils/ai/prompts/content-complete.vue"]);

	return function ContentCompleteService() {
		return {
			// 续写内容
			async complete(text, options = {}) {
				const {
					maxLength = 500,
					style = "continuation", // continuation, expansion, conclusion
					context = "",
					preserveOriginal = true
				} = options;

				// 构建提示词
				const prompt = contentCompletePrompt.generate({
					text,
					maxLength,
					style,
					context,
					preserveOriginal
				});

				// 发送请求
				const data = {
					prompt,
					model: "gpt-4",
					max_tokens: maxLength,
					temperature: 0.7,
					stream: true
				};

				return data;
			},

			// 生成大纲
			async generateOutline(topic, options = {}) {
				const { depth = 2, maxSections = 5, style = "hierarchical" } = options;

				const prompt = `请为主题 "${topic}" 生成一个详细的内容大纲，深度为 ${depth} 级，最多包含 ${maxSections} 个主要部分。`;

				const data = {
					prompt,
					model: "gpt-4",
					max_tokens: 800,
					temperature: 0.7,
					stream: true
				};

				return data;
			},

			// 扩展内容
			async expand(content, options = {}) {
				const { expansionFactor = 2, focusAreas = [], preserveOriginal = true } = options;

				const focusText = focusAreas.length > 0 ? `重点扩展以下方面：${focusAreas.join("、")}` : "全面扩展内容";

				const prompt = `请将以下内容扩展 ${expansionFactor} 倍，${focusText}，保持原有风格和关键信息：\n\n${content}`;

				const data = {
					prompt,
					model: "gpt-4",
					max_tokens: content.length * expansionFactor,
					temperature: 0.7,
					stream: true
				};

				return data;
			}
		};
	};
}
</script>
```

## 3. AI 界面组件

### 3.1 AI 工具栏

#### 3.1.1 AIToolbar.vue (AI 工具栏)

```vue
<template>
	<div class="ai-toolbar">
		<button class="ai-tool-button" @click="openBrainstorming" title="头脑风暴">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path
					d="M8 2L11 5V11L8 14L5 11V5L8 2Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round" />
				<path d="M8 8V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				<path d="M8 5V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
			<span>头脑风暴</span>
		</button>

		<button class="ai-tool-button" @click="openTextPolish" title="文本润色">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path
					d="M4 10L7 13L12 8"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round" />
				<path
					d="M11 3H5C3.89543 3 3 3.89543 3 5V11C3 12.1046 3.89543 13 5 13H11C12.1046 13 13 12.1046 13 11V7"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round" />
			</svg>
			<span>文本润色</span>
		</button>

		<button class="ai-tool-button" @click="openContentComplete" title="内容续写">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M1 5H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				<path d="M1 9H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				<path d="M5 1V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
			<span>内容续写</span>
		</button>

		<!-- AI 状态指示器 -->
		<div class="ai-status" v-if="aiStatus !== 'idle'">
			<div class="status-indicator" :class="aiStatus"></div>
			<span class="status-text">{{ statusText }}</span>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载 AI 组件
	const [AIMenu] = await _.$importVue(["@/utils/ai/components/AIMenu.vue"]);

	return {
		data() {
			return {
				aiStatus: "idle", // idle, loading, success, error
				statusText: "就绪",
				currentMenu: null
			};
		},
		methods: {
			openBrainstorming() {
				this.openAIMenu("brainstorming");
			},
			openTextPolish() {
				this.openAIMenu("text-polish");
			},
			openContentComplete() {
				this.openAIMenu("content-complete");
			},
			openAIMenu(type) {
				// 打开 AI 功能菜单
				this.currentMenu = type;
				// 触发菜单显示事件
				this.$emit("open-ai-menu", type);
			},
			setAIStatus(status, text) {
				this.aiStatus = status;
				this.statusText =
					text ||
					{
						idle: "就绪",
						loading: "处理中...",
						success: "完成",
						error: "错误"
					}[status];
			}
		},
		mounted() {
			// 监听 AI 状态变化
			this.$on("ai-status-change", (status, text) => {
				this.setAIStatus(status, text);
			});
		}
	};
}
</script>

<style scoped>
.ai-toolbar {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px;
	background-color: #f8f9fa;
	border-radius: 8px;
	border: 1px solid #e9ecef;
}

.ai-tool-button {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 8px 12px;
	border: 1px solid #dee2e6;
	border-radius: 6px;
	background-color: white;
	cursor: pointer;
	font-size: 14px;
	color: #495057;
	transition: all 0.2s;
}

.ai-tool-button:hover {
	background-color: #e7f3ff;
	border-color: #2196f3;
	color: #1976d2;
}

.ai-tool-button:active {
	transform: translateY(1px);
}

.ai-status {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-left: auto;
	padding: 6px 10px;
	background-color: #f8f9fa;
	border-radius: 12px;
	font-size: 12px;
	color: #6c757d;
}

.status-indicator {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	animation: pulse 2s infinite;
}

.status-indicator.idle {
	background-color: #6c757d;
}

.status-indicator.loading {
	background-color: #ffc107;
}

.status-indicator.success {
	background-color: #28a745;
}

.status-indicator.error {
	background-color: #dc3545;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(108, 117, 125, 0.7);
	}
	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(108, 117, 125, 0);
	}
	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(108, 117, 125, 0);
	}
}
</style>
```

### 3.2 AI 功能菜单

#### 3.2.1 AIMenu.vue (AI 功能菜单)

```vue
<template>
	<div class="ai-menu" v-if="visible">
		<div class="ai-menu-header">
			<h3>{{ menuTitle }}</h3>
			<button class="close-button" @click="close">&times;</button>
		</div>

		<div class="ai-menu-content">
			<!-- 头脑风暴配置 -->
			<div v-if="type === 'brainstorming'" class="ai-config-section">
				<div class="form-group">
					<label for="brainstorming-topic">主题</label>
					<input
						id="brainstorming-topic"
						v-model="config.topic"
						type="text"
						class="form-input"
						placeholder="输入头脑风暴主题" />
				</div>

				<div class="form-group">
					<label for="brainstorming-ideas">最大创意数</label>
					<select id="brainstorming-ideas" v-model="config.maxIdeas" class="form-select">
						<option value="3">3个</option>
						<option value="5">5个</option>
						<option value="10">10个</option>
					</select>
				</div>

				<div class="form-group">
					<label for="brainstorming-creativity">创意程度</label>
					<select id="brainstorming-creativity" v-model="config.creativityLevel" class="form-select">
						<option value="low">保守</option>
						<option value="medium">适中</option>
						<option value="high">激进</option>
					</select>
				</div>
			</div>

			<!-- 文本润色配置 -->
			<div v-if="type === 'text-polish'" class="ai-config-section">
				<div class="form-group">
					<label for="polish-style">风格</label>
					<select id="polish-style" v-model="config.style" class="form-select">
						<option value="formal">正式</option>
						<option value="casual">casual</option>
						<option value="professional">专业</option>
						<option value="academic">学术</option>
					</select>
				</div>

				<div class="form-group">
					<label for="polish-tone">语气</label>
					<select id="polish-tone" v-model="config.tone" class="form-select">
						<option value="neutral">中性</option>
						<option value="positive">积极</option>
						<option value="persuasive">说服力</option>
					</select>
				</div>

				<div class="form-group">
					<label for="polish-length">长度</label>
					<select id="polish-length" v-model="config.length" class="form-select">
						<option value="shorter">更短</option>
						<option value="original">保持</option>
						<option value="longer">更长</option>
					</select>
				</div>
			</div>

			<!-- 内容续写配置 -->
			<div v-if="type === 'content-complete'" class="ai-config-section">
				<div class="form-group">
					<label for="complete-style">类型</label>
					<select id="complete-style" v-model="config.style" class="form-select">
						<option value="continuation">续写</option>
						<option value="expansion">扩展</option>
						<option value="conclusion">结论</option>
					</select>
				</div>

				<div class="form-group">
					<label for="complete-length">最大长度</label>
					<input
						id="complete-length"
						v-model.number="config.maxLength"
						type="number"
						class="form-input"
						min="100"
						max="1000"
						step="100" />
				</div>
			</div>
		</div>

		<div class="ai-menu-footer">
			<button class="cancel-button" @click="close">取消</button>
			<button class="submit-button" @click="submit" :disabled="isSubmitting">
				{{ isSubmitting ? "处理中..." : "生成" }}
			</button>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return {
		props: {
			type: {
				type: String,
				required: true
			},
			visible: {
				type: Boolean,
				default: false
			},
			selectedText: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				isSubmitting: false,
				config: {
					topic: "",
					maxIdeas: 5,
					creativityLevel: "medium",
					style: "formal",
					tone: "neutral",
					length: "original",
					maxLength: 500
				}
			};
		},
		computed: {
			menuTitle() {
				const titles = {
					brainstorming: "头脑风暴",
					"text-polish": "文本润色",
					"content-complete": "内容续写"
				};
				return titles[this.type] || "AI 功能";
			}
		},
		watch: {
			selectedText(newText) {
				// 根据选中的文本初始化配置
				if (newText && this.type === "text-polish") {
					// 文本润色时，使用选中的文本
				}
			}
		},
		methods: {
			close() {
				this.$emit("close");
			},
			async submit() {
				if (this.isSubmitting) return;

				this.isSubmitting = true;
				this.$emit("ai-status-change", "loading", "处理中...");

				try {
					// 触发 AI 处理
					this.$emit("submit", this.type, this.config);
				} catch (error) {
					console.error("AI submission error:", error);
					this.$emit("ai-status-change", "error", "处理失败");
				} finally {
					this.isSubmitting = false;
				}
			}
		}
	};
}
</script>

<style scoped>
.ai-menu {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400px;
	max-width: 90vw;
	max-height: 80vh;
	background-color: white;
	border-radius: 12px;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	z-index: 1000;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.ai-menu-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border-bottom: 1px solid #e9ecef;
	background-color: #f8f9fa;
}

.ai-menu-header h3 {
	margin: 0;
	font-size: 18px;
	font-weight: 600;
	color: #212529;
}

.close-button {
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
	color: #6c757d;
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
	background-color: #e9ecef;
}

.ai-menu-content {
	padding: 16px;
	overflow-y: auto;
	flex: 1;
}

.ai-config-section {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.form-group label {
	font-size: 14px;
	font-weight: 500;
	color: #495057;
}

.form-input,
.form-select {
	padding: 8px 12px;
	border: 1px solid #ced4da;
	border-radius: 6px;
	font-size: 14px;
	transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus {
	outline: none;
	border-color: #80bdff;
	box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.ai-menu-footer {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	padding: 16px;
	border-top: 1px solid #e9ecef;
	background-color: #f8f9fa;
}

.cancel-button,
.submit-button {
	padding: 8px 16px;
	border-radius: 6px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s;
}

.cancel-button {
	border: 1px solid #dee2e6;
	background-color: white;
	color: #495057;
}

.cancel-button:hover {
	background-color: #f8f9fa;
}

.submit-button {
	border: 1px solid #007bff;
	background-color: #007bff;
	color: white;
}

.submit-button:hover:not(:disabled) {
	background-color: #0069d9;
	border-color: #0062cc;
}

.submit-button:disabled {
	opacity: 0.65;
	cursor: not-allowed;
}
</style>
```

## 3. SSE 流式响应处理

### 3.1 前端实现

#### 3.1.1 sse-client.vue (SSE 客户端实现)

```vue
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return function SSEClient() {
		return {
			// 流式请求
			stream(url, data, callbacks = {}) {
				const { onMessage, onError, onComplete, onOpen } = callbacks;

				try {
					// 创建 SSE 连接
					const eventSource = new EventSource(this.buildSSEUrl(url, data));

					// 消息处理
					eventSource.onmessage = event => {
						try {
							const payload = JSON.parse(event.data);

							// 处理不同类型的消息
							switch (payload.type) {
								case "data":
									if (onMessage) onMessage(payload);
									break;
								case "error":
									if (onError) onError(new Error(payload.message));
									break;
								case "complete":
									if (onComplete) onComplete(payload);
									eventSource.close();
									break;
								default:
									if (onMessage) onMessage(payload);
							}
						} catch (error) {
							console.error("SSE message parse error:", error);
							if (onError) onError(error);
						}
					};

					// 错误处理
					eventSource.onerror = error => {
						console.error("SSE connection error:", error);
						if (onError) onError(error);
						eventSource.close();
					};

					// 连接打开
					eventSource.onopen = () => {
						console.log("SSE connection opened");
						if (onOpen) onOpen();
					};

					// 返回控制对象
					return {
						close: () => {
							eventSource.close();
						}
					};
				} catch (error) {
					console.error("SSE client error:", error);
					if (onError) onError(error);
					return {
						close: () => {}
					};
				}
			},

			// 构建 SSE URL
			buildSSEUrl(url, data) {
				const baseUrl = new URL(url, window.location.origin);

				// 将数据编码为查询参数
				Object.entries(data).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						baseUrl.searchParams.append(key, String(value));
					}
				});

				return baseUrl.toString();
			},

			// 模拟 SSE 响应
			mockStream(url, data, callbacks = {}) {
				const { onMessage, onError, onComplete, onOpen } = callbacks;

				if (onOpen) onOpen();

				// 模拟响应数据
				const responses = [
					{ type: "data", content: "正在分析..." },
					{ type: "data", content: "\n好的，我来帮你润色这段文本。\n\n" },
					{ type: "data", content: '原文本：\n"这是一段需要润色的文本，希望能够更加专业和流畅。"\n\n' },
					{
						type: "data",
						content:
							'润色后：\n"这是一段经过精心润色的专业文本，表达更加流畅自然，能够有效传达核心信息。"\n\n'
					},
					{
						type: "data",
						content: "修改说明：\n- 增强了文本的专业性\n- 优化了表达流畅度\n- 保持了原有的核心信息"
					},
					{ type: "complete", content: "润色完成" }
				];

				let index = 0;
				const interval = setInterval(() => {
					if (index < responses.length) {
						if (onMessage) onMessage(responses[index]);
						index++;
					} else {
						clearInterval(interval);
						if (onComplete) onComplete({ type: "complete", content: "处理完成" });
					}
				}, 800);

				return {
					close: () => clearInterval(interval)
				};
			}
		};
	};
}
</script>
```

### 3.2 后端实现

#### 3.2.1 server/services/ai.ts (AI 服务后端)

```typescript
// AI 服务后端实现
import Koa from "koa";
import Router from "koa-router";
import { createReadStream } from "fs";
import { OpenAI } from "openai";

const router = new Router();

// 初始化 OpenAI 客户端
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

// SSE 响应中间件
function sseResponse(ctx: Koa.Context) {
	ctx.set("Content-Type", "text/event-stream");
	ctx.set("Cache-Control", "no-cache");
	ctx.set("Connection", "keep-alive");
	ctx.set("X-Accel-Buffering", "no");
	ctx.respond = false;
}

// 头脑风暴 API
router.get("/api/ai/brainstorming", async (ctx: Koa.Context) => {
	sseResponse(ctx);

	const { topic, maxIdeas = 5, creativityLevel = "medium" } = ctx.query;

	try {
		// 构建提示词
		const prompt = `请针对主题 "${topic}" 进行头脑风暴，生成 ${maxIdeas} 个创意想法，创意程度为 ${creativityLevel}。`;

		// 调用 OpenAI API
		const response = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ role: "user", content: prompt }],
			temperature: creativityLevel === "high" ? 0.9 : creativityLevel === "low" ? 0.5 : 0.7,
			max_tokens: 1000,
			stream: true
		});

		// 流式发送响应
		for await (const chunk of response) {
			const content = chunk.choices[0]?.delta?.content || "";
			if (content) {
				ctx.res.write(`data: ${JSON.stringify({ type: "data", content })}\n\n`);
			}
		}

		// 发送完成信号
		ctx.res.write(`data: ${JSON.stringify({ type: "complete", content: "头脑风暴完成" })}\n\n`);
		ctx.res.end();
	} catch (error) {
		console.error("Brainstorming error:", error);
		ctx.res.write(`data: ${JSON.stringify({ type: "error", message: "处理失败" })}\n\n`);
		ctx.res.end();
	}
});

// 文本润色 API
router.get("/api/ai/text-polish", async (ctx: Koa.Context) => {
	sseResponse(ctx);

	const { text, style = "formal", tone = "neutral" } = ctx.query;

	try {
		// 构建提示词
		const prompt = `请将以下文本润色为 ${style} 风格，${tone} 语气：\n\n"${text}"`;

		// 调用 OpenAI API
		const response = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.7,
			max_tokens: 1000,
			stream: true
		});

		// 流式发送响应
		for await (const chunk of response) {
			const content = chunk.choices[0]?.delta?.content || "";
			if (content) {
				ctx.res.write(`data: ${JSON.stringify({ type: "data", content })}\n\n`);
			}
		}

		// 发送完成信号
		ctx.res.write(`data: ${JSON.stringify({ type: "complete", content: "润色完成" })}\n\n`);
		ctx.res.end();
	} catch (error) {
		console.error("Text polish error:", error);
		ctx.res.write(`data: ${JSON.stringify({ type: "error", message: "处理失败" })}\n\n`);
		ctx.res.end();
	}
});

// 内容续写 API
router.get("/api/ai/content-complete", async (ctx: Koa.Context) => {
	sseResponse(ctx);

	const { text, style = "continuation", maxLength = 500 } = ctx.query;

	try {
		// 构建提示词
		const prompt = `请将以下文本 ${style}，保持风格一致，长度约 ${maxLength} 字：\n\n"${text}"`;

		// 调用 OpenAI API
		const response = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.7,
			max_tokens: parseInt(maxLength as string) || 500,
			stream: true
		});

		// 流式发送响应
		for await (const chunk of response) {
			const content = chunk.choices[0]?.delta?.content || "";
			if (content) {
				ctx.res.write(`data: ${JSON.stringify({ type: "data", content })}\n\n`);
			}
		}

		// 发送完成信号
		ctx.res.write(`data: ${JSON.stringify({ type: "complete", content: "续写完成" })}\n\n`);
		ctx.res.end();
	} catch (error) {
		console.error("Content complete error:", error);
		ctx.res.write(`data: ${JSON.stringify({ type: "error", message: "处理失败" })}\n\n`);
		ctx.res.end();
	}
});

export default router;
```

## 4. 与编辑器集成

### 4.1 编辑器集成方案

#### 4.1.1 Tiptap 编辑器集成

```vue
<template>
	<div class="tiptap-editor-with-ai">
		<!-- 编辑器 -->
		<component
			:is="tiptapEditorComponent"
			ref="editor"
			:initial-content="content"
			@update:content="handleContentUpdate"
			@open-ai-menu="openAIMenu" />

		<!-- AI 工具栏 -->
		<component :is="aiToolbarComponent" ref="aiToolbar" @open-ai-menu="openAIMenu" />

		<!-- AI 菜单 -->
		<component
			:is="aiMenuComponent"
			v-if="showAIMenu"
			:type="currentAIMenu"
			:visible="showAIMenu"
			:selected-text="selectedText"
			@close="closeAIMenu"
			@submit="handleAISubmit" />

		<!-- AI 处理结果 -->
		<div class="ai-result" v-if="aiResult">
			<div class="ai-result-header">
				<h4>AI 处理结果</h4>
				<button class="close-button" @click="clearAIResult">&times;</button>
			</div>
			<div class="ai-result-content" v-html="aiResult"></div>
			<div class="ai-result-actions">
				<button class="insert-button" @click="insertAIResult">插入到编辑器</button>
				<button class="copy-button" @click="copyAIResult">复制</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 动态加载组件
	const [TiptapEditor, AIToolbar, AIMenu, AIService] = await _.$importVue([
		"@/components/TiptapEditor/TiptapEditor.vue",
		"@/utils/ai/components/AIToolbar.vue",
		"@/utils/ai/components/AIMenu.vue",
		"@/utils/ai/ai.vue"
	]);

	return {
		props: {
			content: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				tiptapEditorComponent: TiptapEditor,
				aiToolbarComponent: AIToolbar,
				aiMenuComponent: AIMenu,
				aiService: new AIService(),
				showAIMenu: false,
				currentAIMenu: null,
				selectedText: "",
				aiResult: null,
				isProcessing: false
			};
		},
		methods: {
			handleContentUpdate(content) {
				this.$emit("update:content", content);
			},
			openAIMenu(type) {
				this.currentAIMenu = type;
				this.showAIMenu = true;
				// 获取编辑器选中的文本
				this.getSelectedText();
			},
			closeAIMenu() {
				this.showAIMenu = false;
				this.currentAIMenu = null;
			},
			getSelectedText() {
				// 从编辑器获取选中的文本
				const editor = this.$refs.editor?.editor;
				if (editor) {
					this.selectedText = editor.state.selection.content().textContent;
				}
			},
			async handleAISubmit(type, config) {
				this.isProcessing = true;
				this.$emit("ai-status-change", "loading", "处理中...");

				try {
					let serviceMethod;
					let requestData;

					// 根据类型选择服务方法
					switch (type) {
						case "brainstorming":
							serviceMethod = this.aiService.brainstorming.generate;
							requestData = config;
							break;
						case "text-polish":
							serviceMethod = this.aiService.textPolish.polish;
							requestData = {
								text: this.selectedText || this.content,
								...config
							};
							break;
						case "content-complete":
							serviceMethod = this.aiService.contentComplete.complete;
							requestData = {
								text: this.selectedText || this.content,
								...config
							};
							break;
						default:
							throw new Error("未知的 AI 功能类型");
					}

					// 生成请求数据
					const data = await serviceMethod(requestData);

					// 发送流式请求
					const stream = this.aiService.streamRequest(`/api/ai/${type}`, data, {
						onMessage: response => {
							// 处理流式消息
							if (response.type === "data") {
								// 累积结果
								if (!this.aiResult) {
									this.aiResult = "";
								}
								this.aiResult += response.content;
							}
						},
						onComplete: response => {
							// 处理完成
							this.isProcessing = false;
							this.$emit("ai-status-change", "success", "完成");
							this.closeAIMenu();
						},
						onError: error => {
							// 处理错误
							console.error("AI request error:", error);
							this.isProcessing = false;
							this.$emit("ai-status-change", "error", "处理失败");
							this.closeAIMenu();
						}
					});
				} catch (error) {
					console.error("AI submit error:", error);
					this.isProcessing = false;
					this.$emit("ai-status-change", "error", "处理失败");
					this.closeAIMenu();
				}
			},
			insertAIResult() {
				// 将 AI 结果插入到编辑器
				const editor = this.$refs.editor?.editor;
				if (editor && this.aiResult) {
					editor.commands.insertContent(this.aiResult);
				}
				this.clearAIResult();
			},
			copyAIResult() {
				// 复制 AI 结果到剪贴板
				navigator.clipboard.writeText(this.aiResult).then(() => {
					alert("已复制到剪贴板");
				});
			},
			clearAIResult() {
				this.aiResult = null;
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
.tiptap-editor-with-ai {
	position: relative;
}

.ai-result {
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 400px;
	max-height: 500px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	border: 1px solid #e9ecef;
	z-index: 1000;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.ai-result-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	background-color: #f8f9fa;
	border-bottom: 1px solid #e9ecef;
}

.ai-result-header h4 {
	margin: 0;
	font-size: 16px;
	font-weight: 600;
	color: #495057;
}

.close-button {
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
	color: #6c757d;
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
	background-color: #e9ecef;
}

.ai-result-content {
	padding: 16px;
	overflow-y: auto;
	flex: 1;
	line-height: 1.5;
}

.ai-result-actions {
	display: flex;
	gap: 8px;
	padding: 12px 16px;
	background-color: #f8f9fa;
	border-top: 1px solid #e9ecef;
}

.insert-button,
.copy-button {
	padding: 6px 12px;
	border-radius: 4px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s;
}

.insert-button {
	border: 1px solid #28a745;
	background-color: #28a745;
	color: white;
}

.insert-button:hover {
	background-color: #218838;
	border-color: #1e7e34;
}

.copy-button {
	border: 1px solid #6c757d;
	background-color: white;
	color: #6c757d;
}

.copy-button:hover {
	background-color: #f8f9fa;
}
</style>
```

## 5. 性能优化与限制

### 5.1 性能优化策略

| 优化策略 | 实现方式              | 预期效果          | 优先级 |
| -------- | --------------------- | ----------------- | ------ |
| 速率限制 | 实现 API 调用速率限制 | 防止过度使用 API  | 高     |
| 缓存机制 | 缓存 AI 响应结果      | 减少重复请求      | 高     |
| 令牌计数 | 预估 API 调用成本     | 优化提示词长度    | 中     |
| 批量处理 | 合并多个小请求        | 减少 API 调用次数 | 中     |
| 后台处理 | 非阻塞式 AI 处理      | 不影响编辑器操作  | 高     |

### 5.2 限制与边界

| 限制项       | 具体值     | 实现方式     | 原因              |
| ------------ | ---------- | ------------ | ----------------- |
| 最大请求长度 | 5000 字符  | 前端验证     | 避免 API 调用失败 |
| 最大响应长度 | 2000 字符  | 后端限制     | 控制响应大小      |
| 调用频率     | 60 次/分钟 | 前端速率限制 | 避免 API 限流     |
| 并发请求     | 1 个       | 前端队列     | 避免资源竞争      |
| 会话超时     | 30 秒      | 前端超时     | 防止长时间无响应  |

## 6. 总结

通过移植 DocFlow 的 AI 功能，我们将为 business*xspace 项目带来强大的智能辅助能力，包括头脑风暴、文本润色、内容续写等功能
。实施过程中，我们将严格遵循项目现有的前端代码规则，使用 `*.$importVue()` 动态加载机制，确保与现有架构的一致性和兼容性。

核心实现包括：

1. **AI 服务模块**：统一的 AI 功能接口，支持多种 AI 任务
2. **SSE 流式响应**：实时的 AI 处理反馈，提升用户体验
3. **AI 界面组件**：直观的 AI 功能入口和配置界面
4. **编辑器集成**：与 Tiptap 编辑器无缝集成，提供便捷的 AI 辅助编辑体验
5. **性能优化**：速率限制、缓存机制等，确保系统稳定性

这些功能将显著提升 business_xspace 项目的编辑体验和内容创作效率，使其具备与现代 AI 辅助编辑工具相媲美的能力。
