export type ArchiveCategoryKey =
  | 'all'
  | 'basic-info'
  | 'teaching'
  | 'research'
  | 'enterprise-practice'
  | 'social-service'
  | 'honor'
  | 'personal-development'
  | 'assessment'

export type ConcreteArchiveCategoryKey = Exclude<ArchiveCategoryKey, 'all'>

export type MobileArchiveRecordStatus = 'archived' | 'pending-verify' | 'need-supplement' | 'removed'

export type MobileArchiveRecord = {
  id: string
  title: string
  category: ConcreteArchiveCategoryKey
  categoryName: string
  type: string
  date: string
  updatedAt: string
  source: string
  owner: string
  status: MobileArchiveRecordStatus
  summary: string
  fields: Array<{ label: string; value: string }>
  materials: Array<{ name: string; meta: string }>
  usages: string[]
  sourceSteps: Array<{ title: string; desc: string; time: string }>
  adminStoreRefs?: string[]
}

export type ArchiveCategorySummary = {
  key: ArchiveCategoryKey
  title: string
  subtitle: string
  count: string
  updated: string
  coverage: string
  focus: string[]
}

export type ArchiveCorrectionStatus = 'pending-verify' | 'approved' | 'rejected' | 'need-supplement' | 'supplemented'

export type ArchiveCorrectionRecord = {
  id: string
  recordId: string
  reason: string
  description: string
  status: ArchiveCorrectionStatus
  submittedAt: string
  materials: Array<{ name: string; meta: string }>
  adminStoreRefs: string[]
}

const archivedTrainingSteps = [
  { title: '系统识别', desc: '部门导入培训名单后，系统按姓名、工号和学院匹配到当前账号。', time: '06.14 09:12' },
  { title: '教师确认', desc: '教师在待办中确认记录属于本人。', time: '06.14 09:21' },
  { title: '写入档案', desc: '记录进入成长档案个人发展维度。', time: '06.14 09:22' },
]

const pendingVerifySteps = [
  { title: '材料提交', desc: '教师已提交总结、证明或贡献材料。', time: '已完成' },
  { title: '归档确认', desc: '等待部门或系统确认材料是否可作为正式档案事实。', time: '进行中' },
  { title: '写入档案', desc: '确认通过后进入对应成长档案维度。', time: '待完成' },
]

export const archiveCategorySummaries: Record<ArchiveCategoryKey, ArchiveCategorySummary> = {
  all: {
    key: 'all',
    title: '全部档案',
    subtitle: '查看所有已入档和待确认的成长记录',
    count: '42',
    updated: '06.14',
    coverage: '8 个分类',
    focus: ['近期新增记录', '跨分类引用', '待确认材料'],
  },
  'basic-info': {
    key: 'basic-info',
    title: '基本信息',
    subtitle: '身份、任职、岗位和基础履历信息',
    count: '5',
    updated: '06.14',
    coverage: '信息完整度 92%',
    focus: ['任职信息', '教育经历', '工作经历'],
  },
  teaching: {
    key: 'teaching',
    title: '教学工作',
    subtitle: '课程、评价、反思和教学成果过程记录',
    count: '18',
    updated: '06.14',
    coverage: '本学期 6 条新增',
    focus: ['课程教学', '教学评价', '教学反思'],
  },
  research: {
    key: 'research',
    title: '教研科研',
    subtitle: '教研活动、课题研究和团队协作贡献',
    count: '9',
    updated: '06.12',
    coverage: '3 条来自虚拟教研',
    focus: ['虚拟教研', '课题材料', '贡献确认'],
  },
  'enterprise-practice': {
    key: 'enterprise-practice',
    title: '企业实践',
    subtitle: '企业实践计划、过程、总结和证明材料',
    count: '3',
    updated: '06.10',
    coverage: '年度累计 18 天',
    focus: ['实践总结', '企业证明', '年度跟踪'],
  },
  'social-service': {
    key: 'social-service',
    title: '社会服务',
    subtitle: '培训服务、技术支持和社会贡献记录',
    count: '2',
    updated: '06.08',
    coverage: '2 个服务项目',
    focus: ['社会培训', '技术服务', '项目反馈'],
  },
  honor: {
    key: 'honor',
    title: '成果荣誉',
    subtitle: '竞赛获奖、成果认定和荣誉称号',
    count: '6',
    updated: '06.08',
    coverage: '2 条校级以上成果',
    focus: ['教学成果奖', '竞赛指导', '荣誉称号'],
  },
  'personal-development': {
    key: 'personal-development',
    title: '个人发展',
    subtitle: '培训进修、证书、发展计划和能力提升记录',
    count: '7',
    updated: '06.11',
    coverage: '累计 86 学时',
    focus: ['培训证书', '研修记录', '发展计划'],
  },
  assessment: {
    key: 'assessment',
    title: '考核评价',
    subtitle: '年度考核、聘期评价和岗位要求对照',
    count: '2',
    updated: '06.05',
    coverage: '当前聘期第 2 年',
    focus: ['年度考核', '聘期证据', '岗位要求'],
  },
}

