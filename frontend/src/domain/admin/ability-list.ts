import type { AbilityIndicator } from '@/components/admin/ability-list/types'

export type { AbilityIndicator }

export type ExecutionVersionStatus = 'pending' | 'published' | 'historical'
export type OptimizationSuggestionStatus = 'pending' | 'adopted' | 'deferred' | 'rejected' | 'applied'
export type RequirementMappingStatus = 'confirmed' | 'pending' | 'unconfigured'

export type OptimizationSuggestion = {
  id: string
  source: string
  sourceLabel: string
  issueType: string
  keyLocation: string
  content: string
  basis: string
  status: OptimizationSuggestionStatus
  statusLabel: string
  targetIndicator: AbilityIndicator
}

export type TemplateApplication = {
  suggestionId: string
  targetIndicator: AbilityIndicator
}

export type RequirementMapping = {
  id: string
  requirementText: string
  indicatorDimension: string
  indicatorName: string
  level: string
  levelCriteria: string
  documentCondition: string
  confirmStatus: RequirementMappingStatus
}

export type ExecutionVersion = {
  versionNo: string
  title: string
  sourceTitle: string
  templateTitle: string
  scope: string
  indicatorCount: number
  lastUpdated: string
  status: ExecutionVersionStatus
  publishedAt: string
  source: string
  operator: string
}

export type AbilityListState = {
  baseTemplateIndicators: AbilityIndicator[]
  executionVersion: ExecutionVersion
  versionHistory: ExecutionVersion[]
  executionIndicators: AbilityIndicator[]
  optimizationSuggestions: OptimizationSuggestion[]
  pendingTemplateApplications: TemplateApplication[]
  requirementMappings: RequirementMapping[]
  operationMessage: string
}
