<template>
  <div class="resource-tree">
    <!-- 工具栏 -->
    <div class="tree-header">
      <div class="tree-header-left">
        <!-- 全选复选框 -->
        <div
          v-if="selectable"
          class="tree-select-all"
          :class="{ 'checked': isAllChecked, 'indeterminate': isIndeterminate }"
          @click="toggleSelectAll"
        >
          <xIcon v-if="isAllChecked" icon="check" />
          <xIcon v-else-if="isIndeterminate" icon="minus" />
        </div>
        <span class="tree-title">资源管理器</span>
        <span v-if="checkedKeys.length > 0" class="tree-selected-count">
          已选 {{ checkedKeys.length }} 项
        </span>
      </div>
      <div class="tree-actions">
        <xBtn
          v-if="selectable && checkedKeys.length > 0"
          :configs="{ icon: 'close', onClick: clearSelection, title: '取消选择' }"
        />
        <xBtn :configs="{ icon: 'refresh', onClick: refreshResources }" />
        <xBtn :configs="{ icon: 'collapse', onClick: collapseAll }" />
      </div>
    </div>

    <!-- 批量操作栏 -->
    <div v-if="checkedKeys.length > 0" class="tree-batch-actions">
      <div class="batch-actions-left">
        <button class="batch-action-btn" @click="handleBatchMove">
          <xIcon icon="folder-open" />
          <span>移动到</span>
        </button>
        <button class="batch-action-btn" @click="handleBatchCopy">
          <xIcon icon="copy" />
          <span>复制</span>
        </button>
        <button class="batch-action-btn batch-action-btn--danger" @click="handleBatchDelete">
          <xIcon icon="trash" />
          <span>删除</span>
        </button>
      </div>
      <button class="batch-action-cancel" @click="clearSelection">
        <xIcon icon="close" />
      </button>
    </div>

    <!-- 资源树 -->
    <div
      class="tree-content"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <TreeNode
        v-for="resource in resources"
        :key="resource.id"
        :resource="resource"
        :expandedKeys="expandedKeys"
        :selectedKey="selectedKey"
        :checkedKeys="checkedKeys"
        :indeterminateKeys="indeterminateKeys"
        :selectable="selectable"
        :level="0"
        @select="handleSelect"
        @toggle="handleToggle"
        @open="handleOpen"
        @contextmenu="handleContextMenu"
        @checkchange="handleCheckChange"
        @dragstart="handleDragStart"
        @dragover="handleNodeDragOver"
        @drop="handleNodeDrop"
        @dragend="handleDragEnd"
      />
    </div>

    <!-- 拖拽目标指示器 -->
    <div
      v-if="dropTarget"
      class="tree-drop-indicator"
      :style="dropIndicatorStyle"
    ></div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [TreeNode] = await _.$importVue([
    "@/components/DesktopWorkspace/TreeNode.vue"
  ]);

  return {
    components: {
      TreeNode
    },
    props: {
      resources: {
        type: Array,
        default: function() {
          return [];
        }
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
      selectable: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        checkedKeys: [],
        indeterminateKeys: [],
        dropTarget: null,
        dropIndicatorStyle: {},
        draggingNode: null
      };
    },
    computed: {
      isAllChecked: function() {
        var allIds = this.getAllResourceIds(this.resources);
        return allIds.length > 0 && allIds.every(function(id) {
          return this.checkedKeys.indexOf(id) > -1;
        }.bind(this));
      },
      isIndeterminate: function() {
        return this.checkedKeys.length > 0 && !this.isAllChecked;
      }
    },
    methods: {
      // 获取所有资源 ID（递归）
      getAllResourceIds: function(resources) {
        var ids = [];
        resources.forEach(function(r) {
          ids.push(r.id);
          if (r.children && r.children.length > 0) {
            ids = ids.concat(this.getAllResourceIds(r.children));
          }
        }.bind(this));
        return ids;
      },
      // 获取所有叶子节点 ID
      getAllLeafIds: function(resources) {
        var ids = [];
        resources.forEach(function(r) {
          if (!r.children || r.children.length === 0) {
            ids.push(r.id);
          } else {
            ids = ids.concat(this.getAllLeafIds(r.children));
          }
        }.bind(this));
        return ids;
      },
      // 全选/取消全选
      toggleSelectAll: function() {
        if (this.isAllChecked) {
          this.checkedKeys = [];
          this.indeterminateKeys = [];
        } else {
          this.checkedKeys = this.getAllResourceIds(this.resources);
          this.indeterminateKeys = [];
        }
        this.emitSelectionChange();
      },
      // 清除选择
      clearSelection: function() {
        this.checkedKeys = [];
        this.indeterminateKeys = [];
        this.emitSelectionChange();
      },
      // 处理选择变化
      handleSelect: function(resource) {
        this.$emit("select", resource);
      },
      // 处理展开/折叠
      handleToggle: function(resource) {
        var index = this.expandedKeys.indexOf(resource.id);
        var newExpandedKeys = this.expandedKeys.slice();
        if (index > -1) {
          newExpandedKeys.splice(index, 1);
        } else {
          newExpandedKeys.push(resource.id);
        }
        this.$emit("expand", newExpandedKeys);
      },
      // 处理打开资源
      handleOpen: function(resource) {
        this.$emit("open", resource);
      },
      // 处理复选框变化
      handleCheckChange: function(resource) {
        var checkedIndex = this.checkedKeys.indexOf(resource.id);
        var indeterminateIndex = this.indeterminateKeys.indexOf(resource.id);
        
        if (checkedIndex > -1) {
          // 取消选中
          this.checkedKeys.splice(checkedIndex, 1);
          this.removeChildrenSelection(resource);
        } else if (indeterminateIndex > -1) {
          // 半选中 -> 全选中
          this.indeterminateKeys.splice(indeterminateIndex, 1);
          this.checkedKeys.push(resource.id);
          this.addChildrenSelection(resource);
        } else {
          // 未选中 -> 全选中
          this.checkedKeys.push(resource.id);
          this.addChildrenSelection(resource);
        }
        
        // 更新父节点状态
        this.updateParentSelection();
        this.emitSelectionChange();
      },
      // 添加子节点选择
      addChildrenSelection: function(resource) {
        if (resource.children) {
          resource.children.forEach(function(child) {
            if (this.checkedKeys.indexOf(child.id) === -1) {
              this.checkedKeys.push(child.id);
            }
            this.addChildrenSelection(child);
          }.bind(this));
        }
      },
      // 移除子节点选择
      removeChildrenSelection: function(resource) {
        if (resource.children) {
          resource.children.forEach(function(child) {
            var idx = this.checkedKeys.indexOf(child.id);
            if (idx > -1) {
              this.checkedKeys.splice(idx, 1);
            }
            var indIdx = this.indeterminateKeys.indexOf(child.id);
            if (indIdx > -1) {
              this.indeterminateKeys.splice(indIdx, 1);
            }
            this.removeChildrenSelection(child);
          }.bind(this));
        }
      },
      // 更新父节点选择状态
      updateParentSelection: function() {
        var self = this;
        function updateNode(node, parentId) {
          if (!node.children || node.children.length === 0) return;
          
          var allChecked = node.children.every(function(child) {
            return self.checkedKeys.indexOf(child.id) > -1;
          });
          var someChecked = node.children.some(function(child) {
            return self.checkedKeys.indexOf(child.id) > -1 || 
                   self.indeterminateKeys.indexOf(child.id) > -1;
          });
          
          var checkedIdx = self.checkedKeys.indexOf(node.id);
          var indIdx = self.indeterminateKeys.indexOf(node.id);
          
          if (allChecked) {
            if (checkedIdx === -1) {
              self.checkedKeys.push(node.id);
            }
            var i = self.indeterminateKeys.indexOf(node.id);
            if (i > -1) {
              self.indeterminateKeys.splice(i, 1);
            }
          } else if (someChecked) {
            if (checkedIdx > -1) {
              self.checkedKeys.splice(checkedIdx, 1);
            }
            if (indIdx === -1) {
              self.indeterminateKeys.push(node.id);
            }
          }
        }
        
        this.resources.forEach(function(r) {
          updateNode(r);
          if (r.children) {
            r.children.forEach(function(c) {
              updateNode(c);
            });
          }
        });
      },
      // 发射选择变化事件
      emitSelectionChange: function() {
        this.$emit("selectionchange", this.checkedKeys.slice());
      },
      // 刷新资源
      refreshResources: function() {
        this.$emit("refresh");
      },
      // 折叠所有
      collapseAll: function() {
        this.$emit("expand", []);
      },
      // 右键菜单
      handleContextMenu: function(event, resource) {
        this.$emit("contextmenu", event, resource);
      },
      // 拖拽开始
      handleDragStart: function(e, resource) {
        this.draggingNode = resource;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("application/json", JSON.stringify({
          id: resource.id,
          type: resource.type,
          parentId: resource.parentId
        }));
        this.$emit("dragstart", e, resource);
      },
      // 节点拖拽经过
      handleNodeDragOver: function(e, targetResource) {
        if (!this.draggingNode || this.draggingNode.id === targetResource.id) {
          this.dropTarget = null;
          return;
        }
        this.dropTarget = targetResource;
        
        // 计算放置指示器位置
        var rect = e.target.getBoundingClientRect();
        var y = e.clientY - rect.top;
        var isAbove = y < rect.height / 2;
        
        this.dropIndicatorStyle = {
          top: isAbove ? "0" : "50%",
          height: isAbove ? "2px" : "50%"
        };
      },
      // 节点放置
      handleNodeDrop: function(e, targetResource, data) {
        e.preventDefault();
        if (this.draggingNode && this.draggingNode.id !== targetResource.id) {
          this.$emit("move", data, targetResource);
        }
        this.dropTarget = null;
        this.draggingNode = null;
      },
      // 拖拽经过树容器
      handleDragOver: function(e) {
        e.preventDefault();
      },
      // 拖拽放置到容器
      handleDrop: function(e) {
        e.preventDefault();
        this.dropTarget = null;
        this.draggingNode = null;
      },
      // 拖拽结束
      handleDragEnd: function(e) {
        this.dropTarget = null;
        this.draggingNode = null;
      },
      // 批量移动
      handleBatchMove: function() {
        this.$emit("batchmove", this.checkedKeys.slice());
      },
      // 批量复制
      handleBatchCopy: function() {
        this.$emit("batchcopy", this.checkedKeys.slice());
      },
      // 批量删除
      handleBatchDelete: function() {
        this.$emit("batchdelete", this.checkedKeys.slice());
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

.resource-tree {
  width: 260px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--x-bg-primary, #FFFFFF);
  border-right: 1px solid var(--x-border, @border-color);
  position: relative;

  .tree-header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-bottom: 1px solid var(--x-border, @border-color);
    background-color: var(--x-bg-secondary, @bg-primary);

    &-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tree-select-all {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid @border-color;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
      background-color: white;
      color: white;
      font-size: 10px;

      &:hover {
        border-color: @primary-color;
      }

      &.checked {
        background-color: @primary-color;
        border-color: @primary-color;
      }

      &.indeterminate {
        background-color: @primary-color;
        border-color: @primary-color;
      }
    }

    .tree-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--x-text-secondary, @text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tree-selected-count {
      font-size: 12px;
      color: @primary-color;
      font-weight: 500;
    }

    .tree-actions {
      display: flex;
      gap: 4px;
    }
  }

  // 批量操作栏
  .tree-batch-actions {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    background-color: rgba(22, 93, 255, 0.04);
    border-bottom: 1px solid @border-color;
    animation: slideDown 0.15s ease;

    .batch-actions-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .batch-action-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border: 1px solid @border-color;
      border-radius: 4px;
      background-color: white;
      cursor: pointer;
      font-size: 12px;
      color: @text-primary;
      transition: all 0.15s;

      &:hover {
        border-color: @primary-color;
        color: @primary-color;
        background-color: rgba(22, 93, 255, 0.04);
      }

      &--danger {
        &:hover {
          border-color: @danger-color;
          color: @danger-color;
          background-color: rgba(255, 77, 79, 0.04);
        }
      }
    }

    .batch-action-cancel {
      width: 24px;
      height: 24px;
      border: none;
      border-radius: 4px;
      background-color: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: @text-secondary;
      transition: all 0.15s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: @text-primary;
      }
    }
  }

  .tree-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 3px;
    }
  }

  // 拖拽目标指示器
  .tree-drop-indicator {
    position: absolute;
    left: 8px;
    right: 8px;
    background-color: @primary-color;
    border-radius: 1px;
    pointer-events: none;
    z-index: 10;
  }

  // 全局资源目录分隔线
  .global-resources-divider {
    height: 1px;
    background-color: var(--x-border, @border-color);
    margin: 8px 12px;
  }

  .global-resources-section {
    padding-top: 8px;
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