export const archiveRecords: MobileArchiveRecord[] = [
  {
    id: 'certificate-digital-literacy',
    title: '职业院校教师数字素养提升培训证书',
    category: 'personal-development',
    categoryName: '个人发展',
    type: '培训进修',
    date: '06.14',
    updatedAt: '2026.06.14',
    source: '待办确认',
    owner: '林老师 ｜ 智能制造学院',
    status: 'pending-verify',
    summary: '系统识别培训证书后由教师确认，当前等待管理端入档确认。确认通过后才会沉淀到个人发展维度。',
    fields: [
      { label: '培训项目', value: '教师数字素养提升专项培训' },
      { label: '发证单位', value: '全国职业院校教师培训中心' },
      { label: '获得时间', value: '2026.06.10' },
      { label: '培训学时', value: '32 学时' },
      { label: '证书编号', value: 'PX20260610027' },
    ],
    materials: [{ name: '培训证书.jpg', meta: 'JPG · 1.2MB · 来源于待办确认' }],
    usages: [
      '能力画像：待管理端确认后支撑数字素养相关能力证据',
      '个人发展报告：待管理端确认后计入培训进修记录',
      '岗位/聘期对照：待管理端确认后作为继续教育学时依据',
    ],
    sourceSteps: pendingVerifySteps,
    adminStoreRefs: ['archiveStore.processingRecords', 'teacherArchiveFacts'],
  },
  {
    id: 'virtual-research-smart-manufacturing',
    title: '智能制造专业群虚拟教研活动记录',
    category: 'research',
    categoryName: '教研科研',
    type: '教研活动',
    date: '06.12',
    updatedAt: '2026.06.12',
    source: '虚拟教研归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'pending-verify',
    summary: '教研活动记录已提交，正在等待部门或系统确认。确认通过后，这条记录将沉淀到教研科研维度。',
    fields: [
      { label: '教研主题', value: '智能制造专业群课程资源共建' },
      { label: '活动形式', value: '虚拟教研室线上研讨' },
      { label: '参与角色', value: '主讲教师' },
      { label: '贡献材料', value: '课程案例、研讨纪要' },
    ],
    materials: [{ name: '虚拟教研活动记录.pdf', meta: 'PDF · 860KB · 来源于虚拟教研归档' }],
    usages: ['能力画像：支撑教研协作证据', '个人发展报告：计入教研活动记录'],
    sourceSteps: pendingVerifySteps,
  },
  {
    id: 'training-digital-teaching-archive',
    title: '数字化教学能力提升培训归档',
    category: 'personal-development',
    categoryName: '个人发展',
    type: '培训进修',
    date: '05.21',
    updatedAt: '2026.05.21',
    source: '培训归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'pending-verify',
    summary: '数字化教学能力提升培训材料已提交，正在等待归档确认。确认通过后将沉淀到个人发展维度。',
    fields: [
      { label: '培训项目', value: '数字化教学能力提升' },
      { label: '培训形式', value: '线上课程' },
      { label: '培训学时', value: '12 学时' },
      { label: '材料情况', value: '学习记录、培训总结、补充材料' },
    ],
    materials: [{ name: '数字化教学能力提升培训总结.pdf', meta: 'PDF · 680KB · 来源于培训归档' }],
    usages: ['个人发展报告：计入培训进修记录', '能力画像：支撑数字化教学能力证据'],
    sourceSteps: pendingVerifySteps,
  },
  {
    id: 'enterprise-practice-stage-summary',
    title: '企业实践阶段总结',
    category: 'enterprise-practice',
    categoryName: '企业实践',
    type: '行业实践',
    date: '06.10',
    updatedAt: '2026.06.10',
    source: '企业实践归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'archived',
    summary: '企业实践阶段总结已进入企业实践维度，支撑年度实践天数、岗位能力和产业经历证明。',
    fields: [
      { label: '实践企业', value: '苏州智造装备有限公司' },
      { label: '实践周期', value: '2026.05.20 - 2026.06.08' },
      { label: '累计天数', value: '18 天' },
      { label: '实践任务', value: '智能产线岗位能力调研' },
    ],
    materials: [{ name: '企业实践阶段总结.docx', meta: 'DOCX · 420KB · 来源于企业实践归档' }],
    usages: ['岗位/聘期对照：支撑企业实践要求', '个人发展报告：计入行业实践经历'],
    sourceSteps: [
      { title: '实践提交', desc: '教师提交阶段总结和企业证明材料。', time: '06.10 10:18' },
      { title: '部门确认', desc: '二级学院确认实践经历和天数。', time: '06.10 14:30' },
      { title: '写入档案', desc: '记录进入成长档案企业实践维度。', time: '06.10 14:36' },
    ],
  },
  {
    id: 'enterprise-practice-shandong-software',
    title: '山东某软件科技有限公司企业实践',
    category: 'enterprise-practice',
    categoryName: '企业实践',
    type: '行业实践',
    date: '06.09',
    updatedAt: '2026.06.09',
    source: '企业实践归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'archived',
    summary: '企业实践证明材料已通过核验，正式进入成长档案企业实践维度。',
    fields: [
      { label: '实践单位', value: '山东某软件科技有限公司' },
      { label: '实践岗位', value: '软件开发工程师' },
      { label: '实践时间', value: '2023.07 - 2023.12' },
      { label: '实践天数', value: '180 天' },
    ],
    materials: [{ name: '企业实践证明.pdf', meta: 'PDF · 1.8MB · 来源于企业实践归档' }],
    usages: ['岗位/聘期对照：支撑企业实践要求', '个人发展报告：计入行业实践经历'],
    sourceSteps: [
      { title: '材料补充', desc: '教师补充企业实践证明和岗位说明。', time: '06.09 09:18' },
      { title: '核验通过', desc: '部门确认实践单位、岗位和天数。', time: '06.09 15:20' },
      { title: '写入档案', desc: '记录进入成长档案企业实践维度。', time: '06.09 15:24' },
    ],
  },
  {
    id: 'virtual-research-course-case-meeting',
    title: '课程案例共创碰头会教研活动记录',
    category: 'research',
    categoryName: '教研科研',
    type: '教研活动',
    date: '06.03',
    updatedAt: '2026.06.03',
    source: '虚拟教研归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'archived',
    summary: '课程案例共创碰头会已完成归档，个人贡献和阶段材料已形成教研科研维度记录。',
    fields: [
      { label: '活动名称', value: '课程案例共创碰头会' },
      { label: '所属教研室', value: '智能制造课程虚拟教研室' },
      { label: '活动时间', value: '2026.06.03 14:00-15:30' },
      { label: '个人贡献', value: '企业设备调试案例素材、教学建议补充' },
    ],
    materials: [{ name: '课程案例共创碰头会会议纪要.pdf', meta: 'PDF · 2.6MB · 来源于虚拟教研归档' }],
    usages: ['能力画像：支撑教研协作证据', '个人发展报告：计入教研活动记录'],
    sourceSteps: [
      { title: '活动结束', desc: '教研活动完成，会议纪要和阶段材料已生成。', time: '06.03 15:30' },
      { title: '贡献确认', desc: '教师确认个人贡献条目。', time: '06.03 16:20' },
      { title: '写入档案', desc: '记录进入成长档案教研科研维度。', time: '06.03 16:28' },
    ],
  },
  {
    id: 'virtual-research-course-resource-coconstruction',
    title: '智能制造课程资源共建研讨教研活动记录',
    category: 'research',
    categoryName: '教研科研',
    type: '教研活动',
    date: '05.22',
    updatedAt: '2026.05.22',
    source: '虚拟教研归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'archived',
    summary: '智能制造课程资源共建研讨已归档，会议来源、任务分工和个人贡献已形成教研活动记录。',
    fields: [
      { label: '活动名称', value: '智能制造课程资源共建研讨' },
      { label: '会议来源', value: '腾讯会议' },
      { label: '活动时间', value: '2026.05.22 14:00-16:30' },
      { label: '归档材料', value: '会议纪要、任务分工、阶段材料、个人贡献' },
    ],
    materials: [{ name: '智能制造课程资源共建研讨记录.pdf', meta: 'PDF · 2.1MB · 来源于虚拟教研归档' }],
    usages: ['能力画像：支撑课程资源建设证据', '个人发展报告：计入教研科研记录'],
    sourceSteps: [
      { title: '活动归档', desc: '系统整理会议纪要、任务分工和阶段材料。', time: '05.22 16:45' },
      { title: '贡献确认', desc: '教师确认设备调试案例整理和发言补充贡献。', time: '05.22 17:02' },
      { title: '写入档案', desc: '记录进入成长档案教研科研维度。', time: '05.22 17:08' },
    ],
  },
  {
    id: 'honor-teaching-achievement-2026',
    title: '2026 年校级教学成果奖',
    category: 'honor',
    categoryName: '成果荣誉',
    type: '成果荣誉',
    date: '06.08',
    updatedAt: '2026.06.08',
    source: '部门导入',
    owner: '林老师 ｜ 智能制造学院',
    status: 'archived',
    summary: '校级教学成果奖已入档，可作为教学成果、岗位聘期和个人发展报告的正式证据。',
    fields: [
      { label: '成果名称', value: '产教融合课程体系建设成果' },
      { label: '奖励级别', value: '校级一等奖' },
      { label: '获奖时间', value: '2026.06.08' },
      { label: '本人角色', value: '主要完成人' },
    ],
    materials: [{ name: '教学成果奖证明.pdf', meta: 'PDF · 1.4MB · 来源于部门导入' }],
    usages: ['能力画像：支撑教学创新能力', '岗位/聘期对照：支撑成果要求'],
    sourceSteps: [
      { title: '部门导入', desc: '教务处导入本年度教学成果获奖名单。', time: '06.08 11:00' },
      { title: '系统匹配', desc: '系统按姓名、工号和成果成员匹配到当前教师。', time: '06.08 11:03' },
      { title: '写入档案', desc: '记录进入成长档案成果荣誉维度。', time: '06.08 11:05' },
    ],
  },
]

