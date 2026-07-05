<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AdminInput, AdminTable, AdminTableColumn } from '@/components/admin-ui'
import { StatusBadge } from '@/components/common'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import processingHeroArt from '@/assets/admin/archive-processing-assets/archive-processing-hero-art.png'
import processingHeroEmblem from '@/assets/admin/archive-processing-assets/archive-processing-hero-emblem.svg'
import iconStatusArchived from '@/assets/admin/archive-processing-assets/icons/icon-status-archived.svg'
import iconStatusException from '@/assets/admin/archive-processing-assets/icons/icon-status-exception.svg'
import iconStatusPendingComplete from '@/assets/admin/archive-processing-assets/icons/icon-status-pending-complete.svg'
import iconStatusPendingConfirm from '@/assets/admin/archive-processing-assets/icons/icon-status-pending-confirm.svg'
import iconStatusPendingVerify from '@/assets/admin/archive-processing-assets/icons/icon-status-pending-verify.svg'
import iconStatusWithdrawing from '@/assets/admin/archive-processing-assets/icons/icon-status-withdrawing.svg'
import iconSourceAll from '@/assets/admin/archive-processing-assets/icons/icon-source-all.svg'
import iconSourceDepartmentUpload from '@/assets/admin/archive-processing-assets/icons/icon-source-department-upload.svg'
import iconSourceDevelopment from '@/assets/admin/archive-processing-assets/icons/icon-source-development.svg'
import iconSourcePublicCollection from '@/assets/admin/archive-processing-assets/icons/icon-source-public-collection.svg'
import iconSourceResearchReport from '@/assets/admin/archive-processing-assets/icons/icon-source-research-report.svg'
import iconSourceTeachingResearch from '@/assets/admin/archive-processing-assets/icons/icon-source-teaching-research.svg'
import {
  createArchiveProcessingRecordDetail,
  getArchiveProcessingMock,
} from '@/services/mock/archive'
import {
  confirmArchiveRecord,
  getArchiveState,
  markArchiveRecordException,
  returnArchiveRecord,
  type ArchiveProcessingRecord,
} from '@/stores/admin/archiveStore'

const router = useRouter()
const route = useRoute()
const archiveState = getArchiveState()
const { sourceOptions: archiveSourceOptions } = getArchiveProcessingMock()

const archiveStatusIconMap = {
  待确认: iconStatusPendingConfirm,
  待检验: iconStatusPendingVerify,
  待补充: iconStatusPendingComplete,
  异常待处理: iconStatusException,
  拟退中: iconStatusWithdrawing,
  已入档: iconStatusArchived,
} as const

const sourceIconMap: Record<string, string> = {
  全部来源: iconSourceAll,
  发展活动: iconSourceDevelopment,
  部门上报: iconSourceDepartmentUpload,
  教研成果: iconSourceTeachingResearch,
  公开征集: iconSourcePublicCollection,
  科研申报: iconSourceResearchReport,
}

// 统计数据
const statCards = computed(() => [
  { label: '待确认', value: countByStatus('待确认'), tone: 'confirm', iconSrc: archiveStatusIconMap.待确认 },
  { label: '待检验', value: countByStatus('待检验'), tone: 'verify', iconSrc: archiveStatusIconMap.待检验 },
  { label: '待补充', value: countByStatus('待补充'), tone: 'supplement', iconSrc: archiveStatusIconMap.待补充 },
  { label: '异常待处理', value: countByStatus('异常待处理'), tone: 'exception', iconSrc: archiveStatusIconMap.异常待处理 },
  { label: '拟退中', value: countByStatus('拟退中'), tone: 'returning', iconSrc: archiveStatusIconMap.拟退中 },
])

// 筛选条件
const statusFilter = ref('全部待处理')
const sourceFilter = ref('全部来源')

