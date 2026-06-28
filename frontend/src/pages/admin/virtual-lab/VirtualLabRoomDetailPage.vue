<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

const roomId = route.params.roomId as string

// 顶部信息
const roomInfo = {
  name: '智能制造课程改革虚拟教研室',
  direction: '智能制造专业课程改革',
  affiliation: '智能制造学院 | 智能制造专业群',
  leader: '周明',
  members: 28,
  createdAt: '2025-09',
  description: '围绕智能制造专业核心课程项目化改造、课程资源共建和课堂实施改进开展线上教研。',
}

// 统计数据
const stats = {
  members: 28,
  inProgressActivities: 2,
  recordsCount: 6,
  recentActivityTime: '06-18',
}

// 成员数据
interface Member {
  id: string
  name: string
  role: string
  activitiesParticipated: number
  recordsFormed: number
  recentParticipation: string
}

const members: Member[] = [
  {
    id: '1',
    name: '周明',
    role: '负责人',
    activitiesParticipated: 6,
    recordsFormed: 6,
    recentParticipation: '06-18',
  },
  {
    id: '2',
    name: '林老师',
    role: '成员',
    activitiesParticipated: 4,
    recordsFormed: 3,
    recentParticipation: '06-18',
  },
  {
    id: '3',
    name: '王老师',
    role: '成员',
    activitiesParticipated: 3,
    recordsFormed: 2,
    recentParticipation: '06-12',
  },
  {
    id: '4',
    name: '陈老师',
    role: '成员',
    activitiesParticipated: 2,
    recordsFormed: 1,
    recentParticipation: '06-05',
  },
]

// 近期教研活动数据
interface Activity {
  id: string
  name: string
  time: string
  meetingMethod: string
  participation: string
  recordStatus: string
  recentUpdate: string
}

const activities: Activity[] = [
  {
    id: 'smart-line-seminar',
    name: '智能产线课程项目化改造研讨',
    time: '06-18 14:00',
    meetingMethod: '腾讯会议',
    participation: '18人',
    recordStatus: '已形成记录',
    recentUpdate: '06-18 16:20',
  },
  {
    id: 'task-discussion',
    name: '课程任务书优化讨论',
    time: '06-25 15:00',
    meetingMethod: '腾讯会议',
    participation: '12人',
    recordStatus: '未形成记录',
    recentUpdate: '06-20 创建',
  },
  {
    id: 'resource-review',
    name: '课程资源共建阶段复盘',
    time: '06-10 10:00',
    meetingMethod: '腾讯会议',
    participation: '16人',
    recordStatus: '记录异常',
    recentUpdate: '参会记录未同步',
  },
]

// 已形成记录数据
interface Record {
  id: string
  title: string
  sourceActivity: string
  formedTime: string
  content: string
  dimension: string
}

const records: Record[] = [
  {
    id: 'smart-line-record',
    title: '智能产线课程项目化改造研讨记录',
    sourceActivity: '智能产线课程项目化改造研讨',
    formedTime: '2026-06-18',
    content: '会议纪要、任务分工、阶段成果摘要',
    dimension: '成长档案 / 教研科研',
  },
  {
    id: 'standard-revision-record',
    title: '课程标准修订交流记录',
    sourceActivity: '课程标准修订交流',
    formedTime: '2026-05-22',
    content: '会议纪要、修订建议摘要',
    dimension: '成长档案 / 教研科研',
  },
]

function editInfo() {
  console.log('编辑信息')
}

function inviteTeacher() {
  console.log('邀请教师')
}

function createActivity() {
  console.log('新建教研活动')
}

function viewTeacher(id: string) {
  console.log('查看教师', id)
}

function removeMember(id: string) {
  console.log('移出成员', id)
}

function viewActivity(id: string) {
  router.push(`/admin/virtual-lab/activities/${id}`)
}

