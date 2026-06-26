<script setup lang="ts">
import { DetailSheet } from '@/components/common'
import { Button } from '@/components/ui'
import type { TrainingResourceMockItem } from '@/mock/admin/training'
import {
  trainingResourceDirectionText,
  trainingResourceLevelText,
  trainingResourceSourceText,
  trainingResourceStatusText,
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

function close() {
  emit('update:open', false)
}

function statusClass(status: TrainingResourceMockItem['status']) {
  if (status === 'available') return 'status-success'
  if (status === 'incomplete') return 'status-warning'
  return 'status-neutral'
}
</script>

<template>
  <DetailSheet
    :open="open"
    title="资源详情"
    description="查看培训资源的基本信息、资源状态和使用边界。"
    width="lg"
    mode="view"
    @update:open="emit('update:open', $event)"
    @cancel="close"
    @confirm="close"
  >
    <div v-if="props.resource" class="resource-detail">
      <section class="detail-hero">
        <div>
          <span class="detail-eyebrow">{{ props.resource.id }}</span>
          <h2>{{ props.resource.name }}</h2>
          <p>{{ props.resource.description }}</p>
        </div>
        <span class="status-pill" :class="statusClass(props.resource.status)">
          {{ trainingResourceStatusText[props.resource.status] }}
        </span>
      </section>

      <section class="detail-grid">
        <div class="detail-field">
          <span>培训方向</span>
          <strong>{{ trainingResourceDirectionText[props.resource.direction] }}</strong>
        </div>
        <div class="detail-field">
          <span>级别 / 学时</span>
          <strong>{{ trainingResourceLevelText[props.resource.level] }} / {{ props.resource.hours }} 学时</strong>
        </div>
        <div class="detail-field">
          <span>资源来源</span>
          <strong>{{ trainingResourceSourceText[props.resource.source] }}</strong>
        </div>
        <div class="detail-field">
          <span>适合对象</span>
          <strong>{{ props.resource.audience }}</strong>
        </div>
      </section>

      <section class="detail-section">
        <div class="section-title-row">
          <h3>培训机构</h3>
          <span>来源信息</span>
        </div>
        <p>{{ props.resource.institution }}</p>
      </section>

      <section class="detail-section">
        <div class="section-title-row">
          <h3>关键词</h3>
          <span>用于检索和归类</span>
        </div>
        <div class="keyword-list">
          <span v-for="keyword in props.resource.keywords" :key="keyword">{{ keyword }}</span>
        </div>
      </section>

      <section class="detail-section soft">
        <div class="section-title-row">
          <h3>管理提示</h3>
          <span>资源库口径</span>
        </div>
        <p v-if="props.resource.status === 'available'">该资源信息完整，当前可用于培训计划、教师申请和需求匹配等业务场景。</p>
        <p v-else-if="props.resource.status === 'incomplete'">该资源还缺少关键字段或来源说明，建议完善后再作为可用资源分发。</p>
        <p v-else>该资源已停用，默认不进入培训计划和教师申请入口。</p>
      </section>
    </div>

    <div v-else class="empty-detail">
      暂未选择资源。
    </div>

    <template #footer>
      <Button variant="outline" @click="close">关闭</Button>
      <Button v-if="props.resource?.status === 'incomplete'" @click="close">完善信息</Button>
      <Button v-else @click="close">知道了</Button>
    </template>
  </DetailSheet>
</template>

<style scoped>
.resource-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-hero,
.detail-field,
.detail-section,
.empty-detail {
  border: 1px solid var(--color-card-border);
  border-radius: 16px;
  background: var(--color-card-bg);
}

.detail-hero {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  background: linear-gradient(180deg, var(--color-page-bg-soft), var(--color-card-bg));
}

.detail-eyebrow {
  display: inline-flex;
  margin-bottom: 8px;
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 800;
}

.detail-hero h2 {
  margin: 0 0 8px;
  color: var(--color-text-primary);
  font-size: 19px;
  line-height: 1.4;
}

.detail-hero p,
.detail-section p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.status-pill {
  flex: none;
  display: inline-flex;
  width: fit-content;
  height: 28px;
  align-items: center;
  padding: 0 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.status-success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.status-warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.status-neutral {
  background: var(--color-neutral-bg);
  color: var(--color-neutral);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-field {
  padding: 14px;
}

.detail-field span,
.section-title-row span {
  display: block;
  color: var(--color-text-tertiary);
  font-size: 12px;
}

.detail-field strong {
  display: block;
  margin-top: 6px;
  color: var(--color-text-primary);
  font-size: 14px;
}

.detail-section {
  padding: 16px;
}

.detail-section.soft {
  background: var(--color-page-bg-soft);
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}

.section-title-row h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 15px;
}

.keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword-list span {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 700;
}

.empty-detail {
  padding: 16px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

@media (max-width: 640px) {
  .detail-hero,
  .section-title-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
