<script lang="ts">

// Mock Data
const mockApiData = {
	id: "root",
	name: "API Workspaces",
	type: "folder",
	updatedAt: "2026-03-31T10:00:00Z",
	path: "/API Workspaces",
	children: [
		{
			id: "global_resources",
			name: "Global Resources",
			type: "folder",
			updatedAt: "2026-04-01T10:00:00Z",
			path: "/API Workspaces/Global Resources",
			children: [
				{
					id: "gr_models",
					name: "Data Models",
					type: "doc_folder",
					updatedAt: "2026-04-01T10:00:00Z",
					path: "/API Workspaces/Global Resources/Data Models",
					children: [
						{
							id: "gr_user_model",
							name: "UserSchema.json",
							type: "code",
							updatedAt: "2026-04-01T10:00:00Z",
							path: "/API Workspaces/Global Resources/Data Models/UserSchema.json",
							content:
								'{\n  "type": "object",\n  "properties": {\n    "id": { "type": "string" },\n    "name": { "type": "string" },\n    "email": { "type": "string", "format": "email" }\n  },\n  "required": ["id", "name"]\n}'
						}
					]
				}
			]
		},
		{
			id: "group_backend",
			name: "Backend Team",
			type: "group",
			updatedAt: "2026-03-31T10:00:00Z",
			path: "/API Workspaces/Backend Team",
			children: [
				{
					id: "gb_info",
					name: "Group Info",
					type: "setting",
					updatedAt: "2026-03-31T10:00:00Z",
					path: "/API Workspaces/Backend Team/Group Info",
					content: {
						description: "Core backend services team handling microservices.",
						createdBy: "Admin",
						createdAt: "2025-01-01"
					}
				},
				{
					id: "gb_members",
					name: "Group Members",
					type: "member_list",
					updatedAt: "2026-03-31T10:00:00Z",
					path: "/API Workspaces/Backend Team/Group Members",
					content: [
						{ id: 1, name: "Alice Smith", role: "Admin", email: "alice@example.com" },
						{ id: 2, name: "Bob Jones", role: "Developer", email: "bob@example.com" }
					]
				},
				{
					id: "gb_docs",
					name: "Group Docs",
					type: "doc_folder",
					updatedAt: "2026-03-31T10:00:00Z",
					path: "/API Workspaces/Backend Team/Group Docs",
					children: [
						{
							id: "gb_doc_1",
							name: "Architecture.md",
							type: "doc",
							updatedAt: "2026-03-31T10:00:00Z",
							path: "/API Workspaces/Backend Team/Group Docs/Architecture.md",
							content:
								"# Architecture\n\nOur system is based on Node.js microservices communicating via gRPC."
						}
					]
				},
				{
					id: "gb_projects",
					name: "Projects",
					type: "folder",
					updatedAt: "2026-03-31T10:00:00Z",
					path: "/API Workspaces/Backend Team/Projects",
					children: [
						{
							id: "proj_main",
							name: "Main API",
							type: "project",
							updatedAt: "2026-03-31T10:00:00Z",
							path: "/API Workspaces/Backend Team/Projects/Main API",
							children: [
								{
									id: "pm_api",
									name: "API Management",
									type: "api_folder",
									updatedAt: "2026-03-31T10:00:00Z",
									path: "/API Workspaces/Backend Team/Projects/Main API/API Management",
									children: [
										{
											id: "api_get_users",
											name: "GET /users",
											type: "api",
											updatedAt: "2026-03-31T10:00:00Z",
											path: "/API Workspaces/Backend Team/Projects/Main API/API Management/GET users",
											content: {
												method: "GET",
												endpoint: "/users",
												description: "Get a list of all users",
												params: [
													{ name: "page", type: "number", default: 1 }
												]
											}
										},
										{
											id: "api_post_users",
											name: "POST /users",
											type: "api",
											updatedAt: "2026-03-31T10:00:00Z",
											path: "/API Workspaces/Backend Team/Projects/Main API/API Management/POST users",
											content: {
												method: "POST",
												endpoint: "/users",
												description: "Create a new user",
												body: '{\n  "name": "string",\n  "email": "string"\n}'
											}
										}
									]
								},
								{
									id: "pm_docs",
									name: "Documentation",
									type: "doc_folder",
									updatedAt: "2026-03-31T10:00:00Z",
									path: "/API Workspaces/Backend Team/Projects/Main API/Documentation",
									children: []
								},
								{
									id: "pm_cicd",
									name: "CI/CD Pipeline",
									type: "cicd",
									updatedAt: "2026-03-31T10:00:00Z",
									path: "/API Workspaces/Backend Team/Projects/Main API/CI/CD Pipeline",
									content: {
										status: "passing",
										lastRun: "2026-03-31T09:00:00Z",
										stages: ["Build", "Test", "Deploy"]
									}
								},
								{
									id: "pm_settings",
									name: "Project Settings",
									type: "setting",
									updatedAt: "2026-03-31T10:00:00Z",
									path: "/API Workspaces/Backend Team/Projects/Main API/Project Settings",
									content: {
										env: "Production",
										version: "1.2.0",
										baseUrl: "https://api.example.com"
									}
								},
								{
									id: "pm_members",
									name: "Project Members",
									type: "member_list",
									updatedAt: "2026-03-31T10:00:00Z",
									path: "/API Workspaces/Backend Team/Projects/Main API/Project Members",
									content: [{ id: 1, name: "Alice Smith", role: "Owner" }]
								}
							]
						}
					]
				}
			]
		}
	]
};

