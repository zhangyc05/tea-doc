<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

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
const batchId = computed(() => String(route.params.batchId || '20260620-01'))

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

const resultRows = computed(() => [
  {
    label: '可生成待确认记录',
    value: isCompleted.value ? recognitionResult.value.pendingConfirm : '--',
    tone: 'blue',
  },
  {
    label: '需要补充',
    value: isCompleted.value ? recognitionResult.value.needSupplement : '--',
    tone: 'orange',
  },
  {
    label: '需要核验',
    value: isCompleted.value ? recognitionResult.value.needVerify : '--',
    tone: 'green',
  },
  {
    label: '异常待处理',
    value: isCompleted.value ? recognitionResult.value.exception : '--',
    tone: 'red',
  },
  {
    label: '疑似重复',
    value: isCompleted.value ? recognitionResult.value.duplicate : '--',
    tone: 'purple',
  },
])

function returnToProcessing() {
  router.push('/admin/archive/processing')
}

function refreshStatus() {
  router.push(`/admin/archive/import/${batchId.value}?status=completed`)
}

function confirmResult() {
  router.push('/admin/archive/processing')
}

function cancelTask() {
  router.push('/admin/archive/processing')
}

function viewUploadedFiles() {
  router.push('/admin/archive/import')
}
</script>

<template>
  <AdminLayout active-key="archive-processing">
    <div class="archive-batch-detail-page">
      <section class="page-shell">
        <div class="breadcrumb">
          <span>成长档案</span>
          <i class="separator">/</i>
          <span>档案处理</span>
          <i class="separator">/</i>
          <span>导入部门资料</span>
          <i class="separator">/</i>
          <span class="current">导入批次详情</span>
        </div>

        <section class="hero-card" :class="{ completed: isCompleted }">
          <div class="hero-head">
            <div>
              <h1>导入批次详情</h1>
              <p>
                {{
                  isCompleted
                    ? '资料已识别完成，系统已整理资料内容、关联教师和建议归档维度。请确认识别结果后生成待处理记录。'
                    : '资料已提交，系统正在后台识别资料内容、关联教师和建议归档维度。识别完成后，需人工确认后才会生成待处理记录。'
                }}
              </p>
            </div>
            <span class="state-pill" :class="{ completed: isCompleted }">
              <i></i>
              {{ isCompleted ? '识别完成' : '识别中' }}
            </span>
          </div>

          <div class="hero-body">
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
              <div class="info-item">
                <span class="info-label">当前状态：</span>
                <span class="inline-status" :class="{ completed: isCompleted }">
                  {{ isCompleted ? '识别完成' : '识别中' }}
                </span>
              </div>
            </div>
            <div class="hero-illustration" aria-hidden="true">
              <div class="doc-card"></div>
              <div class="lens"></div>
            </div>
          </div>

          <div class="tip-banner" :class="{ success: isCompleted }">
            <span class="tip-icon">{{ isCompleted ? '✓' : 'i' }}</span>
            <span class="tip-text">
              {{
                isCompleted
                  ? '识别已完成，请查看识别结果并确认后生成待处理记录。'
                  : '你可以先离开当前页面，识别完成后再回来查看结果。'
              }}
            </span>
          </div>
        </section>
      </section>

      <!-- 主体工作区（两栏布局） -->
      <section class="batch-workspace">
        <div class="batch-left">
          <!-- 当前进度 -->
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
              <div class="files-table">
                <div class="file-row file-head">
                  <span>文件名称</span>
                  <span>文件类型</span>
                  <span>文件大小</span>
                  <span>当前处理状态</span>
                </div>
                <div v-for="file in batchFiles" :key="file.id" class="file-row">
                  <span class="file-name">{{ file.name }}</span>
                  <span>{{ file.type }}</span>
                  <span>{{ file.size }}</span>
                  <span class="file-status" :class="fileStatusClass(file.status)">{{ file.status }}</span>
                </div>
              </div>
              <p class="file-count">共 {{ batchFiles.length }} 个文件</p>
            </div>
          </section>
        </div>

        <div class="batch-right">
          <!-- 识别结果 -->
          <section class="result-section">
            <div class="result-content">
              <h3 class="section-title">识别结果</h3>
              <div v-if="!isCompleted" class="result-placeholder">
                <div class="result-graphic" aria-hidden="true"></div>
                <p class="placeholder-text">系统正在整理本批次资料，识别完成后将在这里展示结果。</p>
              </div>
              <div v-else class="result-data">
                <p class="result-summary">共识别出 <strong>{{ recognitionResult.totalRecords }}</strong> 条教师相关记录</p>
              </div>
              <div class="result-list">
                <div v-for="row in resultRows" :key="row.label" class="result-row">
                  <span class="row-dot" :class="row.tone"></span>
                  <span>{{ row.label }}</span>
                  <strong>{{ row.value }}</strong>
                </div>
              </div>
              <p v-if="isCompleted" class="result-note">以上结果将进入确认步骤，确认后可按以上分类生成待处理记录。</p>
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
  background: #f7faff;
  padding-bottom: 24px;
}

