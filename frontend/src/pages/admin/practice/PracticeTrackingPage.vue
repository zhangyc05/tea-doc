<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  getPracticeState,
  remindPracticeApplication,
} from '@/stores/admin/practiceStore'

const practiceState = getPracticeState()

// 筛选条件
const selectedYear = ref('2026 年度')
const selectedDepartment = ref('全部')
const selectedMajor = ref('全部')
const selectedCompletion = ref('全部')
const selectedStatus = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeTrackingId = ref('1')

// 统计数据
const annualStats = computed(() => ({
  required: practiceState.trackings.length,
  completed: practiceState.trackings.filter(item => item.remainingDays === 0).length,
  incomplete: practiceState.trackings.filter(item => item.remainingDays > 0).length,
}))

const currentStats = computed(() => ({
  pendingReview: practiceState.trackings.filter(item => item.currentProgress === '待审核申请').length,
  inProgress: practiceState.trackings.filter(item => item.currentProgress === '实践中').length,
  materialPending: practiceState.records.filter(item => item.currentStatus !== '已归档').length,
}))
const trackings = computed(() => practiceState.trackings)

const filteredTrackings = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return trackings.value.filter((tracking) => {
    const completionGroup = tracking.remainingDays === 0 ? '已完成 30 天' : '未完成 30 天'
    const matchesDepartment = selectedDepartment.value === '全部' || tracking.department === selectedDepartment.value
    const matchesMajor = selectedMajor.value === '全部' || tracking.major.includes(selectedMajor.value)
    const matchesCompletion = selectedCompletion.value === '全部' || completionGroup === selectedCompletion.value
    const matchesStatus = selectedStatus.value === '全部' || tracking.currentProgress === selectedStatus.value
    const matchesKeyword = !keyword
      || `${tracking.teacher} ${tracking.department} ${tracking.major}`.toLowerCase().includes(keyword)

    return matchesDepartment && matchesMajor && matchesCompletion && matchesStatus && matchesKeyword
  })
})

const activeTracking = computed(() => {
  return trackings.value.find((tracking) => tracking.id === activeTrackingId.value) ?? trackings.value[0]
})

function remindApply(id: string) {
  activeTrackingId.value = id
  remindPracticeApplication(id)
}

function viewRecord(id: string) {
  activeTrackingId.value = id
  practiceState.operationMessage = '已在表格中定位该教师实践状态。'
}

function exportList() {
  practiceState.operationMessage = `已准备导出 ${filteredTrackings.value.length} 条教师实践跟踪名单。`
}

function resetFilters() {
  selectedYear.value = '2026 年度'
  selectedDepartment.value = '全部'
  selectedMajor.value = '全部'
  selectedCompletion.value = '全部'
  selectedStatus.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  practiceState.operationMessage = '已重置筛选条件。'
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  practiceState.operationMessage = `已筛选出 ${filteredTrackings.value.length} 条实践跟踪记录。`
}
</script>

<template>
  <AdminLayout active-key="practice-tracking">
    <div class="practice-tracking-page">
    

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <!-- 年度完成情况 -->
          <div class="stats-group">
            <h3 class="stats-group-title">年度完成情况</h3>
            <div class="stats-cards">
              <div class="stat-card">
                <div class="stat-icon icon-people">●</div>
                <div>
                  <div class="stat-label">应完成教师</div>
                  <div class="stat-value blue">{{ annualStats.required }} <span>人</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-done">✓</div>
                <div>
                  <div class="stat-label">已完成 30 天</div>
                  <div class="stat-value green">{{ annualStats.completed }} <span>人</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-clock">◷</div>
                <div>
                  <div class="stat-label">未完成 30 天</div>
                  <div class="stat-value orange">{{ annualStats.incomplete }} <span>人</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 当前办理情况 -->
          <div class="stats-group">
            <h3 class="stats-group-title">当前办理情况</h3>
            <div class="stats-cards">
              <div class="stat-card">
                <div class="stat-icon icon-review">▤</div>
                <div>
                  <div class="stat-label">待审核申请</div>
                  <div class="stat-value purple">{{ currentStats.pendingReview }} <span>条</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-briefcase">▣</div>
                <div>
                  <div class="stat-label">实践中</div>
                  <div class="stat-value blue">{{ currentStats.inProgress }} <span>人</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-folder">▰</div>
                <div>
                  <div class="stat-label">待补材料</div>
                  <div class="stat-value amber">{{ currentStats.materialPending }} <span>条</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <div class="card-header">
            <h2 class="table-title">教师实践跟踪</h2>
            <button class="btn-primary" @click="exportList">⇧ 导出名单</button>
          </div>
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
            </div>
            <div class="search-row">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教师姓名 / 工号"
                class="search-input"
                @keyup.enter="applyFilters"
              />
              <button class="btn-reset" @click="resetFilters">重置</button>
              <button class="btn-secondary" @click="applyFilters">查询</button>
              <span v-if="practiceState.operationMessage" class="operation-message">{{ practiceState.operationMessage }}</span>
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-section">
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
                  <tr
                    v-for="tracking in filteredTrackings"
                    :key="tracking.id"
                    :class="{ active: activeTrackingId === tracking.id }"
                  >
                    <td>{{ tracking.teacher }}</td>
                    <td>
                      <div class="practice-org">{{ tracking.department }} / {{ tracking.major }}</div>
                      <div class="practice-days">已计入 {{ tracking.completedDays }} 天，还差 {{ tracking.remainingDays }} 天</div>
                    </td>
                    <td>
                      <span
                        class="completion-badge"
                        :class="tracking.remainingDays === 0 ? 'done' : 'undone'"
                      >
                        {{ tracking.remainingDays === 0 ? '已完成 30 天' : '未完成 30 天' }}
                      </span>
                    </td>
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
                  <tr v-if="filteredTrackings.length === 0">
                    <td colspan="6" class="empty-cell">暂无符合条件的教师实践记录</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="selected-summary" v-if="activeTracking">
            当前查看：{{ activeTracking.teacher }}，{{ activeTracking.currentProgress }}，{{ activeTracking.recentAction }}。
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.practice-tracking-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
}

