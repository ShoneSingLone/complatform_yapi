# Tasks

- [ ] Task 1: 盘点 `views/v1` 与原版风格的差异，并建立组件复用与主题变量映射
  - [ ] SubTask 1.1: 梳理 `ViewXspace.vue`、顶部栏、桌面图标、Dock、窗口、模块内容区的视觉偏差
  - [ ] SubTask 1.2: 从 `entry.vue` 中整理可直接复用的颜色、背景、边框、阴影、文本层级变量
  - [ ] SubTask 1.3: 盘点 `ui-x` 与现有业务组件中可直接复用或包装复用的组件能力

- [ ] Task 2: 调整 `ViewXspace.vue` 和桌面壳层组件，使整体风格回归原版
  - [ ] SubTask 2.1: 统一桌面背景、顶部栏、图标区、Dock 的材质、透明度、留白和层级
  - [ ] SubTask 2.2: 去除或收敛与原版冲突的自定义配色和独立视觉表达
  - [ ] SubTask 2.3: 确保壳层样式优先依赖全局 CSS 变量而非新增硬编码主题色

- [ ] Task 3: 调整窗口与内容区组件，优先复用现有组件能力
  - [ ] SubTask 3.1: 统一 `Window.vue`、`WindowModal.vue` 的表面样式、标题栏层级和交互反馈
  - [ ] SubTask 3.2: 评估 `ApiManager.vue`、`Explore.vue` 等模块内部控件，优先改为复用现有组件或现有样式模式
  - [ ] SubTask 3.3: 仅在现有组件无法满足时新增轻量包装，不重复实现基础控件

- [ ] Task 4: 统一清理和验证 v1 风格来源
  - [ ] SubTask 4.1: 清理组件内散落的硬编码颜色和不必要的独立主题变量
  - [ ] SubTask 4.2: 检查 `views/v1` 是否仍存在可替换为现有组件的重复实现
  - [ ] SubTask 4.3: 验证整体观感、主题变量依赖和组件复用策略符合规格

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Task 2 and Task 3
