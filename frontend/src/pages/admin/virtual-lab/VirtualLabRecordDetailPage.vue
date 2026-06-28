<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

const recordId = route.params.recordId as string

// 记录基本信息
const recordInfo = {
  title: '智能产线课程项目化改造研讨记录',
  sourceActivity: '智能产线课程项目化改造研讨',
  roomName: '智能制造课程改革虚拟教研室',
  activityTime: '2026-06-18 14:00 ~ 16:00',
  meetingMethod: '腾讯会议',
  formedTime: '2026-06-18 16:20',
  recordSource: '系统根据活动与会议数据生成',
  currentStatus: '已形成教研记录',
  keyDimension: '成长档案 / 教研科研',
}

// 记录正文
const recordContent = {
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
}

// 参与记录数据
interface ParticipationRecord {
  id: string
  teacher: string
  participationType: string
  contribution: string
  relatedMaterials: string
}

const participationRecords: ParticipationRecord[] = [
  {
    id: '1',
    teacher: '周明',
    participationType: '腾讯会议参会 + 任务分工',
    contribution: '统筹课程项目化改造方案',
    relatedMaterials: '参会记录 / 任务分工表',
  },
  {
    id: '2',
    teacher: '林老师',
    participationType: '腾讯会议参会 + 任务分工',
    contribution: '整理智能产线项目任务书',
    relatedMaterials: '参会记录 / 任务分工表',
  },
  {
    id: '3',
    teacher: '王老师',
    participationType: '任务分工 + 上传资料',
    contribution: '补充企业案例与实训资源',
    relatedMaterials: '任务分工表 / 阶段成果材料',
  },
  {
    id: '4',
    teacher: '李老师',
    participationType: '腾讯会议参会',
    contribution: '参与研讨讨论',
    relatedMaterials: '参会记录',
  },
  {
    id: '5',
    teacher: '刘老师',
    participationType: '腾讯会议参会 + 提出建议',
    contribution: '提出课堂实施路径建议',
    relatedMaterials: '参会记录 / 会议纪要',
  },
]

// 来源资料数据
interface SourceMaterial {
  id: string
  name: string
  type: string
  source: string
  time: string
  description: string
}

const sourceMaterials: SourceMaterial[] = [
  {
    id: '1',
    name: '腾讯会议参会记录',
    type: '参会记录',
    source: '腾讯会议',
    time: '2026-06-18 16:05',
    description: '会议参会人员与时长记录',
  },
  {
    id: '2',
    name: '会议纪要',
    type: '会议纪要',
    source: '系统生成',
    time: '2026-06-18 16:20',
    description: '系统基于会议生成的纪要',
  },
  {
    id: '3',
    name: '任务分工表',
    type: '任务分工',
    source: '活动负责人补充',
    time: '2026-06-18 16:30',
    description: '活动负责人补充任务分工内容',
  },
  {
    id: '4',
    name: '智能产线课程项目化改造方案初稿',
    type: '阶段成果',
    source: '林老师上传',
    time: '2026-06-18 17:10',
    description: '课程改造方案初稿材料',
  },
  {
    id: '5',
    name: '课堂实施流程文档',
    type: '过程材料',
    source: '李老师上传',
    time: '2026-06-18 17:25',
    description: '课堂实施流程与安排说明',
  },
]

function viewSourceActivity() {
  router.push('/admin/virtual-lab/activities/smart-line-seminar')
}

function viewSourceMaterials() {
  console.log('查看来源资料')
  // 滚动到来源资料表
  document.querySelector('.materials-card')?.scrollIntoView({ behavior: 'smooth' })
}

function viewMaterial(id: string) {
  console.log('查看资料', id)
}
</script>

