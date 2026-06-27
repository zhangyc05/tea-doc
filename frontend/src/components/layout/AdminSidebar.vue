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
    activeKey: 'home',
  },
)

const navItems: AdminNavItem[] = [
  { key: 'home', label: '首页', to: '/admin/training/resources', icon: 'home' },
  {
    key: 'ability-list',
    label: '能力清单',
    to: '/admin/ability-list/execution',
    icon: 'list',
    children: [
      { key: 'ability-list-base', label: '基准模板', to: '/admin/ability-list/base' },
      { key: 'ability-list-execution', label: '执行版', to: '/admin/ability-list/execution' },
    ],
  },
  { key: 'archive', label: '成长档案', to: '/admin/archive/records', icon: 'archive' },
  { key: 'ability-profile', label: '能力画像', to: '/admin/ability-profile/school', icon: 'profile' },
  { key: 'reflection', label: '教学反思', to: '/admin/reflection', icon: 'reflection' },
  { key: 'practice', label: '企业实践', to: '/admin/practice', icon: 'practice' },
  { key: 'virtual-lab', label: '虚拟教研室', to: '/admin/virtual-lab', icon: 'lab' },
  { key: 'reports', label: '分析报告', to: '/admin/reports', icon: 'report' },
  { key: 'system', label: '系统管理', icon: 'system' },
]

function isActive(item: AdminNavItem, activeKey: string) {
  if (item.key === activeKey) return true
  return item.children?.some((child) => child.key === activeKey) ?? false
}
</script>

<template>
  <aside class="admin-sidebar">
    <div class="sidebar-brand">
      <div class="brand-main">
        <div class="brand-mark">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 3 27 7.5v8.2c0 6.6-4.3 10.8-11 13.3C9.3 26.5 5 22.3 5 15.7V7.5L16 3Z" />
            <path d="M11 11.5h10M11 16h10M13 20.5h6" />
          </svg>
        </div>
        <h1>教师综合发展</h1>
      </div>

      <button class="sidebar-toggle" type="button" aria-label="收起侧栏" title="收起侧栏">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <rect x="3" y="3" width="14" height="14" rx="4" />
          <path d="M9 4.5v11" />
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <div v-for="item in navItems" :key="item.key" class="nav-group" :class="{ expanded: item.children && isActive(item, activeKey) }">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: isActive(item, activeKey), disabled: !item.to }"
        >
          <span class="nav-leading">
            <span class="nav-icon" :class="`icon-${item.icon}`">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path v-if="item.icon === 'home'" d="M4 11.5 12 5l8 6.5V20H6v-8" />
                <path v-else-if="item.icon === 'list'" d="M6 5h12v14H6zM9 9h6M9 13h6" />
                <path v-else-if="item.icon === 'archive'" d="M5 6h14v4H5zM7 10h10v9H7zM10 14h4" />
                <path v-else-if="item.icon === 'reflection'" d="M9 5h6v3H9zM7 9h10v2H7zM5 13h14v2H5zM6 17h12v2H6z" />
                <path v-else-if="item.icon === 'practice'" d="M5 5h14v14H5zM7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
                <path v-else-if="item.icon === 'lab'" d="M12 3 8 7l3 3-5 7h12l-5-7 3-3-4-4z" />
                <path v-else-if="item.icon === 'profile'" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4v4l3 2" />
                <path v-else-if="item.icon === 'report'" d="M6 19V5h12v14H6Zm3-3V9m3 7v-5m3 5v-8" />
                <path v-else d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6" />
              </svg>
            </span>
            <span>{{ item.label }}</span>
          </span>
          <span v-if="item.children" class="nav-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M4 10 8 6l4 4" />
            </svg>
          </span>
        </RouterLink>

        <button v-else type="button" disabled class="nav-item disabled">
          <span class="nav-leading">
            <span class="nav-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14v12H5zM8 11h8M8 15h5" /></svg></span>
            <span>{{ item.label }}</span>
          </span>
        </button>

        <div v-if="item.children" class="sub-nav">
          <RouterLink
            v-for="child in item.children"
            :key="child.key"
            :to="child.to || item.to || '/admin/training/resources'"
            class="sub-item"
            :class="{ active: child.key === activeKey }"
          >
            <strong>{{ child.label }}</strong>
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
  display: flex;
  width: var(--admin-sidebar-width);
  height: 100vh;
  flex-shrink: 0;
  flex-direction: column;
  border-right: 1px solid var(--color-card-border);
  background: rgba(255, 255, 255, 0.98);
}

.sidebar-brand {
  display: flex;
  height: var(--admin-topbar-height);
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--color-card-border);
  padding: 0 18px 0 24px;
}

.brand-main {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
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
  stroke-width: 2.15;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sidebar-brand h1 {
  margin: 0;
  overflow: hidden;
  color: var(--color-text-primary);
  font-size: 17px;
  font-weight: 900;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-toggle {
  display: inline-flex;
  width: 30px;
  height: 30px;
  flex: none;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7dfea;
  border-radius: 8px;
  background: #fff;
  color: #8795aa;
  cursor: pointer;
  transition: 0.18s ease;
}

.sidebar-toggle:hover {
  background: #f7f9ff;
  color: var(--color-primary);
}

.sidebar-toggle svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 24px 16px 18px;
}

.nav-group + .nav-group {
  margin-top: 6px;
}

.nav-item {
  display: flex;
  width: 100%;
  height: 42px;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: 8px;
  background: transparent;
  padding: 0 14px;
  color: #263856;
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  transition: 0.18s ease;
}

.nav-item:hover {
  background: #f5f8ff;
  color: var(--color-primary);
}

.nav-item.active {
  background: #eaf2ff;
  color: var(--color-primary);
}

/* 父级展开态：能力清单只表达展开，不抢当前页焦点 */
.nav-group.expanded > .nav-item.active {
  background: #f7faff;
  color: var(--color-primary);
  box-shadow: none;
}

.nav-item.disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.nav-leading {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
}

.nav-icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  color: currentColor;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav-arrow {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  opacity: 0.72;
}

.nav-arrow svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sub-nav {
  position: relative;
  margin: 4px 0 0 24px;
  padding: 0;
}

.sub-item {
  display: flex;
  height: 32px;
  align-items: center;
  border-radius: 6px;
  padding: 0 10px;
  color: #7d899b;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: 0.16s ease;
}

.sub-item + .sub-item {
  margin-top: 2px;
}

.sub-item:hover {
  background: #f6f9ff;
  color: var(--color-primary);
}

.sub-item.active {
  background: #f2f7ff;
  color: var(--color-primary);
}

.sub-item strong {
  font-weight: 800;
}
</style>