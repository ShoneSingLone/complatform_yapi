<template>
  <div class="window-modal">
    <!-- Title Bar -->
    <div class="window-modal__titlebar">
      <div class="window-modal__title">
        <div 
          class="window-modal__title-icon" 
          :style="{ color: appColor }">
          {{ appIcon }}
        </div>
        <span>{{ window.title }}</span>
      </div>
      <div class="window-modal__controls">
        <button 
          @click="handleMinimize" 
          title="Minimize"
          class="window-modal__control-btn">
          <xIcon icon="minus" size="20" />
        </button>
        <button 
          @click="handleMaximize" 
          title="Maximize"
          class="window-modal__control-btn">
          <xIcon :icon="window.isMaximized ? 'copy' : 'square'" size="16" />
        </button>
        <button 
          @click="handleClose" 
          title="Close"
          class="window-modal__control-btn window-modal__control-btn--close">
          <xIcon icon="x" size="20" />
        </button>
      </div>
    </div>
    
    <!-- Content Area -->
    <div class="window-modal__content">
      <!-- App-specific content -->
      <div v-if="isApiManagerApp" class="h-full">
        <ApiManager :window-data="window.data" />
      </div>
      <div v-else-if="isExploreApp" class="h-full">
        <Explore />
      </div>
      <div v-else class="window-modal__placeholder">
        <div 
          class="window-modal__placeholder-icon" 
          :style="{ color: appColor }">
          {{ appIcon }}
        </div>
        <p class="window-modal__placeholder-text">
          The <strong>{{ window.title }}</strong> module is currently under development.
        </p>
        <button class="window-modal__placeholder-btn">Request Feature</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL, window }) {
  	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

  const [ApiManager, Explore] = await _.$importVue([
    '@/views/v1/components/modules/ApiManager.vue',
    '@/views/v1/components/modules/Explore.vue'
  ]);

  return {
    		props: useDialogProps(),

    components: {
      ApiManager,
      Explore
    },
    // system: v1 Desktop Workspace 局部状态（来自 ViewXspace）
    inject: ['system'],
    data() {
      return {
        window,
      };
    },
    computed: {
      appIcon() {
        const app = this.system.apps.find(a => a.id === this.window.appId);
        return app ? app.name.charAt(0) : '?';
      },
      appColor() {
        const app = this.system.apps.find(a => a.id === this.window.appId);
        return app ? app.color : '#0061a4';
      },
      isApiManagerApp() {
        return [
          'api', 'group', 'project', 'api_folder', 'doc_folder',
          'folder', 'api_endpoint', 'doc', 'code', 'member_list',
          'setting', 'cicd'
        ].includes(this.window.appId);
      },
      isExploreApp() {
        return this.window.appId === 'explore';
      }
    },
    methods: {
      handleClose() {
        this.system.closeWindow(this.window.id);
        this.closeModal();
      },
      handleMinimize() {
        this.system.minimizeWindow(this.window.id);
        this.closeModal();
      },
      handleMaximize() {
        this.system.toggleMaximize(this.window.id);
        // For maximize, we need to refresh the modal
        this.closeModal();
        this.system.openApp(this.window.appId, false, this.window.data);
      }
    }
  };
}
</script>

<style lang="less">
.window-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-surface);
  border-radius: var(--border-radius--mini);
  overflow: hidden;

  &__titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 56px;
    background-color: var(--color-surface-container);
    border-bottom: 1px solid var(--color-outline-variant);
    cursor: default;
    user-select: none;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 12px;

    &-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background-color: var(--color-surface-container-highest);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-primary);
    }

    span {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-on-surface);
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__control-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: rgba(26, 28, 30, 0.08);
    }

    &:active {
      background-color: rgba(26, 28, 30, 0.12);
    }

    &--close {
      &:hover {
        background-color: rgba(186, 26, 26, 0.1);
        color: var(--color-error);
      }

      &:active {
        background-color: rgba(186, 26, 26, 0.2);
      }
    }
  }

  &__content {
    flex: 1;
    overflow: auto;
    padding: 24px;
    background-color: var(--color-surface);
  }

  &__placeholder {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 0;

    &-icon {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      background-color: var(--color-secondary-container);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--color-on-secondary-container);
      margin-bottom: 24px;
    }

    &-text {
      color: var(--color-on-surface-variant);
      margin-bottom: 24px;
      font-size: 1.125rem;
    }

    &-btn {
      padding: 0.625rem 1.5rem;
      background-color: var(--color-primary);
      color: var(--color-on-primary);
      border-radius: 9999px;
      font-weight: 500;
      font-size: 0.875rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      }

      &:active {
        background-color: rgba(0, 97, 164, 0.9);
      }
    }
  }
}

// 复用项目通用样式类
.h-full {
  height: 100%;
}
</style>
