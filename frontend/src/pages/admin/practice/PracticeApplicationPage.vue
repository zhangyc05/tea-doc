<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CompactFilterBar, EmptyState, StatusBadge } from '@/components/common'
import { PageReviewPanel } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  approvePracticeApplication,
  getPracticeState,
  returnPracticeApplication,
} from '@/stores/admin/practiceStore'
import { practiceApplicationPageReview } from './PracticeApplicationPage.review'

const router = useRouter()
const route = useRoute()
const practiceState = getPracticeState()
const reviewPanelOpen = ref(route.query.review === '1')

// 筛选条件
const selectedYear = ref('2026 年度')
const selectedDepartment = ref('全部')
const selectedStatus = ref('全部')
const selectedTime = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeApplicationId = ref('1')
// 统计数据
const stats = computed(() => ({
  pending: practiceState.applications.filter(app => app.status === '待审核').length,
  approved: practiceState.applications.filter(app => app.status === '已同意').length,
  returned: practiceState.applications.filter(app => app.status === '退回修改').length,
  inProgress: practiceState.trackings.filter(item => item.currentProgress === '实践中').length,
}))

// 分页
const currentPage = ref(1)
const pageSize = 10
const total = computed(() => practiceState.applications.length)
const applicationRows = computed(() => practiceState.applications)

const filteredApplications = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return applicationRows.value.filter((app) => {
    const matchesDepartment = selectedDepartment.value === '全部' || app.department === selectedDepartment.value
    const matchesStatus = selectedStatus.value === '全部' || app.status === selectedStatus.value
    const matchesTime = selectedTime.value === '全部' || app.practicePeriod.includes(selectedTime.value.replace('年', '-').replace('月', ''))
    const matchesKeyword = !keyword
      || `${app.teacher} ${app.teacherNo} ${app.company} ${app.department}`.toLowerCase().includes(keyword)

    return matchesDepartment && matchesStatus && matchesTime && matchesKeyword
  })
})

const activeApplication = computed(() => {
  return applicationRows.value.find((app) => app.id === activeApplicationId.value) ?? applicationRows.value[0]
})

function resetFilters() {
  selectedYear.value = '2026 年度'
  selectedDepartment.value = '全部'
  selectedStatus.value = '全部'
  selectedTime.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  practiceState.operationMessage = '已重置筛选条件。'
}

function viewApplication(id: string) {
  activeApplicationId.value = id
  practiceState.operationMessage = '已在表格中定位该实践申请。'
}

function viewRecordForApplication(id: string) {
  activeApplicationId.value = id
  const record = practiceState.records.find(item => item.applicationId === id)
  if (!record) {
    practiceState.operationMessage = '当前申请尚未生成实践记录。'
    return
  }
  router.push(`/admin/practice/records?recordId=${record.id}`)
}

function approveApplication(id: string) {
  approvePracticeApplication(id)
  activeApplicationId.value = id
}

function returnApplication(id: string) {
  returnPracticeApplication(id)
  activeApplicationId.value = id
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  practiceState.operationMessage = `已筛选出 ${filteredApplications.value.length} 条实践申请。`
}

function toggleReviewPanel() {
  reviewPanelOpen.value = !reviewPanelOpen.value
}

</script>

