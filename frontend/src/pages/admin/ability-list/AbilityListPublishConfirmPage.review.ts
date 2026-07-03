export const abilityListPublishConfirmPageReview = {
  route: '/admin/ability-list/execution/publish-confirm',
  title: '能力清单 / 执行版发布确认',
  goal: '确认下一周期执行版的来源、范围、指标数量和发布影响，发布后切换为当前运行口径。',
  screenshot: '效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版发布确认.png',
  sections: [
    '顶部发布版本信息区',
    '发布影响确认卡片',
    '发布说明',
    '底部发布操作区',
  ],
  dataRules: [
    '发布版本信息来自 abilityListStore.executionVersion。',
    '发布影响卡片来自 ability-list mock service。',
    '已发布状态下确认发布按钮必须禁用。',
  ],
  interactions: [
    '返回修改回到执行版查看页。',
    '确认发布调用 publishExecutionVersion，发布后状态切为已发布。',
    '已发布后按钮文案显示已确认发布。',
  ],
  formRules: [],
  checklist: [
    '发布版本来源、基准模板、范围和指标数展示完整',
    '影响确认卡片与效果图基本一致',
    '发布说明清楚区分新旧执行版',
    '确认发布后状态和按钮禁用态同步变化',
  ],
}
