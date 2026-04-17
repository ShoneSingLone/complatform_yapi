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
        return app ? app.color : '#0061a4';
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
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #f7f8fb 0%, #eef1f6 100%);
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow:
    0 18px 48px rgba(31, 41, 55, 0.14),
    0 6px 18px rgba(31, 41, 55, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  &__titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 22px;
    min-height: 72px;
    background: rgba(250, 251, 253, 0.92);
    border-bottom: 1px solid rgba(148, 163, 184, 0.16);
    backdrop-filter: blur(16px);
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
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(241, 245, 249, 0.98) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--window-accent, var(--color-primary));
      box-shadow:
        0 8px 18px rgba(148, 163, 184, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.85);
    }

    &-copy {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &-text {
      font-size: 0.98rem;
      font-weight: 600;
      color: #18212f;
      letter-spacing: 0.01em;
    }

    &-meta {
      font-size: 0.76rem;
      font-weight: 500;
      color: #7b8798;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__control-btn {
    width: 38px;
    height: 38px;
    border: 1px solid rgba(148, 163, 184, 0.16);
    background: rgba(255, 255, 255, 0.72);
    color: #4a5565;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 8px 18px rgba(148, 163, 184, 0.14);

    &:hover {
      transform: translateY(-1px);
      background-color: rgba(255, 255, 255, 0.96);
      box-shadow: 0 12px 24px rgba(148, 163, 184, 0.18);
    }

    &:active {
      transform: translateY(0);
      background-color: rgba(241, 245, 249, 0.96);
      box-shadow: 0 6px 14px rgba(148, 163, 184, 0.16);
    }

    &--close {
      &:hover {
        background-color: rgba(255, 235, 238, 0.96);
        border-color: rgba(244, 114, 182, 0.18);
        color: #c2416b;
      }

      &:active {
        background-color: rgba(255, 228, 230, 1);
      }
    }
  }

  &__content {
    flex: 1;
    overflow: auto;
    padding: 18px;
    background: linear-gradient(180deg, rgba(245, 247, 251, 0.9) 0%, rgba(238, 241, 246, 0.92) 100%);
  }

  &__stage {
    height: 100%;
    border-radius: 22px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.58);
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.72),
      0 8px 24px rgba(148, 163, 184, 0.12);

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
    border-radius: 22px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.76) 0%, rgba(248, 250, 252, 0.95) 100%);
    border: 1px solid rgba(255, 255, 255, 0.84);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      0 12px 28px rgba(148, 163, 184, 0.12);

    &-icon {
      width: 92px;
      height: 92px;
      border-radius: 26px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(238, 244, 248, 0.96) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: var(--window-accent, var(--color-primary));
      margin-bottom: 20px;
      box-shadow:
        0 12px 28px rgba(148, 163, 184, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.92);
    }

    &-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
      padding: 0 14px;
      margin-bottom: 16px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(148, 163, 184, 0.12);
      color: #708094;
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
      color: #16202d;
    }

    &-text {
      max-width: 540px;
      margin: 0 0 28px;
      color: #6d7b8d;
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
      background: linear-gradient(180deg, var(--window-accent, var(--color-primary)) 0%, #3a6fb4 100%);
      color: #ffffff;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.875rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 14px 30px rgba(58, 111, 180, 0.22);

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 18px 32px rgba(58, 111, 180, 0.26);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 10px 20px rgba(58, 111, 180, 0.22);
      }

      &--ghost {
        background: rgba(255, 255, 255, 0.76);
        color: #445163;
        border: 1px solid rgba(148, 163, 184, 0.18);
        box-shadow: 0 10px 24px rgba(148, 163, 184, 0.12);
      }
    }
  }
}

// 复用项目通用样式类
.h-full {
  height: 100%;
}
</style>
