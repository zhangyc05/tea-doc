# archive-query-assets

教师综合发展平台 / 管理端 / 成长档案 / 档案查询页面资源包。

## 推荐放置路径

```text
src/assets/admin/archive-query-assets/
```

## 目录结构

```text
archive-query-assets/
  icons/
    icon-stat-*.svg       顶部统计卡图标
    icon-filter-*.svg     筛选条件图标
    icon-view-*.svg       视图切换图标
    icon-action-*.svg     搜索 / 重置等操作图标
    icon-tag-*.svg        卡片标签辅助图标
  avatars/
    avatar-teacher-*.svg  教师卡片默认头像 / Demo 头像
  archive-query-hero-art.png
  archive-query-hero-emblem.svg
  archive-query-empty.svg
  archive-query-error.svg
  README.md
  manifest.json
```

## 顶部统计卡图标映射

| 文件 | 页面指标 |
|---|---|
| icon-stat-queryable-teacher.svg | 可查询教师 |
| icon-stat-recent-update.svg | 近期有更新 |
| icon-stat-content-complete.svg | 内容待完善 |
| icon-stat-correction.svg | 有更正记录 |

## 不建议图片化的页面元素

- 左侧菜单、顶部栏、面包屑
- 搜索框、下拉筛选器、重置按钮
- 教师档案摘要卡片容器
- 教师姓名、学院、职称、聘期、更新日期
- 卡片标签、按钮、网格 / 列表切换
- 统计数字、筛选结果、分页

这些应由 Vue 组件 + CSS + 数据绑定实现。
