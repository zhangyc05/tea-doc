# 教师综合发展平台｜Vue 前端落地 AI 可执行任务手册

> 仓库：`zhangyc05/tea-doc`  
> 适用阶段：效果图与页面规划转 Vue 前端工程  
> 适用对象：后续执行前端落地任务的 AI 代理  
> 当前目标：把已确认的效果图、页面规划、业务规则和视觉风格，转化为可开发、可运行、可维护的 Vue 前端工程。

---

## 0. 文档定位

本文档是教师综合发展平台前端落地阶段的 AI 执行手册。

它不是产品说明书，也不是普通开发计划，而是用于约束后续 AI 执行者的工作边界、任务顺序、文件结构、组件规则、页面还原规则、验收标准和交接方式。

后续 AI 执行任务时，必须优先遵守本文档。

AI 的核心任务不是重新设计产品，而是：

```txt
把已经确认的页面效果图、业务规划和交互口径，转成可开发的 Vue 前端工程。
```

---

## 1. 当前项目阶段判断

当前仓库主要包含：

```txt
1. 产品规划文档
2. 页面设计规格
3. 页面效果图
4. 图片内容校验记录
5. 图片中文命名与交付范围整理
6. 前端落地准备资料
```

当前仓库尚未形成完整 Vue 前端工程。

后续需要在仓库中新增：

```txt
frontend/
```

并在该目录内完成 Vue 3 前端工程搭建、组件体系沉淀和页面逐步还原。

---

## 2. AI 执行总目标

后续 AI 执行者需要完成以下目标：

```txt
1. 建立 frontend/ Vue 前端工程
2. 接入 Vue 3、Vite、TypeScript、Vue Router、Pinia、Tailwind CSS、shadcn-vue、ECharts
3. 建立统一 Layout 体系
4. 建立统一设计 token
5. 建立通用组件体系
6. 建立业务组件体系
7. 建立页面路由地图
8. 建立 mock 数据结构
9. 按任务编号逐页还原效果图
10. 保持页面风格、业务文案、状态口径一致
11. 为后续真实接口联调预留清晰边界
12. 形成可连续交接的 AI 执行记录
```

---

## 3. 固定技术路线

前端固定采用：

```txt
Vue 3
Vite
TypeScript
Vue Router
Pinia
Tailwind CSS
shadcn-vue
ECharts
```

当前阶段不优先采用 Nuxt 3。

原因：本项目当前核心是登录后的业务系统，包括教师端、管理端、成长档案、能力画像、培训管理、企业实践、虚拟教研、AI 分析报告等，不是以 SEO、门户站、公开内容站和服务端渲染为核心的场景。

AI 禁止自行改用：

```txt
Nuxt 3
Element Plus
Ant Design Vue
Naive UI
Vuetify
其他大型 UI 组件库
```

除非用户在后续任务中明确要求调整技术路线。

---

## 4. AI 单次任务执行协议

后续 AI 每次只能执行一个明确任务编号。

禁止一次性执行多个阶段任务。  
禁止跨模块大范围修改。  
禁止在没有任务编号的情况下主动改代码。

每次执行必须遵循：

```txt
读取上下文
→ 确认当前任务编号
→ 判断输入资料是否足够
→ 只修改本任务相关文件
→ 完成自检
→ 更新执行记录
→ 输出执行结果
→ 标记下一步建议任务
```

普通任务建议最多修改 3 - 8 个文件。  
工程初始化任务允许新增多个基础配置文件，但必须在结果中列出文件清单。

如果任务超过 8 个文件，AI 必须说明原因。

---

## 5. AI 执行前必须读取的文件

执行任何前端任务前，AI 必须优先读取：

```txt
1. 本文档
2. 当前仓库阶段说明文档
3. 当前任务对应的页面效果图
4. 当前任务对应的页面规划说明
5. frontend/package.json
6. frontend/src/router/ 下的路由文件
7. frontend/src/layouts/ 下的布局文件
8. frontend/src/components/ 下已有组件
9. frontend/src/styles/ 下的样式与 token 文件
10. frontend/docs/page-route-map.md
11. frontend/docs/ai-task-log.md
```

如果某些文件尚不存在，AI 必须在执行结果中说明：

```txt
该文件当前不存在，本任务已新建 / 本任务暂未涉及。
```

禁止因为文件不存在而编造其内容。

---

## 6. AI 禁止事项

后续 AI 严禁执行以下行为：

