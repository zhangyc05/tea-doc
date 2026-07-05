<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminIcon, AdminInput, AdminPagination, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { CompactFilterBar, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  approvePracticeApplication,
  getPracticeState,
  returnPracticeApplication,
  type PracticeApplication,
} from '@/stores/admin/practiceStore'

const router = useRouter()
const route = useRoute()
const practiceState = getPracticeState()

// 筛选条件
const selectedYear = ref('2026 年度')
const selectedDepartment = ref('全部')
const selectedStatus = ref('全部')
const selectedTime = ref('全部')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeApplicationId = ref('1')
const yearOptions = ['2026 年度', '2025 年度', '2024 年度'].map((value) => ({ label: value, value }))
const departmentOptions = ['全部', '智能制造学院', '电子信息学院', '汽车工程学院', '财经商贸学院'].map((value) => ({ label: value, value }))
const statusOptions = ['全部', '待审核', '已同意', '退回修改', '已撤回'].map((value) => ({ label: value, value }))
const timeOptions = ['全部', '2026-07', '2026-06', '2026-05'].map((value) => ({ label: value, value }))
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

function applicationRowClassName({ row }: { row: PracticeApplication }) {
  return activeApplicationId.value === row.id ? 'application-row active' : 'application-row'
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

</script>

<template>
  <AdminLayout active-key="practice-applications">
    <div class="practice-application-page">
      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-pending"><AdminIcon name="document" /></div>
            <div>
              <div class="stat-label">待审核申请</div>
              <div class="stat-value blue">{{ stats.pending }} <span>条</span></div>
              <div class="stat-desc">较上月 +2</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-approved"><AdminIcon name="check" /></div>
            <div>
              <div class="stat-label">已同意申请</div>
              <div class="stat-value green">{{ stats.approved }} <span>条</span></div>
              <div class="stat-desc">较上月 +8</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-return"><AdminIcon name="refresh-right" /></div>
            <div>
              <div class="stat-label">退回修改</div>
              <div class="stat-value orange">{{ stats.returned }} <span>条</span></div>
              <div class="stat-desc">较上月 -1</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-progress"><AdminIcon name="clock" /></div>
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
                <AdminSelect v-model="selectedYear" class="filter-select" :options="yearOptions" />
              </label>
              <label class="filter-item">
                <span class="filter-label">院系：</span>
                <AdminSelect v-model="selectedDepartment" class="filter-select" :options="departmentOptions" />
              </label>
              <label class="filter-item">
                <span class="filter-label">申请状态：</span>
                <AdminSelect v-model="selectedStatus" class="filter-select" :options="statusOptions" />
              </label>
              <label class="filter-item">
                <span class="filter-label">实践时间：</span>
                <AdminSelect v-model="selectedTime" class="filter-select" :options="timeOptions" />
              </label>
            </template>
            <template #search>
              <AdminInput
                v-model="searchQuery"
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
              <AdminTable
                class="application-table"
                :data="filteredApplications"
                :row-class-name="applicationRowClassName"
                empty-text="暂无符合条件的实践申请"
              >
                <AdminTableColumn label="申请教师" min-width="150">
                  <template #default="{ row }">
                    <div class="teacher-name">{{ row.teacher }}</div>
                    <div class="sub-text">工号：{{ row.teacherNo }}</div>
                    <div class="sub-text">{{ row.department }}</div>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn label="年度实践情况" min-width="130">
                  <template #default="{ row }">
                    <div>已计入 {{ row.annualStatus.match(/已计入\s*(\d+)/)?.[1] ?? '0' }} 天</div>
                    <div class="remaining-days">还差 {{ row.remainingDays }} 天</div>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn label="实践单位 / 岗位" min-width="190">
                  <template #default="{ row }">
                    <div class="company-name">{{ row.company }}</div>
                    <div class="sub-text">{{ row.position }}</div>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn label="实践时间 / 预计天数" min-width="180">
                  <template #default="{ row }">
                    <div>{{ row.practicePeriod.split('，')[0] }}</div>
                    <div class="sub-text">预计 {{ row.estimatedDays }} 天</div>
                  </template>
                </AdminTableColumn>
                <AdminTableColumn label="申请状态" min-width="110">
                  <template #default="{ row }">
                    <StatusBadge :status="row.status" />
                  </template>
                </AdminTableColumn>
                <AdminTableColumn prop="applyTime" label="申请时间" min-width="130" />
                <AdminTableColumn label="操作" min-width="220" fixed="right">
                  <template #default="{ row }">
                    <div
                      v-if="row.status === '待审核'"
                      class="row-action-group"
                    >
                      <Button variant="ghost" size="sm" @click="viewApplication(row.id)">
                        查看申请
                      </Button>
                      <Button size="sm" @click="approveApplication(row.id)">同意</Button>
                      <Button variant="danger" size="sm" @click="returnApplication(row.id)">
                        退回修改
                      </Button>
                    </div>
                    <div v-else class="row-action-group">
                      <Button variant="ghost" size="sm" @click="viewApplication(row.id)">
                        查看申请
                      </Button>
                      <Button
                        v-if="row.status === '已同意'"
                        variant="ghost"
                        size="sm"
                        @click="viewRecordForApplication(row.id)"
                      >
                        查看记录
                      </Button>
                    </div>
                  </template>
                </AdminTableColumn>
              </AdminTable>
            </div>

            <!-- 分页区域 -->
            <AdminPagination
              v-model:current-page="currentPage"
              class="pagination-section"
              :page-size="pageSize"
              :total="total"
            />
            <div class="selected-summary" v-if="activeApplication">
              当前查看：{{ activeApplication.teacher }}，{{ activeApplication.status }}，{{ activeApplication.company }}。
            </div>
          </div>
        </div>
      </section>
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
  grid-template-columns: 76px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-card-gap);
  padding: 22px 30px;
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-subtle);
}

.stat-icon {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 10px rgba(255, 255, 255, 0.66);
}

.stat-icon :deep(svg) {
  width: 34px;
  height: 34px;
}

.icon-pending {
  color: var(--color-admin-primary);
  background: linear-gradient(145deg, #f1f6ff 0%, #dce9ff 100%);
}

.icon-approved {
  color: #18a663;
  background: linear-gradient(145deg, #edfdf5 0%, #d7f7e8 100%);
}

.icon-return {
  color: #f26a16;
  background: linear-gradient(145deg, #fff7ec 0%, #ffe8ca 100%);
}

.icon-progress {
  color: #8848e8;
  background: linear-gradient(145deg, #f7f0ff 0%, #eadcff 100%);
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

:deep(.application-row.active) {
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

.selected-summary {
  padding: 0 20px 20px;
  color: var(--color-admin-primary);
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

  .row-action-group {
    flex-direction: column;
  }

  .pagination-section,
  .pagination-controls {
    flex-wrap: wrap;
  }
}
</style>
