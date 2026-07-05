<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import { getAbilityListOptimizationMock } from '@/services/mock/ability-list'
import baseHeroArt from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-art.png'
import baseHeroEmblem from '@/assets/admin/ability-list-base-assets/ability-list-base-hero-emblem.svg'
import {
  adoptOptimizationSuggestion,
  applyAdoptedSuggestionsToBaseTemplate,
  getAbilityListState,
  importPolicySuggestion,
  rerunFeedbackAnalysis,
  updateOptimizationSuggestionStatus,
  type OptimizationSuggestion,
} from '@/stores/admin/abilityListStore'

const router = useRouter()
const route = useRoute()
const abilityListState = getAbilityListState()
const { suggestionSources, filterTags } = getAbilityListOptimizationMock()

const selectedSource = ref('all')
const selectedSuggestionId = ref('suggestion-enterprise-practice')
const selectedTag = ref('all')
const operationMessage = useOperationMessage()

const suggestions = computed(() => abilityListState.optimizationSuggestions)
const pendingApplicationCount = computed(() => abilityListState.pendingTemplateApplications.length)

const stats = computed(() => ({
  total: suggestions.value.length + 14,
  policy: 8,
  feedback: 6,
  manual: 4,
  pending: suggestions.value.filter((item) => item.status === 'pending').length + 8,
  adopted: suggestions.value.filter((item) => item.status === 'adopted').length + 3,
  rejected: suggestions.value.filter((item) => item.status === 'rejected').length + 2,
}))

const selectedSuggestion = computed(() => {
  return suggestions.value.find((item) => item.id === selectedSuggestionId.value) ?? suggestions.value[0]
})

const filteredSuggestions = computed(() => {
  let result = suggestions.value

  if (selectedSource.value !== 'all') {
    result = result.filter((suggestion) => suggestion.source === selectedSource.value)
  }

  if (selectedTag.value !== 'all') {
    const tagMap: Record<string, string> = {
      missing: '标准缺失',
      unclear: '标准不清',
      duplicate: '标准重复',
      wide: '标准过宽',
      mapping: '要求映射问题',
    }
    result = result.filter((suggestion) => suggestion.issueType === tagMap[selectedTag.value])
  }

  return result
})

function selectSource(key: string) {
  selectedSource.value = key
  operationMessage.set(`已按建议来源筛选出 ${filteredSuggestions.value.length} 条。`)
}

function selectSuggestion(suggestion: OptimizationSuggestion) {
  selectedSuggestionId.value = suggestion.id
  operationMessage.set(`已选中建议：${suggestion.issueType}。`)
}

function selectTag(key: string) {
  selectedTag.value = key
  operationMessage.set(`已按问题类型筛选出 ${filteredSuggestions.value.length} 条。`)
}

function handleAction(action: string, suggestion: OptimizationSuggestion) {
  if (action === 'view') {
    selectSuggestion(suggestion)
    operationMessage.set('已在右侧展示建议详情。')
    return
  }

  if (action === 'adopt') {
    adoptOptimizationSuggestion(suggestion.id)
    selectedSuggestionId.value = suggestion.id
    operationMessage.fromStore(abilityListState)
    return
  }

  if (action === 'defer') {
    updateOptimizationSuggestionStatus(suggestion.id, 'deferred')
    operationMessage.set('该建议已暂缓处理。')
    return
  }

  if (action === 'reject') {
    updateOptimizationSuggestionStatus(suggestion.id, 'rejected')
    operationMessage.set('该建议已弃用。')
  }
}

function applyToBaseTemplate() {
  applyAdoptedSuggestionsToBaseTemplate()
  operationMessage.fromStore(abilityListState)
}

function uploadPolicy() {
  importPolicySuggestion()
  selectedSource.value = 'policy'
  selectedSuggestionId.value = abilityListState.optimizationSuggestions[0]?.id ?? selectedSuggestionId.value
  operationMessage.fromStore(abilityListState)
}

