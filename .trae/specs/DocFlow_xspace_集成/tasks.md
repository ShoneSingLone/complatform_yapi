# DocFlow xspace 集成 - 详细实现计划

## [ ] Task 1: 目录结构创建
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 `static/business_xspace/views/` 下创建 `DocFlow` 目录
  - 按照分形和就近原则设计 DocFlow 的目录结构
  - 确保目录结构符合 xspace 的规范
- **Acceptance Criteria Addressed**: 整体架构
- **Test Requirements**:
  - `human-judgement`: 目录结构清晰，符合 xspace 规范
  - `human-judgement`: 目录结构便于维护和扩展
- **Implementation Details**:
  ```
  static/business_xspace/views/DocFlow/
  ├── index.vue                 # DocFlow 入口组件
  ├── ViewDocFlow.vue           # DocFlow 主页面组件
  ├── components/               # 组件目录
  │   ├── DocFlowEditor/        # 编辑器组件
  │   │   ├── index.vue         # 编辑器入口
  │   │   ├── components/       # 编辑器子组件
  │   │   │   ├── Toolbar.vue   # 工具栏组件
  │   │   │   └── Content.vue   # 内容区域组件
  │   │   ├── extensions/       # 编辑器扩展
  │   │   │   ├── index.vue     # 扩展注册
  │   │   │   ├── collaboration/  # 协作扩展
  │   │   │   ├── comments/      # 评论扩展
  │   │   │   └── math/          # 数学公式扩展
  │   │   ├── plugins/          # 编辑器插件
  │   │   └── utils/            # 编辑器工具函数
  │   ├── DocFlowList/          # 文档列表组件
  │   │   ├── index.vue         # 列表入口
  │   │   ├── components/       # 列表子组件
  │   │   └── utils/            # 列表工具函数
  │   └── DocFlowHeader/        # 头部组件
  │       ├── index.vue         # 头部入口
  │       └── components/       # 头部子组件
  ├── views/                    # 页面视图
  │   ├── DocFlowDocument/      # 文档编辑页面
  │   │   ├── index.vue         # 页面入口
  │   │   ├── components/       # 页面子组件
  │   │   └── utils/            # 页面工具函数
  │   └── DocFlowList/          # 文档列表页面
  │       ├── index.vue         # 页面入口
  │       ├── components/       # 页面子组件
  │       └── utils/            # 页面工具函数
  └── utils/                    # 通用工具函数
      ├── api.vue               # API 接口
      ├── ai.vue                # AI 服务
      ├── collaboration.vue     # 协作服务
      └── file.vue              # 文件处理
  ```

## [ ] Task 2: 路由配置
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 在 `static/business_xspace/router/routes.vue` 中添加 DocFlow 路由
  - 配置 DocFlow 的主路由和子路由
  - 确保路由配置符合 xspace 的规范
- **Acceptance Criteria Addressed**: 与 xspace 集成
- **Test Requirements**:
  - `programmatic`: 路由配置正确，能够访问 DocFlow 页面
  - `human-judgement`: 路由结构清晰，符合 xspace 规范
- **Implementation Details**:
  ```javascript
  // 在 routes.vue 中添加 DocFlow 路由
  _.$newRoute("/docflow", "@/views/DocFlow/ViewDocFlow.vue", {
    redirect: "/docflow/list",
    children: [
      _.$newRoute("/docflow/list", "@/views/DocFlow/views/DocFlowList/index.vue"),
      _.$newRoute("/docflow/document/:id", "@/views/DocFlow/views/DocFlowDocument/index.vue")
    ]
  }),
  ```

## [ ] Task 3: 主页面组件实现
- **Priority**: P0
- **Depends On**: Task 2
- **Description**: 
  - 创建 DocFlow 主页面组件 `ViewDocFlow.vue`
  - 实现页面布局，包括导航栏、编辑器区域等
  - 集成 xspace 现有的状态管理（provide/inject）
  - 实现文档列表和文档创建功能
- **Acceptance Criteria Addressed**: 与 xspace 集成
- **Test Requirements**:
  - `programmatic`: 页面组件正确渲染
  - `human-judgement`: 页面布局与 xspace 设计风格一致
