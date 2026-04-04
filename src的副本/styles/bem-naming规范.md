# BEM命名规范

## 1. 基本概念

BEM（Block, Element, Modifier）是一种CSS命名方法论，通过三层结构提供清晰的命名规范：

- **Block（块）**：独立的、可复用的组件，如 `.app`、`.dock`、`.top-bar`
- **Element（元素）**：块的组成部分，如 `.app__desktop`、`.dock__item`、`.top-bar__clock`
- **Modifier（修饰符）**：块或元素的状态或变体，如 `.dock__item--active`、`.window--maximized`

## 2. 命名规则

### 2.1 块（Block）
- 使用小写字母和连字符（kebab-case）
- 命名应具有描述性，反映组件的功能
- 示例：`.app`、`.dock`、`.top-bar`、`.window`

### 2.2 元素（Element）
- 使用双下划线（__）连接块名和元素名
- 元素名应描述其在块中的功能
- 示例：`.app__desktop`、`.dock__item`、`.window__title-bar`

### 2.3 修饰符（Modifier）
- 使用双连字符（--）连接块名或元素名与修饰符
- 修饰符应描述状态或变体
- 示例：`.dock__item--active`、`.window--maximized`、`.auth-screen--loading`

## 3. 嵌套规则

使用Less的嵌套语法来组织BEM结构，提高代码可读性：

```less
.app {
  // 块的样式
  
  &__desktop {
    // 元素的样式
    
    &__icons {
      // 子元素的样式
    }
  }
  
  &__window {
    // 窗口元素的样式
    
    &--maximized {
      // 最大化状态的样式
    }
  }
}
```

## 4. 根样式类

每个Vue组件的根元素必须有一个独一无二的样式类，命名规则为：

- 使用组件名的kebab-case形式
- 作为块名使用
- 示例：
  - App.vue -> `.app`
  - Dock.vue -> `.dock`
  - TopBar.vue -> `.top-bar`
  - Window.vue -> `.window`
  - DesktopIcon.vue -> `.desktop-icon`
  - AuthScreen.vue -> `.auth-screen`

## 5. 样式文件结构

- **统一样式文件**：`src/styles/bem-global.less` - 包含所有组件的BEM类名定义
- **组件样式文件**：每个组件对应一个Less文件，存放在 `src/styles/components/` 目录下

## 6. 示例

### 6.1 App组件

```less
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-background);
  color: var(--text-on-background);
  user-select: none;
  display: flex;
  flex-direction: column;
  
  &__top-bar {
    z-index: 100;
  }
  
  &__desktop {
    flex: 1;
    position: relative;
    overflow: hidden;
    
    &__background {
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: 0.03;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    &__icons {
      position: absolute;
      inset: 0;
      padding: 40px;
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
      grid-template-rows: repeat(auto-fill, 110px);
      gap: 16px;
      z-index: 10;
      content-visibility: auto;
      pointer-events: auto;
    }
    
    &__windows {
      position: absolute;
      inset: 0;
      z-index: 20;
      pointer-events: none;
    }
    
    &__dock {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      pointer-events: auto;
    }
  }
}
```

### 6.2 Dock组件

```less
.dock {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px;
  background-color: var(--bg-surface-container);
  box-shadow: var(--elevation-3);
  border-radius: 9999px;
  position: relative;
  transition: all 300ms ease;
  
  &--dragging-over {
    box-shadow: 0 0 0 2px var(--color-primary/50);
    background-color: var(--bg-surface-container-high);
  }
  
  &__item {
    position: relative;
    
    &__tooltip {
      position: absolute;
      top: -48px;
      left: 50%;
      transform: translateX(-50%);
      padding: 4px 12px;
      background-color: var(--bg-surface-variant);
      color: var(--text-on-surface-variant);
      font-size: 12px;
      font-weight: 500;
      border-radius: var(--radius-m3-extra-small);
      opacity: 0;
      transition: opacity 200ms ease;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: var(--elevation-1);
      
      .dock__item:hover & {
        opacity: 1;
      }
    }
    
    &__icon {
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease;
      color: var(--text-on-surface);
      
      &:hover {
        background-color: var(--text-on-surface/8);
      }
      
      &:active {
        background-color: var(--text-on-surface/12);
      }
    }
    
    &__indicator {
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 4px;
      
      &__dot {
        height: 4px;
        border-radius: 9999px;
        transition: all 300ms ease;
        
        &--active {
          width: 16px;
          background-color: var(--color-primary);
        }
        
        &--inactive {
          width: 6px;
          background-color: var(--text-on-surface-variant);
        }
      }
    }
  }
  
  &__divider {
    width: 1px;
    height: 32px;
    background-color: var(--color-outline-variant);
    margin: 0 4px;
    align-self: center;
  }
}
```

## 7. 最佳实践

1. **保持简洁**：命名应简洁明了，避免过长的类名
2. **一致性**：在整个项目中保持BEM命名的一致性
3. **可读性**：使用描述性的名称，使代码易于理解
4. **可扩展性**：设计BEM结构时考虑未来的扩展需求
5. **避免嵌套过深**：尽量保持BEM结构的扁平化，避免过多的嵌套层级

## 8. 注意事项

1. 不要在元素名中使用块名的缩写
2. 不要在修饰符中包含元素名
3. 不要使用BEM命名来表示DOM结构的层级关系，而应该表示功能关系
4. 对于复杂的组件，可以考虑将其拆分为多个块
5. 始终使用Less的嵌套语法来组织BEM结构，提高代码可读性