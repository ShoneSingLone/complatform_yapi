<template>
  <div
    class="dock"
    @mouseleave="closePreview">
    <button
      class="dock__launcher"
      title="打开应用台"
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
          <span class="dock__item-icon">
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
                <small>{{ getAppWindows(app.id).length ? getAppWindows(app.id).length + ' 个窗口' : '已固定应用' }}</small>
              </div>
              <button
                class="dock__pin-toggle"
                :title="isPinned(app.id) ? '从 Dock 取消固定' : '固定到 Dock'"
                @click.stop="togglePinned(app.id)">
                <xIcon icon="star" size="14" />
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
                    {{ win.isMinimized ? '最小化' : (system.activeWindowId === win.id ? '当前窗口' : '已打开') }}
                  </span>
                </span>
                <span class="dock__preview-item-actions">
                  <button
                    class="dock__preview-action"
                    title="最小化"
                    @click.stop="minimizeWindow(win.id)">
                    <xIcon icon="minus" size="14" />
                  </button>
                  <button
                    class="dock__preview-action dock__preview-action--danger"
                    title="关闭"
                    @click.stop="closeWindow(win.id)">
                    <xIcon icon="close" size="14" />
                  </button>
                </span>
              </div>
            </div>

            <button
              v-else
              class="dock__preview-empty"
              @click.stop="system.openApp(app.id)">
              <span class="dock__preview-empty-title">启动 {{ app.name }}</span>
              <span class="dock__preview-empty-subtitle">当前没有活动窗口</span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <div class="dock__separator" aria-hidden="true"></div>

    <button
      class="dock__settings"
      title="打开设置"
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
        previewAppId: null
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
  align-items: center;
  gap: 6px;
  margin: 0 auto 16px;
  padding: 8px 10px;
  min-height: 62px;
  border: 1px solid var(--v1-shell-border, var(--el-border-color-lighter));
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: var(--v1-shell-shadow, var(--el-box-shadow));
  backdrop-filter: blur(20px);
  pointer-events: auto;

  &__items {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  &__item-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item,
  &__launcher,
  &__settings {
    position: relative;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--v1-shell-text-secondary, var(--el-text-color-regular));
    cursor: pointer;
    transition:
      transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
      background-color 180ms ease,
      box-shadow 180ms ease;

    &:hover {
      transform: translateY(-1px);
      background: var(--v1-shell-primary-soft, var(--el-color-primary-light-9));
    }

    &:active {
      transform: scale(0.98);
      background: rgba(49, 130, 206, 0.12);
    }
  }

  &__item {
    &--running {
      background: rgba(49, 130, 206, 0.08);
    }

    &--active {
      background: var(--v1-shell-primary, var(--el-color-primary));
      color: #ffffff;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.16),
        0 10px 22px rgba(49, 130, 206, 0.26);
    }

    &--pinned::after {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: 13px;
      border: 1px solid var(--v1-shell-border, var(--el-border-color-lighter));
      pointer-events: none;
    }
  }

  &__item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: inherit;
  }

  &__launcher {
    overflow: hidden;
    background: rgba(49, 130, 206, 0.08);
  }

  &__launcher-orb {
    position: absolute;
    inset: auto auto 8px 8px;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--v1-shell-primary, var(--el-color-primary)) 0%, var(--el-color-primary-light-5, #93c5fd) 100%);
    filter: blur(1px);
    opacity: 0.78;
  }

  &__settings {
    background: rgba(255, 255, 255, 0.46);
  }

  &__indicator {
    position: absolute;
    left: 50%;
    bottom: -4px;
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: rgba(96, 98, 102, 0.38);
    transform: translateX(-50%);
    transition: all 180ms ease;

    &--active {
      width: 16px;
      background: var(--v1-shell-primary, var(--el-color-primary));
      box-shadow: 0 0 10px rgba(49, 130, 206, 0.3);
    }
  }

  &__window-count {
    position: absolute;
    top: -4px;
    right: -2px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--v1-shell-primary, var(--el-color-primary));
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    box-shadow: 0 6px 12px rgba(49, 130, 206, 0.2);
  }

  &__tooltip {
    position: absolute;
    left: 50%;
    top: -42px;
    padding: 6px 10px;
    border-radius: 10px;
    background: var(--v1-shell-text, var(--el-text-color-primary));
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    border: 1px solid rgba(48, 49, 51, 0.08);
    box-shadow: 0 12px 24px rgba(48, 49, 51, 0.18);
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 150ms ease, transform 150ms ease;
  }

  &__item:hover &__tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-2px);
  }

  &__separator {
    width: 1px;
    height: 24px;
    align-self: center;
    background: linear-gradient(180deg, rgba(220, 223, 230, 0) 0%, rgba(220, 223, 230, 1) 50%, rgba(220, 223, 230, 0) 100%);
  }

  &__preview {
    position: absolute;
    left: 50%;
    bottom: 54px;
    width: 280px;
    padding: 10px;
    border-radius: 18px;
    border: 1px solid var(--v1-shell-border, var(--el-border-color-lighter));
    background: rgba(255, 255, 255, 0.94);
    box-shadow: var(--v1-shell-shadow, var(--el-box-shadow));
    backdrop-filter: blur(20px);
    transform: translateX(-50%);
  }

  &__preview-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 6px;
    padding: 4px 8px 8px;
    border-bottom: 1px solid var(--v1-shell-border, var(--el-border-color-lighter));
  }

  &__preview-title {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    color: var(--v1-shell-text, var(--el-text-color-primary));
    font-size: 12px;
    font-weight: 500;

    small {
      color: var(--v1-shell-text-muted, var(--el-text-color-secondary));
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
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--v1-shell-text-secondary, var(--el-text-color-regular));
    cursor: pointer;
    transition: background-color 160ms ease, transform 160ms ease;

    &:hover {
      background: var(--v1-shell-primary-soft, var(--el-color-primary-light-9));
      transform: translateY(-1px);
    }
  }

  &__preview-list {
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
      background: rgba(144, 147, 153, 0.3);
      border-radius: 6px;
    }
  }

  &__preview-item,
  &__preview-empty {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 10px;
    background: transparent;
    color: var(--v1-shell-text, var(--el-text-color-primary));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px;
    cursor: pointer;
    transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;

    &:hover {
      background: rgba(49, 130, 206, 0.06);
      transform: translateY(-1px);
    }
  }

  &__preview-item {
    &--active {
      background: var(--v1-shell-primary-soft, var(--el-color-primary-light-9));
      border-color: rgba(49, 130, 206, 0.12);
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
    font-size: 14px;
    font-weight: 500;
    color: var(--v1-shell-text, var(--el-text-color-primary));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__preview-item-subtitle,
  &__preview-empty-subtitle {
    font-size: 12px;
    color: var(--v1-shell-text-muted, var(--el-text-color-secondary));
  }

  &__preview-item-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__preview-action--danger:hover {
    background: rgba(245, 108, 108, 0.12);
    color: var(--el-color-danger, #f56c6c);
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
