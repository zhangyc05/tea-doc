# AGENTS.md

## 1. 项目说明

本仓库用于教师综合发展平台前端页面实现。

当前前端工程位于：

```txt
frontend/
```

后续 AI / Codex / 开发助手进入项目后，应优先阅读高保真还原执行文档，而不是根据已有页面代码自行推断页面结构。

## 2. 唯一执行入口

后续前端页面任务只读取：

```txt
frontend/docs/hifi-implementation/README.md
```

该目录下文档是当前前端页面还原的唯一执行依据。

阅读顺序：

```txt
1. README.md
2. 00-执行总入口.md
3. 01-当前工程基础.md
4. 按任务需要阅读 02-07 的对应文档
```

## 3. 固定执行流程

页面开发必须遵循：

```txt
效果图识别
→ 页面区域拆解
→ 组件提炼
→ Vue 实现
→ 本地截图对比
→ 修正验收
```

页面完成标准不是“能运行”，而是“本地运行截图与目标效果图结构、密度、视觉层级基本一致”。

## 4. 组件原则

组件必须从目标效果图中提炼。

不得先凭经验设计通用组件，再用组件拼页面。

已有组件可以复用，但必须先判断是否符合目标效果图。

如果已有组件无法表达目标效果图结构，应新增业务组件或升级组件。

## 5. 当前工程基础

可复用工程基础包括：

```txt
Vue 3
Vite
TypeScript
Vue Router
Tailwind CSS
CSS Variables 设计 token
```

当前可复用目录包括：

```txt
frontend/src/router/
frontend/src/layouts/
frontend/src/components/
frontend/src/mock/
```

当前资源库页面路由：

```txt
/admin/training/resources
```

本地启动：

```bash
cd frontend
npm install
npm run dev
```

## 6. 当前优先任务

当前优先任务是资源库页面按目标效果图重构，并作为管理端页面基准。

任务文档：

```txt
frontend/docs/hifi-implementation/06-资源库页面重构任务清单.md
```

资源库页面未通过本地截图验收前，不进入需求管理、申请处理、记录总览等同类页面开发。

## 7. 提交与记录

代码修改后应同步更新：

```txt
frontend/docs/hifi-implementation/07-页面路由与验收台账.md
```

涉及执行规则、组件提炼、页面验收标准变化时，应更新 `frontend/docs/hifi-implementation/` 下对应小文档。

## 8. 禁止事项

```txt
1. 禁止跳过效果图识别直接写页面。
2. 禁止只做工程骨架就标记页面完成。
3. 禁止新增无业务必要的字段、按钮或模块。
4. 禁止页面出现未实现但看起来可点击的空操作。
5. 禁止在样板页未通过截图验收前继续开发后续同类页面。
```
