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
| 优化建议 | 待确认、已采纳、暂缓、已弃用、已应用 | `pending`、`adopted`、`deferred`、`rejected`、`applied` | 已完成“采纳 -> 待应用 -> 应用到基准模板”本地闭环 |
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
| 优化建议 | 上传制度文件、重新分析、版本记录 | 只写提示 | 未闭环 |
| 执行版 | 编辑指标抽屉保存 | 更新 `abilityListStore.executionIndicators`，指标状态变为 `draft` | 已完成本地闭环 |
| 发布确认 | 确认发布 | 更新 `abilityListStore.executionVersion.status` 为 `published` | 已完成跨页面本地闭环 |
| 要求映射 | 新增、编辑、删除、确认配置 | 修改 `abilityListStore.requirementMappings` | 已完成本地闭环 |

### 3.5 第一批修复顺序

能力清单主链本地闭环已完成。后续进入工程重构阶段时再处理：

1. 将当前模块级本地 store 拆为正式 domain types / initialData / actions。
2. 评估是否迁移到 Pinia store。
3. 将版本记录抽屉、编辑抽屉、状态徽章抽成稳定组件。

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
| 档案详情 | 来源详情抽屉 | 页面内打开抽屉，并按当前栏目合并 `archiveStore.teacherArchiveFacts` 来源记录 | 已完成本地事实来源过滤 |

### 4.5 第一批修复顺序

成长档案主链本地闭环已完成。后续工程重构阶段再处理：

1. 教师档案事实的更正、退回、草稿状态留到后续业务审计细化。

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
| 计划管理 | 查看详情 | `router.push('/admin/training/plans/:planId')` | 已闭环到页面 |
| 申请处理 | 同意/退回申请 | 调用 `approveTrainingApplication()` / `rejectTrainingApplication()` | 已同步计划详情参与名单 |
| 记录总览 | 查看材料待完善记录 | 设置筛选状态 | 页面内闭环 |
| 记录详情 | 上传证书材料 | 调用 `uploadTrainingCertificate()`，记录变为完整，并生成成长档案待确认处理记录 | 已完成跨模块本地闭环 |
| 计划详情 | 查看教师档案 | `router.push('/admin/archive/teacher/:teacherId')` | 已闭环到成长档案页面 |

### 5.5 第一批修复顺序

培训管理主链本地闭环已完成。当前入档口径为：培训记录材料完整后生成成长档案“待确认”处理记录，不直接入档。后续进入工程重构阶段时再处理：

1. 将 `trainingStore` 拆为正式 domain types / initialData / actions。
2. 将资源、需求、计划、申请、记录的状态文案映射统一抽出。
3. 评估培训记录完整后是否需要自动提醒档案处理工作台。

## 6. 管理端：能力画像

### 6.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 群体画像 | 全校或组织范围内的能力结构、维度分布和发展支持方向 | `frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue` |
| 重点关注对象 | 群体画像下钻出的院系、专业、教师关注项 | `AbilityProfileGroupPage.vue` |
| 教师画像列表 | 教师画像入口，支持列表/卡片视图和筛选 | `frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue` |
| 教师画像详情 | 单个教师的发展指数、能力结构和支持方向 | `frontend/src/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue` |

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
| 群体画像 | 查看院系/专业画像 | 当前无独立院系/专业画像页，页面内提示降级 | 已明确降级，不保留空点击 |
| 教师画像列表 | 搜索、学院、职称、类型、关注筛选 | 本页计算 `filteredTeachers` | 页面内闭环 |
| 教师画像列表 | 进入画像 | `router.push('/admin/ability-profile/teacher/:teacherId')` | 已闭环到详情 |
| 教师画像详情 | 返回/切换教师 | 返回教师画像列表 | 已闭环到列表 |

### 6.4 后续审计点

1. 能力画像仍是页面本地静态数据，后续工程重构阶段应和成长档案事实、能力清单执行版建立 domain 口径。
2. 群体画像的院系/专业独立画像页当前不存在，后续需决定是补页面还是保留为群体画像内筛选态。

## 7. 管理端：教学反思

### 7.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 反思记录 | 教师围绕课程、班级、触发来源提交的教学反思 | `frontend/src/pages/admin/reflection/ReflectionOverviewPage.vue` |
| 反思详情 | 单条反思的教学背景、数据观察、问题分析、改进建议 | `frontend/src/pages/admin/reflection/ReflectionDetailPage.vue` |
| 来源数据 | 触发反思的评教反馈、课堂过程记录、教师补充说明等 | `ReflectionDetailPage.vue` |
| 共性问题 | 多条反思聚合出的高频问题定位 | `ReflectionOverviewPage.vue` |
| 相关反思 | 与当前问题、课程、班级相近的反思记录 | `ReflectionDetailPage.vue` |

### 7.2 主流程

```txt
教师端提交教学反思
→ 管理端汇总反思列表
→ 按组织、学期、触发来源、关键词筛选
→ 查看单条反思详情
→ 查看来源数据、问题分析、改进建议
→ 查看相关反思或回到列表按共性问题筛选
→ 后续沉淀到成长档案教学工作维度
```

### 7.3 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 反思总览 | 查看记录 | `router.push('/admin/reflection/:reflectionId')` | 已闭环到详情 |
| 反思总览 | 查看相关记录 | 设置共性问题关键词，过滤当前列表 | 已完成问题定位本地闭环 |
| 反思总览 | 接收详情页 keyword query | 初始化 `searchQuery` 和 `activeIssueKeyword` | 已完成详情返回列表筛选闭环 |
| 反思详情 | 查看来源数据 | 展示关联来源数据提示 | 页面内闭环 |
| 反思详情 | 查看相关反思 | `router.push('/admin/reflection/:id')` | 已闭环到详情 |
| 反思详情 | 查看更多相关记录 | `router.push('/admin/reflection?keyword=课堂互动反馈不足')` | 已闭环到列表问题定位 |

### 7.4 后续审计点

1. 教学反思仍是页面本地静态数据，后续工程重构阶段可与成长档案事实和教师端反思提交打通。
2. 当前“已进入成长档案 / 教学工作维度”为展示口径，尚未写入 `archiveStore.teacherArchiveFacts`。

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
| 申请处理 | 同意申请 | 调用 `approvePracticeApplication()` | 已同步年度跟踪和实践记录 |
| 申请处理 | 退回修改 | 调用 `returnPracticeApplication()` | 已同步跟踪最近动作 |
| 年度实践跟踪 | 提醒申请 | 调用 `remindPracticeApplication()` | 页面内闭环，保留完成天数不变 |
| 年度实践跟踪 | 查看申请/记录 | 定位当前行并展示状态 | 页面内闭环 |
| 实践记录 | 提醒补材料 | 调用 `remindPracticeMaterial()` | 页面内闭环 |
| 实践记录 | 确认归档 | 调用 `confirmPracticeArchive()` | 已同步年度天数，并生成成长档案待确认处理记录 |
| 实践记录 | 查看档案 | 定位已归档记录 | 页面内闭环，后续可跳成长档案详情 |

### 8.4 后续审计点

