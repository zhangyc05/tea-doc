<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { Button } from '@/components/ui'

interface UploadedFile {
  id: string
  name: string
  size: string
  status: '已上传' | '上传中' | '上传失败'
}

const router = useRouter()

// 步骤条
const currentStep = ref(1)

// 已上传文件
const uploadedFiles = ref<UploadedFile[]>([
  {
    id: '1',
    name: '2026年度课程建设项目名单件名单.xlsx',
    size: '1.8MB',
    status: '已上传',
  },
  {
    id: '2',
    name: '精品课程建设立项材料.zip',
    size: '24.6MB',
    status: '已上传',
  },
  {
    id: '3',
    name: '教学成果申报通知.pdf',
    size: '3.2MB',
    status: '已上传',
  },
  {
    id: '4',
    name: '教师培训证书扫描件.zip',
    size: '18.4MB',
    status: '已上传',
  },
])

// 拖拽上传状态
const isDragging = ref(false)

// 计算总大小
const totalSize = computed(() => {
  const sizeMap: Record<string, number> = {
    '1.8MB': 1.8,
    '24.6MB': 24.6,
    '3.2MB': 3.2,
    '18.4MB': 18.4,
  }

  return Object.values(uploadedFiles.value).reduce((total, file) => {
    return total + (sizeMap[file.size] || 0)
  }, 0).toFixed(1)
})

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  // 这里可以添加文件处理逻辑
  console.log('Files dropped:', event.dataTransfer?.files)
}

function selectFiles() {
  console.log('选择文件')
}

function importFromFolder() {
  console.log('从本地文件夹导入')
}

function startRecognition() {
  router.push('/admin/archive/import/20260620-01?status=recognizing')
}

function cancelUpload() {
  router.back()
}

function statusClass(status: UploadedFile['status']) {
  const classMap = {
    '已上传': 'text-success',
    '上传中': 'text-warning',
    '上传失败': 'text-danger',
  }
  return classMap[status] || 'text-neutral'
}
</script>

