import { describe, expect, it } from 'vitest'
import { createInitialAbilityListState } from './ability-list/initialData'
import {
  confirmRequirementMappingInState,
  deriveNextExecutionVersionInState,
  updateIndicatorInState,
} from './ability-list/actions'

describe('ability list store structure', () => {
  it('creates a fresh ability list state independent from the singleton store', () => {
    const first = createInitialAbilityListState()
    const second = createInitialAbilityListState()

    first.baseTemplateIndicators[0].name = '测试指标'
    first.requirementMappings[0].confirmStatus = 'pending'

    expect(second.baseTemplateIndicators[0].name).toBe('年度师德考核结果合格及以上')
    expect(second.requirementMappings[0].confirmStatus).toBe('confirmed')
  })

  it('runs indicator and version actions against injected state', () => {
    const state = createInitialAbilityListState()

    const indicator = updateIndicatorInState(state.baseTemplateIndicators, 'ability-standard-11', {
      novice: '>= 72',
    })
    const version = deriveNextExecutionVersionInState(state)

    expect(indicator).toMatchObject({
      novice: '>= 72',
      status: 'draft',
    })
    expect(version).toMatchObject({
      versionNo: 'V2027',
      status: 'pending',
    })
  })

  it('runs requirement mapping actions against injected state', () => {
    const state = createInitialAbilityListState()

    const mapping = confirmRequirementMappingInState(state, '2')

    expect(mapping?.confirmStatus).toBe('confirmed')
    expect(state.operationMessage).toBe('该要求项映射已确认配置。')
  })

  it('splits teacher ethics honor indicators into independently editable standards', () => {
    const state = createInitialAbilityListState()
    const ethicsIndicators = state.baseTemplateIndicators.filter(
      indicator => indicator.abilityKey === 'basic-ethics',
    )
    const names = ethicsIndicators.map(indicator => indicator.name)

    expect(names).not.toContain('（1）获得院级及以上"优秀共产党员"、"四讲四有"模范党员、优秀党务工作者称号；\n（2）获得市级及以上"劳动模范"、"先进工作者"、"五一"劳动奖章称号\n（3）获得省部级及以上"最美教师"、"优秀教师"、"优秀教育工作者"称号')
    expect(names).toContain('年度获得院级及以上党员类荣誉')
    expect(names).toContain('年度获得市级及以上劳动模范类荣誉')
    expect(names).toContain('年度获得省部级及以上教师荣誉')

    const splitIndicators = ethicsIndicators.filter(indicator => indicator.key.startsWith('ability-standard-03-'))

    expect(splitIndicators).toHaveLength(3)
    expect(splitIndicators.every(indicator => indicator.basisLabel === '师德师风')).toBe(true)
    expect(splitIndicators.map(indicator => indicator.competent)).not.toContain('（1）')
    expect(splitIndicators.map(indicator => indicator.backbone)).not.toContain('（2）')
    expect(splitIndicators.map(indicator => indicator.expert)).not.toContain('（3）')
  })
})
