<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getAbilityListOptimizationMock } from '@/services/mock/ability-list'
import {
  adoptOptimizationSuggestion,
  applyAdoptedSuggestionsToBaseTemplate,
  getAbilityListState,
  updateOptimizationSuggestionStatus,
  type OptimizationSuggestion,
} from '@/stores/admin/abilityListStore'

const abilityListState = getAbilityListState()
const { suggestionSources, filterTags } = getAbilityListOptimizationMock()

const selectedSource = ref('all')
const selectedSuggestionId = ref('suggestion-enterprise-practice')
const selectedTag = ref('all')
const operationMessage = ref('')

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
  operationMessage.value = `已按建议来源筛选出 ${filteredSuggestions.value.length} 条。`
}

function selectSuggestion(suggestion: OptimizationSuggestion) {
  selectedSuggestionId.value = suggestion.id
  operationMessage.value = `已选中建议：${suggestion.issueType}。`
}

function selectTag(key: string) {
  selectedTag.value = key
  operationMessage.value = `已按问题类型筛选出 ${filteredSuggestions.value.length} 条。`
}

function handleAction(action: string, suggestion: OptimizationSuggestion) {
  if (action === 'view') {
    selectSuggestion(suggestion)
    operationMessage.value = '已在右侧展示建议详情。'
    return
  }

  if (action === 'adopt') {
    adoptOptimizationSuggestion(suggestion.id)
    selectedSuggestionId.value = suggestion.id
    operationMessage.value = abilityListState.operationMessage
    return
  }

  if (action === 'defer') {
    updateOptimizationSuggestionStatus(suggestion.id, 'deferred')
    operationMessage.value = '该建议已暂缓处理。'
    return
  }

  if (action === 'reject') {
    updateOptimizationSuggestionStatus(suggestion.id, 'rejected')
    operationMessage.value = '该建议已弃用。'
  }
}

function applyToBaseTemplate() {
  applyAdoptedSuggestionsToBaseTemplate()
  operationMessage.value = abilityListState.operationMessage
}

function uploadPolicy() {
  operationMessage.value = '已准备上传制度文件，用于补充优化建议来源。'
}

function rerunAnalysis() {
  operationMessage.value = '已重新分析运行反馈，并刷新待确认建议。'
}

function viewVersionHistory() {
  operationMessage.value = '已打开基准模板版本记录入口。'
}
</script>

