# macOS风格桌面工作空间规格文档

## 变更记录

| 日期       | 版本 | 修改人 | 修改内容                                                                                                                               |
| ---------- | ---- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 2026-04-04 | v1.0 | -      | 初始版本，创建完整规格文档                                                                                                             |
| 2026-04-04 | v1.1 | -      | 明确入口文件路径和路由配置：入口文件 `/Users/shone/workspace/xspace_yapi/static/business_yapi/views/v1/ViewXspace.vue`，路由路径 `/v1` |
| 2026-04-04 | v1.2 | -      | 移除顶部状态栏的环境切换器，将其移至项目 Settings 窗口内                                                                               |
| 2026-04-04 | v1.3 | -      | 保留 Launcher 菜单作为快速启动；桌面图标用于保留状态的窗口快捷访问                                                                     |
| 2026-04-04 | v1.4 | -      | 移除内部标签页(Tabs)，采用纯粹的单资源视图；资源类型注册为独立隐藏应用，支持 Dock 同类窗口堆叠                                         |     |

## 项目概述

为 business_yapi 项目 v1 版本打造一个仿 macOS 风格的桌面工作空间应用，将复杂的 API 管理系统抽象为"资源管理器（File
Explorer）"模式。

## 设计理念

### 核心概念

- **万物皆资源（Everything is a resource）**：类似 VS Code 或 Notion 的设计理念

- **资源管理器模式**：树形目录 + 标签页 + 预览面板的 IDE 模式

- **认知成本极低**：符合开发者和 IT 人员对文件管理器的直觉

### 视觉风格

- 现代、简洁、高质感的毛玻璃效果（Glassmorphism）

- 流畅的过渡动画，响应式反馈

- 类 macOS 桌面布局（顶部状态栏 + 桌面图标 + 底部 Dock）

## 布局架构

### 1. 顶部状态栏（Menu Bar）
- 左侧：应用 Logo、全局搜索、面包屑导航
- 中间：当前工作区信息
- 右侧：用户头像、通知中心

### 2. 左侧资源树（Finder Sidebar）

- 树形目录结构展示资源层级

- 支持展开/折叠、拖拽排序

- 资源类型图标区分（项目、API、文档、成员等）

- 全局资源目录（Global Resources）
    - Data Models（数据模型）

    - 其他跨项目复用资源

### 3. 主工作区（Desktop）

- 窗口化管理打开的资源和工具

- 支持多窗口并行操作

- 桌面快捷方式（Pinned Items）

- 毛玻璃效果背景

### 4. 底部 Dock 栏
- **同类窗口堆叠**：同类型资源（Group/Project/API/Doc等）窗口自动堆叠在同一图标下
- **悬停预览窗口缩略图**：鼠标悬停显示同类窗口列表
- **点击切换**：点击图标聚焦/最小化窗口，多个窗口时显示选择器
- **Launcher 菜单**：快速启动常用功能（仅显示非隐藏应用）
  - 快速创建新项目/API/文档
  - 快速访问最近使用的资源
  - 系统功能快捷入口
- **隐藏应用**：Group、Project、API、Doc 等资源类型在 Launcher 中隐藏，仅在 Dock 中显示

## 核心功能模块

### 1. 资源树（Resource Tree）

#### 层级结构

```
Workspace
├── 分组（Group）
│   └── 项目（Project）
│       ├── API Management
│       │   ├── GET /users
│       │   ├── POST /users
│       │   └── ...
│       ├── Documentation
│       ├── Members（成员管理）
│       └── Settings
└── Global Resources（全局资源）
    ├── Data Models
    │   └── UserSchema.json
    └── Common Components
```

#### 交互特性

- 单击展开/折叠文件夹

- 双击打开资源（新窗口）

- 拖拽调整顺序和层级

- 右键菜单（新建、重命名、删除、复制路径等）

- 支持快捷方式/软链接概念

### 2. 窗口系统（Window System）

