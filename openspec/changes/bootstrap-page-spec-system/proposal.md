## Why

当前管理端 PC 和教师手机端页面已经完成了较多零散实现，但长期规格仍缺失，导致后续 AI / 开发助手只能依赖源码、效果图和临时交接文档判断页面边界。现在需要先建立一套可校验、可同步、可按模块扩展的 OpenSpec 主规格体系，把当前已实现页面中的稳定事实沉淀为后续开发和验收参考。

## What Changes

- 新增项目级工程边界规格，明确 `frontend/` 与 `teacher-mobile/` 的职责边界、mock-only 表达原则和不可空点击规则。
- 新增管理端页面通用契约，约束路由入口、布局复用、列表 / 详情 / 状态操作闭环和视觉态说明。
- 新增教师手机端页面通用契约，约束 `pages.json` 注册、移动端组件边界、安全区、TabBar、mock 反馈和不可静默操作。
- 以管理端培训管理模块作为 PC 侧首批样板，把资源、需求、计划、申请、记录和详情页的当前实现整理为规格。
- 以教师手机端我的 / 个人发展模块作为移动端首批样板，把我的首页、能力画像、画像记录、发展报告、目标岗位和聘期要求对照页的当前实现整理为规格。

## Capabilities

### New Capabilities

- `platform-boundary`: 定义管理端 PC、教师手机端、mock-only 行为和文档事实来源的项目级边界。
- `admin-page-contract`: 定义管理端页面的通用路由、布局、交互闭环、视觉态和验收契约。
- `mobile-page-contract`: 定义教师手机端页面的通用注册、组件、安全区、TabBar、mock 反馈和验收契约。
- `admin-training`: 定义管理端培训管理模块当前页面、mock 状态和本地业务闭环。
- `mobile-profile`: 定义教师手机端我的 / 个人发展模块当前页面、入口跳转和本地模拟闭环。

### Modified Capabilities

- 无。当前 `openspec/specs/` 尚未建立主规格，本 change 只新增第一批能力规格。

## Impact

- 新增 OpenSpec change 文档和 delta specs，后续通过 `openspec-sync-specs` 同步到 `openspec/specs/**/spec.md`。
- 本 change 不修改 `frontend/` 或 `teacher-mobile/` 页面代码。
- 规格事实来源包括 `frontend/src/router/admin.routes.ts`、`frontend/src/pages/admin/training/**`、`frontend/src/stores/admin/training/**`、`teacher-mobile/src/pages.json`、`teacher-mobile/src/pages/profile/**`、`frontend/docs/admin-design-system-guide.md` 和 `teacher-mobile/docs/mobile-design-system-guide.md`。
