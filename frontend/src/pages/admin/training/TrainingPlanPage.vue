<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminCheckboxGroup, AdminDatePicker, AdminIcon, AdminInput, AdminSelect, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { CompactFilterBar, DetailSheet, InsightSidebar, StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import { getTrainingPlanPageMock } from '@/services/mock/training'
import {
  createTrainingPlan,
  getTrainingState,
  type TrainingPlan,
} from '@/stores/admin/trainingStore'

const router = useRouter()
const route = useRoute()
const trainingState = getTrainingState()

// 新建计划抽屉控制
const showDrawer = ref(false)

// 筛选条件
const selectedOrganization = ref('全校')
const selectedStatus = ref('全部')
const selectedYear = ref('2026 年度')
const selectedParticipation = ref('全部')
const searchQuery = ref('')
const operationMessage = useOperationMessage()

const {
  organizations,
  statuses,
  years,
  participationModes,
  reminders,
  applicationOptions,
  materialOptions,
} = getTrainingPlanPageMock()

const organizationOptions = organizations.map((value) => ({ label: value, value }))
const statusOptions = statuses.map((value) => ({ label: value, value }))
const yearOptions = years.map((value) => ({ label: value, value }))
const participationOptions = participationModes.map((value) => ({ label: value, value }))
const applicationSelectOptions = applicationOptions.map((value) => ({ label: value, value }))

// 统计数据
const stats = computed(() => ({
  total: trainingState.plans.length,
  registering: trainingState.plans.filter(plan => plan.status === '报名中').length,
  inProgress: trainingState.plans.filter(plan => plan.status === '进行中').length,
  materialIncomplete: trainingState.plans.filter(plan => plan.status === '材料待完善').length,
}))
const trainingPlans = computed(() => trainingState.plans)

function openDrawer() {
  showDrawer.value = true
}

function closeDrawer() {
  showDrawer.value = false
}

function viewDetail(id: string) {
  router.push(`/admin/training/plans/${id}`)
}

function participantRate(plan: TrainingPlan) {
  return Math.round(plan.currentParticipants / plan.maxParticipants * 100)
}

function saveDraft() {
  const plan = createPlanFromForm('draft')
  operationMessage.set(`已保存草稿：${plan.name}`)
  closeDrawer()
}

function saveAndPublish() {
  const plan = createPlanFromForm('published')
  operationMessage.set(`已发布培训计划：${plan.name}`)
  closeDrawer()
}

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedStatus.value = '全部'
  selectedYear.value = '2026 年度'
  selectedParticipation.value = '全部'
  searchQuery.value = ''
}

// 新建计划表单
const newPlan = ref({
  name: '',
  direction: '',
  relatedDemand: '',
  relatedResource: '',
  target: '',
  startDate: '',
  endDate: '',
  participation: '自主报名',
  needApplication: '不需要',
  quota: '',
  materialRequirements: [] as string[],
  description: '',
})

const filteredPlans = computed(() => {
  const keyword = searchQuery.value.trim()
  return trainingPlans.value.filter((plan) => {
    const matchesStatus = selectedStatus.value === '全部' || plan.status === selectedStatus.value
    const matchesParticipation = selectedParticipation.value === '全部' || plan.participation === selectedParticipation.value
    const matchesOrganization = selectedOrganization.value === '全校' || plan.target.includes(selectedOrganization.value)
    const matchesYear = selectedYear.value === '全部' || plan.startDate.startsWith(selectedYear.value.slice(0, 4))
    const matchesKeyword = !keyword
      || plan.name.includes(keyword)
      || plan.direction.includes(keyword)
      || plan.target.includes(keyword)

    return matchesStatus && matchesParticipation && matchesOrganization && matchesYear && matchesKeyword
  })
})

function createPlanFromForm(mode: 'draft' | 'published') {
  return createTrainingPlan({
    name: newPlan.value.name,
    direction: newPlan.value.direction,
    relatedDemand: newPlan.value.relatedDemand,
    relatedResource: newPlan.value.relatedResource,
    target: newPlan.value.target,
    startDate: newPlan.value.startDate,
    endDate: newPlan.value.endDate,
    participation: newPlan.value.participation,
    maxParticipants: Number(newPlan.value.quota) || 30,
    quota: Number(newPlan.value.quota) || 30,
    description: newPlan.value.description,
    applicationRequired: newPlan.value.needApplication,
  }, mode)
}
</script>

