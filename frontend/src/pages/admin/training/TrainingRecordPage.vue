<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()

// 统计数据
const stats = {
  totalRecords: 286,
  totalTeachers: 192,
  totalHours: 5840,
  materialIncomplete: 30,
}

// 培训记录数据
interface TrainingRecord {
  id: string
  teacher: string
  department: string
  major: string
  planName: string
  trainingDate: string
  hours: string
  materialStatus: string
}

const records: TrainingRecord[] = [
  {
    id: 'digital-training-lin',
    teacher: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    planName: '职业教育数字化教学能力提升培训',
    trainingDate: '2026-05-10 至 2026-05-14',
    hours: '32 学时',
    materialStatus: '证书待补',
  },
  {
    id: 'ai-course-chen',
    teacher: '陈老师',
    department: '电子信息学院',
    major: '软件技术',
    planName: 'AI 赋能课程建设专题培训',
    trainingDate: '2026-05-20 至 2026-05-21',
    hours: '16 学时',
    materialStatus: '待总结',
  },
  {
    id: 'practice-training-wang',
    teacher: '王老师',
    department: '智能制造学院',
    major: '工业机器人技术',
    planName: '双师型教师实践能力提升培训',
    trainingDate: '2026-06-01 至 2026-06-07',
    hours: '40 学时',
    materialStatus: '学习中',
  },
  {
    id: 'ideology-course-zhao',
    teacher: '赵老师',
    department: '现代服务学院',
    major: '电子商务',
    planName: '课程思政教学设计研修',
    trainingDate: '2026-04-12 至 2026-04-15',
    hours: '24 学时',
    materialStatus: '记录完整',
  },
]

// 筛选条件
const selectedOrganization = ref('全校')
const selectedYear = ref('2026 年度')
const selectedDirection = ref('全部')
const selectedMaterialStatus = ref('全部')
const searchQuery = ref('')

function resetFilters() {
  selectedOrganization.value = '全校'
  selectedYear.value = '2026 年度'
  selectedDirection.value = '全部'
  selectedMaterialStatus.value = '全部'
  searchQuery.value = ''
}

function viewDetail(id: string) {
  router.push(`/admin/training/records/${id}`)
}
</script>

<template>
  <AdminLayout active-key="training-records">
    <div class="training-record-page">
      <section class="page-header">
        <div class="header-content">
          <h1 class="page-title">记录总览</h1>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.totalRecords }}</div>
            <div class="stat-label">培训记录数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.totalTeachers }}</div>
            <div class="stat-label">覆盖教师</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.totalHours.toLocaleString() }}</div>
            <div class="stat-label">累计学时</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.materialIncomplete }}</div>
            <div class="stat-label">材料待完善</div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="record-workspace">
          <div class="main-content">
            <div class="content-card">
              <!-- 筛选区 -->
              <div class="filter-section">
                <div class="filter-row">
                  <div class="filter-item">
                    <label class="filter-label">组织范围</label>
                    <select v-model="selectedOrganization" class="filter-select">
                      <option>全校</option>
                      <option>智能制造学院</option>
                      <option>电子信息学院</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训年度</label>
                    <select v-model="selectedYear" class="filter-select">
                      <option>2026 年度</option>
                      <option>2025 年度</option>
                      <option>2024 年度</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">培训方向</label>
                    <select v-model="selectedDirection" class="filter-select">
                      <option>全部</option>
                      <option>数字化教学</option>
                      <option>实践教学</option>
                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">材料情况</label>
                    <select v-model="selectedMaterialStatus" class="filter-select">
                      <option>全部</option>
                      <option>记录完整</option>
                      <option>待总结</option>
                      <option>证书待补</option>
                    </select>
                  </div>
                  <button class="btn-reset" @click="resetFilters">重置</button>
                </div>
                <div class="search-row">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索教师、培训名称"
                    class="search-input"
                  />
                </div>
              </div>

              <!-- 数据表格 -->
              <div class="table-container">
                <table class="record-table">
                  <thead>
                    <tr>
                      <th>教师</th>
                      <th>院系 / 专业</th>
                      <th>所属计划</th>
                      <th>培训时间</th>
                      <th>学时</th>
                      <th>材料情况</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="record in records" :key="record.id">
                      <td>{{ record.teacher }}</td>
                      <td>{{ record.department }} / {{ record.major }}</td>
                      <td>{{ record.planName }}</td>
                      <td>{{ record.trainingDate }}</td>
                      <td>{{ record.hours }}</td>
                      <td>
                        <span class="status-badge" :class="record.materialStatus">
                          {{ record.materialStatus }}
                        </span>
                      </td>
                      <td>
                        <button class="btn-view" @click="viewDetail(record.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：材料完善提醒 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">材料完善提醒</h3>
              <div class="reminders-list">
                <div class="reminder-item">
                  <span class="reminder-dot"></span>
                  <div class="reminder-content">
                    <div class="reminder-title">待总结</div>
                    <div class="reminder-desc">12 位教师需要提交培训总结</div>
                  </div>
                </div>
                <div class="reminder-item">
                  <span class="reminder-dot warning"></span>
                  <div class="reminder-content">
                    <div class="reminder-title">证书待补</div>
                    <div class="reminder-desc">18 位教师需要补充培训证书</div>
                  </div>
                </div>
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

.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.record-workspace {
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

.table-container {
  overflow-x: auto;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
}

.record-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.record-table td {
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.record-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.记录完整 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.待总结 {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.证书待补 {
  background: #fee2e2;
  color: #dc2626;
}

.status-badge.学习中 {
  background: #dbeafe;
  color: #2563eb;
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

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
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
  gap: 16px;
}

.reminder-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.reminder-dot {
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}

.reminder-dot.warning {
  background: #f59e0b;
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.reminder-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .record-workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>