- **Implementation Details**:
```vue
  <template>
    <div class="docflow-container">
      <DocFlowHeader />
      <div class="docflow-content">
        <router-view />
      </div>
    </div>
  </template>

  <script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [DocFlowHeader] = await _.$importVue([
    "@/views/DocFlow/components/DocFlowHeader/index.vue"
  ]);

  return {
    components: {
      DocFlowHeader
    },
    provide() {
      return {
        DocFlow: this
      };
    },
    data() {
      return {
        currentDocument: null
      };
    },
    methods: {
      async createDocument() {
        // 创建新文档的逻辑
      },
      async loadDocument(id) {
        // 加载文档的逻辑
      }
    }
  };
}
</script>
```



<style lang="less">
.docflow-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .docflow-content {
    flex: 1;
    overflow: auto;
  }
}
</style>


## [ ] Task 4: 编辑器核心集成
- **Priority**: P0
- **Depends On**: Task 3
- **Description**: 
  - 集成 Tiptap 3 编辑器核心，通过 CDN 或公共库引入
  - 实现基础扩展系统，使用 `_.$importVue()` 动态加载
  - 适配 xspace 的主题和样式，使用 Less
  - 实现块级编辑功能
- **Acceptance Criteria Addressed**: FR-1, FR-4
- **Test Requirements**:
  - `programmatic`: 编辑器正确初始化和渲染
  - `human-judgement`: 编辑体验流畅，支持块级编辑
- **Implementation Details**:
```vue
  <template>
    <div class="docflow-editor">
      <Toolbar :editor="editor" />
      <Content :editor="editor" />
    </div>
  </template>

  <script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  const [Toolbar, Content, useEditor, StarterKit, DragDrop] = await _.$importVue([
    "@/views/DocFlow/components/DocFlowEditor/components/Toolbar.vue",
    "@/views/DocFlow/components/DocFlowEditor/components/Content.vue",
    "@/views/DocFlow/components/DocFlowEditor/utils/useEditor.vue",
    "@/views/DocFlow/components/DocFlowEditor/extensions/StarterKit.vue",
    "@/views/DocFlow/components/DocFlowEditor/extensions/DragDrop.vue"
  ]);

  return {
    components: {
      Toolbar,
      Content
    },
    data() {
      return {
        editor: null
      };
    },
    mounted() {
      this.editor = useEditor({
        extensions: [
          StarterKit,
          DragDrop
          // 自定义扩展
        ],
        content: "",
        onUpdate: ({ editor }) => {
          // 处理内容更新
        }
      });
    }
  };
}
</script>
```

<style lang="less">
.docflow-editor {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
}
</style>
```

## [ ] Task 5: 实时协作功能实现
- **Priority**: P0
- **Depends On**: Task 4
- **Description**: 
  - 集成 Yjs 文档模型，通过 CDN 或公共库引入
  - 实现 Hocuspocus 客户端
  - 实现协作光标同步
  - 集成 IndexedDB 本地存储
- **Acceptance Criteria Addressed**: FR-2
- **Test Requirements**:
  - `programmatic`: 多人协作时数据同步正确
  - `human-judgement`: 光标同步实时，无明显延迟
- **Implementation Details**:
```vue
  <!-- DocFlow/utils/collaboration.vue -->
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    async initCollaboration(documentId, editor) {
      // 初始化 Yjs 文档
      const ydoc = new Y.Doc();
      const ytext = ydoc.getText('content');

      // 连接到 Hocuspocus 服务器
      const provider = new HocuspocusProvider({
        url: 'ws://localhost:1234',
        name: documentId,
        document: ydoc,
        onConnect() {
          console.log('Connected to collaboration server');
        },
        onDisconnect() {
          console.log('Disconnected from collaboration server');
        }
      });

      // 同步编辑器内容
      ytext.observe(() => {
        editor.commands.setContent(ytext.toString());
      });

      // 同步光标位置
      // 实现光标同步逻辑

      return { ydoc, provider };
    }
  };
}
</script>
```

## [ ] Task 6: 后端服务实现
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 在 `server/controllers/` 下创建 `docflow.ts` 控制器
  - 实现 API 路由，使用 Koa
  - 集成 Hocuspocus 服务器
  - 实现文件上传服务，复用 xspace 现有上传接口
- **Acceptance Criteria Addressed**: 基础架构
- **Test Requirements**:
  - `programmatic`: API 路由正确注册
  - `programmatic`: 文件上传功能正常
- **Implementation Details**:
  ```typescript
  // server/controllers/docflow.ts
  import Koa from 'koa';
  import { Server } from '@hocuspocus/server';

  export default class DocFlowController {
    async getDocuments(ctx: Koa.Context) {
      // 获取文档列表
    }

    async getDocument(ctx: Koa.Context) {
      // 获取单个文档
    }

    async createDocument(ctx: Koa.Context) {
      // 创建新文档
    }

    async updateDocument(ctx: Koa.Context) {
      // 更新文档
    }

    async deleteDocument(ctx: Koa.Context) {
      // 删除文档
    }
  }

  // 启动 Hocuspocus 服务器
  const server = Server.configure({
    port: 1234,
    onStoreDocument(data) {
      // 存储文档数据
    },
    onLoadDocument(data) {
      // 加载文档数据
    }
  });

  server.listen();

