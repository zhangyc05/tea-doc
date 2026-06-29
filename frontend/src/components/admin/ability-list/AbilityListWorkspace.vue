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
  }>(),
  {
    basisColumnTitle: '建议依据',
    defaultExpandedKeys: () => [],
    actionText: '编辑',
    showAction: true,
  },
)

const emit = defineEmits<{
  (event: 'select-ability', key: string): void
  (event: 'row-click', row: AbilityIndicator): void
  (event: 'edit-indicator', row: AbilityIndicator): void
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
</script>

<template>
  <div class="ability-list-workspace">
    <AbilityStructureTree
      :nodes="nodes"
      :selected-key="selectedKey"
      :default-expanded-keys="defaultExpandedKeys"
      @select="handleSelectAbility"
    />

    <AbilityIndicatorTable
      :title="selectedTitle"
      :icon="selectedIcon"
      :description="selectedDescription"
      :rows="indicators"
      :basis-column-title="basisColumnTitle"
      :action-text="actionText"
      :show-action="showAction"
      @row-click="handleRowClick"
      @edit="handleEditIndicator"
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
