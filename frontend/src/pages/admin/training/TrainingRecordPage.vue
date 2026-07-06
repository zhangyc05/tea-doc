<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminInput, AdminPagination, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { CompactFilterBar, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { getTrainingState } from '@/stores/admin/trainingStore'

const router = useRouter()
const route = useRoute()
const trainingState = getTrainingState()

// 统计数据
const stats = computed(() => ({
  totalRecords: trainingState.records.length,
  totalTeachers: new Set(trainingState.records.map(record => record.teacher)).size,
  totalHours: trainingState.records.reduce((total, record) => total + Number.parseInt(record.hours, 10), 0),
  materialIncomplete: trainingState.records.filter(record => record.materialStatus !== '记录完整').length,
}))
const records = computed(() => trainingState.records)

// 筛选条件
const selectedOrganization = ref('全校')
const selectedYear = ref('2026 年度')
const selectedDirection = ref('全部')
const selectedMaterialStatus = ref('全部')
const searchQuery = ref('')
const reminderMessage = ref('')
const currentPage = ref(1)
const pageSize = 10

const organizationOptions = ['全校', '智能制造学院', '电子信息学院'].map((value) => ({ label: value, value }))
const yearOptions = ['2026 年度', '2025 年度', '2024 年度'].map((value) => ({ label: value, value }))
const directionOptions = ['全部', '数字化教学', '实践教学', 'AI 赋能课程建设', '课程思政'].map((value) => ({ label: value, value }))
const materialStatusOptions = ['全部', '记录完整', '待总结', '证书待补', '学习中'].map((value) => ({ label: value, value }))

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedYear.value = '2026 年度'
  selectedDirection.value = '全部'
  selectedMaterialStatus.value = '全部'
  searchQuery.value = ''
  reminderMessage.value = ''
}

function viewDetail(id: string) {
  router.push(`/admin/training/records/${id}`)
}

function viewIncompleteMaterials() {
  selectedMaterialStatus.value = '证书待补'
  reminderMessage.value = '已筛选证书待补记录'
}

const filteredRecords = computed(() => {
  const keyword = searchQuery.value.trim()
  return records.value.filter((record) => {
    const matchesOrganization = selectedOrganization.value === '全校'
      || record.department.includes(selectedOrganization.value)
    const matchesYear = selectedYear.value === '全部'
      || record.trainingDate.includes(selectedYear.value.slice(0, 4))
    const matchesDirection = selectedDirection.value === '全部'
      || record.planName.includes(selectedDirection.value)
    const matchesMaterial = selectedMaterialStatus.value === '全部'
      || record.materialStatus === selectedMaterialStatus.value
    const matchesKeyword = !keyword
      || record.teacher.includes(keyword)
      || record.planName.includes(keyword)
      || record.department.includes(keyword)

    return matchesOrganization && matchesYear && matchesDirection && matchesMaterial && matchesKeyword
  })
})
</script>