function rerunAnalysis() {
  rerunFeedbackAnalysis()
  selectedSource.value = 'feedback'
  selectedSuggestionId.value = abilityListState.optimizationSuggestions[0]?.id ?? selectedSuggestionId.value
  operationMessage.fromStore(abilityListState)
}

function viewVersionHistory() {
  router.push({
    path: '/admin/ability-list/base',
    query: { versionHistory: '1' },
  })
}

function suggestionRowClassName({ row }: { row: OptimizationSuggestion }) {
  return selectedSuggestion.value?.id === row.id ? 'admin-table-row active' : 'admin-table-row'
}
</script>

<template>
  <AdminLayout active-key="ability-list-base">
    <div class="page-root">
      <section class="admin-hero">
        <div class="hero-content">
          <div class="hero-emblem">
            <img class="hero-emblem-img" :src="baseHeroEmblem" alt="" />
          </div>
          <div class="hero-main">

            <div class="hero-stats">
              <div class="stat-item">
                <span>优化建议共</span>
                <strong class="blue">{{ stats.total }}</strong>
                <b>条</b>
              </div>
              <div class="stat-item">
                <span>制度文件</span>
                <strong>{{ stats.policy }}</strong>
                <b>条</b>
              </div>
              <div class="stat-item">
                <span>运行反馈</span>
                <strong>{{ stats.feedback }}</strong>
                <b>条</b>
              </div>
              <div class="stat-item">
                <span>人工补充</span>
                <strong>{{ stats.manual }}</strong>
                <b>条</b>
              </div>
              <div class="stat-item">
                <span>待确认</span>
                <strong class="orange">{{ stats.pending }}</strong>
                <b>条</b>
              </div>
              <div class="stat-item">
                <span>已采纳</span>
                <strong class="green">{{ stats.adopted }}</strong>
                <b>条</b>
              </div>
              <div class="stat-item">
                <span>已弃用</span>
                <strong>{{ stats.rejected }}</strong>
                <b>条</b>
              </div>
            </div>
            <div class="hero-actions">
              <Button @click="uploadPolicy">⇧ 上传制度文件</Button>
              <Button variant="secondary" @click="rerunAnalysis">⟳ 重新分析运行反馈</Button>
              <Button
                variant="secondary"
                :disabled="pendingApplicationCount === 0"
                @click="applyToBaseTemplate"
              >
                形成修订草稿（{{ pendingApplicationCount }}）
              </Button>
              <Button variant="ghost" @click="viewVersionHistory">查看版本记录 ›</Button>
            </div>
            <p class="hero-note">
              基于制度文件和运行反馈形成优化建议，人工确认后生成修订草稿，发布新版本后生效。
              <span v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</span>
            </p>
          </div>
        </div>
        <div
          class="hero-art"
          :style="{ backgroundImage: `url(${baseHeroArt})` }"
          aria-hidden="true"
        />
      </section>

      <div class="main-workspace">
        <aside class="source-panel admin-card">
          <div class="admin-card-header">
            <h3 class="admin-card-title">建议来源</h3>
          </div>
          <div class="source-list">
            <button
              v-for="source in suggestionSources"
              :key="source.key"
              class="source-item"
              :class="{ active: selectedSource === source.key }"
              @click="selectSource(source.key)"
            >
              <span>{{ source.icon }}</span>
              {{ source.label }}
            </button>
          </div>
        </aside>

        <section class="suggestions-panel admin-card">
          <div class="admin-card-header">
            <h3 class="admin-card-title">优化建议列表</h3>
          </div>
          <div class="filter-tags">
            <button
              v-for="tag in filterTags"
              :key="tag.key"
              class="filter-tag"
              :class="{ active: selectedTag === tag.key }"
              @click="selectTag(tag.key)"
            >
              {{ tag.label }}
            </button>
          </div>

          <div class="admin-table-container">
            <AdminTable
              :data="filteredSuggestions"
              row-key="id"
              :row-class-name="suggestionRowClassName"
              empty-text="暂无符合条件的优化建议"
              @row-click="selectSuggestion"
            >
              <AdminTableColumn label="来源" min-width="100">
                <template #default="{ row }">
                  <span class="source-badge" :class="row.source">{{ row.sourceLabel }}</span>
                </template>
              </AdminTableColumn>
              <AdminTableColumn label="问题类型" min-width="110">
                <template #default="{ row }">
                  <span class="issue-badge">{{ row.issueType }}</span>
                </template>
              </AdminTableColumn>
              <AdminTableColumn prop="keyLocation" label="关键位置" min-width="150" />
              <AdminTableColumn prop="content" label="建议内容" min-width="220" />
              <AdminTableColumn prop="basis" label="来源依据" min-width="160" />
              <AdminTableColumn label="处理状态" min-width="110">
                <template #default="{ row }">
                  <StatusBadge :status="row.status" />
                </template>
              </AdminTableColumn>
              <AdminTableColumn label="操作" min-width="250" fixed="right">
                <template #default="{ row }">
                    <div class="action-buttons">
                      <Button variant="ghost" size="sm" @click.stop="handleAction('view', row)">查看详情</Button>
                      <Button v-if="row.status === 'pending'" size="sm" @click.stop="handleAction('adopt', row)">采纳</Button>
                      <Button v-if="row.status === 'pending'" variant="secondary" size="sm" @click.stop="handleAction('defer', row)">暂缓</Button>
                      <Button v-if="row.status === 'pending'" variant="danger" size="sm" @click.stop="handleAction('reject', row)">弃用</Button>
                      <Button v-if="row.status === 'adopted'" size="sm" @click.stop="applyToBaseTemplate">应用</Button>
                    </div>
                </template>
              </AdminTableColumn>
            </AdminTable>
          </div>
        </section>

        <aside class="detail-panel admin-card">
          <div class="admin-card-header detail-header">
            <h3 class="admin-card-title">建议详情</h3>
          </div>
          <div v-if="selectedSuggestion" class="suggestion-detail">
            <div class="detail-item">
              <span>建议来源：</span>
              <strong>{{ selectedSuggestion.sourceLabel }}</strong>
            </div>
            <div class="detail-item">
              <span>问题类型：</span>
              <strong>{{ selectedSuggestion.issueType }}</strong>
            </div>
            <div class="detail-item">
              <span>关键位置：</span>
              <strong>{{ selectedSuggestion.keyLocation }}</strong>
            </div>
            <div class="detail-item">
              <span>建议内容：</span>
              <strong>{{ selectedSuggestion.content }}</strong>
            </div>
            <div class="detail-item">
              <span>来源依据：</span>
              <strong>{{ selectedSuggestion.basis }}</strong>
            </div>
            <div class="detail-item">
              <span>影响说明：</span>
              <strong>无法准确记录和评价企业实践相关成果，影响教师成果完整性与评价公平性。</strong>
            </div>
            <div class="detail-item">
              <span>处置意见：</span>
              <strong>计划修订该指标，并明确成果类别、确认口径与适用范围。</strong>
            </div>
          </div>

          <div v-if="selectedSuggestion" class="detail-actions">
            <Button
              v-if="selectedSuggestion.status === 'pending'"
              @click="handleAction('adopt', selectedSuggestion)"
            >
              采纳建议
            </Button>
            <Button
              v-if="selectedSuggestion.status === 'adopted'"
              @click="applyToBaseTemplate"
            >
              形成修订草稿
            </Button>
            <Button
              v-if="selectedSuggestion.status === 'pending'"
              variant="secondary"
              @click="handleAction('defer', selectedSuggestion)"
            >
              暂缓处理
            </Button>
          </div>
        </aside>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.page-root {
  min-height: calc(100vh - var(--admin-topbar-height) - var(--admin-page-gutter-y) * 2);
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 1vw, 18px);
  color: var(--color-admin-text-strong);
}