.page-shell,
.batch-workspace,
.actions-section {
  width: min(100% - 48px, 1500px);
  margin: 0 auto;
}

.page-shell {
  padding-top: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  font-size: 13px;
  color: #667799;
}

.breadcrumb .separator {
  color: #9aa9c0;
}

.breadcrumb .current {
  color: #1b2f5f;
  font-weight: 600;
}

.hero-card {
  overflow: hidden;
  background: #fff;
  border: 1px solid #d9e5f7;
  border-radius: 10px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.04);
}

.hero-head {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px 12px;
}

.hero-head h1 {
  margin: 0;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 700;
  color: #07183d;
}

.hero-head p {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.55;
  color: #44618f;
}

.state-pill {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 8px;
  min-width: 96px;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #b8d1ff;
  background: #eef5ff;
  color: #075cf2;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.state-pill i {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-radius: 50%;
  animation: pulse 1.6s infinite;
}

.state-pill.completed {
  border-color: #b8ebc7;
  background: #eaf9ee;
  color: #139139;
}

.state-pill.completed i {
  animation: none;
}

.hero-body {
  position: relative;
  margin: 0 24px;
  min-height: 116px;
  padding: 24px 330px 20px 18px;
  border: 1px solid #d9e5f7;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(100deg, #fff 0%, #fff 72%, #eaf3ff 100%);
}

.hero-card.completed .hero-body {
  background: linear-gradient(100deg, #fff 0%, #fff 72%, #edf9ef 100%);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  column-gap: 48px;
  row-gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  min-width: 0;
  font-size: 14px;
}

.info-label {
  flex: none;
  color: #536b96;
  font-weight: 500;
}

.info-value {
  min-width: 0;
  color: #10254f;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inline-status {
  padding: 3px 10px;
  border-radius: 5px;
  background: #eaf2ff;
  color: #075cf2;
  font-weight: 700;
}

.inline-status.completed {
  background: #e9f8ee;
  color: #139139;
}

.hero-illustration {
  position: absolute;
  right: 34px;
  bottom: 0;
  width: 226px;
  height: 118px;
  opacity: 0.92;
}

.hero-illustration::before,
.hero-illustration::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  background: #cfe0ff;
  opacity: 0.8;
}

.hero-illustration::before {
  width: 142px;
  height: 42px;
  right: 0;
  bottom: 0;
}

.hero-illustration::after {
  width: 10px;
  height: 10px;
  left: 24px;
  top: 12px;
}

.hero-card.completed .hero-illustration::before,
.hero-card.completed .hero-illustration::after {
  background: #c8f0d0;
}

.doc-card {
  position: absolute;
  right: 44px;
  bottom: 28px;
  width: 86px;
  height: 70px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6ea6ff, #1264e9);
  box-shadow: 0 12px 24px rgba(12, 93, 226, 0.22);
}

.doc-card::before {
  content: '';
  position: absolute;
  left: 16px;
  top: -18px;
  width: 72px;
  height: 52px;
  border: 1px solid #cfe0ff;
  border-radius: 6px;
  background: #fff;
}

