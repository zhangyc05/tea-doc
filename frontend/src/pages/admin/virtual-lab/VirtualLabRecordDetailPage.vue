<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import { getVirtualLabRecordDetailMock } from '@/services/mock/virtual-lab'
import {
  getVirtualLabMaterialsByActivity,
  getVirtualLabRecord,
  getVirtualLabState,
  sendVirtualLabRecordToArchive,
} from '@/stores/admin/virtualLabStore'

const router = useRouter()
const route = useRoute()
const virtualLabState = getVirtualLabState()

const recordId = computed(() => String(route.params.recordId ?? 'smart-line-record'))
const operationMessage = useOperationMessage()

const recordInfo = computed(() => getVirtualLabRecord(recordId.value))
const { recordContent, participationRecords } = getVirtualLabRecordDetailMock()

const showAllParticipants = ref(false)
const displayedParticipationRecords = computed(() => showAllParticipants.value ? participationRecords : participationRecords.slice(0, 4))
const sourceMaterials = computed(() => getVirtualLabMaterialsByActivity(recordInfo.value.sourceActivityId))
const selectedMaterialId = ref(sourceMaterials.value[0]?.id ?? '')
const selectedMaterial = computed(() => sourceMaterials.value.find(item => item.id === selectedMaterialId.value) ?? null)

function materialRowClassName({ row }: { row: { id: string } }) {
  return selectedMaterialId.value === row.id ? 'active' : ''
}

function viewSourceActivity() {
  router.push(`/admin/virtual-lab/activities/${recordInfo.value.sourceActivityId}`)
}

function viewSourceMaterials() {
  operationMessage.set('已定位来源资料列表。')
  document.querySelector('.materials-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function viewMaterial(id: string) {
  const material = sourceMaterials.value.find((item) => item.id === id)
  selectedMaterialId.value = id
  operationMessage.set(material ? `当前查看来源资料：${material.name}。` : '当前查看来源资料。')
}

function showAllRecordParticipants() {
  showAllParticipants.value = true
  operationMessage.set(`已展开全部 ${participationRecords.length} 位参与教师记录。`)
}

function sendToArchive() {
  sendVirtualLabRecordToArchive(recordId.value)
  operationMessage.fromStore(virtualLabState)
  router.push(`/admin/archive/processing?recordId=virtual-lab-${recordId.value}`)
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-record-detail-page">
      <section class="main-section">
        <div class="record-profile-card">
          <div class="record-title-row">
            <div>
              <h1>{{ recordInfo.title }}</h1>
              <div class="record-info-grid">
                <span>来源活动：{{ recordInfo.sourceActivity }}</span>
                <span>形成时间：{{ recordInfo.formedTime }}</span>
                <span>所属教研室：{{ recordInfo.roomName }}</span>
                <span>记录来源：{{ recordInfo.recordSource }}</span>
                <span>活动时间：{{ recordInfo.activityTime }}</span>
                <span>当前去向：{{ recordInfo.currentStatus }}</span>
                <span>会议方式：{{ recordInfo.meetingMethod }}</span>
                <span>关键维度：{{ recordInfo.keyDimension }}</span>
              </div>
              <p v-if="operationMessage.text.value" class="operation-message">{{ operationMessage.text.value }}</p>
              <span class="record-id">当前记录 ID：{{ recordId }}</span>
            </div>
            <div class="header-actions">
              <Button variant="outline" @click="viewSourceActivity">查看来源活动</Button>
              <Button @click="viewSourceMaterials">查看来源资料</Button>
              <Button @click="sendToArchive">生成档案待确认</Button>
            </div>
          </div>
        </div>

        <div class="two-column-layout">
          <div class="content-card record-body-card">
            <div class="card-header">
              <h2>记录正文</h2>
            </div>
            <div class="record-content">
              <section class="content-section">
                <h3>会议纪要摘要</h3>
                <p>{{ recordContent.summary }}</p>
              </section>

              <section class="content-section">
                <h3>主要讨论事项</h3>
                <ol class="number-list">
                  <li v-for="(item, index) in recordContent.mainTopics" :key="index">{{ item }}</li>
                </ol>
              </section>

              <section class="content-section">
                <h3>任务分工</h3>
                <div class="task-box">
                  <p v-for="(item, index) in recordContent.taskAssignment" :key="index">{{ item }}</p>
                </div>
              </section>

              <section class="content-section">
                <h3>阶段成果</h3>
                <ul class="result-list">
                  <li v-for="(item, index) in recordContent.stageResults" :key="index">{{ item }}</li>
                </ul>
              </section>
            </div>
          </div>

          <div class="content-card participation-card">
            <div class="card-header">
              <h2>参与记录</h2>
            </div>
            <div class="table-container">
              <AdminTable :data="displayedParticipationRecords" row-key="id" empty-text="暂无参与记录">
                <AdminTableColumn label="教师" min-width="100">
                  <template #default="{ row }">
                    <span class="avatar">{{ row.avatar }}</span>
                    {{ row.teacher }}
                  </template>
                </AdminTableColumn>
                <AdminTableColumn prop="participationType" label="参与来源" min-width="120" />
                <AdminTableColumn prop="contribution" label="记录内容" min-width="220" />
                <AdminTableColumn prop="relatedMaterials" label="来源依据" min-width="160" />
              </AdminTable>
            </div>
            <div class="participation-footer">
              <span>共 {{ participationRecords.length }} 位教师参与记录</span>
              <Button v-if="!showAllParticipants" variant="ghost" @click="showAllRecordParticipants">查看全部 ›</Button>
            </div>
          </div>
        </div>

        <div class="content-card materials-card">
          <div class="card-header">
            <h2>来源资料</h2>
          </div>
          <div class="table-container">
            <AdminTable
              :data="sourceMaterials"
              row-key="id"
              :row-class-name="materialRowClassName"
              empty-text="暂无来源资料"
            >
              <AdminTableColumn label="资料名称" min-width="180">
                <template #default="{ row }">
                  <span class="file-icon" :class="row.tone">▤</span>
                  {{ row.name }}
                </template>
              </AdminTableColumn>
              <AdminTableColumn prop="type" label="资料类型" min-width="100" />
              <AdminTableColumn prop="source" label="来源" min-width="120" />
              <AdminTableColumn prop="time" label="形成时间" min-width="140" />
              <AdminTableColumn prop="description" label="说明" min-width="220" />
              <AdminTableColumn label="操作" min-width="90" fixed="right">
                <template #default="{ row }">
                  <Button variant="ghost" size="sm" @click="viewMaterial(row.id)">查看</Button>
                </template>
              </AdminTableColumn>
            </AdminTable>
          </div>
          <div v-if="selectedMaterial" class="material-detail-panel">
            <h3>来源资料详情：{{ selectedMaterial.name }}</h3>
            <div class="material-detail-grid">
              <span>来源：{{ selectedMaterial.source }}</span>
              <span>类型：{{ selectedMaterial.type }}</span>
              <span>形成时间：{{ selectedMaterial.time }}</span>
              <span>同步状态：{{ selectedMaterial.syncStatus }}</span>
            </div>
            <p>{{ selectedMaterial.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.virtual-lab-record-detail-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
  color: var(--color-admin-text-strong);
}

.virtual-lab-record-detail-page *,
.virtual-lab-record-detail-page *::before,
.virtual-lab-record-detail-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 14px;
}

.header-content,
.main-section {
  max-width: 1560px;
  margin: 0 auto;
  padding-left: 22px;
  padding-right: 22px;
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

.record-profile-card,
.content-card {
  background: #fff;
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-admin-panel);
  box-shadow: var(--shadow-admin-card-faint);
}

.record-profile-card {
  min-height: 236px;
  padding: 32px 34px;
}

.record-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
}

.record-title-row h1 {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 28px;
  line-height: 1.35;
  font-weight: 800;
}

.record-info-grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-card-gap) 92px;
  color: #4d5d75;
  font-size: 15px;
}

