<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminInput, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { CompactFilterBar, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  completePracticeExportTask,
  confirmPracticeArchive,
  createPracticeExportTask,
  failPracticeExportTask,
  getPracticeState,
  remindPracticeMaterial,
  type PracticeRecord,
} from '@/stores/admin/practiceStore'

const router = useRouter()
const route = useRoute()
const practiceState = getPracticeState()

// 筛选条件
const selectedDepartment = ref('全部')
const selectedStatus = ref('全部')
const selectedDays = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeRecordId = ref(String(route.query.recordId || '1'))
const departmentOptions = ['全部', '智能制造学院', '电子信息学院', '汽车工程学院'].map((value) => ({ label: value, value }))
const statusOptions = ['全部', '实践中', '待提交总结', '待企业评价', '待归档确认', '已归档'].map((value) => ({ label: value, value }))
const daysOptions = ['全部', '已计入', '待确认计入', '暂未计入'].map((value) => ({ label: value, value }))

// 统计数据
const stats = computed(() => ({
  inProgress: practiceState.records.filter(record => record.currentStatus === '实践中').length,
  summaryPending: practiceState.records.filter(record => record.currentStatus === '待提交总结').length,
  evaluationPending: practiceState.records.filter(record => record.currentStatus === '待企业评价').length,
  archivePending: practiceState.records.filter(record => record.currentStatus === '待归档确认').length,
  archived: practiceState.records.filter(record => record.currentStatus === '已归档').length,
}))

const recordRows = computed(() => practiceState.records)

const filteredRecords = computed(() => {
  const keyword = appliedSearchQuery.value.trim().toLowerCase()

  return recordRows.value.filter((record) => {
    const matchesDepartment = selectedDepartment.value === '全部' || record.department === selectedDepartment.value
    const matchesStatus = selectedStatus.value === '全部' || record.currentStatus === selectedStatus.value
    const matchesDays = selectedDays.value === '全部' || record.countedDays === selectedDays.value
    const matchesKeyword = !keyword
      || `${record.teacher} ${record.company} ${record.department} ${record.major}`.toLowerCase().includes(keyword)

    return matchesDepartment && matchesStatus && matchesDays && matchesKeyword
  })
})

const activeRecord = computed(() => {
  return recordRows.value.find((record) => record.id === activeRecordId.value) ?? recordRows.value[0]
})

const latestRecordExportTask = computed(() => {
  return practiceState.exportTasks.find(task => task.type === '企业实践记录')
})

function resetFilters() {
  selectedDepartment.value = '全部'
  selectedStatus.value = '全部'
  selectedDays.value = '全部'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  practiceState.operationMessage = '已重置筛选条件。'
}

function viewDetail(id: string) {
  activeRecordId.value = id
  practiceState.operationMessage = '已在表格中定位该实践记录。'
}

function recordRowClassName({ row }: { row: PracticeRecord }) {
  return activeRecordId.value === row.id ? 'record-row active' : 'record-row'
}

function remindMaterial(id: string) {
  activeRecordId.value = id
  remindPracticeMaterial(id)
}

function confirmArchive(id: string) {
  confirmPracticeArchive(id)
  activeRecordId.value = id
}

function viewArchive(id: string) {
  activeRecordId.value = id
  router.push(`/admin/archive/processing?recordId=practice-${id}`)
}

function exportRecords() {
  const task = createPracticeExportTask({
    type: '企业实践记录',
    recordCount: filteredRecords.value.length,
  })
  if (filteredRecords.value.length === 0) {
    failPracticeExportTask(task.id, '当前筛选结果为空')
    return
  }
  completePracticeExportTask(task.id)
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  practiceState.operationMessage = `已筛选出 ${filteredRecords.value.length} 条实践记录。`
}

</script>

