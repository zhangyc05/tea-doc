<script setup lang="ts">
import { computed } from 'vue'

import { Button } from '@/components/ui'

type EmptyStateElement = 'div' | 'td'
type EmptyStateVariant = 'panel' | 'cell'

const props = withDefaults(
  defineProps<{
    as?: EmptyStateElement
    title: string
    description?: string
    colspan?: number
    variant?: EmptyStateVariant
    actionLabel?: string
  }>(),
  {
    as: 'div',
    description: '',
    colspan: 1,
    variant: 'panel',
    actionLabel: '',
  },
)

const emit = defineEmits<{
  (event: 'action'): void
}>()

const rootClass = computed(() => {
  if (props.variant === 'cell') {
    return 'px-6 py-9 text-center text-sm text-text-secondary'
  }

  return 'rounded-lg border border-dashed border-card-border bg-page-soft px-6 py-10 text-center'
})
</script>

<template>
  <component
    :is="as"
    :colspan="as === 'td' ? colspan : undefined"
    :class="rootClass"
  >
    <div class="flex flex-col items-center gap-2">
      <p class="m-0 text-sm font-medium text-text-secondary">{{ title }}</p>
      <p v-if="description" class="m-0 max-w-md text-xs leading-relaxed text-text-tertiary">
        {{ description }}
      </p>
      <Button v-if="actionLabel" variant="secondary" size="sm" class="mt-2" @click="emit('action')">
        {{ actionLabel }}
      </Button>
    </div>
  </component>
</template>
