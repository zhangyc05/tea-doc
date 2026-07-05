<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminIcon, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import { getVirtualLabActivityDetailMock } from '@/services/mock/virtual-lab'
import {
  formVirtualLabRecordFromActivity,
  getVirtualLabActivity,
  getVirtualLabMaterialsByActivity,
  getVirtualLabState,
} from '@/stores/admin/virtualLabStore'

const router = useRouter()
const route = useRoute()
const virtualLabState = getVirtualLabState()

const activityId = computed(() => String(route.params.activityId ?? 'smart-line-seminar'))
const operationMessage = useOperationMessage()

const activityInfo = computed(() => {
  const activity = getVirtualLabActivity(activityId.value)
  const room = virtualLabState.rooms.find(item => item.id === activity.roomId)
  return {
    ...activity,
    roomName: room?.name ?? '智能制造课程改革虚拟教研室',
    status: activity.recordStatus,
  }
})

const statusCard = computed(() => ({
  attendanceRecord: activityInfo.value.meetingMethod === '待确认' ? '待同步' : '已同步',
  meetingMinutes: activityInfo.value.recordStatus === '已形成记录' ? '已形成' : '待形成',
  taskAssignment: activityInfo.value.recordStatus === '已形成记录' ? '已形成' : '待补充',
  researchRecord: activityInfo.value.recordStatus,
  recentSyncTime: activityInfo.value.recentUpdate,
  dataSource: activityInfo.value.meetingMethod,
}))

const { participants, timeline } = getVirtualLabActivityDetailMock()

const showAllParticipants = ref(false)
const displayedParticipants = computed(() => showAllParticipants.value ? participants : participants.slice(0, 3))
const materials = computed(() => getVirtualLabMaterialsByActivity(activityId.value))
const selectedMaterialId = ref(materials.value[0]?.id ?? '')
const selectedMaterial = computed(() => materials.value.find(item => item.id === selectedMaterialId.value) ?? null)
const formedRecord = computed(() => virtualLabState.records.find(record => record.sourceActivityId === activityId.value) ?? null)

function materialRowClassName({ row }: { row: { id: string } }) {
  return selectedMaterialId.value === row.id ? 'active' : ''
}

function editActivity() {
  operationMessage.set('已进入活动信息校对状态。')
}

function viewMeetingRecord() {
  operationMessage.set(`已定位会议记录：${activityInfo.value.meetingMethod} ${activityInfo.value.meetingNo}。`)
}

function showAllActivityParticipants() {
  showAllParticipants.value = true
  operationMessage.set(`已展开全部 ${participants.length} 位参与教师。`)
}

async function copyMeetingNo() {
  if (!navigator.clipboard) {
    operationMessage.set(`当前浏览器不支持自动复制，会议号：${activityInfo.value.meetingNo}。`)
    return
  }

  try {
    await navigator.clipboard.writeText(activityInfo.value.meetingNo)
    operationMessage.set(`会议号 ${activityInfo.value.meetingNo} 已复制。`)
  } catch {
    operationMessage.set(`会议号复制失败，请手动复制：${activityInfo.value.meetingNo}。`)
  }
}

function viewMaterial(id: string) {
  const material = materials.value.find((item) => item.id === id)
  selectedMaterialId.value = id
  operationMessage.set(material ? `当前查看资料：${material.name}。` : '当前查看资料。')
}

function viewRecord() {
  if (!formedRecord.value) {
    const record = formVirtualLabRecordFromActivity(activityId.value)
    operationMessage.fromStore(virtualLabState)
    if (!record) return
    router.push(`/admin/virtual-lab/records/${record.id}`)
    return
  }
  router.push(`/admin/virtual-lab/records/${formedRecord.value.id}`)
}