```txt
1. 禁止自行切换技术栈
2. 禁止自行改用 Nuxt 3
3. 禁止自行引入 Element Plus、Ant Design Vue、Naive UI 等大型组件库
4. 禁止删除已有产品文档、效果图、校验文档
5. 禁止移动未确认的效果图文件
6. 禁止把管理端左侧菜单改成黑色、深蓝、深灰重后台风格
7. 禁止把教师端文案写成管理端术语
8. 禁止在教师端直接出现“候选数据”
9. 禁止新增没有业务依据的字段、卡片、按钮、统计项
10. 禁止把 AI 建议表达成正式结论
11. 禁止让 AI 自动发布、自动审核、自动确认入档
12. 禁止一次性生成多个无关页面
13. 禁止为了视觉丰富添加无依据图标、插画、大屏风格
14. 禁止把 mock 数据散落在页面组件内部
15. 禁止在页面中大量写死重复样式
16. 禁止绕过已有通用组件重复造组件
17. 禁止为了通过类型检查大面积使用 any
18. 禁止关闭 TypeScript 检查
19. 禁止在 build 失败时宣称任务完成
20. 禁止未经确认直接改动 main 产品文档结构
```

---

## 7. 不确定问题处理规则

AI 遇到不确定问题时，按以下顺序处理：

```txt
1. 优先查找已有文档、效果图、页面规划
2. 优先遵守已确认的用户规则
3. 优先采用更克制、更少字段、更低认知负担的方案
4. 不新增未经确认的业务结论
5. 不擅自补充“看起来合理”的字段
6. 在不影响主流程时继续推进，并在结果中标记待确认
7. 影响主流程时暂停该子项，但继续完成不受影响的部分
```

---

## 8. 前端工程目录规范

前端工程统一放置在：

```txt
frontend/
```

推荐结构：

```txt
frontend/
  package.json
  vite.config.ts
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  components.json

  docs/
    page-route-map.md
    ai-task-log.md

  src/
    main.ts
    App.vue

    router/
      index.ts
      admin.routes.ts
      teacher.routes.ts
      mobile.routes.ts

    stores/
      app.ts
      user.ts
      permission.ts

    layouts/
      AdminLayout.vue
      TeacherPcLayout.vue
      MobileLayout.vue

    components/
      ui/
      layout/
      common/
      business/

    pages/
      admin/
        training/
        archive/
        ability-list/
        ability-profile/
        reports/
      teacher/
      mobile/

    mock/
      admin/
      teacher/
      mobile/

    styles/
      main.css
      tokens.css

    types/
      common.ts
      user.ts
      route.ts
```

---

## 9. 文件修改边界

每次 AI 执行任务时，只能修改当前任务相关文件。

示例：执行 `T2.1 实现 AdminLayout` 时：

允许修改：

```txt
frontend/src/layouts/AdminLayout.vue
frontend/src/components/layout/AdminSidebar.vue
frontend/src/components/layout/AdminTopbar.vue
frontend/src/components/layout/AppBreadcrumb.vue
frontend/src/components/layout/FloatingAIAssistant.vue
frontend/src/router/admin.routes.ts
frontend/src/styles/tokens.css
```

不应修改：

```txt
教师手机端页面
成长档案具体业务页面
分析报告页面
效果图目录
历史产品文档
无关 mock 数据
```

涉及工程初始化的任务允许新增多个基础文件，但必须在执行结果中列出完整文件清单。

---

## 10. 视觉风格总原则

本项目采用：

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

页面上的任何字段、模块、文案和按钮，都必须有明确业务理由。  
没有稳定依据、没有业务必要性、会增加认知负担或无法解释清楚的内容，应删除或下沉。

---

## 11. 精确设计 Token

### 11.1 全局颜色 Token

必须写入：

```txt
frontend/src/styles/tokens.css
```

建议初始值：

```css
:root {
  /* 品牌主色 */
  --color-primary: #2FBF9B;
  --color-primary-hover: #22A889;
  --color-primary-light: #E8F7F2;
  --color-primary-soft: #F2FBF8;

  /* 页面背景 */
  --color-page-bg: #F6F8F7;
  --color-page-bg-soft: #F8FAF9;

  /* 卡片 */
  --color-card-bg: #FFFFFF;
  --color-card-border: #E5EAE7;
  --color-card-border-soft: #EEF2EF;

  /* 文本 */
  --color-text-primary: #1F2933;
  --color-text-secondary: #5B6670;
  --color-text-tertiary: #8A949E;
  --color-text-disabled: #B7C0C8;

  /* 分割线 */
  --color-divider: #E8EDEB;

  /* 状态色 */
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

  /* 能力画像固定色 */
  --color-ability-teaching: #4A90E2;
  --color-ability-research: #F5A623;
  --color-ability-practice: #7ED321;
  --color-ability-service: #BD10E0;
}
```

### 11.2 圆角、阴影、尺寸 Token

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

### 11.3 字号 Token

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

### 11.4 禁止颜色

AI 不得在管理端左侧导航、页面背景、主卡片中使用以下深色作为大面积背景：

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

---

## 12. 管理端 PC 视觉规则

管理端 PC 页面必须遵守：

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

管理端左侧导航必须是浅色风格。  
不得使用黑色、深蓝、深灰大面积底色。

---

## 13. 教师 PC 视觉规则

教师 PC 端应遵守：

