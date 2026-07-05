<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AdminIcon, AdminInput, AdminPagination, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { CompactFilterBar, InsightSidebar, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  approveTrainingApplication,
  getTrainingState,
  rejectTrainingApplication,
  type TrainingApplication,
} from '@/stores/admin/trainingStore'

const trainingState = getTrainingState()
const route = useRoute()

// 统计数据
const stats = {
  pending: 18,
  approved: 42,
  rejected: 5,
  closing: 3,
}

const applicationRows = computed(() => trainingState.applications)
const selectedOrganization = ref('全校')
const selectedStatus = ref('全部')
const selectedTraining = ref('全部')
const selectedYear = ref('2026 年度')
const searchQuery = ref('')
const appliedSearchQuery = ref('')
const activeApplicationId = ref('1')
const currentPage = ref(1)
const pageSize = 10

const organizationOptions = ['全校', '智能制造学院', '电子信息学院', '现代服务学院', '外语学院'].map((value) => ({ label: value, value }))
const statusOptions = ['全部', '待处理', '已同意', '未同意', '已取消'].map((value) => ({ label: value, value }))
const trainingOptions = ['全部', '数字化教学', 'AI 赋能', '双师型教师', '课程思政'].map((value) => ({ label: value, value }))
const yearOptions = ['2026 年度', '2025 年度'].map((value) => ({ label: value, value }))

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
  approveTrainingApplication(id)
  activeApplicationId.value = id
}

function viewDetail(id: string) {
  activeApplicationId.value = id
  trainingState.operationMessage = '已在右侧展示申请摘要。'
}

function applicationRowClassName({ row }: { row: TrainingApplication }) {
  return activeApplicationId.value === row.id ? 'application-row active' : 'application-row'
}

function applyFilters() {
  appliedSearchQuery.value = searchQuery.value
  trainingState.operationMessage = `已筛选出 ${filteredApplications.value.length} 条申请。`
}

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedStatus.value = '全部'
  selectedTraining.value = '全部'
  selectedYear.value = '2026 年度'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  trainingState.operationMessage = '已重置筛选条件。'
}

function showPendingApplications() {
  selectedStatus.value = '待处理'
  selectedOrganization.value = '全校'
  selectedTraining.value = '全部'
  selectedYear.value = '2026 年度'
  searchQuery.value = ''
  appliedSearchQuery.value = ''
  trainingState.operationMessage = '已切换到待处理申请。'
}

function rejectCurrentApplication() {
  if (!activeApplication.value || activeApplication.value.status !== '待处理') return
  rejectTrainingApplication(activeApplication.value.id)
}
</script>

