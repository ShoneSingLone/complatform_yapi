<template>
  <div class="tree-node">
    <div
      class="node-content"
      :class="{
        selected: isSelected,
        expanded: isExpanded,
        'checked': isChecked,
        'indeterminate': isIndeterminate
      }"
      :style="{ paddingLeft: level * 16 + 8 + 'px' }"
      @click="handleClick"
      @dblclick="handleDoubleClick"
      @contextmenu.prevent="handleContextMenu"
      @dragstart="handleDragStart"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @dragend="handleDragEnd"
      draggable="true"
    >
      <!-- 多选复选框 -->
      <div
        v-if="selectable"
        class="node-checkbox"
        :class="{ 'checked': isChecked, 'indeterminate': isIndeterminate }"
        @click.stop="handleCheckboxClick"
      >
        <xIcon v-if="isChecked" icon="check" />
        <xIcon v-else-if="isIndeterminate" icon="minus" />
      </div>

      <!-- 展开/折叠图标 -->
      <span
        v-if="hasChildren"
        class="node-toggle"
        @click.stop="handleToggle"
      >
        <xIcon :icon="isExpanded ? 'arrow-down' : 'arrow-right'" />
      </span>
      <span v-else class="node-toggle-placeholder"></span>

      <!-- 拖拽手柄 -->
      <span class="node-drag-handle">
        <xIcon icon="drag" />
      </span>

      <!-- 资源图标 -->
      <xIcon :icon="resource.icon || 'file'" class="node-icon" :class="'icon-' + resource.type" />

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
        :checkedKeys="checkedKeys"
        :indeterminateKeys="indeterminateKeys"
        :selectable="selectable"
        :level="level + 1"
        @select="$emit('select', $event)"
        @toggle="$emit('toggle', $event)"
        @open="$emit('open', $event)"
        @contextmenu="$emit('contextmenu', $event)"
        @checkchange="$emit('checkchange', $event)"
        @dragstart="$emit('dragstart', $event)"
        @dragover="$emit('dragover', $event)"
        @drop="$emit('drop', $event)"
        @dragend="$emit('dragend', $event)"
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
        default: function() {
          return [];
        }
      },
      selectedKey: {
        type: String,
        default: null
      },
      checkedKeys: {
        type: Array,
        default: function() {
          return [];
        }
      },
      indeterminateKeys: {
        type: Array,
        default: function() {
          return [];
        }
      },
      selectable: {
        type: Boolean,
        default: false
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
        return this.expandedKeys.indexOf(this.resource.id) > -1;
      },
      isSelected() {
        return this.selectedKey === this.resource.id;
      },
      isChecked() {
        return this.checkedKeys.indexOf(this.resource.id) > -1;
      },
      isIndeterminate() {
        return this.indeterminateKeys.indexOf(this.resource.id) > -1;
      }
    },
    methods: {
      handleClick() {
        if (this.selectable) {
          this.$emit("checkchange", this.resource);
        }
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
      },
      handleCheckboxClick() {
        this.$emit("checkchange", this.resource);
      },
      handleDragStart(e) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", JSON.stringify({
          id: this.resource.id,
          type: this.resource.type,
          parentId: this.resource.parentId
        }));
        this.$emit("dragstart", e, this.resource);
      },
      handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        this.$emit("dragover", e, this.resource);
      },
      handleDrop(e) {
        e.preventDefault();
        try {
          var data = JSON.parse(e.dataTransfer.getData("text/plain"));
          this.$emit("drop", e, this.resource, data);
        } catch (err) {
          console.error("Drop error:", err);
        }
      },
      handleDragEnd(e) {
        this.$emit("dragend", e, this.resource);
      }
    }
  };
}
</script>

<style lang="less">
// X-Manager Design System Colors
@primary-color: #165DFF;
@success-color: #52C41A;
@warning-color: #FAAD14;
@danger-color: #FF4D4F;
@bg-primary: #F5F7FA;
@bg-hover: #F0F2F5;
@text-primary: #1F2329;
@text-secondary: #86909C;
@border-color: #E5E6EB;

.tree-node {
  .node-content {
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
    border-radius: 6px;
    margin: 0 8px;
    transition: all 0.15s ease;
    gap: 8px;

    &:hover {
      background-color: @bg-hover;
      
      .node-drag-handle {
        opacity: 1;
      }
    }

    // 选中状态高亮
    &.selected {
      background-color: @bg-primary;
      
      .node-name {
        color: @primary-color;
        font-weight: 500;
      }
    }

    // 复选框选中状态
    &.checked {
      background-color: rgba(22, 93, 255, 0.08);
    }

    // 半选中状态（部分子节点选中）
    &.indeterminate {
      background-color: rgba(22, 93, 255, 0.04);
    }

    // 拖拽中状态
    &.dragging {
      opacity: 0.5;
      background-color: @bg-hover;
    }

    // 拖拽目标高亮
    &.drag-over {
      background-color: rgba(22, 93, 255, 0.12);
      border: 1px dashed @primary-color;
    }

    // 复选框样式
    .node-checkbox {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid @border-color;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
      flex-shrink: 0;
      background-color: white;

      &:hover {
        border-color: @primary-color;
      }

      &.checked {
        background-color: @primary-color;
        border-color: @primary-color;
        color: white;
      }

      &.indeterminate {
        background-color: @primary-color;
        border-color: @primary-color;
        color: white;
      }
    }

    .node-toggle {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.15s;
      flex-shrink: 0;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      i {
        font-size: 12px;
        color: @text-secondary;
      }
    }

    .node-toggle-placeholder {
      width: 16px;
      flex-shrink: 0;
    }

    // 拖拽手柄
    .node-drag-handle {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      opacity: 0;
      transition: opacity 0.15s;
      flex-shrink: 0;
      color: @text-secondary;

      &:active {
        cursor: grabbing;
      }
    }

    .node-icon {
      width: 16px;
      height: 16px;
      font-size: 14px;
      color: @primary-color;
      flex-shrink: 0;
      
      // 不同类型资源的专属图标颜色
      &.icon-group {
        color: #FA8C16;
      }
      
      &.icon-project {
        color: #52C41A;
      }
      
      &.icon-api {
        color: #165DFF;
      }
      
      &.icon-doc {
        color: #722ED1;
      }
      
      &.icon-global {
        color: #13C2C2;
      }
    }

    .node-name {
      flex: 1;
      font-size: 13px;
      color: @text-primary;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .node-children {
    animation: slideDown 0.15s ease;
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
