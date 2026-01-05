<template>
	<div id="ProjectHoppscotch" class="height100 width100 flex flex-col">
		<!-- 顶部工具栏 -->
		<div class="toolbar flex items-center p-3 bg-white border-b shadow-sm">
			<!-- 方法选择 -->
			<select
				v-model="selectedMethod"
				class="mr-2 p-2 border rounded bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
				<option value="PATCH">PATCH</option>
				<option value="DELETE">DELETE</option>
				<option value="HEAD">HEAD</option>
				<option value="OPTIONS">OPTIONS</option>
				<option value="CONNECT">CONNECT</option>
				<option value="TRACE">TRACE</option>
			</select>

			<!-- URL输入 -->
			<input
				v-model="url"
				placeholder="输入API URL"
				class="flex1 mr-2 p-2 border rounded bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />

			<!-- Send按钮 -->
			<button
				@click="sendRequest"
				class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 outline-none flex items-center">
				<template v-if="loading">
					<div
						class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
					发送中...
				</template>
				<template v-else> 发送请求 </template>
			</button>

			<!-- Save按钮 -->
			<button
				class="p-2 ml-2 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 outline-none">
				保存
			</button>
		</div>

		<!-- 主体内容区域 -->
		<div class="flex1 flex overflow-hidden">
			<!-- 左侧请求配置 -->
			<div class="flex1 flex flex-col overflow-hidden bg-white border-r">
				<!-- 标签页导航 -->
				<div class="tabs flex border-b bg-gray-50">
					<button
						v-for="tab in tabs"
						:key="tab.id"
						:class="[
							'tab-button px-4 py-2 cursor-pointer text-sm font-medium',
							activeTab === tab.id
								? 'border-b-2 border-blue-500 text-blue-600 bg-white'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
						]"
						@click="activeTab = tab.id">
						{{ tab.name }}
					</button>
				</div>

				<!-- 标签页内容 -->
				<div class="tab-content flex1 overflow-auto p-4">
					<!-- Parameters标签页 -->
					<div v-if="activeTab === 'parameters'" class="space-y-4">
						<div class="flex items-center justify-between">
							<h3 class="text-sm font-semibold text-gray-700">查询参数</h3>
							<button
								@click="addParameter"
								class="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
								添加参数
							</button>
						</div>
						<div
							v-for="(param, index) in parameters"
							:key="index"
							class="flex space-x-2">
							<input
								v-model="param.key"
								placeholder="键"
								class="flex1 p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							<input
								v-model="param.value"
								placeholder="值"
								class="flex1 p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							<button
								@click="removeParameter(index)"
								class="p-2 text-red-500 hover:bg-red-50 rounded">
								删除
							</button>
						</div>
					</div>

					<!-- Body标签页 -->
					<div v-if="activeTab === 'body'" class="space-y-4">
						<!-- Content Type选择器 -->
						<div class="flex items-center space-x-2">
							<label class="text-sm font-medium text-gray-700">Content Type:</label>
							<select
								v-model="contentType"
								class="p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
								<option value="application/json">application/json</option>
								<option value="application/x-www-form-urlencoded"
									>application/x-www-form-urlencoded</option
								>
								<option value="multipart/form-data">multipart/form-data</option>
								<option value="text/plain">text/plain</option>
							</select>
						</div>

						<!-- 请求体工具栏 -->
						<div class="flex items-center space-x-2 pb-2 border-b">
							<button
								@click="formatRequestBody"
								class="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded">
								格式化
							</button>
							<button
								@click="clearRequestBody"
								class="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded">
								清空
							</button>
						</div>

						<!-- 请求体输入 -->
						<textarea
							v-model="requestBody"
							placeholder="输入请求体"
							class="width100 height-[calc(100%-100px)] border rounded p-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"></textarea>
					</div>

					<!-- Headers标签页 -->
					<div v-if="activeTab === 'headers'" class="space-y-4">
						<div class="flex items-center justify-between">
							<h3 class="text-sm font-semibold text-gray-700">请求头</h3>
							<button
								@click="addHeader"
								class="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
								添加请求头
							</button>
						</div>
						<div v-for="(header, index) in headers" :key="index" class="flex space-x-2">
							<input
								v-model="header.key"
								placeholder="键"
								class="flex1 p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							<input
								v-model="header.value"
								placeholder="值"
								class="flex1 p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							<button
								@click="removeHeader(index)"
								class="p-2 text-red-500 hover:bg-red-50 rounded">
								删除
							</button>
						</div>
					</div>

					<!-- Authorization标签页 -->
					<div v-if="activeTab === 'authorization'" class="space-y-4">
						<h3 class="text-sm font-semibold text-gray-700">授权</h3>
						<div class="space-y-3">
							<div class="flex items-center space-x-2">
								<label class="text-sm text-gray-600">类型:</label>
								<select
									v-model="authType"
									class="p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
									<option value="none">无</option>
									<option value="bearer">Bearer Token</option>
									<option value="basic">Basic Auth</option>
								</select>
							</div>

							<!-- Bearer Token -->
							<div v-if="authType === 'bearer'" class="space-y-2">
								<input
									v-model="authToken"
									placeholder="Token"
									class="w-full p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							</div>

							<!-- Basic Auth -->
							<div v-if="authType === 'basic'" class="space-y-2">
								<input
									v-model="authUsername"
									placeholder="用户名"
									class="w-full p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
								<input
									v-model="authPassword"
									placeholder="密码"
									type="password"
									class="w-full p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							</div>
						</div>
					</div>

					<!-- Pre-request Script标签页 -->
					<div v-if="activeTab === 'pre-request'" class="space-y-4">
						<h3 class="text-sm font-semibold text-gray-700">请求前脚本</h3>
						<textarea
							v-model="preRequestScript"
							placeholder="输入请求前脚本"
							class="width100 height-[calc(100%-50px)] border rounded p-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"></textarea>
					</div>

					<!-- Post-request Script标签页 -->
					<div v-if="activeTab === 'post-request'" class="space-y-4">
						<h3 class="text-sm font-semibold text-gray-700">请求后脚本</h3>
						<textarea
							v-model="postRequestScript"
							placeholder="输入请求后脚本"
							class="width100 height-[calc(100%-50px)] border rounded p-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"></textarea>
					</div>

					<!-- Variables标签页 -->
					<div v-if="activeTab === 'variables'" class="space-y-4">
						<div class="flex items-center justify-between">
							<h3 class="text-sm font-semibold text-gray-700">变量</h3>
							<button
								@click="addVariable"
								class="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
								添加变量
							</button>
						</div>
						<div
							v-for="(variable, index) in variables"
							:key="index"
							class="flex space-x-2">
							<input
								v-model="variable.key"
								placeholder="键"
								class="flex1 p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							<input
								v-model="variable.value"
								placeholder="值"
								class="flex1 p-2 border rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
							<button
								@click="removeVariable(index)"
								class="p-2 text-red-500 hover:bg-red-50 rounded">
								删除
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- 右侧响应结果 -->
			<div class="w-1/2 flex flex-col overflow-hidden bg-white">
				<!-- 响应状态 -->
				<div class="p-3 border-b bg-gray-50 flex items-center justify-between">
					<h3 class="text-sm font-semibold text-gray-700 flex items-center">
						响应
						<span
							:class="[
								'ml-2 px-2 py-0.5 rounded text-xs font-medium',
								getStatusClass(responseStatus)
							]">
							{{ responseStatus }}
						</span>
					</h3>
					<span class="text-xs text-gray-500">{{ responseTime }}ms</span>
				</div>

				<!-- 响应内容标签 -->
				<div class="response-tabs flex border-b bg-gray-50">
					<button
						@click="activeResponseTab = 'body'"
						:class="[
							'tab-button px-4 py-2 cursor-pointer text-xs font-medium',
							activeResponseTab === 'body'
								? 'border-b-2 border-blue-500 text-blue-600 bg-white'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
						]">
						Body
					</button>
					<button
						@click="activeResponseTab = 'headers'"
						:class="[
							'tab-button px-4 py-2 cursor-pointer text-xs font-medium',
							activeResponseTab === 'headers'
								? 'border-b-2 border-blue-500 text-blue-600 bg-white'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
						]">
						Headers
					</button>
					<button
						@click="activeResponseTab = 'cookies'"
						:class="[
							'tab-button px-4 py-2 cursor-pointer text-xs font-medium',
							activeResponseTab === 'cookies'
								? 'border-b-2 border-blue-500 text-blue-600 bg-white'
								: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
						]">
						Cookies
					</button>
				</div>

				<!-- 响应内容 -->
				<div class="response-content flex1 overflow-auto p-4">
					<!-- 响应体 -->
					<div v-if="activeResponseTab === 'body'" class="space-y-2">
						<div class="flex justify-end">
							<button
								@click="copyResponse"
								class="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded">
								复制
							</button>
						</div>
						<pre
							class="width100 height100 bg-gray-50 p-3 rounded overflow-auto font-mono text-xs"
							>{{ formattedResponse }}</pre
						>
					</div>

					<!-- 响应头 -->
					<div v-if="activeResponseTab === 'headers'" class="space-y-2">
						<div class="grid grid-cols-2 gap-2 text-xs">
							<div
								v-for="(value, key) in responseHeaders"
								:key="key"
								class="font-mono p-2 bg-gray-50 rounded">
								<span class="font-semibold text-gray-700">{{ key }}:</span>
								{{ value }}
							</div>
						</div>
					</div>

					<!-- 响应Cookies -->
					<div v-if="activeResponseTab === 'cookies'" class="space-y-2">
						<div class="grid grid-cols-2 gap-2 text-xs">
							<div
								v-for="(value, key) in responseCookies"
								:key="key"
								class="font-mono p-2 bg-gray-50 rounded">
								<span class="font-semibold text-gray-700">{{ key }}:</span>
								{{ value }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {
				// 请求配置
				selectedMethod: "GET",
				url: "https://echo.hoppscotch.io",
				headers: [{ key: "Content-Type", value: "application/json" }],
				requestBody: "",
				parameters: [],
				contentType: "application/json",

				// 授权配置
				authType: "none",
				authToken: "",
				authUsername: "",
				authPassword: "",

				// 脚本配置
				preRequestScript: "",
				postRequestScript: "",

				// 变量配置
				variables: [],

				// 标签页配置
				tabs: [
					{ id: "parameters", name: "Parameters" },
					{ id: "body", name: "Body" },
					{ id: "headers", name: "Headers" },
					{ id: "authorization", name: "Authorization" },
					{ id: "pre-request", name: "Pre-request Script" },
					{ id: "post-request", name: "Post-request Script" },
					{ id: "variables", name: "Variables" }
				],
				activeTab: "body",

				// 响应结果
				responseStatus: "",
				responseTime: 0,
				responseHeaders: {},
				responseBody: "",
				responseCookies: {},
				activeResponseTab: "body",
				loading: false
			};
		},
		computed: {
			projectId() {
				return this.APP.cptProjectId;
			},
			formattedResponse() {
				try {
					return JSON.stringify(JSON.parse(this.responseBody), null, 2);
				} catch {
					return this.responseBody;
				}
			}
		},
		mounted() {
			// 初始化时可以设置默认URL，例如当前项目的基础URL
			this.initDefaultUrl();
		},
		methods: {
			initDefaultUrl() {
				// 可以从项目配置中获取默认URL
				// 这里暂时使用Hoppscotch示例URL
				this.url = "https://echo.hoppscotch.io";
			},

			// 获取状态码样式
			getStatusClass(status) {
				if (!status) return "bg-gray-100 text-gray-500";
				if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
				if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800";
				if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800";
				if (status >= 500) return "bg-red-100 text-red-800";
				return "bg-gray-100 text-gray-500";
			},

			// 添加请求头
			addHeader() {
				this.headers.push({ key: "", value: "" });
			},

			// 删除请求头
			removeHeader(index) {
				this.headers.splice(index, 1);
			},

			// 添加查询参数
			addParameter() {
				this.parameters.push({ key: "", value: "" });
			},

			// 删除查询参数
			removeParameter(index) {
				this.parameters.splice(index, 1);
			},

			// 添加变量
			addVariable() {
				this.variables.push({ key: "", value: "" });
			},

			// 删除变量
			removeVariable(index) {
				this.variables.splice(index, 1);
			},

			// 格式化请求体
			formatRequestBody() {
				try {
					this.requestBody = JSON.stringify(JSON.parse(this.requestBody), null, 2);
				} catch (e) {
					// 格式化失败，不做处理
				}
			},

			// 清空请求体
			clearRequestBody() {
				this.requestBody = "";
			},

			// 复制响应
			async copyResponse() {
				try {
					await navigator.clipboard.writeText(this.formattedResponse);
					// 可以添加复制成功提示
				} catch (e) {
					// 复制失败，不做处理
				}
			},

			// 构建完整URL（包含查询参数）
			buildFullUrl() {
				let fullUrl = this.url;
				const params = this.parameters.filter(p => p.key);
				if (params.length > 0) {
					const queryString = params
						.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
						.join("&");
					fullUrl += (fullUrl.includes("?") ? "&" : "?") + queryString;
				}
				return fullUrl;
			},

			// 构建完整请求头（包含授权信息）
			buildHeaders() {
				const headers = this.headers
					.filter(h => h.key)
					.reduce((acc, h) => {
						acc[h.key] = h.value;
						return acc;
					}, {});

				// 添加授权信息
				if (this.authType === "bearer" && this.authToken) {
					headers["Authorization"] = `Bearer ${this.authToken}`;
				} else if (this.authType === "basic" && this.authUsername && this.authPassword) {
					headers["Authorization"] =
						`Basic ${btoa(`${this.authUsername}:${this.authPassword}`)}`;
				}

				return headers;
			},

			// 发送请求
			async sendRequest() {
				if (!this.url) {
					alert("请输入API URL");
					return;
				}

				this.loading = true;
				const startTime = Date.now();

				try {
					// 构建请求配置
					const config = {
						method: this.selectedMethod,
						url: this.buildFullUrl(),
						headers: this.buildHeaders(),
						data: this.requestBody ? JSON.parse(this.requestBody) : undefined,
						validateStatus: () => true // 不拦截任何状态码
					};

					// 发送请求
					const response = await _api.$axios(config);

					// 更新响应结果
					this.responseStatus = response.status;
					this.responseTime = Date.now() - startTime;
					this.responseHeaders = response.headers;
					this.responseBody = JSON.stringify(response.data);
					this.responseCookies = this.parseCookies(response.headers["set-cookie"] || []);
				} catch (error) {
					// 处理错误响应
					this.responseStatus = error.response?.status || "Error";
					this.responseTime = Date.now() - startTime;
					this.responseHeaders = error.response?.headers || {};
					this.responseBody = JSON.stringify(error.response?.data || error.message);
					this.responseCookies = {};
				} finally {
					this.loading = false;
				}
			},

			// 解析Cookies
			parseCookies(cookieHeaders) {
				const cookies = {};
				if (Array.isArray(cookieHeaders)) {
					cookieHeaders.forEach(header => {
						const parts = header.split(";");
						const cookiePart = parts[0].trim();
						const [name, value] = cookiePart.split("=");
						if (name && value) {
							cookies[name] = value;
						}
					});
				}
				return cookies;
			}
		}
	});
}
</script>

