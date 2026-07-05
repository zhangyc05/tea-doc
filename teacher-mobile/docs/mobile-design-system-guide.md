# 教师手机端设计系统指南

本指南记录 `teacher-mobile/` 的稳定移动端设计规则。逐页精修以当前目标效果图、页面源码和实际运行效果为准。

## 工程边界

- `teacher-mobile/` 是教师手机端唯一工程，目标交付 H5、微信小程序、App。
- `frontend/` 继续承载管理端 PC，不承载教师手机端页面。
- 手机端页面不复用管理端 PC 布局、路由和样式。
- 页面配置以 `teacher-mobile/src/pages.json` 为准。

## 当前基准

```txt
页面：教师端手机｜活动｜活动首页
源码：teacher-mobile/src/pages/activity/index.vue
目标图：效果图/已实现/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页.png
```

H5 视觉验收视口：

```txt
390x844
375x812
430x932
360x800
```

## 效果图剥离规则

- 不实现模拟手机信号、电量、Wi-Fi。
- 不实现设计稿中的手机壳、系统状态栏、系统底部手势条。
- 页面只保留真实安全区占位：`var(--status-bar-height)` 和 `env(safe-area-inset-bottom)`。
- 如果效果图顶部有系统状态栏，只作为截图环境，不作为页面内容。

## 页面容器

- 页面使用浅绿到浅蓝的纵向背景，顶部保留状态栏空间。
- 横向内边距以 `28rpx` 为基准，窄屏可收敛到 `22rpx`。
- 一级 Tab 页使用 `MobilePageShell` 加 `MobileTabBar`。
- 二级页优先使用 `MobileNavbar`。
- 带 TabBar 页面底部必须预留：

```scss
padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
```

- 固定底部操作区必须增加页面底部滚动预留，不能遮挡最后一张内容卡。

## 视觉规则

- 内容卡片使用白色或白色半透明背景。
- 内容卡片圆角基准：`32rpx`。
- 顶部教师周期卡圆角基准：`40rpx`。
- 小图标容器圆角：`20rpx` 到 `28rpx`。
- 卡片阴影保持轻量：

```scss
box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
```

字号层级：

```txt
页面主标题：62rpx - 70rpx
卡片标题：36rpx - 44rpx
业务主标题：25rpx - 34rpx
正文说明：20rpx - 27rpx
标签文字：20rpx - 25rpx
底部 Tab 文字：26rpx
```

后续页面优先沿用这些层级，不为单页单独发明新字号。

## 核心组件

已沉淀组件：

```txt
teacher-mobile/src/components/MobileNavbar.vue
teacher-mobile/src/components/MobilePageShell.vue
teacher-mobile/src/components/MobileCard.vue
teacher-mobile/src/components/MobileStatusTag.vue
teacher-mobile/src/components/MobileActionButton.vue
teacher-mobile/src/components/MobileTabBar.vue
```

组件边界：

- `MobileNavbar`：状态栏、返回、居中标题、右侧操作插槽。
- `MobilePageShell`：页面背景、横向内边距、底部 TabBar 和安全区预留。
- `MobileCard`：白色内容卡片的边框、圆角、背景和阴影。
- `MobileStatusTag`：紫、蓝、橙、绿四类轻量状态标签。
- `MobileActionButton`：清理 UniApp `button` 默认样式，提供主按钮、描边按钮、文本链接。
- `MobileTabBar`：固定底部入口；对外保持统一组件，内部使用 Wot Design Uni `wd-tabbar` / `wd-tabbar-item` 承载。

暂不抽象状态栏、通知铃、搜索框、业务图标、首页业务卡片、记录列表行；等更多页面重复后再判断。

## TabBar

- 不使用 UniApp 原生 `tabBar` 配置。
- 页面只使用 `teacher-mobile/src/components/MobileTabBar.vue`，禁止在页面内直接新增一套底部导航。
- `MobileTabBar` 内部使用 Wot Design Uni `wd-tabbar`，通过 `wd-tabbar-item` 的 `#icon` 插槽定制图标。
- 普通入口图标使用 `teacher-mobile/static/tabbar/` 下的 PNG 资源，不再用 CSS `clip-path` 手绘图标；源 SVG 保留在 `teacher-mobile/static/tabbar-src/`。
- 底部视觉以最近入档类效果图为基准：白色圆角浮层、中间 `AI 助手` 圆形凸起、当前项绿色、其余项灰蓝色。
- 不实现效果图里的系统 Home Indicator；只保留真实 `env(safe-area-inset-bottom)` 安全区。
- 入口顺序固定为：

```txt
待办 / 档案 / AI 助手 / 活动 / 我的
```

- 中间 `AI 助手` 使用凸起圆形入口。
- 当前 AI 助手页面未闭环前，不新增看起来可点击但无业务意义的空操作。

## 按钮与状态

