<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 当前选中的分类 Tab
const activeTab = ref('全部')

// 筛选条件
const selectedTarget = ref('全部')
const selectedPeriod = ref('2026 年度')
const selectedStatus = ref('全部')
const searchQuery = ref('')

// 分类 Tab 列表
const tabs = ['全部', '分析报告', '分析大屏', '专题解读', '数据问答']

// 报告卡片数据
interface ReportCard {
  id: string
  title: string
  type: string
  target: string
  basis: string
  generatedTime: string
  status: string
  buttons: string[]
}

const reports: ReportCard[] = [
  {
    id: '1',
    title: '2026 年度学校教师发展分析报告',
    type: '分析报告',
    target: '全校教师',
    basis: '正式档案事实 | 执行版能力清单',
    generatedTime: '06-24 10:20',
    status: '已生成',
    buttons: ['查看', '继续分析', '重新生成'],
  },
  {
    id: '2',
    title: '智能制造学院企业实践完成情况分析',
    type: '分析报告',
    target: '智能制造学院',
    basis: '企业实践记录 | 成长档案企业实践维度',
    generatedTime: '06-23 16:40',
    status: '已生成',
    buttons: ['查看', '继续分析'],
  },
  {
    id: '3',
    title: '全校教师能力结构分析大屏',
    type: '分析大屏',
    target: '全校',
    basis: '能力画像 | 正式档案事实',
    generatedTime: '06-22 14:10',
    status: '已生成',
    buttons: ['查看大屏', '继续分析'],
  },
  {
    id: '4',
    title: '虚拟教研室运行情况分析',
    type: '专题解读',
    target: '虚拟教研室',
    basis: '教研活动记录 | 已形成教研记录',
    generatedTime: '06-21 11:30',
    status: '待更新',
    buttons: ['查看', '更新'],
  },
  {
    id: '5',
    title: '成长档案事实覆盖分析',
    type: '图表解读',
    target: '全校',
    basis: '成长档案正式事实',
    generatedTime: '06-20 09:50',
    status: '数据不足',
    buttons: ['查看原因'],
  },
  {
    id: '6',
    title: '岗位 / 聘期要求对照问答',
    type: '数据问答',
    target: '教师发展管理',
    basis: '岗位画像 | 聘期要求 | 正式档案事实',
    generatedTime: '06-19 15:00',
    status: '已生成',
    buttons: ['查看', '继续追问'],
  },
]

function selectTab(tab: string) {
  activeTab.value = tab
}

function handleCardAction(cardId: string, action: string) {
  console.log(`卡片 ${cardId} 操作:`, action)
}

function resetFilters() {
  selectedTarget.value = '全部'
  selectedPeriod.value = '2026 年度'
  selectedStatus.value = '全部'
  searchQuery.value = ''
}

function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    '已生成': 'generated',
    '待更新': 'pending-update',
    '数据不足': 'insufficient-data',
  }
  return statusMap[status] || ''
}
</script>

<template>
  <AdminLayout active-key="reports">
    <div class="report-center-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>分析报告</span>
          </div>
          <h1 class="page-title">分析报告</h1>
          <p class="page-description">
            基于当前平台数据，用 AI 生成分析报告、分析大屏或专题解读。
          </p>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <!-- 分类 Tab -->
          <div class="tabs-section">
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
          </div>

          <!-- 筛选区 -->
          <div class="filter-section">
            <div class="filter-row">
              <div class="filter-item">
                <label class="filter-label">对象</label>
                <select v-model="selectedTarget" class="filter-select">
                  <option>全部</option>
                  <option>全校教师</option>
                  <option>智能制造学院</option>
                  <option>虚拟教研室</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">周期</label>
                <select v-model="selectedPeriod" class="filter-select">
                  <option>2026 年度</option>
                  <option>2025 年度</option>
                  <option>2024 年度</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">状态</label>
                <select v-model="selectedStatus" class="filter-select">
                  <option>全部</option>
                  <option>已生成</option>
                  <option>待更新</option>
                  <option>数据不足</option>
                </select>
              </div>
              <button class="btn-reset" @click="resetFilters">重置</button>
            </div>
            <div class="search-row">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索报告名称 / 分析问题"
                class="search-input"
              />
            </div>
          </div>

          <!-- 报告卡片网格 -->
          <div class="reports-section">
            <h2 class="section-title">报告列表</h2>
            <div class="reports-grid">
              <div
                v-for="report in reports"
                :key="report.id"
                class="report-card"
              >
                <div class="card-header">
                  <div class="card-type">{{ report.type }}</div>
                  <div
                    class="card-status"
                    :class="getStatusClass(report.status)"
                  >
                    {{ report.status }}
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-title">{{ report.title }}</h3>
                  <div class="card-info">
                    <div class="info-item">
                      <span class="info-label">对象：</span>
                      <span class="info-value">{{ report.target }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">依据：</span>
                      <span class="info-value">{{ report.basis }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">生成时间：</span>
                      <span class="info-value">{{ report.generatedTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button
                    v-for="button in report.buttons"
                    :key="button"
                    class="btn-action"
                    @click="handleCardAction(report.id, button)"
                  >
                    {{ button }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.report-center-page {
  min-height: 100vh;
  background: var(--color-page-bg);
}

.page-header {
  padding: 32px 0;
  background: white;
  border-bottom: 1px solid var(--color-card-border);
}

.header-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.page-description {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  overflow: hidden;
}

.tabs-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.tabs-container {
  display: flex;
  gap: 8px;
}

.tab-btn {
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.16s ease;
}

.tab-btn:hover {
  background: white;
  color: var(--color-text-primary);
}

.tab-btn.active {
  background: white;
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  outline: none;
  min-width: 140px;
}

.search-row {
  display: flex;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.btn-reset {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-reset:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.reports-section {
  padding: 24px;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.report-card {
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.16s ease;
  background: white;
}

.report-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 16px;
  background: #f8fafc;
  border-bottom: 1px solid var(--color-card-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-type {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.card-status {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
}

.card-status.generated {
  background: #d1fae5;
  color: #059669;
}

.card-status.pending-update {
  background: #fef3c7;
  color: #d97706;
}

.card-status.insufficient-data {
  background: #fee2e2;
  color: #dc2626;
}

.card-body {
  padding: 16px;
}

.card-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  font-size: 13px;
}

.info-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  min-width: 80px;
}

.info-value {
  color: var(--color-text-primary);
  flex: 1;
}

.card-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--color-card-border);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-action {
  padding: 8px 16px;
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-action:hover {
  background: var(--color-primary);
  color: white;
}

@media (max-width: 1024px) {
  .reports-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .reports-grid {
    grid-template-columns: 1fr;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .tabs-container {
    flex-wrap: wrap;
  }
}
</style>
