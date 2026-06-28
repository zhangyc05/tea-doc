<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 筛选条件
const selectedYear = ref('2026 年度')
const selectedDepartment = ref('全部')
const selectedMajor = ref('全部')
const selectedCompletion = ref('全部')
const selectedStatus = ref('全部')
const searchQuery = ref('')

// 统计数据
const annualStats = {
  required: 126,
  completed: 82,
  incomplete: 44,
}

const currentStats = {
  pendingReview: 8,
  inProgress: 12,
  materialPending: 6,
}

// 教师实践跟踪数据
interface PracticeTracking {
  id: string
  teacher: string
  department: string
  major: string
  completionStatus: string
  currentProgress: string
  recentAction: string
  requiredDays: number
  completedDays: number
  remainingDays: number
}

const trackings: PracticeTracking[] = [
  {
    id: '1',
    teacher: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    completionStatus: '未完成 30 天，已计入 18 天，还差 12 天',
    currentProgress: '未启动申请',
    recentAction: '暂无本年度申请',
    requiredDays: 30,
    completedDays: 18,
    remainingDays: 12,
  },
  {
    id: '2',
    teacher: '王老师',
    department: '智能制造学院',
    major: '工业机器人技术',
    completionStatus: '未完成 30 天，已计入 20 天，还差 10 天',
    currentProgress: '实践中',
    recentAction: '06-10 已提交实践申请',
    requiredDays: 30,
    completedDays: 20,
    remainingDays: 10,
  },
  {
    id: '3',
    teacher: '赵老师',
    department: '智能制造学院',
    major: '机器人一体化专业',
    completionStatus: '未完成 30 天，已计入 20 天，还差 10 天',
    currentProgress: '待审核申请',
    recentAction: '06-18 提交申请',
    requiredDays: 30,
    completedDays: 20,
    remainingDays: 10,
  },
  {
    id: '4',
    teacher: '陈老师',
    department: '电子信息学院',
    major: '软件技术专业',
    completionStatus: '已完成 30 天',
    currentProgress: '已完成',
    recentAction: '05-22 实践记录已归档',
    requiredDays: 30,
    completedDays: 30,
    remainingDays: 0,
  },
]

function remindApply(id: string) {
  console.log('提醒申请', id)
}

function viewRecord(id: string) {
  console.log('查看记录', id)
}

function exportList() {
  console.log('导出名单')
}

function resetFilters() {
  selectedYear.value = '2026 年度'
  selectedDepartment.value = '全部'
  selectedMajor.value = '全部'
  selectedCompletion.value = '全部'
  selectedStatus.value = '全部'
  searchQuery.value = ''
}
</script>

