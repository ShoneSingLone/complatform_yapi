<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const mockFileSystem = {
	id: "root",
	name: "Home",
	type: "folder",
	updatedAt: "2026-03-31T10:00:00Z",
	path: "/Home",
	children: [
		{
			id: "docs",
			name: "Documents",
			type: "folder",
			updatedAt: "2026-03-30T14:20:00Z",
			path: "/Home/Documents",
			children: [
				{
					id: "report",
					name: "Q1_Report.pdf",
					type: "document",
					size: 1024 * 1024 * 2.5,
					updatedAt: "2026-03-29T09:15:00Z",
					path: "/Home/Documents/Q1_Report.pdf",
					content: "Quarterly report for Q1 2026. Revenue increased by 15%."
				},
				{
					id: "notes",
					name: "Meeting_Notes.txt",
					type: "document",
					size: 1024 * 15,
					updatedAt: "2026-03-28T16:45:00Z",
					path: "/Home/Documents/Meeting_Notes.txt",
					content: "Action items:\n1. Follow up with marketing.\n2. Review budget."
				}
			]
		},
		{
			id: "pics",
			name: "Pictures",
			type: "folder",
			updatedAt: "2026-03-25T11:10:00Z",
			path: "/Home/Pictures",
			children: [
				{
					id: "vacation",
					name: "Vacation.jpg",
					type: "image",
					size: 1024 * 1024 * 4.2,
					updatedAt: "2026-03-20T08:30:00Z",
					path: "/Home/Pictures/Vacation.jpg",
					url: "https://picsum.photos/seed/vacation/800/600"
				},
				{
					id: "profile",
					name: "Profile.png",
					type: "image",
					size: 1024 * 1024 * 1.1,
					updatedAt: "2026-03-22T14:00:00Z",
					path: "/Home/Pictures/Profile.png",
					url: "https://picsum.photos/seed/profile/400/400"
				}
			]
		},
		{
			id: "projects",
			name: "Projects",
			type: "folder",
			updatedAt: "2026-03-31T09:00:00Z",
			path: "/Home/Projects",
			children: [
				{
					id: "app",
					name: "App.vue",
					type: "code",
					size: 1024 * 3,
					updatedAt: "2026-03-31T09:00:00Z",
					path: "/Home/Projects/App.vue",
					content: "<template>\n  <div>Hello World</div>\n</template>"
				},
				{
					id: "styles",
					name: "styles.css",
					type: "code",
					size: 1024 * 1.5,
					updatedAt: "2026-03-30T10:00:00Z",
					path: "/Home/Projects/styles.css",
					content: "body {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}"
				}
			]
		}
	]
};

	return {
		// system: v1 Desktop Workspace 局部状态（来自 ViewXspace）
		inject: ['system'],
		data() {
			return {
				mockFileSystem: mockFileSystem,
				// State
				tabs: [mockFileSystem],
				activeTabId: mockFileSystem.id,
				selectedFile: null,
				searchQuery: "",
				showPreview: true,
				expandedFolders: new Set([mockFileSystem.id]),
				// Sort State
				sortField: "name",
				sortDirection: "asc"
			};
		},
		computed: {
			activeFolder() {
				return this.tabs.find(t => t.id === this.activeTabId) || this.mockFileSystem;
			},
			filteredAndSortedFiles() {
				let files = this.activeFolder.children || [];

				if (this.searchQuery) {
					const lowerQuery = this.searchQuery.toLowerCase();
					files = files.filter(f => f.name.toLowerCase().includes(lowerQuery));
				}

				return [...files].sort((a, b) => {
					let comparison = 0;

					if ((this.sortField === "name" || this.sortField === "type") && a.type !== b.type) {
						if (a.type === "folder") return -1;
						if (b.type === "folder") return 1;
					}

					switch (this.sortField) {
						case "name":
							comparison = a.name.localeCompare(b.name);
							break;
						case "updatedAt":
							comparison =
								new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
							break;
						case "size":
							comparison = (a.size || 0) - (b.size || 0);
							break;
						case "type":
							comparison = a.type.localeCompare(b.type);
							break;
					}

					return this.sortDirection === "asc" ? comparison : -comparison;
				});
			},
			canNavigateUp() {
				return this.activeFolder.id !== this.mockFileSystem.id;
			}
		},
		methods: {
			// Utils
			formatBytes(bytes, decimals = 2) {
				if (bytes === undefined || bytes === null) return "--";
				if (!+bytes) return "0 Bytes";
				const k = 1024;
				const dm = decimals < 0 ? 0 : decimals;
				const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
				const i = Math.floor(Math.log(bytes) / Math.log(k));
				return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
			},
			formatDate(dateString) {
				try {
					const date = new Date(dateString);
					return date.toLocaleString();
				} catch (e) {
					return dateString;
				}
			},
			// Methods
			handleOpenFolder(folder) {
				if (folder.type !== "folder") return;

				const existingTab = this.tabs.find(t => t.id === folder.id);
				if (existingTab) {
					this.activeTabId = folder.id;
				} else {
					this.tabs.push(folder);
					this.activeTabId = folder.id;
				}
				this.selectedFile = null;
				this.searchQuery = "";
				this.expandedFolders.add(folder.id);
			},
			handleCloseTab(tabId, e) {
				e.stopPropagation();
				this.tabs = this.tabs.filter(t => t.id !== tabId);
				if (this.tabs.length === 0) {
					this.tabs = [this.mockFileSystem];
					this.activeTabId = this.mockFileSystem.id;
				} else if (this.activeTabId === tabId) {
					this.activeTabId = this.tabs[this.tabs.length - 1].id;
				}
			},
			findParentFolder(root, targetId) {
				if (!root.children) return null;
				for (const child of root.children) {
					if (child.id === targetId) return root;
					const found = this.findParentFolder(child, targetId);
					if (found) return found;
				}
				return null;
			},
			handleNavigateUp() {
				if (this.activeFolder.id === this.mockFileSystem.id) return;
				const parent = this.findParentFolder(this.mockFileSystem, this.activeFolder.id);
				if (parent) {
					this.handleOpenFolder(parent);
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
					case "folder":
						return "folder";
					case "image":
						return "image";
					case "document":
						return "file-text";
					case "code":
						return "code";
					case "video":
						return "film";
					default:
						return "file";
				}
			},
			getIconColor(type) {
				switch (type) {
					case "folder":
						return "explore__icon explore__icon--folder";
					case "image":
						return "explore__icon explore__icon--image";
					case "document":
						return "explore__icon explore__icon--document";
					case "code":
						return "explore__icon explore__icon--code";
					case "video":
						return "explore__icon explore__icon--video";
					default:
						return "explore__icon explore__icon--default";
				}
			}
		}
	};
};
</script>

