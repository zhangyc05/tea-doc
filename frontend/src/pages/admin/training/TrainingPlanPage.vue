<script setup lang="ts">
import { computed, ref } from 'vue'
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
const planNotice = ref('')

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

const trainingPlans = ref<TrainingPlan[]>([
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
])

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
  planNotice.value = newPlan.value.name
    ? `已保存草稿：${newPlan.value.name}`
    : '已保存草稿，稍后可继续完善培训计划。'
  closeDrawer()
}

function saveAndPublish() {
  planNotice.value = newPlan.value.name
    ? `已发布培训计划：${newPlan.value.name}`
    : '已保存并发布培训计划。'
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
                <button class="btn-primary btn-create" @click="openDrawer">新建培训计划 ＋</button>
              </div>
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
                </div>
                <div class="search-row">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索计划名称、培训方向、培训资源"
                    class="search-input"
                  />
                </div>
                <p v-if="planNotice" class="plan-notice">{{ planNotice }}</p>
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
                    <tr v-for="plan in filteredPlans" :key="plan.id">
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
                      <td>
                        <div class="participant-cell">
                          <span>{{ plan.currentParticipants }} / {{ plan.maxParticipants }} 人</span>
                          <small>{{ Math.round(plan.currentParticipants / plan.maxParticipants * 100) }}%</small>
                        </div>
                      </td>
                      <td>
                        <button class="btn-view" @click="viewDetail(plan.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                    <tr v-if="filteredPlans.length === 0">
                      <td colspan="8" class="empty-cell">暂无符合条件的培训计划</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table-footer">
                <span>共 {{ filteredPlans.length }} 条</span>
                <span>当前显示全部结果</span>
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
                  <span class="reminder-icon"></span>
                  <span class="reminder-text">{{ reminder }}</span>
                </div>
              </div>
              <button class="btn-outline" @click="selectedStatus = '报名中'">
                查看相关计划
              </button>
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
  background: #f6f9ff;
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
  gap: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 800;
  color: #172b55;
}

.breadcrumb i {
  color: #9aa9c0;
  font-style: normal;
}

.breadcrumb .current {
  color: #0f5eef;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
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
  color: #405985;
}

.btn-create {
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
  gap: 18px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 22px;
  min-height: 150px;
  padding: 26px 28px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
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
  background: #0f5eef;
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
  color: #172b55;
  font-weight: 800;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 34px;
  line-height: 1;
  font-weight: 900;
  color: #0f5eef;
  margin-bottom: 12px;
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
  color: #405985;
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
  gap: 20px;
}

.main-content {
  min-width: 0;
}

.content-card,
.sidebar-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.content-card {
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

/* 筛选区 */
.filter-section {
  padding: 16px 24px 20px;
}

.filter-row {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.filter-item {
  display: grid;
  grid-template-columns: auto 118px;
  gap: 10px;
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
  border-radius: 6px;
  font-size: 14px;
  color: #172b55;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.search-row {
  display: flex;
  max-width: 520px;
}

.search-input {
  flex: 1;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #d6e2f3;
  border-radius: 6px;
  font-size: 14px;
  color: #172b55;
  outline: none;
  transition: border-color 0.16s ease;
}

.search-input:focus,
.filter-select:focus {
  border-color: #0f5eef;
}

.btn-reset {
  height: 38px;
  padding: 0 12px;
  background: transparent;
  border: 0;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: color 0.16s ease;
}

.btn-reset:hover {
  color: #0c4fd0;
}

.btn-primary {
  height: 38px;
  padding: 0 18px;
  background: #0f5eef;
  color: white;
  border: 1px solid #0f5eef;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #0c4fd0;
}

.btn-secondary {
  height: 38px;
  padding: 0 18px;
  background: #fff;
  color: #405985;
  border: 1px solid #d6e2f3;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-secondary:hover {
  border-color: #0f5eef;
  color: #0f5eef;
}

.plan-notice {
  margin: 12px 0 0;
  color: #0f5eef;
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
  border: 1px solid #d9e5f7;
  border-radius: 8px;
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
  border-bottom: 1px solid #d9e5f7;
  border-right: 1px solid #e5edf8;
  background: #f4f7fc;
}

.plan-table td {
  height: 70px;
  padding: 0 14px;
  font-size: 13px;
  line-height: 1.65;
  color: #172b55;
  border-bottom: 1px solid #e5edf8;
  border-right: 1px solid #e5edf8;
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
  color: #0f5eef;
  font-weight: 800;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  height: 26px;
  padding: 0 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 800;
}

.status-badge.报名中 {
  background: #eaf2ff;
  color: #0f5eef;
}

.status-badge.进行中 {
  background: #e8f8ef;
  color: #0ca65f;
}

.status-badge.已完成 {
  background: #eef2f7;
  color: #52637e;
}

.status-badge.材料待完善 {
  background: #fff1e7;
  color: #f97316;
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

.btn-view {
  padding: 0;
  background: transparent;
  color: #0f5eef;
  border: none;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: color 0.16s ease;
}

.btn-view:hover {
  color: #0c4fd0;
}

.empty-cell {
  height: 96px;
  text-align: center;
  color: #7586a6;
}

.table-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 16px 24px 24px;
  color: #405985;
  font-size: 13px;
}

/* 侧边栏 */
.sidebar {
  min-width: 0;
}

.sidebar-card {
  padding: 24px 18px;
  position: sticky;
  top: 24px;
}

.sidebar-title {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 800;
  color: #07183d;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid #d9e5f7;
  border-radius: 8px;
  overflow: hidden;
}

.reminder-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 22px 18px;
  border-bottom: 1px solid #d9e5f7;
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
  background: #0f5eef;
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
  color: #172b55;
  line-height: 1.8;
  font-weight: 700;
}

.btn-outline {
  width: 100%;
  height: 44px;
  margin-top: 26px;
  background: #fff;
  border: 1px solid #0f5eef;
  border-radius: 6px;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-outline:hover {
  background: #f4f8ff;
}

/* 抽屉 */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(7, 24, 61, 0.28);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: min(100%, 484px);
  background: white;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  box-shadow: -16px 0 40px rgba(27, 55, 96, 0.14);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #d9e5f7;
}

.drawer-title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #07183d;
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
  color: #7586a6;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-close:hover {
  background: #f3f4f6;
  color: #172b55;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 22px 24px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-label {
  font-size: 13px;
  font-weight: 800;
  color: #172b55;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid #d6e2f3;
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
  color: #172b55;
  cursor: pointer;
}

.drawer-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #d9e5f7;
}

.drawer-footer .btn-secondary,
.drawer-footer .btn-primary {
  flex: 1;
}

@media (max-width: 1300px) {
  .header-content,
  .stats-container,
  .main-section {
    width: min(100% - 32px, 1500px);
  }

  .stats-container {
    gap: 14px;
  }

  .stat-card {
    gap: 14px;
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

  .drawer {
    width: 100%;
  }
}
</style>
