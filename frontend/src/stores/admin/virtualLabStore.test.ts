import { beforeEach, describe, expect, it } from 'vitest'
import { getArchiveState, resetArchiveState } from './archiveStore'
import {
  createVirtualLabActivity,
  createVirtualLabRoom,
  formVirtualLabRecordFromActivity,
  archiveVirtualLabRoom,
  getVirtualLabState,
  inviteVirtualLabMember,
  markVirtualLabMaterialSyncFailed,
  publishVirtualLabRoom,
  resyncVirtualLabMaterial,
  resetVirtualLabState,
  sendVirtualLabRecordToArchive,
  stopVirtualLabRoom,
} from './virtualLabStore'

describe('virtual lab business state', () => {
  beforeEach(() => {
    resetArchiveState()
    resetVirtualLabState()
  })

  it('creates a room draft that appears in the room list', () => {
    const draft = createVirtualLabRoom()

    const room = getVirtualLabState().rooms.find(item => item.id === draft.id)

    expect(room).toMatchObject({
      name: '新增虚拟教研室待完善',
      status: '草稿',
      leader: '待指定',
      members: 0,
      inProgressActivities: 0,
      recordsCount: 0,
    })
  })

  it('moves virtual lab rooms through draft, running, stopped and archived statuses', () => {
    const draft = createVirtualLabRoom()

    publishVirtualLabRoom(draft.id)
    expect(getVirtualLabState().rooms.find(item => item.id === draft.id)?.status).toBe('运行中')

    stopVirtualLabRoom(draft.id)
    expect(getVirtualLabState().rooms.find(item => item.id === draft.id)?.status).toBe('停用')

    archiveVirtualLabRoom(draft.id)
    expect(getVirtualLabState().rooms.find(item => item.id === draft.id)?.status).toBe('归档')
    expect(getVirtualLabState().operationMessage).toContain('已归档')
  })

  it('invites a member and updates the room member count', () => {
    inviteVirtualLabMember('smart-manufacturing')

    const state = getVirtualLabState()
    const room = state.rooms.find(item => item.id === 'smart-manufacturing')
    const member = state.members.find(item => item.roomId === 'smart-manufacturing' && item.id.startsWith('invite-'))

    expect(member).toMatchObject({
      name: '待确认教师',
      role: '待确认',
      activitiesParticipated: 0,
      recordsFormed: 0,
    })
    expect(room?.members).toBe(29)
  })

  it('creates an activity under a room and updates room activity metrics', () => {
    const activity = createVirtualLabActivity('smart-manufacturing')

    const room = getVirtualLabState().rooms.find(item => item.id === 'smart-manufacturing')

    expect(activity).toMatchObject({
      roomId: 'smart-manufacturing',
      name: '新增教研活动待完善',
      recordStatus: '未形成记录',
    })
    expect(room?.inProgressActivities).toBe(3)
    expect(room?.recentActivity).toBe('新增教研活动待完善')
  })

  it('forms a research record from an activity and exposes it in room records', () => {
    const record = formVirtualLabRecordFromActivity('task-discussion')

    const state = getVirtualLabState()
    const activity = state.activities.find(item => item.id === 'task-discussion')
    const room = state.rooms.find(item => item.id === 'smart-manufacturing')

    expect(activity?.recordStatus).toBe('已形成记录')
    expect(record).toMatchObject({
      sourceActivityId: 'task-discussion',
      sourceActivity: '课程任务书优化讨论',
      roomId: 'smart-manufacturing',
      archiveStatus: '待沉淀',
    })
    expect(room?.recordsCount).toBe(7)
  })

  it('sends a formed record to archive processing without direct archiving', () => {
    sendVirtualLabRecordToArchive('smart-line-record')

    const state = getVirtualLabState()
    const record = state.records.find(item => item.id === 'smart-line-record')
    const archiveRecord = getArchiveState().processingRecords.find(item => item.id === 'virtual-lab-smart-line-record')

    expect(record?.archiveStatus).toBe('已生成待确认档案')
    expect(archiveRecord).toMatchObject({
      name: '智能产线课程项目化改造研讨记录',
      teacher: '周明',
      dimension: '教研科研',
      source: '虚拟教研',
      status: '待确认',
    })
    expect(getArchiveState().teacherArchiveFacts).toHaveLength(0)
  })

  it('tracks activity material sync failure and retry status', () => {
    markVirtualLabMaterialSyncFailed('1')

    const failed = getVirtualLabState().materials.find(item => item.id === '1')
    expect(failed).toMatchObject({
      syncStatus: '同步失败',
      syncMessage: '资料同步失败，请重新同步',
    })

    resyncVirtualLabMaterial('1')

    const retrying = getVirtualLabState().materials.find(item => item.id === '1')
    expect(retrying).toMatchObject({
      syncStatus: '重新同步中',
      syncMessage: '已发起重新同步',
    })
  })
})
