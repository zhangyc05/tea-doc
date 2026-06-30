<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

// 从路由参数获取计划ID
const planId = route.params.planId as string
const actionMessage = ref('')

// 计划详情数据
const planDetail = ref({
  name: '2026 年暑期数字化教学能力提升培训',
  direction: '数字化教学',
  target: '智能制造学院、电子信息学院相关教师',
  startDate: '2026-07-10',
  endDate: '2026-07-14',
  participation: '自主报名',
  status: '报名中',
  currentParticipants: 18,
  maxParticipants: 30,
  relatedDemand: '数字化教学能力提升需求',
  relatedResource: '职业教育数字化教学能力提升培训',
  description: '本次培训旨在提升教师的数字化教学能力，掌握现代教育技术和方法。',
  organization: '教师发展中心',
  provider: '省职业教育教师发展中心',
  applicationRequired: '需要',
  quota: 30,
  applicationStartDate: '2026-06-20',
  applicationEndDate: '2026-07-05',
  location: '教师发展中心 302 实训室',
  entry: '腾讯会议链接，开课前开放',
  schedule: [
    { date: '2026-07-10', content: '开班仪式，数字化教学理念介绍' },
    { date: '2026-07-11', content: '数字化教学工具实操训练' },
    { date: '2026-07-12', content: '在线教学设计与实施' },
    { date: '2026-07-13', content: '教学数据分析与应用' },
    { date: '2026-07-14', content: '总结交流，结业考核' },
  ],
  materialRequirements: ['培训总结', '培训证书'],
  recordDestination: '成长档案 / 个人发展维度',
})

const relatedDemands = [
  {
    direction: '数字化教学',
    source: '能力画像观察',
    target: '24 名教师',
    note: '课堂数据应用与数字资源建设需求集中',
  },
  {
    direction: 'AI 赋能课程建设',
    source: '教师主动提出',
    target: '8 名教师',
    note: '教师主动提出相关学习需求',
  },
]

const progressNodes = [
  { label: '计划创建', date: '2026-06-10', active: true },
  { label: '计划发布', date: '2026-06-18', active: true },
  { label: '报名截止', date: '2026-07-05', active: true },
  { label: '培训开始', date: '2026-07-10', active: false },
  { label: '培训结束', date: '2026-07-14', active: false },
]

// 参与教师数据
const participants = ref([
  {
    id: 'lin',
    name: '林老师',
    department: '智能制造学院',
    major: '机电一体化技术',
    applicationStatus: '已同意',
    participationStatus: '待开始',
    materialStatus: '—',
  },
  {
    id: 'chen',
    name: '陈老师',
    department: '电子信息学院',
    major: '软件技术',
    applicationStatus: '待处理',
    participationStatus: '待开始',
    materialStatus: '—',
  },
  {
    id: 'wang',
    name: '王老师',
    department: '智能制造学院',
    major: '工业机器人技术',
    applicationStatus: '已同意',
    participationStatus: '待开始',
    materialStatus: '—',
  },
  {
    id: 'zhao',
    name: '赵老师',
    department: '现代服务学院',
    major: '电子商务',
    applicationStatus: '已同意',
    participationStatus: '待开始',
    materialStatus: '—',
  },
])

function goBack() {
  router.push('/admin/training/plans')
}

function viewTeacherDetail(teacherId: string) {
  router.push(`/admin/archive/teacher/${teacherId}`)
}

function handleApplication(teacherId: string) {
  const participant = participants.value.find((item) => item.id === teacherId)
  if (!participant) return
  participant.applicationStatus = '已同意'
  actionMessage.value = `已同意 ${participant.name} 的培训申请`
}
</script>

