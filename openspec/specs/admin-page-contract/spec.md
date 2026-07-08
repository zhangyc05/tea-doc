## Purpose

定义管理端 PC 页面的通用路由、布局、交互闭环、视觉组件和视觉态验收契约。

## Requirements

### Requirement: 管理端路由与布局契约
管理端页面 SHALL 使用 `frontend/src/router/admin.routes.ts` 中的管理端路由注册，并复用管理端布局体系。

#### Scenario: 页面进入管理端
- **WHEN** 管理端页面被定义为可访问页面
- **THEN** 页面 SHALL 在 `frontend/src/router/admin.routes.ts` 中注册路径、名称、模块、菜单 key 和面包屑信息

#### Scenario: 页面使用统一布局
- **WHEN** 管理端页面渲染主体内容
- **THEN** 页面 SHALL 使用 `AdminLayout`，并通过 active key 对齐侧边栏当前菜单

### Requirement: 管理端页面闭环
管理端页面 SHALL 为入口、返回、详情跳转和状态操作提供可验证闭环。

#### Scenario: 列表进入详情
- **WHEN** 列表页面展示行级详情操作
- **THEN** 操作 SHALL 跳转到已注册详情路由，或在当前页更新明确的详情 / 摘要区域

#### Scenario: 详情返回列表
- **WHEN** 详情页提供返回操作
- **THEN** 返回操作 SHALL 回到对应列表路由，而不是依赖不可见历史栈

#### Scenario: 状态操作反馈
- **WHEN** 管理端页面执行本地 mock 状态操作
- **THEN** 页面 SHALL 更新本地状态，并展示可感知的操作结果或操作提示

### Requirement: 管理端视觉与组件契约
管理端页面 SHALL 遵循当前管理端设计系统，不为单页新增无必要的视觉体系。

#### Scenario: 页面结构
- **WHEN** 管理端页面组织列表、筛选、统计、详情和辅助洞察区域
- **THEN** 页面 SHALL 保持桌面信息密度，优先复用现有管理端组件和浅色工作台风格

#### Scenario: 图标与 token
- **WHEN** 页面需要通用图标、颜色、圆角、间距或阴影
- **THEN** 页面 SHALL 优先遵循 `frontend/docs/admin-design-system-guide.md` 和现有 token / 组件约定

### Requirement: 管理端视觉态限制
管理端页面 SHALL 明确区分真实本地闭环、mock-only 状态和视觉态入口。

#### Scenario: 已确认只做视觉态
- **WHEN** 页面操作仅用于视觉展示或说明当前业务意图
- **THEN** 交付说明和规格 SHALL 明确该操作不是完整业务完成

#### Scenario: 不新增空操作
- **WHEN** 页面新增或保留看起来可点击的控件
- **THEN** 控件 SHALL 具有路由跳转、本地状态变化、摘要切换或明确提示中的至少一种结果
