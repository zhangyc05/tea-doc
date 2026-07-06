<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useOperationMessage } from '@/lib/operationMessage'
import { getTrainingRecordDetailMock } from '@/services/mock/training'
import {
  getTrainingRecordById,
  getTrainingState,
  uploadTrainingCertificate,
} from '@/stores/admin/trainingStore'

const router = useRouter()
const route = useRoute()

// 从路由参数获取记录ID
const recordId = route.params.recordId as string
const operationMessage = useOperationMessage()
const trainingState = getTrainingState()
const recordDetail = computed(() => getTrainingRecordById(recordId) ?? trainingState.records[0])
const { learningRecords, trainingSummary, relatedRecords } = getTrainingRecordDetailMock()

// 证书材料
const certificateMaterials = computed(() => recordDetail.value?.materials ?? [])

function goBack() {
  router.push('/admin/training/records')
}

function uploadMaterial() {
  uploadTrainingCertificate(recordId)
  operationMessage.fromStore(trainingState)
}

function viewRelatedRecord(recordId: string) {
  router.push(`/admin/training/records/${recordId}`)
}

</script>

<template>
  <AdminLayout active-key="training-records">
    <div class="training-record-detail-page">
      <section class="page-header">
        <div class="header-content">
          <!-- 标题卡 -->
          <div class="title-card">
            <div class="title-icon" aria-hidden="true"></div>
            <div class="title-content">
              <div class="title-row">
                <h1 class="main-title">{{ recordDetail.planName }}</h1>
                <StatusBadge :status="recordDetail.materialStatus" />
              </div>
              <div class="summary-info">
                <div class="info-item">
                  <span class="info-value">{{ recordDetail.teacher }}</span>
                  <span class="info-divider">|</span>
                  <span class="info-value">{{ recordDetail.department }} / {{ recordDetail.major }}</span>
                </div>
                <div class="info-item">
                  <span class="info-value">{{ recordDetail.level }}</span>
                  <span class="info-divider">|</span>
                  <span class="info-value">{{ recordDetail.hours }}</span>
                  <span class="info-divider">|</span>
                  <span class="info-value">{{ recordDetail.startDate }} 至 {{ recordDetail.endDate }}</span>
                  <span class="info-divider">|</span>
                  <span class="info-label">培训机构：</span>
                  <span class="info-value">{{ recordDetail.institution }}</span>
                </div>
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
            <!-- 培训基本信息 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">培训基本信息</h2>
              </div>
              <div class="card-body">
                <div class="info-grid">
                  <div class="info-row">
                    <span class="info-label">培训名称：</span>
                    <span class="info-value">{{ recordDetail.planName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训机构：</span>
                    <span class="info-value">{{ recordDetail.institution }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训级别：</span>
                    <span class="info-value">{{ recordDetail.level }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训学时：</span>
                    <span class="info-value">{{ recordDetail.hours }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">培训时间：</span>
                    <span class="info-value">{{ recordDetail.startDate }} 至 {{ recordDetail.endDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">参与方式：</span>
                    <span class="info-value">{{ recordDetail.mode }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">记录来源：</span>
                    <span class="info-value">{{ recordDetail.source }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 学习记录 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">学习记录</h2>
              </div>
              <div class="card-body">
                <div class="learning-list">
                  <div
                    v-for="(record, index) in learningRecords"
                    :key="index"
                    class="learning-item"
                  >
                    <div class="learning-date">{{ record.date }}</div>
                    <div class="learning-content">{{ record.content }}</div>
                    <div class="learning-status">
                      <span class="timeline-dot"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 培训总结 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">培训总结</h2>
              </div>
              <div class="card-body">
                <p class="summary-text">{{ trainingSummary.content }}</p>
                <div class="submit-info">
                  <span class="submit-label">提交时间：</span>
                  <span class="submit-time">{{ trainingSummary.submitTime }}</span>
                </div>
              </div>
            </div>

            <!-- 证书材料 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">证书材料</h2>
                <Button size="sm" @click="uploadMaterial">
                  上传材料
                </Button>
              </div>
              <div class="card-body">
                <p v-if="operationMessage.text.value" class="material-message">{{ operationMessage.text.value }}</p>
                <AdminTable :data="certificateMaterials" empty-text="暂无证书材料">
                  <AdminTableColumn prop="name" label="材料名称" min-width="180" />
                  <AdminTableColumn label="状态" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.status" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn prop="uploadTime" label="上传时间" min-width="150" />
                </AdminTable>
              </div>
            </div>

            <!-- 相关培训记录 -->
            <div class="content-card">
              <div class="card-header">
                <h2 class="card-title">相关培训记录</h2>
              </div>
              <div class="card-body">
                <AdminTable :data="relatedRecords" row-key="id" empty-text="暂无相关培训记录">
                  <AdminTableColumn prop="name" label="记录名称" min-width="180" />
                  <AdminTableColumn prop="teacher" label="对象" min-width="90" />
                  <AdminTableColumn label="级别 / 学时" min-width="120">
                    <template #default="{ row }">
                      {{ row.level }} / {{ row.hours }}
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="材料情况" min-width="110">
                    <template #default="{ row }">
                      <StatusBadge :status="row.materialStatus" />
                    </template>
                  </AdminTableColumn>
                  <AdminTableColumn label="操作" min-width="90" fixed="right">
                    <template #default="{ row }">
                      <Button variant="ghost" size="sm" @click="viewRelatedRecord(row.id)">
                        查看
                      </Button>
                    </template>
                  </AdminTableColumn>
                </AdminTable>
              </div>
            </div>
          </div>

          <!-- 右侧：信息卡片 -->
          <div class="sidebar">
	            <!-- 记录信息 -->
	            <div class="sidebar-card">
	              <h3 class="sidebar-title">记录信息</h3>
	              <div class="sidebar-content">
	                <div class="info-row">
	                  <span class="info-label">记录来源：</span>
	                  <span class="info-value">{{ recordDetail.source }}</span>
	                </div>
	                <div class="info-row">
	                  <span class="info-label">形成方式：</span>
	                  <span class="info-value">{{ recordDetail.method }}</span>
	                </div>
	                <div class="info-row">
	                  <span class="info-label">更新时间：</span>
	                  <span class="info-value">{{ recordDetail.updateTime }}</span>
	                </div>
	              </div>
	            </div>

            <!-- 材料情况 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">材料情况</h3>
              <div class="sidebar-content">
                <div class="material-status-item">
                  <span class="material-label">培训总结：</span>
                  <span class="material-value completed">已提交</span>
                </div>
                <div class="material-status-item">
                  <span class="material-label">证书材料：</span>
                  <span class="material-value incomplete">待补充</span>
                </div>
                <div class="material-status-item">
                  <span class="material-label">学习证明：</span>
                  <span class="material-value completed">已上传</span>
                </div>
              </div>
            </div>

            <!-- 记录去向 -->
            <div class="sidebar-card">
              <h3 class="sidebar-title">记录去向</h3>
              <div class="sidebar-content">
                <p class="destination-text">
                  已进入{{ recordDetail.destination }}。
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
.training-record-detail-page {
  min-height: 100vh;
  background: var(--color-admin-bg);
}

.training-record-detail-page *,
.training-record-detail-page *::before,
.training-record-detail-page *::after {
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

.title-card {
  display: flex;
  align-items: center;
  gap: 22px;
  min-height: 132px;
  background: #fff;
  border-radius: var(--radius-admin-panel);
  padding: 24px 28px;
  border: 1px solid var(--color-admin-border-muted);
  box-shadow: var(--shadow-admin-card-soft);
}

.title-icon {
  flex: none;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #eaf2ff;
  position: relative;
}

.title-icon::before {
  content: '';
  position: absolute;
  left: 25px;
  top: 18px;
  width: 24px;
  height: 34px;
  border-radius: 5px;
  background: var(--color-admin-primary-hover);
}

.title-content {
  flex: 1;
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-admin-card-gap);
  margin-bottom: 14px;
}

.main-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 900;
  color: #07183d;
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-sm);
}

.info-item {
  display: flex;
  gap: var(--space-admin-xs);
  align-items: center;
  flex-wrap: wrap;
}

.info-label {
  font-size: 14px;
  color: var(--color-admin-text-subtle);
}

.info-value {
  font-size: 14px;
  color: var(--color-admin-text-title);
  font-weight: 700;
}

.info-value.status {
  color: #f97316;
  font-weight: 900;
}

.info-divider {
  color: #9aa9c0;
}

.main-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
  padding: 16px 0 34px;
}

.detail-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: var(--space-admin-lg);
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-lg);
  min-width: 0;
}

.content-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  overflow: hidden;
  box-shadow: var(--shadow-admin-card-soft);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 6px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: #07183d;
}

.card-body {
  padding: 12px 20px 18px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-admin-md) 36px;
}

.info-row {
  display: flex;
  gap: var(--space-admin-xs);
  align-items: center;
}

.summary-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-admin-text-title);
}

