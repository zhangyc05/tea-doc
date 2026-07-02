export type ReflectionRecord = {
  id: string
  teacher: string
  department: string
  major: string
  course: string
  class: string
  theme: string
  trigger: string
  submitTime: string
}

export type ReflectionCommonIssue = {
  rank: number
  issue: string
  count: number
}

export type ReflectionStats = {
  reflectionCount: number
  teacherCount: number
  teacherPercentage: number
  courseCount: number
  mainTrigger: string
  triggerPercentage: number
}

export type ReflectionDetail = ReflectionRecord & {
  source: string
  method: string
  destination: string
}

export type ReflectionContent = {
  background: string
  observation: string
  analysis: string
  suggestion: string
}

export type ReflectionSourceData = {
  trigger: string
  relatedData: string[]
}

export type RelatedReflection = {
  id: string
  theme: string
  course: string
  class: string
  trigger: string
  submitTime: string
}

export type ReflectionOverviewMock = {
  organizations: string[]
  semesters: string[]
  triggers: string[]
  reflections: ReflectionRecord[]
  commonIssues: ReflectionCommonIssue[]
  stats: ReflectionStats
}

export type ReflectionDetailMock = {
  reflectionDetail: ReflectionDetail
  reflectionContent: ReflectionContent
  sourceData: ReflectionSourceData
  relatedReflections: RelatedReflection[]
}
