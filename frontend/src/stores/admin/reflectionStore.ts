import { reactive } from 'vue'
import type { ReflectionState } from '@/domain/admin/reflection'
import { getReflectionDetailMock } from '@/services/mock/reflection'
import { upsertArchiveProcessingRecord } from './archiveStore'

const state = reactive<ReflectionState>({
  operationMessage: '',
})

export function getReflectionState() {
  return state
}

export function resetReflectionState() {
  state.operationMessage = ''
}

export function sendReflectionToArchive(reflectionId: string) {
  const { reflectionDetail } = getReflectionDetailMock(reflectionId)
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
    processingHistory: [`${reflectionDetail.submitTime} 教学反思生成成长档案待确认记录`],
  })
  state.operationMessage = `${reflectionDetail.theme} 已生成成长档案待确认记录。`
  return reflectionDetail
}
