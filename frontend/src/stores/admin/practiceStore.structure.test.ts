import { describe, expect, it } from 'vitest'
import { createInitialPracticeState } from './practice/initialData'
import { approvePracticeApplicationInState, confirmPracticeArchiveInState } from './practice/actions'

describe('practice store structure', () => {
  it('creates a fresh practice state independent from the singleton store', () => {
    const first = createInitialPracticeState()
    const second = createInitialPracticeState()

    first.applications[0].status = '已同意'

    expect(second.applications[0].status).toBe('待审核')
  })

  it('runs practice actions against an injected state', () => {
    const state = createInitialPracticeState()

    const result = approvePracticeApplicationInState(state, '1')

    expect(result?.application.status).toBe('已同意')
    expect(state.trackings.find(item => item.teacher === '林老师')?.currentProgress).toBe('实践中')
    expect(state.records.find(item => item.applicationId === '1')?.currentStatus).toBe('实践中')
  })

  it('allows archive upsert dependency injection when archiving a practice record', () => {
    const state = createInitialPracticeState()
    const archiveRecords: unknown[] = []

    confirmPracticeArchiveInState(state, '2', record => archiveRecords.push(record))

    expect(state.records.find(item => item.id === '2')?.currentStatus).toBe('已归档')
    expect(archiveRecords).toHaveLength(1)
  })
})
