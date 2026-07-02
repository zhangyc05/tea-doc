import type {
  AbilityIndicator,
  AbilityListState,
  OptimizationSuggestionStatus,
  RequirementMapping,
} from '@/domain/admin/ability-list'
import { initialExecutionVersion } from './initialData'

const suggestionStatusLabelMap: Record<OptimizationSuggestionStatus, string> = {
  pending: '待确认',
  adopted: '已采纳',
  deferred: '暂缓',
  rejected: '已弃用',
  applied: '已应用',
}

export function updateIndicatorInState(
  indicators: AbilityIndicator[],
  key: string,
  patch: Partial<Omit<AbilityIndicator, 'key'>>,
) {
  const target = indicators.find(indicator => indicator.key === key)
  if (!target) return null
  Object.assign(target, patch, { status: 'draft' satisfies AbilityIndicator['status'] })
  return target
}

export function deriveNextExecutionVersionInState(state: AbilityListState) {
  state.executionVersion = {
    versionNo: 'V2027',
    title: '2027 年度教师能力清单执行版',
    sourceTitle: '2026 年度教师能力清单执行版',
    templateTitle: '教师能力清单基准模板 V1.0',
    scope: '全校教师',
    indicatorCount: state.executionIndicators.length + 63,
    lastUpdated: '待发布',
    status: 'pending',
    publishedAt: '待发布',
    source: '2026 年度教师能力清单执行版',
    operator: '教务处管理员',
  }
  state.operationMessage = '已派生 2027 年度执行版，请确认后发布。'
  return state.executionVersion
}

export function publishExecutionVersionInState(state: AbilityListState) {
  if (!state.versionHistory.some(version => version.versionNo === 'V2026')) {
    state.versionHistory.unshift({
      ...initialExecutionVersion,
      status: 'historical',
    })
  }

  state.executionVersion.status = 'published'
  state.executionVersion.lastUpdated = '2026-07-02 17:20'
  state.executionVersion.publishedAt = '2026-07-02 17:20'
  state.executionVersion.operator = '教务处管理员'
  state.operationMessage = `${state.executionVersion.title}已确认发布。`
}

export function syncPendingTemplateApplications(state: AbilityListState) {
  state.pendingTemplateApplications = state.optimizationSuggestions
    .filter(suggestion => suggestion.status === 'adopted')
    .map(suggestion => ({
      suggestionId: suggestion.id,
      targetIndicator: { ...suggestion.targetIndicator },
    }))
}

export function updateOptimizationSuggestionStatusInState(
  state: AbilityListState,
  suggestionId: string,
  status: OptimizationSuggestionStatus,
) {
  const target = state.optimizationSuggestions.find(suggestion => suggestion.id === suggestionId)
  if (!target) return null

  target.status = status
  target.statusLabel = suggestionStatusLabelMap[status]
  syncPendingTemplateApplications(state)
  return target
}

export function applyAdoptedSuggestionsToBaseTemplateInState(state: AbilityListState) {
  const applications = [...state.pendingTemplateApplications]

  applications.forEach((application) => {
    const index = state.baseTemplateIndicators.findIndex(
      indicator => indicator.key === application.targetIndicator.key,
    )

    if (index >= 0) {
      state.baseTemplateIndicators[index] = { ...application.targetIndicator }
    } else {
      state.baseTemplateIndicators.push({ ...application.targetIndicator })
    }

    updateOptimizationSuggestionStatusInState(state, application.suggestionId, 'applied')
  })

  state.operationMessage = applications.length > 0
    ? `已应用 ${applications.length} 条优化建议到基准模板。`
    : '暂无待应用的优化建议。'

  return applications.length
}

export function saveRequirementMappingInState(state: AbilityListState, mapping: RequirementMapping) {
  const index = state.requirementMappings.findIndex(item => item.id === mapping.id)

  if (index >= 0) {
    state.requirementMappings[index] = { ...mapping }
  } else {
    state.requirementMappings.unshift({ ...mapping })
  }

  state.operationMessage = '已保存要求项映射。'
}

export function deleteRequirementMappingInState(state: AbilityListState, mappingId: string) {
  state.requirementMappings = state.requirementMappings.filter(mapping => mapping.id !== mappingId)
  state.operationMessage = '已删除当前要求项映射。'
}

export function confirmRequirementMappingInState(state: AbilityListState, mappingId: string) {
  const target = state.requirementMappings.find(mapping => mapping.id === mappingId)
  if (!target) return null

  target.confirmStatus = 'confirmed'
  state.operationMessage = '该要求项映射已确认配置。'
  return target
}
