<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import { getTrainingPlanDetailMock } from '@/services/mock/training'
import {
  approveTrainingApplication,
  getTrainingPlanById,
} from '@/stores/admin/trainingStore'

const router = useRouter()
const route = useRoute()

// 从路由参数获取计划ID
const planId = route.params.planId as string
const operationMessage = useOperationMessage()

const planDetail = computed(() => getTrainingPlanById(planId) ?? getTrainingPlanById('summer-digital')!)
const {
  applicationStartDate,
  applicationEndDate,
  location,
  entry,
  schedule,
  materialRequirements,
  recordDestination,
  relatedDemands,
  progressNodes,
} = getTrainingPlanDetailMock()

const participants = computed(() => planDetail.value.participants)

function goBack() {
  router.push('/admin/training/plans')
}

function viewTeacherDetail(teacherId: string) {
  router.push(`/admin/archive/teacher/${teacherId}`)
}

function handleApplication(teacherId: string) {
  const participant = participants.value.find((item) => item.id === teacherId)
  if (!participant) return
  const applicationId = teacherId === 'lin' ? '1' : teacherId === 'chen' ? '2' : ''
  if (applicationId) approveTrainingApplication(applicationId)
  operationMessage.set(`已同意 ${participant.name} 的培训申请`)
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
              <span class="separator">/</span>
              <span>计划管理</span>
              <span class="separator">/</span>
              <span class="current">计划详情</span>
            </div>
          </div>
          <Button class="detail-back-action" variant="ghost" @click="goBack">‹ 返回列表</Button>

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
                    <span class="info-value">{{ materialRequirements.join('、') }}</span>
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
                <AdminTable :data="relatedDemands" row-key="direction" empty-text="暂无关联需求">
                  <AdminTableColumn prop="direction" label="需求方向" min-width="140" />
                  <AdminTableColumn prop="source" label="需求来源" min-width="140" />
                  <AdminTableColumn prop="target" label="涉及对象" min-width="160" />
                  <AdminTableColumn prop="note" label="匹配说明" min-width="220" />
                </AdminTable>
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
                    <span class="info-value">{{ applicationStartDate }} 至 {{ applicationEndDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训地点：</span>
                    <span class="info-value">{{ location }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训时间：</span>
                    <span class="info-value">{{ planDetail.startDate }} 至 {{ planDetail.endDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">线上入口：</span>
                    <span class="info-value">{{ entry }}</span>
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
                <p v-if="operationMessage.text.value" class="action-message">{{ operationMessage.text.value }}</p>
                <AdminTable :data="participants" row-key="id" empty-text="暂无参与教师">
                  <AdminTableColumn prop="name" label="教师" min-width="90" />
                  <AdminTableColumn label="院系 / 专业" min-width="170">
                    <template #default="{ row }">
                      {{ row.department }} / {{ row.major }}
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="申请状态" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.applicationStatus" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="参与状态" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.participationStatus" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="materialStatus" label="材料情况" min-width="120" />
                  <AdminTableColumn label="操作" min-width="150" fixed="right">
                    <template #default="{ row }">
                        <Button
                          variant="ghost"
                          size="sm"
                          @click="viewTeacherDetail(row.id)"
                        >
                          查看
                        </Button>
                        <Button
                          v-if="row.applicationStatus === '待处理'"
                          variant="secondary"
                          size="sm"
                          @click="handleApplication(row.id)"
                        >
                          处理
                        </Button>
                    </template>
                  </AdminTableColumn>
                </AdminTable>
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
                    v-for="(material, index) in materialRequirements"
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
                  已进入{{ recordDestination }}。
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
  background: var(--color-admin-bg);
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
  margin-bottom: var(--space-admin-lg);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  font-size: 14px;
  color: var(--color-admin-text-title);
  font-weight: 800;
}

.breadcrumb a {
  color: var(--color-admin-text-title);
  text-decoration: none;
  transition: color 0.16s ease;
}

.breadcrumb a:hover {
  color: var(--color-admin-primary-hover);
}

.breadcrumb .separator {
  color: #9aa9c0;
}

.breadcrumb .current {
  color: var(--color-admin-primary-hover);
  font-weight: 800;
}

.detail-back-action {
  display: inline-flex;
  align-items: center;
  margin-bottom: 14px;
  padding: 0;
  color: var(--color-admin-primary-hover);
  font-size: 14px;
  font-weight: 800;
}

.detail-back-action:hover {
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
  border-radius: var(--radius-admin-panel);
  padding: 24px 28px;
  border: 1px solid var(--color-admin-border-muted);
  box-shadow: var(--shadow-admin-card-soft);
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
  gap: var(--space-admin-sm) 40px;
}

.info-item {
  display: flex;
  gap: var(--space-admin-xs);
  align-items: center;
  min-width: 0;
}

.info-label {
  font-size: 14px;
  color: var(--color-admin-text-subtle);
  flex: none;
}

.info-value {
  font-size: 14px;
  color: var(--color-admin-text-title);
  font-weight: 700;
  min-width: 0;
}

.title-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-card-gap);
}

.title-stat-card {
  min-height: 86px;
  padding: 18px 22px;
  border: 1px solid var(--color-admin-border-muted);
  border-radius: var(--radius-admin-panel);
  background: #fff;
}

.title-stat-label {
  display: block;
  margin-bottom: var(--space-admin-xs);
  font-size: 14px;
  color: #7586a6;
  font-weight: 700;
}

.title-stat-card strong {
  font-size: 26px;
  line-height: 1;
  color: var(--color-admin-primary-hover);
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
  gap: var(--space-admin-lg);
}

.main-content {
  display: contents;
  min-width: 0;
}

.main-content > .content-card {
  grid-column: 1;
}

.main-content > .content-card:last-child {
  grid-column: 1 / -1;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-soft);
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
  gap: var(--space-admin-md) 34px;
}

.info-row {
  display: flex;
  gap: var(--space-admin-xs);
  align-items: center;
  min-width: 0;
}

.card-text {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-admin-text-title);
}

.demand-table,
.participants-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-admin-border-muted);
  border-radius: var(--radius-sm);
  overflow: hidden;
  table-layout: fixed;
}