<template>
  <AdminLayout active-key="ability-list-base">
    <div class="page-root">
      <div class="page-breadcrumb">
        <span>能力清单</span>
        <i>/</i>
        <span>基准模板</span>
        <i>/</i>
        <strong>优化基准模板</strong>
      </div>
      <div class="page-description">
        基于制度文件和运行反馈形成优化建议，人工确认后再应用到基准模板。
        <span v-if="operationMessage" class="operation-message">{{ operationMessage }}</span>
      </div>

      <section class="admin-hero">
        <div class="hero-icon">▤</div>
        <div class="hero-content">
          <h1 class="hero-title">优化基准模板</h1>
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
            <button class="btn-primary" @click="uploadPolicy">⇧ 上传制度文件</button>
            <button class="btn-secondary" @click="rerunAnalysis">⟳ 重新分析运行反馈</button>
            <button
              class="btn-secondary"
              :disabled="pendingApplicationCount === 0"
              @click="applyToBaseTemplate"
            >
              应用到基准模板（{{ pendingApplicationCount }}）
            </button>
            <button class="btn-link-large" @click="viewVersionHistory">查看版本记录 ›</button>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <span></span>
          <b></b>
          <i></i>
        </div>
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
            <table class="admin-table">
              <thead>
                <tr>
                  <th>来源</th>
                  <th>问题类型</th>
                  <th>关键位置</th>
                  <th>建议内容</th>
                  <th>来源依据</th>
                  <th>处理状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="suggestion in filteredSuggestions"
                  :key="suggestion.id"
                  class="admin-table-row"
                  :class="{ active: selectedSuggestion?.id === suggestion.id }"
                  @click="selectSuggestion(suggestion)"
                >
                  <td><span class="source-badge" :class="suggestion.source">{{ suggestion.sourceLabel }}</span></td>
                  <td><span class="issue-badge">{{ suggestion.issueType }}</span></td>
                  <td>{{ suggestion.keyLocation }}</td>
                  <td>{{ suggestion.content }}</td>
                  <td>{{ suggestion.basis }}</td>
                  <td>
                    <span class="badge-status" :class="`status-${suggestion.status}`">{{ suggestion.statusLabel }}</span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn-link" @click.stop="handleAction('view', suggestion)">查看详情</button>
                      <button v-if="suggestion.status === 'pending'" class="btn-link" @click.stop="handleAction('adopt', suggestion)">采纳</button>
                      <button v-if="suggestion.status === 'pending'" class="btn-link" @click.stop="handleAction('defer', suggestion)">暂缓</button>
                      <button v-if="suggestion.status === 'pending'" class="btn-link" @click.stop="handleAction('reject', suggestion)">弃用</button>
                      <button v-if="suggestion.status === 'adopted'" class="btn-link" @click.stop="applyToBaseTemplate">应用</button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredSuggestions.length === 0">
                  <td colspan="7" class="empty-cell">暂无符合条件的优化建议</td>
                </tr>
              </tbody>
            </table>
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
            <button
              v-if="selectedSuggestion.status === 'pending'"
              class="btn-primary"
              @click="handleAction('adopt', selectedSuggestion)"
            >
              采纳建议
            </button>
            <button
              v-if="selectedSuggestion.status === 'adopted'"
              class="btn-primary"
              @click="applyToBaseTemplate"
            >
              应用到基准模板
            </button>
            <button
              v-if="selectedSuggestion.status === 'pending'"
              class="btn-secondary"
              @click="handleAction('defer', selectedSuggestion)"
            >
              暂缓处理
            </button>
          </div>
        </aside>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.page-root {
  min-height: 100vh;
  padding: 26px 24px 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f6f9ff;
  color: #17233d;
}

.page-root *,
.page-root *::before,
.page-root *::after {
  box-sizing: border-box;
}

.page-breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #66758f;
  font-size: 14px;
  font-weight: 700;
}

.page-breadcrumb strong {
  color: #17233d;
}

.page-description {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #263b63;
  font-size: 15px;
  line-height: 1.6;
}

.operation-message {
  color: #1268f6;
  font-size: 13px;
  font-weight: 800;
}

.admin-hero {
  position: relative;
  min-height: 268px;
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) 350px;
  gap: 24px;
  padding: 44px 42px;
  overflow: hidden;
  border: 1px solid #dce6f5;
  border-radius: 18px;
  background: linear-gradient(135deg, #f8fbff 0%, #eef7ff 100%);
}

.hero-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #1268f6;
  color: #fff;
  box-shadow: 0 14px 24px rgba(18, 104, 246, 0.24);
  font-size: 38px;
}

.hero-title {
  margin: 0 0 28px;
  color: #17233d;
  font-size: 28px;
  font-weight: 900;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(7, minmax(76px, 1fr));
  gap: 0;
}

.stat-item {
  min-height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 22px;
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
  margin-top: 8px;
  color: #17233d;
  font-size: 30px;
  line-height: 1;
  font-weight: 900;
}

.stat-item strong.blue {
  color: #1268f6;
}

.stat-item strong.orange {
  color: #f26a16;
}

.stat-item strong.green {
  color: #18a663;
}

.stat-item b {
  color: #17233d;
  font-size: 13px;
}

