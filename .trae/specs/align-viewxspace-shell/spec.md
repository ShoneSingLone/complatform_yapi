# ViewXspace 样式对齐 Spec

## Why
当前 `ViewXspace.vue` 的组件结构基本成立，但视觉效果与预期稿差距明显：桌面背景过于平、顶部栏信息密度不对、左侧图标与底部 Dock 的质感不一致、主窗口缺少预期中的浅灰大圆角和柔和阴影。因此需要在不推翻现有结构的前提下，重新定义整套桌面样式。

## What Changes
- 保留 `ViewXspace.vue` 现有桌面结构：顶部栏、桌面图标区、主窗口、底部 Dock
- 重新定义桌面背景的渐变、发光和整体氛围层
- 调整 `TopBar.vue` 的内容排布、透明度、字体和图标风格，使其贴近预期稿的系统状态栏
- 调整 `DesktopIcon.vue` 的位置、图标容器材质、标签样式和间距，使其更接近左侧启动区效果
- 调整 `Dock.vue` 的容器形态、按钮尺寸、激活态和简化程度，使其符合预期稿的底部浮动控件
- 调整 `WindowModal.vue` 的窗口圆角、阴影、边框、标题栏和内部内容留白，使主窗口成为视觉中心

## Impact
- Affected specs: `desktop-workspace-style-refactor`, `desktop-workspace-gap-analysis`
- Affected code:
  - `static/business_xspace/views/v1/ViewXspace.vue`
  - `static/business_xspace/views/v1/components/TopBar.vue`
  - `static/business_xspace/views/v1/components/DesktopIcon.vue`
  - `static/business_xspace/views/v1/components/Dock.vue`
  - `static/business_xspace/views/v1/components/WindowModal.vue`

## ADDED Requirements
### Requirement: 桌面背景需要贴近预期稿氛围
系统 SHALL 保留桌面背景层，但将其调整为具有明显品牌感的渐变与发光氛围，而不是单一纯色背景。

#### Scenario: 桌面背景渲染
- **WHEN** 用户进入 `ViewXspace`
- **THEN** 页面显示深紫到蓝色的渐变背景
- **AND** 左侧存在暖色发光层或光晕
- **AND** 背景 Logo 若保留，应弱化到不与主窗口争夺视觉焦点

### Requirement: 顶部栏样式需要像系统状态栏
系统 SHALL 保留顶部栏结构，但其样式和信息排布应接近预期稿中的系统状态栏，而不是业务搜索工具栏。

#### Scenario: 顶部栏展示
- **WHEN** 顶部栏渲染完成
- **THEN** 左侧显示系统名称或品牌标识
- **AND** 右侧显示用户信息与时间
- **AND** 顶部栏整体采用轻量、透明或半透明风格
- **AND** 不应让搜索框成为顶部栏视觉主元素

### Requirement: 桌面图标区需要靠左并具备启动器观感
系统 SHALL 保留桌面图标入口，但其排布和视觉应更接近桌面启动器，而不是均匀铺满的内容网格。

#### Scenario: 桌面图标渲染
- **WHEN** 桌面图标显示
- **THEN** 图标整体靠左布局
- **AND** 图标按钮具有更大的点击热区和更统一的底色材质
- **AND** 标签位于图标下方并保持清晰可读
- **AND** 不需要高干扰的移除按钮常驻暴露

### Requirement: 底部 Dock 需要简化为少量浮动控件
系统 SHALL 保留底部 Dock，但将其样式调整为预期稿中的简洁浮动按钮组，而不是应用列表型 Dock。

#### Scenario: Dock 展示
- **WHEN** 底部 Dock 渲染
- **THEN** Dock 采用更高圆角和更厚实的半透明底板
- **AND** 默认仅突出少量核心控件
- **AND** 激活态通过底色、阴影或高亮边缘体现
- **AND** 悬浮预览、分隔线和多图标密集感应尽量弱化

### Requirement: 主窗口需要成为页面视觉中心
系统 SHALL 保留窗口体系，但默认窗口样式需要对齐预期稿中的大尺寸内容卡片。

#### Scenario: 主窗口打开
- **WHEN** 用户打开工作区窗口
- **THEN** 窗口呈现浅灰或雾面材质
- **AND** 窗口拥有大圆角、柔和阴影和细边框
- **AND** 窗口与屏幕边缘保持足够留白
- **AND** 窗口标题栏与内容区层次清晰，不呈现过强的 Material 组件感

### Requirement: 内容区控件需要对齐预期稿密度
系统 SHALL 保留内容区标题、搜索框和视图切换等控件，但要调整它们的尺寸、配色和留白。

#### Scenario: 内容区头部
- **WHEN** 主窗口内容头部显示
- **THEN** 标题、搜索框和切换按钮在同一水平区域内对齐
- **AND** 搜索框宽度和背景色更接近预期稿
- **AND** 列表/网格切换按钮具有轻量图标按钮外观

## MODIFIED Requirements
### Requirement: ViewXspace 的改造范围
原需求假定 `ViewXspace` 需要通过结构性调整来贴近预期稿。

修改后：
- `ViewXspace` 的主要问题定义为样式偏差，而非结构偏差
- 改造重点是视觉层、间距、材质、控件密度和图标表达
- 现有组件组织关系原则上保持不变，仅在必要时做轻量模板微调

### Requirement: 桌面图标和 Dock 的角色
原需求倾向于移除或迁移桌面图标与 Dock。

修改后：
- 桌面图标与 Dock 继续保留
- 但它们的样式、位置和信息密度需要向预期稿收敛
- 组件功能不作为本次规格的主要变更对象

## REMOVED Requirements
### Requirement: 将 ViewXspace 改造成单一工作区容器
**Reason**: 用户确认当前结构方向是对的，问题不在骨架。
**Migration**: 保持 `TopBar`、桌面区、窗口与 Dock 结构，改为做样式和视觉对齐。

### Requirement: 移除桌面图标网格与 Dock 主结构
**Reason**: 这会误伤现有交互模型，不符合当前需求。
**Migration**: 仅收敛其布局方式和外观表现，不删除核心组件。