.submit-info {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--color-admin-divider);
  font-size: 13px;
  color: var(--color-admin-text-subtle);
}

.submit-label {
  font-weight: 600;
}

.submit-time {
  color: var(--color-admin-text-title);
}

.learning-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md-lg);
  padding-left: 6px;
}

.learning-item {
  display: grid;
  grid-template-columns: 110px 1fr 20px;
  gap: var(--space-admin-lg);
  align-items: start;
}

.learning-date {
  font-size: 13px;
  font-weight: 800;
  color: var(--color-admin-text-title);
}

.learning-content {
  font-size: 14px;
  color: var(--color-admin-text-title);
  line-height: 1.7;
}

.learning-status {
  display: flex;
  justify-content: center;
}

.timeline-dot {
  width: 9px;
  height: 9px;
  margin-top: 5px;
  border-radius: 50%;
  background: var(--color-admin-primary-hover);
  box-shadow: 0 0 0 5px #eaf2ff;
}

.material-table,
.related-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-admin-border-muted);
  border-radius: var(--radius-sm);
  overflow: hidden;
  table-layout: fixed;
}

.material-table :deep(.el-table__header .el-table__cell),
.related-table :deep(.el-table__header .el-table__cell) {
  height: 36px;
  padding: 0 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 900;
  color: #31466f;
  border-bottom: 1px solid var(--color-admin-border-muted);
  border-right: 1px solid var(--color-admin-divider);
  background: #f4f7fc;
}