<template>
  <AdminLayout active-key="training-applications">
    <div class="training-application-page">
      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-pending"><AdminIcon name="document" /></div>
            <div>
              <div class="stat-label">待处理申请</div>
              <div class="stat-value blue">{{ stats.pending }}</div>
              <div class="stat-desc">当前待确认的培训申请</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-approved"><AdminIcon name="check" /></div>
            <div>
              <div class="stat-label">已同意</div>
              <div class="stat-value green">{{ stats.approved }}</div>
              <div class="stat-desc">已纳入培训名单</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-rejected"><AdminIcon name="circle-close" /></div>
            <div>
              <div class="stat-label">未同意</div>
              <div class="stat-value red">{{ stats.rejected }}</div>
              <div class="stat-desc">本次未纳入培训名单</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-closing"><AdminIcon name="alarm-clock" /></div>
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
              <CompactFilterBar>
                <template #fields>
                  <label class="filter-field">
                    <span>组织范围：</span>
                    <AdminSelect v-model="selectedOrganization" class="filter-select" :options="organizationOptions" />
                  </label>
                  <label class="filter-field">
                    <span>申请状态：</span>
                    <AdminSelect v-model="selectedStatus" class="filter-select" :options="statusOptions" />
                  </label>
                  <label class="filter-field">
                    <span>申请培训：</span>
                    <AdminSelect v-model="selectedTraining" class="filter-select" :options="trainingOptions" />
                  </label>
                  <label class="filter-field">
                    <span>申请时间：</span>
                    <AdminSelect v-model="selectedYear" class="filter-select" :options="yearOptions" />
                  </label>
                </template>
                <template #search>
                  <AdminInput
                    v-model="searchQuery"
                    class="search-input"
                    placeholder="搜索教师、培训名称、院系"
                    @keyup.enter="applyFilters"
                  />
                </template>
                <template #actions>
                  <Button variant="outline" type="button" @click="resetFilters">重置</Button>
                  <Button variant="secondary" type="button" @click="applyFilters">查询</Button>
                </template>
                <template #message>
                  <span v-if="trainingState.operationMessage" class="operation-message">{{ trainingState.operationMessage }}</span>
                </template>
              </CompactFilterBar>
              <!-- 数据表格 -->
              <div class="table-container">
                <AdminTable
                  class="application-table"
                  :data="filteredApplications"
                  :row-class-name="applicationRowClassName"
                  empty-text="暂无符合条件的培训申请"
                >
                  <AdminTableColumn prop="applicant" label="申请人" min-width="90" />
                  <AdminTableColumn label="院系 / 专业" min-width="170">
                    <template #default="{ row }">
                      {{ row.department }} / {{ row.major }}
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="trainingName" label="申请培训" min-width="160" />
                  <AdminTableColumn prop="reason" label="申请理由" min-width="180" />
                  <AdminTableColumn prop="applyTime" label="申请时间" min-width="110" />
                  <AdminTableColumn prop="quotaInfo" label="计划名额" min-width="100" />
                  <AdminTableColumn label="申请状态" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.status" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="操作" min-width="100" fixed="right">
                    <template #default="{ row }">
                      <Button
                        v-if="row.status === '待处理'"
                        variant="secondary"
                        size="sm"
                        @click="handleApplication(row.id)"
                      >
                        处理
                      </Button>
                      <Button
                        v-else
                        variant="ghost"
                        size="sm"
                        @click="viewDetail(row.id)"
                      >
                        查看
                      </Button>
                    </template>
                  </AdminTableColumn>
                </AdminTable>
              </div>
              <AdminPagination
                v-model:current-page="currentPage"
                class="pagination-row"
                :page-size="pageSize"
                :total="filteredApplications.length"
              />
            </div>
          </div>

          <!-- 右侧：处理提醒 -->
          <div class="sidebar">
            <InsightSidebar title="处理提醒">
              <template #items>
              <div class="reminders-list">
                <div class="reminder-item">
                  <span class="reminder-icon blue"><AdminIcon name="document" /></span>
                  <div class="reminder-content">
                    <div class="reminder-title">待处理申请</div>
                    <div class="reminder-desc">18 条申请待处理，主要集中在数字化教学能力提升培训。</div>
                  </div>
                </div>
                <div class="reminder-item">
                  <span class="reminder-icon orange"><AdminIcon name="warning" /></span>
                  <div class="reminder-content">
                    <div class="reminder-title">名额接近上限</div>
                    <div class="reminder-desc">2 个培训报名人数接近计划名额，建议优先处理待处理申请。</div>
                  </div>
                </div>
                <div class="reminder-item">
                  <span class="reminder-icon purple"><AdminIcon name="alarm-clock" /></span>
                  <div class="reminder-content">
                    <div class="reminder-title">申请即将截止</div>
                    <div class="reminder-desc">3 个培训将在 3 天内结束申请，建议及时确认名单。</div>
                  </div>
                </div>
              </div>
              </template>
              <template #selected>
              <div class="selected-application" v-if="activeApplication">
                <div class="reminder-title">当前查看申请</div>
                <div class="selected-name">{{ activeApplication.applicant }} · {{ activeApplication.trainingName }}</div>
                <div class="reminder-desc">{{ activeApplication.department }} / {{ activeApplication.major }}</div>
                <Button
                  v-if="activeApplication.status === '待处理'"
                  class="full-width"
                  variant="danger"
                  @click="rejectCurrentApplication"
                >
                  退回申请
                </Button>
              </div>
              </template>
              <template #action>
              <Button class="full-width" variant="outline" @click="showPendingApplications">
                查看待处理申请
              </Button>
              </template>
            </InsightSidebar>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-application-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
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
  color: var(--color-admin-text-muted);
  font-size: 14px;
  font-weight: 600;
}