<template>
  <AdminLayout active-key="practice-applications">
    <div class="practice-application-page">
      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-pending">▤</div>
            <div>
              <div class="stat-label">待审核申请</div>
              <div class="stat-value blue">{{ stats.pending }} <span>条</span></div>
              <div class="stat-desc">较上月 +2</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-approved">✓</div>
            <div>
              <div class="stat-label">已同意申请</div>
              <div class="stat-value green">{{ stats.approved }} <span>条</span></div>
              <div class="stat-desc">较上月 +8</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-return">↻</div>
            <div>
              <div class="stat-label">退回修改</div>
              <div class="stat-value orange">{{ stats.returned }} <span>条</span></div>
              <div class="stat-desc">较上月 -1</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-progress">●</div>
            <div>
              <div class="stat-label">实践已开始</div>
              <div class="stat-value purple">{{ stats.inProgress }} <span>人</span></div>
              <div class="stat-desc">较上月 +3</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <!-- 筛选区 -->
          <CompactFilterBar>
            <template #fields>
              <label class="filter-item">
                <span class="filter-label">年度：</span>
                <select v-model="selectedYear" class="filter-select">
                  <option>2026 年度</option>
                  <option>2025 年度</option>
                  <option>2024 年度</option>
                </select>
              </label>
              <label class="filter-item">
                <span class="filter-label">院系：</span>
                <select v-model="selectedDepartment" class="filter-select">
                  <option>全部</option>
                  <option>智能制造学院</option>
                  <option>电子信息学院</option>
                  <option>汽车工程学院</option>
                  <option>财经商贸学院</option>
                </select>
              </label>
              <label class="filter-item">
                <span class="filter-label">申请状态：</span>
                <select v-model="selectedStatus" class="filter-select">
                  <option>全部</option>
                  <option>待审核</option>
                  <option>已同意</option>
                  <option>退回修改</option>
                  <option>已撤回</option>
                </select>
              </label>
              <label class="filter-item">
                <span class="filter-label">实践时间：</span>
                <select v-model="selectedTime" class="filter-select">
                  <option>全部</option>
                  <option>2026-07</option>
                  <option>2026-06</option>
                  <option>2026-05</option>
                </select>
              </label>
            </template>
            <template #search>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教师姓名 / 工号 / 实践单位"
                class="search-input"
                @keyup.enter="applyFilters"
              />
            </template>
            <template #actions>
              <Button variant="outline" @click="resetFilters">重置</Button>
              <Button @click="applyFilters">查询</Button>
            </template>
            <template #message>
              <span v-if="practiceState.operationMessage" class="operation-message">{{ practiceState.operationMessage }}</span>
            </template>
          </CompactFilterBar>

          <!-- 数据表格 -->
          <div class="table-section">
            <div class="table-container">
              <table class="application-table">
                <thead>
                  <tr>
                    <th>申请教师</th>
                    <th>年度实践情况</th>
                    <th>实践单位 / 岗位</th>
                    <th>实践时间 / 预计天数</th>
                    <th>申请状态</th>
                    <th>申请时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="app in filteredApplications"
                    :key="app.id"
                    :class="{ active: activeApplicationId === app.id }"
                  >
                    <td>
                      <div class="teacher-name">{{ app.teacher }}</div>
                      <div class="sub-text">工号：{{ app.teacherNo }}</div>
                      <div class="sub-text">{{ app.department }}</div>
                    </td>
                    <td>
                      <div>已计入 {{ app.annualStatus.match(/已计入\s*(\d+)/)?.[1] ?? '0' }} 天</div>
                      <div class="remaining-days">还差 {{ app.remainingDays }} 天</div>
                    </td>
                    <td>
                      <div class="company-name">{{ app.company }}</div>
                      <div class="sub-text">{{ app.position }}</div>
                    </td>
                    <td>
                      <div>{{ app.practicePeriod.split('，')[0] }}</div>
                      <div class="sub-text">预计 {{ app.estimatedDays }} 天</div>
                    </td>
                    <td>
                      <StatusBadge :status="app.status" />
                    </td>
                    <td>{{ app.applyTime }}</td>
                    <td>
                      <div
                        v-if="app.status === '待审核'"
                        class="row-action-group"
                      >
                        <Button variant="ghost" size="sm" @click="viewApplication(app.id)">
                          查看申请
                        </Button>
                        <Button size="sm" @click="approveApplication(app.id)">同意</Button>
                        <Button variant="danger" size="sm" @click="returnApplication(app.id)">
                          退回修改
                        </Button>
                      </div>
                      <div v-else class="row-action-group">
                        <Button variant="ghost" size="sm" @click="viewApplication(app.id)">
                          查看申请
                        </Button>
                        <Button
                          v-if="app.status === '已同意'"
                          variant="ghost"
                          size="sm"
                          @click="viewRecordForApplication(app.id)"
                        >
                          查看记录
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredApplications.length === 0">
                    <EmptyState as="td" variant="cell" :colspan="7" title="暂无符合条件的实践申请" />
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 分页区域 -->
            <div class="pagination-section">
              <div class="pagination-info">
                共 {{ total }} 条
              </div>
              <div class="pagination-controls">
                <span class="page-button" aria-label="上一页">‹</span>
                <span class="page-button active" aria-current="page">{{ currentPage }}</span>
                <span class="page-button" aria-label="下一页">›</span>
                <span>前往</span>
                <input class="page-input" value="1" aria-label="页码" readonly />
                <span>页</span>
                <select class="page-size" aria-label="每页条数">
                  <option>{{ pageSize }} 条/页</option>
                </select>
              </div>
            </div>
            <div class="selected-summary" v-if="activeApplication">
              当前查看：{{ activeApplication.teacher }}，{{ activeApplication.status }}，{{ activeApplication.company }}。
            </div>
          </div>
        </div>
      </section>

      <PageReviewPanel
        :open="reviewPanelOpen"
        :review="practiceApplicationPageReview"
      />

      <button
        class="review-floating-button"
        :class="{ shifted: reviewPanelOpen }"
        type="button"
        :aria-pressed="reviewPanelOpen"
        @click="toggleReviewPanel"
      >
        {{ reviewPanelOpen ? '关闭说明' : '页面说明' }}
      </button>
    </div>
  </AdminLayout>
</template>

<style scoped>
.practice-application-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.practice-application-page *,
.practice-application-page *::before,
.practice-application-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 18px;
}

.header-content,
.stats-container,
.main-section {
  max-width: 1560px;
  margin: 0 auto;
}

.header-content {
  padding: 0 22px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  font-size: 14px;
  color: var(--color-admin-text-muted);
  margin-bottom: var(--space-admin-md);
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-admin-primary);
  font-weight: 600;
}

.page-description {
  margin: 0;
  font-size: 15px;
  color: #344563;
  font-weight: 600;
  line-height: 1.5;
}

.stats-section {
  background: var(--color-admin-bg);
}

.stats-container {
  padding: 0 22px 22px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-admin-xl);
}