1. 当前企业实践记录归档后生成成长档案待确认记录，不直接入档，和培训管理口径保持一致。
2. “查看档案”当前仍是页面内定位，后续可与成长档案详情的事实来源进一步打通。

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
| 虚拟教研室 | 草稿、运行中、归档、停用 | `virtualLabStore.rooms` 目前以列表数据和统计为主 | 草稿创建已完成本地闭环，运行/归档/停用留到后续细化 |
| 教研活动 | 待安排、进行中、已结束、已形成记录、记录异常 | `VirtualLabActivity.recordStatus` 支持 `未形成记录`、`已形成记录`、`记录异常` | 已覆盖记录形成主状态 |
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
| 教研室列表 | 查看详情 | `router.push('/admin/virtual-lab/rooms/:roomId')` | 已闭环到详情 |
| 教研室详情 | 邀请教师 | 调用 `inviteVirtualLabMember()`，同步成员列表和教研室成员数 | 已完成本地闭环 |
| 教研室详情 | 移出成员 | 调用 `removeVirtualLabMember()`，负责人不可移出 | 已完成本地闭环 |
| 教研室详情 | 新建教研活动 | 调用 `createVirtualLabActivity()`，同步近期活动和教研室活动统计 | 已完成本地闭环 |
| 教研室详情 | 查看活动/记录 | 跳转活动详情或记录详情 | 已闭环到页面 |
| 活动详情 | 形成并查看记录 | 未形成记录时调用 `formVirtualLabRecordFromActivity()` 后进入记录详情 | 已完成活动到记录闭环 |
| 活动详情 | 查看会议记录/资料 | 页面内定位或提示当前资料 | 页面内闭环 |
| 记录详情 | 查看来源活动 | 按 `record.sourceActivityId` 跳转来源活动 | 已闭环到来源活动 |
| 记录详情 | 查看来源资料 | 滚动定位来源资料列表 | 页面内闭环 |
| 记录详情 | 生成档案待确认 | 调用 `sendVirtualLabRecordToArchive()`，写入 `archiveStore.processingRecords` | 已完成跨模块本地闭环 |

### 9.5 后续审计点

1. 虚拟教研室的正式状态机仍需细化：草稿、运行中、停用、归档是否需要独立页面动作。
2. 活动资料当前只覆盖展示和查看提示，后续可补上传、同步失败、重新同步状态。
3. 虚拟教研记录沉淀口径已与培训、企业实践保持一致：生成成长档案待确认处理记录，不直接入档。

## 10. 管理端：分析报告

### 10.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 报告卡片 | 分析报告、分析大屏、专题解读、图表解读、数据问答的入口卡片 | `frontend/src/pages/admin/reports/ReportCenterPage.vue`、`frontend/src/stores/admin/reportStore.ts` |
| 报告详情 | 查看报告、大屏预览或数据不足原因说明的同页详情面板 | `ReportCenterPage.vue`、`reportStore.ts` |
| 导出文件状态 | 已生成报告的导出结果 | `reportStore.ts` |
| AI 分析会话 | 从报告继续分析、继续追问或基于筛选结果生成分析 | `ReportCenterPage.vue`、`reportStore.ts` |
| 动作历史 | 查看、导出、更新、重新生成等动作留痕 | `reportStore.ts` |

### 10.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 报告 | 已生成、待更新、数据不足 | `ReportCard.status` | 已接入模块级本地状态 |
| 导出 | 未导出、导出文件已生成 | `ReportCard.exportStatus` | 已完成导出本地闭环 |
| 详情面板 | 报告详情、大屏预览、原因说明 | `ReportState.detailMode` | 已完成查看类动作本地闭环 |
| AI 分析 | 未开启、已准备 | `ReportState.aiSession.active` | 已完成继续分析、继续追问和基于筛选结果生成分析入口 |

### 10.3 主流程

```txt
选择报告类型 / 对象 / 周期 / 状态
→ 查看报告、大屏或数据不足原因
→ 已生成报告可导出
→ 待更新报告可更新为已生成
→ 已生成报告可重新生成并记录历史
→ 继续分析 / 继续追问 / AI 助手生成分析
→ 同页展示 AI 分析会话状态
```

### 10.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 报告中心 | 查看 | 调用 `openReportDetail()`，打开同页报告详情面板 | 已完成本地闭环 |
| 报告中心 | 查看大屏 | 调用 `openReportDetail(reportId, 'dashboard')` | 已明确为同页大屏预览，不新增路由 |
| 报告中心 | 查看原因 | 调用 `openReportDetail(reportId, 'insufficient-data')` | 已完成数据不足原因说明 |
| 报告中心 | 导出 | 调用 `exportReport()`，报告 `exportStatus` 变为“导出文件已生成” | 已完成本地闭环 |
| 报告中心 | 更新 / 重新生成 | 调用 `regenerateReport()`，报告状态变为“已生成”，生成时间为“刚刚” | 已完成本地闭环 |
| 报告中心 | 继续分析 / 继续追问 | 调用 `continueReportAnalysis()`，打开 AI 分析会话 | 已完成本地闭环 |
| 报告中心 | AI 助手生成分析 | 调用 `openReportAiAssistant()`，基于当前筛选结果生成 AI 会话提示 | 已完成本地闭环 |

### 10.5 后续审计点

1. 报告详情目前是同页摘要面板，后续如有高保真详情页再补独立路由。
2. 导出目前是前端状态闭环，未生成真实文件；进入接口层后需改为异步导出任务。
3. AI 分析目前只明确会话状态和来源报告，后续可接入真实问答线程。

## 11. 教师手机端：待办

### 11.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 待办记录 | 教师需要确认、补充、完善或处理的个人事项 | `teacher-mobile/src/pages/todo/index.vue`、`teacher-mobile/src/pages/todo/all/index.vue` |
| 待办动态 | 教师近期确认、材料更新、草稿保存等操作时间线 | `teacher-mobile/src/pages/todo/dynamics/index.vue`、`teacher-mobile/src/pages/todo/dynamics-filter/index.vue` |
| 待确认档案记录 | 系统识别后需要教师确认是否属于本人的档案记录 | `teacher-mobile/src/pages/todo/certificate-detail/index.vue` |
| 培训证书材料 | 待确认档案记录关联的证书图片和证书字段 | `certificate-detail/index.vue`、`certificate-edit/index.vue` |
| 修改提交记录 | 教师修改证书字段后提交给部门核验的记录 | `teacher-mobile/src/pages/todo/certificate-submit/index.vue` |
| 入档结果 | 教师确认后进入个人发展维度的结果态 | `teacher-mobile/src/pages/todo/certificate-archive-success/index.vue` |
| 移出结果 | 教师判断记录不属于本人后从待确认列表移出的结果态 | `teacher-mobile/src/pages/todo/certificate-removed/index.vue` |

### 11.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 待办记录 | 待确认、待补充、可完善、已处理 | 列表页静态展示 `待确认`、`待补充`、`可完善` | 页面已覆盖，未接入共享状态 |
| 待确认档案记录 | 待确认、待核验、已入档、已移出 | 详情页展示 `待确认`；提交结果页展示 `待核验`；结果页展示 `已入档` / `已移出` | 多个状态页已存在，但缺少同一记录的状态流转 |
| 培训证书材料 | 原始识别、已修改、待核验、已确认 | 详情页、编辑页、提交页各自静态展示 | 页面已覆盖，未共享证书字段和材料状态 |
| 待办动态 | 记录确认、材料更新、草稿保存、其他 | 动态页和筛选页静态分组展示 | 当前是只读时间线，未与待办记录动作联动 |
| 入档结果 | 入档成功、可查看个人发展、可申请更正 | 入档成功页展示结果和“查看个人发展”提示 | 未真实跳转个人发展档案页 |
| 移出结果 | 已移出、可查看其他待确认记录 | 移出结果页可返回待办或全部待办 | 结果页存在，但详情页“不是我的”未接入跳转 |

