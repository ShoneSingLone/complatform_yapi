<template>
  <div class="menu-bar">
    <!-- Left Section: System Menu -->
    <div class="menu-bar__left">
      <div class="menu-bar__left__item" @click="toggleLauncher">
        <span class="menu-bar__left__item__icon">
          <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </span>
        <span class="menu-bar__left__item__text">Launcher</span>
      </div>
      
      <div class="menu-bar__left__item" @click="openSettings">
        <span class="menu-bar__left__item__text">设置</span>
      </div>
    </div>

    <!-- Center Section: Desktop Switcher -->
    <div class="menu-bar__center">
      <div 
        v-for="desktop in system.desktops" 
        :key="desktop.id"
        class="menu-bar__center__desktop"
        :class="{ 'menu-bar__center__desktop--active': desktop.id === system.currentDesktopId }"
        @click="system.switchDesktop(desktop.id)"
      >
        {{ desktop.name }}
        <button 
          class="menu-bar__center__desktop__close"
          @click.stop="system.deleteDesktop(desktop.id)"
          v-if="system.desktops.length > 1"
        >
          ×
        </button>
      </div>
      <button class="menu-bar__center__add" @click="system.createDesktop">
        <svg class="icon" style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>

    <!-- Right Section: Status -->
    <div class="menu-bar__right">
      <div class="menu-bar__right__item" @click="toggleKeyboardShortcuts">
        <span class="menu-bar__right__item__text">⌘</span>
      </div>
      <div class="menu-bar__right__item" @click="$emit('open-background-settings')">
        <span class="menu-bar__right__item__text">壁纸</span>
      </div>
      <div class="menu-bar__right__item" @click="logout">
        <span class="menu-bar__right__item__text">退出</span>
      </div>
    </div>

    <!-- Launcher -->
    <div class="launcher" v-if="showLauncher">
      <div class="launcher__content">
        <div class="launcher__content__header">
          <h2>应用程序</h2>
          <button class="launcher__content__header__close" @click="toggleLauncher">×</button>
        </div>
        <div class="launcher__content__apps">
          <div 
            v-for="app in system.apps" 
            :key="app.id"
            class="launcher__content__apps__item"
            @click="system.openApp(app.id)"
          >
            <div class="launcher__content__apps__item__icon" :style="{ backgroundColor: app.color + '20', color: app.color }">
              <svg class="icon" style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path v-if="app.icon === 'LayoutGrid'" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                <path v-else-if="app.icon === 'Folder'" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                <path v-else-if="app.icon === 'FileText'" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                <path v-else-if="app.icon === 'Compass'" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                <path v-else-if="app.icon === 'Settings'" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <span class="launcher__content__apps__item__name">{{ app.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Keyboard Shortcuts -->
    <div class="keyboard-shortcuts" v-if="showKeyboardShortcuts">
      <div class="keyboard-shortcuts__content">
        <div class="keyboard-shortcuts__content__header">
          <h2>键盘快捷键</h2>
          <button class="keyboard-shortcuts__content__header__close" @click="toggleKeyboardShortcuts">×</button>
        </div>
        <div class="keyboard-shortcuts__content__list">
          <div class="keyboard-shortcuts__content__list__item">
            <span class="keyboard-shortcuts__content__list__item__action">打开启动器</span>
            <span class="keyboard-shortcuts__content__list__item__key">⌘ + Space</span>
          </div>
          <div class="keyboard-shortcuts__content__list__item">
            <span class="keyboard-shortcuts__content__list__item__action">切换窗口</span>
            <span class="keyboard-shortcuts__content__list__item__key">Alt + Tab</span>
          </div>
          <div class="keyboard-shortcuts__content__list__item">
            <span class="keyboard-shortcuts__content__list__item__action">最小化窗口</span>
            <span class="keyboard-shortcuts__content__list__item__key">⌘ + M</span>
          </div>
          <div class="keyboard-shortcuts__content__list__item">
            <span class="keyboard-shortcuts__content__list__item__action">最大化窗口</span>
            <span class="keyboard-shortcuts__content__list__item__key">⌘ + Enter</span>
          </div>
          <div class="keyboard-shortcuts__content__list__item">
            <span class="keyboard-shortcuts__content__list__item__action">关闭窗口</span>
            <span class="keyboard-shortcuts__content__list__item__key">⌘ + W</span>
          </div>
          <div class="keyboard-shortcuts__content__list__item">
            <span class="keyboard-shortcuts__content__list__item__action">创建新桌面</span>
            <span class="keyboard-shortcuts__content__list__item__key">⌘ + N</span>
          </div>
        </div>
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
        showLauncher: false,
        showKeyboardShortcuts: false
      };
    },
    methods: {
      toggleLauncher() {
        this.showLauncher = !this.showLauncher;
        this.showKeyboardShortcuts = false;
      },
      toggleKeyboardShortcuts() {
        this.showKeyboardShortcuts = !this.showKeyboardShortcuts;
        this.showLauncher = false;
      },
      openSettings() {
        this.system.openApp('settings');
      },
      logout() {
        if (confirm('确定要退出吗？')) {
          // 调用退出登录接口
          _api.xspace.userLogout().then(() => {
            _.$lStorage.x_token = '';
            window.location.href = '/xspace#/login';
          });
        }
      }
    },
    mounted() {
      // 键盘快捷键
      window.addEventListener('keydown', (e) => {
        // ⌘ + Space 打开启动器
        if (e.metaKey && e.code === 'Space') {
          e.preventDefault();
          this.toggleLauncher();
        }
        // Alt + Tab 切换窗口
        if (e.altKey && e.code === 'Tab') {
          e.preventDefault();
          // 实现窗口切换逻辑
          const currentDesktopWindows = this.system.openWindows.filter(win => win.desktopId === this.system.currentDesktopId && !win.isMinimized);
          if (currentDesktopWindows.length > 0) {
            const currentIndex = currentDesktopWindows.findIndex(win => win.id === this.system.activeWindowId);
            const nextIndex = (currentIndex + 1) % currentDesktopWindows.length;
            this.system.focusWindow(currentDesktopWindows[nextIndex].id);
          }
        }
        // ⌘ + M 最小化窗口
        if (e.metaKey && e.code === 'KeyM') {
          e.preventDefault();
          if (this.system.activeWindowId) {
            this.system.minimizeWindow(this.system.activeWindowId);
          }
        }
        // ⌘ + Enter 最大化窗口
        if (e.metaKey && e.code === 'Enter') {
          e.preventDefault();
          if (this.system.activeWindowId) {
            this.system.toggleMaximize(this.system.activeWindowId);
          }
        }
        // ⌘ + W 关闭窗口
        if (e.metaKey && e.code === 'KeyW') {
          e.preventDefault();
          if (this.system.activeWindowId) {
            this.system.closeWindow(this.system.activeWindowId);
          }
        }
        // ⌘ + N 创建新桌面
        if (e.metaKey && e.code === 'KeyN') {
          e.preventDefault();
          this.system.createDesktop();
        }
      });
    }
  };
}
</script>

