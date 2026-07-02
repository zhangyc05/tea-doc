import { describe, expect, it } from 'vitest'
import {
  getAbilityListBaseMock,
  getAbilityListExecutionMock,
  getAbilityListOptimizationMock,
  getAbilityListPublishConfirmMock,
  getAbilityListRequirementMappingMock,
} from './ability-list'

const icons = {
  basic: 'basic.svg',
  teaching: 'teaching.svg',
  research: 'research.svg',
  practice: 'practice.svg',
  service: 'service.svg',
}

describe('ability list mock service', () => {
  it('returns fresh base and execution ability trees', () => {
    const first = getAbilityListBaseMock(icons)
    const second = getAbilityListBaseMock(icons)
    const execution = getAbilityListExecutionMock(icons)

    first.abilityTree[1].children?.push({ key: 'temporary', label: '临时节点' })

    expect(second.abilityTree[1].children?.map(child => child.key)).not.toContain('temporary')
    expect(second.abilityTree[1].icon).toBe('teaching.svg')
    expect(execution.abilityTree[2].color).toBe('orange')
  })

  it('returns optimization filters and publish impact cards', () => {
    const optimization = getAbilityListOptimizationMock()
    const publishConfirm = getAbilityListPublishConfirmMock()

    expect(optimization.suggestionSources.map(source => source.key)).toContain('policy')
    expect(optimization.filterTags.map(tag => tag.key)).toContain('mapping')
    expect(publishConfirm.impactCards).toHaveLength(5)
    expect(publishConfirm.impactCards[0].title).toBe('能力指标')
  })

  it('returns fresh requirement mapping groups', () => {
    const first = getAbilityListRequirementMappingMock()
    const second = getAbilityListRequirementMappingMock()

    first.requirementGroups[0].children[0].label = '已修改'

    expect(second.requirementGroups[0].children[0].label).toBe('申报讲师')
    expect(second.requirementGroups[1].key).toBe('tenure-requirements')
  })
})
