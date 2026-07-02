export type ArchiveUploadedFileType = 'excel' | 'zip' | 'pdf' | 'word' | 'image'
export type ArchiveUploadedFileStatus = '已上传' | '上传中' | '上传失败'

export type ArchiveUploadedFile = {
  id: string
  name: string
  size: string
  status: ArchiveUploadedFileStatus
  type: ArchiveUploadedFileType
}

export type ArchiveBatchStatus = 'recognizing' | 'recognized' | 'confirmed'
export type ArchiveBatchFileStatus = '已接收' | '解析中' | '已解析' | '等待处理'

export type ArchiveBatchFile = ArchiveUploadedFile & {
  batchStatus: ArchiveBatchFileStatus
}

export type ArchiveRecognitionResult = {
  totalRecords: number
  pendingConfirm: number
  needSupplement: number
  needVerify: number
  exception: number
  duplicate: number
}

export type ArchiveImportBatch = {
  id: string
  name: string
  submitter: string
  submitTime: string
  department: string
  period: string
  status: ArchiveBatchStatus
  files: ArchiveBatchFile[]
  recognitionResult: ArchiveRecognitionResult
}

export type ArchiveProcessingStatus = '待确认' | '待检验' | '待补充' | '异常待处理' | '拟退中' | '已入档'

export type ArchiveProcessingRecord = {
  id: string
  batchId: string
  name: string
  teacher: string
  dimension: string
  source: string
  status: ArchiveProcessingStatus
  updateTime: string
  uploader: string
  uploadBatch: string
  originalFile: string
  issues: string[]
  processingHistory: string[]
}

export type TeacherArchiveFact = {
  id: string
  teacher: string
  dimension: string
  title: string
  sourceRecordId: string
  archiveTime: string
}

export type ArchiveState = {
  uploadedFiles: ArchiveUploadedFile[]
  importBatches: ArchiveImportBatch[]
  processingRecords: ArchiveProcessingRecord[]
  teacherArchiveFacts: TeacherArchiveFact[]
  operationMessage: string
}