.breadcrumb strong {
  color: var(--color-admin-primary);
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
  min-height: 142px;
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

.icon-rejected {
  color: #ff613f;
  background: linear-gradient(145deg, #fff5f1 0%, #ffe2d6 100%);
}

.icon-closing {
  color: #8848e8;
  background: linear-gradient(145deg, #f7f0ff 0%, #eadcff 100%);
}

.stat-value {
  margin-top: var(--space-admin-xs);
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
}

.stat-value.blue {
  color: var(--color-admin-primary);
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
  color: var(--color-admin-text-strong);
  font-weight: 600;
}

.stat-desc {
  margin-top: var(--space-admin-sm);
  color: #6c7890;
  font-size: 13px;
}

.main-section {
  padding: 0 22px 30px;
}

.application-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: var(--space-admin-xl);
  align-items: start;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-subtle);
}

.card-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.card-header h2 {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 18px;
  font-weight: 700;
}

.filter-field {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-xs);
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
  border-radius: var(--radius-sm);
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
  border-color: var(--color-admin-primary);
}

.operation-message {
  color: var(--color-admin-primary);
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
  border: 1px solid var(--color-admin-border);
}

.application-table th {
  padding: 13px 10px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-admin-text-strong);
  border-right: 1px solid #e4ecf7;
  border-bottom: 1px solid var(--color-admin-border);
  background: var(--color-admin-bg-soft);
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

:deep(.application-row.active) {
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

.pagination-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-admin-md);
  padding: 16px 20px 20px;
  color: #52617a;
  font-size: 13px;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border);
  padding: var(--space-admin-xl);
  box-shadow: var(--shadow-admin-card-subtle);
}

.sidebar-title {
  margin: 0 0 22px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-admin-text-strong);
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md-lg);
}

.reminder-item {
  display: grid;
  grid-template-columns: 66px minmax(0, 1fr);
  gap: var(--space-admin-lg);
  align-items: center;
  min-height: 118px;
  padding: 18px 16px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
}

.reminder-icon {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 9px rgba(255, 255, 255, 0.68);
}

.reminder-icon :deep(svg) {
  width: 29px;
  height: 29px;
}

.reminder-icon.blue {
  color: var(--color-admin-primary);
  background: linear-gradient(145deg, #f1f6ff 0%, #dce9ff 100%);
}

.reminder-icon.orange {
  color: #f26a16;
  background: linear-gradient(145deg, #fff7ec 0%, #ffe8ca 100%);
}

.reminder-icon.purple {
  color: #8848e8;
  background: linear-gradient(145deg, #f7f0ff 0%, #eadcff 100%);
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-admin-text-strong);
  margin-bottom: var(--space-admin-xs);
}

.reminder-desc {
  font-size: 13px;
  line-height: 1.65;
  color: #52617a;
}

.selected-application {
  margin-top: 14px;
  padding: var(--space-admin-lg);
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: var(--color-admin-bg-soft);
}

.selected-name {
  margin-bottom: 6px;
  color: var(--color-admin-text-strong);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
}

.full-width {
  width: 100%;
  margin-top: var(--space-admin-lg);
}

@media (max-width: 1320px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .application-workspace {
    grid-template-columns: 1fr;
  }

  .sidebar-card {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-admin-lg);
  }

  .sidebar-title,
  .reminders-list,
  .full-width {
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
    padding: var(--space-admin-card-gap);
  }

  .stat-icon,
  .reminder-icon {
    width: 58px;
    height: 58px;
  }

  .sidebar-card,
  .reminders-list {
    grid-template-columns: 1fr;
  }
}
</style>
