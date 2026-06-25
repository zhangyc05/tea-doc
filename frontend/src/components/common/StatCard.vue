<script setup lang="ts">
import { computed } from 'vue'

type StatCardTone = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const props = withDefaults(
  defineProps<{
    title: string
    value: string | number
    description?: string
    trend?: string
    tone?: StatCardTone
  }>(),
  {
    description: '',
    trend: '',
    tone: 'neutral',
  },
)

const toneClass = computed(() => {
  const classMap: Record<StatCardTone, string> = {
    primary: 'bg-primary-soft text-primary',
    success: 'bg-success-bg text-success',
    warning: 'bg-warning-bg text-warning',
    danger: 'bg-danger-bg text-danger',
    info: 'bg-info-bg text-info',
    neutral: 'bg-neutral-bg text-neutral',
  }

  return classMap[props.tone]
})
</script>

<template>
  <article class="rounded-xl border border-card-border bg-card p-5 shadow-card">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="text-sm text-text-secondary">{{ title }}</p>
        <p class="mt-2 text-2xl font-semibold leading-tight text-text-primary">{{ value }}</p>
      </div>
      <span v-if="trend" class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium" :class="toneClass">
        {{ trend }}
      </span>
    </div>

    <p v-if="description" class="mt-4 text-sm leading-relaxed text-text-tertiary">
      {{ description }}
    </p>
  </article>
</template>