<template>
  <AdminLayout active-key="training-plans">
    <div class="training-plan-page">
     

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card stat-total">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">计划总数</div>
              <div class="stat-value">{{ stats.total }}</div>
              <div class="stat-desc">已创建的培训计划总数</div>
            </div>
          </div>
          <div class="stat-card stat-registering">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">报名中</div>
              <div class="stat-value">{{ stats.registering }}</div>
              <div class="stat-desc">正在报名中的培训计划</div>
            </div>
          </div>
          <div class="stat-card stat-progress">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">进行中</div>
              <div class="stat-value">{{ stats.inProgress }}</div>
              <div class="stat-desc">正在开展的培训计划</div>
            </div>
          </div>
          <div class="stat-card stat-material">
            <div class="stat-icon"></div>
            <div>
              <div class="stat-label">材料待完善</div>
              <div class="stat-value">{{ stats.materialIncomplete }}</div>
              <div class="stat-desc">材料尚未完善的计划</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="plan-workspace">
          <!-- 左侧：计划列表 -->
          <div class="main-content">
            <div class="content-card">
              <!-- 筛选和操作区 -->
              <div class="card-header">
                <h2 class="card-title">培训计划</h2>
                <Button class="create-plan-action" @click="openDrawer">
                  新建培训计划
                  <AdminIcon name="plus" />
                </Button>
              </div>
              <CompactFilterBar>
                <template #fields>
                  <div class="filter-item">
                    <label class="filter-label">组织范围</label>
                    <AdminSelect v-model="selectedOrganization" class="filter-select" :options="organizationOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">计划状态</label>
                    <AdminSelect v-model="selectedStatus" class="filter-select" :options="statusOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训时间</label>
                    <AdminSelect v-model="selectedYear" class="filter-select" :options="yearOptions" />
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">参与方式</label>
                    <AdminSelect v-model="selectedParticipation" class="filter-select" :options="participationOptions" />
                  </div>
                </template>
                <template #search>
                  <AdminInput
                    v-model="searchQuery"
                    placeholder="搜索计划名称、培训方向、培训资源"
                    class="search-input"
                  />
                </template>
                <template #actions>
                  <Button variant="outline" @click="resetFilters">重置</Button>
                </template>
                <template #message>
                  <p v-if="operationMessage.text.value" class="plan-notice">{{ operationMessage.text.value }}</p>
                </template>
              </CompactFilterBar>

              <!-- 数据表格 -->
              <div class="table-container">
                <AdminTable
                  class="plan-table"
                  :data="filteredPlans"
                  empty-text="暂无符合条件的培训计划"
                >
                  <AdminTableColumn prop="name" label="计划名称" min-width="170" />
                  <AdminTableColumn prop="direction" label="培训方向" min-width="110" />
                  <AdminTableColumn prop="target" label="面向对象" min-width="170" />
                  <AdminTableColumn label="培训时间" min-width="170">
                    <template #default="{ row }">
                      {{ row.startDate }} 至 {{ row.endDate }}
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="participation" label="参与方式" min-width="100" />
                  <AdminTableColumn label="当前状态" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.status" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="参与情况" min-width="120">
                    <template #default="{ row }">
                      <div class="participant-cell">
                        <span>{{ row.currentParticipants }} / {{ row.maxParticipants }} 人</span>
                        <small>{{ participantRate(row) }}%</small>
                      </div>
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
              <div class="table-footer">
                <span>共 {{ filteredPlans.length }} 条</span>
                <span>当前显示全部结果</span>
              </div>
            </div>
          </div>

          <!-- 右侧：执行提醒 -->
          <div class="sidebar">
            <InsightSidebar title="执行提醒">
              <template #items>
                <div class="reminders-list">
                  <div
                    v-for="(reminder, index) in reminders"
                    :key="index"
                    class="reminder-item"
                  >
                    <span class="reminder-icon"></span>
                    <span class="reminder-text">{{ reminder }}</span>
                  </div>
                </div>
              </template>
              <template #action>
                <Button class="full-width" variant="outline" @click="selectedStatus = '报名中'">
                  查看相关计划
                </Button>
              </template>
            </InsightSidebar>
          </div>
        </div>
      </section>

      <DetailSheet
        :open="showDrawer"
        title="新建培训计划"
        width="md"
        mode="edit"
        @update:open="showDrawer = $event"
        @cancel="closeDrawer"
      >
        <div class="form-section">
          <div class="form-item">
                <label class="form-label">计划名称</label>
                <AdminInput v-model="newPlan.name" class="form-input" placeholder="请输入计划名称" />
              </div>
              <div class="form-item">
                <label class="form-label">培训方向</label>
                <AdminInput v-model="newPlan.direction" class="form-input" placeholder="请输入培训方向" />
              </div>
              <div class="form-item">
                <label class="form-label">关联需求</label>
                <AdminInput v-model="newPlan.relatedDemand" class="form-input" placeholder="请输入关联需求" />
              </div>
              <div class="form-item">
                <label class="form-label">关联资源</label>
                <AdminInput v-model="newPlan.relatedResource" class="form-input" placeholder="请输入关联资源" />
              </div>
              <div class="form-item">
                <label class="form-label">面向对象</label>
                <AdminInput v-model="newPlan.target" class="form-input" placeholder="请输入面向对象" />
              </div>
              <div class="form-row">
                <div class="form-item">
                  <label class="form-label">培训开始时间</label>
                  <AdminDatePicker v-model="newPlan.startDate" class="form-input" />
                </div>
                <div class="form-item">
                  <label class="form-label">培训结束时间</label>
                  <AdminDatePicker v-model="newPlan.endDate" class="form-input" />
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">参与方式</label>
                <AdminSelect v-model="newPlan.participation" class="form-select" :options="participationOptions" />
              </div>
              <div class="form-item">
                <label class="form-label">是否需要申请处理</label>
                <AdminSelect v-model="newPlan.needApplication" class="form-select" :options="applicationSelectOptions" />
              </div>
              <div class="form-item">
                <label class="form-label">计划名额</label>
                <AdminInput v-model="newPlan.quota" type="number" class="form-input" placeholder="请输入计划名额" />
              </div>
              <div class="form-item">
                <label class="form-label">材料要求</label>
                <AdminCheckboxGroup v-model="newPlan.materialRequirements" class="checkbox-group" :options="materialOptions" />
              </div>
              <div class="form-item">
                <label class="form-label">计划说明</label>
                <AdminInput
                  v-model="newPlan.description"
                  type="textarea"
                  class="form-textarea"
                  placeholder="请输入计划说明"
                  :rows="4"
                />
              </div>
        </div>
        <template #footer>
          <Button class="flex-1" variant="outline" @click="closeDrawer">取消</Button>
          <Button class="flex-1" variant="secondary" @click="saveDraft">保存草稿</Button>
          <Button class="flex-1" @click="saveAndPublish">保存并发布</Button>
        </template>
      </DetailSheet>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-plan-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
}

