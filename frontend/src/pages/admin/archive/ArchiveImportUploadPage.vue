<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {
  addArchiveUploadedFiles,
  createArchiveImportBatch,
  getArchiveState,
  removeArchiveUploadedFile,
  type ArchiveUploadedFile,
} from '@/stores/admin/archiveStore'

const router = useRouter()
const archiveState = getArchiveState()

const currentStep = ref(1)
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const uploadedFiles = computed(() => archiveState.uploadedFiles)

const steps = ['上传资料', '系统识别', '确认结果', '生成待处理记录']

const totalSize = computed(() => {
  return uploadedFiles.value.reduce((total, file) => {
    return total + Number.parseFloat(file.size)
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
  const files = Array.from(event.dataTransfer?.files || [])
  appendFiles(files)
}

function selectFiles() {
  fileInput.value?.click()
}

function importFromFolder() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  appendFiles(Array.from(input.files || []))
  input.value = ''
}

function appendFiles(files: File[]) {
  const mapped = files.map((file, index): ArchiveUploadedFile => {
    const id = `${Date.now()}-${index}`
    return {
      id,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      status: '已上传' as const,
      type: getFileType(file.name),
    }
  })
  addArchiveUploadedFiles(mapped)
}

function removeFile(fileId: string) {
  removeArchiveUploadedFile(fileId)
}

function startRecognition() {
  const batch = createArchiveImportBatch()
  router.push(`/admin/archive/import/${batch.id}`)
}

function cancelUpload() {
  router.back()
}

function getFileType(name: string): ArchiveUploadedFile['type'] {
  const lowerName = name.toLowerCase()
  if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) return 'excel'
  if (lowerName.endsWith('.pdf')) return 'pdf'
  if (lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) return 'word'
  if (lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) return 'image'
  return 'zip'
}

function fileTypeLabel(type: ArchiveUploadedFile['type']) {
  const labels = {
    excel: 'XLS',
    zip: 'ZIP',
    pdf: 'PDF',
    word: 'DOC',
    image: 'IMG',
  }
  return labels[type]
}
</script>

<template>
  <AdminLayout active-key="archive-processing">
    <div class="archive-import-upload-page">
      <section class="page-intro">
        <div class="breadcrumb">
          <span>成长档案</span>
          <span class="slash">/</span>
          <span>档案处理</span>
          <span class="slash">/</span>
          <span class="current">导入部门资料</span>
        </div>
        <h1>导入部门资料</h1>
        <p>
          上传部门掌握的教师相关资料，系统会先识别资料内容，涉及教师和建议归档维度，确认后再生成待处理记录，不会直接导入教师档案。
        </p>
      </section>

      <section class="steps-card">
        <div v-for="(step, index) in steps" :key="step" class="step-group">
          <div class="step-item" :class="{ active: currentStep === index + 1 }">
            <span>{{ index + 1 }}</span>
            <strong>{{ step }}</strong>
          </div>
          <i v-if="index < steps.length - 1"></i>
        </div>
      </section>

      <section class="content-grid">
        <article class="upload-panel">
          <h2>上传资料</h2>
          <input
            ref="fileInput"
            type="file"
            multiple
            class="file-input"
            accept=".xlsx,.xls,.pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
            @change="handleFileChange"
          />

          <div
            class="upload-zone"
            :class="{ dragging: isDragging }"
            @dragenter="handleDragEnter"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @drop="handleDrop"
          >
            <div class="folder-art">
              <span class="paper paper-one"></span>
              <span class="paper paper-two"></span>
              <span class="folder-front">↑</span>
            </div>
            <div class="upload-copy">
              <h3>拖拽文件到此处，或点击上传</h3>
              <p>支持 Excel、PDF、Word、图片、ZIP 压缩包</p>
              <p>可一次上传台账、名单、证书扫描件、项目材料、评审结果、通知文件等资料。</p>
            </div>
            <div class="upload-actions">
              <Button class="upload-action-button" type="button" variant="outline" size="lg" @click="selectFiles">
                ▣ 选择文件
              </Button>
              <Button class="upload-action-button" type="button" variant="outline" size="lg" @click="importFromFolder">
                ▣ 从本地文件夹导入
              </Button>
            </div>
          </div>

          <div class="file-card">
            <header>
              <h3>已上传文件（{{ uploadedFiles.length }}）</h3>
            </header>
            <div class="file-list">
              <div v-for="file in uploadedFiles" :key="file.id" class="file-row">
                <span class="file-type" :class="file.type">{{ fileTypeLabel(file.type) }}</span>
                <strong>{{ file.name }}</strong>
                <span>{{ file.size }}</span>
                <em>{{ file.status }}</em>
                <Button class="file-remove-action" type="button" variant="ghost" size="sm" @click="removeFile(file.id)">删除</Button>
              </div>
            </div>
            <footer>已上传 {{ uploadedFiles.length }} 个文件，共 {{ totalSize }}MB</footer>
          </div>
        </article>

        <aside class="instructions-panel">
          <h2>上传说明</h2>
          <ul>
            <li>可直接上传原始资料，无需提前分类。</li>
            <li>系统会自动识别教师姓名、资料内容和建议归档维度。</li>
            <li>识别不清或信息缺失的资料，会在下一步提示补充。</li>
            <li>上传后不会直接入档，需确认后才生成待处理记录。</li>
          </ul>
        </aside>
      </section>

      <section class="bottom-actions">
        <Button class="bottom-cancel-action" type="button" variant="outline" size="lg" @click="cancelUpload">取消</Button>
        <Button class="bottom-primary-action" type="button" size="lg" :disabled="uploadedFiles.length === 0" @click="startRecognition">
          开始识别资料
        </Button>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.archive-import-upload-page {
  min-height: 100vh;
  padding-bottom: 90px;
  background: var(--color-page-bg, #f5f7fb);
  color: #14213d;
}

.page-intro {
  padding-top: 14px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-admin-sm);
  color: #6d7c91;
  font-size: 14px;
}

.breadcrumb .current {
  color: #16233c;
  font-weight: 700;
}

.slash {
  color: #bac4d2;
}

.page-intro h1 {
  margin: 8px 0 6px;
  color: #10213d;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
}

.page-intro p {
  margin: 0;
  color: #405170;
  font-size: 15px;
  line-height: 1.55;
}

.steps-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 14px 0 14px;
}