<template>
  <AdminLayout active-key="practice-records">
    <div class="practice-record-page">
      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-progress">▣</div>
            <div>
              <div class="stat-label">实践中</div>
              <div class="stat-value blue">{{ stats.inProgress }} <span>人</span></div>
              <div class="stat-desc">当前仍在进行中的企业实践记录</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-summary">▤</div>
            <div>
              <div class="stat-label">待提交总结</div>
              <div class="stat-value orange">{{ stats.summaryPending }} <span>条</span></div>
              <div class="stat-desc">实践已结束，待教师补充实践总结</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-evaluation">▥</div>
            <div>
              <div class="stat-label">待补企业评价</div>
              <div class="stat-value purple">{{ stats.evaluationPending }} <span>条</span></div>
              <div class="stat-desc">实践材料仍缺企业评价或鉴定</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-archive-pending">▰</div>
            <div>
              <div class="stat-label">待归档确认</div>
              <div class="stat-value amber">{{ stats.archivePending }} <span>条</span></div>
              <div class="stat-desc">材料已较完整，待确认归档</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-archived">▱</div>
            <div>
              <div class="stat-label">已归档</div>
              <div class="stat-value green">{{ stats.archived }} <span>条</span></div>
              <div class="stat-desc">已形成可沉淀的实践记录</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <div class="card-header">
            <h2 class="table-title">记录列表</h2>
            <Button @click="exportRecords">⇩ 导出记录</Button>
          </div>
          <!-- 筛选区 -->
          <CompactFilterBar>
            <template #fields>
              <label class="filter-item">
                <span class="filter-label">院系范围：</span>
                <AdminSelect v-model="selectedDepartment" class="filter-select" :options="departmentOptions" />
              </label>
              <label class="filter-item">
                <span class="filter-label">实践状态：</span>
                <AdminSelect v-model="selectedStatus" class="filter-select" :options="statusOptions" />
              </label>
              <label class="filter-item">
                <span class="filter-label">计入 30 天：</span>
                <AdminSelect v-model="selectedDays" class="filter-select" :options="daysOptions" />
              </label>
            </template>
            <template #search>
              <AdminInput
                v-model="searchQuery"
                placeholder="搜索教师、实践单位"
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
                class="record-table"
                :data="filteredRecords"
                :row-class-name="recordRowClassName"
                empty-text="暂无符合条件的实践记录"
              >
                <AdminTableColumn label="教师" min-width="150">
                  <template #default="{ row }">
                    <div class="teacher-name">{{ row.teacher }}</div>
                    <div class="sub-text">{{ row.department }} / {{ row.major }}</div>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn label="实践单位 / 岗位" min-width="190">
                  <template #default="{ row }">
                    <div class="company-name">{{ row.company }}</div>
                    <div class="sub-text">{{ row.position }}</div>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn prop="practicePeriod" label="实践周期" min-width="150" />
                <AdminTableColumn prop="materialStatus" label="材料状态" min-width="110" />
                <AdminTableColumn label="当前状态" min-width="120">
                  <template #default="{ row }">
                    <StatusBadge :status="row.currentStatus" />
                  </template>
                </AdminTableColumn>
                <AdminTableColumn prop="countedDays" label="计入 30 天" min-width="110" />
                <AdminTableColumn prop="recentAction" label="最近动作" min-width="150" />
                <AdminTableColumn label="操作" min-width="220" fixed="right">
                  <template #default="{ row }">
                    <div class="row-action-group">
                      <Button variant="ghost" size="sm" @click="viewDetail(row.id)">
                        查看详情
                      </Button>
                      <Button
                        v-if="row.currentStatus === '待提交总结' || row.currentStatus === '待企业评价' || row.currentStatus === '实践中'"
                        variant="secondary"
                        size="sm"
                        @click="remindMaterial(row.id)"
                      >
                        提醒补材料
                      </Button>
                      <Button
                        v-if="row.currentStatus === '待归档确认'"
                        size="sm"
                        @click="confirmArchive(row.id)"
                      >
                        确认归档
                      </Button>
                      <Button
                        v-if="row.currentStatus === '已归档'"
                        variant="ghost"
                        size="sm"
                        @click="viewArchive(row.id)"
                      >
                        查看档案
                      </Button>
                    </div>
                  </template>
                </AdminTableColumn>
              </AdminTable>
            </div>

            <div class="selected-summary" v-if="activeRecord">
              当前查看：{{ activeRecord.teacher }}，{{ activeRecord.currentStatus }}，{{ activeRecord.company }}。
            </div>
            <div class="export-task" v-if="latestRecordExportTask">
              最近导出：{{ latestRecordExportTask.status }} ｜ {{ latestRecordExportTask.fileName }} ｜ {{ latestRecordExportTask.recordCount }} 条
              <span v-if="latestRecordExportTask.failureReason"> ｜ {{ latestRecordExportTask.failureReason }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.practice-record-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.practice-record-page *,
.practice-record-page *::before,
.practice-record-page *::after {
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
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-admin-primary);
  font-weight: 600;
}

