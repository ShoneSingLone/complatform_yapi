# 入口菜单与集成

## 1. 移植软件入口菜单添加

### 1.1 现有菜单结构分析

#### 1.1.1 项目菜单结构

| 菜单层级 | 菜单名称 | 对应文件 | 功能描述 |
|---------|---------|----------|----------|
| 一级菜单 | 接口管理 | `views/interface/` | API 接口管理 |
| 一级菜单 | 项目管理 | `views/project/` | 项目管理 |
| 一级菜单 | 测试工具 | `views/test/` | 测试相关工具 |
| 一级菜单 | 文档管理 | `views/doc/` | 文档管理 |
| 一级菜单 | 团队管理 | `views/team/` | 团队协作管理 |

#### 1.1.2 菜单配置文件

**核心文件：**

| 文件路径 | 功能描述 | 关键特性 |
|---------|---------|----------|
| `config/menu.js` | 菜单配置 | 定义系统菜单结构 |
| `config/routes.js` | 路由配置 | 定义系统路由规则 |
| `utils/menu.js` | 菜单工具 | 菜单处理和权限验证 |

### 1.2 新增菜单规划

#### 1.2.1 菜单结构设计

| 菜单层级 | 菜单名称 | 对应文件 | 功能描述 |
|---------|---------|----------|----------|
| 一级菜单 | DocFlow | `views/docflow/` | DocFlow 核心功能 |
| 二级菜单 | 块级编辑器 | `views/docflow/editor.vue` | 高级块级编辑器 |
| 二级菜单 | AI 助手 | `views/docflow/ai.vue` | AI 辅助功能 |
| 二级菜单 | 实时协作 | `views/docflow/collaboration.vue` | 多人协作编辑 |
| 二级菜单 | 文档模板 | `views/docflow/templates.vue` | 预设文档模板 |

#### 1.2.2 菜单图标设计

| 菜单名称 | 图标 SVG | 颜色 |
|---------|----------|------|
| DocFlow | `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` | #4A6CF7 |
| 块级编辑器 | `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 8H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 4V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` | #28A745 |
| AI 助手 | `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 4V6M8 10V12M12 8H10M6 8H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` | #FFC107 |
| 实时协作 | `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 7C14 9.76142 11.7614 12 9 12C7.82889 12 6.74346 11.6586 5.85786 11.1213" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6C10.1046 6 11 5.10457 11 4C11 2.89543 10.1046 2 9 2C7.89543 2 7 2.89543 7 4C7 5.10457 7.89543 6 9 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 7C2 4.23858 4.23858 2 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` | #17A2B8 |
| 文档模板 | `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 10H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` | #6F42C1 |

### 1.3 菜单配置实现

#### 1.3.1 菜单配置文件修改

**文件：`config/menu.js`**

```javascript
// 菜单配置文件
module.exports = {
  // 现有菜单...
  doc: {
    name: '文档管理',
    icon: 'file-text',
    children: [
      // 现有子菜单...
    ]
  },
  
  // 新增 DocFlow 菜单
  docflow: {
    name: 'DocFlow',
    icon: 'docflow', // 自定义图标
    children: [
      {
        name: '块级编辑器',
        path: '/docflow/editor',
        component: '@/views/docflow/editor.vue',
        icon: 'block-editor'
      },
      {
        name: 'AI 助手',
        path: '/docflow/ai',
        component: '@/views/docflow/ai.vue',
        icon: 'ai-assistant'
      },
      {
        name: '实时协作',
        path: '/docflow/collaboration',
        component: '@/views/docflow/collaboration.vue',
        icon: 'collaboration'
      },
      {
        name: '文档模板',
        path: '/docflow/templates',
        component: '@/views/docflow/templates.vue',
        icon: 'templates'
      }
    ]
  },
  
  // 其他现有菜单...
};
```

#### 1.3.2 路由配置文件修改

**文件：`config/routes.js`**