```txt
顶部导航：首页｜成长档案｜能力画像｜发展活动｜个人报告
消息铃铛进入系统消息
查看全部待办进入全部待办页
AI 助理位于右下角
页面风格轻量、温和、面向教师
```

教师端不得出现管理端强管控语气。

---

## 14. 手机端视觉规则

手机端设计宽度：

```txt
390px
```

常用高度：

```txt
844px 或长页滚动
```

底部 Tab 固定为：

```txt
待办
档案
AI 助理
活动
我的
```

AI 助理位于底部中间，视觉优先级高于普通 Tab。

不得出现手机外壳、浏览器壳、透视效果。

---

## 15. 文案与术语规则

教师端术语规则：

```txt
候选数据 → 不允许直接出现
待确认记录 / 系统识别记录 / 待确认材料 → 可以使用
提交教学反思 → 不建议
完善一篇教学反思 / 继续整理教学反思 → 推荐
截止时间 → 教学反思场景不使用
影响年度报告 → 没有明确规则时不使用
```

管理端可以使用：

```txt
候选数据
入档确认
规则校验
证据口径
计算规则
识别批次
来源核验
```

AI 相关文案必须体现辅助属性：

```txt
AI 生成草稿
AI 建议
AI 帮你整理
待人工确认
```

禁止表达为：

```txt
AI 已正式判定
AI 自动发布
AI 自动审核通过
AI 已确认入档
```

---

## 16. 组件分层规则

组件分为四层：

```txt
1. ui 基础组件
2. layout 布局组件
3. common 通用组件
4. business 具体业务组件
```

目录：

```txt
frontend/src/components/ui/
frontend/src/components/layout/
frontend/src/components/common/
frontend/src/components/business/
```

---

## 17. ui 基础组件规则

`components/ui/` 由 shadcn-vue 生成或改造。

首批建议组件：

```txt
Button
Card
Badge
Input
Select
Table
Tabs
Dialog
Sheet
DropdownMenu
Tooltip
Popover
Separator
Breadcrumb
```

AI 不得自行替换 shadcn-vue 为其他 UI 库。

---

## 18. layout 布局组件规则

首批布局组件：

```txt
AdminLayout.vue
TeacherPcLayout.vue
MobileLayout.vue
AdminSidebar.vue
AdminTopbar.vue
AppBreadcrumb.vue
MobileTabbar.vue
FloatingAIAssistant.vue
```

布局组件负责：

```txt
页面壳
导航
菜单
顶部栏
面包屑
AI 助理入口
内容区间距
```

布局组件不得写入具体页面业务数据。

---

## 19. common 通用组件规则

首批通用组件：

```txt
PageHeader.vue
StatusBadge.vue
StatCard.vue
FilterBar.vue
DetailSheet.vue
ConfirmDialog.vue
EmptyState.vue
PageCard.vue
DataTable.vue
```

这些组件必须在多个页面中复用。

---

## 20. business 业务组件规则

业务组件按领域组织：

```txt
components/business/training/
components/business/archive/
components/business/ability-profile/
components/business/ability-list/
components/business/report/
components/business/mobile/
```

业务组件可以包含业务字段和业务状态，但不得破坏全局视觉规则。

---

## 21. 组件 API 规格

### 21.1 PageHeader

文件：

```txt
frontend/src/components/common/PageHeader.vue
```

用途：统一页面标题、说明、右侧操作按钮。

Props：

```ts
interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
  primaryActionText?: string
  secondaryActionText?: string
  showBack?: boolean
}
```

Emits：

```ts
interface PageHeaderEmits {
  (e: 'primary-action'): void
  (e: 'secondary-action'): void
  (e: 'back'): void
}
```

规则：

```txt
1. 每个主页面必须使用 PageHeader
2. PageHeader 不承载具体业务列表
3. 页面标题必须与页面中文名一致
4. 说明文案必须简短，不解释复杂业务规则
```

### 21.2 StatusBadge

文件：

```txt
frontend/src/components/common/StatusBadge.vue
```

Props：

```ts
type StatusScene = 'admin' | 'teacher' | 'mobile'

interface StatusBadgeProps {
  status: string
  scene?: StatusScene
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'
}
```

强制规则：

```txt
1. 页面中不得直接使用 Badge 展示业务状态
2. 所有业务状态必须通过 StatusBadge
3. 教师端 scene 必须传 teacher 或 mobile
4. 管理端 scene 必须传 admin
5. 教师端不得显示“候选数据”
```

状态映射示例：

```ts
const teacherStatusTextMap = {
  candidate: '待你确认',
  pendingConfirm: '待你确认',
  recognized: '系统识别',
  archived: '已入档',
  saved: '已保存',
  improvable: '可完善',
  needSupplement: '待补充',
  removed: '已移出',
  processing: '处理中',
  completed: '已完成',
}

const adminStatusTextMap = {
  clue: '线索',
  candidate: '候选数据',
  pendingConfirm: '待确认',
  formal: '正式',
  abnormal: '异常',
  correcting: '纠错中',
  corrected: '已更正',
  reused: '已复用',
  recognizing: '识别中',
  recognized: '识别完成',
  draft: '草稿',
  published: '已发布',
}
```