.page-root *,
.page-root *::before,
.page-root *::after {
  box-sizing: border-box;
}

.operation-message {
  display: inline-flex;
  margin-left: var(--space-admin-sm);
  color: var(--color-admin-primary);
  font-size: 13px;
  font-weight: 800;
}

.admin-hero {
  position: relative;
  min-height: clamp(230px, 15.5vw, 270px);
  overflow: hidden;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #ffffff 0%, #eef7ff 100%);
}

.admin-hero::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.995) 34%,
    rgba(255, 255, 255, 0.96) 50%,
    rgba(255, 255, 255, 0.76) 66%,
    rgba(255, 255, 255, 0.24) 86%,
    rgba(255, 255, 255, 0) 100%
  );
  content: '';
}

.hero-art {
  position: absolute;
  top: clamp(8px, 0.8vw, 14px);
  right: clamp(12px, 1vw, 22px);
  bottom: clamp(8px, 0.8vw, 14px);
  z-index: 0;
  width: min(52%, 720px);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  opacity: 0.9;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: clamp(230px, 15.5vw, 270px);
  max-width: min(900px, 66%);
  align-items: center;
  gap: clamp(18px, 1.2vw, 26px);
  padding: 0 0 0 clamp(24px, 1.75vw, 34px);
}

.hero-emblem {
  flex: none;
  transform: translateY(-36px);
}