<style lang="less">
/* 全局CSS变量定义 */
:root {
	--primary-color: #5046e5;
	--primary-hover: #4338ca;
	--primary-light: #6366f1;
	--success-color: #10b981;
	--warning-color: #f59e0b;
	--error-color: #ef4444;
	--info-color: #3b82f6;
	--bg-color: #f8fafc;
	--card-bg: #ffffff;
	--border-color: #e2e8f0;
	--text-primary: #1e293b;
	--text-secondary: #64748b;
	--text-muted: #94a3b8;
}

/* 基础布局 */
#ProjectHoppscotch {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: var(--bg-color);
	font-family:
		-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 顶部工具栏 */
#ProjectHoppscotch .toolbar {
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	background-color: var(--card-bg);
	border-bottom: 1px solid var(--border-color);
	box-shadow:
		0 1px 3px 0 rgba(0, 0, 0, 0.1),
		0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* 方法选择器 */
#ProjectHoppscotch .toolbar select {
	padding: 0.5rem;
	border: 1px solid var(--border-color);
	border-radius: 0.375rem;
	background-color: var(--card-bg);
	color: var(--text-primary);
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	margin-right: 0.5rem;
}

#ProjectHoppscotch .toolbar select:hover {
	border-color: #cbd5e1;
	background-color: #f9fafb;
}

