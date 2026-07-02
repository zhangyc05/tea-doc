import type { ReportCard, ReportState, ReportStatus, ReportType } from '@/domain/admin/report'

export const initialReports: ReportCard[] = [
  makeReport('1', '2026 年度学校教师发展分析报告', '分析报告', '全校教师', '正式档案事实 | 执行版能力清单', '06-24 10:20', '已生成', ['查看', '导出', '继续分析', '重新生成'], '▤', 'blue'),
  makeReport('2', '智能制造学院企业实践完成情况分析', '分析报告', '智能制造学院', '企业实践记录 | 成长档案企业实践维度', '06-23 16:40', '已生成', ['查看', '导出', '继续分析'], '▣', 'green'),
  makeReport('3', '全校教师能力结构分析大屏', '分析大屏', '全校', '能力画像 | 正式档案事实', '06-22 14:10', '已生成', ['查看大屏', '继续分析'], '▱', 'purple'),
  makeReport('4', '虚拟教研室运行情况分析', '专题解读', '虚拟教研室', '教研活动记录 | 已形成教研记录', '06-21 11:30', '待更新', ['查看', '更新'], '●', 'orange'),
  makeReport('5', '成长档案事实覆盖分析', '图表解读', '全校', '成长档案正式事实', '06-20 09:50', '数据不足', ['查看原因'], '◔', 'teal'),
  makeReport('6', '岗位 / 聘期要求对照问答', '数据问答', '教师发展管理', '岗位画像 | 聘期要求 | 正式档案事实', '06-19 15:00', '已生成', ['查看', '继续追问'], '●●', 'chat'),
]

export function createInitialReportState(): ReportState {
  return {
    reports: cloneReports(initialReports),
    selectedReportId: '',
    detailMode: 'report',
    aiSession: {
      active: false,
      sourceReportId: '',
      prompt: '',
    },
    operationMessage: '',
  }
}

export function makeReport(id: string, title: string, type: ReportType, target: string, basis: string, generatedTime: string, status: ReportStatus, buttons: string[], icon: string, tone: string): ReportCard {
  return {
    id,
    title,
    type,
    target,
    basis,
    generatedTime,
    status,
    buttons,
    icon,
    tone,
    exportStatus: '未导出',
    actionHistory: [`${generatedTime} ${status}`],
  }
}

export function cloneReports(reports: ReportCard[]) {
  return reports.map(report => ({
    ...report,
    buttons: [...report.buttons],
    actionHistory: [...report.actionHistory],
  }))
}
