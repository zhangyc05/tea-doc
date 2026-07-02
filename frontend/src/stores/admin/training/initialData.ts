import type {
  TrainingApplication,
  TrainingDemand,
  TrainingParticipant,
  TrainingPlan,
  TrainingRecord,
  TrainingRecordMaterialStatus,
  TrainingResource,
  TrainingState,
} from '@/domain/admin/training'

export const initialResources: TrainingResource[] = [
  { id: '1', name: '职业教育数字化教学能力提升培训', direction: '数字化教学', level: '省级', hours: '32学时', institution: '省职业教育教师发展中心', target: '相关专业教师', source: '外部机构', status: '可用' },
  { id: '2', name: 'AI 赋能课程建设专题培训', direction: 'AI 课程建设', level: '校级', hours: '16学时', institution: '教师发展中心', target: '全校教师', source: '校内建设', status: '可用' },
  { id: '3', name: '双师型教师实践能力提升培训', direction: '实践教学', level: '企业培训', hours: '40学时', institution: '智能制造合作企业', target: '工科专业教师', source: '企业合作', status: '可用' },
  { id: '4', name: '课程思政教学设计研修', direction: '课程思政', level: '市级', hours: '24学时', institution: '市教师发展联盟', target: '课程负责人', source: '外部机构', status: '信息待完善' },
  { id: '5', name: '教学评价能力提升培训', direction: '教学评价', level: '省级', hours: '20学时', institution: '教育评估中心', target: '教学骨干', source: '外部机构', status: '可用' },
  { id: '6', name: '教学资源建设公开课', direction: '数字化教学', level: '公开课程', hours: '8学时', institution: '公开平台', target: '需自主学习教师', source: '公开课程', status: '已停用' },
  { id: '7', name: '教师教学创新能力提升工作坊', direction: '教学创新', level: '校级', hours: '16学时', institution: '教师发展中心', target: '全校教师', source: '校内建设', status: '可用' },
  { id: '8', name: '企业实践教学案例开发培训', direction: '实践教学', level: '企业培训', hours: '24学时', institution: '合作企业联合体', target: '专业教师', source: '企业合作', status: '可用' },
]

export const initialDemands: TrainingDemand[] = [
  { id: '1', teacher: '林老师', department: '智能制造学院', major: '机电一体化技术', direction: '数字化教学', source: '能力画像观察', matchStatus: '已匹配', suggestedResource: '职业教育数字化教学能力提升培训' },
  { id: '2', teacher: '陈老师', department: '电子信息学院', major: '软件技术', direction: 'AI 赋能课程建设', source: '教师主动提出', matchStatus: '待匹配', suggestedResource: '暂无合适资源' },
  { id: '3', teacher: '王老师', department: '智能制造学院', major: '工业机器人技术', direction: '实训课程组织', source: '管理主动添加', matchStatus: '已匹配', suggestedResource: '双师型教师实践能力提升培训' },
  { id: '4', teacher: '赵老师', department: '现代服务学院', major: '电子商务', direction: '课程思政设计', source: '教师主动提出', matchStatus: '暂不处理', suggestedResource: '—' },
  { id: '5', teacher: '孙老师', department: '外语学院', major: '应用英语', direction: '数字资源建设', source: '能力画像观察', matchStatus: '已匹配', suggestedResource: '数字化教学资源建设培训' },
]

const initialParticipants: TrainingParticipant[] = [
  { id: 'lin', name: '林老师', department: '智能制造学院', major: '机电一体化技术', applicationStatus: '已同意', participationStatus: '待开始', materialStatus: '—' },
  { id: 'chen', name: '陈老师', department: '电子信息学院', major: '软件技术', applicationStatus: '待处理', participationStatus: '待开始', materialStatus: '—' },
  { id: 'wang', name: '王老师', department: '智能制造学院', major: '工业机器人技术', applicationStatus: '已同意', participationStatus: '待开始', materialStatus: '—' },
  { id: 'zhao', name: '赵老师', department: '现代服务学院', major: '电子商务', applicationStatus: '已同意', participationStatus: '待开始', materialStatus: '—' },
]

export const initialPlans: TrainingPlan[] = [
  makePlan('summer-digital', '2026 年暑期数字化教学能力提升培训', '数字化教学', '智能制造学院、电子信息学院相关教师', '2026-07-10', '2026-07-14', '自主报名', '报名中', 18, 30, '数字化教学能力提升需求', '职业教育数字化教学能力提升培训', '本次培训旨在提升教师的数字化教学能力，掌握现代教育技术和方法。', '教师发展中心', '省职业教育教师发展中心', '需要', 30, cloneParticipants(initialParticipants)),
  makePlan('practice-ability', '双师型教师实践能力提升培训', '实践教学', '智能制造学院相关教师', '2026-06-01', '2026-06-07', '定向推荐', '进行中', 24, 25, '实践教学能力提升需求', '双师型教师实践能力提升培训', '结合企业真实生产任务，提升项目实践能力。', '教师发展中心', '智能制造合作企业', '不需要', 25, []),
  makePlan('ai-course', 'AI 赋能课程建设专题培训', 'AI 课程建设', '全校教师', '2026-05-20', '2026-05-21', '自主报名', '材料待完善', 46, 52, 'AI 课程建设需求', 'AI 赋能课程建设专题培训', '面向全校教师开展 AI 课程建设方法培训。', '教师发展中心', '教师发展中心', '需要', 52, []),
  makePlan('course-ideology', '课程思政教学设计研修', '课程思政', '现代服务学院相关教师', '2026-04-12', '2026-04-15', '指定参加', '已完成', 30, 30, '课程思政设计需求', '课程思政教学设计研修', '围绕专业课程思政元素挖掘开展研修。', '教师发展中心', '市教师发展联盟', '不需要', 30, []),
]

