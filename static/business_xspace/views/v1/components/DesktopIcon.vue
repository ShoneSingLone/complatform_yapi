<template>
  <div
    class="group relative flex flex-col items-center justify-center gap-2 p-3 rounded-m3-medium hover:bg-on-surface/5 cursor-pointer transition-colors active:bg-on-surface/10"
    draggable="true"
    @dragstart="onDragStart"
    @click="handleClick">
    <div
      class="w-16 h-16 rounded-m3-large flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 bg-surface-container-highest text-primary"
      :style="{ color: app.color }">
      <xIcon :icon="app.name.charAt(0)" size="32" />
    </div>
    <span class="text-xs font-medium text-center line-clamp-2 px-1 text-on-surface">
      {{ app.name }}
    </span>
    <button
      @click="handleUnpin"
      class="absolute -top-1 -right-1 p-1 bg-error text-on-error rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
      title="Unpin from Desktop">
      <xIcon icon="X" size="12" />
    </button>
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
/* 桌面图标样式 */
.group {
  position: relative;
}

.relative {
  position: relative;
}

.flex {
  display: flex;
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

.gap-2 {
  gap: 8px;
}

.p-3 {
  padding: 12px;
}

.rounded-m3-medium {
  border-radius: 12px;
}

.hover\:bg-on-surface\/5:hover {
  background-color: rgba(26, 28, 30, 0.05);
}

.cursor-pointer {
  cursor: pointer;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.active\:bg-on-surface\/10:active {
  background-color: rgba(26, 28, 30, 0.1);
}

.w-16 {
  width: 64px;
}

.h-16 {
  height: 64px;
}

.rounded-m3-large {
  border-radius: 16px;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.group-hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.bg-surface-container-highest {
  background-color: var(--color-surface-container-highest);
}

.text-primary {
  color: var(--color-primary);
}

.text-xs {
  font-size: 0.75rem;
}

.font-medium {
  font-weight: 500;
}

.text-center {
  text-align: center;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.px-1 {
  padding-left: 4px;
  padding-right: 4px;
}

.text-on-surface {
  color: var(--color-on-surface);
}

.absolute {
  position: absolute;
}

.-top-1 {
  top: -4px;
}

.-right-1 {
  right: -4px;
}

.p-1 {
  padding: 4px;
}

.bg-error {
  background-color: var(--color-error);
}

.text-on-error {
  color: var(--color-on-error);
}

.rounded-full {
  border-radius: 9999px;
}

.opacity-0 {
  opacity: 0;
}

.group-hover\:opacity-100:hover {
  opacity: 1;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
