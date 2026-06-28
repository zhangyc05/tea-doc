<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { Button } from '@/components/ui'

interface BatchFile {
  id: string
  name: string
  type: 'Excel' | 'ZIP' | 'PDF'
  size: string
  status: '已接收' | '解析中' | '已解析' | '等待处理'
}

interface RecognitionResult {
  totalRecords: number
  pendingConfirm: number
  needSupplement: number
  needVerify: number
  exception: number
  duplicate: number
}

const route = useRoute()
const router = useRouter()

// 批次信息
const batchInfo = {
  name: '教务处教师发展资料_2026-06-20_01',
  submitter: '陈老师',
  submitTime: '2026-06-20 10:24',
  department: '教务处',
  period: '2026 年度',
}

// 当前状态：识别中或识别完成
const isCompleted = computed(() => route.query.status === 'completed')

// 步骤进度
const steps = computed(() => {
  if (isCompleted.value) {
    return [
      { label: '已接收上传文件', status: '已完成' },
      { label: '已解析文件内容', status: '已完成' },
      { label: '已识别教师信息', status: '已完成' },
      { label: '已判断建议归档维度', status: '已完成' },
      { label: '已检查缺失项与重复记录', status: '已完成' },
    ]
  } else {
    return [
      { label: '已接收上传文件', status: '已完成' },
      { label: '正在解析文件内容', status: '已完成' },
      { label: '正在识别教师信息', status: '处理中' },
      { label: '正在判断建议归档维度', status: '待进行' },
      { label: '正在检查缺失项与重复记录', status: '待进行' },
    ]
  }
})

// 批次文件
const batchFiles = computed<BatchFile[]>(() => {
  if (isCompleted.value) {
    return [
      {
        id: '1',
        name: '2026年度课程建设项目名单件名单.xlsx',
        type: 'Excel',
        size: '1.8MB',
        status: '已解析',
      },
      {
        id: '2',
        name: '精品课程建设立项材料.zip',
        type: 'ZIP',
        size: '24.6MB',
        status: '已解析',
      },
      {
        id: '3',
        name: '教学成果申报通知.pdf',
        type: 'PDF',
        size: '3.2MB',
        status: '已解析',
      },
      {
        id: '4',
        name: '教师培训证书扫描件.zip',
        type: 'ZIP',
        size: '18.4MB',
        status: '已解析',
      },
    ]
  } else {
    return [
      {
        id: '1',
        name: '2026年度课程建设项目名单件名单.xlsx',
        type: 'Excel',
        size: '1.8MB',
        status: '已接收',
      },
      {
        id: '2',
        name: '精品课程建设立项材料.zip',
        type: 'ZIP',
        size: '24.6MB',
        status: '解析中',
      },
      {
        id: '3',
        name: '教学成果申报通知.pdf',
        type: 'PDF',
        size: '3.2MB',
        status: '已解析',
      },
      {
        id: '4',
        name: '教师培训证书扫描件.zip',
        type: 'ZIP',
        size: '18.4MB',
        status: '等待处理',
      },
    ]
  }
})

// 识别结果
const recognitionResult = computed<RecognitionResult>(() => {
  if (isCompleted.value) {
    return {
      totalRecords: 36,
      pendingConfirm: 18,
      needSupplement: 7,
      needVerify: 6,
      exception: 3,
      duplicate: 2,
    }
  } else {
    return {
      totalRecords: 0,
      pendingConfirm: 0,
      needSupplement: 0,
      needVerify: 0,
      exception: 0,
      duplicate: 0,
    }
  }
})

function stepStatusClass(status: string) {
  if (status === '已完成') return 'completed'
  if (status === '处理中') return 'processing'
  return 'pending'
}

function fileStatusClass(status: BatchFile['status']) {
  const classMap = {
    '已接收': 'text-success',
    '解析中': 'text-warning',
    '已解析': 'text-success',
    '等待处理': 'text-neutral',
  }
  return classMap[status] || 'text-neutral'
}

function returnToProcessing() {
  router.push('/admin/archive/processing')
}

function refreshStatus() {
  router.push('/admin/archive/import/20260620-01?status=completed')
}

function confirmResult() {
  router.push('/admin/archive/processing')
}

function cancelTask() {
  console.log('取消本次任务')
}

function viewUploadedFiles() {
  console.log('查看上传文件')
}
</script>

