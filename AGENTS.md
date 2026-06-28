# AGENTS.md

## 1. 项目说明

本仓库用于教师综合发展平台前端页面实现。

当前前端工程位于：

```txt
frontend/
```

## 2. 当前唯一规划入口

后续 AI / Codex / 开发助手执行前端页面任务时，优先读取：

```txt
frontend/docs/hifi-implementation/README.md
```

旧的高保真拆分文档和资源库优先规划已经废弃。不得继续把资源库页面作为管理端样板页或后续页面前置门槛。

当前管理端 PC 基准页：

```txt
页面：管理端｜能力清单｜执行版查看页
路由：/admin/ability-list/execution
Vue 文件：frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
目标效果图：效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png
设计系统：frontend/docs/admin-design-system-guide.md
```

## 3. 低上下文原则

每次任务只读取完成当前目标所需的最小上下文：

```txt
1. frontend/docs/hifi-implementation/README.md
2. frontend/docs/admin-design-system-guide.md
3. 当前目标页面源码
4. 当前目标效果图
5. 直接相关的 router、layout、component、mock 文件
```

禁止为了一个页面任务重新读取全工程、历史执行记录或已废弃规划。

## 4. 页面还原流程

页面开发必须遵循：

```txt
目标效果图识别
→ 页面区域拆解
→ 布局比例与断点规则提取
→ 组件提炼
→ Vue 实现
→ 多视口本地截图对比
→ 修正验收
```

页面完成标准不是“能运行”，而是“本地运行截图在多个桌面视口下与目标效果图的结构、比例、密度、视觉层级基本一致”。

目标效果图是桌面视觉基准，不是唯一固定视口。禁止为了贴合某一张截图尺寸而把页面写死为固定宽高。

## 5. 组件原则

组件必须从目标效果图和当前管理端设计系统中提炼。

不得先凭经验设计通用组件，再用组件拼页面。

已有组件可以复用，但必须先判断是否符合目标效果图和当前基准页风格。

如果已有组件无法表达目标效果图结构，应新增业务组件或升级组件。

## 6. 工程基础

可复用工程基础包括：

```txt
Vue 3
Vite
TypeScript
Vue Router
Tailwind CSS
CSS Variables 设计 token
```

可复用目录包括：

```txt
frontend/src/router/
frontend/src/layouts/
frontend/src/components/
frontend/src/mock/
```

本地启动：

```bash
cd frontend
npm install
npm run dev
```

代码修改完成后必须执行：

```bash
npm run typecheck
npm run build
```

纯文档修改通常不需要执行上述前端校验。

## 7. 提交与记录

涉及页面状态、任务优先级、验收口径变化时，更新：

```txt
frontend/docs/hifi-implementation/README.md
```

涉及管理端设计 token、通用类、组件模式变化时，更新：

```txt
frontend/docs/admin-design-system-guide.md
```

## 8. 禁止事项

```txt
1. 禁止继续沿用旧资源库优先规划。
2. 禁止跳过效果图识别直接写页面。
3. 禁止只做工程骨架就标记页面完成。
4. 禁止新增无业务必要的字段、按钮或模块。
5. 禁止页面出现未实现但看起来可点击的空操作。
6. 禁止把页面写死为单一截图尺寸。
7. 禁止只验收单一视口就标记响应式页面完成。
8. 禁止每次任务重新加载无关历史记录或全工程上下文。
```
