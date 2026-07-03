export const trainingDemandPageReview = {
  route: '/admin/training/demands',
  title: '培训管理 / 需求管理',
  goal: '汇总能力画像、教师主动提出和管理补充的培训需求，并支持资源匹配。',
  screenshot: '效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜需求管理.png',
  sections: [
    '顶部需求统计卡',
    '需求表格和筛选栏',
    '新增需求入口',
    '右侧需求摘要',
    '待匹配需求入口',
  ],
  dataRules: [
    '需求列表来自 trainingStore.demands。',
    '组织范围、需求来源、需求方向、匹配状态和搜索关键字共同作用于 filteredDemands。',
    '新增需求必须写入 trainingStore.demands。',
    '匹配资源必须调用 matchTrainingDemand() 并更新需求状态。',
  ],
  interactions: [
    '新增需求创建管理补充需求并选中。',
    '查询应用当前搜索关键字并显示筛选数量。',
    '重置恢复默认筛选。',
    '查看详情在右侧展示需求摘要。',
    '匹配资源将当前需求关联到资源。',
  ],
  formRules: [],
  checklist: [
    '统计卡、需求表格和右侧摘要与效果图基本一致',
    '筛选、搜索和重置能更新列表',
    '新增需求写入共享状态',
    '匹配资源后需求状态可见变化',
    '无结果时显示统一空态',
  ],
}
