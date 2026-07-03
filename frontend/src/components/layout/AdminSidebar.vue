<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

interface AdminNavItem {
  key: string
  label: string
  to?: string
  icon?: string
  children?: AdminNavItem[]
}

const props = withDefaults(
  defineProps<{
    activeKey?: string
    collapsed?: boolean
  }>(),
  {
    activeKey: 'home',
    collapsed: false,
  },
)

const emit = defineEmits<{
  (event: 'toggle'): void
  (event: 'navigate'): void
}>()

const router = useRouter()

const navItems: AdminNavItem[] = [
  { key: 'home', label: '首页', to: '/admin/ability-list/base', icon: 'home' },
  {
    key: 'ability-list',
    label: '能力清单',
    icon: 'list',
    children: [
      { key: 'ability-list-base', label: '基准模板', to: '/admin/ability-list/base' },
      { key: 'ability-list-execution', label: '执行版', to: '/admin/ability-list/execution' },
    ],
  },
  {
    key: 'archive',
    label: '成长档案',
    icon: 'archive',
    children: [
      { key: 'archive-processing', label: '档案处理', to: '/admin/archive/processing' },
      { key: 'archive-query', label: '档案查询', to: '/admin/archive/query' },
    ],
  },
  {
    key: 'ability-profile',
    label: '能力画像',
    icon: 'profile',
    children: [
      { key: 'ability-profile-group', label: '群体画像', to: '/admin/ability-profile/group' },
      { key: 'ability-profile-teacher', label: '教师画像', to: '/admin/ability-profile/teacher' },
    ],
  },
  { key: 'reflection', label: '教学反思', to: '/admin/reflection', icon: 'reflection' },
  {
    key: 'training',
    label: '培训管理',
    to: '/admin/training/resources',
    icon: 'training',
    children: [
      { key: 'training-plans', label: '计划管理', to: '/admin/training/plans' },
      { key: 'training-demands', label: '需求管理', to: '/admin/training/demands' },
      { key: 'training-resources', label: '资源库', to: '/admin/training/resources' },
      { key: 'training-applications', label: '申请处理', to: '/admin/training/applications' },
      { key: 'training-records', label: '记录总览', to: '/admin/training/records' },
    ],
  },
  {
    key: 'practice',
    label: '企业实践',
    icon: 'practice',
    children: [
      { key: 'practice-tracking', label: '年度实践跟踪', to: '/admin/practice/tracking' },
      { key: 'practice-applications', label: '申请处理', to: '/admin/practice/applications' },
      { key: 'practice-records', label: '记录总览', to: '/admin/practice/records' },
    ],
  },
  { key: 'virtual-lab', label: '虚拟教研室', to: '/admin/virtual-lab', icon: 'lab' },
  { key: 'reports', label: '分析报告', to: '/admin/reports', icon: 'report' },
]

const expandedKeys = ref<Set<string>>(new Set())

function getParentKeyByActiveKey(activeKey: string) {
  return navItems.find((item) => {
    if (item.key === activeKey) return true
    return item.children?.some((child) => child.key === activeKey)
  })?.key
}

function isExpanded(item: AdminNavItem) {
  return expandedKeys.value.has(item.key)
}

function toggleGroup(key: string) {
  const next = new Set(expandedKeys.value)

  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }

  expandedKeys.value = next
}

watch(
  () => props.activeKey,
  (activeKey) => {
    const parentKey = getParentKeyByActiveKey(activeKey || '')
    if (!parentKey) return

    const next = new Set(expandedKeys.value)
    next.add(parentKey)
    expandedKeys.value = next
  },
  { immediate: true },
)

function isActive(item: AdminNavItem, activeKey: string) {
  if (item.key === activeKey) return true
  return item.children?.some((child) => child.key === activeKey) ?? false
}

function getFirstTarget(item: AdminNavItem) {
  return item.to || item.children?.[0]?.to
}

function handleParentAction(item: AdminNavItem) {
  if (props.collapsed) {
    const target = getFirstTarget(item)
    if (target) router.push(target)
    emit('navigate')
    return
  }

  if (item.children?.length) {
    toggleGroup(item.key)
    return
  }

  const target = getFirstTarget(item)
  if (target) router.push(target)
}
</script>

