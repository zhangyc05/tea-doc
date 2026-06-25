<script setup lang="ts">
import { DetailSheet, StatusBadge } from '@/components/common'
import type { TrainingResourceMockItem } from '@/mock/admin/training'
import { trainingResourceTypeText } from '@/mock/admin/training'

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
    description="查看培训资源的基础信息、适用方向和信息完整度。"
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
          <p class="text-sm text-text-secondary">资源类型</p>
          <p class="mt-1 font-medium text-text-primary">{{ trainingResourceTypeText[props.resource.type] }}</p>
        </div>
        <div class="rounded-lg border border-card-border bg-card p-4">
          <p class="text-sm text-text-secondary">可用状态</p>
          <div class="mt-2">
            <StatusBadge :status="props.resource.status" scene="admin" />
          </div>
        </div>
        <div class="rounded-lg border border-card-border bg-card p-4">
          <p class="text-sm text-text-secondary">提供方</p>
          <p class="mt-1 font-medium text-text-primary">{{ props.resource.provider }}</p>
        </div>
        <div class="rounded-lg border border-card-border bg-card p-4">
          <p class="text-sm text-text-secondary">更新时间</p>
          <p class="mt-1 font-medium text-text-primary">{{ props.resource.updatedAt }}</p>
        </div>
      </div>

      <div class="rounded-lg border border-card-border bg-card p-4">
        <p class="text-sm text-text-secondary">适用方向</p>
        <p class="mt-1 font-medium text-text-primary">{{ props.resource.direction }}</p>
      </div>

      <div class="rounded-lg border border-card-border bg-card p-4">
        <p class="text-sm text-text-secondary">资源说明</p>
        <p class="mt-2 text-sm leading-relaxed text-text-primary">{{ props.resource.description }}</p>
      </div>

      <div class="rounded-lg border border-card-border bg-card p-4">
        <div class="flex items-center justify-between text-sm">
          <span class="text-text-secondary">信息完整度</span>
          <span class="font-medium text-text-primary">{{ props.resource.completeness }}%</span>
        </div>
        <div class="mt-3 h-2 rounded-full bg-page-soft">
          <div class="h-2 rounded-full bg-primary" :style="{ width: `${props.resource.completeness}%` }" />
        </div>
      </div>
    </div>

    <div v-else class="rounded-lg border border-card-border bg-page-soft p-4 text-sm text-text-secondary">
      暂未选择资源。
    </div>
  </DetailSheet>
</template>
