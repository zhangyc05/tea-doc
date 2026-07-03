# 前端业务逻辑地图

更新时间：2026-07-02

本文件用于把页面、按钮、状态和跨页面影响对齐成业务闭环。`docs/page-coverage-ledger.md` 记录逐图覆盖，本文件记录业务流转。

## 1. 使用边界

- 本文件不是视觉验收记录。
- 本文件不是接口文档。
- 本文件用于判断“页面动作是否改变了正确的业务状态”。
- 后续重构组件、store、service、mock、类型定义时，以本文件的业务对象和状态为依据。

## 2. 当前总体判断

当前前端已经具备大量页面和路由。能力清单、成长档案、培训管理、企业实践、虚拟教研已开始按模块级本地状态收口主链：

```txt
能力清单：模块级本地 store → 跨页面共享执行版状态和指标调整
成长档案：模块级本地 store → 上传批次、识别结果、处理记录、教师档案事实共享
培训管理：模块级本地 store → 资源、需求、计划、申请、记录和成长档案待确认记录共享
企业实践：模块级本地 store → 申请、年度跟踪、实践记录和成长档案待确认记录共享
虚拟教研：模块级本地 store → 教研室、活动、记录和成长档案待确认记录共享
```

因此下一阶段不应直接做大规模组件重构。应先把关键业务对象抽出统一状态，再按业务流补本地闭环，最后再重构组件和工程分层。

### 2.1 手机端与管理端统一接入策略

手机端与管理端统一接入策略已补第一版。当前口径是：手机端不直接复用管理端 store，也不从 `teacher-mobile/` import `frontend/src/stores/admin/*`；手机端先在 `teacher-mobile/src/domain/*` 或 `teacher-mobile/src/stores/todoStore.ts` 建立本端 domain/store，通过 `adminStoreRefs` 标记可追溯的管理端对象，后续接口层再把这些本地对象同步到管理端 store 或后端接口。

| 手机端对象 | 手机端 domain/store | 管理端追溯对象 | 当前提交后状态 |
| --- | --- | --- | --- |
| 待办证书、待确认 / 待核验材料 | `todoStore`、`domain/archive.ts` | `archiveStore.processingRecords`、管理端确认后写入 `teacherArchiveFacts` | 待确认、待核验、已入档、已移出 |
| 档案补充、更正和活动归档记录 | `domain/archive.ts` | `archiveStore.processingRecords`、`teacherArchiveFacts` | 待核验、待确认、需补充、已移出；正式已入档只能来自管理端确认 |
| 培训推荐、申请、总结和归档 | `domain/training.ts` | `trainingStore.resources`、`trainingStore.applications`、`trainingStore.records`、`trainingStore.demands`、`archiveStore.processingRecords` | 待处理、待确认、待核验；培训归档结果不直接写正式档案事实 |
| 教学反思草稿、AI 会话和确认记录 | `domain/reflection.ts` | `reflectionStore.records`、`archiveStore.processingRecords` | 草稿、待确认、待核验；确认后先生成成长档案待确认记录 |
| 企业实践计划、日志、材料和归档 | `domain/enterprise.ts` | `practiceStore.applications`、`practiceStore.records`、`archiveStore.processingRecords` | 待处理、需补充、已归档、待确认；归档后仍需管理端确认 |
| 虚拟教研邀请、活动、贡献和归档 | `domain/virtualResearch.ts` | `virtualLabStore.rooms`、`virtualLabStore.activities`、`virtualLabStore.records`、`archiveStore.processingRecords` | 待确认、需补充、已归档；归档结果先形成教研记录再进入档案待确认 |

统一状态口径：

| 状态 | 口径 |
| --- | --- |
| 待处理 | 手机端提交了申请、需求或计划，等待管理端业务处理，例如培训申请、企业实践计划 |
| 待核验 | 手机端提交了更正、补充或修改材料，等待管理端或档案流程核验 |
| 待确认 | 手机端或管理端已形成可入档候选记录，等待教师或管理端确认 |
| 需补充 | 管理端或流程判断材料不足，手机端需要补材料或重新提交 |
| 已归档 | 活动侧记录已形成归档结果，但不等同正式档案事实 |
| 已入档 | 只能由管理端确认入档后产生，对应 `teacherArchiveFacts`；手机端提交成功不得直接等同入档 |
| 已移出 | 教师确认不是本人记录或流程移出，不写入正式档案事实；恢复口径为管理端复核后重新生成待确认记录 |

## 3. 管理端：能力清单

### 3.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 基准模板 | 学校层面的能力指标标准来源 | `frontend/src/pages/admin/ability-list/AbilityListBasePage.vue`、`frontend/src/stores/admin/abilityListStore.ts` |
| 优化建议 | 基于制度文件、运行反馈、人工补充形成的基准模板优化建议 | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue`、`frontend/src/stores/admin/abilityListStore.ts` |
| 执行版 | 某一周期实际运行的教师能力清单 | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue`、`frontend/src/stores/admin/abilityListStore.ts` |
| 指标项 | 执行版中的具体能力指标、等级标准、计算规则 | `AbilityListExecutionPage.vue`、`frontend/src/components/admin/ability-list/types.ts` |
| 岗位/聘期要求映射 | 岗位竞聘、聘期履职要求与能力指标的对应关系 | `frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue` |

### 3.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 优化建议 | 待确认、已采纳、暂缓、已弃用、已应用 | `pending`、`adopted`、`deferred`、`rejected`、`applied` | 已完成“上传制度文件 / 重新分析 -> 待确认建议 -> 采纳 -> 待应用 -> 应用到基准模板”本地闭环 |
| 执行版 | 草稿、待发布、已发布、历史版 | `abilityListStore` 共享 `pending`、`published`、`historical` | 已完成待发布、已发布、历史版本地闭环；草稿状态留到工程重构阶段细化 |
| 指标项 | 启用、停用、已调整 | `abilityListStore` 共享指标列表；编辑保存后标记 `draft` | 已完成执行版编辑本地闭环 |
| 要求映射 | 已确认、待确认、未配置 | `abilityListStore.requirementMappings` 共享 `confirmed`、`pending`、`unconfigured` | 已完成新增、编辑、删除、确认配置本地闭环 |

### 3.3 主流程

```txt
基准模板
→ 生成优化建议
→ 人工采纳 / 暂缓 / 弃用建议
→ 应用到基准模板
→ 派生下一周期执行版
→ 编辑执行版指标
→ 发布执行版
→ 配置岗位/聘期要求映射
→ 后续发展活动、成长档案、能力画像、分析报告引用该执行版口径
```

### 3.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 基准模板 | 进入优化建议 | `router.push('/admin/ability-list/base/optimization')` | 已闭环到页面 |
| 基准模板 | 编辑指标 | 更新 `abilityListStore.baseTemplateIndicators`，指标状态变为 `draft` | 已完成本地闭环 |
| 基准模板 | 查看版本记录 | 打开版本记录抽屉，展示版本号、状态、发布时间、来源、操作人 | 已完成本地闭环 |
| 基准模板 | 派生执行版 | 写入 `abilityListStore` 并进入发布确认页 | 已完成本地闭环 |
| 优化建议 | 采纳、暂缓、弃用 | 修改 `abilityListStore.optimizationSuggestions` | 页面内闭环 |
| 优化建议 | 应用到基准模板 | 将已采纳建议写入 `abilityListStore.baseTemplateIndicators`，建议状态变为 `applied` | 已完成本地闭环 |
| 优化建议 | 上传制度文件 | 调用 `importPolicySuggestion()`，新增制度文件来源待确认建议 | 已完成本地闭环 |
| 优化建议 | 重新分析运行反馈 | 调用 `rerunFeedbackAnalysis()`，新增运行反馈来源待确认建议 | 已完成本地闭环 |
| 优化建议 | 查看版本记录 | 跳转 `/admin/ability-list/base?versionHistory=1`，由基准模板页打开版本记录抽屉 | 已完成跨页面本地闭环 |
| 执行版 | 编辑指标抽屉保存 | 更新 `abilityListStore.executionIndicators`，指标状态变为 `draft` | 已完成本地闭环 |
| 发布确认 | 确认发布 | 更新 `abilityListStore.executionVersion.status` 为 `published` | 已完成跨页面本地闭环 |
| 要求映射 | 新增、编辑、删除、确认配置 | 修改 `abilityListStore.requirementMappings` | 已完成本地闭环 |

### 3.5 第一批修复顺序

能力清单主链本地闭环已完成。后续进入工程重构阶段时再处理：

1. 基准模板页“优化基准模板 / 查看版本记录 / 派生执行版”、基准模板优化建议页“上传制度文件 / 重新分析运行反馈 / 应用到基准模板 / 查看版本记录 / 查看详情 / 采纳 / 暂缓 / 弃用 / 应用”、执行版页“派生下一周期执行版 / 历史版本”、发布确认页“返回修改 / 确认发布”和要求映射页“新增要求项 / 编辑 / 删除 / 编辑映射 / 确认配置”已按 F4 迁入公共 `Button`，优化建议跳转、上传制度来源、重新分析、建议采纳/暂缓/弃用/应用、版本记录抽屉、历史版本抽屉、派生执行版、返回执行版、发布状态流转和要求映射新增/编辑/删除/确认配置仍由现有路由、页面状态和 `abilityListStore` 承接。
2. 将当前模块级本地 store 拆为正式 domain types / initialData / actions。
3. 评估是否迁移到 Pinia store。
4. 将版本记录抽屉、编辑抽屉、状态徽章抽成稳定组件。

## 4. 管理端：成长档案

### 4.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 上传文件 | 部门导入的 Excel、ZIP、PDF 等资料 | `frontend/src/pages/admin/archive/ArchiveImportUploadPage.vue`、`frontend/src/stores/admin/archiveStore.ts` |
| 导入批次 | 一次部门资料导入任务 | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue`、`frontend/src/stores/admin/archiveStore.ts` |
| 识别结果 | 系统解析后生成的待确认、待补充、待核验、异常、重复记录数量 | `ArchiveImportBatchPage.vue`、`archiveStore.ts` |
| 处理记录 | 待确认、待补充、待核验、异常、拟退中的档案记录 | `frontend/src/pages/admin/archive/ArchiveProcessingPage.vue`、`archiveStore.ts` |
| 教师档案 | 教师个人成长档案详情 | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` |
| 来源记录 | 档案详情中某条事实的来源追溯 | `ArchiveTeacherDetailPage.vue` |

### 4.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 上传文件 | 上传中、已上传、上传失败 | `archiveStore.uploadedFiles` | 已接入模块级本地状态 |
| 导入批次 | 识别中、识别完成、已确认生成记录、已取消 | `archiveStore.importBatches.status` 支持 `recognizing`、`recognized`、`confirmed`、`cancelled` | 已完成本地闭环 |
| 识别结果 | 待确认、待补充、待核验、异常、重复 | `ArchiveRecognitionResult` | 确认后可生成处理记录 |
| 处理记录 | 待确认、待检验、待补充、异常待处理、拟退中、已入档 | `archiveStore.processingRecords` | 已完成确认入档、退回补充、标记异常和处理历史本地闭环 |
| 教师档案事实 | 草稿、待确认、已入档、已更正、已退回 | `archiveStore.teacherArchiveFacts` 已在确认入档时写入，并由档案详情页读取 | 已完成已入档事实本地闭环，其余状态待后续细化 |

### 4.3 主流程

```txt
部门上传资料
→ 创建导入批次
→ 系统识别资料
→ 人工确认识别结果
→ 生成档案处理记录
→ 管理端确认入档 / 退回补充 / 标记异常
→ 教师成长档案新增或更新事实
→ 档案查阅页可查询
→ 档案详情可追溯来源记录
```

### 4.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 档案处理 | 进入导入部门资料 | `router.push('/admin/archive/import')` | 已闭环到页面 |
| 上传资料 | 添加、删除上传文件 | 修改 `archiveStore.uploadedFiles` | 已完成本地闭环 |
| 上传资料 | 开始识别 | 创建 `archiveStore.importBatches` 并进入批次详情 | 已完成本地闭环 |
| 批次详情 | 刷新状态 | 调用 `completeArchiveBatchRecognition()`，批次改为识别完成 | 已完成本地闭环 |
| 批次详情 | 确认识别结果 | 调用 `confirmArchiveBatchRecognition()`，生成处理记录后返回档案处理页 | 已完成本地闭环 |
| 批次详情 | 取消本次任务 | 调用 `cancelArchiveImportBatch()`，批次改为 `cancelled`，文件状态改为“已取消”，不生成处理记录 | 已完成本地闭环 |
| 档案处理 | 确认入档、再次退回、标记异常、查看补充说明 | 修改 `archiveStore.processingRecords`，确认入档写入 `teacherArchiveFacts` | 已完成本地闭环 |
| 档案查阅 | 查看教师档案 | `router.push('/admin/archive/teacher/:teacherId')` | 已闭环到页面 |
| 档案详情 | 来源详情抽屉 | 页面内打开抽屉；栏目入口按当前栏目合并 `archiveStore.teacherArchiveFacts` 来源记录，已入档事实卡片入口按当前点击的 `fact.id` 精确过滤来源记录 | 已完成本地事实来源过滤 |

### 4.5 第一批修复顺序

成长档案主链本地闭环已完成。后续工程重构阶段再处理：

1. 档案处理详情面板“确认入档 / 再次退回 / 标记异常 / 查看补充说明”、导入资料上传页“选择文件 / 从本地文件夹导入 / 删除 / 取消 / 开始识别资料”、导入批次详情底部“返回档案处理 / 取消本次任务 / 刷新状态 / 查看上传文件 / 确认识别结果”、档案查阅页“搜索 / 重置 / 查看成长档案”和教师档案详情页“返回档案查询 / 打印 / 导出 PDF / 关闭 / 查看来源记录 / 查看记录详情”已按 F4 迁入公共 `Button`，确认入档、退回、异常处理、补充说明展示、上传资料选择与删除、创建导入批次、批次识别状态流转、档案筛选、教师档案详情跳转、来源过滤和记录详情反馈仍由现有 store、路由和页面函数承接；导出 PDF 仍是前端降级示例，不标记为正式导出闭环。
2. 教师档案事实的更正、退回、草稿状态留到后续业务审计细化。

## 5. 管理端：培训管理

### 5.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 培训资源 | 可用于匹配培训需求的课程、机构、培训项目 | `frontend/src/pages/admin/training/TrainingResourcePage.vue`、`frontend/src/stores/admin/trainingStore.ts` |
| 培训需求 | 来源于能力画像、教师申请或管理主动添加的培训需求 | `frontend/src/pages/admin/training/TrainingDemandPage.vue`、`trainingStore.ts` |
| 培训计划 | 面向教师发布的培训安排 | `frontend/src/pages/admin/training/TrainingPlanPage.vue`、`TrainingPlanDetailPage.vue`、`trainingStore.ts` |
| 培训申请 | 教师对培训计划的报名或申请 | `frontend/src/pages/admin/training/TrainingApplicationPage.vue`、`trainingStore.ts` |
| 培训记录 | 教师实际参加培训后的记录 | `frontend/src/pages/admin/training/TrainingRecordPage.vue`、`TrainingRecordDetailPage.vue`、`trainingStore.ts` |
| 培训材料 | 培训总结、证书、学习证明等入档材料 | `frontend/src/pages/admin/training/TrainingRecordDetailPage.vue`、`trainingStore.ts` |

