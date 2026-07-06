import type {
  AbilityIndicator,
  AbilityListState,
  AbilityListTreeNode,
  OptimizationSuggestionDraft,
  OptimizationSuggestion,
  OptimizationSuggestionStatus,
  RequirementMapping,
} from '@/domain/admin/ability-list'
import { getOptimizationSuggestionStatusLabel } from '@/domain/admin/ability-list'
import { cloneAbilityTree, cloneIndicators } from './initialData'

const systemOperator = '教务处管理员'
const baseTemplateChangeTime = '2026-07-03 23:20'
const executionChangeTime = '2026-07-05 19:10'

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

export function saveBaseTemplateChangeInState(
  state: AbilityListState,
  key: string,
  patch: Partial<Omit<AbilityIndicator, 'key'>>,
) {
  const source = state.baseTemplateIndicators.find(indicator => indicator.key === key)
  const patchName = typeof patch.name === 'string' ? patch.name : ''
  const patchAbilityKey = typeof patch.abilityKey === 'string' ? patch.abilityKey : ''
  if (!source && (!patchName || !patchAbilityKey)) return null

  const existing = state.pendingBaseTemplateChanges.find(change => change.indicatorKey === key)
  const before = existing?.before ?? (source ? { ...source } : undefined)
  const after: AbilityIndicator = {
    ...(existing?.after ?? source ?? { key, abilityKey: patchAbilityKey, name: patchName, novice: '', competent: '', backbone: '', expert: '', basisLabel: '' }),
    ...patch,
    status: 'draft' satisfies AbilityIndicator['status'],
  }
  const change = {
    id: existing?.id ?? `base-template-change-${state.pendingBaseTemplateChanges.length + 1}`,
    indicatorKey: key,
    indicatorName: after.name,
    abilityKey: after.abilityKey,
    before,
    after,
    changedAt: baseTemplateChangeTime,
    operator: systemOperator,
  }
  const index = state.pendingBaseTemplateChanges.findIndex(item => item.indicatorKey === key)

  if (index >= 0) {
    state.pendingBaseTemplateChanges[index] = change
  } else {
    state.pendingBaseTemplateChanges.push(change)
  }

  state.operationMessage = `已保存修订草稿：${after.name}。`
  return change
}

export function saveExecutionIndicatorChangeInState(
  state: AbilityListState,
  key: string,
  patch: Partial<Omit<AbilityIndicator, 'key'>>,
) {
  if (state.pendingExecutionVersion) {
    return updatePendingExecutionIndicatorInState(state, key, patch)
  }

  const source = state.executionIndicators.find(indicator => indicator.key === key)
  if (!source) return null

  const existing = state.pendingExecutionIndicatorChanges.find(change => change.indicatorKey === key)
  const before = existing?.before ?? { ...source }
  const after: AbilityIndicator = {
    ...(existing?.after ?? source),
    ...patch,
    status: 'draft' satisfies AbilityIndicator['status'],
  }
  const change = {
    id: existing?.id ?? `execution-indicator-change-${state.pendingExecutionIndicatorChanges.length + 1}`,
    indicatorKey: key,
    indicatorName: after.name,
    before,
    after,
    changedAt: executionChangeTime,
    operator: systemOperator,
  }
  const index = state.pendingExecutionIndicatorChanges.findIndex(item => item.indicatorKey === key)

  if (index >= 0) {
    state.pendingExecutionIndicatorChanges[index] = change
  } else {
    state.pendingExecutionIndicatorChanges.push(change)
  }

  state.operationMessage = `已保存执行版调整草稿：${after.name}。`
  return change
}

export function updatePendingExecutionIndicatorInState(
  state: AbilityListState,
  key: string,
  patch: Partial<Omit<AbilityIndicator, 'key'>>,
) {
  const target = state.pendingExecutionIndicators.find(indicator => indicator.key === key)
  if (!target) return null

  Object.assign(target, patch, { status: patch.status ?? 'draft' })
  if (state.pendingExecutionVersion) {
    state.pendingExecutionVersion.indicatorCount = state.pendingExecutionIndicators.length
    state.pendingExecutionVersion.lastUpdated = executionChangeTime
  }
  state.operationMessage = `已更新待发布执行版指标：${target.name}。`
  return {
    id: `pending-execution-indicator-${key}`,
    indicatorKey: key,
    indicatorName: target.name,
    after: { ...target },
    changedAt: executionChangeTime,
    operator: systemOperator,
  }
}