const statusOptions = computed(() => [
  { label: '全部待处理', value: '全部待处理', count: archiveState.processingRecords.filter(record => record.status !== '已入档').length },
  { label: '待确认', value: '待确认', count: countByStatus('待确认') },
  { label: '待检验', value: '待检验', count: countByStatus('待检验') },
  { label: '待补充', value: '待补充', count: countByStatus('待补充') },
  { label: '异常待处理', value: '异常待处理', count: countByStatus('异常待处理') },
  { label: '拟退中', value: '拟退中', count: countByStatus('拟退中') },
  { label: '已入档', value: '已入档', count: countByStatus('已入档') },
])

const sourceOptions = computed(() => {
  return [
    { label: '全部来源', value: '全部来源', iconSrc: iconSourceAll, count: archiveState.processingRecords.length },
    ...archiveSourceOptions.map(source => ({
      label: source,
      value: source,
      iconSrc: sourceIconMap[source] ?? iconSourceAll,
      count: archiveState.processingRecords.filter(record => record.source === source).length,
    })),
  ]
})

// 选中的记录详情
const searchKeyword = ref('')
const selectedRecordId = ref(String(route.query.recordId || '2'))

const processingRecords = computed(() => {
  return archiveState.processingRecords.filter(record => {
    const matchesStatus = statusFilter.value === '全部待处理'
      ? record.status !== '已入档'
      : record.status === statusFilter.value
    const matchesSource = sourceFilter.value === '全部来源' || record.source === sourceFilter.value
    const matchesKeyword = !searchKeyword.value
      || record.name.includes(searchKeyword.value)
      || record.teacher.includes(searchKeyword.value)
    return matchesStatus && matchesSource && matchesKeyword
  })
})

const selectedRecord = computed(() => {
  return archiveState.processingRecords.find(record => record.id === selectedRecordId.value)
    ?? processingRecords.value[0]
    ?? null
})

const recordDetail = computed(() => {
  if (!selectedRecord.value) return null
  return createArchiveProcessingRecordDetail(selectedRecord.value)
})

function selectRecord(record: ArchiveProcessingRecord) {
  selectedRecordId.value = record.id
}

function goToImport() {
  router.push('/admin/archive/import')
}

function confirmArchive() {
  if (selectedRecord.value) confirmArchiveRecord(selectedRecord.value.id)
}

function returnRecord() {
  if (selectedRecord.value) returnArchiveRecord(selectedRecord.value.id)
}

function markException() {
  if (selectedRecord.value) markArchiveRecordException(selectedRecord.value.id)
}

function viewSupplement() {
  archiveState.operationMessage = selectedRecord.value
    ? `${selectedRecord.value.name} 的补充说明已在待处理问题中展示。`
    : '请先选择一条处理记录。'
}

function countByStatus(status: ArchiveProcessingRecord['status']) {
  return archiveState.processingRecords.filter(record => record.status === status).length
}

function recordRowClassName({ row }: { row: ArchiveProcessingRecord }) {
  return selectedRecord.value?.id === row.id ? 'record-row selected' : 'record-row'
}
</script>

