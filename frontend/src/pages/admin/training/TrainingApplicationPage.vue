<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 统计数据
const stats = {
  pending: 18,
  approved: 42,
  rejected: 5,
  closing: 3,
}

// 申请数据
interface TrainingApplication {
  id: string
  applicant: string
  department: string
  major: string
  trainingName: string
  reason: string
  applyTime: string
  quotaInfo: string
  status: string
}

const applications: TrainingApplication[] = [
  {
    id: '1',
    applicant: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    trainingName: '2026 年暑期数字化教学能力提升培训',
    reason: '希望提升课堂数据应用能力',
    applyTime: '2026-06-21 10:20',
    quotaInfo: '18 / 30',
    status: '待处理',
  },
  {
    id: '2',
    applicant: '陈老师',
    department: '电子信息学院',
    major: '软件技术',
    trainingName: 'AI 赋能课程建设专题培训',
    reason: '课程建设需要使用 AI 工具',
    applyTime: '2026-06-22 09:15',
    quotaInfo: '46 / 52',
    status: '待处理',
  },
  {
    id: '3',
    applicant: '王老师',
    department: '智能制造学院',
    major: '工业机器人技术',
    trainingName: '双师型教师实践能力提升培训',
    reason: '与本学期实训课程相关',
    applyTime: '2026-06-20 16:40',
    quotaInfo: '24 / 25',
    status: '已同意',
  },
  {
    id: '4',
    applicant: '赵老师',
    department: '现代服务学院',
    major: '电子商务',
    trainingName: '课程思政教学设计研修',
    reason: '申请参加本次专题研修',
    applyTime: '2026-06-18 14:30',
    quotaInfo: '30 / 30',
    status: '未同意',
  },
  {
    id: '5',
    applicant: '孙老师',
    department: '外语学院',
    major: '应用英语',
    trainingName: '数字化教学资源建设培训',
    reason: '计划优化课程资源设计',
    applyTime: '2026-06-17 11:05',
    quotaInfo: '12 / 20',
    status: '已取消',
  },
]

const applicationRows = ref<TrainingApplication[]>(applications)
const selectedOrganization = ref('全校')
const selectedStatus = ref('全部')
const selectedTraining = ref('全部')
const selectedYear = ref('2026 年度')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeApplicationId = ref('1')
const operationMessage = ref('')

const filteredApplications = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return applicationRows.value.filter((app) => {
    const matchesOrganization = selectedOrganization.value === '全校' || app.department === selectedOrganization.value
    const matchesStatus = selectedStatus.value === '全部' || app.status === selectedStatus.value
    const matchesTraining = selectedTraining.value === '全部' || app.trainingName.includes(selectedTraining.value)
    const matchesKeyword = !keyword
      || `${app.applicant} ${app.department} ${app.major} ${app.trainingName}`.toLowerCase().includes(keyword)

    return matchesOrganization && matchesStatus && matchesTraining && matchesKeyword
  })
})

const activeApplication = computed(() => {
  return applicationRows.value.find((app) => app.id === activeApplicationId.value) ?? applicationRows.value[0]
})

function handleApplication(id: string) {
  const target = applicationRows.value.find((app) => app.id === id)
  if (!target) return
  target.status = '已同意'
  activeApplicationId.value = id
  operationMessage.value = `${target.applicant} 的申请已同意。`
}

function viewDetail(id: string) {
  activeApplicationId.value = id
  operationMessage.value = '已在右侧展示申请摘要。'
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  operationMessage.value = `已筛选出 ${filteredApplications.value.length} 条申请。`
}

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedStatus.value = '全部'
  selectedTraining.value = '全部'
  selectedYear.value = '2026 年度'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  operationMessage.value = '已重置筛选条件。'
}

function showPendingApplications() {
  selectedStatus.value = '待处理'
  selectedOrganization.value = '全校'
  selectedTraining.value = '全部'
  selectedYear.value = '2026 年度'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  operationMessage.value = '已切换到待处理申请。'
}
</script>

