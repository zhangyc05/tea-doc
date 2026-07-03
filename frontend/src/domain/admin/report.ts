export const reportTypes = ['分析报告', '分析大屏', '专题解读', '图表解读', '数据问答'] as const
export const reportStatuses = ['已生成', '待更新', '数据不足'] as const
export const reportDetailModes = ['report', 'dashboard', 'insufficient-data'] as const
export const reportExportStatuses = ['未导出', '导出中', '导出文件已生成'] as const
export const reportExportTaskStatuses = ['处理中', '已完成', '失败'] as const
export const reportAiThreadStatuses = ['进行中', '已完成'] as const
export const reportStatusClassMap: Record<ReportStatus, string> = {
  已生成: 'generated',
  待更新: 'pending-update',
  数据不足: 'insufficient-data',
}

export type ReportType = typeof reportTypes[number]
export type ReportStatus = typeof reportStatuses[number]
export type ReportDetailMode = typeof reportDetailModes[number]
export type ReportExportStatus = typeof reportExportStatuses[number]
export type ReportExportTaskStatus = typeof reportExportTaskStatuses[number]
export type ReportAiThreadStatus = typeof reportAiThreadStatuses[number]

export function getReportStatusClass(status: ReportStatus): string {
  return reportStatusClassMap[status]
}

export type ReportCard = {
  id: string
  title: string
  type: ReportType
  target: string
  period: string
  basis: string
  generatedTime: string
  status: ReportStatus
  buttons: string[]
  icon: string
  tone: string
  exportStatus: ReportExportStatus
  actionHistory: string[]
}

export type ReportAiSession = {
  active: boolean
  sourceReportId: string
  prompt: string
}

export type ReportExportTask = {
  id: string
  reportId: string
  reportTitle: string
  type: '报告导出'
  status: ReportExportTaskStatus
  createdAt: string
}

export type ReportAiThread = {
  id: string
  sourceReportId: string
  sourceReportTitle: string
  status: ReportAiThreadStatus
  messages: string[]
}

export type ReportState = {
  reports: ReportCard[]
  exportTasks: ReportExportTask[]
  aiThreads: ReportAiThread[]
  selectedReportId: string
  detailMode: ReportDetailMode
  aiSession: ReportAiSession
  operationMessage: string
}
