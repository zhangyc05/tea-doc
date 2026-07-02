# 高保真页面实现入口

本文件是后续 AI / Codex / 开发助手执行页面任务的当前入口。旧的资源库优先规划已经废弃，不再把资源库页面作为管理端样板页或后续页面前置门槛。

## 工程边界

```txt
frontend/        管理端 PC，Vue 3 + Vite + TypeScript + Vue Router
teacher-mobile/  教师端手机端，UniApp + Vue 3 + TypeScript
```

管理端页面任务只在 `frontend/` 内实现。教师手机端页面任务只在 `teacher-mobile/` 内实现，并读取 `teacher-mobile/docs/mobile-design-system-guide.md`。

## 当前基准

管理端 PC 当前基准页：

```txt
页面：管理端｜能力清单｜执行版查看页
路由：/admin/ability-list/execution
Vue 文件：frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
目标效果图：效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png
设计系统：frontend/docs/admin-design-system-guide.md
```

教师手机端当前基准页记录在：

```txt
teacher-mobile/docs/mobile-design-system-guide.md
```

## 当前项目状态

最近一次扫描结论：

```txt
效果图总数：178
管理端效果图：36
教师手机端效果图：142
管理端 Vue 页面：33
教师手机端 UniApp 页面：83
```

这些数字只能证明页面文件和效果图资产已大量落地，不能单独证明“所有效果图都已按业务状态完整覆盖”。页面覆盖关系以后以 `docs/page-coverage-ledger.md` 为准。

已确认的工程检查：

```bash
cd frontend && npm run typecheck && npm run build
cd teacher-mobile && npm run typecheck && npm run build:h5 && npm run build:mp-weixin
```

上述命令在本次文档对齐前已通过。手机端构建存在 Sass `@import` 和 legacy API deprecation warning，暂不阻塞页面推进。

## 页面推进流程

页面开发或修正必须遵循：

```txt
目标效果图识别
→ 页面区域拆解
→ 布局比例与断点规则提取
→ 组件提炼
→ Vue / UniApp 实现
→ 多视口本地截图对比
→ 修正验收
→ 更新 docs/page-coverage-ledger.md
```

页面完成标准不是“能运行”，而是“本地运行截图在目标视口下与效果图的结构、比例、密度、视觉层级基本一致，并且入口、返回、提交、状态流转没有明显业务断点”。

## 下一阶段优先级

1. 补齐页面覆盖台账：逐图确认效果图、源码、路由、状态关系。
2. 按模块做业务逻辑审计：先管理端能力清单、成长档案、培训管理；再手机端待办、活动、档案。
3. 抽样补视觉验收：管理端多桌面视口；手机端 `390x844`、`375x812`、`430x932`、`360x800`。

## 禁止事项

- 禁止没有效果图识别就直接改页面。
- 禁止把页面写死为单一截图尺寸。
- 禁止把可构建页面直接标记为业务完成。
- 禁止新增看起来可点击但没有业务意义的空操作。
- 禁止为了一个页面任务重新读取全工程或旧规划。
