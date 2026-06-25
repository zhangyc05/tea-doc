<script setup lang="ts">
import { computed } from 'vue'

import { Badge } from '@/components/ui'

type StatusScene = 'admin' | 'teacher' | 'mobile'
type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

const props = withDefaults(
  defineProps<{
    status: string
    scene?: StatusScene
    tone?: StatusTone
  }>(),
  {
    scene: 'admin',
    tone: undefined,
  },
)

const teacherStatusTextMap: Record<string, string> = {
  candidate: '待你确认',
  pendingConfirm: '待你确认',
  recognized: '系统识别',
  archived: '已入档',
  saved: '已保存',
  improvable: '可完善',
  needSupplement: '待补充',
  removed: '已移出',
  processing: '处理中',
  completed: '已完成',
}

const adminStatusTextMap: Record<string, string> = {
  clue: '线索',
  candidate: '候选数据',
  pendingConfirm: '待确认',
  formal: '正式',
  abnormal: '异常',
  correcting: '纠错中',
  corrected: '已更正',
  reused: '已复用',
  recognizing: '识别中',
  recognized: '识别完成',
  draft: '草稿',
  published: '已发布',
}

const statusToneMap: Record<string, StatusTone> = {
  archived: 'success',
  completed: 'success',
  corrected: 'success',
  formal: 'success',
  published: 'success',
  saved: 'info',
  recognized: 'info',
  recognizing: 'info',
  processing: 'info',
  candidate: 'warning',
  pendingConfirm: 'warning',
  needSupplement: 'warning',
  improvable: 'purple',
  abnormal: 'danger',
  correcting: 'warning',
  removed: 'neutral',
  reused: 'neutral',
  clue: 'neutral',
  draft: 'neutral',
}

const isTeacherScene = computed(() => props.scene === 'teacher' || props.scene === 'mobile')

const label = computed(() => {
  const map = isTeacherScene.value ? teacherStatusTextMap : adminStatusTextMap
  return map[props.status] ?? props.status
})

const displayTone = computed<StatusTone>(() => props.tone ?? statusToneMap[props.status] ?? 'neutral')
</script>

<template>
  <Badge :variant="displayTone">
    {{ label }}
  </Badge>
</template>
