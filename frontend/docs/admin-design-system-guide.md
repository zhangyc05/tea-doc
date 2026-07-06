# 管理端设计系统指南

本指南记录 `frontend/` 管理端 PC 页面当前可依赖的设计规则。页面修正优先遵循已实现基准页和现有组件，不为单页临时发明新的视觉体系。

## 当前基准页

```txt
页面：管理端｜能力清单｜执行版查看页
路由：/admin/ability-list/execution
源码：frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
目标图：效果图/已实现/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png
```

## 工程范围

- `frontend/` 只承载管理端 PC。
- 教师手机端在 `teacher-mobile/`，不复用管理端布局、路由和页面样式。
- 管理端页面使用 Vue 3、Vite、TypeScript、Vue Router、Tailwind CSS、CSS Variables。

## 布局规则

- 管理端统一使用 `frontend/src/layouts/AdminLayout.vue`。
- 侧边栏、顶栏、面包屑优先复用：

```txt
frontend/src/components/layout/AdminSidebar.vue
frontend/src/components/layout/AdminTopbar.vue
frontend/src/components/layout/AppBreadcrumb.vue
```

- 页面内容以桌面信息密度为主，避免营销式大卡片堆叠。
- 目标效果图是桌面视觉基准，不是固定宽高约束；页面不得为单一截图尺寸写死。

## 颜色与样式

- 优先使用 `frontend/src/styles/tokens.css` 中的 CSS Variables。
- 管理端保持浅色、清爽、工作台风格。
- 重要操作使用主绿色；风险操作使用红色或危险样式；普通筛选和次级操作使用低对比边框按钮。
- 避免把管理端做成深色重后台。

## 图标规则

- 管理端通用导航、操作、状态提示图标基于 `@element-plus/icons-vue`，通过 `frontend/src/components/admin-ui/AdminIcon.vue` 统一使用。
- 能用图标库表达的通用图标，优先使用 `AdminIcon`，不再新增模板内联 SVG path、字符图标或 CSS 手绘图标。
- 业务插画、头像、空状态、hero 视觉和带明确定制风格的资产可继续使用 `frontend/src/assets/admin/**` 下的本地图片 / SVG。

### Token 收敛观察

当前页面仍存在较多局部硬编码颜色、阴影、圆角和间距。F1/F2 已按 `frontend/src` 下 50 个 `.vue/.css` 文件扫描；后续 F3 收敛时按高频、低风险、可替代顺序推进，不做一次性全量替换。

F3-01 已在 `frontend/src/styles/tokens.css` 定义第一批管理端精确别名 token，覆盖高频主色、文本色、边框色、背景色、卡片弱阴影、主按钮阴影和常用间距。

F3-02 已完成第一批主色替换：页面和组件样式中的 `#1268f6` 已改为 `var(--color-admin-primary)`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-03 已完成高频文本色替换：页面和组件样式中的 `#17233d`、`#172b55`、`#66758f` 已分别改为 `var(--color-admin-text-strong)`、`var(--color-admin-text-title)`、`var(--color-admin-text-muted)`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-04 已完成高频边框和分割线色替换：页面和组件样式中的 `#dce6f5`、`#d9e5f7`、`#e5edf8` 已分别改为 `var(--color-admin-border)`、`var(--color-admin-border-muted)`、`var(--color-admin-divider)`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-05 已完成高频背景色替换：页面和全局样式中的 `#f6f9ff`、`#f8fbff` 已分别改为 `var(--color-admin-bg)`、`var(--color-admin-bg-soft)`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-06 已先完成胶囊圆角替换：页面、组件和覆盖样式中的 `border-radius: 999px` 已改为 `border-radius: var(--radius-full)`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。头像、插画、响应式 `clamp(...)` 和特殊装饰圆角仍保留局部口径。

F3-07 已完成高频阴影替换：页面样式中的卡片弱阴影和主按钮强调阴影已分别改为 `var(--shadow-admin-card-soft)`、`var(--shadow-admin-card-subtle)`、`var(--shadow-admin-card-faint)`、`var(--shadow-admin-primary-action)`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-08 已完成辅助主色和辅助文本色替换：页面样式中的 `#0f5eef`、`#405985` 已分别改为 `var(--color-admin-primary-hover)`、`var(--color-admin-text-subtle)`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-09 已完成小控件圆角替换：页面和组件样式中的 `border-radius: 6px` 已改为 `border-radius: var(--radius-sm)`，用于按钮、输入框、小标签和紧凑控件圆角，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-10 已完成大卡片和浮层圆角替换：页面和组件样式中的 `border-radius: 12px` 已改为 `border-radius: var(--radius-lg)`；顶部复合圆角保留为 `var(--radius-lg) var(--radius-lg) 0 0`，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-11 已完成中等面板圆角替换：页面和组件样式中的 `border-radius: 10px` 已改为 `border-radius: var(--radius-md)`；复合圆角保留原角位关系，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-12 已完成管理端默认面板圆角替换：页面和组件样式中的普通 `border-radius: 8px` 和复合 8px 圆角已改为 `var(--radius-admin-panel)`；响应式 `clamp(...)` 和头像/插画等特殊圆角不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-13 已完成紧凑内联间距替换：页面和组件样式中的 `gap: 8px` 已改为 `gap: var(--space-admin-xs)`；`!important` 覆盖样式保留原优先级，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-14 已完成小型内联间距替换：页面和组件样式中的普通和双值 `gap: 10px` 已改为 `gap: var(--space-admin-sm)`；双值 `gap` 保留第二轴间距，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-15 已完成中型内联间距替换：页面和组件样式中的普通和双值 `gap: 12px` 已改为 `gap: var(--space-admin-md)`；双值 `gap` 保留第二轴间距，响应式 `clamp(...)` 和 `column-gap` 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-16 已完成大型内联间距替换：页面和组件样式中的显式 `gap: 16px` 已改为 `gap: var(--space-admin-lg)`；响应式 `clamp(...)`、`column-gap` 和 padding/margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-17 已完成卡片 / 区块常用间距替换：页面和组件样式中的显式 `gap: 18px` 已改为 `gap: var(--space-admin-card-gap)`；响应式 `clamp(...)` 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-18 已完成超大区块间距替换：页面和组件样式中的显式 `gap: 20px` 已改为 `gap: var(--space-admin-xl)`；本批只处理 `gap`，padding / margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-19 已完成双倍超大区块间距替换：页面和组件样式中的显式 `gap: 24px` 已改为 `gap: var(--space-admin-2xl)`；本批只处理 `gap`，padding / margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-20 已完成超大单值内边距替换：页面和组件样式中的单值 `padding: 20px` 已改为 `padding: var(--space-admin-xl)`；双值、四值和响应式 padding 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-21 已完成双倍超大单值内边距替换：页面和组件样式中的单值 `padding: 24px` 已改为 `padding: var(--space-admin-2xl)`；双值、四值和响应式 padding 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-22 已完成卡片单值内边距替换：页面和组件样式中的单值 `padding: 18px` 已改为 `padding: var(--space-admin-card-gap)`；双值、四值和响应式 padding 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-23 已完成大型单值内边距替换：页面和组件样式中的单值 `padding: 16px` 已改为 `padding: var(--space-admin-lg)`；双值、四值和响应式 padding 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-24 已完成中型单值内边距替换：页面和组件样式中的单值 `padding: 12px` 已改为 `padding: var(--space-admin-md)`；双值、四值和响应式 padding 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-25 已完成超大单值外边距替换：页面和组件样式中的单值 `margin: 20px` 已改为 `margin: var(--space-admin-xl)`；方向性 margin、多值 margin 和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-26 已完成紧凑方向性外边距替换：页面和组件样式中的方向性 `margin-*: 8px` 已改为 `margin-*: var(--space-admin-xs)`；单值、双值、多值和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-27 已完成小型方向性外边距替换：页面和组件样式中的方向性 `margin-*: 10px` 已改为 `margin-*: var(--space-admin-sm)`；单值、双值、多值和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-28 已完成大型方向性外边距替换：页面和组件样式中的方向性 `margin-*: 16px` 已改为 `margin-*: var(--space-admin-lg)`；单值、双值、多值和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-29 已完成中型方向性外边距替换：页面和组件样式中的方向性 `margin-*: 12px` 已改为 `margin-*: var(--space-admin-md)`；单值、双值、多值和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-30 已完成超大方向性外边距替换：页面和组件样式中的方向性 `margin-*: 20px` 已改为 `margin-*: var(--space-admin-xl)`；单值、双值、多值和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-31 已完成双倍超大方向性外边距替换：页面和组件样式中的方向性 `margin-*: 24px` 已改为 `margin-*: var(--space-admin-2xl)`；单值、双值、多值和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-32 已完成卡片方向性外边距替换：页面和组件样式中的方向性 `margin-*: 18px` 已改为 `margin-*: var(--space-admin-card-gap)`；单值、双值、多值和响应式 margin 不纳入本批，并由 `frontend/src/styles/tokens.test.ts` 防止回退。

F3-33 已完成剩余方向性外边距审计：当前剩余方向性 `margin-*` 已无 `8/10/12/16/18/20/24px` 常用 token 档位硬编码；`2/3/4/5/6/7/9/11/13px` 归为图形、图标、文字基线或紧凑列表微调，`22/28/30/34/48/54px` 归为单页版式特例，暂不新增 token；`14px` 出现 19 处但不在现有间距体系内，需结合目标效果图做页面级复核后再决定是否新增 token 或局部保留。

