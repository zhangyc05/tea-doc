<script setup lang="ts">
import { computed, ref } from 'vue'
import { EmptyState, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import {
  continueReportAnalysis,
  exportReport,
  getReportState,
  openReportAiAssistant,
  openReportDetail,
  regenerateReport,
} from '@/stores/admin/reportStore'

const reportState = getReportState()
const activeTab = ref('全部')
const selectedTarget = ref('全部')
const selectedPeriod = ref('2026 年度')
const selectedStatus = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const operationMessage = useOperationMessage()

const tabs = ['全部', '分析报告', '分析大屏', '专题解读', '数据问答']
const selectedReport = computed(() => reportState.reports.find(report => report.id === reportState.selectedReportId) ?? null)

const filteredReports = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return reportState.reports.filter((report) => {
    const matchesTab = activeTab.value === '全部'
      || report.type === activeTab.value
      || (activeTab.value === '专题解读' && report.type === '图表解读')
    const matchesTarget = selectedTarget.value === '全部' || report.target === selectedTarget.value
    const matchesStatus = selectedStatus.value === '全部' || report.status === selectedStatus.value
    const matchesKeyword = !keyword
      || `${report.title} ${report.type} ${report.target} ${report.basis}`.toLowerCase().includes(keyword)

    return matchesTab && matchesTarget && matchesStatus && matchesKeyword
  })
})

function selectTab(tab: string) {
  activeTab.value = tab
  operationMessage.set(`已切换到「${tab}」，共 ${filteredReports.value.length} 条。`)
}

function handleCardAction(cardId: string, action: string) {
  if (action === '重新生成' || action === '更新') {
    regenerateReport(cardId)
  } else if (action === '导出') {
    exportReport(cardId)
  } else if (action === '继续分析' || action === '继续追问') {
    continueReportAnalysis(cardId, action)
  } else if (action === '查看大屏') {
    openReportDetail(cardId, 'dashboard')
  } else if (action === '查看原因') {
    openReportDetail(cardId, 'insufficient-data')
  } else {
    openReportDetail(cardId)
  }

  operationMessage.fromStore(reportState)
}

function resetFilters() {
  selectedTarget.value = '全部'
  selectedPeriod.value = '2026 年度'
  selectedStatus.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  operationMessage.set('已重置筛选条件。')
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  operationMessage.set(`已筛选出 ${filteredReports.value.length} 条报告。`)
}

function openAiAssistant() {
  openReportAiAssistant(filteredReports.value.map(report => report.id))
  operationMessage.fromStore(reportState)
}

</script>

