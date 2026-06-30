<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const activeTab = ref('全部')
const selectedTarget = ref('全部')
const selectedPeriod = ref('2026 年度')
const selectedStatus = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const operationMessage = ref('')

const tabs = ['全部', '分析报告', '分析大屏', '专题解读', '数据问答']

interface ReportCard {
  id: string
  title: string
  type: string
  target: string
  basis: string
  generatedTime: string
  status: string
  buttons: string[]
  icon: string
  tone: string
}

const reports = ref<ReportCard[]>([
  {
    id: '1',
    title: '2026 年度学校教师发展分析报告',
    type: '分析报告',
    target: '全校教师',
    basis: '正式档案事实 | 执行版能力清单',
    generatedTime: '06-24 10:20',
    status: '已生成',
    buttons: ['查看', '继续分析', '重新生成'],
    icon: '▤',
    tone: 'blue',
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
    icon: '▣',
    tone: 'green',
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
    icon: '▱',
    tone: 'purple',
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
    icon: '●',
    tone: 'orange',
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
    icon: '◔',
    tone: 'teal',
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
    icon: '●●',
    tone: 'chat',
  },
])

const filteredReports = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return reports.value.filter((report) => {
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
  operationMessage.value = `已切换到「${tab}」，共 ${filteredReports.value.length} 条。`
}

function handleCardAction(cardId: string, action: string) {
  const report = reports.value.find((item) => item.id === cardId)
  if (!report) return

  if (action === '重新生成' || action === '更新') {
    report.status = '已生成'
    report.generatedTime = '刚刚'
  }

  operationMessage.value = `${report.title}：${action}。`
}

function resetFilters() {
  selectedTarget.value = '全部'
  selectedPeriod.value = '2026 年度'
  selectedStatus.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  operationMessage.value = '已重置筛选条件。'
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  operationMessage.value = `已筛选出 ${filteredReports.value.length} 条报告。`
}

function openAiAssistant() {
  operationMessage.value = 'AI 助理已准备基于当前筛选结果生成分析。'
}

function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    已生成: 'generated',
    待更新: 'pending-update',
    数据不足: 'insufficient-data',
  }
  return statusMap[status] || ''
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
            <button class="icon-button" title="查询" @click="applyFilters">⌕</button>
            <button class="btn-reset" @click="resetFilters">重置</button>
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
                  <em class="card-status" :class="getStatusClass(report.status)">{{ report.status }}</em>
                </span>
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
          </article>
          <div v-if="filteredReports.length === 0" class="empty-panel">暂无符合条件的分析报告</div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.report-center-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
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
  color: #17233d;
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
  gap: 12px;
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
  color: #1268f6;
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
  color: #1268f6;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 3px;
  border-radius: 3px;
  background: #1268f6;
}

.filters {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.filter-item,
.search-input {
  height: 40px;
  border: 1px solid #d7e2f2;
  border-radius: 8px;
  background: #fff;
}

.filter-item {
  min-width: 148px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.filter-item span {
  color: #66758f;
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
  color: #17233d;
  font-size: 13px;
  font-weight: 600;
}

.search-input {
  width: 250px;
  padding: 0 12px;
  color: #17233d;
  font-size: 13px;
  outline: none;
}

.search-input:focus,
.filter-item:focus-within {
  border-color: #1268f6;
  box-shadow: 0 0 0 3px rgba(18, 104, 246, 0.1);
}

.icon-button,
.btn-reset,
.btn-action,
.ai-assistant {
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.icon-button {
  width: 40px;
  height: 40px;
  border: 1px solid #d7e2f2;
  background: #fff;
  color: #1268f6;
  font-size: 22px;
}

.btn-reset {
  height: 40px;
  padding: 0 14px;
  border: 1px solid #d7e2f2;
  background: #fff;
  color: #66758f;
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
  border: 1px solid #dce6f5;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.04);
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
  border-radius: 10px;
  font-size: 34px;
  font-weight: 800;
}

.report-icon.blue {
  color: #1268f6;
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
  color: #1268f6;
  background: #e8f0ff;
  font-size: 20px;
}

.report-body h2 {
  margin: 0 0 16px;
  color: #17233d;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 800;
}

.report-meta {
  display: grid;
  gap: 10px;
  color: #263b63;
  font-size: 14px;
  line-height: 1.4;
}

.report-meta b {
  color: #4d5d75;
  font-weight: 700;
}

.card-status {
  font-style: normal;
  font-weight: 800;
}

.card-status.generated {
  color: #18a663;
}

.card-status.pending-update {
  color: #f26a16;
}

.card-status.insufficient-data {
  color: #d92d20;
}

.card-footer {
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 18px;
  padding-top: 22px;
  flex-wrap: wrap;
}

.btn-action {
  min-width: 92px;
  height: 40px;
  padding: 0 18px;
  border: 1px solid #1268f6;
  background: #fff;
  color: #1268f6;
}

.btn-action:hover,
.icon-button:hover,
.btn-reset:hover {
  border-color: #1268f6;
  background: #1268f6;
  color: #fff;
}

.empty-panel {
  grid-column: 1 / -1;
  padding: 34px;
  border: 1px dashed #d7e2f2;
  border-radius: 8px;
  background: #fff;
  color: #8a98ad;
  text-align: center;
}

.assistant-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 34px;
}

.ai-assistant {
  height: 54px;
  padding: 0 28px;
  border: 0;
  border-radius: 28px;
  background: #1268f6;
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

  .report-card {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card-footer {
    grid-column: 1;
  }

  .operation-message {
    margin-left: 0;
  }
}
</style>
