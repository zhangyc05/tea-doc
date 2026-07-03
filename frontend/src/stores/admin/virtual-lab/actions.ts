import type { ArchiveProcessingRecord } from '@/domain/admin/archive'
import type { VirtualLabActivity, VirtualLabMember, VirtualLabState } from '@/domain/admin/virtual-lab'
import { makeRecord, makeRoom } from './initialData'

type UpsertArchiveRecord = (record: ArchiveProcessingRecord) => unknown

export function createVirtualLabRoomInState(state: VirtualLabState) {
  const room = makeRoom(`draft-${state.rooms.length + 1}`, '新增虚拟教研室待完善', '待补充教研方向', '智能制造学院 | 待确认专业群', '待指定', 0, 0, 0, '待创建首次教研活动', '待安排', '待确认', '待补充教研室说明。')
  room.status = '草稿'
  state.rooms = [room, ...state.rooms]
  state.operationMessage = '已创建待完善教研室草稿。'
  return room
}

export function publishVirtualLabRoomInState(state: VirtualLabState, roomId: string) {
  const room = findRoom(state, roomId)
  if (!room) return null
  room.status = '运行中'
  state.operationMessage = `${room.name} 已进入运行中状态。`
  return room
}

export function stopVirtualLabRoomInState(state: VirtualLabState, roomId: string) {
  const room = findRoom(state, roomId)
  if (!room) return null
  room.status = '停用'
  room.inProgressActivities = 0
  state.operationMessage = `${room.name} 已停用。`
  return room
}

export function archiveVirtualLabRoomInState(state: VirtualLabState, roomId: string) {
  const room = findRoom(state, roomId)
  if (!room) return null
  room.status = '归档'
  room.inProgressActivities = 0
  state.operationMessage = `${room.name} 已归档。`
  return room
}

export function inviteVirtualLabMemberInState(state: VirtualLabState, roomId: string) {
  const room = findRoom(state, roomId)
  if (!room) return null
  const member: VirtualLabMember = {
    id: `invite-${state.members.length + 1}`,
    roomId,
    name: '待确认教师',
    college: getRoomCollege(room.affiliation),
    role: '待确认',
    activitiesParticipated: 0,
    recordsFormed: 0,
    recentParticipation: '待参与',
  }
  state.members = [member, ...state.members]
  room.members += 1
  state.operationMessage = '已新增待确认教师邀请记录。'
  return member
}

export function removeVirtualLabMemberInState(state: VirtualLabState, roomId: string, memberId: string) {
  const member = state.members.find(item => item.roomId === roomId && item.id === memberId)
  if (!member || member.role === '负责人') return null
  state.members = state.members.filter(item => item.id !== memberId)
  const room = findRoom(state, roomId)
  if (room) room.members = Math.max(0, room.members - 1)
  state.operationMessage = `已将 ${member.name} 移出当前教研室成员列表。`
  return member
}

export function createVirtualLabActivityInState(state: VirtualLabState, roomId: string) {
  const room = findRoom(state, roomId)
  if (!room) return null
  const activity: VirtualLabActivity = {
    id: `draft-activity-${state.activities.length + 1}`,
    roomId,
    name: '新增教研活动待完善',
    theme: '待补充活动主题',
    time: '待安排',
    meetingMethod: '待确认',
    meetingNo: '待确认',
    initiator: room.leader,
    participantsCount: 0,
    createdAt: '刚刚创建',
    description: '待补充活动说明。',
    participation: '0 人',
    recordStatus: '未形成记录',
    recentUpdate: '刚刚创建',
  }
  state.activities = [activity, ...state.activities]
  room.inProgressActivities += 1
  room.recentActivity = activity.name
  room.recentTime = '刚刚'
  state.operationMessage = '已创建待完善教研活动。'
  return activity
}

