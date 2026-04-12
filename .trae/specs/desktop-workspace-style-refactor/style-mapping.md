# 桌面工作空间样式映射文档

## 1. 项目样式系统分析

### 1.1 xspace.defaul.style.vue（项目专有样式）

**位置**: `/home/shone/Documents/workspace/xspace/static/business_xspace/xspace.defaul.style.vue`

**定义的样式类别**:

#### 1.1.1 CSS 变量（:root）
- **颜色变量**: 
  - `--color-white`, `--color-primary`, `--color-on-primary`
  - `--color-primary-container`, `--color-on-primary-container`
  - `--color-secondary`, `--color-on-secondary`, `--color-secondary-container`
  - `--color-tertiary`, `--color-on-tertiary`, `--color-tertiary-container`
  - `--color-error`, `--color-on-error`, `--color-error-container`
  - `--color-background`, `--color-on-background`
  - `--color-surface`, `--color-on-surface`, `--color-surface-variant`
  - `--color-on-surface-variant`, `--color-outline`, `--color-outline-variant`
  - `--color-surface-container-*` (lowest, low, container, high, highest)
  - 等等 Material 3 颜色系统

- **字体变量**:
  - `--font-sans`: "Inter", ui-sans-serif, system-ui, sans-serif
  - `--font-mono`: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace

#### 1.1.2 基础样式重置
- `*`: margin, padding, box-sizing
- `body`: font-family, background-color, color, line-height

#### 1.1.3 工具类
- **滚动条**: `.no-scrollbar`
- **阴影**: `.elevation-1` 到 `.elevation-5`
- **圆角**: `.rounded-m3-small`, `.rounded-m3-medium`, `.rounded-m3-large`, `.rounded-m3-extra-large`

#### 1.1.4 组件样式
- **按钮**: `.m3-button-primary` (含 hover, active 状态)
- **卡片**: `.m3-card`
- **侧边栏**: `.x-sider_wrapper`, `.x-sider_wrapper_tree`
- **树形项**: `.asideTreeItem` (含 `.node-name`, `.node-icon-current` 等)

### 1.2 theme.default.vue（项目通用样式）

**位置**: `/home/shone/Documents/workspace/xspace/static/common/ui-x/theme/theme.default.vue`

**定义的样式类别**:

#### 1.2.1 间距工具类（Less 循环生成）
- **padding**: `.padding5`, `.padding10`, `.padding15`, `.padding20`, `.padding4`, `.padding8` 等
- **margin**: `.margin5`, `.margin10`, `.margin15` 等
- **flex**: `.flex1` 到 `.flex5`

#### 1.2.2 方向性间距（Less 循环生成）
- **margin-top/right/bottom/left**: `.mt0`, `.mr0`, `.mb0`, `.ml0`, `.mt4`, `.mr4` 等
- **padding-top/right/bottom/left**: `.pt0`, `.pr0`, `.pb0`, `.pl0` 等
- **重要级别**: `.mt8-important`, `.p8-important` 等

#### 1.2.3 项目间距变量
- `.x-margin`, `.x-margin-important`
- `.x-padding`, `.x-padding-important`
- `.mt`, `.mr`, `.mb`, `.ml` (使用 `var(--ui-one)`)

#### 1.2.4 Flex 布局工具类
- `.flex`: display: flex
  - `.inline`: display: inline-flex
  - `.like-float`: flex-flow: row wrap
  - `.vertical`: flex-flow: column nowrap
  - `.horizon`: flex-flow: row nowrap
  - `.between`: justify-content: space-between
  - `.start`: justify-content: flex-start
  - `.end`: justify-content: flex-end
  - `.center`: justify-content: center
  - `.middle`: align-items: center
  - `.top`: align-items: flex-start
  - `.baseline`: align-items: baseline

