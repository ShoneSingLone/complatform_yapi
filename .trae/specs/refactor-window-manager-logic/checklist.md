# 检查清单

- [ ] `windowManager.vue` 不包含 HTML 模板或 CSS 样式。
- [ ] `windowManager.vue` 不包含对 UI 组件的引用（使用 `componentId` 代替）。
- [ ] 窗口状态管理（打开、关闭、聚焦等）与 DOM 操作完全解耦。
- [ ] 使用事件或回调机制进行管理器与 UI 之间的通信。
- [ ] `WindowContainer.vue` 正确地将 `componentId` 映射到 Vue 组件。
- [ ] 存在新的项目规则，防止在逻辑模块中出现 UI 代码。
- [ ] `windowManager.test.vue` 中的单元测试通过并验证了逻辑完整性。
- [ ] 重构后，所有窗口生命周期操作（最小化、最大化、恢复）均能正常工作。
