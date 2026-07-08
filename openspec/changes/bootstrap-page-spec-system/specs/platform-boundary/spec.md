## ADDED Requirements

### Requirement: 工程职责边界
系统 SHALL 明确区分管理端 PC 与教师手机端工程边界，并以当前仓库目录作为页面归属事实来源。

#### Scenario: 管理端页面归属
- **WHEN** 页面属于管理端 PC 能力
- **THEN** 页面 SHALL 位于 `frontend/`，并使用管理端路由、布局和组件体系

#### Scenario: 教师手机端页面归属
- **WHEN** 页面属于教师手机端能力
- **THEN** 页面 SHALL 位于 `teacher-mobile/`，并使用 UniApp 页面注册、移动端组件和移动端样式体系

#### Scenario: 工程边界冲突
- **WHEN** 页面规格、源码或交付说明在管理端 PC 与教师手机端之间出现冲突
- **THEN** 系统 SHALL 以 `frontend/` 承载管理端 PC、`teacher-mobile/` 承载教师手机端作为优先约束

### Requirement: 规格事实来源
系统 SHALL 从当前源码、路由、页面行为、测试和设计系统文档中反推页面规格，不得凭空承诺未实现能力。

#### Scenario: 编写页面规格
- **WHEN** 为已实现页面编写 OpenSpec 规格
- **THEN** 规格 SHALL 能对应到当前路由、页面源码、mock 数据、状态流转或设计系统文档

#### Scenario: 发现未实现能力
- **WHEN** 当前页面只提供视觉态、mock-only 行为或降级提示
- **THEN** 规格 SHALL 明确表达该能力为当前前台模拟或视觉态，不得描述为真实业务完成

### Requirement: Mock-only 操作表达
系统 SHALL 对前台模拟操作和未接入真实服务的操作提供明确反馈，避免空点击或假完成。

#### Scenario: 本地状态流转
- **WHEN** 操作只更新本地 mock 状态
- **THEN** 页面 SHALL 通过当前页面状态、列表内容、摘要面板或操作提示展示本地变化

#### Scenario: 未接入独立页面或真实服务
- **WHEN** 用户触发尚未接入真实服务或独立页面的入口
- **THEN** 页面 SHALL 使用明确降级提示说明当前为本地模拟或暂未接入

#### Scenario: 不允许静默操作
- **WHEN** 页面存在看起来可点击的按钮、链接、卡片或行操作
- **THEN** 该操作 SHALL 进入已注册路由、驱动本地 mock 状态变化，或给出明确降级提示

### Requirement: 分批规格扩展
系统 SHALL 以模块为单位逐批扩展 OpenSpec 规格，避免一次性生成不可维护的页面清单。

#### Scenario: 新增模块规格批次
- **WHEN** 继续把更多已实现页面整理为 OpenSpec 规格
- **THEN** 每批 SHOULD 覆盖一个模块或 3 到 5 个页面，并先完成事实盘点再写 delta specs

#### Scenario: 同步主规格
- **WHEN** change 下的 delta specs 已通过 OpenSpec 校验
- **THEN** 系统 SHALL 使用规格同步流程把 delta specs 合并到 `openspec/specs/**/spec.md`
