import type {
  AbilityIndicator,
  AbilityListState,
  ExecutionVersion,
  OptimizationSuggestion,
  RequirementMapping,
} from '@/domain/admin/ability-list'

export const initialExecutionVersion: ExecutionVersion = {
  versionNo: 'V2026',
  title: '2026 年度教师能力清单执行版',
  sourceTitle: '2026 年度教师能力清单执行版',
  templateTitle: '教师能力清单基准模板 V1.0',
  scope: '全校教师',
  indicatorCount: 69,
  lastUpdated: '2026-06-08 20:30',
  status: 'published',
  publishedAt: '2026-06-08 20:30',
  source: '教师能力清单基准模板 V1.0',
  operator: '教务处管理员',
}

export const initialExecutionIndicators: AbilityIndicator[] = [
  { key: 'execution-indicator-0', name: '教学工作量（课时/学期）', novice: '≥ 64', competent: '≥ 96', backbone: '≥ 128', expert: '≥ 160', basisLabel: '实达课时数', status: 'enabled' },
  { key: 'execution-indicator-1', name: '课堂教学评价（学生评教均分）', novice: '≥ 80分', competent: '≥ 85分', backbone: '≥ 90分', expert: '≥ 95分', basisLabel: '学生评教平均分', status: 'enabled' },
  { key: 'execution-indicator-2', name: '听课课时（课时/学期）', novice: '≥ 8', competent: '≥ 16', backbone: '≥ 24', expert: '≥ 32', basisLabel: '学期内听课总课时', status: 'enabled' },
  { key: 'execution-indicator-3', name: '教学规范执行', novice: '≥ 80%', competent: '≥ 90%', backbone: '≥ 95%', expert: '≥ 98%', basisLabel: '教学规范符合率', status: 'enabled' },
  { key: 'execution-indicator-4', name: '教学资源建设（门/年）', novice: '≥ 1', competent: '≥ 2', backbone: '≥ 3', expert: '≥ 5', basisLabel: '有效教学资源数量', status: 'enabled' },
  { key: 'execution-indicator-5', name: '信息化教学应用水平', novice: '≥ 60分', competent: '≥ 75分', backbone: '≥ 85分', expert: '≥ 95分', basisLabel: '信息化应用综合得分', status: 'enabled' },
]

export const initialBaseTemplateIndicators: AbilityIndicator[] = [
  { key: 'base-teaching-workload', name: '教学工作量（课时/学期）', novice: '≥64', competent: '≥96', backbone: '≥128', expert: '≥160', basisLabel: '教学工作记录', status: 'enabled' },
  { key: 'base-teaching-evaluation', name: '课堂教学评价（学生评分）', novice: '≥80分', competent: '≥85分', backbone: '≥90分', expert: '≥95分', basisLabel: '教学质量评价', status: 'enabled' },
  { key: 'base-listening-hours', name: '听课课时（课时/学期）', novice: '≥8', competent: '≥16', backbone: '≥24', expert: '≥32', basisLabel: '教学活动记录', status: 'enabled' },
  { key: 'base-teaching-compliance', name: '教学规范执行', novice: '≥80%', competent: '≥90%', backbone: '≥95%', expert: '≥98%', basisLabel: '教学规范检查', status: 'enabled' },
  { key: 'base-teaching-resource-construction', name: '教学资源建设（门/年）', novice: '≥1', competent: '≥2', backbone: '≥3', expert: '≥5', basisLabel: '课程资源记录', status: 'enabled' },
  { key: 'base-it-teaching-level', name: '信息化教学应用水平', novice: '≥60分', competent: '≥75分', backbone: '≥85分', expert: '≥95分', basisLabel: '信息化应用评价', status: 'enabled' },
]

