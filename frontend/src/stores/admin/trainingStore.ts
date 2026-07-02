import { reactive } from 'vue'
import type { TrainingPlan } from '@/domain/admin/training'
import { upsertArchiveProcessingRecord } from './archiveStore'
import {
  addTrainingDemandInState,
  addTrainingResourceDraftInState,
  createTrainingPlanInState,
  getTrainingPlanByIdInState,
  getTrainingRecordByIdInState,
  matchTrainingDemandInState,
  updateTrainingApplicationStatusInState,
  uploadTrainingCertificateInState,
} from './training/actions'
import { createInitialTrainingState } from './training/initialData'

export type {
  TrainingApplication,
  TrainingApplicationStatus,
  TrainingDemand,
  TrainingDemandStatus,
  TrainingMaterial,
  TrainingMaterialStatus,
  TrainingParticipant,
  TrainingPlan,
  TrainingPlanStatus,
  TrainingRecord,
  TrainingRecordMaterialStatus,
  TrainingResource,
  TrainingResourceStatus,
  TrainingState,
} from '@/domain/admin/training'

const state = reactive(createInitialTrainingState())

export function getTrainingState() {
  return state
}

export function resetTrainingState() {
  Object.assign(state, createInitialTrainingState())
}

export function addTrainingResourceDraft() {
  return addTrainingResourceDraftInState(state)
}

export function addTrainingDemand() {
  return addTrainingDemandInState(state)
}

export function matchTrainingDemand(demandId: string, resourceId: string) {
  return matchTrainingDemandInState(state, demandId, resourceId)
}

export function createTrainingPlan(input: Partial<TrainingPlan>, mode: 'draft' | 'published') {
  return createTrainingPlanInState(state, input, mode)
}

export function approveTrainingApplication(applicationId: string) {
  return updateTrainingApplicationStatusInState(state, applicationId, '已同意')
}

export function rejectTrainingApplication(applicationId: string) {
  return updateTrainingApplicationStatusInState(state, applicationId, '未同意')
}

export function uploadTrainingCertificate(recordId: string) {
  return uploadTrainingCertificateInState(state, recordId, upsertArchiveProcessingRecord)
}

export function getTrainingPlanById(planId: string) {
  return getTrainingPlanByIdInState(state, planId)
}

export function getTrainingRecordById(recordId: string) {
  return getTrainingRecordByIdInState(state, recordId)
}
