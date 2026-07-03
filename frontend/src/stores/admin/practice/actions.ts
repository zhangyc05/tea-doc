import type { ArchiveProcessingRecord } from '@/domain/admin/archive'
import type { PracticeApplication, PracticeRecord, PracticeState } from '@/domain/admin/practice'

type UpsertArchiveRecord = (record: ArchiveProcessingRecord) => unknown

export function approvePracticeApplicationInState(state: PracticeState, applicationId: string) {
  const application = state.applications.find(item => item.id === applicationId)
  if (!application) return null
  application.status = '已同意'
  const tracking = findTrackingByTeacher(state, application.teacher)
  if (tracking) {
    tracking.currentProgress = '实践中'
    tracking.recentAction = `${application.applyTime.slice(5, 10)} 实践申请已同意`
  }
  const record = upsertRecordFromApplication(state, application)
  state.operationMessage = `${application.teacher} 的实践申请已同意。`
  return { application, tracking, record }
}

export function returnPracticeApplicationInState(state: PracticeState, applicationId: string) {
  const application = state.applications.find(item => item.id === applicationId)
  if (!application) return null
  application.status = '退回修改'
  const tracking = findTrackingByTeacher(state, application.teacher)
  if (tracking) {
    tracking.currentProgress = '待审核申请'
    tracking.recentAction = `${application.applyTime.slice(5, 10)} 申请已退回修改`
  }
  state.operationMessage = `${application.teacher} 的实践申请已退回修改。`
  return { application, tracking }
}

export function remindPracticeApplicationInState(state: PracticeState, trackingId: string) {
  const tracking = state.trackings.find(item => item.id === trackingId)
  if (!tracking) return null
  tracking.recentAction = '已提醒提交企业实践申请'
  state.operationMessage = `已提醒 ${tracking.teacher} 提交企业实践申请。`
  return tracking
}

export function remindPracticeMaterialInState(state: PracticeState, recordId: string) {
  const record = state.records.find(item => item.id === recordId)
  if (!record) return null
  record.recentAction = '已提醒补充实践材料'
  state.operationMessage = `已提醒 ${record.teacher} 补充实践材料。`
  return record
}

export function confirmPracticeArchiveInState(state: PracticeState, recordId: string, upsertArchiveRecord: UpsertArchiveRecord) {
  const record = state.records.find(item => item.id === recordId)
  if (!record) return null
  record.currentStatus = '已归档'
  record.countedDays = '已计入'
  record.recentAction = '已确认归档'
  const tracking = findTrackingByTeacher(state, record.teacher)
  if (tracking) {
    const days = getPracticeDays(record.practicePeriod)
    tracking.completedDays = Math.min(tracking.requiredDays, tracking.completedDays + days)
    tracking.remainingDays = Math.max(0, tracking.requiredDays - tracking.completedDays)
    tracking.currentProgress = tracking.remainingDays === 0 ? '已完成' : tracking.currentProgress
    tracking.recentAction = '实践记录已归档'
  }
  upsertArchiveRecord({
    id: `practice-${record.id}`,
    batchId: 'enterprise-practice',
    name: `企业实践记录：${record.company}`,
    teacher: record.teacher,
    dimension: '企业实践',
    source: '企业实践',
    status: '待确认',
    updateTime: '06-24 16:30',
    uploader: '实践管理',
    uploadBatch: '企业实践记录归档',
    originalFile: `${record.company} / ${record.practicePeriod} / ${record.position}`,
    issues: [],
    processingHistory: ['2026-06-24 16:30 企业实践记录确认归档，生成成长档案待确认记录'],
  })
  state.operationMessage = `${record.teacher} 的实践记录已确认归档。`
  return record
}

function upsertRecordFromApplication(state: PracticeState, application: PracticeApplication) {
  const existing = state.records.find(item => item.applicationId === application.id)
  if (existing) {
    existing.currentStatus = '实践中'
    existing.recentAction = '申请同意后进入实践中'
    return existing
  }
  const record: PracticeRecord = {
    id: `app-${application.id}`,
    applicationId: application.id,
    teacher: application.teacher,
    department: application.department,
    major: application.position,
    company: application.company,
    position: application.position,
    practicePeriod: application.practicePeriod.replace('，预计', ' / ').replace(' 天', ' 天'),
    materialStatus: '日志待补 | 总结未提交 | 评价待上传',
    currentStatus: '实践中',
    countedDays: '暂未计入',
    recentAction: '申请同意后进入实践中',
  }
  state.records = [record, ...state.records]
  return record
}

function findTrackingByTeacher(state: PracticeState, teacher: string) {
  return state.trackings.find(item => item.teacher === teacher)
}

function getPracticeDays(period: string) {
  const matched = period.match(/\/\s*(\d+)\s*天/)
  return matched ? Number(matched[1]) : 0
}
