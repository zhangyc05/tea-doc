# 管理端能力画像模块｜第一批页面实现任务

## 1. 任务目标

根据用户上传的 `3能力画像.zip` 中 4 张效果图，实现管理端 PC「能力画像」模块第一批页面。

本批先做粗实现：先把内容、路由和页面链路实现完整，后续再统一做视觉精修。

```txt
能力画像 / 群体画像 / 学校画像
能力画像 / 教师画像 / 列表视图
能力画像 / 教师画像 / 卡片视图
能力画像 / 教师画像 / 教师个人画像详情
```

文字模型不能识别图片，因此实现时必须以本文档为准，不得根据页面名称自由设计。

## 2. 本批对应效果图

```txt
管理端PC｜能力画像｜群体画像｜学校画像.png
管理端PC｜能力画像｜教师画像查询｜列表视图.png
管理端PC｜能力画像｜教师画像查询｜卡片视图.png
管理端PC｜能力画像｜教师个人画像详情.png
```

## 3. 当前仓库边界

当前左侧菜单已经包含：

```txt
能力画像
- 群体画像
- 教师画像
```

不要修改左侧菜单结构，不要新增更多二级菜单。

当前侧栏路由目标为：

```txt
/admin/ability-profile/group
/admin/ability-profile/teacher
```

如果当前路由仍是占位页，需要替换为真实页面。

## 4. 需要新增页面文件

```txt
frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue
```

## 5. 需要修改路由

修改：

```txt
frontend/src/router/admin.routes.ts
```

新增 lazy import：

```ts
const AbilityProfileGroupPage = () => import('@/pages/admin/ability-profile/AbilityProfileGroupPage.vue')
const AbilityProfileTeacherPage = () => import('@/pages/admin/ability-profile/AbilityProfileTeacherPage.vue')
const AbilityProfileTeacherDetailPage = () => import('@/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue')
```

路由映射：

```txt
/admin/ability-profile/group               → AbilityProfileGroupPage.vue
/admin/ability-profile/teacher             → AbilityProfileTeacherPage.vue
/admin/ability-profile/teacher/:teacherId  → AbilityProfileTeacherDetailPage.vue
```

meta：

```ts
/admin/ability-profile/group:
  title: '群体画像'
  module: '能力画像'
  layout: 'admin'
  menuKey: 'ability-profile-group'

/admin/ability-profile/teacher:
  title: '教师画像'
  module: '能力画像'
  layout: 'admin'
  menuKey: 'ability-profile-teacher'

/admin/ability-profile/teacher/:teacherId:
  title: '教师个人画像'
  module: '能力画像'
  layout: 'admin'
  menuKey: 'ability-profile-teacher'
```

所有页面都必须包裹：

```vue
<AdminLayout active-key="ability-profile-group">
  ...
</AdminLayout>
```

或：

```vue
<AdminLayout active-key="ability-profile-teacher">
  ...
</AdminLayout>
```

## 6. 统一实现规则

### 6.1 粗实现标准

本批不追求像素级还原，只要求：

```txt
页面可访问
AdminLayout 完整显示
左侧能力画像菜单展开
对应二级菜单高亮
效果图中的主要模块、字段、按钮、状态出现
基础交互可走通
npm run typecheck 通过
npm run build 通过
```

### 6.2 视觉风格

保持当前管理端蓝白教育治理 SaaS 风格。

优先复用：

```txt
AdminLayout
admin-card
admin-hero
admin-table
badge-status
btn-primary
btn-secondary
btn-outline
btn-link
```

不要使用深色侧栏，不要新建设计系统，不要引入新图标库。

### 6.3 图表实现要求

雷达图可以用 SVG 或 CSS 简化实现，不要求引入 ECharts。

要求：

```txt
四轴：教学能力、教研能力、实践能力、服务能力
中心：基本能力 达标
刻度：0 / 25 / 50 / 75 / 100 可简化显示
图例：0-25 新手教师、25-50 胜任教师、50-75 骨干教师、75-100 名师教师
```

