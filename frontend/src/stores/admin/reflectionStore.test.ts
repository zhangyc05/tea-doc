import { beforeEach, describe, expect, it } from 'vitest'
import { getArchiveState, resetArchiveState } from './archiveStore'
import { getReflectionState, resetReflectionState, sendReflectionToArchive } from './reflectionStore'

describe('reflection business state', () => {
  beforeEach(() => {
    resetArchiveState()
    resetReflectionState()
  })

  it('creates an archive processing record for a confirmed teaching reflection', () => {
    sendReflectionToArchive('project-participation')

    const archiveRecord = getArchiveState().processingRecords.find(
      item => item.id === 'reflection-project-participation',
    )

    expect(archiveRecord).toMatchObject({
      name: '项目实训环节学生参与度不足',
      teacher: '林老师',
      dimension: '教学工作',
      source: '教学反思',
      status: '待确认',
    })
    expect(getReflectionState().operationMessage).toContain('成长档案待确认记录')
  })
})
