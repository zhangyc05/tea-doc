import type {
  TrainingLearningRecord,
  TrainingPlanDetailMock,
  TrainingPlanPageMock,
  TrainingProgressNode,
  TrainingRecordDetailMock,
  TrainingRelatedDemand,
  TrainingRelatedRecord,
  TrainingPlanScheduleItem,
} from '@/domain/admin/training'

const planPageMock: TrainingPlanPageMock = {
  organizations: ['全校', '智能制造学院', '电子信息学院', '商贸管理学院', '汽车工程学院'],
  statuses: ['全部', '草稿', '报名中', '进行中', '已完成', '材料待完善'],
  years: ['2026 年度', '2025 年度', '2024 年度'],
  participationModes: ['全部', '自主报名', '定向推荐', '指定参加'],
  reminders: [
    '草稿待发布：2 个培训计划已创建，尚未发布。',
    '报名即将截止：3 个培训计划将在 3 天内结束报名。',
    '材料待完善：5 个培训计划已结束，仍有教师待确认总结或补充证书。',
  ],
  applicationOptions: ['需要', '不需要'],
  materialOptions: ['培训总结', '培训证书', '其他材料'],
}

const planDetailMock: TrainingPlanDetailMock = {
  applicationStartDate: '2026-06-20',
  applicationEndDate: '2026-07-05',
  location: '教师发展中心 302 实训室',
  entry: '腾讯会议链接，开课前开放',
  schedule: [
    { date: '2026-07-10', content: '开班仪式，数字化教学理念介绍' },
    { date: '2026-07-11', content: '数字化教学工具实操训练' },
    { date: '2026-07-12', content: '在线教学设计与实施' },
    { date: '2026-07-13', content: '教学数据分析与应用' },
    { date: '2026-07-14', content: '总结交流，结业考核' },
  ],
  materialRequirements: ['培训总结', '培训证书'],
  recordDestination: '成长档案 / 个人发展维度',
  relatedDemands: [
    {
      direction: '数字化教学',
      source: '能力画像观察',
      target: '24 名教师',
      note: '课堂数据应用与数字资源建设需求集中',
    },
    {
      direction: 'AI 赋能课程建设',
      source: '教师主动提出',
      target: '8 名教师',
      note: '教师主动提出相关学习需求',
    },
  ],
  progressNodes: [
    { label: '计划创建', date: '2026-06-10', active: true },
    { label: '计划发布', date: '2026-06-18', active: true },
    { label: '报名截止', date: '2026-07-05', active: true },
    { label: '培训开始', date: '2026-07-10', active: false },
    { label: '培训结束', date: '2026-07-14', active: false },
  ],
}

const recordDetailMock: TrainingRecordDetailMock = {
  learningRecords: [
    { date: '2026-05-10', content: '完成数字化教学资源建设专题学习，记录了课程资源颗粒化设计方法。', status: '已完成' },
    { date: '2026-05-12', content: '参与课堂数据分析工具实操，记录了学生学习行为数据的使用场景。', status: '已完成' },
    { date: '2026-05-14', content: '完成培训结课学习记录，补充了后续在课程建设中的应用想法。', status: '已完成' },
  ],
  trainingSummary: {
    content: '通过本次培训，我深入了解了数字化教学的理念和方法，掌握了多种数字化教学工具的使用技巧。特别是在在线教学设计和教学数据分析方面，获得了实用的经验和工具。在今后的教学工作中，我将积极应用所学知识，提升课堂教学效果和学生学习体验。',
    submitTime: '2026-05-16 18:30',
  },
  relatedRecords: [
    {
      id: 'ai-course-chen',
      name: '双师型教师实践能力提升培训',
      teacher: '林老师',
      level: '企业培训',
      hours: '40 学时',
      materialStatus: '学习中',
    },
    {
      id: 'practice-training-wang',
      name: 'AI 赋能课程建设专题培训',
      teacher: '陈老师',
      level: '校级',
      hours: '16 学时',
      materialStatus: '待总结',
    },
    {
      id: 'ideology-course-zhao',
      name: '课程思政教学设计研修',
      teacher: '赵老师',
      level: '市级',
      hours: '24 学时',
      materialStatus: '记录完整',
    },
  ],
}

export function getTrainingPlanPageMock(): TrainingPlanPageMock {
  return {
    organizations: [...planPageMock.organizations],
    statuses: [...planPageMock.statuses],
    years: [...planPageMock.years],
    participationModes: [...planPageMock.participationModes],
    reminders: [...planPageMock.reminders],
    applicationOptions: [...planPageMock.applicationOptions],
    materialOptions: [...planPageMock.materialOptions],
  }
}

export function getTrainingPlanDetailMock(): TrainingPlanDetailMock {
  return {
    applicationStartDate: planDetailMock.applicationStartDate,
    applicationEndDate: planDetailMock.applicationEndDate,
    location: planDetailMock.location,
    entry: planDetailMock.entry,
    schedule: cloneSchedule(planDetailMock.schedule),
    materialRequirements: [...planDetailMock.materialRequirements],
    recordDestination: planDetailMock.recordDestination,
    relatedDemands: cloneRelatedDemands(planDetailMock.relatedDemands),
    progressNodes: cloneProgressNodes(planDetailMock.progressNodes),
  }
}

export function getTrainingRecordDetailMock(): TrainingRecordDetailMock {
  return {
    learningRecords: cloneLearningRecords(recordDetailMock.learningRecords),
    trainingSummary: { ...recordDetailMock.trainingSummary },
    relatedRecords: cloneRelatedRecords(recordDetailMock.relatedRecords),
  }
}

function cloneSchedule(schedule: TrainingPlanScheduleItem[]) {
  return schedule.map(item => ({ ...item }))
}

function cloneRelatedDemands(demands: TrainingRelatedDemand[]) {
  return demands.map(demand => ({ ...demand }))
}

function cloneProgressNodes(nodes: TrainingProgressNode[]) {
  return nodes.map(node => ({ ...node }))
}

function cloneLearningRecords(records: TrainingLearningRecord[]) {
  return records.map(record => ({ ...record }))
}

function cloneRelatedRecords(records: TrainingRelatedRecord[]) {
  return records.map(record => ({ ...record }))
}
