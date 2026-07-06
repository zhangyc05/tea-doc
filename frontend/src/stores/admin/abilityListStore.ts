import { reactive } from 'vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import type {
  AbilityListState,
  OptimizationSuggestionDraft,
  OptimizationSuggestionStatus,
  RequirementMapping,
} from '@/domain/admin/ability-list'
import {
  addPendingExecutionDimensionInState,
  addManualOptimizationSuggestionInState,
  applyAdoptedSuggestionsToBaseTemplateInState,
  cancelPendingExecutionVersionInState,
  confirmExecutionIndicatorChangesInState,
  confirmBaseTemplateChangesInState,
  confirmRequirementMappingInState,
  deletePendingExecutionAbilityNodeInState,
  deletePendingExecutionDimensionInState,
  deletePendingExecutionIndicatorInState,
  deleteRequirementMappingInState,
  deriveNextExecutionVersionInState,
  discardExecutionIndicatorChangesInState,
  getExecutionDraftIndicators,
  importPolicySuggestionInState,
  publishExecutionVersionInState,
  rerunFeedbackAnalysisInState,
  saveBaseTemplateChangeInState,
  saveExecutionIndicatorChangeInState,
  saveRequirementMappingInState,
  updatePendingExecutionAbilityNodeInState,
  updateOptimizationSuggestionStatusInState,
} from './ability-list/actions'
import { createInitialAbilityListState } from './ability-list/initialData'
import type { AbilityListTreeNode } from '@/domain/admin/ability-list'

export type {
  AbilityListState,
  BaseTemplateVersion,
  BaseTemplateVersionStatus,
  ExecutionVersion,
  ExecutionVersionStatus,
  AbilityListTreeNode,
  OptimizationSuggestionDraft,
  OptimizationSuggestion,
  OptimizationSuggestionStatus,
  PendingBaseTemplateChange,
  PendingExecutionIndicatorChange,
  RequirementMapping,
  RequirementMappingStatus,
  TemplateApplication,
} from '@/domain/admin/ability-list'

const state = reactive<AbilityListState>(createInitialAbilityListState())

export function getAbilityListState() {
  return state
}

export function resetAbilityListState() {
  Object.assign(state, createInitialAbilityListState())
}

export function updateExecutionIndicator(
  key: string,
  patch: Partial<Omit<AbilityIndicator, 'key'>>,
) {
  const target = saveExecutionIndicatorChangeInState(state, key, patch)
  if (!target) return
  state.operationMessage = `已保存执行版调整草稿：${target.indicatorName}。`
}

export function getDisplayedExecutionIndicators() {
  return state.pendingExecutionVersion
    ? state.pendingExecutionIndicators.map(indicator => ({ ...indicator }))
    : getExecutionDraftIndicators(state)
}

export function confirmExecutionIndicatorChanges() {
  return confirmExecutionIndicatorChangesInState(state)
}

export function discardExecutionIndicatorChanges() {
  return discardExecutionIndicatorChangesInState(state)
}

export function updateBaseTemplateIndicator(
  key: string,
  patch: Partial<Omit<AbilityIndicator, 'key'>>,
) {
  const target = saveBaseTemplateChangeInState(state, key, patch)
  if (!target) return
  state.operationMessage = `已保存修订草稿：${target.indicatorName}。`
}

export function confirmBaseTemplateChanges() {
  return confirmBaseTemplateChangesInState(state)
}

export function deriveNextExecutionVersion(abilityTree?: AbilityListTreeNode[]) {
  return deriveNextExecutionVersionInState(state, abilityTree)
}

export function publishExecutionVersion() {
  return publishExecutionVersionInState(state)
}

export function cancelPendingExecutionVersion() {
  return cancelPendingExecutionVersionInState(state)
}

export function deletePendingExecutionIndicator(indicatorKey: string) {
  return deletePendingExecutionIndicatorInState(state, indicatorKey)
}

export function addPendingExecutionDimension(dimension: AbilityListTreeNode) {
  return addPendingExecutionDimensionInState(state, dimension)
}

export function deletePendingExecutionDimension(dimensionKey: string) {
  return deletePendingExecutionDimensionInState(state, dimensionKey)
}

export function updatePendingExecutionAbilityNode(nodeKey: string, label: string) {
  return updatePendingExecutionAbilityNodeInState(state, nodeKey, label)
}

export function deletePendingExecutionAbilityNode(nodeKey: string) {
  return deletePendingExecutionAbilityNodeInState(state, nodeKey)
}

export function updateOptimizationSuggestionStatus(
  suggestionId: string,
  status: OptimizationSuggestionStatus,
) {
  updateOptimizationSuggestionStatusInState(state, suggestionId, status)
}

export function adoptOptimizationSuggestion(suggestionId: string) {
  const target = updateOptimizationSuggestionStatusInState(state, suggestionId, 'adopted')
  state.operationMessage = target
    ? `已采纳建议：${target.issueType}，可形成基准模板修订草稿。`
    : ''
}

export function applyAdoptedSuggestionsToBaseTemplate() {
  return applyAdoptedSuggestionsToBaseTemplateInState(state)
}

export function importPolicySuggestion(draft?: Partial<OptimizationSuggestionDraft>) {
  return importPolicySuggestionInState(state, draft)
}

export function rerunFeedbackAnalysis() {
  return rerunFeedbackAnalysisInState(state)
}

export function addManualOptimizationSuggestion(draft: OptimizationSuggestionDraft) {
  return addManualOptimizationSuggestionInState(state, draft)
}

export function saveRequirementMapping(mapping: RequirementMapping) {
  saveRequirementMappingInState(state, mapping)
}

export function getRequirementMappingsForGroup(groupKey: string) {
  return state.requirementMappings.filter(mapping => mapping.requirementGroupKey === groupKey)
}

export function deleteRequirementMapping(mappingId: string) {
  deleteRequirementMappingInState(state, mappingId)
}

export function confirmRequirementMapping(mappingId: string) {
  confirmRequirementMappingInState(state, mappingId)
}
