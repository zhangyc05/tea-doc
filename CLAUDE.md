# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

教师综合发展平台的前端项目，基于 Vue 3 + TypeScript + Vite + shadcn-vue 构建，包含管理端 PC、教师端 PC 和教师手机端三个界面。

## 技术栈

- **框架**: Vue 3 (Composition API + `<script setup>`)
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: Tailwind CSS + CSS Variables (设计 Token)
- **UI 组件**: shadcn-vue (基于 Radix Vue)
- **路由**: Vue Router
- **代码规范**: 统一使用 `cn()` 工具函数处理样式合并

## 开发命令

```bash
# 安装依赖
npm install

# 开发环境
npm run dev

# 类型检查
npm run typecheck

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

**重要**: 每次任务完成后必须执行 `npm run typecheck` 和 `npm run build` 确保代码质量。

## 项目架构

### 目录结构

```
frontend/
├── src/
│   ├── components/        # 组件目录
│   │   ├── ui/           # shadcn-vue 基础 UI 组件
│   │   ├── layout/       # 布局组件 (AdminSidebar, AdminTopbar 等)
│   │   ├── common/       # 通用业务组件 (PageHeader, StatCard 等)
│   │   └── business/     # 业务组件 (按模块分组)
│   ├── layouts/          # 页面布局 (AdminLayout 等)
│   ├── pages/            # 页面组件
│   │   ├── admin/       # 管理端页面
│   │   ├── teacher/     # 教师端页面
│   │   └── mobile/      # 手机端页面
│   ├── router/           # 路由配置
│   ├── mock/             # Mock 数据
│   ├── lib/              # 工具函数
│   ├── styles/           # 样式文件
│   └── main.ts          # 应用入口
├── docs/                 # 项目文档
└── components.json      # shadcn-vue 配置
```

### 组件分层架构

1. **UI 层** (`src/components/ui/`): shadcn-vue 基础组件，提供基础交互能力
2. **布局层** (`src/components/layout/`): 页面框架组件，处理整体布局
3. **通用业务层** (`src/components/common/`): 跨模块复用的业务组件
4. **业务层** (`src/components/business/`): 特定模块的业务组件

## 设计系统

### 颜色 Token 系统

项目使用 CSS Variables 定义的设计 Token，所有颜色和尺寸都通过 Token 引用：

```typescript
// 使用方式
className="bg-primary text-text-primary border-card-border"
```

**关键 Token**:
- `--color-primary`: 品牌主色 (#2FBF9B)
- `--color-page-bg`: 页面背景色
- `--color-card-bg`: 卡片背景色
- `--color-text-primary`: 主要文本色
- `--admin-content-max-width`: 管理端内容区最大宽度 (1280px)

### 视觉风格原则

- **管理端**: 浅色清爽风格，避免黑色重后台
- **教师端**: 正向表达，不显示"候选数据"等内部术语
- **手机端**: 移动优先，390px 设计宽度

## 路由系统

### 路由组织

- `src/router/index.ts`: 路由入口
- `src/router/admin.routes.ts`: 管理端路由
- `src/router/teacher.routes.ts`: 教师端路由
- `src/router/mobile.routes.ts`: 手机端路由

### 路由 Meta 规范

每个路由必须包含完整的 `meta` 信息：

```typescript
{
  path: '/admin/training/resources',
  component: ResourceLibraryPage,
  meta: {
    title: '资源库',           // 页面标题
    module: '培训管理',        // 所属模块
    layout: 'admin',          // 使用的布局
    menuKey: 'training-resources', // 菜单项 key
    breadcrumb: ['管理端', '培训管理', '资源库'] // 面包屑
  }
}
```

### Layout 自动读取机制

AdminLayout 支持从 `route.meta` 自动读取页面信息，优先级：手动传入 > route.meta > 默认值。

## 组件开发规范

### 组件导出规范

每个组件目录需要统一导出：

```typescript
// src/components/ui/index.ts
export { Button, buttonVariants } from './button'
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
```

### 样式处理规范

统一使用 `cn()` 工具函数处理样式合并：

```typescript
import { cn } from '@/lib/utils'

const className = cn('base-class', props.class, { 'conditional': condition })
```

### 业务组件规范

业务组件必须：
1. 支持合理的 props 接口
2. 提供清晰的默认值
3. 使用 TypeScript 类型定义
4. 遵循单一职责原则

## Mock 数据规范

Mock 数据文件按模块组织：

```
src/mock/
├── admin/
│   ├── training.ts      # 培训管理模块 mock
│   ├── archive.ts       # 成长档案模块 mock
│   └── ...
├── teacher/
│   └── ...
└── mobile/
    └── ...