export function confirmExecutionIndicatorChangesInState(state: AbilityListState) {
  const changes = [...state.pendingExecutionIndicatorChanges]
  if (changes.length === 0) {
    state.operationMessage = '暂无待确认的执行版调整。'
    return 0
  }

  changes.forEach((change) => {
    const index = state.executionIndicators.findIndex(indicator => indicator.key === change.indicatorKey)
    if (index < 0) return
    state.executionIndicators[index] = {
      ...change.after,
      status: 'enabled' satisfies AbilityIndicator['status'],
    }
  })

  state.pendingExecutionIndicatorChanges = []
  state.executionVersion.lastUpdated = executionChangeTime
  state.executionVersion.operator = systemOperator
  state.operationMessage = `已确认 ${changes.length} 项执行版调整。`
  return changes.length
}

export function discardExecutionIndicatorChangesInState(state: AbilityListState) {
  const count = state.pendingExecutionIndicatorChanges.length
  state.pendingExecutionIndicatorChanges = []
  state.operationMessage = count > 0
    ? `已撤回 ${count} 项执行版调整。`
    : '暂无可撤回的执行版调整。'
  return count
}

export function confirmBaseTemplateChangesInState(state: AbilityListState) {
  const changes = [...state.pendingBaseTemplateChanges]
  if (changes.length === 0) {
    state.operationMessage = '暂无待确认的基准模板变更。'
    return null
  }

  changes.forEach((change) => {
    const index = state.baseTemplateIndicators.findIndex(indicator => indicator.key === change.indicatorKey)
    const confirmedIndicator: AbilityIndicator = {
      ...change.after,
      status: 'enabled' satisfies AbilityIndicator['status'],
    }

    if (index >= 0) {
      state.baseTemplateIndicators[index] = confirmedIndicator
    } else {
      state.baseTemplateIndicators.push(confirmedIndicator)
    }
  })

  state.baseTemplateVersionHistory.unshift({
    ...state.baseTemplateVersion,
    status: 'historical',
  })

  const [majorText, minorText = '0'] = state.baseTemplateVersion.versionNo.replace('V', '').split('.')
  const nextMinor = Number(minorText) + 1
  const nextVersionNo = `V${majorText}.${nextMinor}`

  state.baseTemplateVersion = {
    versionNo: nextVersionNo,
    title: `教师能力清单基准模板 ${nextVersionNo}`,
    status: 'current',
    updatedAt: baseTemplateChangeTime,
    operator: systemOperator,
    changeSummary: `确认 ${changes.length} 项指标变更`,
    changeCount: changes.length,
  }
  state.pendingBaseTemplateChanges = []
  state.operationMessage = `${state.baseTemplateVersion.title}已生成。`

  return state.baseTemplateVersion
}

export function deriveNextExecutionVersionInState(
  state: AbilityListState,
  abilityTree?: AbilityListTreeNode[],
) {
  const sourceIndicators = getExecutionDraftIndicators(state)
  state.pendingExecutionVersion = {
    versionNo: 'V2027',
    title: '2027 年度教师能力清单执行版',
    sourceTitle: state.executionVersion.title,
    templateTitle: state.baseTemplateVersion.title,
    scope: '全校教师',
    indicatorCount: sourceIndicators.length,
    lastUpdated: '待发布',
    status: 'pending',
    publishedAt: '待发布',
    source: state.executionVersion.title,
    operator: systemOperator,
  }
  state.pendingExecutionIndicators = cloneIndicators(sourceIndicators)
  state.pendingExecutionAbilityTree = cloneAbilityTree(abilityTree ?? state.executionAbilityTree)
  state.pendingExecutionIndicatorChanges = []
  state.operationMessage = '已派生 2027 年度执行版，请确认后发布。'
  return state.pendingExecutionVersion
}