F3-34 已完成 `gap` 系列 14px 收敛：新增 `--space-admin-md-lg: 14px`，页面和组件样式中的非响应式 `gap: 14px`、`row-gap: 14px` 已替换为该 token；同步将此前未覆盖的 `column-gap: 12px`、`row-gap: 18px` 分别纳入 `--space-admin-md` 和 `--space-admin-card-gap`。本批不处理 padding、margin、定位或字体里的 14px。

F3-35 已完成单值 `padding: 14px` 收敛：培训资源详情抽屉和成长档案教师详情来源卡片中的单值 padding 已替换为 `--space-admin-md-lg`。本批不处理 `padding: 14px 12px`、`padding: 14px 16px`、`padding: 14px 22px` 等多值 padding，它们继续按表格密度或页面级视觉复核处理。

F3-36 已完成双值 `padding: 14px 12px` 收敛：能力画像、企业实践、培训需求和虚拟教研中用于紧凑信息块的该组合已替换为 `--space-admin-md-lg --space-admin-md`。本批不处理 `14px 16px`、`14px 18px`、`14px 22px` 等其他多值 padding。

F3-37 已完成双值 `padding: 14px 16px` 收敛：教师画像列表、企业实践跟踪和虚拟教研室详情中用于列表卡片/分页块的该组合已替换为 `--space-admin-md-lg --space-admin-lg`。本批不处理 `14px 18px`、`14px 22px`、`14px 36px` 等其他多值 padding。

高频颜色候选：

| 现有值 | 出现次数 | 建议归并 |
| --- | ---: | --- |
| `#1268f6` | 147 | F3-02 已替换为 `--color-admin-primary` |
| `#0f5eef` | 78 | F3-08 已替换为 `--color-admin-primary-hover` |
| `#17233d` | 108 | F3-03 已替换为 `--color-admin-text-strong` |
| `#172b55` | 46 | F3-03 已替换为 `--color-admin-text-title` |
| `#66758f` | 30 | F3-03 已替换为 `--color-admin-text-muted` |
| `#405985` | 21 | F3-08 已替换为 `--color-admin-text-subtle` |
| `#dce6f5` | 64 | F3-04 已替换为 `--color-admin-border` |
| `#d9e5f7` | 43 | F3-04 已替换为 `--color-admin-border-muted` |
| `#e5edf8` | 24 | F3-04 已替换为 `--color-admin-divider` |
| `#f6f9ff` | 26 | F3-05 已替换为 `--color-admin-bg` |
| `#f8fbff` | 18 | F3-05 已替换为 `--color-admin-bg-soft` |

高频圆角候选：

| 现有值 | 出现次数 | 建议归并 |
| --- | ---: | --- |
| `8px` | 95 | F3-12 已替换为 `--radius-admin-panel`；响应式和特殊装饰圆角除外 |
| `6px` | 92 | F3-09 已替换为 `--radius-sm` |
| `12px` | 18 | F3-10 已替换为 `--radius-lg` |
| `10px` | 13 | F3-11 已替换为 `--radius-md` |
| `999px` | 13 | F3-06 已替换为 `--radius-full` |

高频阴影候选：

| 现有值 | 出现次数 | 建议归并 |
| --- | ---: | --- |
| `0 8px 22px rgba(40, 88, 150, 0.035)` | 21 | F3-07 已替换为 `--shadow-admin-card-soft` |
| `0 8px 24px rgba(35, 64, 110, 0.05)` | 16 | F3-07 已替换为 `--shadow-admin-card-subtle` |
| `0 8px 24px rgba(35, 64, 110, 0.04)` | 11 | F3-07 已替换为 `--shadow-admin-card-faint` |
| `0 8px 18px rgba(18, 104, 246, 0.18)` | 5 | F3-07 已替换为 `--shadow-admin-primary-action` |

高频间距候选：

| 现有值 | 出现次数 | 建议归并 |
| --- | ---: | --- |
| `16px` | 71 | F3-16 已替换显式 `gap: 16px` 为 `--space-admin-lg`；响应式 `clamp(...)`、`column-gap`、padding/margin 分后续批次处理 |
| `12px` | 65 | F3-15 已替换 `gap: 12px` 为 `--space-admin-md`；padding/margin 和 `column-gap` 分后续批次处理 |
| `8px` | 63 | F3-13 已替换 `gap: 8px` 为 `--space-admin-xs`；padding/margin 分后续批次处理 |
| `18px` | 45 | F3-17 已替换显式 `gap: 18px` 为 `--space-admin-card-gap`；响应式 `clamp(...)`、padding/margin 分后续批次处理 |
| `14px` | 19 | F3-34 已新增 `--space-admin-md-lg` 并替换非响应式 `gap` / `row-gap`；padding/margin/定位仍按页面级复核处理 |
| `10px` | 44 | F3-14 已替换 `gap: 10px` 为 `--space-admin-sm`；padding/margin 分后续批次处理 |
| `20px` | 35 | F3-18 已替换显式 `gap: 20px` 为 `--space-admin-xl`；padding/margin 分后续批次处理 |
| `24px` | 19 | F3-19 已替换显式 `gap: 24px` 为 `--space-admin-2xl`；padding/margin 分后续批次处理 |
| `padding: 20px` | 13 | F3-20 已替换单值 padding 为 `--space-admin-xl`；双值、四值和响应式 padding 分后续批次处理 |
| `padding: 24px` | 8 | F3-21 已替换单值 padding 为 `--space-admin-2xl`；双值、四值和响应式 padding 分后续批次处理 |
| `padding: 18px` | 11 | F3-22 已替换单值 padding 为 `--space-admin-card-gap`；双值、四值和响应式 padding 分后续批次处理 |
| `padding: 16px` | 12 | F3-23 已替换单值 padding 为 `--space-admin-lg`；双值、四值和响应式 padding 分后续批次处理 |
| `padding: 12px` | 3 | F3-24 已替换单值 padding 为 `--space-admin-md`；双值、四值和响应式 padding 分后续批次处理 |
| `padding: 14px` | 2 | F3-35 已替换单值 padding 为 `--space-admin-md-lg`；双值、四值和响应式 padding 分后续批次处理 |
| `padding: 14px 12px` | 6 | F3-36 已替换为 `--space-admin-md-lg --space-admin-md`；其他多值 padding 分后续页面级复核 |
| `padding: 14px 16px` | 3 | F3-37 已替换为 `--space-admin-md-lg --space-admin-lg`；其他多值 padding 分后续页面级复核 |
| `margin: 20px` | 1 | F3-25 已替换单值 margin 为 `--space-admin-xl`；方向性、多值和响应式 margin 分后续批次处理 |
| `margin-*: 8px` | 27 | F3-26 已替换方向性 margin 为 `--space-admin-xs`；单值、多值和响应式 margin 分后续批次处理 |
| `margin-*: 10px` | 22 | F3-27 已替换方向性 margin 为 `--space-admin-sm`；单值、多值和响应式 margin 分后续批次处理 |
| `margin-*: 16px` | 21 | F3-28 已替换方向性 margin 为 `--space-admin-lg`；单值、多值和响应式 margin 分后续批次处理 |
| `margin-*: 12px` | 8 | F3-29 已替换方向性 margin 为 `--space-admin-md`；单值、多值和响应式 margin 分后续批次处理 |
| `margin-*: 20px` | 8 | F3-30 已替换方向性 margin 为 `--space-admin-xl`；单值、多值和响应式 margin 分后续批次处理 |
| `margin-*: 24px` | 3 | F3-31 已替换方向性 margin 为 `--space-admin-2xl`；单值、多值和响应式 margin 分后续批次处理 |
| `margin-*: 18px` | 5 | F3-32 已替换方向性 margin 为 `--space-admin-card-gap`；单值、多值和响应式 margin 分后续批次处理 |

剩余方向性外边距审计：

| 剩余值 | 出现次数 | 处理口径 |
| --- | ---: | --- |
| `2px`、`3px`、`4px`、`5px`、`6px`、`7px`、`9px`、`11px`、`13px` | 23 | 低频微调值，主要服务图标、文字基线、紧凑列表和局部对齐；暂不新增 token |
| `14px` | 19 | `gap` 系列已在 F3-34 收敛为 `--space-admin-md-lg`，单值 padding 已在 F3-35 收敛，`14px 12px` 和 `14px 16px` 双值 padding 已在 F3-36/F3-37 收敛；剩余其他多值 padding、margin、定位和字体值继续结合目标效果图做页面级复核 |
| `22px`、`28px`、`30px`、`34px`、`48px`、`54px` | 12 | 单页版式特例或大段落错位控制；暂不纳入通用 spacing token |

收敛顺序：

1. 先替换品牌主色、正文色、边框色、页面背景色。
2. 再统一卡片弱阴影和主按钮阴影。
3. 再处理高频间距，不替换布局专用的 `clamp(...)` 响应式间距。
4. 最后处理圆角差异，保留头像、图形插画、进度节点等非通用形状。

第一批已落地 token：