#### 窗口行为
- **纯粹单资源视图**：移除内部标签页(Tabs)，每个窗口只展示单一资源
- **直接打开新窗口**：双击文件夹/文件，或点击左侧树形目录节点，直接打开新窗口
- **单例模式**：同一资源多次点击不会重复打开，自动聚焦已打开窗口
- **新窗口全屏**：默认全屏打开，支持最小化、最大化、关闭
- **窗口状态**：记录窗口位置、大小、内容状态
- **左侧树自动展开**：新窗口打开时，左侧资源树自动展开到当前资源所在层级

#### 资源类型（隐藏应用）
资源类型注册为独立的隐藏应用类型，用于 Dock 栏同类窗口堆叠：
- **Group（分组）**：展示分组信息和项目列表
- **Project（项目）**：展示项目概览、统计信息
- **API（接口）**：接口详情 + 调试面板
- **Doc（文档）**：Markdown/富文本编辑器
- **Member（成员）**：权限管理和成员列表
- **Settings（设置）**：项目/系统配置

#### 窗口标题栏
- 资源图标 + 名称
- 操作按钮：最小化、最大化、关闭
- **Pin 按钮**：固定到桌面快捷方式

### 3. 桌面快捷方式（Desktop Shortcuts）

#### 功能特性

- 窗口标题栏 Pin 按钮添加快捷方式到桌面
- 桌面图标网格布局
- **保留状态的窗口快捷访问**：
    - 同时打开不同分组的窗口
    - 同一项目多个接口窗口
    - 接口编辑和测试窗口
- **悬停取消固定**：鼠标悬停显示红色 X 按钮，点击移除
- 支持拖拽排序
- 双击打开对应资源

### 4. Dock 栏

#### 功能特性

- **同类窗口堆叠**：同类型隐藏应用堆叠在同一图标下

- **悬停预览**：鼠标悬停显示同类窗口缩略图列表

- **点击行为**：
    - 无窗口：打开新窗口

    - 单个窗口：聚焦/最小化切换

    - 多个窗口：显示窗口选择器

- **移除 Launcher 菜单**：简化 Dock 设计

### 5. 项目设置（Project Settings）

#### 环境配置

- **环境类型**：Development（开发）、Test（测试）、Staging（预发）、Production（生产）
- **配置位置**：项目 Settings 窗口内
- **作用范围**：仅影响当前项目的 API 调试

#### Settings 窗口内容

- 基础设置（项目名称、描述等）
- 环境配置（多环境 URL 配置）
- 成员权限管理
- 其他项目级配置

### 6. API 调试功能

#### 调试面板

- **请求区域**：
    - HTTP 方法选择（GET/POST/PUT/DELETE等）

    - URL 路径显示

    - Headers 编辑

    - Body 编辑（JSON/form-data等）

    - **Send 按钮**：触发请求

- **响应区域**：
    - HTTP 状态码（如 200 OK）

    - 请求耗时（如 845 ms）

    - 响应体高亮显示（JSON/XML等）

    - 环境变量替换显示

#### 交互流程

1. 用户选择/打开 API 资源
2. 显示接口基本信息和调试面板
3. 点击 Send 按钮，按钮变为 Loading 状态
4. 模拟网络请求延迟
5. 展示响应数据

#### 环境集成

- API 调试使用项目 Settings 中配置的环境
- 环境切换在项目 Settings 窗口中进行
- 不同项目可配置不同的环境 URL

### 7. 全局资源目录（Global Resources）

#### Data Models

- 跨项目复用的数据模型定义

- JSON Schema 格式

- 示例：UserSchema.json

#### 其他全局资源

- 公共组件

- 通用配置

- 共享脚本

## 动画与交互

### 过渡动画

- 窗口打开/关闭：缩放 + 淡入淡出（200-300ms）

- 窗口最小化/最大化：平滑过渡

- Dock 图标弹跳：点击反馈

- 资源树展开/折叠：高度动画

### 响应式反馈

- 按钮悬停：背景色变化 + 轻微缩放

- 拖拽操作：半透明预览 + 放置区域高亮

- 加载状态：按钮 Loading 动画

- 通知提示：右上角滑入

### 毛玻璃效果

- 背景模糊：backdrop-filter: blur(20px)

- 半透明背景：rgba(255, 255, 255, 0.7)

- 边框：1px solid rgba(255, 255, 255, 0.2)

