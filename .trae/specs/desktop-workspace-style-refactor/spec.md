# 桌面工作空间样式系统重构 Spec

## Why

当前桌面工作空间组件（Dock, TopBar 等）使用了大量类似 Tailwind 的原子化 CSS 类名，这些类名：
1. 不符合项目规范要求的 **BEM 命名约定**
2. 与项目现有的样式系统不统一（项目已有 `xspace.defaul.style.vue` 和 `ui-x/theme/theme.default.vue`）
3. 需要在组件中重复定义大量原子类，导致代码冗余

## What Changes

- **保留项目现有样式系统**：复用 `xspace.defaul.style.vue` 和 `ui-x/theme/theme.default.vue` 中的工具类
- **重构 v1 组件的语义化样式**：使用 BEM 命名创建组件特有的语义化类名
- **减少原子类的使用**：在模板中使用语义化类名，而非原子类组合
- **创建组件专属样式**：为每个桌面工作空间组件创建符合 BEM 规范的样式

**影响的组件:**
- `Dock.vue` - Dock 栏组件
- `TopBar.vue` - 顶部栏组件  
- `DesktopIcon.vue` - 桌面图标组件
- `WindowModal.vue` - 窗口组件
- `ViewXspace.vue` - 主视图组件
- `AuthScreen.vue` - 认证屏幕组件
- `modules/ApiManager.vue` - API 管理器组件

## Impact

- **Affected specs**: desktop-workspace-v2 spec
- **Affected code**: 
  - `/home/shone/Documents/workspace/xspace/static/business_xspace/views/v1/components/*.vue`
  - `/home/shone/Documents/workspace/xspace/static/business_xspace/views/V1/ViewXspace.vue`
- **依赖的样式文件**:
  - `/home/shone/Documents/workspace/xspace/static/business_xspace/xspace.defaul.style.vue` (项目专有样式)
  - `/home/shone/Documents/workspace/xspace/static/common/ui-x/theme/theme.default.vue` (项目通用样式)

## ADDED Requirements

### Requirement: 复用项目样式系统
系统 SHALL 优先复用项目现有的样式文件

#### Scenario: 样式复用
- **WHEN** 需要通用样式（如 flex, margin, padding）
- **THEN** 应使用 `theme.default.vue` 中定义的工具类
- **示例**: `.flex`, `.flex.middle`, `.p8`, `.m8`

### Requirement: BEM 命名规范
系统 SHALL 为组件特有样式使用 BEM 命名约定

#### Scenario: 组件样式命名
- **WHEN** 定义组件特有的语义化样式
- **THEN** 应使用 BEM 格式：`block__element--modifier`
- **示例**: 
  - Block: `dock`
  - Element: `dock__item`, `dock__item-wrapper`
  - Modifier: `dock__item--active`, `dock__item--pinned`

### Requirement: 样式分层
系统 SHALL 将样式分为三层

#### Scenario: 样式层次
1. **基础工具层**: `theme.default.vue` 中的通用工具类（`.flex`, `.p8`, `.m8`）
2. **项目基础层**: `xspace.defaul.style.vue` 中的项目基础样式（颜色变量、elevation、圆角）
3. **组件语义层**: 各组件特有的 BEM 语义化样式

## MODIFIED Requirements

### Requirement: 样式组织方式
**原需求**: 完全使用原子化 CSS 类名组合

**修改后**: 
- 通用样式使用 `theme.default.vue` 的工具类
- 组件特有样式使用 BEM 语义化类名
- 混合使用工具类和语义化类名（合理分层）

### Requirement: 样式定义位置
**原需求**: 每个组件独立定义所有样式

**修改后**: 
- 通用工具类不复定义，直接使用 `theme.default.vue`
- 项目基础样式不复定义，直接使用 `xspace.defaul.style.vue`
- 组件特有样式在组件内定义

## REMOVED Requirements

### Requirement: 完全替换为 BEM 命名
**Reason**: 项目已有成熟的工具类系统，应复用而非替换
**Migration**: 
- 保留通用工具类的使用
- 仅为组件特有语义创建 BEM 类名
