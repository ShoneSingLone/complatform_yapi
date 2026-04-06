<template>
  <div class="resource-tree">
    <div class="tree-header">
      <span class="tree-title">资源管理器</span>
      <div class="tree-actions">
        <xBtn :configs="{ icon: 'refresh', onClick: refreshResources }" />
        <xBtn :configs="{ icon: 'collapse', onClick: collapseAll }" />
      </div>
    </div>
    <div class="tree-content">
      <TreeNode
        v-for="resource in resources"
        :key="resource.id"
        :resource="resource"
        :expandedKeys="expandedKeys"
        :selectedKey="selectedKey"
        :level="0"
        @select="handleSelect"
        @toggle="handleToggle"
        @open="handleOpen"
        @contextmenu="handleContextMenu"
      />
    </div>
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
        default: () => []
      },
      expandedKeys: {
        type: Array,
        default: () => []
      },
      selectedKey: {
        type: String,
        default: null
      }
    },
    methods: {
      handleSelect(resource) {
        this.$emit("select", resource);
      },
      handleToggle(resource) {
        const index = this.expandedKeys.indexOf(resource.id);
        const newExpandedKeys = [...this.expandedKeys];
        if (index > -1) {
          newExpandedKeys.splice(index, 1);
        } else {
          newExpandedKeys.push(resource.id);
        }
        this.$emit("expand", newExpandedKeys);
      },
      handleOpen(resource) {
        this.$emit("open", resource);
      },
      handleContextMenu(event, resource) {
        // 显示右键菜单
        console.log("右键菜单:", resource);
      },
      refreshResources() {
        this.$emit("refresh");
      },
      collapseAll() {
        this.$emit("expand", []);
      }
    }
  };
}
</script>

<style lang="less">
.resource-tree {
  width: 260px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  .tree-header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .tree-title {
      font-size: 12px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tree-actions {
      display: flex;
      gap: 4px;
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
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }
  }
}
</style>