## [ ] Task 7: AI 辅助功能实现
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 集成 AI API 调用，使用 `_api.xspace` 调用后端接口
  - 实现 AI 工具栏，使用 ui-x 组件
  - 实现流式响应处理，使用 SSE
  - 实现头脑风暴、文本润色、内容续写功能
- **Acceptance Criteria Addressed**: FR-3
- **Test Requirements**:
  - `programmatic`: AI API 调用正常
  - `human-judgement`: AI 功能响应及时，结果质量良好
- **Implementation Details**:
```vue
  <template>
    <div class="ai-toolbar">
      <xBtn :configs="aiButtons.brainstorm" />
      <xBtn :configs="aiButtons.polish" />
      <xBtn :configs="aiButtons.continue" />
    </div>
  </template>

  <script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    data() {
      const vm = this;
      return {
        aiButtons: {
          brainstorm: {
            label: '头脑风暴',
            onClick: async () => {
              await vm.handleAIRequest('brainstorm');
            }
          },
          polish: {
            label: '文本润色',
            onClick: async () => {
              await vm.handleAIRequest('polish');
            }
          },
          continue: {
            label: '内容续写',
            onClick: async () => {
              await vm.handleAIRequest('continue');
            }
          }
        }
      };
    },
    methods: {
      async handleAIRequest(type) {
        const selectedText = this.$parent.editor.getSelection();
        const response = await _api.xspace.aiRequest({
          type,
          text: selectedText
        });
        // 处理 AI 响应
      }
    }
  };
}
</script>
```

## [ ] Task 8: 文件上传与管理实现
- **Priority**: P1
- **Depends On**: Task 4, Task 6
- **Description**: 
  - 实现图片上传功能，复用 xspace 现有上传接口
  - 实现文件预览
  - 集成 xspace 现有文件存储
  - 实现文件管理界面，使用 ui-x 组件
- **Acceptance Criteria Addressed**: FR-7
- **Test Requirements**:
  - `programmatic`: 文件上传功能正常
  - `human-judgement`: 文件预览和管理界面用户体验良好
- **Implementation Details**:
```vue
  <!-- DocFlow/utils/file.vue -->
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await _api.xspace.saveImgByBase64(formData);
      return response.data;
    },

    async previewFile(fileId) {
      const response = await _api.xspace.getFileInfo({ fileId });
      return response.data;
    }
  };
}
</script>
```

## [ ] Task 9: 评论系统实现
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 实现评论标记功能，基于 Tiptap 扩展
  - 实现评论面板，使用 ui-x 组件
  - 实现评论的创建、编辑和删除
  - 实现评论的回复和讨论
- **Acceptance Criteria Addressed**: FR-5
- **Test Requirements**:
  - `programmatic`: 评论功能正常
  - `human-judgement`: 评论界面用户体验良好
- **Implementation Details**:
```vue
  <template>
    <div class="comment-panel">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-actions">
          <xBtn size="small" @click="replyComment(comment)">回复</xBtn>
          <xBtn size="small" @click="editComment(comment)">编辑</xBtn>
          <xBtn size="small" @click="deleteComment(comment)">删除</xBtn>
        </div>
      </div>
      <xForm col="1">
        <xItem :configs="commentForm.content" />
        <xBtn :configs="commentForm.submit" />
      </xForm>
    </div>
  </template>

  <script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    data() {
      const vm = this;
      return {
        comments: [],
        commentForm: {
          content: {
            label: '评论内容',
            type: 'textarea',
            value: '',
            rules: [_rules.required()]
          },
          submit: {
            label: '提交',
            onClick: async () => {
              await vm.addComment();
            }
          }
        }
      };
    },
    methods: {
      async addComment() {
        // 添加评论的逻辑
      },
      async replyComment(comment) {
        // 回复评论的逻辑
      },
      async editComment(comment) {
        // 编辑评论的逻辑
      },
      async deleteComment(comment) {
        // 删除评论的逻辑
      }
    }
  };
}
</script>
  ```

