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
  margin: 0 auto 10px;
  padding: 0 8px;
  min-height: 48px;
  border: none;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
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
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.04);
    color: var(--color-inverse-on-surface);
    cursor: pointer;
    transition:
      transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
      background-color 180ms ease;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);

    &:hover {
      transform: translateY(-1px);
      background: rgba(255, 255, 255, 0.08);
    }

    &:active {
      transform: scale(0.98);
      background: rgba(255, 255, 255, 0.12);
    }
  }

  &__item {
    &--running {
      background: rgba(255, 255, 255, 0.06);
    }

    &--active {
      background: var(--color-primary);
      color: var(--color-on-primary);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.16),
        0 8px 18px rgba(15, 23, 42, 0.26);
    }

    &--pinned::after {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: 11px;
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
    color: inherit;
  }

  &__launcher {
    overflow: hidden;
  }

  &__launcher-orb {
    position: absolute;
    inset: auto auto 8px 8px;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-tertiary) 100%);
    filter: blur(1px);
    opacity: 0.78;
  }

  &__settings {
    background: rgba(255, 255, 255, 0.05);
  }

  &__indicator {
    position: absolute;
    left: 50%;
    bottom: -4px;
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.34);
    transform: translateX(-50%);
    transition: all 180ms ease;

    &--active {
      width: 16px;
      background: var(--color-primary);
      box-shadow: 0 0 10px rgba(0, 97, 164, 0.46);
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
    background: var(--color-primary);
    color: var(--color-on-primary);
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.22);
  }

  &__tooltip {
    position: absolute;
    left: 50%;
    top: -42px;
    padding: 6px 10px;
    border-radius: 10px;
    background: var(--color-inverse-surface);
    color: var(--color-inverse-on-surface);
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    border: 1px solid var(--color-outline-variant);
    box-shadow: 0 12px 24px rgba(2, 6, 23, 0.28);
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
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 50%, rgba(255, 255, 255, 0) 100%);
  }

  &__preview {
    position: absolute;
    left: 50%;
    bottom: 54px;
    width: 260px;
    padding: 10px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: var(--color-inverse-surface);
    box-shadow: 0 20px 40px rgba(2, 6, 23, 0.34);
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
    border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  }

  &__preview-title {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    color: var(--color-inverse-on-surface);
    font-size: 12px;
    font-weight: 500;

    small {
      color: rgba(241, 240, 244, 0.72);
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
    color: var(--color-inverse-on-surface);
    cursor: pointer;
    transition: background-color 160ms ease, transform 160ms ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
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
      background: rgba(148, 163, 184, 0.26);
      border-radius: 6px;
    }
  }

  &__preview-item,
  &__preview-empty {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: var(--color-inverse-on-surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px;
    cursor: pointer;
    transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateY(-1px);
    }
  }

  &__preview-item {
    &--active {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.08);
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
    color: var(--color-inverse-on-surface);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__preview-item-subtitle,
  &__preview-empty-subtitle {
    font-size: 12px;
    color: rgba(241, 240, 244, 0.72);
  }

  &__preview-item-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__preview-action--danger:hover {
    background: var(--color-error-container);
    color: var(--color-on-error-container);
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