function goBack() {
  router.back()
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-activity-detail-page">
      <section class="page-header">
        <div class="header-content">
          <button class="back-button" @click="goBack">‹</button>
          <div class="breadcrumb">
            <span>虚拟教研室</span>
            <i class="separator">/</i>
            <span>智能制造课程改革虚拟教研室</span>
            <i class="separator">/</i>
            <span>教研活动</span>
            <i class="separator">/</i>
            <span class="current">活动详情</span>
          </div>
        </div>
      </section>

      <section class="main-section">
        <div class="activity-profile-card">
          <div class="activity-title-row">
            <div>
              <div class="title-with-status">
                <h1>{{ activityInfo.name }}</h1>
                <StatusBadge :status="activityInfo.status" />
              </div>
              <div class="info-grid">
                <span>所属教研室：{{ activityInfo.roomName }}</span>
                <span>发起人：{{ activityInfo.initiator }}</span>
                <span>活动主题：{{ activityInfo.theme }}</span>
                <span>参与教师：{{ activityInfo.participantsCount }} 人</span>
                <span>活动时间：{{ activityInfo.time }}</span>
                <span>创建时间：{{ activityInfo.createdAt }}</span>
                <span>会议方式：{{ activityInfo.meetingMethod }}</span>
                <span>活动说明：{{ activityInfo.description }}</span>
              </div>
              <p v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</p>
              <span class="activity-id">当前活动 ID：{{ activityId }}</span>
            </div>
            <div class="header-actions">
              <Button variant="outline" @click="editActivity">编辑活动</Button>
              <Button @click="viewMeetingRecord">查看会议记录</Button>
            </div>
          </div>
        </div>

        <div class="status-card">
          <div class="status-item">
            <div class="status-icon icon-attendance"><AdminIcon name="user" /></div>
            <div>
              <span>参会记录</span>
              <strong class="green">{{ statusCard.attendanceRecord }}</strong>
            </div>
          </div>
          <div class="status-divider"></div>
          <div class="status-item">
            <div class="status-icon icon-minutes"><AdminIcon name="document" /></div>
            <div>
              <span>会议纪要</span>
              <strong class="blue">{{ statusCard.meetingMinutes }}</strong>
            </div>
          </div>
          <div class="status-divider"></div>
          <div class="status-item">
            <div class="status-icon icon-task"><AdminIcon name="check" /></div>
            <div>
              <span>任务分工</span>
              <strong class="purple">{{ statusCard.taskAssignment }}</strong>
            </div>
          </div>
          <div class="status-divider"></div>
          <div class="status-item">
            <div class="status-icon icon-record"><AdminIcon name="document" /></div>
            <div>
              <span>教研记录</span>
              <strong class="green">{{ statusCard.researchRecord }}</strong>
            </div>
          </div>
          <div class="status-divider"></div>
          <div class="sync-info">
            <span>最近同步时间：{{ statusCard.recentSyncTime }}</span>
            <span>数据来源：{{ statusCard.dataSource }}</span>
          </div>
        </div>

        <div class="two-column-layout top-layout">
          <div class="content-card participants-card">
            <div class="card-header">
              <h2>会议与参与情况</h2>
              <Button v-if="!showAllParticipants" variant="ghost" @click="showAllActivityParticipants">查看全部({{ participants.length }}) ›</Button>
            </div>
            <div class="participants-content">
              <div class="meeting-info">
                <div><span>会议平台：</span><strong>{{ activityInfo.meetingMethod }}</strong></div>
                <div><span>会议号：</span><strong>{{ activityInfo.meetingNo }}</strong><button class="copy-button" @click="copyMeetingNo">⧉</button></div>
                <div><span>会议时间：</span><strong>{{ activityInfo.time }}</strong></div>
                <div><span>会议主题：</span><strong>{{ activityInfo.name }}</strong></div>
                <div><span>同步状态：</span><strong class="green"><AdminIcon name="check" /> 已同步</strong></div>
              </div>
              <div class="table-container">
                <AdminTable :data="displayedParticipants" row-key="id" empty-text="暂无参与教师">
                  <AdminTableColumn label="教师" min-width="100">
                    <template #default="{ row }">
                        <span class="avatar">{{ row.avatar }}</span>
                        {{ row.name }}
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="教研室角色" min-width="110">
                    <template #default="{ row }">
                      <span class="role-pill">{{ row.role }}</span>
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="participationType" label="参与来源" min-width="110" />
                  <AdminTableColumn prop="timeRange" label="参与时间" min-width="150" />
                  <AdminTableColumn label="关联记录" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.status" />
                    </template>
                  </AdminTableColumn>
                </AdminTable>
              </div>
            </div>
          </div>

          <div class="content-card">
            <div class="card-header">
              <h2>活动资料</h2>
            </div>
            <div class="table-container">
              <AdminTable
                :data="materials"
                row-key="id"
                :row-class-name="materialRowClassName"
                empty-text="暂无活动资料"
              >
                <AdminTableColumn label="资料名称" min-width="180">
                  <template #default="{ row }">
                    <span class="file-icon" :class="row.tone"><AdminIcon name="document" /></span>
                    {{ row.name }}
                  </template>
                </AdminTableColumn>
                <AdminTableColumn prop="source" label="来源" min-width="120" />
                <AdminTableColumn prop="type" label="类型" min-width="90" />
                <AdminTableColumn prop="time" label="时间" min-width="140" />
                <AdminTableColumn label="操作" min-width="90" fixed="right">
                  <template #default="{ row }">
                    <Button variant="ghost" size="sm" @click="viewMaterial(row.id)">查看</Button>
                  </template>
                </AdminTableColumn>
              </AdminTable>
            </div>
            <div v-if="selectedMaterial" class="material-detail-panel">
              <h3>资料详情：{{ selectedMaterial.name }}</h3>
              <div class="material-detail-grid">
                <span>来源：{{ selectedMaterial.source }}</span>
                <span>类型：{{ selectedMaterial.type }}</span>
                <span>形成时间：{{ selectedMaterial.time }}</span>
                <span>同步状态：{{ selectedMaterial.syncStatus }}</span>
              </div>
              <p>{{ selectedMaterial.description }}</p>
            </div>
          </div>
        </div>

        <div class="two-column-layout bottom-layout">
          <div class="content-card">
            <div class="card-header">
              <h2>已形成记录</h2>
            </div>
            <div v-if="formedRecord" class="record-detail">
              <div class="record-icon"><AdminIcon name="document" /></div>
              <div>
                <div class="record-title-line">
                  <h3>{{ formedRecord.title }}</h3>
                  <span class="tag-pill">会议纪要类</span>
                </div>
                <div class="record-meta">
                  <span>来源活动：{{ formedRecord.sourceActivity }}</span>
                  <span>形成时间：{{ formedRecord.formedTime }}</span>
                  <span>记录内容：{{ formedRecord.content }}</span>
                  <span>关联维度：{{ formedRecord.dimension }}</span>
                </div>
              </div>
              <Button @click="viewRecord">查看记录 →</Button>
            </div>
            <div v-else class="record-detail">
              <div class="record-icon"><AdminIcon name="document" /></div>
              <div>
                <div class="record-title-line">
                  <h3>当前活动尚未形成教研记录</h3>
                  <span class="tag-pill">待形成</span>
                </div>
                <div class="record-meta">
                  <span>来源活动：{{ activityInfo.name }}</span>
                  <span>形成状态：{{ activityInfo.recordStatus }}</span>
                  <span>记录内容：待系统汇总会议纪要、任务分工和阶段成果</span>
                  <span>关联维度：成长档案 / 教研科研</span>
                </div>
              </div>
              <Button @click="viewRecord">形成并查看记录 →</Button>
            </div>
          </div>

          <div class="content-card">
            <div class="card-header">
              <h2>活动时间线</h2>
            </div>
            <div class="timeline-list">
              <div
                v-for="item in timeline"
                :key="item.id"
                class="timeline-item"
              >
                <span class="timeline-dot"></span>
                <strong>{{ item.event }}</strong>
                <span>{{ item.operator }}</span>
                <time>{{ item.time }}</time>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.virtual-lab-activity-detail-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.virtual-lab-activity-detail-page *,
.virtual-lab-activity-detail-page *::before,
.virtual-lab-activity-detail-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 20px 0 12px;
}

