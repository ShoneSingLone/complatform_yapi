<template>
  <div class="top-bar">
    <div class="top-bar__left">
      <div class="top-bar__brand">
        <span class="top-bar__brand-dot"></span>
        <span class="top-bar__title">YApi Workspace</span>
      </div>
    </div>

    <div class="top-bar__center">
      <div class="top-bar__search">
        <xIcon icon="search" size="12" class="top-bar__search-icon" />
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索"
          class="top-bar__search-input"
        />
      </div>
    </div>

    <div class="top-bar__right">
      <div class="top-bar__user" :title="userDisplayName">
        <span class="top-bar__user-avatar">{{ userInitial }}</span>
        <span class="top-bar__user-name">{{ userDisplayName }}</span>
      </div>
      <div class="top-bar__datetime">
        <span class="top-bar__date">{{ dateLabel }}</span>
        <span class="top-bar__time">{{ time }}</span>
      </div>
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
        searchKeyword: '',
        dateLabel: '',
        time: '',
        timer: null
      };
    },
    computed: {
      userDisplayName() {
        const user = this.APP && this.APP.user ? this.APP.user : {};
        return user.username || user.name || user.email || 'Guest';
      },
      userInitial() {
        return String(this.userDisplayName).trim().charAt(0).toUpperCase() || 'G';
      }
    },
    methods: {
      updateTime() {
        const now = new Date();
        this.time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.dateLabel = now.toLocaleDateString([], {
          month: '2-digit',
          day: '2-digit'
        });
      }
    },
    mounted() {
      this.updateTime();
      this.timer = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
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
  gap: 12px;
  height: 30px;
  padding: 0 14px;
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(241, 245, 249, 0.88);
  background: rgba(7, 11, 20, 0.14);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  user-select: none;

  &__left {
    display: flex;
    align-items: center;
    min-width: 0;
    flex: 1;
  }

  &__center {
    display: flex;
    justify-content: center;
    flex: 0 1 220px;
    min-width: 120px;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  &__brand-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6750a4, #8b7cc6);
    box-shadow: 0 0 0 3px rgba(103, 80, 164, 0.14);
    flex-shrink: 0;
  }

  &__title {
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    max-width: 180px;
    padding: 3px 10px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 9999px;
    color: rgba(226, 232, 240, 0.72);
    opacity: 0.58;
    transition: opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

    &:focus-within {
      opacity: 1;
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.12);
    }

    &-icon {
      flex-shrink: 0;
    }

    &-input {
      border: none;
      background-color: transparent;
      outline: none;
      width: 100%;
      min-width: 0;
      font-size: inherit;
      color: inherit;

      &::placeholder {
        color: rgba(226, 232, 240, 0.4);
      }
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 2px 4px;
  }

  &__user-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(103, 80, 164, 0.12);
    color: #6750a4;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
  }

  &__user-name {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(226, 232, 240, 0.72);
  }

  &__datetime {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(226, 232, 240, 0.72);
    flex-shrink: 0;
  }

  &__date {
    opacity: 0.6;
  }

  &__time {
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }
}
</style>