### 5.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 培训资源 | 可用、信息待完善、已停用 | `trainingStore.resources` | 新增资源草稿已接入模块级本地状态 |
| 培训需求 | 待匹配、已匹配、暂不处理 | `trainingStore.demands` | 新增需求、匹配资源已完成本地闭环 |
| 培训计划 | 草稿、报名中、进行中、已完成、材料待完善 | `trainingStore.plans` | 保存草稿、保存并发布已进入计划列表 |
| 培训申请 | 待处理、已同意、未同意、已取消 | `trainingStore.applications` | 同意/退回已同步计划详情参与名单 |
| 培训记录 | 学习中、待总结、证书待补、记录完整 | `trainingStore.records` | 详情页上传证书后回写记录总览 |
| 培训材料 | 待补充、已上传 | `TrainingRecord.materials` | 上传证书后记录变为完整 |

### 5.3 主流程

```txt
培训资源入库
→ 能力画像 / 教师主动 / 管理主动形成培训需求
→ 需求匹配资源
→ 创建培训计划
→ 发布计划
→ 教师申请或被指定参加
→ 管理端处理申请
→ 形成参与名单
→ 培训结束生成培训记录
→ 教师补总结和证书材料
→ 记录完整后沉淀到成长档案
```

### 5.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 资源库 | 新增资源草稿 | 调用 `addTrainingResourceDraft()` 写入 `trainingStore.resources` | 已完成本地闭环 |
| 需求管理 | 新增需求 | 调用 `addTrainingDemand()` 写入 `trainingStore.demands` | 已完成本地闭环 |
| 需求管理 | 匹配资源 | 调用 `matchTrainingDemand()`，需求改为已匹配 | 已完成本地闭环 |
| 需求管理 | 查看待匹配 | 设置筛选状态 | 页面内闭环 |
| 计划管理 | 新建计划保存草稿/发布 | 调用 `createTrainingPlan()` 插入 `trainingStore.plans` | 已完成本地闭环 |
| 计划管理 | 查看相关计划 | 右侧“执行提醒”设置 `selectedStatus = '报名中'` | 页面内闭环 |
| 计划管理 | 查看详情 | `router.push('/admin/training/plans/:planId')` | 已闭环到页面 |
| 申请处理 | 同意/退回申请 | 调用 `approveTrainingApplication()` / `rejectTrainingApplication()` | 已同步计划详情参与名单 |
| 记录总览 | 查看材料待完善记录 | 设置筛选状态 | 页面内闭环 |
| 记录详情 | 上传证书材料 | 调用 `uploadTrainingCertificate()`，记录变为完整，并生成成长档案待确认处理记录；页面操作反馈直接读取 `trainingStore.operationMessage` | 已完成跨模块本地闭环 |
| 计划详情 | 查看教师档案 | `router.push('/admin/archive/teacher/:teacherId')` | 已闭环到成长档案页面 |

### 5.5 第一批修复顺序

培训管理主链本地闭环已完成。当前入档口径为：培训记录材料完整后生成成长档案“待确认”处理记录，不直接入档；上传证书后的页面反馈会明确提示已生成成长档案待确认记录。后续进入工程重构阶段时再处理：

1. 筛选栏紧凑批次已覆盖培训管理和虚拟教研室列表，右侧摘要面板已覆盖培训需求、培训申请、培训资源和培训计划，培训计划新建抽屉已迁入 `DetailSheet md`，培训计划主入口、右侧筛选动作，以及培训计划、培训计划详情参与教师、培训记录、培训记录详情材料区、培训资源、培训需求、培训申请表格行内动作已迁入公共 `Button`；培训申请筛选重置和右侧处理提醒动作、培训资源/需求右侧筛选入口、培训资源/需求/计划/记录筛选重置、虚拟教研室列表筛选重置和查看详情入口也已迁入公共 `Button`。

## 6. 管理端：能力画像

### 6.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 群体画像 | 全校或组织范围内的能力结构、维度分布和发展支持方向 | `frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue`、`frontend/src/services/mock/ability-profile.ts` |
| 重点关注对象 | 群体画像下钻出的院系、专业、教师关注项 | `AbilityProfileGroupPage.vue` |
| 教师画像列表 | 教师画像入口，支持列表/卡片视图和筛选 | `frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue`、`frontend/src/services/mock/ability-profile.ts` |
| 教师画像详情 | 单个教师的发展指数、能力结构和支持方向 | `frontend/src/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue`、`frontend/src/domain/admin/ability-profile.ts`、`frontend/src/services/mock/ability-profile.ts` |

### 6.2 主流程

```txt
成长档案事实 / 能力清单执行版口径
→ 形成教师画像
→ 聚合成群体画像
→ 识别重点支持对象
→ 跳转教师画像详情或按关注类型筛选教师列表
→ 后续培训需求、实践支持、教研支持引用画像结论
```

### 6.3 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 群体画像 | 查看完整建议 | 跳转 `/admin/ability-profile/teacher?focus=重点支持` | 已闭环到教师画像列表筛选 |
| 群体画像 | 查看教师画像 | 教师对象跳转 `/admin/ability-profile/teacher/:teacherId` | 已闭环到教师画像详情 |
| 群体画像 | 查看院系/专业画像 | 不新增独立画像页，保留在群体画像重点关注对象筛选态内定位当前对象 | 已闭环为页面内筛选态，不再提示降级 |
| 教师画像列表 | 搜索、学院、职称、类型、关注筛选、分页 | 本页计算 `filteredTeachers`、`paginatedTeachers` 和页码状态 | 页面内闭环 |
| 教师画像列表 | 进入画像 | `router.push('/admin/ability-profile/teacher/:teacherId')` | 已闭环到详情 |
| 教师画像详情 | 按档案事实和执行版口径计算画像 | `calculateTeacherAbilityProfile()` 读取 `archiveStore.teacherArchiveFacts` 和 `abilityListStore.executionIndicators`，生成发展指数、雷达分、维度说明和支持方向证据 | 已补第一版真实计算关系 |
| 教师画像详情 | 返回/切换教师 | 返回教师画像列表 | 已闭环到列表 |

### 6.4 后续审计点

1. 教师画像详情已通过 `calculateTeacherAbilityProfile()` 建立第一版计算口径：正式档案事实提供证据，能力清单执行版指标提供维度构成；群体画像仍使用 mock 聚合数据，后续可沿用同一计算函数扩展。
2. 群体画像的院系/专业画像已决定保留为群体画像内筛选态；后续如需独立页，需先补真实院系/专业画像模型，不复用当前提示态。

## 7. 管理端：教学反思

### 7.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 反思记录 | 教师围绕课程、班级、触发来源提交的教学反思 | `frontend/src/domain/admin/reflection.ts`、`frontend/src/stores/admin/reflectionStore.ts`、`frontend/src/services/mock/reflection.ts`、`ReflectionOverviewPage.vue` |
| 反思详情 | 单条反思的教学背景、数据观察、问题分析、改进建议 | `frontend/src/domain/admin/reflection.ts`、`frontend/src/services/mock/reflection.ts`、`ReflectionDetailPage.vue` |
| 来源数据 | 触发反思的评教反馈、课堂过程记录、教师补充说明或手机端提交的课堂分析报告、录音、教学资料等依据 | `frontend/src/domain/admin/reflection.ts`、`frontend/src/stores/admin/reflectionStore.ts`、`frontend/src/services/mock/reflection.ts`、`ReflectionDetailPage.vue` |
| 共性问题 | 多条反思聚合出的高频问题定位 | `frontend/src/domain/admin/reflection.ts`、`frontend/src/services/mock/reflection.ts`、`ReflectionOverviewPage.vue` |
| 相关反思 | 与当前问题、课程、班级相近的反思记录 | `frontend/src/domain/admin/reflection.ts`、`frontend/src/services/mock/reflection.ts`、`ReflectionDetailPage.vue` |

### 7.2 主流程

```txt
教师端提交教学反思
→ 管理端汇总反思列表
→ 按组织、学期、触发来源、关键词筛选
→ 查看单条反思详情
→ 查看来源数据、问题分析、改进建议
→ 查看相关反思或回到列表按共性问题筛选
→ 生成成长档案“教学工作”待确认处理记录
```

### 7.3 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 反思总览 | 接收手机端提交记录 | `receiveMobileReflectionRecord()` 写入 `reflectionStore.records`，总览合并 store 记录和 mock 记录 | 已接入第一版；不直接从手机端 import 代码，后续由接口同步 |
| 反思总览 | 筛选 / 重置 | 页面状态控制组织、学期、触发来源和关键词；重置调用 `resetFilters()` | 页面内闭环 |
| 反思总览 | 查看记录 | `router.push('/admin/reflection/:reflectionId')` | 已闭环到详情 |
| 反思总览 | 查看相关记录 | 设置共性问题关键词，过滤当前列表 | 已完成问题定位本地闭环 |
| 反思总览 | 接收详情页 keyword query | 初始化 `searchQuery` 和 `activeIssueKeyword` | 已完成详情返回列表筛选闭环 |
| 反思详情 | 查看来源数据 | 优先展示 `reflectionStore.records[*].sourceMaterials`，无手机端记录时降级为 mock 来源数据 | 已对齐手机端反思依据材料 |
| 反思详情 | 查看相关反思 | `router.push('/admin/reflection/:id')` | 已闭环到详情 |
| 反思详情 | 查看更多相关记录 | `router.push('/admin/reflection?keyword=课堂互动反馈不足')` | 已闭环到列表问题定位 |
| 反思详情 | 生成档案待确认记录 | 调用 `sendReflectionToArchive()`，写入 `archiveStore.processingRecords` | 已完成跨模块本地闭环，不直接入档 |

### 7.4 后续审计点

1. 管理端教学反思已能通过 `receiveMobileReflectionRecord()` 接收手机端提交记录，记录来源材料写入 `sourceMaterials`，总览和详情优先读取 `reflectionStore.records`。
2. 当前反思沉淀口径为生成 `archiveStore.processingRecords` 待确认记录，不直接写入 `archiveStore.teacherArchiveFacts`。
3. 反思总览和详情查看类动作已按 F4 迁入公共 `Button`，跳转和问题关键词过滤口径不变。

## 8. 管理端：企业实践

### 8.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 实践申请 | 教师提交的企业实践申请，包含单位、岗位、周期和预计天数 | `frontend/src/pages/admin/practice/PracticeApplicationPage.vue`、`frontend/src/stores/admin/practiceStore.ts` |
| 年度实践跟踪 | 教师年度 30 天实践完成情况、当前进展和最近动作 | `frontend/src/pages/admin/practice/PracticeTrackingPage.vue`、`practiceStore.ts` |
| 实践记录 | 已开始或已结束的企业实践记录，包含材料状态和归档状态 | `frontend/src/pages/admin/practice/PracticeRecordPage.vue`、`practiceStore.ts` |
| 档案待确认记录 | 企业实践归档后生成的成长档案待确认记录 | `frontend/src/stores/admin/archiveStore.ts` |

### 8.2 主流程

```txt
教师提交企业实践申请
→ 管理端同意或退回申请
→ 同意后进入年度实践跟踪并生成实践中记录
→ 教师补日志、总结、企业评价
→ 管理端确认归档
→ 计入年度实践天数
→ 生成成长档案“企业实践”待确认记录
```

### 8.3 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 申请处理 / 年度实践跟踪 / 实践记录 | 筛选 / 重置 / 查询 | 页面状态控制筛选条件和搜索词；重置调用 `resetFilters()`，查询调用 `applyFilters()` | 页面内闭环 |
| 申请处理 | 同意申请 | 调用 `approvePracticeApplication()` | 已同步年度跟踪和实践记录 |
| 申请处理 | 退回修改 | 调用 `returnPracticeApplication()` | 已同步跟踪最近动作 |
| 申请处理 | 查看记录 | 已同意申请按 `applicationId` 跳转 `/admin/practice/records?recordId=...` | 已闭环到实践记录 |
| 年度实践跟踪 | 提醒申请 | 调用 `remindPracticeApplication()` | 页面内闭环，保留完成天数不变 |
| 年度实践跟踪 | 查看申请/记录 | 查看记录按教师跳转 `/admin/practice/records?recordId=...` | 已闭环到实践记录 |
| 实践记录 | 提醒补材料 | 调用 `remindPracticeMaterial()` | 页面内闭环 |
| 实践记录 | 确认归档 | 调用 `confirmPracticeArchive()` | 已同步年度天数，并生成成长档案待确认处理记录；来源记录包含企业、实践周期、天数和岗位 |
| 实践记录 | 查看档案 | 跳转 `/admin/archive/processing?recordId=practice-...`，档案处理页读取 `recordId` 选中待确认记录 | 已闭环到成长档案处理工作台 |

### 8.4 后续审计点

1. 当前企业实践记录归档后生成成长档案待确认记录，不直接入档，和培训管理口径保持一致。
2. “查看档案”当前进入成长档案处理工作台待确认记录；管理端确认入档后，`teacherArchiveFacts.sourceRecordId` 可通过 `getArchiveSourceRecordsForFact()` 回到企业实践来源记录，来源字段已包含企业、实践周期、天数和岗位。
3. 企业实践三页查看/定位类动作，以及同意、退回、提醒、确认归档和查看档案等动作均已按 F4 迁入公共 `Button`。

## 9. 管理端：虚拟教研

### 9.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 虚拟教研室 | 线上教研组织，包含方向、归属、负责人、成员和活动/记录统计 | `frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue`、`frontend/src/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue`、`frontend/src/stores/admin/virtualLabStore.ts` |
| 教研室成员 | 教研室内教师、角色、参与活动和形成记录情况 | `VirtualLabRoomDetailPage.vue`、`virtualLabStore.ts` |
| 教研活动 | 线上研讨活动，包含会议方式、参与情况、记录形成状态 | `frontend/src/pages/admin/virtual-lab/VirtualLabActivityDetailPage.vue`、`virtualLabStore.ts` |
| 活动资料 | 活动产生的会议纪要、任务分工、阶段成果、过程材料 | `VirtualLabActivityDetailPage.vue`、`VirtualLabRecordDetailPage.vue`、`virtualLabStore.ts` |
| 教研记录 | 由活动形成的教研记录，关联活动、教研室、资料和档案维度 | `frontend/src/pages/admin/virtual-lab/VirtualLabRecordDetailPage.vue`、`virtualLabStore.ts` |
| 档案待确认记录 | 教研记录沉淀后生成的成长档案待确认处理记录 | `frontend/src/stores/admin/archiveStore.ts` |

### 9.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 虚拟教研室 | 草稿、运行中、归档、停用 | `VirtualLabRoom.status`、`publishVirtualLabRoom()`、`stopVirtualLabRoom()`、`archiveVirtualLabRoom()` | 已补正式状态机第一版 |
| 教研活动 | 待安排、进行中、已结束、已形成记录、记录异常 | `VirtualLabActivity.recordStatus` 支持 `未形成记录`、`已形成记录`、`记录异常` | 已覆盖记录形成主状态 |
| 活动资料 | 已同步、同步失败、重新同步中 | `VirtualLabMaterial.syncStatus`、`markVirtualLabMaterialSyncFailed()`、`resyncVirtualLabMaterial()` | 已补资料同步失败和重新同步状态 |
| 教研记录 | 待沉淀、已生成待确认档案 | `VirtualLabRecord.archiveStatus` | 已完成记录到成长档案待确认处理记录的本地闭环 |
| 成长档案处理记录 | 待确认、待补充、异常待处理、已入档 | `archiveStore.processingRecords` | 虚拟教研只生成“待确认”，不直接入档 |

