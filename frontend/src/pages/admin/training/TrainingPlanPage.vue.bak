<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()

// 新建计划抽屉控制
const showDrawer = ref(false)

// 筛选条件
const selectedOrganization = ref('全校')
const selectedStatus = ref('全部')
const selectedYear = ref('2026 年度')
const selectedParticipation = ref('全部')
const searchQuery = ref('')

// 筛选项数据
const organizations = ['全校', '智能制造学院', '电子信息学院', '商贸管理学院', '汽车工程学院']
const statuses = ['全部', '报名中', '进行中', '已完成', '材料待完善']
const years = ['2026 年度', '2025 年度', '2024 年度']
const participationModes = ['全部', '自主报名', '定向推荐', '指定参加']

// 统计数据
const stats = {
  total: 24,
  registering: 6,
  inProgress: 4,
  materialIncomplete: 5,
}

// 培训计划数据
interface TrainingPlan {
  id: string
  name: string
  direction: string
  target: string
  startDate: string
  endDate: string
  participation: string
  status: string
  currentParticipants: number
  maxParticipants: number
}

const trainingPlans: TrainingPlan[] = [
  {
    id: 'summer-digital',
    name: '2026 年暑期数字化教学能力提升培训',
    direction: '数字化教学',
    target: '智能制造学院、电子信息学院相关教师',
    startDate: '2026-07-10',
    endDate: '2026-07-14',
    participation: '自主报名',
    status: '报名中',
    currentParticipants: 18,
    maxParticipants: 30,
  },
  {
    id: 'practice-ability',
    name: '双师型教师实践能力提升培训',
    direction: '实践教学',
    target: '智能制造学院相关教师',
    startDate: '2026-06-01',
    endDate: '2026-06-07',
    participation: '定向推荐',
    status: '进行中',
    currentParticipants: 24,
    maxParticipants: 25,
  },
  {
    id: 'ai-course',
    name: 'AI 赋能课程建设专题培训',
    direction: 'AI 课程建设',
    target: '全校教师',
    startDate: '2026-05-20',
    endDate: '2026-05-21',
    participation: '自主报名',
    status: '材料待完善',
    currentParticipants: 46,
    maxParticipants: 52,
  },
  {
    id: 'course-ideology',
    name: '课程思政教学设计研修',
    direction: '课程思政',
    target: '现代服务学院相关教师',
    startDate: '2026-04-12',
    endDate: '2026-04-15',
    participation: '指定参加',
    status: '已完成',
    currentParticipants: 30,
    maxParticipants: 30,
  },
]

// 执行提醒
const reminders = [
  '草稿待发布：2 个培训计划已创建，尚未发布。',
  '报名即将截止：3 个培训计划将在 3 天内结束报名。',
  '材料待完善：5 个培训计划已结束，仍有教师待确认总结或补充证书。',
]

function openDrawer() {
  showDrawer.value = true
}

function closeDrawer() {
  showDrawer.value = false
}

function viewDetail(id: string) {
  router.push(`/admin/training/plans/${id}`)
}

function saveDraft() {
  console.log('保存草稿')
  closeDrawer()
}

function saveAndPublish() {
  console.log('保存并发布')
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
  materialRequirements: [],
  description: '',
})

const applicationOptions = ['需要', '不需要']
const materialOptions = ['培训总结', '培训证书', '其他材料']
</script>