```javascript
// 路由配置文件
module.exports = [
  // 现有路由...
  
  // 新增 DocFlow 路由
  {
    path: '/docflow',
    component: '@/views/docflow/index.vue',
    meta: {
      title: 'DocFlow',
      requireAuth: true
    },
    children: [
      {
        path: 'editor',
        component: '@/views/docflow/editor.vue',
        meta: {
          title: '块级编辑器',
          requireAuth: true
        }
      },
      {
        path: 'ai',
        component: '@/views/docflow/ai.vue',
        meta: {
          title: 'AI 助手',
          requireAuth: true
        }
      },
      {
        path: 'collaboration',
        component: '@/views/docflow/collaboration.vue',
        meta: {
          title: '实时协作',
          requireAuth: true
        }
      },
      {
        path: 'templates',
        component: '@/views/docflow/templates.vue',
        meta: {
          title: '文档模板',
          requireAuth: true
        }
      }
    ]
  },
  
  // 其他现有路由...
];
```

#### 1.3.3 图标注册

**文件：`utils/icons.js`**

```javascript
// 图标注册文件
const icons = {
  // 现有图标...
  
  // 新增 DocFlow 图标
  docflow: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  
  blockEditor: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 8H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 4V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  
  aiAssistant: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M8 4V6M8 10V12M12 8H10M6 8H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  
  collaboration: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 7C14 9.76142 11.7614 12 9 12C7.82889 12 6.74346 11.6586 5.85786 11.1213" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6C10.1046 6 11 5.10457 11 4C11 2.89543 10.1046 2 9 2C7.89543 2 7 2.89543 7 4C7 5.10457 7.89543 6 9 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 7C2 4.23858 4.23858 2 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  templates: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 10H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
};

export default icons;
```

### 1.4 菜单权限管理

#### 1.4.1 权限配置

**文件：`config/permission.js`**

```javascript
// 权限配置文件
module.exports = {
  // 现有权限...
  
  // 新增 DocFlow 权限
  docflow: {
    view: 'docflow:view',     // 查看权限
    edit: 'docflow:edit',     // 编辑权限
    ai: 'docflow:ai',         // AI 功能权限
    collaboration: 'docflow:collaboration' // 协作功能权限
  },
  
  // 其他现有权限...
};
```

#### 1.4.2 权限验证

**文件：`utils/permission.js`**

```javascript
// 权限验证工具
const checkPermission = (permission) => {
  const userPermissions = _store.state.user.permissions || [];
  return userPermissions.includes(permission);
};

const hasDocFlowPermission = (type = 'view') => {
  const permission = `docflow:${type}`;
  return checkPermission(permission);
};

// 菜单权限过滤
const filterDocFlowMenu = (menu) => {
  return menu.children.filter(item => {
    switch (item.path) {
      case '/docflow/editor':
        return hasDocFlowPermission('edit');
      case '/docflow/ai':
        return hasDocFlowPermission('ai');
      case '/docflow/collaboration':
        return hasDocFlowPermission('collaboration');
      default:
        return hasDocFlowPermission('view');
    }
  });
};

export { checkPermission, hasDocFlowPermission, filterDocFlowMenu };
```

## 2. 与现有系统集成

### 2.1 核心集成点

#### 2.1.1 应用入口集成

**文件：`entry.vue`**

```vue
<template>
  <div id="app">
    <!-- 现有应用结构 -->
    <router-view v-if="isLogin" />
    <login v-else />
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  // 动态加载现有组件
  const [Login, Menu] = await _.$importVue([
    '@/components/Login/Login.vue',
    '@/components/Menu/Menu.vue'
  ]);

  // 动态注册 DocFlow 组件
  _.each(
    {
      DocFlowEditor: "@/components/DocFlow/Editor.vue",
      DocFlowAI: "@/components/DocFlow/AI.vue",
      DocFlowCollaboration: "@/components/DocFlow/Collaboration.vue"
    },
    (componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
  );

  return {
    components: {
      Login,
      Menu
    },
    data() {
      return {
        isLogin: false
      };
    },
    mounted() {
      // 初始化逻辑
      this.checkLogin();
    },
    methods: {
      checkLogin() {
        // 登录状态检查
      }
    }
  };
}
</script>
```

