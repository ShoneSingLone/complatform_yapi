<template>
  <div 
    class="desktop-workspace"
    :style="desktopBackgroundStyle"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <!-- Top Bar -->
    <MenuBar class="desktop-workspace__top-bar" @open-background-settings="openBackgroundSettings" />

    <!-- Desktop Area -->
    <div class="desktop-workspace__desktop">
      <!-- Background Logo -->
      <div class="desktop-workspace__desktop__background">
        <svg class="icon" style="width: 400px; height: 400px; fill: currentColor; opacity: 0.1;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="currentColor"/>
          <path d="M874.038 874.038c83.736-83.736 132.382-189.26 145.98-298.326l-179.596-179.596-24.834 33.326-144.284-144.284-274.23 233.738-10.344 8.044-218.388 106.654 388.42 388.42c115.74-10.096 228.698-59.398 317.276-147.976z" fill="currentColor"/>
          <path d="M714.09 687.794c95.666 0 173.218-77.552 173.218-173.218s-77.552-173.218-173.218-173.218c-3.29 0-6.55 0.11-9.796 0.294-23.7-67.422-87.898-115.77-163.422-115.77-66.554 0-124.304 37.554-153.314 92.604a100.812 100.812 0 0 0-34.34-5.996c-51.858 0-94.566 39.07-100.352 89.382-66.23 13.108-116.17 71.504-116.17 141.58 0 79.72 64.626 144.35 144.35 144.35h433.046v-0.008z" fill="currentColor"/>
          <path d="M714.09 341.354c-3.29 0-6.55 0.11-9.796 0.294-23.7-67.422-87.898-115.77-163.422-115.77-0.238 0-0.472 0.01-0.71 0.014v461.906h173.932c95.666 0 173.218-77.552 173.218-173.218-0.004-95.67-77.556-173.226-173.222-173.226z" fill="currentColor"/>
          <path d="M541.254 531.118l-108.606-108.6c-16.164-16.156-42.35-16.156-58.512 0l-108.606 108.6c-16.16 16.156-16.16 42.352 0 58.512 16.152 16.154 42.346 16.16 58.512 0l37.978-37.978v187.902c0 22.848 18.526 41.374 41.374 41.374 22.848 0 41.374-18.526 41.374-41.374v-187.902l37.978 37.974a41.236 41.236 0 0 0 29.254 12.12c10.588 0 21.18-4.04 29.254-12.12 16.16-16.154 16.16-42.354 0-58.508z" fill="currentColor"/>
          <path d="M541.254 531.118l-108.606-108.6a41.234 41.234 0 0 0-29.54-12.102v370.498c0.096 0 0.19 0.014 0.286 0.014 22.848 0 41.374-18.526 41.374-41.374v-187.902l37.978 37.974a41.236 41.236 0 0 0 29.254 12.12c10.588 0 21.18-4.04 29.254-12.12 16.16-16.154 16.16-42.354 0-58.508z" fill="currentColor"/>
        </svg>
      </div>

      <!-- Desktop Icons Grid -->
      <div class="desktop-workspace__desktop__icons">
        <DesktopIcon 
          v-for="shortcut in system.shortcuts" 
          :key="shortcut.id" 
          :app="shortcut" 
          @click="system.openApp(shortcut.appId, false, shortcut.data)"
          @unpin="system.removeShortcut(shortcut.id)"
        />
      </div>

      <!-- Windows Layer -->
      <div class="desktop-workspace__desktop__windows">
        <transition-group name="window-fade">
          <Window 
            v-for="win in currentDesktopWindows" 
            :key="win.id" 
            :window="win"
            v-show="!win.isMinimized"
          />
        </transition-group>
      </div>

      <!-- Bottom Dock -->
      <div class="desktop-workspace__desktop__dock">
        <Dock />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [MenuBar, DesktopIcon, Dock, Window, SystemStore, BackgroundSettings] = await _.$importVue([
    "@/components/DesktopWorkspace/MenuBar.vue",
    "@/components/DesktopWorkspace/DesktopIcon.vue",
    "@/components/DesktopWorkspace/Dock.vue",
    "@/components/DesktopWorkspace/Window.vue",
    "@/components/DesktopWorkspace/store/SystemStore.vue",
    "@/components/DesktopWorkspace/BackgroundSettings.vue"
  ]);

  return {
    components: {
      MenuBar,
      DesktopIcon,
      Dock,
      Window
    },
    data() {
      return {
        system: SystemStore
      };
    },
    computed: {
      desktopBackgroundStyle() {
        const currentDesktop = this.system.desktops.find(d => d.id === this.system.currentDesktopId);
        if (!currentDesktop || !currentDesktop.background) {
          return {};
        }
        
        const { type, url, color, opacity } = currentDesktop.background;
        const style = {
          opacity: opacity
        };
        
        if (type === 'custom' && url) {
          style.backgroundImage = `url(${url})`;
          style.backgroundSize = 'cover';
          style.backgroundPosition = 'center';
          style.backgroundRepeat = 'no-repeat';
        } else if (type === 'color') {
          style.backgroundColor = color;
        } else {
          style.backgroundColor = '#f5f8f7';
        }
        
        return style;
      },
      currentDesktopWindows() {
        return this.system.openWindows.filter(win => win.desktopId === this.system.currentDesktopId);
      }
    },
    methods: {
      onDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move';
        }
      },
      onDrop(e) {
        e.preventDefault();
        const action = e.dataTransfer?.getData('action');
        const appId = e.dataTransfer?.getData('text/plain');
        
        if (action === 'unpin' && appId) {
          this.system.unpinApp(appId);
        }
      },
      openBackgroundSettings() {
        _.$openModal({
          title: '桌面背景设置',
          url: '@/components/DesktopWorkspace/BackgroundSettings.vue',
          parent: this,
          desktopId: this.system.currentDesktopId,
          onSave: (background) => {
            console.log('背景设置已保存:', background);
          }
        });
      }
    },
    mounted() {
      // 初始化系统状态
      this.system.init();
    }
  };
}
</script>

