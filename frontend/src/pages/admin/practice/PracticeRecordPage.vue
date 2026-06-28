<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 筛选条件
const selectedDepartment = ref('全部')
const selectedStatus = ref('全部')
const selectedDays = ref('全部')
const searchQuery = ref('')

// 统计数据
const stats = {
  inProgress: 12,
  summaryPending: 6,
  evaluationPending: 5,
  archivePending: 9,
  archived: 48,
}

// 实践记录数据
interface PracticeRecord {
  id: string
  teacher: string
  company: string
  position: string
  practicePeriod: string
  materialStatus: string
  currentStatus: string
  countedDays: string
  recentAction: string
}

const records: PracticeRecord[] = [
  {
    id: '1',
    teacher: '林老师',
    company: '山西智能装备有限公司',
    position: '工艺改进岗',
    practicePeriod: '2026-07-01 至 2026-07-15',
    materialStatus: '日志完整、总结待提交、评价待上传',
    currentStatus: '材料待完善',
    countedDays: '暂未计入',
    recentAction: '07-15 完成实践',
  },
  {
    id: '2',
    teacher: '王老师',
    company: '青岛工业机器人有限公司',
    position: '现场调试岗',
    practicePeriod: '2026-06-10 至 2026-06-22',
    materialStatus: '日志完整、总结已提交、评价已上传',
    currentStatus: '待归档确认',
    countedDays: '待确认计入',
    recentAction: '06-24 提交总结',
  },
  {
    id: '3',
    teacher: '陈老师',
    company: '山西智能装备集团',
    position: '岗位实践',
    practicePeriod: '2026-05-01 至 2026-05-30',
    materialStatus: '材料完整',
    currentStatus: '已归档',
    countedDays: '已计入',
    recentAction: '06-02 已归档',
  },
  {
    id: '4',
    teacher: '赵老师',
    company: '汽车零部件技术有限公司',
    position: '项目开发实践',
    practicePeriod: '2026-07-08 至 2026-07-28',
    materialStatus: '日志待完善、总结未提交、评价未上传',
    currentStatus: '实践中',
    countedDays: '暂未计入',
    recentAction: '07-18 提交日报',
  },
  {
    id: '5',
    teacher: '孙老师',
    company: '河南智能装备有限公司',
    position: '产线优化实践',
    practicePeriod: '2026-04-01 至 2026-04-18',
    materialStatus: '日志缺少、总结未提交、评价待上传',
    currentStatus: '待企业评价',
    countedDays: '暂未计入',
    recentAction: '06-19 企业反馈缺失',
  },
]

function resetFilters() {
  selectedDepartment.value = '全部'
  selectedStatus.value = '全部'
  selectedDays.value = '全部'
  searchQuery.value = ''
}

function viewDetail(id: string) {
  console.log('查看详情', id)
}

function remindMaterial(id: string) {
  console.log('提醒补材料', id)
}

function confirmArchive(id: string) {
  console.log('确认归档', id)
}

function viewArchive(id: string) {
  console.log('查看档案', id)
}

function exportRecords() {
  console.log('导出记录')
}

function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    '材料待完善': 'incomplete',
    '待归档确认': 'pending-archive',
    '已归档': 'archived',
    '实践中': 'in-progress',
    '待企业评价': 'pending-evaluation',
  }
  return statusMap[status] || ''
}
</script>

