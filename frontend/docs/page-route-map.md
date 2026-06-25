# 页面路由与执行台账

> 本文件是前端页面执行台账。后续每完成一个页面任务，都必须同步更新本文件。

## 1. 首批管理端路由

| 任务编号 | 页面中文名 | 页面路由 | Vue 文件路径 | 所属端 | 所属模块 | 对应效果图路径 | 所属 Layout | 依赖组件 | mock 文件 | 页面状态 | 验收状态 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T5.0 | 管理端｜培训管理｜记录总览 | `/admin/training/records` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 培训管理 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | `src/mock/admin/training.ts` | 未开始 | 未验收 | 当前为路由占位 |
| T5.1 | 管理端｜培训管理｜资源库 | `/admin/training/resources` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 培训管理 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | `src/mock/admin/training.ts` | 未开始 | 未验收 | 首个样板页；当前为路由占位 |
| T5.2 | 管理端｜培训管理｜需求管理 | `/admin/training/demands` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 培训管理 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | `src/mock/admin/training.ts` | 未开始 | 未验收 | 第二个标准页；当前为路由占位 |
| T5.3 | 管理端｜培训管理｜申请处理 | `/admin/training/applications` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 培训管理 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | `src/mock/admin/training.ts` | 未开始 | 未验收 | 轻量申请处理；当前为路由占位 |
| T5.4 | 管理端｜分析报告｜卡片页 | `/admin/reports` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 分析报告 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | 待建立 | 未开始 | 未验收 | AI 报告生成入口；当前为路由占位 |
| T5.5 | 管理端｜成长档案｜导入部门资料 | `/admin/archive/import` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 成长档案 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | 待建立 | 未开始 | 未验收 | 当前为路由占位 |
| T5.6 | 管理端｜成长档案｜导入批次详情 | `/admin/archive/import/:batchId` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 成长档案 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | 待建立 | 未开始 | 未验收 | 当前为路由占位 |
| T5.7 | 管理端｜成长档案｜教师档案总览 | `/admin/archive/records` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 成长档案 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | 待建立 | 未开始 | 未验收 | 当前为路由占位 |
| T5.8 | 管理端｜能力画像｜学校画像 | `/admin/ability-profile/school` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 能力画像 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | 待建立 | 未开始 | 未验收 | 当前为路由占位 |
| T5.9 | 管理端｜能力画像｜教师画像列表 | `/admin/ability-profile/teachers` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 能力画像 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | 待建立 | 未开始 | 未验收 | 当前为路由占位 |
| T5.10 | 管理端｜能力清单｜执行版 | `/admin/ability-list/execution` | `src/pages/admin/AdminPlaceholderPage.vue` | 管理端 PC | 能力清单 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, StatusBadge | 待建立 | 未开始 | 未验收 | 当前为路由占位 |

## 2. 当前路由回收情况

```txt
1. App.vue 已从组件预览态改为 RouterView。
2. 首批管理端路由已接入 admin.routes.ts。
3. AdminSidebar 已接入 RouterLink，已建立路由的菜单可直接跳转。
4. AdminLayout 已支持从 route.meta 自动读取标题、面包屑和菜单选中状态。
5. 教师 PC 与手机端路由文件已建立，占位为空数组。
6. 具体页面仍处于“未开始”，当前仅完成路由可访问与 Layout 承载。
```
