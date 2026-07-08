## Why

第一期规格体系已经建立了通用工程边界和管理端页面契约，下一步需要按模块继续沉淀已实现页面。管理端成长档案模块包含导入、识别、处理、查询、教师档案详情和导出等本地状态闭环，适合作为第二个管理端模块规格。

## What Changes

- 新增 `admin-archive` 能力规格，覆盖管理端成长档案模块当前已实现页面。
- 把 `/admin/archive/processing`、`/admin/archive/import`、`/admin/archive/import/:batchId`、`/admin/archive/query`、`/admin/archive/teacher/:teacherId` 的当前路由和页面行为整理为 requirement / scenario。
- 明确成长档案模块当前依赖本地 store 和 mock 数据，不描述为真实后端服务完成。
- 保留已有 `admin-page-contract`，本 change 不修改通用管理端页面契约。

## Capabilities

### New Capabilities

- `admin-archive`: 定义管理端成长档案模块当前页面、导入批次、识别确认、待处理记录、教师档案查询、来源记录和导出闭环。

### Modified Capabilities

- 无。本 change 只新增成长档案模块规格，不修改现有通用规格。

## Impact

- 新增 OpenSpec change 文档和 `admin-archive` delta spec。
- 后续通过 `openspec-sync-specs` 同步到 `openspec/specs/admin-archive/spec.md`。
- 本 change 不修改 `frontend/` 页面代码。
- 规格事实来源包括 `frontend/src/router/admin.routes.ts`、`frontend/src/pages/admin/archive/**`、`frontend/src/stores/admin/archiveStore.ts`、`frontend/src/stores/admin/archive/**`、`frontend/src/services/mock/archive.ts` 和已有 `openspec/specs/admin-page-contract/spec.md`。
