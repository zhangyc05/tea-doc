import type {
  VirtualLabActivityDetailMock,
  VirtualLabActivityParticipant,
  VirtualLabActivityTimelineItem,
  VirtualLabParticipationRecord,
  VirtualLabRecordDetailMock,
} from '@/domain/admin/virtual-lab'

const activityDetailMock: VirtualLabActivityDetailMock = {
  participants: [
    {
      id: '1',
      name: '周明',
      avatar: '周',
      role: '负责人',
      participationType: '腾讯会议参会',
      timeRange: '14:00 ~ 16:00',
      status: '已关联',
    },
    {
      id: '2',
      name: '林老师',
      avatar: '林',
      role: '成员',
      participationType: '腾讯会议参会',
      timeRange: '14:05 ~ 15:58',
      status: '已关联',
    },
    {
      id: '3',
      name: '王老师',
      avatar: '王',
      role: '成员',
      participationType: '任务分工',
      timeRange: '全程参与',
      status: '已关联',
    },
    {
      id: '4',
      name: '李老师',
      avatar: '李',
      role: '成员',
      participationType: '腾讯会议参会',
      timeRange: '14:02 ~ 15:50',
      status: '已关联',
    },
  ],
  timeline: [
    {
      id: '1',
      event: '活动创建',
      operator: '周明',
      time: '06-12 10:30',
    },
    {
      id: '2',
      event: '会议开始',
      operator: '腾讯会议',
      time: '06-18 14:00',
    },
    {
      id: '3',
      event: '会议结束',
      operator: '腾讯会议',
      time: '06-18 16:00',
    },
    {
      id: '4',
      event: '系统生成会议纪要',
      operator: '系统',
      time: '06-18 16:20',
    },
    {
      id: '5',
      event: '教研记录形成',
      operator: '系统',
      time: '06-18 16:20',
    },
  ],
}

const recordDetailMock: VirtualLabRecordDetailMock = {
  recordContent: {
    summary: '本次研讨围绕智能产线课程项目化改造展开，重点讨论课程任务书结构、项目案例组织、课堂实施路径和成果共建方式。',
    mainTopics: [
      '调整课程项目任务结构，突出真实生产场景。',
      '将智能产线调试任务拆分为 3 个教学项目。',
      '补充企业案例和设备操作视频资源。',
    ],
    taskAssignment: [
      '周明：统筹课程项目化改造方案。',
      '林老师：整理智能产线项目任务书。',
      '王老师：补充企业案例与实训资源。',
      '李老师：完善课堂实施流程。',
    ],
    stageResults: [
      '已形成《智能产线课程项目化改造方案初稿》',
      '已形成课程任务书调整清单',
    ],
  },
  participationRecords: [
    {
      id: '1',
      teacher: '周明',
      avatar: '周',
      participationType: '腾讯会议参会 + 任务分工',
      contribution: '统筹课程项目化改造方案',
      relatedMaterials: '参会记录 / 任务分工表',
    },
    {
      id: '2',
      teacher: '林老师',
      avatar: '林',
      participationType: '腾讯会议参会 + 任务分工',
      contribution: '整理智能产线项目任务书',
      relatedMaterials: '参会记录 / 任务分工表',
    },
    {
      id: '3',
      teacher: '王老师',
      avatar: '王',
      participationType: '任务分工 + 上传资料',
      contribution: '补充企业案例与实训资源',
      relatedMaterials: '任务分工表 / 阶段成果材料',
    },
    {
      id: '4',
      teacher: '李老师',
      avatar: '李',
      participationType: '腾讯会议参会',
      contribution: '参与研讨讨论',
      relatedMaterials: '参会记录',
    },
    {
      id: '5',
      teacher: '刘老师',
      avatar: '刘',
      participationType: '腾讯会议参会 + 提出建议',
      contribution: '提出课堂实施路径建议',
      relatedMaterials: '参会记录 / 会议纪要',
    },
  ],
}

export function getVirtualLabActivityDetailMock(): VirtualLabActivityDetailMock {
  return {
    participants: cloneParticipants(activityDetailMock.participants),
    timeline: cloneTimeline(activityDetailMock.timeline),
  }
}

export function getVirtualLabRecordDetailMock(): VirtualLabRecordDetailMock {
  return {
    recordContent: {
      summary: recordDetailMock.recordContent.summary,
      mainTopics: [...recordDetailMock.recordContent.mainTopics],
      taskAssignment: [...recordDetailMock.recordContent.taskAssignment],
      stageResults: [...recordDetailMock.recordContent.stageResults],
    },
    participationRecords: cloneParticipationRecords(recordDetailMock.participationRecords),
  }
}

function cloneParticipants(participants: VirtualLabActivityParticipant[]) {
  return participants.map(participant => ({ ...participant }))
}

function cloneTimeline(timeline: VirtualLabActivityTimelineItem[]) {
  return timeline.map(item => ({ ...item }))
}

function cloneParticipationRecords(records: VirtualLabParticipationRecord[]) {
  return records.map(record => ({ ...record }))
}
