<template>
  <div class="color-palette">
    <div v-for="category in colorCategories" :key="category.name" class="color-category">
      <h3 class="category-title">{{ category.name }}</h3>
      <p class="category-description">{{ category.description }}</p>

      <div class="color-grid">
        <ColorCard
          v-for="color in category.colors"
          :key="color.variable"
          :color="color"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ColorCard from './ColorCard.vue'

interface Color {
  name: string
  value: string
  variable: string
}

interface ColorCategory {
  name: string
  description: string
  colors: Color[]
}

// Primary Colors
const primaryColors: Color[] = [
  { name: 'Primary', value: '#2FBF9B', variable: '--color-primary' },
  { name: 'Primary Dark', value: '#28A688', variable: '--color-primary-dark' },
  { name: 'Primary Light', value: '#4DD4B5', variable: '--color-primary-light' }
]

// Neutral Colors
const neutralColors: Color[] = [
  { name: 'Background', value: '#F7F9FC', variable: '--color-page-bg' },
  { name: 'Card Background', value: '#FFFFFF', variable: '--color-card-bg' },
  { name: 'Text Primary', value: '#1A1A1A', variable: '--color-text-primary' },
  { name: 'Text Secondary', value: '#6B7280', variable: '--color-text-secondary' },
  { name: 'Text Tertiary', value: '#9CA3AF', variable: '--color-text-tertiary' },
  { name: 'Border', value: '#E5E7EB', variable: '--color-card-border' }
]

// Semantic Colors
const semanticColors: Color[] = [
  { name: 'Success', value: '#10B981', variable: '--color-success' },
  { name: 'Warning', value: '#F59E0B', variable: '--color-warning' },
  { name: 'Error', value: '#EF4444', variable: '--color-error' },
  { name: 'Info', value: '#3B82F6', variable: '--color-info' }
]

// Admin Colors
const adminColors: Color[] = [
  { name: 'Admin Primary', value: '#2FBF9B', variable: '--color-admin-primary' },
  { name: 'Admin Background', value: '#F0F9F6', variable: '--color-admin-bg' },
  { name: 'Admin Border', value: '#E8F3F0', variable: '--color-admin-border' }
]

const colorCategories = ref<ColorCategory[]>([
  {
    name: '品牌色',
    description: '主要品牌颜色，用于强调和重要操作',
    colors: primaryColors
  },
  {
    name: '中性色',
    description: '用于文本、背景和边框的基础颜色',
    colors: neutralColors
  },
  {
    name: '语义色',
    description: '用于表示不同状态的语义颜色',
    colors: semanticColors
  },
  {
    name: '管理端专用色',
    description: '管理端界面专用颜色',
    colors: adminColors
  }
])
</script>

<style scoped>
.color-palette {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.color-category {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.category-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
</style>