- 主操作按钮使用绿色实心按钮。
- 次级操作按钮使用白底绿色描边。
- 局部业务状态允许使用模块色，但不得改写全局按钮体系。
- 使用 UniApp `button` 时必须清理默认 `margin`、`padding` 和 `::after` 边框。
- 页面中不要出现看起来可点击但没有业务意义的额外按钮。
- 视觉态入口必须在本次交付说明中明确，不能描述为业务完成。
- 可点击控件必须满足三选一：进入已有真实路由、驱动本地 mock 状态变化、或用 `uni.showToast` / `uni.showModal` 给出明确降级提示；禁止静默无反馈。

### 体验治理守卫

第一批手机端活动链已增加本地验证脚本：

```bash
cd teacher-mobile
node scripts/verify-ux-action-closure.mjs
```

该脚本当前覆盖活动首页、培训需求提交、能力提升需求页、企业实践第二批 5 个页面、企业实践第三批 4 个页面，教学反思链剩余 8 个页面、培训结果、我的、待办链中的 6 个补点页面，虚拟教研链 26 个页面，待办/档案链 22 个页面，我的 / 个人发展链 5 个页面，AI 助手链 3 个页面，培训链剩余 5 个页面，企业实践列表 / 材料确认链 5 个页面，以及企业实践计划 / 补充 / 归档 / 历史状态链 12 个页面；当前合计 102 个页面。后续新增或重做页面时，必须同步扩展该脚本，避免新页面出现空点击、假完成或实现文案外露。

一级入口页视觉基准增加本地验证脚本：

```bash
cd teacher-mobile
node scripts/verify-mobile-entry-visual-baseline.mjs
```

该脚本当前覆盖活动首页、待办首页、档案首页、我的主页和 AI 助手首页 5 个一级入口页，培训进修首页、企业实践年度概览、虚拟教研我的教研室、教学反思开始方式、活动首页教研室入口状态 5 个活动二级 / 状态入口页，培训进修列表、培训申请、培训需求提交 / 已提交、我已找到想参加的培训、培训总结、培训材料归档提交结果等 8 个培训链关键流程页，教学反思选择学期课程、选择反思依据、反思范围、自主反思、AI 引导对话、AI 自主对话、报告草稿编辑、确认成功 8 个反思链关键流程页，企业实践 24 个关键流程页，虚拟教研 25 个关键流程页，待办链 8 个关键流程页，档案链 12 个关键流程页，AI 助手补充档案 2 个关键流程页，以及我的 / 个人发展链 5 个关键流程页，合计 102 个页面。入口页和关键流程页必须使用稳定页面 Shell 或显式声明状态栏、安全区、底部 Tab / 固定操作区预留、浅绿到浅蓝背景、`28rpx` 到 `32rpx` 内容卡圆角和统一标题层级。后续精修入口页或关键流程页时同步维护该脚本。

状态标签基准色：

```txt
紫色：教学反思
蓝色：培训进修
橙色：年度要求 / 待补充 / 退回
绿色：虚拟教研 / 已完成 / 已确认
```

## Wot Design Uni 使用边界

手机端基础控件遵循“框架组件优先且必须使用”的规则：Wot Design Uni 已提供的控件，不再用页面局部 CSS 手写。

必须使用 Wot Design Uni 或基于 Wot Design Uni 的项目封装：

- 图标与徽标：`wd-icon`、`wd-badge`，或内部基于 `wd-icon` 的 `MobileIcon`。
- 导航与底部导航：`wd-navbar`、`wd-tabbar`、`wd-tabbar-item`，或内部基于这些组件的 `MobileNavbar` / `MobileTabBar`。
- 标签、徽章、进度、步骤：`wd-tag`、`wd-badge`、`wd-progress`、`wd-steps` / `wd-step`。
- Tabs / 分段 / 筛选项：`wd-tabs` / `wd-tab`、`wd-segmented`、`wd-drop-menu`。
- 弹层、抽屉、遮罩、动作面板：`wd-popup`、`wd-overlay`、`wd-action-sheet`、`wd-floating-panel`。
- 表单输入
- 选择器
- 弹窗
- Toast / Notify
- 上传
- 日期时间
- 单选、多选、开关

页面局部 CSS 只允许负责布局、间距、背景、卡片组合和业务视觉编排；禁止用 `::before` / `::after`、`clip-path`、边框旋转等方式手绘框架已有的图标、徽标、标签、筛选控件、步骤点、进度条、关闭按钮、箭头控件。

复杂首页结构、底部中间凸起 Tab、业务卡片布局，优先使用项目局部样式实现，以保证与目标图一致。

纯装饰性业务插画可以保留局部 CSS 或改成资源图，但不能承载可复用控件语义；如果视觉元素表达的是图标、徽标、标签、进度或交互控件，必须回到框架组件。

## 校验命令

手机端代码修改完成后执行：

```bash
cd teacher-mobile
npm run typecheck
npm run build:h5
npm run build:mp-weixin
```
