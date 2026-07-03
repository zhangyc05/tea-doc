export const abilityProfileTeacherPageReview = {
  route: '/admin/ability-profile/teacher',
  title: '能力画像 / 教师画像列表',
  goal: '按学院、职称、教师类型和关注类型筛选教师画像，并进入单个教师画像详情。',
  screenshot: '效果图/管理PC端/3能力画像/管理端PC｜能力画像｜教师画像查询｜列表视图.png；效果图/管理PC端/3能力画像/管理端PC｜能力画像｜教师画像查询｜卡片视图.png',
  sections: [
    '顶部筛选栏',
    '教师画像列表标题',
    '卡片视图',
    '列表视图',
    '分页栏',
  ],
  dataRules: [
    '教师列表、学院、职称、教师类型和关注类型来自 getAbilityProfileTeacherListMock()。',
    'focus query 参数用于初始化关注类型筛选。',
    'filteredTeachers 同时受搜索、学院、职称、教师类型和关注类型约束。',
    '分页只展示 filteredTeachers 当前页切片，不额外新增后端状态。',
  ],
  interactions: [
    '搜索或筛选变更后回到第一页。',
    '重置恢复默认筛选和第一页。',
    '卡片视图和列表视图通过 viewMode 在同页切换。',
    '进入画像跳转 /admin/ability-profile/teacher/:teacherId。',
    '分页按钮仅在有效页码范围内切换。',
  ],
  formRules: [],
  checklist: [
    '筛选栏、视图切换、列表/卡片和分页结构与效果图基本一致',
    'focus=重点支持 能默认筛选重点支持教师',
    '搜索和多条件筛选能更新列表数量',
    '进入画像可跳转教师详情',
    '分页不会越界',
  ],
}
