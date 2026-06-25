<script setup lang="ts">
import { Button } from '@/components/ui'

withDefaults(
  defineProps<{
    userName?: string
  }>(),
  {
    userName: '管理员',
  },
)
</script>

<template>
  <header class="sticky top-0 z-30 flex h-[var(--admin-topbar-height)] items-center justify-between border-b border-card-border bg-card/95 px-7 backdrop-blur">
    <div class="flex items-center gap-3 text-sm">
      <span class="text-text-secondary">培训管理</span>
      <span class="text-text-tertiary">/</span>
      <span class="text-base font-semibold text-text-primary">资源库</span>
    </div>

    <div class="flex items-center gap-5">
      <Button variant="outline" size="md" class="h-9 min-w-[120px] justify-between rounded-md border-[#DDE6F5] px-4 text-[#132342]">
        全校
        <span class="text-primary">⌄</span>
      </Button>
      <Button variant="outline" size="md" class="h-9 min-w-[142px] justify-between rounded-md border-[#DDE6F5] px-4 text-[#132342]">
        2026 年度
        <span class="text-primary">⌄</span>
      </Button>

      <button type="button" class="relative flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#334467] hover:bg-primary-soft">
        ♧
        <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white">12</span>
      </button>

      <div class="flex items-center gap-2">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F4FF] text-lg">
          管
        </div>
        <span class="text-sm font-semibold text-text-primary">{{ userName }}</span>
        <span class="text-primary">⌄</span>
      </div>
    </div>
  </header>
</template>
