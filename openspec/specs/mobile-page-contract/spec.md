## Purpose

定义教师手机端页面的注册、组件、安全区、TabBar、交互反馈和视觉验收契约。

## Requirements

### Requirement: 手机端页面注册契约
教师手机端页面 SHALL 以 `teacher-mobile/src/pages.json` 为页面注册事实来源。

#### Scenario: 页面可访问
- **WHEN** 教师手机端页面被纳入规格或交付范围
- **THEN** 页面 SHALL 在 `teacher-mobile/src/pages.json` 中注册，并设置与当前页面一致的导航样式

#### Scenario: 页面不复用管理端
- **WHEN** 教师手机端页面实现布局、路由或样式
- **THEN** 页面 SHALL 使用 `teacher-mobile/` 的 UniApp 页面、组件和样式，不得复用管理端 PC 路由、布局或页面样式

### Requirement: 手机端组件与安全区契约
教师手机端页面 SHALL 遵循移动端设计系统中的页面 Shell、导航、安全区和底部预留规则。

#### Scenario: 一级入口页
- **WHEN** 页面是一级 Tab 入口
- **THEN** 页面 SHALL 使用稳定页面 Shell 和 `MobileTabBar`，并预留底部 TabBar 与安全区空间

#### Scenario: 二级页面
- **WHEN** 页面是从一级入口进入的二级页面
- **THEN** 页面 SHALL 优先使用 `MobileNavbar` 提供标题和返回操作

#### Scenario: 固定底部或长内容
- **WHEN** 页面存在底部 TabBar、固定底部操作区或长列表内容
- **THEN** 页面 SHALL 预留 `env(safe-area-inset-bottom)` 相关底部空间，避免遮挡最后内容

### Requirement: 手机端交互反馈契约
教师手机端可点击控件 SHALL 进入已注册路由、驱动本地 mock 状态变化，或给出明确降级提示。

#### Scenario: 已有目标页面
- **WHEN** 用户点击入口并且目标页面已注册
- **THEN** 页面 SHALL 使用 `uni.navigateTo` 或等效方式进入对应页面

#### Scenario: 本地模拟入口
- **WHEN** 用户点击尚未接入独立页面或真实服务的入口
- **THEN** 页面 SHALL 使用 `uni.showToast`、`uni.showModal` 或页面内状态说明当前为本地模拟

#### Scenario: 返回操作
- **WHEN** 用户在二级页面点击返回
- **THEN** 页面 SHALL 使用 `uni.navigateBack` 或明确的返回路由回到上一层页面

### Requirement: 手机端视觉验收契约
教师手机端页面 SHALL 以当前目标效果图、页面源码和移动端设计系统为验收基准。

#### Scenario: 视觉实现
- **WHEN** 精修或新增教师手机端页面
- **THEN** 页面 SHALL 保持浅绿到浅蓝背景、移动端卡片层级、统一标题层级和当前组件边界

#### Scenario: 校验脚本覆盖
- **WHEN** 新增或重做手机端关键页面
- **THEN** 页面 SHOULD 同步维护已有体验治理或视觉基准验证脚本，避免新增空点击、假完成或入口样式漂移
