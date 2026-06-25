<script setup lang="ts">
import { Badge, Button } from '@/components/ui'

withDefaults(
  defineProps<{
    title?: string
    userName?: string
  }>(),
  {
    title: '管理端工作台',
    userName: '刘主任',
  },
)
</script>

<template>
  <header class="sticky top-0 z-30 flex h-[var(--admin-topbar-height)] items-center justify-between border-b border-card-border bg-card/95 px-6 backdrop-blur">
    <div class="flex items-center gap-3">
      <h2 class="text-base font-semibold text-text-primary">{{ title }}</h2>
      <Badge variant="outline">2026 年度</Badge>
    </div>

    <div class="flex items-center gap-3">
      <Button variant="ghost" size="sm">系统消息</Button>
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
        {{ userName.slice(0, 1) }}
      </div>
    </div>
  </header>
</template>
