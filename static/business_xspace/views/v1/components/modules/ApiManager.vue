<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
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
                  '{\n  "type": "object",\n  "properties": {\n    "id": { "type": "string" },\n    "name": { "type": "string" },\n    "email": { "type": "string", "format": "email" }\n  },\n  "required": ["id", "name"]\n}',
              },
            ],
          },
        ],
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
              createdAt: "2025-01-01",
            },
          },
          {
            id: "gb_members",
            name: "Group Members",
            type: "member_list",
            updatedAt: "2026-03-31T10:00:00Z",
            path: "/API Workspaces/Backend Team/Group Members",
            content: [
              {
                id: 1,
                name: "Alice Smith",
                role: "Admin",
                email: "alice@example.com",
              },
              {
                id: 2,
                name: "Bob Jones",
                role: "Developer",
                email: "bob@example.com",
              },
            ],
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
                  "# Architecture\n\nOur system is based on Node.js microservices communicating via gRPC.",
              },
            ],
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
                            { name: "page", type: "number", default: 1 },
                          ],
                        },
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
                          body: '{\n  "name": "string",\n  "email": "string"\n}',
                        },
                      },
                    ],
                  },
                  {
                    id: "pm_docs",
                    name: "Documentation",
                    type: "doc_folder",
                    updatedAt: "2026-03-31T10:00:00Z",
                    path: "/API Workspaces/Backend Team/Projects/Main API/Documentation",
                    children: [],
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
                      stages: ["Build", "Test", "Deploy"],
                    },
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
                      baseUrl: "https://api.example.com",
                    },
                  },
                  {
                    id: "pm_members",
                    name: "Project Members",
                    type: "member_list",
                    updatedAt: "2026-03-31T10:00:00Z",
                    path: "/API Workspaces/Backend Team/Projects/Main API/Project Members",
                    content: [{ id: 1, name: "Alice Smith", role: "Owner" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return {
    props: {
      windowData: Object,
    },
    // system: v1 Desktop Workspace 局部状态（来自 ViewXspace）
    inject: ["system"],
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
        editingContent: null,
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
          files = files.filter((f) =>
            f.name.toLowerCase().includes(lowerQuery),
          );
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
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime();
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
      },
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
        return [
          "group",
          "project",
          "api_folder",
          "doc_folder",
          "folder",
        ].includes(type);
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
        const parent = this.findParentNode(
          this.mockApiData,
          this.activeNode.id,
        );
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
            return "api-manager__icon api-manager__icon--group";
          case "project":
            return "api-manager__icon api-manager__icon--project";
          case "api_folder":
            return "api-manager__icon api-manager__icon--api-folder";
          case "doc_folder":
            return "api-manager__icon api-manager__icon--doc-folder";
          case "folder":
            return "api-manager__icon api-manager__icon--folder";
          case "api":
            return "api-manager__icon api-manager__icon--api";
          case "doc":
            return "api-manager__icon api-manager__icon--doc";
          case "code":
            return "api-manager__icon api-manager__icon--code";
          case "member_list":
            return "api-manager__icon api-manager__icon--member-list";
          case "setting":
            return "api-manager__icon api-manager__icon--setting";
          case "cicd":
            return "api-manager__icon api-manager__icon--cicd";
          default:
            return "api-manager__icon api-manager__icon--default";
        }
      },
      // Editors Methods
      startEditing() {
        this.editingContent = JSON.parse(
          JSON.stringify(this.activeNode.content || {}),
        );
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
            return "api-manager__method-badge api-manager__method-badge--get";
          case "POST":
            return "api-manager__method-badge api-manager__method-badge--post";
          case "PUT":
            return "api-manager__method-badge api-manager__method-badge--put";
          case "DELETE":
            return "api-manager__method-badge api-manager__method-badge--delete";
          default:
            return "api-manager__method-badge api-manager__method-badge--default";
        }
      },
      handlePlainTextInput(event) {
        this.editingContent = event.target.value;
      },
      // API Execution
      sendRequest() {
        this.isRequesting = true;
        this.responseData = null;
        this.responseStatus = null;
        this.responseTime = null;

        const startTime = performance.now();

        // Simulate network request
        setTimeout(
          () => {
            this.isRequesting = false;
            this.responseStatus = 200;
            this.responseTime = Math.round(performance.now() - startTime);

            // Generate mock response based on endpoint
            const endpoint = this.activeNode.content?.endpoint || "";
            let mockResponse = {};

            if (
              endpoint.includes("users") &&
              this.activeNode.content?.method === "GET"
            ) {
              mockResponse = {
                status: "success",
                environment: this.activeEnvironment,
                data: [
                  { id: 1, name: "Alice Smith", email: "alice@example.com" },
                  { id: 2, name: "Bob Jones", email: "bob@example.com" },
                ],
                meta: { total: 2, page: 1 },
              };
            } else if (
              endpoint.includes("users") &&
              this.activeNode.content?.method === "POST"
            ) {
              mockResponse = {
                status: "success",
                environment: this.activeEnvironment,
                message: "User created successfully",
                data: { id: 3, name: "New User", email: "new@example.com" },
              };
            } else {
              mockResponse = {
                status: "success",
                environment: this.activeEnvironment,
                message: "Request executed successfully",
                timestamp: new Date().toISOString(),
              };
            }

            this.responseData = JSON.stringify(mockResponse, null, 2);
          },
          800 + Math.random() * 500,
        );
      },
    },
  };

}

