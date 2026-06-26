<template>
  <div class="color-palette">
    <!-- Empty State -->
    <div v-if="colorCategories.length === 0" class="empty-state">
      <div class="empty-icon">🎨</div>
      <h3 class="empty-title">暂无颜色 Token</h3>
      <p class="empty-description">未检测到 CSS 变量定义的颜色 Token</p>
    </div>

    <!-- Color Categories -->
    <div v-for="category in colorCategories" :key="category.name" class="color-category">
      <h3 class="category-title">{{ category.name }}</h3>
      <p class="category-description">{{ category.description }}</p>

      <div class="color-grid">
        <ColorCard
          v-for="color in category.colors"
          :key="color.name"
          :color="color"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ColorCard from './ColorCard.vue'
import { extractColorTokens } from '@/lib/design-system/tokens'
import type { ColorToken } from '@/lib/design-system/types'

interface ColorCategory {
  name: string
  description: string
  colors: ColorToken[]
}

const colorCategories = ref<ColorCategory[]>([])

// Color categorization logic
const categorizeColors = (colors: ColorToken[]): ColorCategory[] => {
  const categories: ColorCategory[] = []

  // Brand colors (primary related)
  const brandColors = colors.filter(c =>
    c.name.includes('primary') ||
    c.name.includes('brand')
  )
  if (brandColors.length > 0) {
    categories.push({
      name: '品牌色',
      description: '主要品牌颜色，用于强调和重要操作',
      colors: brandColors
    })
  }

  // Neutral colors (text, background, border)
  const neutralColors = colors.filter(c =>
    c.name.includes('text') ||
    c.name.includes('bg') ||
    c.name.includes('background') ||
    c.name.includes('border') ||
    c.name.includes('card')
  )
  if (neutralColors.length > 0) {
    categories.push({
      name: '中性色',
      description: '用于文本、背景和边框的基础颜色',
      colors: neutralColors
    })
  }

  // Semantic colors (success, warning, error, info, danger)
  const semanticColors = colors.filter(c =>
    c.name.includes('success') ||
    c.name.includes('warning') ||
    c.name.includes('error') ||
    c.name.includes('danger') ||
    c.name.includes('info')
  )
  if (semanticColors.length > 0) {
    categories.push({
      name: '语义色',
      description: '用于表示不同状态的语义颜色',
      colors: semanticColors
    })
  }

  // Admin specific colors
  const adminColors = colors.filter(c => c.name.includes('admin'))
  if (adminColors.length > 0) {
    categories.push({
      name: '管理端专用色',
      description: '管理端界面专用颜色',
      colors: adminColors
    })
  }

  // Any remaining colors
  const otherColors = colors.filter(c =>
    !brandColors.includes(c) &&
    !neutralColors.includes(c) &&
    !semanticColors.includes(c) &&
    !adminColors.includes(c)
  )
  if (otherColors.length > 0) {
    categories.push({
      name: '其他颜色',
      description: '其他用途的颜色',
      colors: otherColors
    })
  }

  return categories
}

onMounted(() => {
  try {
    const extractedColors = extractColorTokens()
    colorCategories.value = categorizeColors(extractedColors)
  } catch (error) {
    console.error('Failed to extract color tokens:', error)
    colorCategories.value = []
  }
})
</script>

<style scoped>
.color-palette {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
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