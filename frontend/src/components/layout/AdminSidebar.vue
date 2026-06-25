<script setup lang="ts">
interface AdminNavItem {
  key: string
  label: string
  children?: AdminNavItem[]
}

withDefaults(
  defineProps<{
    activeKey?: string
  }>(),
  {
    activeKey: 'training-resources',
  },
)

const navItems: AdminNavItem[] = [
  { key: 'home', label: '首页' },
  { key: 'ability-list', label: '能力清单' },
  { key: 'archive', label: '成长档案' },
  {
    key: 'training',
    label: '培训管理',
    children: [
      { key: 'training-records', label: '记录总览' },
      { key: 'training-demands', label: '需求管理' },
      { key: 'training-resources', label: '资源库' },
      { key: 'training-applications', label: '申请处理' },
    ],
  },
  { key: 'practice', label: '企业实践管理' },
  { key: 'virtual-research', label: '虚拟教研' },
  { key: 'ability-profile', label: '能力画像' },
  { key: 'reports', label: '分析报告' },
]

function isActive(item: AdminNavItem, activeKey: string) {
  if (item.key === activeKey) return true
  return item.children?.some((child) => child.key === activeKey) ?? false
}
</script>

<template>
  <aside class="sticky top-0 flex h-screen w-[var(--admin-sidebar-width)] shrink-0 flex-col border-r border-card-border bg-card">
    <div class="border-b border-card-border px-5 py-5">
      <p class="text-xs font-medium text-primary">教师综合发展平台</p>
      <h1 class="mt-1 text-lg font-semibold text-text-primary">管理端</h1>
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      <div v-for="item in navItems" :key="item.key" class="space-y-1">
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors"
          :class="isActive(item, activeKey) ? 'bg-primary-soft font-medium text-primary' : 'text-text-secondary hover:bg-page-soft hover:text-text-primary'"
        >
          <span>{{ item.label }}</span>
        </button>

        <div v-if="item.children" class="ml-3 space-y-1 border-l border-card-border pl-3">
          <button
            v-for="child in item.children"
            :key="child.key"
            type="button"
            class="block w-full rounded-md px-3 py-2 text-left text-sm transition-colors"
            :class="child.key === activeKey ? 'bg-primary text-white shadow-card' : 'text-text-secondary hover:bg-primary-soft hover:text-text-primary'"
          >
            {{ child.label }}
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>
