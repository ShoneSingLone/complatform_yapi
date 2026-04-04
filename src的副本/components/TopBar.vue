<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useSystemStore } from '@/store';
import { Wifi, Battery, Volume2, User } from 'lucide-vue-next';

export default defineComponent({
  name: 'TopBar',
  components: {
    Wifi,
    Battery,
    Volume2,
    User
  },
  setup() {
    const system = useSystemStore();
    const currentTime = ref(new Date());

    let timer: number;

    onMounted(() => {
      timer = window.setInterval(() => {
        currentTime.value = new Date();
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
      });
    };

    return {
      system,
      currentTime,
      formatTime,
      formatDate
    };
  }
});
</script>

<template>
  <div class="top-bar">
    <div class="top-bar__left">
      <span class="top-bar__left__title">Workspace</span>
    </div>
    
    <div class="top-bar__right">
      <div class="top-bar__right__system">
        <Wifi :size="16" />
        <Volume2 :size="16" />
        <Battery :size="16" />
      </div>
      
      <div class="top-bar__right__date-time">
        <span>{{ formatDate(currentTime) }}</span>
        <span>{{ formatTime(currentTime) }}</span>
      </div>
      
      <div class="top-bar__right__user">
        <User :size="16" />
        <span>{{ system.currentUser?.username || 'User' }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../styles/bem-global.less';
</style>
