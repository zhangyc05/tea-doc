import { beforeEach, describe, expect, it } from 'vitest'
import { getArchiveState, resetArchiveState } from './archiveStore'
import {
  getReflectionState,
  receiveMobileReflectionRecord,
  resetReflectionState,
  sendReflectionToArchive,
} from './reflectionStore'

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

  it('receives a mobile teaching reflection with source materials and archives it as pending confirmation', () => {
    const received = receiveMobileReflectionRecord({
      id: 'mobile-reflection-smart-manufacturing-lesson-5',
      teacher: '林老师',
      department: '智能制造学院',
      major: '机电一体化技术',
      course: '智能制造基础',
      class: '智能制造 2301 班',
      theme: '《智能制造基础》第 5 次课后反思',
      trigger: '教师端提交',
      submitTime: '2026-06-20 18:30',
      sourceMaterials: ['课堂分析报告', '课堂录音', '教学资料'],
      sourceRecordId: 'reflection-smart-manufacturing-lesson-5',
    })

    expect(received.source).toBe('教师端教学反思')
    expect(received.method).toBe('手机端 AI 会话 + 教师确认')
    expect(getReflectionState().records.find(item => item.id === received.id)?.sourceMaterials).toEqual([
      '课堂分析报告',
      '课堂录音',
      '教学资料',
    ])

    sendReflectionToArchive(received.id)

    const archiveRecord = getArchiveState().processingRecords.find(
      item => item.id === 'reflection-mobile-reflection-smart-manufacturing-lesson-5',
    )

    expect(archiveRecord).toMatchObject({
      name: '《智能制造基础》第 5 次课后反思',
      source: '教学反思',
      status: '待确认',
      originalFile: '智能制造基础',
    })
    expect(archiveRecord?.processingHistory.join(' ')).toContain('课堂分析报告')
  })
})
