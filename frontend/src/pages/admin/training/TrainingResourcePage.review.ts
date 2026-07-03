export const trainingResourcePageReview = {
  route: '/admin/training/resources',
  title: '培训管理 / 资源库',
  goal: '维护培训资源库，支持按状态、方向、级别、来源和关键字筛选，并创建待完善资源草稿。',
  screenshot: '效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜资源库.png',
  sections: [
    '顶部资源统计卡',
    '资源筛选栏',
    '资源表格',
    '分页占位',
    '右侧资源概览',
  ],
  dataRules: [
    '资源列表来自 trainingStore.resources。',
    '统计卡必须基于 trainingState.resources 计算。',
    '筛选条件和 appliedSearchQuery 共同作用于 filteredResources。',
    '新增资源草稿必须写入 trainingStore，并切换到信息待完善状态。',
  ],
  interactions: [
    '重置清空筛选并显示操作反馈。',
    '查询应用当前搜索关键字并显示筛选数量。',
    '新增资源创建草稿并选中该资源。',
    '查看按钮在右侧展示资源摘要。',
    '查看待完善资源切换到信息待完善筛选。',
  ],
  formRules: [],
  checklist: [
    '统计卡、筛选栏、表格和右侧概览与效果图基本一致',
    '筛选和搜索能更新资源列表',
    '新增资源草稿写入共享状态',
    '无结果时显示统一空态',
    '分页为只读占位，不伪装成业务翻页闭环',
  ],
}