### 21.3 StatCard

文件：

```txt
frontend/src/components/common/StatCard.vue
```

Props：

```ts
interface StatCardProps {
  title: string
  value: string | number
  description?: string
  trend?: string
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}
```

规则：

```txt
1. 统计卡只能展示当前页面业务对象的统计
2. 不得为了丰富页面新增无依据统计
3. 统计卡最多 4 个
4. 移动端统计卡最多 2 个，超过则下沉
```

### 21.4 FilterBar

文件：

```txt
frontend/src/components/common/FilterBar.vue
```

Props：

```ts
interface FilterOption {
  key: string
  label: string
  type: 'select' | 'date' | 'search'
  placeholder?: string
  options?: Array<{
    label: string
    value: string
  }>
}

interface FilterBarProps {
  searchPlaceholder?: string
  filters?: FilterOption[]
}
```

Emits：

```ts
interface FilterBarEmits {
  (e: 'search', keyword: string): void
  (e: 'change', values: Record<string, string>): void
  (e: 'reset'): void
}
```

规则：

```txt
1. 筛选条件必须来自业务需要
2. 不允许超过 5 个筛选项
3. 无明确价值的筛选项不展示
4. 搜索框优先放左侧，操作按钮放右侧
```

### 21.5 DetailSheet

文件：

```txt
frontend/src/components/common/DetailSheet.vue
```

Props：

```ts
interface DetailSheetProps {
  open: boolean
  title: string
  description?: string
  width?: 'sm' | 'md' | 'lg' | 'xl'
  mode?: 'view' | 'edit' | 'confirm'
}
```

Emits：

```ts
interface DetailSheetEmits {
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}
```

规则：

```txt
1. 抽屉从右侧覆盖页面内容
2. 不改变主页面左右布局
3. 适用于详情、编辑、确认
4. 底部操作区必须固定在抽屉底部
5. 不得把复杂主页面强行塞进抽屉
```

### 21.6 FloatingAIAssistant

文件：

```txt
frontend/src/components/layout/FloatingAIAssistant.vue
```

Props：

```ts
interface FloatingAIAssistantProps {
  scene: 'admin' | 'teacher-pc' | 'mobile'
  defaultOpen?: boolean
}
```

规则：

```txt
1. PC 端固定右下角
2. 手机端位于底部 Tab 中间
3. 文案必须体现辅助属性
4. AI 不自动发布、不自动审核、不自动确认入档
5. 不遮挡核心操作按钮
```

---

## 22. Mock 数据规则

Mock 数据必须集中放置：

```txt
frontend/src/mock/
```

按端和模块拆分：

```txt
mock/admin/training.ts
mock/admin/archive.ts
mock/admin/abilityProfile.ts
mock/admin/abilityList.ts
mock/admin/reports.ts
mock/mobile/todo.ts
mock/mobile/archive.ts
mock/mobile/activity.ts
mock/mobile/my.ts
```

禁止在页面组件中散落大量 mock 数组。

Mock 数据变量命名应清晰：

```txt
trainingResources
trainingDemands
trainingApplications
archiveImportBatches
archiveRecords
schoolAbilityProfile
teacherProfiles
reportCards
mobileTodoItems
mobileArchiveDimensions
```

Mock 数据必须符合已确认业务口径。

例如培训资源类型固定为：

```txt
校内建设
外部机构
企业合作
公开课程
```

资源库统计卡只围绕资源本身统计，不关联需求、计划或匹配情况。

---

## 23. 路由规则

路由文件拆分为：

```txt
frontend/src/router/index.ts
frontend/src/router/admin.routes.ts
frontend/src/router/teacher.routes.ts
frontend/src/router/mobile.routes.ts
```

管理端统一使用：

```txt
/admin
```

教师手机端统一使用：

```txt
/mobile
```

路由元信息建议包含：

```ts
meta: {
  title: string
  module: string
  layout: 'admin' | 'teacher-pc' | 'mobile'
  menuKey?: string
  breadcrumb?: string[]
}
```

首批管理端路由：

```txt
/admin/training/resources
/admin/training/demands
/admin/training/applications
/admin/reports
/admin/archive/import
/admin/archive/import/:batchId
/admin/archive/records
/admin/ability-profile/school
/admin/ability-profile/teachers
/admin/ability-list/execution
```

首批手机端路由：

```txt
/mobile/todo
/mobile/todo/all
/mobile/messages
/mobile/archive
/mobile/archive/:dimension
/mobile/activity
/mobile/my
/mobile/my/profile
/mobile/my/reports
```

---

## 24. 页面还原规则

页面还原优先级：

```txt
1. 业务结构正确
2. 页面信息层级正确
3. 视觉风格统一
4. 组件可复用
5. 与效果图接近
6. 交互动作可模拟
7. 接口联调可后置
```

