<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminIcon, AdminInput, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { CompactFilterBar, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  completePracticeExportTask,
  createPracticeExportTask,
  failPracticeExportTask,
  getPracticeState,
  remindPracticeApplication,
  type PracticeTracking,
} from '@/stores/admin/practiceStore'

const router = useRouter()
const route = useRoute()
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
const yearOptions = ['2026 年度', '2025 年度', '2024 年度'].map((value) => ({ label: value, value }))
const departmentOptions = ['全部', '智能制造学院', '电子信息学院', '汽车工程学院'].map((value) => ({ label: value, value }))
const majorOptions = ['全部', '机电一体化技术', '工业机器人技术', '软件技术专业'].map((value) => ({ label: value, value }))
const completionOptions = ['全部', '已完成 30 天', '未完成 30 天'].map((value) => ({ label: value, value }))
const statusOptions = ['全部', '未启动申请', '待审核申请', '实践中', '已完成'].map((value) => ({ label: value, value }))

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

function trackingRowClassName({ row }: { row: PracticeTracking }) {
  return activeTrackingId.value === row.id ? 'tracking-row active' : 'tracking-row'
}

const latestTrackingExportTask = computed(() => {
  return practiceState.exportTasks.find(task => task.type === '教师实践跟踪名单')
})

function remindApply(id: string) {
  activeTrackingId.value = id
  remindPracticeApplication(id)
}

function viewRecord(id: string) {
  activeTrackingId.value = id
  const tracking = practiceState.trackings.find(item => item.id === id)
  const record = practiceState.records.find(item => item.teacher === tracking?.teacher)
  if (!record) {
    practiceState.operationMessage = '当前教师尚未生成实践记录。'
    return
  }
  router.push(`/admin/practice/records?recordId=${record.id}`)
}

function exportList() {
  const task = createPracticeExportTask({
    type: '教师实践跟踪名单',
    recordCount: filteredTrackings.value.length,
  })
  if (filteredTrackings.value.length === 0) {
    failPracticeExportTask(task.id, '当前筛选结果为空')
    return
  }
  completePracticeExportTask(task.id)
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
                <div class="stat-icon icon-people"><AdminIcon name="user" /></div>
                <div>
                  <div class="stat-label">应完成教师</div>
                  <div class="stat-value blue">{{ annualStats.required }} <span>人</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-done"><AdminIcon name="check" /></div>
                <div>
                  <div class="stat-label">已完成 30 天</div>
                  <div class="stat-value green">{{ annualStats.completed }} <span>人</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-clock"><AdminIcon name="clock" /></div>
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
                <div class="stat-icon icon-review"><AdminIcon name="document" /></div>
                <div>
                  <div class="stat-label">待审核申请</div>
                  <div class="stat-value purple">{{ currentStats.pendingReview }} <span>条</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-briefcase"><AdminIcon name="briefcase" /></div>
                <div>
                  <div class="stat-label">实践中</div>
                  <div class="stat-value blue">{{ currentStats.inProgress }} <span>人</span></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon icon-folder"><AdminIcon name="folder-add" /></div>
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
            <Button @click="exportList">
              <AdminIcon name="upload" />
              导出名单
            </Button>
          </div>
          <!-- 筛选区 -->
          <CompactFilterBar>
            <template #fields>
              <div class="filter-item">
                <label class="filter-label">年度</label>
                <AdminSelect v-model="selectedYear" class="filter-select" :options="yearOptions" />
              </div>
              <div class="filter-item">
                <label class="filter-label">院系</label>
                <AdminSelect v-model="selectedDepartment" class="filter-select" :options="departmentOptions" />
              </div>
              <div class="filter-item">
                <label class="filter-label">专业 / 教研室</label>
                <AdminSelect v-model="selectedMajor" class="filter-select" :options="majorOptions" />
              </div>
              <div class="filter-item">
                <label class="filter-label">完成情况</label>
                <AdminSelect v-model="selectedCompletion" class="filter-select" :options="completionOptions" />
              </div>
              <div class="filter-item">
                <label class="filter-label">当前状态</label>
                <AdminSelect v-model="selectedStatus" class="filter-select" :options="statusOptions" />
              </div>
            </template>
            <template #search>
              <AdminInput
                v-model="searchQuery"
                placeholder="搜索教师姓名 / 工号"
                class="search-input"
                @keyup.enter="applyFilters"
              />
            </template>
            <template #actions>
              <Button variant="outline" @click="resetFilters">重置</Button>
              <Button variant="secondary" @click="applyFilters">查询</Button>
            </template>
            <template #message>
              <span v-if="practiceState.operationMessage" class="operation-message">{{ practiceState.operationMessage }}</span>
            </template>
          </CompactFilterBar>

          <!-- 数据表格 -->
          <div class="table-section">
            <div class="table-container">
              <AdminTable
                class="tracking-table"
                :data="filteredTrackings"
                :row-class-name="trackingRowClassName"
                empty-text="暂无符合条件的教师实践记录"
              >
                <AdminTableColumn prop="teacher" label="教师" min-width="90" />
                <AdminTableColumn label="年度实践" min-width="260">
                  <template #default="{ row }">
                    <div class="practice-org">{{ row.department }} / {{ row.major }}</div>
                    <div class="practice-days">已计入 {{ row.completedDays }} 天，还差 {{ row.remainingDays }} 天</div>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn label="完成情况" min-width="150">
                  <template #default="{ row }">
                    <span
                      class="completion-badge"
                      :class="row.remainingDays === 0 ? 'done' : 'undone'"
                    >
                      {{ row.remainingDays === 0 ? '已完成 30 天' : '未完成 30 天' }}
                    </span>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn label="当前进展" min-width="140">
                  <template #default="{ row }">
                    <StatusBadge :status="row.currentProgress" />
                  </template>
                </AdminTableColumn>
                <AdminTableColumn prop="recentAction" label="最近动作" min-width="170" />
                <AdminTableColumn label="操作" min-width="120" fixed="right">
                  <template #default="{ row }">
                    <Button
                      v-if="row.currentProgress === '未启动申请'"
                      variant="secondary"
                      size="sm"
                      @click="remindApply(row.id)"
                    >
                      提醒申请
                    </Button>
                    <Button
                      v-else-if="row.currentProgress === '待审核申请'"
                      variant="ghost"
                      size="sm"
                      @click="viewRecord(row.id)"
                    >
                      查看申请
                    </Button>
                    <Button
                      v-else-if="row.currentProgress === '实践中'"
                      variant="ghost"
                      size="sm"
                      @click="viewRecord(row.id)"
                    >
                      查看申请
                    </Button>
                    <Button
                      v-else-if="row.currentProgress === '已完成'"
                      variant="ghost"
                      size="sm"
                      @click="viewRecord(row.id)"
                    >
                      查看记录
                    </Button>
                  </template>
                </AdminTableColumn>
              </AdminTable>
            </div>
          </div>
          <div class="selected-summary" v-if="activeTracking">
            当前查看：{{ activeTracking.teacher }}，{{ activeTracking.currentProgress }}，{{ activeTracking.recentAction }}。
          </div>
          <div class="export-task" v-if="latestTrackingExportTask">
            最近导出：{{ latestTrackingExportTask.status }} ｜ {{ latestTrackingExportTask.fileName }} ｜ {{ latestTrackingExportTask.recordCount }} 条
            <span v-if="latestTrackingExportTask.failureReason"> ｜ {{ latestTrackingExportTask.failureReason }}</span>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.practice-tracking-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
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
  color: var(--color-admin-text-muted);
  font-size: 14px;
  font-weight: 600;
}