如果时间有限，雷达图可先用静态 SVG 多边形实现。

## 7. 页面一：群体画像 / 学校画像

路径：

```txt
/admin/ability-profile/group
```

文件：

```txt
frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue
```

### 7.1 页面定位

用于查看全校教师能力发展结构，用于发展支持、资源配置和下钻分析，不作为正式评价结论。

### 7.2 顶部区域

面包屑：

```txt
能力画像 / 群体画像
```

说明文案：

```txt
基于已发布执行版能力清单和正式档案事实，查看全校教师发展结构。用于发展支持、资源配置和下钻分析，不作为正式评价结论。
```

### 7.3 顶部两张主卡

左侧卡：综合发展指数

```txt
综合发展指数
68 / 100
由教学、教研、实践、服务四个维度的发展指数按权重汇总形成
基本能力：达标
```

右侧卡：首年基线

```txt
首年基线
当前为首个画像周期，暂无历史趋势对比。
本周期结果将作为后续年度趋势分析的基线。
2026 基线已形成
2027 待形成
2028 待形成
```

### 7.4 能力结构分析区

左侧：雷达图

```txt
教学能力 72
教研能力 61
实践能力 54
服务能力 49
中心：基本能力 达标
```

右侧：能力维度说明表

表格列：

```txt
维度 | 发展指数 | 指数构成（能力要素） | 全校教师分布
```

表格行：

```txt
教学能力 | 72 | 课程建设、课堂教学、教学评价、教学改革、数字化教学等 | 新手12% 胜任38% 骨干36% 名师14%
教研能力 | 61 | 课题研究、专业建设、课程改革、教学成果培育等 | 新手18% 胜任42% 骨干28% 名师12%
实践能力 | 54 | 企业实践、产教融合、真实项目转化、实践基地建设等 | 新手22% 胜任44% 骨干24% 名师10%
服务能力 | 49 | 社会服务、学生发展支持、团队协作、学校重点任务等 | 新手25% 胜任46% 骨干20% 名师9%
```

分布条用横向彩色条简化即可。

### 7.5 发展支持方向

标题：

```txt
发展支持方向
```

说明：

```txt
基于能力结构与正式档案数据观察，识别当前阶段的重点发展方向。
```

四张卡：

```txt
课程建设经验扩散
观察：教学能力指数较高，课程建设和服务分布不均。
关键维度：教学能力

企业实践专项支持
观察：实践能力下的成果转化要素相对较低。
关键维度：实践能力

教研共研带动
观察：教研能力整体偏中游，骨干教师占比偏低。
关键维度：教研能力

服务记录口径统一
观察：服务记录缺口较多，口径不一致。
关键维度：服务能力
```

底部按钮：

```txt
查看完整建议
```

只做 UI 或 console.log。

### 7.6 重点关注对象

标题：

```txt
重点关注对象
```

Tab：

```txt
院系
专业
教师
```

默认院系。

表格列：

```txt
对象 | 关注类型 | 关联维度 / 要素 | 为什么关注 | 下一步
```

表格行：

```txt
智能制造学院 | 重点支持 | 实践 / 成果转化 | 成果转化材料不足，转化证明偏少 | 查看画像
汽车工程学院 | 重点支持 | 实践 / 企业实践 | 企业实践记录不足，实践时间偏少 | 查看画像
信息工程学院 | 优势巩固 | 教研 / 课题研究 | 教研成果丰富，可示范带动 | 查看画像
商贸管理学院 | 需关注 | 服务 / 社会服务 | 服务记录口径不一致，数据质量待提升 | 查看画像
```

## 8. 页面二：教师画像查询

路径：

```txt
/admin/ability-profile/teacher
```

文件：

```txt
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue
```

### 8.1 页面定位

用于查询教师个人能力画像，支持列表视图和卡片视图切换。

### 8.2 顶部区域

面包屑：

```txt
能力画像 / 教师画像
```

筛选区：

