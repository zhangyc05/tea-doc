import type {
  AbilityProfileDimension,
  AbilityProfileFocusObject,
  AbilityProfileGroupMock,
  AbilityProfileScore,
  AbilityProfileTeacher,
  AbilityProfileTeacherDetailMock,
  AbilityProfileTeacherListMock,
} from '@/domain/admin/ability-profile'
import type { AbilityIndicator } from '@/components/admin/ability-list/types'
import type { TeacherArchiveFact } from '@/domain/admin/archive'

const schoolRadarData: AbilityProfileScore[] = [
  { label: '教学能力', value: 72 },
  { label: '教研能力', value: 61 },
  { label: '实践能力', value: 54 },
  { label: '服务能力', value: 49 },
]

const groupAbilityDimensions: AbilityProfileDimension[] = [
  {
    dimension: '教学能力',
    index: 72,
    composition: '课程建设、课堂教学、教学评价、教学改革、数字化教学等',
    distribution: [
      { label: '新手', percentage: 12 },
      { label: '胜任', percentage: 38 },
      { label: '骨干', percentage: 36 },
      { label: '名师', percentage: 14 },
    ],
  },
  {
    dimension: '教研能力',
    index: 61,
    composition: '课题研究、专业建设、课程改革、教学成果培育等',
    distribution: [
      { label: '新手', percentage: 18 },
      { label: '胜任', percentage: 42 },
      { label: '骨干', percentage: 28 },
      { label: '名师', percentage: 12 },
    ],
  },
  {
    dimension: '实践能力',
    index: 54,
    composition: '企业实践、产教融合、真实项目转化、实践基地建设等',
    distribution: [
      { label: '新手', percentage: 22 },
      { label: '胜任', percentage: 44 },
      { label: '骨干', percentage: 24 },
      { label: '名师', percentage: 10 },
    ],
  },
  {
    dimension: '服务能力',
    index: 49,
    composition: '社会服务、学生发展支持、团队协作、学校重点任务等',
    distribution: [
      { label: '新手', percentage: 25 },
      { label: '胜任', percentage: 46 },
      { label: '骨干', percentage: 20 },
      { label: '名师', percentage: 9 },
    ],
  },
]

const developmentDirections = [
  {
    title: '课程建设经验扩散',
    observation: '观察：教学能力指数较高，课程建设和服务分布不均。',
    keyDimension: '教学能力',
  },
  {
    title: '企业实践专项支持',
    observation: '观察：实践能力下的成果转化要素相对较低。',
    keyDimension: '实践能力',
  },
  {
    title: '教研共研带动',
    observation: '观察：教研能力整体偏中游，骨干教师占比偏低。',
    keyDimension: '教研能力',
  },
  {
    title: '服务记录口径统一',
    observation: '观察：服务记录缺口较多，口径不一致。',
    keyDimension: '服务能力',
  },
]

const focusTabs = [
  { label: '院系', value: '院系' },
  { label: '专业', value: '专业' },
  { label: '教师', value: '教师' },
]

const focusData: Record<string, AbilityProfileFocusObject[]> = {
  院系: [
    { name: '智能制造学院', type: '重点支持', dimension: '实践 / 成果转化', reason: '成果转化材料不足，转化证明偏少' },
    { name: '汽车工程学院', type: '重点支持', dimension: '实践 / 企业实践', reason: '企业实践记录不足，实践时间偏少' },
    { name: '信息工程学院', type: '优势巩固', dimension: '教研 / 课题研究', reason: '教研成果丰富，可示范带动' },
    { name: '商贸管理学院', type: '需关注', dimension: '服务 / 社会服务', reason: '服务记录口径不一致，数据质量待提升' },
  ],
  专业: [
    { name: '机电工程专业', type: '重点支持', dimension: '实践 / 成果转化', reason: '成果转化材料不足，转化证明偏少' },
  ],
  教师: [
    { name: '林老师', type: '重点支持', dimension: '教学 / 实践', reason: '教学能力较突出，实践成果需要培育' },
  ],
}

const colleges = ['全部学院', '智能制造学院', '电子信息学院', '财经学院', '计算机学院', '外国语学院', '艺术设计学院']
const titles = ['全部职称', '讲师', '副教授', '教授']
const teacherTypes = ['全部类型', '教学实践型', '教研成长型', '实践带动型', '综合发展型']
const focusTypes = ['全部', '重点支持', '持续观察', '优势样本']