```txt
--color-admin-primary
--color-admin-primary-hover
--color-admin-text-strong
--color-admin-text-title
--color-admin-text-muted
--color-admin-text-subtle
--color-admin-border
--color-admin-border-muted
--color-admin-divider
--color-admin-bg
--color-admin-bg-soft
--radius-admin-panel
--shadow-admin-card-soft
--shadow-admin-card-subtle
--shadow-admin-card-faint
--shadow-admin-primary-action
--space-admin-xs
--space-admin-sm
--space-admin-md
--space-admin-lg
--space-admin-card-gap
--space-admin-xl
--space-admin-2xl
```

## 组件使用边界

已有通用组件优先判断是否符合目标图后再复用：

```txt
frontend/src/components/common/PageHeader.vue
frontend/src/components/common/FilterBar.vue
frontend/src/components/common/StatCard.vue
frontend/src/components/common/StatusBadge.vue
frontend/src/components/common/DetailSheet.vue
frontend/src/components/common/EmptyState.vue
```

能力清单相关组件：

```txt
frontend/src/components/admin/ability-list/AbilityListWorkspace.vue
frontend/src/components/admin/ability-list/AbilityIndicatorTable.vue
frontend/src/components/admin/ability-list/AbilityStructureTree.vue
```

能力清单闭环口径：

- 基准模板页只维护长期基准标准；指标编辑先形成 `pendingBaseTemplateChanges`，点击发布新版本后才写入正式基准模板并进入版本记录。
- 优化建议已合并到基准模板页，并与基准清单作为同页 Tab 工作模式切换；制度文件上传、运行反馈重新分析和人工补充都在“优化清单”模式内生成建议列表数据。建议采纳后只形成待应用项，应用后转为基准模板修订草稿，不直接改正式基准模板。旧优化路由只作为兼容入口，跳回基准模板页并切到优化清单 Tab。
- 执行清单页负责通过“派生执行清单”抽屉生成下一周期待发布版本；待发布版本在执行清单页内点击“确认发布”直接发布，不再把主流程跳转到独立发布确认页。发布确认页仅作为兼容入口和直接访问兜底，不得自动派生版本。
- 已发布执行清单的指标编辑抽屉与基准模板指标编辑抽屉保持同类表单体验：同样使用 `DetailSheet form`、提示块、必填校验、状态字段和底部取消/保存调整操作；保存后先形成待确认调整，表格可展示草稿态，必须通过“确认调整”写入正式执行版，或通过“撤回调整”丢弃。
- 待发布执行清单是独立草稿，支持编辑指标、删除指标、新增维度、编辑维度、删除维度和取消发布；这些操作只作用于待发布版本，发布后才替换当前正式执行清单，取消发布必须回到当前已发布版本且不影响历史版本。结构操作必须贴近能力结构：新增维度放在能力结构卡片右上角，一级/二级维度的编辑和删除放在维度节点自身。
- 执行清单页必须提供“岗位/聘期要求映射”入口，入口作为执行版配套配置放在 Hero 与能力结构工作区之间，不与派生、确认发布、取消发布等版本动作混在同一主操作组。
- 岗位/聘期要求映射页左侧要求对象必须驱动中间表格、详情、统计和新增项归属，禁止切换对象后仍显示同一组映射数据。页面必须使用执行版同类 Hero 结构：左侧业务徽章、右侧业务插画、标题旁状态标签、4 项带图标统计；主体为三栏工作区，表格展示要求项、对应能力指标、要求等级、制度补充条件、确认状态，编辑/删除/确认配置集中在右侧详情区。
- 能力画像页面引用当前执行版标题，作为能力清单发布后跨页面口径一致性的前台证据。
- 能力画像群体页采用“雷达主导型”结构：顶部只做观察概览，主区用雷达图表达学校师资队伍结构；雷达中心表达基本能力达标状态，四轴分别表达教学、教研、实践、服务四个方向，环层表达新手、胜任、骨干、名师阶段。下方维度表和关注对象只作为读图解释和继续查看入口，避免回退到插画 Hero、强诊断结论或四个等权指标卡堆叠。

不得先凭经验设计通用组件，再用组件拼页面。组件必须从目标效果图和当前基准页中提炼。

### Element Plus 使用边界

PC 端已引入 Element Plus，执行口径是 Element Plus 优先，自研只做业务封装和必要适配。Element Plus 定位是复杂控件底座，不是页面级视觉体系。管理端页面不得在管理端页面中直接散用 `element-plus` 组件，必须优先通过 `frontend/src/components/admin-ui`、`frontend/src/components/ui`、`frontend/src/components/common` 或业务组件封装使用。

Element Plus 只承接表格、分页、日期、选择器、上传、弹窗、抽屉、树等复杂基础控件能力；页面布局、设计 token、状态语义、业务入口和目标效果图还原仍以本指南和本地组件边界为准。

Element Plus 主题变量统一由 `frontend/src/styles/element-plus-admin.css` 桥接到 `frontend/src/styles/tokens.css`，不得在页面局部重写框架全局变量。

PC 端 Element Plus 迁移按 `frontend/scripts/audit-admin-element-plus-migration.mjs` 的扫描结果分批推进。第一批优先处理培训管理列表页的筛选控件；第二批处理企业实践、虚拟教研、教学反思、报告中心等筛选控件；第三批处理分页、上传、树和抽屉；表格迁移必须结合目标效果图逐页确认行高、空状态、操作列和横向滚动，不做全量机械替换。

当前迁移批次：

| 批次 | 页面范围 | 优先替换 |
| --- | --- | --- |
| ELP-01 | 培训资源、培训需求、培训申请、培训计划、培训记录 | select / input / textarea |
| ELP-02 | 企业实践申请、年度实践跟踪、实践记录、虚拟教研室、教学反思、报告中心、档案查阅、能力画像列表 | select / input |
| ELP-03 | 能力清单编辑抽屉、培训计划抽屉、档案上传、手写分页 | drawer / dialog / upload / pagination |
| ELP-04 | 稳定列表页和详情关联表 | table |
| ELP-05 | 能力清单结构树、通用详情抽屉、能力清单编辑表单 | tree / drawer / form controls |

当前可直接使用的 `admin-ui` Element Plus 适配器包括 `AdminInput`、`AdminSelect`、`AdminDatePicker`、`AdminCheckboxGroup`、`AdminPagination`、`AdminUpload`、`AdminTable`、`AdminTableColumn`、`AdminDialog`、`AdminDrawer`、`AdminTree`。新增管理端复杂控件时必须先判断这些适配器是否可用；页面不得直接引入 `element-plus`。

`DetailSheet` 属于业务抽屉封装，底层使用 `AdminDrawer`。页面仍应优先使用 `DetailSheet` 表达编辑、来源记录、版本历史等业务抽屉，不允许重新写 `drawer-overlay`、`edit-drawer` 或页面级 Teleport 抽屉。

### 按钮等级

管理端新增或重构按钮必须优先使用 `frontend/src/components/ui/button.ts` 的 `Button` 组件。F4-44 后管理端页面源码已完成页面级 `.btn-*` 按钮类收尾；旧类名只作为历史迁移记录，不作为新增页面样板。

按钮等级口径：

| 等级 | 组件 variant | 使用场景 |
| --- | --- | --- |
| 主按钮 | `variant="default"` | 页面主提交、发布、确认、保存并发布、进入关键流程；同一区域通常只保留一个 |
| 次按钮 | `variant="secondary"` | 查询、保存草稿、非破坏性辅助动作；不能和主按钮同时抢视觉中心 |
| 轮廓按钮 | `variant="outline"` | 取消任务、查看上传文件、边界明确但不应强调的动作 |
| 文本按钮 | `variant="ghost"` | 表格行内查看、编辑、更多、来源等轻量动作；必须有真实跳转、状态变化或明确降级提示 |
| 危险按钮 | `variant="danger"` | 删除、退回、标记异常、未同意等会改变业务状态且具有负向后果的动作 |
| 图标按钮 | `size="icon"` | 搜索、关闭等固定尺寸图标动作；必须提供 `aria-label` 或 `title` |

F4-01/F4-02 当前扫描结论：

- 公共 `Button` 当前已定义 `default`、`secondary`、`outline`、`ghost`、`danger` 五类 variant 和 `sm`、`md`、`lg`、`icon` 四类 size。
- 公共 `Button` 已用于 `EmptyState`、`FilterBar`、`DetailSheet`、`PageHeader`、`FloatingAIAssistant`、`TrainingResourceDetailSheet` 和管理端页面主要动作入口。
- F4-44 已完成页面级按钮类迁移，`frontend/src/pages/admin/adminVisualActions.test.ts` 会继续约束页面和关键组件的真实动作、只读按钮和旧类回退。
- 后续新增或改造按钮时，先按本节选择 `variant` 和 `size`，再用页面结构类承接局部宽度、对齐和特殊排版。
- 每次按钮迁移必须确认不破坏目标图里的尺寸、密度、位置和状态反馈。

F4-03 试点迁移：

- 能力清单基准模板、执行版、要求映射三个编辑抽屉底部按钮已迁移到公共 `Button`。
- 抽屉底部取消操作统一使用 `variant="outline"`，保存操作使用默认主按钮，删除要求项使用 `variant="danger"`。
- `frontend/src/pages/admin/adminVisualActions.test.ts` 已补源码 guardrail，防止这些试点退回页面私有 `.btn-*`。

F4-04 试点迁移：

- 培训计划新建抽屉底部按钮已迁移到公共 `Button`。
- 抽屉底部取消操作使用 `variant="outline"`，保存草稿使用 `variant="secondary"`，保存并发布使用默认主按钮。
- 为保持目标图中底部三按钮等宽结构，按钮保留 `class="flex-1"`。

