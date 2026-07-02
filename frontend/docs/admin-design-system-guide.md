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

### Token 收敛观察

当前页面仍存在较多局部硬编码颜色、阴影和圆角。后续 F3 收敛时按高频、低风险、可替代顺序推进，不做一次性全量替换。

高频颜色候选：

| 现有值 | 出现次数 | 建议归并 |
| --- | ---: | --- |
| `#1268f6` | 147 | `--color-primary` |
| `#0f5eef` | 78 | `--color-primary` 或补充 legacy primary alias |
| `#17233d` | 108 | `--color-text-primary` |
| `#172b55` | 46 | `--color-text-primary` 或页面标题色 alias |
| `#66758f` | 36 | `--color-text-secondary` |
| `#405985` | 21 | `--color-text-secondary` |
| `#dce6f5` | 64 | `--color-card-border` |
| `#d9e5f7` | 43 | `--color-card-border` |
| `#e5edf8` | 24 | `--color-divider` |
| `#f6f9ff` | 26 | `--color-page-bg` |
| `#f8fbff` | 18 | `--color-page-bg-soft` |

高频圆角候选：

| 现有值 | 出现次数 | 建议归并 |
| --- | ---: | --- |
| `8px` | 97 | 卡片、面板默认圆角，优先保留为页面基准 |
| `6px` | 92 | 按钮、输入框、小标签圆角，对齐 `--radius-sm` |
| `12px` | 18 | 大卡片或浮层圆角，对齐 `--radius-lg` |
| `10px` | 13 | 后续评估是否归入 `--radius-md` |
| `999px` | 13 | 胶囊标签，对齐 `--radius-full` |

高频阴影候选：

| 现有值 | 出现次数 | 建议归并 |
| --- | ---: | --- |
| `0 8px 22px rgba(40, 88, 150, 0.035)` | 21 | 卡片弱阴影候选 token |
| `0 8px 24px rgba(35, 64, 110, 0.05)` | 16 | 卡片弱阴影候选 token |
| `0 8px 24px rgba(35, 64, 110, 0.04)` | 11 | 卡片弱阴影候选 token |
| `0 8px 18px rgba(18, 104, 246, 0.18)` | 5 | 主按钮强调阴影候选 token |

收敛顺序：

1. 先替换品牌主色、正文色、边框色、页面背景色。
2. 再统一卡片弱阴影和主按钮阴影。
3. 最后处理圆角差异，保留头像、图形插画、进度节点等非通用形状。

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

### 状态徽章

- 管理端业务状态优先使用 `frontend/src/components/common/StatusBadge.vue`。
- 页面不应为业务状态新增局部 `.badge-status.status-*` 样式；确需特殊展示时，先判断是否应扩展 `StatusBadge` 的文案和 tone。
- 业务状态枚举、文案和状态口径仍归属 `frontend/src/domain/admin/*`；`StatusBadge` 只负责稳定展示，不承载业务流转。
- 已迁移范围：能力清单优化建议状态、基准模板启用态、执行版主状态、版本记录状态、发布确认状态、要求映射状态、成长档案档案处理记录状态、导入批次状态、批次文件状态、培训资源状态、培训需求状态、培训计划状态、培训申请状态、培训记录材料状态、培训材料上传状态、培训参与状态、企业实践申请状态、企业实践年度跟踪状态、企业实践记录状态、虚拟教研活动记录状态、虚拟教研参与同步状态、报告中心报告状态、报告中心 AI 会话状态。

## 业务交互要求

- 页面中不应出现未实现但看起来可点击的空操作。
- 如果当前阶段只支持视觉反馈，应在台账里标记为“视觉态/待业务闭环”，不能标记为业务完成。
- 路由跳转、返回、详情、提交、状态切换需要按模块审计。

## 验收

管理端页面修改完成后执行：

```bash
cd frontend
npm run test
npm run typecheck
npm run build
```

视觉验收应覆盖多个桌面视口。完成后同步更新：

```txt
docs/page-coverage-ledger.md
```
