<template>
	<div class="desktop-workspace">
		<!-- 顶部状态栏 -->
		<MenuBar
			:currentPath="currentPath"
			:userInfo="userInfo"
			@search="handleSearch"
			@notification="handleNotification" />

		<!-- 主工作区 -->
		<div class="workspace-main">
			<!-- 左侧资源树 -->
			<ResourceTree
				:resources="resources"
				:expandedKeys="expandedKeys"
				:selectedKey="selectedKey"
				@select="handleResourceSelect"
				@expand="handleResourceExpand"
				@open="handleResourceOpen" />

			<!-- 桌面区域 -->
			<div class="desktop-area" ref="desktopArea">
				<!-- 桌面快捷方式 -->
				<DesktopIcon
					v-for="shortcut in desktopShortcuts"
					:key="shortcut.id"
					:shortcut="shortcut"
					@open="handleShortcutOpen"
					@unpin="handleShortcutUnpin" />

				<!-- 窗口管理器 -->
				<WindowManager
					:windows="windows"
					:activeWindowId="activeWindowId"
					@focus="handleWindowFocus"
					@minimize="handleWindowMinimize"
					@maximize="handleWindowMaximize"
					@close="handleWindowClose"
					@pin="handleWindowPin" />
			</div>
		</div>

		<!-- 底部 Dock 栏 -->
		<Dock
			:apps="dockApps"
			:windowGroups="windowGroups"
			@launch="handleAppLaunch"
			@windowFocus="handleDockWindowFocus" />
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const [MenuBar, ResourceTree, WindowManager, DesktopIcon, Dock] =
		await _.$importVue([
			"@/components/DesktopWorkspace/MenuBar.vue",
			"@/components/DesktopWorkspace/ResourceTree.vue",
			"@/components/DesktopWorkspace/WindowManager.vue",
			"@/components/DesktopWorkspace/DesktopIcon.vue",
			"@/components/DesktopWorkspace/Dock.vue"
		]);

	return {
		components: {
			MenuBar,
			ResourceTree,
			WindowManager,
			DesktopIcon,
			Dock
		},
		data() {
			return {
				// 当前路径
				currentPath: "/",
				// 用户信息
				userInfo: null,
				// 资源树数据
				resources: [],
				// 展开的节点 keys
				expandedKeys: [],
				// 选中的节点 key
				selectedKey: null,
				// 桌面快捷方式
				desktopShortcuts: [],
				// 窗口列表
				windows: [],
				// 当前活动窗口 ID
				activeWindowId: null,
				// Dock 应用列表
				dockApps: [],
				// 窗口分组（用于 Dock 堆叠）
				windowGroups: {}
			};
		},
		computed: {
			// 窗口按资源类型分组
			windowGroups() {
				const groups = {};
				this.windows.forEach(window => {
					const type = window.resourceType;
					if (!groups[type]) {
						groups[type] = [];
					}
					groups[type].push(window);
				});
				return groups;
			}
		},
		mounted() {
			this.initWorkspace();
		},
		methods: {
			// 初始化工作区
			async initWorkspace() {
				// 获取用户信息
				await this.fetchUserInfo();
				// 获取资源树数据
				await this.fetchResources();
				// 获取桌面快捷方式
				await this.fetchDesktopShortcuts();
				// 初始化 Dock 应用
				this.initDockApps();
			},

			// 获取用户信息
			async fetchUserInfo() {
				try {
					const { data } = await _api.xspace.getUserInfo();
					this.userInfo = data;
				} catch (error) {
					console.error("获取用户信息失败:", error);
				}
			},

			// 获取资源树数据
			async fetchResources() {
				try {
					const { data } = await _api.xspace.getResourceTree();
					this.resources = this.processResources(data);
				} catch (error) {
					console.error("获取资源树失败:", error);
					// 使用模拟数据
					this.resources = this.getMockResources();
				}
			},

			// 处理资源数据
			processResources(data) {
				// 添加图标和类型信息
				return data.map(item => ({
					...item,
					icon: this.getResourceIcon(item.type),
					children: item.children
						? this.processResources(item.children)
						: null
				}));
			},

			// 获取资源图标
			getResourceIcon(type) {
				const iconMap = {
					group: "folder",
					project: "project",
					api: "api",
					doc: "document",
					member: "user",
					settings: "setting",
					folder: "folder",
					file: "file"
				};
				return iconMap[type] || "file";
			},

			// 获取模拟资源数据
			getMockResources() {
				return [
					{
						id: "group-1",
						name: "Backend Team",
						type: "group",
						icon: "folder",
						children: [
							{
								id: "project-1",
								name: "Main API",
								type: "project",
								icon: "project",
								children: [
									{
										id: "folder-api",
										name: "API Management",
										type: "folder",
										icon: "folder",
										children: [
											{
												id: "api-1",
												name: "GET /users",
												type: "api",
												icon: "api",
												metadata: {
													method: "GET",
													url: "/users"
												}
											},
											{
												id: "api-2",
												name: "POST /users",
												type: "api",
												icon: "api",
												metadata: {
													method: "POST",
													url: "/users"
												}
											}
										]
									},
									{
										id: "folder-doc",
										name: "Documentation",
										type: "folder",
										icon: "folder",
										children: [
											{
												id: "doc-1",
												name: "API Guide",
												type: "doc",
												icon: "document"
											}
										]
									},
									{
										id: "members-1",
										name: "Members",
										type: "member",
										icon: "user"
									},
									{
										id: "settings-1",
										name: "Settings",
										type: "settings",
										icon: "setting"
									}
								]
							}
						]
					},
					{
						id: "global-resources",
						name: "Global Resources",
						type: "folder",
						icon: "folder",
						isGlobal: true,
						children: [
							{
								id: "data-models",
								name: "Data Models",
								type: "folder",
								icon: "folder",
								children: [
									{
										id: "schema-1",
										name: "UserSchema.json",
										type: "file",
										icon: "file"
									}
								]
							}
						]
					}
				];
			},

			// 获取桌面快捷方式
			async fetchDesktopShortcuts() {
				// 从本地存储或 API 获取
				const saved = localStorage.getItem("desktop_shortcuts");
				if (saved) {
					this.desktopShortcuts = JSON.parse(saved);
				}
			},

			// 初始化 Dock 应用
			initDockApps() {
				this.dockApps = [
					{ id: "finder", name: "Finder", icon: "folder", isHidden: false },
					{ id: "launcher", name: "Launcher", icon: "apps", isHidden: false }
				];
			},

			// 处理资源选择
			handleResourceSelect(resource) {
				this.selectedKey = resource.id;
				this.currentPath = resource.path || "/";
			},

			// 处理资源展开
			handleResourceExpand(keys) {
				this.expandedKeys = keys;
			},

			// 处理资源打开（打开新窗口）
			handleResourceOpen(resource) {
				// 检查是否已打开
				const existingWindow = this.windows.find(
					w => w.resourceId === resource.id
				);

				if (existingWindow) {
					// 聚焦已打开的窗口
					this.handleWindowFocus(existingWindow.id);
					return;
				}

				// 创建新窗口
				const newWindow = {
					id: _.$genId(),
					resourceId: resource.id,
					resourceType: resource.type,
					title: resource.name,
					icon: resource.icon,
					isMinimized: false,
					isMaximized: true, // 默认全屏
					isFocused: true,
					position: { x: 0, y: 0 },
					size: { width: "100%", height: "100%" },
					zIndex: this.getNextZIndex(),
					data: resource
				};

				// 更新其他窗口为非聚焦状态
				this.windows.forEach(w => {
					w.isFocused = false;
				});

				this.windows.push(newWindow);
				this.activeWindowId = newWindow.id;

				// 自动展开资源树到当前资源
				this.expandToResource(resource.id);
			},

			// 获取下一个 z-index
			getNextZIndex() {
				const maxZ = Math.max(0, ...this.windows.map(w => w.zIndex));
				return maxZ + 1;
			},

			// 展开资源树到指定资源
			expandToResource(resourceId) {
				// 查找资源路径
				const path = this.findResourcePath(resourceId);
				if (path) {
					// 添加所有父节点到展开列表
					path.forEach(node => {
						if (!this.expandedKeys.includes(node.id)) {
							this.expandedKeys.push(node.id);
						}
					});
				}
			},

			// 查找资源路径
			findResourcePath(resourceId, resources = this.resources, path = []) {
				for (const resource of resources) {
					if (resource.id === resourceId) {
						return [...path, resource];
					}
					if (resource.children) {
						const result = this.findResourcePath(
							resourceId,
							resource.children,
							[...path, resource]
						);
						if (result) return result;
					}
				}
				return null;
			},

			// 处理窗口聚焦
			handleWindowFocus(windowId) {
				this.windows.forEach(w => {
					w.isFocused = w.id === windowId;
					if (w.id === windowId) {
						w.isMinimized = false;
						w.zIndex = this.getNextZIndex();
					}
				});
				this.activeWindowId = windowId;
			},

			// 处理窗口最小化
			handleWindowMinimize(windowId) {
				const window = this.windows.find(w => w.id === windowId);
				if (window) {
					window.isMinimized = true;
					window.isFocused = false;
				}
				// 更新活动窗口
				const visibleWindows = this.windows.filter(w => !w.isMinimized);
				if (visibleWindows.length > 0) {
					this.activeWindowId = visibleWindows[visibleWindows.length - 1].id;
				} else {
					this.activeWindowId = null;
				}
			},

			// 处理窗口最大化
			handleWindowMaximize(windowId) {
				const window = this.windows.find(w => w.id === windowId);
				if (window) {
					window.isMaximized = !window.isMaximized;
				}
			},

			// 处理窗口关闭
			handleWindowClose(windowId) {
				const index = this.windows.findIndex(w => w.id === windowId);
				if (index > -1) {
					this.windows.splice(index, 1);
				}
				// 更新活动窗口
				if (this.activeWindowId === windowId) {
					const visibleWindows = this.windows.filter(w => !w.isMinimized);
					this.activeWindowId =
						visibleWindows.length > 0
							? visibleWindows[visibleWindows.length - 1].id
							: null;
				}
			},

			// 处理窗口 Pin
			handleWindowPin(windowId) {
				const window = this.windows.find(w => w.id === windowId);
				if (!window) return;

				// 检查是否已存在
				const existingIndex = this.desktopShortcuts.findIndex(
					s => s.resourceId === window.resourceId
				);

				if (existingIndex === -1) {
					// 添加新快捷方式
					const shortcut = {
						id: _.$genId(),
						resourceId: window.resourceId,
						name: window.title,
						icon: window.icon,
						position: this.getNextDesktopPosition()
					};
					this.desktopShortcuts.push(shortcut);
					this.saveDesktopShortcuts();
				}
			},

			// 获取下一个桌面位置
			getNextDesktopPosition() {
				const gridSize = 80;
				const cols = 4;
				const index = this.desktopShortcuts.length;
				return {
					x: (index % cols) * gridSize + 20,
					y: Math.floor(index / cols) * gridSize + 20
				};
			},

			// 保存桌面快捷方式
			saveDesktopShortcuts() {
				localStorage.setItem(
					"desktop_shortcuts",
					JSON.stringify(this.desktopShortcuts)
				);
			},

			// 处理快捷方式打开
			handleShortcutOpen(shortcut) {
				// 查找资源
				const resource = this.findResourceById(shortcut.resourceId);
				if (resource) {
					this.handleResourceOpen(resource);
				}
			},

			// 根据 ID 查找资源
			findResourceById(resourceId, resources = this.resources) {
				for (const resource of resources) {
					if (resource.id === resourceId) {
						return resource;
					}
					if (resource.children) {
						const result = this.findResourceById(
							resourceId,
							resource.children
						);
						if (result) return result;
					}
				}
				return null;
			},

			// 处理快捷方式取消固定
			handleShortcutUnpin(shortcutId) {
				const index = this.desktopShortcuts.findIndex(s => s.id === shortcutId);
				if (index > -1) {
					this.desktopShortcuts.splice(index, 1);
					this.saveDesktopShortcuts();
				}
			},

			// 处理搜索
			handleSearch(query) {
				console.log("搜索:", query);
				// TODO: 实现搜索功能
			},

			// 处理通知
			handleNotification() {
				console.log("打开通知中心");
				// TODO: 实现通知中心
			},

			// 处理应用启动
			handleAppLaunch(appId) {
				console.log("启动应用:", appId);
				// TODO: 实现应用启动
			},

			// 处理 Dock 窗口聚焦
			handleDockWindowFocus(windowId) {
				this.handleWindowFocus(windowId);
			}
		}
	};
}
</script>

<style lang="less">
.desktop-workspace {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	overflow: hidden;

	.workspace-main {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.desktop-area {
		flex: 1;
		position: relative;
		overflow: hidden;
		padding: 20px;
	}
}
</style>
