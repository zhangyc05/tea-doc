import { describe, expect, it } from 'vitest'
import {
  getTrainingPlanDetailMock,
  getTrainingPlanPageMock,
  getTrainingRecordDetailMock,
} from './training'

describe('training mock service', () => {
  it('returns fresh plan page mock data for page consumption', () => {
    const first = getTrainingPlanPageMock()
    const second = getTrainingPlanPageMock()

    first.organizations[0] = '已修改'
    first.reminders.push('临时提醒')

    expect(second.organizations[0]).toBe('全校')
    expect(second.reminders).not.toContain('临时提醒')
  })

  it('returns plan detail mock data', () => {
    const detail = getTrainingPlanDetailMock()

    expect(detail.schedule).toHaveLength(5)
    expect(detail.materialRequirements).toContain('培训证书')
    expect(detail.relatedDemands[0].source).toBe('能力画像观察')
    expect(detail.progressNodes.map(node => node.label)).toContain('培训结束')
  })

  it('returns fresh record detail mock data', () => {
    const first = getTrainingRecordDetailMock()
    const second = getTrainingRecordDetailMock()

    first.learningRecords[0].content = '已修改'
    first.relatedRecords[0].name = '已修改'

    expect(second.learningRecords[0].content).toContain('数字化教学资源建设')
    expect(second.relatedRecords[0].name).toBe('双师型教师实践能力提升培训')
    expect(second.trainingSummary.submitTime).toBe('2026-05-16 18:30')
  })
})
