<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import {
  createVirtualLabActivity,
  getVirtualLabActivitiesByRoom,
  getVirtualLabMembersByRoom,
  getVirtualLabRecordsByRoom,
  getVirtualLabRoom,
  getVirtualLabState,
  inviteVirtualLabMember,
  removeVirtualLabMember,
} from '@/stores/admin/virtualLabStore'

const router = useRouter()
const route = useRoute()
const virtualLabState = getVirtualLabState()

const roomId = computed(() => String(route.params.roomId ?? 'smart-manufacturing'))
const operationMessage = useOperationMessage()

const roomInfo = computed(() => getVirtualLabRoom(roomId.value))
const members = computed(() => getVirtualLabMembersByRoom(roomId.value))
const activities = computed(() => getVirtualLabActivitiesByRoom(roomId.value))
const records = computed(() => getVirtualLabRecordsByRoom(roomId.value))
const stats = computed(() => ({
  members: roomInfo.value.members,
  inProgressActivities: roomInfo.value.inProgressActivities,
  recordsCount: roomInfo.value.recordsCount,
  recentActivityTime: roomInfo.value.recentTime,
}))

function editInfo() {
  operationMessage.set(`已进入 ${roomInfo.value.name} 的信息校对状态。`)
}

function inviteTeacher() {
  inviteVirtualLabMember(roomId.value)
  operationMessage.fromStore(virtualLabState)
}

function createActivity() {
  createVirtualLabActivity(roomId.value)
  operationMessage.fromStore(virtualLabState)
}

function viewTeacher(id: string) {
  const member = members.value.find((item) => item.id === id)
  operationMessage.set(member ? `当前查看教师：${member.name}。` : '当前查看教师。')
}

function removeMember(id: string) {
  removeVirtualLabMember(roomId.value, id)
  operationMessage.fromStore(virtualLabState)
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
      <section class="main-section">
        <div class="room-profile-card">
          <div class="room-avatar">👥</div>
          <div class="room-profile-main">
            <div class="room-title-row">
              <h1>{{ roomInfo.name }}</h1>
              <div class="header-actions">
                <Button variant="outline" @click="editInfo">编辑信息</Button>
                <Button @click="inviteTeacher">邀请教师</Button>
                <Button variant="secondary" @click="createActivity">新建教研活动</Button>
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
            <p v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</p>
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
              <Button size="sm" @click="inviteTeacher">邀请教师</Button>
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
                      <Button variant="ghost" size="sm" @click="viewTeacher(member.id)">查看教师</Button>
                      <Button
                        v-if="member.role !== '负责人'"
                        variant="danger"
                        size="sm"
                        @click="removeMember(member.id)"
                      >
                        移出
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-footer">
              <span>共 {{ members.length }} 条</span>
              <div class="pager">
                <span class="pager-button" aria-label="上一页">‹</span>
                <span class="pager-current" aria-current="page">1</span>
                <span class="pager-button" aria-label="下一页">›</span>
                <span class="pager-size">10 条/页</span>
              </div>
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
                      <StatusBadge :status="activity.recordStatus" />
                    </td>
                    <td>{{ activity.recentUpdate }}</td>
                    <td>
                      <Button variant="ghost" size="sm" @click="viewActivity(activity.id)">查看活动</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-footer">
              <span>共 {{ activities.length }} 条</span>
              <div class="pager">
                <span class="pager-button" aria-label="上一页">‹</span>
                <span class="pager-current" aria-current="page">1</span>
                <span class="pager-button" aria-label="下一页">›</span>
                <span class="pager-size">10 条/页</span>
              </div>
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
              <Button variant="outline" @click="viewRecord(record.id)">查看记录</Button>
            </article>
          </div>
          <div class="table-footer">
            <span>共 {{ records.length }} 条</span>
            <div class="pager">
              <span class="pager-button" aria-label="上一页">‹</span>
              <span class="pager-current" aria-current="page">1</span>
              <span class="pager-button" aria-label="下一页">›</span>
              <span class="pager-size">10 条/页</span>
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
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
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
  gap: var(--space-admin-xs);
  font-size: 14px;
  color: var(--color-admin-text-muted);
}

.breadcrumb .separator {
  color: #9aa8bd;
}

.breadcrumb .current {
  color: var(--color-admin-primary);
  font-weight: 600;
}

.main-section {
  padding-bottom: 34px;
}

.room-profile-card,
.content-card,
.stat-card {
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-faint);
}

.room-profile-card {
  min-height: 188px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: var(--space-admin-xl);
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
  color: var(--color-admin-primary);
  font-size: 28px;
}

.room-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-admin-2xl);
}

.room-title-row h1 {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 24px;
  line-height: 1.35;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: var(--space-admin-md-lg);
}

.room-info-grid {
  margin-top: var(--space-admin-lg);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-admin-md) 28px;
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
  color: var(--color-admin-primary) !important;
  font-weight: 600;
}

.room-id {
  display: none;
}

.stats-container {
  margin-top: var(--space-admin-xl);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-admin-card-gap);
}

.stat-card {
  min-height: 92px;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-lg);
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
  color: var(--color-admin-primary);
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
  color: var(--color-admin-text-muted);
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
  color: var(--color-admin-text-strong);
  font-size: 14px;
}

.stat-value.blue {
  color: var(--color-admin-primary);
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
  margin-top: var(--space-admin-xl);
  display: grid;
  grid-template-columns: 0.46fr 0.54fr;
  gap: var(--space-admin-lg);
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
  gap: var(--space-admin-md-lg);
  border-bottom: 1px solid #e4ebf5;
}

.card-header h2 {
  margin: 0;
  color: var(--color-admin-text-strong);
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
  color: var(--color-admin-text-muted);
  font-weight: 700;
}

.data-table td {
  color: var(--color-admin-text-strong);
}

.primary-text {
  font-weight: 700;
}

.sub-text {
  color: #8a98ad;
  font-size: 12px;
  line-height: 1.5;
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
  gap: var(--space-admin-xs);
}

.pager-button,
.pager-current {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-sm);
  background: #fff;
  color: #8a98ad;
}

.pager-current {
  border-color: var(--color-admin-primary);
  background: var(--color-admin-primary);
  color: #fff;
}

.pager-size {
  min-width: 78px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-sm);
  background: #fff;
}

.records-card {
  margin-top: var(--space-admin-lg);
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-sm);
  padding: var(--space-admin-card-gap);
}

.record-item {
  min-height: 76px;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-admin-lg);
  padding: var(--space-admin-md-lg) var(--space-admin-lg);
  border: 1px solid #e4ebf5;
  border-radius: var(--radius-admin-panel);
  background: #fbfdff;
}

.record-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--color-admin-primary);
  color: #fff;
  font-size: 20px;
}

.record-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr 0.8fr;
  gap: var(--space-admin-card-gap);
}

.record-grid strong {
  color: var(--color-admin-text-strong);
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
