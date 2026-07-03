import { describe, expect, it } from 'vitest'
import abilityBasePageSource from '../../pages/admin/ability-list/AbilityListBasePage.vue?raw'
import abilityBaseOptimizationPageSource from '../../pages/admin/ability-list/AbilityListBaseOptimizationPage.vue?raw'
import abilityExecutionPageSource from '../../pages/admin/ability-list/AbilityListExecutionPage.vue?raw'
import abilityPublishConfirmPageSource from '../../pages/admin/ability-list/AbilityListPublishConfirmPage.vue?raw'
import abilityRequirementMappingPageSource from '../../pages/admin/ability-list/AbilityListRequirementMappingPage.vue?raw'
import archiveImportBatchPageSource from '../../pages/admin/archive/ArchiveImportBatchPage.vue?raw'
import archiveProcessingPageSource from '../../pages/admin/archive/ArchiveProcessingPage.vue?raw'
import practiceApplicationPageSource from '../../pages/admin/practice/PracticeApplicationPage.vue?raw'
import practiceRecordPageSource from '../../pages/admin/practice/PracticeRecordPage.vue?raw'
import practiceTrackingPageSource from '../../pages/admin/practice/PracticeTrackingPage.vue?raw'
import trainingApplicationPageSource from '../../pages/admin/training/TrainingApplicationPage.vue?raw'
import trainingDemandPageSource from '../../pages/admin/training/TrainingDemandPage.vue?raw'
import trainingPlanDetailPageSource from '../../pages/admin/training/TrainingPlanDetailPage.vue?raw'
import trainingPlanPageSource from '../../pages/admin/training/TrainingPlanPage.vue?raw'
import trainingRecordDetailPageSource from '../../pages/admin/training/TrainingRecordDetailPage.vue?raw'
import trainingRecordPageSource from '../../pages/admin/training/TrainingRecordPage.vue?raw'
import trainingResourcePageSource from '../../pages/admin/training/TrainingResourcePage.vue?raw'
import reportCenterPageSource from '../../pages/admin/reports/ReportCenterPage.vue?raw'
import virtualLabActivityDetailPageSource from '../../pages/admin/virtual-lab/VirtualLabActivityDetailPage.vue?raw'
import virtualLabRoomDetailPageSource from '../../pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue?raw'
import {
  getAbilityIndicatorStatusClass,
  getAbilityIndicatorStatusLabel,
  getExecutionVersionStatusClass,
  getExecutionVersionStatusLabel,
  getOptimizationSuggestionStatusClass,
  getOptimizationSuggestionStatusLabel,
  getRequirementMappingStatusClass,
  getRequirementMappingStatusLabel,
} from './ability-list'
import {
  getArchiveBatchFileStatusClass,
  getArchiveBatchStatusClass,
  getArchiveBatchStatusLabel,
  getArchiveProcessingStatusClass,
} from './archive'
import {
  getPracticeApplicationStatusClass,
  getPracticeProgressStatusClass,
  getPracticeRecordStatusClass,
  practiceApplicationStatuses,
} from './practice'
import type { PracticeApplication, PracticeRecord, PracticeTracking } from './practice'
import { getReportStatusClass, reportTypes } from './report'
import type { ReportAiSession, ReportCard } from './report'
import {
  getTrainingApplicationStatusClass,
  getTrainingDemandStatusClass,
  getTrainingMaterialStatusClass,
  getTrainingPlanStatusClass,
  getTrainingRecordMaterialStatusClass,
  getTrainingResourceStatusClass,
} from './training'
import {
  getVirtualLabActivityRecordStatusClass,
  getVirtualLabRecordArchiveStatusClass,
  virtualLabActivityRecordStatuses,
} from './virtual-lab'
import type { VirtualLabActivity, VirtualLabRecord, VirtualLabRoom } from './virtual-lab'

