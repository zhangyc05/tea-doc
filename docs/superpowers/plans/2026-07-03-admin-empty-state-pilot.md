# Admin Empty State Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a small shared admin empty-state component and migrate two low-risk table empty states without changing business behavior.

**Architecture:** `EmptyState.vue` lives in `frontend/src/components/common/` beside `StatusBadge`, `FilterBar`, and `DetailSheet`. It only owns empty-state rendering and optional action emission; pages continue to own filtering, table columns, and business state.

**Tech Stack:** Vue 3, TypeScript, Vitest, `@vue/test-utils`, existing component exports from `frontend/src/components/common/index.ts`.

## Global Constraints

- Keep the first slice limited to E15 table empty states.
- Do not change filter logic, store state, routing, or action behavior.
- Preserve existing empty-state copy and table `colspan` values in migrated pages.
- Run `cd frontend && npm run test && npm run typecheck && npm run build` before reporting completion.

---

### Task 1: Shared EmptyState Component

**Files:**
- Create: `frontend/src/components/common/EmptyState.vue`
- Create: `frontend/src/components/common/EmptyState.test.ts`
- Modify: `frontend/src/components/common/index.ts`

**Interfaces:**
- Consumes: Vue props and slots.
- Produces: `EmptyState` component props:
  - `as?: 'div' | 'td'`
  - `title: string`
  - `description?: string`
  - `colspan?: number`
  - `variant?: 'panel' | 'cell'`
  - `actionLabel?: string`
  - emits `action`

- [ ] **Step 1: Write the failing component test**

```ts
/* @vitest-environment jsdom */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import EmptyState from './EmptyState.vue'

describe('EmptyState', () => {
  it('renders a table cell empty state with the requested colspan', () => {
    const wrapper = mount(EmptyState, {
      props: {
        as: 'td',
        variant: 'cell',
        colspan: 7,
        title: '暂无符合条件的培训申请',
      },
    })

    expect(wrapper.element.tagName).toBe('TD')
    expect(wrapper.attributes('colspan')).toBe('7')
    expect(wrapper.text()).toContain('暂无符合条件的培训申请')
  })

  it('emits an action when the optional action button is clicked', async () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: '暂无符合条件的数据',
        description: '调整筛选条件后再试。',
        actionLabel: '重置筛选',
      },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('action')).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npm run test -- EmptyState`

Expected: fails because `EmptyState.vue` does not exist.

- [ ] **Step 3: Implement minimal component and export**

Create `EmptyState.vue` with the interface above and export it from `frontend/src/components/common/index.ts`.

- [ ] **Step 4: Run component test to verify it passes**

Run: `cd frontend && npm run test -- EmptyState`

Expected: the new component test passes.

### Task 2: Migrate Two Table Empty States

**Files:**
- Modify: `frontend/src/pages/admin/training/TrainingApplicationPage.vue`
- Modify: `frontend/src/pages/admin/practice/PracticeApplicationPage.vue`
- Modify: `docs/page-coverage-ledger.md`
- Modify: `frontend/docs/admin-design-system-guide.md`

**Interfaces:**
- Consumes: `EmptyState` from `@/components/common`.
- Produces: two migrated table empty states that preserve existing copy and `colspan`.

- [ ] **Step 1: Replace training application empty cell**

Use:

```vue
<EmptyState as="td" variant="cell" :colspan="8" title="暂无符合条件的培训申请" />
```

- [ ] **Step 2: Replace practice application empty cell**

Use:

```vue
<EmptyState as="td" variant="cell" :colspan="7" title="暂无符合条件的实践申请" />
```

- [ ] **Step 3: Remove unused local `.empty-cell` CSS only from migrated pages**

Keep unrelated page styles unchanged.

- [ ] **Step 4: Update docs**

Record E15 pilot scope and note that only two low-risk table empty states have moved to the shared component.

- [ ] **Step 5: Verify**

Run:

```bash
cd frontend
npm run test
npm run typecheck
npm run build
```

Expected: all commands exit 0.
