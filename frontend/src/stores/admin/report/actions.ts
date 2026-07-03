import type { ReportCard, ReportDetailMode, ReportState } from '@/domain/admin/report'

export function openReportDetailInState(state: ReportState, reportId: string, mode?: ReportDetailMode) {
  const report = findReport(state, reportId)
  if (!report) return null
  state.selectedReportId = report.id
  state.detailMode = mode ?? getDefaultDetailMode(report)
  state.operationMessage = `${report.title}：已打开${state.detailMode === 'dashboard' ? '大屏' : state.detailMode === 'insufficient-data' ? '原因说明' : '报告详情'}。`
  return report
}

export function exportReportInState(state: ReportState, reportId: string) {
  const report = findReport(state, reportId)
  if (!report || report.status !== '已生成') return null
  const task = {
    id: `export-${report.id}-${state.exportTasks.length + 1}`,
    reportId: report.id,
    reportTitle: report.title,
    type: '报告导出' as const,
    status: '处理中' as const,
    createdAt: '刚刚',
  }
  state.exportTasks = [task, ...state.exportTasks]
  report.exportStatus = '导出中'
  report.actionHistory = ['刚刚 创建导出任务', ...report.actionHistory]
  state.operationMessage = `${report.title}：已创建异步导出任务。`
  return task
}

export function regenerateReportInState(state: ReportState, reportId: string) {
  const report = findReport(state, reportId)
  if (!report) return null
  report.status = '已生成'
  report.generatedTime = '刚刚'
  report.actionHistory = ['刚刚 重新生成报告', ...report.actionHistory]
  state.operationMessage = `${report.title}：已重新生成。`
  return report
}

export function continueReportAnalysisInState(state: ReportState, reportId: string, action = '继续分析') {
  const report = findReport(state, reportId)
  if (!report) return null
  const prompt = `围绕${report.title}${action}`
  const thread = {
    id: `ai-thread-${report.id}-${state.aiThreads.length + 1}`,
    sourceReportId: report.id,
    sourceReportTitle: report.title,
    status: '进行中' as const,
    messages: [prompt],
  }
  state.aiThreads = [thread, ...state.aiThreads]
  state.aiSession = {
    active: true,
    sourceReportId: report.id,
    prompt,
  }
  state.selectedReportId = report.id
  state.detailMode = 'report'
  state.operationMessage = `${report.title}：AI 助手已进入${action}。`
  return thread
}

export function openReportAiAssistantInState(state: ReportState, reportIds: string[]) {
  const prompt = `基于当前 ${reportIds.length} 条筛选结果生成分析`
  const thread = {
    id: `ai-thread-filter-${state.aiThreads.length + 1}`,
    sourceReportId: reportIds[0] ?? '',
    sourceReportTitle: '当前筛选结果',
    status: '进行中' as const,
    messages: [prompt],
  }
  state.aiThreads = [thread, ...state.aiThreads]
  state.aiSession = {
    active: true,
    sourceReportId: reportIds[0] ?? '',
    prompt,
  }
  state.operationMessage = 'AI 助理已准备基于当前筛选结果生成分析。'
  return thread
}

function findReport(state: ReportState, reportId: string) {
  return state.reports.find(item => item.id === reportId)
}

function getDefaultDetailMode(report: ReportCard): ReportDetailMode {
  if (report.type === '分析大屏') return 'dashboard'
  if (report.status === '数据不足') return 'insufficient-data'
  return 'report'
}
