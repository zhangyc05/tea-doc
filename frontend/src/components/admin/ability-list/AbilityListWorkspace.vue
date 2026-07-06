<script setup lang="ts">
import AbilityStructureTree from './AbilityStructureTree.vue'
import AbilityIndicatorTable from './AbilityIndicatorTable.vue'
import type { AbilityTreeNode, AbilityIndicator } from './types'

const props = withDefaults(
  defineProps<{
    nodes: AbilityTreeNode[]
    selectedKey: string
    selectedTitle: string
    selectedIcon?: string
    selectedDescription?: string
    indicators: AbilityIndicator[]
    basisColumnTitle?: string
    defaultExpandedKeys?: string[]
    actionText?: string
    showAction?: boolean
    showDeleteAction?: boolean
    showStructureActions?: boolean
  }>(),
  {
    basisColumnTitle: '建议依据',
    defaultExpandedKeys: () => [],
    actionText: '编辑',
    showAction: true,
    showDeleteAction: false,
    showStructureActions: false,
  },
)

const emit = defineEmits<{
  (event: 'select-ability', key: string): void
  (event: 'row-click', row: AbilityIndicator): void
  (event: 'edit-indicator', row: AbilityIndicator): void
  (event: 'delete-indicator', row: AbilityIndicator): void
  (event: 'add-dimension'): void
  (event: 'edit-node', node: AbilityTreeNode): void
  (event: 'delete-node', node: AbilityTreeNode): void
}>()

function handleSelectAbility(key: string) {
  emit('select-ability', key)
}

function handleRowClick(row: AbilityIndicator) {
  emit('row-click', row)
}

function handleEditIndicator(row: AbilityIndicator) {
  emit('edit-indicator', row)
}

function handleDeleteIndicator(row: AbilityIndicator) {
  emit('delete-indicator', row)
}
</script>

<template>
  <div class="ability-list-workspace">
    <AbilityStructureTree
      :nodes="nodes"
      :selected-key="selectedKey"
      :default-expanded-keys="defaultExpandedKeys"
      :show-actions="showStructureActions"
      @select="handleSelectAbility"
      @add-dimension="emit('add-dimension')"
      @edit-node="node => emit('edit-node', node)"
      @delete-node="node => emit('delete-node', node)"
    />

    <AbilityIndicatorTable
      :title="selectedTitle"
      :icon="selectedIcon"
      :description="selectedDescription"
      :rows="indicators"
      :basis-column-title="basisColumnTitle"
      :action-text="actionText"
      :show-action="showAction"
      :show-delete-action="showDeleteAction"
      @row-click="handleRowClick"
      @edit="handleEditIndicator"
      @delete="handleDeleteIndicator"
    />
  </div>
</template>

<style scoped>
.ability-list-workspace {
  display: grid;
  grid-template-columns: minmax(270px, 21.5%) minmax(0, 1fr);
  gap: clamp(18px, 1.25vw, 24px);
}
</style>
