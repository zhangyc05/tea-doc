import { reactive } from 'vue'
import type { ArchiveProcessingRecord, ArchiveUploadedFile, TeacherArchiveExportRecord } from '@/domain/admin/archive'
import {
  addArchiveUploadedFilesInState,
  cancelArchiveImportBatchInState,
  completeArchiveBatchRecognitionInState,
  confirmArchiveBatchRecognitionInState,
  confirmArchiveRecordInState,
  createArchiveImportBatchInState,
  ensureArchiveImportBatchInState,
  markArchiveRecordExceptionInState,
  removeArchiveUploadedFileInState,
  returnArchiveRecordInState,
  upsertArchiveProcessingRecordInState,
} from './archive/actions'
import { createInitialArchiveState } from './archive/initialData'

export type {
  ArchiveBatchFile,
  ArchiveBatchFileStatus,
  ArchiveBatchStatus,
  ArchiveImportBatch,
  ArchiveProcessingRecord,
  ArchiveProcessingStatus,
  ArchiveRecognitionResult,
  ArchiveState,
  ArchiveUploadedFile,
  ArchiveUploadedFileStatus,
  ArchiveUploadedFileType,
  TeacherArchiveFact,
  TeacherArchiveExportRecord,
  TeacherArchiveExportStatus,
} from '@/domain/admin/archive'

const state = reactive(createInitialArchiveState())

export function getArchiveState() {
  return state
}

export function resetArchiveState() {
  Object.assign(state, createInitialArchiveState())
}

export function addArchiveUploadedFiles(files: ArchiveUploadedFile[]) {
  addArchiveUploadedFilesInState(state, files)
}

export function removeArchiveUploadedFile(fileId: string) {
  removeArchiveUploadedFileInState(state, fileId)
}

export function createArchiveImportBatch(batchId = '20260620-01') {
  return createArchiveImportBatchInState(state, batchId)
}

export function ensureArchiveImportBatch(batchId: string) {
  return ensureArchiveImportBatchInState(state, batchId)
}

export function completeArchiveBatchRecognition(batchId: string) {
  return completeArchiveBatchRecognitionInState(state, batchId)
}

export function cancelArchiveImportBatch(batchId: string) {
  return cancelArchiveImportBatchInState(state, batchId)
}

export function confirmArchiveBatchRecognition(batchId: string) {
  return confirmArchiveBatchRecognitionInState(state, batchId)
}

export function upsertArchiveProcessingRecord(record: ArchiveProcessingRecord) {
  return upsertArchiveProcessingRecordInState(state, record)
}

export function confirmArchiveRecord(recordId: string) {
  return confirmArchiveRecordInState(state, recordId)
}

export function returnArchiveRecord(recordId: string) {
  return returnArchiveRecordInState(state, recordId)
}

export function markArchiveRecordException(recordId: string) {
  return markArchiveRecordExceptionInState(state, recordId)
}

export function getTeacherArchiveFacts(teacher: string) {
  return state.teacherArchiveFacts.filter(fact => fact.teacher === teacher)
}

export function getArchiveSourceRecordsForFact(factId: string) {
  const fact = state.teacherArchiveFacts.find(item => item.id === factId)
  if (!fact) return []
  return state.processingRecords.filter(record => record.id === fact.sourceRecordId)
}

export function createTeacherArchiveExportRecord(payload: {
  teacherId: string
  teacherName: string
  cycle: string
  factCount: number
  operator?: string
}): TeacherArchiveExportRecord {
  const createdAt = '刚刚'
  const record: TeacherArchiveExportRecord = {
    id: `archive-export-${payload.teacherId}-${state.exportRecords.length + 1}`,
    teacherId: payload.teacherId,
    teacherName: payload.teacherName,
    cycle: payload.cycle,
    status: '已完成',
    factCount: payload.factCount,
    fileName: `teacher-archive-${payload.teacherId}-${state.exportRecords.length + 1}.txt`,
    createdAt,
    operator: payload.operator || '档案管理员',
  }

  state.exportRecords.unshift(record)
  state.operationMessage = `已生成成长档案导出记录：${record.fileName}`
  return record
}
