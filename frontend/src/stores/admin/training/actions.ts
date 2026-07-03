import type { ArchiveProcessingRecord } from '@/domain/admin/archive'
import type {
  TrainingApplicationStatus,
  TrainingDemand,
  TrainingPlan,
  TrainingResource,
  TrainingState,
} from '@/domain/admin/training'

type UpsertArchiveRecord = (record: ArchiveProcessingRecord) => unknown

export function addTrainingResourceDraftInState(state: TrainingState) {
  const resource: TrainingResource = {
    id: `resource-draft-${Date.now()}`,
    name: '新增培训资源待完善',
    direction: '数字化教学',
    level: '校级',
    hours: '待补充',
    institution: '教师发展中心',
    target: '待明确',
    source: '校内建设',
    status: '信息待完善',
  }
  state.resources = [resource, ...state.resources]
  state.operationMessage = '已创建待完善资源草稿。'
  return resource
}

export function addTrainingDemandInState(state: TrainingState) {
  const demand: TrainingDemand = {
    id: `demand-draft-${Date.now()}`,
    teacher: '待分配',
    department: '智能制造学院',
    major: '待确认专业',
    direction: 'AI 赋能课程建设',
    source: '管理主动添加',
    matchStatus: '待匹配',
    suggestedResource: '暂无合适资源',
  }
  state.demands = [demand, ...state.demands]
  state.operationMessage = '已新增一条待匹配需求。'
  return demand
}

export function matchTrainingDemandInState(state: TrainingState, demandId: string, resourceId: string) {
  const demand = state.demands.find(item => item.id === demandId)
  const resource = state.resources.find(item => item.id === resourceId)
  if (!demand || !resource) return null
  demand.matchStatus = '已匹配'
  demand.suggestedResource = resource.name
  state.operationMessage = `${demand.teacher} 的培训需求已匹配资源。`
  return demand
}

export function createTrainingPlanInState(state: TrainingState, input: Partial<TrainingPlan>, mode: 'draft' | 'published') {
  const plan: TrainingPlan = {
    id: `plan-${Date.now()}-${state.plans.length + 1}`,
    name: input.name || '新增培训计划',
    direction: input.direction || '数字化教学',
    target: input.target || '全校教师',
    startDate: input.startDate || '2026-07-20',
    endDate: input.endDate || '2026-07-24',
    participation: input.participation || '自主报名',
    status: mode === 'draft' ? '草稿' : '报名中',
    currentParticipants: 0,
    maxParticipants: input.maxParticipants || input.quota || 30,
    relatedDemand: input.relatedDemand || '待关联需求',
    relatedResource: input.relatedResource || '待关联资源',
    description: input.description || '待完善计划说明',
    organization: input.organization || '教师发展中心',
    provider: input.provider || '教师发展中心',
    applicationRequired: input.applicationRequired || '需要',
    quota: input.quota || input.maxParticipants || 30,
    participants: [],
  }
  state.plans = [plan, ...state.plans]
  state.operationMessage = mode === 'draft' ? `已保存草稿：${plan.name}` : `已发布培训计划：${plan.name}`
  return plan
}

export function updateTrainingApplicationStatusInState(state: TrainingState, applicationId: string, status: TrainingApplicationStatus) {
  const application = state.applications.find(item => item.id === applicationId)
  if (!application) return null
  application.status = status
  const plan = getTrainingPlanByIdInState(state, application.planId)
  if (plan) {
    const existing = plan.participants.find(item => item.id === application.teacherId)
    if (existing) {
      existing.applicationStatus = status
    } else if (status === '已同意') {
      plan.participants = [
        ...plan.participants,
        {
          id: application.teacherId,
          name: application.applicant,
          department: application.department,
          major: application.major,
          applicationStatus: status,
          participationStatus: '待开始',
          materialStatus: '—',
        },
      ]
    }
    plan.currentParticipants = plan.participants.filter(item => item.applicationStatus === '已同意').length
  }
  state.operationMessage = `${application.applicant} 的申请已${status === '已同意' ? '同意' : '退回'}。`
  return application
}

export function uploadTrainingCertificateInState(state: TrainingState, recordId: string, upsertArchiveRecord: UpsertArchiveRecord) {
  const record = state.records.find(item => item.id === recordId)
  if (!record) return null
  const certificate = record.materials.find(item => item.name === '培训结业证书')
  if (certificate) {
    certificate.status = '已上传'
    certificate.uploadTime = '2026-05-18 10:00'
  }
  record.materialStatus = '记录完整'
  record.updateTime = '2026-05-18 10:00'
  upsertArchiveRecord({
    id: `training-${record.id}`,
    batchId: 'training-management',
    name: record.planName,
    teacher: record.teacher,
    dimension: '个人发展',
    source: '培训管理',
    status: '待确认',
    updateTime: '05-18 10:00',
    uploader: '教师发展中心',
    uploadBatch: '培训记录自动沉淀',
    originalFile: '培训结业证书',
    issues: [],
    processingHistory: [
      '2026-05-18 10:00 培训记录材料完整，生成成长档案待确认记录',
    ],
  })
  state.operationMessage = `${record.teacher} 的培训结业证书已补充，记录材料已完整，并已生成成长档案待确认记录。`
  return record
}

export function getTrainingPlanByIdInState(state: TrainingState, planId: string) {
  return state.plans.find(plan => plan.id === planId)
}

export function getTrainingRecordByIdInState(state: TrainingState, recordId: string) {
  return state.records.find(record => record.id === recordId)
}
