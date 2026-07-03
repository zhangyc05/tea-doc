import { describe, expect, it, beforeEach } from 'vitest'
import {
  adoptOptimizationSuggestion,
  applyAdoptedSuggestionsToBaseTemplate,
  confirmBaseTemplateChanges,
  confirmRequirementMapping,
  deleteRequirementMapping,
  deriveNextExecutionVersion,
  importPolicySuggestion,
  getAbilityListState,
  publishExecutionVersion,
  rerunFeedbackAnalysis,
  resetAbilityListState,
  saveRequirementMapping,
  updateBaseTemplateIndicator,
  updateExecutionIndicator,
} from './abilityListStore'

describe('ability list business state', () => {
  beforeEach(() => {
    resetAbilityListState()
  })

  it('updates an execution indicator and marks it as a draft adjustment', () => {
    updateExecutionIndicator('ability-standard-11', {
      novice: '>= 72',
      competent: '>= 108',
      basisLabel: '调整后的课时规则',
    })

    const target = getAbilityListState().executionIndicators.find(
      indicator => indicator.key === 'ability-standard-11',
    )

    expect(target?.novice).toBe('>= 72')
    expect(target?.competent).toBe('>= 108')
    expect(target?.basisLabel).toBe('调整后的课时规则')
    expect(target?.status).toBe('draft')
  })

  it('saves a base template indicator edit as a pending change', () => {
    updateBaseTemplateIndicator('ability-standard-11', {
      novice: '≥72',
      competent: '≥108',
      basisLabel: '调整后的教学工作记录',
    })

    const target = getAbilityListState().pendingBaseTemplateChanges[0]?.after

    expect(target?.novice).toBe('≥72')
    expect(target?.competent).toBe('≥108')
    expect(target?.basisLabel).toBe('调整后的教学工作记录')
    expect(target?.status).toBe('draft')
  })

  it('keeps base template edits pending until confirmed as a new version', () => {
    const before = getAbilityListState().baseTemplateIndicators.find(
      indicator => indicator.key === 'ability-standard-11',
    )

    updateBaseTemplateIndicator('ability-standard-11', {
      novice: '≥72',
      competent: '≥108',
      basisLabel: '调整后的教学工作记录',
    })

    const draftState = getAbilityListState()
    const unchanged = draftState.baseTemplateIndicators.find(
      indicator => indicator.key === 'ability-standard-11',
    )

    expect(unchanged?.novice).toBe(before?.novice)
    expect(draftState.pendingBaseTemplateChanges).toHaveLength(1)
    expect(draftState.pendingBaseTemplateChanges[0]?.after).toMatchObject({
      novice: '≥72',
      competent: '≥108',
      basisLabel: '调整后的教学工作记录',
      status: 'draft',
    })

    const newVersion = confirmBaseTemplateChanges()
    const confirmed = getAbilityListState().baseTemplateIndicators.find(
      indicator => indicator.key === 'ability-standard-11',
    )

    expect(newVersion?.versionNo).toBe('V1.1')
    expect(confirmed?.novice).toBe('≥72')
    expect(getAbilityListState().pendingBaseTemplateChanges).toHaveLength(0)
    expect(getAbilityListState().baseTemplateVersion.versionNo).toBe('V1.1')
    expect(getAbilityListState().baseTemplateVersionHistory[0]?.versionNo).toBe('V1.0')
  })

  it('keeps base template indicators mapped to ability tree nodes', () => {
    const indicators = getAbilityListState().baseTemplateIndicators

    expect(indicators).toHaveLength(69)
    expect(indicators.some(indicator => indicator.abilityKey === 'basic-ethics')).toBe(true)
    expect(indicators.some(indicator => indicator.abilityKey === 'teaching-implementation')).toBe(true)
    expect(indicators.some(indicator => indicator.abilityKey === 'research-scientific-research')).toBe(true)
    expect(indicators.some(indicator => indicator.abilityKey === 'practice-project-practice')).toBe(true)
    expect(indicators.some(indicator => indicator.abilityKey === 'service-international-service')).toBe(true)
  })

  it('derives the next execution version as a pending version', () => {
    const nextVersion = deriveNextExecutionVersion()

    expect(nextVersion.title).toBe('2027 年度教师能力清单执行版')
    expect(nextVersion.status).toBe('pending')
    expect(getAbilityListState().executionVersion.title).toBe(nextVersion.title)
  })

  it('publishes the derived execution version for other pages to read', () => {
    deriveNextExecutionVersion()
    publishExecutionVersion()

    expect(getAbilityListState().executionVersion.status).toBe('published')
    expect(getAbilityListState().operationMessage).toBe('2027 年度教师能力清单执行版已确认发布。')
  })

  it('moves the previous published execution version into history when publishing a new version', () => {
    deriveNextExecutionVersion()
    publishExecutionVersion()

    const historicalVersion = getAbilityListState().versionHistory.find(
      version => version.title === '2026 年度教师能力清单执行版',
    )

    expect(historicalVersion?.status).toBe('historical')
    expect(historicalVersion?.versionNo).toBe('V2026')
    expect(historicalVersion?.publishedAt).toBe('2026-06-08 20:30')
    expect(historicalVersion?.source).toBe('教师能力清单基准模板 V1.0')
    expect(historicalVersion?.operator).toBe('教务处管理员')
  })

  it('moves adopted optimization suggestions into the pending application list', () => {
    adoptOptimizationSuggestion('suggestion-enterprise-practice')

    const state = getAbilityListState()
    const adopted = state.optimizationSuggestions.find(
      suggestion => suggestion.id === 'suggestion-enterprise-practice',
    )

    expect(adopted?.status).toBe('adopted')
    expect(adopted?.statusLabel).toBe('已采纳')
    expect(state.pendingTemplateApplications).toHaveLength(1)
    expect(state.pendingTemplateApplications[0]?.targetIndicator.name).toBe('企业实践成果转化')
  })

  it('applies adopted optimization suggestions as pending base template changes', () => {
    adoptOptimizationSuggestion('suggestion-enterprise-practice')
    const result = applyAdoptedSuggestionsToBaseTemplate()

    const state = getAbilityListState()
    const formalIndicator = state.baseTemplateIndicators.find(
      indicator => indicator.key === 'base-enterprise-practice-output',
    )
    const pendingChange = state.pendingBaseTemplateChanges.find(
      change => change.indicatorKey === 'base-enterprise-practice-output',
    )
    const appliedSuggestion = state.optimizationSuggestions.find(
      suggestion => suggestion.id === 'suggestion-enterprise-practice',
    )

    expect(result).toBe(1)
    expect(formalIndicator).toBeUndefined()
    expect(pendingChange?.before).toBeUndefined()
    expect(pendingChange?.after.name).toBe('企业实践成果转化')
    expect(pendingChange?.after.status).toBe('draft')
    expect(appliedSuggestion?.status).toBe('applied')
    expect(state.pendingTemplateApplications).toHaveLength(0)
  })

  it('publishes pending base template changes as a new formal version', () => {
    adoptOptimizationSuggestion('suggestion-enterprise-practice')
    applyAdoptedSuggestionsToBaseTemplate()

    const newVersion = confirmBaseTemplateChanges()
    const state = getAbilityListState()
    const formalIndicator = state.baseTemplateIndicators.find(
      indicator => indicator.key === 'base-enterprise-practice-output',
    )

    expect(newVersion?.versionNo).toBe('V1.1')
    expect(formalIndicator?.name).toBe('企业实践成果转化')
    expect(formalIndicator?.status).toBe('enabled')
    expect(state.pendingBaseTemplateChanges).toHaveLength(0)
  })

  it('imports a policy file as a pending optimization suggestion', () => {
    const suggestion = importPolicySuggestion()
    const state = getAbilityListState()

    expect(suggestion.source).toBe('policy')
    expect(suggestion.status).toBe('pending')
    expect(state.optimizationSuggestions[0]?.id).toBe(suggestion.id)
    expect(state.operationMessage).toContain('制度文件')
  })

  it('reruns feedback analysis and creates a pending feedback suggestion', () => {
    const suggestion = rerunFeedbackAnalysis()
    const state = getAbilityListState()

    expect(suggestion.source).toBe('feedback')
    expect(suggestion.status).toBe('pending')
    expect(state.optimizationSuggestions[0]?.id).toBe(suggestion.id)
    expect(state.operationMessage).toContain('运行反馈')
  })

  it('adds a new requirement mapping as a pending item', () => {
    saveRequirementMapping({
      id: 'new-mapping',
      requirementText: '近三年完成校级公开课不少于 1 次',
      indicatorDimension: '教学能力',
      indicatorName: '开展公开课、示范课、说专业、说课程等工作（次/学年）',
      level: '胜任',
      levelCriteria: '校级公开课次数 ≥ 1',
      documentCondition: '校级公开课次数 ≥ 1',
      confirmStatus: 'pending',
    })

    const target = getAbilityListState().requirementMappings.find(mapping => mapping.id === 'new-mapping')

    expect(target?.requirementText).toContain('公开课')
    expect(target?.confirmStatus).toBe('pending')
  })

  it('edits and confirms an existing requirement mapping', () => {
    saveRequirementMapping({
      ...getAbilityListState().requirementMappings[1],
      level: '骨干',
      documentCondition: '主持省级教学改革研究项目',
    })
    confirmRequirementMapping('2')

    const target = getAbilityListState().requirementMappings.find(mapping => mapping.id === '2')

    expect(target?.level).toBe('骨干')
    expect(target?.documentCondition).toBe('主持省级教学改革研究项目')
    expect(target?.confirmStatus).toBe('confirmed')
  })

  it('deletes a requirement mapping', () => {
    deleteRequirementMapping('4')

    expect(getAbilityListState().requirementMappings.some(mapping => mapping.id === '4')).toBe(false)
  })
})
