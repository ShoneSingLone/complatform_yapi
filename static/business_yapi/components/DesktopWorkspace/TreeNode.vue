<template>
  <div class="tree-node">
    <div
      class="node-content"
      :class="{
        selected: isSelected,
        expanded: isExpanded
      }"
      :style="{ paddingLeft: level * 16 + 8 + 'px' }"
      @click="handleClick"
      @dblclick="handleDoubleClick"
      @contextmenu.prevent="handleContextMenu"
    >
      <!-- 展开/折叠图标 -->
      <span
        v-if="hasChildren"
        class="node-toggle"
        @click.stop="handleToggle"
      >
        <xIcon :icon="isExpanded ? 'arrow-down' : 'arrow-right'" />
      </span>
      <span v-else class="node-toggle-placeholder"></span>

      <!-- 资源图标 -->
      <xIcon :icon="resource.icon || 'file'" class="node-icon" />

      <!-- 资源名称 -->
      <span class="node-name">{{ resource.name }}</span>
    </div>

    <!-- 子节点 -->
    <div v-if="hasChildren && isExpanded" class="node-children">
      <TreeNode
        v-for="child in resource.children"
        :key="child.id"
        :resource="child"
        :expandedKeys="expandedKeys"
        :selectedKey="selectedKey"
        :level="level + 1"
        @select="$emit('select', $event)"
        @toggle="$emit('toggle', $event)"
        @open="$emit('open', $event)"
        @contextmenu="$emit('contextmenu', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    name: "TreeNode",
    props: {
      resource: {
        type: Object,
        required: true
      },
      expandedKeys: {
        type: Array,
        default: () => []
      },
      selectedKey: {
        type: String,
        default: null
      },
      level: {
        type: Number,
        default: 0
      }
    },
    computed: {
      hasChildren() {
        return this.resource.children && this.resource.children.length > 0;
      },
      isExpanded() {
        return this.expandedKeys.includes(this.resource.id);
      },
      isSelected() {
        return this.selectedKey === this.resource.id;
      }
    },
    methods: {
      handleClick() {
        this.$emit("select", this.resource);
      },
      handleDoubleClick() {
        this.$emit("open", this.resource);
      },
      handleToggle() {
        this.$emit("toggle", this.resource);
      },
      handleContextMenu(event) {
        this.$emit("contextmenu", event, this.resource);
      }
    }
  };
}
</script>

<style lang="less">
.tree-node {
  .node-content {
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
    border-radius: 6px;
    margin: 0 8px;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.selected {
      background: rgba(0, 122, 255, 0.3);
    }

    .node-toggle {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      i {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .node-toggle-placeholder {
      width: 16px;
    }

    .node-icon {
      width: 16px;
      height: 16px;
      margin: 0 6px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }

    .node-name {
      flex: 1;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .node-children {
    animation: slideDown 0.2s ease;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
