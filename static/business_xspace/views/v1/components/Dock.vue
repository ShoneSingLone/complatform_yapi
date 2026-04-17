<template>
  <div class="dock-shell">
    <div class="dock-shell__spacer"></div>
    <div
      class="dock"
      :class="{ 'dock--dragging': isDraggingOver }"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop">
      <div class="dock__item dock__launcher group" @click="handleLauncherClick">
        <div class="dock__tooltip">
          Start
        </div>
        <div class="dock__item-content dock__item-content--system">
          <xIcon icon="_layout_grid" size="18" />
        </div>
      </div>

      <div class="dock__item dock__search group" @click="handleSearchClick">
        <div class="dock__tooltip">
          Search
        </div>
        <div class="dock__item-content dock__item-content--system">
          <xIcon icon="search" size="18" />
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

          <div
            v-if="!app.isOpen"
            class="dock__tooltip">
            {{ app.name }}
          </div>

          <div
            class="dock__item-content"
            :class="{
              'dock__item-content--active': app.isActive
            }">
            <xIcon :icon="app.icon" :size="18" />
          </div>

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

      <div class="dock__item dock__settings group" @click="handleSettingsClick">
        <div class="dock__tooltip">
          Settings
        </div>
        <div class="dock__item-content dock__item-content--system">
          <xIcon icon="_settings" size="18" />
        </div>
      </div>
    </div>
    <div class="dock-tray">
      <button type="button" class="dock-tray__control">
        <xIcon icon="_contact" size="14" />
      </button>
      <button type="button" class="dock-tray__control">
        <xIcon icon="_setting_outlined" size="14" />
      </button>
      <div class="dock-tray__clock">
        <span class="dock-tray__time">{{ time }}</span>
        <span class="dock-tray__date">{{ dateLabel }}</span>
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
        isDraggingOver: false,
        time: "",
        dateLabel: "",
        timer: null
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
      updateClock() {
        const now = new Date();
        this.time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        this.dateLabel = now.toLocaleDateString([], { month: "2-digit", day: "2-digit" });
      },
      handleLauncherClick() {
        this.system.openApp("api");
      },
      handleSearchClick() {
        this.system.openApp("explore");
      },
      handleSettingsClick() {
        this.system.openApp("setting");
      },
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
    },
    mounted() {
      this.updateClock();
      this.timer = setInterval(this.updateClock, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
}
</script>

<style lang="less">
.dock-shell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 64px;
  position: relative;
}

.dock-shell__spacer {
  flex: 1 1 0;
}

.dock {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 48px;
  padding: 0 8px;
  background: transparent;
  border: none;
  border-radius: 0;
  position: relative;
  backdrop-filter: none;
  box-shadow: none;
  transition:
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &--dragging {
    transform: translateY(-1px);
  }
}

.dock-tray {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.dock-tray__control {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(241, 245, 249, 0.9);
  background: transparent;
  cursor: pointer;
  transition: background-color 0.18s ease, transform 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &:active {
    transform: scale(0.96);
    background: rgba(255, 255, 255, 0.12);
  }
}

.dock-tray__clock {
  min-width: 78px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  color: rgba(241, 245, 249, 0.92);
  line-height: 1.1;
}

.dock-tray__time {
  font-size: 0.74rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.dock-tray__date {
  margin-top: 2px;
  font-size: 0.67rem;
  color: rgba(226, 232, 240, 0.72);
  font-variant-numeric: tabular-nums;
}

.dock__item {
  width: 44px;
  height: 44px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &--active {
    .dock__item-content {
      color: #ffffff;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.14),
        0 8px 18px rgba(15, 23, 42, 0.26);
    }
  }

  &--pinned {
    .dock__item-content {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }

  &--animate {
    animation: dock-scale 0.2s ease-out;
  }
}

.dock__item-content {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(241, 245, 249, 0.92);
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition:
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 180ms cubic-bezier(0.4, 0, 0.2, 1),
    color 180ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 180ms cubic-bezier(0.4, 0, 0.2, 1);

  &:not(&--active):hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.08);
  }

  &:not(&--active):active {
    transform: scale(0.98);
    background: rgba(255, 255, 255, 0.12);
  }

  &--active {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  &--system {
    background: rgba(255, 255, 255, 0.05);
  }
}

.dock__separator {
  width: 1px;
  height: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 50%, rgba(255, 255, 255, 0) 100%);
  margin: 0 4px;
  align-self: center;
}

.dock__tooltip {
  position: absolute;
  top: -42px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 10px;
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 10px;
  opacity: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 12px 24px rgba(2, 6, 23, 0.28);

  .group:hover & {
    opacity: 1;
    transform: translateX(-50%) translateY(-2px);
  }
}

.dock__preview {
  position: absolute;
  bottom: 54px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background: rgba(15, 23, 42, 0.92);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(2, 6, 23, 0.34);
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 100;
  min-width: 220px;
  backdrop-filter: blur(20px);
}

.dock__preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 8px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.dock__preview-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(226, 232, 240, 0.9);
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
    background-color: rgba(255, 255, 255, 0.08);

    .xIcon {
      color: #93c5fd;
    }
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.12);
  }

  .xIcon {
    color: rgba(226, 232, 240, 0.82);
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
    background: rgba(148, 163, 184, 0.26);
    border-radius: 6px;

    &:hover {
      background: rgba(148, 163, 184, 0.4);
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
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.08);
  }
}

.dock__preview-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
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
  color: #f8fafc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dock__preview-item-status {
  font-size: 0.75rem;
  color: rgba(203, 213, 225, 0.72);
}

.dock__indicator {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.dock__indicator-dot {
  height: 3px;
  border-radius: 999px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.34);

  &--active {
    width: 18px;
    background-color: #60a5fa;
    box-shadow: 0 0 10px rgba(96, 165, 250, 0.62);
  }

  &:not(&--active) {
    width: 4px;
  }
}

@keyframes dock-scale {
  0% {
    transform: translateY(3px) scale(0.92);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
