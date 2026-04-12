<template>
  <div class="top-bar">
    <div class="top-bar__left">
      <span class="top-bar__title">Workspace</span>
      <div class="top-bar__search">
        <xIcon icon="search" size="12" class="top-bar__search-icon" />
        <input type="text" placeholder="Search..." class="top-bar__search-input" />
      </div>
    </div>
    
    <div class="top-bar__right">
      <div class="top-bar__icons">
        <xIcon icon="wifi" size="14" />
        <xIcon icon="battery" size="14" />
        <xIcon icon="bell" size="14" />
      </div>
      <span class="top-bar__time">{{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    // APP: 全局状态（来自 entry.vue）
    // system: v1 Desktop Workspace 局部状态（来自 ViewXspace）
    inject: ['APP', 'system'],
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
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding: 0 16px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-on-surface);
  background-color: rgba(230, 224, 233, 0.8);
  backdrop-filter: blur(12px);
  user-select: none;

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__title {
    font-weight: 700;
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    background-color: var(--color-surface-container);
    border-radius: 9999px;
    color: var(--color-on-surface-variant);

    &-icon {
      flex-shrink: 0;
    }

    &-input {
      background-color: transparent;
      outline: none;
      width: 128px;
      font-size: inherit;
      color: inherit;

      &::placeholder {
        color: rgba(67, 71, 78, 0.5);
      }
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-on-surface-variant);
  }

  &__time {
    flex-shrink: 0;
  }
}
</style>
