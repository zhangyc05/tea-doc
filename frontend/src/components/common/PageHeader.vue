<script setup lang="ts">
import { Button } from '@/components/ui'

withDefaults(
  defineProps<{
    title: string
    description?: string
    eyebrow?: string
    primaryActionText?: string
    secondaryActionText?: string
    showBack?: boolean
  }>(),
  {
    description: '',
    eyebrow: '',
    primaryActionText: '',
    secondaryActionText: '',
    showBack: false,
  },
)

const emit = defineEmits<{
  (event: 'primary-action'): void
  (event: 'secondary-action'): void
  (event: 'back'): void
}>()
</script>

<template>
  <header class="mb-6 flex flex-col gap-4 border-b border-card-border pb-5 md:flex-row md:items-end md:justify-between">
    <div class="min-w-0">
      <button
        v-if="showBack"
        type="button"
        class="mb-3 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
        @click="emit('back')"
      >
        ← 返回
      </button>

      <p v-if="eyebrow" class="mb-2 text-sm font-medium text-primary">
        {{ eyebrow }}
      </p>

      <h1 class="m-0 text-2xl font-semibold leading-tight text-text-primary">
        {{ title }}
      </h1>

      <p v-if="description" class="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">
        {{ description }}
      </p>
    </div>

    <div v-if="primaryActionText || secondaryActionText" class="flex shrink-0 items-center gap-2">
      <Button v-if="secondaryActionText" variant="outline" @click="emit('secondary-action')">
        {{ secondaryActionText }}
      </Button>
      <Button v-if="primaryActionText" @click="emit('primary-action')">
        {{ primaryActionText }}
      </Button>
    </div>
  </header>
</template>
