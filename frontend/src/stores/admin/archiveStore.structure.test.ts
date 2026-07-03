import { describe, expect, it } from 'vitest'
import { createInitialArchiveState } from './archive/initialData'
import {
  addArchiveUploadedFilesInState,
  confirmArchiveBatchRecognitionInState,
  confirmArchiveRecordInState,
  createArchiveImportBatchInState,
} from './archive/actions'

describe('archive store structure', () => {
  it('creates a fresh archive state independent from the singleton store', () => {
    const first = createInitialArchiveState()
    const second = createInitialArchiveState()

    first.uploadedFiles[0].name = '测试文件.xlsx'
    first.processingRecords[0].processingHistory.push('测试历史')

    expect(second.uploadedFiles[0].name).toBe('2026年度课程建设项目名单件名单.xlsx')
    expect(second.processingRecords[0].processingHistory).not.toContain('测试历史')
  })

  it('runs import batch actions against an injected state', () => {
    const state = createInitialArchiveState()

    addArchiveUploadedFilesInState(state, [
      { id: 'extra-file', name: '补充材料.pdf', size: '1MB', status: '已上传', type: 'pdf' },
    ])
    const batch = createArchiveImportBatchInState(state, 'structure-batch')
    const records = confirmArchiveBatchRecognitionInState(state, 'structure-batch')

    expect(batch.status).toBe('confirmed')
    expect(records).toHaveLength(3)
    expect(state.processingRecords[0].batchId).toBe('structure-batch')
  })

  it('archives a processing record into injected state facts', () => {
    const state = createInitialArchiveState()

    const record = confirmArchiveRecordInState(state, '1')

    expect(record?.status).toBe('已入档')
    expect(state.teacherArchiveFacts[0]).toMatchObject({
      sourceRecordId: '1',
      title: '教学能力大赛获奖证书',
    })
  })
})
