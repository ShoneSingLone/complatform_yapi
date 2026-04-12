<template>
  <div
    class="desktop-icon"
    draggable="true"
    @dragstart="onDragStart"
    @click="handleClick">
    <div class="desktop-icon__content">
      <div class="desktop-icon__icon" :style="{ color: app.color }">
        <xIcon :icon="app.name.charAt(0)" size="32" />
      </div>
      <span class="desktop-icon__label">
        {{ app.name }}
      </span>
      <button
        @click="handleUnpin"
        class="desktop-icon__remove"
        title="Unpin from Desktop">
        <xIcon icon="X" size="12" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    props: {
      app: Object
    },
    emits: ["click", "unpin"],
    data() {
      return {
        XIcon: null
      };
    },
    mounted() {
      // 动态加载图标组件
      _.$importVue('/common/ui-x/xIcon.vue').then(({ default: xIcon }) => {
        this.XIcon = xIcon;
      });
    },
    methods: {
      onDragStart(e) {
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", this.app.appId);
          e.dataTransfer.effectAllowed = "copyMove";
        }
      },
      handleClick() {
        this.$emit("click");
      },
      handleUnpin(event) {
        event.stopPropagation();
        this.$emit("unpin");
      }
    }
  };
}
</script>

<style lang="less">
.desktop-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: rgba(26, 28, 30, 0.05);
  }

  &:active {
    background-color: rgba(26, 28, 30, 0.1);
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface-container-highest);
    color: var(--color-primary);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);

    .desktop-icon:hover & {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    }
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
    color: var(--color-on-surface);
    padding: 0 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__remove {
    position: absolute;
    top: -4px;
    right: -4px;
    padding: 4px;
    background-color: var(--color-error);
    color: var(--color-on-error);
    border-radius: 9999px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);

    .desktop-icon:hover & {
      opacity: 1;
    }
  }
}
</style>
