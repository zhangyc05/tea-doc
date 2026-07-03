export const abilityProfileTeacherDetailPageReview = {
  route: '/admin/ability-profile/teacher/:teacherId',
  title: '能力画像 / 教师画像详情',
  goal: '查看单个教师的能力画像详情，呈现综合指数、首年基线、能力结构和支持方向。',
  screenshot: '效果图/管理PC端/3能力画像/管理端PC｜能力画像｜教师个人画像详情.png',
  sections: [
    '面包屑与返回入口',
    '教师信息头图',
    '综合发展指数',
    '首年基线',
    '能力结构分析',
    '能力维度说明',
    '支持方向',
  ],
  dataRules: [
    '教师详情按 route.params.teacherId 读取 getAbilityProfileTeacherDetailMock()。',
    '教师画像由 calculateTeacherAbilityProfile() 基于教师档案事实和执行版能力清单计算。',
    '雷达图、能力维度和支持方向都来自同一教师画像结果。',
    '切换教师和返回列表都回到教师画像列表页。',
  ],
  interactions: [
    '返回教师画像列表跳转 /admin/ability-profile/teacher。',
    '切换教师跳转 /admin/ability-profile/teacher。',
    '面包屑教师画像入口保持真实路由。',
  ],
  formRules: [],
  checklist: [
    '教师头图、指数卡、基线、雷达图和支持方向与效果图基本一致',
    '按 teacherId 展示对应教师画像',
    '画像数据基于教师档案事实和执行版能力清单计算',
    '返回和切换教师入口可用',
    '能力维度表不出现空数据或伪操作',
  ],
}