export const initialApplications: TrainingApplication[] = [
  { id: '1', applicant: '林老师', teacherId: 'lin', department: '智能制造学院', major: '机电一体化技术', planId: 'summer-digital', trainingName: '2026 年暑期数字化教学能力提升培训', reason: '希望提升课堂数据应用能力', applyTime: '2026-06-21 10:20', quotaInfo: '18 / 30', status: '待处理' },
  { id: '2', applicant: '陈老师', teacherId: 'chen', department: '电子信息学院', major: '软件技术', planId: 'ai-course', trainingName: 'AI 赋能课程建设专题培训', reason: '课程建设需要使用 AI 工具', applyTime: '2026-06-22 09:15', quotaInfo: '46 / 52', status: '待处理' },
  { id: '3', applicant: '王老师', teacherId: 'wang', department: '智能制造学院', major: '工业机器人技术', planId: 'practice-ability', trainingName: '双师型教师实践能力提升培训', reason: '与本学期实训课程相关', applyTime: '2026-06-20 16:40', quotaInfo: '24 / 25', status: '已同意' },
  { id: '4', applicant: '赵老师', teacherId: 'zhao', department: '现代服务学院', major: '电子商务', planId: 'course-ideology', trainingName: '课程思政教学设计研修', reason: '申请参加本次专题研修', applyTime: '2026-06-18 14:30', quotaInfo: '30 / 30', status: '未同意' },
  { id: '5', applicant: '孙老师', teacherId: 'sun', department: '外语学院', major: '应用英语', planId: 'digital-resource', trainingName: '数字化教学资源建设培训', reason: '计划优化课程资源设计', applyTime: '2026-06-17 11:05', quotaInfo: '12 / 20', status: '已取消' },
]

export const initialRecords: TrainingRecord[] = [
  makeRecord('digital-training-lin', '林老师', 'lin', '智能制造学院', '机电一体化技术', '职业教育数字化教学能力提升培训', '2026-05-10 至 2026-05-14', '32 学时', '证书待补', '省级培训', '省职业教育教师发展中心', '2026-05-10', '2026-05-14'),
  makeRecord('ai-course-chen', '陈老师', 'chen', '电子信息学院', '软件技术', 'AI 赋能课程建设专题培训', '2026-05-20 至 2026-05-21', '16 学时', '待总结', '校级', '教师发展中心', '2026-05-20', '2026-05-21'),
  makeRecord('practice-training-wang', '王老师', 'wang', '智能制造学院', '工业机器人技术', '双师型教师实践能力提升培训', '2026-06-01 至 2026-06-07', '40 学时', '学习中', '企业培训', '智能制造合作企业', '2026-06-01', '2026-06-07'),
  makeRecord('ideology-course-zhao', '赵老师', 'zhao', '现代服务学院', '电子商务', '课程思政教学设计研修', '2026-04-12 至 2026-04-15', '24 学时', '记录完整', '市级', '市教师发展联盟', '2026-04-12', '2026-04-15'),
]

export function createInitialTrainingState(): TrainingState {
  return {
    resources: cloneResources(initialResources),
    demands: cloneDemands(initialDemands),
    plans: clonePlans(initialPlans),
    applications: cloneApplications(initialApplications),
    records: cloneRecords(initialRecords),
    operationMessage: '',
  }
}

function makePlan(id: string, name: string, direction: string, target: string, startDate: string, endDate: string, participation: string, status: TrainingPlan['status'], currentParticipants: number, maxParticipants: number, relatedDemand: string, relatedResource: string, description: string, organization: string, provider: string, applicationRequired: string, quota: number, participants: TrainingParticipant[]): TrainingPlan {
  return { id, name, direction, target, startDate, endDate, participation, status, currentParticipants, maxParticipants, relatedDemand, relatedResource, description, organization, provider, applicationRequired, quota, participants }
}

function makeRecord(id: string, teacher: string, teacherId: string, department: string, major: string, planName: string, trainingDate: string, hours: string, materialStatus: TrainingRecordMaterialStatus, level: string, institution: string, startDate: string, endDate: string): TrainingRecord {
  return {
    id,
    teacher,
    teacherId,
    department,
    major,
    planName,
    trainingDate,
    hours,
    materialStatus,
    level,
    institution,
    startDate,
    endDate,
    source: '教师端培训记录',
    method: '教师填写 + AI 总结草稿 + 教师确认',
    updateTime: '2026-05-15 09:30',
    mode: '线上 + 线下',
    destination: '成长档案 / 个人发展维度',
    materials: [
      { name: '培训结业证书', status: materialStatus === '证书待补' ? '待补充' : '已上传', uploadTime: materialStatus === '证书待补' ? '—' : '2026-05-15 10:20' },
      { name: '学习证明材料', status: '已上传', uploadTime: '2026-05-15 10:20' },
    ],
  }
}

export function cloneResources(resources: TrainingResource[]) {
  return resources.map(item => ({ ...item }))
}

export function cloneDemands(demands: TrainingDemand[]) {
  return demands.map(item => ({ ...item }))
}

export function cloneParticipants(participants: TrainingParticipant[]) {
  return participants.map(item => ({ ...item }))
}

export function clonePlans(plans: TrainingPlan[]) {
  return plans.map(item => ({ ...item, participants: cloneParticipants(item.participants) }))
}

export function cloneApplications(applications: TrainingApplication[]) {
  return applications.map(item => ({ ...item }))
}

export function cloneRecords(records: TrainingRecord[]) {
  return records.map(item => ({ ...item, materials: item.materials.map(material => ({ ...material })) }))
}
