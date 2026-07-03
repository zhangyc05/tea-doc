import { reactive } from 'vue'
import { createEnterprisePracticeArchiveRecord, type MobileArchiveRecord } from './archive'

export type EnterpriseFilter = '全部' | '进行中' | '待归档' | '已归档' | '需补充'
export type EnterprisePlanStatus = '草稿' | '待审核' | '已同意' | '退回修改'
export type EnterpriseRecordStatus = '进行中' | '待归档' | '归档确认中' | '需补充' | '已归档'
export type EnterpriseMaterialStatus = '待补充' | '已上传'

export type MobileEnterpriseRecord = {
  id: string
  company: string
  role: string
  date: string
  days: number
  note: string
  status: EnterpriseRecordStatus
  materialStatus: EnterpriseMaterialStatus
  logCount: number
  archiveDraft?: string
  adminStoreRefs: string[]
}

export type MobileEnterpriseApplication = {
  id: string
  practiceId: string
  company: string
  role: string
  status: EnterprisePlanStatus
  adminStoreRefs: string[]
}

type MobileEnterpriseState = {
  selectedFilter: EnterpriseFilter
  records: MobileEnterpriseRecord[]
  applications: MobileEnterpriseApplication[]
  operationMessage: string
}

const defaultPracticeId = 'enterprise-smart-equipment'

const state = reactive<MobileEnterpriseState>({
  selectedFilter: '进行中',
  records: [
    {
      id: defaultPracticeId,
      company: '山东某智能装备有限公司',
      role: '软件开发工程师',
      date: '2026-05-10 至 2026-05-20',
      days: 10,
      note: '已记录 8 天',
      status: '进行中',
      materialStatus: '已上传',
      logCount: 8,
      adminStoreRefs: ['practiceStore.records'],
    },
    {
      id: 'enterprise-jinan-training-base',
      company: '济南智能制造实训基地',
      role: '设备调试与产线观察',
      date: '2026-03-01 至 2026-03-08',
      days: 8,
      note: '待补充材料',
      status: '需补充',
      materialStatus: '待补充',
      logCount: 0,
      adminStoreRefs: ['practiceStore.records', 'archiveStore.processingRecords'],
    },
    {
      id: 'enterprise-qingdao-equipment',
      company: '青岛某装备有限公司',
      role: '工业机器人应用实践',
      date: '2026-01-05 至 2026-01-16',
      days: 10,
      note: '10 天',
      status: '已归档',
      materialStatus: '已上传',
      logCount: 6,
      adminStoreRefs: ['practiceStore.records', 'teacherArchiveFacts'],
    },
  ],
  applications: [],
  operationMessage: '',
})

export function getMobileEnterpriseState(): MobileEnterpriseState {
  return state
}

export function setEnterpriseFilter(filter: EnterpriseFilter): EnterpriseFilter {
  state.selectedFilter = filter
  return filter
}

export function filteredEnterpriseRecords(): MobileEnterpriseRecord[] {
  if (state.selectedFilter === '全部') return state.records
  return state.records.filter((record) => record.status === state.selectedFilter)
}

export function saveEnterprisePlanDraft(): MobileEnterpriseApplication {
  const application = upsertApplication('enterprise-plan-draft', {
    status: '草稿',
  })
  state.operationMessage = '实践计划草稿已保存'
  return application
}

export function submitEnterprisePlan(): MobileEnterpriseApplication {
  const application = upsertApplication('enterprise-plan-pending', {
    status: '待审核',
  })
  state.operationMessage = '实践计划已提交，等待学院确认'
  return application
}

export function approveEnterprisePlan(applicationId = 'enterprise-plan-pending'): MobileEnterpriseApplication | undefined {
  const application = state.applications.find((item) => item.id === applicationId)
  if (!application) return undefined
  application.status = '已同意'
  ensureRecord(application.practiceId).status = '进行中'
  state.operationMessage = '实践计划已同意，可开始记录日志'
  return application
}

export function rejectEnterprisePlan(applicationId = 'enterprise-plan-pending'): MobileEnterpriseApplication | undefined {
  const application = state.applications.find((item) => item.id === applicationId)
  if (!application) return undefined
  application.status = '退回修改'
  state.operationMessage = '实践计划已退回修改'
  return application
}

export function saveEnterpriseLogDraft(recordId = defaultPracticeId): MobileEnterpriseRecord {
  const record = ensureRecord(recordId)
  record.note = `日志草稿已保存，已记录 ${record.logCount} 天`
  state.operationMessage = '实践日志草稿已保存'
  return record
}

export function saveEnterpriseLog(recordId = defaultPracticeId): MobileEnterpriseRecord {
  const record = ensureRecord(recordId)
  record.logCount += 1
  record.note = `已记录 ${record.logCount} 天`
  record.status = '进行中'
  state.operationMessage = '实践日志已保存'
  return record
}

export function saveEnterpriseArchiveDraft(recordId = defaultPracticeId): MobileEnterpriseRecord {
  const record = ensureRecord(recordId)
  record.archiveDraft = '企业实践总结与材料归档草稿'
  record.status = '待归档'
  state.operationMessage = '企业实践归档草稿已保存'
  return record
}

export function submitEnterpriseArchive(recordId = defaultPracticeId): MobileArchiveRecord {
  const record = ensureRecord(recordId)
  record.status = '归档确认中'
  record.materialStatus = '已上传'
  record.adminStoreRefs = ['practiceStore.records', 'archiveStore.processingRecords']
  state.operationMessage = '企业实践归档已提交，等待学院确认'
  return createEnterprisePracticeArchiveRecord()
}

export function submitEnterpriseSupplement(recordId = 'enterprise-jinan-training-base'): MobileArchiveRecord {
  const record = ensureRecord(recordId)
  record.status = '归档确认中'
  record.materialStatus = '已上传'
  record.adminStoreRefs = ['practiceStore.records', 'archiveStore.processingRecords']
  state.operationMessage = '补充材料已提交，等待重新核验'
  return createEnterprisePracticeArchiveRecord()
}

export function submitEnterpriseHistory(): MobileArchiveRecord {
  const record = ensureRecord('enterprise-jinan-training-base')
  record.status = '归档确认中'
  record.materialStatus = '已上传'
  record.adminStoreRefs = ['practiceStore.records', 'archiveStore.processingRecords']
  state.operationMessage = '历史企业实践已提交确认'
  return createEnterprisePracticeArchiveRecord()
}

function upsertApplication(id: string, patch: Pick<MobileEnterpriseApplication, 'status'>): MobileEnterpriseApplication {
  const existing = state.applications.find((item) => item.id === id)
  if (existing) {
    existing.status = patch.status
    return existing
  }

  const application: MobileEnterpriseApplication = {
    id,
    practiceId: 'enterprise-new-plan',
    company: '山东智联装备有限公司',
    role: '现场工程师助理',
    status: patch.status,
    adminStoreRefs: ['practiceStore.applications'],
  }
  state.applications.unshift(application)
  return application
}

function ensureRecord(recordId: string): MobileEnterpriseRecord {
  const existing = state.records.find((record) => record.id === recordId)
  if (existing) return existing

  const record: MobileEnterpriseRecord = {
    id: recordId,
    company: '山东智联装备有限公司',
    role: '现场工程师助理',
    date: '2026-06-03 至 2026-06-14',
    days: 10,
    note: '待开始记录',
    status: '进行中',
    materialStatus: '待补充',
    logCount: 0,
    adminStoreRefs: ['practiceStore.records'],
  }
  state.records.unshift(record)
  return record
}