.stat-card {
  min-height: 132px;
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-card-gap);
  padding: 22px 30px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-subtle);
}

.stat-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 800;
}

.icon-pending {
  color: var(--color-admin-primary);
  background: #e8f0ff;
}

.icon-approved {
  color: #18a663;
  background: #dff8ec;
}

.icon-return {
  color: #f26a16;
  background: #fff0df;
}

.icon-progress {
  color: #8848e8;
  background: #efe7ff;
}

.stat-value {
  margin-top: var(--space-admin-xs);
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
}

.stat-value span {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-admin-text-strong);
}

.stat-value.blue {
  color: var(--color-admin-primary);
}

.stat-value.green {
  color: #18a663;
}

.stat-value.orange {
  color: #f26a16;
}

.stat-value.purple {
  color: #8848e8;
}

.stat-label {
  font-size: 15px;
  color: var(--color-admin-text-strong);
  font-weight: 600;
}

.stat-desc {
  margin-top: var(--space-admin-sm);
  color: #52617a;
  font-size: 13px;
}

.main-section {
  padding: 0 22px 30px;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-subtle);
}

.content-card :deep(.compact-filter-bar) {
  padding-top: 16px;
}

.filter-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-xs);
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #263653;
  white-space: nowrap;
}

.filter-select {
  width: 100%;
  height: 40px;
  padding: 0 32px 0 12px;
  border: 1px solid #d7e2f1;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: #1a2944;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.search-input {
  flex: 1;
  height: 40px;
  padding: 0 14px;
  border: 1px solid #d7e2f1;
  border-radius: var(--radius-sm);
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-admin-primary);
}

.operation-message {
  color: var(--color-admin-primary);
  font-size: 13px;
  font-weight: 600;
}

.table-section {
  padding: 0;
}

.table-container {
  overflow-x: auto;
  padding: 0 20px;
}

.application-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid var(--color-admin-border);
}

.application-table th {
  padding: 13px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-admin-text-strong);
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid var(--color-admin-border);
  background: var(--color-admin-bg-soft);
}

.application-table td {
  padding: 13px 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #24314c;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #e4ecf7;
  vertical-align: middle;
}

.application-table th:last-child,
.application-table td:last-child {
  border-right: none;
}

.application-table tr.active td {
  background: #f4f8ff;
}

.application-table th:nth-child(1),
.application-table td:nth-child(1) {
  width: 13%;
}

.application-table th:nth-child(2),
.application-table td:nth-child(2) {
  width: 12%;
}

.application-table th:nth-child(3),
.application-table td:nth-child(3) {
  width: 19%;
}

.application-table th:nth-child(4),
.application-table td:nth-child(4) {
  width: 21%;
}

.application-table th:nth-child(5),
.application-table td:nth-child(5) {
  width: 10%;
  text-align: center;
}

.application-table th:nth-child(6),
.application-table td:nth-child(6) {
  width: 13%;
  text-align: center;
}

.application-table th:nth-child(7),
.application-table td:nth-child(7) {
  width: 12%;
  text-align: center;
}

.application-table tr:last-child td {
  border-bottom: none;
}

.teacher-name,
.company-name {
  color: var(--color-admin-text-strong);
  font-weight: 700;
}

.sub-text {
  color: #52617a;
  font-size: 12px;
}

.remaining-days {
  color: var(--color-admin-primary);
  font-weight: 700;
}

.row-action-group {
  display: flex;
  gap: var(--space-admin-xs);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.pagination-info {
  font-size: 13px;
  color: #52617a;
}

.pagination-controls {
  display: flex;
  gap: var(--space-admin-md);
  align-items: center;
  color: #52617a;
  font-size: 13px;
}

.page-button,
.page-input,
.page-size {
  height: 34px;
  border: 1px solid #d7e2f1;
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--color-admin-text-strong);
}

.page-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  font-weight: 700;
}

.page-button.active {
  background: var(--color-admin-primary);
  border-color: var(--color-admin-primary);
  color: #fff;
}

.page-input {
  width: 52px;
  text-align: center;
}

.page-size {
  width: 108px;
}

.selected-summary {
  padding: 0 20px 20px;
  color: var(--color-admin-primary);
  font-size: 13px;
  font-weight: 600;
}

.review-floating-button {
  position: fixed;
  top: calc(var(--admin-topbar-height) + var(--space-admin-md-lg));
  right: var(--space-admin-2xl);
  z-index: 31;
  min-width: 104px;
  min-height: 42px;
  border: 1px solid var(--color-admin-primary);
  border-radius: var(--radius-full);
  background: var(--color-admin-primary);
  box-shadow: var(--shadow-admin-primary-action);
  color: var(--color-card-bg);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 900;
  padding: 0 var(--space-admin-lg);
}

.review-floating-button:hover {
  background: var(--color-admin-primary-hover);
}

.review-floating-button.shifted {
  right: min(460px, calc(100vw - 132px));
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .row-action-group {
    flex-direction: column;
  }

  .pagination-section,
  .pagination-controls {
    flex-wrap: wrap;
  }
}
</style>