</script>

<template>
	<div class="api-manager v1-module flex flex-col h-full bg-surface text-on-surface font-sans overflow-hidden -m-6">
		<!-- Top Bar -->
		<div class="flex flex-col border-b border-outline-variant/50 bg-surface-container-lowest">
			<!-- Toolbar Row -->
			<div class="flex items-center px-4 py-2 gap-4">
				<div class="flex items-center gap-1">
					<button class="api-manager__toolbar-btn api-manager__toolbar-btn--disabled" type="button">
						<xIcon icon="chevron-left" :size="20" />
					</button>
					<button class="api-manager__toolbar-btn api-manager__toolbar-btn--disabled" type="button">
						<xIcon icon="chevron-right" :size="20" />
					</button>
					<button
						@click="handleNavigateUp"
						:disabled="!canNavigateUp"
						class="api-manager__toolbar-btn"
						:class="{ 'api-manager__toolbar-btn--disabled': !canNavigateUp }"
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
						class="api-manager__search-input block w-full pl-10 pr-3 py-1.5" />
				</div>

				<div class="flex items-center gap-3 ml-auto">
					<!-- Environment Switcher -->
					<div class="api-manager__select-shell flex items-center px-3 py-1.5">
						<xIcon icon="globe" :size="16" class="text-on-surface-variant mr-2" />
						<select
							v-model="activeEnvironment"
							class="api-manager__select text-sm font-medium">
							<option v-for="env in environments" :key="env" :value="env">{{
								env
							}}</option>
						</select>
					</div>

					<div class="w-px h-6 bg-outline-variant/50"></div>

					<button
						@click="showPreview = !showPreview"
						class="api-manager__toggle-btn"
						:class="{ 'api-manager__toggle-btn--active': showPreview }"
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
							class="api-manager__empty-state flex flex-col items-center justify-center h-full">
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
							class="api-manager__editor-card max-w-4xl mx-auto overflow-hidden">
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
											class="api-manager__action-btn api-manager__action-btn--ghost"
											>Cancel</button
										>
										<button
											@click="saveEditing"
											class="api-manager__action-btn api-manager__action-btn--primary flex items-center gap-2">
											<xIcon icon="save" :size="16" /> Save
										</button>
									</template>
									<template v-else>
										<button
											@click="startEditing"
											class="api-manager__action-btn api-manager__action-btn--secondary flex items-center gap-2">
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
																class="api-manager__field-input api-manager__field-input--inline" />
															<span v-else>{{ member.name }}</span>
														</td>
														<td class="px-4 py-3">
															<select
																v-if="editingContent"
																v-model="member.role"
																class="api-manager__field-input api-manager__field-input--inline">
																<option>Admin</option>
																<option>Developer</option>
																<option>Viewer</option>
																<option>Owner</option>
															</select>
															<span
																v-else
																class="api-manager__inline-badge"
																>{{ member.role }}</span
															>
														</td>
														<td
															class="px-4 py-3 text-on-surface-variant">
															<input
																v-if="editingContent"
																v-model="member.email"
																class="api-manager__field-input api-manager__field-input--inline" />
															<span v-else>{{
																member.email || "--"
															}}</span>
														</td>
														<td
															v-if="editingContent"
															class="px-4 py-3 text-right">
															<button
																class="api-manager__icon-action"
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
													class="api-manager__field-input w-full px-3 py-2" />
												<div
													v-else
													class="api-manager__field-value px-3 py-2 text-sm"
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
												class="api-manager__field-input px-3 py-2 font-bold">
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
												class="api-manager__field-input api-manager__field-input--code flex-1 px-3 py-2 font-mono" />
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
												class="api-manager__action-btn api-manager__action-btn--primary flex items-center gap-2">
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
												class="api-manager__field-input w-full px-3 py-2"></textarea>
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
												class="api-manager__code-block p-4 font-mono text-sm">
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
												class="api-manager__code-block p-4 font-mono text-sm">
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
														class="api-manager__status-badge">
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
												class="api-manager__state-panel flex flex-col items-center justify-center p-12">
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
												class="api-manager__state-panel api-manager__state-panel--code p-4 font-mono text-sm overflow-x-auto">
												<pre class="text-on-surface">{{
													responseData
												}}</pre>
											</div>
											<div
												v-else
												class="api-manager__state-panel api-manager__state-panel--dashed flex items-center justify-center p-12">
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
											class="api-manager__field-input api-manager__field-input--code w-full h-full min-h-[300px] p-4 font-mono text-sm resize-y"></textarea>
										<div v-else class="prose prose-sm max-w-none">
											<pre
												class="api-manager__code-block whitespace-pre-wrap font-mono text-sm p-4"
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
										@input="handlePlainTextInput"
										class="api-manager__field-input api-manager__field-input--code w-full h-64 p-4 font-mono text-sm"></textarea>
									<pre
										v-else
										class="api-manager__code-block p-4 font-mono text-sm overflow-x-auto"
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
								class="api-manager__code-block p-3 max-h-40 overflow-y-auto">
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
							class="api-manager__action-btn api-manager__action-btn--primary api-manager__preview-action w-full mt-4">
							Open Editor
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.api-manager {
  &__toolbar-btn,
  &__toggle-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    min-height: 32px;
    border: 1px solid color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
    border-radius: 10px;
    background: var(--color-surface-container-lowest);
    color: var(--color-on-surface-variant);
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    &:hover {
      background: var(--color-surface-container);
    }
  }

  &__toolbar-btn--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  &__toggle-btn--active {
    background: var(--color-primary-container);
    border-color: color-mix(in srgb, var(--color-primary) 22%, transparent);
    color: var(--color-on-primary-container);
  }

  &__search-input,
  &__field-input,
  &__select-shell {
    border: 1px solid color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
    border-radius: 10px;
    background: var(--color-surface-container-lowest);
    color: var(--color-on-surface);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  &__search-input,
  &__field-input {
    outline: none;

    &:focus {
      border-color: var(--el-color-primary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--el-color-primary) 16%, transparent);
    }
  }

  &__field-input--inline {
    padding: 0 0 4px;
    border-width: 0 0 1px;
    border-radius: 0;
    background: transparent;
  }

  &__field-input--code {
    line-height: 1.6;
  }

  &__select-shell {
    background: var(--color-surface-container);
  }

  &__select {
    width: 100%;
    border: 0;
    background: transparent;
    color: var(--color-on-surface);
    cursor: pointer;
    outline: none;
  }

  &__editor-card {
    background: var(--color-surface-container-lowest);
    border: 1px solid color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
    border-radius: 16px;
    box-shadow: var(--el-box-shadow);
  }

  &__action-btn {
    min-height: 36px;
    padding: 0 16px;
    border-radius: 10px;
    border: 1px solid transparent;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease,
      box-shadow 0.2s ease;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &__action-btn--primary {
    background: var(--el-color-primary);
    color: var(--color-on-primary);
    box-shadow: var(--el-box-shadow-light);

    &:hover {
      background: var(--el-color-primary-hover);
    }
  }

  &__action-btn--secondary {
    background: var(--color-surface-container-lowest);
    border-color: color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
    color: var(--color-on-surface);

    &:hover {
      background: var(--color-surface-variant);
    }
  }

  &__action-btn--ghost {
    background: transparent;
    color: var(--color-on-surface-variant);

    &:hover {
      background: var(--color-surface-variant);
      color: var(--color-on-surface);
    }
  }

  &__preview-action {
    justify-content: center;
  }

  &__inline-badge,
  &__status-badge,
  &__method-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-weight: 700;
  }

  &__inline-badge {
    padding: 4px 10px;
    background: var(--color-surface-variant);
    color: var(--color-on-surface-variant);
    font-size: 12px;
  }

  &__status-badge,
  &__method-badge {
    padding: 4px 10px;
    font-size: 12px;
  }

  &__method-badge--get,
  &__icon--group,
  &__icon--member-list {
    color: var(--el-color-primary);
  }

  &__method-badge--get {
    background: var(--el-color-primary-light-9);
  }

  &__method-badge--post,
  &__icon--api-folder,
  &__icon--api {
    color: var(--el-color-success-dark-2);
  }

  &__method-badge--post {
    background: var(--el-color-success-light-9);
  }

  &__method-badge--put,
  &__icon--doc-folder,
  &__icon--doc {
    color: var(--el-color-warning-dark-2);
  }

  &__method-badge--put {
    background: var(--el-color-warning-light-9);
  }

  &__method-badge--delete {
    background: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
  }

  &__method-badge--default,
  &__icon--folder,
  &__icon--setting,
  &__icon--default {
    background: var(--el-fill-color-light);
    color: var(--color-on-surface-variant);
  }

  &__icon--project {
    color: var(--el-color-primary-dark-2);
  }

  &__icon--code {
    color: var(--el-color-warning-dark-2);
  }

  &__icon--cicd {
    color: var(--el-color-info-dark-2);
  }

  &__status-badge {
    background: var(--el-color-success-light-9);
    color: var(--el-color-success-dark-2);
  }

  &__state-panel,
  &__code-block,
  &__field-value {
    background: var(--color-surface-container-lowest);
    border: 1px solid color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
    border-radius: 12px;
  }

  &__state-panel {
    color: var(--color-on-surface-variant);
  }

  &__state-panel--code {
    box-shadow: inset 0 1px 3px rgba(15, 23, 42, 0.08);
  }

  &__state-panel--dashed {
    border-style: dashed;
  }

  &__empty-state {
    color: var(--color-on-surface-variant);
  }

  &__icon-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--el-color-danger);
    cursor: pointer;

    &:hover {
      background: var(--el-color-danger-light-9);
    }
  }
}
</style>