<template>
  <AdminLayout active-key="training-applications">
    <div class="training-application-page">
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">培训管理 / <strong>申请处理</strong></div>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-pending">▤</div>
            <div>
              <div class="stat-label">待处理申请</div>
              <div class="stat-value blue">{{ stats.pending }}</div>
              <div class="stat-desc">当前待确认的培训申请</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-approved">✓</div>
            <div>
              <div class="stat-label">已同意</div>
              <div class="stat-value green">{{ stats.approved }}</div>
              <div class="stat-desc">已纳入培训名单</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-rejected">×</div>
            <div>
              <div class="stat-label">未同意</div>
              <div class="stat-value red">{{ stats.rejected }}</div>
              <div class="stat-desc">本次未纳入培训名单</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-closing">◷</div>
            <div>
              <div class="stat-label">即将截止</div>
              <div class="stat-value purple">{{ stats.closing }}</div>
              <div class="stat-desc">申请即将截止的培训</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="application-workspace">
          <div class="main-content">
            <div class="content-card">
              <div class="card-header">
                <h2>培训申请</h2>
              </div>
              <div class="filter-section">
                <div class="filter-row">
                  <label class="filter-field">
                    <span>组织范围：</span>
                    <select v-model="selectedOrganization" class="filter-select">
                      <option>全校</option>
                      <option>智能制造学院</option>
                      <option>电子信息学院</option>
                      <option>现代服务学院</option>
                      <option>外语学院</option>
                    </select>
                  </label>
                  <label class="filter-field">
                    <span>申请状态：</span>
                    <select v-model="selectedStatus" class="filter-select">
                      <option>全部</option>
                      <option>待处理</option>
                      <option>已同意</option>
                      <option>未同意</option>
                      <option>已取消</option>
                    </select>
                  </label>
                  <label class="filter-field">
                    <span>申请培训：</span>
                    <select v-model="selectedTraining" class="filter-select">
                      <option>全部</option>
                      <option>数字化教学</option>
                      <option>AI 赋能</option>
                      <option>双师型教师</option>
                      <option>课程思政</option>
                    </select>
                  </label>
                  <label class="filter-field">
                    <span>申请时间：</span>
                    <select v-model="selectedYear" class="filter-select">
                      <option>2026 年度</option>
                      <option>2025 年度</option>
                    </select>
                  </label>
                </div>
                <div class="action-row">
                  <input
                    v-model="searchQuery"
                    class="search-input"
                    placeholder="搜索教师、培训名称、院系"
                    @keyup.enter="applyFilters"
                  />
                  <button class="btn-reset" type="button" @click="resetFilters">重置</button>
                  <button class="btn-primary" type="button" @click="applyFilters">查询</button>
                  <span v-if="operationMessage" class="operation-message">{{ operationMessage }}</span>
                </div>
              </div>
              <!-- 数据表格 -->
              <div class="table-container">
                <table class="application-table">
                  <thead>
                    <tr>
                      <th>申请人</th>
                      <th>院系 / 专业</th>
                      <th>申请培训</th>
                      <th>申请理由</th>
                      <th>申请时间</th>
                      <th>计划名额</th>
                      <th>申请状态</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="app in filteredApplications"
                      :key="app.id"
                      :class="{ active: activeApplicationId === app.id }"
                    >
                      <td>{{ app.applicant }}</td>
                      <td>{{ app.department }} / {{ app.major }}</td>
                      <td>{{ app.trainingName }}</td>
                      <td>{{ app.reason }}</td>
                      <td>{{ app.applyTime }}</td>
                      <td>{{ app.quotaInfo }}</td>
                      <td>
                        <span class="status-badge" :class="app.status">
                          {{ app.status }}
                        </span>
                      </td>
                      <td>
                        <button
                          v-if="app.status === '待处理'"
                          class="btn-handle"
                          @click="handleApplication(app.id)"
                        >
                          处理
                        </button>
                        <button
                          v-else
                          class="btn-view"
                          @click="viewDetail(app.id)"
                        >
                          查看
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredApplications.length === 0">
                      <td colspan="8" class="empty-cell">暂无符合条件的培训申请</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="pagination-row">
                <span>共 5 条</span>
                <button class="page-button" type="button" aria-label="上一页">‹</button>
                <button class="page-button active" type="button">1</button>
                <button class="page-button" type="button" aria-label="下一页">›</button>
                <select class="page-size" aria-label="每页条数">
                  <option>10条/页</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 右侧：处理提醒 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">处理提醒</h3>
              <div class="reminders-list">
                <div class="reminder-item">
                  <span class="reminder-icon blue">▤</span>
                  <div class="reminder-content">
                    <div class="reminder-title">待处理申请</div>
                    <div class="reminder-desc">18 条申请待处理，主要集中在数字化教学能力提升培训。</div>
                  </div>
                </div>
                <div class="reminder-item">
                  <span class="reminder-icon orange">●</span>
                  <div class="reminder-content">
                    <div class="reminder-title">名额接近上限</div>
                    <div class="reminder-desc">2 个培训报名人数接近计划名额，建议优先处理待处理申请。</div>
                  </div>
                </div>
                <div class="reminder-item">
                  <span class="reminder-icon purple">◷</span>
                  <div class="reminder-content">
                    <div class="reminder-title">申请即将截止</div>
                    <div class="reminder-desc">3 个培训将在 3 天内结束申请，建议及时确认名单。</div>
                  </div>
                </div>
              </div>
              <div class="selected-application" v-if="activeApplication">
                <div class="reminder-title">当前查看申请</div>
                <div class="selected-name">{{ activeApplication.applicant }} · {{ activeApplication.trainingName }}</div>
                <div class="reminder-desc">{{ activeApplication.department }} / {{ activeApplication.major }}</div>
              </div>
              <button class="outline-action" type="button" @click="showPendingApplications">
                查看待处理申请
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-application-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
}