<template>
  <AdminLayout active-key="archive-processing">
    <div class="archive-import-upload-page">
      <!-- 页面头部 -->
      <section class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <span>成长档案</span>
            <i class="separator">/</i>
            <span>档案处理</span>
            <i class="separator">/</i>
            <span class="current">导入部门资料</span>
          </div>
          <h1>导入部门资料</h1>
        </div>
      </section>

      <!-- 说明区域 -->
      <section class="description-section">
        <div class="description-content">
          <p class="description-text">
            上传部门掌握的教师相关资料，系统会先识别资料内容，涉及教师和建议归档维度，确认后再生成待处理记录，不会直接导入教师档案。
          </p>
        </div>
      </section>

      <!-- 步骤条 -->
      <section class="steps-section">
        <div class="steps-container">
          <div class="step-item" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">上传资料</div>
          </div>
          <div class="step-line" :class="{ completed: currentStep > 1 }"></div>
          <div class="step-item" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">系统识别</div>
          </div>
          <div class="step-line" :class="{ completed: currentStep > 2 }"></div>
          <div class="step-item" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
            <div class="step-number">3</div>
            <div class="step-label">确认结果</div>
          </div>
          <div class="step-line" :class="{ completed: currentStep > 3 }"></div>
          <div class="step-item" :class="{ active: currentStep === 4, completed: currentStep > 4 }">
            <div class="step-number">4</div>
            <div class="step-label">生成待处理记录</div>
          </div>
        </div>
      </section>

      <!-- 主体内容区域 -->
      <section class="main-content">
        <!-- 左侧：上传区域 -->
        <div class="upload-section">
          <!-- 拖拽上传区域 -->
          <div
            class="upload-zone"
            :class="{ dragging: isDragging }"
            @dragenter="handleDragEnter"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @drop="handleDrop"
          >
            <div class="upload-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div class="upload-text">
              <p class="upload-main">拖拽文件到此处，或点击上传</p>
              <p class="upload-sub">支持 Excel、PDF、Word、图片、ZIP 压缩包</p>
            </div>
            <div class="upload-buttons">
              <button class="btn-primary" @click="selectFiles">选择文件</button>
              <button class="btn-secondary" @click="importFromFolder">从本地文件夹导入</button>
            </div>
            <p class="upload-hint">
              可一次上传台账、名单、证书扫描件、项目材料、评审结果、通知文件等资料。
            </p>
          </div>

          <!-- 已上传文件列表 -->
          <div class="uploaded-files">
            <h3 class="section-title">已上传文件（{{ uploadedFiles.length }}）</h3>
            <div class="file-list">
              <div v-for="file in uploadedFiles" :key="file.id" class="file-item">
                <div class="file-info">
                  <div class="file-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div class="file-details">
                    <div class="file-name">{{ file.name }}</div>
                    <div class="file-meta">{{ file.size }}</div>
                  </div>
                </div>
                <div class="file-status" :class="statusClass(file.status)">
                  {{ file.status }}
                </div>
              </div>
            </div>
            <div class="upload-summary">
              已上传 {{ uploadedFiles.length }} 个文件，共 {{ totalSize }}MB
            </div>
          </div>
        </div>

        <!-- 右侧：上传说明 -->
        <div class="instructions-section">
          <div class="instructions-card">
            <h3 class="instructions-title">上传说明</h3>
            <ul class="instructions-list">
              <li class="instruction-item">
                <span class="instruction-bullet">•</span>
                <span class="instruction-text">可直接上传原始资料，无需提前分类。</span>
              </li>
              <li class="instruction-item">
                <span class="instruction-bullet">•</span>
                <span class="instruction-text">系统会自动识别教师姓名、资料内容和建议归档维度。</span>
              </li>
              <li class="instruction-item">
                <span class="instruction-bullet">•</span>
                <span class="instruction-text">识别不清或信息缺失的资料，会在下一步提示补充。</span>
              </li>
              <li class="instruction-item">
                <span class="instruction-bullet">•</span>
                <span class="instruction-text">上传后不会直接入档，需确认后才生成待处理记录。</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 底部操作按钮 -->
      <section class="actions-section">
        <button class="btn-secondary" @click="cancelUpload">取消</button>
        <button class="btn-primary" @click="startRecognition">开始识别资料</button>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.archive-import-upload-page {
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

.description-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 24px;
}

.description-content {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 16px;
}

.description-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* 步骤条 */
.steps-section {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px 24px;
}

.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.step-item.active .step-number {
  background: var(--color-primary);
  color: white;
}

.step-item.completed .step-number {
  background: #22c55e;
  color: white;
}

.step-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: center;
  min-width: 80px;
}

.step-item.active .step-label {
  color: var(--color-primary);
  font-weight: 600;
}

.step-line {
  width: 60px;
  height: 2px;
  background: #e2e8f0;
  transition: all 0.3s ease;
}

.step-line.completed {
  background: #22c55e;
}

/* 主体内容区域 */
.main-content {
  max-width: var(--admin-content-max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
}

/* 上传区域 */
.upload-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.upload-zone {
  background: white;
  border: 2px dashed var(--color-card-border);
  border-radius: 12px;
  padding: 36px 32px;
  text-align: center;
  transition: all 0.3s ease;
  min-height: 280px;
}

.upload-zone.dragging {
  border-color: var(--color-primary);
  background: #f0fdfa;
}

.upload-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: var(--color-primary);
}

.upload-text {
  margin-bottom: 24px;
}

.upload-main {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.upload-sub {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.upload-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.upload-hint {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-hint);
}

.uploaded-files {
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

.file-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  min-height: 56px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text-hint);
}

.file-details {
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

.text-danger {
  color: #ef4444;
}

.text-neutral {
  color: #64748b;
}

.upload-summary {
  padding-top: 16px;
  border-top: 1px solid var(--color-card-border);
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
}

/* 上传说明区域 */
.instructions-section {
  position: sticky;
  top: 24px;
  height: fit-content;
}

.instructions-card {
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
  gap: 16px;
}

.instruction-item {
  display: flex;
  gap: 12px;
}

.instruction-bullet {
  color: var(--color-primary);
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
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
}

.btn-primary,
.btn-secondary {
  padding: 12px 32px;
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
</style>