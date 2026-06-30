# ability-group-portrait-assets

教师综合发展平台 / 管理端 / 能力画像 / 群体画像页面资源包。

## 推荐放置路径

```text
src/assets/admin/ability-group-portrait-assets/
```

## 目录结构

```text
ability-group-portrait-assets/
  icons/
    icon-index-*.svg          综合发展指数 / 基本能力 / 首年基线
    icon-ability-*.svg        教学、教研、实践、服务能力维度图标
    icon-level-*.svg          新手、胜任、骨干、名师等级图标
    icon-support-*.svg        发展支持方向图标
    icon-focus-*.svg          重点关注对象类型图标
    icon-tab-*.svg            院系 / 专业 / 教师切换图标
    icon-action-*.svg         查看画像等操作图标
  ability-group-portrait-hero-art.png
  ability-group-portrait-hero-emblem.svg
  ability-group-portrait-empty.svg
  ability-group-portrait-error.svg
  README.md
  manifest.json
```

## 能力维度颜色建议

| 维度 | 文件 | 建议颜色 |
|---|---|---|
| 教学能力 | icon-ability-teaching.svg | #4A90E2 |
| 教研能力 | icon-ability-research.svg | #F5A623 |
| 实践能力 | icon-ability-practice.svg | #22A060 |
| 服务能力 | icon-ability-service.svg | #7B61FF |
| 基本能力 | icon-basic-qualified.svg | #20B15A |

## 不建议图片化的页面元素

- 左侧菜单、顶部栏、面包屑
- 发展指数数字、年度基线时间轴
- 雷达图主体、分布条、表格
- 发展支持方向卡片容器与文字
- 重点关注对象表格、Tab、按钮
- 信息提示 icon 旁的 tooltip 内容

这些应由 Vue 组件、ECharts/SVG 图表、CSS 和数据绑定实现。