<template>
  <aside class="admin-sidebar" :class="{ collapsed: props.collapsed }">
    <div class="sidebar-brand">
      <div class="brand-main">
        <div class="brand-mark">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 3 27 7.5v8.2c0 6.6-4.3 10.8-11 13.3C9.3 26.5 5 22.3 5 15.7V7.5L16 3Z" />
            <path d="M11 11.5h10M11 16h10M13 20.5h6" />
          </svg>
        </div>
        <h1 v-if="!props.collapsed">教师综合发展</h1>
      </div>

      <button
        v-if="!props.collapsed"
        class="sidebar-toggle"
        type="button"
        aria-label="收起边栏"
        title="收起边栏"
        @click="emit('toggle')"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <rect x="3" y="3" width="14" height="14" rx="4" />
          <path d="M9 4.5v11" />
        </svg>
      </button>
    </div>

    <button
      v-if="props.collapsed"
      class="rail-toggle tooltip-host"
      type="button"
      aria-label="打开边栏"
      data-tooltip="打开边栏"
      @click="emit('toggle')"
    >
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="4" />
        <path d="M9 4.5v11" />
      </svg>
    </button>

    <nav class="sidebar-nav">
      <div v-for="item in navItems" :key="item.key" class="nav-group">
        <div
          v-if="item.children && !props.collapsed"
          class="nav-item nav-parent"
          :class="{ active: isActive(item, activeKey), expanded: isExpanded(item) }"
        >
          <button type="button" class="nav-parent-link" @click="handleParentAction(item)">
            <span class="nav-leading">
              <span class="nav-icon" :class="`icon-${item.icon}`">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path v-if="item.icon === 'home'" d="M4 11.5 12 5l8 6.5V20H6v-8" />
                  <path v-else-if="item.icon === 'training'" d="M12 3 6 7v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7l-6-4Zm0 2.5 4.5 3H7.5L12 5.5ZM11 9h2v7h-2V9Z" />
                  <path v-else-if="item.icon === 'list'" d="M6 5h12v14H6zM9 9h6M9 13h6" />
                  <path v-else-if="item.icon === 'archive'" d="M5 6h14v4H5zM7 10h10v9H7zM10 14h4" />
                  <path v-else-if="item.icon === 'reflection'" d="M9 5h6v3H9zM7 9h10v2H7zM5 13h14v2H5zM6 17h12v2H6z" />
                  <path v-else-if="item.icon === 'practice'" d="M5 5h14v14H5zM7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
                  <path v-else-if="item.icon === 'lab'" d="M12 3 8 7l3 3-5 7h12l-5-7 3-3-4-4z" />
                  <path v-else-if="item.icon === 'profile'" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4v4l3 2" />
                  <path v-else-if="item.icon === 'report'" d="M6 19V5h12v14H6Zm3-3V9m3 7v-5m3 5v-8" />
                  <path v-else-if="item.icon === 'system'" d="M5 5h14v14H5zM8 9h8M8 13h5" />
                  <path v-else d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6" />
                </svg>
              </span>
              <span class="nav-label">{{ item.label }}</span>
            </span>
          </button>

          <button
            class="nav-arrow-button"
            type="button"
            :aria-label="isExpanded(item) ? `收起${item.label}` : `展开${item.label}`"
            :aria-expanded="isExpanded(item)"
            @click.stop="toggleGroup(item.key)"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 10 8 6l4 4" />
            </svg>
          </button>
        </div>

        <button
          v-else-if="item.children && props.collapsed"
          type="button"
          class="nav-item tooltip-host"
          :class="{ active: isActive(item, activeKey) }"
          :data-tooltip="item.label"
          @click="handleParentAction(item)"
        >
          <span class="nav-leading">
            <span class="nav-icon" :class="`icon-${item.icon}`">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path v-if="item.icon === 'list'" d="M6 5h12v14H6zM9 9h6M9 13h6" />
                <path v-else-if="item.icon === 'archive'" d="M5 6h14v4H5zM7 10h10v9H7zM10 14h4" />
                <path v-else-if="item.icon === 'profile'" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4v4l3 2" />
                <path v-else-if="item.icon === 'training'" d="M12 3 6 7v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7l-6-4Zm0 2.5 4.5 3H7.5L12 5.5ZM11 9h2v7h-2V9Z" />
                <path v-else-if="item.icon === 'practice'" d="M5 5h14v14H5zM7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
                <path v-else d="M5 7h14v12H5zM8 11h8M8 15h5" />
              </svg>
            </span>
          </span>
        </button>

        <RouterLink
          v-else-if="item.to"
          :to="item.to"
          class="nav-item tooltip-host"
          :class="{ active: isActive(item, activeKey) }"
          :data-tooltip="props.collapsed ? item.label : undefined"
          @click="props.collapsed && emit('navigate')"
        >
          <span class="nav-leading">
            <span class="nav-icon" :class="`icon-${item.icon}`">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path v-if="item.icon === 'home'" d="M4 11.5 12 5l8 6.5V20H6v-8" />
                <path v-else-if="item.icon === 'training'" d="M12 3 6 7v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7l-6-4Zm0 2.5 4.5 3H7.5L12 5.5ZM11 9h2v7h-2V9Z" />
                <path v-else-if="item.icon === 'list'" d="M6 5h12v14H6zM9 9h6M9 13h6" />
                <path v-else-if="item.icon === 'archive'" d="M5 6h14v4H5zM7 10h10v9H7zM10 14h4" />
                <path v-else-if="item.icon === 'reflection'" d="M9 5h6v3H9zM7 9h10v2H7zM5 13h14v2H5zM6 17h12v2H6z" />
                <path v-else-if="item.icon === 'practice'" d="M5 5h14v14H5zM7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
                <path v-else-if="item.icon === 'lab'" d="M12 3 8 7l3 3-5 7h12l-5-7 3-3-4-4z" />
                <path v-else-if="item.icon === 'profile'" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4v4l3 2" />
                <path v-else-if="item.icon === 'report'" d="M6 19V5h12v14H6Zm3-3V9m3 7v-5m3 5v-8" />
                <path v-else-if="item.icon === 'system'" d="M5 5h14v14H5zM8 9h8M8 13h5" />
                <path v-else d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6" />
              </svg>
            </span>
            <span v-if="!props.collapsed" class="nav-label">{{ item.label }}</span>
          </span>
        </RouterLink>

        <div v-if="item.children && !props.collapsed && isExpanded(item)" class="sub-nav">
          <RouterLink
            v-for="child in item.children"
            :key="child.key"
            :to="child.to || item.to || '/admin/training/resources'"
            class="sub-item"
            :class="{ active: child.key === activeKey }"
          >
            <span class="sub-dot" aria-hidden="true" />
            <span class="sub-label">{{ child.label }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  width: var(--admin-sidebar-width);
  height: 100vh;
  flex-shrink: 0;
  flex-direction: column;
  overflow: visible;
  border-right: 1px solid var(--color-card-border);
  background: rgba(255, 255, 255, 0.98);
  transition: width 0.18s ease;
}

