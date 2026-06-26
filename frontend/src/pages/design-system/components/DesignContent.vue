<template>
  <div class="design-content">
    <!-- Header Section -->
    <div class="content-header">
      <h1 class="content-title">{{ contentTitle }}</h1>
      <p v-if="contentDescription" class="content-description">{{ contentDescription }}</p>
    </div>

    <!-- Content Area -->
    <div class="content-body">
      <!-- No selection state -->
      <div v-if="isEmptyContent" class="empty-state">
        <p class="empty-message">请从左侧选择要查看的内容</p>
      </div>

      <!-- Project profile content -->
      <ProjectProfilePanel
        v-else-if="selectedContent?.type === 'project-profile'"
        :profile="selectedContent.data.profile"
        :recipes="selectedContent.data.recipes"
      />

      <!-- Page patterns content -->
      <PagePatternsPanel
        v-else-if="selectedContent?.type === 'page-patterns'"
        :patterns="selectedContent.data"
      />

      <!-- Anti-patterns content -->
      <AntiPatternList
        v-else-if="selectedContent?.type === 'anti-patterns'"
        :items="selectedContent.data"
      />

      <!-- Quality checklist content -->
      <QualityChecklist
        v-else-if="selectedContent?.type === 'quality-checklist'"
        :groups="selectedContent.data"
      />

      <!-- Colors content -->
      <ColorPalette
        v-else-if="selectedContent?.type === 'colors'"
        :tokens="selectedContent.data"
      />

      <!-- Typography content -->
      <TypographyScale
        v-else-if="selectedContent?.type === 'typography'"
        :tokens="selectedContent.data"
      />

      <!-- Spacing content -->
      <SizeSystem
        v-else-if="selectedContent?.type === 'spacing'"
        :tokens="selectedContent.data"
      />

      <!-- Components content -->
      <ComponentShowcase
        v-else-if="selectedContent?.type === 'components'"
        :category="selectedContent.title"
        :components="selectedContent.data || []"
      />

      <!-- Guides placeholder -->
      <div v-else-if="selectedContent?.type === 'guides'" class="placeholder-state">
        <p class="placeholder-message">使用指南功能将在 Phase 3 实现</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { NavItem } from '@/lib/design-system/types'
import AntiPatternList from './AntiPatternList.vue'
import ColorPalette from './ColorPalette.vue'
import ComponentShowcase from './ComponentShowcase.vue'
import PagePatternsPanel from './PagePatternsPanel.vue'
import ProjectProfilePanel from './ProjectProfilePanel.vue'
import QualityChecklist from './QualityChecklist.vue'
import SizeSystem from './SizeSystem.vue'
import TypographyScale from './TypographyScale.vue'

// Props
interface Props {
  selectedItem?: NavItem
}

const props = withDefaults(defineProps<Props>(), {
  selectedItem: undefined
})

// State
const selectedContent = ref<NavItem['content']>()

// Computed
const isEmptyContent = computed(() => !selectedContent.value)

const contentTitle = computed(() => {
  return selectedContent.value?.title || '设计系统'
})

const contentDescription = computed(() => {
  return selectedContent.value?.description || ''
})

// Watch for changes to selectedItem
watch(() => props.selectedItem, (newValue) => {
  selectedContent.value = newValue?.content
}, { immediate: true })
</script>

<style scoped>
.design-content {
  /* Full viewport height with overflow for scrolling */
  height: 100vh;
  overflow-y: auto;
  background-color: var(--color-page-bg);
}

.content-header {
  /* Header section with padding and border */
  padding: 32px;
  border-bottom: 1px solid var(--color-card-border);
  background-color: var(--color-card-bg);
}

.content-title {
  /* Title styling */
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.content-description {
  /* Description styling */
  margin: 0;
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.content-body {
  /* Main content area with padding */
  padding: 32px;
  min-height: 400px;
}

/* Empty state styling */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-color: var(--color-card-bg);
  border: 2px dashed var(--color-card-border);
  border-radius: 8px;
}

.empty-message {
  margin: 0;
  font-size: 16px;
  color: var(--color-text-secondary);
  text-align: center;
}

/* Placeholder state styling */
.placeholder-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-color: var(--color-card-bg);
  border: 2px dashed var(--color-card-border);
  border-radius: 8px;
}

.placeholder-message {
  margin: 0;
  font-size: 16px;
  color: var(--color-text-secondary);
  text-align: center;
}

/* Scrollbar styling */
.design-content::-webkit-scrollbar {
  width: 8px;
}

.design-content::-webkit-scrollbar-track {
  background: var(--color-page-bg);
}

.design-content::-webkit-scrollbar-thumb {
  background: var(--color-card-border);
  border-radius: 4px;
}

.design-content::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-secondary);
}
</style>
