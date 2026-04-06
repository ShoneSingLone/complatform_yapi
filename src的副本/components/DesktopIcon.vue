<script lang="ts">
import { defineComponent, computed } from 'vue';
import { type Shortcut } from '@/store';
import * as Icons from 'lucide-vue-next';

export default defineComponent({
  name: 'DesktopIcon',
  components: {
    Icons
  },
  props: {
    app: {
      type: Object as () => Shortcut,
      required: true
    }
  },
  emits: ['click', 'unpin'],
  setup(props, { emit }) {
    const IconComponent = computed(() => (Icons as any)[props.app.icon]);

    const onDragStart = (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', props.app.appId);
        e.dataTransfer.effectAllowed = 'copyMove';
      }
    };

    const handleClick = () => {
      emit('click');
    };

    const handleUnpin = () => {
      emit('unpin');
    };

    return {
      IconComponent,
      onDragStart,
      handleClick,
      handleUnpin
    };
  }
});
</script>

<template>
  <div 
    class="desktop-icon"
    draggable="true"
    @dragstart="onDragStart"
    @click="handleClick"
  >
    <div 
      class="desktop-icon__icon"
      :style="{ color: app.color }"
    >
      <component :is="IconComponent" :size="32" />
    </div>
    <span class="desktop-icon__name">
      {{ app.name }}
    </span>
    <button 
      @click.stop="handleUnpin" 
      class="desktop-icon__unpin-button"
      title="Unpin from Desktop"
    >
      <Icons.X :size="12" />
    </button>
  </div>
</template>

<style lang="less">
@import '../styles/bem-global.less';
</style>
