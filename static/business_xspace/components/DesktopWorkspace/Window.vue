<template>
  <transition name="window-fade">
    <div 
      ref="windowRef"
      class="window"
      :class="[
        window.isMaximized ? 'window--maximized' : '',
        isActive ? 'window--active' : 'window--inactive',
        !isDragging ? 'window--transition' : '',
        !isResizing ? 'window--transition' : ''
      ]"
      :style="window.isMaximized ? { zIndex: window.zIndex } : { 
					zIndex: window.zIndex, 
					width: window.width + 'px', 
					height: window.height + 'px',
					transform: 'translate(' + x + 'px, ' + y + 'px)'
				}"
      @mousedown="system.focusWindow(window.id)"
    >
      <!-- Resize Handles -->
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--top-left"
        @mousedown="startResize('top-left', $event)"
      ></div>
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--top-right"
        @mousedown="startResize('top-right', $event)"
      ></div>
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--bottom-left"
        @mousedown="startResize('bottom-left', $event)"
      ></div>
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--bottom-right"
        @mousedown="startResize('bottom-right', $event)"
      ></div>
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--top"
        @mousedown="startResize('top', $event)"
      ></div>
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--bottom"
        @mousedown="startResize('bottom', $event)"
      ></div>
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--left"
        @mousedown="startResize('left', $event)"
      ></div>
      <div 
        v-if="!window.isMaximized"
        class="window__resize-handle window__resize-handle--right"
        @mousedown="startResize('right', $event)"
      ></div>
      <!-- Title Bar -->
      <div 
        ref="handleRef"
        class="window__title-bar"
        @mousedown="startDrag"
      >
        <div class="window__title-bar__left">
          <!-- 返回按钮 -->
          <button @click.stop="handleGoBack" class="window__title-bar__back" title="返回">
            <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <div class="window__title-bar__left__icon">
             <svg class="icon" style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path v-if="appIcon === 'LayoutGrid'" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              <path v-else-if="appIcon === 'Folder'" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
              <path v-else-if="appIcon === 'FileText'" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              <path v-else-if="appIcon === 'Compass'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              <path v-else-if="appIcon === 'Settings'" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
          <span class="window__title-bar__left__title">{{ window.title }}</span>
        </div>
        
        <div class="window__title-bar__right">
          <!-- 固定按钮 - 根据是否已固定显示不同图标 -->
          <button @click.stop="pinToDesktop" class="window__title-bar__right__button window__title-bar__right__button--pin" :class="{ 'window__title-bar__right__button--pinned': isPinned }" title="固定到桌面">
            <svg v-if="!isPinned" class="icon" style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
            </svg>
            <svg v-else class="icon" style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </button>
          <button @click.stop="handleMinimize" class="window__title-bar__right__button">
            <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          <button @click.stop="handleMaximize" class="window__title-bar__right__button">
            <svg v-if="!window.isMaximized" class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h18v18H3V3zm16 16H5V5h14v14z"/>
            </svg>
            <svg v-else class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
          </button>
          <button @click.stop="handleClose" class="window__title-bar__right__button window__title-bar__right__button--close">
            <svg class="icon" style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="window__content">
        <div class="window__content__inner">
          <!-- Placeholder Content based on App ID -->
          <div class="window__content__inner__body">
            <div v-if="['api', 'group', 'project', 'api_folder', 'doc_folder', 'folder', 'api_endpoint', 'doc', 'code', 'member_list', 'setting', 'cicd'].includes(window.appId)" class="window__content__inner__body__content">
               <ApiManager :window-data="window.data" />
            </div>
            <div v-else-if="window.appId === 'explore'" class="window__content__inner__body__content">
               <Explore />
            </div>
            <div v-else-if="window.appId === 'settings'" class="window__content__inner__body__content">
               <Settings />
            </div>
            <div v-else class="window__content__inner__body__placeholder">
               <div class="window__content__inner__body__placeholder__icon">
                  <svg class="icon" style="width: 40px; height: 40px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path v-if="appIcon === 'LayoutGrid'" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    <path v-else-if="appIcon === 'Folder'" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                    <path v-else-if="appIcon === 'FileText'" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    <path v-else-if="appIcon === 'Compass'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    <path v-else-if="appIcon === 'Settings'" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                    <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
               </div>
               <p class="window__content__inner__body__placeholder__text">The <strong>{{ window.title }}</strong> module is currently under development.</p>
               <button class="window__content__inner__body__placeholder__button">Request Feature</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [SystemStore, ApiManager, Explore, Settings] = await _.$importVue([
    "@/components/DesktopWorkspace/store/SystemStore.vue",
    "@/components/DesktopWorkspace/contents/ApiContent.vue",
    "@/components/DesktopWorkspace/contents/ExploreContent.vue",
    "@/components/DesktopWorkspace/contents/SettingsContent.vue"
  ]);

  return {
    components: {
      ApiManager,
      Explore,
      Settings
    },
    props: {
      window: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        system: SystemStore,
        windowRef: null,
        handleRef: null,
        x: this.window.x,
        y: this.window.y,
        isDragging: false,
        isResizing: false,
        resizeType: '',
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        startWidth: 0,
        startHeight: 0
      };
    },
    computed: {
      isActive() {
        return this.system.activeWindowId === this.window.id;
      },
      appIcon() {
        var app = this.system.apps.find(function(a) { return a.id === this.window.appId; }.bind(this));
        return app ? app.icon : 'HelpCircle';
      },
      isPinned() {
        var shortcutId = this.window.data ? "shortcut-" + this.window.data.id : "shortcut-" + this.window.appId;
        return this.system.shortcuts.some(function(s) { return s.id === shortcutId; });
      }
    },
    methods: {
      handleGoBack() {
        // 返回上一级视图
        this.system.closeWindow(this.window.id);
      },
      handleClose() {
        this.system.closeWindow(this.window.id);
      },
      handleMinimize() {
        this.system.minimizeWindow(this.window.id);
      },
      handleMaximize() {
        this.system.toggleMaximize(this.window.id);
      },
      pinToDesktop() {
        var app = this.system.apps.find(function(a) { return a.id === this.window.appId; }.bind(this));
        if (!app) return;
        
        var shortcutId = this.window.data ? "shortcut-" + this.window.data.id : "shortcut-" + app.id;
        
        // 如果已经固定，则取消固定
        if (this.isPinned) {
          var index = this.system.shortcuts.findIndex(function(s) { return s.id === shortcutId; });
          if (index > -1) {
            this.system.shortcuts.splice(index, 1);
          }
        } else {
          // 添加快捷方式
          this.system.addShortcut({
            id: shortcutId,
            appId: app.id,
            name: this.window.title,
            icon: app.icon,
            color: app.color,
            data: this.window.data
          });
        }
      },
      startDrag(e) {
        // 忽略标题栏右侧按钮的点击
        if (e.target.closest('.window__title-bar__right')) {
          return;
        }
        
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startLeft = this.window.x;
        this.startTop = this.window.y;
        
        // 添加到快捷方式（如果还没有）
        const app = this.system.apps.find(a => a.id === this.window.appId);
        if (app) {
          const shortcutId = this.window.data ? `shortcut-${this.window.data.id}` : `shortcut-${app.id}`;
          const existingShortcut = this.system.shortcuts.find(s => s.id === shortcutId);
          if (!existingShortcut) {
            this.system.addShortcut({
              id: shortcutId,
              appId: app.id,
              name: this.window.title,
              icon: app.icon,
              color: app.color,
              data: this.window.data
            });
          }
        }
        
        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.stopDrag);
      },
      onDrag(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;
        
        this.x = this.startLeft + deltaX;
        this.y = this.startTop + deltaY;
        
        // 更新窗口位置
        this.window.x = this.x;
        this.window.y = this.y;
        this.system.saveState();
      },
      stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
      },
      startResize(type, e) {
        e.preventDefault();
        this.isResizing = true;
        this.resizeType = type;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startLeft = this.window.x;
        this.startTop = this.window.y;
        this.startWidth = this.window.width;
        this.startHeight = this.window.height;
        
        document.addEventListener('mousemove', this.onResize);
        document.addEventListener('mouseup', this.stopResize);
      },
      onResize(e) {
        if (!this.isResizing) return;
        
        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;
        
        switch (this.resizeType) {
          case 'top-left':
            this.window.width = Math.max(300, this.startWidth - deltaX);
            this.window.height = Math.max(200, this.startHeight - deltaY);
            this.window.x = this.startLeft + deltaX;
            this.window.y = this.startTop + deltaY;
            break;
          case 'top-right':
            this.window.width = Math.max(300, this.startWidth + deltaX);
            this.window.height = Math.max(200, this.startHeight - deltaY);
            this.window.y = this.startTop + deltaY;
            break;
          case 'bottom-left':
            this.window.width = Math.max(300, this.startWidth - deltaX);
            this.window.height = Math.max(200, this.startHeight + deltaY);
            this.window.x = this.startLeft + deltaX;
            break;
          case 'bottom-right':
            this.window.width = Math.max(300, this.startWidth + deltaX);
            this.window.height = Math.max(200, this.startHeight + deltaY);
            break;
          case 'top':
            this.window.height = Math.max(200, this.startHeight - deltaY);
            this.window.y = this.startTop + deltaY;
            break;
          case 'bottom':
            this.window.height = Math.max(200, this.startHeight + deltaY);
            break;
          case 'left':
            this.window.width = Math.max(300, this.startWidth - deltaX);
            this.window.x = this.startLeft + deltaX;
            break;
          case 'right':
            this.window.width = Math.max(300, this.startWidth + deltaX);
            break;
        }
        
        // 更新窗口位置和大小
        this.x = this.window.x;
        this.y = this.window.y;
        this.system.saveState();
      },
      stopResize() {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.onResize);
        document.removeEventListener('mouseup', this.stopResize);
      }
    },
    watch: {
      'window.x'(newX) {
        this.x = newX;
      },
      'window.y'(newY) {
        this.y = newY;
      }
    },
    mounted() {
      this.x = this.window.x;
      this.y = this.window.y;
    }
  };
}
</script>

