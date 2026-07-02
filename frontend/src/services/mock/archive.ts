import type {
  ArchiveProcessingMock,
  ArchiveProcessingRecord,
  ArchiveQueryMock,
  ArchiveRecordDetail,
  ArchiveSourceRecord,
  ArchiveTeacherCard,
} from '@/domain/admin/archive'

const archiveQueryMock: ArchiveQueryMock = {
  stats: {
    totalTeachers: 428,
    hasArchive: 428,
    recentUpdate: 236,
    needsImprovement: 36,
    hasCorrection: 18,
  },
  collegeOptions: ['全部学院', '智能制造学院', '电子信息学院', '财经学院', '计算机学院', '外国语学院', '艺术设计学院'],
  titleOptions: ['全部职称', '讲师', '副教授', '教授'],
  updateOptions: ['全部', '近期有更新', '内容待完善', '有更正记录'],
  teacherCards: [
    {
      id: 'lin',
      name: '林老师',
      college: '智能制造学院',
      title: '讲师',
      cycle: '2026年度发展周期',
      year: '聘期第2年',
      description: '本学期承担 3 门专业课程教学，教学评价良好，已入选至数智课程建设成果 1 项，企业实践基地 20 天。近30日补充课程建设材料 1 条，可支持岗位对照。',
      tags: ['教学工作较完整', '企业实践已入档', '近30日有更新'],
      lastUpdate: '2026-06-18',
    },
    {
      id: 'chen',
      name: '陈老师',
      college: '电子信息学院',
      title: '副教授',
      cycle: '2026年度发展周期',
      year: '聘期第3年',
      description: '科研项目阶段成果已入档 2 项，正在推进专利申报。本学期指导学生竞赛获奖 1 项，教学反思记录较完整。近30日更新科研成果材料，可用于岗位对照。',
      tags: ['教研成果较突出', '有项目记录', '近30日有更新'],
      lastUpdate: '2026-06-16',
    },
    {
      id: 'wang',
      name: '王老师',
      college: '财经学院',
      title: '讲师',
      cycle: '2026年度发展周期',
      year: '聘期第1年',
      description: '完成 2 门课程教学，学生反馈良好，积极参与教研活动，教研记录已入档。近30日补充听课评课记录，可进一步完善档案。',
      tags: ['教学稳步推进', '教研参与积极', '近30日有更新'],
      lastUpdate: '2026-06-17',
    },
    {
      id: 'liu',
      name: '刘老师',
      college: '计算机学院',
      title: '副教授',
      cycle: '2026年度发展周期',
      year: '聘期第4年',
      description: '主持省级教改项目 1 项，阶段成果已入档。课程思政建设成效良好，相关材料已归档。近30日更新项目结题材料，已用于岗位对照。',
      tags: ['教研成果较突出', '已用于岗位对照', '近30日有更新'],
      lastUpdate: '2026-06-15',
    },
    {
      id: 'zhao',
      name: '赵老师',
      college: '外国语学院',
      title: '讲师',
      cycle: '2026年度发展周期',
      year: '聘期第2年',
      description: '承担 2 门课程教学，课堂互动与评价过程记录完整。参与课程建设，建设过程证据逐步编写课程课件。档案信息较完整，建议补充企业实践经历。',
      tags: ['教学工作较完整', '课程建设进行中', '待补充完善'],
      lastUpdate: '2026-06-12',
    },
    {
      id: 'zhou',
      name: '周老师',
      college: '艺术设计学院',
      title: '讲师',
      cycle: '2026年度发展周期',
      year: '聘期第1年',
      description: '实践教学活动参与度高，相关材料已入档。作品指导记录完整，学生作品获奖 2 项。近30日补充其他成果材料，可进一步完善档案。',
      tags: ['实践教学突出', '成果转化进行中', '近30日有更新'],
      lastUpdate: '2026-06-14',
    },
  ],
}

const archiveProcessingMock: ArchiveProcessingMock = {
  sourceOptions: ['发展活动', '部门上报', '教研成果', '公开征集', '科研申报'],
}

const teacherNameMap: Record<string, string> = {
  lin: '林老师',
  jiang: '蒋老师',
  wang: '王老师',
  zhao: '赵老师',
  sun: '孙老师',
  liu: '刘老师',
}