#ProjectHoppscotch .toolbar select:focus {
	outline: none;
	border-color: var(--primary-color);
	box-shadow: 0 0 0 3px rgba(80, 70, 229, 0.1);
}

/* URL输入框 */
#ProjectHoppscotch .toolbar input[type="text"] {
	flex: 1;
	padding: 0.5rem 0.75rem;
	border: 1px solid var(--border-color);
	border-radius: 0.375rem;
	background-color: var(--card-bg);
	color: var(--text-primary);
	font-size: 0.875rem;
	transition: all 0.2s ease;
	margin-right: 0.5rem;
}

#ProjectHoppscotch .toolbar input[type="text"]::placeholder {
	color: var(--text-muted);
}

#ProjectHoppscotch .toolbar input[type="text"]:hover {
	border-color: #cbd5e1;
}

#ProjectHoppscotch .toolbar input[type="text"]:focus {
	outline: none;
	border-color: var(--primary-color);
	box-shadow: 0 0 0 3px rgba(80, 70, 229, 0.1);
}

/* 按钮样式 */
#ProjectHoppscotch .toolbar button {
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 0.375rem;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
}

/* Send按钮 */
#ProjectHoppscotch .toolbar button.bg-blue-500 {
	background-color: var(--primary-color);
	color: white;
}