<template>
  <AdminLayout active-key="archive-processing">
    <div class="archive-processing-page">
      <section class="processing-hero admin-hero">
        <div
          class="hero-art"
          :style="{ backgroundImage: `url(${processingHeroArt})` }"
          aria-hidden="true"
        />

        <div class="hero-content">
          <div class="hero-emblem" aria-hidden="true">
            <img class="hero-emblem-img" :src="processingHeroEmblem" alt="" />
          </div>

          <div class="hero-main">
            <h1>档案处理</h1>
            <p>处理尚未形成正式档案事项的记录，确认其进入档案查询，并可按查看、筛选需求对接和综合利用。</p>

            <div class="stats-strip">
              <div
                v-for="card in statCards"
                :key="card.label"
                class="stat-card"
                :class="card.tone"
              >
                <span class="stat-icon" aria-hidden="true">
                  <img class="stat-icon-img" :src="card.iconSrc" alt="" />
                </span>
                <span class="stat-text">{{ card.label }}</span>
                <strong>{{ card.value }}</strong>
              </div>
            </div>

            <div class="hero-tip">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="7" />
                <path d="M10 6v5M10 14h.01" />
              </svg>
              <span>发展活动中已完成确认的记录将直接入档，不在此处重复处理。</span>
            </div>
            <div v-if="archiveState.operationMessage" class="hero-tip operation-tip">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="7" />
                <path d="M7 10l2 2 4-4" />
              </svg>
              <span>{{ archiveState.operationMessage }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 主体三栏布局 -->
      <section class="main-content">
        <!-- 左侧：筛选条件 -->
        <aside class="filter-sidebar">
          <h2 class="panel-title">筛选条件</h2>
          <div class="filter-group">
            <h3 class="filter-title">处理状态</h3>
            <ul class="filter-list">
              <li
                v-for="option in statusOptions"
                :key="option.value"
                class="filter-item"
                :class="{ active: statusFilter === option.value }"
                @click="statusFilter = option.value"
              >
                <span class="filter-dot" aria-hidden="true"></span>
                <span class="filter-label">{{ option.label }}</span>
                <span class="filter-count">{{ option.count }}</span>
              </li>
            </ul>
          </div>

          <div class="filter-group">
            <h3 class="filter-title">来源类型</h3>
            <ul class="filter-list">
              <li
                v-for="option in sourceOptions"
                :key="option.value"
                class="filter-item"
                :class="{ active: sourceFilter === option.value }"
                @click="sourceFilter = option.value"
              >
                <img class="filter-icon" :src="option.iconSrc" alt="" />
                <span class="filter-label">{{ option.label }}</span>
                <span class="filter-count">{{ option.count }}</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- 中间：处理记录列表 -->
        <main class="records-list">
          <div class="list-header">
            <h2 class="list-title">处理记录列表</h2>
            <div class="search-box">
              <AdminInput
                v-model="searchKeyword"
                class="search-input"
                placeholder="搜索记录名称 / 教师姓名"
              />
            </div>
          </div>

          <div class="filter-summary">
            <span class="filter-text">当前筛选：</span>
            <span class="filter-link">{{ statusFilter }}</span>
            <span class="filter-separator">|</span>
            <span class="filter-link">{{ sourceFilter }}</span>
            <span class="filter-separator">|</span>
            <span class="filter-text">共 {{ processingRecords.length }} 条</span>
          </div>

          <div class="records-table">
            <AdminTable
              class="admin-table"
              :data="processingRecords"
              :row-class-name="recordRowClassName"
              @row-click="selectRecord"
            >
              <AdminTableColumn prop="name" label="记录名称" min-width="180">
                <template #default="{ row }">
                  <span class="record-name">{{ row.name }}</span>
                </template>
              </AdminTableColumn>
              <AdminTableColumn prop="teacher" label="关联教师" min-width="100" />
              <AdminTableColumn prop="dimension" label="建议归档维度" min-width="130" />
              <AdminTableColumn prop="source" label="来源" min-width="100" />
              <AdminTableColumn label="当前状态" min-width="110">
                <template #default="{ row }">
                  <StatusBadge :status="row.status" />
                </template>
              </AdminTableColumn>
              <AdminTableColumn prop="updateTime" label="更新时间" min-width="110">
                <template #default="{ row }">
                  <span class="update-time">{{ row.updateTime }}</span>
                </template>
              </AdminTableColumn>
            </AdminTable>
          </div>
        </main>

        <!-- 右侧：记录详情 -->
        <aside class="record-detail" v-if="recordDetail">
          <div class="detail-header">
            <span class="detail-eyebrow">记录详情</span>
            <div class="detail-heading-row">
              <h2 class="detail-title">{{ selectedRecord?.name }}</h2>
              <StatusBadge v-if="selectedRecord" :status="selectedRecord.status" />
            </div>
          </div>

          <div class="detail-content">
            <!-- 记录信息 -->
            <div class="detail-section">
              <h3 class="section-title">记录信息</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">关联教师：</span>
                  <span class="info-value">{{ recordDetail.teacher }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">建议归档维度：</span>
                  <span class="info-value">{{ recordDetail.dimension }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">更新时间：</span>
                  <span class="info-value">{{ recordDetail.updateTime }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.courseName">
                  <span class="info-label">课程名称：</span>
                  <span class="info-value">{{ recordDetail.courseName }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.achievementType">
                  <span class="info-label">成果类型：</span>
                  <span class="info-value">{{ recordDetail.achievementType }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.projectTime">
                  <span class="info-label">立项时间：</span>
                  <span class="info-value">{{ recordDetail.projectTime }}</span>
                </div>
                <div class="info-item" v-if="recordDetail.achievementLevel">
                  <span class="info-label">成果级别：</span>
                  <span class="info-value">{{ recordDetail.achievementLevel }}</span>
                </div>
              </div>
            </div>

            <!-- 来源信息 -->
            <div class="detail-section">
              <h3 class="section-title">来源信息</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">来源：</span>
                  <span class="info-value">教务处上传</span>
                </div>
                <div class="info-item">
                  <span class="info-label">上传人：</span>
                  <span class="info-value">{{ recordDetail.uploader }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">上传批次：</span>
                  <span class="info-value">{{ recordDetail.uploadBatch }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">原始文件：</span>
                  <span class="info-value file-name">{{ recordDetail.originalFile }}</span>
                </div>
              </div>
            </div>

            <!-- 待处理问题 -->
            <div class="detail-section" v-if="recordDetail.issues.length > 0">
              <h3 class="section-title">待处理问题</h3>
              <ul class="issues-list">
                <li v-for="issue in recordDetail.issues" :key="issue" class="issue-item">
                  {{ issue }}
                </li>
              </ul>
            </div>

            <!-- 处理记录 -->
            <div class="detail-section">
              <h3 class="section-title">处理记录</h3>
              <ul class="history-list">
                <li v-for="record in recordDetail.processingHistory" :key="record" class="history-item">
                  {{ record }}
                </li>
              </ul>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="detail-actions">
            <Button class="detail-action-button" @click="confirmArchive">确认入档</Button>
            <Button class="detail-action-button" variant="secondary" @click="returnRecord">再次退回</Button>
            <Button class="detail-action-button" variant="danger" @click="markException">标记异常</Button>
            <Button class="detail-action-button" variant="outline" @click="viewSupplement">查看补充说明</Button>
          </div>
        </aside>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.archive-processing-page {
  min-height: 100vh;
  background: var(--color-page-bg);
}


/* 统计卡区域 */
.stats-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: var(--space-admin-2xl);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-admin-lg);
}

.stat-card {
  padding: var(--space-admin-xl);
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
  text-align: center;
}

.stat-card.warning {
  border-color: #f59e0b;
  background: #fffbeb;
}

.stat-card.info {
  border-color: #3b82f6;
  background: #eff6ff;
}

.stat-card.orange {
  border-color: #f97316;
  background: #fff7ed;
}

.stat-card.danger {
  border-color: #ef4444;
  background: #fef2f2;
}

.stat-card.slate {
  border-color: #64748b;
  background: #f8fafc;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: var(--space-admin-xs);
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 提示信息 */
.tip-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 16px;
}

.tip-banner {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
  padding: var(--space-admin-lg);
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: var(--radius-admin-panel);
}

.tip-icon {
  font-size: 20px;
}

.tip-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 主体三栏布局 */
.main-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 32px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 360px;
  gap: var(--space-admin-lg);
}

/* 左侧筛选条件 */
.filter-sidebar {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
  padding: var(--space-admin-xl);
}

.filter-group {
  margin-bottom: var(--space-admin-2xl);
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-title {
  margin: 0 0 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.16s ease;
}

.filter-item:hover {
  background: #f8fafc;
}

.filter-item.active {
  background: #eff6ff;
  color: var(--color-primary);
}

.filter-label {
  font-size: 14px;
  color: var(--color-text-primary);
}

.filter-count {
  font-size: 13px;
  color: var(--color-text-hint);
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: var(--radius-lg);
}

/* 主操作区 */
.main-actions-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 16px;
}

.main-actions-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-admin-xs);
  padding: 12px 20px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-admin-panel);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s ease;
}

.action-btn:hover {
  background: #28a38a;
}

/* 中间记录列表 */
.records-list {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
  padding: var(--space-admin-xl);
  min-width: 0;
  overflow: hidden;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-admin-lg);
}

.list-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.search-box {
  width: 280px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  outline: none;
  transition: border 0.16s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.filter-summary {
  margin-bottom: var(--space-admin-lg);
  padding: var(--space-admin-md);
  background: #f8fafc;
  border-radius: var(--radius-sm);
  font-size: 13px;
}

.filter-text {
  color: var(--color-text-secondary);
}

.records-table {
  min-width: 0;
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th {
  padding: var(--space-admin-md);
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-card-border);
  white-space: nowrap;
}

.admin-table td {
  padding: var(--space-admin-md);
  font-size: 14px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-card-border);
}

:deep(.record-row) {
  cursor: pointer;
  transition: background 0.16s ease;
}

:deep(.record-row:hover) {
  background: #f8fafc;
}

:deep(.record-row.selected) {
  background: #eff6ff;
}

.record-name {
  font-weight: 500;
  color: var(--color-primary);
}

.update-time {
  font-size: 13px;
  color: var(--color-text-hint);
}

/* 右侧记录详情 */
.record-detail {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
  padding: var(--space-admin-xl);
  display: flex;
  flex-direction: column;
}

.detail-header {
  margin-bottom: var(--space-admin-xl);
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-card-border);
}

