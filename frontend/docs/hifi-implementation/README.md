# 管理端 PC 页面还原规划

本文件是当前前端页面还原的唯一规划入口。

旧的资源库优先规划已经废弃。后续不再读取本目录下已删除的历史拆分文档，也不再把资源库页面作为管理端样板页或前置门槛。

## 1. 当前真实基准

当前管理端 PC 基准页：

```txt
页面：管理端｜能力清单｜执行版查看页
路由：/admin/ability-list/execution
Vue 文件：frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
目标效果图：效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png
设计系统：frontend/docs/admin-design-system-guide.md
```

该页面已经作为管理端设计系统来源。后续管理端 PC 页面应优先复用它沉淀出的布局、视觉密度、token、通用样式类和组件模式。

## 2. 低上下文读取规则

每次任务只读取必要上下文：

```txt
1. 本文件；
2. frontend/docs/admin-design-system-guide.md；
3. 当前目标页面源码；
4. 当前目标效果图；
5. 与当前页面直接相关的 mock、router、layout、component 文件。
```

禁止为了一个页面任务重新读取全工程或历史规划。

## 3. 当前工程事实

前端工程：

```txt
frontend/
```

技术栈：

```txt
Vue 3
Vite
TypeScript
Vue Router
Tailwind CSS
CSS Variables 设计 token
```

本地启动：

```bash
cd frontend
npm install
npm run dev
```

代码修改完成后执行：

```bash
npm run typecheck
npm run build
```

纯文档修改通常不需要执行前端校验。

## 4. 已有管理端页面

| 页面 | 路由 | Vue 文件 | 目标效果图 | 状态 |
|---|---|---|---|---|
| 能力清单｜执行版查看页 | `/admin/ability-list/execution` | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png` | 管理端 PC 基准页 |
| 能力清单｜基准模板查看页 | `/admin/ability-list/base` | `frontend/src/pages/admin/ability-list/AbilityListBasePage.vue` | `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版查看页.png` | 已实现，待按基准复核 |
| 能力清单｜基准模板优化建议 | `/admin/ability-list/base/optimization` | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue` | `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版优化建议.png` | 已实现，待按基准复核 |
| 能力清单｜执行版发布确认 | `/admin/ability-list/execution/publish-confirm` | `frontend/src/pages/admin/ability-list/AbilityListPublishConfirmPage.vue` | `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版发布确认.png` | 已实现，待按基准复核 |
| 能力清单｜岗位与聘期要求映射 | `/admin/ability-list/execution/requirement-mapping` | `frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue` | `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜岗位与聘期要求映射.png` | 已实现，待按基准复核 |
| 培训管理｜资源库 | `/admin/training/resources` | `frontend/src/pages/admin/training/ResourceLibraryPage.vue` | `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜资源库.png` | 旧规划产物，后续按新基准重新评估 |

## 5. 后续任务流程

新页面或页面校准按以下顺序执行：

```txt
1. 确认目标页面、路由、效果图；
2. 读取当前基准页和设计系统指南；
3. 识别目标图中的页面区域、信息层级、组件和交互；
4. 对照现有 layout、token、通用样式类和组件，确定最小改动范围；
5. 实现 Vue 页面或修正现有页面；
6. 在多个桌面视口截图检查；
7. 修正结构、比例、密度、文字溢出和响应式问题；
8. 运行 typecheck 和 build；
9. 更新本文件中的页面状态。
```

## 6. 验收视口

默认桌面验收视口：

```txt
1280 × 800
1440 × 900
1536 × 864
1920 × 1080
```

`1440 × 900` 作为主要对齐视口。其他视口用于检查响应式稳定性。

页面完成标准：

```txt
1. 页面结构与目标效果图一致；
2. 主要模块完整；
3. 信息层级、视觉密度和布局比例接近目标图；
4. 复用当前管理端设计系统；
5. 不新增目标图之外的业务模块；
6. 不出现文字重叠、控件溢出、表格压扁或内容裁切；
7. 通过 npm run typecheck 和 npm run build。
```

## 7. 禁止事项

```txt
1. 禁止继续沿用旧资源库优先规划。
2. 禁止跳过目标效果图识别直接写页面。
3. 禁止根据已有旧页面自行推断目标结构。
4. 禁止为了贴合单张截图写死页面宽高。
5. 禁止新增无业务必要的字段、按钮或模块。
6. 禁止页面出现未实现但看起来可点击的空操作。
7. 禁止每次任务加载无关历史文档或全工程上下文。
```
