import { reactive } from 'vue'
import type { MobileReflectionSubmission, ReflectionDetail, ReflectionState } from '@/domain/admin/reflection'
import { getReflectionDetailMock } from '@/services/mock/reflection'
import { upsertArchiveProcessingRecord } from './archiveStore'

const state = reactive<ReflectionState>({
  records: [],
  operationMessage: '',
})

export function getReflectionState() {
  return state
}

export function resetReflectionState() {
  state.records = []
  state.operationMessage = ''
}

export function receiveMobileReflectionRecord(submission: MobileReflectionSubmission): ReflectionDetail {
  const record: ReflectionDetail = {
    ...submission,
    source: '教师端教学反思',
    method: '手机端 AI 会话 + 教师确认',
    destination: '成长档案 / 教学工作维度',
  }
  const existingIndex = state.records.findIndex(item => item.id === record.id)
  if (existingIndex >= 0) {
    state.records.splice(existingIndex, 1, record)
  } else {
    state.records.unshift(record)
  }
  state.operationMessage = `${record.theme} 已接收为管理端教学反思记录。`
  return record
}

export function getReflectionRecords() {
  return state.records
}

export function getReflectionRecord(reflectionId: string) {
  const received = state.records.find(item => item.id === reflectionId)
  if (received) return received
  return getReflectionDetailMock(reflectionId).reflectionDetail
}

export function sendReflectionToArchive(reflectionId: string) {
  const reflectionDetail = getReflectionRecord(reflectionId)
  const sourceMaterials = reflectionDetail.sourceMaterials?.length
    ? `；来源依据：${reflectionDetail.sourceMaterials.join('、')}`
    : ''
  upsertArchiveProcessingRecord({
    id: `reflection-${reflectionDetail.id}`,
    batchId: 'teaching-reflection',
    name: reflectionDetail.theme,
    teacher: reflectionDetail.teacher,
    dimension: '教学工作',
    source: '教学反思',
    status: '待确认',
    updateTime: reflectionDetail.submitTime.slice(5, 16),
    uploader: '教学反思',
    uploadBatch: '教学反思记录沉淀',
    originalFile: reflectionDetail.course,
    issues: [],
    processingHistory: [`${reflectionDetail.submitTime} 教学反思生成成长档案待确认记录${sourceMaterials}`],
  })
  state.operationMessage = `${reflectionDetail.theme} 已生成成长档案待确认记录。`
  return reflectionDetail
}
