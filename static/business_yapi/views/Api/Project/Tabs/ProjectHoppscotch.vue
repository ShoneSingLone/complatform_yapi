<template>
	<div id="ProjectHoppscotch" class="height100 width100 flex flex-col">
		<!-- 顶部工具栏 -->
		<div class="toolbar flex items-center p-4 bg-white border-b">
			<select v-model="selectedMethod" class="mr-2 p-2 border rounded">
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
				<option value="PATCH">PATCH</option>
				<option value="DELETE">DELETE</option>
				<option value="HEAD">HEAD</option>
				<option value="OPTIONS">OPTIONS</option>
		</select>
		<input
			v-model="url"
			placeholder="输入API URL"
			class="flex1 mr-2 p-2 border rounded"
		/>
		<button @click="sendRequest" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
			发送请求
		</button>
	</div>

	<!-- 主体内容区域 -->
	<div class="flex1 flex overflow-hidden">
		<!-- 左侧请求配置 -->
		<div class="w-1/2 flex flex-col overflow-hidden border-r">
			<!-- 请求头 -->
			<div class="p-4 border-b">
				<h3 class="text-lg font-bold mb-2">请求头</h3>
				<div
					v-for="(header, index) in headers"
					:key="index"
					class="flex mb-2"
				>
					<input
						v-model="header.key"
						placeholder="键"
						class="mr-2 p-2 border rounded w-1/3"
					/>
					<input
						v-model="header.value"
						placeholder="值"
						class="flex1 p-2 border rounded"
					/>
					<button @click="removeHeader(index)" class="ml-2 p-2 text-red-500">
						删除
					</button>
				</div>
				<button @click="addHeader" class="p-2 bg-gray-200 rounded hover:bg-gray-300">
					添加请求头
				</button>
			</div>

			<!-- 请求体 -->
			<div class="flex1 p-4 overflow-auto">
				<h3 class="text-lg font-bold mb-2">请求体</h3>
				<textarea
					v-model="requestBody"
					placeholder="输入请求体（JSON格式）"
					class="width100 height100 border rounded p-2"
				></textarea>
			</div>
		</div>

		<!-- 右侧响应结果 -->
		<div class="w-1/2 flex flex-col overflow-hidden">
			<!-- 响应状态 -->
			<div class="p-4 border-b bg-gray-50">
				<h3 class="text-lg font-bold mb-2">响应</h3>
				<div class="flex items-center">
					<span class="mr-2 font-mono">{{ responseStatus }}</span>
					<span class="text-sm text-gray-500">{{ responseTime }}ms</span>
				</div>
			</div>

			<!-- 响应头 -->
			<div class="p-4 border-b overflow-auto max-h-32">
				<h4 class="font-bold mb-2">响应头</h4>
				<div class="grid grid-cols-2 gap-2">
					<div
						v-for="(value, key) in responseHeaders"
						:key="key"
						class="font-mono text-sm"
					>
						<span class="font-bold">{{ key }}:</span> {{ value }}
					</div>
				</div>
			</div>

			<!-- 响应体 -->
			<div class="flex1 p-4 overflow-auto">
				<h4 class="font-bold mb-2">响应体</h4>
				<pre class="width100 height100 bg-gray-50 p-2 rounded overflow-auto font-mono text-sm">{{ formattedResponse }}</pre>
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
				url: "",
				headers: [{ key: "Content-Type", value: "application/json" }],
				requestBody: "",

				// 响应结果
				responseStatus: "",
				responseTime: 0,
				responseHeaders: {},
				responseBody: "",
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
				// 这里暂时使用占位符
				this.url = "https://api.example.com";
			},
			addHeader() {
				this.headers.push({ key: "", value: "" });
			},
			removeHeader(index) {
				this.headers.splice(index, 1);
			},
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
						url: this.url,
						headers: this.headers.reduce((acc, header) => {
							if (header.key) {
								acc[header.key] = header.value;
							}
							return acc;
						}, {} as any),
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
				} catch (error: any) {
					// 处理错误响应
					this.responseStatus = error.response?.status || "Error";
					this.responseTime = Date.now() - startTime;
					this.responseHeaders = error.response?.headers || {};
					this.responseBody = JSON.stringify(error.response?.data || error.message);
				} finally {
					this.loading = false;
				}
			}
		}
	});
}
</script>

<style lang="less">
#ProjectHoppscotch {
	.toolbar {
		button {
			cursor: pointer;
		}

		input, select {
			outline: none;
			&:focus {
				border-color: #409eff;
				box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
			}
		}
	}

	textarea {
		outline: none;
		resize: none;
		&:focus {
			border-color: #409eff;
			box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
		}
	}

	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
	}
}
</style>
