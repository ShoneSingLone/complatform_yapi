<template>
  <div
    class="flex items-center gap-2 p-2 bg-surface-container elevation-2 rounded-m3-medium relative transition-all duration-300"
    :class="{ 'ring-2 ring-primary/50 bg-surface-container-high': isDraggingOver }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop">
    <!-- Launcher Button -->
    <div class="relative dock-item group">
      <div
        class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-m3-small opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap elevation-1">
        Menu
      </div>
      <div
        class="w-full h-full rounded-m3-small flex items-center justify-center transition-colors duration-200 text-on-surface hover:bg-on-surface/8 active:bg-on-surface/12">
        <xIcon icon="layout-grid" size="20" />
      </div>
    </div>

    <div class="w-px h-6 bg-outline-variant mx-1 self-center"></div>

    <TransitionGroup name="hero">
      <div
        v-for="app in activeApps"
        :key="app.id"
        class="relative dock-item group"
        draggable="true"
        @dragstart="onDragStart($event, app.id)"
        @mouseenter="hoveredAppId = app.id"
        @mouseleave="hoveredAppId = null"
        @click="handleAppClick(app.id)">
        <!-- Window Previews -->
        <Transition name="hero">
          <div
            v-if="hoveredAppId === app.id && app.isOpen"
            class="absolute bottom-16 left-1/2 -translate-x-1/2 p-2 bg-surface-container-high rounded-m3-medium elevation-3 flex flex-col gap-1 z-[100] min-w-[180px]">
            <div
              class="flex items-center justify-between px-2 pb-1 border-b border-outline-variant">
              <span class="text-xs font-medium text-on-surface-variant">{{ app.name }}</span>
              <button
                @click.stop="openNewWindow(app.id)"
                class="p-1 hover:bg-on-surface/8 active:bg-on-surface/12 rounded-full transition-colors group/btn"
                title="Open New Window">
                <xIcon icon="plus" size="14" class="text-on-surface-variant group-hover/btn:text-primary" />
              </button>
            </div>

            <div
              class="flex flex-col gap-1 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
              <div
                v-for="win in app.windows"
                :key="win.id"
                class="flex items-center gap-2 p-1.5 rounded-m3-small hover:bg-on-surface/5 active:bg-on-surface/10 cursor-pointer transition-colors group/item"
                @click.stop="focusSpecificWindow(win.id)">
                <div
                  class="w-8 h-8 rounded-m3-small flex items-center justify-center bg-surface-container-highest text-primary"
                  :style="{ color: app.color }">
                  <xIcon :icon="app.icon" size="16"/>
                </div>
                <div class="flex flex-col flex-1">
                  <span class="text-sm font-medium text-on-surface truncate">{{ win.title }}</span>
                  <span class="text-xs text-on-surface-variant">{{ win.isMinimized ? "Minimized" : "Active" }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Tooltip -->
        <div
          v-if="!app.isOpen"
          class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-m3-small opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap elevation-1">
          {{ app.name }}
        </div>

        <!-- Icon Container -->
        <div
          class="w-full h-full rounded-m3-small flex items-center justify-center transition-colors duration-200"
          :class="[
            app.isActive
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface hover:bg-on-surface/8 active:bg-on-surface/12',
            system.lastOpenedAppId === app.id ? 'animate-dock-scale' : ''
          ]">
          <xIcon :icon="app.icon" :size="20" />
        </div>

        <!-- Indicator Pill -->
        <div class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
          <div
            v-if="app.isOpen"
            class="h-1 rounded-full transition-all duration-300"
            :class="app.isActive ? 'w-3 bg-primary' : 'w-1 bg-on-surface-variant'">
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div class="w-px h-6 bg-outline-variant mx-1 self-center"></div>

    <!-- Settings Icon -->
    <div class="dock-item group">
      <div
        class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-m3-small opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap elevation-1">
        Settings
      </div>
      <div
        class="w-full h-full rounded-m3-small flex items-center justify-center text-on-surface hover:bg-on-surface/8 active:bg-on-surface/12 transition-colors duration-200">
        <xIcon icon="settings" size="20" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    // system: v1 Desktop Workspace 局部状态（来自 ViewXspace）
    inject: ['system'],
    data() {
      return {
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

<style lang="less">
/* Dock 样式 */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 8px;
}

.p-2 {
  padding: 8px;
}

.bg-surface-container {
  background-color: var(--color-surface-container);
}

.elevation-2 {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
}

.rounded-m3-medium {
  border-radius: 12px;
}

.relative {
  position: relative;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.ring-2 {
  box-shadow: 0 0 0 2px rgba(0, 97, 164, 0.5);
}

.ring-primary\/50 {
  box-shadow: 0 0 0 2px rgba(0, 97, 164, 0.5);
}

.bg-surface-container-high {
  background-color: var(--color-surface-container-high);
}

.dock-item {
  width: 40px;
  height: 40px;
}

.group {
  position: relative;
}

.absolute {
  position: absolute;
}

.-top-10 {
  top: -40px;
}

.left-1\/2 {
  left: 50%;
}

.-translate-x-1\/2 {
  transform: translateX(-50%);
}

.px-2 {
  padding-left: 8px;
  padding-right: 8px;
}

.py-1 {
  padding-top: 4px;
  padding-bottom: 4px;
}

.bg-surface-variant {
  background-color: var(--color-surface-variant);
}

.text-on-surface-variant {
  color: var(--color-on-surface-variant);
}

.text-xs {
  font-size: 0.75rem;
}

.font-medium {
  font-weight: 500;
}

.rounded-m3-small {
  border-radius: 8px;
}

.opacity-0 {
  opacity: 0;
}

.group-hover\:opacity-100:hover {
  opacity: 1;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.pointer-events-none {
  pointer-events: none;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.elevation-1 {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.justify-center {
  justify-content: center;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.text-on-surface {
  color: var(--color-on-surface);
}

.hover\:bg-on-surface\/8:hover {
  background-color: rgba(26, 28, 30, 0.08);
}

.active\:bg-on-surface\/12:active {
  background-color: rgba(26, 28, 30, 0.12);
}

.w-px {
  width: 1px;
}

.h-6 {
  height: 24px;
}

.bg-outline-variant {
  background-color: var(--color-outline-variant);
}

.mx-1 {
  margin-left: 4px;
  margin-right: 4px;
}

.self-center {
  align-self: center;
}

.bottom-16 {
  bottom: 64px;
}

.z-\[100\] {
  z-index: 100;
}

.min-w-\[180px\] {
  min-width: 180px;
}

.pb-1 {
  padding-bottom: 4px;
}

.border-b {
  border-bottom: 1px solid;
}

.border-outline-variant {
  border-color: var(--color-outline-variant);
}

.p-1 {
  padding: 4px;
}

.rounded-full {
  border-radius: 9999px;
}

.group\/btn {
  position: relative;
}

.text-primary {
  color: var(--color-primary);
}

.flex-col {
  flex-direction: column;
}

.gap-1 {
  gap: 4px;
}

.max-h-\[250px\] {
  max-height: 250px;
}

.overflow-y-auto {
  overflow-y: auto;
}

.pr-1 {
  padding-right: 4px;
}

.p-1\.5 {
  padding: 6px;
}

.hover\:bg-on-surface\/5:hover {
  background-color: rgba(26, 28, 30, 0.05);
}

.active\:bg-on-surface\/10:active {
  background-color: rgba(26, 28, 30, 0.1);
}

.cursor-pointer {
  cursor: pointer;
}

.group\/item {
  position: relative;
}

.w-8 {
  width: 32px;
}

.h-8 {
  height: 32px;
}

.text-sm {
  font-size: 0.875rem;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flex-1 {
  flex: 1;
}

.-bottom-0\.5 {
  bottom: -2px;
}

.h-1 {
  height: 4px;
}

.w-3 {
  width: 12px;
}

.w-1 {
  width: 4px;
}

.bg-primary {
  background-color: var(--color-primary);
}

.animate-dock-scale {
  animation: dock-scale 0.2s ease-out;
}

@keyframes dock-scale {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
