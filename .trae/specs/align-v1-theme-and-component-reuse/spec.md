# ViewXspace 原版风格与主题复用 Spec

## Why
当前 `static/business_xspace/views/v1` 已具备桌面工作区的基本结构，但视觉语言仍偏自定义演绎，尚未明确受约束于原版风格体系、`entry.vue` 中的全局 CSS 变量和项目现有组件生态。需要补充一份更聚焦的规格，避免后续实现继续引入新的配色体系、重复造轮子或与原版页面风格分叉。

## What Changes
- 约束 `views/v1` 整体视觉需与原版 xspace 主界面保持一致，包括布局气质、材质层级、控件密度和交互反馈
- 约束颜色、阴影、边框、背景和文本层级优先使用 `entry.vue` 已引入的全局 CSS 变量，不再为 v1 单独发明新的主题主色体系
- 约束可由项目现有组件或现有组件能力组合完成的界面元素，优先复用 `ui-x` 全局组件和业务侧已有组件
- 明确仅在现有组件无法满足时，才允许新增轻量包装层或局部样式扩展
- 对 `ViewXspace.vue` 及其子组件建立统一的视觉一致性要求，避免各组件独立定义风格

## Impact
- Affected specs: `align-viewxspace-shell`, `desktop-workspace-style-refactor`
- Affected code:
  - `static/business_xspace/views/v1/ViewXspace.vue`
  - `static/business_xspace/views/v1/components/AuthScreen.vue`
  - `static/business_xspace/views/v1/components/DesktopIcon.vue`
  - `static/business_xspace/views/v1/components/Dock.vue`
  - `static/business_xspace/views/v1/components/TopBar.vue`
  - `static/business_xspace/views/v1/components/Window.vue`
  - `static/business_xspace/views/v1/components/WindowModal.vue`
  - `static/business_xspace/views/v1/components/modules/ApiManager.vue`
  - `static/business_xspace/views/v1/components/modules/Explore.vue`
  - `static/business_xspace/entry.vue`

## ADDED Requirements
### Requirement: v1 工作区整体风格需要与原版一致
系统 SHALL 使 `static/business_xspace/views/v1` 的整体视觉语言与原版 xspace 工作区保持一致，而不是形成一套独立的新风格。

#### Scenario: 用户进入 v1 工作区
- **WHEN** 用户打开 `/v1` 页面
- **THEN** 顶部栏、桌面区域、窗口、Dock 和模块内容区应呈现统一的原版风格
- **AND** 页面不应出现明显偏离原版的独立配色体系、材质语言或控件密度

### Requirement: v1 颜色体系优先使用 entry 中的全局 CSS 变量
系统 SHALL 优先复用 `entry.vue` 中已加载主题体系提供的全局 CSS 变量来定义颜色、背景、边框、阴影和状态层级。

#### Scenario: 定义 v1 样式令牌
- **WHEN** 组件需要设置背景色、文本色、边框色、主色或交互态样式
- **THEN** 应优先引用现有全局 CSS 变量
- **AND** 只有在现有变量无法表达需求时，才允许新增局部补充变量
- **AND** 不应直接在多个组件内散落新的硬编码主色体系

### Requirement: v1 组件优先复用项目现有组件
系统 SHALL 优先复用项目现有全局组件和业务组件能力，而不是为相同用途重复实现新的基础控件。

#### Scenario: 构建界面元素
- **WHEN** 需要实现按钮、图标、输入框、对话框、表单项、列表容器或空态
- **THEN** 应优先评估并使用 `ui-x` 全局组件或现有业务组件
- **AND** 如现有组件能力不足，应优先采用包装扩展
- **AND** 只有在无法合理包装时，才允许新增独立实现

### Requirement: v1 各子组件需要遵守统一风格来源
系统 SHALL 让 `ViewXspace.vue` 及其子组件共享同一套视觉来源和样式约束，避免每个组件独立定义风格基线。

#### Scenario: 组件联动展示
- **WHEN** 顶部栏、桌面图标、Dock、窗口和模块内容同时渲染
- **THEN** 它们的圆角、阴影、透明度、边框和文本层级应保持协调
- **AND** 交互反馈应来自一致的样式令牌与组件模式

### Requirement: 模块内容区要优先贴近现有业务页面表达
系统 SHALL 让 `ApiManager.vue`、`Explore.vue` 等模块内容区在保留桌面容器体验的前提下，尽量贴近原版业务页面的视觉表达和组件复用方式。

#### Scenario: 打开业务模块窗口
- **WHEN** 用户打开 API 管理、探索等模块
- **THEN** 内容区应优先复用现有业务模块的组件表达、表单控件和列表风格
- **AND** 不应为桌面版窗口内部重新发明一套与原版业务页面冲突的控件视觉

## MODIFIED Requirements
### Requirement: 桌面样式对齐的实现方式
原需求主要强调桌面壳层与预期稿接近。

修改后：
- 不仅要求壳层视觉对齐
- 还要求所有风格决策追溯到原版页面与全局主题变量
- 同时要求优先复用现有组件能力，而不是仅做静态样式仿制

### Requirement: 样式复用策略
原需求强调复用项目样式系统和 BEM 命名。

修改后：
- 在保留原有样式复用原则的基础上
- 进一步明确 `entry.vue` 中的全局 CSS 变量是 v1 主题取值的首选来源
- 进一步明确组件复用优先级高于新增局部实现

## REMOVED Requirements
### Requirement: v1 可以形成独立主题子系统
**Reason**: 这会继续扩大与原版 xspace 的视觉分叉，增加后续维护成本。
**Migration**: 将 v1 的配色、边框、阴影和表面层级回收至 `entry.vue` 的全局变量体系。

### Requirement: 为桌面场景单独实现一批基础控件
**Reason**: 项目已经具备 `ui-x` 和现有业务组件生态，重复实现会造成维护和体验不一致。
**Migration**: 优先复用现有组件；必要时仅新增轻量包装层或局部扩展样式。
