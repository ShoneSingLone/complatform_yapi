# Dock 布局修复与优化 Spec

## Why

Dock 组件当前使用了大量类似 Tailwind 的 CSS 类名，但这些样式都是在组件的 `<style lang="less">` 中手动定义的。需要确保所有使用的类名都有对应的样式定义，并修复可能存在的布局问题。

## What Changes

- 检查并修复 Dock 组件中所有 CSS 类名的样式定义
- 确保所有使用的类名都在 `<style lang="less">` 中有对应定义
- 修复窗口预览面板的布局和样式问题
- 优化动画效果的实现
- 确保与项目代码规范一致

## Impact

- **Affected specs**: desktop-workspace-v2 spec
- **Affected code**: 
  - `/home/shone/Documents/workspace/xspace/static/business_xspace/views/v1/components/Dock.vue`
  - `/home/shone/Documents/workspace/xspace/static/business_xspace/views/V1/ViewXspace.vue`

## ADDED Requirements

### Requirement: 样式完整性
系统 SHALL 确保 Dock 组件中使用的所有 CSS 类名都有对应的 Less 样式定义

#### Scenario: 样式检查
- **WHEN** 开发者查看 Dock.vue 文件
- **THEN** 所有在 template 中使用的类名都应在 style 中有定义

### Requirement: 布局正确性
系统 SHALL 确保 Dock 的布局在不同屏幕尺寸下都能正常工作

#### Scenario: 响应式布局
- **WHEN** 用户调整浏览器窗口大小
- **THEN** Dock 应始终保持在底部中央位置，图标正常显示

### Requirement: 动画流畅性
系统 SHALL 确保所有过渡动画都有正确的定义

#### Scenario: 动画效果
- **WHEN** 用户悬停在应用图标上
- **THEN** 窗口预览应平滑淡入，无闪烁或跳变

## MODIFIED Requirements

### Requirement: CSS 类名管理
**原需求**: 使用类似 Tailwind 的类名

**修改后**: 
- 所有 CSS 类名必须在组件的 `<style lang="less">` 中明确定义
- 使用 Less 变量和混入（mixins）来保持样式一致性
- 遵循 Material 3 设计规范

## REMOVED Requirements

### Requirement: Tailwind CSS 依赖
**Reason**: 项目不使用 Tailwind CSS，所有样式都是手动定义的 Less
**Migration**: 无需迁移，当前实现已经是纯 Less
