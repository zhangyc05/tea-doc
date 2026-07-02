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
  basicAbilityStatus: string
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

export type AbilityProfileGroupMock = {
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
}
