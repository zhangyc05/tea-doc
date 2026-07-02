import type {
  ReflectionCommonIssue,
  ReflectionDetailMock,
  ReflectionOverviewMock,
  ReflectionRecord,
  RelatedReflection,
} from '@/domain/admin/reflection'

const organizations = ['全校', '智能制造学院', '信息工程学院', '商贸管理学院', '汽车工程学院']
const semesters = ['2025-2026 第2学期', '2025-2026 第1学期', '2024-2025 第2学期']
const triggers = ['全部', '评教反馈', '成绩波动', '教学异常']

const reflections: ReflectionRecord[] = [
  { id: 'project-participation', teacher: '林老师', department: '智能制造学院', major: '机电一体化技术', course: '智能制造基础', class: '23机电1班', theme: '项目实训环节学生参与度不足', trigger: '评教反馈', submitTime: '2026-06-18 14:20' },
  { id: 'class-interaction', teacher: '王老师', department: '信息工程学院', major: '软件技术', course: 'Java程序设计', class: '23软工2班', theme: '课堂互动反馈不足', trigger: '评教反馈', submitTime: '2026-06-18 10:15' },
  { id: 'preparation-difference', teacher: '张老师', department: '商贸管理学院', major: '电子商务', course: '电子商务运营', class: '23电商1班', theme: '学生课前准备差异明显', trigger: '成绩波动', submitTime: '2026-06-17 16:45' },
  { id: 'theory-practice-link', teacher: '刘老师', department: '汽车工程学院', major: '新能源汽车技术', course: '新能源汽车构造', class: '24新能源1班', theme: '理论与实践链接不够紧密', trigger: '教学异常', submitTime: '2026-06-17 09:30' },
  { id: 'case-depth', teacher: '陈老师', department: '文化旅游学院', major: '旅游管理', course: '旅游市场营销', class: '23旅管2班', theme: '案例分析深度不足', trigger: '评教反馈', submitTime: '2026-06-16 15:20' },
  { id: 'feedback-timeliness', teacher: '赵老师', department: '建筑工程学院', major: '建筑工程技术', course: '建筑CAD', class: '23建工3班', theme: '作业反馈不够及时', trigger: '教学异常', submitTime: '2026-06-16 11:05' },
  { id: 'evaluation-standards', teacher: '孙老师', department: '艺术设计学院', major: '数字媒体技术', course: 'UI界面设计', class: '24数媒1班', theme: '项目评价标准需要清晰', trigger: '成绩波动', submitTime: '2026-06-15 17:40' },
  { id: 'practice-design', teacher: '周老师', department: '外语学院', major: '应用英语', course: '综合英语2', class: '23英语1班', theme: '课堂练习设计需要优化', trigger: '评教反馈', submitTime: '2026-06-15 14:10' },
]

const commonIssues: ReflectionCommonIssue[] = [
  { rank: 1, issue: '课堂互动反馈不足', count: 68 },
  { rank: 2, issue: '项目任务分层不够清晰', count: 53 },
  { rank: 3, issue: '课前准备差异明显', count: 47 },
]

const relatedReflections: RelatedReflection[] = [
  { id: 'class-interaction', theme: '课堂互动反馈不足', course: '智能制造基础 / 23机电1班', class: '23机电1班', trigger: '评教反馈', submitTime: '2026-06-12 10:15' },
  { id: 'task-clarity', theme: '项目任务分层不够清晰', course: '智能制造基础 / 23机电1班', class: '23机电1班', trigger: '教师主动记录', submitTime: '2026-06-10 16:30' },
  { id: 'progress-difference', theme: '实训任务进度差异明显', course: '智能制造基础 / 23机电1班', class: '23机电1班', trigger: '课堂过程记录', submitTime: '2026-06-08 09:40' },
]

export function getReflectionOverviewMock(): ReflectionOverviewMock {
  return {
    organizations: [...organizations],
    semesters: [...semesters],
    triggers: [...triggers],
    reflections: reflections.map(item => ({ ...item })),
    commonIssues: commonIssues.map(item => ({ ...item })),
    stats: {
      reflectionCount: 326,
      teacherCount: 214,
      teacherPercentage: 68,
      courseCount: 87,
      mainTrigger: '评教反馈',
      triggerPercentage: 42,
    },
  }
}

export function getReflectionDetailMock(reflectionId: string): ReflectionDetailMock {
  const record = reflections.find(item => item.id === reflectionId) ?? reflections[0]
  return {
    reflectionDetail: {
      ...record,
      source: '教师端教学反思',
      method: 'AI 草稿 + 教师确认',
      destination: '成长档案 / 教学工作维度',
    },
    reflectionContent: {
      background: '本次反思关联《智能制造基础》项目实训环节，授课对象为 23 机电 1 班。课程进入综合项目阶段后，学生需要完成设备选型、流程拆解和小组协作任务。',
      observation: '学生评教反馈中，多名学生提到项目任务说明不够清晰，课堂问答参与度偏低。课堂过程记录显示，部分小组在任务拆分阶段用时较长。',
      analysis: '主要问题不是学生不参与，而是项目任务层级和评价标准呈现不够清楚，导致基础较弱学生难以快速判断自己应承担的任务。',
      suggestion: '后续可在项目开始前增加任务分层说明，将项目拆分为基础任务、提升任务和拓展任务，并在课堂中增加阶段性检查点，帮助学生及时校准进度。',
    },
    sourceData: {
      trigger: record.trigger,
      relatedData: ['学生评教反馈', '课堂过程记录', '教师补充说明'],
    },
    relatedReflections: relatedReflections.map(item => ({ ...item })),
  }
}
