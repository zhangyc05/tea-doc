<script setup lang="ts">
import { DetailSheet, StatusBadge } from '@/components/common'
import type { TrainingResourceMockItem } from '@/mock/admin/training'
import {
  trainingResourceDirectionText,
  trainingResourceLevelText,
  trainingResourceSourceText,
} from '@/mock/admin/training'

const props = withDefaults(
  defineProps<{
    open: boolean
    resource: TrainingResourceMockItem | null
  }>(),
  {
    resource: null,
  },
)

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
}>()
</script>

<template>
  <DetailSheet
    :open="open"
    title="资源详情"
    description="查看培训资源的方向、级别、机构、对象和状态。"
    width="md"
    mode="view"
    @update:open="emit('update:open', $event)"
    @cancel="emit('update:open', false)"
    @confirm="emit('update:open', false)"
  >
    <div v-if="props.resource" class="space-y-4">
      <div class="rounded-lg border border-card-border bg-page-soft p-4">
        <p class="text-sm text-text-secondary">资源名称</p>
        <p class="mt-1 text-base font-semibold text-text-primary">{{ props.resource.name }}</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-lg border border-card-border bg-card p-4">
          <p class="text-sm text-text-secondary">培训方向</p>
          <p class="mt-1 font-medium text-text-primary">{{ trainingResourceDirectionText[props.resource.direction] }}</p>
        </div>
        <div class="rounded-lg border border-card-border bg-card p-4">
          <p class="text-sm text-text-secondary">资源状态</p>
          <div class="mt-2">
            <StatusBadge :status="props.resource.status" scene="admin" />
          </div>
        </div>
        <div class="rounded-lg border border-card-border bg-card p-4">
          <p class="text-sm text-text-secondary">级别 / 学时</p>
          <p class="mt-1 font-medium text-text-primary">{{ trainingResourceLevelText[props.resource.level] }} / {{ props.resource.hours }}学时</p>
        </div>
        <div class="rounded-lg border border-card-border bg-card p-4">
          <p class="text-sm text-text-secondary">资源来源</p>
          <p class="mt-1 font-medium text-text-primary">{{ trainingResourceSourceText[props.resource.source] }}</p>
        </div>
      </div>

      <div class="rounded-lg border border-card-border bg-card p-4">
        <p class="text-sm text-text-secondary">培训机构</p>
        <p class="mt-1 font-medium text-text-primary">{{ props.resource.institution }}</p>
      </div>

      <div class="rounded-lg border border-card-border bg-card p-4">
        <p class="text-sm text-text-secondary">适合对象</p>
        <p class="mt-1 font-medium text-text-primary">{{ props.resource.audience }}</p>
      </div>

      <div class="rounded-lg border border-card-border bg-card p-4">
        <p class="text-sm text-text-secondary">资源说明</p>
        <p class="mt-2 text-sm leading-relaxed text-text-primary">{{ props.resource.description }}</p>
      </div>
    </div>

    <div v-else class="rounded-lg border border-card-border bg-page-soft p-4 text-sm text-text-secondary">
      暂未选择资源。
    </div>
  </DetailSheet>
</template>
