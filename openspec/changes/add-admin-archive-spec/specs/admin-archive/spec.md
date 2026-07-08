## ADDED Requirements

### Requirement: 成长档案路由结构
管理端成长档案模块 SHALL 通过管理端路由提供档案处理、导入部门资料、导入批次详情、档案查阅和教师成长档案详情页面。

#### Scenario: 档案处理页面注册
- **WHEN** 管理员访问成长档案处理工作台
- **THEN** 系统 SHALL 提供 `/admin/archive/processing` 路由，并使用 `archive-processing` 菜单 key

#### Scenario: 导入流程页面注册
- **WHEN** 管理员进入部门资料导入流程
- **THEN** 系统 SHALL 提供 `/admin/archive/import` 和 `/admin/archive/import/:batchId` 路由

#### Scenario: 档案查阅页面注册
- **WHEN** 管理员查询教师成长档案
- **THEN** 系统 SHALL 提供 `/admin/archive/query` 和 `/admin/archive/teacher/:teacherId` 路由，并使用 `archive-query` 菜单 key

### Requirement: 部门资料导入上传
导入部门资料页面 SHALL 支持前台模拟上传文件、管理上传列表，并创建导入识别批次。

#### Scenario: 添加上传文件
- **WHEN** 管理员在上传区选择 Excel、PDF、Word、图片或 ZIP 文件
- **THEN** 页面 SHALL 把文件映射为本地上传文件记录，并展示文件类型、名称、大小和上传状态

#### Scenario: 移除上传文件
- **WHEN** 管理员点击已上传文件的删除操作
- **THEN** 页面 SHALL 从本地上传文件列表移除该文件

#### Scenario: 开始系统识别
- **WHEN** 管理员点击开始识别
- **THEN** 页面 SHALL 创建本地导入批次，并跳转到 `/admin/archive/import/:batchId`

#### Scenario: 取消上传
- **WHEN** 管理员取消上传
- **THEN** 页面 SHALL 返回上一层路由历史

### Requirement: 导入批次识别
导入批次详情页 SHALL 展示本地导入批次状态、文件列表、识别进度和识别结果，并支持完成、确认和取消识别。

#### Scenario: 查看批次状态
- **WHEN** 管理员打开 `/admin/archive/import/:batchId`
- **THEN** 页面 SHALL 通过本地状态确保批次存在，并展示批次名称、状态、文件和识别步骤

#### Scenario: 刷新识别状态
- **WHEN** 管理员点击刷新或查看识别进展
- **THEN** 页面 SHALL 将本地批次更新为已识别状态，并展示可生成记录、需补充、需核验、异常和疑似重复等结果数量

#### Scenario: 确认识别结果
- **WHEN** 管理员确认已识别的批次结果
- **THEN** 页面 SHALL 基于本地识别结果生成待处理记录，并跳转回 `/admin/archive/processing`

#### Scenario: 取消识别任务
- **WHEN** 管理员取消识别任务
- **THEN** 页面 SHALL 将本地批次状态更新为已取消，标记批次文件为已取消，并跳转回档案处理页面

#### Scenario: 查看上传文件
- **WHEN** 管理员在批次详情页查看上传文件
- **THEN** 页面 SHALL 跳转回 `/admin/archive/import`

### Requirement: 档案处理工作台
档案处理页面 SHALL 展示本地待处理记录、状态统计、来源筛选、关键词查询和选中记录详情。

#### Scenario: 展示待处理统计
- **WHEN** 管理员进入 `/admin/archive/processing`
- **THEN** 页面 SHALL 基于 `archiveState.processingRecords` 统计待确认、待检验、待补充、异常待处理、拟退中等状态数量

#### Scenario: 筛选处理记录
- **WHEN** 管理员按处理状态、来源或关键词筛选
- **THEN** 页面 SHALL 基于本地处理记录过滤列表，并保留当前选中记录详情

#### Scenario: 选择处理记录
- **WHEN** 管理员点击某条处理记录
- **THEN** 页面 SHALL 将该记录设为当前选中记录，并展示对应详情

#### Scenario: 跳转导入资料
- **WHEN** 管理员点击导入资料入口
- **THEN** 页面 SHALL 跳转到 `/admin/archive/import`