.header-content,
.main-section {
  max-width: 1560px;
  margin: 0 auto;
  padding-left: 22px;
  padding-right: 22px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md-lg);
}

.back-button {
  width: 34px;
  height: 34px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fff;
  color: var(--color-admin-text-strong);
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-sm);
  color: var(--color-admin-text-muted);
  font-size: 14px;
  flex-wrap: wrap;
}

.breadcrumb .separator {
  color: #9aa8bd;
}

.breadcrumb .current {
  color: var(--color-admin-text-strong);
  font-weight: 700;
}

.main-section {
  padding-bottom: 34px;
}

.activity-profile-card,
.status-card,
.content-card {
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-faint);
}

.activity-profile-card {
  min-height: 198px;
  padding: 28px 32px;
}

.activity-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
}

.title-with-status {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md-lg);
}

.title-with-status h1 {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 26px;
  line-height: 1.35;
  font-weight: 800;
}

.info-grid {
  margin-top: var(--space-admin-xl);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px 80px;
  color: var(--color-admin-text-strong);
  font-size: 15px;
  line-height: 1.45;
}

.operation-message {
  margin: 14px 0 0;
  color: var(--color-admin-primary);
  font-size: 14px;
  font-weight: 700;
}

.activity-id {
  display: none;
}

.header-actions {
  display: flex;
  gap: var(--space-admin-card-gap);
}