const teachers: AbilityProfileTeacher[] = [
  { id: 'lin', name: '林老师', college: '智能制造学院', title: '讲师', developmentIndex: 76, teacherType: '教学实践型', basicAbilityStatus: '达标', tags: ['课程建设基础较好', '实践教学成效突出', '教研成果持续积累'], focusType: '重点支持' },
  { id: 'chen', name: '陈老师', college: '电子信息学院', title: '副教授', developmentIndex: 72, teacherType: '教研成长型', basicAbilityStatus: '达标', tags: ['教研方向逐步明确', '科研成果持续积累', '课程改革有潜力'], focusType: '持续观察' },
  { id: 'wang', name: '王老师', college: '财经学院', title: '讲师', developmentIndex: 81, teacherType: '实践带动型', basicAbilityStatus: '达标', tags: ['实践教学能力突出', '校企合作成效明显', '服务贡献较大'], focusType: '优势样本' },
  { id: 'liu', name: '刘老师', college: '计算机学院', title: '副教授', developmentIndex: 68, teacherType: '教研成长型', basicAbilityStatus: '达标', tags: ['课程建设有提升空间', '教研成果持续积累', '服务贡献继续观察'], focusType: '持续观察' },
  { id: 'zhao', name: '赵老师', college: '外国语学院', title: '讲师', developmentIndex: 79, teacherType: '综合发展型', basicAbilityStatus: '达标', tags: ['教学表现稳定优秀', '教研能力持续提升', '学生指导成效良好'], focusType: '优势样本' },
  { id: 'zhou', name: '周老师', college: '艺术设计学院', title: '讲师', developmentIndex: 71, teacherType: '实践带动型', basicAbilityStatus: '达标', tags: ['实践成果转化可提升', '课程建设基础较好', '服务育人持续关注'], focusType: '重点支持' },
]

const baselineData = [
  { year: 2026, status: '基线已形成' },
  { year: 2027, status: '待形成' },
  { year: 2028, status: '待形成' },
]

const defaultRadarData: AbilityProfileScore[] = [
  { label: '教学能力', value: 88 },
  { label: '教研能力', value: 68 },
  { label: '实践能力', value: 79 },
  { label: '服务能力', value: 72 },
]

const teacherAbilityDimensions: AbilityProfileDimension[] = [
  { dimension: '教学能力', index: 88, composition: '课程建设、课堂教学、教学评价、教学改进等' },
  { dimension: '教研能力', index: 68, composition: '课题研究、专业建设、课程改革、成果培育等' },
  { dimension: '实践能力', index: 79, composition: '企业实践、产教融合、校企合作、成果转化等' },
  { dimension: '服务能力', index: 72, composition: '社会服务、学生支持、团队协作、重点任务等' },
]

const supportDirections = [
  { feature: '课程建设基础较好', direction: '课程建设经验沉淀', focus: '适合沉淀课程建设、教学评价、教学改进相关经验' },
  { feature: '实践转化具备基础', direction: '实践成果转化支持', focus: '关注企业实践成果、校企合作成果的转化表达与应用材料沉淀' },
  { feature: '教研成果持续积累', direction: '教研成果继续培育', focus: '适合围绕课题共研、成果培育、教研协作继续支持' },
  { feature: '服务贡献继续观察', direction: '服务贡献持续观察', focus: '继续观察社会服务、学生支持、重点任务贡献的稳定性' },
]

export function getAbilityProfileGroupMock(): AbilityProfileGroupMock {
  return {
    developmentIndex: 68,
    dataBasis: '静态画像样例',
    schoolRadarData: cloneScores(schoolRadarData),
    abilityDimensions: cloneDimensions(groupAbilityDimensions),
    developmentDirections: developmentDirections.map(item => ({ ...item })),
    focusTabs: focusTabs.map(item => ({ ...item })),
    focusData: Object.fromEntries(
      Object.entries(focusData).map(([key, value]) => [key, value.map(item => ({ ...item }))]),
    ),
  }
}