<template>
  <AdminLayout active-key="reports">
    <div class="report-center-page">
      <section class="main-section">
        <div class="toolbar">
          <div class="tabs-container">
            <button
              v-for="tab in tabs"
              :key="tab"
              :class="['tab-btn', { active: activeTab === tab }]"
              @click="selectTab(tab)"
            >
              {{ tab }}
            </button>
          </div>

          <div class="filters">
            <label class="filter-item">
              <span>对象：</span>
              <select v-model="selectedTarget">
                <option>全部</option>
                <option>全校教师</option>
                <option>智能制造学院</option>
                <option>全校</option>
                <option>虚拟教研室</option>
                <option>教师发展管理</option>
              </select>
            </label>
            <label class="filter-item">
              <span>周期：</span>
              <select v-model="selectedPeriod">
                <option>2026 年度</option>
                <option>2025 年度</option>
                <option>2024 年度</option>
              </select>
            </label>
            <label class="filter-item">
              <span>状态：</span>
              <select v-model="selectedStatus">
                <option>全部</option>
                <option>已生成</option>
                <option>待更新</option>
                <option>数据不足</option>
              </select>
            </label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索报告名称 / 分析问题"
              class="search-input"
              @keyup.enter="applyFilters"
            />
            <Button variant="outline" size="icon" title="查询" @click="applyFilters">⌕</Button>
            <Button variant="outline" @click="resetFilters">重置</Button>
          </div>
        </div>

        <div class="reports-grid">
          <article
            v-for="report in filteredReports"
            :key="report.id"
            class="report-card"
          >
            <div class="report-icon" :class="report.tone">{{ report.icon }}</div>
            <div class="report-body">
              <h2>{{ report.title }}</h2>
              <div class="report-meta">
                <span><b>类型：</b>{{ report.type }}</span>
                <span><b>对象：</b>{{ report.target }}</span>
                <span><b>依据：</b>{{ report.basis }}</span>
                <span><b>生成时间：</b>{{ report.generatedTime }}</span>
                <span>
                  <b>状态：</b>
                  <StatusBadge :status="report.status" />
                </span>
              </div>
            </div>
            <div class="card-footer">
              <Button
                v-for="button in report.buttons"
                :key="button"
                class="report-card-action"
                variant="outline"
                @click="handleCardAction(report.id, button)"
              >
                {{ button }}
              </Button>
            </div>
          </article>
          <EmptyState
            v-if="filteredReports.length === 0"
            class="report-empty-state"
            title="暂无符合条件的分析报告"
          />
        </div>

        <div v-if="selectedReport || reportState.aiSession.active" class="detail-grid">
          <section v-if="selectedReport" class="detail-panel">
            <div class="panel-header">
              <h2>
                {{ reportState.detailMode === 'dashboard' ? '大屏预览' : reportState.detailMode === 'insufficient-data' ? '原因说明' : '报告详情' }}
              </h2>
              <StatusBadge :status="selectedReport.status" />
            </div>
            <div class="detail-content">
              <strong>{{ selectedReport.title }}</strong>
              <p>分析对象：{{ selectedReport.target }}</p>
              <p>分析依据：{{ selectedReport.basis }}</p>
              <p>生成时间：{{ selectedReport.generatedTime }}</p>
              <p>导出状态：{{ selectedReport.exportStatus }}</p>
              <div class="history-list">
                <span v-for="item in selectedReport.actionHistory" :key="item">{{ item }}</span>
              </div>
            </div>
          </section>

          <section v-if="reportState.aiSession.active" class="detail-panel ai-panel">
            <div class="panel-header">
              <h2>AI 分析助手</h2>
              <StatusBadge status="已准备" />
            </div>
            <div class="detail-content">
              <strong>{{ reportState.aiSession.prompt }}</strong>
              <p>来源报告：{{ selectedReport?.title || '当前筛选结果' }}</p>
              <p>下一步可基于当前报告依据继续生成追问、解读或管理建议。</p>
            </div>
          </section>
        </div>

        <div class="assistant-row">
          <button class="ai-assistant" @click="openAiAssistant">AI 助手生成分析</button>
          <span v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</span>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.report-center-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.report-center-page *,
.report-center-page *::before,
.report-center-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 18px;
  border-bottom: 1px solid #e4ebf5;
  background: #fff;
}

.header-content,
.main-section {
  max-width: 1560px;
  margin: 0 auto;
  padding-left: 22px;
  padding-right: 22px;
}

.header-content h1 {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 22px;
  font-weight: 800;
}

.main-section {
  position: relative;
  padding-top: 22px;
  padding-bottom: 72px;
}

.intro-row {
  min-height: 58px;
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
  color: #263b63;
  font-size: 16px;
}

.intro-row p {
  margin: 0;
  font-weight: 600;
}

.spark {
  color: #355cff;
  font-size: 24px;
}

.operation-message {
  margin-left: auto;
  color: var(--color-admin-primary);
  font-size: 13px;
  font-weight: 700;
}

.toolbar {
  margin-top: 34px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 24px;
}

.tabs-container {
  display: flex;
  align-items: center;
  gap: 26px;
}

.tab-btn {
  position: relative;
  height: 36px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #3d4e6f;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.tab-btn.active {
  color: var(--color-admin-primary);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 3px;
  border-radius: 3px;
  background: var(--color-admin-primary);
}

.filters {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-admin-md);
}

.filter-item,
.search-input {
  height: 40px;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-admin-panel);
  background: #fff;
}

.filter-item {
  min-width: 148px;
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  padding: 0 12px;
}

