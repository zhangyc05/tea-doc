import { describe, expect, it } from 'vitest'
import { createInitialReportState } from './report/initialData'
import { continueReportAnalysisInState, exportReportInState, regenerateReportInState } from './report/actions'

describe('report store structure', () => {
  it('creates a fresh report state independent from the singleton store', () => {
    const first = createInitialReportState()
    const second = createInitialReportState()

    first.reports[0].buttons.push('测试按钮')
    first.reports[0].actionHistory.push('刚刚 测试')

    expect(second.reports[0].buttons).not.toContain('测试按钮')
    expect(second.reports[0].actionHistory).not.toContain('刚刚 测试')
  })

  it('runs report actions against an injected state', () => {
    const state = createInitialReportState()

    exportReportInState(state, '1')
    regenerateReportInState(state, '4')

    expect(state.reports.find(item => item.id === '1')?.exportStatus).toBe('导出文件已生成')
    expect(state.reports.find(item => item.id === '4')).toMatchObject({
      status: '已生成',
      generatedTime: '刚刚',
    })
  })

  it('starts an AI analysis session against an injected state', () => {
    const state = createInitialReportState()

    continueReportAnalysisInState(state, '6', '继续追问')

    expect(state.aiSession).toMatchObject({
      active: true,
      sourceReportId: '6',
      prompt: '围绕岗位 / 聘期要求对照问答继续追问',
    })
  })
})