export function calculateAbilityProfileGroup(
  archiveFacts: TeacherArchiveFact[],
  executionIndicators: AbilityIndicator[],
): AbilityProfileGroupMock {
  const teacherProfiles = teachers.map(teacher => ({
    teacher,
    profile: calculateTeacherAbilityProfile(teacher.name, archiveFacts, executionIndicators),
  }))
  const dimensions = ['教学能力', '教研能力', '实践能力', '服务能力']
  const abilityDimensions = dimensions.map((dimension) => {
    const dimensionScores = teacherProfiles.map(({ profile }) =>
      profile.radarData.find(item => item.label === dimension)?.value ?? 0,
    )
    const relatedIndicators = executionIndicators.filter(indicator =>
      mapIndicatorToAbility(indicator.name, indicator.basisLabel) === dimension,
    )
    return {
      dimension,
      index: average(dimensionScores),
      composition: relatedIndicators.length > 0
        ? relatedIndicators.map(indicator => indicator.name).join('、')
        : `${dimension}执行版指标待补充`,
      distribution: buildScoreDistribution(dimensionScores),
    }
  })
  const schoolRadarData = abilityDimensions.map(item => ({ label: item.dimension, value: item.index }))
  const teacherScores = teacherProfiles.map(({ teacher, profile }) => ({
    teacher,
    score: profile.developmentIndex.score,
    weakestDimension: getWeakestDimension(profile.radarData),
  }))
  const collegeScores = Array.from(new Set(teacherScores.map(item => item.teacher.college)))
    .map((college) => {
      const members = teacherScores.filter(item => item.teacher.college === college)
      return {
        name: college,
        score: average(members.map(item => item.score)),
        weakestDimension: members[0]?.weakestDimension ?? '教学能力',
      }
    })
    .sort((a, b) => a.score - b.score)
  const lowScoreTeachers = teacherScores
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  return {
    developmentIndex: average(teacherScores.map(item => item.score)),
    dataBasis: '教师画像 + 正式档案事实 + 执行版能力清单',
    schoolRadarData,
    abilityDimensions,
    developmentDirections: buildDevelopmentDirections(abilityDimensions, archiveFacts.length),
    focusTabs: focusTabs.map(item => ({ ...item })),
    focusData: {
      院系: collegeScores.slice(0, 4).map(item => ({
        name: item.name,
        type: item.score < 70 ? '重点支持' : '持续观察',
        dimension: item.weakestDimension,
        reason: `教师平均指数 ${item.score}，${item.weakestDimension}需继续补证据`,
      })),
      专业: lowScoreTeachers.slice(0, 2).map(item => ({
        name: item.teacher.teacherType,
        type: item.score < 70 ? '重点支持' : '持续观察',
        dimension: item.weakestDimension,
        reason: `${item.teacher.college}${item.teacher.name}画像指数 ${item.score}，建议按类型聚合支持`,
      })),
      教师: lowScoreTeachers.map(item => ({
        name: item.teacher.name,
        type: item.score < 70 ? '重点支持' : '持续观察',
        dimension: item.weakestDimension,
        reason: `个人画像指数 ${item.score}，${item.weakestDimension}证据不足`,
      })),
    },
  }
}

export function getAbilityProfileTeacherListMock(): AbilityProfileTeacherListMock {
  return {
    colleges: [...colleges],
    titles: [...titles],
    teacherTypes: [...teacherTypes],
    focusTypes: [...focusTypes],
    teachers: teachers.map(teacher => ({
      ...teacher,
      tags: [...teacher.tags],
    })),
  }
}

export function getAbilityProfileTeacherDetailMock(teacherId: string): AbilityProfileTeacherDetailMock {
  const teacher = teachers.find(item => item.id === teacherId) ?? teachers[0]
  return {
    teacherInfo: {
      name: teacher.name,
      college: teacher.college,
      title: teacher.title,
      year: 2,
      period: '2026 年度',
      version: '2026 年度执行版能力清单',
      dataBasis: '正式档案事实',
      updateTime: '2026-06-19',
    },
    developmentIndex: {
      score: teacher.developmentIndex,
      total: 100,
      teacherType: teacher.teacherType,
      abilityStage: '骨干教师',
      basicAbility: teacher.basicAbilityStatus,
      typeBasis: '教学能力较突出 | 实践能力较突出 | 教研、服务保持稳定',
    },
    baselineData: baselineData.map(item => ({ ...item })),
    radarData: cloneScores(defaultRadarData),
    abilityDimensions: cloneDimensions(teacherAbilityDimensions),
    supportDirections: supportDirections.map(item => ({ ...item })),
  }
}

