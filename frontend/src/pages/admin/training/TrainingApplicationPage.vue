<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// 统计数据
const stats = {
  pending: 18,
  approved: 42,
  rejected: 5,
  closing: 3,
}

// 申请数据
interface TrainingApplication {
  id: string
  applicant: string
  department: string
  major: string
  trainingName: string
  reason: string
  applyTime: string
  quotaInfo: string
  status: string
}

const applications: TrainingApplication[] = [
  {
    id: '1',
    applicant: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    trainingName: '2026 年暑期数字化教学能力提升培训',
    reason: '希望提升课堂数据应用能力',
    applyTime: '2026-06-21 10:20',
    quotaInfo: '18 / 30',
    status: '待处理',
  },
  {
    id: '2',
    applicant: '陈老师',
    department: '电子信息学院',
    major: '软件技术',
    trainingName: 'AI 赋能课程建设专题培训',
    reason: '课程建设需要使用 AI 工具',
    applyTime: '2026-06-22 09:15',
    quotaInfo: '46 / 52',
    status: '待处理',
  },
  {
    id: '3',
    applicant: '王老师',
    department: '智能制造学院',
    major: '工业机器人技术',
    trainingName: '双师型教师实践能力提升培训',
    reason: '与本学期实训课程相关',
    applyTime: '2026-06-20 16:40',
    quotaInfo: '24 / 25',
    status: '已同意',
  },
  {
    id: '4',
    applicant: '赵老师',
    department: '现代服务学院',
    major: '电子商务',
    trainingName: '课程思政教学设计研修',
    reason: '申请参加本次专题研修',
    applyTime: '2026-06-18 14:30',
    quotaInfo: '30 / 30',
    status: '未同意',
  },
]

function handleApplication(id: string) {
  console.log('处理申请', id)
}

function viewDetail(id: string) {
  console.log('查看详情', id)
}
</script>

<template>
  <AdminLayout active-key="training-applications">
    <div class="training-application-page">
      <section class="page-header">
        <div class="header-content">
          <h1 class="page-title">申请处理</h1>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.pending }}</div>
            <div class="stat-label">待处理申请</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.approved }}</div>
            <div class="stat-label">已同意</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.rejected }}</div>
            <div class="stat-label">未同意</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.closing }}</div>
            <div class="stat-label">即将截止</div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="application-workspace">
          <div class="main-content">
            <div class="content-card">
              <!-- 数据表格 -->
              <div class="table-container">
                <table class="application-table">
                  <thead>
                    <tr>
                      <th>申请人</th>
                      <th>院系 / 专业</th>
                      <th>申请培训</th>
                      <th>申请理由</th>
                      <th>申请时间</th>
                      <th>计划名额</th>
                      <th>申请状态</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="app in applications" :key="app.id">
                      <td>{{ app.applicant }}</td>
                      <td>{{ app.department }} / {{ app.major }}</td>
                      <td>{{ app.trainingName }}</td>
                      <td>{{ app.reason }}</td>
                      <td>{{ app.applyTime }}</td>
                      <td>{{ app.quotaInfo }}</td>
                      <td>
                        <span class="status-badge" :class="app.status">
                          {{ app.status }}
                        </span>
                      </td>
                      <td>
                        <button
                          v-if="app.status === '待处理'"
                          class="btn-handle"
                          @click="handleApplication(app.id)"
                        >
                          处理
                        </button>
                        <button
                          v-else
                          class="btn-view"
                          @click="viewDetail(app.id)"
                        >
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：处理提醒 -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">处理提醒</h3>
              <div class="reminders-list">
                <div class="reminder-item">
                  <span class="reminder-dot"></span>
                  <div class="reminder-content">
                    <div class="reminder-title">待处理申请</div>
                    <div class="reminder-desc">18 个申请等待处理</div>
                  </div>
                </div>
                <div class="reminder-item">
                  <span class="reminder-dot warning"></span>
                  <div class="reminder-content">
                    <div class="reminder-title">名额接近上限</div>
                    <div class="reminder-desc">2 个培训计划名额即将用完</div>
                  </div>
                </div>
                <div class="reminder-item">
                  <span class="reminder-dot urgent"></span>
                  <div class="reminder-content">
                    <div class="reminder-title">申请即将截止</div>
                    <div class="reminder-desc">3 个培训计划申请即将结束</div>
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
.training-application-page {
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

.application-workspace {
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

.status-badge.待处理 {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.已同意 {
  background: #d1fae5;
  color: #059669;
}

.status-badge.未同意 {
  background: #fee2e2;
  color: #dc2626;
}

.btn-handle {
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-handle:hover {
  background: #28a38a;
}

.btn-view {
  padding: 6px 12px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
}

.btn-view:hover {
  background: #4f46e5;
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

.reminder-dot.urgent {
  background: #ef4444;
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

  .application-workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>