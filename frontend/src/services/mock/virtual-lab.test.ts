import { describe, expect, it } from 'vitest'
import { getVirtualLabActivityDetailMock, getVirtualLabRecordDetailMock } from './virtual-lab'

describe('virtual lab mock service', () => {
  it('returns fresh activity detail mock data for page consumption', () => {
    const first = getVirtualLabActivityDetailMock()
    const second = getVirtualLabActivityDetailMock()

    first.participants[0].name = '已修改'
    first.timeline[0].event = '已修改'

    expect(second.participants[0].name).toBe('周明')
    expect(second.timeline[0].event).toBe('活动创建')
  })

  it('returns record detail content and participation records', () => {
    const detail = getVirtualLabRecordDetailMock()

    expect(detail.recordContent.summary).toContain('智能产线课程项目化改造')
    expect(detail.recordContent.mainTopics).toHaveLength(3)
    expect(detail.participationRecords.map(record => record.teacher)).toContain('林老师')
  })
})
