# 管理端设计系统指南

本指南记录 `frontend/` 管理端 PC 页面当前可依赖的设计规则。页面修正优先遵循已实现基准页和现有组件，不为单页临时发明新的视觉体系。

## 当前基准页

```txt
页面：管理端｜能力清单｜执行版查看页
路由：/admin/ability-list/execution
源码：frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
目标图：效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png
```

## 工程范围

- `frontend/` 只承载管理端 PC。
- 教师手机端在 `teacher-mobile/`，不复用管理端布局、路由和页面样式。
- 管理端页面使用 Vue 3、Vite、TypeScript、Vue Router、Tailwind CSS、CSS Variables。

## 布局规则

- 管理端统一使用 `frontend/src/layouts/AdminLayout.vue`。
- 侧边栏、顶栏、面包屑优先复用：

```txt
frontend/src/components/layout/AdminSidebar.vue
frontend/src/components/layout/AdminTopbar.vue
frontend/src/components/layout/AppBreadcrumb.vue
```

- 页面内容以桌面信息密度为主，避免营销式大卡片堆叠。
- 目标效果图是桌面视觉基准，不是固定宽高约束；页面不得为单一截图尺寸写死。

## 颜色与样式

- 优先使用 `frontend/src/styles/tokens.css` 中的 CSS Variables。
- 管理端保持浅色、清爽、工作台风格。
- 重要操作使用主绿色；风险操作使用红色或危险样式；普通筛选和次级操作使用低对比边框按钮。
- 避免把管理端做成深色重后台。

## 组件使用边界

已有通用组件优先判断是否符合目标图后再复用：

```txt
frontend/src/components/common/PageHeader.vue
frontend/src/components/common/FilterBar.vue
frontend/src/components/common/StatCard.vue
frontend/src/components/common/StatusBadge.vue
frontend/src/components/common/DetailSheet.vue
```

能力清单相关组件：

```txt
frontend/src/components/admin/ability-list/AbilityListWorkspace.vue
frontend/src/components/admin/ability-list/AbilityIndicatorTable.vue
frontend/src/components/admin/ability-list/AbilityStructureTree.vue
```

不得先凭经验设计通用组件，再用组件拼页面。组件必须从目标效果图和当前基准页中提炼。

## 业务交互要求

- 页面中不应出现未实现但看起来可点击的空操作。
- 如果当前阶段只支持视觉反馈，应在台账里标记为“视觉态/待业务闭环”，不能标记为业务完成。
- 路由跳转、返回、详情、提交、状态切换需要按模块审计。

## 验收

管理端页面修改完成后执行：

```bash
cd frontend
npm run typecheck
npm run build
```

视觉验收应覆盖多个桌面视口。完成后同步更新：

```txt
docs/page-coverage-ledger.md
```
