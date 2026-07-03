export const abilityListRequirementMappingPageReview = {
  route: '/admin/ability-list/execution/requirement-mapping',
  title: '能力清单 / 岗位与聘期要求映射',
  goal: '将岗位竞聘和聘期履职要求映射到执行版能力指标，支持新增、编辑、删除和确认配置。',
  screenshot: '效果图/管理PC端/1能力清单/管理端PC｜能力清单｜岗位与聘期要求映射.png',
  sections: [
    '顶部映射统计区',
    '要求对象树',
    '要求项映射表',
    '映射详情侧栏',
    '编辑要求项映射抽屉',
  ],
  dataRules: [
    '映射数据来自 abilityListStore.requirementMappings。',
    '新增、编辑、删除和确认配置都必须写回共享映射状态。',
    '编辑抽屉属于当前页面说明的一部分，不单独建立页面说明。',
  ],
  interactions: [
    '点击要求对象切换当前分组并更新提示。',
    '点击映射行在右侧展示要求项详情。',
    '新增要求项打开同页编辑抽屉。',
    '编辑、保存、删除映射必须同步映射列表和详情。',
    '确认配置将当前映射状态更新为已确认。',
  ],
  formRules: [
    { field: '要求项', required: true, message: '保存前应填写要求项内容' },
    { field: '指标维度', required: true, message: '保存前应填写指标维度' },
    { field: '指标名称', required: true, message: '保存前应填写指标名称' },
    { field: '等级标准', required: true, message: '保存前应填写等级标准' },
    { field: '制度条件', required: true, message: '保存前应填写制度条件' },
  ],
  checklist: [
    '三栏布局和编辑抽屉与效果图基本一致',
    '新增、编辑、删除和确认配置均有本地状态变化',
    '删除后选中项回落到仍存在的映射项',
    '无映射数据时显示空态',
    '编辑抽屉说明已纳入当前页面说明',
  ],
}
