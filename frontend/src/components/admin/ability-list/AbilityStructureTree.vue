<script setup lang="ts">
import { AdminTree } from '@/components/admin-ui'
import type { AbilityTreeNode } from './types'
import iconAbilityStructure from '@/assets/admin/ability-list-base-assets/icons/icon-ability-structure.svg'

const props = withDefaults(
  defineProps<{
    title?: string
    nodes: AbilityTreeNode[]
    selectedKey: string
    defaultExpandedKeys?: string[]
  }>(),
  {
    title: '能力结构',
    defaultExpandedKeys: () => [],
  },
)

const emit = defineEmits<{
  (event: 'select', key: string): void
  (event: 'toggle', key: string, expanded: boolean): void
}>()

function handleNodeClick(item: AbilityTreeNode) {
  const firstChild = item.children?.[0]
  if (firstChild) {
    emit('select', firstChild.key)
    emit('toggle', item.key, true)
    return
  }

  emit('select', item.key)
}

function isParentActive(item: AbilityTreeNode) {
  return item.children?.some(child => child.key === props.selectedKey) ?? false
}
</script>

<template>
  <aside class="ability-structure-panel admin-card">
    <header class="admin-card-header">
      <span class="card-icon admin-card-icon">
        <img class="title-icon" :src="iconAbilityStructure" alt="" />
      </span>
      <h3 class="admin-card-title">{{ title }}</h3>
    </header>

    <AdminTree
      class="ability-tree"
      :data="nodes"
      node-key="key"
      :current-node-key="selectedKey"
      :default-expanded-keys="defaultExpandedKeys"
      @node-click="handleNodeClick"
    >
      <template #default="{ data }">
        <span
          class="ability-node-content"
          :class="{ active: isParentActive(data) }"
        >
          <img v-if="data.icon" class="ability-icon" :src="data.icon" alt="" />
          <span>{{ data.label }}</span>
        </span>
      </template>
    </AdminTree>
  </aside>
</template>

<style scoped>
.ability-structure-panel {
  min-height: clamp(280px, 18vw, 340px);
  padding: clamp(18px, 1.2vw, 22px) clamp(16px, 1.1vw, 20px);
}

.card-icon {
  flex: none;
}

.title-icon {
  width: 22px;
  height: 22px;
  display: block;
}

.ability-tree {
  padding-top: 12px;
}

.ability-node-content {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--space-admin-sm);
  color: #263856;
  font-weight: 800;
}

.ability-node-content.active {
  color: var(--color-primary);
}

:deep(.el-tree-node__content) {
  padding-right: 10px;
}

.ability-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}
</style>
