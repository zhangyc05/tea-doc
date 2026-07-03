import { beforeEach, describe, expect, it } from 'vitest'
import {
  confirmArchiveRecord,
  getArchiveSourceRecordsForFact,
  getArchiveState,
  getTeacherArchiveFacts,
  resetArchiveState,
} from './archiveStore'
import {
  approvePracticeApplication,
  confirmPracticeArchive,
  getPracticeState,
  remindPracticeApplication,
  resetPracticeState,
  returnPracticeApplication,
} from './practiceStore'

describe('practice business state', () => {
  beforeEach(() => {
    resetArchiveState()
    resetPracticeState()
  })

  it('approves an application and syncs tracking plus record state', () => {
    approvePracticeApplication('1')

    const state = getPracticeState()
    const application = state.applications.find(item => item.id === '1')
    const tracking = state.trackings.find(item => item.teacher === '林老师')
    const record = state.records.find(item => item.applicationId === '1')

    expect(application?.status).toBe('已同意')
    expect(tracking?.currentProgress).toBe('实践中')
    expect(record).toMatchObject({
      teacher: '林老师',
      currentStatus: '实践中',
      countedDays: '暂未计入',
    })
  })

  it('returns an application and keeps tracking in pending application state', () => {
    returnPracticeApplication('2')

    const state = getPracticeState()
    const application = state.applications.find(item => item.id === '2')
    const tracking = state.trackings.find(item => item.teacher === '赵老师')

    expect(application?.status).toBe('退回修改')
    expect(tracking?.currentProgress).toBe('待审核申请')
    expect(tracking?.recentAction).toContain('退回修改')
  })

  it('records an application reminder without changing completion days', () => {
    remindPracticeApplication('1')

    const tracking = getPracticeState().trackings.find(item => item.id === '1')

    expect(tracking?.recentAction).toContain('已提醒提交企业实践申请')
    expect(tracking?.completedDays).toBe(18)
  })

  it('archives a practice record and creates an archive processing record', () => {
    confirmPracticeArchive('2')

    const record = getPracticeState().records.find(item => item.id === '2')
    const archiveRecord = getArchiveState().processingRecords.find(item => item.id === 'practice-2')

    expect(record?.currentStatus).toBe('已归档')
    expect(record?.countedDays).toBe('已计入')
    expect(archiveRecord).toMatchObject({
      name: '企业实践记录：青岛工业机器人有限公司',
      teacher: '王老师',
      dimension: '企业实践',
      source: '企业实践',
      status: '待确认',
    })
  })

  it('links confirmed practice archive facts back to detailed practice source records', () => {
    confirmPracticeArchive('2')
    confirmArchiveRecord('practice-2')

    const facts = getTeacherArchiveFacts('王老师')
    const practiceFact = facts.find(item => item.sourceRecordId === 'practice-2')
    const sourceRecords = practiceFact ? getArchiveSourceRecordsForFact(practiceFact.id) : []

    expect(practiceFact).toMatchObject({
      dimension: '企业实践',
      title: '企业实践记录：青岛工业机器人有限公司',
      sourceRecordId: 'practice-2',
    })
    expect(sourceRecords[0]).toMatchObject({
      id: 'practice-2',
      originalFile: '青岛工业机器人有限公司 / 2026-06-10 至 2026-06-22 / 12 天 / 现场调试实践',
      source: '企业实践',
    })
  })
})
