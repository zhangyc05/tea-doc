## 1. 事实盘点

- [x] 1.1 核对 `frontend/src/router/admin.routes.ts` 中成长档案路由，确认处理、导入、批次详情、查阅和教师详情页均已注册。
- [x] 1.2 核对 `frontend/src/pages/admin/archive/**`，确认页面入口、返回、筛选、导入、确认、退回、异常、来源记录和导出操作来自当前源码。
- [x] 1.3 核对 `frontend/src/stores/admin/archiveStore.ts` 与 `frontend/src/stores/admin/archive/**`，确认本地状态覆盖导入批次、处理记录、教师档案事实和导出记录。

## 2. 规格编写

- [x] 2.1 编写 `admin-archive` delta spec，覆盖成长档案路由结构。
- [x] 2.2 编写 `admin-archive` delta spec，覆盖部门资料导入上传和导入批次识别。
- [x] 2.3 编写 `admin-archive` delta spec，覆盖档案处理工作台和处理记录操作。
- [x] 2.4 编写 `admin-archive` delta spec，覆盖档案查阅、教师成长档案详情和本地状态。

## 3. 校验与同步

- [x] 3.1 运行 `openspec validate add-admin-archive-spec`，确认 change 格式有效。
- [x] 3.2 校验通过后，将 `admin-archive` delta spec 同步到 `openspec/specs/admin-archive/spec.md`。
- [x] 3.3 运行 `openspec validate --specs` 和 `openspec validate --all`，确认主规格与 change 均有效。
