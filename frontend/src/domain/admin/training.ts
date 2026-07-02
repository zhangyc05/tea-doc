export type TrainingResourceStatus = '可用' | '信息待完善' | '已停用'
export type TrainingDemandStatus = '待匹配' | '已匹配' | '暂不处理'
export type TrainingPlanStatus = '草稿' | '报名中' | '进行中' | '已完成' | '材料待完善'
export type TrainingApplicationStatus = '待处理' | '已同意' | '未同意' | '已取消'
export type TrainingMaterialStatus = '待补充' | '已上传'
export type TrainingRecordMaterialStatus = '学习中' | '待总结' | '证书待补' | '记录完整'

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

export type TrainingState = {
  resources: TrainingResource[]
  demands: TrainingDemand[]
  plans: TrainingPlan[]
  applications: TrainingApplication[]
  records: TrainingRecord[]
  operationMessage: string
}