<template>
  <AdminLayout active-key="practice-tracking">
    <div class="practice-tracking-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>企业实践</span>
            <i class="separator">/</i>
            <span class="current">年度实践跟踪</span>
          </div>
          <h1 class="page-title">年度实践跟踪</h1>
          <p class="page-description">
            根据 2026 年度教师企业实践 30 天完成情况，查看未完成教师、待申请和待材料确认状态。
          </p>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <!-- 年度完成情况 -->
          <div class="stats-group">
            <h3 class="stats-group-title">年度完成情况</h3>
            <div class="stats-cards">
              <div class="stat-card">
                <div class="stat-value">{{ annualStats.required }}</div>
                <div class="stat-label">应完成教师</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ annualStats.completed }}</div>
                <div class="stat-label">已完成 30 天</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ annualStats.incomplete }}</div>
                <div class="stat-label">未完成 30 天</div>
              </div>
            </div>
          </div>

          <!-- 当前办理情况 -->
          <div class="stats-group">
            <h3 class="stats-group-title">当前办理情况</h3>
            <div class="stats-cards">
              <div class="stat-card">
                <div class="stat-value">{{ currentStats.pendingReview }}</div>
                <div class="stat-label">待审核申请</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ currentStats.inProgress }}</div>
                <div class="stat-label">实践中</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ currentStats.materialPending }}</div>
                <div class="stat-label">材料待确认</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <!-- 筛选区 -->
          <div class="filter-section">
            <div class="filter-row">
              <div class="filter-item">
                <label class="filter-label">年度</label>
                <select v-model="selectedYear" class="filter-select">
                  <option>2026 年度</option>
                  <option>2025 年度</option>
                  <option>2024 年度</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">院系</label>
                <select v-model="selectedDepartment" class="filter-select">
                  <option>全部</option>
                  <option>智能制造学院</option>
                  <option>电子信息学院</option>
                  <option>汽车工程学院</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">专业 / 教研室</label>
                <select v-model="selectedMajor" class="filter-select">
                  <option>全部</option>
                  <option>机电一体化技术</option>
                  <option>工业机器人技术</option>
                  <option>软件技术专业</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">完成情况</label>
                <select v-model="selectedCompletion" class="filter-select">
                  <option>全部</option>
                  <option>已完成 30 天</option>
                  <option>未完成 30 天</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">当前状态</label>
                <select v-model="selectedStatus" class="filter-select">
                  <option>全部</option>
                  <option>未启动申请</option>
                  <option>待审核申请</option>
                  <option>实践中</option>
                  <option>已完成</option>
                </select>
              </div>
              <button class="btn-reset" @click="resetFilters">重置</button>
              <button class="btn-primary" @click="exportList">导出名单</button>
            </div>
            <div class="search-row">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教师姓名 / 工号"
                class="search-input"
              />
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-section">
            <h2 class="table-title">教师实践跟踪</h2>
            <div class="table-container">
              <table class="tracking-table">
                <thead>
                  <tr>
                    <th>教师</th>
                    <th>年度实践</th>
                    <th>完成情况</th>
                    <th>当前进展</th>
                    <th>最近动作</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tracking in trackings" :key="tracking.id">
                    <td>{{ tracking.teacher }}</td>
                    <td>{{ tracking.department }} / {{ tracking.major }}</td>
                    <td>{{ tracking.completionStatus }}</td>
                    <td>
                      <span
                        class="status-badge"
                        :class="tracking.currentProgress"
                      >
                        {{ tracking.currentProgress }}
                      </span>
                    </td>
                    <td>{{ tracking.recentAction }}</td>
                    <td>
                      <button
                        v-if="tracking.currentProgress === '未启动申请'"
                        class="btn-remind"
                        @click="remindApply(tracking.id)"
                      >
                        提醒申请
                      </button>
                      <button
                        v-else-if="tracking.currentProgress === '待审核申请'"
                        class="btn-view"
                        @click="viewRecord(tracking.id)"
                      >
                        查看申请
                      </button>
                      <button
                        v-else-if="tracking.currentProgress === '实践中'"
                        class="btn-view"
                        @click="viewRecord(tracking.id)"
                      >
                        查看申请
                      </button>
                      <button
                        v-else-if="tracking.currentProgress === '已完成'"
                        class="btn-view"
                        @click="viewRecord(tracking.id)"
                      >
                        查看记录
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.practice-tracking-page {
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

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 600;
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

.stats-section {
  background: white;
  border-bottom: 1px solid var(--color-card-border);
}

.stats-container {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.stats-group-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 600;
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

.btn-primary {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #28a38a;
}

.table-section {
  padding: 24px;
}

.table-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.table-container {
  overflow-x: auto;
}

.tracking-table {
  width: 100%;
  border-collapse: collapse;
}

.tracking-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.tracking-table td {
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.tracking-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.未启动申请 {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.待审核申请 {
  background: #dbeafe;
  color: #2563eb;
}

.status-badge.实践中 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.已完成 {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-remind {
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-remind:hover {
  background: #28a38a;
}

.btn-view {
  padding: 6px 12px;
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-view:hover {
  background: var(--color-primary);
  color: white;
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>
