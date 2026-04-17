<template>
  <div class="window-modal" :style="{ '--window-accent': appColor }">
    <!-- Title Bar -->
    <div class="window-modal__titlebar">
      <div class="window-modal__title">
        <div 
          class="window-modal__title-icon" 
          :style="{ color: appColor }">
          {{ appIcon }}
        </div>
        <div class="window-modal__title-copy">
          <span class="window-modal__title-text">{{ window.title }}</span>
          <span class="window-modal__title-meta">{{ windowSubtitle }}</span>
        </div>
      </div>
      <div class="window-modal__controls">
        <button 
          @click="handleMinimize" 
          type="button"
          title="Minimize"
          class="window-modal__control-btn">
          <xIcon icon="minus" size="20" />
        </button>
        <button 
          @click="handleMaximize" 
          type="button"
          title="Maximize"
          class="window-modal__control-btn">
          <xIcon :icon="window.isMaximized ? 'copy' : 'square'" size="16" />
        </button>
        <button 
          @click="handleClose" 
          type="button"
          title="Close"
          class="window-modal__control-btn window-modal__control-btn--close">
          <xIcon icon="x" size="20" />
        </button>
      </div>
    </div>
    
    <!-- Content Area -->
    <div class="window-modal__content">
      <!-- App-specific content -->
      <div v-if="isApiManagerApp" class="window-modal__stage window-modal__stage--embedded h-full">
        <ApiManager :window-data="window.data" />
      </div>
      <div v-else-if="isExploreApp" class="window-modal__stage window-modal__stage--embedded h-full">
        <Explore />
      </div>
      <div v-else class="window-modal__placeholder">
        <div 
          class="window-modal__placeholder-icon" 
          :style="{ color: appColor }">
          {{ appIcon }}
        </div>
        <span class="window-modal__placeholder-badge">Coming soon</span>
        <h3 class="window-modal__placeholder-title">{{ window.title }}</h3>
        <p class="window-modal__placeholder-text">
          This module is being polished for the new workspace experience. You can keep exploring other windows while we finish the details.
        </p>
        <div class="window-modal__placeholder-actions">
          <button type="button" class="window-modal__placeholder-btn">
            Request Feature
          </button>
          <button
            type="button"
            class="window-modal__placeholder-btn window-modal__placeholder-btn--ghost"
            @click="handleClose">
            Close Window
          </button>
        </div>
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
        return app ? app.color : 'var(--color-primary)';
      },
      windowSubtitle() {
        if (this.isApiManagerApp) {
          return 'Project workspace';
        }
        if (this.isExploreApp) {
          return 'Explore content';
        }
        return 'Feature preview';
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
  --window-surface: var(--color-surface);
  --window-surface-alt: var(--color-surface-container-lowest);
  --window-surface-header: color-mix(in srgb, var(--color-surface-container) 92%, white 8%);
  --window-outline: color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
  --window-outline-strong: color-mix(in srgb, var(--color-outline-variant) 75%, transparent);
  --window-shadow: 0 20px 48px rgba(15, 23, 42, 0.16), 0 10px 24px rgba(15, 23, 42, 0.1);

  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--window-surface);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--window-outline);
  box-shadow: var(--window-shadow);

  &__titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 22px;
    min-height: 64px;
    background: var(--window-surface-header);
    border-bottom: 1px solid var(--window-outline-strong);
    backdrop-filter: blur(14px);
    cursor: default;
    user-select: none;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 14px;

    &-icon {
      width: 40px;
      height: 40px;
      border-radius: 14px;
      background: color-mix(in srgb, var(--color-surface-container-highest) 90%, white 10%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--window-accent, var(--color-primary));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    &-copy {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &-text {
      font-size: 0.98rem;
      font-weight: 600;
      color: var(--color-on-surface);
      letter-spacing: 0.01em;
    }

    &-meta {
      font-size: 0.76rem;
      font-weight: 500;
      color: var(--color-on-surface-variant);
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__control-btn {
    width: 36px;
    height: 36px;
    border: 0;
    background: transparent;
    color: var(--color-on-surface-variant);
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.06);
    }

    &:active {
      background: rgba(0, 0, 0, 0.1);
      transform: scale(0.96);
    }

    &--close {
      &:hover {
        background: color-mix(in srgb, var(--el-color-danger-light-9) 92%, white 8%);
        color: var(--el-color-danger);
      }

      &:active {
        background: color-mix(in srgb, var(--el-color-danger-light-8) 92%, white 8%);
      }
    }
  }

  &__content {
    flex: 1;
    overflow: auto;
    padding: 18px;
    background: var(--window-surface-alt);
  }

  &__stage {
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    background: var(--window-surface);
    border: 1px solid var(--window-outline);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);

    &--embedded {
      min-height: 100%;
    }
  }

  &__placeholder {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 56px 24px;
    border-radius: 20px;
    background: var(--window-surface);
    border: 1px solid var(--window-outline);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);

    &-icon {
      width: 92px;
      height: 92px;
      border-radius: 26px;
      background: color-mix(in srgb, var(--color-surface-container-highest) 90%, white 10%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: var(--window-accent, var(--color-primary));
      margin-bottom: 20px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92);
    }

    &-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
      padding: 0 14px;
      margin-bottom: 16px;
      border-radius: 999px;
      background: var(--window-surface-alt);
      border: 1px solid var(--window-outline);
      color: var(--color-on-surface-variant);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    &-title {
      margin: 0 0 12px;
      font-size: 1.5rem;
      line-height: 1.2;
      font-weight: 700;
      color: var(--color-on-surface);
    }

    &-text {
      max-width: 540px;
      margin: 0 0 28px;
      color: var(--color-on-surface-variant);
      font-size: 1rem;
      line-height: 1.7;
    }

    &-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    &-btn {
      min-width: 148px;
      min-height: 46px;
      padding: 0 20px;
      background: var(--el-color-primary);
      color: var(--color-on-primary);
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.875rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

      &:hover {
        background: var(--el-color-primary-hover);
        box-shadow: var(--el-box-shadow-light);
      }

      &:active {
        background: var(--el-color-primary-active);
        transform: scale(0.98);
      }

      &--ghost {
        background: var(--window-surface-alt);
        color: var(--color-on-surface);
        border: 1px solid var(--window-outline);
        box-shadow: none;
      }
    }
  }
}

// 复用项目通用样式类
.h-full {
  height: 100%;
}
</style>