export const archiveCorrections: ArchiveCorrectionRecord[] = []

export function getArchiveCategorySummary(category: ArchiveCategoryKey): ArchiveCategorySummary {
  const summary = archiveCategorySummaries[category] || archiveCategorySummaries['personal-development']
  const records = getArchiveRecordsByCategory(category)
  const archivedCount = records.filter((record) => record.status === 'archived').length
  return {
    ...summary,
    count: String(archivedCount),
    focus: summary.focus,
  }
}

export function getArchiveRecordsByCategory(category: ArchiveCategoryKey): MobileArchiveRecord[] {
  return category === 'all' ? archiveRecords : archiveRecords.filter((record) => record.category === category)
}

export function getRecentArchiveRecords(limit = 3): MobileArchiveRecord[] {
  return archiveRecords.filter((record) => record.status === 'archived').slice(0, limit)
}

export function getPendingArchiveRecords(): MobileArchiveRecord[] {
  return archiveRecords.filter((record) => record.status === 'pending-verify' || record.status === 'need-supplement')
}

export function getArchiveOverviewStats() {
  const archivedCount = archiveRecords.filter((record) => record.status === 'archived').length
  const pendingCount = getPendingArchiveRecords().length
  return {
    archivedCount,
    pendingCount,
    categoryCount: archiveCategorySummaries.all.focus.length + 5,
  }
}

