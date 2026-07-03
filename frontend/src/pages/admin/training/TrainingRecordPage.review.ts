export const trainingRecordPageReview = {
  route: '/admin/training/records',
  title: '培训管理 / 记录总览',
  goal: '查看培训记录总览，按组织、年度、方向、材料情况和关键字筛选，并进入记录详情。',
  screenshot: '效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜记录总览.png',
  sections: [
    '顶部记录统计卡',
    '记录筛选栏',
    '培训记录表格',
    '材料待完善入口',
    '详情跳转动作',
  ],
  dataRules: [
    '记录列表来自 trainingStore.records。',
    '统计卡必须基于 records 计算记录数、教师数、学时和材料待完善数。',
    '筛选条件和搜索关键字共同作用于 filteredRecords。',
    '详情页上传证书后可同步材料状态。',
  ],
  interactions: [
    '重置恢复默认筛选。',
    '查看详情跳转 /admin/training/records/:recordId。',
    '查看材料待完善切换到证书待补筛选。',
    '搜索输入即时参与 filteredRecords。',
  ],
  formRules: [],
  checklist: [
    '统计卡、筛选栏和记录表格与效果图基本一致',
    '筛选和搜索能更新记录列表',
    '材料待完善入口能切换筛选',
    '查看详情能进入对应记录详情页',
    '静态分页保持只读占位语义',
  ],
}
