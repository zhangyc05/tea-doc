import { reactive } from 'vue'
import type { ReportDetailMode } from '@/domain/admin/report'
import {
  continueReportAnalysisInState,
  exportReportInState,
  openReportAiAssistantInState,
  openReportDetailInState,
  regenerateReportInState,
} from './report/actions'
import { createInitialReportState } from './report/initialData'

export type {
  ReportAiSession,
  ReportCard,
  ReportDetailMode,
  ReportExportStatus,
  ReportState,
  ReportStatus,
  ReportType,
} from '@/domain/admin/report'

const state = reactive(createInitialReportState())

export function getReportState() {
  return state
}

export function resetReportState() {
  Object.assign(state, createInitialReportState())
}

export function openReportDetail(reportId: string, mode?: ReportDetailMode) {
  return openReportDetailInState(state, reportId, mode)
}

export function exportReport(reportId: string) {
  return exportReportInState(state, reportId)
}

export function regenerateReport(reportId: string) {
  return regenerateReportInState(state, reportId)
}

export function continueReportAnalysis(reportId: string, action = '继续分析') {
  return continueReportAnalysisInState(state, reportId, action)
}

export function openReportAiAssistant(reportIds: string[]) {
  return openReportAiAssistantInState(state, reportIds)
}
