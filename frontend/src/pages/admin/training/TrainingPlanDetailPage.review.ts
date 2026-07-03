export const trainingPlanDetailPageReview = {
  route: '/admin/training/plans/:planId',
  title: '培训管理 / 培训计划详情',
  goal: '查看培训计划的基本信息、关联需求、安排、参与教师和进度，并处理待审核申请。',
  screenshot: '效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训计划详情｜附属流程.png',
  sections: [
    '顶部计划标题卡',
    '计划基本信息',
    '关联需求',
    '计划安排',
    '参与教师',
    '右侧时间地点、入口、材料和进度',
  ],
  dataRules: [
    '计划详情按 route.params.planId 读取 trainingStore.plans。',
    '日程、材料要求、关联需求和进度节点来自 training mock service。',
    '参与教师来自 planDetail.participants。',
    '处理申请必须调用 approveTrainingApplication() 并同步参与教师状态。',
  ],
  interactions: [
    '返回列表回到培训计划页。',
    '查看教师跳转到成长档案教师详情。',
    '处理待审核申请会同意对应培训申请并显示操作反馈。',
  ],
  formRules: [],
  checklist: [
    '标题卡、详情区和右侧信息与效果图基本一致',
    '按 planId 展示对应计划数据',
    '参与教师处理动作能写入申请状态',
    '查看教师能跳转成长档案详情',
    '右侧进度和材料要求展示完整',
  ],
}
