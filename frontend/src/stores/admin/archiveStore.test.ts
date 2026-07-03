import { beforeEach, describe, expect, it } from 'vitest'
import {
  addArchiveUploadedFiles,
  cancelArchiveImportBatch,
  completeArchiveBatchRecognition,
  confirmArchiveBatchRecognition,
  confirmArchiveRecord,
  createArchiveImportBatch,
  createTeacherArchiveExportRecord,
  getArchiveSourceRecordsForFact,
  getArchiveState,
  getTeacherArchiveFacts,
  markArchiveRecordException,
  resetArchiveState,
  returnArchiveRecord,
} from './archiveStore'

describe('archive business state', () => {
  beforeEach(() => {
    resetArchiveState()
  })

  it('stores uploaded files and creates an import batch when recognition starts', () => {
    addArchiveUploadedFiles([
      {
        id: 'upload-extra',
        name: '新增教师证书.pdf',
        size: '2.4MB',
        status: '已上传',
        type: 'pdf',
      },
    ])

    const batch = createArchiveImportBatch()
    const state = getArchiveState()

    expect(state.uploadedFiles.some(file => file.id === 'upload-extra')).toBe(true)
    expect(batch.status).toBe('recognizing')
    expect(batch.files.some(file => file.id === 'upload-extra')).toBe(true)
    expect(state.importBatches[0]?.id).toBe(batch.id)
  })

  it('marks a batch as recognized and exposes recognition totals', () => {
    const batch = createArchiveImportBatch()

    completeArchiveBatchRecognition(batch.id)

    const completedBatch = getArchiveState().importBatches.find(item => item.id === batch.id)

    expect(completedBatch?.status).toBe('recognized')
    expect(completedBatch?.recognitionResult.totalRecords).toBe(36)
    expect(completedBatch?.recognitionResult.pendingConfirm).toBe(18)
  })

  it('cancels a recognizing batch without generating processing records', () => {
    const batch = createArchiveImportBatch()

    const cancelledBatch = cancelArchiveImportBatch(batch.id)
    const state = getArchiveState()

    expect(cancelledBatch?.status).toBe('cancelled')
    expect(cancelledBatch?.files.every(file => file.batchStatus === '已取消')).toBe(true)
    expect(state.processingRecords.some(record => record.batchId === batch.id)).toBe(false)
    expect(state.operationMessage).toContain('已取消')
  })

  it('generates processing records from a confirmed recognition batch', () => {
    const batch = createArchiveImportBatch()
    completeArchiveBatchRecognition(batch.id)

    const createdRecords = confirmArchiveBatchRecognition(batch.id)
    const state = getArchiveState()

    expect(createdRecords).toHaveLength(3)
    expect(state.processingRecords.slice(0, 3).map(record => record.batchId)).toEqual([
      batch.id,
      batch.id,
      batch.id,
    ])
    expect(state.processingRecords[0]?.status).toBe('待确认')
    expect(state.operationMessage).toContain('已生成 3 条待处理记录')
  })

  it('archives a processing record into teacher archive facts and appends history', () => {
    confirmArchiveRecord('1')

    const state = getArchiveState()
    const record = state.processingRecords.find(item => item.id === '1')

    expect(record?.status).toBe('已入档')
    expect(record?.processingHistory[record.processingHistory.length - 1]).toContain('确认入档')
    expect(state.teacherArchiveFacts[0]).toMatchObject({
      sourceRecordId: '1',
      teacher: '蒋老师',
      dimension: '成果荣誉',
      title: '教学能力大赛获奖证书',
    })
  })

  it('returns or marks a processing record as exception and keeps history', () => {
    returnArchiveRecord('2')
    markArchiveRecordException('3')

    const state = getArchiveState()
    const returned = state.processingRecords.find(item => item.id === '2')
    const exception = state.processingRecords.find(item => item.id === '3')

    expect(returned?.status).toBe('待补充')
    expect(returned?.processingHistory[returned.processingHistory.length - 1]).toContain('再次退回')
    expect(exception?.status).toBe('异常待处理')
    expect(exception?.processingHistory[exception.processingHistory.length - 1]).toContain('标记异常')
  })

  it('selects teacher archive facts and source records for archive detail pages', () => {
    confirmArchiveRecord('2')

    const facts = getTeacherArchiveFacts('林老师')
    const sourceRecords = getArchiveSourceRecordsForFact(facts[0].id)

    expect(facts[0]).toMatchObject({
      teacher: '林老师',
      title: '精品课程建设立项材料',
      sourceRecordId: '2',
    })
    expect(sourceRecords[0]).toMatchObject({
      id: '2',
      originalFile: '2026 年度课程建设项目 6 批名单.xlsx',
    })
  })

  it('creates a traceable teacher archive export record', () => {
    confirmArchiveRecord('2')

    const exportRecord = createTeacherArchiveExportRecord({
      teacherId: 'lin',
      teacherName: '林老师',
      cycle: '2026年度发展周期',
      factCount: getTeacherArchiveFacts('林老师').length,
    })
    const state = getArchiveState()

    expect(exportRecord).toMatchObject({
      teacherId: 'lin',
      teacherName: '林老师',
      cycle: '2026年度发展周期',
      status: '已完成',
      factCount: 1,
      operator: '档案管理员',
    })
    expect(exportRecord.fileName).toContain('teacher-archive-lin')
    expect(state.exportRecords[0]).toStrictEqual(exportRecord)
    expect(state.operationMessage).toContain('已生成成长档案导出记录')
  })
})
