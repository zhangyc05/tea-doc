<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

const roomId = computed(() => String(route.params.roomId ?? 'smart-manufacturing'))
const operationMessage = ref('')

const roomInfo = ref({
  name: '智能制造课程改革虚拟教研室',
  direction: '智能制造专业课程改革',
  affiliation: '智能制造学院 | 智能制造专业群',
  leader: '周明',
  members: 28,
  createdAt: '2025-09',
  description: '围绕智能制造专业核心课程项目化改造、课程资源共建和课堂实施改进开展线上教研。',
})

const stats = {
  members: 28,
  inProgressActivities: 2,
  recordsCount: 6,
  recentActivityTime: '06-18',
}

interface Member {
  id: string
  name: string
  college: string
  role: string
  activitiesParticipated: number
  recordsFormed: number
  recentParticipation: string
}

const members = ref<Member[]>([
  {
    id: '1',
    name: '周明',
    college: '智能制造学院',
    role: '负责人',
    activitiesParticipated: 6,
    recordsFormed: 6,
    recentParticipation: '06-18',
  },
  {
    id: '2',
    name: '林老师',
    college: '智能制造学院',
    role: '成员',
    activitiesParticipated: 4,
    recordsFormed: 3,
    recentParticipation: '06-18',
  },
  {
    id: '3',
    name: '王老师',
    college: '智能制造学院',
    role: '成员',
    activitiesParticipated: 3,
    recordsFormed: 2,
    recentParticipation: '06-12',
  },
  {
    id: '4',
    name: '陈老师',
    college: '智能制造学院',
    role: '成员',
    activitiesParticipated: 2,
    recordsFormed: 1,
    recentParticipation: '06-05',
  },
])

interface Activity {
  id: string
  name: string
  time: string
  meetingMethod: string
  participation: string
  recordStatus: string
  recentUpdate: string
}

const activities = ref<Activity[]>([
  {
    id: 'smart-line-seminar',
    name: '智能产线课程项目化改造研讨',
    time: '06-18 14:00',
    meetingMethod: '腾讯会议',
    participation: '18 人',
    recordStatus: '已形成记录',
    recentUpdate: '06-18 16:20',
  },
  {
    id: 'task-discussion',
    name: '课程任务书优化讨论',
    time: '06-25 15:00',
    meetingMethod: '腾讯会议',
    participation: '12 人',
    recordStatus: '未形成记录',
    recentUpdate: '06-20 创建',
  },
  {
    id: 'resource-review',
    name: '课程资源共建阶段复盘',
    time: '06-10 10:00',
    meetingMethod: '腾讯会议',
    participation: '16 人',
    recordStatus: '记录异常',
    recentUpdate: '参会记录未同步',
  },
])

interface FormedRecord {
  id: string
  title: string
  sourceActivity: string
  formedTime: string
  content: string
  dimension: string
}

const records: FormedRecord[] = [
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
  operationMessage.value = `已进入 ${roomInfo.value.name} 的信息校对状态。`
}

function inviteTeacher() {
  members.value.push({
    id: `invite-${members.value.length + 1}`,
    name: '待确认教师',
    college: '智能制造学院',
    role: '待确认',
    activitiesParticipated: 0,
    recordsFormed: 0,
    recentParticipation: '待参与',
  })
  operationMessage.value = '已新增待确认教师邀请记录。'
}

function createActivity() {
  activities.value.unshift({
    id: `draft-activity-${activities.value.length + 1}`,
    name: '新增教研活动待完善',
    time: '待安排',
    meetingMethod: '待确认',
    participation: '0 人',
    recordStatus: '未形成记录',
    recentUpdate: '刚刚创建',
  })
  operationMessage.value = '已创建待完善教研活动。'
}

function viewTeacher(id: string) {
  const member = members.value.find((item) => item.id === id)
  operationMessage.value = member ? `当前查看教师：${member.name}。` : '当前查看教师。'
}

function removeMember(id: string) {
  const member = members.value.find((item) => item.id === id)
  if (!member || member.role === '负责人') return
  members.value = members.value.filter((item) => item.id !== id)
  operationMessage.value = `已将 ${member.name} 移出当前教研室成员列表。`
}

function viewActivity(id: string) {
  router.push(`/admin/virtual-lab/activities/${id}`)
}

function viewRecord(id: string) {
  router.push(`/admin/virtual-lab/records/${id}`)
}

