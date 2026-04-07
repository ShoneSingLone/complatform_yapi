<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    inject: ['system'],
    data() {
      return {
        time: '',
        timer: null
      };
    },
    methods: {
      updateTime() {
        const now = new Date();
        this.time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    },
    mounted() {
      this.updateTime();
      this.timer = setInterval(this.updateTime, 1000);
    },
    beforeUnmount() {
      clearInterval(this.timer);
    }
  };
}
</script>

<template>
  <div class="h-8 bg-surface-container-highest/80 backdrop-blur-md flex items-center justify-between px-4 text-xs font-medium text-on-surface select-none">
    <div class="flex items-center gap-4">
      <span class="font-bold">Workspace</span>
      <div class="flex items-center gap-2 text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
        <xIcon icon="search" size="12" />
        <input type="text" placeholder="Search..." class="bg-transparent outline-none w-32 placeholder:text-on-surface-variant/50" />
      </div>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3 text-on-surface-variant">
        <xIcon icon="wifi" size="14" />
        <xIcon icon="battery" size="14" />
        <xIcon icon="bell" size="14" />
      </div>
      <span>{{ time }}</span>
    </div>
  </div>
</template>