.demand-table :deep(.el-table__header .el-table__cell),
.participants-table :deep(.el-table__header .el-table__cell) {
  height: 34px;
  padding: 0 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  color: #31466f;
  border-right: 1px solid var(--color-admin-divider);
  border-bottom: 1px solid var(--color-admin-border-muted);
  background: #f4f7fc;
}

.demand-table :deep(.el-table__body .el-table__cell),
.participants-table :deep(.el-table__body .el-table__cell) {
  height: 36px;
  padding: 0 12px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--color-admin-text-title);
  border-right: 1px solid var(--color-admin-divider);
  border-bottom: 1px solid var(--color-admin-divider);
  text-align: center;
}

.demand-table :deep(.el-table__cell:last-child),
.participants-table :deep(.el-table__cell:last-child) {
  border-right: 0;
}

.demand-table :deep(.el-table__body tr:last-child .el-table__cell),
.participants-table :deep(.el-table__body tr:last-child .el-table__cell) {
  border-bottom: 0;
}

.arrangement-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-admin-md) 36px;
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
  background: var(--color-admin-primary-hover);
}

.timeline-node strong {
  font-size: 13px;
  color: var(--color-admin-text-title);
  font-weight: 800;
}

.timeline-node small {
  font-size: 13px;
  color: #7586a6;
}

.progress-note {
  margin: 14px 0 0;
  font-size: 14px;
  color: var(--color-admin-text-title);
  line-height: 1.7;
}

.action-message {
  margin: 0 0 10px;
  color: var(--color-admin-primary-hover);
  font-size: 13px;
  font-weight: 800;
}

/* 侧边栏 */
.sidebar {
  grid-column: 2;
  grid-row: 1 / 5;
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-lg);
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  padding: 22px 20px;
  box-shadow: var(--shadow-admin-card-soft);
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
  gap: var(--space-admin-md-lg);
}

.sidebar .info-row {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  align-items: start;
  gap: var(--space-admin-sm);
}

.participation-stat {
  display: flex;
  align-items: baseline;
  gap: var(--space-admin-xs);
  margin-bottom: var(--space-admin-sm);
}

.stat-number {
  font-size: 32px;
  line-height: 1;
  font-weight: 900;
  color: var(--color-admin-primary-hover);
}

.stat-total {
  font-size: 14px;
  color: #7586a6;
  font-weight: 800;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-admin-divider);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-admin-primary-hover);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.stat-caption {
  margin-top: var(--space-admin-xs);
  font-size: 13px;
  color: #7586a6;
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-xs);
}

.material-item {
  font-size: 14px;
  color: var(--color-admin-text-title);
  padding-left: 8px;
}

.destination-text {
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-admin-text-title);
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
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: var(--space-admin-xl);
    padding: 22px 24px;
  }

  .detail-workspace {
    grid-template-columns: minmax(0, 1fr) 320px;
  }

  .sidebar {
    display: flex;
  }

  .sidebar-card {
    padding: 20px 18px;
  }

  .title-stat-card {
    padding: 16px 18px;
  }

  .title-stat-card strong {
    font-size: 24px;
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