### Requirement: 档案处理记录操作
档案处理页面 SHALL 支持对当前选中本地处理记录执行确认入档、退回、标记异常和查看补充说明。

#### Scenario: 确认入档
- **WHEN** 管理员对选中处理记录执行确认入档
- **THEN** 页面 SHALL 将本地记录状态更新为已入档，并新增对应教师档案事实

#### Scenario: 退回记录
- **WHEN** 管理员对选中处理记录执行退回
- **THEN** 页面 SHALL 将本地记录状态更新为拟退中，并追加处理历史

#### Scenario: 标记异常
- **WHEN** 管理员对选中处理记录执行标记异常
- **THEN** 页面 SHALL 将本地记录状态更新为异常待处理，并追加处理历史

#### Scenario: 查看补充说明
- **WHEN** 管理员点击查看补充说明
- **THEN** 页面 SHALL 在本地操作消息中说明补充信息已在待处理问题中展示

### Requirement: 档案查阅
档案查阅页面 SHALL 提供教师成长档案的前台模拟查询、学院和职称筛选、视图切换和详情入口。

#### Scenario: 查询教师档案
- **WHEN** 管理员输入关键词并点击搜索
- **THEN** 页面 SHALL 基于本地教师卡片数据按教师姓名、学院、职称、描述和标签过滤结果

#### Scenario: 重置查询条件
- **WHEN** 管理员点击重置
- **THEN** 页面 SHALL 清空关键词、学院筛选和职称筛选，并恢复默认结果

#### Scenario: 切换展示视图
- **WHEN** 管理员在卡片视图和列表视图之间切换
- **THEN** 页面 SHALL 保持同一筛选结果并切换展示密度

#### Scenario: 查看教师成长档案
- **WHEN** 管理员点击教师档案详情
- **THEN** 页面 SHALL 跳转到 `/admin/archive/teacher/:teacherId`

### Requirement: 教师成长档案详情
教师成长档案详情页 SHALL 展示教师成长档案事实、来源记录、打印和本地导出记录能力。

#### Scenario: 返回档案查阅
- **WHEN** 管理员在教师成长档案详情页点击返回
- **THEN** 页面 SHALL 跳转回 `/admin/archive/query`

#### Scenario: 打印档案
- **WHEN** 管理员点击打印
- **THEN** 页面 SHALL 调用浏览器打印能力

#### Scenario: 导出档案
- **WHEN** 管理员点击导出
- **THEN** 页面 SHALL 创建本地教师档案导出记录，并下载一个文本文件示例作为前台模拟导出结果

#### Scenario: 查看来源记录
- **WHEN** 管理员打开某个档案维度或档案事实的来源记录
- **THEN** 页面 SHALL 打开来源记录抽屉，展示已确认入档记录和默认来源记录

#### Scenario: 筛选来源记录
- **WHEN** 管理员在来源记录抽屉切换全部、已确认入档或待说明标签
- **THEN** 页面 SHALL 只展示对应状态的来源记录

#### Scenario: 查看来源记录详情
- **WHEN** 管理员点击来源记录详情
- **THEN** 页面 SHALL 通过操作消息说明该记录已在当前来源记录中展示，或提示待说明记录仍需在档案处理工作台继续处理

### Requirement: 成长档案本地状态
成长档案模块 SHALL 通过前端本地 store 维护导入批次、处理记录、教师档案事实和导出记录。

#### Scenario: 初始化档案状态
- **WHEN** 成长档案模块初始化
- **THEN** 本地状态 SHALL 包含默认上传文件、处理记录、空导入批次、空教师档案事实和空导出记录

#### Scenario: 确认处理记录生成档案事实
- **WHEN** 处理记录被确认入档
- **THEN** 本地状态 SHALL 在教师档案事实中新增可被教师详情页查询的记录，并保留来源处理记录关联

#### Scenario: 查询来源记录
- **WHEN** 教师档案详情根据档案事实查询来源记录
- **THEN** 本地状态 SHALL 返回与该事实 sourceRecordId 关联的处理记录

#### Scenario: 记录导出历史
- **WHEN** 教师档案详情创建导出记录
- **THEN** 本地状态 SHALL 追加导出记录，并设置可感知的操作消息