#ProjectHoppscotch .toolbar button.bg-blue-500:hover {
	background-color: var(--primary-hover);
	transform: translateY(-1px);
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

#ProjectHoppscotch .toolbar button.bg-blue-500:active {
	transform: translateY(0);
}

/* Save按钮 */
#ProjectHoppscotch .toolbar button.border-gray-300 {
	background-color: var(--card-bg);
	color: var(--text-primary);
	border: 1px solid var(--border-color);
	margin-left: 0.5rem;
}

#ProjectHoppscotch .toolbar button.border-gray-300:hover {
	background-color: #f9fafb;
	border-color: #cbd5e1;
	transform: translateY(-1px);
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

#ProjectHoppscotch .toolbar button.border-gray-300:active {
	transform: translateY(0);
}

/* 辅助按钮 */
#ProjectHoppscotch .toolbar button.text-xs {
	padding: 0.25rem 0.5rem;
	font-size: 0.75rem;
}

#ProjectHoppscotch .toolbar button.text-xs.bg-green-500 {
	background-color: var(--success-color);
	color: white;
}

#ProjectHoppscotch .toolbar button.text-xs.bg-green-500:hover {
	background-color: #059669;
}

#ProjectHoppscotch .toolbar button.text-xs.text-gray-600 {
	background-color: transparent;
	color: var(--text-secondary);
}

