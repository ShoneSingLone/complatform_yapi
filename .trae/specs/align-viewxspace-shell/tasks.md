# Tasks

- [x] Task 1: 梳理 `ViewXspace` 当前样式与预期稿的视觉差异，不改动现有页面骨架
  - [x] SubTask 1.1: 标记背景、顶部栏、桌面图标、Dock、窗口容器的样式偏差
  - [x] SubTask 1.2: 明确哪些属于纯样式问题，哪些只允许做轻量模板微调

- [x] Task 2: 重构 `ViewXspace.vue` 的桌面背景和整体留白
  - [x] SubTask 2.1: 将当前单色背景改为接近预期稿的渐变与光晕背景
  - [x] SubTask 2.2: 弱化背景 Logo 或调整其存在方式，避免干扰主窗口
  - [x] SubTask 2.3: 调整桌面区 padding、图标区位置和底部 Dock 安全区间距

- [x] Task 3: 调整 `TopBar.vue` 为系统状态栏风格
  - [x] SubTask 3.1: 将顶部栏内容密度从“业务工具栏”收敛为“系统状态栏”
  - [x] SubTask 3.2: 调整透明度、字体、图标尺寸、左右区域间距和对齐方式
  - [x] SubTask 3.3: 保证用户信息和时间显示符合预期稿层级

- [x] Task 4: 调整 `DesktopIcon.vue` 与 `Dock.vue` 的桌面控件外观
  - [x] SubTask 4.1: 调整桌面图标为靠左的启动器式视觉，优化按钮底色、圆角、标签和 hover 态
  - [x] SubTask 4.2: 弱化桌面图标上的移除操作暴露度，避免破坏预期稿观感
  - [x] SubTask 4.3: 将 Dock 调整为少量核心控件的浮动按钮组，优化底板、激活态和间距

- [x] Task 5: 调整 `WindowModal.vue` 的窗口材质与内部控件风格
  - [x] SubTask 5.1: 重做窗口圆角、阴影、边框和背景材质，使其接近预期稿的大卡片窗口
  - [x] SubTask 5.2: 调整标题栏、搜索框、切换按钮和空态区的尺寸与留白
  - [x] SubTask 5.3: 保持窗口功能逻辑不变，仅修改视觉层和必要的轻量模板结构

- [x] Task 6: 验证样式是否对齐预期稿
  - [x] SubTask 6.1: 检查主窗口是否成为视觉中心
  - [x] SubTask 6.2: 检查背景、顶部栏、左侧图标和底部 Dock 是否形成统一桌面氛围
  - [x] SubTask 6.3: 检查样式命名、Less 结构和现有组件功能是否未被破坏

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Task 1
- Task 5 depends on Task 1
- Task 6 depends on Task 2, Task 3, Task 4, and Task 5
