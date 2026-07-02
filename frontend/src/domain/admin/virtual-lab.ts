export const virtualLabActivityRecordStatuses = ['已形成记录', '未形成记录', '记录异常'] as const
export const virtualLabRecordArchiveStatuses = ['待沉淀', '已生成待确认档案'] as const

export type VirtualLabActivityRecordStatus = typeof virtualLabActivityRecordStatuses[number]
export type VirtualLabRecordArchiveStatus = typeof virtualLabRecordArchiveStatuses[number]

export type VirtualLabRoom = {
  id: string
  name: string
  direction: string
  affiliation: string
  leader: string
  members: number
  inProgressActivities: number
  recordsCount: number
  recentActivity: string
  recentTime: string
  createdAt: string
  description: string
}

export type VirtualLabMember = {
  id: string
  roomId: string
  name: string
  college: string
  role: string
  activitiesParticipated: number
  recordsFormed: number
  recentParticipation: string
}

export type VirtualLabActivity = {
  id: string
  roomId: string
  name: string
  theme: string
  time: string
  meetingMethod: string
  meetingNo: string
  initiator: string
  participantsCount: number
  createdAt: string
  description: string
  participation: string
  recordStatus: VirtualLabActivityRecordStatus
  recentUpdate: string
}

export type VirtualLabMaterial = {
  id: string
  activityId: string
  name: string
  source: string
  type: string
  time: string
  description: string
  tone: string
}

export type VirtualLabRecord = {
  id: string
  roomId: string
  sourceActivityId: string
  title: string
  sourceActivity: string
  roomName: string
  activityTime: string
  meetingMethod: string
  formedTime: string
  recordSource: string
  currentStatus: string
  keyDimension: string
  content: string
  dimension: string
  ownerTeacher: string
  archiveStatus: VirtualLabRecordArchiveStatus
}

export type VirtualLabActivityParticipant = {
  id: string
  name: string
  avatar: string
  role: string
  participationType: string
  timeRange: string
  status: string
}

export type VirtualLabActivityTimelineItem = {
  id: string
  event: string
  operator: string
  time: string
}

export type VirtualLabRecordContent = {
  summary: string
  mainTopics: string[]
  taskAssignment: string[]
  stageResults: string[]
}

export type VirtualLabParticipationRecord = {
  id: string
  teacher: string
  avatar: string
  participationType: string
  contribution: string
  relatedMaterials: string
}

export type VirtualLabActivityDetailMock = {
  participants: VirtualLabActivityParticipant[]
  timeline: VirtualLabActivityTimelineItem[]
}

export type VirtualLabRecordDetailMock = {
  recordContent: VirtualLabRecordContent
  participationRecords: VirtualLabParticipationRecord[]
}

export type VirtualLabState = {
  rooms: VirtualLabRoom[]
  members: VirtualLabMember[]
  activities: VirtualLabActivity[]
  materials: VirtualLabMaterial[]
  records: VirtualLabRecord[]
  operationMessage: string
}