.hero-emblem-img {
  display: block;
  width: clamp(66px, 4vw, 78px);
  height: clamp(66px, 4vw, 78px);
  filter: drop-shadow(0 16px 26px rgba(11, 99, 246, 0.18));
}

.hero-main {
  min-width: 0;
  flex: 1;
}

.hero-title {
  margin: 0 0 24px;
  color: var(--color-admin-text-strong);
  font-size: clamp(24px, 1.55vw, 30px);
  line-height: 1.16;
  font-weight: 950;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(7, minmax(72px, max-content));
  gap: 0;
}

.stat-item {
  min-height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 clamp(14px, 1vw, 22px);
  border-left: 1px solid #d7e2f2;
}

.stat-item:first-child {
  border-left: 0;
  padding-left: 0;
}

.stat-item span {
  color: #263b63;
  font-size: 14px;
  font-weight: 700;
}

.stat-item strong {
  margin-top: var(--space-admin-xs);
  color: var(--color-admin-text-strong);
  font-size: 30px;
  line-height: 1;
  font-weight: 900;
}

.stat-item strong.blue {
  color: var(--color-admin-primary);
}

.stat-item strong.orange {
  color: #f26a16;
}

.stat-item strong.green {
  color: #18a663;
}

.stat-item b {
  color: var(--color-admin-text-strong);
  font-size: 13px;
}

.hero-actions {
  margin-top: var(--space-admin-2xl);
  display: flex;
  align-items: center;
  gap: var(--space-admin-md-lg);
  flex-wrap: wrap;
}

.hero-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.hero-note {
  margin: 12px 0 0;
  max-width: 760px;
  color: var(--color-admin-text-subtle);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.6;
}

.main-workspace {
  display: grid;
  grid-template-columns: 186px minmax(520px, 1fr) 386px;
  gap: var(--space-admin-lg);
  align-items: start;
}

.admin-card {
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-faint);
  overflow: hidden;
}

.admin-card-header {
  min-height: 58px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4ebf5;
}

.admin-card-title {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 17px;
  font-weight: 900;
}

.source-list {
  display: grid;
  gap: var(--space-admin-sm);
  padding: var(--space-admin-lg);
}

.source-item,
.filter-tag {
  border: 0;
  cursor: pointer;
}

