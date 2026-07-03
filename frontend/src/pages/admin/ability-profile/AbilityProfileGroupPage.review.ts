export const abilityProfileGroupPageReview = {
  route: '/admin/ability-profile/group',
  title: '能力画像 / 群体画像',
  goal: '展示全校或分组维度的能力画像，定位重点关注对象，并进入教师画像或教师列表继续处理。',
  screenshot: '效果图/管理PC端/3能力画像/管理端PC｜能力画像｜群体画像｜学校画像.png',
  sections: [
    '综合发展指数',
    '首年基线',
    '能力结构分析',
    '能力维度说明',
    '发展支持方向',
    '重点关注对象',
  ],
  dataRules: [
    '群体画像由 calculateAbilityProfileGroup() 基于 archiveStore.teacherArchiveFacts 和 abilityListStore.executionIndicators 计算。',
    '能力维度、发展支持方向和重点关注对象来自能力画像 mock service 的计算结果。',
    '重点关注对象切换只改变当前页筛选态，不新建独立列表页。',
    '教师对象查看画像必须跳转到 /admin/ability-profile/teacher/:teacherId。',
  ],
  interactions: [
    '查看完整建议跳转教师画像列表，并带 focus=重点支持 查询参数。',
    '重点关注对象 tab 切换后更新当前分组表格和选中对象。',
    '查看画像对教师对象进入教师画像详情，对院系/专业对象在本页定位并显示反馈。',
    '查看更多对象不伪装成未实现跳转，应显示当前页降级反馈。',
  ],
  formRules: [],
  checklist: [
    '综合指数、基线、雷达图和维度表结构与效果图基本一致',
    '数据来自成长档案事实和执行版能力清单计算结果',
    '重点关注对象切换、定位和教师详情跳转可用',
    '查看完整建议能进入教师列表重点支持筛选态',
    '空对象状态有明确空态展示',
  ],
}