<template>
  <AdminLayout active-key="training-records">
    <div class="training-record-page">
    

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card stat-record">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">培训记录数</div>
              <div class="stat-value">{{ stats.totalRecords }} <span>条</span></div>
              <div class="stat-desc">当前周期已形成培训记录</div>
            </div>
          </div>
          <div class="stat-card stat-teacher">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">覆盖教师</div>
              <div class="stat-value">{{ stats.totalTeachers }} <span>人</span></div>
              <div class="stat-desc">已形成培训记录的教师数</div>
            </div>
          </div>
          <div class="stat-card stat-hours">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">累计学时</div>
              <div class="stat-value">{{ stats.totalHours.toLocaleString() }} <span>学时</span></div>
              <div class="stat-desc">已沉淀培训学时</div>
            </div>
          </div>
          <div class="stat-card stat-material">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">材料待完善</div>
              <div class="stat-value">{{ stats.materialIncomplete }} <span>条</span></div>
              <div class="stat-desc">待总结、证书待补</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="record-workspace">
          <div class="main-content">
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">培训记录</h2>
              </div>
              <!-- 筛选区 -->
              <CompactFilterBar>
                <template #fields>
                  <div class="filter-item">
                    <label class="filter-label">组织范围</label>
                    <AdminSelect v-model="selectedOrganization" class="filter-select" :options="organizationOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训年度</label>
                    <AdminSelect v-model="selectedYear" class="filter-select" :options="yearOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训方向</label>
                    <AdminSelect v-model="selectedDirection" class="filter-select" :options="directionOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">材料情况</label>
                    <AdminSelect v-model="selectedMaterialStatus" class="filter-select" :options="materialStatusOptions" />
                  </div>
                </template>
                <template #search>
                  <AdminInput
                    v-model="searchQuery"
                    placeholder="搜索教师、培训名称"
                    class="search-input"
                  />
                </template>
                <template #actions>
                  <Button variant="outline" @click="resetFilters">重置</Button>
                </template>
                <template #message>
                  <p v-if="reminderMessage" class="filter-message">{{ reminderMessage }}</p>
                </template>
              </CompactFilterBar>

              <!-- 数据表格 -->
              <div class="table-container">
                <AdminTable
                  class="record-table"
                  :data="filteredRecords"
                  empty-text="暂无符合条件的培训记录"
                >
                  <AdminTableColumn prop="teacher" label="教师" min-width="90" />
                  <AdminTableColumn label="院系 / 专业" min-width="170">
                    <template #default="{ row }">
                      {{ row.department }} / {{ row.major }}
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="planName" label="所属计划" min-width="210" />
                  <AdminTableColumn prop="trainingDate" label="培训时间" min-width="150" />
                  <AdminTableColumn prop="hours" label="学时" min-width="80" />
                  <AdminTableColumn label="材料情况" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.materialStatus" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="操作" min-width="90" fixed="right">
                    <template #default="{ row }">
                      <Button variant="ghost" size="sm" @click="viewDetail(row.id)">
                        查看
                      </Button>
                    </template>
                  </AdminTableColumn>
                </AdminTable>
              </div>
              <AdminPagination
                v-model:current-page="currentPage"
                class="table-footer"
                :page-size="pageSize"
                :total="filteredRecords.length"
              />
            </div>
          </div>

          <!-- 右侧：材料完善提醒 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">材料完善提醒</h3>
              <div class="reminders-list">
	                <div class="reminder-item">
	                  <span class="reminder-icon"></span>
                  <div class="reminder-content">
                    <div class="reminder-title">待总结</div>
                    <div class="reminder-desc">12 位教师需要提交培训总结</div>
                  </div>
                </div>
	                <div class="reminder-item">
	                  <span class="reminder-icon warning"></span>
                  <div class="reminder-content">
                    <div class="reminder-title">证书待补</div>
                    <div class="reminder-desc">18 位教师需要补充培训证书</div>
	                </div>
	              </div>
	              <Button class="full-width" @click="viewIncompleteMaterials">
	                查看材料待完善记录
	              </Button>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-record-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
}

.training-record-page *,
.training-record-page *::before,
.training-record-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 0;
}

.header-content {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
  margin-bottom: var(--space-admin-xl);
  font-size: 14px;
  color: var(--color-admin-text-title);
  font-weight: 800;
}

.breadcrumb i {
  color: #9aa9c0;
  font-style: normal;
}

.breadcrumb .current {
  color: var(--color-admin-primary-hover);
}

.page-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 900;
  color: #07183d;
}

.stats-section {
  background: transparent;
}

.stats-container {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
  padding: 24px 0 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-admin-card-gap);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 22px;
  min-height: 150px;
  padding: 26px 28px;
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  box-shadow: var(--shadow-admin-card-soft);
}

.stat-icon {
  flex: none;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #eaf2ff;
  position: relative;
}

.stat-icon::after {
  content: '';
  position: absolute;
  inset: 18px 21px;
  border-radius: 4px;
  background: var(--color-admin-primary-hover);
}

.stat-teacher .stat-icon {
  background: #e6f8ef;
}

.stat-teacher .stat-icon::after {
  background: #13b86a;
  border-radius: 50%;
}

.stat-hours .stat-icon {
  background: #f0e9ff;
}

.stat-hours .stat-icon::after {
  background: #7b4cf4;
  border-radius: 50%;
}

.stat-material .stat-icon {
  background: #fff0e3;
}

.stat-material .stat-icon::after {
  background: #f97316;
}

.stat-value {
  font-size: 34px;
  line-height: 1;
  font-weight: 900;
  color: var(--color-admin-primary-hover);
  margin-bottom: var(--space-admin-md);
  white-space: nowrap;
}

.stat-value span {
  font-size: 16px;
  color: var(--color-admin-text-title);
  font-weight: 800;
}

.stat-teacher .stat-value {
  color: #0ca65f;
}

.stat-hours .stat-value {
  color: #7b4cf4;
}

.stat-material .stat-value {
  color: #f97316;
}

.stat-label {
  font-size: 16px;
  color: var(--color-admin-text-title);
  font-weight: 900;
  margin-bottom: var(--space-admin-xs);
}

.stat-desc {
  font-size: 13px;
  color: var(--color-admin-text-subtle);
  white-space: nowrap;
}