```txt
搜索教师姓名 / 工号
学院：全部学院
职称：全部职称
教师类型：全部类型
关注类型：全部
重置
```

右侧视图切换按钮：

```txt
卡片视图
列表视图
```

默认可以使用列表视图。

### 8.3 教师数据

本页使用 6 名教师数据，列表和卡片共用。

教师 1：

```txt
林老师
智能制造学院 | 讲师
综合发展指数 76 / 100
教师类型：教学实践型
基本能力状态：达标
标签：课程建设基础较好、实践教学成效突出、教研成果持续积累
关注类型：重点支持
```

教师 2：

```txt
陈老师
电子信息学院 | 副教授
综合发展指数 72 / 100
教师类型：教研成长型
基本能力状态：达标
标签：教研方向逐步明确、科研成果持续积累、课程改革有潜力
关注类型：持续观察
```

教师 3：

```txt
王老师
财经学院 | 讲师
综合发展指数 81 / 100
教师类型：实践带动型
基本能力状态：达标
标签：实践教学能力突出、校企合作成效明显、服务贡献较大
关注类型：优势样本
```

教师 4：

```txt
刘老师
计算机学院 | 副教授
综合发展指数 68 / 100
教师类型：教研成长型
基本能力状态：达标
标签：课程建设有提升空间、教研成果持续积累、服务贡献继续观察
关注类型：持续观察
```

教师 5：

```txt
赵老师
外国语学院 | 讲师
综合发展指数 79 / 100
教师类型：综合发展型
基本能力状态：达标
标签：教学表现稳定优秀、教研能力持续提升、学生指导成效良好
关注类型：优势样本
```

教师 6：

```txt
周老师
艺术设计学院 | 讲师
综合发展指数 71 / 100
教师类型：实践带动型
基本能力状态：达标
标签：实践成果转化可提升、课程建设基础较好、服务育人持续关注
关注类型：重点支持
```

### 8.4 列表视图

标题：

```txt
教师画像列表
```

说明：

```txt
请选择教师，查看其能力画像详情
```

列表列结构可做成行卡片，不一定使用 table。

每行包含：

```txt
头像
姓名 / 学院 / 职称
综合发展指数
教师类型
基本能力状态
标签组
关注类型
进入画像
```

底部分页：

```txt
共 142 条
每页 12 条
1 2 3 4 5 ... 12
1 / 12 页
跳至 [ ] 页
```

### 8.5 卡片视图

同一页面内通过 `viewMode` 切换。

卡片 3 列 2 行。

每张卡片包含：

```txt
头像
姓名
学院 | 职称
综合发展指数 xx / 100
教师类型
基本能力状态 达标
3 个特征标签
关注类型角标
进入画像
```

### 8.6 交互

```txt
点击列表视图按钮 → viewMode = 'list'
点击卡片视图按钮 → viewMode = 'card'
点击进入画像 → /admin/ability-profile/teacher/lin
```

本批所有进入画像都可以先跳转到林老师详情。

## 9. 页面三：教师个人画像详情

路径：

```txt
/admin/ability-profile/teacher/:teacherId
```

文件：

```txt
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue
```

### 9.1 页面定位

用于查看单个教师能力画像详情，展示综合发展指数、能力结构、能力维度说明和支持方向。

### 9.2 顶部区域

面包屑：

```txt
能力画像 / 教师画像 / 林老师
```

右上按钮：

```txt
返回教师画像列表
```

点击返回：

```ts
router.push('/admin/ability-profile/teacher')
```

教师信息条：

```txt
当前教师：林老师
智能制造学院 | 讲师 | 聘期第2年
分析周期：2026年度
画像口径：2026年度执行版能力清单
数据依据：正式档案事实
更新时间：2026-06-19
```

右侧按钮：

```txt
切换教师
```

只做 UI 或 console.log。

### 9.3 综合发展指数

卡片标题：

```txt
综合发展指数
```

内容：

```txt
76 / 100
教师类型：教学实践型
能力阶段参考：骨干教师
基本能力：达标
类型依据：教学能力较突出 | 实践能力较突出 | 教研、服务保持稳定
```