.copy-button {
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.status-card {
  min-height: 112px;
  margin-top: 14px;
  padding: 20px 28px;
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr 1px 1.1fr;
  align-items: center;
  gap: var(--space-admin-xl);
}

.status-divider {
  width: 1px;
  height: 70px;
  background: var(--color-admin-border);
}

.status-item {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-admin-lg);
}

.status-icon {
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-admin-panel);
  box-shadow: inset 0 0 0 8px rgba(255, 255, 255, 0.68);
}

.status-icon :deep(svg) {
  width: 26px;
  height: 26px;
}

.icon-attendance {
  color: #18a663;
  background: linear-gradient(145deg, #edfdf5 0%, #d7f7e8 100%);
}

.icon-minutes,
.icon-record {
  color: var(--color-admin-primary);
  background: linear-gradient(145deg, #f1f6ff 0%, #dce9ff 100%);
}

.icon-task {
  color: #8848e8;
  background: linear-gradient(145deg, #f7f0ff 0%, #eadcff 100%);
}

.status-item span,
.sync-info span {
  display: block;
  color: #4d5d75;
  font-size: 14px;
}

.status-item strong {
  display: block;
  margin-top: var(--space-admin-xs);
  font-size: 20px;
  line-height: 1;
}

.green {
  color: #18a663 !important;
}

.blue {
  color: var(--color-admin-primary) !important;
}

.purple {
  color: #8848e8 !important;
}

.sync-info {
  display: grid;
  gap: var(--space-admin-md);
}

.two-column-layout {
  margin-top: 14px;
  display: grid;
  gap: var(--space-admin-md-lg);
}

.top-layout {
  grid-template-columns: 1.08fr 0.76fr;
}

.bottom-layout {
  grid-template-columns: 1.08fr 0.76fr;
}

.content-card {
  overflow: hidden;
}

.card-header {
  min-height: 58px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e4ebf5;
}

.card-header h2 {
  position: relative;
  margin: 0;
  padding-left: 16px;
  color: var(--color-admin-text-strong);
  font-size: 17px;
  font-weight: 800;
}

.card-header h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 2px;
  width: 4px;
  height: 22px;
  border-radius: 2px;
  background: var(--color-admin-primary);
}

.participants-content {
  display: grid;
  grid-template-columns: 0.36fr 0.64fr;
}

.meeting-info {
  padding: var(--space-admin-xl);
  border-right: 1px solid #e4ebf5;
}

.meeting-info div {
  margin-bottom: var(--space-admin-card-gap);
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  color: #4d5d75;
  font-size: 13px;
}

.meeting-info span {
  flex: 0 0 76px;
}

.meeting-info strong {
  color: var(--color-admin-text-strong);
  font-weight: 600;
}

.copy-button {
  width: 24px;
  height: 24px;
  border: 1px solid #d7e2f2;
  background: #fff;
  color: #8a98ad;
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

.participant-table {
  min-width: 620px;
}

.material-table {
  min-width: 640px;
}

.data-table th,
.data-table td {
  padding: var(--space-admin-md-lg) var(--space-admin-md);
  border-bottom: 1px solid #e8eef7;
  text-align: left;
  vertical-align: middle;
  color: var(--color-admin-text-strong);
  font-size: 13px;
  line-height: 1.45;
}

.data-table th {
  background: #f7faff;
  color: var(--color-admin-text-muted);
  font-weight: 700;
}

.data-table tr.active td {
  background: #f3f7ff;
}

.material-detail-panel {
  margin: 16px 20px 20px;
  padding: 16px 18px;
  border: 1px solid #d7e2f2;
  border-radius: var(--radius-sm);
  background: #fbfdff;
}

.material-detail-panel h3 {
  margin: 0 0 12px;
  color: var(--color-admin-text-strong);
  font-size: 15px;
  font-weight: 800;
}

.material-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-xs) var(--space-admin-xl);
  color: #4d5d75;
  font-size: 13px;
}

.material-detail-panel p {
  margin: 12px 0 0;
  color: var(--color-admin-text-strong);
  font-size: 13px;
  line-height: 1.6;
}

.avatar {
  width: 30px;
  height: 30px;
  margin-right: var(--space-admin-xs);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f0ff;
  color: var(--color-admin-primary);
  font-weight: 700;
}

.role-pill,
.tag-pill {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  background: #eef3fb;
  color: #4d5d75;
  font-size: 12px;
  font-weight: 700;
}

.file-icon {
  width: 24px;
  height: 24px;
  margin-right: var(--space-admin-xs);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #fff;
}

.file-icon :deep(svg) {
  width: 14px;
  height: 14px;
}

.file-icon.blue {
  background: #5b8ff9;
}

.file-icon.green {
  background: #36b37e;
}

.file-icon.orange {
  background: #ff8f3d;
}

.file-icon.red {
  background: #f25f66;
}

.record-detail {
  min-height: 188px;
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr) auto;
  align-items: center;
  gap: 22px;
  margin: var(--space-admin-xl);
  padding: 26px;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  background: #fbfdff;
}

