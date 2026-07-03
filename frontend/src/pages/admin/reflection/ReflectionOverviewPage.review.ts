export const reflectionOverviewPageReview = {
  route: '/admin/reflection',
  title: '发展活动 / 教学反思概览',
  goal: '汇总教学反思记录，按组织、学期、触发来源和关键字筛选，并定位共性问题相关记录。',
  screenshot: '效果图/管理PC端/4发展活动/1教学反思/管理端PC｜发展活动｜教学反思｜反思概览.png',
  sections: [
    '顶部统计卡',
    '教学反思记录筛选栏',
    '教学反思记录表格',
    '右侧共性观察',
  ],
  dataRules: [
    '统计、筛选项、共性问题和默认反思记录来自 getReflectionOverviewMock()。',
    '教师端或其他模块生成的反思记录来自 reflectionStore，并与默认记录按 id 去重合并。',
    'keyword query 参数用于初始化搜索关键字和问题定位提示。',
    '筛选结果由组织范围、触发来源和关键字共同决定。',
  ],
  interactions: [
    '查看进入 /admin/reflection/:reflectionId。',
    '重置恢复默认筛选并清除问题定位。',
    '查看相关记录将共性问题写入搜索关键字并保留在当前页。',
  ],
  formRules: [],
  checklist: [
    '统计卡、筛选栏、记录表和共性观察与效果图基本一致',
    'keyword query 能初始化问题定位筛选',
    '筛选和重置能更新记录列表',
    '查看详情能进入反思详情页',
    '空结果展示明确空态',
  ],
}