禁止为了视觉接近而写出不可维护代码。

每个页面开发前，AI 必须确认：

```txt
页面名称：
页面路由：
Vue 文件：
所属端：
所属模块：
对应效果图：
入口来源：
页面目标：
核心用户：
主要数据：
主要状态：
主要操作：
复用组件：
接口依赖：
空状态：
异常状态：
权限要求：
验收标准：
```

如果缺少对应效果图，应标记：

```txt
对应效果图缺失，本任务仅建立结构，不做最终视觉还原。
```

---

## 25. 页面完成标准

页面完成不是指“能显示”。

页面完成必须满足：

```txt
1. 路由可访问
2. 使用正确 Layout
3. 菜单选中状态正确
4. 面包屑正确
5. 页面主标题正确
6. 页面结构与效果图一致
7. 使用统一组件
8. mock 数据集中管理
9. 状态标签使用 StatusBadge
10. 无新增未确认字段
11. 无无意义按钮
12. 无风格跑偏
13. TypeScript 无明显错误
14. npm run build 通过
```

---

## 26. 页面视觉还原自检清单

每个页面完成后，AI 必须按以下清单自检：

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

---

## 27. 页面执行台账

必须新增：

```txt
frontend/docs/page-route-map.md
```

该文件是后续 AI 的页面执行台账。  
每完成一个页面，AI 必须更新该台账。

字段必须包括：

```txt
任务编号
页面中文名
页面路由
Vue 文件路径
所属端
所属模块
对应效果图路径
所属 Layout
依赖组件
mock 文件
页面状态
验收状态
最后更新时间
备注
```

首批页面台账初始内容：

```md
| 任务编号 | 页面中文名 | 页面路由 | Vue 文件路径 | 所属端 | 所属模块 | 对应效果图路径 | 所属 Layout | 依赖组件 | mock 文件 | 页面状态 | 验收状态 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T5.1 | 管理端｜培训管理｜资源库 | /admin/training/resources | src/pages/admin/training/ResourceLibraryPage.vue | 管理端 PC | 培训管理 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, FilterBar, StatusBadge, DetailSheet | src/mock/admin/training.ts | 未开始 | 未验收 | 首个样板页 |
| T5.2 | 管理端｜培训管理｜需求管理 | /admin/training/demands | src/pages/admin/training/DemandManagementPage.vue | 管理端 PC | 培训管理 | 待补充真实路径 | AdminLayout | PageHeader, StatCard, FilterBar, StatusBadge, DetailSheet | src/mock/admin/training.ts | 未开始 | 未验收 | 第二个标准页 |
| T5.3 | 管理端｜培训管理｜申请处理 | /admin/training/applications | src/pages/admin/training/ApplicationReviewPage.vue | 管理端 PC | 培训管理 | 待补充真实路径 | AdminLayout | PageHeader, FilterBar, StatusBadge, DetailSheet | src/mock/admin/training.ts | 未开始 | 未验收 | 轻量申请处理 |
| T5.4 | 管理端｜分析报告｜卡片页 | /admin/reports | src/pages/admin/reports/ReportCardListPage.vue | 管理端 PC | 分析报告 | 待补充真实路径 | AdminLayout | PageHeader, ReportCard, FloatingAIAssistant | src/mock/admin/reports.ts | 未开始 | 未验收 | AI 报告生成入口 |
```

---

## 28. AI 任务执行记录

必须新增：

```txt
frontend/docs/ai-task-log.md
```

每次 AI 完成任务后，追加记录。

记录模板：

```md
# AI 任务执行记录

## 任务编号：Txx.x

任务名称：

执行时间：

执行者：

本次完成：

新增文件：

修改文件：

未完成：

待确认：

build 结果：

自检结果：

下一步建议：
```

每次任务完成后，AI 必须更新：

```txt
1. ai-task-log.md
2. page-route-map.md
3. 当前任务涉及的代码文件
```

如果某任务不涉及页面，则可以不更新 `page-route-map.md`，但必须说明原因。

---

## 29. Git 与提交规则

AI 执行代码任务时，优先新建任务分支。

分支命名：

```txt
frontend/task-任务编号-英文任务名
```

示例：

```txt
frontend/task-T1.1-init-vue
frontend/task-T2.1-admin-layout
frontend/task-T5.1-resource-library
```

如果当前执行环境不支持创建分支，AI 必须在结果中说明：

```txt
当前未创建分支，修改发生在当前工作分支。
```

Commit Message 格式：

```txt
类型(范围): 任务编号 简短说明
```

类型包括：

```txt
feat
fix
docs
refactor
style
chore
test
```

示例：

```txt
feat(frontend): T1.1 init Vue Vite project
feat(layout): T2.1 add admin layout
feat(training): T5.1 add resource library page
docs(frontend): update page route map
```

---

## 30. AI 失败处理协议

### 30.1 文件缺失

如果任务要求读取的文件不存在，AI 不得编造内容。

