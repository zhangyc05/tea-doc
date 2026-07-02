export type TrainingResourceStatus = '可用' | '信息待完善' | '已停用'
export type TrainingDemandStatus = '待匹配' | '已匹配' | '暂不处理'
export type TrainingPlanStatus = '草稿' | '报名中' | '进行中' | '已完成' | '材料待完善'
export type TrainingApplicationStatus = '待处理' | '已同意' | '未同意' | '已取消'
export type TrainingMaterialStatus = '待补充' | '已上传'
export type TrainingRecordMaterialStatus = '学习中' | '待总结' | '证书待补' | '记录完整'

export const trainingPlanStatusClassMap: Record<TrainingPlanStatus, string> = {
  草稿: '草稿',
  报名中: '报名中',
  进行中: '进行中',
  已完成: '已完成',
  材料待完善: '材料待完善',
}

export const trainingApplicationStatusClassMap: Record<TrainingApplicationStatus, string> = {
  待处理: '待处理',
  已同意: '已同意',
  未同意: '未同意',
  已取消: '已取消',
}

export const trainingResourceStatusClassMap: Record<TrainingResourceStatus, string> = {
  可用: '可用',
  信息待完善: '信息待完善',
  已停用: '已停用',
}

export const trainingDemandStatusClassMap: Record<TrainingDemandStatus, string> = {
  待匹配: '待匹配',
  已匹配: '已匹配',
  暂不处理: '暂不处理',
}

export const trainingRecordMaterialStatusClassMap: Record<TrainingRecordMaterialStatus, string> = {
  学习中: '学习中',
  待总结: '待总结',
  证书待补: '证书待补',
  记录完整: '记录完整',
}

export const trainingMaterialStatusClassMap: Record<TrainingMaterialStatus, string> = {
  待补充: '待补充',
  已上传: '已上传',
}

export function getTrainingPlanStatusClass(status: TrainingPlanStatus): string {
  return trainingPlanStatusClassMap[status]
}

export function getTrainingApplicationStatusClass(status: TrainingApplicationStatus): string {
  return trainingApplicationStatusClassMap[status]
}

export function getTrainingResourceStatusClass(status: TrainingResourceStatus): string {
  return trainingResourceStatusClassMap[status]
}

export function getTrainingDemandStatusClass(status: TrainingDemandStatus): string {
  return trainingDemandStatusClassMap[status]
}

export function getTrainingRecordMaterialStatusClass(status: TrainingRecordMaterialStatus): string {
  return trainingRecordMaterialStatusClassMap[status]
}

export function getTrainingMaterialStatusClass(status: TrainingMaterialStatus): string {
  return trainingMaterialStatusClassMap[status]
}

export type TrainingResource = {
  id: string
  name: string
  direction: string
  level: string
  hours: string
  institution: string
  target: string
  source: string
  status: TrainingResourceStatus
}

export type TrainingDemand = {
  id: string
  teacher: string
  department: string
  major: string
  direction: string
  source: string
  matchStatus: TrainingDemandStatus
  suggestedResource: string
}

export type TrainingParticipant = {
  id: string
  name: string
  department: string
  major: string
  applicationStatus: TrainingApplicationStatus
  participationStatus: string
  materialStatus: string
}

export type TrainingPlan = {
  id: string
  name: string
  direction: string
  target: string
  startDate: string
  endDate: string
  participation: string
  status: TrainingPlanStatus
  currentParticipants: number
  maxParticipants: number
  relatedDemand: string
  relatedResource: string
  description: string
  organization: string
  provider: string
  applicationRequired: string
  quota: number
  participants: TrainingParticipant[]
}

export type TrainingApplication = {
  id: string
  applicant: string
  teacherId: string
  department: string
  major: string
  planId: string
  trainingName: string
  reason: string
  applyTime: string
  quotaInfo: string
  status: TrainingApplicationStatus
}

export type TrainingMaterial = {
  name: string
  status: TrainingMaterialStatus
  uploadTime: string
}

export type TrainingRecord = {
  id: string
  teacher: string
  teacherId: string
  department: string
  major: string
  planName: string
  trainingDate: string
  hours: string
  materialStatus: TrainingRecordMaterialStatus
  level: string
  institution: string
  startDate: string
  endDate: string
  source: string
  method: string
  updateTime: string
  mode: string
  destination: string
  materials: TrainingMaterial[]
}

export type TrainingPlanPageMock = {
  organizations: string[]
  statuses: string[]
  years: string[]
  participationModes: string[]
  reminders: string[]
  applicationOptions: string[]
  materialOptions: string[]
}

export type TrainingPlanScheduleItem = {
  date: string
  content: string
}

export type TrainingRelatedDemand = {
  direction: string
  source: string
  target: string
  note: string
}

export type TrainingProgressNode = {
  label: string
  date: string
  active: boolean
}

export type TrainingPlanDetailMock = {
  applicationStartDate: string
  applicationEndDate: string
  location: string
  entry: string
  schedule: TrainingPlanScheduleItem[]
  materialRequirements: string[]
  recordDestination: string
  relatedDemands: TrainingRelatedDemand[]
  progressNodes: TrainingProgressNode[]
}

export type TrainingLearningRecord = {
  date: string
  content: string
  status: string
}

export type TrainingSummary = {
  content: string
  submitTime: string
}

export type TrainingRelatedRecord = {
  id: string
  name: string
  teacher: string
  level: string
  hours: string
  materialStatus: TrainingRecordMaterialStatus
}

export type TrainingRecordDetailMock = {
  learningRecords: TrainingLearningRecord[]
  trainingSummary: TrainingSummary
  relatedRecords: TrainingRelatedRecord[]
}

export type TrainingState = {
  resources: TrainingResource[]
  demands: TrainingDemand[]
  plans: TrainingPlan[]
  applications: TrainingApplication[]
  records: TrainingRecord[]
  operationMessage: string
}
