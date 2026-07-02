import { describe, expect, it } from 'vitest'
import { createInitialVirtualLabState } from './virtual-lab/initialData'
import {
  formVirtualLabRecordFromActivityInState,
  inviteVirtualLabMemberInState,
  sendVirtualLabRecordToArchiveInState,
} from './virtual-lab/actions'

describe('virtual lab store structure', () => {
  it('creates a fresh virtual lab state independent from the singleton store', () => {
    const first = createInitialVirtualLabState()
    const second = createInitialVirtualLabState()

    first.rooms[0].members += 1

    expect(second.rooms[0].members).toBe(28)
  })

  it('runs virtual lab actions against an injected state', () => {
    const state = createInitialVirtualLabState()

    const member = inviteVirtualLabMemberInState(state, 'smart-manufacturing')

    expect(member).toMatchObject({
      roomId: 'smart-manufacturing',
      name: '待确认教师',
    })
    expect(state.rooms.find(item => item.id === 'smart-manufacturing')?.members).toBe(29)
  })

  it('forms a record and injects archive upsert dependency when sending it to archive', () => {
    const state = createInitialVirtualLabState()
    const archiveRecords: unknown[] = []

    const record = formVirtualLabRecordFromActivityInState(state, 'task-discussion')
    sendVirtualLabRecordToArchiveInState(state, record?.id ?? '', item => archiveRecords.push(item))

    expect(record?.archiveStatus).toBe('已生成待确认档案')
    expect(archiveRecords).toHaveLength(1)
  })
})
