# MEMORY.md

## 项目信息

- **项目名称**：XSpace（基于 XSpace 的接口管理平台）
- **项目位置**：d:\Users\SSL\Documents\GitHub\xspace
- **Node 版本**：>= 16（使用 Volta 管理，配置为 24.12.0）
- **包管理器**：pnpm

## 项目核心功能（共 14 大模块，详细说明见 README.md）

1. **接口管理**：基础 CRUD、分类组织、参数管理（Query/Body/Headers/Path）、状态机（undone→done→open→closed→deleted）、标签系统、编辑冲突处理、Swagger 同步
2. **Mock 服务**：动态 Mock（json-schema-faker）、高级 Mock 脚本、条件匹配、IP 过滤、延迟设置、Mock 用例
3. **项目管理**：多环境配置、全局变量、Pre/After 脚本、成员权限（owner/maintainer/developer/guest）、Token 管理
4. **用户权限系统**：JWT 认证、邮箱验证码、角色层级（超管/组长/项目所有者/普通用户）、权限控制点
5. **分组管理**：多级分组、个人分组（private）、成员管理、分组排序
6. **测试集与自动化测试**：接口集、测试用例管理、自动化执行、HTML/JSON 报告、邮件通知
7. **数据导入导出**：4 个导入插件（Postman/Swagger/HAR/XSpace JSON）、3 个导出插件（Markdown/JSON/HTML/Swagger 2.0/服务代码）
8. **CI/CD 持续集成**：Git 仓库关联、Webhook 管理、任务队列、自动化测试任务
9. **Wiki 文档系统**：多级文档目录、四级权限（private/group/project/all）、版本历史、Diff 对比
10. **资源管理**：分片上传、断点续传、云盘、媒体流（音视频 Range 请求）
11. **通知与动态**：操作日志、邮件通知、SSE/WebSocket 实时推送
12. **搜索功能**：全文搜索（项目/分组/接口/用户）、关键字高亮、分类筛选
13. **系统管理**：SSE 实时通信、插件管理、系统配置
14. **DocFlow 文档流**：块级编辑器、实时协作（Yjs CRDT）、AI 辅助编辑、版本历史
15. **代理服务**：请求转发、CORS 支持、WebSocket 代理

## 技术栈

- **前端**：Vue 2.x + 原生 JS（兼容 TS 语法）
- **后端**：Node.js + Koa + MongoDB/Mongoose + TypeScript
- **编辑器**：Tiptap/ProseMirror（DocFlow）、Toast UI Editor
- **协作**：Yjs CRDT + Hocuspocus WebSocket
- **部署**：Docker 支持

## 重要配置

- 使用 `xspace_configs.js`（项目根目录外）配置敏感信息
- 配置文件包含：数据库连接、邮件服务、代理配置等

## 开发习惯

- 使用 pnpm 管理依赖（禁止使用 npm 或 yarn）
- 启动命令：`pnpm start`
- 重部署命令：`pnpm redeploy`

## DesktopWorkspace 组件系统（X-Manager 资源管理器 UI）

### 组件位置
`static/business_xspace/components/DesktopWorkspace/`

### 核心组件
- **DesktopWorkspace.vue**：主容器，管理多窗口
- **Window.vue**：窗口组件，支持拖拽、缩放、最大化/最小化/关闭
- **Dock.vue**：底部 Dock 栏，显示打开的应用和快捷方式
- **MenuBar.vue**：顶部菜单栏
- **ResourceTree.vue**：资源树形导航
- **TreeNode.vue**：树形节点组件
- **ApiContent.vue**：API 管理内容组件（包含 API 调试、成员管理、设置、文档编辑器）
- **SystemStore.vue**：全局状态管理（Vue.observable）

### 代码规则
- Vue 文件结构：`export default async function ({ PRIVATE_GLOBAL })`
- 使用 `_.$importVue()` 动态加载组件
- 使用 `provide/inject` 进行状态管理
- 模板中不可使用反引号，动态样式需用 computed/method
- API 调用使用 `_api.xspace.methodName()` 形式
- 优先使用 `/common/ui-x/` 组件库
- UI 组件（xForm, xItem, xBtn, xIcon）在 entry.vue 中通过 useXui.vue 全局注册，子组件无需 import

## v1 Desktop Workspace 登录功能

### 文件位置
`static/business_xspace/views/v1/`

### 核心文件
- **ViewXspace.vue**：主容器，提供 v1 局部状态
- **AuthScreen.vue**：登录页，调用 `_api.xspace.userLogin()` 实现真实登录
- **TopBar.vue**：顶部状态栏
- **Dock.vue**：底部 Dock 栏
- **Window.vue**：窗口组件
- **WindowModal.vue**：窗口模态框

### 状态管理架构（APP 和 system 完全独立）
```
entry.vue (根组件)
└── provide: { APP: this }  ← 全局状态（用户信息、登录状态等）

ViewXspace.vue
├── inject: ['APP']  ← 获取全局状态
└── provide: {
      system: {     ← v1 桌面局部状态（与 APP 完全独立）
        apps, shortcuts, openWindows, pinnedApps...
        openApp(), pinApp(), removeShortcut()...
      }
    }

子组件：
├── AuthScreen: inject: ['APP']  ← 只需要全局状态（登录页）
├── TopBar: inject: ['APP', 'system']  ← 两者都需要
├── Dock, Window, WindowModal, Explore, ApiManager: inject: ['system']  ← 只需要局部状态
```

### 登录流程
1. 用户输入 email + password
2. 调用 `_api.xspace.userLogin({ email, password })`
3. 保存 token: `_.$lStorage.x_token = res.data.x_token`
4. 调用 `this.APP.refreshUserInfo()` 刷新用户状态
5. 登出调用 `this.APP.logoutActions()`