.hero-card.completed .doc-card {
  background: linear-gradient(135deg, #75d885, #24a547);
  box-shadow: 0 12px 24px rgba(36, 165, 71, 0.2);
}

.lens {
  position: absolute;
  right: 16px;
  bottom: 20px;
  width: 48px;
  height: 48px;
  border: 8px solid rgba(15, 94, 239, 0.72);
  border-radius: 50%;
}

.lens::after {
  content: '';
  position: absolute;
  right: -24px;
  bottom: -14px;
  width: 32px;
  height: 8px;
  border-radius: 999px;
  background: #0f5eef;
  transform: rotate(42deg);
}

.hero-card.completed .lens {
  border-color: rgba(28, 164, 67, 0.72);
}

.hero-card.completed .lens::after {
  background: #1ca443;
}

.tip-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 24px 18px;
  padding: 9px 16px;
  background: #eef5ff;
  border: 1px solid #d7e5ff;
  border-top: 0;
  border-radius: 0 0 8px 8px;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.tip-banner.success {
  background: #edf9ef;
  border-color: #c9efd3;
}

.tip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0f5eef;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 1;
}

.success .tip-icon {
  background: #139139;
}

.tip-text {
  font-size: 13px;
  color: #23436f;
}

.batch-workspace {
  padding-top: 16px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(390px, 0.9fr);
  gap: 16px;
  align-items: start;
}

.batch-left,
.batch-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.progress-section {
  margin: 0;
  padding: 0;
  max-width: none;
}

.progress-content {
  background: white;
  border-radius: 10px;
  border: 1px solid #d9e5f7;
  padding: 20px 22px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.section-title {
  margin: 0 0 18px;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 700;
  color: #07183d;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-item {
  display: flex;
  gap: 18px;
  min-height: 42px;
}

.step-indicator {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #edf1f7;
  color: #20345d;
  font-size: 14px;
  font-weight: 700;
  z-index: 1;
}

.step-dot::after {
  content: counter(step);
}

.steps-list {
  counter-reset: step;
}

.step-item {
  counter-increment: step;
}

.step-item.completed .step-dot {
  background: #d8f4df;
  color: #16893b;
}

.step-item.processing .step-dot {
  background: #0f5eef;
  color: #fff;
  animation: pulse 2s infinite;
}

.step-line {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 28px;
  background: #dce5f2;
}

.step-item.completed .step-line {
  background: #c8eecf;
}

.step-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 2px 0 12px;
  flex: 1;
}

.step-label {
  font-size: 15px;
  color: #10254f;
  font-weight: 700;
}

.step-status {
  min-width: 58px;
  padding: 5px 10px;
  border-radius: 6px;
  background: #f0f3f8;
  color: #60708b;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.step-item.completed .step-status {
  background: #eaf9ee;
  color: #139139;
}

.step-item.processing .step-status {
  background: #eaf2ff;
  color: #075cf2;
}

.files-section {
  margin: 0;
  padding: 0;
  max-width: none;
}

.files-content {
  background: white;
  border-radius: 10px;
  border: 1px solid #d9e5f7;
  padding: 18px 22px 12px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.files-table {
  overflow: hidden;
  border: 1px solid #d9e5f7;
  border-radius: 8px;
}

.file-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 76px 78px 112px;
  align-items: center;
  gap: 10px;
  min-height: 43px;
  padding: 0 12px;
  border-top: 1px solid #e5edf8;
  color: #10254f;
  font-size: 13px;
}

.file-head {
  min-height: 38px;
  border-top: 0;
  background: #f4f7fc;
  color: #31466f;
  font-weight: 700;
}

.file-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}

.file-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
}

.file-status::before {
  content: '';
  width: 15px;
  height: 15px;
  border: 2px solid currentColor;
  border-radius: 50%;
}

.text-success {
  color: #139139;
}

.text-warning {
  color: #075cf2;
}

.text-neutral {
  color: #60708b;
}

.file-count {
  margin: 12px 0 0;
  color: #536b96;
  font-size: 13px;
}

.result-section {
  margin: 0;
  padding: 0;
  max-width: none;
}