.training-plan-page *,
.training-plan-page *::before,
.training-plan-page *::after {
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
  font-weight: 800;
  color: var(--color-admin-text-title);
}

.breadcrumb i {
  color: #9aa9c0;
  font-style: normal;
}

.breadcrumb .current {
  color: var(--color-admin-primary-hover);
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-admin-xl);
}

.page-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 800;
  color: #07183d;
}

.page-subtitle {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--color-admin-text-subtle);
}

.create-plan-action {
  margin-left: 0;
  min-width: 138px;
}

/* 统计卡区域 */
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
  inset: 19px 21px;
  border-radius: 4px;
  background: var(--color-admin-primary-hover);
}

.stat-registering .stat-icon {
  background: #e6f8ef;
}

.stat-registering .stat-icon::after {
  background: #13b86a;
  border-radius: 50%;
}

.stat-progress .stat-icon {
  background: #f0e9ff;
}

.stat-progress .stat-icon::after {
  background: #7b4cf4;
  clip-path: polygon(25% 16%, 82% 50%, 25% 84%);
}

.stat-material .stat-icon {
  background: #fff0e3;
}

.stat-material .stat-icon::after {
  background: #f97316;
}

.stat-card > div:last-child {
  min-width: 0;
}

.stat-label {
  font-size: 16px;
  color: var(--color-admin-text-title);
  font-weight: 800;
  margin-bottom: var(--space-admin-xs);
}

.stat-value {
  font-size: 34px;
  line-height: 1;
  font-weight: 900;
  color: var(--color-admin-primary-hover);
  margin-bottom: var(--space-admin-md);
}

.stat-registering .stat-value {
  color: #0ca65f;
}

.stat-progress .stat-value {
  color: #7b4cf4;
}

.stat-material .stat-value {
  color: #f97316;
}

.stat-desc {
  font-size: 13px;
  color: var(--color-admin-text-subtle);
  white-space: nowrap;
}

/* 主体内容区域 */
.main-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
  padding: 16px 0 34px;
}

.plan-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: var(--space-admin-xl);
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  box-shadow: var(--shadow-admin-card-soft);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px 10px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 800;
  color: #07183d;
}