.training-application-page *,
.training-application-page *::before,
.training-application-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 12px;
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
  color: #66758f;
  font-size: 14px;
  font-weight: 600;
}

.breadcrumb strong {
  color: #1268f6;
}

.stats-section {
  background: #f6f9ff;
}

.stats-container {
  padding: 0 22px 22px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  min-height: 142px;
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  padding: 22px 30px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
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
  color: #1268f6;
  background: #e8f0ff;
}

.icon-approved {
  color: #18a663;
  background: #dff8ec;
}

.icon-rejected {
  color: #ff613f;
  background: #fff0e8;
}

.icon-closing {
  color: #8848e8;
  background: #efe7ff;
}

.stat-value {
  margin-top: 8px;
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
}

.stat-value.blue {
  color: #1268f6;
}

.stat-value.green {
  color: #18a663;
}

.stat-value.red {
  color: #ff613f;
}

.stat-value.purple {
  color: #8848e8;
}

.stat-label {
  font-size: 15px;
  color: #17233d;
  font-weight: 600;
}

.stat-desc {
  margin-top: 10px;
  color: #6c7890;
  font-size: 13px;
}

.main-section {
  padding: 0 22px 30px;
}

.application-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.card-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.card-header h2 {
  margin: 0;
  color: #17233d;
  font-size: 18px;
  font-weight: 700;
}

.filter-section {
  padding: 0 20px 18px;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(142px, 1fr));
  gap: 10px;
  align-items: center;
}

.filter-field {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: #263653;
  font-size: 13px;
  font-weight: 600;
}

.filter-select,
.search-input {
  width: 100%;
  height: 40px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  background: #fff;
  color: #1a2944;
  font-size: 13px;
  outline: none;
}

.filter-select {
  padding: 0 32px 0 12px;
}

.search-input {
  padding: 0 14px;
}

.search-input:focus,
.filter-select:focus {
  border-color: #1268f6;
}

.action-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.action-row .search-input {
  flex: 1 1 420px;
}

.btn-reset,
.btn-primary {
  height: 40px;
  padding: 0 22px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.btn-reset {
  background: #fff;
  border: 1px solid #d7e2f1;
  color: #44536c;
}

.btn-primary {
  background: #1268f6;
  border: 1px solid #1268f6;
  color: #fff;
  box-shadow: 0 8px 18px rgba(18, 104, 246, 0.18);
}

.btn-primary:hover {
  background: #0d57d4;
}

.operation-message {
  color: #1268f6;
  font-size: 13px;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
  padding: 0 20px;
}

.application-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #dce6f5;
}