function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    已形成记录: 'success',
    未形成记录: 'pending',
    记录异常: 'error',
  }
  return statusMap[status] ?? 'pending'
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-room-detail-page">
      <section class="main-section">
        <div class="room-profile-card">
          <div class="room-avatar">👥</div>
          <div class="room-profile-main">
            <div class="room-title-row">
              <h1>{{ roomInfo.name }}</h1>
              <div class="header-actions">
                <button class="btn-secondary" @click="editInfo">编辑信息</button>
                <button class="btn-primary" @click="inviteTeacher">邀请教师</button>
                <button class="btn-secondary" @click="createActivity">新建教研活动</button>
              </div>
            </div>
            <div class="room-info-grid">
              <span>方向：{{ roomInfo.direction }}</span>
              <span>归属：{{ roomInfo.affiliation }}</span>
              <span>负责人：{{ roomInfo.leader }}</span>
              <span>成员：{{ roomInfo.members }} 人</span>
              <span>创建时间：{{ roomInfo.createdAt }}</span>
            </div>
            <p>说明：{{ roomInfo.description }}</p>
            <p v-if="operationMessage" class="operation-message">{{ operationMessage }}</p>
            <span class="room-id">当前教研室 ID：{{ roomId }}</span>
          </div>
        </div>

        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon icon-members">👥</div>
            <div>
              <div class="stat-label">成员数</div>
              <div class="stat-value blue">{{ stats.members }} <span>人</span></div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-activity">▣</div>
            <div>
              <div class="stat-label">进行中活动</div>
              <div class="stat-value green">{{ stats.inProgressActivities }} <span>个</span></div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-record">▤</div>
            <div>
              <div class="stat-label">已形成记录</div>
              <div class="stat-value orange">{{ stats.recordsCount }} <span>条</span></div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon icon-time">◷</div>
            <div>
              <div class="stat-label">最近活动时间</div>
              <div class="stat-value purple">{{ stats.recentActivityTime }}</div>
            </div>
          </div>
        </div>

        <div class="two-column-layout">
          <div class="content-card">
            <div class="card-header">
              <h2>成员</h2>
              <button class="btn-small" @click="inviteTeacher">邀请教师</button>
            </div>
            <div class="table-container">
              <table class="data-table member-table">
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
                    <td>
                      <div class="primary-text">{{ member.name }}</div>
                      <div class="sub-text">{{ member.college }}</div>
                    </td>
                    <td>{{ member.role }}</td>
                    <td>{{ member.activitiesParticipated }}</td>
                    <td>{{ member.recordsFormed }}</td>
                    <td>{{ member.recentParticipation }}</td>
                    <td>
                      <button class="btn-link" @click="viewTeacher(member.id)">查看教师</button>
                      <button
                        v-if="member.role !== '负责人'"
                        class="btn-link danger"
                        @click="removeMember(member.id)"
                      >
                        移出
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-footer">
              <span>共 {{ members.length }} 条</span>
              <div class="pager"><button disabled>‹</button><b>1</b><button disabled>›</button><span>10 条/页</span></div>
            </div>
          </div>

          <div class="content-card">
            <div class="card-header">
              <h2>近期教研活动</h2>
            </div>
            <div class="table-container">
              <table class="data-table activity-table">
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
                      <span class="status-badge" :class="getStatusClass(activity.recordStatus)">
                        {{ activity.recordStatus }}
                      </span>
                    </td>
                    <td>{{ activity.recentUpdate }}</td>
                    <td>
                      <button class="btn-link" @click="viewActivity(activity.id)">查看活动</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-footer">
              <span>共 {{ activities.length }} 条</span>
              <div class="pager"><button disabled>‹</button><b>1</b><button disabled>›</button><span>10 条/页</span></div>
            </div>
          </div>
        </div>

        <div class="content-card records-card">
          <div class="card-header">
            <h2>已形成记录</h2>
          </div>
          <div class="records-list">
            <article
              v-for="record in records"
              :key="record.id"
              class="record-item"
            >
              <div class="record-icon">▤</div>
              <div class="record-grid">
                <div>
                  <span class="sub-text">记录名称：</span>
                  <strong>{{ record.title }}</strong>
                  <div class="sub-text">来源活动：{{ record.sourceActivity }}</div>
                </div>
                <div>
                  <span class="sub-text">形成时间：</span>
                  <strong>{{ record.formedTime }}</strong>
                  <div class="sub-text">记录内容：{{ record.content }}</div>
                </div>
                <div>
                  <span class="sub-text">关联维度：</span>
                  <strong>{{ record.dimension }}</strong>
                </div>
              </div>
              <button class="btn-secondary" @click="viewRecord(record.id)">查看记录</button>
            </article>
          </div>
          <div class="table-footer">
            <span>共 {{ records.length }} 条</span>
            <div class="pager"><button disabled>‹</button><b>1</b><button disabled>›</button><span>10 条/页</span></div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.virtual-lab-room-detail-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
}

.virtual-lab-room-detail-page *,
.virtual-lab-room-detail-page *::before,
.virtual-lab-room-detail-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 14px;
}

.header-content,
.main-section {
  max-width: 1560px;
  margin: 0 auto;
}

.header-content,
.main-section {
  padding-left: 22px;
  padding-right: 22px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #66758f;
}