### 9.4 首年基线

卡片标题：

```txt
首年基线
```

内容：

```txt
当前为首个画像周期，暂无历史趋势对比。
本周期结果将作为后续趋势分析基线。
2026 基线已形成
2027 待形成
2028 待形成
```

### 9.5 能力结构分析

雷达图数据：

```txt
教学能力 88
教研能力 68
实践能力 79
服务能力 72
中心：教学原型 达标
```

注意：中心可显示教师类型或基本能力，粗实现阶段可显示“教学原型 达标”。

图例：

```txt
0-25 新手教师
25-50 胜任教师
50-75 骨干教师
75-100 名师教师
```

### 9.6 能力维度说明

表格列：

```txt
维度 | 发展指数 | 指数构成
```

表格行：

```txt
教学能力 | 88 | 课程建设、课堂教学、教学评价、教学改进等
教研能力 | 68 | 课题研究、专业建设、课程改革、成果培育等
实践能力 | 79 | 企业实践、产教融合、校企合作、成果转化等
服务能力 | 72 | 社会服务、学生支持、团队协作、重点任务等
```

### 9.7 支持方向

标题：

```txt
支持方向
```

表格列：

```txt
对应发展特征 | 支持方向 | 支持重点
```

表格行：

```txt
课程建设基础较好 | 课程建设经验沉淀 | 适合沉淀课程建设、教学评价、教学改进相关经验
实践转化具备基础 | 实践成果转化支持 | 关注企业实践成果、校企合作成果的转化表达与应用材料沉淀
教研成果持续积累 | 教研成果继续培育 | 适合围绕课题共研、成果培育、教研协作继续支持
服务贡献继续观察 | 服务贡献持续观察 | 继续观察社会服务、学生支持、重点任务贡献的稳定性
```

## 10. 数据与图表实现建议

### 10.1 雷达图组件

可以在每个页面内各自实现简单 SVG。也可以创建轻量组件：

```txt
frontend/src/pages/admin/ability-profile/components/SimpleRadarChart.vue
```

组件只支持静态数据即可。

Props 可简单定义：

```ts
scores: { label: string; value: number }[]
centerText: string
```

不要求复杂动画和真实图表库。

### 10.2 头像

可以使用渐变圆形 + 姓名首字，或简单 SVG 占位。

不要引入真实图片资源。

## 11. 验收标准

路由可访问：

```txt
/admin/ability-profile/group
/admin/ability-profile/teacher
/admin/ability-profile/teacher/lin
```

群体画像页必须满足：

```txt
显示综合发展指数 68 / 100。
显示首年基线 2026/2027/2028。
显示学校层面的能力雷达图，四维度为 72、61、54、49。
显示能力维度说明表。
显示发展支持方向四张卡。
显示重点关注对象表。
```

教师画像查询页必须满足：

```txt
有搜索和 4 个筛选项。
有列表/卡片视图切换。
有 6 名教师数据。
列表视图和卡片视图均可展示。
点击进入画像可进入个人详情页。
```

教师个人画像详情页必须满足：

```txt
显示林老师信息条。
显示综合发展指数 76 / 100。
显示教师类型：教学实践型。
显示首年基线。
显示个人能力雷达图，四维度为 88、68、79、72。
显示能力维度说明表。
显示支持方向表。
```

## 12. 不要做

```txt
不要修改能力清单模块。
不要修改成长档案模块。
不要新增左侧菜单项。
不要引入 ECharts 或其他图表库。
不要接后端接口。
不要实现真实教师切换。
不要做精细视觉还原。
不要把画像表达成正式评价结论。
```

## 13. 完成后反馈要求

请反馈：

```txt
1. 修改文件清单。
2. 新增页面清单。
3. 路由访问结果。
4. typecheck 结果。
5. build 结果。
6. 三张截图：
   - /admin/ability-profile/group
   - /admin/ability-profile/teacher
   - /admin/ability-profile/teacher/lin
```