.admin-sidebar.collapsed {
  width: var(--admin-sidebar-collapsed-width);
}

.sidebar-brand {
  display: flex;
  height: var(--admin-topbar-height);
  align-items: center;
  gap: var(--space-admin-md);
  border-bottom: 1px solid var(--color-card-border);
  padding: 0 18px;
}

.admin-sidebar.collapsed .sidebar-brand {
  justify-content: center;
  padding: 0;
}

.brand-main {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-admin-md);
}

.brand-mark {
  display: flex;
  width: 38px;
  height: 38px;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: #eef5ff;
  color: var(--color-primary);
}

.brand-mark svg {
  width: 27px;
  height: 27px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.15;
}

.brand-main h1 {
  margin: 0;
  overflow: hidden;
  color: var(--color-text-primary);
  font-size: 17px;
  font-weight: 900;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-toggle,
.rail-toggle {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  border: 0;
  color: #263856;
  transition: background 0.16s ease, color 0.16s ease;
}

.sidebar-toggle {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: #f1f5fb;
}

.rail-toggle {
  width: 48px;
  height: 48px;
  margin: 12px auto 0;
  border-radius: var(--radius-lg);
  background: transparent;
}

.sidebar-toggle:hover,
.rail-toggle:hover {
  background: #eaf2ff;
  color: var(--color-primary);
}

.sidebar-toggle svg,
.rail-toggle svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 24px 16px 18px;
}

