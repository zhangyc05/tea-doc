# AGENTS.md

This file provides guidance to Codex when working in this repository.

## Project Overview

This repository contains the frontend for a teacher development platform. The active app is under `frontend/` and is built with Vue 3, TypeScript, Vite, Tailwind CSS, Vue Router, and shadcn-vue style base components.

The product includes three intended surfaces:

- Admin PC
- Teacher PC
- Teacher mobile

At the current stage, the implemented real page is the admin training resource library. Most other admin routes are placeholders.

## Current Source of Truth

For frontend implementation work, use the high-fidelity implementation docs under:

```txt
frontend/docs/hifi-implementation/
```

Read them in this order:

```txt
1. README.md
2. 00-执行总入口.md
3. 01-当前工程基础.md
4. Task-specific documents:
   - 02-效果图识别规则.md
   - 03-组件提炼规则.md
   - 04-页面还原规则.md
   - 05-本地截图验收规则.md
   - 06-资源库页面重构任务清单.md
   - 07-页面路由与验收台账.md
```

Do not infer current requirements from older paths or historical notes. In particular, `delivery-html/01-frontend-implementation/AI执行文档体系/`, `frontend/docs/ai-task-log.md`, and `frontend/docs/page-route-map.md` are not the current execution references in this workspace.

## Tech Stack

- Framework: Vue 3 with Composition API and `<script setup>`
- Build tool: Vite
- Language: TypeScript
- Styling: Tailwind CSS plus CSS Variables design tokens
- UI base components: shadcn-vue style components
- Routing: Vue Router
- Utility convention: use `cn()` from `src/lib/utils.ts` for class merging when components need class composition

## Development Commands

Run commands from `frontend/`:

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

For code changes, run both before claiming completion:

```bash
npm run typecheck
npm run build
```

For documentation-only changes, these checks are not normally required unless the edit also changes code, routes, config, or generated artifacts.

## Active Project Structure

```txt
frontend/
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── components.json
├── docs/
│   └── hifi-implementation/
└── src/
    ├── App.vue
    ├── main.ts
    ├── components/
    │   ├── ui/
    │   ├── layout/
    │   ├── common/
    │   └── business/
    ├── layouts/
    ├── pages/
    ├── router/
    ├── mock/
    ├── lib/
    └── styles/
```

Key implemented files:

```txt
frontend/src/router/index.ts
frontend/src/router/admin.routes.ts
frontend/src/router/teacher.routes.ts
frontend/src/router/mobile.routes.ts
frontend/src/layouts/AdminLayout.vue
frontend/src/pages/admin/training/ResourceLibraryPage.vue
frontend/src/mock/admin/training.ts
frontend/src/styles/tokens.css
```

## Component Layers

Use the existing layering:

1. `src/components/ui/`: base UI primitives such as Button, Card, Table, Input, Select, Sheet, Dialog.
2. `src/components/layout/`: app layout pieces such as AdminSidebar, AdminTopbar, AppBreadcrumb, FloatingAIAssistant.
3. `src/components/common/`: reusable business components such as PageHeader, StatCard, FilterBar, StatusBadge, DetailSheet.
4. `src/components/business/`: module-specific business components.

Prefer existing components and patterns before adding new abstractions.

## Design Tokens and Visual Rules

Design tokens live in:

```txt
frontend/src/styles/tokens.css
```

Use Tailwind classes mapped to tokens where possible:

```txt
bg-primary
text-text-primary
border-card-border
bg-page
bg-card
```

Important values include:

- `--color-primary`: brand color
- `--color-page-bg`: page background
- `--color-card-bg`: card background
- `--color-card-border`: card border
- `--color-text-primary`: primary text
- `--admin-content-max-width`: admin content width

Visual principles:

- Admin PC: light, clean, professional; do not make it a dark heavy backend.
- Teacher-facing surfaces: use positive user-facing wording; do not expose internal terms such as "候选数据".
- Mobile: mobile-first, based around the 390px design width.

## High-Fidelity Page Workflow

Current frontend page work must follow the high-fidelity workflow:

