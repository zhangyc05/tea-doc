<template>
  <div class="preview-panel">
    <div class="preview-header">
      <div>
        <h3 class="preview-title">组件效果</h3>
        <p class="preview-subtitle">优先查看真实界面效果，代码与接口说明下沉。</p>
      </div>
      <div class="preview-controls" v-if="component?.variants && component.variants.length > 0">
        <Button
          v-for="variant in component.variants"
          :key="variant"
          variant="outline"
          size="sm"
          :class="{ active: previewState.variant === variant }"
          @click="updateVariant(variant)"
        >
          {{ variant }}
        </Button>
      </div>
    </div>

    <div class="preview-area">
      <slot :state="previewState"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui'
import type { ComponentShowcase, PreviewState } from '@/lib/design-system/types'

interface Props {
  component?: ComponentShowcase
}

const props = defineProps<Props>()

const previewState = ref<PreviewState>({
  variant: props.component?.variants?.[0]
})

watch(() => props.component, (newComponent) => {
  previewState.value = {
    variant: newComponent?.variants?.[0]
  }
}, { immediate: false })

const updateVariant = (variant: string): void => {
  previewState.value.variant = variant
}
</script>

<style scoped>
.preview-panel {
  overflow: hidden;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  background: var(--color-page-bg-soft);
  border-bottom: 1px solid var(--color-card-border);
}

.preview-title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.preview-subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.preview-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.preview-controls :deep(.button.active) {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.preview-area {
  min-height: 160px;
  padding: 28px;
  background:
    linear-gradient(90deg, rgba(229, 236, 248, 0.45) 1px, transparent 1px),
    linear-gradient(180deg, rgba(229, 236, 248, 0.45) 1px, transparent 1px),
    var(--color-card-bg);
  background-size: 24px 24px;
}

@media (max-width: 768px) {
  .preview-header {
    flex-direction: column;
  }

  .preview-controls {
    justify-content: flex-start;
  }

  .preview-area {
    padding: 18px;
  }
}
</style>