.material-table :deep(.el-table__body .el-table__cell),
.related-table :deep(.el-table__body .el-table__cell) {
  height: 38px;
  padding: 0 12px;
  font-size: 13px;
  color: var(--color-admin-text-title);
  text-align: center;
  border-bottom: 1px solid var(--color-admin-divider);
  border-right: 1px solid var(--color-admin-divider);
}

.material-table :deep(.el-table__cell:last-child),
.related-table :deep(.el-table__cell:last-child) {
  border-right: 0;
}

.material-table :deep(.el-table__body tr:last-child .el-table__cell),
.related-table :deep(.el-table__body tr:last-child .el-table__cell) {
  border-bottom: none;
}

.material-message {
  margin: 0 0 10px;
  color: var(--color-admin-primary-hover);
  font-size: 13px;
  font-weight: 800;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-lg);
  min-width: 0;
}

.sidebar-card {
  background: #fff;
  border-radius: var(--radius-admin-panel);
  border: 1px solid var(--color-admin-border-muted);
  padding: 24px 22px;
  box-shadow: var(--shadow-admin-card-soft);
}

.sidebar-title {
  margin: 0 0 22px;
  font-size: 20px;
  font-weight: 900;
  color: #07183d;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-lg);
}

.sidebar .info-row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  align-items: start;
  gap: var(--space-admin-sm);
}

.material-status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-admin-divider);
}

.material-label {
  font-size: 14px;
  color: var(--color-admin-text-subtle);
}

.material-value {
  font-size: 14px;
  font-weight: 900;
}

.material-value.completed {
  color: #0ca65f;
}

.material-value.incomplete {
  color: #f97316;
}

.destination-text {
  margin: 0 0 10px;
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

  .detail-workspace {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .title-card {
    align-items: flex-start;
  }

  .title-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-grid,
  .sidebar {
    grid-template-columns: 1fr;
  }

  .card-body {
    overflow-x: auto;
  }

  .material-table,
  .related-table {
    min-width: 720px;
  }
}
</style>