#ProjectHoppscotch .toolbar button.text-xs.text-gray-600:hover {
	background-color: #f1f5f9;
	color: var(--text-primary);
}

/* 删除按钮 */
#ProjectHoppscotch .toolbar button.text-red-500 {
	background-color: transparent;
	color: var(--error-color);
	padding: 0.5rem;
	border-radius: 0.25rem;
}

#ProjectHoppscotch .toolbar button.text-red-500:hover {
	background-color: #fee2e2;
}

/* 主体内容区域 */
#ProjectHoppscotch .flex1 {
	flex: 1;
}

#ProjectHoppscotch .flex-col {
	flex-direction: column;
}

#ProjectHoppscotch .overflow-hidden {
	overflow: hidden;
}

/* 标签页容器 */
#ProjectHoppscotch .tabs {
	display: flex;
	background-color: var(--bg-color);
	border-bottom: 1px solid var(--border-color);
}

#ProjectHoppscotch .tabs .tab-button {
	padding: 0.75rem 1rem;
	background-color: transparent;
	border: none;
	border-bottom: 2px solid transparent;
	color: var(--text-secondary);
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	margin-right: 0.5rem;
}

#ProjectHoppscotch .tabs .tab-button:hover {
	background-color: #f1f5f9;
	color: var(--text-primary);
}