<template>
  <AdminLayout active-key="virtual-lab">
    <div class="virtual-lab-record-detail-page">
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
            <span>智能产线课程项目化改造研讨</span>
            <i class="separator">/</i>
            <span class="current">教研记录详情</span>
          </div>
          <h1 class="page-title">{{ recordInfo.title }}</h1>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="viewSourceActivity">查看来源活动</button>
          <button class="btn-secondary" @click="viewSourceMaterials">查看来源资料</button>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <!-- 顶部信息 -->
        <div class="content-card info-card">
          <h2 class="card-title">记录信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">来源活动：</span>
              <span class="info-value">{{ recordInfo.sourceActivity }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">所属教研室：</span>
              <span class="info-value">{{ recordInfo.roomName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">活动时间：</span>
              <span class="info-value">{{ recordInfo.activityTime }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">会议方式：</span>
              <span class="info-value">{{ recordInfo.meetingMethod }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">形成时间：</span>
              <span class="info-value">{{ recordInfo.formedTime }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">记录来源：</span>
              <span class="info-value">{{ recordInfo.recordSource }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">当前去向：</span>
              <span class="info-value">{{ recordInfo.currentStatus }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">关键维度：</span>
              <span class="info-value">{{ recordInfo.keyDimension }}</span>
            </div>
          </div>
        </div>

        <!-- 主体两栏 -->
        <div class="two-column-layout">
          <!-- 左侧：记录正文 -->
          <div class="content-card content-card">
            <h2 class="card-title">记录正文</h2>
            <div class="record-content">
              <div class="content-section">
                <h3 class="section-title">会议纪要摘要</h3>
                <p class="content-text">{{ recordContent.summary }}</p>
              </div>

              <div class="content-section">
                <h3 class="section-title">主要讨论事项</h3>
                <ul class="content-list">
                  <li v-for="(item, index) in recordContent.mainTopics" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="content-section">
                <h3 class="section-title">任务分工</h3>
                <ul class="content-list">
                  <li v-for="(item, index) in recordContent.taskAssignment" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="content-section">
                <h3 class="section-title">阶段成果</h3>
                <ul class="content-list">
                  <li v-for="(item, index) in recordContent.stageResults" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 右侧：参与记录 -->
          <div class="content-card participation-card">
            <h2 class="card-title">参与记录</h2>
            <div class="participation-list">
              <div
                v-for="record in participationRecords"
                :key="record.id"
                class="participation-item"
              >
                <div class="participation-header">
                  <h4 class="teacher-name">{{ record.teacher }}</h4>
                </div>
                <div class="participation-details">
                  <div class="detail-row">
                    <span class="detail-label">参与方式：</span>
                    <span class="detail-value">{{ record.participationType }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">主要贡献：</span>
                    <span class="detail-value">{{ record.contribution }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">关联材料：</span>
                    <span class="detail-value">{{ record.relatedMaterials }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 来源资料表 -->
        <div class="content-card materials-card">
          <h2 class="card-title">来源资料</h2>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>资料名称</th>
                  <th>类型</th>
                  <th>来源</th>
                  <th>时间</th>
                  <th>说明</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="material in sourceMaterials" :key="material.id">
                  <td>{{ material.name }}</td>
                  <td>{{ material.type }}</td>
                  <td>{{ material.source }}</td>
                  <td>{{ material.time }}</td>
                  <td>{{ material.description }}</td>
                  <td>
                    <button class="btn-view" @click="viewMaterial(material.id)">
                      查看
                    </button>
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

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
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

.record-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-section {
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.content-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-primary);
}

.content-list {
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-primary);
}

.content-list li {
  margin-bottom: 8px;
}

.content-list li:last-child {
  margin-bottom: 0;
}

.participation-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.participation-item {
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid var(--color-card-border);
}

.participation-header {
  margin-bottom: 12px;
}

.teacher-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.participation-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  font-size: 13px;
}

.detail-label {
  color: var(--color-text-secondary);
  font-weight: 500;
  min-width: 80px;
}

.detail-value {
  color: var(--color-text-primary);
  flex: 1;
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

@media (max-width: 1024px) {
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

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
