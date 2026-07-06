<script setup lang="ts">
import { AdminIcon, AdminTree } from '@/components/admin-ui'
import type { AbilityTreeNode } from './types'
import iconAbilityStructure from '@/assets/admin/ability-list-base-assets/icons/icon-ability-structure.svg'

const props = withDefaults(
  defineProps<{
    title?: string
    nodes: AbilityTreeNode[]
    selectedKey: string
    defaultExpandedKeys?: string[]
    showActions?: boolean
  }>(),
  {
    title: '能力结构',
    defaultExpandedKeys: () => [],
    showActions: false,
  },
)

const emit = defineEmits<{
  (event: 'select', key: string): void
  (event: 'toggle', key: string, expanded: boolean): void
  (event: 'add-dimension'): void
  (event: 'edit-node', node: AbilityTreeNode): void
  (event: 'delete-node', node: AbilityTreeNode): void
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
      <button
        v-if="showActions"
        class="structure-add-action"
        type="button"
        aria-label="新增维度"
        title="新增维度"
        @click.stop="emit('add-dimension')"
      >
        <AdminIcon name="plus" />
      </button>
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
          <span class="node-main">
            <img v-if="data.icon" class="ability-icon" :src="data.icon" alt="" />
            <span class="node-label">{{ data.label }}</span>
          </span>
          <span v-if="showActions" class="node-actions">
            <button
              class="node-action"
              type="button"
              aria-label="编辑维度"
              title="编辑维度"
              @click.stop="emit('edit-node', data)"
            >
              <AdminIcon name="edit" />
            </button>
            <button
              class="node-action"
              type="button"
              aria-label="删除维度"
              title="删除维度"
              @click.stop="emit('delete-node', data)"
            >
              <AdminIcon name="delete" />
            </button>
          </span>
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

.admin-card-header {
  align-items: center;
}

.structure-add-action {
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  border: 1px solid rgba(18, 104, 246, 0.16);
  border-radius: var(--radius-admin-panel);
  background: #eef5ff;
  color: var(--color-primary);
  cursor: pointer;
  transition: background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.structure-add-action:hover {
  background: #e3efff;
  box-shadow: 0 8px 18px rgba(18, 104, 246, 0.12);
  transform: translateY(-1px);
}

.structure-add-action :deep(svg) {
  width: 16px;
  height: 16px;
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
  justify-content: space-between;
  gap: var(--space-admin-xs);
  color: #263856;
  font-weight: 800;
}

.ability-node-content.active {
  color: var(--color-primary);
}

:deep(.el-tree-node__content) {
  padding-right: 10px;
}

.node-main {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-admin-sm);
}

.node-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ability-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.node-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}

.ability-node-content:hover .node-actions,
.ability-node-content.active .node-actions {
  opacity: 1;
  pointer-events: auto;
}

.node-action {
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: #6b7a90;
  cursor: pointer;
}

.node-action:hover {
  background: rgba(18, 104, 246, 0.1);
  color: var(--color-primary);
}

.node-action :deep(svg) {
  width: 14px;
  height: 14px;
}
</style>