### 9.3 主流程

```txt
创建或维护虚拟教研室
→ 邀请教师加入教研室
→ 新建教研活动
→ 同步会议、参与和活动资料
→ 活动形成教研记录
→ 查看记录正文、参与来源和来源资料
→ 生成成长档案“教研科研”待确认处理记录
→ 后续由成长档案处理页确认入档
```

### 9.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 教研室列表 | 新增虚拟教研室 | 调用 `createVirtualLabRoom()` 写入 `virtualLabStore.rooms` | 已完成本地闭环 |
| 教研室列表 / 详情 | 发布、停用、归档教研室 | `publishVirtualLabRoom()`、`stopVirtualLabRoom()`、`archiveVirtualLabRoom()` 修改 `VirtualLabRoom.status` | store 层已闭环，页面批量入口后续按效果图补 |
| 教研室列表 | 筛选 / 重置 / 查询 | 页面状态控制院系、专业群、活动情况和搜索词；重置调用 `resetFilters()`，查询调用 `applyFilters()` | 页面内闭环 |
| 教研室列表 | 查看详情 | `router.push('/admin/virtual-lab/rooms/:roomId')` | 已闭环到详情 |
| 教研室详情 | 邀请教师 | 调用 `inviteVirtualLabMember()`，同步成员列表和教研室成员数 | 已完成本地闭环 |
| 教研室详情 | 移出成员 | 调用 `removeVirtualLabMember()`，负责人不可移出 | 已完成本地闭环 |
| 教研室详情 | 新建教研活动 | 调用 `createVirtualLabActivity()`，同步近期活动和教研室活动统计 | 已完成本地闭环 |
| 教研室详情 | 查看活动/记录 | 跳转活动详情或记录详情 | 已闭环到页面 |
| 活动详情 | 形成并查看记录 | 未形成记录时调用 `formVirtualLabRecordFromActivity()` 后进入记录详情 | 已完成活动到记录闭环 |
| 活动详情 | 查看会议记录/资料 | 页面内定位或提示当前资料 | 页面内闭环 |
| 活动详情 | 资料同步失败 / 重新同步 | `markVirtualLabMaterialSyncFailed()`、`resyncVirtualLabMaterial()` 修改 `VirtualLabMaterial.syncStatus` | store 层已闭环，真实上传同步服务后续替换 |
| 记录详情 | 查看来源活动 | 按 `record.sourceActivityId` 跳转来源活动 | 已闭环到来源活动 |
| 记录详情 | 查看来源资料 | 滚动定位来源资料列表 | 页面内闭环 |
| 记录详情 | 生成档案待确认 | 调用 `sendVirtualLabRecordToArchive()`，写入 `archiveStore.processingRecords` 后跳转 `/admin/archive/processing?recordId=virtual-lab-...` | 已闭环到成长档案处理工作台 |

设计系统审计：虚拟教研室列表查看详情入口、教研室详情页标题区主次动作、成员表查看/移出、活动表查看和记录列表查看、活动详情页编辑/查看会议记录/查看资料/形成并查看记录、记录详情页查看来源/查看资料/生成档案待确认已按 F4 迁入公共 `Button`；分页、返回箭头和复制会议号仍按局部控件保留，不改变业务状态流转。

### 9.5 后续审计点

1. 虚拟教研室正式状态机已在 `virtualLabStore` 建立第一版；页面入口可按后续效果图补充，但状态字段和动作已可复用。
2. 活动资料已补同步失败和重新同步状态；真实上传、同步队列和失败原因细分后续替换。
3. 虚拟教研记录沉淀口径已与培训、企业实践保持一致：生成成长档案待确认处理记录，不直接入档；生成后进入成长档案处理工作台对应记录。

## 10. 管理端：分析报告

### 10.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 报告卡片 | 分析报告、分析大屏、专题解读、图表解读、数据问答的入口卡片 | `frontend/src/pages/admin/reports/ReportCenterPage.vue`、`frontend/src/stores/admin/reportStore.ts` |
| 报告详情 | 查看报告、大屏预览或数据不足原因说明的同页详情面板 | `ReportCenterPage.vue`、`reportStore.ts` |
| 报告周期 | 报告所属年度周期，用于报告中心周期筛选 | `ReportCard.period` |
| 导出任务 | 已生成报告的异步导出任务和当前任务状态 | `ReportState.exportTasks`、`ReportCard.exportStatus` |
| AI 分析线程 | 从报告继续分析、继续追问或基于筛选结果生成分析的问答线程 | `ReportState.aiThreads`、`ReportState.aiSession` |
| 动作历史 | 查看、导出、更新、重新生成等动作留痕 | `reportStore.ts` |

### 10.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 报告 | 已生成、待更新、数据不足 | `ReportCard.status` | 已接入模块级本地状态 |
| 导出 | 未导出、导出中、导出文件已生成；任务状态为处理中、已完成、失败 | `ReportCard.exportStatus`、`ReportExportTask.status` | 已补异步导出任务第一版 |
| 详情面板 | 报告详情、大屏预览、原因说明 | `ReportState.detailMode` | 已完成查看类动作本地闭环 |
| AI 分析 | 未开启、进行中、已完成 | `ReportState.aiThreads`，页面兼容展示 `ReportState.aiSession` | 已补真实问答线程第一版 |

### 10.3 主流程

```txt
选择报告类型 / 对象 / 周期 / 状态
→ 查看报告、大屏或数据不足原因
→ 已生成报告可创建异步导出任务
→ 待更新报告可更新为已生成
→ 已生成报告可重新生成并记录历史
→ 继续分析 / 继续追问 / AI 助手生成分析
→ 生成 AI 分析线程并同页展示线程状态
```

### 10.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 报告中心 | 筛选 / 查询 / 重置 | 页面状态控制 tab、对象、周期、状态和搜索词；周期筛选读取 `ReportCard.period`；查询调用 `applyFilters()`，重置调用 `resetFilters()` | 页面内闭环 |
| 报告中心 | 查看 | 调用 `openReportDetail()`，打开同页报告详情面板 | 已完成本地闭环 |
| 报告中心 | 查看大屏 | 调用 `openReportDetail(reportId, 'dashboard')` | 已明确为同页大屏预览，不新增路由 |
| 报告中心 | 查看原因 | 调用 `openReportDetail(reportId, 'insufficient-data')` | 已完成数据不足原因说明 |
| 报告中心 | 导出 | 调用 `exportReport()` 创建 `ReportExportTask`，报告 `exportStatus` 变为“导出中” | 已补异步导出任务闭环 |
| 报告中心 | 更新 / 重新生成 | 调用 `regenerateReport()`，报告状态变为“已生成”，生成时间为“刚刚” | 已完成本地闭环 |
| 报告中心 | 继续分析 / 继续追问 | 调用 `continueReportAnalysis()`，创建 `ReportAiThread` 并兼容打开 AI 分析会话 | 已补 AI 问答线程闭环 |
| 报告中心 | AI 助手生成分析 | 调用 `openReportAiAssistant()`，基于当前筛选结果创建 AI 分析线程 | 已补 AI 问答线程闭环 |

### 10.5 后续审计点

1. 报告周期筛选已从纯页面控件补为 `ReportCard.period` 数据筛选；后续接接口时需确认年度周期枚举来源。
2. 报告详情目前是同页摘要面板，后续如有高保真详情页再补独立路由。
3. 导出已从单一前端完成态升级为本地异步任务队列；后续接后端导出服务时替换任务完成 / 失败回写。
4. AI 分析已从单一会话提示升级为本地问答线程；后续接真实 AI 服务时替换消息生成和线程持久化。

## 11. 教师手机端：待办

### 11.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 待办记录 | 教师需要确认、补充、完善或处理的个人事项 | `teacher-mobile/src/stores/todoStore.ts`、`teacher-mobile/src/pages/todo/index.vue`、`teacher-mobile/src/pages/todo/all/index.vue` |
| 待办动态 | 教师近期确认、材料更新、草稿保存等操作时间线 | `teacher-mobile/src/pages/todo/dynamics/index.vue`、`teacher-mobile/src/pages/todo/dynamics-filter/index.vue` |
| 待确认档案记录 | 系统识别后需要教师确认是否属于本人的档案记录 | `teacher-mobile/src/stores/todoStore.ts`、`teacher-mobile/src/pages/todo/certificate-detail/index.vue` |
| 培训证书材料 | 待确认档案记录关联的证书图片和证书字段 | `todoStore.ts`、`certificate-detail/index.vue`、`certificate-edit/index.vue` |
| 修改提交记录 | 教师修改证书字段后提交给部门核验的记录 | `teacher-mobile/src/pages/todo/certificate-submit/index.vue` |
| 入档确认结果 | 教师确认本人记录后的待核验结果态 | `teacher-mobile/src/pages/todo/certificate-archive-success/index.vue` |
| 移出结果 | 教师判断记录不属于本人后从待确认列表移出的结果态 | `teacher-mobile/src/pages/todo/certificate-removed/index.vue` |
| 跨模块待办 | 企业实践补充、培训证书补充、教学反思草稿等手机端任务 | `todoStore.todos.actionUrl` 对齐 activity / archive 页面入口 |

### 11.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 待办记录 | 待确认、待补充、可完善、待核验、已入档、已移出 | `todoStore.todos` 共享 `pending-confirm`、`pending-supplement`、`improvable`、`pending-verify`、`archived`、`removed` | 手机端待办闭环已补第一版；培训证书确认先进入待核验，管理端确认后才允许成为已入档 |
| 待确认档案记录 | 待确认、待核验、已入档、已移出 | `todoStore.certificate.status`，对齐 `archiveStore.processingRecords` | 证书详情确认、修改提交、移出会同步同一条记录状态；已入档只能来自管理端确认 |
| 培训证书材料 | 原始识别、已预览、已更换、待核验、已确认 | `todoStore.certificate.keyInfo`、`editableInfo`、`changes`、`material.status` | 证书详情可预览材料，编辑页更换材料写入上传状态 |
| 待办动态 | 记录确认、材料更新、草稿保存、入档确认、其他 | `todoStore.todoDynamics` | 确认、修改、移出、材料预览 / 更换和管理端确认入档会写入共享动态，首页和动态页同源读取 |
| 入档确认结果 | 待核验、可查看待核验记录、可申请更正、管理端确认后已入档 | 确认结果页展示“等待入档”，进入统一档案详情页查看待核验记录；`confirmTodoCertificateArchivedByAdmin()` 只承接管理端确认后的已入档同步 | 已接入档案详情页和个人发展分类页第一版，不直接写正式档案事实 |
| 移出结果 | 已移出、可查看其他待确认记录、部门复核后可重新生成待确认记录 | 详情页“不是我的”进入移出结果页；移出结果页可返回待办或全部待办；移出原因写入 `removeReason` | 已记录移出原因；恢复口径为管理端复核后重新生成待确认记录 |

### 11.3 主流程

```txt
待办首页 / 全部待办
→ 进入待确认培训证书详情
→ 教师确认记录属于本人
→ `confirmTodoCertificate()` 标记待核验并追溯 `archiveStore.processingRecords`
→ 确认结果页提示等待管理端入档确认
→ 管理端确认后调用 `confirmTodoCertificateArchivedByAdmin()` 同步为正式已入档事实
```

```txt
待确认培训证书详情
→ 信息有误，进入编辑页
→ 修改证书字段 / 补充说明 / 更换材料
→ 提交修改
→ `submitTodoCertificateCorrection()` 标记待核验，生成 `submissionRecords`
→ 核验通过后入档到个人发展
```

```txt
待确认培训证书详情
→ 判断不是本人记录
→ `removeTodoCertificate()` 标记已移出并记录移出原因
→ 不进入成长档案
→ 返回待办或查看其他待确认记录
```

```txt
待办首页 / 全部待办
→ 企业实践补充、培训证书补充、教学反思草稿、企业实践总结草稿
→ 通过 `getTodoActionUrl()` 进入对应 activity 页面
→ 业务对象分别追溯 `practiceStore.records`、`trainingStore.records`、`reflectionStore.records`
→ 需要档案处理的记录统一追溯 `archiveStore.processingRecords`
```

### 11.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 待办首页 | 查看全部待办 | `uni.navigateTo('/pages/todo/all/index')` | 已闭环到页面 |
| 待办首页 | 去确认 | 读取 `getHomeTodoItems()`，证书待办进入 `certificate-detail` | 已闭环到证书详情页；待核验/已入档/已移出后不再出现在待办列表 |
| 待办首页 | 查看全部动态 | `uni.navigateTo('/pages/todo/dynamics/index')` | 已闭环到动态页 |
| 全部待办 | 去确认 | 读取 `getVisibleTodoItems()`，证书待办进入 `certificate-detail` | 已闭环到证书详情页；确认后进入待核验并从待办列表移出 |
| 证书详情 | 信息有误，修改一下 | `uni.navigateTo('/pages/todo/certificate-edit/index')` | 已闭环到编辑页 |
| 证书详情 | 确认是我的 | 调用 `confirmTodoCertificate()` 后进入 `certificate-archive-success` | 已完成证书确认到待核验的本地状态闭环，不直接入档 |
| 证书详情 | 不是我的 | 调用 `removeTodoCertificate()` 后进入 `certificate-removed` | 已完成移出状态和移出原因记录；是否恢复按“联系部门重新核验”处理 |
| 证书详情 | 查看材料 | 调用 `previewTodoCertificateMaterial()` 后进入统一档案详情材料承接页 | 已闭环到材料预览降级入口 |
| 证书编辑 | 提交修改 | 调用 `submitTodoCertificateCorrection()` 后进入 `certificate-submit` | 已完成待核验状态闭环，字段输入写回 `editableInfo` |
| 证书编辑 | 更换材料 | 调用 `replaceTodoCertificateMaterial()`，材料状态改为 `replaced` | 已接入本地上传状态，后续可替换为真实附件服务 |
| 证书提交结果 | 查看提交记录 | 读取 `certificate.submissionRecords` | 已形成可追踪提交记录，并标明 `archiveStore.processingRecords` |
| 证书提交结果 | 返回待办 | `uni.navigateTo('/pages/todo/index')` | 已闭环到待办首页 |
| 确认结果 | 查看待核验记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=certificate-digital-literacy&category=personal-development')` | 已闭环到统一记录详情页第一版，展示待核验 / 归档确认中口径 |
| 确认结果 | 返回待办 | `uni.navigateTo('/pages/todo/index')` | 已闭环到待办首页 |
| 管理端确认入档同步 | 同步正式已入档 | `confirmTodoCertificateArchivedByAdmin()` 将待办和证书状态改为 `archived`，材料状态改为 `confirmed`，并生成“入档确认”动态 | 已明确只有管理端确认后才能进入已入档 |
| 已移出待确认 | 返回待办 | `uni.navigateTo('/pages/todo/index')` | 已闭环到待办首页 |
| 已移出待确认 | 查看其他待确认记录 | `uni.navigateTo('/pages/todo/all/index')` | 已闭环到全部待办 |
| 全部动态 | 筛选动态 | `uni.navigateTo('/pages/todo/dynamics-filter/index')` | 已闭环到筛选页 |
| 全部动态 | 查看动态 | 读取 `todoStore.todoDynamics` 分组展示 | 已由确认、修改、移出和材料动作生成 |

