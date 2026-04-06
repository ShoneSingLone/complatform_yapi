<template>
  <div 
    class="dock" 
    :class="{ 'dock--dragging-over': isDraggingOver }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    
    <!-- Launcher Button (Always Visible) -->
    <div class="dock__item">
      <div class="dock__item__tooltip">
        Menu
      </div>
      <div class="dock__item__icon">
        <svg class="icon" style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      </div>
    </div>

    <div class="dock__divider"></div>

    <transition-group name="dock-item">
      <div
        v-for="app in activeApps" 
        :key="app.id"
        class="dock__item"
        draggable="true"
        @dragstart="onDragStart($event, app.id)"
        @mouseenter="hoveredAppId = app.id"
        @mouseleave="hoveredAppId = null"
        @click="handleAppClick(app.id)"
      >
        <!-- Window Previews / Thumbnails -->
        <transition name="dock-preview">
          <div 
            v-if="hoveredAppId === app.id && app.isOpen"
            class="dock__item__preview"
            @mouseenter="hoveredAppId = app.id"
            @mouseleave="hoveredAppId = null"
          >
            <!-- Transition Area -->
            <div class="dock__item__preview__transition"></div>
            <div class="dock__item__preview__header">
              <span class="dock__item__preview__title">{{ app.name }}</span>
              <button 
                @click.stop="openNewWindow(app.id)"
                class="dock__item__preview__button"
                title="打开新窗口"
              >
                <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
            </div>
            
            <div class="dock__item__preview__windows">
              <div 
                v-for="win in app.windows" 
                :key="win.id"
                class="dock__item__preview__window"
                @click.stop="focusSpecificWindow(win.id)"
              >
                <div class="dock__item__preview__window__icon">
                  <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path v-if="app.icon === 'LayoutGrid'" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    <path v-else-if="app.icon === 'Folder'" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    <path v-else-if="app.icon === 'FileText'" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    <path v-else-if="app.icon === 'Compass'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    <path v-else-if="app.icon === 'Settings'" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                    <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <div class="dock__item__preview__window__info">
                  <span class="dock__item__preview__window__title">{{ win.title }}</span>
                  <span class="dock__item__preview__window__status">{{ win.isMinimized ? '已最小化' : '活动' }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Tooltip (only if no windows open) -->
        <div 
          v-if="!app.isOpen"
          class="dock__item__tooltip"
        >
          {{ app.name }}
        </div>

        <!-- Icon Container -->
        <div 
          class="dock__item__icon"
          :class="[
            app.isActive ? 'dock__item__icon--active' : '',
            system.lastOpenedAppId === app.id ? 'dock__item__icon--pulse' : ''
          ]"
        >
          <svg class="icon" style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="app.icon === 'LayoutGrid'" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            <path v-else-if="app.icon === 'Folder'" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
            <path v-else-if="app.icon === 'FileText'" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            <path v-else-if="app.icon === 'Compass'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <path v-else-if="app.icon === 'Settings'" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>

        <!-- Indicator Pill -->
        <div class="dock__item__indicator">
          <div 
            v-if="app.isOpen"
            class="dock__item__indicator__dot"
            :class="app.isActive ? 'dock__item__indicator__dot--active' : 'dock__item__indicator__dot--inactive'"
          ></div>
        </div>
      </div>
    </transition-group>
    
    <div class="dock__divider"></div>
    
    <!-- Settings Icon -->
    <div class="dock__item" @click="system.openApp('settings')">
       <div class="dock__item__tooltip">
        设置
      </div>
       <div class="dock__item__icon">
         <svg class="icon" style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
         </svg>
       </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [SystemStore] = await _.$importVue([
    "@/components/DesktopWorkspace/store/SystemStore.vue"
  ]);

  return {
    data() {
      return {
        system: SystemStore,
        hoveredAppId: null,
        isDraggingOver: false
      };
    },
    computed: {
      activeApps() {
        return this.system.apps
          .map(app => {
            const windows = this.system.openWindows.filter(w => w.appId === app.id && w.desktopId === this.system.currentDesktopId);
            return {
              ...app,
              windows,
              isOpen: windows.length > 0,
              isPinned: this.system.pinnedApps.includes(app.id),
              isActive: this.system.activeWindowId && this.system.openWindows.find(w => w.id === this.system.activeWindowId)?.appId === app.id
            };
          })
          .filter(app => app.isOpen || app.isPinned);
      }
    },
    methods: {
      handleAppClick(appId) {
        const app = this.system.apps.find(a => a.id === appId);
        if (!app) return;

        const windows = this.system.openWindows.filter(w => w.appId === appId && w.desktopId === this.system.currentDesktopId);
        if (windows.length > 0) {
          // 如果有打开的窗口，切换到第一个窗口
          const window = windows[0];
          window.isMinimized = false;
          this.system.focusWindow(window.id);
        } else {
          // 否则打开新窗口
          this.system.openApp(appId);
        }
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
          e.dataTransfer.dropEffect = 'copy';
        }
      },
      onDragLeave(e) {
        this.isDraggingOver = false;
      },
      onDrop(e) {
        e.preventDefault();
        this.isDraggingOver = false;
        
        // Handle internal app icons
        const appId = e.dataTransfer?.getData('text/plain');
        if (appId) {
          this.system.pinApp(appId);
          return;
        }
        
        // Handle external files
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          // Create a temporary app for the file
          const fileAppId = 'file-' + Date.now();
          this.system.apps.push({
            id: fileAppId,
            name: file.name,
            icon: 'FileText',
            color: '#888888',
            component: 'NoteManager' // Open in NoteManager by default
          });
          this.system.pinApp(fileAppId);
        }
      },
      onDragStart(e, appId) {
        if (e.dataTransfer) {
          e.dataTransfer.setData('text/plain', appId);
          e.dataTransfer.setData('action', 'unpin');
          e.dataTransfer.effectAllowed = 'move';
        }
      }
    }
  };
}
</script>

