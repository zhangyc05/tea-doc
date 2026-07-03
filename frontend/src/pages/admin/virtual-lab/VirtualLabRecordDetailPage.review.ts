export const virtualLabRecordDetailPageReview = {
  route: '/admin/virtual-lab/records/:recordId',
  title: '发展活动 / 虚拟教研记录详情',
  goal: '查看教研记录正文、参与贡献和来源资料，并生成成长档案待确认记录。',
  screenshot: '效果图/管理PC端/4发展活动/4虚拟教研/管理端PC｜虚拟教研｜研讨记录与贡献记录.png',
  sections: [
    '记录信息卡',
    '记录正文',
    '参与记录',
    '来源资料',
    '来源资料详情',
  ],
  dataRules: [
    '记录详情按 route.params.recordId 读取 virtualLabStore。',
    '记录正文和参与记录来自 getVirtualLabRecordDetailMock()。',
    '来源资料按 recordInfo.sourceActivityId 从 virtualLabStore 读取。',
    '生成档案待确认必须调用 sendVirtualLabRecordToArchive() 并跳转成长档案处理页。',
  ],
  interactions: [
    '查看来源活动跳转 /admin/virtual-lab/activities/:activityId。',
    '查看来源资料滚动定位到来源资料区域。',
    '查看资料更新选中资料并显示反馈。',
    '查看全部展开参与记录。',
    '生成档案待确认写入成长档案处理队列并跳转 /admin/archive/processing。',
  ],
  formRules: [],
  checklist: [
    '记录信息、正文、参与记录和来源资料与效果图基本一致',
    '按 recordId 展示对应教研记录',
    '来源活动和来源资料入口可用',
    '参与记录可展开',
    '生成档案待确认形成跨模块闭环',
  ],
}