.record-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-admin-panel);
  background: linear-gradient(135deg, #6da2ff, var(--color-admin-primary));
  color: #fff;
  box-shadow: inset 0 0 0 10px rgba(255, 255, 255, 0.18);
}

.record-icon :deep(svg) {
  width: 34px;
  height: 34px;
}

.record-title-line {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
}

.record-title-line h3 {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 18px;
  font-weight: 800;
}

.record-meta {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px var(--space-admin-2xl);
  color: #4d5d75;
  font-size: 14px;
}

.timeline-list {
  position: relative;
  padding: 20px 26px 24px;
}

.timeline-list::before {
  content: '';
  position: absolute;
  left: 34px;
  top: 30px;
  bottom: 34px;
  width: 1px;
  background: #d7e2f2;
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 18px 1fr 0.8fr 0.8fr;
  align-items: center;
  gap: var(--space-admin-md);
  min-height: 34px;
  color: #4d5d75;
  font-size: 14px;
}

.timeline-dot {
  position: relative;
  z-index: 1;
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: var(--color-admin-primary);
  box-shadow: 0 0 0 2px #cfe0ff;
}

.timeline-item strong {
  color: var(--color-admin-text-strong);
}

.timeline-item time {
  color: #8a98ad;
}

@media (max-width: 1360px) {
  .status-card,
  .top-layout,
  .bottom-layout,
  .participants-content {
    grid-template-columns: 1fr;
  }

  .status-divider {
    display: none;
  }

  .status-card {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .meeting-info {
    border-right: 0;
    border-bottom: 1px solid #e4ebf5;
  }
}

@media (max-width: 900px) {
  .activity-title-row,
  .header-actions,
  .title-with-status {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-grid,
  .status-card,
  .record-detail,
  .record-meta,
  .timeline-item {
    grid-template-columns: 1fr;
  }
}
</style>