export function publishExecutionVersionInState(state: AbilityListState) {
  const pendingVersion = state.pendingExecutionVersion
  if (!pendingVersion) {
    state.operationMessage = '暂无待发布执行版。'
    return null
  }

  if (!state.versionHistory.some(version => version.versionNo === state.executionVersion.versionNo)) {
    state.versionHistory.unshift({
      ...state.executionVersion,
      status: 'historical',
    })
  }

  state.executionVersion = {
    ...pendingVersion,
    status: 'published',
  }
  state.executionVersion.lastUpdated = executionChangeTime
  state.executionVersion.publishedAt = executionChangeTime
  state.executionVersion.operator = systemOperator
  state.executionIndicators = cloneIndicators(state.pendingExecutionIndicators).map(indicator => ({
    ...indicator,
    status: indicator.status === 'disabled' ? 'disabled' : 'enabled',
  }))
  state.executionAbilityTree = cloneAbilityTree(state.pendingExecutionAbilityTree ?? state.executionAbilityTree)
  state.pendingExecutionVersion = null
  state.pendingExecutionIndicators = []
  state.pendingExecutionAbilityTree = null
  state.operationMessage = `${state.executionVersion.title}已确认发布。`
  return state.executionVersion
}

export function cancelPendingExecutionVersionInState(state: AbilityListState) {
  if (!state.pendingExecutionVersion) {
    state.operationMessage = '暂无待发布执行版。'
    return false
  }

  state.pendingExecutionVersion = null
  state.pendingExecutionIndicators = []
  state.pendingExecutionAbilityTree = null
  state.operationMessage = '已取消待发布执行版，当前执行版保持不变。'
  return true
}

export function deletePendingExecutionIndicatorInState(state: AbilityListState, indicatorKey: string) {
  if (!state.pendingExecutionVersion) {
    state.operationMessage = '请先派生待发布执行版后再删除指标。'
    return false
  }

  const beforeCount = state.pendingExecutionIndicators.length
  state.pendingExecutionIndicators = state.pendingExecutionIndicators.filter(indicator => indicator.key !== indicatorKey)
  const deleted = state.pendingExecutionIndicators.length < beforeCount
  if (deleted && state.pendingExecutionVersion) {
    state.pendingExecutionVersion.indicatorCount = state.pendingExecutionIndicators.length
    state.pendingExecutionVersion.lastUpdated = executionChangeTime
    state.operationMessage = '已从待发布执行版删除指标。'
  }
  return deleted
}

export function addPendingExecutionDimensionInState(
  state: AbilityListState,
  dimension: AbilityListTreeNode,
) {
  if (!state.pendingExecutionVersion) {
    state.operationMessage = '请先派生待发布执行版后再新增维度。'
    return null
  }

  const tree = [...(state.pendingExecutionAbilityTree ?? [])]
  const nextDimension = {
    ...dimension,
    children: dimension.children?.map(child => ({ ...child })) ?? [],
  }
  const index = tree.findIndex(node => node.key === nextDimension.key)
  if (index >= 0) {
    tree[index] = nextDimension
  } else {
    tree.push(nextDimension)
  }
  state.pendingExecutionAbilityTree = [...tree]
  state.operationMessage = `已新增待发布执行版维度：${nextDimension.label}。`
  return nextDimension
}

export function deletePendingExecutionDimensionInState(state: AbilityListState, dimensionKey: string) {
  return deletePendingExecutionAbilityNodeInState(state, dimensionKey)
}

export function updatePendingExecutionAbilityNodeInState(
  state: AbilityListState,
  nodeKey: string,
  label: string,
) {
  if (!state.pendingExecutionVersion || !state.pendingExecutionAbilityTree) {
    state.operationMessage = '请先派生待发布执行版后再编辑维度。'
    return false
  }

  const nextLabel = label.trim()
  if (!nextLabel) {
    state.operationMessage = '维度名称不能为空。'
    return false
  }

  let updated = false
  const tree = cloneAbilityTree(state.pendingExecutionAbilityTree).map((node) => {
    if (node.key === nodeKey) {
      updated = true
      return { ...node, label: nextLabel }
    }

    return {
      ...node,
      children: node.children?.map((child) => {
        if (child.key !== nodeKey) return child
        updated = true
        return { ...child, label: nextLabel }
      }),
    }
  })

  if (!updated) {
    state.operationMessage = '未找到待编辑维度。'
    return false
  }

  state.pendingExecutionAbilityTree = tree
  state.pendingExecutionVersion.lastUpdated = executionChangeTime
  state.operationMessage = `已更新待发布执行版结构：${nextLabel}。`
  return true
}