#### 2.1.2 全局状态集成

**文件：`store/index.js`**

```javascript
// 全局状态管理
const store = {
  state: {
    // 现有状态...
    
    // 新增 DocFlow 状态
    docflow: {
      currentDocument: null,
      editorState: null,
      aiStatus: 'idle',
      collaborationUsers: []
    }
  },
  
  mutations: {
    // 现有 mutations...
    
    // 新增 DocFlow mutations
    setCurrentDocument(state, document) {
      state.docflow.currentDocument = document;
    },
    
    setEditorState(state, state) {
      state.docflow.editorState = state;
    },
    
    setAIStatus(state, status) {
      state.docflow.aiStatus = status;
    },
    
    setCollaborationUsers(state, users) {
      state.docflow.collaborationUsers = users;
    }
  },
  
  actions: {
    // 现有 actions...
    
    // 新增 DocFlow actions
    async loadDocument({ commit }, documentId) {
      // 加载文档逻辑
    },
    
    async saveDocument({ commit }, document) {
      // 保存文档逻辑
    }
  }
};

export default store;
```

### 2.2 工具函数集成

#### 2.2.1 API 调用集成

**文件：`utils/api.js`**

```javascript
// API 调用工具
const api = {
  // 现有 API 方法...
  
  // 新增 DocFlow API 方法
  docflow: {
    // 获取文档列表
    getDocuments: () => {
      return _api.yapi.request({
        url: '/api/docflow/documents',
        method: 'GET'
      });
    },
    
    // 获取文档详情
    getDocument: (id) => {
      return _api.yapi.request({
        url: `/api/docflow/documents/${id}`,
        method: 'GET'
      });
    },
    
    // 保存文档
    saveDocument: (document) => {
      return _api.yapi.request({
        url: '/api/docflow/documents',
        method: 'POST',
        data: document
      });
    },
    
    // AI 功能调用
    aiRequest: (data) => {
      return _api.yapi.request({
        url: '/api/docflow/ai',
        method: 'POST',
        data
      });
    }
  }
};

export default api;
```

#### 2.2.2 事件总线集成

**文件：`utils/event.js`**

```javascript
// 事件总线
const eventBus = new Vue();

// 事件类型
const events = {
  // 现有事件...
  
  // 新增 DocFlow 事件
  DOCFLOW_DOCUMENT_CHANGED: 'docflow:document_changed',
  DOCFLOW_EDITOR_STATE_CHANGED: 'docflow:editor_state_changed',
  DOCFLOW_AI_STATUS_CHANGED: 'docflow:ai_status_changed',
  DOCFLOW_COLLABORATION_USERS_CHANGED: 'docflow:collaboration_users_changed'
};

// 事件监听和触发方法
const on = (event, callback) => {
  eventBus.$on(event, callback);
};

const emit = (event, data) => {
  eventBus.$emit(event, data);
};

const off = (event, callback) => {
  eventBus.$off(event, callback);
};

export { events, on, emit, off };
```

### 2.3 样式系统集成

#### 2.3.1 样式文件结构

```
styles/
├── docflow/               # DocFlow 样式
│   ├── editor.scss        # 编辑器样式
│   ├── ai.scss            # AI 功能样式
│   ├── collaboration.scss # 协作功能样式
│   └── variables.scss     # 变量定义
├── main.scss              # 主样式文件
└── variables.scss         # 全局变量
```

#### 2.3.2 样式集成

**文件：`styles/main.scss`**

```scss
// 现有样式导入
@import './variables.scss';
@import './components.scss';

// 新增 DocFlow 样式导入
@import './docflow/variables.scss';
@import './docflow/editor.scss';
@import './docflow/ai.scss';
@import './docflow/collaboration.scss';

// 全局样式
body {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  // 现有样式...
}

// DocFlow 全局样式
.docflow-container {
  // 容器样式
}
```