<style lang="less">
.window {
  position: absolute;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;

  &--transition {
    transition: width 0.3s ease-out, height 0.3s ease-out, transform 0.3s ease-out, opacity 0.3s ease-out;
  }

  &--maximized {
    top: 40px !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: calc(100vh - 40px) !important;
    transform: none !important;
    border-radius: 0;
  }

  &--active {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }

  &--inactive {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  &__title-bar {
    height: 40px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    cursor: move;

    &__back {
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
      color: var(--x-text-secondary, #86909C);
      transition: all 0.2s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: var(--x-primary, #165DFF);
      }
    }

    &__left {
      display: flex;
      align-items: center;

      &__icon {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        background-color: rgba(0, 0, 0, 0.05);
      }

      &__title {
        font-size: 14px;
        font-weight: 500;
      }
    }

    &__right {
      display: flex;
      align-items: center;

      &__button {
        width: 32px;
        height: 32px;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        &--pin {
          &--pinned {
            background-color: rgba(82, 196, 26, 0.1);
            color: #52C41A;
            
            &:hover {
              background-color: rgba(82, 196, 26, 0.2);
            }
          }
        }

        &--close {
          &:hover {
            background-color: #ff5f56;
            color: white;
          }
        }
      }
    }
  }

  &__content {
    flex: 1;
    overflow: hidden;
    display: flex;

    &__inner {
      flex: 1;
      overflow: hidden;

      &__body {
        width: 100%;
        height: 100%;
        overflow: auto;

        &__content {
          width: 100%;
          height: 100%;
        }

        &__placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 0;
          height: 100%;

          &__icon {
            width: 80px;
            height: 80px;
            border-radius: 16px;
            background-color: #f0f0f0;
            color: #999;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
          }

          &__text {
            color: #666;
            margin-bottom: 24px;
            font-size: 16px;
          }

          &__button {
            padding: 12px 24px;
            background-color: #3182ce;
            color: white;
            border-radius: 4px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              background-color: #2563eb;
            }
          }
        }
      }
    }
  }
}

.window-fade-enter-active,
.window-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.window-fade-enter,
.window-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Resize Handles */
.window__resize-handle {
  position: absolute;
  background-color: transparent;
  z-index: 10;
}

.window__resize-handle--top-left {
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
}

.window__resize-handle--top-right {
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  cursor: nesw-resize;
}

.window__resize-handle--bottom-left {
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  cursor: nesw-resize;
}

.window__resize-handle--bottom-right {
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
}

.window__resize-handle--top {
  top: 0;
  left: 10px;
  right: 10px;
  height: 5px;
  cursor: ns-resize;
}

.window__resize-handle--bottom {
  bottom: 0;
  left: 10px;
  right: 10px;
  height: 5px;
  cursor: ns-resize;
}

.window__resize-handle--left {
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 5px;
  cursor: ew-resize;
}

.window__resize-handle--right {
  right: 0;
  top: 10px;
  bottom: 10px;
  width: 5px;
  cursor: ew-resize;
}
</style>