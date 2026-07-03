export const trainingRecordDetailPageReview = {
  route: '/admin/training/records/:recordId',
  title: '培训管理 / 培训记录详情',
  goal: '查看单条培训记录详情，补充证书材料，并追踪记录去向。',
  screenshot: '效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训记录详情.png',
  sections: [
    '顶部记录标题卡',
    '培训基本信息',
    '学习记录',
    '培训总结',
    '证书材料',
    '相关培训记录',
    '右侧记录信息、材料情况和记录去向',
  ],
  dataRules: [
    '记录详情按 route.params.recordId 读取 trainingStore.records。',
    '学习记录、培训总结和相关记录来自 training mock service。',
    '证书材料来自 recordDetail.materials。',
    '上传证书必须调用 uploadTrainingCertificate() 并写回 trainingStore。',
  ],
  interactions: [
    '上传材料更新当前记录材料状态并显示操作反馈。',
    '相关培训记录查看跳转到对应记录详情。',
    '返回入口回到培训记录总览。',
  ],
  formRules: [],
  checklist: [
    '标题卡、详情内容和右侧信息与效果图基本一致',
    '按 recordId 展示对应培训记录',
    '上传材料后材料状态可见变化',
    '相关记录能跳转到对应详情',
    '记录去向说明不伪装成额外业务动作',
  ],
}