- 阴影：多层阴影营造层次感

## 技术实现

### 前端架构

- Vue 2.x + TypeScript（IDE 识别，不构建）

- 动态模块加载：`_.$importVue()`

- 状态管理：Vue provide/inject

- 样式：Less + CSS 变量

### 组件规划

```
components/DesktopWorkspace/
├── DesktopWorkspace.vue      # 主容器
├── MenuBar.vue               # 顶部状态栏
├── ResourceTree.vue          # 左侧资源树
├── WindowManager.vue         # 窗口管理器
├── Window.vue                # 单个窗口
├── Dock.vue                  # 底部 Dock 栏
├── DesktopIcon.vue           # 桌面图标
├── EnvironmentSwitcher.vue   # 环境切换器
└── ApiDebugger.vue           # API 调试面板
```

### 数据结构

#### 资源节点（Resource Node）

```javascript
{
  id: string,
  type: 'group' | 'project' | 'api' | 'doc' | 'member' | 'folder' | 'file',
  name: string,
  icon: string,
  path: string,
  parentId: string | null,
  children: ResourceNode[],
  metadata: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',  // API 类型
    url?: string,                                 // API 路径
    environment?: string,                         // 所属环境
    isPinned?: boolean,                           // 是否固定到桌面
    isGlobal?: boolean,                           // 是否全局资源
    // 其他元数据
  }
}
```

#### 窗口状态（Window State）

```javascript
{
  id: string,
  resourceId: string,
  resourceType: string,
  title: string,
  icon: string,
  isMinimized: boolean,
  isMaximized: boolean,
  isFocused: boolean,
  position: { x: number, y: number },
  size: { width: number, height: number },
  zIndex: number
}
```

#### 桌面快捷方式（Desktop Shortcut）

```javascript
{
  id: string,
  resourceId: string,
  name: string,
  icon: string,
  position: { x: number, y: number }
}
```

## 优势与注意事项

### 优势

1. **认知成本极低**：符合开发者对 IDE/文件管理器的直觉
2. **极强的可扩展性**：新增功能只需添加新的资源类型
3. **完美支持多任务并行**：多 Tab + 多窗口设计
4. **天然契合权限管理**：层级结构适合 RBAC 权限下发

### 注意事项

1. **强化 API 的动态执行属性**：避免过于像静态文件管理器
2. **引入快捷方式/软链接概念**：处理公共资源引用
3. **支持批量操作与拖拽**：符合资源管理器用户预期
4. **环境隔离清晰**：不同环境的资源状态区分明确

## 集成要求

### 与现有系统集成

- 复用现有的 `_api.yapi` API 调用方式

- 复用现有的文件上传功能

- 复用 ui-x 组件库（xBtn, xDialog, xForm, xItem 等）

- 遵循 `export default async function ({ PRIVATE_GLOBAL })` 结构

- 使用 `_.$importVue()` 动态加载模块

### 路由配置

- **主入口文件**：`/Users/shone/workspace/xspace_yapi/static/business_yapi/views/v1/ViewXspace.vue`

- **路由路径**：`/v1`

- 资源路径与路由同步

## 验收标准

### 功能验收

- [ ] 顶部状态栏正常显示，包含所有功能元素

- [ ] 左侧资源树正确展示层级结构

- [ ] 双击资源打开新窗口，单例模式正常工作

- [ ] 窗口标题栏 Pin 按钮可添加快捷方式到桌面

- [ ] 桌面快捷方式悬停显示取消固定按钮

- [ ] Dock 栏同类窗口堆叠，悬停预览正常

- [ ] 项目 Settings 窗口可配置环境

- [ ] API 调试面板可发送请求并显示响应

- [ ] 全局资源目录正确显示跨项目资源

### 视觉验收

- [ ] 毛玻璃效果正确应用

- [ ] 过渡动画流畅自然

- [ ] 响应式反馈及时明显

- [ ] 整体风格符合 macOS 设计规范

### 性能验收

- [ ] 资源树大数据量下滚动流畅

- [ ] 多窗口切换无卡顿

- [ ] 动画帧率稳定 60fps