export const initialOptimizationSuggestions: OptimizationSuggestion[] = [
  {
    id: 'suggestion-enterprise-practice',
    source: 'feedback',
    sourceLabel: '运行反馈',
    issueType: '标准缺失',
    keyLocation: '实践能力 / 企业实践成果转化',
    content: '新增“企业实践成果转化”指标，用于评估企业实践中的成果产出记录',
    basis: '本职群第 26 条成果材料未能给出清晰映射来源',
    status: 'pending',
    statusLabel: '待确认',
    targetIndicator: { key: 'base-enterprise-practice-output', name: '企业实践成果转化', novice: '形成实践记录', competent: '形成课程案例', backbone: '形成校级成果', expert: '形成可推广成果', basisLabel: '企业实践成果材料', status: 'draft' },
  },
  {
    id: 'suggestion-research-resource',
    source: 'policy',
    sourceLabel: '制度文件',
    issueType: '标准不清',
    keyLocation: '教研能力 / 教研资源',
    content: '细化“教研资源”评估说明，区分主编、参与等不同一般参与',
    basis: '2026年师资培养办法第三章第十二条',
    status: 'pending',
    statusLabel: '待确认',
    targetIndicator: { key: 'base-research-resource-detail', name: '教研资源建设贡献', novice: '参与资源建设', competent: '承担资源模块', backbone: '主持校级资源', expert: '主持省级以上资源', basisLabel: '教研资源建设材料', status: 'draft' },
  },
  {
    id: 'suggestion-teaching-resource-scope',
    source: 'feedback',
    sourceLabel: '运行反馈',
    issueType: '标准过宽',
    keyLocation: '教学能力 / 教学资源建设',
    content: '调整“覆盖多领域教学资源建设标准”，并补充说明适用范围',
    basis: '课堂教学创新试点组织、院系反馈材料普遍表述资源',
    status: 'pending',
    statusLabel: '待确认',
    targetIndicator: { key: 'base-teaching-resource-construction', name: '教学资源建设（门/年）', novice: '≥1 且资源可复用', competent: '≥2 且覆盖核心课程', backbone: '≥3 且覆盖专业核心课程', expert: '≥5 且可跨专业推广', basisLabel: '课程资源记录及复用证明', status: 'draft' },
  },
  {
    id: 'suggestion-service-mapping',
    source: 'manual',
    sourceLabel: '人工补充',
    issueType: '要求映射问题',
    keyLocation: '服务能力 / 社会服务记录',
    content: '补充与岗位和聘期要求的中间路径说明，提升后续映射溯源',
    basis: '管理类人工补充建议',
    status: 'pending',
    statusLabel: '待确认',
    targetIndicator: { key: 'base-service-record-mapping', name: '社会服务记录映射完整度', novice: '有服务记录', competent: '记录可关联岗位要求', backbone: '记录可关联聘期要求', expert: '记录可支持画像和报告', basisLabel: '社会服务记录及要求映射', status: 'draft' },
  },
]

export const initialRequirementMappings: RequirementMapping[] = [
  { id: '1', requirementText: '近三年承担不少于 2 门专业课程教学', indicatorDimension: '教学能力', indicatorName: '教学工作量', level: '骨干', levelCriteria: '近三年专业课程授课门数 ≥ 2', documentCondition: '近三年专业课程授课门数 ≥ 2', confirmStatus: 'confirmed' },
  { id: '2', requirementText: '主持或参与校级以上教改项目', indicatorDimension: '教研能力', indicatorName: '教改项目', level: '胜任', levelCriteria: '校级及以上教改项目 ≥ 1', documentCondition: '校级及以上教改项目 ≥ 1', confirmStatus: 'pending' },
  { id: '3', requirementText: '近三年教学质量评价达到良好及以上', indicatorDimension: '教学能力', indicatorName: '课堂教学评价', level: '胜任', levelCriteria: '近三年综合评价等级 ≥ 良好', documentCondition: '近三年综合评价等级 ≥ 良好', confirmStatus: 'confirmed' },
  { id: '4', requirementText: '具有企事业实践或社会服务经历', indicatorDimension: '实践能力', indicatorName: '企业实践经历', level: '胜任', levelCriteria: '累计企业实践天数 ≥ 30', documentCondition: '累计企业实践天数 ≥ 30', confirmStatus: 'unconfigured' },
]

export function createInitialAbilityListState(): AbilityListState {
  return {
    baseTemplateIndicators: cloneIndicators(initialBaseTemplateIndicators),
    executionVersion: { ...initialExecutionVersion },
    versionHistory: [],
    executionIndicators: cloneIndicators(initialExecutionIndicators),
    optimizationSuggestions: cloneOptimizationSuggestions(initialOptimizationSuggestions),
    pendingTemplateApplications: initialOptimizationSuggestions
      .filter(suggestion => suggestion.status === 'adopted')
      .map(suggestion => ({
        suggestionId: suggestion.id,
        targetIndicator: { ...suggestion.targetIndicator },
      })),
    requirementMappings: cloneRequirementMappings(initialRequirementMappings),
    operationMessage: '',
  }
}

export function cloneIndicators(indicators: AbilityIndicator[]) {
  return indicators.map(indicator => ({ ...indicator }))
}

export function cloneOptimizationSuggestions(suggestions: OptimizationSuggestion[]) {
  return suggestions.map(suggestion => ({
    ...suggestion,
    targetIndicator: { ...suggestion.targetIndicator },
  }))
}

export function cloneRequirementMappings(mappings: RequirementMapping[]) {
  return mappings.map(mapping => ({ ...mapping }))
}
