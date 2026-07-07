import { describe, expect, it } from 'vitest'
import {
  calculateAbilityProfileGroup,
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

  it('returns observation-style teacher detail data for the staged radar page', () => {
    const profile = getAbilityProfileTeacherDetailMock('lin')

    expect(profile.currentProfile).toMatchObject({
      statement: '教学优势较明显，实践与教研仍在持续积累',
      note: '本页展示当前发展状态，供培养与发展参考。',
      status: '处于稳定发展期',
      statusDetail: '骨干方向持续积累',
      developmentIndex: 76,
      updatedAt: '2026-06-19',
    })
    expect(profile.currentProfile.tags).toEqual([
      '基本能力达标',
      '教学优势',
      '实践积累',
      '教研沉淀',
    ])

    expect(profile.stageRadar.basicAbilityStatus).toBe('达标')
    expect(profile.stageRadar.stages.map(stage => stage.stage)).toEqual(['新手', '胜任', '骨干', '名师'])
    expect(profile.stageRadar.stages.map(stage => `${stage.stage} ${stage.min}-${stage.max}`)).toEqual([
      '新手 0-25',
      '胜任 26-50',
      '骨干 51-75',
      '名师 76-100',
    ])
    expect(profile.stageRadar.dimensions.map(item => item.label)).toEqual([
      '教学能力 88｜名师',
      '实践能力 79｜名师',
      '服务能力 72｜骨干',
      '教研能力 68｜骨干',
    ])
    expect(profile.stageRadar.structureSummary).toBe('基本能力已达标，教学与实践相对突出，教研和服务处于骨干阶段持续积累。')
    expect(profile.stageRadar.focusItems).toEqual(['教研成果沉淀', '服务影响材料'])

    expect(profile.abilityStructure.map(item => `${item.dimension} ${item.score} ${item.stage}`)).toEqual([
      '教学能力 88 名师',
      '实践能力 79 名师',
      '服务能力 72 骨干',
      '教研能力 68 骨干',
    ])
    expect(profile.targetComparison.map(item => item.title)).toEqual([
      '岗位培养参考',
      '聘期要求参考',
      '学校培养目标参考',
    ])
    expect(profile.developmentDirections.map(item => item.title)).toEqual([
      '课程建设经验沉淀',
      '实践成果转化表达',
      '教研成果继续培育',
    ])
    expect(profile.basis.summary).toBe('画像基于成长档案、能力清单和岗位培养要求形成。')
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
    expect(profile.currentProfile.developmentIndex).toBe(66)
    expect(profile.currentProfile.updatedAt).toBe('2026-06-20')
    expect(profile.stageRadar.dimensions.map(item => item.label)).toEqual([
      '教学能力 74｜骨干',
      '教研能力 58｜骨干',
      '实践能力 74｜骨干',
      '服务能力 58｜骨干',
    ])
    expect(profile.radarData.find(item => item.label === '教学能力')?.value).toBeGreaterThan(60)
    expect(profile.radarData.find(item => item.label === '实践能力')?.value).toBeGreaterThan(60)
    expect(profile.abilityDimensions.find(item => item.dimension === '教学能力')?.composition).toContain('课堂教学改进能力')
    expect(profile.supportDirections[0].focus).toContain('智能制造基础课堂改进记录')

    profile.stageRadar.stages[0].color = 'changed'
    profile.targetComparison[0].formedSupports.push('临时项')
    profile.basis.links[0].label = '已修改'

    const freshProfile = calculateTeacherAbilityProfile('林老师', [], [])
    expect(freshProfile.stageRadar.stages[0].color).toBe('#94a3b8')
    expect(freshProfile.targetComparison[0].formedSupports).not.toContain('临时项')
    expect(freshProfile.basis.links[0].label).toBe('查看引用记录')

    const chenProfile = calculateTeacherAbilityProfile('陈老师', [], [])
    expect(chenProfile.basis.links[0].route).toContain('/admin/archive/teacher/chen')
    expect(chenProfile.basis.links[0].route).not.toContain('/admin/archive/teacher/lin')
  })

  it('aggregates group profile from teacher profiles, archive facts and execution indicators', () => {
    const group = calculateAbilityProfileGroup([
      {
        id: 'fact-lin-teaching',
        teacher: '林老师',
        dimension: '教学工作',
        title: '智能制造基础课堂改进记录',
        sourceRecordId: 'reflection-1',
        archiveTime: '2026-06-20',
      },
      {
        id: 'fact-wang-practice',
        teacher: '王老师',
        dimension: '企业实践',
        title: '青岛工业机器人有限公司企业实践',
        sourceRecordId: 'practice-2',
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

    expect(group.dataBasis).toBe('教师画像 + 正式档案事实 + 执行版能力清单')
    expect(group.developmentIndex).toBeGreaterThan(0)
    expect(group.schoolRadarData.find(item => item.label === '教学能力')?.value).toBeGreaterThan(60)
    expect(group.abilityDimensions.find(item => item.dimension === '实践能力')?.composition).toContain('企业实践成果转化能力')
    expect(group.focusData['教师'][0].type).toBe('重点支持')
    expect(group.focusData['院系'][0].reason).toContain('教师平均指数')
  })
})
