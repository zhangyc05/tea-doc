# 02｜设计 Token 与视觉规范

> 本文件用于防止后续 AI 在页面实现中出现风格跑偏，尤其是管理端左侧菜单变黑、页面变成重后台、大屏化或营销化。

## 1. 总体视觉原则

```txt
浅色薄荷绿教育 SaaS 风格
白色圆角卡片
细边框
轻阴影
低压、可信、专业
```

禁止风格：

```txt
黑色后台
深色大屏
营销页
玻璃拟态
过度插画
高饱和彩色拼贴
重型政务系统风格
```

页面上的任何字段、模块、文案和按钮，都必须有明确业务理由。没有稳定依据、没有业务必要性、会增加认知负担或无法解释清楚的内容，应删除或下沉。

## 2. 全局颜色 Token

必须写入：

```txt
frontend/src/styles/tokens.css
```

```css
:root {
  --color-primary: #2FBF9B;
  --color-primary-hover: #22A889;
  --color-primary-light: #E8F7F2;
  --color-primary-soft: #F2FBF8;

  --color-page-bg: #F6F8F7;
  --color-page-bg-soft: #F8FAF9;

  --color-card-bg: #FFFFFF;
  --color-card-border: #E5EAE7;
  --color-card-border-soft: #EEF2EF;

  --color-text-primary: #1F2933;
  --color-text-secondary: #5B6670;
  --color-text-tertiary: #8A949E;
  --color-text-disabled: #B7C0C8;

  --color-divider: #E8EDEB;

  --color-success: #2FBF71;
  --color-success-bg: #EAF8F0;

  --color-warning: #F5A623;
  --color-warning-bg: #FFF6E5;

  --color-danger: #E85D5D;
  --color-danger-bg: #FDECEC;

  --color-info: #4A90E2;
  --color-info-bg: #EAF3FE;

  --color-purple: #8B5CF6;
  --color-purple-bg: #F2EEFF;

  --color-neutral: #6B7280;
  --color-neutral-bg: #F3F4F6;

  --color-ability-teaching: #4A90E2;
  --color-ability-research: #F5A623;
  --color-ability-practice: #7ED321;
  --color-ability-service: #BD10E0;
}
```

## 3. 圆角、阴影、尺寸 Token

```css
:root {
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;

  --shadow-card: 0 4px 14px rgba(31, 41, 51, 0.05);
  --shadow-card-hover: 0 8px 24px rgba(31, 41, 51, 0.08);
  --shadow-floating: 0 12px 32px rgba(31, 41, 51, 0.14);

  --admin-sidebar-width: 224px;
  --admin-topbar-height: 60px;
  --admin-content-max-width: 1280px;

  --teacher-pc-content-max-width: 1280px;

  --mobile-design-width: 390px;
  --mobile-tabbar-height: 64px;
}
```

## 4. 字号 Token

```css
:root {
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-md: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-loose: 1.75;
}
```

## 5. 禁止颜色

管理端左侧导航、页面背景、主卡片中不得使用以下深色作为大面积背景：

```txt
#000000
#0F172A
#111827
#1F2937
#111111
#1E293B
#172033
#101828
```

如果 shadcn-vue 默认样式导致深色侧边栏，必须改为浅色。

## 6. 管理端 PC 视觉规则

```txt
画布建议：1440px 宽
复杂页面可支持 1440px × 1024px 或更长滚动
左侧导航宽度：208px - 240px，默认 224px
顶部栏高度：56px - 64px，默认 60px
内容区背景：极浅灰或极浅薄荷绿
卡片背景：白色
卡片圆角：10px - 14px，默认 12px
卡片边框：浅灰细边框
卡片阴影：轻阴影
主色：薄荷绿 / 青绿色
```

管理端左侧导航必须是浅色风格，不得使用黑色、深蓝、深灰大面积底色。

## 7. 教师 PC 视觉规则

```txt
顶部导航：首页｜成长档案｜能力画像｜发展活动｜个人报告
消息铃铛进入系统消息
查看全部待办进入全部待办页
AI 助理位于右下角
页面风格轻量、温和、面向教师
```

教师端不得出现管理端强管控语气。

## 8. 手机端视觉规则

```txt
设计宽度：390px
常用高度：844px 或长页滚动
底部 Tab：待办｜档案｜AI 助理｜活动｜我的
AI 助理位于底部中间
不出现手机外壳、浏览器壳、透视效果
```

## 9. 页面视觉还原自检清单

```md
- [ ] 页面使用正确 Layout
- [ ] 左侧菜单风格正确
- [ ] 顶部栏高度和结构正确
- [ ] 面包屑层级正确
- [ ] 页面标题正确
- [ ] 页面主内容结构与效果图一致
- [ ] 卡片风格为白底、圆角、细边框、轻阴影
- [ ] 主色使用薄荷绿 / 青绿色
- [ ] 未出现黑色重后台风格
- [ ] 未出现无依据统计卡
- [ ] 未出现无依据按钮
- [ ] 状态标签使用 StatusBadge
- [ ] mock 数据集中放在 src/mock
- [ ] 页面无明显横向溢出
- [ ] 页面在 1440px 宽度下展示正常
- [ ] 如为手机端，390px 宽度下展示正常
```