<style lang="less">
.desktop-workspace {
  width: 100vw;
  height: 100vh;
  background-color: #f5f8f7;
  position: relative;
  overflow: hidden;

  &__top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  &__desktop {
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 40px; // 为顶部栏留出空间

    &__background {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
    }

    &__icons {
      position: absolute;
      top: 60px;
      left: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fill, 80px);
      gap: 20px;
      z-index: 10;
    }

    &__windows {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    }

    &__dock {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
    }
  }
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .desktop-workspace {
    &__desktop {
      &__icons {
        grid-template-columns: repeat(auto-fill, 60px);
        gap: 15px;
      }

      &__dock {
        bottom: 10px;
      }
    }
  }

  .window {
    &__title-bar {
      height: 36px;

      &__left {
        &__icon {
          width: 20px;
          height: 20px;
        }

        &__title {
          font-size: 12px;
        }
      }

      &__right {
        &__button {
          width: 28px;
          height: 28px;
        }
      }
    }
  }

  .dock {
    min-width: 300px;
    height: 50px;

    &__item {
      &__icon {
        width: 36px;
        height: 36px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .desktop-workspace {
    &__desktop {
      &__icons {
        grid-template-columns: repeat(auto-fill, 50px);
        gap: 10px;
      }
    }
  }

  .window {
    &__title-bar {
      height: 32px;

      &__left {
        &__icon {
          width: 16px;
          height: 16px;
        }

        &__title {
          font-size: 10px;
        }
      }

      &__right {
        &__button {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .dock {
    min-width: 250px;
    height: 40px;

    &__item {
      &__icon {
        width: 32px;
        height: 32px;
      }
    }
  }
}

.window-fade-enter-active,
.window-fade-leave-active {
  transition: opacity 0.3s ease;
}

.window-fade-enter,
.window-fade-leave-to {
  opacity: 0;
}
</style>