### 11.3 主流程

```txt
待办首页 / 全部待办
→ 进入待确认培训证书详情
→ 教师确认记录属于本人
→ 后续核验或直接入档到个人发展
→ 入档成功页提示可查看个人发展
```

```txt
待确认培训证书详情
→ 信息有误，进入编辑页
→ 修改证书字段 / 补充说明 / 更换材料
→ 提交修改
→ 进入部门核验
→ 核验通过后入档到个人发展
```

```txt
待确认培训证书详情
→ 判断不是本人记录
→ 移出待确认
→ 不进入成长档案
→ 返回待办或查看其他待确认记录
```

### 11.4 当前页面动作

| 页面 | 动作 | 当前实现 | 闭环判断 |
| --- | --- | --- | --- |
| 待办首页 | 查看全部待办 | `uni.navigateTo('/pages/todo/all/index')` | 已闭环到页面 |
| 待办首页 | 去确认 | `uni.navigateTo('/pages/todo/certificate-detail/index')` | 已闭环到证书详情页 |
| 待办首页 | 查看全部动态 | `uni.navigateTo('/pages/todo/dynamics/index')` | 已闭环到动态页 |
| 全部待办 | 去确认 | `uni.navigateTo('/pages/todo/certificate-detail/index')` | 已闭环到证书详情页 |
| 证书详情 | 信息有误，修改一下 | `uni.navigateTo('/pages/todo/certificate-edit/index')` | 已闭环到编辑页 |
| 证书详情 | 确认是我的 | 当前按钮无 `@tap` 绑定 | 未闭环；应进入待核验或入档成功结果态 |
| 证书详情 | 不是我的 | 当前按钮无 `@tap` 绑定 | 未闭环；应进入已移出待确认结果态 |
| 证书详情 | 查看材料 | 当前按钮无真实预览动作 | 仅视觉态 |
| 证书编辑 | 提交修改 | `uni.navigateTo('/pages/todo/certificate-submit/index')` | 已闭环到提交结果页，但未共享修改后的字段 |
| 证书编辑 | 更换材料 | `uni.showToast('材料更换入口待接入上传')` | 已明确降级，未接入上传 |
| 证书提交结果 | 查看提交记录 | `uni.showToast('提交记录已在当前页展示')` | 页面内降级；无独立提交记录 |
| 证书提交结果 | 返回待办 | `uni.navigateTo('/pages/todo/index')` | 已闭环到待办首页 |
| 入档成功 | 查看个人发展 | `uni.showToast('查看个人发展')` | 未闭环；缺个人发展档案详情页 |
| 入档成功 | 返回待办 | `uni.navigateTo('/pages/todo/index')` | 已闭环到待办首页 |
| 已移出待确认 | 返回待办 | `uni.navigateTo('/pages/todo/index')` | 已闭环到待办首页 |
| 已移出待确认 | 查看其他待确认记录 | `uni.navigateTo('/pages/todo/all/index')` | 已闭环到全部待办 |
| 全部动态 | 筛选动态 | `uni.navigateTo('/pages/todo/dynamics-filter/index')` | 已闭环到筛选页 |

### 11.5 后续审计点

1. 待办模块 9 张效果图和 9 个注册页面已基本对应，缺口不是页面数量，而是同一条待确认记录没有共享状态。
2. “确认是我的”应先定口径：直接进入 `certificate-archive-success`，还是先进入部门核验。当前文案同时出现“后续核验”和“系统已入档”，需要统一。
3. “不是我的”应接入 `certificate-removed`，并定义是否需要记录移出原因、是否允许部门重新核验。
4. 编辑页提交后应形成“修改提交记录”，并与后续部门核验、档案个人发展入档结果关联。
5. 入档成功页的“查看个人发展”当前只有提示，依赖档案模块个人发展记录页或统一档案详情页补齐。
6. 动态列表当前是只读静态时间线，后续应由确认、提交修改、入档、移出等动作生成。
7. 手机端待办如果要和管理端闭环，应与管理端 `archiveStore.processingRecords` 或后续手机端本地 store 对齐状态：待确认、待核验、已入档、已移出。

## 12. 教师手机端：档案

### 12.1 业务对象

| 对象 | 说明 | 当前代码位置 |
| --- | --- | --- |
| 档案首页 | 教师查看成长档案概览、分类入口和最近入档记录的一级页面 | `teacher-mobile/src/pages/archive/index.vue` |
| 档案分类 | 基本信息、教学工作、教研科研、企业实践、社会服务、成果荣誉、个人发展、考核评价等维度 | `archive/index.vue` 静态分类卡片 |
| 档案记录 | 某一维度下已经入档或可查询的个人成长记录 | `teacher-mobile/src/pages/archive/record-query/index.vue` |
| 档案记录详情 | 单条档案事实的详情、来源、材料、用途和更正入口 | 当前未见独立档案详情页 |
| 档案来源 | 待办确认、培训归档、企业实践核验、虚拟教研归档等形成档案事实的来源 | `teacher-mobile/src/pages/todo/*`、`teacher-mobile/src/pages/activity/*` |
| 档案更正 | 教师发现入档事实有误后发起更正、补充材料并查看处理进度 | 当前仅 `profile/index.vue` 有“信息更正进度”入口文案 |
| 入档结果 | 业务流程完成后提示已入档或等待归档确认的结果态 | `certificate-archive-success`、`training-archive-result`、`enterprise-archive-success`、`virtual-research-archive-result` 等 |

### 12.2 状态口径

| 对象 | 应有状态 | 当前前端状态 | 判断 |
| --- | --- | --- | --- |
| 档案记录 | 已入档、待确认、待核验、待补充、已移出、已更正 | 档案页只展示已入档数量；待确认/待核验散落在待办和活动结果页 | 状态来源分散，缺统一档案记录模型 |
| 档案分类 | 有记录、无记录、最近更新、需补充 | 分类卡片展示条数和最近更新 | 只有入口态，分类列表/空状态缺页 |
| 档案查询 | 有结果、无结果、按分类筛选、关键词搜索 | 查询页固定展示 8 条 Java 程序设计相关记录 | 有结果页已覆盖；无结果和真实筛选未闭环 |
| 档案详情 | 可查看来源、可查看材料、可申请更正、可引用到画像/报告 | 当前没有统一详情页 | 高风险缺口 |
| 入档结果 | 等待确认、已入档、归档失败、需补充 | 培训为“归档确认中”，企业实践/待办证书为“已入档”，虚拟教研为“已归档” | 结果页存在，但口径不统一 |
| 档案更正 | 更正申请中、待补充、已通过、未通过 | 未见独立页面 | 缺页 |

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
→ 形成待确认、待核验或已入档记录
→ 写入对应档案分类
→ 档案首页更新数量和最近入档
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
| 档案首页 | 消息通知 | `uni.showToast('消息通知')` | 仅视觉态 |
| 档案首页 | 搜索档案 | `uni.showToast('搜索档案')` | 未跳转到查询页 |
| 档案首页 | 点击档案分类 | `uni.showToast(item.name)` | 未闭环；应进入分类概览或记录列表 |
| 档案首页 | 查看全部最近入档 | `uni.showToast('查看全部')` | 未闭环；应进入记录列表 |
| 档案首页 | 点击最近入档记录 | `uni.showToast(record.title)` | 未闭环；应进入记录详情 |
| 档案查询 | 返回 | `uni.navigateBack()` | 已闭环到上一页 |
| 档案查询 | 清除关键词 | `uni.showToast('清除关键词')` | 仅视觉态 |
| 档案查询 | 分类筛选 | `uni.showToast(filter)` | 未真实筛选 |
| 档案查询 | 点击记录 | `uni.showToast(record.title)` | 未闭环；应进入记录详情 |
| 待办入档成功 | 查看个人发展 | `uni.showToast('查看个人发展')` | 未闭环；缺个人发展记录列表或详情 |
| 培训归档提交结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training/index')` | 已闭环到活动页 |
| 培训归档提交结果 | 查看提交内容 | 当前无 `@tap` 绑定 | 仅视觉态 |
| 企业实践已入档 | 查看档案详情 | 当前按钮无 `@tap` 绑定 | 未闭环；缺企业实践档案详情页 |
| 企业实践已入档 | 返回首页 | 当前按钮无 `@tap` 绑定 | 未闭环 |
| 虚拟教研归档结果 | 目标“成长档案 · 教研科研维度” | 页面展示目标，但主要使用 toast 或无真实档案跳转 | 未闭环 |
| 我的主页 | 信息更正进度 | 仅入口文案展示 | 未闭环；缺更正进度页 |

