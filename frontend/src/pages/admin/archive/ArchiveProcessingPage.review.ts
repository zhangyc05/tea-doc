export const archiveProcessingPageReview = {
  route: '/admin/archive/processing',
  title: '成长档案 / 档案处理',
  goal: '处理尚未形成正式档案事项的记录，完成确认入档、退回、异常标记和补充说明查看。',
  screenshot: '效果图/管理PC端/2成长档案/管理端PC｜成长档案｜档案处理.png',
  sections: [
    '顶部处理统计区',
    '左侧状态和来源筛选',
    '处理记录列表',
    '右侧记录详情',
    '详情处理动作',
  ],
  dataRules: [
    '处理记录来自 archiveStore.processingRecords。',
    '统计卡、状态筛选和来源筛选必须基于同一批处理记录计算。',
    '记录详情由 createArchiveProcessingRecordDetail(selectedRecord) 生成。',
    'recordId query 可指定默认选中记录。',
  ],
  interactions: [
    '点击状态或来源筛选更新中间记录列表。',
    '输入关键字按记录名称或教师姓名过滤。',
    '点击记录行更新右侧详情。',
    '确认入档、再次退回、标记异常必须写回 archiveStore。',
    '查看补充说明展示明确操作反馈。',
  ],
  formRules: [],
  checklist: [
    '顶部统计、筛选列表、记录表格和右侧详情与效果图基本一致',
    '筛选后记录数量、空结果和选中详情不串数据',
    '确认入档后档案查询可读取正式档案事实',
    '退回和异常标记有可见状态反馈',
    '所有按钮都有真实动作或明确反馈',
  ],
}
