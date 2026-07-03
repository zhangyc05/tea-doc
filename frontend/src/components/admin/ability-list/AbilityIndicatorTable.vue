<script setup lang="ts">
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
      <table class="admin-table">
        <thead>
          <tr>
            <th>指标名称</th>
            <th>新手</th>
            <th>胜任</th>
            <th>骨干</th>
            <th>名师</th>
            <th>{{ basisColumnTitle }}</th>
            <th>状态</th>
            <th v-if="showAction">操作</th>
          </tr>
        </thead>
        <tbody v-if="rows.length">
          <tr
            v-for="row in rows"
            :key="row.key"
            class="admin-table-row"
            @click="handleRowClick(row)"
          >
            <td class="name-cell">{{ row.name }}</td>
            <td>{{ row.novice }}</td>
            <td>{{ row.competent }}</td>
            <td>{{ row.backbone }}</td>
            <td>{{ row.expert }}</td>
            <td>{{ row.basisLabel }}</td>
            <td>
              <span class="badge-status" :class="getStatusBadgeClass(row.status)">
                {{ getStatusText(row.status) }}
              </span>
            </td>
            <td v-if="showAction">
              <button class="btn-link" @click.stop="handleEdit(row)">
                {{ actionText }}
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="empty-cell" :colspan="showAction ? 8 : 7">
              当前能力节点暂无指标，请从优化建议或基准模板维护中补充。
            </td>
          </tr>
        </tbody>
      </table>
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
