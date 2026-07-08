## ADDED Requirements

### Requirement: 培训管理路由结构
管理端培训管理模块 SHALL 通过管理端路由提供资源库、需求管理、计划管理、申请处理、记录总览和详情页面。

#### Scenario: 培训模块入口
- **WHEN** 用户进入 `/admin`
- **THEN** 系统 SHALL 重定向到 `/admin/training/resources`

#### Scenario: 培训列表页面注册
- **WHEN** 用户访问培训管理列表页面
- **THEN** 系统 SHALL 提供 `/admin/training/resources`、`/admin/training/demands`、`/admin/training/plans`、`/admin/training/applications` 和 `/admin/training/records` 路由

#### Scenario: 培训详情页面注册
- **WHEN** 用户从列表进入培训详情
- **THEN** 系统 SHALL 提供 `/admin/training/plans/:planId` 和 `/admin/training/records/:recordId` 路由

### Requirement: 培训资源库页面
培训资源库页面 SHALL 展示本地培训资源、筛选条件、资源摘要和待完善资源创建能力。

#### Scenario: 筛选培训资源
- **WHEN** 管理员按状态、方向、级别、来源或关键词查询资源
- **THEN** 页面 SHALL 基于 `trainingState.resources` 过滤资源列表，并展示筛选结果数量或重置结果

#### Scenario: 查看资源摘要
- **WHEN** 管理员点击资源详情操作
- **THEN** 页面 SHALL 在右侧摘要区域展示当前资源，并给出可感知的操作提示

#### Scenario: 新增待完善资源
- **WHEN** 管理员点击新增培训资源
- **THEN** 页面 SHALL 调用本地状态创建“信息待完善”的资源草稿，并切换到该草稿摘要

### Requirement: 培训需求管理页面
培训需求管理页面 SHALL 展示本地培训需求、筛选条件、需求摘要和需求匹配状态。

#### Scenario: 筛选培训需求
- **WHEN** 管理员按组织、来源、方向、匹配状态或关键词查询需求
- **THEN** 页面 SHALL 基于 `trainingState.demands` 过滤需求列表，并展示操作反馈

#### Scenario: 新增待匹配需求
- **WHEN** 管理员点击新增需求
- **THEN** 页面 SHALL 创建一条本地“待匹配”需求，并切换当前摘要到该需求

#### Scenario: 匹配培训需求
- **WHEN** 管理员对需求执行匹配操作
- **THEN** 页面 SHALL 把该需求状态更新为“已匹配”，并填入本地建议资源

### Requirement: 培训计划管理页面
培训计划管理页面 SHALL 展示本地培训计划、支持筛选、详情跳转和新建计划抽屉。

#### Scenario: 筛选培训计划
- **WHEN** 管理员按组织、状态、年度、参与方式或关键词查询计划
- **THEN** 页面 SHALL 基于 `trainingState.plans` 过滤计划列表

#### Scenario: 进入计划详情
- **WHEN** 管理员点击计划详情
- **THEN** 页面 SHALL 跳转到 `/admin/training/plans/:planId`

#### Scenario: 保存计划草稿
- **WHEN** 管理员在新建计划抽屉中点击保存草稿
- **THEN** 页面 SHALL 创建本地草稿计划，关闭抽屉，并展示“已保存草稿”操作提示

#### Scenario: 发布培训计划
- **WHEN** 管理员在新建计划抽屉中点击保存并发布
- **THEN** 页面 SHALL 创建本地报名中计划，关闭抽屉，并展示“已发布培训计划”操作提示

### Requirement: 培训计划详情页面
培训计划详情页面 SHALL 展示计划基本信息、进度、参与教师、材料要求和相关需求。

#### Scenario: 返回计划列表
- **WHEN** 管理员在计划详情页点击返回列表
- **THEN** 页面 SHALL 跳转回 `/admin/training/plans`

#### Scenario: 查看参与教师档案
- **WHEN** 管理员点击参与教师详情
- **THEN** 页面 SHALL 跳转到 `/admin/archive/teacher/:teacherId`

#### Scenario: 同意计划内申请
- **WHEN** 管理员对待处理参与教师执行同意操作
- **THEN** 页面 SHALL 更新本地申请状态，并展示已同意该教师培训申请的提示

### Requirement: 培训申请处理页面
培训申请处理页面 SHALL 展示本地培训申请、筛选条件、申请摘要和审批状态操作。

#### Scenario: 筛选培训申请
- **WHEN** 管理员按组织、状态、培训方向或关键词查询申请
- **THEN** 页面 SHALL 基于 `trainingState.applications` 过滤申请列表，并展示结果提示

#### Scenario: 查看申请摘要
- **WHEN** 管理员点击申请详情
- **THEN** 页面 SHALL 在右侧摘要区域展示当前申请

#### Scenario: 同意培训申请
- **WHEN** 管理员对申请执行同意操作
- **THEN** 页面 SHALL 更新本地申请状态，并同步对应计划参与人员状态

#### Scenario: 退回培训申请
- **WHEN** 管理员对待处理申请执行退回操作
- **THEN** 页面 SHALL 更新本地申请状态为未同意，并展示操作反馈

### Requirement: 培训记录总览页面
培训记录总览页面 SHALL 展示本地培训记录、统计数据、筛选条件和记录详情入口。

#### Scenario: 筛选培训记录
- **WHEN** 管理员按组织、年度、方向、材料状态或关键词查询记录
- **THEN** 页面 SHALL 基于 `trainingState.records` 过滤记录列表

#### Scenario: 查看记录详情
- **WHEN** 管理员点击记录详情
- **THEN** 页面 SHALL 跳转到 `/admin/training/records/:recordId`

#### Scenario: 查看证书待补记录
- **WHEN** 管理员点击材料不完整相关入口
- **THEN** 页面 SHALL 把材料状态筛选为“证书待补”，并展示筛选提示

### Requirement: 培训记录详情页面
培训记录详情页面 SHALL 展示培训记录详情、学习记录、培训总结、证书材料和相关记录。

#### Scenario: 返回记录总览
- **WHEN** 管理员在记录详情页点击返回
- **THEN** 页面 SHALL 跳转回 `/admin/training/records`

#### Scenario: 补充培训证书
- **WHEN** 管理员点击补充或上传培训证书材料
- **THEN** 页面 SHALL 将本地记录材料状态更新为“记录完整”，并生成成长档案待确认记录

#### Scenario: 查看相关记录
- **WHEN** 管理员点击相关培训记录
- **THEN** 页面 SHALL 跳转到对应 `/admin/training/records/:recordId`