.stats-section {
  background: var(--color-admin-bg);
}

.stats-container {
  padding: 0 22px 26px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-admin-xl);
}

.stat-card {
  min-height: 150px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-lg);
  padding: 22px;
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border);
  box-shadow: var(--shadow-admin-card-subtle);
}

.stat-icon {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
}

.icon-progress {
  color: var(--color-admin-primary);
  background: #e8f0ff;
}

.icon-summary {
  color: #f26a16;
  background: #fff0df;
}

.icon-evaluation {
  color: #8848e8;
  background: #efe7ff;
}

.icon-archive-pending {
  color: #f2a400;
  background: #fff3d6;
}

.icon-archived {
  color: #18a663;
  background: #dff8ec;
}

.stat-value {
  margin-top: var(--space-admin-xs);
  font-size: 32px;
  line-height: 1;
  font-weight: 700;
}

.stat-value span {
  font-size: 14px;
  color: var(--color-admin-text-strong);
}

.stat-value.blue {
  color: var(--color-admin-primary);
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

.stat-value.green {
  color: #18a663;
}

.stat-label {
  font-size: 15px;
  color: var(--color-admin-text-strong);
  font-weight: 600;
  white-space: nowrap;
}

.stat-desc {
  margin-top: var(--space-admin-sm);
  color: #52617a;
  font-size: 13px;
  line-height: 1.5;
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
  justify-content: space-between;
  align-items: center;
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
  padding: 0 20px 22px;
}

.table-container {
  overflow-x: auto;
}

.record-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid var(--color-admin-border);
}

.record-table th {
  padding: 13px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-admin-text-strong);
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid var(--color-admin-border);
  background: var(--color-admin-bg-soft);
}

.record-table td {
  padding: var(--space-admin-md-lg) var(--space-admin-md);
  font-size: 13px;
  line-height: 1.6;
  color: #24314c;
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid #e4ecf7;
  vertical-align: middle;
}

.record-table th:last-child,
.record-table td:last-child {
  border-right: none;
}

:deep(.record-row.active) {
  background: #f4f8ff;
}

.record-table th:nth-child(1),
.record-table td:nth-child(1) {
  width: 12%;
}

.record-table th:nth-child(2),
.record-table td:nth-child(2) {
  width: 17%;
}

.record-table th:nth-child(3),
.record-table td:nth-child(3) {
  width: 11%;
}

.record-table th:nth-child(4),
.record-table td:nth-child(4) {
  width: 13%;
}

.record-table th:nth-child(5),
.record-table td:nth-child(5) {
  width: 12%;
  text-align: center;
}

.record-table th:nth-child(6),
.record-table td:nth-child(6) {
  width: 11%;
  text-align: center;
}

.record-table th:nth-child(7),
.record-table td:nth-child(7) {
  width: 11%;
  text-align: center;
}

.record-table th:nth-child(8),
.record-table td:nth-child(8) {
  width: 13%;
  text-align: center;
}

.record-table tr:last-child td {
  border-bottom: none;
}

.teacher-name,
.company-name {
  font-weight: 700;
  color: var(--color-admin-text-strong);
}

.sub-text {
  color: #52617a;
  font-size: 12px;
}

.row-action-group {
  display: flex;
  justify-content: center;
  gap: var(--space-admin-xs);
  flex-wrap: wrap;
}

.selected-summary {
  padding-top: 12px;
}

.export-task {
  margin-top: var(--space-admin-sm);
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
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>