export default async function ({ PRIVATE_GLOBAL }) {
	return {
		props: {
			windowData: Object
		},
		// system: v1 Desktop Workspace 局部状态（来自 ViewXspace）
		inject: ['system'],
		data() {
			return {
				mockApiData: mockApiData,
				// Global Environment State
				environments: ["Development", "Test", "Staging", "Production"],
				activeEnvironment: "Development",
				// State
				selectedFile: null,
				searchQuery: "",
				showPreview: true,
				expandedFolders: new Set([mockApiData.id]),
				// Sort State
				sortField: "name",
				sortDirection: "asc",
				// API Execution State
				isRequesting: false,
				responseData: null,
				responseStatus: null,
				responseTime: null,
				// Editors State
				editingContent: null
			};
		},
	computed: {
		activeNode() {
			const node = this.windowData || this.mockApiData;
			this.expandAncestors(node.id);
			return node;
		},
		filteredAndSortedFiles() {
			if (!this.isFolderType(this.activeNode.type)) return [];

			let files = this.activeNode.children || [];

			if (this.searchQuery) {
				const lowerQuery = this.searchQuery.toLowerCase();
				files = files.filter(f => f.name.toLowerCase().includes(lowerQuery));
			}

			return [...files].sort((a, b) => {
				let comparison = 0;

				if (
					(this.sortField === "name" || this.sortField === "type") &&
					this.isFolderType(a.type) !== this.isFolderType(b.type)
				) {
					if (this.isFolderType(a.type)) return -1;
					if (this.isFolderType(b.type)) return 1;
				}

				switch (this.sortField) {
					case "name":
						comparison = a.name.localeCompare(b.name);
						break;
					case "updatedAt":
						comparison =
							new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
						break;
					case "type":
						comparison = a.type.localeCompare(b.type);
						break;
				}

				return this.sortDirection === "asc" ? comparison : -comparison;
			});
		},
		canNavigateUp() {
			return this.activeNode.id !== this.mockApiData.id;
		}
	},
	methods: {
		// Utils
		formatDate(dateString) {
			try {
				const date = new Date(dateString);
				return date.toLocaleString();
			} catch (e) {
				return dateString;
			}
		},
		isFolderType(type) {
			return ["group", "project", "api_folder", "doc_folder", "folder"].includes(type);
		},
		findParentNode(root, targetId) {
			if (!root.children) return null;
			for (const child of root.children) {
				if (child.id === targetId) return root;
				const found = this.findParentNode(child, targetId);
				if (found) return found;
			}
			return null;
		},
		// Auto-expand ancestors of activeNode
		expandAncestors(nodeId) {
			let currentId = nodeId;
			while (currentId !== this.mockApiData.id) {
				const parent = this.findParentNode(this.mockApiData, currentId);
				if (parent) {
					this.expandedFolders.add(parent.id);
					currentId = parent.id;
				} else {
					break;
				}
			}
		},
		// Methods
		handleOpenNode(node) {
	const appId = node.type === "api" ? "api_endpoint" : node.type;
	if (this.system?.openApp) {
		this.system.openApp(appId, true, node);
	}
},
		handleNavigateUp() {
			if (this.activeNode.id === this.mockApiData.id) return;
			const parent = this.findParentNode(this.mockApiData, this.activeNode.id);
			if (parent) {
				this.handleOpenNode(parent);
			}
		},
		handleSort(field) {
			if (this.sortField === field) {
				this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
			} else {
				this.sortField = field;
				this.sortDirection = "asc";
			}
		},
		toggleFolder(folderId, e) {
			e.stopPropagation();
			if (this.expandedFolders.has(folderId)) {
				this.expandedFolders.delete(folderId);
			} else {
				this.expandedFolders.add(folderId);
			}
		},
		getIcon(type) {
		switch (type) {
			case "group":
				return "folder";
			case "project":
				return "folder";
			case "api_folder":
				return "folder";
			case "doc_folder":
				return "folder";
			case "folder":
				return "folder";
			case "api":
				return "code";
			case "doc":
				return "file-text";
			case "code":
				return "code";
			case "member_list":
				return "users";
			case "setting":
				return "settings";
			case "cicd":
				return "activity";
			default:
				return "file";
		}
	},
		getIconColor(type) {
			switch (type) {
				case "group":
					return "text-blue-600 fill-blue-100";
				case "project":
					return "text-indigo-600 fill-indigo-100";
				case "api_folder":
					return "text-emerald-600 fill-emerald-100";
				case "doc_folder":
					return "text-amber-600 fill-amber-100";
				case "folder":
					return "text-gray-500 fill-gray-100";
				case "api":
					return "text-emerald-500";
				case "doc":
					return "text-amber-600";
				case "code":
					return "text-yellow-600";
				case "member_list":
					return "text-blue-500";
				case "setting":
					return "text-slate-500";
				case "cicd":
					return "text-purple-500";
				default:
					return "text-gray-500";
			}
		},
		// Editors Methods
		startEditing() {
			this.editingContent = JSON.parse(JSON.stringify(this.activeNode.content || {}));
		},
		saveEditing() {
			this.activeNode.content = this.editingContent;
			this.editingContent = null;
		},
		cancelEditing() {
			this.editingContent = null;
		},
		getMethodColor(method) {
			switch (method?.toUpperCase()) {
				case "GET":
					return "bg-blue-100 text-blue-700";
				case "POST":
					return "bg-green-100 text-green-700";
				case "PUT":
					return "bg-amber-100 text-amber-700";
				case "DELETE":
					return "bg-red-100 text-red-700";
				default:
					return "bg-gray-100 text-gray-700";
			}
		},
		// API Execution
		sendRequest() {
			this.isRequesting = true;
			this.responseData = null;
			this.responseStatus = null;
			this.responseTime = null;

			const startTime = performance.now();

			// Simulate network request
			setTimeout(() => {
				this.isRequesting = false;
				this.responseStatus = 200;
				this.responseTime = Math.round(performance.now() - startTime);

				// Generate mock response based on endpoint
				const endpoint = this.activeNode.content?.endpoint || "";
				let mockResponse = {};

				if (endpoint.includes("users") && this.activeNode.content?.method === "GET") {
					mockResponse = {
						status: "success",
						environment: this.activeEnvironment,
						data: [
							{ id: 1, name: "Alice Smith", email: "alice@example.com" },
							{ id: 2, name: "Bob Jones", email: "bob@example.com" }
						],
						meta: { total: 2, page: 1 }
					};
				} else if (
					endpoint.includes("users") &&
					this.activeNode.content?.method === "POST"
				) {
					mockResponse = {
						status: "success",
						environment: this.activeEnvironment,
						message: "User created successfully",
						data: { id: 3, name: "New User", email: "new@example.com" }
					};
				} else {
					mockResponse = {
						status: "success",
						environment: this.activeEnvironment,
						message: "Request executed successfully",
						timestamp: new Date().toISOString()
					};
				}

				this.responseData = JSON.stringify(mockResponse, null, 2);
			}, 800 + Math.random() * 500);}
		}
		};
	};
