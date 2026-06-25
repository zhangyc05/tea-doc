<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface AdminNavItem {
  key: string
  label: string
  to?: string
  icon?: string
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
  { key: 'home', label: '首页', to: '/admin/training/resources', icon: '⌂' },
  { key: 'ability-list', label: '能力清单', to: '/admin/ability-list/execution', icon: '▣' },
  { key: 'archive', label: '成长档案', to: '/admin/archive/records', icon: '◎' },
  { key: 'reflection', label: '教学反思', icon: '▤' },
  {
    key: 'training',
    label: '培训管理',
    to: '/admin/training/resources',
    icon: '◆',
    children: [
      { key: 'training-plans', label: '计划管理', to: '/admin/training/records' },
      { key: 'training-demands', label: '需求管理', to: '/admin/training/demands' },
      { key: 'training-resources', label: '资源库', to: '/admin/training/resources' },
      { key: 'training-applications', label: '申请处理', to: '/admin/training/applications' },
      { key: 'training-records', label: '记录总览', to: '/admin/training/records' },
    ],
  },
  { key: 'practice', label: '企业实践', icon: '♙' },
  { key: 'virtual-research', label: '虚拟教研', icon: '⚙' },
  { key: 'reports', label: '分析报告', to: '/admin/reports', icon: '▥' },
  { key: 'system', label: '系统管理', icon: '⚙' },
]

function isActive(item: AdminNavItem, activeKey: string) {
  if (item.key === activeKey) return true
  return item.children?.some((child) => child.key === activeKey) ?? false
}

function itemClass(active: boolean) {
  return active
    ? 'bg-primary font-semibold text-white shadow-card'
    : 'text-[#44567A] hover:bg-primary-soft hover:text-primary'
}

function childClass(active: boolean) {
  return active
    ? 'bg-primary-soft font-semibold text-primary'
    : 'text-[#52627F] hover:bg-primary-soft hover:text-primary'
}
</script>

<template>
  <aside class="sticky top-0 flex h-screen w-[var(--admin-sidebar-width)] shrink-0 flex-col border-r border-card-border bg-card">
    <div class="flex h-[68px] items-center gap-3 border-b border-card-border px-5">
      <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-primary-light bg-primary-soft text-lg font-bold text-primary">
        盾
      </div>
      <h1 class="text-lg font-semibold leading-none text-text-primary">教师综合发展平台</h1>
    </div>

    <nav class="flex-1 space-y-2 overflow-y-auto px-3 py-5">
      <div v-for="item in navItems" :key="item.key" class="space-y-2">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors"
          :class="itemClass(isActive(item, activeKey))"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span class="flex h-5 w-5 shrink-0 items-center justify-center text-base leading-none">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </span>
          <span v-if="item.children" class="text-xs">⌃</span>
        </RouterLink>

        <button
          v-else
          type="button"
          disabled
          class="flex w-full cursor-not-allowed items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-text-disabled"
          :class="isActive(item, activeKey) ? 'bg-primary-soft font-semibold text-primary' : ''"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span class="flex h-5 w-5 shrink-0 items-center justify-center text-base leading-none">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </span>
        </button>

        <div v-if="item.children" class="space-y-1 pl-7">
          <RouterLink
            v-for="child in item.children"
            :key="child.key"
            :to="child.to || item.to || '/admin/training/resources'"
            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors"
            :class="childClass(child.key === activeKey)"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="child.key === activeKey ? 'bg-primary' : 'bg-[#9AA8BF]'" />
            <span>{{ child.label }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="border-t border-card-border px-5 py-4 text-sm font-medium text-[#334467]">
      ‹ 收起菜单
    </div>
  </aside>
</template>