### 11.5 后续审计点

1. 待办模块 9 张效果图和 9 个注册页面已基本对应；证书确认主链已由 `todoStore` 串起同一条待办记录，企业实践补充、培训证书补充、教学反思草稿和企业实践总结草稿已通过 `actionUrl` 接入跨模块待办入口。
2. “确认是我的”当前进入 `certificate-archive-success` 兼容旧路由名，但状态已统一为 `pending-verify`；正式已入档只能由管理端确认后产生。
3. “不是我的”当前已同步为 `removed` 并进入 `certificate-removed`，移出原因写入 `removeReason`；恢复口径为管理端复核后重新生成待确认记录。
4. 编辑页提交后已同步为 `pending-verify` 并进入提交结果页；字段输入写回 `editableInfo`，提交记录写入 `submissionRecords`。
5. 确认结果页的“查看待核验记录”当前进入统一记录详情页第一版；个人发展分类页已由统一分类页承接。
6. 动态列表读取共享 `todoDynamics`，确认、提交修改、材料预览 / 更换、移出和管理端确认入档动作都会生成动态。
7. 手机端待办与管理端 `archiveStore.processingRecords` 的本地对齐口径已覆盖待确认、待核验、已入档、已移出；真实接口接入时应保留现有状态枚举和 `confirmTodoCertificateArchivedByAdmin()` 这一类管理端结果同步动作。

## 12. 教师手机端：档案

### 12.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 档案首页 | 教师查看成长档案概览、分类入口和最近入档记录的一级页面 | `teacher-mobile/src/pages/archive/index.vue` |
| 档案分类 | 基本信息、教学工作、教研科研、企业实践、社会服务、成果荣誉、个人发展、考核评价等维度 | `teacher-mobile/src/pages/archive/category/index.vue`，由 `archive/index.vue` 分类卡片进入 |
| 档案记录 | 某一维度下已经入档或可查询的个人成长记录 | `teacher-mobile/src/domain/archive.ts`、`teacher-mobile/src/pages/archive/record-list/index.vue`、`teacher-mobile/src/pages/archive/record-query/index.vue` |
| 档案记录详情 | 单条档案事实的详情、来源、材料、用途和更正入口 | `teacher-mobile/src/domain/archive.ts`、`teacher-mobile/src/pages/archive/record-detail/index.vue` |
| 档案草稿 | 教师尚未提交核验的个人发展计划等草稿记录 | `teacher-mobile/src/domain/archive.ts`、`teacher-mobile/src/pages/archive/draft-list/index.vue`、`teacher-mobile/src/pages/archive/development-plan-edit/index.vue` |
| 档案来源 | 待办确认、培训归档、企业实践核验、虚拟教研归档等形成档案事实的来源 | `teacher-mobile/src/pages/todo/*`、`teacher-mobile/src/pages/activity/*` |
| 档案更正 | 教师发现入档事实有误后发起更正、补充材料并查看处理进度 | `teacher-mobile/src/pages/archive/correction/apply/index.vue`、`teacher-mobile/src/pages/archive/correction/submitted/index.vue`、`teacher-mobile/src/pages/archive/correction/progress/index.vue`、`teacher-mobile/src/pages/archive/correction/result/index.vue` 和 `teacher-mobile/src/pages/archive/correction/supplement/index.vue` 已接入；`profile/index.vue` 的“信息更正进度”已进入进度页 |
| 入档结果 | 业务流程完成后提示等待归档确认、待核验或管理端确认后的已入档结果态 | `certificate-archive-success`、`training-archive-result`、`enterprise-archive-success`、`virtual-research-archive-result` 等 |

### 12.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 档案记录 | 已入档、待确认、待核验、需补充、已移出、已更正 | `teacher-mobile/src/domain/archive.ts` 已统一 `archived`、`pending-verify`、`need-supplement`、`removed` 状态，首页、分类页、列表页、待确认列表和详情页按 `recordId` 读取同源数据 | 手机端档案真实状态回写已接入本地 domain；仍待真实接口同步 |
| 档案分类 | 有记录、无记录、最近更新、需补充 | 分类卡片、分类概览页和记录列表页已从 `domain/archive.ts` 读取分类摘要和记录；首页统计由 `getArchiveOverviewStats()` 计算 | 已有分类到列表到详情的本地同源闭环，分类数量随记录状态计算 |
| 档案查询 | 有结果、无结果、按分类筛选、关键词搜索 | 查询页调用 `searchArchiveRecords(queryText, selectedFilter)`，支持关键词、分类和无结果态 | 已接入真实搜索参数的本地实现 |
| 档案详情 | 可查看来源、可查看材料、可申请更正、可引用到画像/报告 | 已新增统一详情页第一版，展示来源追溯、材料和引用用途；材料点击调用 `previewArchiveMaterial()` 展示真实附件服务未接入的降级提示；“申请更正”按 `recordId` 进入更正申请页 | 详情页读取同源档案事实模型，更正状态由 correction 记录回写，材料预览已有明确降级入口 |
| 档案草稿 | 草稿、已提交核验 | `ArchiveDevelopmentPlanDraft` 由 `getArchiveDraftRecords()`、`saveArchiveDevelopmentPlanDraft()` 和 `submitArchiveDevelopmentPlanDraft()` 维护 | 已补发展计划草稿编辑第一版；提交后生成 `pending-verify` 档案记录，不直接入档 |
| 入档结果 | 等待确认、待核验、已入档、归档失败、需补充 | 培训、待办证书和企业实践均为“归档确认中 / 待核验”，虚拟教研为“已归档”但不直接写正式档案事实 | 手机端归档结果已统一为先进入 `archiveStore.processingRecords`，管理端确认后才产生正式已入档 |
| 档案更正 | 更正申请中、需补充、已通过、未通过 | 更正申请调用 `submitArchiveCorrection()` 生成真实更正记录；进度和结果页按 `correctionId` 读取，需补充会回写档案记录状态，补充材料调用 `submitArchiveCorrectionSupplement()` 并写入材料 `uploadStatus` | 已接入更正记录、补充材料上传状态和待核验状态；真实附件服务后续替换 |

### 12.3 主流程

```txt
档案首页
→ 查看档案概览
→ 进入某个档案分类
→ 查看分类下记录列表
→ 进入档案记录详情
→ 查看来源、材料、用途
→ 必要时申请更正或补充材料
```

```txt
待办 / 活动流程提交材料
→ 形成待确认、待核验或已归档记录
→ 写入对应档案分类
→ 管理端确认后才更新正式已入档数量和最近入档
→ 档案查询页可检索到记录
→ 档案详情可追溯来源
```

```txt
档案记录被画像、岗位 / 聘期要求和个人发展报告引用
→ 教师可从档案详情查看用途
→ 如事实错误，发起更正
→ 更正结果回写档案记录状态
```

### 12.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 档案首页 | 消息通知 | `uni.navigateTo('/pages/archive/record-query/index')` | 临时闭环到档案查询页；消息中心缺页 |
| 档案首页 | 搜索档案 | `uni.navigateTo('/pages/archive/record-query/index')` | 已闭环到查询页 |
| 档案首页 | 点击档案分类 | `uni.navigateTo('/pages/archive/category/index?category=...')` | 已闭环到分类概览页第一版 |
| 档案首页 | 查看待确认 | `uni.navigateTo('/pages/archive/draft-list/index')` | 已闭环到待确认 / 待核验列表第一版，并读取 `pending-verify` 记录 |
| 档案首页 | 查看全部最近入档 | `uni.navigateTo('/pages/archive/record-list/index?category=all')` | 已闭环到记录列表页第一版 |
| 档案首页 | 点击最近入档记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已闭环到统一记录详情页第一版，并按 domain 记录主键读取 |
| 档案分类 | 查看列表 / 查看全部记录 | `uni.navigateTo('/pages/archive/record-list/index?category=...')` | 已闭环到记录列表页第一版 |
| 档案分类 | 点击基本信息近期记录 | `uni.navigateTo('/pages/archive/basic-info-detail/index?recordId=...')` | 已闭环到基本信息详情页第一版，读取 `basic-info-teacher-profile` 并追溯 `teacherArchiveFacts` |
| 档案分类 | 点击其他分类近期记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已闭环到统一记录详情页第一版，并按 domain 记录主键读取 |
| 档案记录列表 | 搜索 | `uni.navigateTo('/pages/archive/record-query/index')` | 已闭环到查询页 |
| 档案记录列表 | 点击记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已闭环到统一记录详情页第一版，并按 domain 记录主键读取 |
| 待确认 / 草稿列表 | 点击草稿 | `uni.navigateTo('/pages/archive/development-plan-edit/index?draftId=...')` | 已闭环到发展计划草稿编辑页第一版，按 `draftId` 读取同源草稿 |
| 待确认 / 草稿列表 | 点击待核验记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已闭环到统一记录详情页第一版，并展示归档确认进度 |
| 档案查询 | 返回 | `uni.navigateBack()` | 已闭环到上一页 |
| 档案查询 | 清除关键词 | 清空本页关键词展示并重置筛选，调用 `searchArchiveRecords()` 重新计算 | 已形成本页搜索状态闭环 |
| 档案查询 | 分类筛选 | 本页按 `selectedFilter` 调用 `searchArchiveRecords(queryText, selectedFilter)` | 已形成本页筛选闭环 |
| 档案查询 | 点击记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已闭环到统一记录详情页第一版，并按 domain 记录主键读取 |
| 基本信息详情 | 查看来源记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=basic-info-teacher-profile')` | 已闭环到统一记录详情页，可查看同一档案事实的来源、材料和引用用途 |
| 基本信息详情 | 申请更正 | `uni.navigateTo('/pages/archive/correction/apply/index?recordId=basic-info-teacher-profile')` | 已闭环到更正申请页第一版，后续生成待核验更正记录 |
| 档案详情 / 基本信息详情 | 预览材料 | 调用 `previewArchiveMaterial(material)` 后 `uni.showToast` 展示降级说明 | 档案材料预览降级入口已补；真实附件服务后续替换 |
| 发展计划编辑 | 保存草稿 | 调用 `saveArchiveDevelopmentPlanDraft()` | 已写回本地草稿状态，不生成正式档案事实 |
| 发展计划编辑 | 提交核验 | 调用 `submitArchiveDevelopmentPlanDraft()` 后进入 `/pages/archive/record-detail/index?recordId=...` | 已生成个人发展维度 `pending-verify` 档案记录，追溯 `archiveStore.processingRecords` |
| 发展计划编辑 | 返回草稿 | `uni.navigateTo('/pages/archive/draft-list/index')` | 已闭环回草稿 / 待确认列表 |
| 档案详情 | 申请更正 | `uni.navigateTo('/pages/archive/correction/apply/index?recordId=...')` | 已闭环到更正申请页第一版 |
| 更正申请 | 查看原档案 / 返回详情 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已保留原档案上下文 |
| 更正申请 | 提交申请 | 调用 `submitArchiveCorrection()` 后进入提交结果页并携带 `correctionId` | 已生成本地真实更正记录，状态为待核验 |
| 更正已提交 | 查看原档案 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已保留原档案上下文 |
| 更正已提交 | 查看进度 | `uni.navigateTo('/pages/archive/correction/progress/index?recordId=...&correctionId=...')` | 已按同一更正记录查看进度 |
| 更正进度 | 查看原档案 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已保留原档案上下文 |
| 更正进度 | 查看处理结果 | 调用 `updateArchiveCorrectionStatus(correctionId, 'need-supplement')` 后进入结果页 | 已回写需补充状态，不伪造已通过 |
| 更正结果 | 查看原档案 / 补充材料 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')`、`uni.navigateTo('/pages/archive/correction/supplement/index?recordId=...&correctionId=...')` | 已保留结果后的上下文；需补充状态进入补充材料页第一版 |
| 补充材料 | 查看原档案 / 提交补充 | 点选材料后写入本地上传状态，调用 `submitArchiveCorrectionSupplement()` 后进入更正进度已补充态 | 已闭环到已补充进度态，并记录补充材料上传状态；真实附件服务后续替换 |
| 待办确认结果 | 查看待核验记录 | `uni.navigateTo('/pages/archive/record-detail/index?recordId=certificate-digital-literacy')` | 已闭环到统一记录详情页第一版，记录保持待核验状态 |
| 培训归档提交结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training/index')` | 已闭环到活动页 |
| 培训归档提交结果 | 查看提交内容 | 培训总结页调用 `createTrainingArchiveRecord()` 后传入 `recordId`，结果页进入 `/pages/archive/record-detail/index?recordId=...` | 已生成 / 定位本地待核验档案记录，并保持“归档确认中”口径 |
| 培训归档提交结果 | 查看档案待确认 | `uni.navigateTo('/pages/archive/draft-list/index')` | 已闭环到待确认 / 待核验列表 |
| 企业实践等待确认 | 查看提交内容 | `enterprise-archive-success` 调用 `createEnterprisePracticeArchiveRecord()` 后进入 `/pages/archive/record-detail/index?recordId=...` | 已生成 / 定位本地待核验档案记录，不直接写正式档案事实 |
| 企业实践等待确认 | 查看档案待确认 / 返回首页 | 分别进入 `/pages/archive/draft-list/index` 和 `/pages/activity/index` | 已闭环到待确认列表和活动首页 |
| 虚拟教研归档结果 | 目标“成长档案 · 教研科研维度” | `uni.navigateTo('/pages/archive/record-detail/index?recordId=...')` | 已闭环到统一记录详情页第一版，两个归档结果页分别定位对应教研记录 |
| 我的主页 | 信息更正进度 | `uni.navigateTo('/pages/archive/correction/progress/index?recordId=certificate-digital-literacy&status=pending-verify')` | 已闭环到更正进度页第一版；仍缺真实个人更正申请列表 |

### 12.5 信息架构建议

| 层级 | 建议路由 | 覆盖范围 |
| --- | --- | --- |
| 档案首页 | `pages/archive/index` | 保留概览、分类入口、最近入档 |
| 分类概览 | `pages/archive/category/index` | 已新增第一版，用 `category` 参数承接基本信息、教学工作、教研科研、企业实践、社会服务、成果荣誉、个人发展、考核评价，并读取 `domain/archive.ts`；个人发展分类页已由统一分类页承接，额外提供发展计划编辑入口 |
| 基本信息详情 | `pages/archive/basic-info-detail/index` | 已新增第一版，读取 `basic-info-teacher-profile` 档案事实，展示任职信息、教育背景、工作经历、来源追溯和管理端 `teacherArchiveFacts` 引用 |
| 分类记录列表 | `pages/archive/record-list/index` | 已新增第一版，承接分类下记录、空状态、搜索入口和详情跳转，并读取 `domain/archive.ts` |
| 档案记录查询 | `pages/archive/record-query/index` | 保留关键词搜索和跨分类结果列表，并读取 `domain/archive.ts` |
| 待确认 / 草稿列表 | `pages/archive/draft-list/index` | 已新增第一版，承接本地草稿、`pending-verify` 记录、空状态和确认进度下钻 |
| 发展计划编辑 | `pages/archive/development-plan-edit/index` | 已新增第一版，承接个人发展计划草稿编辑、保存草稿和提交核验 |
| 记录详情 | `pages/archive/record-detail/index` | 已新增第一版，统一承接教学评价详情、企业实践详情、培训证书详情、教研记录详情等 |
| 更正申请 | `pages/archive/correction/apply/index` | 已新增第一版，从记录详情按 `recordId` 发起更正，支持选择原因、补充说明和查看原材料 |
| 更正已提交 | `pages/archive/correction/submitted/index` | 已新增第一版，承接申请提交后的待核验结果，可回原档案或进入更正进度页 |
| 更正进度 | `pages/archive/correction/progress/index` | 已新增第一版，承接 `profile/index` 的“信息更正进度”和提交结果页的“查看进度”，展示待核验 / 已补充进度态 |
| 更正结果 | `pages/archive/correction/result/index` | 已新增第一版，承接已通过、未通过、需补充三种处理结果，保留原档案和进度页上下文 |
| 补充材料 | `pages/archive/correction/supplement/index` | 已新增第一版，承接需补充结果后的说明和材料占位，提交后回到更正进度的已补充状态 |

