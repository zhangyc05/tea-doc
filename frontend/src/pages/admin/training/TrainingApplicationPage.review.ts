export const trainingApplicationPageReview = {
  route: '/admin/training/applications',
  title: '培训管理 / 申请处理',
  goal: '处理教师培训申请，支持筛选、查看详情、同意和退回。',
  screenshot: '效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜申请处理.png',
  sections: [
    '顶部申请统计卡',
    '申请筛选栏',
    '申请表格',
    '右侧申请摘要',
    '申请处理动作',
  ],
  dataRules: [
    '申请列表来自 trainingStore.applications。',
    '组织范围、申请状态、申请培训和搜索关键字共同作用于 filteredApplications。',
    '同意申请必须调用 approveTrainingApplication() 并同步参与名单。',
    '退回申请必须调用 rejectTrainingApplication()。',
  ],
  interactions: [
    '查询应用当前搜索关键字并显示筛选数量。',
    '重置恢复默认筛选。',
    '查看详情在右侧展示申请摘要。',
    '同意处理当前申请。',
    '退回仅对待处理申请生效。',
  ],
  formRules: [],
  checklist: [
    '统计卡、申请表格和右侧摘要与效果图基本一致',
    '筛选、搜索和重置能更新列表',
    '同意和退回写入共享状态',
    '处理结果可同步到计划参与名单',
    '无结果时显示统一空态',
  ],
}