F4-05 试点迁移：

- 培训资源、培训需求、培训申请三页筛选区的查询动作已迁移到公共 `Button variant="secondary"`。
- 培训资源“新增资源”和培训需求“新增需求”已迁移到公共 `Button` 默认主按钮。
- 培训资源新增按钮的右对齐和窄屏回流由页面结构类 `resource-create-action` 承载，不写入公共按钮组件。

F4-06 试点迁移：

- 培训记录页右侧“查看材料待完善记录”侧栏主动作已迁移到公共 `Button`。
- 该按钮的满宽和上间距仍由页面结构类 `full-width` 承载，不写入公共按钮组件。

F4-07 试点迁移：

- 培训计划页主列表右上“新建培训计划”入口已迁移到公共 `Button` 默认主按钮。
- 培训计划页右侧“执行提醒”底部“查看相关计划”已迁移到公共 `Button variant="outline"`。
- 两处动作仍由页面负责 `openDrawer` 和 `selectedStatus = '报名中'`，公共按钮不承载业务状态。

F4-08 试点迁移：

- 培训计划页表格行内“查看”已迁移到公共 `Button variant="ghost" size="sm"`。
- 行内轻量动作继续要求真实跳转、状态变化或明确降级提示；培训计划“查看”保持跳转 `/admin/training/plans/:planId`。
- 表格行内动作暂不一次性全量替换，后续按培训记录、培训资源、申请处理等页面逐页迁移。

F4-09 试点迁移：

- 培训记录总览页表格行内“查看”已迁移到公共 `Button variant="ghost" size="sm"`。
- 培训记录“查看”保持跳转 `/admin/training/records/:recordId`，不改变材料筛选和右侧提醒动作。

F4-10 试点迁移：

- 培训资源页表格行内“查看”已迁移到公共 `Button variant="ghost" size="sm"`。
- 培训资源“查看”保持更新右侧“当前查看资源”摘要和页面内操作消息，不改变资源详情状态。

F4-11 试点迁移：

- 培训需求页表格行内“查看”已迁移到公共 `Button variant="ghost" size="sm"`。
- 培训需求页表格行内“匹配资源”会改变需求匹配状态，使用公共 `Button variant="secondary" size="sm"`，不与只读查看动作同级处理。

F4-12 试点迁移：

- 培训申请页表格行内“查看”已迁移到公共 `Button variant="ghost" size="sm"`。
- 培训申请页表格行内“处理”会直接同意待处理申请，使用公共 `Button variant="secondary" size="sm"`，保留 `handleApplication()` 对计划详情参与名单的同步影响。

F4-13 试点迁移：

- 培训申请页筛选区“重置”已迁移到公共 `Button variant="outline"`，继续调用 `resetFilters()`。
- 培训申请页右侧“退回申请”会改变申请状态为未同意，使用公共 `Button variant="danger"`；右侧“查看待处理申请”是筛选入口，使用公共 `Button variant="outline"`。
- 两个侧栏动作保留 `class="full-width"` 承载满宽和上间距，公共按钮组件不写入单页布局规则。

F4-14 试点迁移：

- 培训需求页右侧“查看待匹配需求”和培训资源页右侧“查看待完善资源”已迁移到公共 `Button variant="outline"`。
- 两个动作都只切换当前页筛选条件和操作消息，不改变资源或需求业务对象；满宽由页面结构类 `full-width` 承载。

F4-15 试点迁移：

- 培训资源页和培训需求页筛选区“重置”已迁移到公共 `Button variant="outline"`，继续调用各自页面的 `resetFilters()`。
- 该批次只替换筛选栏重置动作，不改变查询、资源新增、需求新增或表格行内动作。

F4-16 试点迁移：

- 培训计划页和培训记录页筛选区“重置”已迁移到公共 `Button variant="outline"`，继续调用各自页面的 `resetFilters()`。
- 该批次只替换筛选栏重置动作，不改变计划列表过滤、记录列表过滤、计划新建入口或记录侧栏动作。

F4-17 试点迁移：

- 虚拟教研室列表筛选区“重置”已迁移到公共 `Button variant="outline"`，继续调用 `resetFilters()`。
- 虚拟教研室列表“查询”继续使用 `Button variant="secondary"` 和 `applyFilters()`，保留显式查询、回车查询、操作消息和卡片/表格视图切换。

F4-18 试点迁移：

- 企业实践申请、年度实践跟踪、实践记录三页筛选区“重置”已迁移到公共 `Button variant="outline"`，继续调用各自页面的 `resetFilters()`。
- 年度实践跟踪和实践记录“查询”使用 `Button variant="secondary"`，申请处理页“查询”使用默认主按钮；三页均保留 `applyFilters()`、搜索回车和 `practiceState.operationMessage` 反馈。
- 该批次只替换筛选栏重置和查询动作，不改变企业实践申请处理、提醒申请、提醒补材料或确认归档等业务动作。

F4-19 试点迁移：

- 教学反思总览隐藏的筛选区“重置”已迁移到公共 `Button variant="outline"`，继续调用 `resetFilters()`，并保留隐藏状态避免改变当前目标图结构。
- 分析报告中心工具区“查询”已迁移到公共 `Button variant="outline" size="icon"`，保留 `title="查询"` 和 `applyFilters()`；“重置”迁移到公共 `Button variant="outline"`。
- 该批次只替换按钮等级，不把报告中心 tab + 筛选混合工具区迁入 `CompactFilterBar`。

F4-20 试点迁移：

- 教学反思总览表格行内“查看”和详情页相关反思表格行内“查看”已迁移到公共 `Button variant="ghost" size="sm"`，保留原详情跳转。
- 教学反思总览右侧“查看相关记录”已迁移到公共 `Button variant="outline" size="lg"`，保留页面内问题关键词过滤；详情页“查看更多相关记录”已迁移到公共 `Button variant="ghost"`，保留返回列表并携带 keyword query。
- 该批次只替换查看类按钮，不改变反思列表、详情、共性问题和相关记录的业务闭环。

F4-21 试点迁移：

- 企业实践申请页“查看申请 / 查看记录”、实践记录页“查看详情 / 查看档案”、年度实践跟踪页“查看申请 / 查看记录”已迁移到公共 `Button variant="ghost" size="sm"`。
- 该批次只迁移定位或查看类动作，不改变 `approvePracticeApplication()`、`returnPracticeApplication()`、`remindPracticeApplication()`、`remindPracticeMaterial()`、`confirmPracticeArchive()` 等状态变更动作。

F4-22 试点迁移：

- 虚拟教研室列表卡片底部“查看详情”已迁移到公共默认 `Button`，保留主操作视觉权重和 `viewDetail(room.id)` 跳转。
- 虚拟教研室列表表格行内“查看详情”已迁移到公共 `Button variant="ghost" size="sm"`，保留 `/admin/virtual-lab/rooms/:roomId` 路由闭环。
- 该批次只迁移教研室列表详情入口，不改变卡片/表格视图切换按钮、筛选栏或新增教研室动作。

F4-23 试点迁移：

- 虚拟教研室详情页标题区“编辑信息 / 邀请教师 / 新建教研活动”已迁移到公共 `Button` 的 `outline`、默认和 `secondary` 等级。
- 成员表“邀请教师 / 查看教师 / 移出”、活动表“查看活动”、记录列表“查看记录”已迁移到公共 `Button`，其中行内查看使用 `ghost size="sm"`，移出使用 `danger size="sm"`。
- 该批次只替换按钮等级和局部样式，不改变 `inviteVirtualLabMember()`、`removeVirtualLabMember()`、`createVirtualLabActivity()`、`viewActivity()`、`viewRecord()` 的业务行为；分页控件仍按表格局部控件保留。

F4-24 试点迁移：

- 虚拟教研活动详情页标题区“编辑活动 / 查看会议记录”、参与区“查看全部”、资料表“查看”、记录区“查看记录 / 形成并查看记录”已迁移到公共 `Button`。
- 顶部非破坏性校对动作使用 `outline`，查看会议记录和形成/查看记录使用默认主按钮，行内资料查看使用 `ghost size="sm"`。
- 该批次只替换按钮等级和局部样式，不改变 `viewMeetingRecord()`、`viewMaterial()`、`viewRecord()` 与未形成记录时 `formVirtualLabRecordFromActivity()` 的业务闭环；返回箭头和复制会议号仍作为图标型局部控件保留。

F4-25 试点迁移：

- 虚拟教研记录详情页标题区“查看来源活动 / 查看来源资料 / 生成档案待确认”、参与记录“查看全部”和来源资料表“查看”已迁移到公共 `Button`。
- 来源活动使用 `outline`，来源资料和生成档案待确认使用默认主按钮，轻量查看入口使用 `ghost` 或 `ghost size="sm"`。
- 该批次只替换按钮等级和局部样式，不改变 `viewSourceActivity()`、`viewSourceMaterials()`、`viewMaterial()` 和 `sendToArchive()` 的业务行为；“生成档案待确认”仍按虚拟教研到成长档案的跨模块本地闭环执行。

F4-26 试点迁移：

