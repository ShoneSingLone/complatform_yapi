<script lang="ts">
import { defineComponent, ref, computed, defineAsyncComponent } from 'vue';
import { useSystemStore, type WindowState } from '@/store';
import { X, Minus, Square, Copy, Pin } from 'lucide-vue-next';
import * as Icons from 'lucide-vue-next';
import { useDraggable } from '@vueuse/core';

const ApiManager = defineAsyncComponent(() => import('./modules/ApiManager.vue'));
const Explore = defineAsyncComponent(() => import('./modules/Explore.vue'));

export default defineComponent({
  name: 'Window',
  components: {
    X,
    Minus,
    Square,
    Copy,
    Pin,
    ApiManager,
    Explore
  },
  props: {
    window: {
      type: Object as () => WindowState,
      required: true
    }
  },
  setup(props) {
    const system = useSystemStore();
    const windowRef = ref<HTMLElement | null>(null);
    const handleRef = ref<HTMLElement | null>(null);

    // Use VueUse for dragging
    const { x, y, isDragging } = useDraggable(windowRef, {
      initialValue: { x: props.window.x, y: props.window.y },
      handle: handleRef,
      onStart: () => {
        system.focusWindow(props.window.id);
      },
      onMove: (pos) => {
        props.window.x = pos.x;
        props.window.y = pos.y;
      }
    });

    const handleClose = () => system.closeWindow(props.window.id);
    const handleMinimize = () => system.minimizeWindow(props.window.id);
    const handleMaximize = () => system.toggleMaximize(props.window.id);

    const isActive = computed(() => system.activeWindowId === props.window.id);

    const pinToDesktop = () => {
      const app = system.apps.find(a => a.id === props.window.appId);
      if (!app) return;
      system.addShortcut({
        id: props.window.data ? `shortcut-${props.window.data.id}` : `shortcut-${app.id}`,
        appId: app.id,
        name: props.window.title,
        icon: app.icon,
        color: app.color,
        data: props.window.data
      });
    };

    const getIcon = (name: string) => (Icons as any)[name];

    return {
      system,
      windowRef,
      handleRef,
      x,
      y,
      isDragging,
      isActive,
      handleClose,
      handleMinimize,
      handleMaximize,
      pinToDesktop,
      getIcon
    };
  }
});
</script>

<template>
  <Transition name="hero">
    <div 
      v-show="!window.isMinimized"
      ref="windowRef"
      class="window"
      :class="[
        window.isMaximized ? 'window--maximized' : '',
        isActive ? 'window--active' : 'window--inactive',
        !isDragging ? 'window--transition' : ''
      ]"
      :style="window.isMaximized ? { zIndex: window.zIndex } : { 
        zIndex: window.zIndex, 
        width: window.width + 'px', 
        height: window.height + 'px',
        transform: `translate(${x}px, ${y}px)`
      }"
      @mousedown="system.focusWindow(window.id)"
    >
      <!-- Title Bar -->
      <div 
        ref="handleRef"
        class="window__title-bar"
      >
        <div class="window__title-bar__left">
          <div class="window__title-bar__left__icon">
             <component :is="getIcon(system.apps.find(a => a.id === window.appId)?.icon || 'HelpCircle')" :size="18" />
          </div>
          <span class="window__title-bar__left__title">{{ window.title }}</span>
        </div>
        
        <div class="window__title-bar__right">
          <button @click.stop="pinToDesktop" class="window__title-bar__right__button" title="Pin to Desktop">
            <Pin :size="20" />
          </button>
          <button @click.stop="handleMinimize" class="window__title-bar__right__button">
            <Minus :size="20" />
          </button>
          <button @click.stop="handleMaximize" class="window__title-bar__right__button">
            <component :is="window.isMaximized ? Copy : Square" :size="16" />
          </button>
          <button @click.stop="handleClose" class="window__title-bar__right__button window__title-bar__right__button--close">
            <X :size="20" />
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
            
            <div v-else class="window__content__inner__body__placeholder">
               <div class="window__content__inner__body__placeholder__icon">
                  <component :is="getIcon(system.apps.find(a => a.id === window.appId)?.icon || 'HelpCircle')" :size="40" />
               </div>
               <p class="window__content__inner__body__placeholder__text">The <strong>{{ window.title }}</strong> module is currently under development.</p>
               <button class="window__content__inner__body__placeholder__button">Request Feature</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="less">
@import '../styles/bem-global.less';

.window {
  &--transition {
    transition: width 0.3s ease-out, height 0.3s ease-out, transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  
  &__content {
    &__inner {
      &__body {
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
            border-radius: var(--radius-m3-large);
            background-color: var(--bg-secondary-container);
            color: var(--text-on-secondary-container);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
          }
          
          &__text {
            color: var(--text-on-surface-variant);
            margin-bottom: 24px;
            font-size: 18px;
          }
          
          &__button {
            padding: 12px 24px;
            background-color: var(--color-primary);
            color: var(--text-on-primary);
            border-radius: var(--radius-lg);
            font-weight: 500;
            transition: all 200ms ease;
            
            &:hover {
              background-color: var(--color-primary-container);
            }
          }
        }
      }
    }
  }
}
</style>
