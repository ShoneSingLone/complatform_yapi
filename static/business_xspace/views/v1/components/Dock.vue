<template>
  <div
    class="dock elevation-2"
    :class="{ 'dock--dragging': isDraggingOver }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop">
    <!-- Launcher Button -->
    <div class="dock__item dock__launcher group">
      <div class="dock__tooltip">
        Menu
      </div>
      <div class="dock__item-content">
        <xIcon icon="_layout_grid" size="20" />
      </div>
    </div>

    <div class="dock__separator"></div>

    <TransitionGroup name="hero">
      <div
        v-for="app in activeApps"
        :key="app.id"
        class="dock__item group"
        :class="{
          'dock__item--active': app.isActive,
          'dock__item--pinned': app.isPinned,
          'dock__item--animate': system.lastOpenedAppId === app.id
        }"
        draggable="true"
        @dragstart="onDragStart($event, app.id)"
        @mouseenter="hoveredAppId = app.id"
        @mouseleave="hoveredAppId = null"
        @click="handleAppClick(app.id)">
        <!-- Window Previews -->
        <Transition name="hero">
          <div
            v-if="hoveredAppId === app.id && app.isOpen"
            class="dock__preview">
            <div class="dock__preview-header">
              <span class="dock__preview-title">{{ app.name }}</span>
              <button
                @click.stop="openNewWindow(app.id)"
                class="dock__preview-add-btn"
                title="Open New Window">
                <xIcon icon="plus" size="14" />
              </button>
            </div>

            <div class="dock__preview-list">
              <div
                v-for="win in app.windows"
                :key="win.id"
                class="dock__preview-item"
                @click.stop="focusSpecificWindow(win.id)">
                <div
                  class="dock__preview-item-icon"
                  :style="{ color: app.color }">
                  <xIcon :icon="app.icon" size="16"/>
                </div>
                <div class="dock__preview-item-content">
                  <span class="dock__preview-item-title">{{ win.title }}</span>
                  <span class="dock__preview-item-status">{{ win.isMinimized ? "Minimized" : "Active" }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Tooltip -->
        <div
          v-if="!app.isOpen"
          class="dock__tooltip">
          {{ app.name }}
        </div>

        <!-- Icon Container -->
        <div
          class="dock__item-content"
          :class="{
            'dock__item-content--active': app.isActive
          }">
          <xIcon :icon="app.icon" :size="20" />
        </div>

        <!-- Indicator Pill -->
        <div class="dock__indicator">
          <div
            v-if="app.isOpen"
            class="dock__indicator-dot"
            :class="{
              'dock__indicator-dot--active': app.isActive
            }">
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div class="dock__separator"></div>

    <!-- Settings Icon -->
    <div class="dock__item dock__settings group">
      <div class="dock__tooltip">
        Settings
      </div>
      <div class="dock__item-content">
        <xIcon icon="_settings" size="20" />
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
.dock {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: var(--color-surface-container);
  border-radius: 12px;
  position: relative;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &--dragging {
    background-color: var(--color-surface-container-high);
    box-shadow: 0 0 0 2px rgba(0, 97, 164, 0.5);
  }
}

.dock__item {
  width: 40px;
  height: 40px;
  position: relative;

  &--active {
    .dock__item-content {
      background-color: var(--color-secondary-container);
      color: var(--color-on-secondary-container);
    }
  }

  &--pinned {
    // 固定状态的样式扩展点
  }

  &--animate {
    animation: dock-scale 0.2s ease-out;
  }
}

.dock__item-content {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-on-surface);
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:not(&--active):hover {
    background-color: rgba(26, 28, 30, 0.08);
  }

  &:not(&--active):active {
    background-color: rgba(26, 28, 30, 0.12);
  }

  &--active {
    background-color: var(--color-secondary-container);
    color: var(--color-on-secondary-container);
  }
}

.dock__separator {
  width: 1px;
  height: 24px;
  background-color: var(--color-outline-variant);
  margin: 0 4px;
  align-self: center;
}

.dock__tooltip {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: var(--color-surface-variant);
  color: var(--color-on-surface-variant);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);

  .group:hover & {
    opacity: 1;
  }
}

.dock__preview {
  position: absolute;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: var(--color-surface-container-high);
  border-radius: 12px;
  elevation: 3;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 100;
  min-width: 180px;
}

.dock__preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--color-outline-variant);
}

.dock__preview-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-on-surface-variant);
}

.dock__preview-add-btn {
  padding: 4px;
  border-radius: 9999px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(26, 28, 30, 0.08);

    .xIcon {
      color: var(--color-primary);
    }
  }

  &:active {
    background-color: rgba(26, 28, 30, 0.12);
  }

  .xIcon {
    color: var(--color-on-surface-variant);
  }
}

.dock__preview-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}

.dock__preview-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: rgba(26, 28, 30, 0.05);
  }

  &:active {
    background-color: rgba(26, 28, 30, 0.1);
  }
}

.dock__preview-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-container-highest);
  color: var(--color-primary);
}

.dock__preview-item-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.dock__preview-item-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dock__preview-item-status {
  font-size: 0.75rem;
  color: var(--color-on-surface-variant);
}

.dock__indicator {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.dock__indicator-dot {
  height: 4px;
  border-radius: 4px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--color-on-surface-variant);

  &--active {
    width: 12px;
    background-color: var(--color-primary);
  }

  &:not(&--active) {
    width: 4px;
  }
}

.dock__launcher,
.dock__settings {
  // 启动器和设置按钮的特殊样式（如需要）
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
</style>
