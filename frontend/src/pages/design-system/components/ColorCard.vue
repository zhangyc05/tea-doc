<template>
  <div class="color-card">
    <div
      class="color-swatch"
      :style="{ backgroundColor: color.value }"
      @click="handleCopy"
    >
      <div class="copy-overlay">
        <span class="copy-icon">📋</span>
        <span class="copy-text">{{ copied ? '已复制!' : '点击复制' }}</span>
      </div>
    </div>
    <div class="color-info">
      <div class="color-name">{{ color.name }}</div>
      <div class="color-value">{{ color.value }}</div>
      <div class="color-variable">--color-{{ color.name }}</div>
      <div v-if="color.description" class="color-description">{{ color.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { copyToClipboard } from '@/lib/design-system/utils'
import type { ColorToken } from '@/lib/design-system/types'

interface Props {
  color: ColorToken
}

const props = defineProps<Props>()
const copied = ref(false)

const handleCopy = async () => {
  const success = await copyToClipboard(props.color.value)
  if (success) {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } else {
    console.error('Failed to copy color:', props.color.name)
  }
}
</script>

<style scoped>
.color-card {
  @apply border border-card-border rounded-lg overflow-hidden;
  background: var(--color-card-bg);
  transition: all 0.2s ease;
}

.color-card:hover {
  @apply shadow-md;
  transform: translateY(-2px);
}

.color-swatch {
  height: 120px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-overlay {
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.color-swatch:hover .copy-overlay {
  opacity: 1;
}

.copy-icon {
  font-size: 24px;
}

.copy-text {
  color: white;
  font-size: 12px;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.color-info {
  padding: 12px;
}

.color-name {
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.color-value {
  font-size: 13px;
  color: var(--color-text-secondary);
  font-family: monospace;
  margin-bottom: 2px;
}

.color-variable {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-family: monospace;
}

.color-description {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  line-height: 1.4;
}
</style>