<style lang="less">
.menu-bar {
  height: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  &__left {
    display: flex;
    align-items: center;

    &__item {
      display: flex;
      align-items: center;
      padding: 0 12px;
      height: 40px;
      cursor: pointer;
      border-radius: 4px;
      margin-right: 8px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &__icon {
        margin-right: 4px;
      }

      &__text {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  &__center {
    display: flex;
    align-items: center;

    &__desktop {
      padding: 0 12px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 4px;
      border-radius: 16px;
      cursor: pointer;
      position: relative;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &--active {
        background-color: rgba(49, 130, 206, 0.1);
        color: #3182ce;
        font-weight: 500;
      }

      &__close {
        margin-left: 8px;
        font-size: 16px;
        border: none;
        background: none;
        cursor: pointer;
        padding: 0;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }

    &__add {
      width: 32px;
      height: 32px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  &__right {
    display: flex;
    align-items: center;

    &__item {
      padding: 0 12px;
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 4px;
      margin-left: 8px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &__text {
        font-size: 14px;
      }
    }
  }
}

/* Launcher */
.launcher {
  position: fixed;
  top: 40px;
  left: 0;
  width: 300px;
  max-height: calc(100vh - 40px);
  background-color: white;
  border-right: 1px solid #eaeaea;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 2000;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__header {
      padding: 16px;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      &__close {
        border: none;
        background: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &__apps {
      padding: 16px;
      overflow-y: auto;

      &__item {
        display: flex;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 8px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        &__icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        &__name {
          font-size: 14px;
        }
      }
    }
  }
}

/* Background Settings */
.background-settings {
  position: fixed;
  top: 40px;
  right: 0;
  width: 300px;
  max-height: calc(100vh - 40px);
  background-color: white;
  border-left: 1px solid #eaeaea;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 2000;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__header {
      padding: 16px;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      &__close {
        border: none;
        background: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &__options {
      padding: 16px;
      overflow-y: auto;

      &__section {
        margin-bottom: 24px;

        h3 {
          margin: 0 0 12px 0;
          font-size: 14px;
          font-weight: 600;
        }

        &__colors {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;

          &__item {
            width: 100%;
            height: 40px;
            border-radius: 8px;
            cursor: pointer;
            border: 2px solid transparent;

            &.active {
              border-color: #3182ce;
              box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
            }
          }
        }
      }
    }
  }
}

/* Keyboard Shortcuts */
.keyboard-shortcuts {
  position: fixed;
  top: 40px;
  right: 0;
  width: 300px;
  max-height: calc(100vh - 40px);
  background-color: white;
  border-left: 1px solid #eaeaea;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 2000;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__header {
      padding: 16px;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      &__close {
        border: none;
        background: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &__list {
      padding: 16px;
      overflow-y: auto;

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 8px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        &__action {
          font-size: 14px;
        }

        &__key {
          font-size: 14px;
          background-color: rgba(0, 0, 0, 0.05);
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
        }
      }
    }
  }
}
</style>