### 12.6 后续审计点

1. 档案 54 张效果图不是当前 13 个档案页面能覆盖的“一页多状态”；分类概览、基本信息详情、草稿编辑、记录列表、待确认列表、记录详情、更正申请、更正已提交、更正进度、更正结果和补充材料已有第一版模板，档案材料预览降级入口已补，后续重点转为真实附件服务、真实接口和剩余来源详情。
2. 当前档案首页的 8 个分类卡片已进入分类概览页，“待确认”进入待确认列表，“查看全部”进入记录列表，最近入档直达统一记录详情；首页、分类、列表、待确认和详情已读取 `teacher-mobile/src/domain/archive.ts` 同源记录，后续重点转为接管理端 `archiveStore` 或真实接口。
3. 当前档案查询页已读取 `domain/archive.ts`，支持本页筛选、清空关键词、无结果态和按 `recordId` 进入统一记录详情页第一版；搜索参数由 `searchArchiveRecords()` 承接。
4. 待办证书、培训、企业实践、虚拟教研和 AI 助手补充档案的结果页已按 `recordId` 接入统一记录详情页第一版；AI 助手补充档案会生成 / 定位本地 `pending-verify` 记录，并通过 `processingQueueTrace` 明确追溯到 `archiveStore.processingRecords` 档案处理队列，培训归档也会先生成 / 定位本地 `pending-verify` 记录；后续替换为真实管理端接口。
5. 入档口径继续收敛：培训、待办证书和企业实践已保持“归档确认中 / 待核验”，虚拟教研为“已归档”但不直接写正式档案事实；正式已入档仍只能来自管理端确认。
6. “个人发展”证书、“教研科研”“企业实践”等结果页已可查看统一详情，分类记录列表已有第一版；个人发展分类页已由统一分类页承接，并可进入发展计划草稿编辑；仍缺真实详情数据和跨来源状态同步。
7. 统一记录详情页已展示引用用途和来源追溯第一版，并可进入更正申请、待核验结果页、进度页、处理结果页和补充材料页；更正提交记录、状态回写和补充材料上传状态已接入本地 domain，后续需接真实附件服务、来源记录和管理端 `archiveStore.processingRecords` / `teacherArchiveFacts`。

## 13. 教师手机端：培训活动

### 13.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 培训首页 | 教师查看推荐培训、我的培训和提交培训需求的入口 | `teacher-mobile/src/pages/activity/training/index.vue` |
| 培训列表 | 推荐培训和我的培训的集中列表 | `teacher-mobile/src/pages/activity/training-list/index.vue` |
| 推荐培训 | 系统根据能力画像和发展要求推荐的培训资源 | `training/index.vue`、`training-list/index.vue` |
| 我的培训 | 教师已参加、学习中或已结束待总结的培训 | `training/index.vue`、`training-list/index.vue` |
| 培训申请 | 教师对需要申请的培训提交申请后形成的记录 | `teacher-mobile/src/pages/activity/training-application/index.vue` |
| 培训总结 | 培训结束后由学习记录、AI 草稿、证书和补充材料组成的归档材料 | `teacher-mobile/src/pages/activity/training-summary/index.vue` |
| 培训归档结果 | 总结和材料提交后的等待确认结果 | `teacher-mobile/src/pages/activity/training-archive-result/index.vue` |
| 培训需求 | 教师未找到合适培训时主动提交的需求 | `teacher-mobile/src/pages/activity/training-demand/index.vue`、`training-found/index.vue` |
| 培训需求结果 | 培训需求提交后等待业务部门确认的结果 | `training-demand-result/index.vue`、`training-need-result/index.vue` |

### 13.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 推荐培训 | 可直接学习、需申请、已申请、已加入我的培训 | `teacher-mobile/src/domain/training.ts` 统一提供推荐资源，首页和列表读取同源数据 | 手机端培训活动闭环已接入；当前为对齐管理端 store 口径的本地 domain/store |
| 我的培训 | 学习中、已结束、待总结、归档确认中、已入档 | `training.records` 驱动首页和列表；申请同意后可进入我的培训 | 已接入同一培训参与状态；“已入档”仍只允许档案确认后产生 |
| 培训申请 | 已提交、业务部门确认中、已通过、未通过、已取消 | `submitTrainingApplication()` 生成 `待处理` 申请，结果页按 `applicationId` 读取状态；`syncMobileTrainingApplicationResult()` 承接管理端同意 / 未同意回写 | 已对齐 `trainingStore.applications` 待处理、已同意、未同意口径 |
| 培训总结 | 草稿、材料待补、可提交归档、已提交归档 | 总结页读取 `training.records`，保存草稿、AI 优化、更换 / 上传材料均更新同一记录 | 已接入草稿和材料状态 |
| 培训归档 | 材料已提交、归档确认中、已入档、需补充、未通过 | `submitTrainingArchive()` 先更新培训记录材料状态，再生成 / 定位带 `processingQueueTrace` 的 `pending-verify` 档案记录 | 已保持“待确认 / 待核验”口径，对齐 `archiveStore.processingRecords`，不直接写成正式入档 |
| 培训需求 | 待匹配、已匹配、暂不处理、已转培训申请 | `submitTrainingDemand()` 生成 `待匹配` 需求，两个结果页按 `demandId` 读取状态；`syncMobileTrainingDemandResult()` 承接管理端匹配 / 暂不处理 / 转申请回写 | 已对齐 `trainingStore.demands` 待匹配、已匹配、暂不处理和已转培训申请口径 |

### 13.3 主流程

```txt
培训进修首页
→ 查看适合你的培训
→ 进入培训列表
→ 选择需申请培训
→ 提交培训申请
→ 等待业务部门确认
→ 通过后进入我的培训并记录学习过程
```

```txt
我的培训
→ 培训结束
→ 进入培训总结
→ AI 生成总结草稿
→ 确认证书 / 结业材料
→ 提交归档
→ 等待归档确认
→ 确认后沉淀到成长档案个人发展维度
```

```txt
没有合适培训
→ 提交培训需求
→ 选择“我已找到想参加的培训”或“我想提升某项能力”
→ AI 整理需求说明
→ 提交给业务部门确认
→ 后续匹配培训资源或转为培训申请
```

### 13.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 培训首页 | 查看全部推荐培训 | `uni.navigateTo('/pages/activity/training-list/index')` | 已闭环到列表页 |
| 培训首页 | 提交培训需求 | `uni.navigateTo('/pages/activity/training-demand/index')` | 已闭环到需求提交页 |
| 培训首页 | 当前任务“记录心得” | 进入 `/pages/activity/training-summary/index?recordId=...` | 已闭环到培训总结 / 学习记录承接页 |
| 培训首页 | 当前任务“打开资源” | 进入 `/pages/activity/training-summary/index?recordId=...` | 作为降级学习入口承接，不停留空操作 |
| 培训首页 | 推荐培训“打开资源 / 查看详情 / 记录心得” | 读取 `getMobileTrainingState()`，直接学习进总结页，需申请培训进入列表申请入口 | 已接入同源状态 |
| 培训首页 | 我的培训“记录心得 / 去总结” | 按 `recordId` 进入培训总结页 | 已闭环到总结页 |
| 培训列表 | 申请培训 | 调用 `submitTrainingApplication()` 后进入结果页并携带 `applicationId` | 已生成 `trainingStore.applications` 对齐的待处理申请 |
| 培训列表 | 整理总结 | `uni.navigateTo('/pages/activity/training-summary/index?recordId=...')` | 已闭环到同一培训记录 |
| 培训列表 | 直接学习 | 进入 `/pages/activity/training-summary/index?recordId=...` | 已补降级学习入口 |
| 培训列表 | 提交培训需求 | `uni.navigateTo('/pages/activity/training-demand/index')` | 已闭环到需求提交页 |
| 培训申请结果 | 查看申请详情 | 按 `applicationId` 进入同页详情态，读取 `findTrainingApplicationById()` | 已接入申请详情入口 |
| 培训申请结果 | 管理端同意 / 未同意回写 | 结果页读取 `result=approved|rejected` 并调用 `syncMobileTrainingApplicationResult()`；同意后生成我的培训记录，未同意后结果页显示未通过 | 已补本地跨端同步入口，后续替换为接口回写 |
| 培训申请结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training-list/index')` | 已闭环到培训列表 |
| 培训申请结果 | 返回活动首页 | `uni.redirectTo('/pages/activity/index')` | 已闭环到活动首页 |
| 培训总结 | 查看原学习记录 | 提示原学习记录已用于当前总结 | 明确降级入口，不再是空操作 |
| 培训总结 | 修改总结 / 让 AI 再优化 | 调用 `saveTrainingSummaryDraft()` / `optimizeTrainingSummary()` | 已接入草稿和 AI 优化状态 |
| 培训总结 | 更换材料 / 上传材料 | 调用 `uploadTrainingMaterial()` | 已接入材料上传状态 |
| 培训总结 | 保存草稿 | 调用 `saveTrainingSummaryDraft()` | 已接入草稿状态 |
| 培训总结 | 提交归档 | 调用 `submitTrainingArchive()`，携带档案 `recordId` 进入 `/pages/activity/training-archive-result/index` | 已先更新培训记录材料状态，再生成本地待核验档案记录 |
| 培训归档结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training/index')` | 已闭环到培训首页 |
| 培训归档结果 | 查看提交内容 | 按 `recordId` 进入 `/pages/archive/record-detail/index` | 已闭环到统一记录详情页第一版，保持待确认状态 |
| 培训归档结果 | 查看档案待确认 | `uni.navigateTo('/pages/archive/draft-list/index')` | 已闭环到待确认 / 待核验列表 |
| 培训归档结果 | 返回活动首页 | `uni.redirectTo('/pages/activity/index')` | 已闭环到活动首页 |
| 培训需求提交 | 提交需求 | 调用 `submitTrainingDemand('found-training')` 后进入结果页并携带 `demandId` | 已生成待匹配培训需求 |
| 培训需求生成 | 提交需求 | 调用 `submitTrainingDemand('ability-improvement')` 后进入结果页并携带 `demandId` | 已生成待匹配培训需求 |
| 培训需求结果 | 管理端匹配结果回写 | 结果页读取 `result=matched|deferred|application` 并调用 `syncMobileTrainingDemandResult()`，展示已匹配、暂不处理或已转培训申请状态 | 已补本地跨端同步入口，后续替换为接口回写 |
| 培训需求结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training/index')` | 已闭环到培训首页 |
| 培训需求结果 | 返回活动首页 | `uni.redirectTo('/pages/activity/index')` | 已闭环到活动首页 |

### 13.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 推荐培训 | `trainingStore.resources` / 培训资源 | 手机端 `training.resources[*].adminStoreRefs` 标记 `trainingStore.resources`，页面读取同一 domain 数据 |
| 培训申请 | `trainingStore.applications` / 培训申请 | 手机端提交生成 `待处理` 申请，`syncMobileTrainingApplicationResult()` 承接管理端同意 / 未同意状态回写 |
| 我的培训 | `trainingStore.plans` / 培训计划参与名单 | `approveMobileTrainingApplication()` 会生成我的培训记录，用于模拟管理端同意后的手机端状态 |
| 培训总结和证书材料 | `trainingStore.records` / 培训记录材料 | 总结草稿、AI 优化、材料上传和提交归档均更新同一培训记录 |
| 培训归档结果 | `archiveStore.processingRecords` / 成长档案待确认记录 | `submitTrainingArchive()` 生成 `archiveTraces`，状态为 `待确认`，不直接进入 `teacherArchiveFacts` |
| 培训需求 | `trainingStore.demands` / 培训需求 | 手机端需求提交生成 `待匹配` 需求，`syncMobileTrainingDemandResult()` 承接管理端匹配 / 暂不处理 / 转申请回写 |

### 13.6 后续审计点

1. 手机端培训活动闭环已接入 `teacher-mobile/src/domain/training.ts`，当前策略为先建手机端 domain/store，再用 `adminStoreRefs` 对齐管理端 `trainingStore` / `archiveStore` 对象；不直接 import 管理端 store。
2. 培训申请、培训需求和培训归档均能生成本地可追踪对象；后续真接口接入时，应把这些 actions 替换为 API 调用并保持状态枚举不变。
3. 培训归档仍保持“归档确认中 / 待确认 / 待核验”口径，不允许手机端提交成功直接显示“已入档”。
4. 培训申请和培训需求结果页已补本地跨端同步入口：管理端同意 / 未同意申请可通过 `syncMobileTrainingApplicationResult()` 回写手机端状态，培训需求匹配 / 暂不处理 / 转申请可通过 `syncMobileTrainingDemandResult()` 回写；后续真接口接入时替换 query 模拟结果。

## 14. 教师手机端：教学反思

### 14.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 反思入口 | 教师选择基于报告、录音、资料或直接 AI 对话开始反思的入口 | `teacher-mobile/src/pages/activity/reflection-start/index.vue` |
| 反思范围 | 单次课、课程阶段、学期课程、自定义主题、自主反思等范围 | `reflection-course`、`reflection-evidence`、`reflection-scope`、`reflection-self` |
| 反思依据 | 课堂分析报告、课堂录音、成绩分析、评价反馈、教案课件、学生练习记录等材料 | `reflection-course/index.vue`、`reflection-evidence/index.vue` |
| AI 引导会话 | 基于已选依据进行追问和要点整理的会话 | `teacher-mobile/src/pages/activity/reflection-guide-chat/index.vue` |
| 自主 AI 对话 | 不限定课次或材料时由教师直接和 AI 对话形成线索 | `teacher-mobile/src/pages/activity/reflection-ai-chat/index.vue` |
| 反思草稿 | AI 根据依据和对话生成的反思报告草稿 | `teacher-mobile/src/pages/activity/reflection-draft/index.vue` |
| 反思记录 | 教师确认后保存的教学反思活动记录 | `teacher-mobile/src/pages/activity/reflection-success/index.vue` |
| 档案沉淀 | 反思记录后续进入成长档案“教学工作”维度的关系 | 当前成功页只展示说明，未写入档案事实 |

