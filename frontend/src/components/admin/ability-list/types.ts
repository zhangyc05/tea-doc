export type AbilityTreeChild = {
  key: string
  label: string
}

export type AbilityTreeNode = {
  key: string
  label: string
  icon?: string
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'gray'
  children?: AbilityTreeChild[]
}

export type AbilityIndicatorStatus = 'enabled' | 'disabled' | 'draft'

export type AbilityIndicator = {
  key: string
  abilityKey?: string
  name: string
  novice: string
  competent: string
  backbone: string
  expert: string
  basisLabel: string
  status?: AbilityIndicatorStatus
}
