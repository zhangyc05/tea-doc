import { reactive } from 'vue'
import { createTeachingReflectionArchiveRecord, type MobileArchiveRecord } from './archive'

export type ReflectionStartMethod = 'report' | 'audio' | 'material' | 'chat'
export type ReflectionRecordStatus = 'draft' | 'ai-session' | 'pending-confirm' | 'confirmed' | 'pending-archive'
export type ReflectionEvidenceStatus = 'selected' | 'uploaded' | 'recorded'

export type MobileReflectionEvidence = {
  id: string
  title: string
  type: 'report' | 'audio' | 'score' | 'evaluation' | 'material'
  status: ReflectionEvidenceStatus
}

export type MobileReflectionRecord = {
  id: string
  title: string
  course: string
  lesson: string
  className: string
  status: ReflectionRecordStatus
  draft: string
  evidenceIds: string[]
  archiveRecordId?: string
  adminStoreRefs: string[]
}

type MobileReflectionState = {
  startMethod: ReflectionStartMethod
  selectedCourse: string
  selectedLesson: string
  aiSessionStatus: 'idle' | 'active' | 'draft-ready'
  evidence: MobileReflectionEvidence[]
  records: MobileReflectionRecord[]
  operationMessage: string
}

const defaultRecordId = 'reflection-smart-manufacturing-lesson-5'

const state = reactive<MobileReflectionState>({
  startMethod: 'report',
  selectedCourse: '智能制造基础',
  selectedLesson: '第 5 次课',
  aiSessionStatus: 'idle',
  evidence: [
    { id: 'class-analysis-report', title: '课堂分析报告', type: 'report', status: 'selected' },
    { id: 'class-audio', title: '课堂录音', type: 'audio', status: 'selected' },
  ],
  records: [
    {
      id: defaultRecordId,
      title: '《智能制造基础》第 5 次课后反思',
      course: '智能制造基础',
      lesson: '第 5 次课',
      className: '智能制造 2301 班',
      status: 'draft',
      draft: '课堂整体参与度较高，但架构层次理解和小组讨论均衡性仍需改进。',
      evidenceIds: ['class-analysis-report', 'class-audio'],
      adminStoreRefs: ['reflectionStore.records'],
    },
  ],
  operationMessage: '',
})

export function getMobileReflectionState(): MobileReflectionState {
  return state
}

export function startReflection(method: ReflectionStartMethod): void {
  state.startMethod = method
  if (method === 'audio') addReflectionMaterial('课堂录音', 'audio')
  if (method === 'material') addReflectionMaterial('教学资料', 'material')
  if (method === 'chat') startReflectionAiSession()
  state.operationMessage = '教学反思已选择开始方式'
}

export function selectReflectionCourse(course = '智能制造基础'): string {
  state.selectedCourse = course
  ensureRecord().course = course
  state.operationMessage = '已选择反思课程'
  return course
}

export function selectReflectionLesson(lesson = '第 5 次课'): string {
  state.selectedLesson = lesson
  ensureRecord().lesson = lesson
  state.operationMessage = '已选择反思课次'
  return lesson
}

export function selectReflectionEvidence(evidenceId = 'class-analysis-report'): MobileReflectionEvidence {
  const evidence = state.evidence.find((item) => item.id === evidenceId) || state.evidence[0]
  evidence.status = 'selected'
  const record = ensureRecord()
  if (!record.evidenceIds.includes(evidence.id)) record.evidenceIds.push(evidence.id)
  state.operationMessage = '已选择反思依据'
  return evidence
}

export function addReflectionMaterial(title = '补充教学资料', type: MobileReflectionEvidence['type'] = 'material'): MobileReflectionEvidence {
  const id = `reflection-material-${state.evidence.length + 1}`
  const evidence: MobileReflectionEvidence = {
    id,
    title,
    type,
    status: type === 'audio' ? 'recorded' : 'uploaded',
  }
  state.evidence.push(evidence)
  ensureRecord().evidenceIds.push(id)
  state.operationMessage = '反思材料已补充'
  return evidence
}

export function startReflectionAiSession(): void {
  state.aiSessionStatus = 'active'
  ensureRecord().status = 'ai-session'
  state.operationMessage = 'AI 反思会话已开始'
}

export function saveReflectionDraft(extraThought = '补充了一句课堂改进想法'): MobileReflectionRecord {
  const record = ensureRecord()
  record.status = 'draft'
  record.draft = `${record.draft}\n${extraThought}`
  state.aiSessionStatus = 'draft-ready'
  state.operationMessage = '教学反思草稿已保存'
  return record
}

export function optimizeReflectionDraft(): MobileReflectionRecord {
  const record = ensureRecord()
  record.draft = `${record.draft}\nAI 已重新优化问题分析和改进建议。`
  state.aiSessionStatus = 'draft-ready'
  state.operationMessage = 'AI 已重新优化反思草稿'
  return record
}

export function confirmReflection(): MobileReflectionRecord {
  const archiveRecord = createTeachingReflectionArchiveRecord()
  const record = ensureRecord()
  record.status = 'pending-archive'
  record.archiveRecordId = archiveRecord.id
  record.adminStoreRefs = ['reflectionStore.records', 'archiveStore.processingRecords']
  state.operationMessage = '教学反思已确认，已生成成长档案待确认记录'
  return record
}

export function getConfirmedReflectionArchiveRecord(): MobileArchiveRecord {
  return createTeachingReflectionArchiveRecord()
}

function ensureRecord(): MobileReflectionRecord {
  const existing = state.records.find((record) => record.id === defaultRecordId)
  if (existing) return existing

  const record: MobileReflectionRecord = {
    id: defaultRecordId,
    title: '《智能制造基础》第 5 次课后反思',
    course: state.selectedCourse,
    lesson: state.selectedLesson,
    className: '智能制造 2301 班',
    status: 'draft',
    draft: '课堂整体参与度较高，但架构层次理解和小组讨论均衡性仍需改进。',
    evidenceIds: state.evidence.map((item) => item.id),
    adminStoreRefs: ['reflectionStore.records'],
  }
  state.records.unshift(record)
  return record
}