.filter-item span {
  color: var(--color-admin-text-muted);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.filter-item select {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--color-admin-text-strong);
  font-size: 13px;
  font-weight: 600;
}

.search-input {
  width: 250px;
  padding: 0 12px;
  color: var(--color-admin-text-strong);
  font-size: 13px;
  outline: none;
}

.search-input:focus,
.filter-item:focus-within {
  border-color: var(--color-admin-primary);
  box-shadow: 0 0 0 3px rgba(18, 104, 246, 0.1);
}

.report-card-action,
.ai-assistant {
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.reports-grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px 18px;
}

.report-card {
  min-height: 270px;
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0 18px;
  padding: 28px 24px 24px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  box-shadow: var(--shadow-admin-card-faint);
}

.report-card:hover {
  box-shadow: 0 10px 28px rgba(35, 64, 110, 0.08);
}

.report-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 34px;
  font-weight: 800;
}

.report-icon.blue {
  color: var(--color-admin-primary);
  background: #e8f0ff;
}

.report-icon.green {
  color: #18a663;
  background: #dff8ec;
}

.report-icon.purple {
  color: #7a35f2;
  background: #efe7ff;
}

.report-icon.orange {
  color: #f26a16;
  background: #fff0df;
}

.report-icon.teal {
  color: #00a58a;
  background: #e1f8f3;
}

.report-icon.chat {
  color: var(--color-admin-primary);
  background: #e8f0ff;
  font-size: 20px;
}

.report-body h2 {
  margin: 0 0 16px;
  color: var(--color-admin-text-strong);
  font-size: 18px;
  line-height: 1.4;
  font-weight: 800;
}

.report-meta {
  display: grid;
  gap: var(--space-admin-sm);
  color: #263b63;
  font-size: 14px;
  line-height: 1.4;
}

.report-meta b {
  color: #4d5d75;
  font-weight: 700;
}

.card-footer {
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 18px;
  padding-top: 22px;
  flex-wrap: wrap;
}

.report-card-action {
  min-width: 92px;
  height: 40px;
  padding: 0 18px;
  color: var(--color-admin-primary);
}

.report-card-action:hover {
  border-color: var(--color-admin-primary);
  background: var(--color-admin-primary);
  color: #fff;
}

.report-empty-state {
  grid-column: 1 / -1;
}

.detail-grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.detail-panel {
  min-height: 210px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  box-shadow: var(--shadow-admin-card-faint);
  overflow: hidden;
}

.panel-header {
  min-height: 58px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-bottom: 1px solid #e4ebf5;
}

.panel-header h2 {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 17px;
  font-weight: 800;
}

.detail-content {
  padding: 20px;
  display: grid;
  gap: var(--space-admin-sm);
  color: #4d5d75;
  font-size: 14px;
  line-height: 1.6;
}

.detail-content strong {
  color: var(--color-admin-text-strong);
  font-size: 16px;
}

.detail-content p {
  margin: 0;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-admin-xs);
}

.history-list span {
  padding: 5px 8px;
  border-radius: var(--radius-sm);
  background: #f1f6ff;
  color: var(--color-admin-primary);
  font-size: 12px;
  font-weight: 700;
}

.assistant-row {
  display: flex;
  align-items: center;
  gap: var(--space-admin-lg);
  justify-content: flex-end;
  margin-top: 34px;
}

.ai-assistant {
  height: 54px;
  padding: 0 28px;
  border: 0;
  border-radius: 28px;
  background: var(--color-admin-primary);
  color: #fff;
  box-shadow: 0 12px 24px rgba(18, 104, 246, 0.24);
  font-size: 16px;
}

@media (max-width: 1360px) {
  .toolbar {
    grid-template-columns: 1fr;
  }

  .filters {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .reports-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .reports-grid {
    grid-template-columns: 1fr;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .report-card {
    grid-template-columns: 1fr;
    gap: var(--space-admin-lg);
  }

  .card-footer {
    grid-column: 1;
  }

  .operation-message {
    margin-left: 0;
  }
}
</style>