### 12.5 信息架构建议

| 层级 | 建议路由 | 覆盖范围 |
| --- | --- | --- |
| 档案首页 | `pages/archive/index` | 保留概览、分类入口、最近入档 |
| 分类记录列表 | `pages/archive/category/index` | 用 `category` 参数承接基本信息、教学工作、教研科研、企业实践、社会服务、成果荣誉、个人发展、考核评价 |
| 档案记录查询 | `pages/archive/record-query/index` | 保留关键词搜索和跨分类结果列表 |
| 记录详情 | `pages/archive/record-detail/index` | 统一承接教学评价详情、企业实践详情、培训证书详情、教研记录详情等 |
| 更正申请 | `pages/archive/correction/index` | 从记录详情发起更正，支持补充说明和材料 |
| 更正进度 | `pages/archive/correction-progress/index` | 承接 `profile/index` 的“信息更正进度” |

### 12.6 后续审计点

1. 档案 54 张效果图不是当前 2 个档案页面能覆盖的“一页多状态”；档案分类、记录列表、记录详情和更正链路需要独立信息架构。
2. 当前档案首页的 8 个分类卡片只展示数量，所有点击都是 toast，不能标记为业务闭环。
3. 当前档案查询页有固定结果列表，但筛选、清空、记录详情都未真实闭环。
4. 待办、培训、企业实践、虚拟教研都有“入档 / 归档”结果页，但结果页没有统一写回档案首页、查询页和详情页。
5. 入档口径需要统一：培训页面是“归档确认中”，企业实践和待办证书是“已入档”，虚拟教研是“已归档”；后续应明确哪些需要管理端确认，哪些可直接成为正式档案事实。
6. “个人发展”“教研科研”“企业实践”等结果页提示可以查看档案，但缺对应分类记录列表和统一详情页。
7. 档案事实后续要作为能力画像、岗位 / 聘期要求和个人发展报告依据，因此记录详情必须能展示引用用途和来源追溯。

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
| 推荐培训 | 可直接学习、需申请、已申请、已加入我的培训 | 列表静态展示“直接学习”“申请培训” | 页面已覆盖，未接入共享状态 |
| 我的培训 | 学习中、已结束、待总结、归档确认中、已入档 | 首页/列表静态展示“学习中”“待确认总结和结业材料”“已结束” | 页面已覆盖，缺同一培训状态流转 |
| 培训申请 | 已提交、业务部门确认中、已通过、未通过、已取消 | 申请结果页展示“等待确认” | 提交结果页存在，缺管理端申请状态回写 |
| 培训总结 | 草稿、材料待补、可提交归档、已提交归档 | 总结页展示“材料已齐，可提交归档” | 页面已覆盖，缺保存草稿和材料上传状态 |
| 培训归档 | 材料已提交、归档确认中、已入档、需补充、未通过 | 归档结果页展示“正在等待归档确认” | 与档案入档口径一致，但未回写档案记录 |
| 培训需求 | 待确认、已匹配、暂不处理、已转培训申请 | 两个需求结果页均展示“等待确认” | 页面已覆盖，缺与管理端培训需求状态对齐 |

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
| 培训首页 | 当前任务“记录心得” | 无 `@tap` 绑定 | 仅视觉态 |
| 培训首页 | 当前任务“打开资源” | 无 `@tap` 绑定 | 仅视觉态 |
| 培训首页 | 推荐培训“打开资源 / 查看详情 / 记录心得” | 无 `@tap` 绑定 | 仅视觉态 |
| 培训首页 | 我的培训“记录心得 / 去总结” | 无 `@tap` 绑定 | 仅视觉态；首页未直接进入总结页 |
| 培训列表 | 申请培训 | `uni.navigateTo('/pages/activity/training-application/index')` | 已闭环到申请提交结果页 |
| 培训列表 | 整理总结 | `uni.navigateTo('/pages/activity/training-summary/index')` | 已闭环到培训总结页 |
| 培训列表 | 直接学习 | 当前 `@tap` 为 `undefined` | 仅视觉态 |
| 培训列表 | 提交培训需求 | `uni.navigateTo('/pages/activity/training-demand/index')` | 已闭环到需求提交页 |
| 培训申请结果 | 查看申请详情 | 无 `@tap` 绑定 | 仅视觉态 |
| 培训申请结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training-list/index')` | 已闭环到培训列表 |
| 培训申请结果 | 返回活动首页 | `uni.redirectTo('/pages/activity/index')` | 已闭环到活动首页 |
| 培训总结 | 查看原学习记录 | 无 `@tap` 绑定 | 仅视觉态 |
| 培训总结 | 修改总结 / 让 AI 再优化 | 无 `@tap` 绑定 | 仅视觉态 |
| 培训总结 | 更换材料 / 上传材料 | 无 `@tap` 绑定 | 仅视觉态 |
| 培训总结 | 保存草稿 | 无 `@tap` 绑定 | 仅视觉态 |
| 培训总结 | 提交归档 | `uni.navigateTo('/pages/activity/training-archive-result/index')` | 已闭环到归档结果页，但未共享材料状态 |
| 培训归档结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training/index')` | 已闭环到培训首页 |
| 培训归档结果 | 查看提交内容 | 无 `@tap` 绑定 | 仅视觉态 |
| 培训归档结果 | 返回活动首页 | `uni.redirectTo('/pages/activity/index')` | 已闭环到活动首页 |
| 培训需求提交 | 提交需求 | `uni.navigateTo('/pages/activity/training-demand-result/index')` | 已闭环到“已找到培训”需求结果页 |
| 培训需求生成 | 提交需求 | `uni.navigateTo('/pages/activity/training-need-result/index')` | 已闭环到“提升能力”需求结果页 |
| 培训需求结果 | 返回培训进修 | `uni.navigateTo('/pages/activity/training/index')` | 已闭环到培训首页 |
| 培训需求结果 | 返回活动首页 | `uni.redirectTo('/pages/activity/index')` | 已闭环到活动首页 |

