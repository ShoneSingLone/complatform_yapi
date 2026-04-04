<template>
  <div class="window-manager">
    <Window
      v-for="window in visibleWindows"
      :key="window.id"
      :window="window"
      :isActive="window.id === activeWindowId"
      @focus="$emit('focus', window.id)"
      @minimize="$emit('minimize', window.id)"
      @maximize="$emit('maximize', window.id)"
      @close="$emit('close', window.id)"
      @pin="$emit('pin', window.id)"
    />
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [Window] = await _.$importVue([
    "@/components/DesktopWorkspace/Window.vue"
  ]);

  return {
    components: {
      Window
    },
    props: {
      windows: {
        type: Array,
        default: () => []
      },
      activeWindowId: {
        type: String,
        default: null
      }
    },
    computed: {
      visibleWindows() {
        return this.windows.filter(w => !w.isMinimized);
      }
    }
  };
}
</script>

<style lang="less">
.window-manager {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}
</style>
