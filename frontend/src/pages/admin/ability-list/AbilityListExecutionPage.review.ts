export const abilityListExecutionPageReview = {
  route: '/admin/ability-list/execution',
  title: '能力清单 / 执行版查看',
  goal: '查看当前周期执行版能力清单，并支持编辑指标调整、查看历史版本和派生下一周期执行版。',
  screenshot: '效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png',
  sections: [
    '顶部执行版信息区',
    '能力结构树',
    '执行版指标表格',
    '编辑指标抽屉',
    '历史版本抽屉',
  ],
  dataRules: [
    '执行版指标来自 abilityListStore.executionIndicators。',
    '执行版状态、来源基准版、适用范围和更新时间来自 abilityListStore.executionVersion。',
    '历史版本列表必须包含当前执行版和 versionHistory。',
  ],
  interactions: [
    '点击指标编辑打开编辑抽屉。',
    '保存编辑后更新执行版指标，并关闭抽屉。',
    '历史版本打开执行版历史版本抽屉。',
    '派生下一周期执行版后进入发布确认页。',
  ],
  formRules: [
    { field: '指标名称', required: true, message: '保存前应填写指标名称' },
    { field: '新手', required: true, message: '保存前应填写新手标准' },
    { field: '胜任', required: true, message: '保存前应填写胜任标准' },
    { field: '骨干', required: true, message: '保存前应填写骨干标准' },
    { field: '名师', required: true, message: '保存前应填写名师标准' },
    { field: '计算规则', required: true, message: '保存前应填写计算规则' },
  ],
  checklist: [
    '页面结构与执行版效果图基本一致',
    '指标编辑抽屉保存后页面状态可见变化',
    '历史版本抽屉展示当前版本和历史记录',
    '派生下一周期执行版可进入发布确认页',
    '所有按钮都有真实动作或明确反馈',
  ],
}