### 13.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 推荐培训 | `trainingStore.resources` / 培训资源 | 手机端静态推荐尚未读取管理端资源 |
| 培训申请 | `trainingStore.applications` / 培训申请 | 手机端“等待确认”应对应管理端“待处理”申请 |
| 我的培训 | `trainingStore.plans` / 培训计划参与名单 | 申请通过后应进入教师“我的培训” |
| 培训总结和证书材料 | `trainingStore.records` / 培训记录材料 | 手机端提交归档应更新培训记录材料状态 |
| 培训归档结果 | `archiveStore.processingRecords` / 成长档案待确认记录 | 当前应保持管理端口径：材料完整后生成成长档案待确认记录，不直接入档 |
| 培训需求 | `trainingStore.demands` / 培训需求 | 手机端需求提交后应进入管理端需求管理待匹配 |

### 13.6 后续审计点

1. 培训活动 9 张效果图和 9 个注册页面数量对应，缺口是业务状态没有共享。
2. 推荐培训、我的培训、申请结果、总结归档和需求结果使用静态数据，后续需要一个手机端培训状态模型或直接对齐管理端 training store 口径。
3. “直接学习 / 记录心得 / 打开资源 / 查看申请详情 / 修改总结 / 上传材料 / 保存草稿 / 查看提交内容”目前均未形成业务动作。
4. 培训申请应和管理端培训申请处理闭环：手机端提交为“待处理”，管理端同意后进入我的培训，未同意则形成明确结果。
5. 培训归档应和管理端当前口径保持一致：培训记录材料完整后生成成长档案“待确认”处理记录，不直接写为正式档案事实。
6. 培训需求应进入管理端培训需求管理，由管理端匹配资源、暂不处理或转培训计划。

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
| 反思记录 | 草稿、AI 整理中、待确认、已确认、可补充、已入档 | 页面分散展示“已保存草稿”“AI 已整理完成”“已确认” | 页面已覆盖，缺统一记录状态 |
| 反思依据 | 已发现、已选择、已补充、已解析、已移除 | 页面静态展示已选 2/3/5 份依据 | 选择态是静态 UI，未共享依据集合 |
| AI 会话 | 进行中、已整理线索、已生成草稿 | 引导页和自主对话页展示线索，并可进入草稿 | 页面链路存在，缺会话状态持久化 |
| 反思草稿 | 已生成、已修改、已保存、已确认 | 草稿页展示文本并可确认到成功页 | 确认链路存在，修改和保存草稿未闭环 |
| 档案沉淀 | 待沉淀、待确认、已入档 | 成功页文案为“可继续沉淀到成长档案” | 未写入档案或管理端反思列表 |

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
| 反思开始 | 选择已有报告开始 | `uni.navigateTo('/pages/activity/reflection-course/index')` | 已闭环到课程范围选择页 |
| 反思开始 | 录制课堂音频 / 上传教学资料 / 直接与 AI 对话 | 均调用 `goCourseSelect()` | 已进入统一课程范围选择页，但未区分开始方式 |
| 反思开始 | 最近草稿继续完善 | 无 `@tap` 绑定 | 未闭环 |
| 学期课程范围 | 开始 AI 引导反思 | `uni.navigateTo('/pages/activity/reflection-evidence/index')` | 已闭环到单次课依据页，但范围跳转口径不清 |
| 学期课程范围 | 切换课程 | 无 `@tap` 绑定 | 仅视觉态 |
| 学期课程范围 | 上传教学资料 / 录制课堂音频 / 直接与 AI 对话 | 无 `@tap` 绑定 | 仅视觉态 |
| 单次课依据 | 开始 AI 引导反思 | `uni.navigateTo('/pages/activity/reflection-scope/index')` | 已闭环到阶段范围页 |
| 单次课依据 | 切换课次 | 无 `@tap` 绑定 | 仅视觉态 |
| 单次课依据 | 上传教学资料 / 录制课堂音频 / 直接与 AI 对话 | 无 `@tap` 绑定 | 仅视觉态 |
| 阶段范围 | 开始 AI 引导反思 | `uni.navigateTo('/pages/activity/reflection-self/index')` | 已闭环到自主反思选择页，但阶段到自主的业务边界不清 |
| 自主反思 | 开始 AI 对话 | `uni.navigateTo('/pages/activity/reflection-ai-chat/index')` | 已闭环到自主 AI 对话 |
| 自主反思 | 上传材料 / 关联课程 / 补充资料 | 无真实上传或选择动作 | 仅视觉态 |
| AI 引导会话 | 生成反思草稿 | `uni.navigateTo('/pages/activity/reflection-draft/index')` | 已闭环到草稿页 |
| AI 引导会话 | 查看 / 添加依据 | 无 `@tap` 绑定 | 仅视觉态 |
| 自主 AI 对话 | 生成反思草稿 | `uni.navigateTo('/pages/activity/reflection-draft/index')` | 已闭环到草稿页 |
| 自主 AI 对话 | 更换关联课程 / 继续输入 | 无真实动作 | 仅视觉态 |
| 草稿编辑 | 确认反思 | `uni.navigateTo('/pages/activity/reflection-success/index')` | 已闭环到成功页 |
| 草稿编辑 | 修改草稿 / 补充一句想法 / 重新让 AI 优化 | 无 `@tap` 绑定 | 仅视觉态 |
| 草稿编辑 | 保存草稿 | 无 `@tap` 绑定 | 未闭环 |
| 成功页 | 返回活动首页 | `uni.reLaunch('/pages/activity/index')` | 已闭环到活动首页 |
| 成功页 | 查看反思详情 | 无 `@tap` 绑定 | 未闭环；缺反思详情页或记录详情态 |
| 成功页 | 再做一篇反思 | 无 `@tap` 绑定 | 未闭环；应返回反思开始页 |

### 14.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 反思记录 | 管理端教学反思记录 | 手机端确认后应进入管理端反思总览 |
| 反思依据 | 管理端反思详情来源数据 | 手机端选择的报告、录音、成绩、评价应成为详情页来源数据 |
| AI 整理要点 | 管理端反思详情问题分析和改进建议 | 手机端 AI 线索应对应管理端详情里的问题定位、原因分析、改进建议 |
| 成长档案沉淀 | 档案教学工作维度 | 当前只是展示口径，后续应明确是否生成档案待确认记录 |
| 反思草稿 | 草稿或待确认反思记录 | 当前未见管理端草稿概念，需决定是否只在手机端保留 |

### 14.6 后续审计点

1. 教学反思 9 张效果图和 9 个注册页面数量对应，主流程页面链路基本完整。
2. 当前开始方式没有真正分流，报告、录音、上传资料和直接对话最终都进入课程选择或统一流程，后续应保留来源类型。
3. 学期课程、单次课、课程阶段、自主反思之间的跳转顺序与业务语义不完全一致，需要整理为统一状态机。
4. 依据选择、上传材料、录音、课程/课次切换均是静态 UI，未形成共享依据集合。
5. 保存草稿、继续草稿、查看反思详情、再做一篇反思未闭环。
6. 成功页说明可沉淀到成长档案“教学工作”，但未写入档案事实，也未明确是否需要管理端确认。
7. 手机端确认后的反思记录应与管理端教学反思总览、详情、问题定位和改进建议对齐。

## 15. 教师手机端：企业实践

### 15.1 业务对象

