export const abilityListBaseOptimizationPageReview = {
  route: '/admin/ability-list/base/optimization',
  title: '能力清单 / 优化基准模板',
  goal: '汇总制度文件、运行反馈和人工补充形成的优化建议，人工确认后应用到基准模板。',
  screenshot: '效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版优化建议.png',
  sections: [
    '顶部建议统计区',
    '建议来源筛选',
    '优化建议列表',
    '建议详情侧栏',
  ],
  dataRules: [
    '优化建议来自 abilityListStore.optimizationSuggestions。',
    '来源筛选和问题类型筛选必须共同作用于建议列表。',
    '已采纳建议进入 pendingTemplateApplications，应用后写入基准模板指标。',
  ],
  interactions: [
    '上传制度文件新增制度来源建议，并切换到制度文件筛选。',
    '重新分析运行反馈新增反馈来源建议，并切换到运行反馈筛选。',
    '查看详情在右侧展示当前建议。',
    '采纳、暂缓、弃用必须更新建议状态。',
    '查看版本记录跳回基准模板页并打开版本记录抽屉。',
  ],
  formRules: [],
  checklist: [
    '统计、筛选、列表和详情区域与效果图基本一致',
    '筛选后列表数量和空态正确',
    '采纳建议后可应用到基准模板',
    '暂缓和弃用有明确状态反馈',
    '台账结论与实现一致',
  ],
}
