# AGENTS.md

本仓库用于教师综合发展平台前端页面实现。所有 AI / Codex / 开发助手以本文件为入口；其他旧交接文档如与本文件冲突，以本文件为准。

## 1. 工程边界

```txt
frontend/        管理端 PC，Vue 3 + Vite + TypeScript + Vue Router
teacher-mobile/  教师端手机端，UniApp + Vue 3 + TypeScript
```

- `frontend/` 不承载教师手机端页面。
- `teacher-mobile/` 不复用管理端 PC 路由、布局和页面样式。
- 旧的资源库优先规划已废弃，不再把资源库页面作为管理端样板页或后续页面前置门槛。

## 2. 必读入口

每次任务只读取完成当前目标所需的最小上下文。

通用入口：

```txt
docs/page-coverage-ledger.md
```

管理端任务再读取：

```txt
frontend/docs/admin-design-system-guide.md
当前目标页面源码
当前目标效果图
直接相关的 router、layout、component、mock 文件
```

教师手机端任务再读取：

```txt
teacher-mobile/docs/mobile-design-system-guide.md
当前目标页面源码
当前目标效果图
teacher-mobile/src/pages.json
直接相关的 component、style 文件
```

禁止为了单页任务重新读取全工程、历史执行记录或已废弃规划。

## 3. 执行原则

- 编码前先明确假设；需求有歧义时先询问。
- 只写解决当前问题所需的最少代码。
- 只修改完成任务所必需的文件和代码行。
- 不重构无关代码，不顺手格式化相邻代码。
- 遵循项目现有风格和组件边界。
- 页面任务必须先识别目标效果图，再拆解区域、提取布局比例、判断组件复用。
- 页面完成标准不是“能运行”，而是结构、比例、密度、视觉层级与目标图基本一致，并且入口、返回、提交、状态流转没有明显业务断点。
- 已确认只做视觉态的操作，必须在台账中标记为“待业务闭环”，不得标记为业务完成。
- 页面覆盖、业务闭环和后续优先级以 `docs/page-coverage-ledger.md` 为准。

## 4. 校验命令

管理端代码修改完成后执行：

```bash
cd frontend
npm run typecheck
npm run build
```

手机端代码修改完成后执行：

```bash
cd teacher-mobile
npm run typecheck
npm run build:h5
npm run build:mp-weixin
```

纯文档修改通常不需要执行前端构建，但需要自检文档入口、路径和结论是否一致。

## 5. 文档更新

- 页面覆盖、业务闭环、任务优先级变化：更新 `docs/page-coverage-ledger.md`。
- 管理端设计 token、页面流程、基准页或组件模式变化：更新 `frontend/docs/admin-design-system-guide.md`。
- 手机端框架规则、组件边界或验收口径变化：更新 `teacher-mobile/docs/mobile-design-system-guide.md`。

## 6. 禁止事项

1. 禁止继续沿用旧资源库优先规划。
2. 禁止跳过效果图识别直接写页面。
3. 禁止只做工程骨架就标记页面完成。
4. 禁止新增无业务必要的字段、按钮或模块。
5. 禁止页面出现未实现但看起来可点击的空操作。
6. 禁止把页面写死为单一截图尺寸。
7. 禁止只验收单一视口就标记响应式页面完成。
8. 禁止在构建或关键检查失败时宣称完成。