.step-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: var(--space-admin-md);
  color: #6c7b92;
}

.step-item span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #ccd8ea;
  border-radius: 50%;
  background: #ffffff;
  color: #53647b;
  font-size: 18px;
  font-weight: 700;
}

.step-item strong {
  font-size: 16px;
}

.step-item.active span {
  border-color: #1677ff;
  background: #1677ff;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(22, 119, 255, 0.22);
}

.step-item.active strong {
  color: #1677ff;
}

.step-group i {
  width: clamp(80px, 11vw, 180px);
  height: 1px;
  background: #d8e2f0;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(620px, 1fr) minmax(360px, 0.68fr);
  gap: 22px;
}

.upload-panel,
.instructions-panel,
.bottom-actions {
  border: 1px solid #dfe8f4;
  border-radius: var(--radius-lg);
  background: #ffffff;
  box-shadow: 0 8px 22px rgba(32, 56, 96, 0.035);
}

.upload-panel,
.instructions-panel {
  padding: 18px;
}

.upload-panel h2,
.instructions-panel h2 {
  margin: 0 0 10px;
  color: #10213d;
  font-size: 21px;
  font-weight: 800;
}

.file-input {
  display: none;
}

.upload-zone {
  min-height: 198px;
  padding: 18px;
  border: 1px dashed #b9ccec;
  border-radius: var(--radius-lg);
  background: #fbfdff;
  text-align: center;
  transition: border-color 0.16s ease, background 0.16s ease;
}

