import { reactive } from 'vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import type {
  AbilityListState,
  OptimizationSuggestionDraft,
  OptimizationSuggestionStatus,
  RequirementMapping,
} from '@/domain/admin/ability-list'
import {
  addManualOptimizationSuggestionInState,
  applyAdoptedSuggestionsToBaseTemplateInState,
  confirmExecutionIndicatorChangesInState,
  confirmBaseTemplateChangesInState,
  confirmRequirementMappingInState,
  deleteRequirementMappingInState,
  deriveNextExecutionVersionInState,
  discardExecutionIndicatorChangesInState,
  importPolicySuggestionInState,
  publishExecutionVersionInState,
  rerunFeedbackAnalysisInState,
  saveBaseTemplateChangeInState,
  saveExecutionIndicatorChangeInState,
  saveRequirementMappingInState,
  updateOptimizationSuggestionStatusInState,
} from './ability-list/actions'
import { createInitialAbilityListState } from './ability-list/initialData'

export type {
  AbilityListState,
  BaseTemplateVersion,
  BaseTemplateVersionStatus,
  ExecutionVersion,
  ExecutionVersionStatus,
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
  return state.executionIndicators.map((indicator) => {
    const pendingChange = state.pendingExecutionIndicatorChanges.find(
      change => change.indicatorKey === indicator.key,
    )
    return pendingChange ? { ...pendingChange.after } : { ...indicator }
  })
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

export function deriveNextExecutionVersion() {
  return deriveNextExecutionVersionInState(state)
}

export function publishExecutionVersion() {
  publishExecutionVersionInState(state)
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
