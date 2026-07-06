import type {
  AbilityIndicator,
  AbilityListState,
  AbilityListTreeNode,
  BaseTemplateVersion,
  ExecutionVersion,
  OptimizationSuggestion,
  RequirementMapping,
} from '@/domain/admin/ability-list'

export const initialBaseTemplateVersion: BaseTemplateVersion = {
  versionNo: 'V1.0',
  title: '教师能力清单基准模板 V1.0',
  status: 'current',
  updatedAt: '2026-06-08 20:30',
  operator: '教务处管理员',
  changeSummary: '按分级教师能力清单带标准版初始化 71 项指标',
  changeCount: 71,
}

export const initialExecutionVersion: ExecutionVersion = {
  versionNo: 'V2026',
  title: '2026 年度教师能力清单执行版',
  sourceTitle: '2026 年度教师能力清单执行版',
  templateTitle: '教师能力清单基准模板 V1.0',
  scope: '全校教师',
  indicatorCount: 71,
  lastUpdated: '2026-06-08 20:30',
  status: 'published',
  publishedAt: '2026-06-08 20:30',
  source: '教师能力清单基准模板 V1.0',
  operator: '教务处管理员',
}

const excelAbilityStandardIndicators: AbilityIndicator[] = [
  { key: 'ability-standard-01', abilityKey: 'basic-ethics', name: '年度师德考核结果合格及以上', novice: '合格', competent: '合格', backbone: '优秀', expert: '标兵', basisLabel: '师德师风', status: 'enabled' },
  { key: 'ability-standard-02', abilityKey: 'basic-ethics', name: '年度有无违反《新时代高校教师职业行为十项准则》事项', novice: '无', competent: '无', backbone: '无', expert: '无', basisLabel: '师德师风', status: 'enabled' },
  { key: 'ability-standard-03-party', abilityKey: 'basic-ethics', name: '年度获得院级及以上党员类荣誉', novice: '——', competent: '获得', backbone: '——', expert: '——', basisLabel: '师德师风', status: 'enabled' },
  { key: 'ability-standard-03-labor', abilityKey: 'basic-ethics', name: '年度获得市级及以上劳动模范类荣誉', novice: '——', competent: '——', backbone: '获得', expert: '——', basisLabel: '师德师风', status: 'enabled' },
  { key: 'ability-standard-03-teacher', abilityKey: 'basic-ethics', name: '年度获得省部级及以上教师荣誉', novice: '——', competent: '——', backbone: '——', expert: '获得', basisLabel: '师德师风', status: 'enabled' },
  { key: 'ability-standard-04', abilityKey: 'basic-qualification', name: '是否具有高等教育教师资格证', novice: '✔', competent: '✔', backbone: '✔', expert: '✔', basisLabel: '从业资格', status: 'enabled' },
  { key: 'ability-standard-05', abilityKey: 'basic-qualification', name: '普通话等级二级甲等以上', novice: '✔', competent: '✔', backbone: '✔', expert: '✔', basisLabel: '从业资格', status: 'enabled' },
  { key: 'ability-standard-06', abilityKey: 'basic-qualification', name: '硕士研究生学位或三年企业工作经历', novice: '✔', competent: '✔', backbone: '✔', expert: '✔', basisLabel: '从业资格', status: 'enabled' },
  { key: 'ability-standard-07', abilityKey: 'basic-duty', name: '年度病事假次数', novice: '根据学校人事管理制度设定', competent: '', backbone: '', expert: '', basisLabel: '岗位履职', status: 'enabled' },
  { key: 'ability-standard-08', abilityKey: 'basic-duty', name: '年度考核结果合格以上', novice: '合格', competent: '合格', backbone: '优秀', expert: '优秀', basisLabel: '岗位履职', status: 'enabled' },
  { key: 'ability-standard-09', abilityKey: 'basic-duty', name: '继续教育培训学时/年', novice: '90', competent: '90', backbone: '90', expert: '90', basisLabel: '岗位履职', status: 'enabled' },
  { key: 'ability-standard-10', abilityKey: 'basic-duty', name: '担任辅导员、班主任、院级社团导师或院级学业导师年限', novice: '3', competent: '6', backbone: '6', expert: '6', basisLabel: '岗位履职', status: 'enabled' },
  { key: 'ability-standard-11', abilityKey: 'teaching-implementation', name: '岗位基本教学工作量（课时/学年）', novice: '432', competent: '576', backbone: '648', expert: '504', basisLabel: '教学实施', status: 'enabled' },
  { key: 'ability-standard-12', abilityKey: 'teaching-implementation', name: '岗位年听课课时数（课时/学年）', novice: '216', competent: '144', backbone: '144', expert: '216', basisLabel: '教学实施', status: 'enabled' },
  { key: 'ability-standard-13', abilityKey: 'teaching-implementation', name: '开展公开课、示范课、说专业、说课程等工作（次/学年）', novice: '——', competent: '2', backbone: '2', expert: '4', basisLabel: '教学实施', status: 'enabled' },
  { key: 'ability-standard-14', abilityKey: 'teaching-implementation', name: '教学改革实践形成典型案例', novice: '参与校级', competent: '主持校级', backbone: '主持省级', expert: '主持国家级', basisLabel: '教学实施', status: 'enabled' },
  { key: 'ability-standard-15', abilityKey: 'teaching-curriculum-ideology', name: '课程思政示范课程、教学名师和团队，课程思政教学研究项目立项', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级', basisLabel: '课程思政', status: 'enabled' },
  { key: 'ability-standard-16', abilityKey: 'teaching-curriculum-ideology', name: '课程思政教学成果奖', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级', basisLabel: '课程思政', status: 'enabled' },
  { key: 'ability-standard-17', abilityKey: 'teaching-digital-literacy', name: '优质示范课程、一体化课程、精品在线开放课程、精品资源共享课程、继续教育课程、社区教育优秀课程立项', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级', basisLabel: '数字素养', status: 'enabled' },
  { key: 'ability-standard-18', abilityKey: 'teaching-digital-literacy', name: '国家级一流核心课程（含线下和在线课程）立项', novice: '——', competent: '——', backbone: '——', expert: '参与/主持', basisLabel: '数字素养', status: 'enabled' },
  { key: 'ability-standard-19', abilityKey: 'teaching-digital-literacy', name: '专业教学资源库建设', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '数字素养', status: 'enabled' },
  { key: 'ability-standard-20', abilityKey: 'teaching-digital-literacy', name: '数字素养认证', novice: '初级', competent: '中级', backbone: '高级', expert: '高级', basisLabel: '数字素养', status: 'enabled' },
  { key: 'ability-standard-21', abilityKey: 'teaching-guidance', name: '是否担任学生实习实训、毕业设计、技能训练指导教师', novice: '——', competent: '是', backbone: '是', expert: '是', basisLabel: '教学指导', status: 'enabled' },
  { key: 'ability-standard-22', abilityKey: 'teaching-guidance', name: '指导学生参加省级及以上一类/二类技能竞赛获奖', novice: '参与二类', competent: '第一位指导二类竞赛获奖', backbone: '第一位指导一类竞赛获奖', expert: '第一位指导一类竞赛获奖一等奖', basisLabel: '教学指导', status: 'enabled' },
  { key: 'ability-standard-23', abilityKey: 'teaching-skills-competition', name: '教师本人参加省级及以上一类/二类技能竞赛获奖', novice: '——', competent: '参与二类竞赛获奖', backbone: '参与一类竞赛获奖', expert: '参与一类竞赛获一等奖', basisLabel: '技能竞赛', status: 'enabled' },
  { key: 'ability-standard-24', abilityKey: 'teaching-skills-competition', name: '获评中华技能大奖、国务院政府特殊津贴专家', novice: '——', competent: '——', backbone: '——', expert: '是', basisLabel: '技能竞赛', status: 'enabled' },
  { key: 'ability-standard-25', abilityKey: 'teaching-team-building', name: '职业教育教师（教学）创新团队', novice: '——', competent: '参与校级', backbone: '主持校级', expert: '主持/参与省级及以上', basisLabel: '团队建设', status: 'enabled' },
  { key: 'ability-standard-26', abilityKey: 'teaching-team-building', name: '高校黄大年式教师团队', novice: '——', competent: '参与校级', backbone: '主持校级', expert: '主持/参与省级及以上', basisLabel: '团队建设', status: 'enabled' },
  { key: 'ability-standard-27', abilityKey: 'research-teaching-research', name: '教学改革研究项目立项', novice: '参与厅局级', competent: '主持厅局级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '教学研究', status: 'enabled' },
  { key: 'ability-standard-28', abilityKey: 'research-teaching-research', name: '职业教育教学成果奖', novice: '——', competent: '参与校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '教学研究', status: 'enabled' },
  { key: 'ability-standard-29', abilityKey: 'research-teaching-research', name: '校企合作课程开发更新', novice: '参与更新', competent: '主持更新', backbone: '参与开发', expert: '主持开发', basisLabel: '教学研究', status: 'enabled' },
  { key: 'ability-standard-30', abilityKey: 'research-teaching-research', name: '编写出版教材', novice: '参编教材', competent: '主编教材', backbone: '参编省级及以上规划教材', expert: '主编省级及以上规划教材', basisLabel: '教学研究', status: 'enabled' },
  { key: 'ability-standard-31', abilityKey: 'research-teaching-research', name: '教材建设奖', novice: '——', competent: '——', backbone: '主编/参编教材获校级教材建设奖', expert: '主编/参编教材获得全国优秀教材建设奖省级推荐', basisLabel: '教学研究', status: 'enabled' },
  { key: 'ability-standard-32', abilityKey: 'research-scientific-research', name: '科研项目立项', novice: '参与厅局级', competent: '参与省级', backbone: '主持厅局级及以上', expert: '主持省级及以上', basisLabel: '科学研究', status: 'enabled' },
  { key: 'ability-standard-33', abilityKey: 'research-scientific-research', name: '以第一作者/前两位发表论文', novice: 'F类', competent: 'E类及以上', backbone: 'D类及以上', expert: 'C类及以上', basisLabel: '科学研究', status: 'enabled' },
  { key: 'ability-standard-34', abilityKey: 'research-scientific-research', name: '获得与本专业相关的发明专利、实用新型专利且专利权人为学校', novice: '——', competent: '参与', backbone: '≥1项', expert: '≥2项', basisLabel: '科学研究', status: 'enabled' },
  { key: 'ability-standard-35', abilityKey: 'research-scientific-research', name: '研究或实践成果被上级政府部门采纳应用或批示', novice: '——', competent: '参与', backbone: '市厅级', expert: '省级及以上', basisLabel: '科学研究', status: 'enabled' },
  { key: 'ability-standard-36', abilityKey: 'research-scientific-research', name: '科学研究、应用成果', novice: '——', competent: '参与市厅级', backbone: '主持市厅级', expert: '主持/参与省级及以上', basisLabel: '科学研究', status: 'enabled' },
  { key: 'ability-standard-37', abilityKey: 'research-standards', name: '职业教育专业教学指导方案、职教高考题库、职业技能等级认定题库建设', novice: '——', competent: '参与市厅级', backbone: '主持市厅级', expert: '主持/参与省级及以上', basisLabel: '标准制定', status: 'enabled' },
  { key: 'ability-standard-38', abilityKey: 'research-standards', name: '人才培养方案、课程标准、专业教学标准等标准开发', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持/参与省级及以上', basisLabel: '标准制定', status: 'enabled' },
  { key: 'ability-standard-39', abilityKey: 'research-platform', name: '专业（群）重点实验室、工程技术研究中心建设', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持/参与省级及以上', basisLabel: '平台建设', status: 'enabled' },
  { key: 'ability-standard-40', abilityKey: 'research-platform', name: '科技创新平台或创新载体建设', novice: '——', competent: '参与市厅级', backbone: '参与省级', expert: '主持/参与省级及以上', basisLabel: '平台建设', status: 'enabled' },
  { key: 'ability-standard-41', abilityKey: 'practice-skills-improvement', name: '双师型教师认定', novice: '——', competent: '初级', backbone: '中级', expert: '高级', basisLabel: '技能提升', status: 'enabled' },
  { key: 'ability-standard-42', abilityKey: 'practice-skills-improvement', name: '职业资格证书或技能等级证书', novice: '——', competent: '3级', backbone: '2级', expert: '1级', basisLabel: '技能提升', status: 'enabled' },
  { key: 'ability-standard-43', abilityKey: 'practice-skills-improvement', name: '职业教育名师工作室、技能大师工作室', novice: '——', competent: '参与校级', backbone: '主持校级', expert: '主持/参与省级及以上', basisLabel: '技能提升', status: 'enabled' },
  { key: 'ability-standard-44', abilityKey: 'practice-skills-improvement', name: '企业锻炼时长（天/年）', novice: '30', competent: '30', backbone: '30', expert: '30', basisLabel: '技能提升', status: 'enabled' },
  { key: 'ability-standard-45', abilityKey: 'practice-project-practice', name: '高水平专业群建设子项目任务', novice: '——', competent: '参与省级', backbone: '主持省级', expert: '参与国家级', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-46', abilityKey: 'practice-project-practice', name: '教学改革试点专业、重点专业、特色专业建设', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-47', abilityKey: 'practice-project-practice', name: '产业学院建设', novice: '——', competent: '参与校级', backbone: '主持校级', expert: '主持/参与省级及以上', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-48', abilityKey: 'practice-project-practice', name: '新增设专本贯通分段培养专业建设', novice: '——', competent: '参与', backbone: '主持', expert: '主持', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-49', abilityKey: 'practice-project-practice', name: '现代学徒制、企业新型学徒制、订单培养等校企合作项目', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-50', abilityKey: 'practice-project-practice', name: '市域产教联合体或行业产教融合共同体建设', novice: '参与', competent: '参与省级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-51', abilityKey: 'practice-project-practice', name: '职业教育校企合作典型生产实践项目', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-52', abilityKey: 'practice-project-practice', name: '现场工程师专项培养计划项目', novice: '——', competent: '参与校级', backbone: '主持校级', expert: '主持/参与省级及以上', basisLabel: '项目实践', status: 'enabled' },
  { key: 'ability-standard-53', abilityKey: 'practice-skills-honor', name: '首席技师、技术能手、青年技能名师、齐鲁工匠、突出贡献技师、技术技能大师等称号', novice: '——', competent: '——', backbone: '省级', expert: '省级及以上', basisLabel: '技能荣誉', status: 'enabled' },
  { key: 'ability-standard-54', abilityKey: 'practice-base-building', name: '虚拟仿真实训基地、产教融合实训基地、开放型区域产教融合实践中心建设', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '基地建设', status: 'enabled' },
  { key: 'ability-standard-55', abilityKey: 'practice-base-building', name: '技能大赛集训基地建设', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '基地建设', status: 'enabled' },
  { key: 'ability-standard-56', abilityKey: 'practice-base-building', name: '技艺技能传承创新平台建设', novice: '参与校级', competent: '主持校级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '基地建设', status: 'enabled' },
  { key: 'ability-standard-57', abilityKey: 'service-external-service', name: '知识产权转化数量（项）', novice: '——', competent: '1', backbone: '2', expert: '3', basisLabel: '对外服务', status: 'enabled' },
  { key: 'ability-standard-58', abilityKey: 'service-external-service', name: '横向课题累计到账金额（万元）', novice: '——', competent: '5', backbone: '10', expert: '15', basisLabel: '对外服务', status: 'enabled' },
  { key: 'ability-standard-59', abilityKey: 'service-external-service', name: '科技成果转化累计到账金额（万元）', novice: '——', competent: '——', backbone: '5', expert: '10', basisLabel: '对外服务', status: 'enabled' },
  { key: 'ability-standard-60', abilityKey: 'service-external-service', name: '非学历培训工作量（人日）', novice: '适学校办学规模测定', competent: '', backbone: '', expert: '', basisLabel: '对外服务', status: 'enabled' },
  { key: 'ability-standard-61', abilityKey: 'service-external-service', name: '校企合作企业任职取酬', novice: '——', competent: '项目取酬', backbone: '兼职取酬', expert: '高管取酬', basisLabel: '对外服务', status: 'enabled' },
  { key: 'ability-standard-62', abilityKey: 'service-external-service', name: '市校融合项目', novice: '参与', competent: '参与', backbone: '主持', expert: '主持', basisLabel: '对外服务', status: 'enabled' },
  { key: 'ability-standard-63', abilityKey: 'service-external-service', name: '技术创新中心、科技成果转化中试示范基地、协同创新中心、高校科技成果转化基地建设', novice: '——', competent: '参与省级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '对外服务', status: 'enabled' },
  { key: 'ability-standard-64', abilityKey: 'service-international-service', name: '国（境）外访学交流累计时长（月）', novice: '——', competent: '1', backbone: '1', expert: '3', basisLabel: '国际服务', status: 'enabled' },
  { key: 'ability-standard-65', abilityKey: 'service-international-service', name: '开发被国（境）外采用的专业教学标准', novice: '——', competent: '参与', backbone: '主持', expert: '主持', basisLabel: '国际服务', status: 'enabled' },
  { key: 'ability-standard-66', abilityKey: 'service-international-service', name: '境外办学项目（班·墨学院、中文工坊等）', novice: '参与', competent: '参与', backbone: '主持', expert: '主持', basisLabel: '国际服务', status: 'enabled' },
  { key: 'ability-standard-67', abilityKey: 'service-international-service', name: '具有国际影响力的职业教育标准、资源、装备建设', novice: '——', competent: '参与省级', backbone: '参与省级', expert: '主持省级及以上', basisLabel: '国际服务', status: 'enabled' },
  { key: 'ability-standard-68', abilityKey: 'service-international-service', name: '中外合作办学项目', novice: '参与', competent: '参与', backbone: '主持省级', expert: '主持省级', basisLabel: '国际服务', status: 'enabled' },
  { key: 'ability-standard-69', abilityKey: 'service-international-service', name: '"汉语桥"线上团组交流项目', novice: '参与', competent: '参与', backbone: '主持', expert: '主持', basisLabel: '国际服务', status: 'enabled' },
]

export const initialExecutionIndicators: AbilityIndicator[] = excelAbilityStandardIndicators

export const initialBaseTemplateIndicators: AbilityIndicator[] = excelAbilityStandardIndicators

export const initialExecutionAbilityTree: AbilityListTreeNode[] = [
  {
    key: 'basic',
    label: '基本能力',
    icon: '',
    color: 'blue',
    children: [
      { key: 'basic-ethics', label: '师德师风' },
      { key: 'basic-qualification', label: '从业资格' },
      { key: 'basic-duty', label: '岗位履职' },
    ],
  },
  {
    key: 'teaching',
    label: '教学能力',
    icon: '',
    color: 'blue',
    children: [
      { key: 'teaching-implementation', label: '教学实施' },
      { key: 'teaching-curriculum-ideology', label: '课程思政' },
      { key: 'teaching-digital-literacy', label: '数字素养' },
      { key: 'teaching-guidance', label: '教学指导' },
      { key: 'teaching-skills-competition', label: '技能竞赛' },
      { key: 'teaching-team-building', label: '团队建设' },
    ],
  },
  {
    key: 'research',
    label: '教研能力',
    icon: '',
    color: 'orange',
    children: [
      { key: 'research-teaching-research', label: '教学研究' },
      { key: 'research-scientific-research', label: '科学研究' },
      { key: 'research-standards', label: '标准制定' },
      { key: 'research-platform', label: '平台建设' },
    ],
  },
  {
    key: 'practice',
    label: '实践能力',
    icon: '',
    color: 'green',
    children: [
      { key: 'practice-skills-improvement', label: '技能提升' },
      { key: 'practice-project-practice', label: '项目实践' },
      { key: 'practice-skills-honor', label: '技能荣誉' },
      { key: 'practice-base-building', label: '基地建设' },
    ],
  },
  {
    key: 'service',
    label: '服务能力',
    icon: '',
    color: 'purple',
    children: [
      { key: 'service-external-service', label: '对外服务' },
      { key: 'service-international-service', label: '国际服务' },
    ],
  },
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
    targetIndicator: { key: 'base-enterprise-practice-output', abilityKey: 'practice', name: '企业实践成果转化', novice: '形成实践记录', competent: '形成课程案例', backbone: '形成校级成果', expert: '形成可推广成果', basisLabel: '企业实践成果材料', status: 'draft' },
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
    targetIndicator: { key: 'base-research-resource-detail', abilityKey: 'research', name: '教研资源建设贡献', novice: '参与资源建设', competent: '承担资源模块', backbone: '主持校级资源', expert: '主持省级以上资源', basisLabel: '教研资源建设材料', status: 'draft' },
  },
  {
    id: 'suggestion-teaching-resource-scope',
    source: 'feedback',
    sourceLabel: '运行反馈',
    issueType: '标准过宽',
    keyLocation: '教学能力 / 数字素养',
    content: '调整“覆盖多领域教学资源建设标准”，并补充说明适用范围',
    basis: '课堂教学创新试点组织、院系反馈材料普遍表述资源',
    status: 'pending',
    statusLabel: '待确认',
    targetIndicator: { key: 'base-teaching-resource-construction', abilityKey: 'teaching-digital-literacy', name: '专业教学资源库建设', novice: '参与校级且资源可复用', competent: '主持校级且覆盖核心课程', backbone: '参与省级且覆盖专业核心课程', expert: '主持省级及以上且可跨专业推广', basisLabel: '数字素养', status: 'draft' },
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
    targetIndicator: { key: 'base-service-record-mapping', abilityKey: 'service', name: '社会服务记录映射完整度', novice: '有服务记录', competent: '记录可关联岗位要求', backbone: '记录可关联聘期要求', expert: '记录可支持画像和报告', basisLabel: '社会服务记录及要求映射', status: 'draft' },
  },
]

export const initialRequirementMappings: RequirementMapping[] = [
  { id: '1', requirementGroupKey: 'associate-professor', requirementText: '近三年承担不少于 2 门专业课程教学', indicatorDimension: '教学能力', indicatorName: '教学工作量', level: '骨干', levelCriteria: '稳定承担核心专业课程教学，并形成较好教学质量与课程建设成果。', documentCondition: '近三年专业课程授课门数 ≥ 2', confirmStatus: 'confirmed' },
  { id: '2', requirementGroupKey: 'associate-professor', requirementText: '主持或参与校级以上教改项目', indicatorDimension: '教研能力', indicatorName: '教改项目', level: '胜任', levelCriteria: '主持或作为主要成员参与校级及以上教学改革项目。', documentCondition: '校级及以上教改项目 ≥ 1', confirmStatus: 'pending' },
  { id: '5', requirementGroupKey: 'associate-professor', requirementText: '近三年教学质量评价达到良好及以上', indicatorDimension: '教学能力', indicatorName: '课堂教学评价', level: '胜任', levelCriteria: '近三年综合评价等级达到良好及以上。', documentCondition: '近三年综合评价等级 ≥ 良好', confirmStatus: 'confirmed' },
  { id: '6', requirementGroupKey: 'associate-professor', requirementText: '具有企事业实践或社会服务经历', indicatorDimension: '实践能力', indicatorName: '企业实践经历', level: '胜任', levelCriteria: '具备企业实践、社会服务或相关项目经历。', documentCondition: '累计企业实践天数 ≥ 30', confirmStatus: 'unconfigured' },
  { id: '3', requirementGroupKey: 'professor', requirementText: '近三年教学指导或技能竞赛达到岗位要求', indicatorDimension: '教学能力', indicatorName: '指导学生参加省级及以上一类/二类技能竞赛获奖', level: '胜任', levelCriteria: '第一位指导二类竞赛获奖', documentCondition: '第一位指导二类竞赛获奖', confirmStatus: 'confirmed' },
  { id: '4', requirementGroupKey: 'associate-professor-tenure', requirementText: '具有企事业实践或社会服务经历', indicatorDimension: '实践能力', indicatorName: '企业锻炼时长（天/年）', level: '胜任', levelCriteria: '企业锻炼时长 30 天/年', documentCondition: '企业锻炼时长 30 天/年', confirmStatus: 'unconfigured' },
]

export function createInitialAbilityListState(): AbilityListState {
  return {
    baseTemplateIndicators: cloneIndicators(initialBaseTemplateIndicators),
    baseTemplateVersion: { ...initialBaseTemplateVersion },
    baseTemplateVersionHistory: [],
    pendingBaseTemplateChanges: [],
    executionVersion: { ...initialExecutionVersion },
    executionAbilityTree: cloneAbilityTree(initialExecutionAbilityTree),
    versionHistory: [],
    executionIndicators: cloneIndicators(initialExecutionIndicators),
    pendingExecutionIndicatorChanges: [],
    pendingExecutionVersion: null,
    pendingExecutionIndicators: [],
    pendingExecutionAbilityTree: null,
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

export function cloneAbilityTree(nodes: AbilityListTreeNode[]) {
  return nodes.map(node => ({
    ...node,
    children: node.children?.map(child => ({ ...child })),
  }))
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