```txt
1. Identify the target screenshot/design.
2. Break down page regions.
3. Extract page-specific components.
4. Confirm data fields and mock structure.
5. Implement or adjust Vue files.
6. Run locally and capture a screenshot.
7. Compare with the target screenshot.
8. Fix differences.
9. Update the route and validation ledger.
```

Do not mark a page complete just because it runs. Completion means the local screenshot is structurally and visually close to the target image.

## Current Page Status

The current real page is:

```txt
Page: 管理端｜培训管理｜资源库
Route: /admin/training/resources
Vue file: frontend/src/pages/admin/training/ResourceLibraryPage.vue
Mock file: frontend/src/mock/admin/training.ts
Ledger: frontend/docs/hifi-implementation/07-页面路由与验收台账.md
```

Important current status:

- The resource library page is the admin benchmark page.
- The ledger currently treats it as needing high-fidelity reconstruction and screenshot correction.
- Do not start same-family admin pages such as training demands, applications, or records until the resource library benchmark page passes visual validation.

## Routing Rules

Routes are organized under:

```txt
frontend/src/router/index.ts
frontend/src/router/admin.routes.ts
frontend/src/router/teacher.routes.ts
frontend/src/router/mobile.routes.ts
```

Every route should include complete `meta` information:

```ts
{
  path: '/admin/training/resources',
  component: ResourceLibraryPage,
  meta: {
    title: '资源库',
    module: '培训管理',
    layout: 'admin',
    menuKey: 'training-resources',
    breadcrumb: ['管理端', '培训管理', '资源库'],
  },
}
```

`AdminLayout` reads route meta for active menu and breadcrumbs. Prefer route meta over manual page props when possible.

## Mock Data Rules

Mock data belongs under `frontend/src/mock/` and should be grouped by module.

Current active mock file:

```txt
frontend/src/mock/admin/training.ts
```

Rules:

- Keep mock fields aligned with the target screenshot and page display.
- Do not add fields only to make a page look fuller.
- Keep large mock datasets out of Vue page files.

For the resource library page, do not add these unsupported concepts:

```txt
需求匹配结果
涉及计划统计
覆盖教师统计
推荐命中
评价结论
AI 正式结论
```

Allowed resource-level statistics include:

```txt
资源数量
资源来源分布
培训级别分布
资源状态分布
资源完整度
更新时间
```

## Documentation Updates

For frontend page work, update the current high-fidelity ledger when status changes:

```txt
frontend/docs/hifi-implementation/07-页面路由与验收台账.md
```

If working specifically on the resource library benchmark, also keep the task checklist aligned:

```txt
frontend/docs/hifi-implementation/06-资源库页面重构任务清单.md
```

Do not create or update obsolete task logs unless the user explicitly asks for them.

## Quality Checklist

For code changes:

- `npm run typecheck` passes.
- `npm run build` succeeds.
- Route meta is complete when routes are added or changed.
- Mock data is centralized and matches the page.
- Status text uses `StatusBadge` where applicable.
- No unsupported business fields or formal AI conclusions are introduced.
- Relevant high-fidelity ledger entries are updated.

For visual page work:

- Target screenshot/design has been identified.
- Page regions and components have been extracted before implementation.
- Local screenshot comparison has been performed.
- The ledger status reflects the actual validation state.

## Git Notes

The repository may already have user changes. Do not revert unrelated changes.

Default branch guidance in older docs may mention direct commits to `main`, but do not commit unless the user explicitly asks for a commit.

## Useful Local References

- High-fidelity docs: `frontend/docs/hifi-implementation/`
- Current route ledger: `frontend/docs/hifi-implementation/07-页面路由与验收台账.md`
- Resource library task checklist: `frontend/docs/hifi-implementation/06-资源库页面重构任务清单.md`
- Design tokens: `frontend/src/styles/tokens.css`
- Tailwind config: `frontend/tailwind.config.ts`
- shadcn-vue config: `frontend/components.json`
- Admin routes: `frontend/src/router/admin.routes.ts`
- Current real page: `frontend/src/pages/admin/training/ResourceLibraryPage.vue`
