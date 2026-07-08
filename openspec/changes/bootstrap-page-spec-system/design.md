## Context

当前仓库包含两个前端工程：`frontend/` 是管理端 PC，`teacher-mobile/` 是教师手机端。两个工程已经有大量页面、mock 数据和本地状态流转，但 OpenSpec 主规格尚未建立，当前 `openspec/specs/` 为空。

本 change 采用“从当前实现反推规格”的方式，不重新设计业务流程，不一次性覆盖全部页面。第一批只选择管理端培训管理模块和教师手机端我的 / 个人发展模块，原因是两者规模适中，且分别覆盖 PC 列表 / 详情 / 本地状态流转与移动端入口 / 详情 / mock-only 反馈。

事实来源限定为当前源码和设计系统文档：

- `frontend/src/router/admin.routes.ts`
- `frontend/src/pages/admin/training/**`
- `frontend/src/stores/admin/training/**`
- `teacher-mobile/src/pages.json`
- `teacher-mobile/src/pages/profile/**`
- `frontend/docs/admin-design-system-guide.md`
- `teacher-mobile/docs/mobile-design-system-guide.md`

## Goals / Non-Goals

**Goals:**

- 建立第一批可同步到 `openspec/specs/` 的主规格能力。
- 明确项目级工程边界、页面通用契约和首批模块规格。
- 让后续页面规格扩展可以按同一方法执行：盘点事实、写 delta specs、validate、sync。
- 用中文表达规格内容，同时保留 OpenSpec 固定结构标题，保证 CLI 校验和后续同步兼容。

**Non-Goals:**

- 不修改管理端或手机端页面代码。
- 不把所有页面一次性转为规格。
- 不把未实现的真实后端能力描述为已完成。
- 不替代 `docs/page-specs/` 这类 AI 面向页面说明文档；OpenSpec 只承载可验证的需求和验收规则。

## Decisions

1. **按能力而不是按单页建 spec**

   每个页面单独建 capability 会产生大量碎片，且难以维护跨页面闭环。本 change 采用 `platform-boundary`、`admin-page-contract`、`mobile-page-contract` 加模块规格的结构，模块规格内部用 requirement / scenario 覆盖具体页面。

2. **第一批选择 `admin-training` 和 `mobile-profile`**

   `admin-training` 已有路由、共享本地状态、资源 / 需求 / 计划 / 申请 / 记录的状态操作和详情跳转；`mobile-profile` 已在 `pages.json` 注册，并覆盖我的首页、能力画像、发展报告、岗位对照、聘期要求和画像记录。两者适合作为 PC 和移动端规格样板。

3. **规格描述当前实现，不提前承诺真实服务接口**

   当前页面大量依赖本地 mock 和前台状态。规格中使用“本地 mock”“前台模拟”“降级提示”等表达，不把本地状态流转写成真实后端流程。

4. **通用契约先于模块规格**

   `platform-boundary`、`admin-page-contract` 和 `mobile-page-contract` 是后续模块扩展的共同约束。模块规格只写模块特有页面、数据和状态流转，避免重复散落全局规则。

## Risks / Trade-offs

- **风险：规格与未来代码快速漂移** → 后续每批页面精修或新增页面时，必须同步更新对应模块 spec 或新增 change。
- **风险：从现有实现反推会保留当前 mock 的局限** → 规格明确标注 mock-only 和本地状态，避免误读为真实服务闭环。
- **风险：一次性覆盖过多页面导致低质量清单化** → 首批仅覆盖 1 个管理端模块和 1 个手机端模块，样板稳定后再扩展。
- **风险：中文内容影响 OpenSpec 格式识别** → 固定保留 `## ADDED Requirements`、`### Requirement:`、`#### Scenario:` 等结构标题。