#### 1.2.5 其他工具类
- **显示**: `.inline-block`, `.display-none`, `.display-block`
- **溢出**: `.overflow-visible`, `.overflow-hidden`, `.overflow-auto`
- **文本对齐**: `.text-align-center`, `.text-align-left`, `.text-align-right`
- **光标**: `.cursor`, `.pointer`
- **透明度**: `.opacity0`
- **过渡**: `.use-transform`
- **省略**: `.ellipsis`, `.ellipsis-no-title`
- **网格**: `.grid.col1` 到 `.grid.col5`, `.grid.col11`, `.grid.col12` 等
- **过渡动画**: `.fade`, `.fade-short`, `.slide-fade`, `.slide`, `.scale`, `.rotate`, `.slide-up-down`

#### 1.2.6 滚动条美化
- `body.x-app-body` 中的 `::-webkit-scrollbar` 样式

## 2. 组件重复样式分析

### 2.1 Dock.vue 重复定义的样式

**当前重复定义**（在 Dock.vue 的 `<style lang="less">` 中）:

| 重复的样式 | 项目已有样式 | 建议 |
|-----------|-------------|------|
| `.flex` | `theme.default.vue` | ✅ 复用 |
| `.items-center` | `theme.default.vue` (`.flex.middle`) | ✅ 复用 |
| `.gap-2` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.p-2` | `theme.default.vue` (`.padding8`) | ✅ 复用 |
| `.bg-surface-container` | `xspace.defaul.style.vue` (变量) | ✅ 复用变量 |
| `.elevation-2` | `xspace.defaul.style.vue` | ✅ 复用 |
| `.rounded-m3-medium` | `xspace.defaul.style.vue` | ✅ 复用 |
| `.relative` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.transition-all` | `theme.default.vue` | ✅ 复用 |
| `.duration-300` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.absolute` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.-top-10` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.left-1/2` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.-translate-x-1/2` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.text-xs` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.font-medium` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.opacity-0` | `theme.default.vue` (`.opacity0`) | ✅ 复用 |
| `.pointer-events-none` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.whitespace-nowrap` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.w-full` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.h-full` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.justify-center` | `theme.default.vue` (`.flex.center`) | ✅ 复用 |
| `.text-on-surface` | `xspace.defaul.style.vue` (变量) | ✅ 复用变量 |
| `.z-[100]` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.min-w-[180px]` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.border-b` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.rounded-full` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.flex-col` | `theme.default.vue` (`.flex.vertical`) | ✅ 复用 |
| `.max-h-[250px]` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.overflow-y-auto` | `theme.default.vue` (`.overflow-auto`) | ✅ 复用 |
| `.cursor-pointer` | `theme.default.vue` (`.cursor`) | ✅ 复用 |
| `.truncate` | `theme.default.vue` (`.ellipsis`) | ✅ 复用 |
| `.animate-dock-scale` | 组件特有动画 | ⚠️ 保留组件特有 |

### 2.2 TopBar.vue 重复定义的样式

**当前重复定义**（在 TopBar.vue 的 `<style lang="less">` 中）:

| 重复的样式 | 项目已有样式 | 建议 |
|-----------|-------------|------|
| `.h-8` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.bg-surface-container-highest/80` | `xspace.defaul.style.vue` (变量) | ✅ 复用变量 |
| `.backdrop-blur-md` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.flex` | `theme.default.vue` | ✅ 复用 |
| `.items-center` | `theme.default.vue` (`.flex.middle`) | ✅ 复用 |
| `.justify-between` | `theme.default.vue` (`.flex.between`) | ✅ 复用 |
| `.px-4` | `theme.default.vue` (`.padding16`) | ✅ 复用 |
| `.text-xs` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.font-medium` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.font-bold` | 需创建语义化样式 | ⚠️ 创建组件语义化 |
| `.text-on-surface` | `xspace.defaul.style.vue` (变量) | ✅ 复用变量 |
| `.text-on-surface-variant` | `xspace.defaul.style.vue` (变量) | ✅ 复用变量 |