.source-item {
  height: 48px;
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
  padding: 0 14px;
  border-radius: var(--radius-sm);
  background: transparent;
  color: #263b63;
  font-size: 14px;
  font-weight: 800;
  text-align: left;
}

.source-item span {
  color: var(--color-admin-primary);
}

.source-item.active {
  background: #eaf2ff;
  color: var(--color-admin-primary);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-sm);
  padding: 16px 20px;
}

.filter-tag {
  height: 34px;
  padding: 0 16px;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-sm);
  background: #f7faff;
  color: #4d5d75;
  font-size: 13px;
  font-weight: 800;
}

.filter-tag.active {
  border-color: var(--color-admin-primary);
  background: #e8f0ff;
  color: var(--color-admin-primary);
}

.admin-table-container {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  table-layout: fixed;
}

.admin-table th,
.admin-table td {
  padding: 12px 10px;
  border-top: 1px solid #e8eef7;
  color: var(--color-admin-text-strong);
  font-size: 12px;
  line-height: 1.45;
  text-align: left;
  vertical-align: middle;
}

.admin-table th {
  background: #f7faff;
  color: var(--color-admin-text-muted);
  font-weight: 900;
}

.admin-table th:nth-child(1),
.admin-table td:nth-child(1) {
  width: 11%;
}

.admin-table th:nth-child(2),
.admin-table td:nth-child(2) {
  width: 12%;
}

.admin-table th:nth-child(3),
.admin-table td:nth-child(3) {
  width: 16%;
}

.admin-table th:nth-child(4),
.admin-table td:nth-child(4) {
  width: 20%;
}

.admin-table th:nth-child(5),
.admin-table td:nth-child(5) {
  width: 16%;
}

.admin-table th:nth-child(6),
.admin-table td:nth-child(6) {
  width: 9%;
}

.admin-table th:nth-child(7),
.admin-table td:nth-child(7) {
  width: 16%;
}

.admin-table-row {
  cursor: pointer;
}

.admin-table-row.active {
  outline: 2px solid var(--color-admin-primary);
  outline-offset: -2px;
  background: #fbfdff;
}

.source-badge,
.issue-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 800;
}

.source-badge.feedback {
  background: #e8f0ff;
  color: var(--color-admin-primary);
}

.source-badge.policy {
  background: #dff8ec;
  color: #18a663;
}

.source-badge.manual {
  background: #fff0df;
  color: #f26a16;
}

.issue-badge {
  background: #fff0df;
  color: #f26a16;
}

.action-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.action-buttons :deep(button) {
  min-height: 0;
  height: auto;
  padding: 0 2px;
  border: 0;
  background: transparent;
  box-shadow: none;
  color: var(--color-admin-primary);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.6;
}

.action-buttons :deep(button:hover) {
  background: transparent;
  color: var(--color-admin-primary-hover);
}

.detail-panel {
  min-height: 620px;
}

.detail-header {
  border-bottom: 2px solid var(--color-admin-primary);
}

.suggestion-detail {
  display: grid;
  gap: 22px;
  padding: 22px 26px;
}

.detail-item {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: var(--space-admin-lg);
  color: #263b63;
  font-size: 14px;
  line-height: 1.7;
}

.detail-item span {
  color: var(--color-admin-text-muted);
  font-weight: 800;
}

.detail-item strong {
  color: #263b63;
  font-weight: 700;
}

.detail-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-admin-card-gap);
  padding: 22px 26px 26px;
}


@media (max-width: 1360px) {
  .admin-hero {
    grid-template-columns: 80px minmax(0, 1fr);
  }

  .hero-art {
    display: none;
  }

  .hero-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .main-workspace {
    grid-template-columns: 200px minmax(0, 1fr);
  }

  .detail-panel {
    grid-column: 1 / -1;
  }
}

@media (max-width: 900px) {
  .admin-hero,
  .main-workspace,
  .hero-stats,
  .detail-actions {
    grid-template-columns: 1fr;
  }

  .hero-actions,
  .page-description {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
