import { reactive } from 'vue'
import { upsertArchiveProcessingRecord } from './archiveStore'
import {
  createVirtualLabActivityInState,
  createVirtualLabRoomInState,
  formVirtualLabRecordFromActivityInState,
  getVirtualLabActivitiesByRoomInState,
  getVirtualLabActivityInState,
  getVirtualLabMaterialsByActivityInState,
  getVirtualLabMembersByRoomInState,
  getVirtualLabRecordInState,
  getVirtualLabRecordsByRoomInState,
  getVirtualLabRoomInState,
  inviteVirtualLabMemberInState,
  removeVirtualLabMemberInState,
  sendVirtualLabRecordToArchiveInState,
} from './virtual-lab/actions'
import { createInitialVirtualLabState } from './virtual-lab/initialData'

export type {
  VirtualLabActivity,
  VirtualLabActivityRecordStatus,
  VirtualLabMaterial,
  VirtualLabMember,
  VirtualLabRecord,
  VirtualLabRecordArchiveStatus,
  VirtualLabRoom,
  VirtualLabState,
} from '@/domain/admin/virtual-lab'

const state = reactive(createInitialVirtualLabState())

export function getVirtualLabState() {
  return state
}

export function resetVirtualLabState() {
  Object.assign(state, createInitialVirtualLabState())
}

export function createVirtualLabRoom() {
  return createVirtualLabRoomInState(state)
}

export function inviteVirtualLabMember(roomId: string) {
  return inviteVirtualLabMemberInState(state, roomId)
}

export function removeVirtualLabMember(roomId: string, memberId: string) {
  return removeVirtualLabMemberInState(state, roomId, memberId)
}

export function createVirtualLabActivity(roomId: string) {
  return createVirtualLabActivityInState(state, roomId)
}

export function formVirtualLabRecordFromActivity(activityId: string) {
  return formVirtualLabRecordFromActivityInState(state, activityId)
}

export function sendVirtualLabRecordToArchive(recordId: string) {
  return sendVirtualLabRecordToArchiveInState(state, recordId, upsertArchiveProcessingRecord)
}

export function getVirtualLabRoom(roomId: string) {
  return getVirtualLabRoomInState(state, roomId)
}

export function getVirtualLabActivity(activityId: string) {
  return getVirtualLabActivityInState(state, activityId)
}

export function getVirtualLabRecord(recordId: string) {
  return getVirtualLabRecordInState(state, recordId)
}

export function getVirtualLabMembersByRoom(roomId: string) {
  return getVirtualLabMembersByRoomInState(state, roomId)
}

export function getVirtualLabActivitiesByRoom(roomId: string) {
  return getVirtualLabActivitiesByRoomInState(state, roomId)
}

export function getVirtualLabRecordsByRoom(roomId: string) {
  return getVirtualLabRecordsByRoomInState(state, roomId)
}

export function getVirtualLabMaterialsByActivity(activityId: string) {
  return getVirtualLabMaterialsByActivityInState(state, activityId)
}
