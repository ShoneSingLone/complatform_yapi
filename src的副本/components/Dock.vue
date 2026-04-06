<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useSystemStore, type WindowState } from '@/store';
import * as Icons from 'lucide-vue-next';

export default defineComponent({
  name: 'Dock',
  components: {
    Icons
  },
  setup() {
    const system = useSystemStore();
    const hoveredAppId = ref<string | null>(null);
    const isDraggingOver = ref(false);

    const activeApps = computed(() => {
      return system.apps
        .map(app => {
          const windows = system.openWindows.filter(w => w.appId === app.id);
          return {
            ...app,
            windows,
            isOpen: windows.length > 0,
            isPinned: system.pinnedApps.includes(app.id),
            isActive: system.activeWindowId && system.openWindows.find(w => w.id === system.activeWindowId)?.appId === app.id
          };
        })
        .filter(app => app.isOpen || app.isPinned);
    });

    const getIcon = (name: string) => (Icons as any)[name];

    const handleAppClick = (appId: string) => {
      system.openApp(appId);
    };

    const focusSpecificWindow = (windowId: string) => {
      const win = system.openWindows.find(w => w.id === windowId);
      if (win) {
        win.isMinimized = false;
        system.focusWindow(windowId);
      }
    };

    const openNewWindow = (appId: string) => {
      system.openApp(appId, true);
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      isDraggingOver.value = true;
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    const onDragLeave = (e: DragEvent) => {
      isDraggingOver.value = false;
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      isDraggingOver.value = false;
      
      // Handle internal app icons
      const appId = e.dataTransfer?.getData('text/plain');
      if (appId) {
        system.pinApp(appId);
        return;
      }
      
      // Handle external files
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        // Create a temporary app for the file
        const fileAppId = 'file-' + Date.now();
        system.apps.push({
          id: fileAppId,
          name: file.name,
          icon: 'File',
          color: '#888888',
          component: 'NoteManager' // Open in NoteManager by default
        });
        system.pinApp(fileAppId);
      }
    };

    const onDragStart = (e: DragEvent, appId: string) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', appId);
        e.dataTransfer.setData('action', 'unpin');
        e.dataTransfer.effectAllowed = 'move';
      }
    };

    return {
      system,
      hoveredAppId,
      isDraggingOver,
      activeApps,
      getIcon,
      handleAppClick,
      focusSpecificWindow,
      openNewWindow,
      onDragOver,
      onDragLeave,
      onDrop,
      onDragStart
    };
  }
});
</script>

<template>
  <div 
    class="dock" 
    :class="{ 'dock--dragging-over': isDraggingOver }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    
    <!-- Launcher Button (Always Visible) -->
    <div class="dock__item">
      <div class="dock__item__tooltip">
        Menu
      </div>
      <div class="dock__item__icon">
        <Icons.LayoutGrid :size="24" />
      </div>
    </div>

    <div class="dock__divider"></div>

    <TransitionGroup name="hero">
      <div
        v-for="app in activeApps" 
        :key="app.id"
        class="dock__item"
        draggable="true"
        @dragstart="onDragStart($event, app.id)"
        @mouseenter="hoveredAppId = app.id"
        @mouseleave="hoveredAppId = null"
        @click="handleAppClick(app.id)"
      >
        <!-- Window Previews / Thumbnails -->
        <Transition name="hero">
          <div 
            v-if="hoveredAppId === app.id && app.isOpen"
            class="dock__item__preview"
            @mouseenter="hoveredAppId = app.id"
            @mouseleave="hoveredAppId = null"
          >
            <!-- Transition Area -->
            <div class="dock__item__preview__transition"></div>
            <div class="dock__item__preview__header">
              <span class="dock__item__preview__title">{{ app.name }}</span>
              <button 
                @click.stop="openNewWindow(app.id)"
                class="dock__item__preview__button"
                title="Open New Window"
              >
                <Icons.Plus :size="16" />
              </button>
            </div>
            
            <div class="dock__item__preview__windows custom-scrollbar">
              <div 
                v-for="win in app.windows" 
                :key="win.id"
                class="dock__item__preview__window"
                @click.stop="focusSpecificWindow(win.id)"
              >
                <div class="dock__item__preview__window__icon">
                  <component :is="getIcon(app.icon)" :size="20" />
                </div>
                <div class="dock__item__preview__window__info">
                  <span class="dock__item__preview__window__title">{{ win.title }}</span>
                  <span class="dock__item__preview__window__status">{{ win.isMinimized ? 'Minimized' : 'Active' }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Tooltip (only if no windows open) -->
        <div 
          v-if="!app.isOpen"
          class="dock__item__tooltip"
        >
          {{ app.name }}
        </div>

        <!-- Icon Container -->
        <div 
          class="dock__item__icon"
          :class="[
            app.isActive ? 'dock__item__icon--active' : '',
            system.lastOpenedAppId === app.id ? 'animate-m3-scale-in' : ''
          ]"
        >
          <component :is="getIcon(app.icon)" :size="24" />
        </div>

        <!-- Indicator Pill -->
        <div class="dock__item__indicator">
          <div 
            v-if="app.isOpen"
            class="dock__item__indicator__dot"
            :class="app.isActive ? 'dock__item__indicator__dot--active' : 'dock__item__indicator__dot--inactive'"
          ></div>
        </div>
      </div>
    </TransitionGroup>
    
    <div class="dock__divider"></div>
    
    <!-- Settings Icon -->
    <div class="dock__item">
       <div class="dock__item__tooltip">
        Settings
      </div>
       <div class="dock__item__icon">
         <Icons.Settings :size="24" />
       </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../styles/bem-global.less';
</style>
