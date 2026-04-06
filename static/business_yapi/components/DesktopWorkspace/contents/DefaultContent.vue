<template>
  <div class="default-content">
    <div class="content-icon">
      <xIcon :icon="icon" />
    </div>
    <h2 class="content-title">{{ title }}</h2>
    <p class="content-description">{{ description }}</p>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    computed: {
      icon() {
        return this.data.icon || 'file';
      },
      title() {
        return this.data.name || '未命名';
      },
      description() {
        const typeMap = {
          group: '分组资源',
          project: '项目资源',
          folder: '文件夹',
          file: '文件资源',
          member: '成员管理',
          settings: '项目设置',
          doc: '文档资源'
        };
        return typeMap[this.data.type] || '未知资源类型';
      }
    }
  };
}
</script>

<style lang="less">
.default-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;

  .content-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    margin-bottom: 24px;

    i {
      font-size: 40px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .content-title {
    font-size: 24px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 12px 0;
  }

  .content-description {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
}
</style>