<template>
  <AdminLayout active-key="archive-processing">
    <div class="archive-batch-detail-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>成长档案</span>
            <i class="separator">/</i>
            <span>档案处理</span>
            <i class="separator">/</i>
            <span>导入部门资料</span>
            <i class="separator">/</i>
            <span class="current">导入批次详情</span>
          </div>
          <h1>导入批次详情</h1>
        </div>
      </section>

      <!-- 批次信息 -->
      <section class="batch-info-section">
        <div class="batch-info-card">
          <h3 class="info-title">批次信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">批次名称：</span>
              <span class="info-value">{{ batchInfo.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">提交人：</span>
              <span class="info-value">{{ batchInfo.submitter }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">提交时间：</span>
              <span class="info-value">{{ batchInfo.submitTime }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">提交部门：</span>
              <span class="info-value">{{ batchInfo.department }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">所属周期：</span>
              <span class="info-value">{{ batchInfo.period }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 状态展示 -->
      <section class="status-section">
        <div class="status-content">
          <!-- 状态标题 -->
          <div class="status-header">
            <div class="status-indicator" :class="{ completed: isCompleted }">
              <div class="status-dot"></div>
            </div>
            <h2 class="status-title">{{ isCompleted ? '识别完成' : '识别中' }}</h2>
          </div>

          <!-- 说明 -->
          <div class="status-description">
            <template v-if="!isCompleted">
              <p>资料已提交，系统正在后台识别资料内容、关联教师和建议归档维度。识别完成后，需人工确认后才会生成待处理记录。</p>
            </template>
            <template v-else>
              <p>资料已识别完成，系统已整理资料内容、关联教师和建议归档维度。请确认识别结果后生成待处理记录。</p>
            </template>
          </div>

          <!-- 提示条 -->
          <div v-if="!isCompleted" class="tip-banner">
            <span class="tip-icon">ℹ️</span>
            <span class="tip-text">你可以先离开当前页面，识别完成后再回来查看结果。</span>
          </div>
          <div v-else class="tip-banner success">
            <span class="tip-icon">✓</span>
            <span class="tip-text">识别已完成，请查看识别结果并确认后生成待处理记录。</span>
          </div>
        </div>
      </section>

      <!-- 进度展示 -->
      <section class="progress-section">
        <div class="progress-content">
          <h3 class="section-title">当前进度</h3>
          <div class="steps-list">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="step-item"
              :class="stepStatusClass(step.status)"
            >
              <div class="step-indicator">
                <div class="step-dot"></div>
                <div v-if="index < steps.length - 1" class="step-line"></div>
              </div>
              <div class="step-content">
                <span class="step-label">{{ step.label }}</span>
                <span class="step-status">{{ step.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 本批次文件 -->
      <section class="files-section">
        <div class="files-content">
          <h3 class="section-title">本批次文件</h3>
          <div class="files-list">
            <div v-for="file in batchFiles" :key="file.id" class="file-item">
              <div class="file-info">
                <div class="file-name">{{ file.name }}</div>
                <div class="file-meta">{{ file.type }} | {{ file.size }}</div>
              </div>
              <div class="file-status" :class="fileStatusClass(file.status)">
                {{ file.status }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 识别结果 -->
      <section class="result-section">
        <div class="result-content">
          <h3 class="section-title">识别结果</h3>
          <div v-if="!isCompleted" class="result-placeholder">
            <p class="placeholder-text">系统正在整理本批次资料，识别完成后将在这里展示结果。</p>
            <div class="result-stats">
              <div class="stat-item">
                <span class="stat-label">可生成待确认记录</span>
                <span class="stat-value">--</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">需要补充</span>
                <span class="stat-value">--</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">需要核验</span>
                <span class="stat-value">--</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">异常待处理</span>
                <span class="stat-value">--</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">疑似重复</span>
                <span class="stat-value">--</span>
              </div>
            </div>
          </div>
          <div v-else class="result-data">
            <p class="result-summary">共识别出 {{ recognitionResult.totalRecords }} 条教师相关记录</p>
            <div class="result-stats">
              <div class="stat-item success">
                <span class="stat-label">可生成待确认记录</span>
                <span class="stat-value">{{ recognitionResult.pendingConfirm }}</span>
              </div>
              <div class="stat-item warning">
                <span class="stat-label">需要补充</span>
                <span class="stat-value">{{ recognitionResult.needSupplement }}</span>
              </div>
              <div class="stat-item info">
                <span class="stat-label">需要核验</span>
                <span class="stat-value">{{ recognitionResult.needVerify }}</span>
              </div>
              <div class="stat-item danger">
                <span class="stat-label">异常待处理</span>
                <span class="stat-value">{{ recognitionResult.exception }}</span>
              </div>
              <div class="stat-item slate">
                <span class="stat-label">疑似重复</span>
                <span class="stat-value">{{ recognitionResult.duplicate }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 处理说明 -->
      <section class="instructions-section">
        <div class="instructions-content">
          <div class="instructions-card">
            <h3 class="instructions-title">处理说明</h3>
            <ul class="instructions-list">
              <li class="instruction-item">
                <span class="instruction-text">
                  {{ isCompleted ? '资料识别已完成，尚未直接写入教师档案。' : '资料识别在后台进行，不会直接写入教师档案。' }}
                </span>
              </li>
              <li class="instruction-item">
                <span class="instruction-text">
                  {{ isCompleted ? '请先确认识别结果，再生成待处理记录。' : '识别完成后，需人工确认后才会生成待处理记录。' }}
                </span>
              </li>
              <li class="instruction-item">
                <span class="instruction-text">
                  {{ isCompleted ? '生成待处理记录后，可在档案处理工作台继续处理。' : '如部分文件暂时无法识别，系统会先处理其余资料。' }}
                </span>
              </li>
              <li class="instruction-item" v-if="isCompleted">
                <span class="instruction-text">如发现识别不准确，可在下一步中调整。</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 底部操作按钮 -->
      <section class="actions-section">
        <button class="btn-secondary" @click="returnToProcessing">返回档案处理</button>
        <button v-if="!isCompleted" class="btn-outline" @click="cancelTask">取消本次任务</button>
        <button v-if="!isCompleted" class="btn-primary" @click="refreshStatus">刷新状态</button>
        <button v-if="isCompleted" class="btn-outline" @click="viewUploadedFiles">查看上传文件</button>
        <button v-if="isCompleted" class="btn-primary" @click="confirmResult">确认识别结果</button>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.archive-batch-detail-page {
  min-height: 100vh;
  background: var(--color-page-bg);
  padding-bottom: 80px;
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

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.breadcrumb .separator {
  color: var(--color-text-hint);
}

.breadcrumb .current {
  color: var(--color-text-primary);
  font-weight: 600;
}

.page-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* 批次信息 */
.batch-info-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.batch-info-card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
}

.info-title {
  margin: 0 0 16px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  font-size: 14px;
}

.info-label {
  color: var(--color-text-secondary);
  min-width: 80px;
}

.info-value {
  color: var(--color-text-primary);
  font-weight: 500;
}

/* 状态展示 */
.status-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.status-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 24px;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #f59e0b;
  position: relative;
}

.status-indicator.completed {
  background: #22c55e;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: inherit;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.status-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.status-description {
  margin-bottom: 16px;
}

.status-description p {
  margin: 0 0 8px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.tip-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
}

.tip-banner.success {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tip-icon {
  font-size: 18px;
}

.tip-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* 进度展示 */
.progress-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.progress-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-item {
  display: flex;
  gap: 16px;
}

.step-indicator {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e2e8f0;
  z-index: 1;
}

.step-item.completed .step-dot {
  background: #22c55e;
}

.step-item.processing .step-dot {
  background: #f59e0b;
  animation: pulse 2s infinite;
}

.step-line {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 48px;
  background: #e2e8f0;
}

.step-item.completed .step-line {
  background: #22c55e;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
  flex: 1;
}

.step-label {
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.step-status {
  font-size: 12px;
  color: var(--color-text-hint);
}

/* 文件列表 */
.files-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.files-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.file-meta {
  font-size: 12px;
  color: var(--color-text-hint);
}

.file-status {
  font-size: 12px;
  font-weight: 600;
}

.text-success {
  color: #22c55e;
}

.text-warning {
  color: #f59e0b;
}

.text-neutral {
  color: #64748b;
}

.text-info {
  color: #3b82f6;
}

/* 识别结果 */
.result-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.result-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
}

.result-placeholder {
  text-align: center;
}

.placeholder-text {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: var(--color-text-hint);
}

.result-data {
  text-align: center;
}

.result-summary {
  margin: 0 0 24px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.result-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 120px;
}

.stat-item.success {
  align-items: center;
}

.stat-item.warning {
  align-items: center;
}

.stat-item.info {
  align-items: center;
}

.stat-item.danger {
  align-items: center;
}

.stat-item.slate {
  align-items: center;
}

.stat-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* 处理说明 */
.instructions-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.instructions-content {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  padding: 20px;
}

.instructions-title {
  margin: 0 0 16px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.instruction-item {
  display: flex;
  gap: 12px;
}

.instruction-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* 底部操作按钮 */
.actions-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-outline {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
  border: none;
  outline: none;
  min-width: 120px;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: #28a38a;
}

.btn-secondary {
  background: #f1f5f9;
  color: var(--color-text-primary);
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-outline {
  background: white;
  color: var(--color-text-primary);
  border: 1px solid var(--color-card-border);
}

.btn-outline:hover {
  background: #f8fafc;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .result-stats {
    flex-direction: column;
    gap: 16px;
  }

  .actions-section {
    flex-direction: column;
  }
}
</style>