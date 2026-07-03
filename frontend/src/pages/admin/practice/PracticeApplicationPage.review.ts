export const practiceApplicationPageReview = {
  route: '/admin/practice/applications',
  title: '发展活动 / 企业实践申请处理',
  goal: '处理教师企业实践申请，支持筛选、定位、同意、退回和进入已生成的实践记录。',
  screenshot: '效果图/管理PC端/4发展活动/3企业实践/管理端PC｜企业实践｜实践申请处理.png',
  sections: [
    '申请状态统计',
    '申请筛选栏',
    '实践申请表格',
    '分页栏',
    '选中申请摘要',
  ],
  dataRules: [
    '申请、跟踪记录和实践记录均来自 practiceStore。',
    '统计卡由 practiceState.applications 和 trackings 状态计算。',
    '筛选结果由院系、申请状态、实践时间和搜索关键字共同决定。',
    '同意或退回申请必须通过 practiceStore action 同步申请、跟踪和记录状态。',
  ],
  interactions: [
    '查询将搜索框内容应用到筛选关键字并显示筛选反馈。',
    '重置恢复默认筛选并显示反馈。',
    '查看申请只在当前表格中定位该申请。',
    '查看记录跳转 /admin/practice/records?recordId=...；无记录时显示反馈。',
    '同意和退回操作更新共享业务状态并选中当前申请。',
  ],
  formRules: [],
  checklist: [
    '统计卡、筛选栏、申请表和分页结构与效果图基本一致',
    '筛选、查询、重置能更新申请列表',
    '同意和退回能写入共享状态',
    '查看记录能进入对应实践记录',
    '无记录时不伪装成可跳转成功',
  ],
}
