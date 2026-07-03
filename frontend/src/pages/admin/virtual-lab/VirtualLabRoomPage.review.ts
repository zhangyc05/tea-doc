export const virtualLabRoomPageReview = {
  route: '/admin/virtual-lab',
  title: '发展活动 / 虚拟教研室管理',
  goal: '管理虚拟教研室列表，支持筛选、卡片/表格切换、新建教研室和进入教研室详情。',
  screenshot: '效果图/管理PC端/4发展活动/4虚拟教研/管理端PC｜虚拟教研｜教研室管理.png',
  sections: [
    '顶部统计卡',
    '教研室筛选栏',
    '卡片视图',
    '表格视图',
  ],
  dataRules: [
    '教研室、活动和记录统计来自 virtualLabStore。',
    '筛选结果由院系、专业群、活动情况和搜索关键字共同决定。',
    '卡片视图和表格视图共用同一批 filteredRooms。',
    '新建教研室必须调用 createVirtualLabRoom() 并写回共享状态。',
  ],
  interactions: [
    '查询应用搜索关键字并显示筛选反馈。',
    '重置恢复默认筛选并显示反馈。',
    '新建教研室后恢复卡片视图并显示操作反馈。',
    '查看详情跳转 /admin/virtual-lab/rooms/:roomId。',
  ],
  formRules: [],
  checklist: [
    '统计卡、筛选栏、卡片和表格视图与效果图基本一致',
    '筛选、查询、重置能更新列表',
    '新建教研室写入共享状态',
    '卡片/表格视图切换不丢失筛选结果',
    '查看详情入口可用',
  ],
}
