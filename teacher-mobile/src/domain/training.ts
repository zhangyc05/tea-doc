import { createTrainingArchiveRecord, type MobileArchiveRecord } from './archive'

export type MobileTrainingApplicationStatus = '待处理' | '已同意' | '未同意' | '已取消'
export type MobileTrainingDemandStatus = '待匹配' | '已匹配' | '暂不处理' | '已转培训申请'
export type MobileTrainingRecordStatus = '学习中' | '待总结' | '材料待补' | '记录完整' | '归档确认中'
export type MobileTrainingMaterialStatus = '待补充' | '已上传'

export type MobileTrainingResource = {
  id: string
  title: string
  meta: string
  reason: string
  action: '直接学习' | '申请培训'
  learningUrl?: string
  adminStoreRefs: string[]
}

export type MobileTrainingApplication = {
  id: string
  planId: string
  trainingName: string
  applicant: string
  reason: string
  status: MobileTrainingApplicationStatus
  submittedAt: string
  adminStoreRefs: string[]
}

export type MobileTrainingRecord = {
  id: string
  planId: string
  title: string
  status: MobileTrainingRecordStatus
  desc: string
  materialStatus: MobileTrainingMaterialStatus
  summaryDraft: string
  learningNotes: string[]
  adminStoreRefs: string[]
}

export type MobileTrainingDemand = {
  id: string
  type: 'found-training' | 'ability-improvement'
  title: string
  direction: string
  status: MobileTrainingDemandStatus
  submittedAt: string
  nextStep: string
  adminStoreRefs: string[]
}

export type MobileTrainingArchiveTrace = {
  id: string
  recordId: string
  archiveRecordId: string
  status: '待确认'
  adminStoreRefs: string[]
}

export type MobileTrainingState = {
  resources: MobileTrainingResource[]
  applications: MobileTrainingApplication[]
  records: MobileTrainingRecord[]
  demands: MobileTrainingDemand[]
  archiveTraces: MobileTrainingArchiveTrace[]
  operationMessage: string
}

const initialState = (): MobileTrainingState => ({
  resources: [
    {
      id: 'digital-teaching-resource',
      title: '数字化教学能力提升',
      meta: '线上课程  |  可直接学习  |  12 学时',
      reason: '与你的“数字化教学应用”提升建议相关',
      action: '直接学习',
      learningUrl: '/pages/activity/training-summary/index?recordId=digital-teaching-record',
      adminStoreRefs: ['trainingStore.resources', 'trainingStore.records'],
    },
    {
      id: 'project-course-workshop',
      title: '项目化课程设计工作坊',
      meta: '线下培训  |  需申请  |  3 天',
      reason: '适合补充课堂案例设计与项目化教学能力',
      action: '申请培训',
      adminStoreRefs: ['trainingStore.plans', 'trainingStore.applications'],
    },
  ],
  applications: [],
  records: [
    {
      id: 'digital-teaching-record',
      planId: 'digital-teaching-resource',
      title: '数字化教学能力提升',
      status: '学习中',
      desc: '已记录 2 条学习心得',
      materialStatus: '已上传',
      summaryDraft: '本次培训围绕数字化教学资源设计、课堂互动工具应用和学习数据反馈展开。',
      learningNotes: ['完成数字资源设计单元学习', '记录课堂互动工具使用心得'],
      adminStoreRefs: ['trainingStore.records'],
    },
  ],
  demands: [],
  archiveTraces: [],
  operationMessage: '',
})

const state = initialState()

export function getMobileTrainingState() {
  return state
}

export function resetMobileTrainingState() {
  Object.assign(state, initialState())
}

export function submitTrainingApplication(planId = 'project-course-workshop') {
  const resource = state.resources.find(item => item.id === planId) || state.resources[1]
  const existing = state.applications.find(item => item.planId === resource.id)
  if (existing) return existing

  const application: MobileTrainingApplication = {
    id: `training-application-${resource.id}`,
    planId: resource.id,
    trainingName: resource.title,
    applicant: '林老师',
    reason: '希望结合当前任课课程提升项目化教学设计能力。',
    status: '待处理',
    submittedAt: '刚刚',
    adminStoreRefs: ['trainingStore.applications'],
  }
  state.applications.unshift(application)
  state.operationMessage = '培训申请已提交，当前状态为待处理。'
  return application
}

