import { reactive } from 'vue'
import { upsertArchiveProcessingRecord } from './archiveStore'
import {
  approvePracticeApplicationInState,
  confirmPracticeArchiveInState,
  remindPracticeApplicationInState,
  remindPracticeMaterialInState,
  returnPracticeApplicationInState,
} from './practice/actions'
import { createInitialPracticeState } from './practice/initialData'

export type {
  PracticeApplication,
  PracticeApplicationStatus,
  PracticeProgressStatus,
  PracticeRecord,
  PracticeRecordStatus,
  PracticeState,
  PracticeTracking,
} from '@/domain/admin/practice'

const state = reactive(createInitialPracticeState())

export function getPracticeState() {
  return state
}

export function resetPracticeState() {
  Object.assign(state, createInitialPracticeState())
}

export function approvePracticeApplication(applicationId: string) {
  return approvePracticeApplicationInState(state, applicationId)
}

export function returnPracticeApplication(applicationId: string) {
  return returnPracticeApplicationInState(state, applicationId)
}

export function remindPracticeApplication(trackingId: string) {
  return remindPracticeApplicationInState(state, trackingId)
}

export function remindPracticeMaterial(recordId: string) {
  return remindPracticeMaterialInState(state, recordId)
}

export function confirmPracticeArchive(recordId: string) {
  return confirmPracticeArchiveInState(state, recordId, upsertArchiveProcessingRecord)
}