必须按以下格式说明：

```txt
缺失文件：
- 文件路径：

处理方式：
- 本任务是否需要新建：
- 是否影响当前任务：
- 已采取的保守处理：
```

### 30.2 效果图缺失

如果找不到对应效果图：

```txt
1. 允许先建立页面结构
2. 不允许宣称已经完成视觉还原
3. 页面台账验收状态标记为：待视觉验收
4. 执行结果中说明缺失效果图路径
```

### 30.3 Build 失败

如果 `npm run build` 失败，AI 必须输出：

```txt
Build 结果：失败

失败原因：
- ...

已尝试修复：
- ...

仍未解决：
- ...

是否阻塞当前任务：
- 是 / 否

建议下一步：
- ...
```

禁止在 build 失败时宣称任务完成。

### 30.4 TypeScript 类型错误

TypeScript 类型错误必须优先修复。

如果暂时无法修复：

```txt
1. 不允许使用 any 大面积绕过
2. 不允许关闭 TypeScript 检查
3. 必须标记未完成
4. 必须说明具体错误位置
```

### 30.5 不确定业务字段

如果某个字段没有业务依据：

```txt
1. 不新增
2. 不脑补
3. 不用“看起来合理”的字段填充
4. 优先保持页面克制
5. 在待确认问题中记录
```

---

## 31. 阶段任务清单

### 阶段一：前端工程初始化

#### T1.1 创建 frontend Vue 工程

目标：

```txt
在现有仓库中新建 frontend/，初始化 Vue 3 + Vite + TypeScript 工程。
```

输出：

```txt
frontend/package.json
frontend/vite.config.ts
frontend/tsconfig.json
frontend/src/main.ts
frontend/src/App.vue
```

验收：

```txt
1. frontend/ 目录存在
2. package.json 存在
3. src/main.ts 存在
4. src/App.vue 存在
5. 可运行 npm run dev 或 pnpm dev
6. 不影响原有文档和效果图目录
```

#### T1.2 接入 Tailwind CSS

目标：配置 Tailwind CSS 和全局样式入口。

输出：

```txt
frontend/tailwind.config.ts
frontend/postcss.config.js
frontend/src/styles/main.css
frontend/src/styles/tokens.css
```

验收：

```txt
1. Tailwind 类名可正常生效
2. main.css 已在 main.ts 中引入
3. tokens.css 中定义基础颜色、圆角、阴影变量
4. 默认页面背景为浅色
```

#### T1.3 接入 shadcn-vue

目标：初始化 shadcn-vue，并生成首批 ui 基础组件。

首批组件：

```txt
button
card
badge
input
select
table
tabs
dialog
sheet
dropdown-menu
tooltip
popover
separator
breadcrumb
```

输出：

```txt
frontend/components.json
frontend/src/components/ui/
```

验收：

```txt
1. components.json 存在
2. ui 组件目录存在
3. Button、Card、Badge、Sheet 可正常引入
4. 未引入其他大型 UI 组件库
```

---

### 阶段二：布局体系

#### T2.1 实现 AdminLayout

目标：建立管理端 PC 标准布局。

输出：

```txt
frontend/src/layouts/AdminLayout.vue
frontend/src/components/layout/AdminSidebar.vue
frontend/src/components/layout/AdminTopbar.vue
frontend/src/components/layout/AppBreadcrumb.vue
frontend/src/components/layout/FloatingAIAssistant.vue
```

必须包含：

```txt
1. 左侧浅色导航
2. 顶部栏
3. 面包屑
4. 主内容区
5. 右下角 AI 助理入口
6. 二级菜单展开态
```

禁止：

```txt
1. 黑色侧边栏
2. 深色大屏风格
3. 顶部彩色营销横幅
4. 写入具体业务页面数据
```

#### T2.2 实现 TeacherPcLayout

目标：建立教师 PC 端标准布局。

输出：

```txt
frontend/src/layouts/TeacherPcLayout.vue
```

必须包含：

```txt
首页
成长档案
能力画像
发展活动
个人报告
消息铃铛
AI 助理
```

#### T2.3 实现 MobileLayout

目标：建立教师手机 H5 标准布局。

输出：

```txt
frontend/src/layouts/MobileLayout.vue
frontend/src/components/layout/MobileTabbar.vue
```

必须包含底部 Tab：

```txt
待办
档案
AI 助理
活动
我的
```

---

### 阶段三：通用组件

#### T3.1 PageHeader

输出：

```txt
frontend/src/components/common/PageHeader.vue
```

#### T3.2 StatusBadge

输出：

```txt
frontend/src/components/common/StatusBadge.vue
```

强制验收：教师端不得显示“候选数据”。

#### T3.3 StatCard

输出：

```txt
frontend/src/components/common/StatCard.vue
```

强制验收：统计项必须与页面业务对象一致。

#### T3.4 FilterBar

输出：

```txt
frontend/src/components/common/FilterBar.vue
```

#### T3.5 DetailSheet

