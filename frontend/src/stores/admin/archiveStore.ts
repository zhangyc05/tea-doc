import { reactive } from 'vue'
import type { ArchiveProcessingRecord, ArchiveUploadedFile } from '@/domain/admin/archive'
import {
  addArchiveUploadedFilesInState,
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
