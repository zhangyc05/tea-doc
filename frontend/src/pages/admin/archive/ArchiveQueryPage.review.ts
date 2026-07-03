export const archiveQueryPageReview = {
  route: '/admin/archive/query',
  title: '成长档案 / 档案查阅',
  goal: '按教师、学院、职称和更新情况查询成长档案，并进入教师档案详情。',
  screenshot: '效果图/管理PC端/2成长档案/管理端PC｜成长档案｜教师档案查阅.png',
  sections: [
    '顶部档案查阅统计区',
    '搜索和筛选区',
    '视图切换',
    '教师档案卡片列表',
    '空结果状态',
  ],
  dataRules: [
    '统计、筛选选项和教师卡片来自 getArchiveQueryMock()。',
    '搜索只有点击搜索后写入 submittedSearchKeyword 并参与过滤。',
    '学院、职称、更新情况筛选共同作用于教师列表。',
    '教师头像按 teacherAvatarMap 映射。',
  ],
  interactions: [
    '搜索按钮应用当前关键字。',
    '重置按钮清空关键字和所有筛选。',
    '卡片 / 列表视图切换只改变展示密度。',
    '查看档案跳转 /admin/archive/teacher/:teacherId。',
  ],
  formRules: [],
  checklist: [
    '统计区、筛选区和教师卡片与效果图基本一致',
    '搜索、筛选和重置能更新列表',
    '空结果展示统一空态',
    '查看档案能进入对应教师详情',
    '视图切换不改变筛选结果',
  ],
}
