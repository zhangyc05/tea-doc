# 管理端页面第一轮精修任务｜去除重复顶部说明区

## 1. 任务背景

当前管理端已经完成多个模块的粗实现，包括能力清单、成长档案、能力画像、教学反思、培训管理、企业实践、虚拟教研室、分析报告等。

粗实现阶段中，很多页面在内容区顶部额外添加了类似以下结构：

```txt
页面内面包屑
页面标题
说明文案
```

但管理端已经有统一顶部栏展示当前位置，页面内容区不应再重复一块独立说明区。

本轮精修目标：

```txt
统一删除内容区内不必要的顶部说明区，让页面直接从主业务卡片、统计卡、Hero 或列表区域开始。
```

参考标准：

```txt
能力清单 / 执行版页面。
```

执行版页面没有额外的独立说明区，页面进入后直接展示执行版主卡片。

## 2. 统一判断规则

### 2.1 必须删除的内容

凡是在页面内容区顶部出现以下结构，且只是重复导航和解释页面用途的，都删除：

```vue
<section class="page-header">
  <div class="breadcrumb">...</div>
  <h1 class="page-title">...</h1>
  <p class="page-description">...</p>
</section>
```

或：

```vue
<div class="page-breadcrumb">...</div>
<div class="page-description">...</div>
```

或其他等价结构：

```txt
顶部说明区
页面说明
独立面包屑说明区
纯说明型 page-header
```

### 2.2 可以保留的内容

以下内容不能删除：

```txt
主业务 Hero 卡片
统计卡片
筛选区
列表标题
详情页返回按钮
详情页主体标题
关键状态标签
页面主操作按钮
```

### 2.3 有按钮的顶部区域如何处理

如果顶部说明区内有主操作按钮，例如：

```txt
新建教研室
新建培训计划
导入部门资料
```

不要直接删除按钮。

处理方式：

```txt
删除面包屑、标题和说明文案；
把按钮移动到下一个业务区块的右上角，或统计卡区域上方的操作栏。
```

### 2.4 详情页如何处理

详情页可以保留：

```txt
返回列表 / 返回上一页
详情标题
状态标签
关键摘要信息
```

但不要在详情页顶部再放一块重复的页面内面包屑说明。

## 3. 第一优先级页面

### 3.1 能力清单 / 基准模板

文件：

```txt
frontend/src/pages/admin/ability-list/AbilityListBasePage.vue
```

删除：

```vue
<!-- 顶部说明区 -->
<div class="page-breadcrumb">
  能力清单 / 基准模板
</div>
<div class="page-description">
  维护学校长期使用的教师能力标准，用于派生年度、聘期或建设周期执行版。
</div>
```

删除对应无用 CSS：

```txt
.page-breadcrumb
.page-description
```

验收：

```txt
/admin/ability-list/base 打开后直接从“教师能力清单基准模板 V1.0”主卡片开始。
```

### 3.2 能力画像 / 群体画像

文件：

```txt
frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue
```

删除页面顶部独立：

```txt
能力画像 / 群体画像
学校画像
基于已发布执行版能力清单和正式档案事实...
```

页面应直接从：

```txt
综合发展指数
首年基线
```

这两张主卡片开始。

### 3.3 企业实践 / 年度实践跟踪

文件：

```txt
frontend/src/pages/admin/practice/PracticeTrackingPage.vue
```

删除页面顶部独立：

```txt
企业实践 / 年度实践跟踪
年度实践跟踪
根据 2026 年度教师企业实践 30 天完成情况...
```

页面应直接从年度完成情况和当前办理情况统计卡开始。

### 3.4 虚拟教研室 / 教研室管理

文件：

```txt
frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue
```

删除页面顶部独立：

```txt
虚拟教研室
虚拟教研室
按教研室查看线上教研开展情况...
```

保留「新建教研室」按钮，但移动到统计卡区域上方或筛选区右侧。

页面应直接从统计卡开始：

```txt
教研室总数
覆盖院系
进行中活动
已形成记录
```

### 3.5 教学反思 / 概览

文件：

```txt
frontend/src/pages/admin/reflection/ReflectionOverviewPage.vue
```

删除页面顶部仅包含面包屑的空 header：

```txt
发展活动 / 教学反思
```

页面应直接从统计卡开始：

```txt
反思记录数
覆盖教师
覆盖课程
主要触发来源
```

## 4. 第二优先级：全量扫描并处理

请继续扫描以下目录下所有 Vue 页面：

```txt
frontend/src/pages/admin/archive/
frontend/src/pages/admin/ability-profile/
frontend/src/pages/admin/reflection/
frontend/src/pages/admin/training/
frontend/src/pages/admin/practice/
frontend/src/pages/admin/virtual-lab/
frontend/src/pages/admin/reports/
```

查找以下 class 或注释：

```txt
page-header
page-breadcrumb
page-description
breadcrumb
页面头部
顶部说明区
```

处理原则：

```txt
1. 如果只是重复顶部栏信息，删除。
2. 如果只是说明页面用途，删除。
3. 如果包含重要按钮，把按钮迁移到业务区块操作区后再删除 header。
4. 如果是详情页的返回按钮和业务标题，保留，但删除重复面包屑。
5. 删除后清理无用 CSS。
```

## 5. 不要修改的内容

```txt
不要修改左侧菜单结构。
不要修改路由结构。
不要删除业务数据、统计卡、表格、筛选项、详情内容。
不要修改 AdminTopbar。
不要修改 AdminLayout。
不要改动教师端或手机端。
不要进行大规模视觉重构。
不要把页面改成深色风格。
```

## 6. 视觉目标

精修后页面应该更加紧凑，符合当前管理端基准风格：

```txt
顶部栏显示当前位置。
内容区不重复面包屑。
内容区第一屏直接展示业务主内容。
有主卡片的页面，从主卡片开始。
有统计卡的页面，从统计卡开始。
详情页保留返回和标题，但不重复面包屑说明。
```

## 7. 验收页面

至少检查以下页面：

```txt
/admin/ability-list/base
/admin/ability-profile/group
/admin/reflection
/admin/practice/tracking
/admin/virtual-lab
/admin/training/plans
/admin/archive/processing
/admin/reports
```

验收标准：

```txt
1. 页面内容区顶部不再出现重复面包屑说明块。
2. 页面不出现大块空白说明区域。
3. 页面主内容上移，首屏信息密度提升。
4. 原有按钮和交互不丢失。
5. typecheck 通过。
6. build 通过。
```

## 8. 完成后反馈

请反馈：

```txt
1. 修改文件清单。
2. 每个页面删除了哪些顶部说明区。
3. 哪些按钮被迁移到了哪里。
4. 是否清理无用 CSS。
5. typecheck 结果。
6. build 结果。
7. 提供重点页面截图：
   - /admin/ability-list/base
   - /admin/ability-profile/group
   - /admin/practice/tracking
   - /admin/virtual-lab
```
