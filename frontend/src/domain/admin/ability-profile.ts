export type AbilityProfileScore = {
  label: string
  value: number
}

export type AbilityProfileDistribution = {
  label: string
  percentage: number
}

export type AbilityProfileDimension = {
  dimension: string
  index: number
  composition: string
  distribution?: AbilityProfileDistribution[]
}

export type AbilityProfileDevelopmentDirection = {
  title: string
  observation: string
  keyDimension: string
}

export type AbilityProfileFocusObject = {
  name: string
  type: string
  dimension: string
  reason: string
}

export type AbilityProfileTeacher = {
  id: string
  name: string
  college: string
  title: string
  developmentIndex: number
  teacherType: string
  basicAbilityStatus: BasicAbilityStatus
  tags: string[]
  focusType: string
}

export type AbilityProfileTeacherInfo = {
  name: string
  college: string
  title: string
  year: number
  period: string
  version: string
  dataBasis: string
  updateTime: string
}

export type AbilityProfileDevelopmentIndex = {
  score: number
  total: number
  teacherType: string
  abilityStage: string
  basicAbility: string
  typeBasis: string
}

export type AbilityProfileBaseline = {
  year: number
  status: string
}

export type AbilityProfileSupportDirection = {
  feature: string
  direction: string
  focus: string
}

export type BasicAbilityStatus = '达标' | '未达标'
export type AbilityStage = '新手' | '胜任' | '骨干' | '名师'
export type AbilityDimensionName = '教学能力' | '教研能力' | '实践能力' | '服务能力'

export type AbilityProfileCurrentSummary = {
  statement: string
  note: string
  status: string
  statusDetail: string
  developmentIndex: number
  updatedAt: string
  tags: string[]
}

export type AbilityStageRange = {
  stage: AbilityStage
  min: number
  max: number
  color: string
}

export type AbilityRadarDimension = {
  dimension: AbilityDimensionName
  score: number
  stage: AbilityStage
  label: string
}

export type AbilityReferenceLine = {
  label: string
  values: Record<AbilityDimensionName, number>
}

export type AbilityStageRadar = {
  basicAbilityStatus: BasicAbilityStatus
  stages: AbilityStageRange[]
  dimensions: AbilityRadarDimension[]
  referenceLine?: AbilityReferenceLine
  structureSummary: string
  focusItems: string[]
}

export type AbilityStructureItem = {
  dimension: AbilityDimensionName
  score: number
  stage: AbilityStage
  statusText: string
  description: string
}

export type TargetComparisonGroup = {
  title: string
  formedSupports: string[]
  continuingDirections: string[]
}

export type DevelopmentDirection = {
  title: string
  description: string
}

export type ProfileBasisLink = {
  label: string
  route: string
}

export type ProfileBasis = {
  summary: string
  links: ProfileBasisLink[]
}

export type AbilityProfileGroupMock = {
  developmentIndex: number
  dataBasis: string
  schoolRadarData: AbilityProfileScore[]
  abilityDimensions: AbilityProfileDimension[]
  developmentDirections: AbilityProfileDevelopmentDirection[]
  focusTabs: Array<{ label: string; value: string }>
  focusData: Record<string, AbilityProfileFocusObject[]>
}

export type AbilityProfileTeacherListMock = {
  colleges: string[]
  titles: string[]
  teacherTypes: string[]
  focusTypes: string[]
  teachers: AbilityProfileTeacher[]
}

export type AbilityProfileTeacherDetailMock = {
  teacherInfo: AbilityProfileTeacherInfo
  developmentIndex: AbilityProfileDevelopmentIndex
  baselineData: AbilityProfileBaseline[]
  radarData: AbilityProfileScore[]
  abilityDimensions: AbilityProfileDimension[]
  supportDirections: AbilityProfileSupportDirection[]
  currentProfile: AbilityProfileCurrentSummary
  stageRadar: AbilityStageRadar
  abilityStructure: AbilityStructureItem[]
  targetComparison: TargetComparisonGroup[]
  developmentDirections: DevelopmentDirection[]
  basis: ProfileBasis
}
