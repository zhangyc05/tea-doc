<script setup lang="ts">
import { AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { Button } from '@/components/ui'
import {
  getAbilityIndicatorStatusClass,
  getAbilityIndicatorStatusLabel,
} from '@/domain/admin/ability-list'
import type { AbilityIndicator } from './types'

const props = withDefaults(
  defineProps<{
    title: string
    icon?: string
    description?: string
    rows: AbilityIndicator[]
    basisColumnTitle?: string
    actionText?: string
    showAction?: boolean
  }>(),
  {
    basisColumnTitle: '建议依据',
    actionText: '编辑',
    showAction: true,
  },
)

const emit = defineEmits<{
  (event: 'row-click', row: AbilityIndicator): void
  (event: 'edit', row: AbilityIndicator): void
}>()

function handleRowClick(row: AbilityIndicator) {
  emit('row-click', row)
}

function handleEdit(row: AbilityIndicator) {
  emit('edit', row)
}

function getStatusBadgeClass(status: AbilityIndicator['status']) {
  return getAbilityIndicatorStatusClass(status)
}

function getStatusText(status: AbilityIndicator['status']) {
  return getAbilityIndicatorStatusLabel(status)
}

function indicatorRowClassName() {
  return 'admin-table-row'
}
</script>

<template>
  <section class="indicators-panel admin-card">
    <header class="indicator-header admin-card-header">
      <div class="title-with-icon">
        <span class="card-icon admin-card-icon">
          <img v-if="icon" class="title-icon" :src="icon" alt="" />
        </span>
        <div>
          <h3 class="admin-card-title">{{ title }}</h3>
          <p v-if="description" class="ability-description">
            {{ description }}
          </p>
        </div>
      </div>
    </header>

    <div class="admin-table-container">
      <AdminTable
        :data="rows"
        row-key="key"
        :row-class-name="indicatorRowClassName"
        empty-text="当前能力节点暂无指标，请从优化建议或基准模板维护中补充。"
        @row-click="handleRowClick"
      >
        <AdminTableColumn prop="name" label="指标名称" min-width="220" />
        <AdminTableColumn prop="novice" label="新手" min-width="110" align="center" />
        <AdminTableColumn prop="competent" label="胜任" min-width="110" align="center" />
        <AdminTableColumn prop="backbone" label="骨干" min-width="110" align="center" />
        <AdminTableColumn prop="expert" label="名师" min-width="110" align="center" />
        <AdminTableColumn prop="basisLabel" :label="basisColumnTitle" min-width="160" align="center" />
        <AdminTableColumn label="状态" min-width="110" align="center">
          <template #default="{ row }">
              <span class="badge-status" :class="getStatusBadgeClass(row.status)">
                {{ getStatusText(row.status) }}
              </span>
          </template>
        </AdminTableColumn>
        <AdminTableColumn v-if="showAction" label="操作" min-width="110" align="center" fixed="right">
          <template #default="{ row }">
            <Button variant="ghost" size="sm" @click.stop="handleEdit(row)">
              {{ actionText }}
            </Button>
          </template>
        </AdminTableColumn>
      </AdminTable>
    </div>
  </section>
</template>

<style scoped>
.indicators-panel {
  min-width: 0;
  min-height: clamp(280px, 18vw, 340px);
  padding: clamp(18px, 1.2vw, 22px) clamp(18px, 1.2vw, 22px) clamp(20px, 1.4vw, 26px);
}

.indicator-header {
  justify-content: space-between;
  gap: var(--space-admin-lg);
  margin-bottom: clamp(12px, 0.9vw, 16px);
}

.title-with-icon {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: clamp(10px, 0.7vw, 14px);
}

.card-icon {
  flex: none;
}

.title-icon {
  width: 22px;
  height: 22px;
  display: block;
}

.ability-description {
  margin: 6px 0 0;
  color: #7d899b;
  font-size: 13px;
  font-weight: 650;
  line-height: 1.6;
}

.name-cell {
  font-weight: 850;
}

.admin-table th:first-child,
.admin-table td:first-child {
  width: 25%;
}

.admin-table th:nth-child(2),
.admin-table td:nth-child(2),
.admin-table th:nth-child(3),
.admin-table td:nth-child(3),
.admin-table th:nth-child(4),
.admin-table td:nth-child(4),
.admin-table th:nth-child(5),
.admin-table td:nth-child(5) {
  width: 9.5%;
  text-align: center;
}

.admin-table th:nth-child(6),
.admin-table td:nth-child(6) {
  width: 17%;
  text-align: center;
}

.admin-table th:nth-child(7),
.admin-table td:nth-child(7),
.admin-table th:nth-child(8),
.admin-table td:nth-child(8) {
  width: 10%;
  text-align: center;
}

.admin-table-row {
  cursor: pointer;
}

.admin-table-row.active,
.admin-table-row:hover {
  background: #f5f8ff;
}

.empty-cell {
  height: 160px;
  color: #7a879b;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
}
</style>