## 3. 页面实现

### 3.1 DocFlow 主页

**文件：`views/docflow/index.vue`**

```vue
<template>
  <div class="docflow-home">
    <div class="docflow-header">
      <h1>DocFlow</h1>
      <p>高级文档编辑与协作平台</p>
    </div>
    
    <div class="docflow-features">
      <div class="feature-card" @click="navigateTo('/docflow/editor')">
        <div class="feature-icon block-editor"></div>
        <h3>块级编辑器</h3>
        <p>支持多种内容块类型，拖拽排序，灵活组织文档结构</p>
      </div>
      
      <div class="feature-card" @click="navigateTo('/docflow/ai')">
        <div class="feature-icon ai-assistant"></div>
        <h3>AI 助手</h3>
        <p>头脑风暴、文本润色、内容续写，智能辅助创作</p>
      </div>
      
      <div class="feature-card" @click="navigateTo('/docflow/collaboration')">
        <div class="feature-icon collaboration"></div>
        <h3>实时协作</h3>
        <p>多人同时编辑，实时同步，提升团队协作效率</p>
      </div>
      
      <div class="feature-card" @click="navigateTo('/docflow/templates')">
        <div class="feature-icon templates"></div>
        <h3>文档模板</h3>
        <p>丰富的预设模板，快速创建专业文档</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    methods: {
      navigateTo(path) {
        this.$router.push(path);
      }
    },
    mounted() {
      // 页面初始化逻辑
    }
  };
}
</script>

<style scoped>
.docflow-home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.docflow-header {
  text-align: center;
  margin-bottom: 40px;
}

.docflow-header h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.docflow-header p {
  font-size: 18px;
  color: #666;
}

.docflow-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.feature-icon.block-editor {
  background: #e8f5e8;
  color: #28a745;
}

.feature-icon.ai-assistant {
  background: #fff3cd;
  color: #ffc107;
}

.feature-icon.collaboration {
  background: #e3f2fd;
  color: #17a2b8;
}

.feature-icon.templates {
  background: #f3e5f5;
  color: #6f42c1;
}

.feature-card h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
```

### 3.2 块级编辑器页面

**文件：`views/docflow/editor.vue`**