<style lang="less">
.dock {
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  min-width: 300px;
  max-width: 800px;
  width: 90%;

  &--dragging-over {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &__divider {
    width: 1px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 0 8px;
  }

  &__item {
    position: relative;
    margin: 0 4px;
    cursor: pointer;

    &__tooltip {
      position: absolute;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 1000;
    }

    &__icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }

      &--active {
        background-color: rgba(49, 130, 206, 0.1);
        color: #3182ce;
      }

      &--pulse {
        animation: pulse 0.5s ease-in-out;
      }
    }

    &__indicator {
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 4px;

      &__dot {
        height: 4px;
        border-radius: 9999px;
        transition: all 0.3s ease;

        &--active {
          width: 16px;
          background-color: #3182ce;
        }

        &--inactive {
          width: 6px;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }

    &__preview {
      position: absolute;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      width: 300px;
      z-index: 1000;

      &__transition {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 16px;
        height: 16px;
        background-color: white;
        transform: translateX(-50%) rotate(45deg);
        z-index: -1;
      }

      &__header {
        padding: 12px;
        border-bottom: 1px solid #eaeaea;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__title {
          font-size: 14px;
          font-weight: 600;
        }

        &__button {
          width: 24px;
          height: 24px;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        }
      }

      &__windows {
        max-height: 300px;
        overflow-y: auto;

        &__window {
          padding: 12px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          cursor: pointer;

          &:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }

          &__icon {
            margin-right: 12px;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.05);
          }

          &__info {
            flex: 1;

            &__title {
              font-size: 14px;
              margin-bottom: 4px;
            }

            &__status {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
    }

    &:hover {
      &__tooltip {
        opacity: 1;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.dock-item-enter-active,
.dock-item-leave-active {
  transition: all 0.3s ease;
}

.dock-item-enter,
.dock-item-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.dock-preview-enter-active,
.dock-preview-leave-active {
  transition: all 0.2s ease;
}

.dock-preview-enter,
.dock-preview-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>