export function calculateTeacherAbilityProfile(
  teacherName: string,
  archiveFacts: TeacherArchiveFact[],
  executionIndicators: AbilityIndicator[],
): AbilityProfileTeacherDetailMock {
  const baseProfile = getAbilityProfileTeacherDetailMock('lin')
  const teacherFacts = archiveFacts.filter(fact => fact.teacher === teacherName)
  const dimensions = ['教学能力', '教研能力', '实践能力', '服务能力']
  const abilityDimensions = dimensions.map((dimension) => {
    const relatedFacts = teacherFacts.filter(fact => mapArchiveDimensionToAbility(fact.dimension) === dimension)
    const relatedIndicators = executionIndicators.filter(indicator =>
      mapIndicatorToAbility(indicator.name, indicator.basisLabel) === dimension,
    )
    const evidenceScore = Math.min(95, 58 + relatedFacts.length * 12 + relatedIndicators.length * 4)
    return {
      dimension,
      index: evidenceScore,
      composition: relatedIndicators.length > 0
        ? relatedIndicators.map(indicator => indicator.name).join('、')
        : `${dimension}执行版指标待补充`,
    }
  })
  const radarData = abilityDimensions.map(item => ({ label: item.dimension, value: item.index }))
  const averageScore = Math.round(radarData.reduce((sum, item) => sum + item.value, 0) / radarData.length)
  const evidenceTitles = teacherFacts.map(fact => fact.title)

  return {
    ...baseProfile,
    teacherInfo: {
      ...baseProfile.teacherInfo,
      name: teacherName,
      dataBasis: '正式档案事实 + 执行版能力清单',
      updateTime: teacherFacts[0]?.archiveTime || baseProfile.teacherInfo.updateTime,
    },
    developmentIndex: {
      ...baseProfile.developmentIndex,
      score: averageScore,
      typeBasis: evidenceTitles.length > 0
        ? `依据 ${teacherFacts.length} 条正式档案事实和 ${executionIndicators.length} 个执行版指标计算`
        : '暂无正式档案事实，沿用执行版指标口径观察',
    },
    radarData,
    abilityDimensions,
    supportDirections: supportDirections.map((item, index) => ({
      ...item,
      focus: evidenceTitles[index]
        ? `${item.focus}；已引用证据：${evidenceTitles[index]}`
        : `${item.focus}；当前维度缺少正式档案事实支撑`,
    })),
  }
}

function cloneScores(scores: AbilityProfileScore[]) {
  return scores.map(item => ({ ...item }))
}

function cloneDimensions(dimensions: AbilityProfileDimension[]) {
  return dimensions.map(item => ({
    ...item,
    distribution: item.distribution?.map(distribution => ({ ...distribution })),
  }))
}

function average(values: number[]) {
  if (values.length === 0) return 0
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
}

function buildScoreDistribution(scores: number[]) {
  const buckets = [
    { label: '新手', count: 0 },
    { label: '胜任', count: 0 },
    { label: '骨干', count: 0 },
    { label: '名师', count: 0 },
  ]
  scores.forEach((score) => {
    if (score < 65) buckets[0].count += 1
    else if (score < 75) buckets[1].count += 1
    else if (score < 85) buckets[2].count += 1
    else buckets[3].count += 1
  })
  return buckets.map(bucket => ({
    label: bucket.label,
    percentage: scores.length === 0 ? 0 : Math.round((bucket.count / scores.length) * 100),
  }))
}

function getWeakestDimension(scores: AbilityProfileScore[]) {
  return [...scores].sort((a, b) => a.value - b.value)[0]?.label ?? '教学能力'
}

function buildDevelopmentDirections(dimensions: AbilityProfileDimension[], factCount: number) {
  return dimensions
    .slice()
    .sort((a, b) => a.index - b.index)
    .map((dimension) => ({
      title: `${dimension.dimension}支持`,
      observation: `观察：${dimension.dimension}指数 ${dimension.index}，当前聚合 ${factCount} 条正式档案事实。`,
      keyDimension: dimension.dimension,
    }))
    .slice(0, 4)
}

function mapArchiveDimensionToAbility(dimension: string): string {
  if (dimension.includes('教学')) return '教学能力'
  if (dimension.includes('教研') || dimension.includes('科研')) return '教研能力'
  if (dimension.includes('企业') || dimension.includes('实践')) return '实践能力'
  if (dimension.includes('服务')) return '服务能力'
  return '教学能力'
}

function mapIndicatorToAbility(name: string, basisLabel: string): string {
  const text = `${name}${basisLabel}`
  if (text.includes('实践') || text.includes('企业')) return '实践能力'
  if (text.includes('教研') || text.includes('科研') || text.includes('课题')) return '教研能力'
  if (text.includes('服务')) return '服务能力'
  return '教学能力'
}
