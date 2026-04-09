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

<style lang="less">
/* 顶部栏样式 */
.h-8 {
  height: 32px;
}

.bg-surface-container-highest\/80 {
  background-color: rgba(230, 224, 233, 0.8);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.flex {
  display: flex;
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

.text-xs {
  font-size: 0.75rem;
}

.font-medium {
  font-weight: 500;
}

.font-bold {
  font-weight: 700;
}

.text-on-surface {
  color: var(--color-on-surface);
}

.text-on-surface-variant {
  color: var(--color-on-surface-variant);
}

.select-none {
  user-select: none;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}

.bg-surface-container {
  background-color: var(--color-surface-container);
}

.px-2 {
  padding-left: 8px;
  padding-right: 8px;
}

.py-1 {
  padding-top: 4px;
  padding-bottom: 4px;
}

.rounded-full {
  border-radius: 9999px;
}

.bg-transparent {
  background-color: transparent;
}

.outline-none {
  outline: none;
}

.w-32 {
  width: 128px;
}

.placeholder\:text-on-surface-variant\/50::placeholder {
  color: rgba(67, 71, 78, 0.5);
}
</style>
