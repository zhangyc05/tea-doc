import { beforeEach, describe, expect, it } from 'vitest'
import {
  addTrainingDemand,
  addTrainingResourceDraft,
  approveTrainingApplication,
  createTrainingPlan,
  getTrainingPlanById,
  getTrainingState,
  matchTrainingDemand,
  rejectTrainingApplication,
  resetTrainingState,
  uploadTrainingCertificate,
} from './trainingStore'
import {
  getArchiveState,
  resetArchiveState,
} from './archiveStore'

describe('training business state', () => {
  beforeEach(() => {
    resetTrainingState()
    resetArchiveState()
  })

  it('adds a resource draft into the shared resource list', () => {
    const resource = addTrainingResourceDraft()

    expect(resource.status).toBe('信息待完善')
    expect(getTrainingState().resources[0]?.id).toBe(resource.id)
  })

  it('adds and matches a training demand with an existing resource', () => {
    const demand = addTrainingDemand()
    matchTrainingDemand(demand.id, '1')

    const target = getTrainingState().demands.find(item => item.id === demand.id)

    expect(target?.matchStatus).toBe('已匹配')
    expect(target?.suggestedResource).toBe('职业教育数字化教学能力提升培训')
  })

  it('creates draft and published training plans in the shared plan list', () => {
    const draft = createTrainingPlan({ name: '校本 AI 教学工作坊' }, 'draft')
    const published = createTrainingPlan({ name: '课程资源建设训练营' }, 'published')

    expect(getTrainingPlanById(draft.id)?.status).toBe('草稿')
    expect(getTrainingPlanById(published.id)?.status).toBe('报名中')
    expect(getTrainingState().plans[0]?.id).toBe(published.id)
  })

  it('approves or rejects applications and syncs plan participants', () => {
    approveTrainingApplication('1')
    rejectTrainingApplication('2')

    const state = getTrainingState()
    const approved = state.applications.find(item => item.id === '1')
    const rejected = state.applications.find(item => item.id === '2')
    const plan = getTrainingPlanById('summer-digital')

    expect(approved?.status).toBe('已同意')
    expect(rejected?.status).toBe('未同意')
    expect(plan?.participants.some(item => item.id === 'lin' && item.applicationStatus === '已同意')).toBe(true)
  })

  it('uploads a certificate and updates the record material status', () => {
    uploadTrainingCertificate('digital-training-lin')

    const record = getTrainingState().records.find(item => item.id === 'digital-training-lin')
    const certificate = record?.materials.find(item => item.name === '培训结业证书')

    expect(record?.materialStatus).toBe('记录完整')
    expect(certificate?.status).toBe('已上传')
    expect(certificate?.uploadTime).toBe('2026-05-18 10:00')
  })

  it('creates an archive processing record when a training record becomes complete', () => {
    uploadTrainingCertificate('digital-training-lin')

    const archiveRecord = getArchiveState().processingRecords.find(
      item => item.id === 'training-digital-training-lin',
    )

    expect(archiveRecord).toMatchObject({
      name: '职业教育数字化教学能力提升培训',
      teacher: '林老师',
      dimension: '个人发展',
      source: '培训管理',
      status: '待确认',
    })
    expect(getTrainingState().operationMessage).toContain('成长档案待确认记录')
  })
})