.application-table th {
  padding: 13px 10px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #17233d;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #dce6f5;
  background: #f8fbff;
}

.application-table td {
  padding: 15px 10px;
  font-size: 13px;
  line-height: 1.55;
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
  width: 8%;
  font-weight: 700;
}

.application-table th:nth-child(2),
.application-table td:nth-child(2) {
  width: 18%;
}

.application-table th:nth-child(3),
.application-table td:nth-child(3) {
  width: 17%;
}

.application-table th:nth-child(4),
.application-table td:nth-child(4) {
  width: 16%;
}

.application-table th:nth-child(5),
.application-table td:nth-child(5) {
  width: 13%;
}

.application-table th:nth-child(6),
.application-table td:nth-child(6) {
  width: 10%;
  text-align: center;
}

.application-table th:nth-child(7),
.application-table td:nth-child(7) {
  width: 11%;
}

.application-table th:nth-child(8),
.application-table td:nth-child(8) {
  width: 7%;
}

.application-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.status-badge.待处理 {
  background: #eaf2ff;
  color: #1268f6;
  border: 1px solid #cfe0ff;
}

.status-badge.已同意 {
  background: #dff8ec;
  color: #18a663;
  border: 1px solid #bdeed7;
}

.status-badge.未同意 {
  background: #fff0e8;
  color: #ff613f;
  border: 1px solid #ffd3c4;
}

.status-badge.已取消 {
  background: #eef2f7;
  color: #66758f;
  border: 1px solid #d8e0ec;
}

.btn-handle,
.btn-view {
  padding: 0;
  background: transparent;
  color: #1268f6;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.empty-cell {
  height: 120px;
  text-align: center;
  color: #66758f;
}

.pagination-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px 20px;
  color: #52617a;
  font-size: 13px;
}

.page-button {
  min-width: 34px;
  height: 34px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  background: #fff;
  color: #17233d;
  font-weight: 700;
}

.page-button.active {
  background: #1268f6;
  color: #fff;
  border-color: #1268f6;
}

.page-size {
  width: 104px;
  height: 34px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  background: #fff;
  color: #17233d;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.sidebar-title {
  margin: 0 0 22px;
  font-size: 18px;
  font-weight: 700;
  color: #17233d;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.reminder-item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  min-height: 118px;
  padding: 18px 16px;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  background: #fff;
}

.reminder-icon {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
}

.reminder-icon.blue {
  color: #1268f6;
  background: #e8f0ff;
}

.reminder-icon.orange {
  color: #f26a16;
  background: #fff0df;
}

.reminder-icon.purple {
  color: #8848e8;
  background: #efe7ff;
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-size: 14px;
  font-weight: 700;
  color: #17233d;
  margin-bottom: 8px;
}

.reminder-desc {
  font-size: 13px;
  line-height: 1.65;
  color: #52617a;
}

.selected-application {
  margin-top: 14px;
  padding: 16px;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  background: #f8fbff;
}

.selected-name {
  margin-bottom: 6px;
  color: #17233d;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
}

.outline-action {
  width: 100%;
  height: 48px;
  margin-top: 16px;
  border: 1px solid #1268f6;
  border-radius: 6px;
  background: #1268f6;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .application-workspace {
    grid-template-columns: 1fr;
  }

  .filter-row {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  .sidebar-card {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .sidebar-title,
  .reminders-list,
  .outline-action {
    grid-column: 1 / -1;
  }

  .reminders-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .stat-card,
  .reminder-item {
    grid-template-columns: 64px minmax(0, 1fr);
    padding: 18px;
  }

  .stat-icon,
  .reminder-icon {
    width: 58px;
    height: 58px;
  }

  .filter-row,
  .sidebar-card,
  .reminders-list {
    grid-template-columns: 1fr;
  }

  .action-row {
    flex-wrap: wrap;
  }
}
</style>