.upload-zone.dragging {
  border-color: #1677ff;
  background: #f0f7ff;
}

.folder-art {
  position: relative;
  width: 86px;
  height: 58px;
  margin: 0 auto 8px;
}

.paper,
.folder-front {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.paper {
  width: 40px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: linear-gradient(180deg, #e8f2ff, #cfe1ff);
}

.paper-one {
  top: 0;
  margin-left: -16px;
  transform: rotate(-8deg) translateX(-50%);
}

.paper-two {
  top: 3px;
  margin-left: 14px;
  transform: rotate(8deg) translateX(-50%);
}

.folder-front {
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 40px;
  border-radius: var(--radius-md) var(--radius-md) var(--radius-admin-panel) var(--radius-admin-panel);
  background: linear-gradient(180deg, #60a5ff, #1f72f2);
  color: #ffffff;
  font-size: 28px;
  font-weight: 800;
}

.upload-copy h3 {
  margin: 0 0 8px;
  color: #10213d;
  font-size: 20px;
  font-weight: 800;
}

.upload-copy p {
  margin: 0 0 6px;
  color: #405170;
  font-size: 15px;
}

.upload-copy p:last-child {
  font-size: 14px;
}

.upload-actions {
  display: flex;
  justify-content: center;
  gap: 22px;
  margin-top: 10px;
}

.upload-action-button {
  min-width: 196px;
}

.file-card {
  margin-top: 12px;
  border: 1px solid #dfe8f4;
  border-radius: var(--radius-admin-panel);
  overflow: hidden;
}

.file-card header {
  padding: 10px 12px 8px;
}

.file-card h3 {
  margin: 0;
  color: #10213d;
  font-size: 18px;
  font-weight: 800;
}

.file-list {
  display: grid;
}

.file-row {
  display: grid;
  grid-template-columns: 32px minmax(260px, 1fr) 92px 82px 54px;
  align-items: center;
  min-height: 36px;
  padding: 0 12px;
  border-top: 1px solid #dfe8f4;
  color: #20304b;
  font-size: 15px;
}

.file-row strong {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}

.file-row span {
  color: #405170;
}

.file-row em {
  color: #13a052;
  font-style: normal;
  font-weight: 700;
}

.file-remove-action {
  justify-self: start;
  color: #1677ff;
  font-size: 15px;
  font-weight: 600;
}

.file-type {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 24px;
  border-radius: 4px;
  color: #ffffff !important;
  font-size: 9px;
  font-weight: 800;
}

.file-type.excel {
  background: #16a34a;
}

.file-type.zip,
.file-type.word {
  background: #f59e0b;
}

.file-type.pdf {
  background: #ef4444;
}

.file-type.image {
  background: #1677ff;
}

.file-card footer {
  padding: 8px 12px;
  border-top: 1px solid #dfe8f4;
  color: #405170;
  font-size: 15px;
}

.instructions-panel ul {
  display: grid;
  gap: 24px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.instructions-panel li {
  position: relative;
  padding-left: 30px;
  color: #344664;
  font-size: 16px;
  line-height: 1.65;
}

.instructions-panel li::before {
  position: absolute;
  top: 11px;
  left: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #1677ff;
  content: '';
}

.bottom-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: var(--admin-sidebar-width, 288px);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 14px 36px;
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: 0;
}

.bottom-cancel-action {
  min-width: 166px;
}

.bottom-primary-action {
  min-width: 250px;
  box-shadow: 0 8px 18px rgba(22, 119, 255, 0.22);
}

@media (max-width: 1440px) {
  .content-grid {
    grid-template-columns: minmax(560px, 1fr) minmax(300px, 0.58fr);
  }

  .step-group i {
    width: 70px;
  }
}

@media (max-width: 1280px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .instructions-panel ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 22px;
  }
}
</style>
