<script setup lang="ts">
import { Button } from '@/components/ui'

withDefaults(
  defineProps<{
    userName?: string
  }>(),
  {
    userName: '刘主任',
  },
)
</script>

<template>
  <header class="sticky top-0 z-30 flex h-[var(--admin-topbar-height)] items-center justify-end border-b border-card-border bg-card/95 px-8 backdrop-blur">
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="sm">系统消息</Button>
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
        {{ userName.slice(0, 1) }}
      </div>
    </div>
  </header>
</template>