.practice-tracking-page *,
.practice-tracking-page *::before,
.practice-tracking-page *::after {
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
  color: #66758f;
  font-size: 14px;
  font-weight: 600;
}

.breadcrumb strong {
  color: #1268f6;
}

.page-desc {
  margin: 22px 0 0;
  color: #344563;
  font-size: 16px;
  font-weight: 600;
}

.stats-section {
  background: #f6f9ff;
}

.stats-container {
  padding: 0 22px 22px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stats-group {
  padding: 22px;
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.stats-group-title {
  margin: 0 0 26px 0;
  font-size: 20px;
  font-weight: 700;
  color: #17233d;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-card {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  min-height: 110px;
  padding: 14px 12px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #dce6f5;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
}

.icon-people,
.icon-briefcase {
  color: #1268f6;
  background: #e8f0ff;
}

.icon-done {
  color: #18a663;
  background: #dff8ec;
}

.icon-clock {
  color: #f26a16;
  background: #fff0df;
}

.icon-review {
  color: #8848e8;
  background: #efe7ff;
}

.icon-folder {
  color: #f2a400;
  background: #fff3d6;
}

.stat-value {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1;
  font-weight: 700;
}

.stat-value span {
  font-size: 14px;
  font-weight: 600;
  color: #17233d;
}

.stat-value.blue {
  color: #1268f6;
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

.stat-value.amber {
  color: #f2a400;
}

.stat-label {
  font-size: 13px;
  color: #17233d;
  font-weight: 600;
  white-space: nowrap;
}

.main-section {
  padding: 0 22px 32px;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce6f5;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.05);
}

.card-header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.table-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #17233d;
}

.filter-section {
  padding: 0 24px 16px;
}

.filter-row {
  display: grid;
  grid-template-columns: 150px 190px 220px 190px 190px;
  gap: 12px;
  align-items: center;
}

.filter-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-width: 0;
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
  border-radius: 6px;
  font-size: 13px;
  color: #1a2944;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.search-input {
  flex: 1;
  height: 40px;
  padding: 0 14px;
  border: 1px solid #d7e2f1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus {
  border-color: #1268f6;
}

.btn-reset,
.btn-secondary,
.btn-primary {
  height: 40px;
  padding: 0 20px;
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

.btn-secondary,
.btn-primary {
  background: #1268f6;
  border: 1px solid #1268f6;
  color: #fff;
  box-shadow: 0 8px 18px rgba(18, 104, 246, 0.18);
}

.btn-primary:hover {
  background: #0d57d4;
}

.operation-message,
.selected-summary {
  color: #1268f6;
  font-size: 13px;
  font-weight: 600;
}

.table-section {
  padding: 0 24px 24px;
}

.table-container {
  overflow-x: auto;
}

.tracking-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #dce6f5;
}

.tracking-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #17233d;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #dce6f5;
  background: #f8fbff;
}

.tracking-table td {
  padding: 18px 16px;
  font-size: 13px;
  line-height: 1.6;
  color: #24314c;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #e4ecf7;
  vertical-align: middle;
}

.tracking-table th:last-child,
.tracking-table td:last-child {
  border-right: none;
}

.tracking-table tr.active td {
  background: #f4f8ff;
}

.tracking-table th:nth-child(1),
.tracking-table td:nth-child(1) {
  width: 9%;
  font-weight: 700;
}

.tracking-table th:nth-child(2),
.tracking-table td:nth-child(2) {
  width: 28%;
}

.tracking-table th:nth-child(3),
.tracking-table td:nth-child(3) {
  width: 16%;
  text-align: center;
}

.tracking-table th:nth-child(4),
.tracking-table td:nth-child(4) {
  width: 15%;
  text-align: center;
}

.tracking-table th:nth-child(5),
.tracking-table td:nth-child(5) {
  width: 18%;
  text-align: center;
}

.tracking-table th:nth-child(6),
.tracking-table td:nth-child(6) {
  width: 14%;
  text-align: center;
}

.tracking-table tr:last-child td {
  border-bottom: none;
}

.practice-org {
  color: #17233d;
  font-weight: 700;
}

.practice-days {
  margin-top: 6px;
  color: #52617a;
}

.completion-badge,
.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.completion-badge.undone {
  background: #fff0e8;
  color: #ff613f;
  border: 1px solid #ffd3c4;
}

.completion-badge.done {
  background: #dff8ec;
  color: #18a663;
  border: 1px solid #bdeed7;
}

.status-badge.未启动申请 {
  background: #eef2f7;
  color: #344563;
  border: 1px solid #d8e0ec;
}

.status-badge.待审核申请 {
  background: #f0e9ff;
  color: #8848e8;
  border: 1px solid #ddcbff;
}

.status-badge.实践中 {
  background: #eaf2ff;
  color: #1268f6;
  border: 1px solid #cfe0ff;
}

.status-badge.已完成 {
  background: #dff8ec;
  color: #18a663;
  border: 1px solid #bdeed7;
}

.btn-remind,
.btn-view {
  padding: 0 8px;
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

.selected-summary {
  padding: 0 24px 22px;
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .filter-row {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .stats-cards,
  .filter-row {
    grid-template-columns: 1fr;
  }

  .stat-card {
    grid-template-columns: 64px minmax(0, 1fr);
  }

  .search-row {
    flex-wrap: wrap;
  }
}
</style>