<template>
  <AdminLayout active-key="training-plans">
    <div class="training-plan-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <h1 class="page-title">计划管理</h1>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">计划总数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.registering }}</div>
            <div class="stat-label">报名中</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.inProgress }}</div>
            <div class="stat-label">进行中</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.materialIncomplete }}</div>
            <div class="stat-label">材料待完善</div>
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
              <div class="filter-section">
                <div class="filter-row">
                  <div class="filter-item">
                    <label class="filter-label">组织范围</label>
                    <select v-model="selectedOrganization" class="filter-select">
                      <option v-for="org in organizations" :key="org" :value="org">
                        {{ org }}
                      </option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">计划状态</label>
                    <select v-model="selectedStatus" class="filter-select">
                      <option v-for="status in statuses" :key="status" :value="status">
                        {{ status }}
                      </option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训时间</label>
                    <select v-model="selectedYear" class="filter-select">
                      <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                      </option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">参与方式</label>
                    <select v-model="selectedParticipation" class="filter-select">
                      <option v-for="mode in participationModes" :key="mode" :value="mode">
                        {{ mode }}
                      </option>
                    </select>
                  </div>
                  <button class="btn-reset" @click="resetFilters">重置</button>
                  <button class="btn-primary" @click="openDrawer">
                    新建培训计划
                  </button>
                </div>
                <div class="search-row">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索计划名称、培训方向、培训资源"
                    class="search-input"
                  />
                </div>
              </div>

              <!-- 数据表格 -->
              <div class="table-container">
                <table class="plan-table">
                  <thead>
                    <tr>
                      <th>计划名称</th>
                      <th>培训方向</th>
                      <th>面向对象</th>
                      <th>培训时间</th>
                      <th>参与方式</th>
                      <th>当前状态</th>
                      <th>参与情况</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="plan in trainingPlans" :key="plan.id">
                      <td>{{ plan.name }}</td>
                      <td>{{ plan.direction }}</td>
                      <td>{{ plan.target }}</td>
                      <td>{{ plan.startDate }} 至 {{ plan.endDate }}</td>
                      <td>{{ plan.participation }}</td>
                      <td>
                        <span class="status-badge" :class="plan.status">
                          {{ plan.status }}
                        </span>
                      </td>
                      <td>{{ plan.currentParticipants }} / {{ plan.maxParticipants }} 人</td>
                      <td>
                        <button class="btn-view" @click="viewDetail(plan.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：执行提醒 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">执行提醒</h3>
              <div class="reminders-list">
                <div
                  v-for="(reminder, index) in reminders"
                  :key="index"
                  class="reminder-item"
                >
                  <span class="reminder-dot"></span>
                  <span class="reminder-text">{{ reminder }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 新建培训计划抽屉 -->
      <div v-if="showDrawer" class="drawer-overlay" @click="closeDrawer">
        <div class="drawer" @click.stop>
          <div class="drawer-header">
            <h2 class="drawer-title">新建培训计划</h2>
            <button class="btn-close" @click="closeDrawer">✕</button>
          </div>
          <div class="drawer-body">
            <div class="form-section">
              <div class="form-item">
                <label class="form-label">计划名称</label>
                <input v-model="newPlan.name" type="text" class="form-input" placeholder="请输入计划名称" />
              </div>
              <div class="form-item">
                <label class="form-label">培训方向</label>
                <input v-model="newPlan.direction" type="text" class="form-input" placeholder="请输入培训方向" />
              </div>
              <div class="form-item">
                <label class="form-label">关联需求</label>
                <input v-model="newPlan.relatedDemand" type="text" class="form-input" placeholder="请输入关联需求" />
              </div>
              <div class="form-item">
                <label class="form-label">关联资源</label>
                <input v-model="newPlan.relatedResource" type="text" class="form-input" placeholder="请输入关联资源" />
              </div>
              <div class="form-item">
                <label class="form-label">面向对象</label>
                <input v-model="newPlan.target" type="text" class="form-input" placeholder="请输入面向对象" />
              </div>
              <div class="form-row">
                <div class="form-item">
                  <label class="form-label">培训开始时间</label>
                  <input v-model="newPlan.startDate" type="date" class="form-input" />
                </div>
                <div class="form-item">
                  <label class="form-label">培训结束时间</label>
                  <input v-model="newPlan.endDate" type="date" class="form-input" />
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">参与方式</label>
                <select v-model="newPlan.participation" class="form-select">
                  <option v-for="mode in participationModes" :key="mode" :value="mode">
                    {{ mode }}
                  </option>
                </select>
              </div>
              <div class="form-item">
                <label class="form-label">是否需要申请处理</label>
                <select v-model="newPlan.needApplication" class="form-select">
                  <option v-for="option in applicationOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="form-item">
                <label class="form-label">计划名额</label>
                <input v-model="newPlan.quota" type="number" class="form-input" placeholder="请输入计划名额" />
              </div>
              <div class="form-item">
                <label class="form-label">材料要求</label>
                <div class="checkbox-group">
                  <label v-for="option in materialOptions" :key="option" class="checkbox-item">
                    <input type="checkbox" :value="option" v-model="newPlan.materialRequirements" />
                    <span>{{ option }}</span>
                  </label>
                </div>
              </div>
              <div class="form-item">
                <label class="form-label">计划说明</label>
                <textarea v-model="newPlan.description" class="form-textarea" placeholder="请输入计划说明" rows="4"></textarea>
              </div>
            </div>
          </div>
          <div class="drawer-footer">
            <button class="btn-secondary" @click="closeDrawer">取消</button>
            <button class="btn-secondary" @click="saveDraft">保存草稿</button>
            <button class="btn-primary" @click="saveAndPublish">保存并发布</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-plan-page {
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

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* 统计卡区域 */
.stats-section {
  background: white;
  border-bottom: 1px solid var(--color-card-border);
}

.stats-container {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
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

/* 主体内容区域 */
.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.plan-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  overflow: hidden;
}

/* 筛选区 */
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
  margin-left: auto;
}

.btn-primary:hover {
  background: #28a38a;
}

.btn-secondary {
  padding: 10px 20px;
  background: white;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* 表格 */
.table-container {
  overflow-x: auto;
}

.plan-table {
  width: 100%;
  border-collapse: collapse;
}

.plan-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.plan-table td {
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.plan-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.报名中 {
  background: #dbeafe;
  color: #2563eb;
}

.status-badge.进行中 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.已完成 {
  background: #f3f4f6;
  color: #6b7280;
}

.status-badge.材料待完善 {
  background: #fef3c7;
  color: #d97706;
}

.btn-view {
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-view:hover {
  background: #28a38a;
}

/* 侧边栏 */
.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
  position: sticky;
  top: 24px;
}

.sidebar-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reminder-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.reminder-dot {
  width: 6px;
  height: 6px;
  background: var(--color-primary);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.reminder-text {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* 抽屉 */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 480px;
  background: white;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.drawer-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.btn-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--color-text-hint);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-close:hover {
  background: #f3f4f6;
  color: var(--color-text-primary);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
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
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-primary);
  cursor: pointer;
}

.drawer-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid var(--color-card-border);
}

.drawer-footer .btn-secondary,
.drawer-footer .btn-primary {
  flex: 1;
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .plan-workspace {
    grid-template-columns: 1fr;
  }

  .sidebar-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .drawer {
    width: 100%;
  }
}
</style>