<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = useRouter()
const route = useRoute()

// 从路由参数获取计划ID
const planId = route.params.planId as string

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

// 参与教师数据
const participants = [
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
]

function goBack() {
  router.push('/admin/training/plans')
}

function viewTeacherDetail(teacherId: string) {
  console.log('查看教师详情', teacherId)
}

function handleApplication(teacherId: string) {
  console.log('处理申请', teacherId)
}
</script>

<template>
  <AdminLayout active-key="training-plans">
    <div class="training-plan-detail-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb-row">
            <div class="breadcrumb">
              <span>培训管理</span>
              <i class="separator">/</i>
              <span>
                <RouterLink to="/admin/training/plans">计划管理</RouterLink>
              </span>
              <i class="separator">/</i>
              <span class="current">计划详情</span>
            </div>
            <button class="btn-back" @click="goBack">
              返回列表
            </button>
          </div>

          <!-- 标题卡 -->
          <div class="title-card">
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
              <div class="info-item">
                <span class="info-label">当前状态：</span>
                <span class="info-value status">{{ planDetail.status }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">参与情况：</span>
                <span class="info-value">{{ planDetail.currentParticipants }} / {{ planDetail.maxParticipants }} 人</span>
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
                  <div class="info-row">
                    <span class="info-label">参与方式：</span>
                    <span class="info-value">{{ planDetail.participation }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">当前状态：</span>
                    <span class="info-value">{{ planDetail.status }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">参与情况：</span>
                    <span class="info-value">{{ planDetail.currentParticipants }} / {{ planDetail.maxParticipants }} 人</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">关联需求：</span>
                    <span class="info-value">{{ planDetail.relatedDemand }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">关联资源：</span>
                    <span class="info-value">{{ planDetail.relatedResource }}</span>
                  </div>
                </div>
                <div v-if="planDetail.description" class="description-section">
                  <div class="info-label">计划说明：</div>
                  <div class="description-text">{{ planDetail.description }}</div>
                </div>
              </div>
            </div>

            <!-- 关联需求 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">关联需求</h2>
              </div>
              <div class="card-body">
                <p class="card-text">{{ planDetail.relatedDemand }}</p>
              </div>
            </div>

            <!-- 计划安排 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">计划安排</h2>
              </div>
              <div class="card-body">
                <div class="schedule-list">
                  <div
                    v-for="(item, index) in planDetail.schedule"
                    :key="index"
                    class="schedule-item"
                  >
                    <div class="schedule-date">{{ item.date }}</div>
                    <div class="schedule-content">{{ item.content }}</div>
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
                <div class="progress-info">
                  <div class="progress-item">
                    <span class="progress-label">当前状态：</span>
                    <span class="progress-value">{{ planDetail.status }}</span>
                  </div>
                  <div class="progress-item">
                    <span class="progress-label">参与人数：</span>
                    <span class="progress-value">{{ planDetail.currentParticipants }} / {{ planDetail.maxParticipants }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 参与教师 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">参与教师</h2>
              </div>
              <div class="card-body">
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
                      <td>{{ participant.applicationStatus }}</td>
                      <td>{{ participant.participationStatus }}</td>
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

.breadcrumb-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.16s ease;
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 600;
}

.btn-back {
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-back:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* 标题卡 */
.title-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--color-card-border);
}

.main-title {
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.info-label {
  font-size: 13px;
  color: var(--color-text-hint);
}

.info-value {
  font-size: 13px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.info-value.status {
  color: var(--color-primary);
  font-weight: 600;
}

/* 主体内容区域 */
.main-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.detail-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-card-border);
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.card-body {
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.description-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-card-border);
}

.description-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.card-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.schedule-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.schedule-date {
  width: 100px;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
}

.schedule-content {
  flex: 1;
  font-size: 14px;
  color: var(--color-text-primary);
  line-height: 1.5;
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
}

.progress-label {
  color: var(--color-text-hint);
}

.progress-value {
  color: var(--color-text-primary);
  font-weight: 500;
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
}

.participants-table th {
  padding: 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
  background: #f8fafc;
}

.participants-table td {
  padding: 12px;
  font-size: 13px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

.participants-table tr:last-child td {
  border-bottom: none;
}

.btn-view {
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.16s ease;
  margin-right: 8px;
}

.btn-view:hover {
  background: #28a38a;
}

.btn-handle {
  padding: 6px 12px;
  background: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.btn-handle:hover {
  background: var(--color-primary);
  color: white;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.participation-stat {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-total {
  font-size: 14px;
  color: var(--color-text-hint);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.material-item {
  font-size: 13px;
  color: var(--color-text-secondary);
  padding-left: 8px;
}

.destination-text {
  margin: 0 0 8px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.destination-text:last-child {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .detail-workspace {
    grid-template-columns: 1fr;
  }
}
</style>