<template>
  <div class="design-sidebar">
    <!-- Navigation Items -->
    <nav class="nav" role="navigation" aria-label="设计系统导航">
      <div v-for="item in navItems" :key="item.id" class="nav-item">
        <!-- Group with children -->
        <div v-if="item.children && item.children.length > 0" class="nav-group">
          <button
            :class="[
              'nav-group-header',
              { 'is-expanded': expandedGroups.has(item.id) }
            ]"
            :aria-expanded="expandedGroups.has(item.id)"
            @click="toggleGroup(item.id)"
          >
            <span class="nav-group-icon">{{ item.icon }}</span>
            <span class="nav-group-title">{{ item.title }}</span>
            <span class="nav-group-arrow">
              {{ expandedGroups.has(item.id) ? '▼' : '▶' }}
            </span>
          </button>

          <div
            v-if="expandedGroups.has(item.id)"
            class="nav-children"
          >
            <button
              v-for="child in item.children"
              :key="child.id"
              :class="[
                'nav-child',
                { 'is-selected': selectedId === child.id }
              ]"
              :aria-selected="selectedId === child.id"
              :tabindex="selectedId === child.id ? 0 : -1"
              role="menuitem"
              @click="selectItem(child)"
            >
              <span v-if="child.icon" class="nav-child-icon">{{ child.icon }}</span>
              <span class="nav-child-title">{{ child.title }}</span>
            </button>
          </div>
        </div>

        <!-- Single item without children -->
        <button
          v-else
          :class="[
            'nav-single',
            { 'is-selected': selectedId === item.id }
          ]"
          :aria-selected="selectedId === item.id"
          :tabindex="selectedId === item.id ? 0 : -1"
          role="menuitem"
          @click="selectItem(item)"
        >
          <span v-if="item.icon" class="nav-single-icon">{{ item.icon }}</span>
          <span class="nav-single-title">{{ item.title }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { NavItem } from '@/lib/design-system/types'

// Props
interface Props {
  navItems: NavItem[]
}

const props = withDefaults(defineProps<Props>(), {
  navItems: () => []
})

// Emits
interface Emits {
  (e: 'select', item: NavItem): void
}

const emit = defineEmits<Emits>()

// State
const selectedId = ref<string>('')
const expandedGroups = ref<Set<string>>(new Set())

// Methods
const toggleGroup = (groupId: string): void => {
  const newSet = new Set(expandedGroups.value)
  if (newSet.has(groupId)) {
    newSet.delete(groupId)
  } else {
    newSet.add(groupId)
  }
  expandedGroups.value = newSet
}

const selectItem = (item: NavItem): void => {
  selectedId.value = item.id
  emit('select', item)
}

// Lifecycle - On mount, expand first group and select first item
onMounted(() => {
  if (props.navItems.length > 0) {
    const firstItem = props.navItems[0]

    // If first item has children, expand it
    if (firstItem.children && firstItem.children.length > 0) {
      expandedGroups.value.add(firstItem.id)

      // Select the first child
      const firstChild = firstItem.children[0]
      if (firstChild) {
        selectedId.value = firstChild.id
        emit('select', firstChild)
      }
    } else {
      // Otherwise select the first item itself
      selectedId.value = firstItem.id
      emit('select', firstItem)
    }
  }
})
</script>

<style scoped>
.design-sidebar {
  /* Sidebar width: 280px - fixed width for consistent design system layout */
  width: 280px;
  height: 100vh;
  overflow-y: auto;
  background-color: var(--color-card-bg);
  border-right: 1px solid var(--color-card-border);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.nav-item {
  display: flex;
  flex-direction: column;
}

/* Group styles */
.nav-group {
  display: flex;
  flex-direction: column;
}

.nav-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.nav-group-header:hover {
  background-color: var(--color-page-bg-soft);
}

.nav-group-icon {
  font-size: 16px;
  line-height: 1;
}

.nav-group-title {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.nav-group-arrow {
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: transform 0.2s ease;
}

.nav-group-header.is-expanded .nav-group-arrow {
  transform: rotate(90deg);
}

/* Children styles */
.nav-children {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  padding-left: 24px;
}

.nav-child {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.nav-child:hover {
  background-color: var(--color-page-bg-soft);
}

.nav-child.is-selected {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.nav-child-icon {
  font-size: 14px;
  line-height: 1;
}

.nav-child-title {
  flex: 1;
  font-size: 14px;
  color: var(--color-text-primary);
}

.nav-child.is-selected .nav-child-title {
  color: var(--color-primary);
  font-weight: 600;
}

/* Single item styles */
.nav-single {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.nav-single:hover {
  background-color: var(--color-page-bg-soft);
}

.nav-single.is-selected {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.nav-single-icon {
  font-size: 16px;
  line-height: 1;
}

.nav-single-title {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.nav-single.is-selected .nav-single-title {
  color: var(--color-primary);
}

/* Scrollbar styling */
.design-sidebar::-webkit-scrollbar {
  width: 6px;
}

.design-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.design-sidebar::-webkit-scrollbar-thumb {
  background: var(--color-card-border);
  border-radius: 3px;
}

.design-sidebar::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-secondary);
}
</style>