function viewRecord(id: string) {
  router.push(`/admin/virtual-lab/records/${id}`)
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-room-detail-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>虚拟教研室</span>
            <i class="separator">/</i>
            <span class="current">智能制造课程改革虚拟教研室</span>
          </div>
          <h1 class="page-title">{{ roomInfo.name }}</h1>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="editInfo">编辑信息</button>
          <button class="btn-secondary" @click="inviteTeacher">邀请教师</button>
          <button class="btn-primary" @click="createActivity">新建教研活动</button>
        </div>
      </section>

      <!-- 统计卡区域 -->
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.members }} 人</div>
            <div class="stat-label">成员数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.inProgressActivities }} 个</div>
            <div class="stat-label">进行中活动</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.recordsCount }} 条</div>
            <div class="stat-label">已形成记录</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.recentActivityTime }}</div>
            <div class="stat-label">最近活动时间</div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <!-- 教研室信息 -->
        <div class="content-card info-card">
          <h2 class="card-title">教研室信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">方向：</span>
              <span class="info-value">{{ roomInfo.direction }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">归属：</span>
              <span class="info-value">{{ roomInfo.affiliation }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">负责人：</span>
              <span class="info-value">{{ roomInfo.leader }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">成员：</span>
              <span class="info-value">{{ roomInfo.members }}人</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间：</span>
              <span class="info-value">{{ roomInfo.createdAt }}</span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">说明：</span>
              <span class="info-value">{{ roomInfo.description }}</span>
            </div>
          </div>
        </div>

        <!-- 主体两栏 -->
        <div class="two-column-layout">
          <!-- 左侧：成员 -->
          <div class="content-card members-card">
            <h2 class="card-title">成员</h2>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>教师</th>
                    <th>教研室角色</th>
                    <th>参与活动</th>
                    <th>已形成记录</th>
                    <th>最近参与</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in members" :key="member.id">
                    <td>{{ member.name }}</td>
                    <td>{{ member.role }}</td>
                    <td>{{ member.activitiesParticipated }}</td>
                    <td>{{ member.recordsFormed }}</td>
                    <td>{{ member.recentParticipation }}</td>
                    <td>
                      <button
                        class="btn-view"
                        @click="viewTeacher(member.id)"
                      >
                        查看教师
                      </button>
                      <button
                        v-if="member.role === '成员'"
                        class="btn-remove"
                        @click="removeMember(member.id)"
                      >
                        移出
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 右侧：近期教研活动 -->
          <div class="content-card activities-card">
            <h2 class="card-title">近期教研活动</h2>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>活动名称</th>
                    <th>时间</th>
                    <th>会议方式</th>
                    <th>参与情况</th>
                    <th>记录形成</th>
                    <th>最近更新</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="activity in activities" :key="activity.id">
                    <td>{{ activity.name }}</td>
                    <td>{{ activity.time }}</td>
                    <td>{{ activity.meetingMethod }}</td>
                    <td>{{ activity.participation }}</td>
                    <td>
                      <span
                        class="status-badge"
                        :class="activity.recordStatus === '已形成记录' ? 'success' : activity.recordStatus === '记录异常' ? 'error' : 'pending'"
                      >
                        {{ activity.recordStatus }}
                      </span>
                    </td>
                    <td>{{ activity.recentUpdate }}</td>
                    <td>
                      <button
                        class="btn-view"
                        @click="viewActivity(activity.id)"
                      >
                        查看活动
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 已形成记录区域 -->
        <div class="content-card records-card">
          <h2 class="card-title">已形成记录</h2>
          <div class="records-list">
            <div
              v-for="record in records"
              :key="record.id"
              class="record-item"
            >
              <div class="record-info">
                <h3 class="record-title">{{ record.title }}</h3>
                <div class="record-meta">
                  <span class="meta-item">来源活动：{{ record.sourceActivity }}</span>
                  <span class="meta-item">形成时间：{{ record.formedTime }}</span>
                  <span class="meta-item">记录内容：{{ record.content }}</span>
                  <span class="meta-item">关联维度：{{ record.dimension }}</span>
                </div>
              </div>
              <div class="record-action">
                <button class="btn-view" @click="viewRecord(record.id)">
                  查看记录
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
.virtual-lab-room-detail-page {
  min-height: 100vh;
  background: var(--color-page-bg);
}

.page-header {
  padding: 32px 0;
  background: white;
  border-bottom: 1px solid var(--color-card-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px;
  flex: 1;
}

.header-actions {
  padding: 0 24px;
  display: flex;
  gap: 12px;
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

.btn-secondary {
  padding: 10px 20px;
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: white;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.card-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  font-size: 14px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  min-width: 100px;
}

.info-value {
  color: var(--color-text-primary);
  flex: 1;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.data-table td {
  padding: 12px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.success {
  background: #d1fae5;
  color: #059669;
}

.status-badge.pending {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.error {
  background: #fee2e2;
  color: #dc2626;
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

.btn-remove {
  padding: 6px 12px;
  background: white;
  color: #dc2626;
  border: 1px solid #dc2626;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
  margin-left: 8px;
}

.btn-remove:hover {
  background: #dc2626;
  color: white;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-item {
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.record-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.record-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-item {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.record-action {
  flex-shrink: 0;
  margin-left: 20px;
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .two-column-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .record-item {
    flex-direction: column;
    align-items: stretch;
  }

  .record-action {
    margin-left: 0;
    margin-top: 12px;
  }
}
</style>
