export const reportTypes = ['分析报告', '分析大屏', '专题解读', '图表解读', '数据问答'] as const
export const reportStatuses = ['已生成', '待更新', '数据不足'] as const
export const reportDetailModes = ['report', 'dashboard', 'insufficient-data'] as const
export const reportExportStatuses = ['未导出', '导出文件已生成'] as const
export const reportStatusClassMap: Record<ReportStatus, string> = {
  已生成: 'generated',
  待更新: 'pending-update',
  数据不足: 'insufficient-data',
}

export type ReportType = typeof reportTypes[number]
export type ReportStatus = typeof reportStatuses[number]
export type ReportDetailMode = typeof reportDetailModes[number]
export type ReportExportStatus = typeof reportExportStatuses[number]

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

export type ReportState = {
  reports: ReportCard[]
  selectedReportId: string
  detailMode: ReportDetailMode
  aiSession: ReportAiSession
  operationMessage: string
}
