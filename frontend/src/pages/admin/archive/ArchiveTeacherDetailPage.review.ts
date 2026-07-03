export const archiveTeacherDetailPageReview = {
  route: '/admin/archive/teacher/:teacherId',
  title: '成长档案 / 教师档案详情',
  goal: '阅读教师成长档案详情，追溯来源记录，并支持打印和导出模拟记录。',
  screenshot: '效果图/管理PC端/2成长档案/管理端PC｜成长档案｜阅读档案详情.png；效果图/管理PC端/2成长档案/管理端PC｜成长档案｜来源详情.png',
  sections: [
    '顶部返回和工具栏',
    '档案首页头部',
    '档案事实分区',
    '来源记录入口',
    '来源记录抽屉',
  ],
  dataRules: [
    '教师姓名由 route.params.teacherId 映射。',
    '正式档案事实来自 getTeacherArchiveFacts(teacherName)。',
    '来源记录抽屉优先按 selectedFactId 精确过滤，否则按栏目合并展示。',
    '导出 PDF 会写入 archiveStore.exportRecords。',
  ],
  interactions: [
    '返回、关闭回到档案查阅页。',
    '打印调用 window.print()。',
    '导出 PDF 创建导出记录并触发浏览器下载。',
    '点击栏目来源入口打开对应来源记录抽屉。',
    '点击已入档事实卡片打开该事实的来源记录。',
  ],
  formRules: [],
  checklist: [
    '阅读详情和来源详情两种效果图状态均有对应页面结构',
    '教师详情按 teacherId 映射教师姓名和档案事实',
    '来源抽屉能按栏目或单条事实过滤',
    '导出动作有本地记录反馈',
    '返回、打印、导出、来源查看都有明确行为',
  ],
}
