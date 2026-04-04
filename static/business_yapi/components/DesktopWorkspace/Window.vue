<template>
  <div
    class="window"
    :class="{
      active: isActive,
      maximized: window.isMaximized
    }"
    :style="windowStyle"
    @mousedown="handleFocus"
  >
    <!-- 窗口标题栏 -->
    <div class="window-titlebar">
      <div class="window-title">
        <xIcon :icon="window.icon || 'file'" class="window-title-icon" />
        <span class="window-title-text">{{ window.title }}</span>
      </div>
      <div class="window-controls">
        <button class="window-btn pin" @click="handlePin" title="固定到桌面">
          <xIcon icon="pushpin" />
        </button>
        <button class="window-btn minimize" @click="handleMinimize" title="最小化">
          <xIcon icon="minus" />
        </button>
        <button class="window-btn maximize" @click="handleMaximize" title="最大化">
          <xIcon :icon="window.isMaximized ? 'restore' : 'maximize'" />
        </button>
        <button class="window-btn close" @click="handleClose" title="关闭">
          <xIcon icon="close" />
        </button>
      </div>
    </div>

    <!-- 窗口内容 -->
    <div class="window-content">
      <!-- 根据资源类型渲染不同内容 -->
      <component
        :is="getContentComponent(window.resourceType)"
        :data="window.data"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  // 动态加载内容组件
  const [ApiContent, DefaultContent] = await _.$importVue([
    "@/components/DesktopWorkspace/contents/ApiContent.vue",
    "@/components/DesktopWorkspace/contents/DefaultContent.vue"
  ]);

  return {
    components: {
      ApiContent,
      DefaultContent
    },
    props: {
      window: {
        type: Object,
        required: true
      },
      isActive: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      windowStyle() {
        return {
          zIndex: this.window.zIndex,
          left: this.window.isMaximized ? 0 : this.window.position.x + 'px',
          top: this.window.isMaximized ? 0 : this.window.position.y + 'px',
          width: this.window.isMaximized ? '100%' : this.window.size.width,
          height: this.window.isMaximized ? '100%' : this.window.size.height
        };
      }
    },
    methods: {
      handleFocus() {
        this.$emit('focus');
      },
      handleMinimize() {
        this.$emit('minimize');
      },
      handleMaximize() {
        this.$emit('maximize');
      },
      handleClose() {
        this.$emit('close');
      },
      handlePin() {
        this.$emit('pin');
      },
      getContentComponent(type) {
        // 根据资源类型返回对应的组件
        const componentMap = {
          api: 'ApiContent'
        };
        return componentMap[type] || 'DefaultContent';
      }
    }
  };
}
</script>

<style lang="less">
.window {
  position: absolute;
  display: flex;
  flex-direction: column;
  background: rgba(30, 30, 40, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: box-shadow 0.2s;
  animation: windowOpen 0.3s ease;

  &.active {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &.maximized {
    border-radius: 0;
    border: none;
  }

  .window-titlebar {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: default;

    .window-title {
      display: flex;
      align-items: center;
      gap: 8px;

      .window-title-icon {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
      }

      .window-title-text {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
      }
    }

    .window-controls {
      display: flex;
      gap: 6px;

      .window-btn {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;

        i {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);

          i {
            color: rgba(255, 255, 255, 0.9);
          }
        }

        &.close:hover {
          background: #ff3b30;

          i {
            color: #fff;
          }
        }

        &.pin:hover {
          background: rgba(0, 122, 255, 0.3);
        }
      }
    }
  }

  .window-content {
    flex: 1;
    overflow: auto;
    padding: 16px;
  }
}

@keyframes windowOpen {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
