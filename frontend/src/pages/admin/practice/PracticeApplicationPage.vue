<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 筛选条件
const selectedYear = ref('2026 年度')
const selectedDepartment = ref('全部')
const selectedStatus = ref('全部')
const selectedTime = ref('全部')
const searchQuery = ref('')

// 统计数据
const stats = {
  pending: 8,
  approved: 36,
  returned: 5,
  inProgress: 12,
}

// 实践申请数据
interface PracticeApplication {
  id: string
  teacher: string
  annualStatus: string
  company: string
  position: string
  practicePeriod: string
  estimatedDays: string
  status: string
  applyTime: string
}

const applications: PracticeApplication[] = [
  {
    id: '1',
    teacher: '林老师',
    annualStatus: '本年度已计入 18 天，还差 12 天',
    company: '山西智能装备有限公司',
    position: '工艺改进岗',
    practicePeriod: '2026-07-01 至 2026-07-15，预计 15 天',
    estimatedDays: '15',
    status: '待审核',
    applyTime: '2026-06-20 10:35',
  },
  {
    id: '2',
    teacher: '赵老师',
    annualStatus: '本年度已计入 10 天，还差 20 天',
    company: '汽车零部件技术有限公司',
    position: '生产调试岗',
    practicePeriod: '2026-07-05 至 2026-07-25，预计 21 天',
    estimatedDays: '21',
    status: '待审核',
    applyTime: '2026-06-18 16:20',
  },
  {
    id: '3',
    teacher: '王老师',
    annualStatus: '本年度已计入 20 天，还差 10 天',
    company: '青岛工业机器人有限公司',
    position: '现场调试岗',
    practicePeriod: '2026-06-10 至 2026-06-22，预计 12 天',
    estimatedDays: '12',
    status: '已同意',
    applyTime: '2026-06-08 09:15',
  },
  {
    id: '4',
    teacher: '孙老师',
    annualStatus: '本年度已计入 0 天，还差 30 天',
    company: '北京智慧装备集团',
    position: '技术服务岗',
    practicePeriod: '2026-07-10 至 2026-07-30，预计 21 天',
    estimatedDays: '21',
    status: '退回修改',
    applyTime: '2026-06-11 11:05',
  },
]

// 分页
const currentPage = ref(1)
const pageSize = 10
const total = 8

function resetFilters() {
  selectedYear.value = '2026 年度'
  selectedDepartment.value = '全部'
  selectedStatus.value = '全部'
  selectedTime.value = '全部'
  searchQuery.value = ''
}

function viewApplication(id: string) {
  console.log('查看申请', id)
}

function approveApplication(id: string) {
  console.log('同意申请', id)
}

function returnApplication(id: string) {
  console.log('退回修改', id)
}
</script>

<template>
  <AdminLayout active-key="practice-applications">
    <div class="practice-application-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>企业实践</span>
            <i class="separator">/</i>
            <span class="current">申请处理</span>
          </div>
          <h1 class="page-title">实践申请处理</h1>
          <p class="page-description">
            处理教师提交的企业实践申请，判断是否纳入本次实践计划。
          </p>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.pending }}</div>
            <div class="stat-label">待审核申请</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.approved }}</div>
            <div class="stat-label">已同意申请</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.returned }}</div>
            <div class="stat-label">退回修改</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.inProgress }}</div>
            <div class="stat-label">实践已开始</div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="content-card">
          <!-- 筛选区 -->
          <div class="filter-section">
            <div class="filter-row">
              <div class="filter-item">
                <label class="filter-label">年度</label>
                <select v-model="selectedYear" class="filter-select">
                  <option>2026 年度</option>
                  <option>2025 年度</option>
                  <option>2024 年度</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">院系</label>
                <select v-model="selectedDepartment" class="filter-select">
                  <option>全部</option>
                  <option>智能制造学院</option>
                  <option>电子信息学院</option>
                  <option>汽车工程学院</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">申请状态</label>
                <select v-model="selectedStatus" class="filter-select">
                  <option>全部</option>
                  <option>待审核</option>
                  <option>已同意</option>
                  <option>退回修改</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">实践时间</label>
                <select v-model="selectedTime" class="filter-select">
                  <option>全部</option>
                  <option>2026年7月</option>
                  <option>2026年6月</option>
                  <option>2026年5月</option>
                </select>
              </div>
              <button class="btn-reset" @click="resetFilters">重置</button>
            </div>
            <div class="search-row">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教师姓名 / 工号 / 实践单位"
                class="search-input"
              />
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-section">
            <div class="table-container">
              <table class="application-table">
                <thead>
                  <tr>
                    <th>申请教师</th>
                    <th>年度实践情况</th>
                    <th>实践单位 / 岗位</th>
                    <th>实践时间 / 预计天数</th>
                    <th>申请状态</th>
                    <th>申请时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="app in applications" :key="app.id">
                    <td>{{ app.teacher }}</td>
                    <td>{{ app.annualStatus }}</td>
                    <td>{{ app.company }} / {{ app.position }}</td>
                    <td>{{ app.practicePeriod }}</td>
                    <td>
                      <span class="status-badge" :class="app.status">
                        {{ app.status }}
                      </span>
                    </td>
                    <td>{{ app.applyTime }}</td>
                    <td>
                      <button
                        v-if="app.status === '待审核'"
                        class="btn-action-group"
                      >
                        <button class="btn-view" @click="viewApplication(app.id)">
                          查看申请
                        </button>
                        <button
                          class="btn-approve"
                          @click="approveApplication(app.id)"
                        >
                          同意
                        </button>
                        <button
                          class="btn-return"
                          @click="returnApplication(app.id)"
                        >
                          退回修改
                        </button>
                      </button>
                      <button
                        v-else
                        class="btn-view"
                        @click="viewApplication(app.id)"
                      >
                        查看申请
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 分页区域 -->
            <div class="pagination-section">
              <div class="pagination-info">
                共 {{ total }} 条
              </div>
              <div class="pagination-controls">
                <span class="page-info">{{ currentPage }} / 1 页</span>
                <span class="page-size">10条/页</span>
              </div>
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

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 600;
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.page-description {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
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

.table-section {
  padding: 24px;
}

.table-container {
  overflow-x: auto;
}

.application-table {
  width: 100%;
  border-collapse: collapse;
}

.application-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.application-table td {
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.application-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.待审核 {
  background: #dbeafe;
  color: #2563eb;
}

.status-badge.已同意 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.退回修改 {
  background: #fee2e2;
  color: #dc2626;
}

.btn-action-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-view {
  padding: 6px 12px;
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-view:hover {
  background: var(--color-primary);
  color: white;
}

.btn-approve {
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-approve:hover {
  background: #28a38a;
}

.btn-return {
  padding: 6px 12px;
  background: white;
  color: #dc2626;
  border: 1px solid #dc2626;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-return:hover {
  background: #dc2626;
  color: white;
}

.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid var(--color-card-border);
}

.pagination-info {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.pagination-controls {
  display: flex;
  gap: 16px;
  align-items: center;
}

.page-info,
.page-size {
  font-size: 13px;
  color: var(--color-text-hint);
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .btn-action-group {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>