```vue
<template>
  <div class="docflow-editor-page">
    <div class="editor-header">
      <h2>块级编辑器</h2>
      <div class="editor-actions">
        <button class="btn btn-primary" @click="saveDocument">保存</button>
        <button class="btn btn-default" @click="newDocument">新建</button>
        <button class="btn btn-default" @click="importDocument">导入</button>
      </div>
    </div>
    
    <div class="editor-container">
      <DocFlowEditor 
        ref="editor"
        :initial-content="document.content"
        @update:content="handleContentUpdate"
      />
    </div>
    
    <div class="editor-sidebar">
      <div class="sidebar-section">
        <h3>文档信息</h3>
        <div class="info-item">
          <label>标题</label>
          <input v-model="document.title" class="form-control" />
        </div>
        <div class="info-item">
          <label>创建时间</label>
          <span>{{ formatDate(document.createdAt) }}</span>
        </div>
        <div class="info-item">
          <label>更新时间</label>
          <span>{{ formatDate(document.updatedAt) }}</span>
        </div>
      </div>
      
      <div class="sidebar-section">
        <h3>模板</h3>
        <div class="template-list">
          <div 
            v-for="template in templates" 
            :key="template.id"
            class="template-item"
            @click="applyTemplate(template)"
          >
            {{ template.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  // 动态加载 DocFlow 编辑器组件
  const [DocFlowEditor] = await _.$importVue([
    '@/components/DocFlow/Editor.vue'
  ]);

  return {
    components: {
      DocFlowEditor
    },
    data() {
      return {
        document: {
          id: '',
          title: '新建文档',
          content: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        templates: [
          { id: 1, name: '空白文档' },
          { id: 2, name: 'API 文档' },
          { id: 3, name: '项目计划' },
          { id: 4, name: '会议记录' }
        ]
      };
    },
    methods: {
      handleContentUpdate(content) {
        this.document.content = content;
        this.document.updatedAt = new Date();
      },
      async saveDocument() {
        try {
          // 保存文档逻辑
          const response = await _api.yapi.docflow.saveDocument(this.document);
          if (response.success) {
            this.$message.success('保存成功');
          }
        } catch (error) {
          this.$message.error('保存失败');
        }
      },
      newDocument() {
        // 新建文档
        this.document = {
          id: '',
          title: '新建文档',
          content: '',
          createdAt: new Date(),
          updatedAt: new Date()
        };
      },
      importDocument() {
        // 导入文档
        // 实现文件选择和解析逻辑
      },
      applyTemplate(template) {
        // 应用模板
        // 根据模板 ID 加载对应内容
      },
      formatDate(date) {
        return new Date(date).toLocaleString();
      }
    },
    mounted() {
      // 加载默认文档
      this.loadDefaultDocument();
    },
    loadDefaultDocument() {
      // 加载默认文档逻辑
    }
  };
}
</script>

<style scoped>
.docflow-editor-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background: #f5f5f5;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.editor-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.editor-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-primary:hover {
  background: #0069d9;
}

.btn-default {
  background: white;
  color: #333;
}

.btn-default:hover {
  background: #f8f9fa;
}

.editor-main {
  display: flex;
  flex: 1;
  gap: 20px;
  overflow: hidden;
}

.editor-container {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.editor-sidebar {
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-section h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.info-item {
  margin-bottom: 15px;
}

.info-item label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.template-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.template-item {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.template-item:hover {
  background: #f8f9fa;
  border-color: #007bff;
}
</style>
```

### 3.3 AI 助手页面

**文件：`views/docflow/ai.vue`**