输出：

```txt
frontend/src/components/common/DetailSheet.vue
```

#### T3.6 EmptyState

输出：

```txt
frontend/src/components/common/EmptyState.vue
```

---

### 阶段四：页面路由与映射文档

#### T4.1 建立管理端路由

输出：

```txt
frontend/src/router/admin.routes.ts
```

#### T4.2 建立手机端路由

输出：

```txt
frontend/src/router/mobile.routes.ts
```

#### T4.3 建立页面映射文档

输出：

```txt
frontend/docs/page-route-map.md
```

#### T4.4 建立 AI 任务执行记录

输出：

```txt
frontend/docs/ai-task-log.md
```

---

## 32. 首批样板页任务：管理端｜培训管理｜资源库

首个样板页选择：

```txt
管理端｜培训管理｜资源库
```

原因：该页面包含管理端典型结构，包括左侧菜单、顶部栏、面包屑、统计卡片、筛选区、列表、状态标签、操作按钮、右侧抽屉和 AI 助理入口。

### T5.1.1 创建资源库页面路由

修改文件：

```txt
frontend/src/router/admin.routes.ts
```

验收：

```txt
/admin/training/resources 可访问
菜单选中 培训管理 / 资源库
```

### T5.1.2 创建页面文件

新增文件：

```txt
frontend/src/pages/admin/training/ResourceLibraryPage.vue
```

页面结构必须包含：

```txt
PageHeader
StatCard 区域
FilterBar 区域
资源列表区域
DetailSheet
```

### T5.1.3 创建培训资源 mock 数据

新增或修改：

```txt
frontend/src/mock/admin/training.ts
```

必须导出：

```ts
export const trainingResourceStats = []
export const trainingResources = []
```

资源类型固定：

```txt
校内建设
外部机构
企业合作
公开课程
```

### T5.1.4 创建资源详情业务组件

新增：

```txt
frontend/src/components/business/training/TrainingResourceDetailSheet.vue
```

组件规则：

```txt
1. 使用 DetailSheet
2. 不直接写死 mock 数据
3. 从 props 接收 resource
4. 支持关闭
```

### T5.1.5 页面接入组件

ResourceLibraryPage 必须使用：

```txt
PageHeader
StatCard
FilterBar
StatusBadge
TrainingResourceDetailSheet
```

禁止：

```txt
1. 页面内直接写 Badge 展示状态
2. 页面内散落 mock 数组
3. 页面内重复写抽屉结构
```

### T5.1.6 资源库页面最终验收

```md
- [ ] 页面路由可访问
- [ ] 使用 AdminLayout
- [ ] 左侧菜单为浅色
- [ ] 面包屑为：培训管理 / 资源库
- [ ] 统计卡只围绕资源本身
- [ ] 资源类型为四类：校内建设、外部机构、企业合作、公开课程
- [ ] 没有“涉及计划”
- [ ] 没有“匹配需求”
- [ ] 没有“覆盖教师”
- [ ] 没有“推荐命中”
- [ ] 支持打开资源详情抽屉
- [ ] mock 数据集中管理
- [ ] build 通过
```

---

## 33. 第一批后续页面

完成 T5.1 后，再按同样粒度拆分以下页面：

```txt
T5.2 管理端｜培训管理｜需求管理
T5.3 管理端｜培训管理｜申请处理
T5.4 管理端｜分析报告｜卡片页
```

每个页面至少拆为：

```txt
1. 创建路由
2. 创建页面文件
3. 创建 mock 数据
4. 创建必要业务组件
5. 接入通用组件
6. 完成视觉与业务验收
```

---

## 34. 后续批量页面顺序

### 第一批：管理端标准页面

```txt
1. 管理端｜培训管理｜资源库
2. 管理端｜培训管理｜需求管理
3. 管理端｜培训管理｜申请处理
4. 管理端｜分析报告｜卡片页
```

目标：验证管理端标准布局、卡片、筛选、列表、抽屉、AI 助理。

### 第二批：成长档案闭环

```txt
1. 管理端｜成长档案｜导入部门资料｜上传资料页
2. 管理端｜成长档案｜导入批次详情｜识别中
3. 管理端｜成长档案｜导入批次详情｜识别完成
4. 管理端｜成长档案｜入档确认
5. 管理端｜成长档案｜教师档案总览
6. 管理端｜成长档案｜教师档案详情
```

目标：跑通数据导入、AI 识别、候选生成、确认入档、档案查阅闭环。

### 第三批：能力画像

```txt
1. 管理端｜能力画像｜学校画像
2. 管理端｜能力画像｜教师画像查询｜卡片视图
3. 管理端｜能力画像｜教师画像查询｜列表视图
4. 管理端｜能力画像｜教师个人画像详情
```

目标：跑通群体画像到教师个人画像的下钻路径。

### 第四批：能力清单

