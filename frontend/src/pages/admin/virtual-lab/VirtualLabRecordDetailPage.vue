<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
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
const operationMessage = ref('')

const recordInfo = computed(() => getVirtualLabRecord(recordId.value))

const recordContent = computed(() => ({
  summary: '本次研讨围绕智能产线课程项目化改造展开，重点讨论课程任务书结构、项目案例组织、课堂实施路径和成果共建方式。',
  mainTopics: [
    '调整课程项目任务结构，突出真实生产场景。',
    '将智能产线调试任务拆分为 3 个教学项目。',
    '补充企业案例和设备操作视频资源。',
  ],
  taskAssignment: [
    '周明：统筹课程项目化改造方案。',
    '林老师：整理智能产线项目任务书。',
    '王老师：补充企业案例与实训资源。',
    '李老师：完善课堂实施流程。',
  ],
  stageResults: [
    '已形成《智能产线课程项目化改造方案初稿》',
    '已形成课程任务书调整清单',
  ],
}))

interface ParticipationRecord {
  id: string
  teacher: string
  avatar: string
  participationType: string
  contribution: string
  relatedMaterials: string
}

const participationRecords: ParticipationRecord[] = [
  {
    id: '1',
    teacher: '周明',
    avatar: '周',
    participationType: '腾讯会议参会 + 任务分工',
    contribution: '统筹课程项目化改造方案',
    relatedMaterials: '参会记录 / 任务分工表',
  },
  {
    id: '2',
    teacher: '林老师',
    avatar: '林',
    participationType: '腾讯会议参会 + 任务分工',
    contribution: '整理智能产线项目任务书',
    relatedMaterials: '参会记录 / 任务分工表',
  },
  {
    id: '3',
    teacher: '王老师',
    avatar: '王',
    participationType: '任务分工 + 上传资料',
    contribution: '补充企业案例与实训资源',
    relatedMaterials: '任务分工表 / 阶段成果材料',
  },
  {
    id: '4',
    teacher: '李老师',
    avatar: '李',
    participationType: '腾讯会议参会',
    contribution: '参与研讨讨论',
    relatedMaterials: '参会记录',
  },
  {
    id: '5',
    teacher: '刘老师',
    avatar: '刘',
    participationType: '腾讯会议参会 + 提出建议',
    contribution: '提出课堂实施路径建议',
    relatedMaterials: '参会记录 / 会议纪要',
  },
]

const sourceMaterials = computed(() => getVirtualLabMaterialsByActivity(recordInfo.value.sourceActivityId))

function viewSourceActivity() {
  router.push(`/admin/virtual-lab/activities/${recordInfo.value.sourceActivityId}`)
}

