import { describe, expect, it } from 'vitest'
import {
  getAbilityProfileGroupMock,
  getAbilityProfileTeacherDetailMock,
  getAbilityProfileTeacherListMock,
} from './ability-profile'

describe('ability profile mock service', () => {
  it('returns fresh group profile mock data for page consumption', () => {
    const first = getAbilityProfileGroupMock()
    const second = getAbilityProfileGroupMock()

    first.schoolRadarData[0].value = 1
    first.focusData['院系'][0].name = '已修改'

    expect(second.schoolRadarData[0]).toMatchObject({ label: '教学能力', value: 72 })
    expect(second.focusData['院系'][0].name).toBe('智能制造学院')
  })

  it('returns fresh teacher list mock data and filter options', () => {
    const first = getAbilityProfileTeacherListMock()
    const second = getAbilityProfileTeacherListMock()

    first.teachers[0].tags.push('临时标签')

    expect(second.teachers[0].tags).not.toContain('临时标签')
    expect(second.focusTypes).toContain('重点支持')
  })

  it('returns teacher detail mock data by teacher id', () => {
    const lin = getAbilityProfileTeacherDetailMock('lin')
    const chen = getAbilityProfileTeacherDetailMock('chen')

    expect(lin.teacherInfo.name).toBe('林老师')
    expect(chen.teacherInfo.name).toBe('陈老师')
    expect(lin.supportDirections).toHaveLength(4)
  })
})