### 14.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 反思记录 | 草稿、AI 整理中、待确认、已确认、可补充、待入档确认 | `teacher-mobile/src/domain/reflection.ts` 统一维护记录状态 | 手机端教学反思闭环已接入第一版：确认后写入 `reflectionStore.records` 对齐引用 |
| 反思依据 | 已发现、已选择、已补充、已解析、已移除 | 课程、课次、阶段和自主反思页调用 `selectReflectionEvidence()` / `addReflectionMaterial()` | 已形成共享依据集合，真实上传和解析状态后续接接口 |
| AI 会话 | 进行中、已整理线索、已生成草稿 | 引导页和自主对话页调用 `startReflectionAiSession()`，生成草稿前调用 `saveReflectionDraft()` | 已持久化到本地反思 domain |
| 反思草稿 | 已生成、已修改、已保存、已确认 | 草稿页修改、补充想法、AI 优化、保存和确认均写入 domain | 主草稿动作已闭环 |
| 档案沉淀 | 待沉淀、待确认、已入档 | `confirmReflection()` 调用 `createTeachingReflectionArchiveRecord()` 生成带 `processingQueueTrace` 的 `pending-verify` 档案记录 | 已生成 `archiveStore.processingRecords` 待确认记录，不直接入档 |

### 14.3 主流程

```txt
教学反思入口
→ 选择已有报告 / 上传资料 / 录音 / 直接对话
→ 选择课程、课次、阶段或自主反思范围
→ 选择反思依据
→ AI 引导追问并整理反思要点
→ 生成反思草稿
→ 教师确认反思
→ 保存为教学反思记录
→ 后续沉淀到成长档案教学工作维度
```

```txt
自主反思
→ 不限定具体课次或范围
→ 教师直接和 AI 对话
→ AI 整理反思线索
→ 生成草稿
→ 教师确认
```

```txt
最近草稿
→ 继续完善已有草稿
→ 修改草稿 / 补充想法 / 重新 AI 优化
→ 保存草稿或确认反思
```

### 14.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 反思开始 | 选择已有报告开始 | 调用 `startReflection('report')` 后进入课程范围选择页 | 已区分开始方式 |
| 反思开始 | 录制课堂音频 / 上传教学资料 / 直接与 AI 对话 | 分别调用 `startReflection('audio'|'material'|'chat')` | 已写入开始方式和材料状态 |
| 反思开始 | 最近草稿继续完善 | 进入 `reflection-draft` | 已闭环 |
| 学期课程范围 | 开始 AI 引导反思 | 调用 `selectReflectionCourse()` 后进入依据页 | 已写入课程状态 |
| 学期课程范围 | 切换课程 | 调用 `selectReflectionCourse()` 并提示当前课程 | 已接本地选择状态 |
| 学期课程范围 | 上传教学资料 / 录制课堂音频 / 直接与 AI 对话 | 调用 `addReflectionMaterial()` 或进入 AI 对话 | 已接材料 / 会话状态 |
| 单次课依据 | 开始 AI 引导反思 | 调用 `selectReflectionLesson()` 和 `selectReflectionEvidence()` 后进入阶段范围页 | 已写入课次和依据 |
| 单次课依据 | 切换课次 | 调用 `selectReflectionLesson()` | 已接本地选择状态 |
| 单次课依据 | 上传教学资料 / 录制课堂音频 / 直接与 AI 对话 | 调用 `addReflectionMaterial()` 或进入 AI 对话 | 已接材料 / 会话状态 |
| 阶段范围 | 开始 AI 引导反思 | 调用 `selectReflectionEvidence()` 后进入自主反思页 | 已写入阶段依据；页面承接关系后续仍需重整 |
| 自主反思 | 开始 AI 对话 | 调用 `startReflectionAiSession()` 后进入 AI 对话 | 已闭环到会话状态 |
| 自主反思 | 上传材料 / 关联课程 / 补充资料 | 补充材料调用 `addReflectionMaterial()` | 已接本地材料集合 |
| AI 引导会话 | 生成反思草稿 | 调用 `startReflectionAiSession()` 和 `saveReflectionDraft()` 后进入草稿页 | 已闭环到草稿页 |
| AI 引导会话 | 查看 / 添加依据 | 无 `@tap` 绑定 | 仅视觉态 |
| 自主 AI 对话 | 生成反思草稿 | 调用 `startReflectionAiSession()` 和 `saveReflectionDraft()` 后进入草稿页 | 已闭环到草稿页 |
| 自主 AI 对话 | 更换关联课程 / 继续输入 | 可补充材料，课程更换仍为后续项 | 部分闭环 |
| 草稿编辑 | 确认反思 | 调用 `confirmReflection()` 后进入成功页 | 已生成反思记录和档案待确认 |
| 草稿编辑 | 修改草稿 / 补充一句想法 / 重新让 AI 优化 | 调用 `saveReflectionDraft()` / `optimizeReflectionDraft()` | 已闭环 |
| 草稿编辑 | 保存草稿 | 调用 `saveReflectionDraft()` | 已闭环 |
| 成功页 | 返回活动首页 | `uni.reLaunch('/pages/activity/index')` | 已闭环到活动首页 |
| 成功页 | 查看反思详情 | 按 `recordId` 进入统一档案记录详情页 | 已闭环到待确认详情 |
| 成功页 | 再做一篇反思 | 进入反思开始页 | 已闭环 |

### 14.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 反思记录 | `reflectionStore.records` / 管理端教学反思记录 | 手机端确认后生成本地反思记录引用，后续接口应进入管理端反思总览 |
| 反思依据 | 管理端反思详情来源数据 | 手机端选择的报告、录音、成绩、评价应成为详情页来源数据 |
| AI 整理要点 | 管理端反思详情问题分析和改进建议 | 手机端 AI 线索应对应管理端详情里的问题定位、原因分析、改进建议 |
| 成长档案沉淀 | `archiveStore.processingRecords` / 档案教学工作维度待确认记录 | 手机端确认反思后生成本地 `pending-verify` 档案待确认记录，管理端确认后才入档 |
| 反思草稿 | 草稿或待确认反思记录 | 当前未见管理端草稿概念，需决定是否只在手机端保留 |

### 14.6 后续审计点

1. 手机端教学反思闭环已接入第一版；新增 `teacher-mobile/src/domain/reflection.ts`，先建手机端 domain/store，再通过 `reflectionStore.records` 和 `archiveStore.processingRecords` 对齐管理端对象，不直接 import 管理端 store。
2. 开始方式、课程/课次、依据集合、上传 / 录音材料、AI 会话、草稿、确认反思和成功页动作已接入本地状态。
3. 确认反思会先生成管理端反思记录引用，再生成成长档案待确认记录；管理端确认后才进入正式档案事实。
4. 学期课程、单次课、课程阶段、自主反思之间的页面跳转顺序仍需后续重整为更清晰状态机。
5. AI 引导会话的“查看 / 添加依据”、自主对话更换关联课程仍是后续增强项。

## 15. 教师手机端：企业实践

### 15.1 业务对象

| 对象 | 说明 | 当前页面 |
| --- | --- | --- |
| 年度企业实践要求 | 教师年度企业实践天数要求、已归档天数和差额 | `enterprise-overview/index.vue`、`enterprise-list/index.vue`、`enterprise-plan-submit/index.vue` |
| 企业实践记录 | 一次企业实践的主体记录，包含单位、岗位、时间、天数、当前状态和操作入口 | `enterprise-overview/index.vue`、`enterprise-list/index.vue`、`enterprise-progress-detail/index.vue` |
| 实践计划 | 教师发起企业实践前提交的计划材料 | `enterprise-plan-submit/index.vue`、`enterprise-plan-confirm/index.vue`、`enterprise-import-export/index.vue`；其中 `enterprise-import-export` 为兼容旧路由名，当前业务边界是计划提交后的等待确认页 |
| 计划确认结果 | 学院确认通过或退回修改的结果 | `enterprise-plan-approved/index.vue`、`enterprise-plan-rejected/index.vue`、`enterprise-plan-edit/index.vue` |
| 实践日志 | 实践过程中的日志记录和归档后的日志详情 | `enterprise-log-record/index.vue`、`enterprise-log-list/index.vue`、`enterprise-workflow-config/index.vue`；其中 `enterprise-workflow-config` 为兼容旧路由名，当前业务边界是已归档日志详情页 |
| 证明材料 | 企业实践证明、单位盖章材料、过程照片、成果材料等佐证 | `enterprise-proof-upload/index.vue`、`enterprise-proof-supplement/index.vue`、`enterprise-advanced-search/index.vue` |
| 总结与归档材料 | 实践总结、日志、附件确认后形成的归档提交材料 | `enterprise-login-history/index.vue`、`enterprise-archive-edit/index.vue` |
| 归档结果 | 提交归档后的等待确认结果 | `enterprise-archive-result/index.vue`、`enterprise-archive-success/index.vue` |
| 补充材料记录 | 归档或历史实践被退回后重新补充并提交核验的记录 | `enterprise-supplement-needed/index.vue`、`enterprise-resupplement/index.vue`、`enterprise-supplement-submitted/index.vue`、`enterprise-history-supplement-needed/index.vue` |
| 历史实践补录 | 已完成但平台暂未记录的企业实践补充确认流程 | `enterprise-history-supplement/index.vue`、`enterprise-history-confirmed/index.vue` |

### 15.2 状态口径

| 状态对象 | 建议状态 | 当前页面表现 | 当前判断 |
| --- | --- | --- | --- |
| 年度要求 | 未满足年度要求、进行中、已完成 | 展示“已归档 20 天，还差 10 天”和进行中提示 | 页面已覆盖，缺统一年度状态 |
| 实践计划 | 草稿、待审核、已同意、退回修改 | 计划提交、确认、编辑页调用 `teacher-mobile/src/domain/enterprise.ts` | 手机端企业实践闭环已接入第一版：提交生成 `practiceStore.applications` 待审核申请 |
| 企业实践记录 | 进行中、待归档、归档确认中、需补充、已归档 | 概览 / 列表筛选读取 `filteredEnterpriseRecords()`，操作入口按状态跳转 | 已接入同一记录状态，归档和补充会写入 `practiceStore.records` 追踪引用 |
| 实践日志 | 草稿、已保存、已归档 | 日志记录页保存草稿 / 保存日志调用 `saveEnterpriseLogDraft()`、`saveEnterpriseLog()` | 已写入同一实践记录，后续仍需补日志列表数据源 |
| 证明材料 | 待上传、已上传、待补充、已退回补充、已确认 | 补充材料重新提交调用 `submitEnterpriseSupplement()`，写入 `MobileEnterpriseMaterial.uploadStatus` 和 `verificationStatus` | 企业实践补充材料对象和核验历史已接入本地 domain；真实附件上传服务后续替换 |
| 归档提交 | 待确认、需补充、已入档、已归档 | 总结与材料确认、归档编辑调用 `submitEnterpriseArchive()` | 已生成 `archiveStore.processingRecords` 待确认记录，不直接变成正式入档事实 |
| 历史实践补录 | 草稿、待确认、需补充、已确认 | 历史补录保存草稿 / 提交确认调用 `submitEnterpriseHistory()`，结果页可回列表和档案详情 | 已接入实践记录和档案待确认记录，管理端确认后才计入正式档案事实 |

### 15.3 主流程

```txt
企业实践首页 / 列表
→ 查看年度要求和当前记录
→ 发起实践计划
→ 提交学院确认
→ 学院确认通过
→ 开始记录实践日志和上传证明材料
→ 实践总结与材料确认
→ 提交归档
→ 管理端成长档案待确认
→ 管理端确认后进入成长档案企业实践维度
```

```txt
企业实践归档或补录被退回
→ 查看需补充原因
→ 补充证明材料或说明
→ 重新提交部门核验
→ 等待确认或再次退回
→ 通过后进入归档确认或正式档案
```

```txt
历史实践补录
→ 填写历史实践信息
→ 保存草稿或提交确认
→ 学院确认通过
→ 计入年度企业实践记录
→ 后续与成长档案企业实践维度对齐
```

### 15.4 当前页面动作

| 页面 | 动作 | 当前实现 | 当前判断 |
| --- | --- | --- | --- |
| 企业实践概览 / 列表 | 筛选“全部 / 进行中 / 待归档 / 已归档 / 需补充” | `setEnterpriseFilter()` 更新筛选状态，列表读取 `filteredEnterpriseRecords()` | 已补本地筛选状态 |
| 企业实践概览 / 列表 | 继续记录、补充材料、查看详情、补充历史实践 | 分别进入日志记录、补充材料、统一档案详情和历史补录 | 主入口已闭环 |
| 实践计划提交 | 保存草稿、提交计划、修改草稿、重新整理、补充资料 | 保存草稿 / 提交计划调用 `saveEnterprisePlanDraft()`、`submitEnterprisePlan()` | 主提交动作已闭环，辅助 AI 操作仍为后续增强 |
| 实践计划等待确认 | 查看提交内容、返回实践列表 | `enterprise-import-export` 承接计划提交后的等待确认结果，查看提交内容进入确认页，返回进入企业实践列表 | 已补真实返回；企业实践兼容路由名边界已核对 |
| 实践计划通过 | 开始记录日志、返回实践列表 | 进入日志记录或企业实践列表，并调用 `approveEnterprisePlan()` | 已补结果入口 |
| 实践计划退回 / 编辑 | 修改计划并重新提交、保存草稿、重新提交、补充资料 | 退回页进入编辑页；编辑页保存草稿 / 重新提交调用统一计划动作 | 主状态流转已补 |
| 实践进行中详情 | 去记录、查看详情、查看全部、补充资料 | 页面展示入口，未见真实跳转；`enterprise-workflow-config` 承接已归档日志详情，不作为管理端工作流配置页 | 日志详情兼容路由名边界已核对；进行中详情入口后续继续补真实跳转 |
| 日志记录 | 保存草稿、保存日志 | 调用 `saveEnterpriseLogDraft()`、`saveEnterpriseLog()` | 已补日志状态写入 |
| 总结与材料确认 | 查看日志、修改草稿、重新整理、补充资料、保存草稿、提交归档 | 保存草稿 / 提交归档调用 `saveEnterpriseArchiveDraft()`、`submitEnterpriseArchive()` | 主归档动作已补 |
| 归档提交结果 | 返回实践列表、查看档案待确认、查看提交内容 | `enterprise-archive-result` 生成 / 定位 `pending-verify` 档案记录，可进入档案记录详情和档案待确认列表 | 已补本地档案待确认闭环，并由企业实践 domain 同步实践记录状态 |
| 等待入档确认结果 | 返回首页、查看档案待确认、查看提交内容 | 返回活动首页；查看档案待确认进入 `pages/archive/draft-list/index`；查看提交内容进入 `pages/archive/record-detail/index` | 已闭环到活动首页、档案待确认列表和统一记录详情页第一版，不直接写真实实践档案事实 |
| 需补充材料 | 去补充材料、重新提交 | 重新提交调用 `submitEnterpriseSupplement()`，结果页可进入档案记录详情和档案待确认列表 | 已补材料对象、待核验状态和处理历史写入 |
| 历史实践补录 | 保存草稿、提交确认 | 调用 `saveEnterpriseArchiveDraft()`、`submitEnterpriseHistory()` | 已补本地提交状态 |
| 历史实践已确认 | 返回实践列表、查看企业实践档案 | 分别进入企业实践列表和统一档案详情页 | 已补真实入口 |