export function searchArchiveRecords(queryText = '', categoryName = '全部'): MobileArchiveRecord[] {
  const keyword = queryText.trim()
  return archiveRecords.filter((record) => {
    const matchesCategory = categoryName === '全部' || record.categoryName === categoryName
    const matchesKeyword = keyword.length === 0
      || record.title.includes(keyword)
      || record.summary.includes(keyword)
      || record.type.includes(keyword)
      || record.source.includes(keyword)
      || record.fields.some((field) => field.value.includes(keyword) || field.label.includes(keyword))
    return matchesCategory && matchesKeyword
  })
}

export function submitArchiveCorrection(recordId: string, reason: string, description = ''): ArchiveCorrectionRecord {
  const existing = archiveCorrections.find((correction) => correction.recordId === recordId && correction.status === 'pending-verify')
  if (existing) return existing
  const correction: ArchiveCorrectionRecord = {
    id: `archive-correction-${recordId}`,
    recordId,
    reason,
    description,
    status: 'pending-verify',
    submittedAt: '刚刚',
    materials: [],
    adminStoreRefs: ['archiveStore.processingRecords', 'teacherArchiveFacts'],
  }
  archiveCorrections.unshift(correction)
  return correction
}

export function findArchiveCorrectionById(correctionId?: string): ArchiveCorrectionRecord | undefined {
  return correctionId ? archiveCorrections.find((correction) => correction.id === correctionId) : archiveCorrections[0]
}