const defaultSourceRecordsByType: Record<string, ArchiveSourceRecord[]> = {
  基本信息: [
    {
      id: '1',
      title: '教师基本信息',
      source: '人事系统',
      status: '已确认入档',
      archiveTime: '2026-06-12',
      content: '林老师基本信息已确认，包含学历、入职时间、研究方向等信息。',
      buttonText: '查看记录详情',
    },
  ],
  教学工作: [
    {
      id: '1',
      title: '2026春季学期授课记录',
      source: '教务系统',
      status: '已确认入档',
      archiveTime: '2026-06-12',
      content: '本发展周期内承担《机电系统控制技术》《电气控制与PLC应用》《工业机器人技术》3门课程教学任务。',
      buttonText: '查看记录详情',
    },
    {
      id: '2',
      title: '《机电系统控制技术》学生教学评价结果',
      source: '教学评价系统',
      status: '已确认入档',
      archiveTime: '2026-06-16',
      content: '学生教学评价整体稳定，课程反馈较好。',
      buttonText: '查看记录详情',
    },
    {
      id: '3',
      title: '课程建设成果《机电系统控制技术》阶段材料',
      source: '院系上传',
      status: '已确认入档',
      archiveTime: '2026-06-18',
      content: '课程建设已有1项确认入档。',
      buttonText: '查看记录详情',
    },
    {
      id: '4',
      title: '课堂教学照片（第5周）',
      source: '教学活动沉淀',
      status: '已确认入档',
      archiveTime: '2026-06-08',
      content: '教学过程记录完整。',
      buttonText: '查看记录详情',
    },
    {
      id: '5',
      title: '《机电系统控制技术》课程建设支撑材料',
      source: '教师补充材料',
      status: '待说明',
      archiveTime: '待确认',
      content: '该材料仍在补充中，当前不写入正文，仅作待说明提示。',
      buttonText: '查看处理情况',
    },
  ],
  教研科研: [
    {
      id: '1',
      title: '学术论文发表记录',
      source: '科研系统',
      status: '已确认入档',
      archiveTime: '2026-06-15',
      content: '发表学术论文1篇，相关成果已提交并确认入档。',
      buttonText: '查看记录详情',
    },
  ],
}

export function getArchiveQueryMock(): ArchiveQueryMock {
  return {
    stats: { ...archiveQueryMock.stats },
    collegeOptions: [...archiveQueryMock.collegeOptions],
    titleOptions: [...archiveQueryMock.titleOptions],
    updateOptions: [...archiveQueryMock.updateOptions],
    teacherCards: cloneTeacherCards(archiveQueryMock.teacherCards),
  }
}

export function getArchiveProcessingMock(): ArchiveProcessingMock {
  return {
    sourceOptions: [...archiveProcessingMock.sourceOptions],
  }
}

export function createArchiveProcessingRecordDetail(record: ArchiveProcessingRecord): ArchiveRecordDetail {
  if (record.id === '2') {
    return {
      teacher: '林老师',
      dimension: '教师培训',
      updateTime: '2026-06-18 15:40',
      courseName: '智能制造基础',
      achievementType: '精品课程建设',
      projectTime: '2024-03',
      achievementLevel: '校级别',
      uploader: record.uploader,
      uploadBatch: record.uploadBatch,
      originalFile: record.originalFile,
      issues: [...record.issues],
      processingHistory: [...record.processingHistory],
    }
  }

  return {
    teacher: record.teacher,
    dimension: record.dimension,
    updateTime: `2026-${record.updateTime}`,
    uploader: record.uploader,
    uploadBatch: record.uploadBatch,
    originalFile: record.originalFile,
    issues: [...record.issues],
    processingHistory: [...record.processingHistory],
  }
}

export function getArchiveTeacherName(teacherId: string): string {
  return teacherNameMap[teacherId] ?? '林老师'
}

export function getArchiveDefaultSourceRecords(drawerType: string): ArchiveSourceRecord[] {
  const records = defaultSourceRecordsByType[drawerType] ?? [
    {
      id: '1',
      title: '示例记录',
      source: '系统导入',
      status: '已确认入档',
      archiveTime: '2026-06-18',
      content: '示例记录内容。',
      buttonText: '查看记录详情',
    },
  ]

  return records.map(record => ({ ...record }))
}

function cloneTeacherCards(cards: ArchiveTeacherCard[]) {
  return cards.map(card => ({
    ...card,
    tags: [...card.tags],
  }))
}
