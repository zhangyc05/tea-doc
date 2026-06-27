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
      <div class="brand-mark">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3 27 7.5v8.2c0 6.6-4.3 10.8-11 13.3C9.3 26.5 5 22.3 5 15.7V7.5L16 3Z" />
          <path d="M11 11.5h10M11 16h10M13 20.5h6" />
        </svg>
      </div>
      <h1>教师综合发展平台</h1>
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
            <span class="sub-dot" />
            <strong>{{ child.label }}</strong>
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="collapse-entry">
      <span>≪</span>
      <strong>收起菜单</strong>
    </div>
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
  gap: clamp(12px, 0.85vw, 16px);
  border-bottom: 1px solid var(--color-card-border);
  padding: 0 clamp(20px, 1.75vw, 34px);
}

.brand-mark {
  display: flex;
  width: clamp(38px, 2.35vw, 46px);
  height: clamp(38px, 2.35vw, 46px);
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eaf2ff;
  color: var(--color-primary);
}

.brand-mark svg {
  width: clamp(28px, 1.75vw, 34px);
  height: clamp(28px, 1.75vw, 34px);
  fill: none;
  stroke: currentColor;
  stroke-width: 2.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sidebar-brand h1 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(16px, 1.02vw, 20px);
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: clamp(26px, 2.7vw, 52px) clamp(14px, 0.95vw, 18px) 22px;
}

.nav-group + .nav-group {
  margin-top: clamp(8px, 0.58vw, 12px);
}

.nav-group.expanded {
  margin-bottom: clamp(4px, 0.38vw, 8px);
}

.nav-item {
  display: flex;
  width: 100%;
  height: clamp(46px, 2.75vw, 54px);
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: 10px;
  background: transparent;
  padding: 0 clamp(15px, 1vw, 20px);
  color: #1e2b45;
  font-family: inherit;
  font-size: clamp(15px, 0.95vw, 17px);
  font-weight: 800;
  text-decoration: none;
  transition: 0.18s ease;
}

.nav-item:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.nav-item.active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.nav-group.expanded > .nav-item.active {
  background: #eaf2ff;
  color: var(--color-primary);
}

.nav-item.disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.nav-leading {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: clamp(13px, 0.9vw, 18px);
}

.nav-icon {
  display: inline-flex;
  width: clamp(21px, 1.25vw, 24px);
  height: clamp(21px, 1.25vw, 24px);
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
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}

.nav-arrow svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
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
  height: 30px;
  align-items: center;
  gap: 0;
  border-radius: 8px;
  padding: 0 12px;
  color: #748198;
  font-size: clamp(13px, 0.75vw, 14px);
  font-weight: 700;
  text-decoration: none;
  transition: 0.16s ease;
}

.sub-item + .sub-item {
  margin-top: 4px;
}

.sub-item:hover {
  background: rgba(234, 242, 255, 0.68);
  color: var(--color-primary);
}

.sub-dot {
  display: none;
}

.sub-item.active {
  background: #f2f7ff;
  color: var(--color-primary);
}

.sub-item.active .sub-dot {
  display: none;
}

.sub-item strong {
  font-weight: 800;
}

.collapse-entry {
  display: flex;
  height: clamp(76px, 5.2vw, 100px);
  align-items: center;
  gap: clamp(14px, 1vw, 20px);
  border-top: 1px solid var(--color-card-border);
  padding: 0 clamp(22px, 1.75vw, 34px);
  color: #263856;
  font-size: clamp(15px, 0.9vw, 17px);
}

.collapse-entry span {
  color: #426089;
  font-size: clamp(20px, 1.25vw, 24px);
  font-weight: 900;
}

.collapse-entry strong {
  font-weight: 900;
}
</style>