.filter-item {
  display: grid;
  grid-template-columns: auto 118px;
  gap: var(--space-admin-sm);
  align-items: center;
}

.filter-label {
  font-size: 14px;
  font-weight: 700;
  color: #31466f;
  white-space: nowrap;
}

.filter-select {
  height: 38px;
  padding: 0 34px 0 12px;
  border: 1px solid #d6e2f3;
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--color-admin-text-title);
  background: #fff;
  cursor: pointer;
  outline: none;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #d6e2f3;
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--color-admin-text-title);
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus,
.filter-select:focus {
  border-color: var(--color-admin-primary-hover);
}

.plan-notice {
  margin: 12px 0 0;
  color: var(--color-admin-primary-hover);
  font-size: 13px;
  font-weight: 700;
}

/* 表格 */
.table-container {
  padding: 0 18px;
  overflow-x: auto;
}

.plan-table {
  width: 100%;
  min-width: 780px;
  border-collapse: collapse;
  border: 1px solid var(--color-admin-border-muted);
  border-radius: var(--radius-admin-panel);
  overflow: hidden;
  table-layout: fixed;
}

.plan-table th {
  height: 48px;
  padding: 0 14px;
  text-align: left;
  font-size: 13px;
  font-weight: 800;
  color: #31466f;
  border-bottom: 1px solid var(--color-admin-border-muted);
  border-right: 1px solid var(--color-admin-divider);
  background: #f4f7fc;
}

.plan-table td {
  height: 70px;
  padding: 0 14px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--color-admin-text-title);
  border-bottom: 1px solid var(--color-admin-divider);
  border-right: 1px solid var(--color-admin-divider);
  vertical-align: middle;
}

.plan-table th:last-child,
.plan-table td:last-child {
  border-right: 0;
}

.plan-table tr:last-child td {
  border-bottom: none;
}

.plan-table th:nth-child(1) { width: 18%; }
.plan-table th:nth-child(2) { width: 10%; }
.plan-table th:nth-child(3) { width: 18%; }
.plan-table th:nth-child(4) { width: 16%; }
.plan-table th:nth-child(5) { width: 10%; }
.plan-table th:nth-child(6) { width: 10%; }
.plan-table th:nth-child(7) { width: 10%; }
.plan-table th:nth-child(8) { width: 8%; }

.plan-table td:first-child {
  color: var(--color-admin-primary-hover);
  font-weight: 800;
}

.participant-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.participant-cell small {
  color: #7586a6;
  font-size: 12px;
}

.table-footer {
  display: flex;
  justify-content: center;
  gap: var(--space-admin-xl);
  padding: 16px 24px 24px;
  color: var(--color-admin-text-subtle);
  font-size: 13px;
}

/* 侧边栏 */
.sidebar {
  min-width: 0;
}

.full-width {
  width: 100%;
}

.sidebar :deep(.insight-sidebar) {
  position: sticky;
  top: 24px;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--color-admin-border-muted);
  border-radius: var(--radius-admin-panel);
  overflow: hidden;
}

.reminder-item {
  display: flex;
  gap: var(--space-admin-lg);
  align-items: flex-start;
  padding: 22px 18px;
  border-bottom: 1px solid var(--color-admin-border-muted);
}

.reminder-item:last-child {
  border-bottom: 0;
}

.reminder-icon {
  flex: none;
  width: 54px;
  height: 54px;
  background: #eaf2ff;
  border-radius: 50%;
  position: relative;
}

.reminder-icon::after {
  content: '';
  position: absolute;
  inset: 18px 19px;
  background: var(--color-admin-primary-hover);
  border-radius: 4px;
}

.reminder-item:nth-child(2) .reminder-icon {
  background: #fff0e3;
}

.reminder-item:nth-child(2) .reminder-icon::after {
  background: #f97316;
  border-radius: 50%;
}

.reminder-item:nth-child(3) .reminder-icon {
  background: #e8f8ef;
}

.reminder-item:nth-child(3) .reminder-icon::after {
  background: #0ca65f;
}

.reminder-text {
  font-size: 14px;
  color: var(--color-admin-text-title);
  line-height: 1.8;
  font-weight: 700;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-card-gap);
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-admin-lg);
}

.form-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--color-admin-text-title);
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid #d6e2f3;
  border-radius: var(--radius-sm);
  font-size: 14px;
  outline: none;
  transition: border-color 0.16s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--color-primary);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-xs);
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  font-size: 14px;
  color: var(--color-admin-text-title);
  cursor: pointer;
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
}

@media (max-width: 768px) {
  .title-row {
    flex-direction: column;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

}
</style>