## [ ] Task 10: 数学公式编辑实现
- **Priority**: P2
- **Depends On**: Task 4
- **Description**: 
  - 集成 MathLive 编辑器，通过 CDN 或公共库引入
  - 实现 LaTeX 语法支持
  - 实现数学公式渲染
  - 适配 xspace 主题
- **Acceptance Criteria Addressed**: FR-6
- **Test Requirements**:
  - `programmatic`: 数学公式编辑功能正常
  - `human-judgement`: 数学公式渲染正确，编辑体验良好
- **Implementation Details**:
```vue
  <template>
    <div class="math-editor">
      <div ref="mathField"></div>
    </div>
  </template>

  <script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    mounted() {
      // 初始化 MathLive 编辑器
      const mathField = MathLive.makeMathField(this.$refs.mathField, {
        onContentChange: (mathField) => {
          const latex = mathField.getValue();
          // 处理数学公式内容变化
        }
      });
    }
  };
}
</script>
  ```

## [ ] Task 11: 搜索与替换功能实现
- **Priority**: P2
- **Depends On**: Task 4
- **Description**: 
  - 实现搜索面板，使用 ui-x 组件
  - 实现搜索算法
  - 实现替换功能
  - 适配 xspace 主题
- **Acceptance Criteria Addressed**: FR-8
- **Test Requirements**:
  - `programmatic`: 搜索与替换功能正常
  - `human-judgement`: 搜索界面用户体验良好
- **Implementation Details**:
```vue
  <template>
    <div class="search-panel">
      <xForm col="1">
        <xItem :configs="searchForm.search" />
        <xItem :configs="searchForm.replace" />
        <div class="search-actions">
          <xBtn :configs="searchForm.find" />
          <xBtn :configs="searchForm.replace" />
          <xBtn :configs="searchForm.replaceAll" />
        </div>
      </xForm>
    </div>
  </template>

  <script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
  return {
    data() {
      const vm = this;
      return {
        searchForm: {
          search: {
            label: '搜索',
            value: '',
            placeholder: '输入搜索内容'
          },
          replace: {
            label: '替换',
            value: '',
            placeholder: '输入替换内容'
          },
          find: {
            label: '查找',
            onClick: () => {
              vm.findNext();
            }
          },
          replace: {
            label: '替换',
            onClick: () => {
              vm.replaceCurrent();
            }
          },
          replaceAll: {
            label: '全部替换',
            onClick: () => {
              vm.replaceAll();
            }
          }
        }
      };
    },
    methods: {
      findNext() {
        // 查找下一个匹配项
      },
      replaceCurrent() {
        // 替换当前匹配项
      },
      replaceAll() {
        // 替换所有匹配项
      }
    }
  };
}
</script>
  ```

## [ ] Task 12: 原子化设计实现
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 实现编辑器组件的原子化设计
  - 确保组件的可复用性和灵活性
  - 实现扩展机制，支持自定义功能
- **Acceptance Criteria Addressed**: NFR-2
- **Test Requirements**:
  - `human-judgement`: 组件设计合理，易于扩展
  - `human-judgement`: 代码结构清晰，易于维护
- **Implementation Details**:
```vue
  <!-- 原子化组件设计 -->
  <!-- 1. 基础组件 -->
  <!-- DocFlow/components/DocFlowEditor/components/ToolbarButton.vue - 基础按钮组件 -->
  <!-- DocFlow/components/DocFlowEditor/components/Icon.vue - 图标组件 -->
  
  <!-- 2. 功能组件 -->
  <!-- DocFlow/components/DocFlowEditor/components/FormattingTools.vue - 格式化工具 -->
  <!-- DocFlow/components/DocFlowEditor/components/BlockTools.vue - 块级工具 -->
  
  <!-- 3. 扩展机制 -->
  <!-- DocFlow/components/DocFlowEditor/extensions/index.vue - 扩展注册 -->
  
  <!-- 4. 插件系统 -->
  <!-- DocFlow/components/DocFlowEditor/plugins/index.vue - 插件注册 -->
  ```