# MEMORY.md

## 项目信息

- **项目名称**：yapi-vendor（基于 YApi 的接口管理平台）
- **项目位置**：d:\Users\SSL\Documents\GitHub\yapi
- **Node 版本**：>= 16（使用 Volta 管理，配置为 24.12.0）
- **包管理器**：pnpm

## 项目核心功能（共 14 大模块，详细说明见 README.md）

1. **接口管理**：基础 CRUD、分类组织、参数管理（Query/Body/Headers/Path）、状态机（undone→done→open→closed→deleted）、标签系统、编辑冲突处理、Swagger 同步
2. **Mock 服务**：动态 Mock（json-schema-faker）、高级 Mock 脚本、条件匹配、IP 过滤、延迟设置、Mock 用例
3. **项目管理**：多环境配置、全局变量、Pre/After 脚本、成员权限（owner/maintainer/developer/guest）、Token 管理
4. **用户权限系统**：JWT 认证、邮箱验证码、角色层级（超管/组长/项目所有者/普通用户）、权限控制点
5. **分组管理**：多级分组、个人分组（private）、成员管理、分组排序
6. **测试集与自动化测试**：接口集、测试用例管理、自动化执行、HTML/JSON 报告、邮件通知
7. **数据导入导出**：4 个导入插件（Postman/Swagger/HAR/YApi JSON）、3 个导出插件（Markdown/JSON/HTML/Swagger 2.0/服务代码）
8. **CI/CD 持续集成**：Git 仓库关联、Webhook 管理、任务队列、自动化测试任务
9. **Wiki 文档系统**：多级文档目录、四级权限（private/group/project/all）、版本历史、Diff 对比
10. **资源管理**：分片上传、断点续传、云盘、媒体流（音视频 Range 请求）
11. **通知与动态**：操作日志、邮件通知、SSE/WebSocket 实时推送
12. **搜索功能**：全文搜索（项目/分组/接口/用户）、关键字高亮、分类筛选
13. **系统管理**：SSE 实时通信、插件管理、系统配置
14. **DocFlow 文档流**：块级编辑器、实时协作（Yjs CRDT）、AI 辅助编辑、版本历史
15. **代理服务**：请求转发、CORS 支持、WebSocket 代理

## 技术栈

- **前端**：Vue 2.x + 原生 JS（兼容 TS 语法）
- **后端**：Node.js + Koa + MongoDB/Mongoose + TypeScript
- **编辑器**：Tiptap/ProseMirror（DocFlow）、Toast UI Editor
- **协作**：Yjs CRDT + Hocuspocus WebSocket
- **部署**：Docker 支持

## 重要配置

- 使用 `yapi_configs.js`（项目根目录外）配置敏感信息
- 配置文件包含：数据库连接、邮件服务、代理配置等

## 开发习惯

- 使用 pnpm 管理依赖（禁止使用 npm 或 yarn）
- 启动命令：`pnpm start`
- 重部署命令：`pnpm redeploy`