.detail-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.detail-content {
  flex: 1;
  overflow-y: auto;
}

.detail-section {
  margin-bottom: var(--space-admin-xl);
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-item {
  display: flex;
  padding: 8px 0;
  font-size: 14px;
}

.info-label {
  color: var(--color-text-secondary);
  min-width: 120px;
}

.info-value {
  color: var(--color-text-primary);
  flex: 1;
}

.file-name {
  color: var(--color-primary);
  cursor: pointer;
}

.file-name:hover {
  text-decoration: underline;
}

.issues-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.issue-item {
  padding: 8px 12px;
  margin-bottom: 6px;
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
  font-size: 13px;
  color: var(--color-text-primary);
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  padding: 8px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  border-bottom: 1px dashed var(--color-card-border);
}

.history-item:last-child {
  border-bottom: none;
}

/* 操作按钮 */
.detail-actions {
  margin-top: var(--space-admin-xl);
  padding-top: 20px;
  border-top: 1px solid var(--color-card-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-admin-md);
}

/* 精修版：对齐“档案处理”目标图 */
.archive-processing-page {
  display: flex;
  min-height: calc(100vh - var(--admin-topbar-height) - var(--admin-page-gutter-y) * 2);
  flex-direction: column;
  gap: clamp(14px, 1vw, 18px);
  background: transparent;
}

.processing-hero {
  min-height: clamp(226px, 15.2vw, 258px);
}

.processing-hero::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(247, 251, 255, 1) 0%,
    rgba(247, 251, 255, 0.98) 46%,
    rgba(247, 251, 255, 0.82) 63%,
    rgba(247, 251, 255, 0.28) 82%,
    rgba(247, 251, 255, 0) 100%
  );
  content: '';
}