- 培训计划详情页参与教师表“查看 / 处理”已迁移到公共 `Button`。
- “查看”使用 `ghost size="sm"` 并保留 `viewTeacherDetail(participant.id)` 跳转成长档案教师详情；“处理”使用 `secondary size="sm"`，仅在申请状态为“待处理”时展示。
- 该批次只替换参与教师表行内动作，不改变 `handleApplication(participant.id)` 同意申请和同步参与名单行为，也不改变返回列表按钮、计划详情侧栏或培训申请状态流转。

F4-27 试点迁移：

- 培训记录详情页证书材料“上传材料”和相关培训记录“查看”已迁移到公共 `Button`。
- “上传材料”使用 `size="sm"` 并保留 `uploadMaterial()` 上传证书后同步记录材料完整状态；相关记录“查看”使用 `ghost size="sm"` 并保留 `viewRelatedRecord(related.id)` 路由跳转。
- 该批次只替换详情页材料区和相关记录表动作，不改变返回列表按钮、材料状态展示、培训记录到成长档案待确认的入档口径。

F4-28 试点迁移：

- 档案处理页详情面板“确认入档 / 再次退回 / 标记异常 / 查看补充说明”已迁移到公共 `Button`。
- “确认入档”使用默认主按钮，“再次退回”使用 `secondary`，“标记异常”使用 `danger`，“查看补充说明”使用 `outline`，四个按钮保留 `detail-action-button` 结构类承接详情面板四列宽度。
- 该批次只替换详情处理动作的按钮等级和局部样式，不改变 `confirmArchive()`、`returnRecord()`、`markException()`、`viewSupplement()` 对 `archiveStore` 的状态流转和处理历史口径。

F4-29 试点迁移：

- 导入批次详情页底部“返回档案处理 / 取消本次任务 / 刷新状态 / 查看上传文件 / 确认识别结果”已迁移到公共 `Button`。
- “返回档案处理”使用 `secondary`，“取消本次任务”和“查看上传文件”使用 `outline`，“刷新状态”和“确认识别结果”使用默认主按钮，并保留 `batch-action-primary` 结构类承接主按钮右推行为。
- 该批次只替换导入批次详情底部动作，不改变 `returnToProcessing()`、`cancelTask()`、`refreshStatus()`、`viewUploadedFiles()`、`confirmResult()` 的路由和批次识别状态流转。

F4-30 试点迁移：

- 档案查阅页“搜索 / 重置 / 查看成长档案”已迁移到公共 `Button`。
- “搜索”和“查看成长档案”使用默认主按钮，“重置”使用 `outline`；搜索按钮保留 `search-action` 结构类，卡片动作保留 `archive-detail-action` 结构类。
- 该批次只替换档案查阅筛选和卡片查看动作，不改变 `applySearch()`、`resetFilters()`、`viewTeacherDetail(teacher.id)` 的筛选和路由行为；卡片/列表视图切换仍作为分段视图控件保留。

F4-31 试点迁移：

- 导入部门资料上传页“选择文件 / 从本地文件夹导入 / 删除 / 取消 / 开始识别资料”已迁移到公共 `Button`。
- 上传区入口和底部操作使用 `size="lg"`，行内删除使用 `ghost size="sm"`；页面仅保留 `upload-action-button`、`file-remove-action`、`bottom-cancel-action`、`bottom-primary-action` 结构类承接局部宽度和强调阴影。
- 该批次只替换上传页操作按钮，不改变 `selectFiles()`、`importFromFolder()`、`removeFile(file.id)`、`cancelUpload()`、`startRecognition()` 的文件选择、删除、返回和创建导入批次行为。

F4-32 试点迁移：

- 教师档案详情页“返回档案查询 / 打印 / 导出 PDF / 关闭 / 查看来源记录 / 查看记录详情”已迁移到公共 `Button`。
- 返回和来源入口使用 `ghost`，打印、导出、关闭和记录详情使用 `outline`；页面保留 `archive-back-action`、`archive-toolbar-action`、`source-record-action`、`source-record-detail-action` 结构类承接档案阅读页的宽度、箭头和局部排版。
- 该批次只替换教师档案详情和来源抽屉中的真实动作按钮，不改变 `goBack()`、`printArchive()`、`exportPdf()`、`openDrawer(type)`、`viewRecordDetail(record)` 的路由、打印、导出降级示例和来源过滤反馈行为；来源抽屉 tab 仍按分段筛选控件保留。

F4-33 试点迁移：

- 能力清单基准模板页顶部“优化建议 / 发布新版本”已迁移到公共 `Button`。
- “优化建议”使用默认主按钮并滚动到本页优化建议工作区，“查看版本记录”保留标题轻量入口；基准模板页不再承载派生执行版动作，派生入口归属执行版页。
- 基准模板发布新版本只在存在修订草稿时显示，点击后确认 `pendingBaseTemplateChanges` 并生成新的基准模板版本。

F4-34 试点迁移：

- 能力清单执行清单页顶部“派生下一周期 / 历史版本 / 确认发布 / 取消发布”已迁移到公共 `Button`；能力结构的新增、编辑和删除不放在顶部动作区。
- “派生下一周期”只打开派生抽屉，确认后生成待发布执行清单；待发布态显示“确认发布 / 取消发布”，点击“确认发布”在当前执行清单页直接发布待发布版本；能力结构卡片右上角显示新增维度图标，一级/二级维度节点悬浮显示编辑和删除图标；已发布态存在待确认调整时显示“确认调整”和“撤回调整”。
- 执行清单编辑指标保存后，在已发布态进入待确认调整，不直接写入正式执行版；在待发布态直接修改待发布草稿。发布确认页只保留兼容入口，无待发布版本时不得确认发布。

F4-35 试点迁移：

- 能力清单发布确认页底部“返回修改 / 确认发布”已迁移到公共 `Button`。
- “返回修改”使用 `outline`，“确认发布”使用默认主按钮；无待发布执行清单或发布后均保持禁用态。页面移除局部 `.btn-primary` / `.btn-secondary` 按钮样式。
- 发布确认页不派生版本，只发布执行清单页生成的待发布草稿；直接访问且不存在待发布草稿时显示空状态并引导返回执行清单。

F4-36 试点迁移：

- 能力清单岗位/聘期要求映射页“新增要求项 / 编辑 / 删除 / 编辑映射 / 确认配置”已迁移到公共 `Button`。
- 表格行内“编辑”使用 `ghost size="sm"`，删除类动作使用 `danger`，确认配置使用 `secondary`；页面移除局部 `.btn-link` 和遗留 `.btn-danger` 样式。
- 该批次只替换要求映射页中表格、右侧详情和抽屉外的真实动作按钮，不改变 `addNewMapping()`、`openEditDrawer(mapping)`、`deleteMapping()`、`confirmMapping()` 的新增、编辑、删除和确认配置 store 行为。

F4-37 试点迁移：

- 能力清单基准模板页内优化建议工作区“上传制度文件 / 重新分析运行反馈 / 人工补充建议 / 形成修订草稿 / 采纳建议 / 暂缓处理”已迁移到公共 `Button`。
- 基准模板页 Hero 下方使用 `AdminTabs` / `AdminTabPane` 承接 Element Plus Tabs，提供“基准清单 / 优化清单”两个工作模式；工作区工具栏使用默认和 `secondary`；表格只负责选择建议，采纳、暂缓和形成修订草稿集中在右侧详情区处理；旧优化路由保留兼容提示并跳转到基准模板页 `?optimization=1`。
- 该批次保留前端模拟闭环：上传制度文件通过抽屉生成制度来源建议，重新分析运行反馈显示分析状态并生成反馈来源建议，人工补充建议通过抽屉进入同一建议列表，空列表和无选中详情均需有明确空状态。

F4-38 试点迁移：

- 能力画像群体页“查看关联教师”和建议关注对象表格行内“查看画像”已迁移到公共 `Button`。
- “查看关联教师”使用 `outline`，保持跳转教师画像并携带重点支持筛选；表格行内“查看画像”使用 `ghost size="sm"`，教师对象保持详情跳转，院系 / 专业对象仍给出明确降级提示。
- 该批次只替换群体画像页真实动作按钮，不改变 `viewFullAdvice()`、`viewProfile(item.name)` 和 `viewMoreObjects()` 的业务行为；“查看更多对象”仍是明确降级提示入口，不标记为独立列表完成。

F4-39 试点迁移：

- 企业实践记录页“导出记录”和年度实践跟踪页“导出名单”已迁移到公共 `Button` 默认主按钮。
- 两个导出入口仍调用页面内 `exportRecords()` / `exportList()`，按当前筛选结果给出导出准备反馈；页面移除对应局部 `.btn-primary` 样式。
- 该批次只替换企业实践列表页顶部导出主动作，不改变筛选、表格定位、材料提醒、确认归档或实践申请状态流转。

F4-40 试点迁移：

- 教学反思详情页“查看来源数据”已迁移到公共 `Button variant="outline" size="lg"`。
- 该按钮保留 `source-data-action` 结构类承接 220px 宽度，点击后仍展示当前反思关联的课堂、评价和画像数据反馈。
- 该批次只替换来源数据查看动作，不改变反思详情、相关反思跳转、查看更多相关记录或来源数据展示口径。

F4-41 结构类清理：

- 教师档案详情页已将共享 `Button` 上残留的 `btn-back`、`btn-action`、`btn-source`、`btn-detail` 结构类改为语义化结构类。
- 档案处理页移除未使用的 `.btn-icon` 样式，避免后续按钮扫描把非按钮图标样式误判为待迁移按钮。
- 该批次只清理结构类命名和无用样式，不改变档案详情来源抽屉、打印导出、返回关闭或档案处理状态动作。

