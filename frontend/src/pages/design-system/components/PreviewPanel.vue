<template>
  <div class="preview-panel">
    <div class="preview-header">
      <h3 class="preview-title">{{ component?.name || '组件预览' }}</h3>
      <div class="preview-controls" v-if="component?.variants && component.variants.length > 0">
        <Button
          v-for="variant in component.variants"
          :key="variant"
          variant="outline"
          size="sm"
          :class="cn({ active: previewState.variant === variant })"
          @click="updateVariant(variant)"
        >
          {{ variant }}
        </Button>
      </div>
    </div>

    <div class="preview-content">
      <div class="preview-area">
        <slot :state="previewState"></slot>
      </div>
      <div class="preview-info">
        <div class="preview-state">
          <h4>当前状态</h4>
          <pre>{{ JSON.stringify(previewState, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { ComponentShowcase, PreviewState } from '@/lib/design-system/types'

interface Props {
  component?: ComponentShowcase
}

const props = defineProps<Props>()

// Preview state - only initialize with variant
const previewState = ref<PreviewState>({
  variant: props.component?.variants?.[0]
})

// Reset preview state when component changes
watch(() => props.component, (newComponent) => {
  previewState.value = {
    variant: newComponent?.variants?.[0]
  }
}, { immediate: false })

// Update variant
const updateVariant = (variant: string): void => {
  previewState.value.variant = variant
}
</script>

<style scoped>
.preview-panel {
  @apply border border-card-border rounded-lg overflow-hidden;
  background: var(--color-card-bg);
  transition: all 0.2s ease;
}

.preview-panel:hover {
  @apply shadow-md;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--color-page-bg);
  border-bottom: 1px solid var(--color-card-border);
  gap: 16px;
}

.preview-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1;
}

.preview-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.preview-controls :deep(.button.active) {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.preview-area {
  padding: 20px;
  background: var(--color-card-bg);
  min-height: 120px;
}

.preview-info {
  padding: 16px 20px;
  background: var(--color-card-bg);
  border-top: 1px solid var(--color-card-border);
}

.preview-state {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview-state h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.preview-state pre {
  margin: 0;
  padding: 12px;
  background: var(--color-page-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: var(--color-text-primary);
  overflow-x: auto;
  white-space: pre;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .preview-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
  }

  .preview-controls {
    width: 100%;
  }

  .preview-area {
    padding: 16px;
    min-height: 100px;
  }

  .preview-info {
    padding: 12px 16px;
  }

  .preview-state h4 {
    font-size: 13px;
  }

  .preview-state pre {
    font-size: 11px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .preview-title {
    font-size: 14px;
  }

  .preview-area {
    padding: 12px;
    min-height: 80px;
  }

  .preview-info {
    padding: 10px 12px;
  }

  .preview-state h4 {
    font-size: 13px;
  }

  .preview-state pre {
    font-size: 10px;
    padding: 8px;
  }
}
</style>