| 对象 | 说明 | 当前页面 |
| --- | --- | --- |
| 年度企业实践要求 | 教师年度企业实践天数要求、已归档天数和差额 | `enterprise-overview/index.vue`、`enterprise-list/index.vue`、`enterprise-plan-submit/index.vue` |
| 企业实践记录 | 一次企业实践的主体记录，包含单位、岗位、时间、天数、当前状态和操作入口 | `enterprise-overview/index.vue`、`enterprise-list/index.vue`、`enterprise-progress-detail/index.vue` |
| 实践计划 | 教师发起企业实践前提交的计划材料 | `enterprise-plan-submit/index.vue`、`enterprise-plan-confirm/index.vue`、`enterprise-import-export/index.vue` |
| 计划确认结果 | 学院确认通过或退回修改的结果 | `enterprise-plan-approved/index.vue`、`enterprise-plan-rejected/index.vue`、`enterprise-plan-edit/index.vue` |
| 实践日志 | 实践过程中的日志记录和归档后的日志详情 | `enterprise-log-record/index.vue`、`enterprise-log-list/index.vue`、`enterprise-workflow-config/index.vue` |
| 证明材料 | 企业实践证明、单位盖章材料、过程照片、成果材料等佐证 | `enterprise-proof-upload/index.vue`、`enterprise-proof-supplement/index.vue`、`enterprise-advanced-search/index.vue` |
| 总结与归档材料 | 实践总结、日志、附件确认后形成的归档提交材料 | `enterprise-login-history/index.vue`、`enterprise-archive-edit/index.vue` |
| 归档结果 | 提交归档后的等待确认或已入档结果 | `enterprise-archive-result/index.vue`、`enterprise-archive-success/index.vue` |
| 补充材料记录 | 归档或历史实践被退回后重新补充并提交核验的记录 | `enterprise-supplement-needed/index.vue`、`enterprise-resupplement/index.vue`、`enterprise-supplement-submitted/index.vue`、`enterprise-history-supplement-needed/index.vue` |
| 历史实践补录 | 已完成但平台暂未记录的企业实践补充确认流程 | `enterprise-history-supplement/index.vue`、`enterprise-history-confirmed/index.vue` |

### 15.2 状态口径

| 状态对象 | 建议状态 | 当前页面表现 | 当前判断 |
| --- | --- | --- | --- |
| 年度要求 | 未满足年度要求、进行中、已完成 | 展示“已归档 20 天，还差 10 天”和进行中提示 | 页面已覆盖，缺统一年度状态 |
| 实践计划 | 草稿、待确认、已通过、退回修改 | 计划提交页、等待确认页、通过页、退回修改页均存在 | 页面已覆盖，提交和重新提交未接入真实状态 |
| 企业实践记录 | 进行中、待归档、归档确认中、需补充、已入档、已归档 | 列表筛选包含“进行中 / 待归档 / 已归档 / 需补充” | 静态展示为主，缺同一记录跨页流转 |
| 实践日志 | 草稿、已保存、已归档 | 日志记录页展示保存草稿/保存日志，日志列表展示已归档 | 保存按钮未绑定，缺日志集合状态 |
| 证明材料 | 待上传、已上传、待补充、已退回补充、已确认 | 上传、补充、退回补充、已提交页面均存在 | 少量补充页可跳转，材料本身未形成共享对象 |
| 归档提交 | 待确认、需补充、已入档、已归档 | 归档结果页为“等待确认”，成功页为“已入档” | 口径需统一：提交后应先进入管理端成长档案待确认，不应直接写正式事实 |
| 历史实践补录 | 草稿、待确认、需补充、已确认 | 历史补录提交可进入已确认页，需补充页为 toast 提示 | 主链部分闭环，但结果未回到企业实践列表或档案详情 |

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
| 企业实践概览 / 列表 | 筛选“全部 / 进行中 / 待归档 / 已归档 / 需补充” | 静态 active 样式 | 仅视觉态 |
| 企业实践概览 / 列表 | 继续记录、补充材料、查看详情、补充历史实践 | 多数按钮无 `@tap` 绑定 | 未闭环 |
| 实践计划提交 | 保存草稿、提交计划、修改草稿、重新整理、补充资料 | 按钮无 `@tap` 绑定 | 未闭环 |
| 实践计划等待确认 | 查看提交内容、返回实践列表 | `enterprise-import-export` 使用 `uni.showToast` | 仅提示态，未真实返回 |
| 实践计划通过 | 开始记录日志、返回实践列表 | 按钮无 `@tap` 绑定 | 未闭环 |
| 实践计划退回 / 编辑 | 修改计划并重新提交、保存草稿、重新提交、补充资料 | 按钮无 `@tap` 绑定 | 未闭环 |
| 实践进行中详情 | 去记录、查看详情、查看全部、补充资料 | 页面展示入口，未见真实跳转 | 仅视觉态 |
| 日志记录 | 保存草稿、保存日志 | 按钮无 `@tap` 绑定 | 未闭环 |
| 总结与材料确认 | 查看日志、修改草稿、重新整理、补充资料、保存草稿、提交归档 | 均为 `uni.showToast` | 仅提示态，未生成归档提交状态 |
| 归档提交结果 | 返回实践列表、查看消息通知 | `uni.showToast` | 未闭环 |
| 已入档结果 | 返回首页、查看档案详情 | 按钮无 `@tap` 绑定 | 未闭环；缺企业实践档案详情页 |
| 需补充材料 | 去补充材料、重新提交 | `enterprise-supplement-needed` 可跳 `enterprise-resupplement` 和 `enterprise-supplement-submitted` | 补充提交结果页局部闭环，缺材料状态共享 |
| 历史实践补录 | 保存草稿、提交确认 | 保存为 toast，提交可跳 `enterprise-history-confirmed` | 提交结果局部闭环 |
| 历史实践已确认 | 返回实践列表、查看企业实践档案 | 均为 `uni.showToast` | 未回到真实列表或档案详情 |

### 15.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 年度企业实践要求 | `practiceStore.trackings` / 企业实践年度跟踪 | 手机端年度进度应读取同一年度跟踪口径 |
| 实践计划 | `practiceStore.applications` / 企业实践申请 | 手机端提交计划应生成管理端待审核申请 |
| 计划确认结果 | 管理端企业实践申请处理结果 | 管理端同意后手机端进入实践中，退回后进入计划修改 |
| 实践记录和日志 | `practiceStore.records` / 企业实践记录 | 手机端日志、材料和总结应更新同一实践记录 |
| 归档提交 | `archiveStore.processingRecords` / 成长档案待确认记录 | 手机端提交归档后应生成成长档案待确认处理记录 |
| 已入档事实 | `archiveStore.teacherArchiveFacts` / 教师档案事实 | 只有管理端确认入档后才应成为正式档案事实 |
| 历史实践补录 | `practiceStore.records` 或 `archiveStore.processingRecords` | 需先经管理端确认，再计入年度天数和档案事实 |

### 15.6 后续审计点

1. 企业实践 25 个页面已覆盖计划、确认、进行中、日志、补充、归档、历史补录等视觉状态，缺口主要是状态共享和真实跳转。
2. 当前页面里同时存在“归档提交等待确认”和“已入档成功”两种结果，应统一为“手机端提交后先等待管理端确认，确认后才正式入档”。
3. 计划提交、计划通过、日志保存、总结归档、归档结果返回等关键按钮大量无绑定或仅 toast，不能标记为业务闭环。
4. 补充材料链路有局部跳转，但没有材料对象、核验状态和处理历史。
5. 历史实践补录可跳到已确认页，但“返回实践列表”和“查看企业实践档案”仍为提示态。
6. `enterprise-import-export`、`enterprise-workflow-config` 等页面命名偏管理端语义，后续补路由和重构时应按手机端业务名重新核对边界。
7. 企业实践手机端后续实现应优先对齐管理端 `practiceStore` 和 `archiveStore`，避免另起一套状态口径。

