<template>
  <div
    class="desktop-icon"
    draggable="true"
    @dragstart="onDragStart"
    @click="handleClick">
    <div class="desktop-icon__content">
      <div class="desktop-icon__icon" :style="{ color: app.color }">
        <xIcon :icon="app.icon || app.name.charAt(0)" size="22" />
      </div>
      <div class="desktop-icon__meta">
        <span class="desktop-icon__eyebrow">Launcher</span>
        <span class="desktop-icon__label">
          {{ app.name }}
        </span>
      </div>
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
  width: 100%;
  min-height: 74px;
  grid-column: span 2;
  border-radius: 20px;
  cursor: pointer;
  transition:
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 180ms cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(135deg, rgba(17, 24, 39, 0.74) 0%, rgba(10, 14, 24, 0.9) 100%);
  box-shadow:
    0 14px 30px rgba(3, 7, 18, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);

  &:hover {
    transform: translateX(4px);
    border-color: rgba(255, 255, 255, 0.16);
    box-shadow:
      0 18px 40px rgba(3, 7, 18, 0.34),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  &:active {
    transform: translateX(1px) scale(0.99);
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: inherit;
    padding: 14px 16px 14px 14px;
  }

  &__icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      linear-gradient(135deg, fade(#ffffff, 14%) 0%, fade(#ffffff, 4%) 100%);
    color: var(--color-primary);
    flex-shrink: 0;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 10px 20px rgba(0, 0, 0, 0.22);
    transition:
      transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1);

    .desktop-icon:hover & {
      transform: scale(1.04);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 14px 26px rgba(0, 0, 0, 0.3);
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  &__eyebrow {
    font-size: 0.6875rem;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(226, 232, 240, 0.56);
  }

  &__label {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25;
    color: #f8fafc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__remove {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    padding: 0;
    background: rgba(239, 68, 68, 0.14);
    color: #fca5a5;
    border-radius: 9999px;
    border: 1px solid rgba(248, 113, 113, 0.16);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
      background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

    .desktop-icon:hover & {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }

    &:hover {
      background: rgba(239, 68, 68, 0.22);
    }

    &:active {
      transform: translateY(-50%) scale(0.96);
    }
  }
}
</style>
