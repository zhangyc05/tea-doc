export type TrainingResourceSource = 'schoolBuilt' | 'externalOrg' | 'enterpriseCoop' | 'openCourse'
export type TrainingResourceStatus = 'available' | 'incomplete' | 'disabled'
export type TrainingResourceLevel = 'national' | 'provincial' | 'municipal' | 'school' | 'enterprise'
export type TrainingResourceDirection = 'digitalTeaching' | 'aiCourse' | 'practiceTeaching' | 'courseIdeology' | 'teachingEvaluation' | 'teachingInnovation'
export type TrainingDemandSource = 'abilityProfile' | 'teacherRequest'
export type TrainingApplicationStatus = 'pendingConfirm' | 'approved' | 'rejected'

export interface TrainingResourceStat {
  key: string
  title: string
  value: string | number
  unit: string
  description: string
  tone: 'blue' | 'green' | 'orange' | 'purple'
  icon: string
}

export interface TrainingResourceMockItem {
  id: string
  name: string
  direction: TrainingResourceDirection
  level: TrainingResourceLevel
  hours: number
  institution: string
  audience: string
  source: TrainingResourceSource
  status: TrainingResourceStatus
  keywords: string[]
  description: string
}

export interface ResourceDistributionItem {
  key: string
  label: string
  value: number
  percent: string
  tone: 'blue' | 'green' | 'orange' | 'purple' | 'slate'
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

export const trainingResourceDirectionText: Record<TrainingResourceDirection, string> = {
  digitalTeaching: '数字化教学',
  aiCourse: 'AI 课程建设',
  practiceTeaching: '实践教学',
  courseIdeology: '课程思政',
  teachingEvaluation: '教学评价',
  teachingInnovation: '教学创新',
}

export const trainingResourceLevelText: Record<TrainingResourceLevel, string> = {
  national: '国家级',
  provincial: '省级',
  municipal: '市级',
  school: '校级',
  enterprise: '企业培训',
}

export const trainingResourceSourceText: Record<TrainingResourceSource, string> = {
  schoolBuilt: '校内建设',
  externalOrg: '外部机构',
  enterpriseCoop: '企业合作',
  openCourse: '公开课程',
}

export const trainingResourceStatusText: Record<TrainingResourceStatus, string> = {
  available: '可用',
  incomplete: '信息待完善',
  disabled: '已停用',
}

export const trainingResources: TrainingResourceMockItem[] = [
  {
    id: 'TR-001',
    name: '职业教育数字化教学能力提升培训',
    direction: 'digitalTeaching',
    level: 'provincial',
    hours: 32,
    institution: '省职业教育教师发展中心',
    audience: '相关专业教师',
    source: 'externalOrg',
    status: 'available',
    keywords: ['数字化教学', '课堂数据', '教学资源'],
    description: '围绕数字化教学资源建设、课堂组织和学习数据应用，帮助教师提升数字化教学能力。',
  },
  {
    id: 'TR-002',
    name: 'AI 赋能课程建设专题培训',
    direction: 'aiCourse',
    level: 'school',
    hours: 16,
    institution: '教师发展中心',
    audience: '全校教师',
    source: 'schoolBuilt',
    status: 'available',
    keywords: ['AI 课程建设', '教学设计', '资源生成'],
    description: '面向全校教师开展 AI 课程建设方法培训，覆盖课程设计、资源生成和教学应用场景。',
  },
  {
    id: 'TR-003',
    name: '双师型教师实践能力提升培训',
    direction: 'practiceTeaching',
    level: 'enterprise',
    hours: 40,
    institution: '智能制造合作企业',
    audience: '工科专业教师',
    source: 'enterpriseCoop',
    status: 'available',
    keywords: ['实践教学', '企业项目', '双师型'],
    description: '结合企业真实生产任务，帮助教师提升项目实践、岗位任务转化和实践课程设计能力。',
  },
  {
    id: 'TR-004',
    name: '课程思政教学设计研修',
    direction: 'courseIdeology',
    level: 'municipal',
    hours: 24,
    institution: '市教师发展联盟',
    audience: '课程负责人',
    source: 'externalOrg',
    status: 'incomplete',
    keywords: ['课程思政', '教学案例', '育人目标'],
    description: '围绕专业课程思政元素挖掘、教学案例设计和课堂融入方式开展研修。',
  },
  {
    id: 'TR-005',
    name: '教学评价能力提升培训',
    direction: 'teachingEvaluation',
    level: 'provincial',
    hours: 20,
    institution: '教育评估中心',
    audience: '教学骨干',
    source: 'externalOrg',
    status: 'available',
    keywords: ['教学评价', '评价量规', '学习成效'],
    description: '训练教师构建过程性评价方案，完善课堂评价量规和学习成效分析方法。',
  },
  {
    id: 'TR-006',
    name: '教学资源建设公开课',
    direction: 'digitalTeaching',
    level: 'school',
    hours: 8,
    institution: '公开平台',
    audience: '需自主学习教师',
    source: 'openCourse',
    status: 'disabled',
    keywords: ['公开课程', '资源建设', '在线学习'],
    description: '公开课程资源，覆盖在线资源整理、课程资源发布和教学素材管理。',
  },
  {
    id: 'TR-007',
    name: '教师教学创新能力提升工作坊',
    direction: 'teachingInnovation',
    level: 'school',
    hours: 16,
    institution: '教师发展中心',
    audience: '全校教师',
    source: 'schoolBuilt',
    status: 'available',
    keywords: ['教学创新', '课堂设计', '成果孵化'],
    description: '面向教学创新项目培育，支持教师完成课堂设计、成果沉淀和展示材料打磨。',
  },
  {
    id: 'TR-008',
    name: '企业实践教学案例开发培训',
    direction: 'practiceTeaching',
    level: 'enterprise',
    hours: 24,
    institution: '合作企业联合体',
    audience: '专业教师',
    source: 'enterpriseCoop',
    status: 'available',
    keywords: ['企业实践', '案例开发', '项目教学'],
    description: '支持教师将企业真实案例转化为课堂项目和实践教学任务。',
  },
]

export const trainingResourceStats: TrainingResourceStat[] = [
  {
    key: 'total',
    title: '资源总数',
    value: 68,
    unit: '个',
    description: '资源库内全部培训资源',
    tone: 'blue',
    icon: 'list',
  },
  {
    key: 'available',
    title: '可用资源',
    value: 52,
    unit: '个',
    description: '信息完整，当前可被使用',
    tone: 'green',
    icon: 'check',
  },
  {
    key: 'incomplete',
    title: '信息待完善',
    value: 10,
    unit: '个',
    description: '缺少关键字段需完善',
    tone: 'orange',
    icon: 'edit',
  },
  {
    key: 'source',
    title: '资源来源',
    value: 4,
    unit: '类',
    description: '校内建设、外部机构等',
    tone: 'purple',
    icon: 'book',
  },
]

export const resourceSourceDistribution: ResourceDistributionItem[] = [
  { key: 'schoolBuilt', label: '校内建设', value: 18, percent: '26.5%', tone: 'blue' },
  { key: 'externalOrg', label: '外部机构', value: 24, percent: '35.3%', tone: 'green' },
  { key: 'enterpriseCoop', label: '企业合作', value: 14, percent: '20.6%', tone: 'orange' },
  { key: 'openCourse', label: '公开课程', value: 12, percent: '17.6%', tone: 'orange' },
]

export const resourceLevelDistribution: ResourceDistributionItem[] = [
  { key: 'national', label: '国家级', value: 8, percent: '11.8%', tone: 'blue' },
  { key: 'provincial', label: '省级', value: 22, percent: '32.4%', tone: 'blue' },
  { key: 'municipal', label: '市级', value: 12, percent: '17.6%', tone: 'blue' },
  { key: 'school', label: '校级', value: 16, percent: '23.5%', tone: 'blue' },
  { key: 'enterprise', label: '企业培训', value: 10, percent: '14.7%', tone: 'blue' },
]

export const resourceStatusDistribution: ResourceDistributionItem[] = [
  { key: 'available', label: '可用资源', value: 52, percent: '76.5%', tone: 'green' },
  { key: 'incomplete', label: '信息待完善', value: 10, percent: '14.7%', tone: 'orange' },
  { key: 'disabled', label: '已停用', value: 6, percent: '8.8%', tone: 'slate' },
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
    trainingName: '职业教育数字化教学能力提升培训',
    status: 'pendingConfirm',
    appliedAt: '2026-06-22',
  },
]