.hero-art {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: min(45%, 650px);
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: cover;
  opacity: 0.84;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: clamp(226px, 15.2vw, 258px);
  align-items: flex-start;
  gap: clamp(24px, 1.6vw, 34px);
  padding: clamp(28px, 1.9vw, 36px) clamp(30px, 2vw, 42px) 18px;
}

.hero-emblem {
  display: flex;
  width: clamp(72px, 5vw, 92px);
  height: clamp(72px, 5vw, 92px);
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: linear-gradient(145deg, #eaf3ff 0%, #cfe3ff 100%);
  box-shadow: 0 18px 34px rgba(11, 99, 246, 0.18);
}

.hero-emblem-img {
  width: 58%;
  height: 58%;
  object-fit: contain;
}

.hero-main {
  width: min(1030px, 76%);
  min-width: 0;
}

.hero-main h1 {
  margin: 0 0 8px;
  color: var(--color-text-primary);
  font-size: clamp(23px, 1.45vw, 28px);
  font-weight: 950;
  line-height: 1.18;
}

.hero-main p {
  margin: 0;
  max-width: 840px;
  color: var(--color-text-secondary);
  font-size: clamp(13px, 0.76vw, 14px);
  font-weight: 700;
  line-height: 1.55;
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));
  gap: clamp(12px, 0.8vw, 16px);
  margin-top: clamp(20px, 1.35vw, 26px);
}

