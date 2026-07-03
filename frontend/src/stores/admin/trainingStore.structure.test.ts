import { describe, expect, it } from 'vitest'
import { createInitialTrainingState } from './training/initialData'
import {
  addTrainingDemandInState,
  createTrainingPlanInState,
  updateTrainingApplicationStatusInState,
  uploadTrainingCertificateInState,
} from './training/actions'

describe('training store structure', () => {
  it('creates a fresh training state independent from the singleton store', () => {
    const first = createInitialTrainingState()
    const second = createInitialTrainingState()

    first.plans[0].participants[0].applicationStatus = '未同意'
    first.records[0].materials[0].status = '已上传'

    expect(second.plans[0].participants[0].applicationStatus).toBe('已同意')
    expect(second.records[0].materials[0].status).toBe('待补充')
  })

  it('runs demand, plan and application actions against injected state', () => {
    const state = createInitialTrainingState()

    const demand = addTrainingDemandInState(state)
    const plan = createTrainingPlanInState(state, { name: '结构测试培训计划' }, 'published')
    const application = updateTrainingApplicationStatusInState(state, '1', '已同意')

    expect(demand.matchStatus).toBe('待匹配')
    expect(plan).toMatchObject({
      name: '结构测试培训计划',
      status: '报名中',
    })
    expect(application?.status).toBe('已同意')
  })

  it('allows archive upsert dependency injection when uploading a certificate', () => {
    const state = createInitialTrainingState()
    const archiveRecords: unknown[] = []

    const record = uploadTrainingCertificateInState(
      state,
      'digital-training-lin',
      item => archiveRecords.push(item),
    )

    expect(record?.materialStatus).toBe('记录完整')
    expect(archiveRecords).toHaveLength(1)
  })
})