export function formVirtualLabRecordFromActivityInState(state: VirtualLabState, activityId: string) {
  const activity = findActivity(state, activityId)
  if (!activity) return null
  const room = findRoom(state, activity.roomId)
  if (!room) return null
  activity.recordStatus = '已形成记录'
  activity.recentUpdate = '刚刚形成记录'
  const existing = state.records.find(item => item.sourceActivityId === activityId)
  if (existing) return existing

  const record = makeRecord(
    `record-${activity.id}`,
    activity.roomId,
    activity.id,
    `${activity.name}记录`,
    activity.name,
    '刚刚',
    '会议纪要、任务分工、阶段成果摘要',
    room.leader,
    activity,
  )
  state.records = [record, ...state.records]
  room.recordsCount += 1
  state.operationMessage = `${activity.name} 已形成教研记录。`
  return record
}

export function sendVirtualLabRecordToArchiveInState(state: VirtualLabState, recordId: string, upsertArchiveRecord: UpsertArchiveRecord) {
  const record = findRecord(state, recordId)
  if (!record) return null
  record.archiveStatus = '已生成待确认档案'
  record.currentStatus = '已生成成长档案待确认记录'
  upsertArchiveRecord({
    id: `virtual-lab-${record.id}`,
    batchId: 'virtual-lab',
    name: record.title,
    teacher: record.ownerTeacher,
    dimension: '教研科研',
    source: '虚拟教研',
    status: '待确认',
    updateTime: '06-18 16:40',
    uploader: '虚拟教研室',
    uploadBatch: '虚拟教研记录沉淀',
    originalFile: record.sourceActivity,
    issues: [],
    processingHistory: ['2026-06-18 16:40 虚拟教研记录生成成长档案待确认记录'],
  })
  state.operationMessage = `${record.title} 已生成成长档案待确认记录。`
  return record
}

export function getVirtualLabRoomInState(state: VirtualLabState, roomId: string) {
  return findRoom(state, roomId) ?? state.rooms[0]
}

export function getVirtualLabActivityInState(state: VirtualLabState, activityId: string) {
  return findActivity(state, activityId) ?? state.activities[0]
}

export function getVirtualLabRecordInState(state: VirtualLabState, recordId: string) {
  return findRecord(state, recordId) ?? state.records[0]
}

export function getVirtualLabMembersByRoomInState(state: VirtualLabState, roomId: string) {
  return state.members.filter(item => item.roomId === roomId)
}

export function getVirtualLabActivitiesByRoomInState(state: VirtualLabState, roomId: string) {
  return state.activities.filter(item => item.roomId === roomId)
}

export function getVirtualLabRecordsByRoomInState(state: VirtualLabState, roomId: string) {
  return state.records.filter(item => item.roomId === roomId)
}

export function getVirtualLabMaterialsByActivityInState(state: VirtualLabState, activityId: string) {
  return state.materials.filter(item => item.activityId === activityId)
}

export function markVirtualLabMaterialSyncFailedInState(state: VirtualLabState, materialId: string) {
  const material = findMaterial(state, materialId)
  if (!material) return null
  material.syncStatus = '同步失败'
  material.syncMessage = '资料同步失败，请重新同步'
  state.operationMessage = `${material.name} 同步失败。`
  return material
}

export function resyncVirtualLabMaterialInState(state: VirtualLabState, materialId: string) {
  const material = findMaterial(state, materialId)
  if (!material) return null
  material.syncStatus = '重新同步中'
  material.syncMessage = '已发起重新同步'
  state.operationMessage = `${material.name} 已发起重新同步。`
  return material
}

function findRoom(state: VirtualLabState, roomId: string) {
  return state.rooms.find(item => item.id === roomId)
}

function findActivity(state: VirtualLabState, activityId: string) {
  return state.activities.find(item => item.id === activityId)
}

function findRecord(state: VirtualLabState, recordId: string) {
  return state.records.find(item => item.id === recordId)
}

function findMaterial(state: VirtualLabState, materialId: string) {
  return state.materials.find(item => item.id === materialId)
}

function getRoomCollege(affiliation: string) {
  return affiliation.split('|')[0]?.trim() || '待确认院系'
}
