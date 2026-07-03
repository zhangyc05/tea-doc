import type {
  AbilityIndicator,
  AbilityListState,
  OptimizationSuggestion,
  OptimizationSuggestionStatus,
  RequirementMapping,
} from '@/domain/admin/ability-list'
import { getOptimizationSuggestionStatusLabel } from '@/domain/admin/ability-list'
import { initialExecutionVersion } from './initialData'

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
  target.statusLabel = getOptimizationSuggestionStatusLabel(status)
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

export function importPolicySuggestionInState(state: AbilityListState): OptimizationSuggestion {
  const suggestion: OptimizationSuggestion = {
    id: `policy-import-${state.optimizationSuggestions.length + 1}`,
    source: 'policy',
    sourceLabel: '制度文件',
    issueType: '标准补充',
    keyLocation: '教学能力 / 教学资源建设',
    content: '根据新上传制度文件补充教学资源建设指标的适用说明',
    basis: '新上传制度文件解析结果',
    status: 'pending',
    statusLabel: getOptimizationSuggestionStatusLabel('pending'),
    targetIndicator: {
      key: 'base-policy-teaching-resource-scope',
      name: '教学资源建设适用范围',
      novice: '参与课程资源建设',
      competent: '独立建设课程资源',
      backbone: '建设专业核心课程资源',
      expert: '形成可推广资源体系',
      basisLabel: '制度文件与课程资源记录',
      status: 'draft',
    },
  }

  state.optimizationSuggestions.unshift(suggestion)
  state.operationMessage = '制度文件已解析，并生成 1 条待确认优化建议。'
  return suggestion
}

export function rerunFeedbackAnalysisInState(state: AbilityListState): OptimizationSuggestion {
  const suggestion: OptimizationSuggestion = {
    id: `feedback-analysis-${state.optimizationSuggestions.length + 1}`,
    source: 'feedback',
    sourceLabel: '运行反馈',
    issueType: '标准过宽',
    keyLocation: '实践能力 / 企业实践成果转化',
    content: '根据最新运行反馈收紧企业实践成果转化的证据要求',
    basis: '运行反馈重新分析结果',
    status: 'pending',
    statusLabel: getOptimizationSuggestionStatusLabel('pending'),
    targetIndicator: {
      key: 'base-feedback-enterprise-output',
      name: '企业实践成果证据要求',
      novice: '形成实践记录',
      competent: '形成实践总结',
      backbone: '形成课程或项目案例',
      expert: '形成可复用成果材料',
      basisLabel: '运行反馈与企业实践成果材料',
      status: 'draft',
    },
  }

  state.optimizationSuggestions.unshift(suggestion)
  state.operationMessage = '已重新分析运行反馈，并生成 1 条待确认优化建议。'
  return suggestion
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
