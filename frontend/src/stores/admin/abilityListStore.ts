import { reactive } from 'vue'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import type {
  AbilityListState,
  OptimizationSuggestionStatus,
  RequirementMapping,
} from '@/domain/admin/ability-list'
import {
  applyAdoptedSuggestionsToBaseTemplateInState,
  confirmRequirementMappingInState,
  deleteRequirementMappingInState,
  deriveNextExecutionVersionInState,
  publishExecutionVersionInState,
  saveRequirementMappingInState,
  updateIndicatorInState,
  updateOptimizationSuggestionStatusInState,
} from './ability-list/actions'
import { createInitialAbilityListState } from './ability-list/initialData'

export type {
  AbilityListState,
  ExecutionVersion,
  ExecutionVersionStatus,
  OptimizationSuggestion,
  OptimizationSuggestionStatus,
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
  const target = updateIndicatorInState(state.baseTemplateIndicators, key, patch)
  if (!target) return
  state.operationMessage = `已保存基准模板指标调整：${target.name}。`
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
    ? `已采纳建议：${target.issueType}，待应用到基准模板。`
    : ''
}

export function applyAdoptedSuggestionsToBaseTemplate() {
  return applyAdoptedSuggestionsToBaseTemplateInState(state)
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
