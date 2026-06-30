<script setup lang="ts">
import { computed, ref } from 'vue'
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
const reminderMessage = ref('')

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
  return records.filter((record) => {
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
	                      <option>AI 赋能课程建设</option>
	                      <option>课程思政</option>
	                    </select>
                  </div>
                  <div class="filter-item">
                    <label class="filter-label">材料情况</label>
                    <select v-model="selectedMaterialStatus" class="filter-select">
                      <option>全部</option>
                      <option>记录完整</option>
	                      <option>待总结</option>
	                      <option>证书待补</option>
	                      <option>学习中</option>
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
                <p v-if="reminderMessage" class="filter-message">{{ reminderMessage }}</p>
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
                    <tr v-for="record in filteredRecords" :key="record.id">
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
                    <tr v-if="filteredRecords.length === 0">
                      <td colspan="7" class="empty-cell">暂无符合条件的培训记录</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table-footer">
                <span>共 {{ filteredRecords.length }} 条</span>
                <button type="button">1</button>
                <span>10 条/页</span>
              </div>
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
	              <button class="btn-primary full-width" @click="viewIncompleteMaterials">
	                查看材料待完善记录
	              </button>
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
  background: #f6f9ff;
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
  gap: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #172b55;
  font-weight: 800;
}

.breadcrumb i {
  color: #9aa9c0;
  font-style: normal;
}

.breadcrumb .current {
  color: #0f5eef;
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
  inset: 18px 21px;
  border-radius: 4px;
  background: #0f5eef;
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
  color: #0f5eef;
  margin-bottom: 12px;
  white-space: nowrap;
}

.stat-value span {
  font-size: 16px;
  color: #172b55;
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
  color: #172b55;
  font-weight: 900;
  margin-bottom: 8px;
}

.stat-desc {
  font-size: 13px;
  color: #405985;
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
  gap: 20px;
}

.main-content {
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
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

.filter-section {
  padding: 16px 24px 18px;
}

.filter-row {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: grid;
  grid-template-columns: auto 136px;
  gap: 10px;
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
  max-width: 380px;
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
  height: 40px;
  padding: 0 8px;
  background: transparent;
  border: 0;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-reset:hover {
  color: #0c4fd0;
}

.filter-message {
  margin: 10px 0 0;
  color: #0f5eef;
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
  border: 1px solid #d9e5f7;
  border-radius: 8px;
  overflow: hidden;
  table-layout: fixed;
}

.record-table th {
  height: 48px;
  padding: 0 14px;
  text-align: center;
  font-size: 13px;
  font-weight: 900;
  color: #31466f;
  border-bottom: 1px solid #d9e5f7;
  border-right: 1px solid #e5edf8;
  background: #f4f7fc;
}

.record-table td {
  height: 64px;
  padding: 0 14px;
  font-size: 13px;
  line-height: 1.65;
  color: #172b55;
  text-align: center;
  border-bottom: 1px solid #e5edf8;
  border-right: 1px solid #e5edf8;
  vertical-align: middle;
}

.record-table th:last-child,
.record-table td:last-child {
  border-right: 0;
}

.record-table tr:last-child td {
  border-bottom: none;
}

.record-table th:nth-child(1) { width: 10%; }
.record-table th:nth-child(2) { width: 18%; }
.record-table th:nth-child(3) { width: 24%; }
.record-table th:nth-child(4) { width: 20%; }
.record-table th:nth-child(5) { width: 10%; }
.record-table th:nth-child(6) { width: 12%; }
.record-table th:nth-child(7) { width: 8%; }

.record-table td:first-child {
  font-weight: 800;
  color: #172b55;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  height: 28px;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 900;
}

.status-badge.记录完整 {
  background: #e8f8ef;
  color: #0ca65f;
}

.status-badge.待总结 {
  background: #fff1e7;
  color: #f97316;
}

.status-badge.证书待补 {
  background: #fff1e7;
  color: #f97316;
}

.status-badge.学习中 {
  background: #eaf2ff;
  color: #0f5eef;
}

.btn-view {
  padding: 0;
  background: transparent;
  color: #0f5eef;
  border: none;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
  transition: color 0.16s ease;
}

.btn-view:hover {
  color: #0c4fd0;
}

.empty-cell {
  height: 96px;
  color: #7586a6;
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  padding: 18px 24px 24px;
  color: #405985;
  font-size: 14px;
}

.table-footer button {
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 6px;
  background: #0f5eef;
  color: #fff;
  font-weight: 900;
}

.sidebar {
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  padding: 24px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
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
  gap: 18px;
  align-items: center;
  min-height: 132px;
  padding: 22px 18px;
  background: #fffaf4;
  border: 1px solid #f4dfc5;
  border-radius: 8px;
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
  border-radius: 6px;
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-size: 18px;
  font-weight: 900;
  color: #07183d;
  margin-bottom: 10px;
}

.reminder-desc {
  font-size: 14px;
  line-height: 1.75;
  color: #405985;
}

.btn-primary {
  height: 46px;
  padding: 0 18px;
  background: #0f5eef;
  color: white;
  border: 1px solid #0f5eef;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-primary:hover {
  background: #0c4fd0;
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
