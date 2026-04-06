<script lang="ts">
import { defineComponent } from 'vue';
import { useSystemStore } from '@/store';
import DesktopIcon from './components/DesktopIcon.vue';
import Dock from './components/Dock.vue';
import Window from './components/Window.vue';
import AuthScreen from './components/AuthScreen.vue';
import TopBar from './components/TopBar.vue';
import { Monitor } from 'lucide-vue-next';

export default defineComponent({
  name: 'App',
  components: {
    DesktopIcon,
    Dock,
    Window,
    AuthScreen,
    TopBar,
    Monitor
  },
  setup() {
    const system = useSystemStore();

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const action = e.dataTransfer?.getData('action');
      const appId = e.dataTransfer?.getData('text/plain');
      
      if (action === 'unpin' && appId) {
        system.unpinApp(appId);
      }
    };

    return {
      system,
      onDragOver,
      onDrop
    };
  }
});
</script>

<template>
  <AuthScreen v-if="!system.isAuthenticated" />
  
  <div 
    v-else
    class="app"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <!-- Top Bar -->
    <TopBar class="app__top-bar" />

    <!-- Desktop Area -->
    <div class="app__desktop">
      <!-- Background Logo -->
      <div class="app__desktop__background">
        <Monitor :size="400" />
      </div>

      <!-- Desktop Icons Grid -->
      <div class="app__desktop__icons">
        <DesktopIcon 
          v-for="shortcut in system.shortcuts" 
          :key="shortcut.id" 
          :app="shortcut" 
          @click="system.openApp(shortcut.appId, false, shortcut.data)"
          @unpin="system.removeShortcut(shortcut.id)"
        />
      </div>

      <!-- Windows Layer -->
      <div class="app__desktop__windows">
        <TransitionGroup name="hero">
          <Window 
            v-for="win in system.openWindows" 
            :key="win.id" 
            :window="win"
          />
        </TransitionGroup>
      </div>

      <!-- Bottom Dock -->
      <div class="app__desktop__dock">
        <Dock />
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import './styles/bem-global.less';
</style>