#ProjectHoppscotch .tabs .tab-button.border-b-2 {
	border-bottom-color: var(--primary-color);
	color: var(--primary-color);
	background-color: var(--card-bg);
	box-shadow: inset 0 -1px 0 0 var(--border-color);
}

/* 标签页内容 */
#ProjectHoppscotch .tab-content {
	padding: 1rem;
	background-color: var(--card-bg);
	overflow: auto;
}

/* 内容区域标题 */
#ProjectHoppscotch .tab-content h3,
#ProjectHoppscotch .tab-content h4 {
	margin: 0 0 0.5rem 0;
	color: var(--text-primary);
	font-weight: 600;
}

#ProjectHoppscotch .tab-content .text-sm {
	font-size: 0.875rem;
}

#ProjectHoppscotch .tab-content .text-xs {
	font-size: 0.75rem;
}

#ProjectHoppscotch .tab-content .font-semibold {
	font-weight: 600;
}

#ProjectHoppscotch .tab-content .font-medium {
	font-weight: 500;
}

#ProjectHoppscotch .tab-content .text-gray-700 {
	color: var(--text-primary);
}

#ProjectHoppscotch .tab-content .text-gray-600 {
	color: var(--text-secondary);
}

/* 表单元素 */
#ProjectHoppscotch .tab-content input,
#ProjectHoppscotch .tab-content select,
#ProjectHoppscotch .tab-content textarea {
	border: 1px solid var(--border-color);
	border-radius: 0.375rem;
	background-color: var(--card-bg);
	color: var(--text-primary);
	font-size: 0.875rem;
	transition: all 0.2s ease;
}

#ProjectHoppscotch .tab-content input::placeholder,
#ProjectHoppscotch .tab-content textarea::placeholder {
	color: var(--text-muted);
}

#ProjectHoppscotch .tab-content input:hover,
#ProjectHoppscotch .tab-content select:hover,
#ProjectHoppscotch .tab-content textarea:hover {
	border-color: #cbd5e1;
}

#ProjectHoppscotch .tab-content input:focus,
#ProjectHoppscotch .tab-content select:focus,
#ProjectHoppscotch .tab-content textarea:focus {
	outline: none;
	border-color: var(--primary-color);
	box-shadow: 0 0 0 3px rgba(80, 70, 229, 0.1);
}

/* 文本域样式 */
#ProjectHoppscotch .tab-content textarea {
	width: 100%;
	min-height: 200px;
	padding: 0.75rem;
	font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;
	font-size: 0.75rem;
	line-height: 1.5;
	resize: vertical;
	background-color: #fafafa;
}

#ProjectHoppscotch .tab-content textarea:focus {
	background-color: var(--card-bg);
}

/* 列表样式 */
#ProjectHoppscotch .tab-content .space-y-4 > div {
	margin-bottom: 1rem;
}

#ProjectHoppscotch .tab-content .space-y-2 > div {
	margin-bottom: 0.5rem;
}

/* 水平间距 */
#ProjectHoppscotch .tab-content .space-x-2 {
	display: flex;
}

#ProjectHoppscotch .tab-content .space-x-2 > * {
	margin-right: 0.5rem;
}

#ProjectHoppscotch .tab-content .space-x-2 > *:last-child {
	margin-right: 0;
}

/* Flex布局 */
#ProjectHoppscotch .tab-content .flex {
	display: flex;
}

#ProjectHoppscotch .tab-content .items-center {
	align-items: center;
}

#ProjectHoppscotch .tab-content .justify-between {
	justify-content: space-between;
}

#ProjectHoppscotch .tab-content .justify-end {
	justify-content: flex-end;
}

/* 输入框组 */
#ProjectHoppscotch .tab-content input[type="text"],
#ProjectHoppscotch .tab-content input[type="password"] {
	padding: 0.5rem 0.75rem;
}