F4-42 试点迁移：

- 教学反思详情页和培训计划详情页“返回列表”已迁移到公共 `Button variant="ghost"`，并使用 `detail-back-action` 承接详情页返回入口的局部间距和字重。
- 培训记录详情页没有返回按钮，仅删除未使用的 `.btn-back` 样式。
- 该批次只替换详情页返回入口和死样式，不改变 `goBack()` 的路由目标、培训参与处理或教学反思来源数据行为。

F4-43 试点迁移：

- 企业实践申请页“同意”已迁移到公共 `Button size="sm"`，“退回修改”已迁移到 `Button variant="danger" size="sm"`，保留申请审核和退回状态流转。
- 企业实践记录页“提醒补材料”已迁移到 `Button variant="secondary" size="sm"`，“确认归档”已迁移到 `Button size="sm"`，保留提醒和归档确认反馈。
- 年度实践跟踪页“提醒申请”已迁移到 `Button variant="secondary" size="sm"`，保留未启动教师的提醒流转。
- 三页行内操作容器统一使用 `row-action-group` 承接表格操作列布局，删除本地 `.btn-approve`、`.btn-return`、`.btn-remind`、`.btn-confirm` 样式。

F4-44 收尾迁移：

- 报告中心卡片动作已从本地 `.btn-action` 按钮迁移到公共 `Button variant="outline"`，并用 `report-card-action` 承接卡片底部操作尺寸和 hover 效果。
- 培训计划主入口“新建培训计划”已将共享 `Button` 上的结构类从 `btn-create` 改为 `create-plan-action`。
- 本批次后 `frontend/src/pages/admin/**/*.vue` 范围内不再保留 `btn-*` 页面级按钮类；后续新增页面动作默认使用公共 `Button` 和语义化结构类。

### 状态徽章

- 管理端业务状态优先使用 `frontend/src/components/common/StatusBadge.vue`。
- 状态文案和 tone 统一维护在 `frontend/src/components/common/status-badge.ts`，公共入口导出 `adminStatusRegistry`、`teacherStatusRegistry`、`adminStatusKeys`、`teacherStatusKeys`、`AdminStatus`、`TeacherStatus` 和 `getStatusBadgeMeta`。
- 页面不应为业务状态新增局部 `.badge-status.status-*` 样式；确需特殊展示时，先判断是否应扩展 `StatusBadge` 的文案和 tone。
- 业务状态枚举、文案和状态口径仍归属 `frontend/src/domain/admin/*`；`StatusBadge` 只负责稳定展示，不承载业务流转。
- 已迁移范围：能力清单优化建议状态、基准模板启用态、执行版主状态、版本记录状态、发布确认状态、要求映射状态、成长档案档案处理记录状态、导入批次状态、批次文件状态、培训资源状态、培训需求状态、培训计划状态、培训申请状态、培训记录材料状态、培训材料上传状态、培训参与状态、企业实践申请状态、企业实践年度跟踪状态、企业实践记录状态、虚拟教研活动记录状态、虚拟教研参与同步状态、报告中心报告状态、报告中心 AI 会话状态。

F5-01 当前扫描结论：

- `StatusBadge` 当前支持 `success`、`warning`、`danger`、`info`、`neutral`、`purple` 六类 tone；未命中的管理端状态默认落到 `neutral`。
- `StatusBadge` 通过共享 registry 维护管理端和教师端两套状态文案映射，管理端默认 `scene="admin"`；手机端或教师端状态必须显式使用教师端场景。
- `adminStatusRegistry` 和 `teacherStatusRegistry` 使用 `as const satisfies Record<string, StatusBadgeMeta>` 定义；新增稳定业务状态时，优先让调用侧使用 `AdminStatus` / `TeacherStatus` union，只有未知后端字符串进入 `getStatusBadgeMeta(status: string)` 的兜底路径。
- 已补入本轮新增管理端流程状态：`导出中`、`处理中`、`失败`、`同步失败`、`重新同步中`、`归档`、`停用`、`待沉淀`、`已生成待确认档案`。
- `frontend/src/domain/admin/domainTypes.test.ts` 已对能力清单、成长档案、培训、企业实践、虚拟教研、报告中心等页面做源码 guardrail，要求使用 `<StatusBadge>` 且不回退局部 `.badge-status`。
- `frontend/src/components/common/StatusBadge.test.ts` 已覆盖新增管理端流程状态必须进入共享 registry，并验证组件按 registry 渲染文案和 tone。
- 当前仍允许能力清单指标表等专用组件保留非业务流转型的局部徽章样式；后续迁移时需先判断它是否是业务状态，不能机械替换。

状态 tone 口径：

| Tone | 语义 | 典型状态 | 使用规则 |
| --- | --- | --- | --- |
| `success` | 已完成、已确认、已生效、可用 | 已入档、已确认、已发布、可用、已完成、已归档、已同步、已生成 | 表示流程已正向落地或对象可被后续业务消费 |
| `warning` | 待处理、待确认、待补充、进行中但需要关注 | 待确认、待补充、待匹配、待审核、退回修改、材料待完善、证书待补 | 表示仍需人或系统继续处理；不代表失败 |
| `danger` | 异常、停用、拒绝、负向结果 | 异常待处理、已停用、未同意、记录异常、数据不足、已弃用 | 表示有阻断、负向后果或需要重点处理 |
| `info` | 系统处理、识别、已应用、可查看 | 识别中、识别完成、已应用、学习中、待开始、实践中 | 表示信息性进度，不承担成功或风险判断 |
| `neutral` | 草稿、取消、暂缓、复用、线索 | 草稿、已取消、暂不处理、已撤回、候选线索 | 表示非最终业务结论或不需要强调的中性状态 |
| `purple` | 可完善、建议类、成长潜力类状态 | 可完善 | 仅用于需要区别于普通 warning 的成长建议或完善机会 |

实施规则：

- 新增业务状态先在 domain / store 明确枚举和状态流转，再补 `StatusBadge` 文案和 tone；不要在页面内临时写 class map。
- 页面已有中文状态值时可直接传 `status`；如果页面必须展示不同文案，使用 `label` 覆盖，但不能改变原业务状态枚举。
- tone 覆盖只用于同一状态在特定上下文中的展示差异；如果多个页面都需要覆盖，说明应回到 `StatusBadge` 统一映射。
- 统计卡、图标、头像、维度标签等展示型 tone 不归 `StatusBadge` 管理；只有业务状态、流程状态、记录状态进入本规则。
- 表格、详情页、抽屉里的同一业务状态必须使用同一文案和 tone，不得因位置不同变色。

### 空状态

- 管理端表格和面板空状态优先使用 `frontend/src/components/common/EmptyState.vue`。
- `EmptyState` 只负责空状态展示和可选操作按钮事件，不承载筛选、分页、store 或业务判断。
- 表格空行使用 `as="td"`、`variant="cell"` 和显式 `colspan`，必须保留原表格列数。
- 面板空状态使用默认 `as="div"` 和 `variant="panel"`；在卡片栅格内需要跨列时使用通用布局类承接，不新增页面私有 `*-empty-state` class；说明文案应给出下一步方向，不写泛化的“暂无数据”。
- 已迁移范围：培训、企业实践、能力清单、反思概览、报告中心、虚拟教研室共 14 个空状态点。

### 表格密度

管理端表格先按信息密度分档，不直接全量抽成单一 Table 组件。现阶段页面里仍存在多套局部表格样式，后续迁移时必须先判断目标图属于哪一档，再替换为通用结构。

F6-01 当前扫描结论：

- 管理端表格、表头、单元格相关源码命中约 437 处，覆盖能力清单、成长档案、培训、企业实践、教学反思、虚拟教研等模块。
- 高频模式集中在 `table-layout: fixed`、`font-size: 13px`、表头高 38-48px、数据行高 42-70px、单元格横向 padding 12-15px。
- 已有紧凑关联表：如反思详情相关记录，表头 38px、行高 42px，适合详情页局部引用。
- 已有标准业务列表：如反思总览，表头 42px、行高 50px，适合单屏扫描和中等字段量。
- 已有宽信息列表：如培训、企业实践、能力清单要求映射，常用 `padding: 13px 12px` 或 `15px 14px`，适合字段多、状态多、需要横向滚动的页面。

密度口径：

| 密度 | 使用场景 | 表头 | 数据行 | 字号 | 单元格 | 操作列 |
| --- | --- | --- | --- | --- | --- | --- |
| 紧凑关联表 | 详情页里的相关记录、材料清单、来源记录 | 38-40px | 42-46px | 13px | `padding: 0 12px` 或 `0 14px`，长文本省略 | `ghost` 文本按钮，最多 1-2 个动作 |
| 标准业务列表 | 管理页主列表、筛选结果列表 | 42-48px | 50-56px | 13px | `padding: 0 12px` 或 `13px 12px`，必要时 `table-layout: fixed` | 查看/编辑等轻量动作使用 `Button variant="ghost"`；需要强调的行内状态动作使用 `secondary` 或 `danger` |
| 宽信息列表 | 字段多、状态多、需要横向滚动的业务表 | 46-50px | 60-70px | 13px | `padding: 13px 12px` 到 `15px 14px`，允许固定列宽 | 操作列宽度明确，不挤压状态列和主对象列 |

