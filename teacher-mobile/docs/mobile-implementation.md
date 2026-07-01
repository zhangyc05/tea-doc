# 教师手机端实现规则

本文档记录 `teacher-mobile/` 的移动端页面基准规则。当前基准页为：

```txt
页面：教师端手机｜活动｜活动首页
源码：teacher-mobile/src/pages/activity/index.vue
目标图：../效果图/教师手机端/2活动/活动首页/教师端手机｜活动｜活动首页.png
```

## 工程边界

- `teacher-mobile/` 是教师手机端唯一工程，目标交付 H5、微信小程序、App。
- `frontend/` 继续承载管理端 PC，不承载教师手机端页面。
- 手机端页面不复用管理端 PC 布局、路由和样式。
- 每次只实现一个页面；做完 2-3 个页面后再抽通用业务组件。

## 验收视口

H5 视觉验收至少覆盖：

```txt
390x844
375x812
430x932
360x800
```

多端构建验收至少执行：

```bash
npm run typecheck
npm run build:h5
npm run build:mp-weixin
```

## 页面容器

- 页面使用浅绿到浅蓝的纵向背景，顶部保留状态栏空间。
- 页面横向内边距以 `28rpx` 为基准，窄屏可收敛到 `22rpx`。
- 页面底部必须预留自定义 TabBar 和安全区空间：

```scss
padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
```

## 卡片

- 主要内容卡片使用白色半透明背景。
- 基准圆角：
  - 内容卡片：`32rpx`
  - 顶部教师周期卡：`40rpx`
  - 小图标容器：`20rpx` 到 `28rpx`
- 卡片阴影保持轻量，避免重投影：

```scss
box-shadow: 0 22rpx 52rpx rgba(35, 51, 87, 0.07);
```

## 字号层级

- 页面主标题：`62rpx` 到 `70rpx`，粗体。
- 卡片标题：`36rpx` 到 `44rpx`，粗体。
- 业务主标题：`25rpx` 到 `34rpx`，粗体。
- 正文说明：`20rpx` 到 `27rpx`。
- 标签文字：`20rpx` 到 `25rpx`。
- 底部 Tab 文字：`26rpx`。

后续页面应优先沿用这些层级，不为单页单独发明新字号。

## TabBar

- 使用自定义组件：

```txt
teacher-mobile/src/components/MobileTabBar.vue
```

- 不使用 UniApp 原生 `tabBar` 配置，避免 H5、小程序和 App 视觉不一致。
- 入口顺序固定为：

```txt
待办 / 档案 / AI 助手 / 活动 / 我的
```

- 中间 `AI 助手` 使用凸起圆形入口。
- 当前 `AI 助手` 暂无独立页面时，可临时指向活动页；后续实现 AI 助手页面后再调整。

## 按钮

- 主要操作按钮使用绿色实心按钮。
- 次级操作按钮使用白底绿色描边。
- 使用 UniApp `button` 实现图标按钮、文本链接或业务按钮时，必须在当前页面或组件内显式清理默认 `margin`、`padding` 和 `::after` 边框，避免出现目标图中不存在的外框或居中偏移。
- 移动端按钮高度基准：
  - 主操作：`48rpx` 到 `56rpx`
  - 列表操作：`44rpx` 到 `56rpx`
- 页面中不要出现看起来可点击但没有业务意义的额外按钮。

## 状态标签

- 标签先使用局部样式，不急于抽组件。
- 当前基准色：
  - 紫色：教学反思
  - 蓝色：培训进修
  - 橙色：年度要求
  - 绿色：虚拟教研
- 标签高度基准：`30rpx` 到 `34rpx`。

## Wot Design Uni 使用边界

Wot Design Uni 作为多端基础组件库保留，优先用于：

- 表单输入
- 选择器
- 弹窗
- Toast / Notify
- 上传
- 日期时间
- 单选、多选、开关

基准页中的复杂首页结构、底部中间凸起 Tab、业务卡片布局，优先使用项目局部样式实现，以保证与目标图一致。

## 后续页面顺序

推荐顺序：

```txt
1. 活动首页基准页收尾
2. 待办首页
3. 档案首页
4. 第一次组件沉淀
5. 我的主页
6. 待办详情或编辑页
```

当前已完成到 `待办详情｜待确认记录详情｜培训证书`。后续可继续做待办编辑页，用于补齐表单输入、上传和提交结果规则。

组件沉淀只抽已经重复出现的结构，例如：

```txt
MobileTabBar
MobilePageShell
MobileCard
MobileStatusTag
MobileActionButton
```

不得为了未来页面提前泛化。

## 第一次组件沉淀

已沉淀的基础组件只覆盖三页中重复且稳定的低业务结构：

```txt
teacher-mobile/src/components/MobilePageShell.vue
teacher-mobile/src/components/MobileCard.vue
teacher-mobile/src/components/MobileStatusTag.vue
teacher-mobile/src/components/MobileActionButton.vue
teacher-mobile/src/components/MobileTabBar.vue
```

- `MobilePageShell` 只负责页面背景、横向边距、底部 TabBar 和安全区预留。
- `MobileCard` 只负责白色内容卡片的边框、圆角、背景和阴影。
- `MobileStatusTag` 只负责紫、蓝、橙、绿四类轻量状态标签。
- `MobileActionButton` 只负责 UniApp `button` 默认样式清理，以及主按钮、描边按钮、文本链接三种低层按钮外壳。
- `MobileTabBar` 继续作为固定底部入口组件。

暂不抽以下结构：

```txt
状态栏
通知铃
搜索框
业务图标
首页业务卡片
记录列表行
```

这些结构仍由具体页面根据目标图局部实现，等更多页面重复后再判断是否抽象。

## 详情页与操作区

当前详情页基准：

```txt
页面：教师端手机｜待办｜待确认记录详情｜培训证书
源码：teacher-mobile/src/pages/todo/certificate-detail/index.vue
目标图：../效果图/教师手机端/0待办/教师端手机｜待办｜待确认记录详情｜培训证书.png
```

- 详情页使用自定义顶部返回区：状态栏、返回按钮、居中标题。
- 详情页仍保留底部 `MobileTabBar`，底部内容必须预留 TabBar 与安全区空间。
- 主体优先使用纵向信息卡：摘要卡、信息表、材料卡、确认卡。
- 信息表使用左侧固定标签列、右侧内容列；行高随视口压缩，但不牺牲可读性。
- 多操作按钮放在底部确认卡内，顺序为主按钮、次按钮、弱化按钮。
- 操作按钮不得贴住 TabBar；在 `430x932` 与 `360x800` 下应能完整看到确认卡的关键操作。
