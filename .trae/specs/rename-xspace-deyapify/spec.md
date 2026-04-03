# XSpace 去 XSpace 化与重命名 Spec

## Why

当前项目在命名、界面文案、入口与接口命名等方面强绑定 “XSpace”。为推进产品品牌升级与后续能力扩展，需要将项目整体重命名为 “XSpace”，并在用户可见与工程实现层面去除 “XSpace” 痕迹。

## 执行方式（重要）

- 本次迁移优先采用 Node.js 脚本完成批量替换、文件重命名与校验，尽量减少手工改动带来的遗漏与不一致。
- 所有“会修改工作区”的脚本执行，均需要你明确确认后才会运行；在你确认前，仅提供脚本与“dry-run 预览”输出（不落盘修改）。
- 脚本设计目标：可审计（输出变更清单）、可控（白名单/黑名单路径）、可回滚（依赖 Git 变更集）、可复验（检索/用例回归）。

## What Changes

- 前端 UI 去品牌化：页面标题、菜单、登录/项目/接口等页面的展示文案、对话框标题、提示语、空状态文案中不再出现 “XSpace/xspace”。
- 入口与路由命名调整：新增/调整面向用户的入口与路由命名为 XSpace（例如入口页面、路由前缀、导航标题等），并处理旧入口兼容策略（见 **BREAKING**）。
- 前端 API 命名空间调整：将 `_api.xspace.*` 的调用迁移为 `_api.xspace.*`（或等价的新命名空间），并同步调整相关封装与引用链路。**BREAKING**（若不保留兼容别名）。
- 存储/配置命名调整：将 LocalStorage、Cookie、全局变量、事件名等与 `xspace` 相关的 key 前缀替换为 `xspace`，避免新旧冲突。**BREAKING**（可能导致用户本地状态重置）。
- 静态资源与品牌资产替换：替换 logo、favicon、应用名展示位置（如 header/侧边栏）为 XSpace 资产。
- 文档与开发说明同步：更新仓库内的 README/规则文档中涉及的项目命名（仅涉及项目自有文档，不修改第三方依赖版权信息）。

## Impact

- Affected specs: 品牌展示一致性｜入口与路由可达性｜API 调用命名空间｜本地持久化兼容策略
- Affected code: 前端入口 HTML/seed 加载｜前端路由与菜单渲染｜`@/utils/api.vue`（或等价 API 封装）｜全局变量/本地存储工具｜静态资源引用

## ADDED Requirements

### Requirement: XSpace 品牌展示

系统 SHALL 在所有用户可见的页面与交互文案中使用 “XSpace” 品牌，并避免出现 “XSpace/xspace” 字样（允许出现在历史兼容代码注释、第三方库版权信息、或后端接口路径中，前提是用户不可见）。

#### Scenario: 首屏展示（Success）

- **WHEN** 用户打开应用入口页面
- **THEN** 浏览器标题、页面 header/侧边栏标题、菜单与关键页面标题显示为 “XSpace”
- **AND** 首屏可见区域不出现 “XSpace/xspace”

#### Scenario: 关键交互（Success）

- **WHEN** 用户进行常见操作（登录、切换项目、查看接口、保存编辑、上传文件）
- **THEN** 弹窗标题、Toast、空状态文案不出现 “XSpace/xspace”

### Requirement: 命名空间与持久化一致性

系统 SHALL 将前端 API 命名空间与本地持久化 key 前缀统一迁移为 `xspace`，并提供可配置的兼容策略以控制是否允许旧命名继续工作。

#### Scenario: 仅新命名生效（Success）

- **WHEN** 兼容策略设置为“严格去 xspace”（默认）
- **THEN** 代码中不再引用 `_api.xspace.*` 与 `xspace` 前缀的本地 key
- **AND** 新功能仅使用 `xspace` 前缀

#### Scenario: 兼容模式（可选 Success）

- **WHEN** 兼容策略设置为“保留别名”
- **THEN** `_api.xspace` 仍可作为 `_api.xspace` 的别名工作
- **AND** 本地持久化读取可尝试从旧 key 迁移到新 key（一次性迁移）

### Requirement: 脚本化迁移与安全护栏

系统 SHALL 提供可重复执行的 Node.js 迁移脚本，并满足以下约束：

- 默认仅 dry-run（不修改文件）；需要显式传入 `--apply`（或等价开关）才允许写入。
- 输出“将要修改的文件列表、每个文件的命中次数、替换前后摘要（可截断）”。
- 提供路径过滤：支持 `--include`/`--exclude`（或内置默认排除）避免误改第三方库与构建产物。
- 默认排除（至少）：`.git/`、`node_modules/`、`static/common/`（第三方/共享库区域）、构建产物目录（若存在）。

#### Scenario: Dry-run 预览（Success）

- **WHEN** 以默认参数运行迁移脚本
- **THEN** 不写入任何文件
- **AND** 输出完整变更清单与统计

#### Scenario: 需要确认后才落盘（Success）

- **WHEN** 你确认可以执行并选择 `--apply`
- **THEN** 脚本才会执行写入修改
- **AND** 所有修改均可通过 Git diff 审查

## MODIFIED Requirements

### Requirement: 应用入口与路由可达性

系统 SHALL 提供以 XSpace 命名的入口与路由，并明确旧入口的处理方式：

- 若选择严格去 xspace：旧入口/旧路由返回 404 或跳转至新入口。**BREAKING**
- 若选择兼容模式：旧入口/旧路由跳转至新入口，且不展示旧品牌文案。

## REMOVED Requirements

### Requirement: XSpace 品牌与命名暴露

**Reason**: 产品重命名为 XSpace，需要去除对外展示与工程实现中与 “XSpace” 绑定的命名与呈现。
**Migration**:

- 前端：统一替换用户可见文案与品牌资产；API 命名空间迁移为 `_api.xspace`；本地存储 key 前缀迁移为 `xspace`。
- 后端/外部：若存在外部依赖旧接口路径或旧入口 URL，可启用兼容模式并提供跳转/别名，后续再下线。