### 15.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 年度企业实践要求 | `practiceStore.trackings` / 企业实践年度跟踪 | 手机端年度进度应读取同一年度跟踪口径 |
| 实践计划 | `practiceStore.applications` / 企业实践申请 | 手机端提交计划应生成管理端待审核申请 |
| 计划确认结果 | 管理端企业实践申请处理结果 | 管理端同意后手机端进入实践中，退回后进入计划修改 |
| 实践记录和日志 | `practiceStore.records` / 企业实践记录 | 手机端日志、材料和总结应更新同一实践记录 |
| 归档提交 | `archiveStore.processingRecords` / 成长档案待确认记录 | 手机端当前通过 `createEnterprisePracticeArchiveRecord()` 生成 / 定位带 `processingQueueTrace` 的本地 `pending-verify` 记录；正式接口应写入管理端成长档案待确认处理记录 |
| 已入档事实 | `archiveStore.teacherArchiveFacts` / 教师档案事实 | 只有管理端确认入档后才应成为正式档案事实 |
| 历史实践补录 | `practiceStore.records` 或 `archiveStore.processingRecords` | 需先经管理端确认，再计入年度天数和档案事实 |

### 15.6 后续审计点

1. 手机端企业实践闭环已接入第一版；新增 `teacher-mobile/src/domain/enterprise.ts`，用手机端 domain 对齐 `practiceStore.applications`、`practiceStore.records` 和 `archiveStore.processingRecords`，不直接复用管理端 Vue store。
2. 计划提交、计划通过/退回、日志保存、归档草稿、提交归档、补充材料和历史补录已形成本地状态流转；后续需要把本地 domain 替换为真实接口。
3. 归档等待确认和补充提交结果会生成 / 定位带 `processingQueueTrace` 的 `pending-verify` 档案记录；仍坚持管理端确认后才产生正式 `teacherArchiveFacts`。
4. 企业实践补充材料对象和核验历史已接入本地 domain；补充提交会建立 / 更新 `MobileEnterpriseMaterial`，写入待核验状态并追加处理历史，后续只需替换真实附件上传和管理端核验接口。
5. 企业实践兼容路由名边界已核对：`enterprise-import-export` 当前承接“实践计划已提交 / 学院确认中”结果态，`enterprise-workflow-config` 当前承接“日志详情 / 归档说明”详情态；本轮不重命名路由，避免破坏 `pages.json` 注册和既有入口，后续若做路由重命名需同步旧入口跳转、台账和验证脚本。

## 16. 教师手机端：虚拟教研

### 16.1 业务对象

| 对象 | 说明 | 当前页面 |
| --- | --- | --- |
| 我的教研室 | 教师已加入教研室、待处理邀请、待确认贡献的入口 | `virtual-research-room/index.vue`、`virtual-research-profile-complete/index.vue` |
| 教研室邀请 | 教师收到教研室邀请后的确认加入或暂不加入流程 | `virtual-research-invitation/index.vue`、`virtual-research-position-management/index.vue` |
| 教研活动 | 教研室内会议、资源共建、案例共创等活动主体 | `virtual-research-activity-list/index.vue`、`virtual-research-activity-detail-ongoing/index.vue` |
| 阶段材料 | 教师在活动进行中提交的案例、附件、说明等过程材料 | `virtual-research-award-management/index.vue`、`virtual-research-stage-submitted/index.vue` |
| 个人贡献 | 系统根据会议纪要、任务分工、阶段材料识别出的教师个人贡献 | `virtual-research-confirm-contribution/index.vue` 为待确认动作页，`virtual-research-contribution-confirm/index.vue` 为待确认详情页，`virtual-research-activity-detail-confirm/index.vue` 为完整贡献确认页；三者共享 `contributionPageStateMap` |
| 贡献确认结果 | 教师确认贡献后等待活动归档的结果态 | `virtual-research-contribution-submitted/index.vue`、`virtual-research-basic-info-edit/index.vue` |
| 补充材料 | 活动或贡献被退回后补充过程材料并重新提交 | `virtual-research-supplement-material/index.vue`、`virtual-research-activity-detail-supplement-submitted/index.vue`、`virtual-research-resubmitted/index.vue` |
| 归档结果 | 教研活动归档后形成教研记录和成长档案去向 | `virtual-research-archive-result/index.vue`、`virtual-research-archive-result-v1/index.vue`、`virtual-research-archived-confirmed/index.vue` |
| 教研记录 / 贡献详情 | 已归档教研活动和个人贡献的查看页 | `virtual-research-contribution-detail/index.vue`、`virtual-research-work-experience-management/index.vue` |
| 资料归属页 | 虚拟教研成员资料、个人贡献详情和个人发展报告的兼容旧路由页 | `virtual-research-profile-intro-edit/index.vue`、`virtual-research-position-management/index.vue`、`virtual-research-work-experience-management/index.vue`、`virtual-research-skill-management/index.vue`、`virtual-research-role-assignment/index.vue` 属于虚拟教研成员资料；`virtual-research-advanced-settings/index.vue` 属于我的资料 / 个人发展报告 |

### 16.2 状态口径

| 状态对象 | 建议状态 | 当前页面表现 | 当前判断 |
| --- | --- | --- | --- |
| 教研室邀请 | 待确认、已加入、暂不加入、已失效 | 邀请页调用 `confirmResearchInvitation()` / `declineResearchInvitation()` | 手机端虚拟教研闭环已接入第一版：邀请状态写入 `virtualLabStore.rooms` 对齐口径 |
| 教研室成员关系 | 已加入、待退出、已退出 | “我的教研室”读取 `getMobileVirtualResearchState()` | 已用本地成员状态承接，后续替换为真实成员接口 |
| 教研活动 | 进行中、待确认贡献、需补充、等待归档、已归档 | 活动列表读取 `filteredResearchActivities()`，筛选调用 `setVirtualResearchFilter()` | 已接入活动筛选和状态入口，对齐 `virtualLabStore.activities` |
| 阶段材料 | 草稿、待提交、已提交、需补充、已归档 | 阶段材料页调用 `saveStageMaterialDraft()` / `submitStageMaterial()` | 已写入活动材料状态，材料集合和上传进度仍为后续接口项 |
| 个人贡献 | 待识别、待确认、已确认、已提交、被退回、已归档 | 贡献确认页调用 `confirmContribution()` / `rejectContribution()`，多个效果图页通过 `contributionPageStateMap` 映射到同一贡献确认状态机 | 虚拟教研贡献确认页状态机已明确，对齐 `virtualLabStore.records` |
| 活动 / 贡献材料预览 | 可预览、附件服务待接入 | `previewVirtualResearchMaterial()` | 虚拟教研材料预览降级入口已接入活动详情和贡献详情；真实附件服务后续替换 |
| 归档 | 等待归档、需补充、已归档、已生成档案待确认 | 归档结果页调用 `submitVirtualResearchArchive()` | 先形成 `virtualLabStore.records` 教研记录，再生成带 `processingQueueTrace` 的 `archiveStore.processingRecords` 待确认记录 |
| 教研记录 | 已形成记录、未形成记录、记录异常 | 结果页可进入统一档案记录详情页 | 已补查看入口，正式档案事实仍需管理端确认后产生 |
| 虚拟教研成员资料 | 虚拟教研成员资料、我的资料 | `domain/virtualResearch.ts` 通过 `memberProfileScope` 标记虚拟教研成员资料归属 | 虚拟教研成员资料归属已判定：成员资料只服务教研室成员展示、邀请和贡献确认，不直接写入成长档案正式事实；年度发展报告归属我的资料 |

### 16.3 主流程

```txt
我的教研室
→ 查看待处理邀请
→ 确认加入教研室
→ 进入教研室详情
→ 查看近期教研活动和待确认贡献
```

```txt
教研活动进行中
→ 查看活动详情
→ 提交阶段材料
→ 等待会议结束和系统识别贡献
→ 教师确认个人贡献
→ 贡献确认已提交
→ 等待教研活动归档
→ 归档后形成教研活动记录
→ 管理端生成成长档案教研科研待确认记录
```

```txt
归档或贡献确认被退回
→ 查看需补充材料和退回说明
→ 补充材料、说明或依据
→ 重新提交
→ 再次等待归档或确认
```

### 16.4 当前页面动作

| 页面 | 动作 | 当前实现 | 当前判断 |
| --- | --- | --- | --- |
| 我的教研室 | 查看邀请、确认贡献、进入教研室、全部教研活动 | 分别进入邀请、贡献确认、教研室状态和活动列表页 | 主入口已闭环 |
| 教研室邀请 | 确认加入、暂不加入、查看近期活动 | 确认 / 暂不加入写入邀请状态并跳转 | 已形成成员关系状态 |
| 已加入教研室 | 返回我的教研室、去确认贡献、待确认贡献卡片 | 均为 `uni.showToast` | 未闭环 |
| 教研活动列表 | 筛选、去确认、确认贡献、查看详情、补充材料、查看记录 | 筛选写入状态，动作进入贡献确认、进行中详情、补充材料或档案详情 | 主列表动作已闭环 |
| 活动进行中详情 | 进入会议、返回教研室、提交阶段材料 | 会议入口明确降级提示；返回教研室和提交材料为真实路由 | 主操作已闭环 |
| 阶段材料提交 | 上传、拍照、保存草稿、提交材料 | 保存草稿 / 提交材料写入阶段材料状态 | 已生成阶段材料状态 |
| 阶段材料已提交 | 返回教研室、查看活动详情 | 进入我的教研室和活动详情 | 已闭环 |
| 贡献确认页 | 补充遗漏、不是我的、确认贡献 | `virtual-research-confirm-contribution` 承接待确认动作页，`virtual-research-contribution-confirm` 承接待确认详情页，`virtual-research-activity-detail-confirm` 承接完整贡献确认页；动作写入同一贡献对象 | 虚拟教研贡献确认页状态机已明确，暂保留多页承接不同效果图 |
| 贡献确认已提交 | 返回教研室、查看提交内容 | 进入我的教研室和贡献详情 | 已闭环 |
| 补充材料页 | 上传资料、保存草稿、重新提交 | 保存草稿 / 重新提交写入补充材料状态 | 已生成补充提交状态 |
| 归档结果页 | 返回教研室、查看教研记录、查看成长档案去向 | 调用 `submitVirtualResearchArchive()`，并进入教研室或统一档案详情页 | 已按“先教研记录、后档案待确认”闭环 |
| 已归档确认页 | 返回教研室、查看教研记录 | 进入我的教研室和统一档案详情页 | 已闭环 |
| 贡献详情 / 记录详情 | 查看材料、返回教研记录 | `uni.showToast` | 详情为静态展示，来源材料未真实预览 |
| 资料归属页 | 成员资料展示、贡献详情、补充遗漏、我的教研室、年度发展报告 | 页面显示“虚拟教研成员资料”或“我的资料 / 个人发展报告”归属标签 | 已判定归属；不把个人发展报告并入虚拟教研主流程，也不把虚拟教研成员资料直接写成档案事实 |

### 16.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 教研室 | `virtualLabStore.rooms` / 虚拟教研室 | 手机端“我的教研室”应读取教师已加入的 room 和邀请状态 |
| 教研室成员 | `virtualLabStore.rooms.members` / 成员列表 | 邀请确认后应写入成员关系，管理端教研室详情同步可见 |
| 教研活动 | `virtualLabStore.activities` / 教研活动 | 手机端活动列表、活动详情和阶段状态应与管理端活动一致 |
| 阶段材料 | `virtualLabStore.activities` 或后续活动材料集合 | 手机端提交材料应成为活动记录和贡献识别依据 |
| 个人贡献 | `virtualLabStore.records.participants` / 参与记录 | 手机端确认贡献应同步到管理端教研记录的参与记录 |
| 教研记录 | `virtualLabStore.records` / 教研记录 | 活动归档后应形成管理端教研记录，手机端查看同一记录 |
| 档案沉淀 | `archiveStore.processingRecords` / 成长档案待确认记录 | 应沿用管理端口径：虚拟教研记录先生成带 `processingQueueTrace` 的档案待确认，不直接写正式档案事实 |
| 成长档案事实 | `archiveStore.teacherArchiveFacts` / 教研科研维度事实 | 只有管理端确认入档后，手机端档案才能展示正式事实 |

### 16.6 后续审计点

1. 手机端虚拟教研闭环已接入第一版；新增 `teacher-mobile/src/domain/virtualResearch.ts`，对齐 `virtualLabStore.rooms`、`virtualLabStore.activities`、`virtualLabStore.records` 和 `archiveStore.processingRecords`，不直接复用管理端 Vue store。
2. “我的教研室”、邀请确认、活动列表筛选、阶段材料、贡献确认、补充材料、归档结果和已归档确认页已补主操作状态和真实跳转。
3. 归档结果已统一为先形成教研记录，再生成带 `processingQueueTrace` 的成长档案待确认记录，管理端确认后才成为正式档案事实。
4. 虚拟教研贡献确认页状态机已明确：`virtual-research-confirm-contribution` 为待确认动作页，`virtual-research-contribution-confirm` 为待确认详情页，`virtual-research-activity-detail-confirm` 为完整贡献确认页；三者暂不合并路由，均映射到同一贡献确认状态机和 `virtualLabStore.records`。
5. 虚拟教研材料预览降级入口已接入活动进行中详情和贡献详情；阶段材料、会议纪要、任务分工、发言摘录和个人贡献之间尚未形成统一来源模型，真实附件服务后续替换。
6. 虚拟教研成员资料归属已判定：`virtual-research-profile-intro-edit`、`virtual-research-position-management`、`virtual-research-work-experience-management`、`virtual-research-skill-management`、`virtual-research-role-assignment` 归属虚拟教研成员资料；`virtual-research-advanced-settings` 归属我的资料 / 个人发展报告。后续重命名路由时需同步 `pages.json`、入口、台账和守卫。

## 17. 手机端与管理端数据关系统一口径

### 17.1 对象映射总表

| 手机端模块 | 手机端业务对象 | 管理端对应对象 | 统一判断 |
| --- | --- | --- | --- |
| 待办 | 待确认档案记录、证书材料、修改提交记录、移出结果 | `archiveStore.processingRecords`、`archiveStore.teacherArchiveFacts` | 待办是档案处理记录的教师确认入口，不应单独生成另一套档案事实 |
| 档案 | 档案分类、档案记录、档案详情、档案更正 | `archiveStore.teacherArchiveFacts`、`archiveStore.processingRecords` | 手机端档案只展示已确认事实和待处理记录，不直接绕过管理端写正式事实 |
| 培训活动 | 推荐培训、培训申请、我的培训、培训总结、培训需求、培训归档 | `trainingStore.resources`、`trainingStore.applications`、`trainingStore.plans`、`trainingStore.records`、`trainingStore.demands`、`archiveStore.processingRecords` | 手机端培训提交先进入培训业务对象，归档材料完整后生成成长档案待确认记录 |
| 教学反思 | 反思依据、AI 会话、反思草稿、反思记录、档案沉淀 | 管理端教学反思记录、反思详情来源、档案教学工作维度 | 手机端确认后应进入管理端反思记录；是否入档需先生成待确认记录，不直接成为档案事实 |
| 企业实践 | 实践计划、实践记录、日志、证明材料、补充材料、归档结果 | `practiceStore.applications`、`practiceStore.trackings`、`practiceStore.records`、`archiveStore.processingRecords` | 手机端计划和日志对齐企业实践业务，归档提交后进入成长档案待确认 |
| 虚拟教研 | 教研室邀请、教研活动、阶段材料、个人贡献、教研记录、归档结果 | `virtualLabStore.rooms`、`virtualLabStore.activities`、`virtualLabStore.records`、`archiveStore.processingRecords` | 手机端确认贡献和材料应同步教研记录，归档后生成成长档案待确认 |

### 17.2 统一材料提交口径