#ProjectHoppscotch .tab-content .flex1 {
	flex: 1;
}

/* 标签样式 */
#ProjectHoppscotch .tab-content label {
	color: var(--text-secondary);
	font-size: 0.875rem;
}

/* 响应区域 */

/* 响应头部 */
#ProjectHoppscotch .response-tabs {
	display: flex;
	background-color: var(--bg-color);
	border-bottom: 1px solid var(--border-color);
}

#ProjectHoppscotch .response-tabs .tab-button {
	padding: 0.5rem 1rem;
	background-color: transparent;
	border: none;
	border-bottom: 2px solid transparent;
	color: var(--text-secondary);
	font-size: 0.75rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
}

#ProjectHoppscotch .response-tabs .tab-button:hover {
	background-color: #f1f5f9;
	color: var(--text-primary);
}

#ProjectHoppscotch .response-tabs .tab-button.border-b-2 {
	border-bottom-color: var(--primary-color);
	color: var(--primary-color);
	background-color: var(--card-bg);
	box-shadow: inset 0 -1px 0 0 var(--border-color);
}

/* 响应内容 */
#ProjectHoppscotch .response-content {
	padding: 1rem;
	background-color: var(--card-bg);
	overflow: auto;
}

/* 状态码样式 */
#ProjectHoppscotch .response-content .bg-green-100 {
	background-color: #d1fae5;
}

#ProjectHoppscotch .response-content .text-green-800 {
	color: #065f46;
}

#ProjectHoppscotch .response-content .bg-blue-100 {
	background-color: #dbeafe;
}

#ProjectHoppscotch .response-content .text-blue-800 {
	color: #1e40af;
}

#ProjectHoppscotch .response-content .bg-yellow-100 {
	background-color: #fef3c7;
}

#ProjectHoppscotch .response-content .text-yellow-800 {
	color: #92400e;
}

#ProjectHoppscotch .response-content .bg-red-100 {
	background-color: #fee2e2;
}

#ProjectHoppscotch .response-content .text-red-800 {
	color: #991b1b;
}

/* 代码块样式 */
#ProjectHoppscotch .response-content pre {
	background-color: #0f172a;
	color: #e2e8f0;
	border-radius: 0.375rem;
	padding: 1rem;
	font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;
	font-size: 0.75rem;
	line-height: 1.5;
	overflow: auto;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	white-space: pre-wrap;
	word-wrap: break-word;
}

/* 语法高亮 */
#ProjectHoppscotch .response-content pre::selection {
	background-color: rgba(80, 70, 229, 0.3);
}

/* 响应头和Cookies网格 */
#ProjectHoppscotch .response-content .grid {
	display: grid;
}

#ProjectHoppscotch .response-content .grid-cols-2 {
	grid-template-columns: repeat(2, 1fr);
	gap: 0.5rem;
}

#ProjectHoppscotch .response-content .gap-2 {
	gap: 0.5rem;
}

/* 键值对样式 */
#ProjectHoppscotch .response-content .font-mono {
	font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;
}

#ProjectHoppscotch .response-content .bg-gray-50 {
	background-color: var(--bg-color);
}

#ProjectHoppscotch .response-content .rounded {
	border-radius: 0.375rem;
}

#ProjectHoppscotch .response-content .p-2 {
	padding: 0.5rem;
}

/* 加载动画 */
#ProjectHoppscotch .animate-spin {
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

/* 响应式设计 */
@media (max-width: 1024px) {
	#ProjectHoppscotch .flex {
		flex-direction: column;
	}
}

/* 滚动条样式 */
#ProjectHoppscotch ::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

#ProjectHoppscotch ::-webkit-scrollbar-track {
	background: var(--bg-color);
}

#ProjectHoppscotch ::-webkit-scrollbar-thumb {
	background: var(--border-color);
	border-radius: 4px;
}

#ProjectHoppscotch ::-webkit-scrollbar-thumb:hover {
	background: #cbd5e1;
}

#ProjectHoppscotch ::-webkit-scrollbar-corner {
	background: var(--bg-color);
}
</style>
