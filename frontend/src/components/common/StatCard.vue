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
  <article class="rounded-2xl border border-card-border bg-card px-5 py-4 shadow-card">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="text-sm font-medium text-text-secondary">{{ title }}</p>
        <p class="mt-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-text-primary">{{ value }}</p>
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