## 16. 教师手机端：虚拟教研

### 16.1 业务对象

| 对象 | 说明 | 当前页面 |
| --- | --- | --- |
| 我的教研室 | 教师已加入教研室、待处理邀请、待确认贡献的入口 | `virtual-research-room/index.vue`、`virtual-research-profile-complete/index.vue` |
| 教研室邀请 | 教师收到教研室邀请后的确认加入或暂不加入流程 | `virtual-research-invitation/index.vue`、`virtual-research-position-management/index.vue` |
| 教研活动 | 教研室内会议、资源共建、案例共创等活动主体 | `virtual-research-activity-list/index.vue`、`virtual-research-activity-detail-ongoing/index.vue` |
| 阶段材料 | 教师在活动进行中提交的案例、附件、说明等过程材料 | `virtual-research-award-management/index.vue`、`virtual-research-stage-submitted/index.vue` |
| 个人贡献 | 系统根据会议纪要、任务分工、阶段材料识别出的教师个人贡献 | `virtual-research-confirm-contribution/index.vue`、`virtual-research-contribution-confirm/index.vue`、`virtual-research-activity-detail-confirm/index.vue` |
| 贡献确认结果 | 教师确认贡献后等待活动归档的结果态 | `virtual-research-contribution-submitted/index.vue`、`virtual-research-basic-info-edit/index.vue` |
| 补充材料 | 活动或贡献被退回后补充过程材料并重新提交 | `virtual-research-supplement-material/index.vue`、`virtual-research-activity-detail-supplement-submitted/index.vue`、`virtual-research-resubmitted/index.vue` |
| 归档结果 | 教研活动归档后形成教研记录和成长档案去向 | `virtual-research-archive-result/index.vue`、`virtual-research-archive-result-v1/index.vue`、`virtual-research-archived-confirmed/index.vue` |
| 教研记录 / 贡献详情 | 已归档教研活动和个人贡献的查看页 | `virtual-research-contribution-detail/index.vue`、`virtual-research-work-experience-management/index.vue` |
| 个人资料维护 | 虚拟教研相关的个人资料、岗位、经历、技能、获奖、角色和高级设置 | `virtual-research-profile-intro-edit/index.vue`、`virtual-research-position-management/index.vue`、`virtual-research-work-experience-management/index.vue`、`virtual-research-skill-management/index.vue`、`virtual-research-award-management/index.vue`、`virtual-research-role-assignment/index.vue`、`virtual-research-advanced-settings/index.vue` |

### 16.2 状态口径

| 状态对象 | 建议状态 | 当前页面表现 | 当前判断 |
| --- | --- | --- | --- |
| 教研室邀请 | 待确认、已加入、暂不加入、已失效 | 邀请页展示“待确认邀请”，已加入页存在 | 确认加入和暂不加入均为 toast，未形成成员状态 |
| 教研室成员关系 | 已加入、待退出、已退出 | “我的教研室”和“已加入教研室”视觉态存在 | 缺成员关系共享状态 |
| 教研活动 | 进行中、待确认贡献、需补充、等待归档、已归档 | 活动列表展示 `待确认 / 进行中 / 需补充 / 已归档` | 状态页覆盖完整，但列表筛选和动作仍为 toast |
| 阶段材料 | 草稿、待提交、已提交、需补充、已归档 | 阶段材料提交页和提交结果页存在 | 提交和保存草稿为 toast，缺材料集合状态 |
| 个人贡献 | 待识别、待确认、已确认、已提交、被退回、已归档 | 多个贡献确认页和提交结果页存在 | 贡献确认按钮多为 toast，缺统一贡献对象 |
| 归档 | 等待归档、需补充、已归档、已生成档案待确认 | 结果页展示“等待归档”“已归档”“成长档案 · 教研科研维度” | 口径需统一为管理端确认后生成档案待确认或档案事实 |
| 教研记录 | 已形成记录、未形成记录、记录异常 | 已归档页展示“已形成教研活动记录” | 仅展示结果，未真实进入记录详情 |

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
| 我的教研室 | 查看邀请、确认贡献、进入教研室、全部教研活动 | 均为 `uni.showToast` | 仅提示态，未进入对应页面 |
| 教研室邀请 | 确认加入、暂不加入、查看近期活动 | 均为 `uni.showToast` | 未形成成员关系状态 |
| 已加入教研室 | 返回我的教研室、去确认贡献、待确认贡献卡片 | 均为 `uni.showToast` | 未闭环 |
| 教研活动列表 | 筛选、去确认、确认贡献、查看详情、补充材料、查看记录 | 均为 `uni.showToast` | 仅视觉态 |
| 活动进行中详情 | 进入会议、返回教研室 | `uni.showToast` | 未接入会议或返回路由 |
| 阶段材料提交 | 上传、拍照、保存草稿、提交材料 | `uni.showToast` | 未生成阶段材料状态 |
| 阶段材料已提交 | 返回教研室、查看活动详情 | `uni.showToast` | 未闭环 |
| 贡献确认页 | 补充遗漏、不是我的、确认贡献 | 多个页面均为 `uni.showToast` | 未生成确认结果状态 |
| 贡献确认已提交 | 返回教研室、查看提交内容 | `uni.showToast` | 未闭环到教研室或详情 |
| 补充材料页 | 上传资料、保存草稿、重新提交 | `uni.showToast` | 未生成补充提交状态 |
| 归档结果页 | 返回教研室、查看教研记录、查看成长档案去向 | `uni.showToast` | 未闭环到记录或档案详情 |
| 已归档确认页 | 返回教研室、查看教研记录 | `uni.showToast` | 未闭环 |
| 贡献详情 / 记录详情 | 查看材料、返回教研记录 | `uni.showToast` | 详情为静态展示，来源材料未真实预览 |
| 个人资料维护页 | 保存、管理岗位 / 经历 / 技能 / 获奖 / 角色 / 高级设置 | 多数为 `uni.showToast` 或静态页 | 与虚拟教研主流程边界需重新确认 |

### 16.5 跨端对齐口径

| 手机端对象 | 管理端对应对象 | 当前判断 |
| --- | --- | --- |
| 教研室 | `virtualLabStore.rooms` / 虚拟教研室 | 手机端“我的教研室”应读取教师已加入的 room 和邀请状态 |
| 教研室成员 | `virtualLabStore.rooms.members` / 成员列表 | 邀请确认后应写入成员关系，管理端教研室详情同步可见 |
| 教研活动 | `virtualLabStore.activities` / 教研活动 | 手机端活动列表、活动详情和阶段状态应与管理端活动一致 |
| 阶段材料 | `virtualLabStore.activities` 或后续活动材料集合 | 手机端提交材料应成为活动记录和贡献识别依据 |
| 个人贡献 | `virtualLabStore.records.participants` / 参与记录 | 手机端确认贡献应同步到管理端教研记录的参与记录 |
| 教研记录 | `virtualLabStore.records` / 教研记录 | 活动归档后应形成管理端教研记录，手机端查看同一记录 |
| 档案沉淀 | `archiveStore.processingRecords` / 成长档案待确认记录 | 应沿用管理端口径：虚拟教研记录先生成档案待确认，不直接写正式档案事实 |
| 成长档案事实 | `archiveStore.teacherArchiveFacts` / 教研科研维度事实 | 只有管理端确认入档后，手机端档案才能展示正式事实 |

