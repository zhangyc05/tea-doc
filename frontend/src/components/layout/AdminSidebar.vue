<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface AdminNavItem {
  key: string
  label: string
  to?: string
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
  { key: 'home', label: '首页', to: '/admin/training/resources' },
  { key: 'ability-list', label: '能力清单', to: '/admin/ability-list/execution' },
  { key: 'archive', label: '成长档案', to: '/admin/archive/records' },
  {
    key: 'training',
    label: '培训管理',
    to: '/admin/training/resources',
    children: [
      { key: 'training-records', label: '记录总览', to: '/admin/training/records' },
      { key: 'training-demands', label: '需求管理', to: '/admin/training/demands' },
      { key: 'training-resources', label: '资源库', to: '/admin/training/resources' },
      { key: 'training-applications', label: '申请处理', to: '/admin/training/applications' },
    ],
  },
  { key: 'practice', label: '企业实践管理' },
  { key: 'virtual-research', label: '虚拟教研' },
  { key: 'ability-profile', label: '能力画像', to: '/admin/ability-profile/school' },
  { key: 'reports', label: '分析报告', to: '/admin/reports' },
]

function isActive(item: AdminNavItem, activeKey: string) {
  if (item.key === activeKey) return true
  return item.children?.some((child) => child.key === activeKey) ?? false
}

function itemClass(active: boolean) {
  return active
    ? 'bg-primary-soft font-semibold text-primary'
    : 'text-text-secondary hover:bg-page-soft hover:text-text-primary'
}

function childClass(active: boolean) {
  return active
    ? 'bg-primary text-white shadow-card'
    : 'text-text-secondary hover:bg-primary-soft hover:text-text-primary'
}
</script>

<template>
  <aside class="sticky top-0 flex h-screen w-[var(--admin-sidebar-width)] shrink-0 flex-col border-r border-card-border bg-card">
    <div class="border-b border-card-border px-5 py-5">
      <p class="text-xs font-semibold text-primary">教师综合发展平台</p>
      <h1 class="mt-2 text-lg font-semibold leading-none text-text-primary">管理端</h1>
    </div>

    <nav class="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
      <div v-for="item in navItems" :key="item.key" class="space-y-1.5">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors"
          :class="itemClass(isActive(item, activeKey))"
        >
          <span>{{ item.label }}</span>
        </RouterLink>

        <button
          v-else
          type="button"
          disabled
          class="flex w-full cursor-not-allowed items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-text-disabled"
          :class="isActive(item, activeKey) ? 'bg-primary-soft font-semibold text-primary' : ''"
        >
          <span>{{ item.label }}</span>
        </button>

        <div v-if="item.children" class="ml-3 space-y-1 border-l border-card-border pl-3">
          <RouterLink
            v-for="child in item.children"
            :key="child.key"
            :to="child.to || item.to || '/admin/training/resources'"
            class="block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors"
            :class="childClass(child.key === activeKey)"
          >
            {{ child.label }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>
