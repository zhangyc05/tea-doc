<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

const activityId = route.params.activityId as string

// 活动基础信息
const activityInfo = {
  name: '智能产线课程项目化改造研讨',
  roomName: '智能制造课程改革虚拟教研室',
  theme: '智能产线课程项目化改造',
  time: '2026-06-18 14:00 ~ 16:00',
  meetingMethod: '腾讯会议',
  initiator: '周明',
  participantsCount: 18,
  createdAt: '2026-06-12 10:30',
  description: '围绕产线课程的教学内容重构、项目任务设计和实施路径优化开展研讨。',
  status: '已形成记录',
}

// 状态卡
const statusCard = {
  attendanceRecord: '已同步',
  meetingMinutes: '已形成',
  taskAssignment: '已形成',
  researchRecord: '已形成记录',
  recentSyncTime: '06-18 16:20',
  dataSource: '腾讯会议',
}

// 参与教师数据
interface Participant {
  id: string
  name: string
  role: string
  participationType: string
  timeRange: string
  status: string
}

const participants: Participant[] = [
  {
    id: '1',
    name: '周明',
    role: '负责人',
    participationType: '腾讯会议参会',
    timeRange: '14:00~16:00',
    status: '已关联',
  },
  {
    id: '2',
    name: '林老师',
    role: '成员',
    participationType: '腾讯会议参会',
    timeRange: '14:05~15:58',
    status: '已关联',
  },
  {
    id: '3',
    name: '王老师',
    role: '成员',
    participationType: '任务分工',
    timeRange: '全程参与',
    status: '已关联',
  },
  {
    id: '4',
    name: '李老师',
    role: '成员',
    participationType: '腾讯会议参会',
    timeRange: '14:02~15:50',
    status: '已关联',
  },
]

// 活动资料数据
interface Material {
  id: string
  name: string
  source: string
  type: string
  time: string
}

const materials: Material[] = [
  {
    id: '1',
    name: '会议纪要',
    source: '系统生成',
    type: '会议纪要',
    time: '06-18 16:20',
  },
  {
    id: '2',
    name: '任务分工表',
    source: '活动负责人补充',
    type: '任务分工',
    time: '06-18 16:30',
  },
  {
    id: '3',
    name: '课程项目化改造方案初稿',
    source: '林老师上传',
    type: '阶段成果',
    time: '06-18 17:10',
  },
  {
    id: '4',
    name: '产线课程现状分析材料',
    source: '张老师上传',
    type: '过程材料',
    time: '06-18 17:35',
  },
]

// 已形成记录
const formedRecord = {
  id: 'smart-line-record',
  title: '智能产线课程项目化改造研讨记录',
  tags: '会议纪要类',
  sourceActivity: '智能产线课程项目化改造研讨',
  formedTime: '2026-06-18',
  content: '会议纪要、任务分工、阶段成果摘要、个人参与记录等',
  dimension: '成长档案 / 教研科研',
}

// 活动时间线
interface TimelineItem {
  id: string
  event: string
  operator: string
  time: string
}

const timeline: TimelineItem[] = [
  {
    id: '1',
    event: '活动创建',
    operator: '周明',
    time: '06-12 10:30',
  },
  {
    id: '2',
    event: '会议开始',
    operator: '腾讯会议',
    time: '06-18 14:00',
  },
  {
    id: '3',
    event: '会议结束',
    operator: '腾讯会议',
    time: '06-18 16:00',
  },
  {
    id: '4',
    event: '系统生成会议纪要',
    operator: '系统',
    time: '06-18 16:20',
  },
  {
    id: '5',
    event: '教研记录形成',
    operator: '系统',
    time: '06-18 16:20',
  },
]

function editActivity() {
  console.log('编辑活动')
}

function viewMeetingRecord() {
  console.log('查看会议记录')
}

function viewMaterial(id: string) {
  console.log('查看资料', id)
}

function viewRecord() {
  router.push(`/admin/virtual-lab/records/${formedRecord.id}`)
}

