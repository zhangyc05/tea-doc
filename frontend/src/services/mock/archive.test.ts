import { describe, expect, it } from 'vitest'
import {
  createArchiveProcessingRecordDetail,
  getArchiveDefaultSourceRecords,
  getArchiveProcessingMock,
  getArchiveQueryMock,
  getArchiveTeacherName,
} from './archive'

describe('archive mock service', () => {
  it('returns fresh archive query data for page consumption', () => {
    const first = getArchiveQueryMock()
    const second = getArchiveQueryMock()

    first.teacherCards[0].tags.push('临时标签')
    first.collegeOptions[0] = '已修改'

    expect(second.teacherCards[0].tags).not.toContain('临时标签')
    expect(second.collegeOptions[0]).toBe('全部学院')
  })

  it('provides archive query stats and teacher cards', () => {
    const queryMock = getArchiveQueryMock()

    expect(queryMock.stats.totalTeachers).toBe(428)
    expect(queryMock.stats.recentUpdate).toBe(236)
    expect(queryMock.teacherCards.map(teacher => teacher.id)).toContain('lin')
    expect(queryMock.updateOptions).toContain('有更正记录')
  })

  it('provides processing page source filters and record details', () => {
    const processingMock = getArchiveProcessingMock()
    const detail = createArchiveProcessingRecordDetail({
      id: '2',
      batchId: 'batch-1',
      name: '精品课程建设立项材料',
      teacher: '林老师',
      dimension: '教师培训',
      source: '部门上报',
      status: '待补充',
      updateTime: '06-18 15:40',
      uploader: '陈老师',
      uploadBatch: '2026 年度课程建设项目 6 批',
      originalFile: '2026 年度课程建设项目 6 批名单.xlsx',
      issues: ['缺少立项文件编号'],
      processingHistory: ['2026-06-18 15:25 系统识别并生成待处理记录'],
    })

    expect(processingMock.sourceOptions).toContain('部门上报')
    expect(detail.courseName).toBe('智能制造基础')
    expect(detail.processingHistory).toHaveLength(1)
  })

  it('provides teacher names and default source records', () => {
    const records = getArchiveDefaultSourceRecords('教学工作')

    expect(getArchiveTeacherName('liu')).toBe('刘老师')
    expect(getArchiveTeacherName('unknown')).toBe('林老师')
    expect(records.map(record => record.title)).toContain('2026春季学期授课记录')
  })
})