.breadcrumb strong {
  color: var(--color-admin-primary);
}

.page-desc {
  margin: 22px 0 0;
  color: #344563;
  font-size: 16px;
  font-weight: 600;
}

.stats-section {
  background: var(--color-admin-bg);
}

.stats-container {
  padding: 0 22px 22px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-admin-xl);
}

.stats-group {
  padding: 22px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-subtle);
}

.stats-group-title {
  margin: 0 0 26px 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-admin-text-strong);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-admin-sm);
}

.stat-card {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-sm);
  min-height: 110px;
  padding: var(--space-admin-md-lg) var(--space-admin-md);
  background: #fff;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-admin-border);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 7px rgba(255, 255, 255, 0.68);
}

.stat-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.icon-people,
.icon-briefcase {
  color: var(--color-admin-primary);
  background: linear-gradient(145deg, #f1f6ff 0%, #dce9ff 100%);
}

.icon-done {
  color: #18a663;
  background: linear-gradient(145deg, #edfdf5 0%, #d7f7e8 100%);
}

.icon-clock {
  color: #f26a16;
  background: linear-gradient(145deg, #fff7ec 0%, #ffe8ca 100%);
}

.icon-review {
  color: #8848e8;
  background: linear-gradient(145deg, #f7f0ff 0%, #eadcff 100%);
}

.icon-folder {
  color: #f2a400;
  background: linear-gradient(145deg, #fff9e7 0%, #ffefbc 100%);
}

.stat-value {
  margin-top: var(--space-admin-xs);
  font-size: 30px;
  line-height: 1;
  font-weight: 700;
}

.stat-value span {
  font-size: 14px;
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

.stat-value.amber {
  color: #f2a400;
}

.stat-label {
  font-size: 13px;
  color: var(--color-admin-text-strong);
  font-weight: 600;
  white-space: nowrap;
}

.main-section {
  padding: 0 22px 32px;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-subtle);
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
  color: var(--color-admin-text-strong);
}

.filter-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-xs);
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

.operation-message,
.selected-summary {
  color: var(--color-admin-primary);
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
  border: 1px solid var(--color-admin-border);
}

.tracking-table th {
  padding: var(--space-admin-md-lg) var(--space-admin-lg);
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-admin-text-strong);
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid var(--color-admin-border);
  background: var(--color-admin-bg-soft);
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

:deep(.tracking-row.active) {
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
  color: var(--color-admin-text-strong);
  font-weight: 700;
}

.practice-days {
  margin-top: 6px;
  color: #52617a;
}

.completion-badge {
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

.selected-summary {
  padding: 0 24px 22px;
}

.export-task {
  margin: 0 24px 22px;
  padding: 10px 12px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-sm);
  background: var(--color-admin-bg-soft);
  color: var(--color-admin-text-strong);
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }

  .stat-card {
    grid-template-columns: 64px minmax(0, 1fr);
  }

}
</style>
