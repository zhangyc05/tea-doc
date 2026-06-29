<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AbilityTreeNode } from './types'

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

const expandedKeys = ref<Set<string>>(new Set(props.defaultExpandedKeys))

watch(
  () => props.defaultExpandedKeys,
  (newKeys) => {
    expandedKeys.value = new Set(newKeys)
  },
)

function isExpanded(key: string) {
  return expandedKeys.value.has(key)
}

function toggleGroup(key: string) {
  const next = new Set(expandedKeys.value)

  if (next.has(key)) {
    next.delete(key)
    emit('toggle', key, false)
  } else {
    next.add(key)
    emit('toggle', key, true)
  }

  expandedKeys.value = next
}

function handleNodeClick(key: string) {
  emit('select', key)
}

function handleChildClick(key: string) {
  emit('select', key)
}
</script>

<template>
  <aside class="ability-structure-panel admin-card">
    <header class="admin-card-header">
      <span class="card-icon admin-card-icon">
        <img class="title-icon" src="" alt="" />
      </span>
      <h3 class="admin-card-title">{{ title }}</h3>
    </header>

    <div class="ability-tree">
      <div v-for="item in nodes" :key="item.key" class="ability-tree-item">
        <button
          v-if="!item.children"
          class="ability-node"
          :class="{ active: selectedKey === item.key }"
          type="button"
          @click="handleNodeClick(item.key)"
        >
          <img v-if="item.icon" class="ability-icon" :src="item.icon" alt="" />
          <span>{{ item.label }}</span>
          <span class="ability-arrow ability-arrow-leaf" aria-hidden="true">›</span>
        </button>

        <div v-else class="ability-group">
          <button
            class="ability-parent"
            :class="{
              active: item.children.some(child => child.key === selectedKey),
              expanded: isExpanded(item.key),
            }"
            type="button"
            @click="toggleGroup(item.key)"
          >
            <img v-if="item.icon" class="ability-icon" :src="item.icon" alt="" />
            <span>{{ item.label }}</span>
            <span class="ability-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </span>
          </button>

          <div v-if="isExpanded(item.key)" class="ability-children">
            <button
              v-for="child in item.children"
              :key="child.key"
              class="ability-child"
              :class="{ active: selectedKey === child.key }"
              type="button"
              @click="handleChildClick(child.key)"
            >
              <span>{{ child.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 12px;
}

.ability-tree-item {
  display: flex;
  flex-direction: column;
}

.ability-node,
.ability-parent,
.ability-child {
  display: flex;
  width: 100%;
  align-items: center;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #263856;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 800;
  text-align: left;
  transition: all 0.16s ease;
}

.ability-node,
.ability-parent {
  gap: 10px;
  min-height: 40px;
  padding: 8px 10px;
}

.ability-node:hover,
.ability-parent:hover,
.ability-child:hover {
  background: #f5f8ff;
  color: var(--color-primary);
}

.ability-node.active,
.ability-parent.active,
.ability-child.active {
  color: var(--color-primary);
}

.ability-node.active,
.ability-child.active {
  background: #eef5ff;
}

.ability-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.ability-arrow {
  display: inline-flex;
  width: 22px;
  height: 22px;
  margin-left: auto;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #8b98aa;
  transition: all 0.16s ease;
}

.ability-arrow svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.2;
  transition: transform 0.16s ease;
}

.ability-parent.expanded .ability-arrow svg {
  transform: rotate(180deg);
}

.ability-node:hover .ability-arrow,
.ability-parent:hover .ability-arrow,
.ability-parent.active .ability-arrow {
  color: var(--color-primary);
}

.ability-arrow-leaf {
  font-size: 20px;
  line-height: 1;
}

.ability-children {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 4px 0 8px 22px;
  padding-left: 18px;
}

.ability-children::before {
  position: absolute;
  left: 5px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  border-radius: 999px;
  background: #c8d1e1;
  content: '';
}

.ability-child {
  position: relative;
  min-height: 36px;
  padding: 0 12px 0 14px;
}

.ability-child::before {
  position: absolute;
  left: -17px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #aeb8c8;
  box-shadow: 0 0 0 4px #fff;
  content: '';
}

.ability-child.active::before {
  background: var(--color-primary);
  box-shadow: 0 0 0 4px #eef5ff;
}
</style>