describe('admin domain types', () => {
  it('keeps training participant application status class mapping outside page templates', () => {
    expect(trainingPlanDetailPageSource).not.toContain(':class="participant.applicationStatus"')
  })

  it('keeps ability publish status class mapping outside page templates', () => {
    expect(abilityPublishConfirmPageSource).not.toContain(':class="publishStatus"')
  })

  it('keeps ability version history status class mapping outside page templates', () => {
    expect(abilityBasePageSource).not.toContain(':class="`version-${version.status}`"')
    expect(abilityExecutionPageSource).not.toContain(':class="`version-${version.status}`"')
  })

  it('keeps ability optimization suggestion status class mapping outside page templates', () => {
    expect(abilityBaseOptimizationPageSource).not.toContain(':class="`status-${suggestion.status}`"')
  })

  it('renders ability optimization suggestion statuses through the shared status badge', () => {
    expect(abilityBaseOptimizationPageSource).toContain('StatusBadge')
    expect(abilityBaseOptimizationPageSource).toContain('<StatusBadge')
    expect(abilityBaseOptimizationPageSource).not.toContain('class="badge-status"')
    expect(abilityBaseOptimizationPageSource).not.toContain('.badge-status.status-pending')
  })

  it('renders ability execution version statuses through the shared status badge', () => {
    for (const pageSource of [
      abilityBasePageSource,
      abilityExecutionPageSource,
      abilityPublishConfirmPageSource,
    ]) {
      expect(pageSource).toMatch(/import \{[^}]*StatusBadge[^}]*\} from '@\/components\/common'/)
      expect(pageSource).toContain('<StatusBadge')
      expect(pageSource).not.toContain('class="badge-status"')
      expect(pageSource).not.toContain('.badge-status.version-published')
      expect(pageSource).not.toContain('.badge-status.pending')
    }
  })

  it('renders ability requirement mapping statuses through the shared status badge', () => {
    expect(abilityRequirementMappingPageSource).toContain('StatusBadge')
    expect(abilityRequirementMappingPageSource).toContain('<StatusBadge')
    expect(abilityRequirementMappingPageSource).not.toContain('class="badge-status"')
    expect(abilityRequirementMappingPageSource).not.toContain('getStatusBadgeClass')
  })

  it('renders archive processing statuses through the shared status badge', () => {
    expect(archiveProcessingPageSource).toContain('import { StatusBadge }')
    expect(archiveProcessingPageSource).toContain('<StatusBadge')
    expect(archiveProcessingPageSource).not.toContain('class="badge-status"')
    expect(archiveProcessingPageSource).not.toContain('statusBadgeClass')
  })

  it('renders archive import batch statuses through the shared status badge', () => {
    expect(archiveImportBatchPageSource).toContain('import { StatusBadge }')
    expect(archiveImportBatchPageSource).toContain('<StatusBadge')
    expect(archiveImportBatchPageSource).not.toContain('class="state-pill"')
    expect(archiveImportBatchPageSource).not.toContain('class="inline-status"')
    expect(archiveImportBatchPageSource).not.toContain('class="file-status"')
    expect(archiveImportBatchPageSource).not.toContain('fileStatusClass')
  })

  it('renders training resource statuses through the shared status badge', () => {
    expect(trainingResourcePageSource).toContain('StatusBadge')
    expect(trainingResourcePageSource).toContain('<StatusBadge')
    expect(trainingResourcePageSource).not.toContain('class="status-badge"')
    expect(trainingResourcePageSource).not.toContain('resourceStatusClass')
  })

  it('renders training demand statuses through the shared status badge', () => {
    expect(trainingDemandPageSource).toContain('StatusBadge')
    expect(trainingDemandPageSource).toContain('<StatusBadge')
    expect(trainingDemandPageSource).not.toContain('class="status-badge"')
    expect(trainingDemandPageSource).not.toContain('demandStatusClass')
  })

  it('renders training application statuses through the shared status badge', () => {
    expect(trainingApplicationPageSource).toContain('StatusBadge')
    expect(trainingApplicationPageSource).toContain('<StatusBadge')
    expect(trainingApplicationPageSource).not.toContain('class="status-badge"')
    expect(trainingApplicationPageSource).not.toContain('applicationStatusClass')
  })

  it('renders training plan statuses through the shared status badge', () => {
    expect(trainingPlanPageSource).toContain('StatusBadge')
    expect(trainingPlanPageSource).toContain('<StatusBadge')
    expect(trainingPlanPageSource).not.toContain('class="status-badge"')
    expect(trainingPlanPageSource).not.toContain('planStatusClass')
  })

  it('renders training record statuses through the shared status badge', () => {
    expect(trainingRecordPageSource).toContain('StatusBadge')
    expect(trainingRecordPageSource).toContain('<StatusBadge')
    expect(trainingRecordPageSource).not.toContain('class="status-badge"')
    expect(trainingRecordPageSource).not.toContain('recordMaterialStatusClass')
  })

  it('renders training record detail statuses through the shared status badge', () => {
    expect(trainingRecordDetailPageSource).toContain('import { StatusBadge }')
    expect(trainingRecordDetailPageSource).toContain('<StatusBadge')
    expect(trainingRecordDetailPageSource).not.toContain('class="status-badge"')
    expect(trainingRecordDetailPageSource).not.toContain('class="title-status"')
    expect(trainingRecordDetailPageSource).not.toContain('recordMaterialStatusClass')
    expect(trainingRecordDetailPageSource).not.toContain('materialStatusClass')
  })

  it('renders training plan detail application statuses through the shared status badge', () => {
    expect(trainingPlanDetailPageSource).toContain('import { StatusBadge }')
    expect(trainingPlanDetailPageSource).toContain('<StatusBadge')
    expect(trainingPlanDetailPageSource).not.toContain('participantApplicationStatusClass')
    expect(trainingPlanDetailPageSource).not.toContain('class="status-text"')
  })

  it('renders practice application statuses through the shared status badge', () => {
    expect(practiceApplicationPageSource).toContain('StatusBadge')
    expect(practiceApplicationPageSource).toContain('<StatusBadge')
    expect(practiceApplicationPageSource).not.toContain('class="status-badge"')
    expect(practiceApplicationPageSource).not.toContain('applicationStatusClass')
  })

  it('renders practice tracking statuses through the shared status badge', () => {
    expect(practiceTrackingPageSource).toContain('StatusBadge')
    expect(practiceTrackingPageSource).toContain('<StatusBadge')
    expect(practiceTrackingPageSource).not.toContain('class="status-badge"')
    expect(practiceTrackingPageSource).not.toContain('progressStatusClass')
  })

  it('renders practice record statuses through the shared status badge', () => {
    expect(practiceRecordPageSource).toContain('StatusBadge')
    expect(practiceRecordPageSource).toContain('<StatusBadge')
    expect(practiceRecordPageSource).not.toContain('class="status-badge"')
    expect(practiceRecordPageSource).not.toContain('recordStatusClass')
  })

  it('renders virtual lab room activity statuses through the shared status badge', () => {
    expect(virtualLabRoomDetailPageSource).toContain('import { StatusBadge }')
    expect(virtualLabRoomDetailPageSource).toContain('<StatusBadge')
    expect(virtualLabRoomDetailPageSource).not.toContain('class="status-badge"')
    expect(virtualLabRoomDetailPageSource).not.toContain('getStatusClass')
  })

  it('renders virtual lab activity detail statuses through the shared status badge', () => {
    expect(virtualLabActivityDetailPageSource).toContain('import { StatusBadge }')
    expect(virtualLabActivityDetailPageSource).toContain('<StatusBadge')
    expect(virtualLabActivityDetailPageSource).not.toContain('class="status-badge"')
  })

  it('renders report center statuses through the shared status badge', () => {
    expect(reportCenterPageSource).toContain('StatusBadge')
    expect(reportCenterPageSource).toContain('<StatusBadge')
    expect(reportCenterPageSource).not.toContain('class="card-status"')
    expect(reportCenterPageSource).not.toContain('class="panel-status"')
    expect(reportCenterPageSource).not.toContain('getStatusClass')
  })

  it('exposes ability list execution version status mappings outside pages', () => {
    expect(getExecutionVersionStatusLabel('published')).toBe('已发布')
    expect(getExecutionVersionStatusLabel('pending')).toBe('待发布')
    expect(getExecutionVersionStatusLabel('historical')).toBe('历史版')

    expect(getExecutionVersionStatusClass('published')).toBe('badge-success')
    expect(getExecutionVersionStatusClass('pending')).toBe('badge-warning')
    expect(getExecutionVersionStatusClass('historical')).toBe('badge-neutral')
  })

  it('exposes ability list requirement mapping status mappings outside pages', () => {
    expect(getRequirementMappingStatusLabel('confirmed')).toBe('已确认')
    expect(getRequirementMappingStatusLabel('pending')).toBe('待确认')
    expect(getRequirementMappingStatusLabel('unconfigured')).toBe('未配置')

    expect(getRequirementMappingStatusClass('confirmed')).toBe('badge-success')
    expect(getRequirementMappingStatusClass('pending')).toBe('badge-warning')
    expect(getRequirementMappingStatusClass('unconfigured')).toBe('badge-info')
  })

  it('exposes ability indicator status label and class mappings outside components', () => {
    expect(getAbilityIndicatorStatusLabel('enabled')).toBe('已启用')
    expect(getAbilityIndicatorStatusLabel('disabled')).toBe('已禁用')
    expect(getAbilityIndicatorStatusLabel('draft')).toBe('草稿')

    expect(getAbilityIndicatorStatusClass('enabled')).toBe('badge-success')
    expect(getAbilityIndicatorStatusClass('disabled')).toBe('badge-error')
    expect(getAbilityIndicatorStatusClass('draft')).toBe('badge-warning')
  })

  it('exposes ability optimization suggestion status label and class mappings outside pages', () => {
    expect(getOptimizationSuggestionStatusLabel('pending')).toBe('待确认')
    expect(getOptimizationSuggestionStatusLabel('adopted')).toBe('已采纳')
    expect(getOptimizationSuggestionStatusLabel('deferred')).toBe('暂缓')
    expect(getOptimizationSuggestionStatusLabel('rejected')).toBe('已弃用')
    expect(getOptimizationSuggestionStatusLabel('applied')).toBe('已应用')

    expect(getOptimizationSuggestionStatusClass('pending')).toBe('status-pending')
    expect(getOptimizationSuggestionStatusClass('adopted')).toBe('status-adopted')
    expect(getOptimizationSuggestionStatusClass('deferred')).toBe('status-deferred')
    expect(getOptimizationSuggestionStatusClass('rejected')).toBe('status-rejected')
    expect(getOptimizationSuggestionStatusClass('applied')).toBe('status-applied')
  })

  it('exposes archive processing status class mapping outside pages', () => {
    expect(getArchiveProcessingStatusClass('待确认')).toBe('badge-warning')
    expect(getArchiveProcessingStatusClass('待检验')).toBe('badge-info')
    expect(getArchiveProcessingStatusClass('待补充')).toBe('badge-warning')
    expect(getArchiveProcessingStatusClass('异常待处理')).toBe('badge-danger')
    expect(getArchiveProcessingStatusClass('拟退中')).toBe('badge-danger')
    expect(getArchiveProcessingStatusClass('已入档')).toBe('badge-success')
  })

  it('exposes archive batch file status class mapping outside pages', () => {
    expect(getArchiveBatchFileStatusClass('已接收')).toBe('text-success')
    expect(getArchiveBatchFileStatusClass('解析中')).toBe('text-warning')
    expect(getArchiveBatchFileStatusClass('已解析')).toBe('text-success')
    expect(getArchiveBatchFileStatusClass('等待处理')).toBe('text-neutral')
    expect(getArchiveBatchFileStatusClass('已取消')).toBe('text-neutral')
  })

  it('exposes archive batch status label and class mappings outside pages', () => {
    expect(getArchiveBatchStatusLabel('recognizing')).toBe('识别中')
    expect(getArchiveBatchStatusLabel('recognized')).toBe('识别完成')
    expect(getArchiveBatchStatusLabel('confirmed')).toBe('识别完成')
    expect(getArchiveBatchStatusLabel('cancelled')).toBe('已取消')

    expect(getArchiveBatchStatusClass('recognizing')).toBe('')
    expect(getArchiveBatchStatusClass('recognized')).toBe('completed')
    expect(getArchiveBatchStatusClass('confirmed')).toBe('completed')
    expect(getArchiveBatchStatusClass('cancelled')).toBe('cancelled')
  })

  it('exposes training plan status class mappings outside pages', () => {
    expect(getTrainingPlanStatusClass('草稿')).toBe('草稿')
    expect(getTrainingPlanStatusClass('报名中')).toBe('报名中')
    expect(getTrainingPlanStatusClass('进行中')).toBe('进行中')
    expect(getTrainingPlanStatusClass('已完成')).toBe('已完成')
    expect(getTrainingPlanStatusClass('材料待完善')).toBe('材料待完善')
  })

  it('exposes training application status class mappings outside pages', () => {
    expect(getTrainingApplicationStatusClass('待处理')).toBe('待处理')
    expect(getTrainingApplicationStatusClass('已同意')).toBe('已同意')
    expect(getTrainingApplicationStatusClass('未同意')).toBe('未同意')
    expect(getTrainingApplicationStatusClass('已取消')).toBe('已取消')
  })

  it('exposes training resource status class mappings outside pages', () => {
    expect(getTrainingResourceStatusClass('可用')).toBe('可用')
    expect(getTrainingResourceStatusClass('信息待完善')).toBe('信息待完善')
    expect(getTrainingResourceStatusClass('已停用')).toBe('已停用')
  })

  it('exposes training demand status class mappings outside pages', () => {
    expect(getTrainingDemandStatusClass('待匹配')).toBe('待匹配')
    expect(getTrainingDemandStatusClass('已匹配')).toBe('已匹配')
    expect(getTrainingDemandStatusClass('暂不处理')).toBe('暂不处理')
  })

  it('exposes training record material status class mappings outside pages', () => {
    expect(getTrainingRecordMaterialStatusClass('学习中')).toBe('学习中')
    expect(getTrainingRecordMaterialStatusClass('待总结')).toBe('待总结')
    expect(getTrainingRecordMaterialStatusClass('证书待补')).toBe('证书待补')
    expect(getTrainingRecordMaterialStatusClass('记录完整')).toBe('记录完整')
  })

  it('exposes training material upload status class mappings outside pages', () => {
    expect(getTrainingMaterialStatusClass('待补充')).toBe('待补充')
    expect(getTrainingMaterialStatusClass('已上传')).toBe('已上传')
  })

  it('exposes practice application status class mappings outside pages', () => {
    expect(getPracticeApplicationStatusClass('待审核')).toBe('待审核')
    expect(getPracticeApplicationStatusClass('已同意')).toBe('已同意')
    expect(getPracticeApplicationStatusClass('退回修改')).toBe('退回修改')
    expect(getPracticeApplicationStatusClass('已撤回')).toBe('已撤回')
  })

  it('exposes practice progress status class mappings outside pages', () => {
    expect(getPracticeProgressStatusClass('未启动申请')).toBe('未启动申请')
    expect(getPracticeProgressStatusClass('待审核申请')).toBe('待审核申请')
    expect(getPracticeProgressStatusClass('实践中')).toBe('实践中')
    expect(getPracticeProgressStatusClass('已完成')).toBe('已完成')
  })

  it('exposes practice record status class mappings outside pages', () => {
    expect(getPracticeRecordStatusClass('实践中')).toBe('in-progress')
    expect(getPracticeRecordStatusClass('待提交总结')).toBe('incomplete')
    expect(getPracticeRecordStatusClass('待企业评价')).toBe('pending-evaluation')
    expect(getPracticeRecordStatusClass('待归档确认')).toBe('pending-archive')
    expect(getPracticeRecordStatusClass('已归档')).toBe('archived')
  })

  it('exposes virtual lab activity record status class mappings outside pages', () => {
    expect(getVirtualLabActivityRecordStatusClass('已形成记录')).toBe('success')
    expect(getVirtualLabActivityRecordStatusClass('未形成记录')).toBe('pending')
    expect(getVirtualLabActivityRecordStatusClass('记录异常')).toBe('error')
  })

  it('exposes virtual lab record archive status class mappings outside pages', () => {
    expect(getVirtualLabRecordArchiveStatusClass('待沉淀')).toBe('pending')
    expect(getVirtualLabRecordArchiveStatusClass('已生成待确认档案')).toBe('success')
  })

  it('exposes practice domain contracts outside the store layer', () => {
    const application = {
      id: 'app-1',
      teacher: '林老师',
      teacherNo: 'T202401015',
      department: '智能制造学院',
      annualStatus: '本年度已计入 18 天，还差 12 天',
      remainingDays: 12,
      company: '山西智能装备有限公司',
      position: '工艺改进实践',
      practicePeriod: '2026-07-01 至 2026-07-15，预计 15 天',
      estimatedDays: '15',
      status: '待审核',
      applyTime: '2026-06-20 10:35',
    } satisfies PracticeApplication

    const tracking = {
      id: 'tracking-1',
      teacher: application.teacher,
      department: application.department,
      major: '机电一体化技术',
      completionStatus: '未完成 30 天',
      currentProgress: '待审核申请',
      recentAction: '06-20 提交申请',
      requiredDays: 30,
      completedDays: 18,
      remainingDays: 12,
    } satisfies PracticeTracking

    const record = {
      id: 'record-1',
      applicationId: application.id,
      teacher: application.teacher,
      department: application.department,
      major: tracking.major,
      company: application.company,
      position: application.position,
      practicePeriod: '2026-07-01 至 2026-07-15 / 15 天',
      materialStatus: '日志待补 | 总结未提交 | 评价待上传',
      currentStatus: '实践中',
      countedDays: '暂未计入',
      recentAction: '申请同意后进入实践中',
    } satisfies PracticeRecord

    expect(record.teacher).toBe(application.teacher)
    expect(tracking.remainingDays).toBe(12)
    expect(practiceApplicationStatuses).toContain('待审核')
  })

  it('exposes virtual lab domain contracts outside the store layer', () => {
    const room = {
      id: 'room-1',
      name: '智能制造课程改革虚拟教研室',
      direction: '智能制造专业课程改革',
      affiliation: '智能制造学院 | 智能制造专业群',
      leader: '周明',
      members: 28,
      inProgressActivities: 2,
      recordsCount: 6,
      recentActivity: '智能产线课程项目化改造研讨',
      recentTime: '06-18',
      createdAt: '2025-09',
      description: '围绕课程项目化改造开展线上教研。',
    } satisfies VirtualLabRoom

    const activity = {
      id: 'activity-1',
      roomId: room.id,
      name: '智能产线课程项目化改造研讨',
      theme: '智能产线课程项目化改造',
      time: '2026-06-18 14:00 ~ 16:00',
      meetingMethod: '腾讯会议',
      meetingNo: '827 391 602',
      initiator: room.leader,
      participantsCount: 18,
      createdAt: '2026-06-12 10:30',
      description: '围绕产线课程开展研讨。',
      participation: '18 人',
      recordStatus: '已形成记录',
      recentUpdate: '06-18 16:20',
    } satisfies VirtualLabActivity

    const record = {
      id: 'record-1',
      roomId: room.id,
      sourceActivityId: activity.id,
      title: '智能产线课程项目化改造研讨记录',
      sourceActivity: activity.name,
      roomName: room.name,
      activityTime: activity.time,
      meetingMethod: activity.meetingMethod,
      formedTime: '2026-06-18 16:20',
      recordSource: '系统根据活动与会议数据生成',
      currentStatus: '已形成教研记录',
      keyDimension: '成长档案 / 教研科研',
      content: '会议纪要、任务分工、阶段成果摘要',
      dimension: '成长档案 / 教研科研',
      ownerTeacher: room.leader,
      archiveStatus: '待沉淀',
    } satisfies VirtualLabRecord

    expect(record.sourceActivityId).toBe(activity.id)
    expect(virtualLabActivityRecordStatuses).toContain('未形成记录')
  })

  it('exposes report domain contracts outside the store layer', () => {
    const report = {
      id: 'report-1',
      title: '2026 年度学校教师发展分析报告',
      type: '分析报告',
      target: '全校教师',
      basis: '正式档案事实 | 执行版能力清单',
      generatedTime: '06-24 10:20',
      status: '已生成',
      buttons: ['查看', '导出'],
      icon: '▤',
      tone: 'blue',
      exportStatus: '未导出',
      actionHistory: ['06-24 10:20 已生成'],
    } satisfies ReportCard

    const session = {
      active: true,
      sourceReportId: report.id,
      prompt: `围绕${report.title}继续分析`,
    } satisfies ReportAiSession

    expect(session.sourceReportId).toBe(report.id)
    expect(reportTypes).toContain('分析报告')
  })

  it('exposes report status class mapping outside pages', () => {
    expect(getReportStatusClass('已生成')).toBe('generated')
    expect(getReportStatusClass('待更新')).toBe('pending-update')
    expect(getReportStatusClass('数据不足')).toBe('insufficient-data')
  })
})