<template>
	<div class="explore v1-module flex flex-col h-full bg-surface text-on-surface font-sans overflow-hidden -m-6">
		<!-- Top Bar -->
		<div class="flex flex-col border-b border-outline-variant/50 bg-surface-container-lowest">
			<!-- Tabs Row -->
			<div
				class="flex items-center bg-surface-container px-2 pt-2 gap-1 overflow-x-auto no-scrollbar">
				<div
					v-for="tab in tabs"
					:key="tab.id"
					@click="activeTabId = tab.id"
					class="group flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] rounded-t-md cursor-pointer border-t border-x border-transparent select-none transition-colors"
					:class="
						activeTabId === tab.id
							? 'bg-surface-container-lowest border-outline-variant/50 text-primary'
							: 'bg-transparent text-on-surface-variant hover:bg-surface-container-high'
					">
					<span class="truncate text-sm font-medium flex-1">{{ tab.name }}</span>
					<button
						@click="e => handleCloseTab(tab.id, e)"
						class="p-0.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-surface-variant transition-all"
						:class="
							activeTabId === tab.id ? 'opacity-100 hover:bg-surface-variant' : ''
						">
						<xIcon icon="x" :size="14" />
					</button>
				</div>
			</div>

			<!-- Toolbar Row -->
			<div class="flex items-center px-4 py-2 gap-4">
				<div class="flex items-center gap-1">
					<button class="explore__toolbar-btn explore__toolbar-btn--disabled" type="button">
						<xIcon icon="chevron-left" :size="20" />
					</button>
					<button class="explore__toolbar-btn explore__toolbar-btn--disabled" type="button">
						<xIcon icon="chevron-right" :size="20" />
					</button>
					<button
						@click="handleNavigateUp"
						:disabled="!canNavigateUp"
						class="explore__toolbar-btn"
						:class="{ 'explore__toolbar-btn--disabled': !canNavigateUp }"
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
						placeholder="Search files..."
						v-model="searchQuery"
						class="explore__search-input block w-full pl-10 pr-3 py-1.5" />
				</div>

				<div class="flex items-center gap-2 ml-auto">
					<button
						@click="showPreview = !showPreview"
						class="explore__toggle-btn"
						:class="{ 'explore__toggle-btn--active': showPreview }"
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
						Quick Access
					</h2>

					<!-- Recursive Tree Component inline simulation -->
					<div class="select-none">
						<div
							class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
							:class="
								activeFolder.id === mockFileSystem.id
									? 'bg-primary-container text-on-primary-container font-medium'
									: 'text-on-surface hover:bg-surface-variant'
							"
							style="padding-left: 8px"
							@click="handleOpenFolder(mockFileSystem)">
							<span
								class="w-4 h-4 flex items-center justify-center mr-1 text-on-surface-variant hover:text-on-surface"
								@click="e => toggleFolder(mockFileSystem.id, e)">
								<xIcon 
													type="chevron-down"
													v-if="expandedFolders.has(mockFileSystem.id)"
													:size="14" />
												<xIcon 
													type="chevron-right" 
													v-else 
													:size="14" />
							</span>
							<span class="mr-2 text-blue-500">
								<xIcon 
													type="folder-open"
													v-if="expandedFolders.has(mockFileSystem.id)"
													:size="16" />
												<xIcon 
													type="folder" 
													v-else 
													:size="16" />
							</span>
							<span class="truncate">{{ mockFileSystem.name }}</span>
						</div>

						<div v-if="expandedFolders.has(mockFileSystem.id)">
							<template v-for="child in mockFileSystem.children" :key="child.id">
								<div v-if="child.type === 'folder'" class="select-none">
									<div
										class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
										:class="
											activeFolder.id === child.id
												? 'bg-primary-container text-on-primary-container font-medium'
												: 'text-on-surface hover:bg-surface-variant'
										"
										style="padding-left: 20px"
										@click="handleOpenFolder(child)">
										<span
											class="w-4 h-4 flex items-center justify-center mr-1 text-on-surface-variant hover:text-on-surface"
											@click="e => toggleFolder(child.id, e)">
											<template
												v-if="
													child.children?.some(c => c.type === 'folder')
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
										<span class="mr-2 text-blue-500">
											<xIcon 
														type="folder-open"
														v-if="expandedFolders.has(child.id)"
														:size="16" />
													<xIcon 
														type="folder" 
														v-else 
														:size="16" />
										</span>
										<span class="truncate">{{ child.name }}</span>
									</div>

									<div v-if="expandedFolders.has(child.id) && child.children">
										<template
											v-for="subchild in child.children"
											:key="subchild.id">
											<div
												v-if="subchild.type === 'folder'"
												class="select-none">
												<div
													class="flex items-center py-1 px-2 cursor-pointer rounded-md text-sm transition-colors"
													:class="
														activeFolder.id === subchild.id
															? 'bg-primary-container text-on-primary-container font-medium'
															: 'text-on-surface hover:bg-surface-variant'
													"
													style="padding-left: 32px"
													@click="handleOpenFolder(subchild)">
													<span
														class="w-4 h-4 flex items-center justify-center mr-1"></span>
													<span class="mr-2 text-blue-500">
														<xIcon icon="folder" :size="16" />
													</span>
													<span class="truncate">{{
														subchild.name
													}}</span>
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
						v-for="(part, index) in activeFolder.path.split('/').filter(Boolean)"
						:key="index">
						<span
							class="hover:text-primary cursor-pointer transition-colors"
							:class="
								index === activeFolder.path.split('/').filter(Boolean).length - 1
									? 'font-semibold text-on-surface'
									: ''
							">
							{{ part }}
						</span>
						<span
							v-if="index < activeFolder.path.split('/').filter(Boolean).length - 1"
							class="mx-2 text-on-surface-variant/50"
							>/</span
						>
					</template>
				</div>

				<!-- Table Header -->
				<div
					class="grid grid-cols-12 gap-4 px-4 py-2 border-b border-outline-variant/50 text-xs font-medium text-on-surface-variant uppercase tracking-wider bg-surface-container select-none">
					<div
						class="col-span-6 flex items-center cursor-pointer hover:text-on-surface transition-colors"
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
					<div
						class="col-span-1 flex items-center justify-end cursor-pointer hover:text-on-surface transition-colors"
						@click="handleSort('size')">
						Size
						<xIcon 
									type="arrow-up"
									v-if="sortField === 'size' && sortDirection === 'asc'"
									:size="12"
									class="ml-1" />
								<xIcon 
									type="arrow-down"
									v-if="sortField === 'size' && sortDirection === 'desc'"
									:size="12"
									class="ml-1" />
					</div>
				</div>

				<!-- File List -->
				<div class="flex-1 overflow-y-auto" @click="selectedFile = null">
					<div
						v-if="filteredAndSortedFiles.length === 0"
							class="explore__empty-state flex flex-col items-center justify-center h-full">
						<xIcon icon="folder" :size="48" class="text-outline-variant mb-2" />
						<p>This folder is empty</p>
					</div>
					<div v-else class="py-1">
						<div
							v-for="file in filteredAndSortedFiles"
							:key="file.id"
							@click.stop="selectedFile = file"
							@dblclick.stop="file.type === 'folder' ? handleOpenFolder(file) : null"
							class="grid grid-cols-12 gap-4 px-4 py-2 text-sm items-center cursor-pointer border-b border-transparent hover:bg-surface-variant/50 select-none transition-colors"
							:class="
								selectedFile?.id === file.id
									? 'bg-primary-container/50 border-primary/10'
									: ''
							">
							<div class="col-span-6 flex items-center gap-3 overflow-hidden">
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
								{{ file.type }}
							</div>
							<div class="col-span-1 text-on-surface-variant text-right truncate">
								{{ file.type === "folder" ? "--" : formatBytes(file.size) }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Preview Pane -->
			<div
				v-if="showPreview"
				class="w-80 flex-shrink-0 border-l border-outline-variant/50 bg-surface-container flex flex-col overflow-y-auto">
				<div
					v-if="!selectedFile"
					class="flex-1 flex flex-col items-center justify-center text-on-surface-variant p-6 text-center">
					<xIcon icon="info" :size="48" class="mb-4 text-outline-variant" />
					<p>Select a file to preview</p>
				</div>
				<div v-else class="p-6">
					<!-- Preview Content -->
					<div
						v-if="selectedFile.type === 'image'"
						class="w-full aspect-video bg-surface-variant rounded-lg overflow-hidden border border-outline-variant/50 flex items-center justify-center mb-6">
						<img
							v-if="selectedFile.url"
							:src="selectedFile.url"
							:alt="selectedFile.name"
							class="object-contain w-full h-full" />
						<xIcon v-else icon="image" :size="64" class="text-outline-variant" />
					</div>
					<div
						v-else-if="selectedFile.type === 'document' || selectedFile.type === 'code'"
						class="explore__preview-code w-full p-4 mb-6 overflow-hidden">
						<pre
							class="text-xs text-on-surface whitespace-pre-wrap font-mono overflow-y-auto max-h-64"
							>{{ selectedFile.content || "No content available." }}</pre
						>
					</div>
					<div
						v-else-if="selectedFile.type === 'folder'"
						class="explore__preview-folder w-full aspect-square max-w-[160px] mx-auto flex items-center justify-center mb-6">
						<xIcon icon="folder" :size="80" class="explore__icon explore__icon--folder" />
					</div>
					<div
						v-else
						class="explore__preview-generic w-full aspect-square max-w-[160px] mx-auto flex items-center justify-center mb-6">
						<xIcon icon="file" :size="80" class="text-on-surface-variant" />
					</div>

					<!-- Metadata -->
					<h3 class="text-lg font-semibold text-on-surface mb-1 break-words">
						{{ selectedFile.name }}
					</h3>
					<p class="text-sm text-on-surface-variant capitalize mb-6">{{
						selectedFile.type
					}}</p>

					<div class="space-y-4">
						<div class="border-t border-outline-variant/50 pt-4">
							<h4
								class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
								Information
							</h4>
							<dl class="space-y-3 text-sm">
								<div class="grid grid-cols-3 gap-2">
									<dt class="text-on-surface-variant">Size</dt>
									<dd class="col-span-2 text-on-surface font-medium">
										{{
											selectedFile.type === "folder"
												? "--"
												: formatBytes(selectedFile.size)
										}}
									</dd>
								</div>
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
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.explore {
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

  &__search-input {
    border: 1px solid color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
    border-radius: 10px;
    background: var(--color-surface-container-lowest);
    color: var(--color-on-surface);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      border-color: var(--el-color-primary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--el-color-primary) 16%, transparent);
    }
  }

  &__empty-state {
    color: var(--color-on-surface-variant);
  }

  &__preview-code,
  &__preview-folder,
  &__preview-generic {
    border-radius: 18px;
    border: 1px solid color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
    background: var(--color-surface-container-lowest);
  }

  &__preview-folder {
    background: color-mix(in srgb, var(--color-primary-container) 42%, var(--color-surface-container-lowest));
    border-color: color-mix(in srgb, var(--color-primary) 22%, transparent);
  }

  &__preview-generic {
    background: var(--color-surface-variant);
  }

  &__icon--folder,
  &__icon--document {
    color: var(--el-color-primary);
  }

  &__icon--image {
    color: var(--el-color-info-dark-2);
  }

  &__icon--code {
    color: var(--el-color-warning-dark-2);
  }

  &__icon--video {
    color: var(--el-color-danger);
  }

  &__icon--default {
    color: var(--color-on-surface-variant);
  }
}
</style>