实施规则：

- 主对象列通常左对齐并加重；状态列居中或保持徽章自然宽度；数字、进度、学时等可居中。
- 表格空行必须继续使用 `EmptyState as="td"`，不得回退到裸 `暂无数据` 文本。
- 行内动作必须有真实跳转、状态变化或明确降级提示；只读值不得伪装成按钮。
- 不因为抽组件强行统一所有行高；详情页关联表允许比主列表更紧凑，培训/档案等多字段列表允许更高行高。
- 新增表格优先从以上三档选择，不新增第四套密度；确需例外时，先在本节补充口径。

### 筛选栏

筛选栏用于列表工作台的查询条件组织，不承载业务详情、审批动作或状态流转。现有 `FilterBar` 偏通用表单式筛选，`CompactFilterBar` 覆盖管理端高频的紧凑筛选行，不强行替换左侧筛选面板或 tab 工具区。

E14-01 当前扫描结论：

- 已覆盖第一批：培训资源、培训需求、培训申请。三页均为 4 个 select + 1 个搜索输入 + 重置 / 查询动作，布局接近，业务状态由页面和 `trainingStore` 承载。
- 已覆盖第二批：培训计划、培训记录、虚拟教研室列表。培训计划和培训记录保留输入即过滤、不新增查询按钮；虚拟教研室保留显式查询动作和视图切换。
- 已覆盖第三批：企业实践申请、年度实践跟踪、实践记录。三页保留原年度/院系/状态/完成情况/计入天数等筛选字段、搜索输入、重置 / 查询动作和操作反馈，实践跟踪与实践记录页顶部导出动作仍留在列表标题区。
- 已覆盖第四批：教学反思总览。保留组织范围、学期、触发来源、搜索输入、问题定位提示和原有重置动作，不新增查询按钮，不迁移右侧共性观察。
- 暂不迁移：档案查阅页。它是搜索区 + 筛选控件 + 视图/卡片结果组合，视觉权重高于普通表格筛选栏。
- 禁止迁移：档案处理左侧筛选面板、报告中心 tab + 筛选混合工具区、能力清单优化建议来源侧栏。这些不是横向筛选栏，强迁会破坏目标图区域结构。

建议组件边界：

- 组件只提供外壳、字段行、搜索行、消息区和动作区的布局插槽；字段值、筛选函数、store 写入仍由页面负责。
- select / input 控件允许页面直接渲染，避免公共组件过早理解不同模块字段枚举。
- 重置、查询、新增等按钮由页面通过插槽传入；公共组件不内置业务按钮文案。
- 组件不得承载分页、表格、左侧树、tab、统计卡或右侧摘要面板。

推荐接口：

```vue
<CompactFilterBar>
  <template #fields>
    <!-- 页面渲染 select / input 字段 -->
  </template>

  <template #search>
    <!-- 页面渲染搜索输入 -->
  </template>

  <template #actions>
    <!-- 页面渲染重置、查询、新增等动作 -->
  </template>

  <template #message>
    <!-- 页面渲染操作反馈 -->
  </template>
</CompactFilterBar>
```

命名口径：

- 保留现有 `FilterBar`，不在本轮改造中重写它。
- 已新增 `frontend/src/components/common/CompactFilterBar.vue`，用于培训管理、企业实践和虚拟教研室列表这类紧凑表格筛选栏。
- 组件测试只验证插槽区域和响应式外壳；页面 guardrail 只验证已迁移页面使用公共组件且保留筛选字段、搜索、重置、查询或必要业务动作入口。
- 已覆盖培训资源、培训需求、培训申请、培训计划、培训记录、企业实践申请、企业实践跟踪、企业实践记录、虚拟教研室列表、教学反思总览筛选区；目标效果图为培训管理资源/需求/申请/计划/记录、企业实践申请/跟踪/记录、虚拟教研室列表和教学反思总览对应管理端效果图。

### 详情页布局

详情页用于承载“一个业务对象”的完整上下文，不等同于抽屉、弹窗或列表右侧预览。现阶段先收敛页面布局规则，暂不强制抽公共 DetailPage 组件。

F7-01 当前扫描结论：

- 独立详情页主要包括培训计划详情、培训记录详情、教学反思详情、虚拟教研室详情、虚拟教研活动/记录详情、教师档案详情、教师能力画像详情。
- 页面内右侧详情面板主要出现在档案处理、资源摘要等列表工作台中，属于“当前选中对象预览”，不应承载完整对象详情的全部职责。
- 详情抽屉用于来源记录、编辑表单、版本记录等短流程，宽度和底部操作归 F8，不在本节定最终结构。

详情页结构口径：

| 区域 | 内容 | 布局规则 |
| --- | --- | --- |
| 返回 / 面包屑 | 上级模块、当前对象、返回列表 | 放在页面顶部；返回必须真实跳转或回退，不做纯视觉按钮 |
| 标题区 | 对象名称、状态徽章、关键身份信息 | 使用独立标题卡或 profile card；标题只放一个主对象名，状态用 `StatusBadge` |
| 摘要区 | 教师、院系、时间、来源、参与人数、学时等高频字段 | 可用横向 `|` 分隔或 2-4 列摘要网格；只放识别对象所需字段，不放长正文 |
| 主内容区 | 基本信息、记录正文、材料、参与名单、相关记录 | 使用纵向 `content-card` / `detail-section` 分组；每组标题必须是业务概念，不用“模块一/模块二” |
| 侧栏区 | 记录信息、来源数据、材料情况、记录去向、参与统计 | 用窄列卡片承载辅助判断；不能把主正文挤到侧栏 |
| 来源 / 相关记录 | 来源数据、关联记录、处理历史、去向说明 | 来源必须能追溯到真实记录或给出明确降级提示；相关记录表按 F6 紧凑关联表处理 |

实施规则：

- 独立详情页优先采用“标题卡 + 主内容宽列 + 右侧窄栏”的结构；当对象是虚拟教研室这类工作台型详情时，可采用 profile card + 双列内容卡。
- 主内容列承载可阅读正文和主要业务判断，右侧栏承载元信息、来源、去向、材料状态和小统计。
- 标题区不要堆多个主按钮；关键动作放标题卡右侧或相关卡片内，按钮等级仍按 F4 执行。
- 详情页里的表格遵循 F6；详情页里的状态遵循 `StatusBadge`；详情页空状态遵循 `EmptyState`。
- 详情页不直接复制列表页筛选栏。需要查看更多相关记录时，应跳回列表页并携带 query 或打开明确的来源/相关记录抽屉。
- 页面内右侧详情面板只能展示当前选中对象的摘要、来源、问题和处理历史；需要完整查看时应有明确详情入口。

### 右侧摘要面板

右侧摘要面板用于列表工作台内的辅助判断，不承载完整业务对象详情。组件化只覆盖“标题 + 提醒/洞察列表 + 当前选中对象摘要 + 一个底部动作”的稳定结构。

E13-01 当前扫描结论：

- 已覆盖第一批：培训需求页右侧“资源匹配建议”、培训申请页右侧“处理提醒”。两者结构稳定，均为提醒列表、当前选中对象和单个动作，业务状态仍由主表格和 store 承载。
- 已覆盖第二批：培训资源页右侧“资源概览”。它包含三组分布统计和当前资源摘要，结构比提醒列表更重，但仍属于列表工作台辅助判断。
- 已覆盖第三批：培训计划页右侧“执行提醒”。它只承载提醒列表和“查看相关计划”筛选入口，适合继续使用轻量摘要外壳。
- 暂不迁移：档案处理右侧“记录详情”、报告中心详情面板、能力清单优化建议详情。它们包含多字段详情、处理动作、历史记录或报告上下文，更接近详情面板，不应被简化成摘要组件。
- 禁止迁移：独立详情页侧栏，如培训计划详情、培训记录详情、虚拟教研详情、教师档案阅读导航。这些侧栏属于完整详情页布局，按 F7 维护，不纳入 E13 第一批。

建议组件边界：

- 组件只提供卡片外壳、标题区、列表容器、当前对象摘要容器和底部动作容器。
- 列表项的图标、颜色、文案和点击行为由页面传入；组件不理解培训、档案、报告等业务状态。
- 组件不内置筛选、分页、表格、处理动作组或详情字段网格。
- 页面仍负责选中对象、store 写入、降级提示和跳转逻辑。

推荐接口：

```vue
<InsightSidebar title="处理提醒">
  <template #items>
    <!-- 页面渲染提醒/洞察列表 -->
  </template>

  <template #selected>
    <!-- 页面渲染当前选中对象摘要 -->
  </template>

  <template #action>
    <!-- 页面渲染底部单一动作 -->
  </template>
</InsightSidebar>
```

命名口径：

- 公共组件为 `frontend/src/components/common/InsightSidebar.vue`。
- 组件测试为 `frontend/src/components/common/InsightSidebar.test.ts`，只测标题和插槽渲染，不测试页面业务。
- 页面迁移 guardrail 放在 `frontend/src/pages/admin/adminVisualActions.test.ts`，只证明试点页使用公共组件并保留原文案、当前选中对象和动作入口。
- 已覆盖培训需求页右侧“资源匹配建议”、培训申请页右侧“处理提醒”、培训资源页右侧“资源概览”和培训计划页右侧“执行提醒”；目标效果图为培训管理需求管理、申请管理、资源管理和培训计划对应管理端效果图。