```txt
1. 管理端｜能力清单｜执行版查看页
2. 管理端｜能力清单｜执行版指标编辑抽屉
3. 管理端｜能力清单｜执行版发布确认
4. 管理端｜能力清单｜基准模版查看页
5. 管理端｜能力清单｜岗位 / 聘期要求映射
6. 管理端｜能力清单｜岗位 / 聘期要求映射编辑抽屉
```

目标：跑通能力清单、执行版、发布确认、岗位聘期映射规则闭环。

### 第五批：教师手机端

```txt
1. 教师端手机｜待办首页
2. 教师端手机｜全部待办
3. 教师端手机｜系统消息
4. 教师端手机｜档案首页
5. 教师端手机｜活动首页
6. 教师端手机｜我的首页
7. 教师端手机｜能力画像
8. 教师端手机｜个人发展报告
```

目标：跑通教师移动端核心使用路径。

---

## 35. AI 执行结果标准格式

每次任务完成后，AI 必须按以下格式回复：

```md
## 任务执行结果

任务编号：
任务名称：

### 本次完成
-

### 新增文件
-

### 修改文件
-

### 未完成内容
-

### 待确认问题
-

### 自检结果
- 路由是否可访问：
- 是否使用正确 Layout：
- 是否符合浅色教育 SaaS 风格：
- 是否使用统一组件：
- 是否存在无依据字段：
- 是否存在术语混用：
- mock 数据是否集中管理：
- TypeScript 是否存在明显错误：
- build 是否通过：

### 下一步建议任务
-
```

---

## 36. AI 执行提示词模板

后续给 AI 派发任务时，建议使用：

```txt
请执行《教师综合发展平台｜Vue 前端落地 AI 可执行任务手册》中的任务【任务编号】。

执行前请先读取：
1. AI 可执行任务手册
2. 当前 frontend 工程结构
3. 当前任务相关页面效果图 / 页面规划
4. 当前已有组件和路由

执行要求：
1. 只完成该任务编号对应内容
2. 不修改无关文件
3. 不新增未经确认的业务字段
4. 不改变技术栈
5. 不改变浅色教育 SaaS 风格
6. 完成后按手册要求输出执行结果和自检结果
```

页面还原提示词模板：

```txt
请基于当前仓库和《AI 可执行任务手册》，还原页面：【页面中文名】。

对应任务编号：
【任务编号】

对应路由：
【页面路由】

对应 Vue 文件：
【Vue 文件路径】

对应效果图：
【效果图路径】

要求：
1. 使用正确 Layout
2. 使用已沉淀通用组件
3. mock 数据放入 src/mock
4. 页面结构优先贴合效果图
5. 不新增无依据字段
6. 不改变已确认文案
7. 不使用深色后台风格
8. 完成后输出修改文件、自检结果、未完成项
```

---

## 37. 当前推荐执行顺序

当前建议按以下顺序执行：

```txt
1. T1.1 创建 frontend Vue 工程
2. T1.2 接入 Tailwind CSS
3. T1.3 接入 shadcn-vue
4. T2.1 实现 AdminLayout
5. T3.1 PageHeader
6. T3.2 StatusBadge
7. T3.3 StatCard
8. T3.4 FilterBar
9. T3.5 DetailSheet
10. T4.1 建立管理端路由
11. T4.3 建立页面映射文档
12. T4.4 建立 AI 任务执行记录
13. T5.1 管理端｜培训管理｜资源库样板页
```

第一轮目标：

```txt
跑通一个管理端标准页面样板。
```

首个样板页：

```txt
管理端｜培训管理｜资源库
```

---

## 38. 最终验收口径

整个前端落地阶段最终验收标准：

```txt
1. frontend 工程可以正常启动
2. frontend 工程可以正常 build
3. 管理端、教师 PC、手机端 Layout 清晰
4. 页面路由地图完整
5. 首批页面均有对应 Vue 文件
6. 首批页面均使用统一组件
7. mock 数据集中管理
8. 页面风格不跑偏
9. 教师端和管理端文案不混用
10. AI 功能始终保持辅助定位
11. 无未经确认的字段堆叠
12. 无无意义统计卡片
13. 无黑色重后台风格
14. 可继续按任务编号交给 AI 执行
15. 每次 AI 执行都有 ai-task-log 记录
16. 页面完成状态能在 page-route-map 中追踪
```

---

## 39. 文档质量评估口径

本文档在写入仓库后，可作为 AI 前端落地任务的正式执行基准。

当前文档质量评估：

```txt
文档结构完整度：高
AI 执行约束：高
视觉防跑偏能力：高
组件规范清晰度：高
任务拆分粒度：高
连续交接能力：高
仓库真实路径绑定：待后续页面台账补充真实效果图路径
```

在完成以下事项后，可视为满分执行基准：

```txt
1. 已创建 frontend/docs/page-route-map.md
2. 已创建 frontend/docs/ai-task-log.md
3. 已补充真实效果图路径
4. 已完成 T5.1 样板页并 build 通过
5. 已将样板页执行经验反向补入本手册
```
