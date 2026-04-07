<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [useSystemStore] = await _.$importVue([
    '@/store/index.js'
  ]);
  
  return {
    data() {
      return {
        system: useSystemStore(),
        hoveredAppId: null,
        isDraggingOver: false
      };
    },
    computed: {
      activeApps() {
        return this.system.apps
          .map(app => {
            const windows = this.system.openWindows.filter(w => w.appId === app.id);
            return {
              ...app,
              windows,
              isOpen: windows.length > 0,
              isPinned: this.system.pinnedApps.includes(app.id),
              isActive:
                this.system.activeWindowId &&
                this.system.openWindows.find(w => w.id === this.system.activeWindowId)?.appId === app.id
            };
          })
          .filter(app => app.isOpen || app.isPinned);
      }
    },
    methods: {
      handleAppClick(appId) {
        this.system.openApp(appId);
      },
      focusSpecificWindow(windowId) {
        const win = this.system.openWindows.find(w => w.id === windowId);
        if (win) {
          win.isMinimized = false;
          this.system.focusWindow(windowId);
        }
      },
      openNewWindow(appId) {
        this.system.openApp(appId, true);
      },
      onDragOver(e) {
        e.preventDefault();
        this.isDraggingOver = true;
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "copy";
        }
      },
      onDragLeave(e) {
        this.isDraggingOver = false;
      },
      onDrop(e) {
        e.preventDefault();
        this.isDraggingOver = false;

        // Handle internal app icons
        const appId = e.dataTransfer?.getData("text/plain");
        if (appId) {
          this.system.pinApp(appId);
          return;
        }

        // Handle external files
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          // Create a temporary app for the file
          const fileAppId = "file-" + Date.now();
          this.system.apps.push({
            id: fileAppId,
            name: file.name,
            icon: "File",
            color: "#888888",
            component: "NoteManager" // Open in NoteManager by default
          });
          this.system.pinApp(fileAppId);
        }
      },
      onDragStart(e, appId) {
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", appId);
          e.dataTransfer.setData("action", "unpin");
          e.dataTransfer.effectAllowed = "move";
        }
      }
    }
  };
}
</script>

<template>
	<div
		class="flex items-end gap-2 p-3 bg-surface-container elevation-3 rounded-full relative transition-all duration-300"
		:class="{ 'ring-2 ring-primary/50 bg-surface-container-high': isDraggingOver }"
		@dragover="onDragOver"
		@dragleave="onDragLeave"
		@drop="onDrop">
		<!-- Launcher Button (Always Visible) -->
		<div class="relative m3-dock-item group">
			<div
				class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-m3-extra-small opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap elevation-1">
				Menu
			</div>
			<div
				class="w-full h-full rounded-full flex items-center justify-center transition-colors duration-200 text-on-surface hover:bg-on-surface/8 active:bg-on-surface/12">
				<xIcon name="layout-grid" size="24" />
			</div>
		</div>

		<div class="w-px h-8 bg-outline-variant mx-1 self-center"></div>

		<TransitionGroup name="hero">
			<div
				v-for="app in activeApps"
				:key="app.id"
				class="relative m3-dock-item group"
				draggable="true"
				@dragstart="onDragStart($event, app.id)"
				@mouseenter="hoveredAppId = app.id"
				@mouseleave="hoveredAppId = null"
				@click="handleAppClick(app.id)">
				<!-- Window Previews / Thumbnails -->
				<Transition name="hero">
					<div
						v-if="hoveredAppId === app.id && app.isOpen"
						class="absolute bottom-20 left-1/2 -translate-x-1/2 p-3 bg-surface-container-high rounded-m3-large elevation-4 flex flex-col gap-2 z-[100] min-w-[200px]">
						<div
							class="flex items-center justify-between px-2 pb-2 border-b border-outline-variant">
							<span class="text-xs font-medium text-on-surface-variant">{{
								app.name
							}}</span>
							<button
								@click.stop="openNewWindow(app.id)"
								class="p-1.5 hover:bg-on-surface/8 active:bg-on-surface/12 rounded-full transition-colors group/btn"
								title="Open New Window">
								<xIcon name="plus" size="16" class="text-on-surface-variant group-hover/btn:text-primary" />
							</button>
						</div>

						<div
							class="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
							<div
								v-for="win in app.windows"
								:key="win.id"
								class="flex items-center gap-3 p-2 rounded-m3-medium hover:bg-on-surface/5 active:bg-on-surface/10 cursor-pointer transition-colors group/item"
								@click.stop="focusSpecificWindow(win.id)">
								<div
									class="w-10 h-10 rounded-m3-small flex items-center justify-center bg-surface-container-highest text-primary"
									:style="{ color: app.color }">
									<xIcon :icon="app.icon" size="20"/>
								</div>
								<div class="flex flex-col">
									<span
										class="text-sm font-medium text-on-surface truncate max-w-[120px]"
										>{{ win.title }}</span
									>
									<span class="text-xs text-on-surface-variant">{{
										win.isMinimized ? "Minimized" : "Active"
									}}</span>
								</div>
							</div>
						</div>
					</div>
				</Transition>

				<!-- Tooltip (only if no windows open) -->
				<div
					v-if="!app.isOpen"
					class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-m3-extra-small opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap elevation-1">
					{{ app.name }}
				</div>

				<!-- Icon Container -->
				<div
					class="w-full h-full rounded-full flex items-center justify-center transition-colors duration-200"
					:class="[
						app.isActive
							? 'bg-secondary-container text-on-secondary-container'
							: 'text-on-surface hover:bg-on-surface/8 active:bg-on-surface/12',
						system.lastOpenedAppId === app.id ? 'animate-m3-scale-in' : ''
					]">
					<xIcon :icon="app.icon" :size="24" />
				</div>

				<!-- Indicator Pill -->
				<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
					<div
						v-if="app.isOpen"
						class="h-1 rounded-full transition-all duration-300"
						:class="
							app.isActive ? 'w-4 bg-primary' : 'w-1.5 bg-on-surface-variant'
						"></div>
				</div>
			</div>
		</TransitionGroup>

		<div class="w-px h-8 bg-outline-variant mx-1 self-center"></div>

		<!-- Settings Icon -->
		<div class="m3-dock-item group">
			<div
				class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-m3-extra-small opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap elevation-1">
				Settings
			</div>
			<div
				class="w-full h-full rounded-full flex items-center justify-center text-on-surface hover:bg-on-surface/8 active:bg-on-surface/12 transition-colors duration-200">
				<xIcon name="settings" size="24" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: rgba(0, 0, 0, 0.1);
	border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: rgba(0, 0, 0, 0.2);
}
</style>
