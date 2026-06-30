# archive-processing-assets

教师综合发展平台 / 管理端 / 成长档案 / 档案处理页面资源包。

## 目录说明

```text
archive-processing-assets/
  icons/
    icon-status-*.svg       档案处理状态图标
    icon-source-*.svg       来源类型图标
    icon-file-*.svg         文件类型图标
  archive-processing-hero-art.png
  archive-processing-hero-emblem.svg
  archive-processing-empty.svg
  archive-processing-error.svg
```

## 状态图标映射建议

| 文件 | 业务状态 | 建议颜色 |
|---|---|---|
| icon-status-pending-confirm.svg | 待确认 | blue |
| icon-status-pending-verify.svg | 待核验 | green |
| icon-status-pending-complete.svg | 待补充 | orange |
| icon-status-exception.svg | 异常待处理 | red |
| icon-status-withdrawing.svg | 拟退中 | purple |
| icon-status-archived.svg | 已入档 | teal / green |

## 来源图标映射建议

| 文件 | 来源类型 |
|---|---|
| icon-source-all.svg | 全部来源 |
| icon-source-development.svg | 发展活动 |
| icon-source-department-upload.svg | 部门上报 |
| icon-source-teaching-research.svg | 教研成果 |
| icon-source-public-collection.svg | 公开征集 |
| icon-source-research-report.svg | 科研申报 |

## 使用建议

1. 页面中不要直接写死图标路径，建议用状态枚举 / 来源枚举统一映射。
2. 状态标签、按钮、表格、卡片、分页等不要图片化，应使用组件和 CSS 实现。
3. `archive-processing-hero-art.png` 适合放在顶部 Banner 右侧。
4. `archive-processing-hero-emblem.svg` 适合放在顶部 Banner 左侧主图标。
5. 所有 SVG 均为独立资源，可直接放入 Vue / Vite 项目的 `src/assets/admin/archive-processing-assets` 目录。
