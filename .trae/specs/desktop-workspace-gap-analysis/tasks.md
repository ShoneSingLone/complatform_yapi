# Tasks

- [x] Task 1: 优化状态管理 - 使用 Vue 响应式 API 替代 watch + $forceUpdate
  - [x] SubTask 1.1: 在 SystemStore.vue 中使用 Vue.observable 创建响应式状态
  - [x] SubTask 1.2: 移除 DesktopWorkspace.vue 中的 watch 和 $forceUpdate
  - [x] SubTask 1.3: 测试状态更新是否正确触发 UI 刷新

- [x] Task 2: 改进 Dock 栏指示器样式
  - [x] SubTask 2.1: 参考参考项目，将圆点指示器改为胶囊状
  - [x] SubTask 2.2: 调整指示器动画效果
  - [x] SubTask 2.3: 测试不同状态下的显示效果

- [ ] Task 3: 优化窗口拖拽实现
  - [ ] SubTask 3.1: 提取拖拽公共逻辑到工具函数
  - [ ] SubTask 3.2: 添加拖拽边界检测
  - [ ] SubTask 3.3: 优化拖拽性能

- [ ] SubTask 3.4: 测试拖拽功能的稳定性

- [ ] Task 4: 统一代码规范和命名
  - [ ] SubTask 4.1: 采用 BEM 命名规范重构组件类名
  - [ ] SubTask 4.2: 提取公共样式变量到独立文件
  - [ ] SubTask 4.3: 统一图标使用方式

- [ ] Task 5: 增强类型提示
  - [ ] SubTask 5.1: 添加 JSDoc 类型注解
  - [ ] SubTask 5.2: 创建类型定义文件
  - [ ] SubTask 5.3: 在关键函数和组件中添加类型检查

# Task Dependencies
- Task 2 取决于 Task 1（状态管理优化后，样式改进才能正确生效）
- Task 3 取决于 Task 1（状态管理是拖拽功能的基础）
- Task 4 取决于 Task 1 和 Task 2（在稳定的状态下进行代码重构）
- Task 5 可以在任何时候并行进行
