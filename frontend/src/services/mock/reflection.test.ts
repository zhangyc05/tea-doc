import { describe, expect, it } from 'vitest'
import { getReflectionDetailMock, getReflectionOverviewMock } from './reflection'

describe('reflection mock service', () => {
  it('returns fresh overview mock data for page consumption', () => {
    const first = getReflectionOverviewMock()
    const second = getReflectionOverviewMock()

    first.reflections[0].theme = '已修改'
    first.commonIssues[0].issue = '已修改'

    expect(second.reflections[0].theme).toBe('项目实训环节学生参与度不足')
    expect(second.commonIssues[0].issue).toBe('课堂互动反馈不足')
  })

  it('returns detail mock data by reflection id', () => {
    const detail = getReflectionDetailMock('project-participation')

    expect(detail.reflectionDetail.theme).toBe('项目实训环节学生参与度不足')
    expect(detail.sourceData.relatedData).toContain('学生评教反馈')
    expect(detail.relatedReflections).toHaveLength(3)
  })

  it('returns fallback detail mock data for unknown reflection ids', () => {
    const detail = getReflectionDetailMock('unknown')

    expect(detail.reflectionDetail.teacher).toBe('林老师')
    expect(detail.reflectionContent.suggestion).toContain('任务分层说明')
  })
})