## 3. 样式复用策略

### 3.1 应该复用的项目样式

#### 从 xspace.defaul.style.vue 复用：
- ✅ **所有 CSS 变量**: 直接使用 `var(--color-*)`
- ✅ **elevation 类**: `.elevation-1` 到 `.elevation-5`
- ✅ **圆角类**: `.rounded-m3-small`, `.rounded-m3-medium`, `.rounded-m3-large`
- ✅ **基础组件样式**: `.m3-button-primary`, `.m3-card`

#### 从 theme.default.vue 复用：
- ✅ **flex 布局类**: `.flex`, `.flex.middle`, `.flex.between`, `.flex.vertical` 等
- ✅ **间距类**: `.padding8`, `.margin8`, `.p8`, `.m8` 等
- ✅ **显示类**: `.display-none`, `.display-block`, `.overflow-auto`
- ✅ **光标类**: `.cursor`, `.pointer`
- ✅ **过渡动画类**: `.fade`, `.slide`, `.scale` 等
- ✅ **省略类**: `.ellipsis`

### 3.2 需要创建组件语义化的样式

#### Dock 组件特有样式（使用 BEM 命名）：
- `dock` - Dock 容器
- `dock__item` - Dock 项
- `dock__item--active` - 激活状态
- `dock__item--pinned` - 已固定状态
- `dock__item-wrapper` - 项容器
- `dock__preview` - 窗口预览面板
- `dock__preview-header` - 预览面板头部
- `dock__preview-item` - 预览项
- `dock__indicator` - 状态指示器
- `dock__tooltip` - 工具提示
- `dock__launcher` - 启动器按钮
- `dock__separator` - 分隔线
- `dock__settings` - 设置按钮

#### TopBar 组件特有样式（使用 BEM 命名）：
- `top-bar` - 顶部栏容器
- `top-bar__title` - 标题
- `top-bar__search` - 搜索框
- `top-bar__time` - 时间显示
- `top-bar__icons` - 图标组

### 3.3 实现策略

1. **保留项目通用样式**：
   - 继续使用 `theme.default.vue` 中的工具类
   - 继续使用 `xspace.defaul.style.vue` 中的变量和基础样式

2. **移除组件中重复定义**：
   - 删除 Dock.vue 和 TopBar.vue 中重复定义的 `.flex`, `.elevation-2` 等
   - 删除所有原子化 CSS 类名定义（如 `.items-center`, `.gap-2`）

3. **创建组件语义化样式**：
   - 为每个组件创建 BEM 命名的语义化类名
   - 在组件 `<style lang="less">` 中定义
   - 使用 Less 嵌套语法提高可读性

4. **模板中使用混合类名**：
   ```vue
   <!-- 示例 -->
   <div class="dock flex middle">
     <div class="dock__item dock__item--active">
       <!-- 内容 -->
     </div>
   </div>
   ```

## 4. 实施步骤

1. **任务 0**: ✅ 完成样式分析（本文档）
2. **任务 1**: 重构 Dock 组件
   - 创建 BEM 语义化类名
   - 移除重复定义
   - 复用项目样式
3. **任务 2**: 重构 TopBar 组件
4. **任务 3**: 重构 DesktopIcon 组件
5. **任务 4**: 重构 WindowModal 组件
6. **任务 5**: 重构 AuthScreen 组件
7. **任务 6**: 重构 ApiManager 组件
8. **任务 7**: 重构 ViewXspace 主视图
9. **任务 8**: 清理和优化
10. **任务 9**: 集成测试

## 5. 注意事项

1. **保持功能不变**：样式重构不应影响组件功能
2. **渐进式重构**：逐个组件重构，确保每个组件测试通过
3. **视觉一致性**：确保重构后视觉效果与原来一致
4. **性能优化**：减少重复定义，减小样式文件大小
5. **代码规范**：遵循项目 BEM 命名约定
