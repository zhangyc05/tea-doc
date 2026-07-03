import type {
  AbilityListBaseMock,
  AbilityListExecutionMock,
  AbilityListIconMap,
  AbilityListImpactCard,
  AbilityListOptimizationMock,
  AbilityListOption,
  AbilityListPublishConfirmMock,
  AbilityListRequirementMappingMock,
  AbilityListTreeNode,
  RequirementGroup,
} from '@/domain/admin/ability-list'

const abilityTreeChildren = {
  basic: [
    { key: 'basic-ethics', label: '师德师风' },
    { key: 'basic-qualification', label: '从业资格' },
    { key: 'basic-duty', label: '岗位履职' },
  ],
  teaching: [
    { key: 'teaching-implementation', label: '教学实施' },
    { key: 'teaching-curriculum-ideology', label: '课程思政' },
    { key: 'teaching-digital-literacy', label: '数字素养' },
    { key: 'teaching-guidance', label: '教学指导' },
    { key: 'teaching-skills-competition', label: '技能竞赛' },
    { key: 'teaching-team-building', label: '团队建设' },
  ],
  research: [
    { key: 'research-teaching-research', label: '教学研究' },
    { key: 'research-scientific-research', label: '科学研究' },
    { key: 'research-standards', label: '标准制定' },
    { key: 'research-platform', label: '平台建设' },
  ],
  practice: [
    { key: 'practice-skills-improvement', label: '技能提升' },
    { key: 'practice-project-practice', label: '项目实践' },
    { key: 'practice-skills-honor', label: '技能荣誉' },
    { key: 'practice-base-building', label: '基地建设' },
  ],
  service: [
    { key: 'service-external-service', label: '对外服务' },
    { key: 'service-international-service', label: '国际服务' },
  ],
}

const suggestionSources: AbilityListOption[] = [
  { key: 'all', label: '全部建议', icon: '●' },
  { key: 'policy', label: '制度文件', icon: '▤' },
  { key: 'feedback', label: '运行反馈', icon: '▣' },
  { key: 'manual', label: '人工补充', icon: '▲' },
]

const filterTags: AbilityListOption[] = [
  { key: 'all', label: '全部' },
  { key: 'missing', label: '标签缺失' },
  { key: 'unclear', label: '标签不清' },
  { key: 'duplicate', label: '标准重复' },
  { key: 'wide', label: '标准过宽' },
  { key: 'mapping', label: '要求映射问题' },
]

const impactCards: AbilityListImpactCard[] = [
  {
    title: '能力指标',
    description: '69 项指标将作为 2027 年度能力判断口径。',
    icon: '◎',
    tone: 'blue',
  },
  {
    title: '岗位/聘期要求',
    description: '已带入岗位/聘期要求映射，发布后用于教师对照。',
    icon: '▣',
    tone: 'purple',
  },
  {
    title: '发展活动',
    description: '教学反思、培训进修、企业实践、虚拟教研将按本版指标归类。',
    icon: '▱',
    tone: 'green',
  },
  {
    title: '成长档案',
    description: '新入档事实将优先关联本执行版指标。',
    icon: '▤',
    tone: 'orange',
  },
  {
    title: '画像与报告',
    description: '能力画像、岗位/聘期对照和分析报告将引用本版口径。',
    icon: '◔',
    tone: 'blue',
  },
]

const requirementGroups: RequirementGroup[] = [
  {
    key: 'position-competition',
    label: '岗位竞聘要求',
    children: [
      { key: 'lecturer', label: '申报讲师' },
      { key: 'associate-professor', label: '申报副教授' },
      { key: 'professor', label: '申报教授' },
    ],
  },
  {
    key: 'tenure-requirements',
    label: '聘期履职要求',
    children: [
      { key: 'lecturer-tenure', label: '讲师聘期要求' },
      { key: 'associate-professor-tenure', label: '副教授聘期要求' },
      { key: 'professor-tenure', label: '教授聘期要求' },
    ],
  },
]

export function getAbilityListBaseMock(icons: AbilityListIconMap): AbilityListBaseMock {
  return {
    abilityTree: createAbilityTree(icons, false),
  }
}

export function getAbilityListExecutionMock(icons: AbilityListIconMap): AbilityListExecutionMock {
  return {
    abilityTree: createAbilityTree(icons, true),
  }
}

export function getAbilityListOptimizationMock(): AbilityListOptimizationMock {
  return {
    suggestionSources: cloneOptions(suggestionSources),
    filterTags: cloneOptions(filterTags),
  }
}

export function getAbilityListPublishConfirmMock(): AbilityListPublishConfirmMock {
  return {
    impactCards: impactCards.map(card => ({ ...card })),
  }
}

export function getAbilityListRequirementMappingMock(): AbilityListRequirementMappingMock {
  return {
    requirementGroups: requirementGroups.map(group => ({
      ...group,
      children: group.children.map(child => ({ ...child })),
    })),
  }
}

function createAbilityTree(icons: AbilityListIconMap, includeColors: boolean): AbilityListTreeNode[] {
  return [
    {
      key: 'basic',
      label: '基本能力',
      icon: icons.basic,
      ...(includeColors ? { color: 'blue' as const } : {}),
      children: abilityTreeChildren.basic.map(child => ({ ...child })),
    },
    {
      key: 'teaching',
      label: '教学能力',
      icon: icons.teaching,
      ...(includeColors ? { color: 'blue' as const } : {}),
      children: abilityTreeChildren.teaching.map(child => ({ ...child })),
    },
    {
      key: 'research',
      label: '教研能力',
      icon: icons.research,
      ...(includeColors ? { color: 'orange' as const } : {}),
      children: abilityTreeChildren.research.map(child => ({ ...child })),
    },
    {
      key: 'practice',
      label: '实践能力',
      icon: icons.practice,
      ...(includeColors ? { color: 'green' as const } : {}),
      children: abilityTreeChildren.practice.map(child => ({ ...child })),
    },
    {
      key: 'service',
      label: '服务能力',
      icon: icons.service,
      ...(includeColors ? { color: 'purple' as const } : {}),
      children: abilityTreeChildren.service.map(child => ({ ...child })),
    },
  ]
}

function cloneOptions(options: AbilityListOption[]) {
  return options.map(option => ({ ...option }))
}
