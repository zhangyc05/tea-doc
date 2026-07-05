import type {
  AbilityIndicator,
  AbilityIndicatorStatus,
} from '@/components/admin/ability-list/types'

export type { AbilityIndicator, AbilityIndicatorStatus }

export type ExecutionVersionStatus = 'pending' | 'published' | 'historical'
export type BaseTemplateVersionStatus = 'current' | 'historical'
export type OptimizationSuggestionStatus = 'pending' | 'adopted' | 'deferred' | 'rejected' | 'applied'
export type RequirementMappingStatus = 'confirmed' | 'pending' | 'unconfigured'

export const executionVersionStatusLabelMap: Record<ExecutionVersionStatus, string> = {
  pending: '待发布',
  published: '已发布',
  historical: '历史版',
}

export const executionVersionStatusClassMap: Record<ExecutionVersionStatus, string> = {
  pending: 'badge-warning',
  published: 'badge-success',
  historical: 'badge-neutral',
}

export const requirementMappingStatusLabelMap: Record<RequirementMappingStatus, string> = {
  confirmed: '已确认',
  pending: '待确认',
  unconfigured: '未配置',
}

export const requirementMappingStatusClassMap: Record<RequirementMappingStatus, string> = {
  confirmed: 'badge-success',
  pending: 'badge-warning',
  unconfigured: 'badge-info',
}

export const abilityIndicatorStatusLabelMap: Record<AbilityIndicatorStatus, string> = {
  enabled: '已启用',
  disabled: '已禁用',
  draft: '草稿',
}

export const abilityIndicatorStatusClassMap: Record<AbilityIndicatorStatus, string> = {
  enabled: 'badge-success',
  disabled: 'badge-error',
  draft: 'badge-warning',
}

export const optimizationSuggestionStatusLabelMap: Record<OptimizationSuggestionStatus, string> = {
  pending: '待确认',
  adopted: '已采纳',
  deferred: '暂缓',
  rejected: '已弃用',
  applied: '已应用',
}

export const optimizationSuggestionStatusClassMap: Record<OptimizationSuggestionStatus, string> = {
  pending: 'status-pending',
  adopted: 'status-adopted',
  deferred: 'status-deferred',
  rejected: 'status-rejected',
  applied: 'status-applied',
}

export function getExecutionVersionStatusLabel(status: ExecutionVersionStatus): string {
  return executionVersionStatusLabelMap[status]
}

export function getExecutionVersionStatusClass(status: ExecutionVersionStatus): string {
  return executionVersionStatusClassMap[status]
}

export function getRequirementMappingStatusLabel(status: RequirementMappingStatus): string {
  return requirementMappingStatusLabelMap[status]
}

export function getRequirementMappingStatusClass(status: RequirementMappingStatus): string {
  return requirementMappingStatusClassMap[status]
}

export function getAbilityIndicatorStatusLabel(status?: AbilityIndicatorStatus): string {
  if (!status) return '未知'
  return abilityIndicatorStatusLabelMap[status]
}

export function getAbilityIndicatorStatusClass(status?: AbilityIndicatorStatus): string {
  if (!status) return 'badge-default'
  return abilityIndicatorStatusClassMap[status]
}

export function getOptimizationSuggestionStatusLabel(status: OptimizationSuggestionStatus): string {
  return optimizationSuggestionStatusLabelMap[status]
}

export function getOptimizationSuggestionStatusClass(status: OptimizationSuggestionStatus): string {
  return optimizationSuggestionStatusClassMap[status]
}

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

export type PendingBaseTemplateChange = {
  id: string
  indicatorKey: string
  indicatorName: string
  abilityKey?: string
  before?: AbilityIndicator
  after: AbilityIndicator
  changedAt: string
  operator: string
}

export type PendingExecutionIndicatorChange = {
  id: string
  indicatorKey: string
  indicatorName: string
  before?: AbilityIndicator
  after: AbilityIndicator
  changedAt: string
  operator: string
}

export type RequirementMapping = {
  id: string
  requirementGroupKey: string
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

export type BaseTemplateVersion = {
  versionNo: string
  title: string
  status: BaseTemplateVersionStatus
  updatedAt: string
  operator: string
  changeSummary: string
  changeCount: number
}

export type AbilityListIconMap = {
  basic: string
  teaching: string
  research: string
  practice: string
  service: string
}

export type AbilityListTreeChild = {
  key: string
  label: string
}

export type AbilityListTreeNode = {
  key: string
  label: string
  icon: string
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'gray'
  children?: AbilityListTreeChild[]
}

export type AbilityListOption = {
  key: string
  label: string
  icon?: string
}

export type AbilityListImpactCard = {
  title: string
  description: string
  icon: string
  tone: string
}

export type RequirementGroup = {
  key: string
  label: string
  children: AbilityListTreeChild[]
}

export type AbilityListBaseMock = {
  abilityTree: AbilityListTreeNode[]
}

export type AbilityListExecutionMock = {
  abilityTree: AbilityListTreeNode[]
}

export type AbilityListOptimizationMock = {
  suggestionSources: AbilityListOption[]
  filterTags: AbilityListOption[]
}

export type AbilityListPublishConfirmMock = {
  impactCards: AbilityListImpactCard[]
}

export type AbilityListRequirementMappingMock = {
  requirementGroups: RequirementGroup[]
}

export type AbilityListState = {
  baseTemplateIndicators: AbilityIndicator[]
  baseTemplateVersion: BaseTemplateVersion
  baseTemplateVersionHistory: BaseTemplateVersion[]
  pendingBaseTemplateChanges: PendingBaseTemplateChange[]
  executionVersion: ExecutionVersion
  versionHistory: ExecutionVersion[]
  executionIndicators: AbilityIndicator[]
  pendingExecutionIndicatorChanges: PendingExecutionIndicatorChange[]
  optimizationSuggestions: OptimizationSuggestion[]
  pendingTemplateApplications: TemplateApplication[]
  requirementMappings: RequirementMapping[]
  operationMessage: string
}