.stat-card {
  display: grid;
  min-height: clamp(70px, 4.6vw, 82px);
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: var(--space-admin-md);
  border: 1px solid rgba(213, 226, 245, 0.92);
  border-radius: var(--radius-admin-panel);
  background: rgba(255, 255, 255, 0.86);
  padding: 0 clamp(14px, 1vw, 18px);
  box-shadow: 0 10px 26px rgba(28, 68, 128, 0.06);
  text-align: left;
}

.stat-icon {
  display: flex;
  width: clamp(42px, 2.7vw, 50px);
  height: clamp(42px, 2.7vw, 50px);
  grid-row: span 2;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.stat-icon-img {
  width: 25px;
  height: 25px;
  object-fit: contain;
}

.stat-card.confirm .stat-icon {
  background: #eaf3ff;
  color: #0b63f6;
}

.stat-card.verify .stat-icon {
  background: #eafbf0;
  color: #21a957;
}

.stat-card.supplement .stat-icon {
  background: #fff2e6;
  color: #ff8a1f;
}

.stat-card.exception .stat-icon {
  background: #fff0f0;
  color: #ff3b3b;
}

.stat-card.returning .stat-icon {
  background: #f2ecff;
  color: #7257ff;
}

.stat-text {
  align-self: end;
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 800;
}

.stat-card strong {
  align-self: start;
  color: var(--color-text-primary);
  font-size: clamp(25px, 1.55vw, 30px);
  font-weight: 950;
  line-height: 1.05;
}

.hero-tip {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  margin-top: clamp(16px, 1vw, 20px);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 700;
}

.hero-tip svg {
  width: 18px;
  height: 18px;
  flex: none;
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.main-content {
  display: grid;
  grid-template-columns: minmax(215px, 14.5%) minmax(0, 1fr) minmax(360px, 30%);
  gap: clamp(14px, 1vw, 18px);
  align-items: stretch;
  max-width: none;
  margin: 0;
  padding: 0;
}

.filter-sidebar,
.records-list,
.record-detail {
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  background: #fff;
  padding: clamp(16px, 1vw, 20px);
  box-shadow: var(--shadow-card);
}

.panel-title {
  margin: 0 0 16px;
  color: var(--color-text-primary);
  font-size: 17px;
  font-weight: 950;
  line-height: 1.25;
}

.filter-group {
  margin-bottom: 22px;
}

.filter-title {
  margin: 0 0 9px;
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 950;
}

.filter-item {
  display: grid;
  min-height: 31px;
  grid-template-columns: 18px minmax(0, 1fr) auto;
  align-items: center;
  border-radius: 7px;
  padding: 0 8px;
}

.filter-item.active {
  background: #eaf3ff;
}

.filter-dot {
  width: 9px;
  height: 9px;
  border: 2px solid #8eb6ff;
  border-radius: 4px;
  background: #fff;
}

.filter-item.active .filter-dot {
  border-color: var(--color-primary);
  background: var(--color-primary);
}

.filter-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.filter-label {
  min-width: 0;
  overflow: hidden;
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filter-item.active .filter-label {
  color: var(--color-primary);
}

.filter-count {
  min-width: 27px;
  padding: 0 7px;
  border-radius: var(--radius-lg);
  font-size: 12px;
  font-weight: 800;
  line-height: 20px;
  text-align: center;
}

.records-list {
  min-width: 0;
  overflow: hidden;
}

.list-header {
  gap: var(--space-admin-lg);
  margin-bottom: 14px;
}

.list-title,
.detail-eyebrow {
  color: var(--color-text-primary);
  font-size: 17px;
  font-weight: 950;
}

.search-box {
  position: relative;
  width: min(260px, 36%);
}

.search-input {
  padding: 8px 13px 8px 34px;
  font-size: 13px;
}

.search-box::before {
  position: absolute;
  left: 13px;
  top: 50%;
  width: 13px;
  height: 13px;
  border: 2px solid #8a9bb4;
  border-radius: 50%;
  transform: translateY(-50%);
  content: '';
}

.search-box::after {
  position: absolute;
  left: 24px;
  top: calc(50% + 5px);
  width: 7px;
  height: 2px;
  border-radius: 2px;
  background: #8a9bb4;
  transform: rotate(45deg);
  content: '';
}

.filter-summary {
  display: flex;
  align-items: center;
  gap: var(--space-admin-xs);
  margin-bottom: 14px;
  padding: 10px 12px;
  background: var(--color-admin-bg-soft);
}

.filter-text {
  color: var(--color-text-secondary);
  font-weight: 700;
}

.filter-link {
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 900;
}

.filter-separator {
  color: #9aa8bd;
}

.admin-table {
  table-layout: fixed;
}

.admin-table th {
  height: 42px;
  background: #f6f9fe;
  padding: 0 13px;
  font-size: 13px;
  font-weight: 950;
}

.admin-table td {
  height: 48px;
  border-bottom: 1px solid var(--color-card-border-soft);
  padding: 0 13px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
}

:deep(.record-row.selected) {
  background: #eef5ff;
  box-shadow: inset 3px 0 0 var(--color-primary);
}

.record-name {
  color: var(--color-primary);
  font-weight: 900;
}

.record-detail {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.detail-header {
  margin-bottom: 11px;
  padding-bottom: 11px;
}

.detail-eyebrow {
  display: block;
  margin-bottom: var(--space-admin-xs);
}

.detail-heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-admin-md);
}

.detail-title {
  font-size: 16px;
  font-weight: 950;
  line-height: 1.35;
}

.detail-content {
  overflow: visible;
}

.detail-section {
  margin-bottom: var(--space-admin-sm);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-card-border-soft);
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  position: relative;
  margin: 0 0 7px;
  padding-left: 12px;
  font-weight: 950;
}

.section-title::before {
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: var(--color-primary);
  transform: translateY(-50%);
  content: '';
}

.info-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px var(--space-admin-card-gap);
}

