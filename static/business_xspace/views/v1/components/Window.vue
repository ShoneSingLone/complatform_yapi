<template>
  <Transition name="hero">
    <div
      v-show="!window.isMinimized"
      ref="windowRef"
      class="absolute pointer-events-auto flex flex-col overflow-hidden bg-surface elevation-3"
      :class="[
        window.isMaximized
          ? '!inset-0 !w-full !h-full !translate-x-0 !translate-y-0 rounded-none'
          : 'rounded-m3-large border border-outline-variant-50',
        isActive ? 'z-30' : 'z-20',
        !isDragging
          ? 'transition-[width,height,transform,opacity] duration-300 ease-out'
          : ''
      ]"
      :style="
        window.isMaximized
          ? { zIndex: window.zIndex }
          : {
              zIndex: window.zIndex,
              width: window.width + 'px',
              height: window.height + 'px',
              transform: `translate(${x}px, ${y}px)`
            }
      "
      @mousedown="system.focusWindow(window.id)">
      <!-- Title Bar -->
      <div
        ref="handleRef"
        class="h-14 flex items-center justify-between px-4 bg-surface-container border-b border-outline-variant cursor-default select-none">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-m3-small flex items-center justify-center bg-surface-container-highest text-primary"
            :style="{ color: system.apps.find(a => a.id === window.appId)?.color }">
            <div class="text-lg font-bold">{{ system.apps.find(a => a.id === window.appId)?.name.charAt(0) || '?' }}</div>
          </div>
          <span class="text-sm font-medium text-on-surface">{{ window.title }}</span>
        </div>

        <div class="flex items-center gap-1">
          <button
            @click.stop="pinToDesktop"
            class="w-10 h-10 flex items-center justify-center hover:bg-on-surface/8 active:bg-on-surface/12 rounded-full transition-colors"
            title="Pin to Desktop">
            <xIcon icon="pin" size="20" class="text-on-surface-variant" />
          </button>
          <button
            @click.stop="handleMinimize"
            class="w-10 h-10 flex items-center justify-center hover:bg-on-surface/8 active:bg-on-surface/12 rounded-full transition-colors">
            <xIcon icon="minus" size="20" class="text-on-surface-variant" />
          </button>
          <button
            @click.stop="handleMaximize"
            class="w-10 h-10 flex items-center justify-center hover:bg-on-surface/8 active:bg-on-surface/12 rounded-full transition-colors">
            <xIcon :icon="window.isMaximized ? 'copy' : 'square'" size="16" class="text-on-surface-variant" />
          </button>
          <button
            @click.stop="handleClose"
            class="w-10 h-10 flex items-center justify-center hover:bg-error/10 active:bg-error/20 text-on-surface-variant hover:text-error rounded-full transition-colors">
            <xIcon icon="x" size="20" />
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-auto bg-surface">
        <div class="h-full p-6">
          <!-- Placeholder Content based on App ID -->
          <div class="h-full">
            <div
              v-if="
                [
                  'api',
                  'group',
                  'project',
                  'api_folder',
                  'doc_folder',
                  'folder',
                  'api_endpoint',
                  'doc',
                  'code',
                  'member_list',
                  'setting',
                  'cicd'
                ].includes(window.appId)
              "
              class="h-full">
              <ApiManager :window-data="window.data" />
            </div>
            <div v-else-if="window.appId === 'explore'" class="h-full">
              <Explore />
            </div>

            <div
              v-else
              class="h-full flex flex-col items-center justify-center text-center py-20">
              <div
                class="w-20 h-20 rounded-m3-large bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6"
                :style="{ color: system.apps.find(a => a.id === window.appId)?.color }">
                <div class="text-3xl font-bold">{{ system.apps.find(a => a.id === window.appId)?.name.charAt(0) || '?' }}</div>
              </div>
              <p class="text-on-surface-variant mb-6 text-lg">
                The <strong>{{ window.title }}</strong> module is currently under development.
              </p>
              <button class="m3-button-primary">Request Feature</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    components: {
      ApiManager: () => _.$importVue('./modules/ApiManager.vue'),
      Explore: () => _.$importVue('./modules/Explore.vue')
    },
    props: {
      window: Object
    },
    // system: v1 Desktop Workspace 局部状态（来自 ViewXspace）
    inject: ['system'],
    data() {
      return {
        windowRef: null,
        handleRef: null,
        x: this.window.x,
        y: this.window.y,
        isDragging: false
      };
    },
    computed: {
      isActive() {
        return this.system.activeWindowId === this.window.id;
      }
    },
    methods: {
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
        const app = this.system.apps.find(a => a.id === this.window.appId);
        if (!app) return;
        this.system.addShortcut({
          id: this.window.data ? `shortcut-${this.window.data.id}` : `shortcut-${app.id}`,
          appId: app.id,
          name: this.window.title,
          icon: app.icon,
          color: app.color,
          data: this.window.data
        });
      },
      focusWindow() {
        this.system.focusWindow(this.window.id);
      }
    },
    mounted() {
      // 简单的拖拽实现
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let startWindowX = 0;
      let startWindowY = 0;

      const handle = this.handleRef;
      if (handle) {
        handle.addEventListener("mousedown", e => {
          if (this.window.isMaximized) return;

          isDragging = true;
          startX = e.clientX;
          startY = e.clientY;
          startWindowX = this.x;
          startWindowY = this.y;
          this.system.focusWindow(this.window.id);
          this.isDragging = true;
        });

        document.addEventListener("mousemove", e => {
          if (!isDragging || this.window.isMaximized) return;

          const deltaX = e.clientX - startX;
          const deltaY = e.clientY - startY;

          this.x = startWindowX + deltaX;
          this.y = startWindowY + deltaY;
          this.window.x = this.x;
          this.window.y = this.y;
        });

        document.addEventListener("mouseup", () => {
          isDragging = false;
          this.isDragging = false;
        });
      }
    }
  };
}
</script>

