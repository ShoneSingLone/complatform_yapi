<template>
  <div
    class="dock"
    @mouseleave="closePreview">
    <button
      class="dock__launcher"
      title="Open Launcher"
      @click="handleLauncherClick">
      <span class="dock__launcher-orb"></span>
      <xIcon icon="grid" size="18" />
    </button>

    <div class="dock__separator" aria-hidden="true"></div>

    <div class="dock__items">
      <div
        v-for="app in dockApps"
        :key="app.id"
        class="dock__item-wrapper"
        @mouseenter="openPreview(app.id)">
        <button
          class="dock__item"
          :class="itemClass(app)"
          :title="app.name"
          @click="handleAppClick(app)">
          <span
            class="dock__item-icon"
            :style="{ color: app.color || defaultColor }">
            <xIcon :icon="app.icon || 'grid'" size="22" />
          </span>
          <span class="dock__tooltip">{{ app.name }}</span>
          <span
            v-if="getAppWindows(app.id).length"
            class="dock__indicator"
            :class="{ 'dock__indicator--active': isAppActive(app.id) }"></span>
          <span
            v-if="getAppWindows(app.id).length > 1"
            class="dock__window-count">
            {{ getAppWindows(app.id).length }}
          </span>
        </button>

        <transition name="dock-preview">
          <div
            v-if="previewAppId === app.id"
            class="dock__preview"
            @mouseenter="openPreview(app.id)">
            <div class="dock__preview-header">
              <div class="dock__preview-title">
                <span>{{ app.name }}</span>
                <small>{{ getAppWindows(app.id).length ? getAppWindows(app.id).length + ' windows' : 'Pinned app' }}</small>
              </div>
              <button
                class="dock__pin-toggle"
                :title="isPinned(app.id) ? 'Unpin from Dock' : 'Pin to Dock'"
                @click.stop="togglePinned(app.id)">
                <xIcon icon="pin" size="14" />
              </button>
            </div>

            <div v-if="getAppWindows(app.id).length" class="dock__preview-list">
              <div
                v-for="win in getAppWindows(app.id)"
                :key="win.id"
                class="dock__preview-item"
                :class="{ 'dock__preview-item--active': system.activeWindowId === win.id && !win.isMinimized }"
                role="button"
                tabindex="0"
                @click.stop="activateWindow(win.id)">
                @keydown.enter.stop.prevent="activateWindow(win.id)"
                @keydown.space.stop.prevent="activateWindow(win.id)">
                <span class="dock__preview-item-meta">
                  <span class="dock__preview-item-title">{{ win.title }}</span>
                  <span class="dock__preview-item-subtitle">
                    {{ win.isMinimized ? 'Minimized' : (system.activeWindowId === win.id ? 'Active' : 'Open') }}
                  </span>
                </span>
                <span class="dock__preview-item-actions">
                  <button
                    class="dock__preview-action"
                    title="Minimize"
                    @click.stop="minimizeWindow(win.id)">
                    <xIcon icon="minus" size="14" />
                  </button>
                  <button
                    class="dock__preview-action dock__preview-action--danger"
                    title="Close"
                    @click.stop="closeWindow(win.id)">
                    <xIcon icon="x" size="14" />
                  </button>
                </span>
              </div>
            </div>

            <button
              v-else
              class="dock__preview-empty"
              @click.stop="system.openApp(app.id)">
              <span class="dock__preview-empty-title">Launch {{ app.name }}</span>
              <span class="dock__preview-empty-subtitle">No active window</span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <div class="dock__separator" aria-hidden="true"></div>

    <button
      class="dock__settings"
      title="Open Settings"
      @click="handleSettingsClick">
      <xIcon icon="_setting_outlined" size="18" />
    </button>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    inject: ['system'],
    data() {
      return {
        previewAppId: null,
        defaultColor: '#dbe4ff'
      };
    },
    computed: {
      dockApps() {
        const apps = this.system && this.system.apps ? this.system.apps : [];
        const pinnedApps = this.system && this.system.pinnedApps ? this.system.pinnedApps : [];
        const openWindows = this.system && this.system.openWindows ? this.system.openWindows : [];
        const seen = {};
        const orderedIds = [];

        pinnedApps.forEach(appId => {
          if (!seen[appId]) {
            seen[appId] = true;
            orderedIds.push(appId);
          }
        });

        openWindows.forEach(win => {
          if (!seen[win.appId]) {
            seen[win.appId] = true;
            orderedIds.push(win.appId);
          }
        });

        return orderedIds
          .map(appId => apps.find(app => app.id === appId))
          .filter(app => app && !app.hidden);
      }
    },
    methods: {
      itemClass(app) {
        return {
          'dock__item--active': this.isAppActive(app.id),
          'dock__item--running': this.getAppWindows(app.id).length > 0,
          'dock__item--pinned': this.isPinned(app.id)
        };
      },
      getAppWindows(appId) {
        const openWindows = this.system && this.system.openWindows ? this.system.openWindows : [];
        return openWindows
          .filter(win => win.appId === appId)
          .slice()
          .sort((a, b) => b.zIndex - a.zIndex);
      },
      isPinned(appId) {
        const pinnedApps = this.system && this.system.pinnedApps ? this.system.pinnedApps : [];
        return pinnedApps.includes(appId);
      },
      isAppActive(appId) {
        const activeWindowId = this.system ? this.system.activeWindowId : null;
        const activeWindow = this.getAppWindows(appId).find(win => win.id === activeWindowId);
        return !!activeWindow && !activeWindow.isMinimized;
      },
      openPreview(appId) {
        this.previewAppId = appId;
      },
      closePreview() {
        this.previewAppId = null;
      },
      handleAppClick(app) {
        const windows = this.getAppWindows(app.id);

        if (!windows.length) {
          this.system.openApp(app.id);
          this.previewAppId = app.id;
          return;
        }

        if (windows.length === 1) {
          const win = windows[0];
          if (this.system.activeWindowId === win.id && !win.isMinimized) {
            this.system.minimizeWindow(win.id);
          } else {
            this.activateWindow(win.id);
          }
          return;
        }

        this.previewAppId = this.previewAppId === app.id ? null : app.id;
      },
      activateWindow(windowId) {
        const win = (this.system.openWindows || []).find(item => item.id === windowId);
        if (!win) return;

        win.isMinimized = false;
        this.system.focusWindow(windowId);
      },
      minimizeWindow(windowId) {
        this.system.minimizeWindow(windowId);
      },
      closeWindow(windowId) {
        this.system.closeWindow(windowId);

        const stillVisible = this.previewAppId && this.getAppWindows(this.previewAppId).length;
        if (!stillVisible) {
          this.previewAppId = null;
        }
      },
      togglePinned(appId) {
        if (this.isPinned(appId)) {
          this.system.unpinApp(appId);
        } else {
          this.system.pinApp(appId);
        }
      },
      handleLauncherClick() {
        this.system.openApp('explore');
      },
      handleSettingsClick() {
        this.system.openApp('setting');
      }
    }
  };
}
</script>

