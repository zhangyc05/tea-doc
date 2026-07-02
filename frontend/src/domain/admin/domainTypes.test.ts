import { describe, expect, it } from 'vitest'
import { practiceApplicationStatuses } from './practice'
import type { PracticeApplication, PracticeRecord, PracticeTracking } from './practice'
import { reportTypes } from './report'
import type { ReportAiSession, ReportCard } from './report'
import { virtualLabActivityRecordStatuses } from './virtual-lab'
import type { VirtualLabActivity, VirtualLabRecord, VirtualLabRoom } from './virtual-lab'

describe('admin domain types', () => {
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
})