.operation-message {
  margin: 18px 0 0;
  color: var(--color-admin-primary);
  font-size: 14px;
  font-weight: 700;
}

.record-id {
  display: none;
}

.header-actions {
  display: flex;
  gap: var(--space-admin-card-gap);
}

.two-column-layout {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 0.98fr 0.98fr;
  gap: var(--space-admin-md-lg);
  align-items: start;
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

.record-content {
  padding: 26px 30px 28px;
}

.content-section + .content-section {
  margin-top: 28px;
}

.content-section h3 {
  margin: 0 0 14px;
  color: var(--color-admin-text-strong);
  font-size: 15px;
  font-weight: 800;
}

.content-section p {
  margin: 0;
  color: var(--color-admin-text-strong);
  font-size: 14px;
  line-height: 1.8;
}

.content-section:first-child p,
.task-box {
  padding: 16px 18px;
  border: 1px solid #e4ebf5;
  border-radius: var(--radius-sm);
  background: #f7faff;
}

.number-list {
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-admin-text-strong);
  font-size: 14px;
  line-height: 1.8;
}

.number-list li {
  position: relative;
  padding-left: 32px;
}

.number-list li + li {
  margin-top: var(--space-admin-xs);
}

.number-list li::before {
  content: counter(list-item);
  position: absolute;
  left: 0;
  top: 4px;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-admin-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.task-box {
  display: grid;
  gap: 9px;
}

.result-list {
  margin: 0;
  padding-left: 18px;
  color: var(--color-admin-text-strong);
  font-size: 14px;
  line-height: 1.8;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.participation-table,
.data-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.participation-table {
  min-width: 610px;
}

.data-table {
  min-width: 980px;
}

.participation-table th,
.participation-table td,
.data-table th,
.data-table td {
  padding: 15px 14px;
  border-bottom: 1px solid #e8eef7;
  text-align: left;
  vertical-align: middle;
  color: var(--color-admin-text-strong);
  font-size: 13px;
  line-height: 1.55;
}

.participation-table th,
.data-table th {
  background: #f7faff;
  color: var(--color-admin-text-muted);
  font-weight: 800;
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
  font-weight: 800;
}

.participation-footer {
  min-height: 60px;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #4d5d75;
  font-size: 14px;
}

.materials-card {
  margin-top: 14px;
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
  font-size: 13px;
}

.file-icon.blue {
  background: #5b8ff9;
}

.file-icon.green {
  background: #36b37e;
}

.file-icon.purple {
  background: #8848e8;
}

.file-icon.orange {
  background: #ff8f3d;
}

@media (max-width: 1360px) {
  .two-column-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .record-title-row,
  .header-actions,
  .participation-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .record-info-grid {
    grid-template-columns: 1fr;
    gap: var(--space-admin-md-lg);
  }
}
</style>
