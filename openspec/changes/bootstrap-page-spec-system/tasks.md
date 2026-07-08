## 1. 事实盘点

- [x] 1.1 核对 `frontend/src/router/admin.routes.ts` 中培训管理路由，确认资源库、需求管理、计划管理、申请处理、记录总览和详情页均已注册。
- [x] 1.2 核对 `frontend/src/pages/admin/training/**` 与 `frontend/src/stores/admin/training/**`，确认培训模块使用本地 mock 状态支撑筛选、摘要切换、计划创建、申请审批和证书补充。
- [x] 1.3 核对 `teacher-mobile/src/pages.json` 中我的 / 个人发展页面注册，确认 profile 首页、能力画像、画像记录、发展报告、目标岗位和聘期要求页面均已注册。
- [x] 1.4 核对 `teacher-mobile/src/pages/profile/**`，确认移动端入口跳转、返回操作、档案详情跳转和 mock-only 降级提示均来自当前页面源码。

## 2. 规格编写

- [x] 2.1 编写 `platform-boundary` delta spec，覆盖工程职责边界、事实来源、mock-only 操作表达和分批扩展规则。
- [x] 2.2 编写 `admin-page-contract` delta spec，覆盖管理端路由、布局、页面闭环、视觉组件和视觉态限制。
- [x] 2.3 编写 `mobile-page-contract` delta spec，覆盖手机端页面注册、组件安全区、交互反馈和视觉验收规则。
- [x] 2.4 编写 `admin-training` delta spec，覆盖培训管理当前路由、资源库、需求、计划、计划详情、申请、记录和记录详情。
- [x] 2.5 编写 `mobile-profile` delta spec，覆盖我的首页、能力画像、画像引用记录、发展报告、目标岗位和聘期要求。

## 3. 校验与同步

- [x] 3.1 运行 `openspec validate bootstrap-page-spec-system`，确认 change 下 proposal、design、tasks 和 specs 格式有效。
- [x] 3.2 若校验失败，修正对应 OpenSpec 标题、Requirement、Scenario 或任务 checkbox 格式后重新校验。
- [x] 3.3 校验通过后，使用 `openspec-sync-specs` 将 delta specs 同步到 `openspec/specs/**/spec.md`。
- [x] 3.4 同步后核对 `openspec/specs/platform-boundary/spec.md`、`openspec/specs/admin-page-contract/spec.md`、`openspec/specs/mobile-page-contract/spec.md`、`openspec/specs/admin-training/spec.md` 和 `openspec/specs/mobile-profile/spec.md` 均存在且内容为中文规格。