.hero-actions {
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.hero-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.hero-art {
  position: relative;
  min-height: 170px;
}

.hero-art span,
.hero-art b,
.hero-art i {
  position: absolute;
  display: block;
  border-radius: 18px;
  transform: rotate(45deg);
}

.hero-art span {
  right: 116px;
  bottom: 28px;
  width: 72px;
  height: 138px;
  background: linear-gradient(180deg, #1268f6, #78b8ff);
}

.hero-art b {
  right: 34px;
  bottom: 18px;
  width: 78px;
  height: 172px;
  background: linear-gradient(180deg, #46d8d3, #9deee9);
}

.hero-art i {
  right: 210px;
  bottom: 26px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: rgba(18, 104, 246, 0.08);
}

.main-workspace {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 440px;
  gap: 16px;
  align-items: start;
}

.admin-card {
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.04);
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
  color: #17233d;
  font-size: 17px;
  font-weight: 900;
}

.source-list {
  display: grid;
  gap: 10px;
  padding: 16px;
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
  gap: 12px;
  padding: 0 14px;
  border-radius: 6px;
  background: transparent;
  color: #263b63;
  font-size: 14px;
  font-weight: 800;
  text-align: left;
}

.source-item span {
  color: #1268f6;
}

.source-item.active {
  background: #eaf2ff;
  color: #1268f6;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px 20px;
}

.filter-tag {
  height: 34px;
  padding: 0 16px;
  border: 1px solid #d7e2f2;
  border-radius: 6px;
  background: #f7faff;
  color: #4d5d75;
  font-size: 13px;
  font-weight: 800;
}

.filter-tag.active {
  border-color: #1268f6;
  background: #e8f0ff;
  color: #1268f6;
}

.admin-table-container {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  min-width: 890px;
  border-collapse: collapse;
  table-layout: fixed;
}

.admin-table th,
.admin-table td {
  padding: 15px 14px;
  border-top: 1px solid #e8eef7;
  color: #17233d;
  font-size: 13px;
  line-height: 1.55;
  text-align: left;
  vertical-align: middle;
}

.admin-table th {
  background: #f7faff;
  color: #66758f;
  font-weight: 900;
}

.admin-table-row {
  cursor: pointer;
}

.admin-table-row.active {
  outline: 2px solid #1268f6;
  outline-offset: -2px;
  background: #fbfdff;
}

.source-badge,
.issue-badge,
.badge-status {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
}

.source-badge.feedback {
  background: #e8f0ff;
  color: #1268f6;
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

.badge-status.status-pending {
  background: #fff0df;
  color: #f26a16;
}

.badge-status.status-adopted {
  background: #dff8ec;
  color: #18a663;
}

.badge-status.status-applied {
  background: #e8f0ff;
  color: #1268f6;
}

.badge-status.status-rejected,
.badge-status.status-deferred {
  background: #eef3fb;
  color: #66758f;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-link {
  border: 0;
  background: transparent;
  color: #1268f6;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.detail-panel {
  min-height: 620px;
}

.detail-header {
  border-bottom: 2px solid #1268f6;
}

.suggestion-detail {
  display: grid;
  gap: 22px;
  padding: 22px 26px;
}

.detail-item {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 16px;
  color: #263b63;
  font-size: 14px;
  line-height: 1.7;
}

.detail-item span {
  color: #66758f;
  font-weight: 800;
}

.detail-item strong {
  color: #263b63;
  font-weight: 700;
}

.detail-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  padding: 22px 26px 26px;
}

.btn-primary,
.btn-secondary,
.btn-link-large {
  height: 44px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.btn-primary {
  padding: 0 24px;
  border: 1px solid #1268f6;
  background: #1268f6;
  color: #fff;
}

.btn-secondary {
  padding: 0 24px;
  border: 1px solid #cfdcf0;
  background: #fff;
  color: #263b63;
}

.btn-primary:hover,
.btn-secondary:hover {
  border-color: #0d55d8;
  background: #0d55d8;
  color: #fff;
}

.btn-link-large {
  border: 0;
  background: transparent;
  color: #1268f6;
}

.empty-cell {
  padding: 28px;
  color: #8a98ad;
  text-align: center;
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
