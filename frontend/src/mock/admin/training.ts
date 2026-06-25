export type TrainingResourceType = 'schoolBuilt' | 'externalOrg' | 'enterpriseCoop' | 'openCourse'
export type TrainingResourceStatus = 'published' | 'draft' | 'disabled'
export type TrainingDemandSource = 'abilityProfile' | 'teacherRequest'
export type TrainingApplicationStatus = 'pendingConfirm' | 'approved' | 'rejected'

export interface TrainingResourceMockItem {
  id: string
  name: string
  type: TrainingResourceType
  status: TrainingResourceStatus
  provider: string
  updatedAt: string
}

export interface TrainingDemandMockItem {
  id: string
  title: string
  source: TrainingDemandSource
  relatedAbility: string
  createdAt: string
}

export interface TrainingApplicationMockItem {
  id: string
  teacherName: string
  college: string
  trainingName: string
  status: TrainingApplicationStatus
  appliedAt: string
}

export const trainingResourceTypeText: Record<TrainingResourceType, string> = {
  schoolBuilt: '校内建设',
  externalOrg: '外部机构',
  enterpriseCoop: '企业合作',
  openCourse: '公开课程',
}

export const trainingResourcesMock: TrainingResourceMockItem[] = [
  {
    id: 'TR-001',
    name: '智能制造项目化教学工作坊',
    type: 'schoolBuilt',
    status: 'published',
    provider: '教师发展中心',
    updatedAt: '2026-06-20',
  },
  {
    id: 'TR-002',
    name: '企业真实项目课程开发训练营',
    type: 'enterpriseCoop',
    status: 'published',
    provider: '校企合作办公室',
    updatedAt: '2026-06-18',
  },
  {
    id: 'TR-003',
    name: '职业教育数字化教学公开课',
    type: 'openCourse',
    status: 'draft',
    provider: '公开课程平台',
    updatedAt: '2026-06-12',
  },
]

export const trainingDemandsMock: TrainingDemandMockItem[] = [
  {
    id: 'TD-001',
    title: '提升项目化课程设计能力',
    source: 'abilityProfile',
    relatedAbility: '教学能力 / 课程设计',
    createdAt: '2026-06-21',
  },
  {
    id: 'TD-002',
    title: '学习企业真实项目转化方法',
    source: 'teacherRequest',
    relatedAbility: '实践能力 / 企业项目转化',
    createdAt: '2026-06-19',
  },
]

export const trainingApplicationsMock: TrainingApplicationMockItem[] = [
  {
    id: 'TA-001',
    teacherName: '林老师',
    college: '智能制造学院',
    trainingName: '智能制造项目化教学工作坊',
    status: 'pendingConfirm',
    appliedAt: '2026-06-22',
  },
]