<style lang="less">
/* 窗口样式 */
.absolute {
  position: absolute;
}

.pointer-events-auto {
  pointer-events: auto;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.overflow-hidden {
  overflow: hidden;
}

.bg-surface {
  background-color: var(--color-surface);
}

.elevation-3 {
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
}

.rounded-m3-large {
  border-radius: 16px;
}

.border {
  border: 1px solid;
}

.border-outline-variant-50 {
  border-color: rgba(195, 199, 207, 0.5);
}

.z-20 {
  z-index: 20;
}

.z-30 {
  z-index: 30;
}

.transition-\[width\,height\,transform\,opacity\] {
  transition-property: width, height, transform, opacity;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

.h-14 {
  height: 56px;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.px-4 {
  padding-left: 16px;
  padding-right: 16px;
}

.bg-surface-container {
  background-color: var(--color-surface-container);
}

.border-b {
  border-bottom: 1px solid;
}

.border-outline-variant {
  border-color: var(--color-outline-variant);
}

.cursor-default {
  cursor: default;
}

.select-none {
  user-select: none;
}

.gap-3 {
  gap: 12px;
}

.w-8 {
  width: 32px;
}

.h-8 {
  height: 32px;
}

.rounded-m3-small {
  border-radius: 8px;
}

.bg-surface-container-highest {
  background-color: var(--color-surface-container-highest);
}

.text-primary {
  color: var(--color-primary);
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: 700;
}

.text-sm {
  font-size: 0.875rem;
}

.font-medium {
  font-weight: 500;
}

.text-on-surface {
  color: var(--color-on-surface);
}

.gap-1 {
  gap: 4px;
}

.w-10 {
  width: 40px;
}

.h-10 {
  height: 40px;
}

.justify-center {
  justify-content: center;
}

.hover\:bg-on-surface\/8:hover {
  background-color: rgba(26, 28, 30, 0.08);
}

.active\:bg-on-surface\/12:active {
  background-color: rgba(26, 28, 30, 0.12);
}

.rounded-full {
  border-radius: 9999px;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.text-on-surface-variant {
  color: var(--color-on-surface-variant);
}

.hover\:bg-error\/10:hover {
  background-color: rgba(186, 26, 26, 0.1);
}

.active\:bg-error\/20:active {
  background-color: rgba(186, 26, 26, 0.2);
}

.hover\:text-error:hover {
  color: var(--color-error);
}

.flex-1 {
  flex: 1;
}

.overflow-auto {
  overflow: auto;
}

.h-full {
  height: 100%;
}

.p-6 {
  padding: 24px;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.text-center {
  text-align: center;
}

.py-20 {
  padding-top: 80px;
  padding-bottom: 80px;
}

.w-20 {
  width: 80px;
}

.h-20 {
  height: 80px;
}

.bg-secondary-container {
  background-color: var(--color-secondary-container);
}

.text-on-secondary-container {
  color: var(--color-on-secondary-container);
}

.mb-6 {
  margin-bottom: 24px;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-on-surface-variant {
  color: var(--color-on-surface-variant);
}

.text-lg {
  font-size: 1.125rem;
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
}

.m3-button-primary:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.m3-button-primary:active {
  background-color: rgba(0, 97, 164, 0.9);
}

/* 窗口过渡动画 */
.hero-enter-active,
.hero-leave-active {
  transition: all 0.3s ease;
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