.info-item {
  min-width: 0;
  gap: 6px;
  padding: 0;
  font-size: 12px;
  line-height: 1.4;
}

.info-label {
  min-width: auto;
  flex: none;
  font-weight: 800;
}

.info-value {
  min-width: 0;
  font-weight: 800;
}

.issue-item {
  position: relative;
  margin-bottom: 3px;
  border: 0;
  background: transparent;
  padding: 0 0 0 12px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.42;
}

.issue-item::before {
  position: absolute;
  left: 0;
  top: 6px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ff8a1f;
  content: '';
}

.history-item {
  position: relative;
  border-bottom: 0;
  padding: 0 0 5px 22px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.38;
}

.history-item::before {
  position: absolute;
  left: 3px;
  top: 6px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 0 3px #eaf3ff;
  content: '';
}

.history-item::after {
  position: absolute;
  left: 6px;
  top: 15px;
  bottom: 0;
  width: 1px;
  background: #dbe7f8;
  content: '';
}

.history-item:last-child::after {
  display: none;
}

.detail-actions {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-admin-md);
  margin-top: var(--space-admin-xs);
  padding-top: 11px;
}

.detail-action-button {
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 950;
}

@media (max-width: 1440px) {
  .hero-main {
    width: min(980px, 82%);
  }

  .stats-strip {
    grid-template-columns: repeat(5, minmax(128px, 1fr));
  }

  .main-content {
    grid-template-columns: 200px minmax(0, 1fr) 340px;
  }

  .info-list {
    grid-template-columns: 1fr;
  }

  .detail-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1280px) {
  .hero-art {
    opacity: 0.34;
  }

  .hero-main {
    width: 100%;
  }

  .stats-strip {
    grid-template-columns: repeat(3, minmax(140px, 1fr));
  }

  .main-content {
    grid-template-columns: 190px minmax(0, 1fr);
  }

  .record-detail {
    grid-column: 1 / -1;
  }
}
</style>