.breadcrumb .separator {
  color: #9aa8bd;
}

.breadcrumb .current {
  color: #1268f6;
  font-weight: 600;
}

.main-section {
  padding-bottom: 34px;
}

.room-profile-card,
.content-card,
.stat-card {
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.04);
}

.room-profile-card {
  min-height: 188px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 20px;
  padding: 24px 30px;
}

.room-avatar {
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f0ff;
  color: #1268f6;
  font-size: 28px;
}

.room-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.room-title-row h1 {
  margin: 0;
  color: #17233d;
  font-size: 24px;
  line-height: 1.35;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 14px;
}

.room-info-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px 28px;
  color: #4d5d75;
  font-size: 14px;
}

.room-profile-card p {
  margin: 16px 0 0;
  color: #4d5d75;
  font-size: 14px;
  line-height: 1.6;
}

.operation-message {
  color: #1268f6 !important;
  font-weight: 600;
}

.room-id {
  display: none;
}

.btn-primary,
.btn-secondary,
.btn-small,
.btn-link {
  height: 34px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.btn-primary {
  padding: 0 16px;
  border: 1px solid #1268f6;
  background: #1268f6;
  color: #fff;
}

.btn-secondary,
.btn-small {
  padding: 0 16px;
  border: 1px solid #cfdcf0;
  background: #fff;
  color: #1268f6;
}

.btn-primary:hover,
.btn-secondary:hover,
.btn-small:hover {
  border-color: #0d55d8;
  background: #0d55d8;
  color: #fff;
}

.stats-container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.stat-card {
  min-height: 92px;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
}

.stat-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 800;
}

.icon-members {
  color: #1268f6;
  background: #e8f0ff;
}

.icon-activity {
  color: #18a663;
  background: #dff8ec;
}

.icon-record {
  color: #f26a16;
  background: #fff0df;
}

.icon-time {
  color: #8848e8;
  background: #efe7ff;
}

.stat-label {
  color: #66758f;
  font-size: 14px;
  font-weight: 600;
}

.stat-value {
  margin-top: 7px;
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
}

.stat-value span {
  color: #17233d;
  font-size: 14px;
}

.stat-value.blue {
  color: #1268f6;
}

.stat-value.green {
  color: #18a663;
}

.stat-value.orange {
  color: #f26a16;
}

.stat-value.purple {
  color: #8848e8;
}

.two-column-layout {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 0.46fr 0.54fr;
  gap: 16px;
}

.content-card {
  overflow: hidden;
}

.card-header {
  min-height: 56px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-bottom: 1px solid #e4ebf5;
}

.card-header h2 {
  margin: 0;
  color: #17233d;
  font-size: 17px;
  font-weight: 700;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.member-table {
  min-width: 640px;
}

.activity-table {
  min-width: 790px;
}

.data-table th,
.data-table td {
  padding: 13px 12px;
  border-bottom: 1px solid #e8eef7;
  text-align: left;
  vertical-align: middle;
  font-size: 13px;
  line-height: 1.45;
}

.data-table th {
  background: #f7faff;
  color: #66758f;
  font-weight: 700;
}

.data-table td {
  color: #17233d;
}

.primary-text {
  font-weight: 700;
}

.sub-text {
  color: #8a98ad;
  font-size: 12px;
  line-height: 1.5;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.success {
  background: #dff8ec;
  color: #18a663;
}

.status-badge.pending {
  background: #fff0df;
  color: #d85a0d;
}

.status-badge.error {
  background: #ffe8e6;
  color: #d92d20;
}

.btn-link {
  height: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: #1268f6;
}

.btn-link + .btn-link {
  margin-left: 10px;
}

.btn-link.danger {
  color: #d92d20;
}

.table-footer {
  min-height: 48px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e8eef7;
  color: #4d5d75;
  font-size: 13px;
}

.pager {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pager button,
.pager b {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7e2f2;
  border-radius: 6px;
  background: #fff;
  color: #8a98ad;
}

.pager b {
  border-color: #1268f6;
  background: #1268f6;
  color: #fff;
}

.pager span {
  min-width: 78px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7e2f2;
  border-radius: 6px;
  background: #fff;
}

.records-card {
  margin-top: 16px;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
}

.record-item {
  min-height: 76px;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid #e4ebf5;
  border-radius: 8px;
  background: #fbfdff;
}

.record-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #1268f6;
  color: #fff;
  font-size: 20px;
}

.record-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr 0.8fr;
  gap: 18px;
}

.record-grid strong {
  color: #17233d;
  font-size: 13px;
}

@media (max-width: 1360px) {
  .room-info-grid,
  .stats-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .two-column-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .room-profile-card {
    grid-template-columns: 1fr;
  }

  .room-title-row,
  .header-actions,
  .table-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .record-item,
  .record-grid {
    grid-template-columns: 1fr;
  }
}
</style>
