<template>
  <div class="dock">
    <div class="dock-content">
      <!-- 应用图标 -->
      <div
        v-for="app in visibleApps"
        :key="app.id"
        class="dock-item"
        :class="{ active: isAppActive(app.id) }"
        @click="handleAppClick(app)"
        @mouseenter="handleMouseEnter(app)"
        @mouseleave="handleMouseLeave"
      >
        <div class="dock-icon-wrapper">
          <xIcon :icon="app.icon" class="dock-icon" />
          <!-- 窗口预览 -->
          <div v-if="showPreview && hoveredApp === app.id" class="window-preview">
            <div
              v-for="window in getAppWindows(app.id)"
              :key="window.id"
              class="preview-item"
              @click.stop="handleWindowFocus(window.id)"
            >
              <xIcon :icon="window.icon" />
              <span>{{ window.title }}</span>
            </div>
          </div>
        </div>
        <!-- 指示器 -->
        <div v-if="getAppWindows(app.id).length > 0" class="dock-indicator"></div>
      </div>

      <!-- 分隔线 -->
      <div class="dock-divider"></div>

      <!-- Launcher -->
      <div
        class="dock-item launcher"
        @click="handleLauncherClick"
      >
        <div class="dock-icon-wrapper">
          <xIcon icon="apps" class="dock-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    props: {
      apps: {
        type: Array,
        default: () => []
      },
      windowGroups: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        showPreview: false,
        hoveredApp: null,
        previewTimeout: null
      };
    },
    computed: {
      // 只显示非隐藏应用
      visibleApps() {
        return this.apps.filter(app => !app.isHidden);
      }
    },
    methods: {
      // 获取应用对应的窗口
      getAppWindows(appId) {
        return this.windowGroups[appId] || [];
      },

      // 检查应用是否有活动窗口
      isAppActive(appId) {
        const windows = this.getAppWindows(appId);
        return windows.some(w => w.isFocused);
      },

      // 处理应用点击
      handleAppClick(app) {
        const windows = this.getAppWindows(app.id);

        if (windows.length === 0) {
          // 没有窗口，启动新窗口
          this.$emit('launch', app.id);
        } else if (windows.length === 1) {
          // 只有一个窗口，聚焦/最小化切换
          this.$emit('windowFocus', windows[0].id);
        } else {
          // 多个窗口，显示预览
          this.showPreview = true;
        }
      },

      // 处理鼠标进入
      handleMouseEnter(app) {
        this.hoveredApp = app.id;
        this.previewTimeout = setTimeout(() => {
          const windows = this.getAppWindows(app.id);
          if (windows.length > 1) {
            this.showPreview = true;
          }
        }, 300);
      },

      // 处理鼠标离开
      handleMouseLeave() {
        if (this.previewTimeout) {
          clearTimeout(this.previewTimeout);
        }
        this.hoveredApp = null;
        this.showPreview = false;
      },

      // 处理窗口聚焦
      handleWindowFocus(windowId) {
        this.showPreview = false;
        this.$emit('windowFocus', windowId);
      },

      // 处理 Launcher 点击
      handleLauncherClick() {
        console.log('打开 Launcher');
        // TODO: 实现 Launcher 菜单
      }
    }
  };
}
</script>

<style lang="less">
.dock {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  .dock-content {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .dock-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    .dock-icon-wrapper {
      position: relative;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.1);
        background: rgba(255, 255, 255, 0.2);
      }

      .dock-icon {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.9);
      }

      // 窗口预览
      .window-preview {
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        min-width: 160px;
        background: rgba(30, 30, 40, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

        .preview-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          i {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.8);
          }

          span {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            white-space: nowrap;
          }
        }
      }
    }

    .dock-indicator {
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      margin-top: 4px;
    }

    &.active {
      .dock-icon-wrapper {
        background: rgba(0, 122, 255, 0.3);
      }

      .dock-indicator {
        background: #007aff;
      }
    }

    &.launcher {
      .dock-icon-wrapper {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  .dock-divider {
    width: 1px;
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 0 4px;
  }
}
</style>
