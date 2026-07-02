import { beforeEach, describe, expect, it } from 'vitest'
import {
  continueReportAnalysis,
  exportReport,
  getReportState,
  openReportDetail,
  regenerateReport,
  resetReportState,
} from './reportStore'

describe('report center business state', () => {
  beforeEach(() => {
    resetReportState()
  })

  it('opens a report detail panel without changing report generation state', () => {
    openReportDetail('1')

    const state = getReportState()
    const report = state.reports.find(item => item.id === '1')

    expect(state.selectedReportId).toBe('1')
    expect(state.detailMode).toBe('report')
    expect(report?.status).toBe('已生成')
  })

  it('exports a generated report and records the export state', () => {
    exportReport('1')

    const report = getReportState().reports.find(item => item.id === '1')

    expect(report?.exportStatus).toBe('导出文件已生成')
    expect(report?.actionHistory).toContain('刚刚 生成导出文件')
  })

  it('regenerates stale reports and keeps an action history', () => {
    regenerateReport('4')

    const report = getReportState().reports.find(item => item.id === '4')

    expect(report).toMatchObject({
      status: '已生成',
      generatedTime: '刚刚',
    })
    expect(report?.actionHistory).toContain('刚刚 重新生成报告')
  })

  it('starts an AI analysis session from a report', () => {
    continueReportAnalysis('6', '继续追问')

    const state = getReportState()

    expect(state.aiSession).toMatchObject({
      active: true,
      sourceReportId: '6',
      prompt: '围绕岗位 / 聘期要求对照问答继续追问',
    })
  })
})
