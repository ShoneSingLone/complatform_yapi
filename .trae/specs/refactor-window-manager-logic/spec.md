# WindowManager 逻辑重构规格说明书

## 为什么
目前 `windowManager` 模块与 UI 层存在一定的耦合，例如在窗口状态中直接存储 Vue 组件引用，并在逻辑模块内依赖 Vue 的全局响应式系统。这使得代码难以测试、维护，且不利于复用。重构的目标是将其转变为一个纯业务逻辑模块，通过定义的接口和事件与 UI 层通信。

## 改动内容
- **组件解耦**：将窗口状态中的直接 Vue 组件引用替换为 `componentId` 字符串。UI 层将负责将这些 ID 映射到实际组件。
- **逻辑分离**：确保 `windowManager.vue` 不包含任何 UI 相关代码（无 HTML、CSS 或 UI 组件导入）。
- **事件系统**：在管理器内部实现简单的事件机制，以通知 UI 层窗口状态的变化（如聚焦、关闭、更新）。
- **接口定义**：为 UI 层定义清晰的 API 以与管理器交互。
- **代码规范**：添加项目规则，防止未来在逻辑模块中加入 UI 代码。

## 影响范围
- **受影响代码**：
    - [windowManager.vue](file:///home/shone/Documents/workspace/xspace/static/business_xspace/utils/windowManager.vue)：内部逻辑和状态结构的全面重构。
    - [WindowContainer.vue](file:///home/shone/Documents/workspace/xspace/static/business_xspace/views/v1/components/WindowContainer.vue)：更新以将 `componentId` 映射到组件，并使用新的管理器 API。
    - [ViewXspace.vue](file:///home/shone/Documents/workspace/xspace/static/business_xspace/views/v1/ViewXspace.vue)：更新窗口打开逻辑和组件映射。
    - [windowManager.test.vue](file:///home/shone/Documents/workspace/xspace/static/business_xspace/utils/windowManager.test.vue)：更新测试以反映新的纯逻辑结构。

## 新增需求
### 需求：纯逻辑模块
`windowManager` 不得包含任何 HTML、CSS 或对 UI 组件的引用。

#### 场景：打开窗口
- **当** UI 调用 `windowManager.open` 并传入 `componentId` 时
- **那么** 管理器在其状态中添加一个带有该 ID 的窗口条目
- **并** 通知所有订阅者该变化

### 需求：基于事件的通信
`windowManager` 应提供一种机制供 UI 层订阅状态变化。

#### 场景：窗口聚焦
- **当** 通过管理器聚焦一个窗口时
- **那么** 管理器更新其内部状态
- **并** 向订阅者发送 'focus' 事件

## 修改需求
### 需求：窗口状态结构
窗口状态对象应使用 `componentId` 而非 `component`。
- **原因**：解耦业务逻辑与渲染逻辑。
- **迁移**：更新所有 `open` 调用以传递 `componentId`。更新 `WindowContainer.vue` 以通过注册表解析组件。