### 16.6 后续审计点

1. 虚拟教研页面数量和视觉状态覆盖较完整，缺口集中在入口跳转、状态共享和归档口径。
2. 当前“我的教研室”“教研活动列表”“邀请确认”“贡献确认”“阶段材料提交”“归档结果”关键动作基本都是 toast，不能标记为业务闭环。
3. 贡献确认存在多个相近页面：`virtual-research-confirm-contribution`、`virtual-research-contribution-confirm`、`virtual-research-activity-detail-confirm`，后续需要统一为一个状态机或明确各自承接的效果图状态。
4. 归档结果同时写“形成教研活动记录”和“进入成长档案”，后续应统一为先形成教研记录，再生成成长档案待确认记录，管理端确认后才成为正式档案事实。
5. 阶段材料、会议纪要、任务分工、发言摘录和个人贡献之间尚未形成统一来源模型。
6. 个人资料维护类页面混在虚拟教研目录下，后续应判断是否属于“我的资料”或“虚拟教研成员资料”，避免影响活动主流程重构。
7. 手机端虚拟教研实现应优先对齐管理端 `virtualLabStore` 和 `archiveStore`，不要另建一套归档状态语言。

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
| 待办证书确认本人 | 待确认或已入档，需按来源决定 | `archiveStore.processingRecords` / `archiveStore.teacherArchiveFacts` | 若来源已完成部门核验，可确认后入档；若仍需部门复核，应进入待核验 |
| 培训申请 | 待处理 | `trainingStore.applications` | 管理端同意后进入培训计划参与名单，未同意形成明确结果 |
| 培训总结和证书材料 | 归档确认中 | `trainingStore.records`、`archiveStore.processingRecords` | 先更新培训记录材料状态，记录完整后生成成长档案待确认 |
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
| domain types | 已建立 `ability-list.ts`、`archive.ts`、`training.ts`、`practice.ts`、`virtual-lab.ts`、`report.ts`、`ability-profile.ts`、`reflection.ts`；对应 store 或 mock service 已从 domain 导入业务类型；能力清单展示类型已归入 `ability-list.ts`，档案查阅、处理详情和来源记录类型已归入 `archive.ts`，培训管理展示类型已归入 `training.ts`，虚拟教研详情展示类型已归入 `virtual-lab.ts` | 后续继续扫描页面内仍保留的业务 interface |
| 测试入口 | `frontend/package.json` 已增加 `npm run test`，AGENTS 已把管理端验证命令更新为 test/typecheck/build | 后续增加模块级测试约定 |
| mock service | 已建立 `frontend/src/services/mock/ability-list.ts`、`frontend/src/services/mock/ability-profile.ts`、`frontend/src/services/mock/reflection.ts`、`frontend/src/services/mock/archive.ts`、`frontend/src/services/mock/training.ts`、`frontend/src/services/mock/virtual-lab.ts`，能力清单展示配置、能力画像、教学反思、档案查阅/处理/详情、培训计划/详情/记录详情、虚拟教研活动详情和记录详情已改为从 service 获取 mock 数据 | 后续继续扫描其它页面内大段 mock 数组 |
| operationMessage | 已建立 `frontend/src/lib/operationMessage.ts`，并在能力清单优化建议页、要求映射页、档案详情页、能力画像群体页、虚拟教研室列表页、教研室详情页、活动详情页、记录详情页、培训计划页、培训计划详情页、培训记录详情页、分析报告中心统一页面局部消息的 `set` / `clear` / `fromStore` 模式；当前管理端已扫描的本地消息写法已归零 | 后续新增页面按该模式接入，避免重新出现零散 `operationMessage` / `actionMessage` / `materialMessage` / `planNotice` |
| 状态枚举和文案映射 | 分析报告状态已从页面本地 `statusMap` 迁入 `domain/admin/report.ts`，由 `getReportStatusClass` 统一返回状态样式类；能力清单执行版状态已在 `domain/admin/ability-list.ts` 统一 `published`、`pending`、`historical` 的显示文案和主徽章样式类；能力清单优化建议状态已统一 `pending`、`adopted`、`deferred`、`rejected`、`applied` 的显示文案和样式类入口；能力指标状态已统一 `enabled`、`disabled`、`draft` 的显示文案和样式类入口；能力清单要求映射状态已统一 `confirmed`、`pending`、`unconfigured` 的显示文案和徽章样式类；成长档案处理状态已在 `domain/admin/archive.ts` 统一 `待确认`、`待检验`、`待补充`、`异常待处理`、`拟退中`、`已入档` 的徽章样式类；成长档案批次整体状态已统一 `recognizing`、`recognized`、`confirmed`、`cancelled` 的显示文案和页面状态类；成长档案批次文件状态已统一 `已接收`、`解析中`、`已解析`、`等待处理`、`已取消` 的文本样式类；培训计划状态已在 `domain/admin/training.ts` 统一 `草稿`、`报名中`、`进行中`、`已完成`、`材料待完善` 的样式类入口；培训申请状态已统一 `待处理`、`已同意`、`未同意`、`已取消` 的样式类入口；培训资源状态已统一 `可用`、`信息待完善`、`已停用` 的样式类入口；培训需求状态已统一 `待匹配`、`已匹配`、`暂不处理` 的样式类入口；培训记录材料总状态已统一 `学习中`、`待总结`、`证书待补`、`记录完整` 的样式类入口；培训材料上传状态已统一 `待补充`、`已上传` 的样式类入口；企业实践申请状态已统一 `待审核`、`已同意`、`退回修改`、`已撤回` 的样式类入口；企业实践年度进展状态已统一 `未启动申请`、`待审核申请`、`实践中`、`已完成` 的样式类入口；企业实践记录状态已统一 `实践中`、`待提交总结`、`待企业评价`、`待归档确认`、`已归档` 的样式类入口；虚拟教研活动记录状态已统一 `已形成记录`、`未形成记录`、`记录异常` 的样式类入口；虚拟教研记录入档状态已统一 `待沉淀`、`已生成待确认档案` 的样式类入口；已补 domain 测试覆盖报告、能力清单、档案、培训、企业实践和虚拟教研状态映射 | 后续进入状态徽章组件抽取前，继续扫描少量展示型状态是否需要纳入 domain |
| 状态徽章组件 | `frontend/src/components/common/StatusBadge.vue` 已开始承接管理端业务状态展示；能力清单优化建议、基准模板启用态、执行版主状态、版本记录、发布确认、要求映射、成长档案档案处理记录状态、导入批次状态、批次文件状态、培训管理资源/需求/计划/申请/记录/材料状态、企业实践申请/年度跟踪/实践记录状态、虚拟教研活动记录/参与同步状态、报告中心报告/AI 会话状态已移除页面局部 `badge-status` / `state-pill` / `inline-status` / `file-status` / `status-text` / `status-badge` / `card-status` / `panel-status` 状态样式，改为 `<StatusBadge />` | 后续继续扫描少量展示型状态是否需要纳入统一组件 |

## 19. 下一步执行顺序

1. 继续推广 `useOperationMessage`，统一页面局部消息和 store 消息回填方式。
2. 统一状态枚举和状态文案映射。
3. 抽取状态徽章、详情抽屉、右侧摘要面板、筛选栏和表格空状态。
4. 工程重构完成后再进入管理端设计系统重构。