```vue
<template>
  <div class="docflow-ai-page">
    <div class="ai-header">
      <h2>AI 助手</h2>
      <p>智能辅助创作工具</p>
    </div>
    
    <div class="ai-tools">
      <div class="tool-card" @click="openBrainstorming">
        <div class="tool-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 5V11L12 14L9 11V5L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 5V2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>头脑风暴</h3>
        <p>快速生成创意想法和解决方案</p>
      </div>
      
      <div class="tool-card" @click="openTextPolish">
        <div class="tool-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 16L10 12L6 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 16L18 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>文本润色</h3>
        <p>优化文本表达，提升专业度</p>
      </div>
      
      <div class="tool-card" @click="openContentComplete">
        <div class="tool-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 14V20H5V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 12L19 14V20H5V14L12 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 12V8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>内容续写</h3>
        <p>智能续写内容，保持风格一致</p>
      </div>
    </div>
    
    <div class="ai-chat" v-if="showChat">
      <div class="chat-header">
        <h3>{{ currentTool }}</h3>
        <button class="close-button" @click="closeChat">&times;</button>
      </div>
      
      <div class="chat-messages">
        <div class="message user-message">
          <div class="message-content">{{ userInput }}</div>
        </div>
        
        <div class="message ai-message">
          <div class="message-content" v-html="aiResponse"></div>
          <div class="message-status" v-if="aiStatus === 'loading'">
            <div class="loading-spinner"></div>
            <span>AI 思考中...</span>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          v-model="userInput" 
          class="form-control"
          placeholder="输入您的需求..."
          @keyup.enter="sendMessage"
        />
        <button class="btn btn-primary" @click="sendMessage" :disabled="!userInput || aiStatus === 'loading'">
          {{ aiStatus === 'loading' ? '处理中...' : '发送' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  // 动态加载 AI 服务
  const [AIService] = await _.$importVue([
    '@/utils/ai/ai.vue'
  ]);

  return {
    data() {
      return {
        showChat: false,
        currentTool: '',
        userInput: '',
        aiResponse: '',
        aiStatus: 'idle', // idle, loading, success, error
        aiService: new AIService()
      };
    },
    methods: {
      openBrainstorming() {
        this.showChat = true;
        this.currentTool = '头脑风暴';
        this.userInput = '请针对 API 文档设计进行头脑风暴，生成 5 个创意想法';
      },
      openTextPolish() {
        this.showChat = true;
        this.currentTool = '文本润色';
        this.userInput = '请润色以下文本，使其更加专业和流畅：\n\n这是一段需要润色的文本，希望能够更加专业和流畅。';
      },
      openContentComplete() {
        this.showChat = true;
        this.currentTool = '内容续写';
        this.userInput = '请续写以下内容，保持风格一致：\n\nAPI 文档是软件开发中非常重要的组成部分，它能够帮助开发者快速理解和使用 API。';
      },
      closeChat() {
        this.showChat = false;
        this.currentTool = '';
        this.userInput = '';
        this.aiResponse = '';
        this.aiStatus = 'idle';
      },
      async sendMessage() {
        if (!this.userInput || this.aiStatus === 'loading') return;
        
        this.aiStatus = 'loading';
        this.aiResponse = '';
        
        try {
          let serviceMethod;
          
          switch (this.currentTool) {
            case '头脑风暴':
              serviceMethod = this.aiService.brainstorming.generate;
              break;
            case '文本润色':
              serviceMethod = this.aiService.textPolish.polish;
              break;
            case '内容续写':
              serviceMethod = this.aiService.contentComplete.complete;
              break;
            default:
              return;
          }
          
          // 生成请求数据
          const data = await serviceMethod(this.userInput);
          
          // 发送流式请求
          await this.aiService.streamRequest(`/api/ai/${this.currentTool}`, data, {
            onMessage: (response) => {
              if (response.type === 'data') {
                this.aiResponse += response.content;
              }
            },
            onComplete: () => {
              this.aiStatus = 'success';
            },
            onError: (error) => {
              console.error('AI request error:', error);
              this.aiStatus = 'error';
              this.aiResponse = '抱歉，AI 处理失败，请重试。';
            }
          });
        } catch (error) {
          console.error('AI service error:', error);
          this.aiStatus = 'error';
          this.aiResponse = '抱歉，AI 服务暂时不可用，请稍后重试。';
        }
      }
    },
    mounted() {
      // 初始化 AI 服务
      this.aiService.init({});
    }
  };
}
</script>

<style scoped>
.docflow-ai-page {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.ai-header {
  text-align: center;
  margin-bottom: 40px;
}

.ai-header h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}

.ai-header p {
  font-size: 18px;
  color: #666;
}

.ai-tools {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.tool-card {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.tool-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: #f0f4ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a6cf7;
}

.tool-card h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.tool-card p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.ai-chat {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.chat-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #e0e0e0;
}

.chat-messages {
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
}

.message {
  margin-bottom: 20px;
}

.user-message {
  text-align: right;
}

.user-message .message-content {
  display: inline-block;
  background: #e3f2fd;
  padding: 12px 16px;
  border-radius: 18px 18px 0 18px;
  max-width: 80%;
  text-align: left;
}

.ai-message .message-content {
  background: #f5f5f5;
  padding: 12px 16px;
  border-radius: 18px 18px 18px 0;
  max-width: 80%;
}

.message-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.chat-input .form-control {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
}

.chat-input .btn {
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
}
</style>
```

## 4. 集成测试与验证

### 4.1 测试计划

#### 4.1.1 功能测试

| 测试项 | 测试内容 | 预期结果 |
|--------|----------|----------|
| 菜单显示 | 检查 DocFlow 菜单是否正确显示 | 菜单显示正常，图标正确 |
| 权限控制 | 测试不同权限用户的菜单访问 | 权限控制生效，无权限用户看不到对应菜单 |
| 页面访问 | 测试 DocFlow 各页面访问 | 页面加载正常，无错误 |
| 编辑器功能 | 测试块级编辑器的核心功能 | 编辑器功能正常，支持块级编辑 |
| AI 功能 | 测试 AI 助手的各项功能 | AI 功能正常，响应及时 |
| 数据保存 | 测试文档保存和加载 | 数据保存成功，加载正常 |