```

Mock 数据必须与页面展示字段保持一致，避免字段冗余。

## 文档体系

项目有完整的 AI 执行文档体系，位于 `delivery-html/01-frontend-implementation/AI执行文档体系/`：

- `00-AI执行总入口.md`: 每次任务必读
- `01-工程初始化任务.md`: 工程初始化规范
- `02-设计Token与视觉规范.md`: 视觉规范
- `03-组件规范.md`: 组件开发规范
- `04-路由与页面台账.md`: 路由与页面规范
- `05-管理端页面任务.md`: 管理端页面规范
- `06-教师端页面任务.md`: 教师端页面规范
- `07-AI任务执行记录与交接.md`: 任务执行规范

**执行任务时必须按顺序读取**: README → 00-AI执行总入口 → 对应子文档

## 任务执行规范

### 任务记录

每次任务完成后必须更新以下文档：
1. `frontend/docs/ai-task-log.md`: 任务执行记录
2. `frontend/docs/page-route-map.md`: 页面路由台账
3. `frontend/docs/任务清理与待验证清单.md`: 待清理事项

### 提交规范

- 默认直接提交到 `main` 分支
- 提交信息格式: `feat(module): T任务编号 简短描述`
- 避免新建功能分支，除非特别必要

### 质量检查清单

每次任务完成后必须检查：
- [ ] `npm run typecheck` 通过
- [ ] `npm run build` 成功
- [ ] 页面路由台账已更新
- [ ] 任务执行记录已更新
- [ ] 无新增待清理项遗漏

## 关键原则

### 禁止事项
1. 不自行改变技术栈
2. 不自行新增无依据字段
3. 不把管理端做成黑色重后台
4. 不在教师端直接显示"候选数据"
5. 不把 AI 建议表达成正式结论
6. 不在 build 失败时宣称任务完成

### 文案规范
- 管理端: 保持专业、清晰
- 教师端: 正向表达，避免内部术语
- 状态描述: 统一使用 StatusBadge 组件

### 开发原则
- 每次只执行一个明确任务编号
- 组件复用优先于重复开发
- 设计 Token 优先于硬编码颜色
- 路由 meta 优先于手动传参

## 当前项目状态

### 已完成功能
- ✅ Vue 3 + Vite 工程初始化
- ✅ Tailwind CSS + 设计 Token 系统
- ✅ shadcn-vue UI 组件库接入
- ✅ AdminLayout 管理端布局
- ✅ Vue Router 路由系统
- ✅ 通用业务组件 (PageHeader, StatCard, FilterBar, StatusBadge, DetailSheet)
- ✅ 管理端路由占位页
- ✅ T5.1 资源库真实页面

### 进行中的工作
- 🔄 环境验证 (npm install, typecheck, build)
- 🔄 其他管理端页面开发 (T5.2+)

### 待验证项
- V-001: 执行 `npm install`
- V-002: 执行 `npm run typecheck`
- V-003: 执行 `npm run build`

## 常见问题

### shadcn-vue 组件添加

使用 `npx shadcn-vue@latest add [组件名]` 添加新组件，不要使用 `init/add`。

### 样式不生效

确保：
1. 使用了 `cn()` 函数合并样式
2. 正确引用了设计 Token 而非硬编码颜色
3. 组件正确导出和导入

### 路由跳转不工作

确保：
1. 使用了 `RouterLink` 而非 `<a>` 标签
2. 路由配置中包含了正确的 `meta` 信息
3. AdminLayout 的 `menuKey` 与路由配置一致

### Mock 数据与页面不匹配

检查：
1. Mock 数据字段与页面展示字段完全一致
2. Mock 数据文件路径正确
3. 组件正确导入和使用 Mock 数据

## 相关资源

- 设计 Token 定义: `frontend/src/styles/tokens.css`
- Tailwind 配置: `frontend/tailwind.config.ts`
- shadcn-vue 配置: `frontend/components.json`
- 页面路由台账: `frontend/docs/page-route-map.md`
- 任务执行记录: `frontend/docs/ai-task-log.md`
- AI 执行文档体系: `delivery-html/01-frontend-implementation/AI执行文档体系/`