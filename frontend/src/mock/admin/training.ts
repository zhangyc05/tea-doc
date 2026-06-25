export type TrainingResourceType = 'schoolBuilt' | 'externalOrg' | 'enterpriseCoop' | 'openCourse'
export type TrainingResourceStatus = 'available' | 'draft' | 'incomplete' | 'disabled'
export type TrainingDemandSource = 'abilityProfile' | 'teacherRequest'
export type TrainingApplicationStatus = 'pendingConfirm' | 'approved' | 'rejected'

export interface TrainingResourceStat {
  key: string
  title: string
  value: string | number
  description: string
  tone: 'primary' | 'success' | 'warning' | 'info' | 'neutral'
}

export interface TrainingResourceMockItem {
  id: string
  name: string
  type: TrainingResourceType
  status: TrainingResourceStatus
  provider: string
  direction: string
  description: string
  completeness: number
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

export const trainingResourceStatusText: Record<TrainingResourceStatus, string> = {
  available: '可用',
  draft: '草稿',
  incomplete: '信息待完善',
  disabled: '已停用',
}

export const trainingResources: TrainingResourceMockItem[] = [
  {
    id: 'TR-001',
    name: '智能制造项目化教学工作坊',
    type: 'schoolBuilt',
    status: 'available',
    provider: '教师发展中心',
    direction: '项目化课程设计',
    description: '围绕智能制造专业课程，帮助教师完成项目化教学任务设计、课堂组织和过程评价设计。',
    completeness: 96,
    updatedAt: '2026-06-20',
  },
  {
    id: 'TR-002',
    name: '企业真实项目课程开发训练营',
    type: 'enterpriseCoop',
    status: 'available',
    provider: '校企合作办公室',
    direction: '企业项目转化',
    description: '结合企业真实生产项目，训练教师将企业任务转化为课程项目和学生实践任务。',
    completeness: 92,
    updatedAt: '2026-06-18',
  },
  {
    id: 'TR-003',
    name: '职业教育数字化教学公开课',
    type: 'openCourse',
    status: 'incomplete',
    provider: '公开课程平台',
    direction: '数字化教学',
    description: '提供数字化教学工具使用、在线课程组织和课堂数据分析的公开课程资源。',
    completeness: 68,
    updatedAt: '2026-06-12',
  },
  {
    id: 'TR-004',
    name: '双师型教师企业实践能力提升班',
    type: 'externalOrg',
    status: 'available',
    provider: '省级教师发展联盟',
    direction: '双师实践能力',
    description: '面向需要强化企业实践经历和产业认知的教师，提供集中培训和案例研讨。',
    completeness: 88,
    updatedAt: '2026-06-10',
  },
]

export const trainingResourceStats: TrainingResourceStat[] = [
  {
    key: 'total',
    title: '资源总数',
    value: trainingResources.length,
    description: '当前资源库中已登记的培训资源。',
    tone: 'primary',
  },
  {
    key: 'available',
    title: '可用资源',
    value: trainingResources.filter((resource) => resource.status === 'available').length,
    description: '可直接用于培训组织或教师查看。',
    tone: 'success',
  },
  {
    key: 'incomplete',
    title: '信息待完善',
    value: trainingResources.filter((resource) => resource.status === 'incomplete').length,
    description: '需要补充说明、适用方向或提供方信息。',
    tone: 'warning',
  },
  {
    key: 'types',
    title: '资源类型数量',
    value: new Set(trainingResources.map((resource) => resource.type)).size,
    description: '校内建设、外部机构、企业合作、公开课程。',
    tone: 'info',
  },
]

export const trainingResourcesMock = trainingResources

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