| 提交类型 | 手机端提交后状态 | 管理端承接对象 | 说明 |
| --- | --- | --- | --- |
| 待办证书修改 | 待核验 | `archiveStore.processingRecords` | 教师修改字段或材料后，应回到档案处理流程等待部门核验 |
| 待办证书确认本人 | 待核验 | `archiveStore.processingRecords` | 教师确认本人记录后只生成 / 更新档案处理记录，管理端确认后才写入 `teacherArchiveFacts` |
| AI 助手补充档案 | 待核验 | `archiveStore.processingRecords` | 手机端当前用 `createArchiveSupplementRecord()` 生成本地 `pending-verify` 记录，并挂载 `processingQueueTrace` 对齐管理端档案处理队列；正式接口替换该 trace 写入 |
| 培训申请 | 待处理 | `trainingStore.applications` | 管理端同意后进入培训计划参与名单，未同意形成明确结果 |
| 培训总结和证书材料 | 归档确认中 | `trainingStore.records`、`archiveStore.processingRecords` | 手机端当前用 `createTrainingArchiveRecord()` 生成 / 定位本地 `pending-verify`；正式接口应先更新培训记录材料状态，记录完整后生成成长档案待确认 |
| 培训需求 | 待匹配 | `trainingStore.demands` | 管理端匹配资源、暂不处理或转培训计划 |
| 教学反思确认 | 已确认反思，待沉淀 | 管理端教学反思记录 | 先形成反思记录；是否进入档案应走档案待确认口径 |
| 企业实践计划 | 待审核 | `practiceStore.applications` | 管理端同意后进入实践中，退回后进入修改计划 |
| 企业实践日志和证明材料 | 进行中或待归档 | `practiceStore.records` | 材料是实践记录的一部分，不直接成为档案事实 |
| 企业实践归档 | 待确认 | `archiveStore.processingRecords` | 管理端确认后才进入成长档案企业实践维度 |
| 虚拟教研阶段材料 | 已提交，待贡献识别 | `virtualLabStore.activities` | 材料成为会议纪要、任务分工和贡献识别依据 |
| 虚拟教研贡献确认 | 等待归档 | `virtualLabStore.records` | 活动归档后形成教研记录，再进入档案待确认 |
| 虚拟教研归档 | 待确认 | `archiveStore.processingRecords` | 管理端确认后才进入成长档案教研科研维度 |

### 17.3 统一审批结果口径

| 结果 | 统一含义 | 手机端展示 | 管理端状态 |
| --- | --- | --- | --- |
| 待处理 | 已提交，业务部门尚未处理 | “等待确认 / 业务部门确认中” | 申请、需求或处理记录保持待处理类状态 |
| 待核验 | 教师已补充或修改，需部门核验真实性 | “待核验 / 已提交核验” | 档案处理记录或材料记录待检验 |
| 待确认 | 业务对象已形成，进入档案确认队列 | “归档确认中 / 等待归档确认” | `archiveStore.processingRecords` 待确认 |
| 已通过 | 业务申请或核验通过，但不等同于已入档 | “已通过 / 可继续下一步” | 培训申请同意、实践申请同意、成员邀请确认等 |
| 未通过 | 业务申请被拒绝或不纳入当前流程 | “未通过 / 未同意” | 对应申请或需求形成终态 |
| 需补充 | 材料不足，需要教师补充后重新提交 | “需补充 / 待补充材料” | 处理记录、活动记录或实践记录进入待补充 |
| 已移出 | 教师确认记录不属于本人或不进入个人档案 | “已移出待确认” | 档案处理记录不写入教师事实，保留处理历史 |
| 已归档 | 业务记录已经形成模块内记录 | “活动已归档 / 记录已归档” | 培训记录、实践记录或教研记录完成模块内归档 |
| 已入档 | 管理端已确认并写入正式档案事实 | “已入档 / 可查看档案详情” | `archiveStore.teacherArchiveFacts` 生成正式事实 |

### 17.4 入档结果统一口径

```txt
业务提交
→ 模块业务对象更新
→ 材料完整性检查
→ 生成成长档案待确认处理记录
→ 管理端确认入档
→ 写入教师档案事实
→ 手机端档案首页、分类列表、详情页可查看
```

| 当前页面文案 | 统一解释 | 后续实现要求 |
| --- | --- | --- |
| 归档确认中 | 已生成或即将生成成长档案待确认记录 | 必须能在管理端档案处理队列看到对应记录 |
| 等待归档 | 模块记录已确认，等待活动或材料归档 | 先更新模块 store，不直接写档案事实 |
| 已归档 | 模块内记录归档完成 | 只有生成档案待确认或管理端确认后，才能影响档案数量 |
| 已入档 | 管理端已确认正式档案事实 | 必须能在 `archiveStore.teacherArchiveFacts` 和手机端档案详情中追溯来源 |
| 可查看成长档案 | 有对应档案分类和详情入口 | 若缺分类列表或详情页，只能标记为待业务闭环 |

统一原则：

1. 手机端不得把“提交成功”“归档成功”直接等同于“正式入档”。
2. 任何进入成长档案的事实，都必须能追溯来源模块、来源记录、材料、确认时间和处理历史。
3. 管理端已有 `archiveStore.processingRecords` 时，手机端提交结果优先对齐“待确认处理记录”，不是新建独立档案状态。
4. “已入档”只用于管理端确认后生成 `teacherArchiveFacts` 的结果态。
5. 待办、培训、企业实践、虚拟教研等结果页如果没有真实档案详情入口，应标记为“结果展示完成，档案查看未闭环”。

### 17.5 下一步实现落点

| 优先级 | 落点 | 目标 |
| --- | --- | --- |
| P0 | 手机端档案统一详情页 | 承接所有“查看档案详情 / 查看个人发展 / 查看教研科研维度”入口 |
| P0 | 手机端提交结果统一状态模型 | 统一待处理、待核验、待确认、需补充、已入档文案和跳转 |
| P0 | 手机端到管理端对象映射 | 待办、培训、实践、教研提交后都有明确管理端 store 承接 |
| P1 | 手机端材料对象模型 | 统一证书、实践证明、阶段材料、会议纪要、反思依据等材料字段 |
| P1 | 手机端动态生成规则 | 确认、修改、补充、移出、归档、入档等动作生成动态 |
| P1 | 管理端确认后手机端回显 | 管理端处理结果能回到手机端待办、档案和活动结果页 |

## 18. 重构前置结论

在开始“百万级项目”重构前，先不要按页面外观抽组件。优先按业务对象抽边界：

| 层级 | 建议方向 | 理由 |
| --- | --- | --- |
| domain types | 先抽管理端模块级业务类型和状态枚举 | 统一页面之间的状态语言 |
| mock service | 把页面内数组迁移到模块 mock service | 让跨页面状态可以共享 |
| store | 对有跨页面影响的模块建立 Pinia store | 发布、入档、申请、材料上传都需要跨页面同步 |
| components | 在业务状态稳定后再抽表格、抽屉、详情栏、状态徽章 | 避免把错误流程固化成组件 |
| design guide | 只记录稳定 token、组件模式和页面密度 | 避免设计规则变成页面说明书 |

### 18.1 当前落点

| 项目 | 当前状态 | 后续动作 |
| --- | --- | --- |
| store 目标结构 | 能力清单、成长档案、培训管理、企业实践、虚拟教研、分析报告已拆为 `domain/admin/*`、`stores/admin/<module>/initialData.ts`、`stores/admin/<module>/actions.ts`、薄 store | 后续新增业务 store 按同一结构落地 |
| domain types | 已建立 `ability-list.ts`、`archive.ts`、`training.ts`、`practice.ts`、`virtual-lab.ts`、`report.ts`、`ability-profile.ts`、`reflection.ts`；对应 store 或 mock service 已从 domain 导入业务类型；D-05 复扫管理端页面内业务 `interface/type`，仅 `SimpleRadarChart.vue` 保留 2 个组件 props 类型，不属于业务模型 | 后续新增业务类型必须进入 `frontend/src/domain/admin/*`，组件私有 props 类型可保留在组件内 |
| 测试入口 | `frontend/package.json` 已增加 `npm run test` 和 `npm run test:stores`，AGENTS 已把管理端验证命令更新为 test/typecheck/build；E17 已建立模块级测试约定：domain 测状态枚举/文案/helper，store 测跨页面业务行为，structure 测 initialData/actions 注入 state，mock service 测稳定数据源，component 测 props/事件，page raw guardrail 测路由、空状态和视觉态按钮；六个已拆分管理端 store 均已覆盖 structure 测试，并由 `adminStoreStructure.test.ts` 防止漏补 | 后续新增 store 行为必须先补 `*Store.test.ts`；拆分为 `initialData.ts` + `actions.ts` 的 store 必须同步补 `*Store.structure.test.ts`；store 层可先跑 `npm run test:stores`，最终管理端代码修改仍跑完整 test/typecheck/build；新增公共组件至少补最小组件测试；页面源码 guardrail 不替代业务行为测试 |
| mock service | 已建立 `frontend/src/services/mock/ability-list.ts`、`frontend/src/services/mock/ability-profile.ts`、`frontend/src/services/mock/reflection.ts`、`frontend/src/services/mock/archive.ts`、`frontend/src/services/mock/training.ts`、`frontend/src/services/mock/virtual-lab.ts`；D-06 复扫管理端页面内数组，仅保留 4 个 1 行 UI 选项数组，无超过 5 行的大段业务 mock 数组 | 后续稳定展示数据进入 `frontend/src/services/mock/*`；页面内只保留 tabs、steps、tone class 等局部 UI 选项 |
| 路由与废弃页 | D-03 复扫管理端页面文件 30 个、路由动态导入 30 个，无未挂路由页面、无路由缺失文件；D-04 复扫未发现 `/admin/system`、`AdminPlaceholderPage`、`ResourceLibraryPage.vue` 等占位/废弃路由或页面残留 | 后续新增页面必须同步路由和台账；组件目录不计入页面覆盖 |
| operationMessage | 已建立 `frontend/src/lib/operationMessage.ts`，并在能力清单优化建议页、要求映射页、档案详情页、能力画像群体页、虚拟教研室列表页、教研室详情页、活动详情页、记录详情页、培训计划页、培训计划详情页、培训记录详情页、分析报告中心统一页面局部消息的 `set` / `clear` / `fromStore` 模式；D-01 复扫管理端页面 `console.log` 命中 0；D-02 复扫 `operationMessage.set/fromStore` 共 46 处，已分类为真实状态动作、页面选择筛选、真实跳转或降级提示 | 后续新增页面按该模式接入；降级提示不能标记为业务完成，真实导出、成员全量列表或复制能力后续按模块补齐 |
| 视觉态按钮 | E16 已处理管理端已知无动作按钮：只读值改为 `span`，档案查阅搜索接入真实过滤，能力画像“查看更多对象”改为明确降级提示；新增 `frontend/src/pages/admin/adminVisualActions.test.ts` 防止空按钮回归 | 后续新增按钮必须满足三选一：真实状态动作、真实跳转 / 过滤、明确降级提示；纯展示内容不得使用 `button` |
| 状态枚举和文案映射 | 分析报告状态已从页面本地 `statusMap` 迁入 `domain/admin/report.ts`，由 `getReportStatusClass` 统一返回状态样式类；能力清单执行版状态已在 `domain/admin/ability-list.ts` 统一 `published`、`pending`、`historical` 的显示文案和主徽章样式类；能力清单优化建议状态已统一 `pending`、`adopted`、`deferred`、`rejected`、`applied` 的显示文案和样式类入口；能力指标状态已统一 `enabled`、`disabled`、`draft` 的显示文案和样式类入口；能力清单要求映射状态已统一 `confirmed`、`pending`、`unconfigured` 的显示文案和徽章样式类；成长档案处理状态已在 `domain/admin/archive.ts` 统一 `待确认`、`待检验`、`待补充`、`异常待处理`、`拟退中`、`已入档` 的徽章样式类；成长档案批次整体状态已统一 `recognizing`、`recognized`、`confirmed`、`cancelled` 的显示文案和页面状态类；成长档案批次文件状态已统一 `已接收`、`解析中`、`已解析`、`等待处理`、`已取消` 的文本样式类；培训计划状态已在 `domain/admin/training.ts` 统一 `草稿`、`报名中`、`进行中`、`已完成`、`材料待完善` 的样式类入口；培训申请状态已统一 `待处理`、`已同意`、`未同意`、`已取消` 的样式类入口；培训资源状态已统一 `可用`、`信息待完善`、`已停用` 的样式类入口；培训需求状态已统一 `待匹配`、`已匹配`、`暂不处理` 的样式类入口；培训记录材料总状态已统一 `学习中`、`待总结`、`证书待补`、`记录完整` 的样式类入口；培训材料上传状态已统一 `待补充`、`已上传` 的样式类入口；企业实践申请状态已统一 `待审核`、`已同意`、`退回修改`、`已撤回` 的样式类入口；企业实践年度进展状态已统一 `未启动申请`、`待审核申请`、`实践中`、`已完成` 的样式类入口；企业实践记录状态已统一 `实践中`、`待提交总结`、`待企业评价`、`待归档确认`、`已归档` 的样式类入口；虚拟教研活动记录状态已统一 `已形成记录`、`未形成记录`、`记录异常` 的样式类入口；虚拟教研记录入档状态已统一 `待沉淀`、`已生成待确认档案` 的样式类入口；D-07 复扫管理端页面状态相关命中 20 个文件、46 处，稳定业务状态由 domain helper 或 `<StatusBadge />` 承接，页面剩余局部 `classMap` 等仅用于等级、步骤、分布条等展示型样式 | 后续新增业务状态必须先进入 `domain/admin/*` 或 `StatusBadge`，展示型 UI tone 可留在页面或组件局部 |
| 状态徽章组件 | `frontend/src/components/common/StatusBadge.vue` 已开始承接管理端业务状态展示；能力清单优化建议、基准模板启用态、执行版主状态、版本记录、发布确认、要求映射、成长档案档案处理记录状态、导入批次状态、批次文件状态、培训管理资源/需求/计划/申请/记录/材料状态、企业实践申请/年度跟踪/实践记录状态、虚拟教研活动记录/参与同步状态、报告中心报告/AI 会话状态已移除页面局部 `badge-status` / `state-pill` / `inline-status` / `file-status` / `status-text` / `status-badge` / `card-status` / `panel-status` 状态样式，改为 `<StatusBadge />`；组件已拆出 `frontend/src/components/common/status-badge.ts` 共享 registry，公共导出 `adminStatusRegistry`、`teacherStatusRegistry`、`adminStatusKeys`、`teacherStatusKeys`、`AdminStatus`、`TeacherStatus` 和 `getStatusBadgeMeta`，并补入 `导出中`、`处理中`、`失败`、`同步失败`、`重新同步中`、`归档`、`停用`、`待沉淀`、`已生成待确认档案` 等新增管理端流程状态 | 后续新增业务状态必须先进入 `domain/admin/*` 或 `StatusBadge` 共享 registry；稳定调用侧优先使用 `AdminStatus` / `TeacherStatus` union，未知后端字符串由 `getStatusBadgeMeta(status: string)` 兜底 |

## 19. 下一步执行顺序

1. 继续推广 `useOperationMessage`，统一页面局部消息和 store 消息回填方式。
2. 统一状态枚举和状态文案映射。
3. 抽取状态徽章、详情抽屉、右侧摘要面板、筛选栏和表格空状态。
4. 工程重构完成后再进入管理端设计系统重构。