.main-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
  padding: 16px 0 34px;
}

.record-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: var(--space-admin-xl);
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-soft);
}

.card-header {
  padding: 22px 24px 10px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: #07183d;
}

.filter-item {
  display: grid;
  grid-template-columns: auto 136px;
  gap: var(--space-admin-sm);
  align-items: center;
}

.filter-label {
  font-size: 14px;
  font-weight: 800;
  color: #31466f;
  white-space: nowrap;
}

.filter-select {
  height: 40px;
}

.search-input {
  width: 100%;
  min-width: 0;
}

.search-input :deep(.el-input__wrapper) {
  min-height: 40px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  box-shadow: 0 0 0 1px #d6e2f3 inset;
  transition: box-shadow 0.16s ease;
}

.search-input :deep(.el-input__inner) {
  color: var(--color-admin-text-title);
  font-size: 14px;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--color-admin-primary-hover) inset;
}

.filter-message {
  margin: 10px 0 0;
  color: var(--color-admin-primary-hover);
  font-size: 13px;
  font-weight: 800;
}

.table-container {
  padding: 0 18px;
  overflow-x: auto;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-admin-border-muted);
  border-radius: var(--radius-admin-panel);
  overflow: hidden;
  table-layout: fixed;
}

.record-table :deep(.el-table__header .el-table__cell) {
  height: 48px;
  padding: 0 14px;
  text-align: center;
  font-size: 13px;
  font-weight: 900;
  color: #31466f;
  border-bottom: 1px solid var(--color-admin-border-muted);
  border-right: 1px solid var(--color-admin-divider);
  background: #f4f7fc;
}

.record-table :deep(.el-table__body .el-table__cell) {
  height: 64px;
  padding: 0 14px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--color-admin-text-title);
  text-align: center;
  border-bottom: 1px solid var(--color-admin-divider);
  border-right: 1px solid var(--color-admin-divider);
  vertical-align: middle;
}

.record-table :deep(.el-table__cell:last-child) {
  border-right: 0;
}

.record-table :deep(.el-table__body tr:last-child .el-table__cell) {
  border-bottom: none;
}

.record-table :deep(.el-table__cell:nth-child(1)) { width: 10%; }
.record-table :deep(.el-table__cell:nth-child(2)) { width: 18%; }
.record-table :deep(.el-table__cell:nth-child(3)) { width: 24%; }
.record-table :deep(.el-table__cell:nth-child(4)) { width: 20%; }
.record-table :deep(.el-table__cell:nth-child(5)) { width: 10%; }
.record-table :deep(.el-table__cell:nth-child(6)) { width: 12%; }
.record-table :deep(.el-table__cell:nth-child(7)) { width: 8%; }

.record-table :deep(.el-table__body .el-table__cell:first-child) {
  font-weight: 800;
  color: var(--color-admin-text-title);
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-admin-md-lg);
  padding: 18px 24px 24px;
  color: var(--color-admin-text-subtle);
  font-size: 14px;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  padding: var(--space-admin-2xl);
  box-shadow: var(--shadow-admin-card-soft);
}

.sidebar-title {
  margin: 0 0 24px;
  font-size: 20px;
  font-weight: 900;
  color: #07183d;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.reminder-item {
  display: flex;
  gap: var(--space-admin-card-gap);
  align-items: center;
  min-height: 132px;
  padding: 22px 18px;
  background: #fffaf4;
  border: 1px solid #f4dfc5;
  border-radius: var(--radius-admin-panel);
}

.reminder-icon {
  width: 62px;
  height: 62px;
  background: #fff0e3;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}

.reminder-icon::after {
  content: '';
  position: absolute;
  inset: 18px 21px;
  border-radius: 4px;
  background: #f97316;
}

.reminder-icon.warning::after {
  border-radius: var(--radius-sm);
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-size: 18px;
  font-weight: 900;
  color: #07183d;
  margin-bottom: var(--space-admin-sm);
}

.reminder-desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-admin-text-subtle);
}

.full-width {
  width: 100%;
  margin-top: 48px;
}

@media (max-width: 1300px) {
  .header-content,
  .stats-container,
  .main-section {
    width: min(100% - 32px, 1500px);
  }

  .stats-container {
    gap: var(--space-admin-md-lg);
  }

  .stat-card {
    gap: var(--space-admin-md-lg);
    min-height: 168px;
    padding: 22px 18px;
  }

  .stat-icon {
    width: 50px;
    height: 50px;
  }

  .stat-value {
    font-size: 30px;
  }

  .stat-value span {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .table-container {
    padding: 0 12px;
  }

  .record-table {
    min-width: 840px;
  }
}
</style>
