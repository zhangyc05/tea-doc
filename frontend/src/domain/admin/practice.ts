export const practiceApplicationStatuses = ['待审核', '已同意', '退回修改', '已撤回'] as const
export const practiceProgressStatuses = ['未启动申请', '待审核申请', '实践中', '已完成'] as const
export const practiceRecordStatuses = ['实践中', '待提交总结', '待企业评价', '待归档确认', '已归档'] as const

export type PracticeApplicationStatus = typeof practiceApplicationStatuses[number]
export type PracticeProgressStatus = typeof practiceProgressStatuses[number]
export type PracticeRecordStatus = typeof practiceRecordStatuses[number]

export type PracticeApplication = {
  id: string
  teacher: string
  teacherNo: string
  department: string
  annualStatus: string
  remainingDays: number
  company: string
  position: string
  practicePeriod: string
  estimatedDays: string
  status: PracticeApplicationStatus
  applyTime: string
}

export type PracticeTracking = {
  id: string
  teacher: string
  department: string
  major: string
  completionStatus: string
  currentProgress: PracticeProgressStatus
  recentAction: string
  requiredDays: number
  completedDays: number
  remainingDays: number
}

export type PracticeRecord = {
  id: string
  applicationId?: string
  teacher: string
  department: string
  major: string
  company: string
  position: string
  practicePeriod: string
  materialStatus: string
  currentStatus: PracticeRecordStatus
  countedDays: string
  recentAction: string
}

export type PracticeState = {
  applications: PracticeApplication[]
  trackings: PracticeTracking[]
  records: PracticeRecord[]
  operationMessage: string
}
