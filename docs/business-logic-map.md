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
| 导入批次 | 识别中、识别完成、已确认生成记录、已取消 | `archiveStore.importBatches.status` 支持 `recognizing`、`recognized`、`confirmed` | 已完成前三类本地闭环，取消待补 |
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
| 档案处理 | 确认入档、再次退回、标记异常、查看补充说明 | 修改 `archiveStore.processingRecords`，确认入档写入 `teacherArchiveFacts` | 已完成本地闭环 |
| 档案查阅 | 查看教师档案 | `router.push('/admin/archive/teacher/:teacherId')` | 已闭环到页面 |
| 档案详情 | 来源详情抽屉 | 页面内打开抽屉，并按当前栏目合并 `archiveStore.teacherArchiveFacts` 来源记录 | 已完成本地事实来源过滤 |

### 4.5 第一批修复顺序

1. 批次取消形成明确状态。
2. 后续工程重构阶段将 `archiveStore` 拆为 domain types / initialData / actions。
3. 教师档案事实的更正、退回、草稿状态留到后续业务审计细化。

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

## 11. 重构前置结论

在开始“百万级项目”重构前，先不要按页面外观抽组件。优先按业务对象抽边界：

| 层级 | 建议方向 | 理由 |
| --- | --- | --- |
| domain types | 先抽管理端模块级业务类型和状态枚举 | 统一页面之间的状态语言 |
| mock service | 把页面内数组迁移到模块 mock service | 让跨页面状态可以共享 |
| store | 对有跨页面影响的模块建立 Pinia store | 发布、入档、申请、材料上传都需要跨页面同步 |
| components | 在业务状态稳定后再抽表格、抽屉、详情栏、状态徽章 | 避免把错误流程固化成组件 |
| design guide | 只记录稳定 token、组件模式和页面密度 | 避免设计规则变成页面说明书 |

### 11.1 当前落点

| 项目 | 当前状态 | 后续动作 |
| --- | --- | --- |
| store 目标结构 | 能力清单、成长档案、培训管理、企业实践、虚拟教研、分析报告已拆为 `domain/admin/*`、`stores/admin/<module>/initialData.ts`、`stores/admin/<module>/actions.ts`、薄 store | 后续新增业务 store 按同一结构落地 |
| domain types | 已建立 `ability-list.ts`、`archive.ts`、`training.ts`、`practice.ts`、`virtual-lab.ts`、`report.ts`、`ability-profile.ts`、`reflection.ts`；对应 store 或 mock service 已从 domain 导入业务类型 | 后续继续扫描页面内仍保留的业务 interface |
| 测试入口 | `frontend/package.json` 已增加 `npm run test`，AGENTS 已把管理端验证命令更新为 test/typecheck/build | 后续增加模块级测试约定 |
| mock service | 已建立 `frontend/src/services/mock/ability-profile.ts`、`frontend/src/services/mock/reflection.ts`，能力画像和教学反思页面已改为从 service 获取 mock 数据 | 后续继续扫描其它页面内大段 mock 数组 |

## 12. 下一步执行顺序

1. 继续扫描并迁移其它页面内大段 mock 数组到 mock service。
2. 继续迁移页面内仍保留的业务 interface 到 domain types。
3. 统一 operationMessage、状态枚举和状态文案映射。
4. 工程重构完成后再进入管理端设计系统重构。
