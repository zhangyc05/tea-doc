import { describe, expect, it } from 'vitest'
import {
  calculateTeacherAbilityProfile,
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

  it('calculates teacher profile from archive facts and execution indicators', () => {
    const profile = calculateTeacherAbilityProfile('林老师', [
      {
        id: 'fact-teaching-1',
        teacher: '林老师',
        dimension: '教学工作',
        title: '智能制造基础课堂改进记录',
        sourceRecordId: 'reflection-1',
        archiveTime: '2026-06-20',
      },
      {
        id: 'fact-practice-1',
        teacher: '林老师',
        dimension: '企业实践',
        title: '山东某智能装备有限公司企业实践',
        sourceRecordId: 'practice-1',
        archiveTime: '2026-06-21',
      },
    ], [
      {
        key: 'execution-teaching',
        name: '课堂教学改进能力',
        novice: '≥ 60分',
        competent: '≥ 75分',
        backbone: '≥ 85分',
        expert: '≥ 95分',
        basisLabel: '教学反思、课堂过程记录',
      },
      {
        key: 'execution-practice',
        name: '企业实践成果转化能力',
        novice: '有企业实践记录',
        competent: '实践记录可追溯',
        backbone: '实践成果可转化',
        expert: '形成示范案例',
        basisLabel: '企业实践记录和成果材料',
      },
    ])

    expect(profile.teacherInfo.dataBasis).toBe('正式档案事实 + 执行版能力清单')
    expect(profile.radarData.find(item => item.label === '教学能力')?.value).toBeGreaterThan(60)
    expect(profile.radarData.find(item => item.label === '实践能力')?.value).toBeGreaterThan(60)
    expect(profile.abilityDimensions.find(item => item.dimension === '教学能力')?.composition).toContain('课堂教学改进能力')
    expect(profile.supportDirections[0].focus).toContain('智能制造基础课堂改进记录')
  })
})
