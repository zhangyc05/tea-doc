import { reactive } from 'vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import type {
  AbilityListState,
  OptimizationSuggestionStatus,
  RequirementMapping,
} from '@/domain/admin/ability-list'
import {
  applyAdoptedSuggestionsToBaseTemplateInState,
  confirmBaseTemplateChangesInState,
  confirmRequirementMappingInState,
  deleteRequirementMappingInState,
  deriveNextExecutionVersionInState,
  importPolicySuggestionInState,
  publishExecutionVersionInState,
  rerunFeedbackAnalysisInState,
  saveBaseTemplateChangeInState,
  saveRequirementMappingInState,
  updateIndicatorInState,
  updateOptimizationSuggestionStatusInState,
} from './ability-list/actions'
import { createInitialAbilityListState } from './ability-list/initialData'

export type {
  AbilityListState,
  BaseTemplateVersion,
  BaseTemplateVersionStatus,
  ExecutionVersion,
  ExecutionVersionStatus,
  OptimizationSuggestion,
  OptimizationSuggestionStatus,
  PendingBaseTemplateChange,
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
  const target = updateIndicatorInState(state.executionIndicators, key, patch)
  if (!target) return
  state.operationMessage = `已保存指标调整：${target.name}。`
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

export function importPolicySuggestion() {
  return importPolicySuggestionInState(state)
}

export function rerunFeedbackAnalysis() {
  return rerunFeedbackAnalysisInState(state)
}

export function saveRequirementMapping(mapping: RequirementMapping) {
  saveRequirementMappingInState(state, mapping)
}

export function deleteRequirementMapping(mappingId: string) {
  deleteRequirementMappingInState(state, mappingId)
}

export function confirmRequirementMapping(mappingId: string) {
  confirmRequirementMappingInState(state, mappingId)
}