<template>
  <AdminLayout active-key="training-plans">
    <div class="training-plan-detail-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <!-- 标题卡 -->
          <div class="title-card">
            <div class="title-main">
              <h1 class="main-title">{{ planDetail.name }}</h1>
              <div class="summary-info">
                <div class="info-item">
                  <span class="info-label">培训方向：</span>
                  <span class="info-value">{{ planDetail.direction }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">面向对象：</span>
                  <span class="info-value">{{ planDetail.target }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">培训时间：</span>
                  <span class="info-value">{{ planDetail.startDate }} 至 {{ planDetail.endDate }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">参与方式：</span>
                  <span class="info-value">{{ planDetail.participation }}</span>
                </div>
              </div>
            </div>
            <div class="title-stats">
              <div class="title-stat-card">
                <span class="title-stat-label">当前状态</span>
                <strong>{{ planDetail.status }}</strong>
              </div>
              <div class="title-stat-card">
                <span class="title-stat-label">参与情况</span>
                <strong>{{ planDetail.currentParticipants }} <em>/ {{ planDetail.maxParticipants }} 人</em></strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-section">
        <div class="detail-workspace">
          <!-- 左侧：主要内容 -->
          <div class="main-content">
            <!-- 计划基本信息 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">计划基本信息</h2>
              </div>
              <div class="card-body">
                <div class="info-grid">
                  <div class="info-row">
                    <span class="info-label">计划名称：</span>
                    <span class="info-value">{{ planDetail.name }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训方向：</span>
                    <span class="info-value">{{ planDetail.direction }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">面向对象：</span>
                    <span class="info-value">{{ planDetail.target }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">组织部门：</span>
                    <span class="info-value">{{ planDetail.organization }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训资源：</span>
                    <span class="info-value">{{ planDetail.relatedResource }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训机构：</span>
                    <span class="info-value">{{ planDetail.provider }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训时间：</span>
                    <span class="info-value">{{ planDetail.startDate }} 至 {{ planDetail.endDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">参与方式：</span>
                    <span class="info-value">{{ planDetail.participation }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">是否需要申请处理：</span>
                    <span class="info-value">{{ planDetail.applicationRequired }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">计划名额：</span>
                    <span class="info-value">{{ planDetail.quota }} 人</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">材料要求：</span>
                    <span class="info-value">{{ planDetail.materialRequirements.join('、') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 关联需求 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">关联需求</h2>
              </div>
              <div class="card-body">
                <p class="card-text">{{ planDetail.relatedDemand }} 32 条，来源：能力画像观察 24 条，教师主动提出 8 条，涉及院系：智能制造学院、电子信息学院。</p>
                <table class="demand-table">
                  <thead>
                    <tr>
                      <th>需求方向</th>
                      <th>需求来源</th>
                      <th>涉及对象</th>
                      <th>匹配说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="demand in relatedDemands" :key="demand.direction">
                      <td>{{ demand.direction }}</td>
                      <td>{{ demand.source }}</td>
                      <td>{{ demand.target }}</td>
                      <td>{{ demand.note }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 计划安排 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">计划安排</h2>
              </div>
              <div class="card-body">
                <div class="arrangement-grid">
                  <div class="info-row">
                    <span class="info-label">报名时间：</span>
                    <span class="info-value">{{ planDetail.applicationStartDate }} 至 {{ planDetail.applicationEndDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训地点：</span>
                    <span class="info-value">{{ planDetail.location }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训时间：</span>
                    <span class="info-value">{{ planDetail.startDate }} 至 {{ planDetail.endDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">线上入口：</span>
                    <span class="info-value">{{ planDetail.entry }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训方式：</span>
                    <span class="info-value">线上 + 线下</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 执行进度 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">执行进度</h2>
              </div>
              <div class="card-body">
                <div class="timeline">
                  <div
                    v-for="node in progressNodes"
                    :key="node.label"
                    class="timeline-node"
                    :class="{ active: node.active }"
                  >
                    <span class="timeline-dot"></span>
                    <strong>{{ node.label }}</strong>
                    <small>{{ node.date }}</small>
                  </div>
                </div>
                <p class="progress-note">培训结束后，教师在教师端确认总结并补充证书。</p>
              </div>
            </div>

            <!-- 参与教师 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">参与教师</h2>
              </div>
              <div class="card-body">
                <p v-if="actionMessage" class="action-message">{{ actionMessage }}</p>
                <table class="participants-table">
                  <thead>
                    <tr>
                      <th>教师</th>
                      <th>院系 / 专业</th>
                      <th>申请状态</th>
                      <th>参与状态</th>
                      <th>材料情况</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="participant in participants" :key="participant.id">
                      <td>{{ participant.name }}</td>
                      <td>{{ participant.department }} / {{ participant.major }}</td>
                      <td>
                        <span class="status-text" :class="participant.applicationStatus">{{ participant.applicationStatus }}</span>
                      </td>
                      <td>
                        <span class="status-text blue">{{ participant.participationStatus }}</span>
                      </td>
                      <td>{{ participant.materialStatus }}</td>
                      <td>
                        <button
                          class="btn-view"
                          @click="viewTeacherDetail(participant.id)"
                        >
                          查看
                        </button>
                        <button
                          v-if="participant.applicationStatus === '待处理'"
                          class="btn-handle"
                          @click="handleApplication(participant.id)"
                        >
                          处理
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 右侧：信息卡片 -->
          <div class="sidebar">
            <!-- 计划信息 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">计划信息</h3>
              <div class="sidebar-content">
                <div class="info-row">
                  <span class="info-label">培训方向：</span>
                  <span class="info-value">{{ planDetail.direction }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">面向对象：</span>
                  <span class="info-value">{{ planDetail.target }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">培训时间：</span>
                  <span class="info-value">{{ planDetail.startDate }} 至 {{ planDetail.endDate }}</span>
                </div>
              </div>
            </div>

            <!-- 参与情况 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">参与情况</h3>
              <div class="sidebar-content">
                <div class="participation-stat">
                  <div class="stat-number">{{ planDetail.currentParticipants }}</div>
                  <div class="stat-total">/ {{ planDetail.maxParticipants }} 人</div>
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{ width: (planDetail.currentParticipants / planDetail.maxParticipants * 100) + '%' }"
                  ></div>
                </div>
                <div class="stat-caption">报名进度 {{ Math.round(planDetail.currentParticipants / planDetail.maxParticipants * 100) }}%</div>
              </div>
            </div>

            <!-- 材料要求 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">材料要求</h3>
              <div class="sidebar-content">
                <div class="material-list">
                  <div
                    v-for="(material, index) in planDetail.materialRequirements"
                    :key="index"
                    class="material-item"
                  >
                    • {{ material }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 后续记录 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">后续记录</h3>
              <div class="sidebar-content">
                <p class="destination-text">
                  已进入{{ planDetail.recordDestination }}。
                </p>
                <p class="destination-text">
                  可用于个人培训经历记录、聘期要求对照和个人发展报告统计。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.training-plan-detail-page {
  min-height: 100vh;
  background: #f6f9ff;
}

.training-plan-detail-page *,
.training-plan-detail-page *::before,
.training-plan-detail-page *::after {
  box-sizing: border-box;
}

.page-header {
  padding: 24px 0 0;
}

.header-content {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
}

.breadcrumb-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #172b55;
  font-weight: 800;
}

.breadcrumb a {
  color: #172b55;
  text-decoration: none;
  transition: color 0.16s ease;
}

.breadcrumb a:hover {
  color: #0f5eef;
}

.breadcrumb .separator {
  color: #9aa9c0;
}

.breadcrumb .current {
  color: #0f5eef;
  font-weight: 800;
}

.btn-back {
  padding: 0;
  background: transparent;
  border: 0;
  color: #0f5eef;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-back:hover {
  color: #0c4fd0;
}

/* 标题卡 */
.title-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 28px;
  align-items: center;
  min-height: 132px;
  background: #fff;
  border-radius: 8px;
  padding: 24px 28px;
  border: 1px solid #d9e5f7;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.main-title {
  margin: 0 0 18px;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 900;
  color: #07183d;
}

.summary-info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 40px;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 0;
}

.info-label {
  font-size: 14px;
  color: #405985;
  flex: none;
}

.info-value {
  font-size: 14px;
  color: #172b55;
  font-weight: 700;
  min-width: 0;
}

.title-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.title-stat-card {
  min-height: 86px;
  padding: 18px 22px;
  border: 1px solid #d9e5f7;
  border-radius: 8px;
  background: #fff;
}

.title-stat-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #7586a6;
  font-weight: 700;
}

.title-stat-card strong {
  font-size: 26px;
  line-height: 1;
  color: #0f5eef;
  font-weight: 900;
}

.title-stat-card em {
  color: #7586a6;
  font-size: 20px;
  font-style: normal;
}

/* 主体内容区域 */
.main-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
  padding: 16px 0 32px;
}

.detail-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 376px;
  gap: 16px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.card-header {
  padding: 18px 20px 8px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 900;
  color: #07183d;
}

.card-body {
  padding: 10px 20px 18px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 34px;
}

.info-row {
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 0;
}

.card-text {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.75;
  color: #172b55;
}

.demand-table,
.participants-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d9e5f7;
  border-radius: 6px;
  overflow: hidden;
  table-layout: fixed;
}

.demand-table th,
.participants-table th {
  height: 34px;
  padding: 0 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  color: #31466f;
  border-right: 1px solid #e5edf8;
  border-bottom: 1px solid #d9e5f7;
  background: #f4f7fc;
}

.demand-table td,
.participants-table td {
  height: 36px;
  padding: 0 12px;
  font-size: 13px;
  line-height: 1.55;
  color: #172b55;
  border-right: 1px solid #e5edf8;
  border-bottom: 1px solid #e5edf8;
  text-align: center;
}

.demand-table th:last-child,
.demand-table td:last-child,
.participants-table th:last-child,
.participants-table td:last-child {
  border-right: 0;
}

.demand-table tr:last-child td,
.participants-table tr:last-child td {
  border-bottom: 0;
}

.arrangement-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 36px;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  position: relative;
  padding: 10px 20px 4px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 54px;
  right: 54px;
  top: 28px;
  height: 2px;
  background: #c8d8ef;
}

.timeline-node {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 7px;
  z-index: 1;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  margin-top: 13px;
  border-radius: 50%;
  background: #c8d8ef;
  box-shadow: 0 0 0 5px #fff;
}

.timeline-node.active .timeline-dot {
  background: #0f5eef;
}

.timeline-node strong {
  font-size: 13px;
  color: #172b55;
  font-weight: 800;
}

.timeline-node small {
  font-size: 13px;
  color: #7586a6;
}

.progress-note {
  margin: 14px 0 0;
  font-size: 14px;
  color: #172b55;
  line-height: 1.7;
}

.btn-view {
  padding: 0;
  background: transparent;
  color: #0f5eef;
  border: none;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: color 0.16s ease;
  margin-right: 10px;
}

.btn-view:hover {
  color: #0c4fd0;
}

.btn-handle {
  padding: 0;
  background: transparent;
  color: #f97316;
  border: 0;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-handle:hover {
  color: #c75a0b;
}

.status-text {
  font-weight: 800;
}

.status-text.已同意 {
  color: #0ca65f;
}

.status-text.待处理 {
  color: #f97316;
}

.status-text.blue {
  color: #0f5eef;
}

.action-message {
  margin: 0 0 10px;
  color: #0f5eef;
  font-size: 13px;
  font-weight: 800;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9e5f7;
  padding: 22px 20px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.sidebar-title {
  margin: 0 0 18px;
  font-size: 20px;
  font-weight: 900;
  color: #07183d;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sidebar .info-row {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  align-items: start;
  gap: 10px;
}

.participation-stat {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 32px;
  line-height: 1;
  font-weight: 900;
  color: #0f5eef;
}

.stat-total {
  font-size: 14px;
  color: #7586a6;
  font-weight: 800;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5edf8;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0f5eef;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.stat-caption {
  margin-top: 8px;
  font-size: 13px;
  color: #7586a6;
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.material-item {
  font-size: 14px;
  color: #172b55;
  padding-left: 8px;
}

.destination-text {
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 1.75;
  color: #172b55;
}

.destination-text:last-child {
  margin-bottom: 0;
}

@media (max-width: 1300px) {
  .header-content,
  .main-section {
    width: min(100% - 32px, 1500px);
  }

  .title-card {
    grid-template-columns: 1fr;
  }

  .detail-workspace {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .summary-info,
  .info-grid,
  .arrangement-grid,
  .title-stats,
  .sidebar {
    grid-template-columns: 1fr;
  }

  .card-body {
    overflow-x: auto;
  }

  .participants-table,
  .demand-table {
    min-width: 760px;
  }
}
</style>