function goBack() {
  router.back()
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-activity-detail-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>虚拟教研室</span>
            <i class="separator">/</i>
            <span>智能制造课程改革虚拟教研室</span>
            <i class="separator">/</i>
            <span>教研活动</span>
            <i class="separator">/</i>
            <span class="current">活动详情</span>
          </div>
          <div class="title-section">
            <h1 class="page-title">{{ activityInfo.name }}</h1>
            <span class="status-badge success">{{ activityInfo.status }}</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="editActivity">编辑活动</button>
          <button class="btn-secondary" @click="viewMeetingRecord">查看会议记录</button>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <!-- 活动基础信息 -->
        <div class="content-card info-card">
          <h2 class="card-title">活动基础信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">所属教研室：</span>
              <span class="info-value">{{ activityInfo.roomName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">活动主题：</span>
              <span class="info-value">{{ activityInfo.theme }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">活动时间：</span>
              <span class="info-value">{{ activityInfo.time }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">会议方式：</span>
              <span class="info-value">{{ activityInfo.meetingMethod }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">发起人：</span>
              <span class="info-value">{{ activityInfo.initiator }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">参与教师：</span>
              <span class="info-value">{{ activityInfo.participantsCount }} 人</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间：</span>
              <span class="info-value">{{ activityInfo.createdAt }}</span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">活动说明：</span>
              <span class="info-value">{{ activityInfo.description }}</span>
            </div>
          </div>
        </div>

        <!-- 状态卡 -->
        <div class="content-card status-card">
          <h2 class="card-title">状态卡</h2>
          <div class="status-grid">
            <div class="status-item">
              <span class="status-label">参会记录</span>
              <span class="status-value success">{{ statusCard.attendanceRecord }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">会议纪要</span>
              <span class="status-value success">{{ statusCard.meetingMinutes }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">任务分工</span>
              <span class="status-value success">{{ statusCard.taskAssignment }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">教研记录</span>
              <span class="status-value success">{{ statusCard.researchRecord }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">最近同步时间</span>
              <span class="status-value">{{ statusCard.recentSyncTime }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">数据来源</span>
              <span class="status-value">{{ statusCard.dataSource }}</span>
            </div>
          </div>
        </div>

        <!-- 主体两栏 -->
        <div class="two-column-layout">
          <!-- 左侧：会议与参与情况 -->
          <div class="content-card participants-card">
            <h2 class="card-title">会议与参与情况</h2>
            <div class="meeting-info">
              <div class="info-row">
                <span class="info-label">会议平台：</span>
                <span class="info-value">{{ activityInfo.meetingMethod }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">会议号：</span>
                <span class="info-value">827 391 602</span>
              </div>
              <div class="info-row">
                <span class="info-label">会议时间：</span>
                <span class="info-value">{{ activityInfo.time }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">会议主题：</span>
                <span class="info-value">{{ activityInfo.name }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">同步状态：</span>
                <span class="status-value success">已同步</span>
              </div>
            </div>

            <h3 class="section-subtitle">参与教师（{{ activityInfo.participantsCount }}人）</h3>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>教师</th>
                    <th>角色</th>
                    <th>参与方式</th>
                    <th>时长</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="participant in participants" :key="participant.id">
                    <td>{{ participant.name }}</td>
                    <td>{{ participant.role }}</td>
                    <td>{{ participant.participationType }}</td>
                    <td>{{ participant.timeRange }}</td>
                    <td>
                      <span class="status-badge success">{{ participant.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 右侧：活动资料 -->
          <div class="content-card materials-card">
            <h2 class="card-title">活动资料</h2>
            <div class="materials-list">
              <div
                v-for="material in materials"
                :key="material.id"
                class="material-item"
              >
                <div class="material-info">
                  <h4 class="material-name">{{ material.name }}</h4>
                  <div class="material-meta">
                    <span class="meta-item">{{ material.source }}</span>
                    <span class="meta-item">{{ material.type }}</span>
                    <span class="meta-item">{{ material.time }}</span>
                  </div>
                </div>
                <div class="material-action">
                  <button class="btn-view" @click="viewMaterial(material.id)">
                    查看
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 下方两栏 -->
        <div class="two-column-layout">
          <!-- 左侧：已形成记录 -->
          <div class="content-card record-card">
            <h2 class="card-title">已形成记录</h2>
            <div class="record-detail">
              <h3 class="record-title">{{ formedRecord.title }}</h3>
              <div class="record-meta">
                <span class="meta-item">标签：{{ formedRecord.tags }}</span>
                <span class="meta-item">来源活动：{{ formedRecord.sourceActivity }}</span>
                <span class="meta-item">形成时间：{{ formedRecord.formedTime }}</span>
                <span class="meta-item">记录内容：{{ formedRecord.content }}</span>
                <span class="meta-item">关联维度：{{ formedRecord.dimension }}</span>
              </div>
              <button class="btn-primary" @click="viewRecord">查看记录</button>
            </div>
          </div>

          <!-- 右侧：活动时间线 -->
          <div class="content-card timeline-card">
            <h2 class="card-title">活动时间线</h2>
            <div class="timeline-list">
              <div
                v-for="item in timeline"
                :key="item.id"
                class="timeline-item"
              >
                <div class="timeline-event">{{ item.event }}</div>
                <div class="timeline-operator">{{ item.operator }}</div>
                <div class="timeline-time">{{ item.time }}</div>
              </div>
            </div>
            <button class="btn-secondary" @click="goBack">返回上一页</button>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.virtual-lab-activity-detail-page {
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
  flex-wrap: wrap;
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 600;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}

.status-badge.success {
  background: #d1fae5;
  color: #059669;
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

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.status-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.status-value {
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 600;
}

.status-value.success {
  color: #059669;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.meeting-info {
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  font-size: 14px;
  margin-bottom: 12px;
}

.info-row .info-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  min-width: 100px;
}

.info-row .info-value {
  color: var(--color-text-primary);
  flex: 1;
}

.section-subtitle {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
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

.materials-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.material-item {
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.material-name {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.material-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-item {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.material-action {
  flex-shrink: 0;
  margin-left: 20px;
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

.record-detail {
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
}

.record-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.record-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.record-meta .meta-item {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.timeline-item {
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  align-items: center;
}

.timeline-event {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.timeline-operator {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.timeline-time {
  font-size: 13px;
  color: var(--color-text-hint);
}

@media (max-width: 1024px) {
  .two-column-layout {
    grid-template-columns: 1fr;
  }

  .status-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .info-grid {
    grid-template-columns: 1fr;
  }

  .status-grid {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    grid-template-columns: 1fr;
  }

  .material-item {
    flex-direction: column;
    align-items: stretch;
  }

  .material-action {
    margin-left: 0;
    margin-top: 12px;
  }
}
</style>