<template>
  <AdminLayout active-key="practice-records">
    <div class="practice-record-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>企业实践</span>
            <i class="separator">/</i>
            <span class="current">记录总览</span>
          </div>
          <h1 class="page-title">实践记录总览</h1>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.inProgress }}</div>
            <div class="stat-label">实践中</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.summaryPending }}</div>
            <div class="stat-label">待提交总结</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.evaluationPending }}</div>
            <div class="stat-label">待补企业评价</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.archivePending }}</div>
            <div class="stat-label">待归档确认</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.archived }}</div>
            <div class="stat-label">已归档</div>
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
                <label class="filter-label">院系范围</label>
                <select v-model="selectedDepartment" class="filter-select">
                  <option>全部</option>
                  <option>智能制造学院</option>
                  <option>电子信息学院</option>
                  <option>汽车工程学院</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">实践状态</label>
                <select v-model="selectedStatus" class="filter-select">
                  <option>全部</option>
                  <option>实践中</option>
                  <option>材料待完善</option>
                  <option>待归档确认</option>
                  <option>已归档</option>
                </select>
              </div>
              <div class="filter-item">
                <label class="filter-label">计入 30 天</label>
                <select v-model="selectedDays" class="filter-select">
                  <option>全部</option>
                  <option>已计入</option>
                  <option>待确认计入</option>
                  <option>暂未计入</option>
                </select>
              </div>
              <button class="btn-reset" @click="resetFilters">重置</button>
              <button class="btn-primary" @click="exportRecords">导出记录</button>
            </div>
            <div class="search-row">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索教师、实践单位"
                class="search-input"
              />
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-section">
            <h2 class="table-title">记录列表</h2>
            <div class="table-container">
              <table class="record-table">
                <thead>
                  <tr>
                    <th>教师</th>
                    <th>实践单位 / 岗位</th>
                    <th>实践周期</th>
                    <th>材料状态</th>
                    <th>当前状态</th>
                    <th>计入 30 天</th>
                    <th>最近动作</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in records" :key="record.id">
                    <td>{{ record.teacher }}</td>
                    <td>{{ record.company }} / {{ record.position }}</td>
                    <td>{{ record.practicePeriod }}</td>
                    <td>{{ record.materialStatus }}</td>
                    <td>
                      <span
                        class="status-badge"
                        :class="getStatusClass(record.currentStatus)"
                      >
                        {{ record.currentStatus }}
                      </span>
                    </td>
                    <td>{{ record.countedDays }}</td>
                    <td>{{ record.recentAction }}</td>
                    <td>
                      <button class="btn-view" @click="viewDetail(record.id)">
                        查看详情
                      </button>
                      <button
                        v-if="record.currentStatus === '材料待完善'"
                        class="btn-remind"
                        @click="remindMaterial(record.id)"
                      >
                        提醒补材料
                      </button>
                      <button
                        v-if="record.currentStatus === '待归档确认'"
                        class="btn-confirm"
                        @click="confirmArchive(record.id)"
                      >
                        确认归档
                      </button>
                      <button
                        v-if="record.currentStatus === '已归档'"
                        class="btn-archive"
                        @click="viewArchive(record.id)"
                      >
                        查看档案
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 状态说明 -->
            <div class="status-note">
              <p class="note-title">状态说明：</p>
              <ul class="note-list">
                <li>已归档记录进入成长档案 / 企业实践维度。</li>
                <li>材料待完善记录不直接入档。</li>
                <li>待归档确认需管理端确认后入档。</li>
              </ul>
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
  grid-template-columns: repeat(5, 1fr);
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
}

.btn-primary:hover {
  background: #28a38a;
}

.table-section {
  padding: 24px;
}

.table-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
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

.status-badge.in-progress {
  background: #d1fae5;
  color: #059669;
}

.status-badge.incomplete {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.pending-evaluation {
  background: #fee2e2;
  color: #dc2626;
}

.status-badge.pending-archive {
  background: #dbeafe;
  color: #2563eb;
}

.status-badge.archived {
  background: #f3f4f6;
  color: #6b7280;
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

.btn-remind {
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-remind:hover {
  background: #28a38a;
}

.btn-confirm {
  padding: 6px 12px;
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-confirm:hover {
  background: var(--color-primary);
  color: white;
}

.btn-archive {
  padding: 6px 12px;
  background: white;
  color: #059669;
  border: 1px solid #059669;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-archive:hover {
  background: #059669;
  color: white;
}

.status-note {
  margin-top: 24px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
}

.note-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.note-list {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.note-list li {
  margin-bottom: 4px;
}

.note-list li:last-child {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
