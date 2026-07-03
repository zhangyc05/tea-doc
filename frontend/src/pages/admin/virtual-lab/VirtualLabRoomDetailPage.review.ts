export const virtualLabRoomDetailPageReview = {
  route: '/admin/virtual-lab/rooms/:roomId',
  title: '发展活动 / 虚拟教研室详情',
  goal: '查看教研室成员、近期活动和已形成记录，并管理成员和新建教研活动。',
  screenshot: '效果图/管理PC端/4发展活动/4虚拟教研/管理端PC｜虚拟教研｜教研活动管理.png',
  sections: [
    '教研室信息卡',
    '统计卡',
    '成员表格',
    '近期教研活动表格',
    '已形成记录列表',
  ],
  dataRules: [
    '教研室详情按 route.params.roomId 读取 virtualLabStore。',
    '成员、活动和记录分别按 roomId 从共享状态筛选。',
    '邀请教师、移出成员和新建活动都必须调用 virtualLabStore action。',
    '近期活动和记录入口使用真实活动 / 记录 id 跳转。',
  ],
  interactions: [
    '编辑信息在当前页显示校对反馈。',
    '邀请教师写入成员状态并显示反馈。',
    '新建教研活动写入活动列表并显示反馈。',
    '查看活动跳转 /admin/virtual-lab/activities/:activityId。',
    '查看记录跳转 /admin/virtual-lab/records/:recordId。',
  ],
  formRules: [],
  checklist: [
    '教研室信息、统计、成员、活动和记录结构与效果图基本一致',
    '按 roomId 展示对应教研室数据',
    '邀请、移出和新建活动能写入共享状态',
    '查看活动和查看记录入口可用',
    '分页视觉态不伪装成真实分页动作',
  ],
}
