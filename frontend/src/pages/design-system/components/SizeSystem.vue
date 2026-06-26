<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { extractSizeTokens } from '@/lib/design-system/tokens'
import type { SizeToken } from '@/lib/design-system/types'

const radiusExamples = ref<SizeToken[]>([])
const shadowExamples = ref<SizeToken[]>([])

onMounted(() => {
  try {
    const sizeTokens = extractSizeTokens()

    // Separate radius and shadow tokens
    radiusExamples.value = sizeTokens.filter(token => token.type === 'radius')
    shadowExamples.value = sizeTokens.filter(token => token.type === 'shadow')

  } catch (error) {
    console.error('Failed to extract size tokens:', error)
    radiusExamples.value = []
    shadowExamples.value = []
  }
})
</script>

<template>
  <div class="size-system">
    <!-- Radius Section -->
    <div v-if="radiusExamples.length > 0" class="size-section">
      <h2 class="section-title">圆角规范</h2>

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
            <div class="radius-variable">--radius-{{ radius.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Shadow Section -->
    <div v-if="shadowExamples.length > 0" class="size-section">
      <h2 class="section-title">阴影规范</h2>

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
            <div class="shadow-variable">--shadow-{{ shadow.name }}</div>
            <div class="shadow-value">{{ shadow.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.size-system {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.size-section {
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
</style>