</script>

<template>
	<div class="flex flex-col h-full bg-surface text-on-surface font-sans overflow-hidden -m-6">
		<!-- Top Bar -->
		<div class="flex flex-col border-b border-outline-variant/50 bg-surface-container-lowest">
			<!-- Toolbar Row -->
			<div class="flex items-center px-4 py-2 gap-4">
				<div class="flex items-center gap-1">
					<button class="p-1.5 rounded-md text-on-surface-variant/50 cursor-not-allowed">
						<xIcon icon="chevron-left" :size="20" />
					</button>
					<button class="p-1.5 rounded-md text-on-surface-variant/50 cursor-not-allowed">
						<xIcon icon="chevron-right" :size="20" />
					</button>
					<button
						@click="handleNavigateUp"
						:disabled="!canNavigateUp"
						class="p-1.5 rounded-md transition-colors"
						:class="
							canNavigateUp
								? 'text-on-surface-variant hover:bg-surface-variant'
								: 'text-on-surface-variant/30 cursor-not-allowed'
						"
						title="Up">
						<xIcon icon="arrow-up" :size="20" />
					</button>
				</div>

				<div class="flex-1 max-w-2xl relative">
					<div
						class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<xIcon icon="search" :size="16" class="text-on-surface-variant" />
					</div>
					<input
						type="text"
						placeholder="Search resources..."
						v-model="searchQuery"
						class="block w-full pl-10 pr-3 py-1.5 border border-outline-variant/50 rounded-md leading-5 bg-surface-container-lowest placeholder-on-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-shadow" />
				</div>

				<div class="flex items-center gap-3 ml-auto">
					<!-- Environment Switcher -->
					<div
						class="flex items-center bg-surface-container border border-outline-variant/50 rounded-md px-3 py-1.5 hover:bg-surface-container-high transition-colors">
						<xIcon icon="globe" :size="16" class="text-on-surface-variant mr-2" />
						<select
							v-model="activeEnvironment"
							class="bg-transparent text-sm font-medium text-on-surface focus:outline-none cursor-pointer">
							<option v-for="env in environments" :key="env" :value="env">{{
								env
							}}</option>
						</select>
					</div>

					<div class="w-px h-6 bg-outline-variant/50"></div>

					<button
						@click="showPreview = !showPreview"
						class="p-1.5 rounded-md border transition-colors"
						:class="
							showPreview
								? 'bg-primary-container border-primary/20 text-on-primary-container'
								: 'bg-surface-container-lowest border-outline-variant/50 text-on-surface-variant hover:bg-surface-container'
						"
						title="Toggle Preview Pane">
						<xIcon icon="panel-right" :size="20" />
					</button>
				</div>
			</div>
		</div>

		<div class="flex flex-1 overflow-hidden">
			<!-- Sidebar (Tree) -->
			<div
				class="w-64 flex-shrink-0 border-r border-outline-variant/50 bg-surface-container overflow-y-auto">
				<div class="p-2">
					<h2
						class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 px-2">
						API Explorer
					</h2>

					<!-- Recursive Tree Component inline simulation -->
					<div class="select-none">
						<!-- Root -->
						<div
							class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
							:class="
								activeNode.id === mockApiData.id
									? 'bg-primary-container text-on-primary-container font-medium'
									: 'text-on-surface hover:bg-surface-variant'
							"
							style="padding-left: 8px"
							@click="handleOpenNode(mockApiData)">
							<span
								class="w-4 h-4 flex items-center justify-center mr-1 text-on-surface-variant hover:text-on-surface"
								@click="e => toggleFolder(mockApiData.id, e)">
								<xIcon 
													type="chevron-down"
													v-if="expandedFolders.has(mockApiData.id)"
													:size="14" />
												<xIcon 
													type="chevron-right" 
													v-else 
													:size="14" />
							</span>
							<span class="mr-2">
								<xIcon 
												:type="getIcon(mockApiData.type)"
												:size="16"
												:class="getIconColor(mockApiData.type)" />
							</span>
							<span class="truncate">{{ mockApiData.name }}</span>
						</div>

						<!-- Level 1 -->
						<div v-if="expandedFolders.has(mockApiData.id)">
							<template v-for="child in mockApiData.children" :key="child.id">
								<div class="select-none">
									<div
										class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
										:class="
											activeNode.id === child.id
												? 'bg-primary-container text-on-primary-container font-medium'
												: 'text-on-surface hover:bg-surface-variant'
										"
										style="padding-left: 20px"
										@click="handleOpenNode(child)">
										<span
											class="w-4 h-4 flex items-center justify-center mr-1 text-on-surface-variant hover:text-on-surface"
											@click="e => toggleFolder(child.id, e)">
											<template
												v-if="
													isFolderType(child.type) &&
													child.children?.length
												">
												<xIcon 
															type="chevron-down"
															v-if="expandedFolders.has(child.id)"
															:size="14" />
														<xIcon 
															type="chevron-right" 
															v-else 
															:size="14" />
											</template>
										</span>
										<span class="mr-2">
											<xIcon 
														:type="getIcon(child.type)"
														:size="16"
														:class="getIconColor(child.type)" />
										</span>
										<span class="truncate">{{ child.name }}</span>
									</div>

									<!-- Level 2 -->
									<div v-if="expandedFolders.has(child.id) && child.children">
										<template
											v-for="subchild in child.children"
											:key="subchild.id">
											<div class="select-none">
												<div
													class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
													:class="
														activeNode.id === subchild.id
															? 'bg-primary-container text-on-primary-container font-medium'
															: 'text-on-surface hover:bg-surface-variant'
													"
													style="padding-left: 32px"
													@click="handleOpenNode(subchild)">
													<span
														class="w-4 h-4 flex items-center justify-center mr-1 text-on-surface-variant hover:text-on-surface"
														@click="e => toggleFolder(subchild.id, e)">
														<template
															v-if="
																isFolderType(subchild.type) &&
																subchild.children?.length
															">
															<xIcon 
																	type="chevron-down"
																	v-if="
																		expandedFolders.has(subchild.id)
																	"
																	:size="14" />
																<xIcon 
																	type="chevron-right" 
																	v-else 
																	:size="14" />
														</template>
													</span>
													<span class="mr-2">
														<xIcon 
																:type="getIcon(subchild.type)"
																:size="16"
																:class="getIconColor(subchild.type)" />
													</span>
													<span class="truncate">{{
														subchild.name
													}}</span>
												</div>

												<!-- Level 3 -->
												<div
													v-if="
														expandedFolders.has(subchild.id) &&
														subchild.children
													">
													<template
														v-for="subsubchild in subchild.children"
														:key="subsubchild.id">
														<div class="select-none">
															<div
																class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
																:class="
																	activeNode.id === subsubchild.id
																		? 'bg-primary-container text-on-primary-container font-medium'
																		: 'text-on-surface hover:bg-surface-variant'
																"
																style="padding-left: 44px"
																@click="
																	handleOpenNode(subsubchild)
																">
																<span
																	class="w-4 h-4 flex items-center justify-center mr-1 text-on-surface-variant hover:text-on-surface"
																	@click="
																		e =>
																			toggleFolder(
																				subsubchild.id,
																				e
																			)
																	">
																	<template
																		v-if="
																			isFolderType(
																				subsubchild.type
																			) &&
																			subsubchild.children
																				?.length
																		">
																		<xIcon 
																				type="chevron-down"
																				v-if="
																					expandedFolders.has(
																						subsubchild.id
																					)
																				"
																				:size="14" />
																			<xIcon 
																				type="chevron-right"
																				v-else
																				:size="14" />
																	</template>
																</span>
																<span class="mr-2">
																	<xIcon 
																				:type="
																					getIcon(
																						subsubchild.type
																					)
																				"
																				:size="16"
																				:class="
																					getIconColor(
																						subsubchild.type
																					)
																				" />
																</span>
																<span class="truncate">{{
																	subsubchild.name
																}}</span>
															</div>

															<!-- Level 4 -->
															<div
																v-if="
																	expandedFolders.has(
																		subsubchild.id
																	) && subsubchild.children
																">
																<template
																	v-for="leaf in subsubchild.children"
																	:key="leaf.id">
																	<div class="select-none">
																		<div
																			class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
																			:class="
																				activeNode.id ===
																				leaf.id
																					? 'bg-primary-container text-on-primary-container font-medium'
																					: 'text-on-surface hover:bg-surface-variant'
																			"
																			style="
																				padding-left: 56px;
																			"
																			@click="
																				handleOpenNode(leaf)
																			">
																			<span
																				class="w-4 h-4 flex items-center justify-center mr-1"></span>
																			<span class="mr-2">
																				<xIcon 
																					:type="
																						getIcon(
																							leaf.type
																						)
																					"
																					:size="16"
																					:class="
																						getIconColor(
																							leaf.type
																						)
																					" />
																			</span>
																			<span
																				class="truncate"
																				>{{
																					leaf.name
																				}}</span
																			>
																		</div>
																	</div>
																</template>
															</div>
														</div>
													</template>
												</div>
											</div>
										</template>
									</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>

			<!-- Main Area -->
			<div class="flex-1 flex flex-col bg-surface-container-lowest overflow-hidden">
				<!-- Breadcrumb -->
				<div
					class="px-4 py-2 border-b border-outline-variant/50 text-sm text-on-surface-variant bg-surface-container flex items-center">
					<template
						v-for="(part, index) in activeNode.path.split('/').filter(Boolean)"
						:key="index">
						<span
							class="hover:text-primary cursor-pointer transition-colors"
							:class="
								index === activeNode.path.split('/').filter(Boolean).length - 1
									? 'font-semibold text-on-surface'
									: ''
							">
							{{ part }}
						</span>
						<span
							v-if="index < activeNode.path.split('/').filter(Boolean).length - 1"
							class="mx-2 text-on-surface-variant/50"
							>/</span
						>
					</template>
				</div>

				<!-- Folder View -->
				<template v-if="isFolderType(activeNode.type)">
					<!-- Table Header -->
					<div
						class="grid grid-cols-12 gap-4 px-4 py-2 border-b border-outline-variant/50 text-xs font-medium text-on-surface-variant uppercase tracking-wider bg-surface-container select-none">
						<div
							class="col-span-7 flex items-center cursor-pointer hover:text-on-surface transition-colors"
							@click="handleSort('name')">
							Name
							<xIcon 
									type="arrow-up"
									v-if="sortField === 'name' && sortDirection === 'asc'"
									:size="12"
									class="ml-1" />
								<xIcon 
									type="arrow-down"
									v-if="sortField === 'name' && sortDirection === 'desc'"
									:size="12"
									class="ml-1" />
						</div>
						<div
							class="col-span-3 flex items-center cursor-pointer hover:text-on-surface transition-colors"
							@click="handleSort('updatedAt')">
							Date Modified
							<xIcon 
									type="arrow-up"
									v-if="sortField === 'updatedAt' && sortDirection === 'asc'"
									:size="12"
									class="ml-1" />
								<xIcon 
									type="arrow-down"
									v-if="sortField === 'updatedAt' && sortDirection === 'desc'"
									:size="12"
									class="ml-1" />
						</div>
						<div
							class="col-span-2 flex items-center cursor-pointer hover:text-on-surface transition-colors"
							@click="handleSort('type')">
							Type
							<xIcon 
									type="arrow-up"
									v-if="sortField === 'type' && sortDirection === 'asc'"
									:size="12"
									class="ml-1" />
								<xIcon 
									type="arrow-down"
									v-if="sortField === 'type' && sortDirection === 'desc'"
									:size="12"
									class="ml-1" />
						</div>
					</div>

					<!-- File List -->
					<div class="flex-1 overflow-y-auto" @click="selectedFile = null">
						<div
							v-if="filteredAndSortedFiles.length === 0"
							class="flex flex-col items-center justify-center h-full text-on-surface-variant">
							<xIcon icon="folder" :size="48" class="text-outline-variant mb-2" />
							<p>This folder is empty</p>
						</div>
						<div v-else class="py-1">
							<div
								v-for="file in filteredAndSortedFiles"
								:key="file.id"
								@click.stop="selectedFile = file"
								@dblclick.stop="handleOpenNode(file)"
								class="grid grid-cols-12 gap-4 px-4 py-2 text-sm items-center cursor-pointer border-b border-transparent hover:bg-surface-variant/50 select-none transition-colors"
								:class="
									selectedFile?.id === file.id
										? 'bg-primary-container/50 border-primary/10'
										: ''
								">
								<div class="col-span-7 flex items-center gap-3 overflow-hidden">
									<xIcon 
												:type="getIcon(file.type)"
												:size="20"
												:class="getIconColor(file.type)" />
									<span class="truncate font-medium text-on-surface">{{
										file.name
									}}</span>
								</div>
								<div class="col-span-3 text-on-surface-variant truncate">
									{{ formatDate(file.updatedAt) }}
								</div>
								<div class="col-span-2 text-on-surface-variant capitalize truncate">
									{{ file.type.replace("_", " ") }}
								</div>
							</div>
						</div>
					</div>
				</template>

				<!-- File Editor View -->
				<template v-else>
					<div class="flex-1 overflow-y-auto p-6 bg-surface">
						<div
							class="max-w-4xl mx-auto bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden">
							<!-- Editor Header -->
							<div
								class="px-6 py-4 border-b border-outline-variant/50 flex items-center justify-between bg-surface-container/30">
								<div class="flex items-center gap-3">
									<xIcon 
							:type="getIcon(activeNode.type)"
							:size="24"
							:class="getIconColor(activeNode.type)" />
									<div>
										<h2 class="text-lg font-bold text-on-surface">{{
											activeNode.name
										}}</h2>
										<p class="text-xs text-on-surface-variant capitalize">{{
											activeNode.type.replace("_", " ")
										}}</p>
									</div>
								</div>
								<div class="flex gap-2">
									<template v-if="editingContent">
										<button
											@click="cancelEditing"
											class="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:bg-surface-variant rounded-md transition-colors"
											>Cancel</button
										>
										<button
											@click="saveEditing"
											class="px-4 py-1.5 text-sm font-medium bg-primary text-on-primary hover:bg-primary/90 rounded-md transition-colors flex items-center gap-2">
											<xIcon icon="save" :size="16" /> Save
										</button>
									</template>
									<template v-else>
										<button
											@click="startEditing"
											class="px-4 py-1.5 text-sm font-medium border border-outline-variant/50 text-on-surface hover:bg-surface-variant rounded-md transition-colors flex items-center gap-2">
											<xIcon icon="edit" :size="16" /> Edit
										</button>
									</template>
								</div>
							</div>

							<!-- Editor Content -->
							<div class="p-6">
								<!-- Member List Editor -->
								<template v-if="activeNode.type === 'member_list'">
									<div class="space-y-4">
										<div class="flex justify-between items-center mb-4">
											<h3 class="font-medium text-on-surface">Members</h3>
											<button
												v-if="editingContent"
												class="text-sm text-primary flex items-center gap-1 hover:underline">
												<xIcon icon="plus" :size="16" /> Add Member
											</button>
										</div>
										<div
											class="border border-outline-variant/50 rounded-lg overflow-hidden">
											<table class="w-full text-sm text-left">
												<thead
													class="bg-surface-container text-on-surface-variant text-xs uppercase">
													<tr>
														<th class="px-4 py-3">Name</th>
														<th class="px-4 py-3">Role</th>
														<th class="px-4 py-3">Email</th>
														<th
															v-if="editingContent"
															class="px-4 py-3 text-right"
															>Actions</th
														>
													</tr>
												</thead>
												<tbody>
													<tr
														v-for="(member, idx) in editingContent ||
														activeNode.content"
														:key="idx"
														class="border-b border-outline-variant/50 last:border-0 hover:bg-surface-variant/30">
														<td
															class="px-4 py-3 font-medium text-on-surface">
															<input
																v-if="editingContent"
																v-model="member.name"
																class="bg-transparent border-b border-outline-variant/50 focus:border-primary outline-none w-full" />
															<span v-else>{{ member.name }}</span>
														</td>
														<td class="px-4 py-3">
															<select
																v-if="editingContent"
																v-model="member.role"
																class="bg-transparent border-b border-outline-variant/50 focus:border-primary outline-none w-full">
																<option>Admin</option>
																<option>Developer</option>
																<option>Viewer</option>
																<option>Owner</option>
															</select>
															<span
																v-else
																class="px-2 py-1 bg-surface-variant rounded text-xs"
																>{{ member.role }}</span
															>
														</td>
														<td
															class="px-4 py-3 text-on-surface-variant">
															<input
																v-if="editingContent"
																v-model="member.email"
																class="bg-transparent border-b border-outline-variant/50 focus:border-primary outline-none w-full" />
															<span v-else>{{
																member.email || "--"
															}}</span>
														</td>
														<td
															v-if="editingContent"
															class="px-4 py-3 text-right">
															<button
																class="text-error hover:bg-error/10 p-1 rounded"
																><xIcon icon="trash-2" :size="16" /></button>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</template>

								<!-- Settings Editor -->
								<template v-else-if="activeNode.type === 'setting'">
									<div class="space-y-6 max-w-2xl">
										<div
											v-for="(val, key) in editingContent ||
											activeNode.content"
											:key="key"
											class="grid grid-cols-3 gap-4 items-center">
											<label
												class="text-sm font-medium text-on-surface-variant capitalize"
												>{{
													String(key)
														.replace(/([A-Z])/g, " $1")
														.trim()
												}}</label
											>
											<div class="col-span-2">
												<input
													v-if="editingContent"
													v-model="editingContent[key]"
													class="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" />
												<div
													v-else
													class="px-3 py-2 bg-surface-container rounded-md text-sm text-on-surface"
													>{{ val }}</div
												>
											</div>
										</div>
									</div>
								</template>

								<!-- API Editor -->
								<template v-else-if="activeNode.type === 'api'">
									<div class="space-y-6">
										<div class="flex items-center gap-4">
											<select
												v-if="editingContent"
												v-model="editingContent.method"
												class="px-3 py-2 font-bold rounded-md bg-surface-container border border-outline-variant/50">
												<option>GET</option
												><option>POST</option
												><option>PUT</option
												><option>DELETE</option>
											</select>
											<span
												v-else
												class="px-3 py-1 text-sm font-bold rounded-md"
												:class="getMethodColor(activeNode.content?.method)">
												{{ activeNode.content?.method }}
											</span>

											<input
												v-if="editingContent"
												v-model="editingContent.endpoint"
												class="flex-1 px-3 py-2 font-mono bg-surface-container-lowest border border-outline-variant/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" />
											<span
												v-else
												class="text-lg font-mono text-on-surface flex-1"
												>{{ activeNode.content?.endpoint }}</span
											>

											<!-- Send Button -->
											<button
												v-if="!editingContent"
												@click="sendRequest"
												:disabled="isRequesting"
												class="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 shadow-sm">
												<xIcon 
													type="loader-2"
													v-if="isRequesting"
													:size="16"
													class="animate-spin" />
												<xIcon icon="play" v-else :size="16" />
												Send
											</button>
										</div>

										<div>
											<label
												class="block text-sm font-medium text-on-surface-variant mb-1"
												>Description</label
											>
											<textarea
												v-if="editingContent"
												v-model="editingContent.description"
												rows="2"
												class="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
											<p v-else class="text-on-surface text-sm">{{
												activeNode.content?.description
											}}</p>
										</div>

										<div
											v-if="
												editingContent?.params || activeNode.content?.params
											">
											<label
												class="block text-sm font-medium text-on-surface-variant mb-2"
												>Parameters</label
											>
											<div
												class="bg-surface-container rounded-md p-4 font-mono text-sm">
												<pre>{{
													JSON.stringify(
														editingContent?.params ||
															activeNode.content?.params,
														null,
														2
													)
												}}</pre>
											</div>
										</div>

										<div
											v-if="editingContent?.body || activeNode.content?.body">
											<label
												class="block text-sm font-medium text-on-surface-variant mb-2"
												>Request Body</label
											>
											<div
												class="bg-surface-container rounded-md p-4 font-mono text-sm">
												<pre>{{
													editingContent?.body || activeNode.content?.body
												}}</pre>
											</div>
										</div>

										<!-- Response Section -->
										<div
											v-if="!editingContent"
											class="mt-8 border-t border-outline-variant/50 pt-6">
											<div class="flex items-center justify-between mb-4">
												<h3
													class="text-base font-bold text-on-surface flex items-center gap-2">
													Response
													<span
														v-if="responseStatus"
														class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">
														{{ responseStatus }} OK
													</span>
												</h3>
												<span
													v-if="responseTime"
													class="text-xs text-on-surface-variant font-mono"
													>{{ responseTime }} ms</span
												>
											</div>

											<div
												v-if="isRequesting"
												class="flex flex-col items-center justify-center p-12 text-on-surface-variant bg-surface-container-lowest border border-outline-variant/50 rounded-md">
												<xIcon 
													type="loader-2"
													class="w-8 h-8 animate-spin mb-3 text-primary" />
												<p class="text-sm"
													>Sending request to
													{{ activeEnvironment }}...</p
												>
											</div>
											<div
												v-else-if="responseData"
												class="bg-surface-container-lowest border border-outline-variant/50 rounded-md p-4 font-mono text-sm overflow-x-auto shadow-inner">
												<pre class="text-on-surface">{{
													responseData
												}}</pre>
											</div>
											<div
												v-else
												class="flex items-center justify-center p-12 text-on-surface-variant border border-dashed border-outline-variant/50 rounded-md bg-surface-container-lowest/50">
												Click "Send" to execute the request
											</div>
										</div>
									</div>
								</template>

								<!-- Doc Editor -->
								<template
									v-else-if="
										activeNode.type === 'doc' || activeNode.type === 'code'
									">
									<div class="h-full min-h-[300px]">
										<textarea
											v-if="editingContent"
											v-model="editingContent"
											class="w-full h-full min-h-[300px] p-4 font-mono text-sm bg-surface-container-lowest border border-outline-variant/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"></textarea>
										<div v-else class="prose prose-sm max-w-none">
											<pre
												class="whitespace-pre-wrap font-mono text-sm bg-surface-container-lowest p-4 rounded-md border border-outline-variant/50"
												>{{ activeNode.content }}</pre
											>
										</div>
									</div>
								</template>

								<!-- Default JSON Editor -->
								<template v-else>
									<textarea
										v-if="editingContent"
										:value="
											typeof editingContent === 'string'
												? editingContent
												: JSON.stringify(editingContent, null, 2)
										"
										@input="e => editingContent = (e.target as HTMLTextAreaElement).value"
										class="w-full h-64 p-4 font-mono text-sm bg-surface-container-lowest border border-outline-variant/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
									<pre
										v-else
										class="bg-surface-container p-4 rounded-md font-mono text-sm overflow-x-auto"
										>{{
											typeof activeNode.content === "string"
												? activeNode.content
												: JSON.stringify(activeNode.content, null, 2)
										}}</pre
									>
								</template>
							</div>
						</div>
					</div>
				</template>
			</div>

			<!-- Preview Pane (Only for Folders) -->
			<div
				v-if="showPreview && isFolderType(activeNode.type)"
				class="w-80 flex-shrink-0 border-l border-outline-variant/50 bg-surface-container flex flex-col overflow-y-auto">
				<div
					v-if="!selectedFile"
					class="flex-1 flex flex-col items-center justify-center text-on-surface-variant p-6 text-center">
					<xIcon icon="info" :size="48" class="mb-4 text-outline-variant" />
					<p>Select a resource to preview</p>
				</div>
				<div v-else class="p-6">
					<!-- Preview Content -->
					<div
						class="w-full aspect-square max-w-[120px] mx-auto bg-surface-variant rounded-2xl flex items-center justify-center mb-6 border border-outline-variant/50">
						<xIcon 
										:type="getIcon(selectedFile.type)"
										:size="60"
										:class="getIconColor(selectedFile.type)" />
					</div>

					<!-- Metadata -->
					<h3 class="text-lg font-semibold text-on-surface mb-1 break-words text-center">
						{{ selectedFile.name }}
					</h3>
					<p class="text-sm text-on-surface-variant capitalize mb-6 text-center">{{
						selectedFile.type.replace("_", " ")
					}}</p>

					<div class="space-y-4">
						<div class="border-t border-outline-variant/50 pt-4">
							<h4
								class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
								Information
							</h4>
							<dl class="space-y-3 text-sm">
								<div class="grid grid-cols-3 gap-2">
									<dt class="text-on-surface-variant">Modified</dt>
									<dd class="col-span-2 text-on-surface font-medium">
										{{ formatDate(selectedFile.updatedAt) }}
									</dd>
								</div>
								<div class="grid grid-cols-3 gap-2">
									<dt class="text-on-surface-variant">Path</dt>
									<dd class="col-span-2 text-on-surface font-medium break-all">
										{{ selectedFile.path }}
									</dd>
								</div>
							</dl>
						</div>

						<div
							v-if="selectedFile.content"
							class="border-t border-outline-variant/50 pt-4">
							<h4
								class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
								Quick Preview
							</h4>
							<div
								class="bg-surface-container-lowest p-3 rounded-md border border-outline-variant/50 max-h-40 overflow-y-auto">
								<pre
									class="text-xs font-mono text-on-surface whitespace-pre-wrap"
									>{{
										typeof selectedFile.content === "string"
											? selectedFile.content
											: JSON.stringify(selectedFile.content, null, 2)
									}}</pre
								>
							</div>
						</div>

						<button
							v-if="!isFolderType(selectedFile.type)"
							@click="handleOpenNode(selectedFile)"
							class="w-full mt-4 py-2 bg-primary text-on-primary rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
							Open Editor
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
