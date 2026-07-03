export const reflectionDetailPageReview = {
  route: '/admin/reflection/:reflectionId',
  title: '发展活动 / 教学反思详情',
  goal: '查看单条教学反思内容、来源数据、相关反思记录，并生成成长档案待确认记录。',
  screenshot: '效果图/管理PC端/4发展活动/1教学反思/管理端PC｜发展活动｜教学反思｜反思详情.png',
  sections: [
    '面包屑与返回入口',
    '反思标题卡',
    '教学反思内容',
    '相关反思记录',
    '右侧记录信息、来源数据和记录去向',
  ],
  dataRules: [
    '详情按 route.params.reflectionId 读取 reflectionStore 记录。',
    '反思内容、默认来源数据和相关反思来自 getReflectionDetailMock()。',
    '若记录带 sourceMaterials，应优先展示记录自己的来源材料。',
    '生成档案待确认记录必须调用 sendReflectionToArchive()。',
  ],
  interactions: [
    '返回列表回到 /admin/reflection。',
    '查看来源数据在当前页展示来源反馈。',
    '相关反思查看跳转对应详情。',
    '查看更多相关记录回到反思概览并带 keyword query。',
    '生成档案待确认记录写入成长档案处理队列。',
  ],
  formRules: [],
  checklist: [
    '标题卡、内容区和右侧信息与效果图基本一致',
    '按 reflectionId 展示对应反思记录',
    '来源数据反馈可见',
    '相关反思和更多相关记录入口可用',
    '生成档案待确认记录形成业务闭环',
  ],
}