export function updateArchiveCorrectionStatus(correctionId: string, status: ArchiveCorrectionStatus) {
  const correction = findArchiveCorrectionById(correctionId)
  if (!correction) return undefined
  correction.status = status
  const record = findArchiveRecordById(correction.recordId)
  if (record && status === 'need-supplement') record.status = 'need-supplement'
  if (record && status === 'approved') record.status = 'archived'
  return correction
}

export function submitArchiveCorrectionSupplement(correctionId: string) {
  const correction = findArchiveCorrectionById(correctionId)
  if (!correction) return undefined
  correction.status = 'supplemented'
  correction.materials = [
    ...correction.materials,
    { name: '更正补充说明.pdf', meta: 'PDF · 来源于更正补充材料' },
  ]
  const record = findArchiveRecordById(correction.recordId)
  if (record) record.status = 'pending-verify'
  return correction
}

export function createArchiveSupplementRecord(): MobileArchiveRecord {
  const existingRecord = findArchiveRecordById('ai-archive-supplement')
  if (existingRecord) return existingRecord

  const record: MobileArchiveRecord = {
    id: 'ai-archive-supplement',
    title: 'AI 助手补充档案材料',
    category: 'personal-development',
    categoryName: '个人发展',
    type: '材料补充',
    date: '刚刚',
    updatedAt: '刚刚',
    source: 'AI 助手补充',
    owner: '林老师 ｜ 智能制造学院',
    status: 'pending-verify',
    summary: '教师通过 AI 助手补充材料说明，当前正在等待部门或系统核验。核验通过后才会进入正式成长档案。',
    fields: [
      { label: '补充来源', value: '教师本人补充' },
      { label: '关联分类', value: '个人发展 / 企业实践' },
      { label: '当前状态', value: '待核验' },
    ],
    materials: [{ name: 'AI 助手补充说明.txt', meta: '文本说明 · 来源于 AI 助手补充' }],
    usages: ['成长档案：核验通过后补充对应档案事实', '待办提醒：可继续查看核验进度'],
    sourceSteps: [
      { title: '教师补充', desc: '教师通过 AI 助手提交材料说明。', time: '刚刚' },
      { title: '等待核验', desc: '部门或系统确认材料是否可作为正式档案事实。', time: '进行中' },
      { title: '写入档案', desc: '核验通过后进入对应成长档案维度。', time: '待完成' },
    ],
    adminStoreRefs: ['archiveStore.processingRecords', 'teacherArchiveFacts'],
  }

  archiveRecords.unshift(record)
  return record
}

export function createTrainingArchiveRecord(): MobileArchiveRecord {
  const existingRecord = findArchiveRecordById('training-digital-teaching-archive')
  if (existingRecord) return existingRecord

  const record: MobileArchiveRecord = {
    id: 'training-digital-teaching-archive',
    title: '数字化教学能力提升培训归档',
    category: 'personal-development',
    categoryName: '个人发展',
    type: '培训进修',
    date: '刚刚',
    updatedAt: '刚刚',
    source: '培训归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'pending-verify',
    summary: '数字化教学能力提升培训材料已提交，正在等待归档确认。确认通过后将沉淀到个人发展维度。',
    fields: [
      { label: '培训项目', value: '数字化教学能力提升' },
      { label: '培训形式', value: '线上课程' },
      { label: '培训学时', value: '12 学时' },
      { label: '材料情况', value: '学习记录、培训总结、补充材料' },
    ],
    materials: [{ name: '数字化教学能力提升培训总结.pdf', meta: 'PDF · 680KB · 来源于培训归档' }],
    usages: ['个人发展报告：计入培训进修记录', '能力画像：支撑数字化教学能力证据'],
    sourceSteps: pendingVerifySteps,
    adminStoreRefs: ['archiveStore.processingRecords'],
  }

  archiveRecords.unshift(record)
  return record
}

