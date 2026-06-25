<script setup lang="ts">
import { Button } from '@/components/ui'

withDefaults(
  defineProps<{
    scene?: 'admin' | 'teacher-pc' | 'mobile'
  }>(),
  {
    scene: 'admin',
  },
)
</script>

<template>
  <div class="admin-ai-assistant">
    <Button class="h-12 rounded-full px-5 shadow-floating" variant="default">
      AI 助理
    </Button>
  </div>
</template>

<style scoped>
.admin-ai-assistant {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 40;
}
</style>