.admin-sidebar.collapsed .sidebar-nav {
  overflow: visible;
  padding: 18px 10px;
}

.nav-group + .nav-group {
  margin-top: 6px;
}

.admin-sidebar.collapsed .nav-group + .nav-group {
  margin-top: var(--space-admin-sm);
}

.nav-item {
  position: relative;
  display: flex;
  width: 100%;
  height: 42px;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  padding: 0 14px;
  color: #263856;
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.16s ease;
}

.nav-item:hover {
  background: #f5f8ff;
  color: var(--color-primary);
}

.nav-item.active {
  background: #f2f7ff;
  color: var(--color-primary);
}

.admin-sidebar.collapsed .nav-item {
  width: 52px;
  height: 44px;
  justify-content: center;
  padding: 0;
  border-radius: var(--radius-lg);
}

.nav-leading {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-admin-md);
}

.admin-sidebar.collapsed .nav-leading {
  gap: 0;
}

.nav-icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: currentColor;
}

.admin-sidebar.collapsed .nav-icon {
  width: 22px;
  height: 22px;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.nav-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-parent {
  gap: 4px;
  padding: 0 6px 0 14px;
}

.nav-parent-link {
  display: flex;
  min-width: 0;
  flex: 1;
  height: 42px;
  align-items: center;
  border: 0;
  background: transparent;
  padding: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  cursor: pointer;
}

.nav-arrow-button {
  display: inline-flex;
  width: 32px;
  height: 32px;
  flex: none;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--radius-admin-panel);
  background: transparent;
  color: inherit;
  transition: all 0.16s ease;
}

.nav-arrow-button:hover {
  background: #f5f8ff;
  color: var(--color-primary);
}

.nav-arrow-button svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.2;
  transition: transform 0.16s ease;
}

.nav-parent:not(.expanded) .nav-arrow-button svg {
  transform: rotate(180deg);
}

.sub-nav {
  position: relative;
  margin: 6px 0 8px 24px;
  padding: 4px 8px 6px 12px;
  border-radius: var(--radius-lg);
  background: rgba(246, 249, 255, 0.92);
}

.sub-item {
  position: relative;
  z-index: 1;
  display: flex;
  height: 36px;
  align-items: center;
  border-radius: 9px;
  padding: 0 10px 0 28px;
  color: #7f8a9c;
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  transition: color 0.16s ease, background 0.16s ease;
}

.sub-item + .sub-item {
  margin-top: 2px;
}

.sub-dot {
  position: absolute;
  left: 10px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: #aeb8c8;
  box-shadow: 0 0 0 4px rgba(246, 249, 255, 0.96);
  transform: translateY(-50%);
}

.sub-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sub-item:hover {
  background: rgba(238, 245, 255, 0.78);
  color: var(--color-primary);
}

.sub-item.active {
  background: #eef5ff;
  color: var(--color-primary);
}

.sub-item.active .sub-dot {
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  box-shadow: 0 0 0 4px #eef5ff;
}

.admin-sidebar.collapsed .nav-label,
.admin-sidebar.collapsed .brand-main h1,
.admin-sidebar.collapsed .sub-nav {
  display: none;
}

.admin-sidebar.collapsed .tooltip-host {
  position: relative;
}

.admin-sidebar.collapsed .tooltip-host[data-tooltip]::after {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  z-index: 3000;
  display: none;
  transform: translateY(-50%);
  border-radius: var(--radius-admin-panel);
  background: rgba(18, 18, 18, 0.94);
  color: #fff;
  padding: 9px 11px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  content: attr(data-tooltip);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);
}

.admin-sidebar.collapsed .tooltip-host[data-tooltip]::before {
  position: absolute;
  left: calc(100% + 6px);
  top: 50%;
  z-index: 3001;
  display: none;
  width: 0;
  height: 0;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid rgba(18, 18, 18, 0.94);
  content: '';
}

.admin-sidebar.collapsed .tooltip-host[data-tooltip]:hover::after,
.admin-sidebar.collapsed .tooltip-host[data-tooltip]:hover::before {
  display: block;
}
</style>