export function deletePendingExecutionAbilityNodeInState(state: AbilityListState, nodeKey: string) {
  if (!state.pendingExecutionVersion || !state.pendingExecutionAbilityTree) {
    state.operationMessage = '请先派生待发布执行版后再删除维度。'
    return false
  }

  let deletedLabel = ''
  const deletedAbilityKeys = new Set<string>()
  const nextTree: AbilityListTreeNode[] = []

  state.pendingExecutionAbilityTree.forEach((node) => {
    if (node.key === nodeKey) {
      deletedLabel = node.label
      node.children?.forEach(child => deletedAbilityKeys.add(child.key))
      return
    }

    const children = node.children?.filter((child) => {
      if (child.key !== nodeKey) return true
      deletedLabel = child.label
      deletedAbilityKeys.add(child.key)
      return false
    })

    nextTree.push({ ...node, children })
  })

  if (!deletedLabel) {
    state.operationMessage = '未找到待删除维度。'
    return false
  }

  state.pendingExecutionAbilityTree = cloneAbilityTree(nextTree)
  state.pendingExecutionIndicators = state.pendingExecutionIndicators.filter(
    indicator => !deletedAbilityKeys.has(indicator.abilityKey ?? ''),
  )
  state.pendingExecutionVersion.indicatorCount = state.pendingExecutionIndicators.length
  state.pendingExecutionVersion.lastUpdated = executionChangeTime
  state.operationMessage = `已删除待发布执行版维度：${deletedLabel}。`
  return true
}

export function getExecutionDraftIndicators(state: AbilityListState) {
  return state.executionIndicators.map((indicator) => {
    const pendingChange = state.pendingExecutionIndicatorChanges.find(
      change => change.indicatorKey === indicator.key,
    )
    return pendingChange ? { ...pendingChange.after } : { ...indicator }
  })
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
    saveBaseTemplateChangeInState(state, application.targetIndicator.key, application.targetIndicator)
    updateOptimizationSuggestionStatusInState(state, application.suggestionId, 'applied')
  })

  state.operationMessage = applications.length > 0
    ? `已形成 ${applications.length} 条基准模板修订草稿，发布新版本后生效。`
    : '暂无待应用的优化建议。'

  return applications.length
}

export function importPolicySuggestionInState(
  state: AbilityListState,
  draft: Partial<OptimizationSuggestionDraft> = {},
): OptimizationSuggestion {
  const suggestion: OptimizationSuggestion = {
    id: `policy-import-${state.optimizationSuggestions.length + 1}`,
    source: 'policy',
    sourceLabel: '制度文件',
    issueType: draft.issueType ?? '标准补充',
    keyLocation: draft.keyLocation ?? '教学能力 / 数字素养',
    content: draft.content ?? '根据新上传制度文件补充专业教学资源库建设指标的适用说明',
    basis: draft.basis ?? '新上传制度文件解析结果',
    status: 'pending',
    statusLabel: getOptimizationSuggestionStatusLabel('pending'),
    targetIndicator: draft.targetIndicator ?? {
      key: 'base-policy-teaching-resource-scope',
      abilityKey: 'teaching-digital-literacy',
      name: '专业教学资源库建设适用范围',
      novice: '参与课程资源建设',
      competent: '独立建设课程资源',
      backbone: '建设专业核心课程资源',
      expert: '形成可推广资源体系',
      basisLabel: '数字素养',
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
      abilityKey: 'practice',
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

export function addManualOptimizationSuggestionInState(
  state: AbilityListState,
  draft: OptimizationSuggestionDraft,
): OptimizationSuggestion {
  const suggestion: OptimizationSuggestion = {
    id: `manual-suggestion-${state.optimizationSuggestions.length + 1}`,
    source: 'manual',
    sourceLabel: '人工补充',
    issueType: draft.issueType,
    keyLocation: draft.keyLocation,
    content: draft.content,
    basis: draft.basis,
    status: 'pending',
    statusLabel: getOptimizationSuggestionStatusLabel('pending'),
    targetIndicator: { ...draft.targetIndicator },
  }

  state.optimizationSuggestions.unshift(suggestion)
  state.operationMessage = '人工补充建议已生成 1 条待确认优化建议。'
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
