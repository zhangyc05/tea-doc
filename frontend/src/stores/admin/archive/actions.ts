import type {
  ArchiveBatchFile,
  ArchiveImportBatch,
  ArchiveProcessingRecord,
  ArchiveState,
  ArchiveUploadedFile,
} from '@/domain/admin/archive'
import { cloneProcessingRecords, cloneUploadedFiles, completedRecognitionResult, emptyRecognitionResult } from './initialData'

export function addArchiveUploadedFilesInState(state: ArchiveState, files: ArchiveUploadedFile[]) {
  state.uploadedFiles = [...state.uploadedFiles, ...cloneUploadedFiles(files)]
}

export function removeArchiveUploadedFileInState(state: ArchiveState, fileId: string) {
  state.uploadedFiles = state.uploadedFiles.filter(file => file.id !== fileId)
}

export function createArchiveImportBatchInState(state: ArchiveState, batchId = '20260620-01') {
  const files = state.uploadedFiles.map((file, index): ArchiveBatchFile => ({
    ...file,
    batchStatus: index === 1 ? '解析中' : index === 2 ? '已解析' : index === 3 ? '等待处理' : '已接收',
  }))

  const batch: ArchiveImportBatch = {
    id: batchId,
    name: '教务处教师发展资料_2026-06-20_01',
    submitter: '陈老师',
    submitTime: '2026-06-20 10:24',
    department: '教务处',
    period: '2026 年度',
    status: 'recognizing',
    files,
    recognitionResult: { ...emptyRecognitionResult },
  }

  const existingIndex = state.importBatches.findIndex(item => item.id === batchId)
  if (existingIndex >= 0) {
    state.importBatches[existingIndex] = batch
  } else {
    state.importBatches = [batch, ...state.importBatches]
  }
  state.operationMessage = `导入批次 ${batch.name} 已开始识别。`
  return batch
}

export function ensureArchiveImportBatchInState(state: ArchiveState, batchId: string) {
  return state.importBatches.find(batch => batch.id === batchId) ?? createArchiveImportBatchInState(state, batchId)
}

export function completeArchiveBatchRecognitionInState(state: ArchiveState, batchId: string) {
  const batch = ensureArchiveImportBatchInState(state, batchId)
  batch.status = 'recognized'
  batch.files = batch.files.map(file => ({
    ...file,
    batchStatus: '已解析',
  }))
  batch.recognitionResult = { ...completedRecognitionResult }
  state.operationMessage = `导入批次 ${batch.name} 已识别完成。`
  return batch
}

export function confirmArchiveBatchRecognitionInState(state: ArchiveState, batchId: string) {
  const batch = completeArchiveBatchRecognitionInState(state, batchId)
  batch.status = 'confirmed'

  const existingRecords = state.processingRecords.filter(record => record.batchId === batchId)
  if (existingRecords.length > 0) {
    state.operationMessage = `导入批次 ${batch.name} 已生成 ${existingRecords.length} 条待处理记录。`
    return existingRecords
  }

  const createdRecords = buildProcessingRecordsFromBatch(batch)
  state.processingRecords = [...createdRecords, ...state.processingRecords]
  state.operationMessage = `导入批次 ${batch.name} 已生成 ${createdRecords.length} 条待处理记录。`
  return createdRecords
}

export function upsertArchiveProcessingRecordInState(state: ArchiveState, record: ArchiveProcessingRecord) {
  const existingIndex = state.processingRecords.findIndex(item => item.id === record.id)
  const clonedRecord = cloneProcessingRecords([record])[0]
  if (!clonedRecord) return null

  if (existingIndex >= 0) {
    state.processingRecords[existingIndex] = clonedRecord
  } else {
    state.processingRecords = [clonedRecord, ...state.processingRecords]
  }
  state.operationMessage = `${record.name} 已生成档案待处理记录。`
  return clonedRecord
}

export function confirmArchiveRecordInState(state: ArchiveState, recordId: string) {
  const record = findProcessingRecord(state, recordId)
  if (!record) return null

  record.status = '已入档'
  record.processingHistory = [...record.processingHistory, '2026-06-20 11:10 管理员确认入档']
  record.updateTime = '06-20 11:10'

  if (!state.teacherArchiveFacts.some(fact => fact.sourceRecordId === record.id)) {
    state.teacherArchiveFacts = [
      {
        id: `fact-${record.id}`,
        teacher: record.teacher,
        dimension: record.dimension,
        title: record.name,
        sourceRecordId: record.id,
        archiveTime: '2026-06-20',
      },
      ...state.teacherArchiveFacts,
    ]
  }

  state.operationMessage = `${record.name} 已确认入档。`
  return record
}

export function returnArchiveRecordInState(state: ArchiveState, recordId: string) {
  const record = findProcessingRecord(state, recordId)
  if (!record) return null

  record.status = '待补充'
  record.processingHistory = [...record.processingHistory, '2026-06-20 11:12 管理员再次退回，等待补充材料']
  record.updateTime = '06-20 11:12'
  state.operationMessage = `${record.name} 已退回补充。`
  return record
}

export function markArchiveRecordExceptionInState(state: ArchiveState, recordId: string) {
  const record = findProcessingRecord(state, recordId)
  if (!record) return null

  record.status = '异常待处理'
  record.processingHistory = [...record.processingHistory, '2026-06-20 11:14 管理员标记异常，等待专项处理']
  record.updateTime = '06-20 11:14'
  state.operationMessage = `${record.name} 已标记为异常待处理。`
  return record
}

function buildProcessingRecordsFromBatch(batch: ArchiveImportBatch): ArchiveProcessingRecord[] {
  const sourceFileName = batch.files[0]?.name ?? '导入资料'
  const uploadBatch = `${batch.period} ${batch.department}导入批次`

  return [
    {
      id: `${batch.id}-record-1`,
      batchId: batch.id,
      name: '课程建设项目立项记录',
      teacher: '林老师',
      dimension: '教师培训',
      source: '部门上报',
      status: '待确认',
      updateTime: '06-20 10:42',
      uploader: batch.submitter,
      uploadBatch,
      originalFile: sourceFileName,
      issues: [],
      processingHistory: [`${batch.submitTime} ${batch.department}上传材料`, '2026-06-20 10:42 系统识别并生成待处理记录'],
    },
    {
      id: `${batch.id}-record-2`,
      batchId: batch.id,
      name: '精品课程建设立项材料',
      teacher: '林老师',
      dimension: '教师培训',
      source: '部门上报',
      status: '待补充',
      updateTime: '06-20 10:43',
      uploader: batch.submitter,
      uploadBatch,
      originalFile: batch.files[1]?.name ?? sourceFileName,
      issues: ['缺少课程负责人任命文件'],
      processingHistory: [`${batch.submitTime} ${batch.department}上传材料`, '2026-06-20 10:43 系统识别并提示补充材料'],
    },
    {
      id: `${batch.id}-record-3`,
      batchId: batch.id,
      name: '教师培训证书扫描件',
      teacher: '刘老师',
      dimension: '教师培训',
      source: '部门上报',
      status: '待检验',
      updateTime: '06-20 10:44',
      uploader: batch.submitter,
      uploadBatch,
      originalFile: batch.files[3]?.name ?? sourceFileName,
      issues: ['证书时间需要人工核验'],
      processingHistory: [`${batch.submitTime} ${batch.department}上传材料`, '2026-06-20 10:44 系统识别并生成待检验记录'],
    },
  ]
}

function findProcessingRecord(state: ArchiveState, recordId: string) {
  return state.processingRecords.find(record => record.id === recordId)
}