#### 4.1.2 集成测试

| 测试项 | 测试内容 | 预期结果 |
|--------|----------|----------|
| 与现有系统集成 | 测试 DocFlow 与现有功能的集成 | 集成正常，无冲突 |
| 样式一致性 | 测试 DocFlow 样式与系统风格一致性 | 样式一致，美观协调 |
| 性能测试 | 测试页面加载和操作性能 | 加载速度快，操作流畅 |
| 兼容性测试 | 测试在不同浏览器中的表现 | 兼容主流浏览器 |

### 4.2 验证步骤

#### 4.2.1 菜单验证

1. **登录系统**：使用管理员账号登录
2. **检查菜单**：确认 DocFlow 菜单是否显示在左侧菜单中
3. **检查子菜单**：展开 DocFlow 菜单，确认子菜单是否完整显示
4. **权限测试**：使用不同权限的账号登录，验证菜单显示是否符合权限设置

#### 4.2.2 功能验证

1. **块级编辑器**：
   - 访问 `/docflow/editor` 页面
   - 测试创建、编辑、保存文档
   - 测试块级内容的添加和编辑
   - 测试拖拽排序功能

2. **AI 助手**：
   - 访问 `/docflow/ai` 页面
   - 测试头脑风暴功能
   - 测试文本润色功能
   - 测试内容续写功能
   - 验证 AI 响应是否正确

3. **实时协作**：
   - 访问 `/docflow/collaboration` 页面
   - 测试多人同时编辑
   - 验证实时同步效果
   - 测试用户状态显示

### 4.3 问题排查

#### 4.3.1 常见问题

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 菜单不显示 | 菜单配置错误 | 检查 `config/menu.js` 配置 |
| 页面无法访问 | 路由配置错误 | 检查 `config/routes.js` 配置 |
| 权限验证失败 | 权限配置错误 | 检查 `config/permission.js` 配置 |
| 组件加载失败 | 路径错误或组件不存在 | 检查组件路径和文件是否存在 |
| 样式不一致 | 样式冲突 | 检查样式文件和命名空间 |
| AI 功能无响应 | API 配置错误 | 检查 AI 服务配置和网络连接 |

#### 4.3.2 调试工具

**推荐工具：**

1. **浏览器开发者工具**：
   - 控制台：查看 JavaScript 错误
   - 网络：监控 API 请求
   - 元素：检查 DOM 结构和样式

2. **日志系统**：
   - 前端日志：使用 `console.log()` 输出关键信息
   - 后端日志：查看服务器端日志

3. **调试命令**：
   - `npm run dev`：启动开发服务器
   - `npm run lint`：检查代码质量
   - `npm run build`：构建项目

## 5. 总结

通过详细的入口菜单与集成规划，我们成功将 DocFlow 核心功能集成到 business_yapi 项目中。主要完成了以下工作：

1. **菜单系统集成**：
   - 在现有菜单结构中添加了 DocFlow 一级菜单
   - 设计了合理的二级菜单结构
   - 实现了菜单权限控制

2. **核心系统集成**：
   - 与现有应用入口集成
   - 与全局状态管理集成
   - 与事件总线集成
   - 与样式系统集成

3. **页面实现**：
   - 创建了 DocFlow 主页
   - 实现了块级编辑器页面
   - 实现了 AI 助手页面
   - 实现了实时协作页面

4. **测试与验证**：
   - 制定了详细的测试计划
   - 实现了功能测试和集成测试
   - 提供了问题排查方案

通过这些工作，我们确保了 DocFlow 功能与 business_yapi 项目的无缝集成，为用户提供了现代化的文档编辑与协作体验。集成过程中，我们严格遵循了项目现有的代码规范和架构设计，确保了系统的稳定性和一致性。