export function createEnterprisePracticeArchiveRecord(): MobileArchiveRecord {
  const existingRecord = findArchiveRecordById('enterprise-practice-smart-equipment-archive')
  if (existingRecord) return existingRecord

  const record: MobileArchiveRecord = {
    id: 'enterprise-practice-smart-equipment-archive',
    title: '山东某智能装备有限公司企业实践归档',
    category: 'enterprise-practice',
    categoryName: '企业实践',
    type: '行业实践',
    date: '刚刚',
    updatedAt: '刚刚',
    source: '企业实践归档',
    owner: '林老师 ｜ 智能制造学院',
    status: 'pending-verify',
    summary: '企业实践总结、日志和附件材料已提交，正在等待学院核验。核验通过后将进入成长档案企业实践维度。',
    fields: [
      { label: '实践名称', value: '山东某智能装备有限公司企业实践' },
      { label: '实践岗位', value: '软件开发工程师' },
      { label: '实践时间', value: '2026-05-10 至 2026-05-20' },
      { label: '实践日志', value: '9 条' },
    ],
    materials: [
      { name: '企业实践总结.pdf', meta: 'PDF · 来源于企业实践归档' },
      { name: '企业实践证明.pdf', meta: 'PDF · 2.4MB · 来源于企业实践归档' },
    ],
    usages: ['岗位/聘期对照：待核验后支撑企业实践要求', '个人发展报告：待核验后计入行业实践经历'],
    sourceSteps: [
      { title: '提交归档', desc: '教师提交实践总结、日志和证明材料。', time: '刚刚' },
      { title: '学院核验', desc: '等待学院确认实践经历、岗位、时间和材料真实性。', time: '进行中' },
      { title: '写入档案', desc: '核验通过后进入成长档案企业实践维度。', time: '待完成' },
    ],
    adminStoreRefs: ['archiveStore.processingRecords'],
  }

  archiveRecords.unshift(record)
  return record
}

export function createTeachingReflectionArchiveRecord(): MobileArchiveRecord {
  const existingRecord = findArchiveRecordById('teaching-reflection-smart-manufacturing-lesson-5')
  if (existingRecord) return existingRecord

  const record: MobileArchiveRecord = {
    id: 'teaching-reflection-smart-manufacturing-lesson-5',
    title: '《智能制造基础》第 5 次课后反思',
    category: 'teaching',
    categoryName: '教学工作',
    type: '教学反思',
    date: '刚刚',
    updatedAt: '刚刚',
    source: '教学反思确认',
    owner: '林老师 ｜ 智能制造学院',
    status: 'pending-verify',
    summary: '教师已确认教学反思记录，正在等待沉淀到成长档案教学工作维度。确认通过后才会成为正式档案事实。',
    fields: [
      { label: '课程', value: '智能制造基础' },
      { label: '课次', value: '第 5 次课' },
      { label: '班级', value: '智能制造 2301 班' },
      { label: '依据材料', value: '课堂分析报告、课堂录音、教师补充想法' },
    ],
    materials: [{ name: '教学反思报告草稿.pdf', meta: 'PDF · 来源于教学反思确认' }],
    usages: ['能力画像：待核验后支撑教学改进能力证据', '个人发展报告：待核验后计入教学反思记录'],
    sourceSteps: [
      { title: '确认反思', desc: '教师确认 AI 整理的教学反思草稿。', time: '刚刚' },
      { title: '生成待确认记录', desc: '系统生成成长档案教学工作维度待确认记录。', time: '进行中' },
      { title: '写入档案', desc: '管理端确认后成为正式档案事实。', time: '待完成' },
    ],
    adminStoreRefs: ['archiveStore.processingRecords'],
  }

  archiveRecords.unshift(record)
  return record
}

export function findArchiveRecordById(recordId?: string): MobileArchiveRecord | undefined {
  return recordId ? archiveRecords.find((record) => record.id === recordId) : undefined
}

export function findArchiveRecordByTitle(title?: string): MobileArchiveRecord | undefined {
  return title ? archiveRecords.find((record) => record.title === title) : undefined
}

export function getArchiveRecordStatusLabel(status: MobileArchiveRecordStatus): '已入档' | '归档确认中' | '需补充' | '已移出' {
  if (status === 'pending-verify') return '归档确认中'
  if (status === 'need-supplement') return '需补充'
  if (status === 'removed') return '已移出'
  return '已入档'
}
