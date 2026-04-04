<template>
  <div
    class="desktop-icon"
    :style="iconStyle"
    @dblclick="handleOpen"
  >
    <div class="icon-wrapper">
      <xIcon :icon="shortcut.icon || 'file'" class="icon-image" />
      <button class="unpin-btn" @click.stop="handleUnpin" title="取消固定">
        <xIcon icon="close" />
      </button>
    </div>
    <span class="icon-label">{{ shortcut.name }}</span>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    props: {
      shortcut: {
        type: Object,
        required: true
      }
    },
    computed: {
      iconStyle() {
        return {
          left: (this.shortcut.position?.x || 20) + 'px',
          top: (this.shortcut.position?.y || 20) + 'px'
        };
      }
    },
    methods: {
      handleOpen() {
        this.$emit('open', this.shortcut);
      },
      handleUnpin() {
        this.$emit('unpin', this.shortcut.id);
      }
    }
  };
}
</script>

<style lang="less">
.desktop-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);

    .unpin-btn {
      opacity: 1;
    }
  }

  .icon-wrapper {
    position: relative;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    margin-bottom: 6px;

    .icon-image {
      font-size: 28px;
      color: rgba(255, 255, 255, 0.9);
    }

    .unpin-btn {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ff3b30;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;

      i {
        font-size: 10px;
        color: #fff;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .icon-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
    max-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
