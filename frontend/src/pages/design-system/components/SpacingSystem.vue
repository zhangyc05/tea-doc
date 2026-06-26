<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { extractSizeTokens } from '@/lib/design-system/tokens'
import type { SizeToken } from '@/lib/design-system/types'

interface RadiusExample {
  name: string
  value: string
  variable: string
  size: number
}

interface ShadowExample {
  name: string
  value: string
  variable: string
}

const radiusExamples = ref<RadiusExample[]>([])
const shadowExamples = ref<ShadowExample[]>([])

onMounted(() => {
  try {
    const sizeTokens = extractSizeTokens()

    // Separate radius and shadow tokens
    const radiusTokens = sizeTokens.filter(token => token.type === 'radius')
    const shadowTokens = sizeTokens.filter(token => token.type === 'shadow')

    // Process radius tokens
    radiusExamples.value = radiusTokens.map(token => {
      // Extract numeric value from px string (e.g., "4px" -> 4)
      const sizeMatch = token.value.match(/(\d+)px/)
      const size = sizeMatch ? parseInt(sizeMatch[1]) : 0

      return {
        name: token.name,
        value: token.value,
        variable: `--radius-${token.name}`,
        size
      }
    }).sort((a, b) => a.size - b.size) // Sort by size

    // Process shadow tokens
    shadowExamples.value = shadowTokens.map(token => ({
      name: token.name,
      value: token.value,
      variable: `--shadow-${token.name}`
    }))

  } catch (error) {
    console.error('Failed to extract spacing tokens:', error)
    radiusExamples.value = []
    shadowExamples.value = []
  }
})
</script>

<template>
  <div class="spacing-system">
    <!-- Empty State -->
    <div v-if="radiusExamples.length === 0 && shadowExamples.length === 0" class="empty-state">
      <div class="empty-icon">📐</div>
      <h3 class="empty-title">暂无尺寸 Token</h3>
      <p class="empty-description">未检测到 CSS 变量定义的圆角或阴影 Token</p>
    </div>

    <!-- Radius Section -->
    <div v-if="radiusExamples.length > 0" class="spacing-section">
      <h2 class="section-title">圆角 (Border Radius)</h2>
      <p class="section-description">用于按钮、卡片、输入框等元素的圆角大小</p>

      <div class="radius-grid">
        <div
          v-for="radius in radiusExamples"
          :key="radius.name"
          class="radius-item"
        >
          <div
            class="radius-preview"
            :style="{ borderRadius: radius.value }"
          >
            <span class="radius-label">{{ radius.value }}</span>
          </div>
          <div class="radius-info">
            <div class="radius-name">{{ radius.name }}</div>
            <div class="radius-variable">{{ radius.variable }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Shadow Section -->
    <div v-if="shadowExamples.length > 0" class="spacing-section">
      <h2 class="section-title">阴影 (Box Shadow)</h2>
      <p class="section-description">用于卡片、浮层等元素的阴影效果</p>

      <div class="shadow-list">
        <div
          v-for="shadow in shadowExamples"
          :key="shadow.name"
          class="shadow-item"
        >
          <div
            class="shadow-preview"
            :style="{ boxShadow: shadow.value }"
          >
            <span class="shadow-label">{{ shadow.name }}</span>
          </div>
          <div class="shadow-info">
            <div class="shadow-name">{{ shadow.name }}</div>
            <div class="shadow-variable">{{ shadow.variable }}</div>
            <div class="shadow-value">{{ shadow.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Examples -->
    <div class="usage-section">
      <h3 class="usage-title">使用示例</h3>
      <div class="usage-example">
        <pre class="usage-code"><code>// 使用圆角 Token
.button-primary {
  border-radius: var(--radius-md);
}

.card {
  border-radius: var(--radius-lg);
}

// 使用阴影 Token
.card {
  box-shadow: var(--shadow-card);
}

.card:hover {
  box-shadow: var(--shadow-card-hover);
}

.dropdown {
  box-shadow: var(--shadow-floating);
}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spacing-system {
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

.spacing-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.section-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
}

.radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
}

.radius-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radius-preview {
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-info) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.radius-preview:hover {
  transform: scale(1.05);
}

.radius-label {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.radius-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.radius-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.radius-variable {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-family: monospace;
}

.shadow-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.shadow-item {
  display: flex;
  gap: 16px;
}

.shadow-preview {
  width: 120px;
  height: 80px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.shadow-preview:hover {
  transform: translateY(-2px);
}

.shadow-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.shadow-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0;
}

.shadow-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.shadow-variable {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-family: monospace;
}

.shadow-value {
  font-size: 11px;
  color: var(--color-text-secondary);
  font-family: monospace;
  word-break: break-all;
}

.usage-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--color-page-bg-soft);
  border-radius: var(--radius-lg);
}

.usage-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.usage-example {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-md);
  padding: 16px;
  overflow-x: auto;
}

.usage-code {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
  font-family: monospace;
  line-height: 1.6;
}

.usage-code code {
  color: var(--color-text-secondary);
}
</style>