<style lang="less">
.dock {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  gap: 12px;
  margin: 0 auto 12px;
  padding: 12px 14px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(23, 31, 49, 0.92) 0%, rgba(10, 14, 24, 0.96) 100%);
  box-shadow:
    0 22px 48px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  pointer-events: auto;

  &__items {
    display: inline-flex;
    align-items: flex-end;
    gap: 10px;
  }

  &__item-wrapper {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  &__item,
  &__launcher,
  &__settings {
    position: relative;
    width: 58px;
    height: 58px;
    padding: 0;
    border: 0;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%);
    color: #f8fafc;
    cursor: pointer;
    transition:
      transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1.2),
      box-shadow 180ms ease,
      border-color 180ms ease,
      background-color 180ms ease;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 14px 26px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translateY(-8px) scale(1.08);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.14),
        0 18px 34px rgba(0, 0, 0, 0.28);
    }

    &:active {
      transform: translateY(-3px) scale(0.98);
    }
  }

  &__item {
    &--running {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(120, 144, 255, 0.12) 100%);
    }

    &--active {
      background:
        linear-gradient(180deg, rgba(147, 197, 253, 0.28) 0%, rgba(96, 165, 250, 0.14) 100%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.16),
        0 20px 36px rgba(59, 130, 246, 0.18);
    }

    &--pinned::after {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: 17px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      pointer-events: none;
    }
  }

  &__item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__launcher {
    overflow: hidden;
  }

  &__launcher-orb {
    position: absolute;
    inset: auto auto 8px 8px;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: linear-gradient(135deg, #7c9cff 0%, #69f0d6 100%);
    filter: blur(1px);
    opacity: 0.9;
  }

  &__settings {
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(148, 163, 184, 0.1) 100%);
  }

  &__indicator {
    position: absolute;
    left: 50%;
    bottom: 5px;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(226, 232, 240, 0.56);
    transform: translateX(-50%);
    box-shadow: 0 0 0 4px rgba(226, 232, 240, 0.08);

    &--active {
      background: #7dd3fc;
      box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.14);
    }
  }

  &__window-count {
    position: absolute;
    top: -6px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(59, 130, 246, 0.9);
    color: #eff6ff;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.3);
  }

  &__tooltip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 12px);
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.94);
    color: #e2e8f0;
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
    transform: translateX(-50%) translateY(6px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 150ms ease, transform 150ms ease;
  }

  &__item:hover &__tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  &__separator {
    width: 1px;
    height: 42px;
    align-self: center;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 255, 255, 0) 100%);
  }

  &__preview {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 16px);
    width: 280px;
    padding: 12px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(20, 28, 42, 0.97) 0%, rgba(10, 14, 24, 0.98) 100%);
    box-shadow:
      0 18px 44px rgba(0, 0, 0, 0.34),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    transform: translateX(-50%);
  }

  &__preview-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  &__preview-title {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    color: #f8fafc;
    font-size: 13px;
    font-weight: 600;

    small {
      color: rgba(226, 232, 240, 0.56);
      font-size: 11px;
      font-weight: 500;
    }
  }

  &__pin-toggle,
  &__preview-action {
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    color: #e2e8f0;
    cursor: pointer;
    transition: background-color 160ms ease, transform 160ms ease;

    &:hover {
      background: rgba(255, 255, 255, 0.14);
      transform: translateY(-1px);
    }
  }

  &__preview-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__preview-item,
  &__preview-empty {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.04);
    color: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    cursor: pointer;
    transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }

  &__preview-item {
    &--active {
      background: rgba(96, 165, 250, 0.14);
      border-color: rgba(125, 211, 252, 0.2);
    }
  }

  &__preview-item-meta {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
    text-align: left;
  }

  &__preview-item-title,
  &__preview-empty-title {
    font-size: 13px;
    font-weight: 600;
    color: #f8fafc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__preview-item-subtitle,
  &__preview-empty-subtitle {
    font-size: 11px;
    color: rgba(226, 232, 240, 0.58);
  }

  &__preview-item-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__preview-action--danger:hover {
    background: rgba(239, 68, 68, 0.16);
    color: #fecaca;
  }

  &__preview-empty {
    flex-direction: column;
    align-items: flex-start;
  }
}

.dock-preview-enter-active,
.dock-preview-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.dock-preview-enter-from,
.dock-preview-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
