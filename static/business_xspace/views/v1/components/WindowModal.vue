<template>
  <div class="window-modal">
    <!-- Title Bar -->
    <div class="window-modal-titlebar">
      <div class="window-modal-title">
        <div 
          class="window-modal-icon" 
          :style="{ color: appColor }">
          {{ appIcon }}
        </div>
        <span>{{ window.title }}</span>
      </div>
      <div class="window-modal-controls">
        <button 
          @click="handleMinimize" 
          title="Minimize"
          class="window-modal-control-btn">
          <xIcon icon="minus" size="20" class="text-on-surface-variant" />
        </button>
        <button 
          @click="handleMaximize" 
          title="Maximize"
          class="window-modal-control-btn">
          <xIcon :icon="window.isMaximized ? 'copy' : 'square'" size="16" class="text-on-surface-variant" />
        </button>
        <button 
          @click="handleClose" 
          title="Close"
          class="window-modal-control-btn window-modal-close-btn">
          <xIcon icon="x" size="20" class="text-on-surface-variant" />
        </button>
      </div>
    </div>
    
    <!-- Content Area -->
    <div class="window-modal-content">
      <!-- App-specific content -->
      <div v-if="isApiManagerApp" class="h-full">
        <ApiManager :window-data="window.data" />
      </div>
      <div v-else-if="isExploreApp" class="h-full">
        <Explore />
      </div>
      <div v-else class="window-modal-placeholder">
        <div 
          class="window-modal-placeholder-icon" 
          :style="{ color: appColor }">
          {{ appIcon }}
        </div>
        <p class="text-on-surface-variant mb-6 text-lg">
          The <strong>{{ window.title }}</strong> module is currently under development.
        </p>
        <button class="m3-button-primary">Request Feature</button>
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
/* Window Modal Styles */
.window-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-surface);
  border-radius: var(--border-radius--mini);
  overflow: hidden;
}

.window-modal-titlebar {
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

.window-modal-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.window-modal-icon {
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

.window-modal-title span {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface);
}

.window-modal-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.window-modal-control-btn {
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
}

.window-modal-close-btn {
  &:hover {
    background-color: rgba(186, 26, 26, 0.1);

    .text-on-surface-variant {
      color: var(--color-error);
    }
  }

  &:active {
    background-color: rgba(186, 26, 26, 0.2);
  }
}

.window-modal-content {
  flex: 1;
  overflow: auto;
  padding: 24px;
  background-color: var(--color-surface);
}

.window-modal-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 0;
}

.window-modal-placeholder-icon {
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

.m3-button-primary {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 97, 164, 0.9);
  }
}

.text-on-surface-variant {
  color: var(--color-on-surface-variant);
}

.mb-6 {
  margin-bottom: 24px;
}

.text-lg {
  font-size: 1.125rem;
}

.h-full {
  height: 100%;
}
</style>