export function approveMobileTrainingApplication(applicationId: string) {
  const application = findTrainingApplicationById(applicationId)
  if (!application) return undefined
  application.status = '已同意'
  if (!state.records.some(record => record.planId === application.planId)) {
    state.records.unshift({
      id: `training-record-${application.planId}`,
      planId: application.planId,
      title: application.trainingName,
      status: '学习中',
      desc: '已加入我的培训，可记录学习过程',
      materialStatus: '待补充',
      summaryDraft: '',
      learningNotes: [],
      adminStoreRefs: ['trainingStore.plans', 'trainingStore.records'],
    })
  }
  state.operationMessage = '培训申请已同意，已进入我的培训。'
  return application
}

export function rejectMobileTrainingApplication(applicationId: string) {
  const application = findTrainingApplicationById(applicationId)
  if (!application) return undefined
  application.status = '未同意'
  state.operationMessage = '培训申请未同意，结果页可查看处理状态。'
  return application
}

export function findTrainingApplicationById(applicationId?: string) {
  return applicationId ? state.applications.find(item => item.id === applicationId) : state.applications[0]
}

export function getTrainingSummaryDraft(recordId = 'digital-teaching-record') {
  return state.records.find(item => item.id === recordId) || state.records[0]
}

export function saveTrainingSummaryDraft(recordId = 'digital-teaching-record') {
  const record = getTrainingSummaryDraft(recordId)
  record.status = '待总结'
  state.operationMessage = '培训总结草稿已保存。'
  return record
}

export function optimizeTrainingSummary(recordId = 'digital-teaching-record') {
  const record = getTrainingSummaryDraft(recordId)
  record.summaryDraft = `${record.summaryDraft} AI 已重新优化表达，保留原学习记录依据。`
  state.operationMessage = 'AI 已重新优化培训总结草稿。'
  return record
}

export function uploadTrainingMaterial(recordId = 'digital-teaching-record') {
  const record = getTrainingSummaryDraft(recordId)
  record.materialStatus = '已上传'
  state.operationMessage = '培训材料已上传。'
  return record
}

export function submitTrainingArchive(recordId = 'digital-teaching-record'): MobileArchiveRecord {
  const record = getTrainingSummaryDraft(recordId)
  record.status = '归档确认中'
  record.materialStatus = '已上传'
  const archiveRecord = createTrainingArchiveRecord()
  const trace: MobileTrainingArchiveTrace = {
    id: `training-archive-${record.id}`,
    recordId: record.id,
    archiveRecordId: archiveRecord.id,
    status: '待确认',
    adminStoreRefs: ['trainingStore.records', 'archiveStore.processingRecords'],
  }
  if (!state.archiveTraces.some(item => item.id === trace.id)) state.archiveTraces.unshift(trace)
  state.operationMessage = '培训记录材料已完整，已生成成长档案待确认记录。'
  return archiveRecord
}

export function submitTrainingDemand(type: MobileTrainingDemand['type'] = 'found-training') {
  const existing = state.demands.find(item => item.type === type)
  if (existing) return existing
  const demand: MobileTrainingDemand = {
    id: `training-demand-${type}`,
    type,
    title: type === 'found-training' ? '全国职业院校数字化教学能力提升研修班' : '数字化教学应用能力提升',
    direction: type === 'found-training' ? '数字化教学' : '数字化教学应用',
    status: '待匹配',
    submittedAt: '刚刚',
    nextStep: '业务部门将在培训需求管理中匹配资源或转为培训申请。',
    adminStoreRefs: ['trainingStore.demands'],
  }
  state.demands.unshift(demand)
  state.operationMessage = '培训需求已提交，当前状态为待匹配。'
  return demand
}

export function findTrainingDemandById(demandId?: string) {
  return demandId ? state.demands.find(item => item.id === demandId) : state.demands[0]
}
