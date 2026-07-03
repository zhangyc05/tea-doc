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
import type { PracticeExportTask, PracticeExportTaskType } from '@/domain/admin/practice'

export type {
  PracticeApplication,
  PracticeApplicationStatus,
  PracticeExportTaskStatus,
  PracticeExportTaskType,
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

export function createPracticeExportTask(payload: {
  type: PracticeExportTaskType
  recordCount: number
  operator?: string
}) {
  const task: PracticeExportTask = {
    id: `practice-export-${state.exportTasks.length + 1}`,
    type: payload.type,
    status: '导出中',
    recordCount: payload.recordCount,
    fileName: `${getPracticeExportFilePrefix(payload.type)}-${state.exportTasks.length + 1}.xlsx`,
    createdAt: '刚刚',
    operator: payload.operator ?? '实践管理员',
  }
  state.exportTasks.unshift(task)
  state.operationMessage = `${payload.type}：已创建本地模拟导出任务，正在生成 ${payload.recordCount} 条数据。`
  return task
}

export function completePracticeExportTask(taskId: string) {
  const task = state.exportTasks.find(item => item.id === taskId)
  if (!task) return null
  task.status = '已完成'
  task.failureReason = undefined
  state.operationMessage = `${task.type}：模拟导出已完成，文件 ${task.fileName} 已生成。`
  return task
}

export function failPracticeExportTask(taskId: string, reason = '导出任务处理失败') {
  const task = state.exportTasks.find(item => item.id === taskId)
  if (!task) return null
  task.status = '失败'
  task.failureReason = reason
  state.operationMessage = `${task.type}：实践导出任务失败，${reason}。`
  return task
}

function getPracticeExportFilePrefix(type: PracticeExportTaskType) {
  return type === '教师实践跟踪名单' ? 'practice-tracking-list' : 'practice-records'
}