.result-content {
  position: relative;
  overflow: hidden;
  background: white;
  border-radius: 10px;
  border: 1px solid #d9e5f7;
  padding: 20px 22px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.result-placeholder {
  text-align: center;
}

.result-graphic {
  width: 152px;
  height: 96px;
  margin: 8px auto 14px;
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(209, 226, 255, 0.8)) 50% 16px / 72px 50px no-repeat,
    radial-gradient(ellipse at 50% 78%, #dbe8ff 0 44%, transparent 45%),
    linear-gradient(135deg, #a7c8ff, #2270ef);
  opacity: 0.9;
}

.placeholder-text {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #536b96;
}

.result-data {
  text-align: left;
}

.result-summary {
  margin: 8px 0 18px;
  font-size: 16px;
  font-weight: 600;
  color: #10254f;
}

.result-summary strong {
  color: #0fa33b;
  font-size: 22px;
}

.result-list {
  overflow: hidden;
  border: 1px solid #d9e5f7;
  border-radius: 8px;
}

.result-row {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 14px;
  border-top: 1px solid #e5edf8;
  color: #10254f;
  font-size: 14px;
}

.result-row:first-child {
  border-top: 0;
}

.result-row strong {
  font-size: 15px;
}

.row-dot {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: #0f5eef;
}

.row-dot.orange {
  background: #f59e0b;
}

.row-dot.green {
  background: #18a64a;
}

.row-dot.red {
  background: #ff3b30;
}

.row-dot.purple {
  background: #7c3aed;
}

.result-note {
  margin: 14px 0 0;
  color: #536b96;
  font-size: 13px;
  line-height: 1.6;
}

.instructions-section {
  margin: 0;
  padding: 0;
  max-width: none;
}

.instructions-content {
  background: white;
  border-radius: 10px;
  border: 1px solid #d9e5f7;
  padding: 20px 22px;
  box-shadow: 0 8px 22px rgba(40, 88, 150, 0.035);
}

.instructions-card {
  margin: 0;
}

.instructions-title {
  margin: 0 0 18px;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 700;
  color: #07183d;
}

.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.instruction-item {
  display: flex;
  gap: 10px;
}

.instruction-item::before {
  content: '';
  flex: none;
  width: 6px;
  height: 6px;
  margin-top: 9px;
  border-radius: 50%;
  background: #0f5eef;
}

.instruction-text {
  font-size: 14px;
  line-height: 1.6;
  color: #44618f;
}

.actions-section {
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.btn-primary,
.btn-secondary,
.btn-outline {
  min-width: 154px;
  height: 48px;
  padding: 0 22px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
  outline: none;
}

.btn-primary {
  margin-left: auto;
  border: 1px solid #0f5eef;
  background: #0f5eef;
  color: white;
  box-shadow: 0 10px 20px rgba(15, 94, 239, 0.18);
}

.btn-primary:hover {
  background: #0c4fd0;
}

.btn-secondary {
  border: 1px solid #d0def0;
  background: #fff;
  color: #23436f;
}

.btn-secondary:hover {
  background: #f5f8fd;
}

.btn-outline {
  background: white;
  color: #23436f;
  border: 1px solid #d0def0;
}

.btn-outline:hover {
  background: #f8fafc;
}

@media (max-width: 1320px) {
  .page-shell,
  .batch-workspace,
  .actions-section {
    width: min(100% - 32px, 1500px);
  }

  .hero-body {
    min-height: 138px;
    padding-right: 220px;
  }

  .hero-illustration {
    right: 20px;
    width: 178px;
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
    column-gap: 32px;
    row-gap: 18px;
  }

  .batch-workspace {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.82fr);
  }

  .file-row {
    grid-template-columns: minmax(0, 1fr) 72px 76px 108px;
  }
}

@media (max-width: 980px) {
  .hero-body {
    padding-right: 18px;
  }

  .hero-illustration {
    display: none;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .batch-workspace {
    grid-template-columns: 1fr;
  }

  .file-row {
    grid-template-columns: minmax(0, 1fr) 72px 76px 108px;
  }

  .actions-section {
    flex-wrap: wrap;
  }

  .btn-primary {
    margin-left: 0;
  }
}
</style>
