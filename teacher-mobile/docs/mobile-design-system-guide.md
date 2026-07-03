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
目标图：效果图/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页.png
```

H5 视觉验收视口：

```txt
390x844
375x812
430x932
360x800
```

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
- `MobileTabBar`：固定底部入口。

暂不抽象状态栏、通知铃、搜索框、业务图标、首页业务卡片、记录列表行；等更多页面重复后再判断。

## TabBar

- 不使用 UniApp 原生 `tabBar` 配置。
- 使用 `teacher-mobile/src/components/MobileTabBar.vue`。
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

状态标签基准色：

```txt
紫色：教学反思
蓝色：培训进修
橙色：年度要求 / 待补充 / 退回
绿色：虚拟教研 / 已完成 / 已确认
```

## Wot Design Uni 使用边界

Wot Design Uni 优先用于：

- 表单输入
- 选择器
- 弹窗
- Toast / Notify
- 上传
- 日期时间
- 单选、多选、开关

复杂首页结构、底部中间凸起 Tab、业务卡片布局，优先使用项目局部样式实现，以保证与目标图一致。

## 校验命令

手机端代码修改完成后执行：

```bash
cd teacher-mobile
npm run typecheck
npm run build:h5
npm run build:mp-weixin
```
