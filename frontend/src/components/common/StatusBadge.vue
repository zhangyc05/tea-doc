<script setup lang="ts">
import { computed } from 'vue'

import { Badge } from '@/components/ui'
import { getStatusBadgeMeta, type StatusScene, type StatusTone } from './status-badge'

const props = withDefaults(
  defineProps<{
    status: string
    label?: string
    scene?: StatusScene
    tone?: StatusTone
  }>(),
  {
    scene: 'admin',
    tone: undefined,
  },
)

const meta = computed(() => getStatusBadgeMeta(props.status, props.scene, props.tone))
const label = computed(() => props.label ?? meta.value.label)
</script>

<template>
  <Badge :variant="meta.tone">
    {{ label }}
  </Badge>
</template>