### 抽屉宽度和结构

抽屉用于短流程侧边工作面，包括编辑表单、版本记录、来源记录、轻量详情和确认动作。抽屉不替代独立详情页；需要完整阅读一个业务对象时仍按 F7 进入详情页。

F8-01 当前扫描结论：

- `DetailSheet` 已提供 `sm` 360px、`md` 480px、`form` 540px、`source` 540px、`history` 620px、`lg` 640px、`complex` 660px、`xl` 760px 八档宽度；当前培训计划新建抽屉使用 `md`，培训资源详情使用 `lg`，能力清单基准模板编辑指标和执行版编辑指标抽屉使用 `form`，基准模板版本记录和执行版历史版本抽屉使用 `history`，能力清单要求映射编辑抽屉使用 `complex`，成长档案来源记录抽屉使用 `source`。
- `DetailSheet` 底层已迁移到 `AdminDrawer` / Element Plus Drawer；页面继续使用 `DetailSheet` 的业务 API，不直接使用 `ElDrawer`。
- 培训计划新建抽屉已迁入 `DetailSheet md`，属于轻量新建表单。
- 教师档案来源记录抽屉宽 `min(540px, calc(100vw - 28px))`，顶部留出正文阅读上下文，承载来源卡片、筛选 tab 和底部说明。

宽度口径：

| 类型 | 使用场景 | 建议宽度 | 结构要求 |
| --- | --- | --- | --- |
| 轻量详情 / 确认抽屉 | 只读摘要、确认、完成提示 | 360-480px；优先 `DetailSheet sm/md` | 标题 + 简短说明 + 摘要内容 + 右对齐底部动作 |
| 轻量新建表单 | 字段少、单列为主的新建流程 | 480-520px；优先 `DetailSheet md` | 表单纵向排列；底部固定取消、保存草稿、提交 |
| 标准编辑表单 | 1-2 列字段、局部业务配置 | 540-560px；优先 `DetailSheet form` | 右侧全高抽屉；头部、提示区、滚动表单、固定底部动作 |
| 复杂编辑表单 | 字段分组、映射关系、删除动作 | 640-720px；优先 `DetailSheet complex` | 分组区块明确；危险动作可在底部左侧，确认动作在右侧 |
| 版本 / 历史记录抽屉 | 版本记录、处理记录、变更说明 | 620-760px；优先 `DetailSheet history/lg/xl` | 卡片列表或时间线；只读动作为主，不混入主表单编辑 |
| 来源记录抽屉 | 档案来源、相关记录、可筛选记录卡片 | 540-760px；优先 `DetailSheet source`，需要保留阅读上下文时使用 `placement="reader"` | 顶部说明 + tab / 状态筛选 + 可滚动记录列表 + 来源说明 |

实施规则：

- 抽屉统一右侧进入；普通业务抽屉使用全高结构，阅读型来源记录可用 `DetailSheet placement="reader"` 保留顶部偏移以露出原详情页上下文。
- 结构顺序固定为 header、可选 description / tip、body、footer；body 独立滚动，footer 固定在底部。
- 底部按钮按 F4 执行：取消用 `outline`，保存草稿用 `secondary`，提交/确认用 `default`，删除/作废用 `danger`。危险动作存在时放底部左侧，提交动作放右侧。
- 只读详情、确认、轻量记录优先复用 `DetailSheet`；当目标图要求特殊宽度、顶部偏移、tab 或分组表单时，先评估是否扩展 `DetailSheet` 的受控宽度或 placement，确实不稳定时再保留页面局部抽屉样式。
- 抽屉内可使用 F6 紧凑关联表或记录卡片；不放整页筛选栏，不把主列表复制进抽屉。
- 抽屉内状态仍使用 `StatusBadge`，空状态仍使用 `EmptyState`；只读值不能伪装成按钮。
- 响应式必须设置 `max-width`、`min()` 或小屏 100% 宽度；不得写死为单一截图尺寸。

适用和禁用边界：

- 适用：局部编辑、版本记录、来源记录、轻量只读详情、确认动作、从当前页面对象派生出的短流程。
- 慎用：字段超过三个分组、需要大面积对比、需要复杂表格横向滚动、需要跨模块导航的场景；优先考虑独立详情页或工作台页。
- 禁用：替代独立详情页承载完整业务对象、承载主列表筛选和分页、把不可用动作伪装成可点击入口、在抽屉中再打开同级抽屉。

## 业务交互要求

- 页面中不应出现未实现但看起来可点击的空操作。
- 静态分页展示不应使用 `button`。只有接入真实分页状态、禁用态和点击处理的分页控件才允许使用按钮；仅用于展示当前页、页数或上一页/下一页占位时，使用 `span`、`aria-current="page"` 和只读样式，不能用 disabled button 伪装成分页闭环。
- 顶栏范围、年度、消息数等全局上下文若尚未接入切换或消息中心，只能作为只读展示；不得使用 `button` 或 pointer 光标伪装成交互控件。
- 管理端页面和关键组件的原生 `<button>` 必须具备真实 `@click`、显式禁用态或表单提交语义；`frontend/src/pages/admin/adminVisualActions.test.ts` 会扫描无动作原生按钮，新增页面时必须同步纳入该 guardrail 或使用公共 `Button`。
- 如果当前阶段只支持视觉反馈，应在本次交付说明中明确，不能标记为业务完成。
- 路由跳转、返回、详情、提交、状态切换需要按模块审计。

## 验收

管理端页面修改完成后执行：

```bash
cd frontend
npm run test
npm run typecheck
npm run build
```

Store 行为修改可先执行更小范围的验证：

```bash
cd frontend
npm run test:stores
```

### 模块级测试约定

- `frontend/src/domain/admin/*.test.ts`：覆盖业务状态枚举、状态文案、状态样式 helper，以及页面不再内联业务状态样式的源码 guardrail。
- `frontend/src/stores/admin/*Store.test.ts`：覆盖跨页面业务状态流转、列表写入、详情读取、审批/确认/退回/异常等动作，以及写入成长档案处理记录的副作用。
- `frontend/src/stores/admin/*Store.structure.test.ts`：覆盖拆分后的 `initialData`、`actions` 可对注入 state 独立运行，避免单例 store 难以测试。
- 已拆为 `initialData.ts` + `actions.ts` 的管理端 store 必须同步存在对应 `*Store.structure.test.ts`；`frontend/src/stores/admin/adminStoreStructure.test.ts` 负责扫描该约定，防止后续只拆文件不补结构测试。
- `frontend/src/services/mock/*.test.ts`：覆盖稳定 mock service 的数据形状、克隆隔离和页面消费入口，防止页面重新承载大段 mock 数组。
- `frontend/src/components/common/*.test.ts`：覆盖可复用组件的 props、渲染形态和关键事件；新增公共组件至少补一个最小组件测试。
- `frontend/src/pages/admin/*.test.ts`：只做页面源码级 guardrail，例如路由页面映射、视觉态按钮、空状态组件使用；真实业务行为优先放到 store/domain 测试。
- 新增或修改 store 行为时，先补对应 `*Store.test.ts`；只改页面文案、布局或只读展示时，可用页面源码 guardrail 或文档自检，不强行挂载整页。

### 抽组件结构自检

F10-01 用于每次抽组件、迁移公共组件或替换 token 后的结构检查。视觉还原已在转化阶段验收过，后续不重复做全量截图验收，但不能因为抽组件破坏目标效果图的区域关系、比例和密度。

每次影响页面结构的重构，至少按以下清单自检，并在本次交付说明中说明关键结论：

| 检查项 | 必查内容 | 说明方式 |
| --- | --- | --- |
| 目标效果图 | 当前页面对应的 `效果图/管理PC端/...` 文件名 | 记录被影响的效果图或说明本次不影响页面结构 |
| 区域结构 | 顶部、筛选区、主列表/主内容、右侧栏、抽屉、底部操作是否仍对应目标图 | 记录“结构不变”或列出调整点 |
| 比例与密度 | 容器宽度、列数、表格行高、按钮尺寸、卡片间距是否仍符合 F4-F8 规则 | 记录采用的按钮/表格/详情/抽屉规则编号 |
| 业务入口 | 查看、编辑、提交、返回、关闭、筛选等入口是否仍有真实动作或明确降级 | 记录是否新增/移除入口和业务影响 |
| 响应式 | 至少确认宽桌面和较窄桌面不会溢出、重叠或写死单一截图尺寸 | 记录视口范围或说明仅文档/测试变更 |
| 验证命令 | 页面代码变更执行 `npm run test`、`npm run typecheck`、`npm run build`；纯文档变更执行文档自检 | 记录实际命令和结果 |

实施规则：

- 抽组件不等于重做视觉；优先保持目标图的信息层级、区域边界和交互入口。
- 如果公共组件默认样式与目标图冲突，先用页面结构类保留布局，再评估是否扩展公共组件，不直接把公共组件改成单页特例。
- 如果本次只改 store、domain、mock service 或测试，不影响页面结构，交付说明可写“结构不变”，但仍要说明涉及页面入口是否变化。
- 如果本次改动会改变效果图结构、比例或密度，必须说明原因和受影响页面，不能直接标记为无风险迁移。
- 视觉验收应覆盖多个桌面视口。
