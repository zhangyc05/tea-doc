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

    expect(second.baseTemplateIndicators[0].name).toBe('教学工作量（课时/学期）')
    expect(second.requirementMappings[0].confirmStatus).toBe('confirmed')
  })

  it('runs indicator and version actions against injected state', () => {
    const state = createInitialAbilityListState()

    const indicator = updateIndicatorInState(state.baseTemplateIndicators, 'base-teaching-workload', {
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
})