function viewSourceMaterials() {
  operationMessage.value = '已定位来源资料列表。'
  document.querySelector('.materials-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function viewMaterial(id: string) {
  const material = sourceMaterials.value.find((item) => item.id === id)
  operationMessage.value = material ? `当前查看来源资料：${material.name}。` : '当前查看来源资料。'
}

function sendToArchive() {
  sendVirtualLabRecordToArchive(recordId.value)
  operationMessage.value = virtualLabState.operationMessage
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
              <p v-if="operationMessage" class="operation-message">{{ operationMessage }}</p>
              <span class="record-id">当前记录 ID：{{ recordId }}</span>
            </div>
            <div class="header-actions">
              <button class="btn-secondary" @click="viewSourceActivity">查看来源活动</button>
              <button class="btn-primary" @click="viewSourceMaterials">查看来源资料</button>
              <button class="btn-primary" @click="sendToArchive">生成档案待确认</button>
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
              <table class="participation-table">
                <thead>
                  <tr>
                    <th>教师</th>
                    <th>参与来源</th>
                    <th>记录内容</th>
                    <th>来源依据</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in participationRecords" :key="record.id">
                    <td>
                      <span class="avatar">{{ record.avatar }}</span>
                      {{ record.teacher }}
                    </td>
                    <td>{{ record.participationType }}</td>
                    <td>{{ record.contribution }}</td>
                    <td>{{ record.relatedMaterials }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="participation-footer">
              <span>共 18 位教师参与记录</span>
              <button class="btn-link" @click="operationMessage = '已展示全部参与教师入口。'">查看全部 ›</button>
            </div>
          </div>
        </div>

        <div class="content-card materials-card">
          <div class="card-header">
            <h2>来源资料</h2>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>资料名称</th>
                  <th>资料类型</th>
                  <th>来源</th>
                  <th>形成时间</th>
                  <th>说明</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="material in sourceMaterials" :key="material.id">
                  <td>
                    <span class="file-icon" :class="material.tone">▤</span>
                    {{ material.name }}
                  </td>
                  <td>{{ material.type }}</td>
                  <td>{{ material.source }}</td>
                  <td>{{ material.time }}</td>
                  <td>{{ material.description }}</td>
                  <td>
                    <button class="btn-link" @click="viewMaterial(material.id)">查看</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.virtual-lab-record-detail-page {
  min-height: 100vh;
  background: #f6f9ff;
  color: #17233d;
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
  gap: 10px;
  color: #66758f;
  font-size: 14px;
  flex-wrap: wrap;
}

.breadcrumb .separator {
  color: #9aa8bd;
}

.breadcrumb .current {
  color: #17233d;
  font-weight: 700;
}

.main-section {
  padding-bottom: 34px;
}

.record-profile-card,
.content-card {
  background: #fff;
  border: 1px solid #dce6f5;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(35, 64, 110, 0.04);
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
  color: #17233d;
  font-size: 28px;
  line-height: 1.35;
  font-weight: 800;
}

.record-info-grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 92px;
  color: #4d5d75;
  font-size: 15px;
}

.operation-message {
  margin: 18px 0 0;
  color: #1268f6;
  font-size: 14px;
  font-weight: 700;
}

.record-id {
  display: none;
}

.header-actions {
  display: flex;
  gap: 18px;
}

.btn-primary,
.btn-secondary,
.btn-link {
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.16s ease;
  white-space: nowrap;
}

.btn-primary,
.btn-secondary {
  height: 44px;
  padding: 0 24px;
}

.btn-primary {
  border: 1px solid #1268f6;
  background: #1268f6;
  color: #fff;
}

.btn-secondary {
  border: 1px solid #cfdcf0;
  background: #fff;
  color: #17233d;
}

.btn-primary:hover,
.btn-secondary:hover {
  border-color: #0d55d8;
  background: #0d55d8;
  color: #fff;
}

.two-column-layout {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 0.98fr 0.98fr;
  gap: 14px;
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
  color: #17233d;
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
  background: #1268f6;
}

.record-content {
  padding: 26px 30px 28px;
}

.content-section + .content-section {
  margin-top: 28px;
}

.content-section h3 {
  margin: 0 0 14px;
  color: #17233d;
  font-size: 15px;
  font-weight: 800;
}

.content-section p {
  margin: 0;
  color: #17233d;
  font-size: 14px;
  line-height: 1.8;
}

.content-section:first-child p,
.task-box {
  padding: 16px 18px;
  border: 1px solid #e4ebf5;
  border-radius: 6px;
  background: #f7faff;
}

.number-list {
  margin: 0;
  padding: 0;
  list-style: none;
  color: #17233d;
  font-size: 14px;
  line-height: 1.8;
}

.number-list li {
  position: relative;
  padding-left: 32px;
}

.number-list li + li {
  margin-top: 8px;
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
  background: #1268f6;
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
  color: #17233d;
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
  color: #17233d;
  font-size: 13px;
  line-height: 1.55;
}

.participation-table th,
.data-table th {
  background: #f7faff;
  color: #66758f;
  font-weight: 800;
}

.avatar {
  width: 30px;
  height: 30px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f0ff;
  color: #1268f6;
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

.btn-link {
  border: 0;
  background: transparent;
  color: #1268f6;
}

.materials-card {
  margin-top: 14px;
}

.file-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
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
    gap: 14px;
  }
}
</style>
