# 页面覆盖台账

更新时间：2026-07-03

本台账用于对齐“效果图是否已转为可运行页面”和“业务逻辑是否已闭环”。当前结论先按工程扫描建立，后续每个模块修正时逐图细化。

业务对象、状态流转和跨页面闭环统一记录在 `docs/business-logic-map.md`。本文件只保留逐图覆盖、页面映射和推进优先级。

## 总览

```txt
效果图总数：178
管理端 PC 效果图：36
教师手机端效果图：142
管理端 Vue 文件：31
教师手机端 UniApp 页面：86
```

当前只能确认：

- 管理端和手机端均可通过类型检查和构建。
- 教师手机端 `teacher-mobile/src/pages.json` 注册页面与 `teacher-mobile/src/pages/**/index.vue` 文件一一对应。
- 不能仅凭页面数量证明所有效果图都完成了逐图、逐状态覆盖。

已验证命令：

```bash
cd frontend && npm run typecheck && npm run build
cd teacher-mobile && npm run typecheck && npm run build:h5 && npm run build:mp-weixin
```

## 管理端 PC

### 模块覆盖概览

| 模块 | 效果图数 | 当前源码/路由状态 | 结论 |
| --- | ---: | --- | --- |
| 能力清单 | 7 | 已有 `ability-list` 页面与路由 | 已完成逐图源码/路由映射，待视觉截图验收和业务闭环审计 |
| 成长档案 | 7 | 已有档案处理、导入、查阅、详情页面 | 已完成逐图源码/路由映射；上传识别、处理记录、确认入档、教师档案事实和来源记录追溯均已接入本地业务状态 |
| 能力画像 | 4 | 已有群体画像、教师画像、教师详情页面 | 已确认群体画像、教师画像列表、教师详情的数据关系；按钮空动作已处理 |
| 发展活动 | 17 | 教学反思、培训、企业实践、虚拟教研均有页面 | 培训管理已完成逐图源码/路由映射和本地闭环；教学反思已完成列表-详情-问题定位审计；企业实践已完成申请-跟踪-归档主链；虚拟教研已完成教研室-活动-记录-档案沉淀主链 |
| 分析报告 | 1 | 已有报告卡片页 | 已完成报告查看、导出、重新生成、更新、AI 分析助手的本地行为闭环 |

### 逐图台账：能力清单

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版查看页.png` | `frontend/src/pages/admin/ability-list/AbilityListBasePage.vue` | `/admin/ability-list/base` | 默认页，`active-key="ability-list-base"` | 已映射；编辑指标、查看版本记录、派生执行版均已接入本地业务状态；能力树展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版优化建议.png` | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue` | `/admin/ability-list/base/optimization` | 从基准模板页 `goToOptimization()` 进入；支持建议筛选、采纳、暂缓、弃用、应用到基准模板、上传制度文件、重新分析运行反馈和查看版本记录 | 已映射；已接入优化建议到基准模板的本地闭环，上传制度文件和重新分析会写入 `abilityListStore.optimizationSuggestions`，版本记录跳回基准模板版本抽屉；建议来源和问题筛选展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png` | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | `/admin/ability-list/execution` | 默认页，`active-key="ability-list-execution"` | 已映射；当前基准页；执行版能力树展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版指标编辑抽屉.png` | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | `/admin/ability-list/execution` | 点击指标行编辑触发 `editingIndicator`，展示 `DetailSheet width="form"` | 已映射为同页抽屉状态；保存会更新 `abilityListStore.executionIndicators` 并标记为草稿调整 |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版发布确认.png` | `frontend/src/pages/admin/ability-list/AbilityListPublishConfirmPage.vue` | `/admin/ability-list/execution/publish-confirm` | 发布确认页，`publishStatus` 从 `pending` 切为 `published` | 已映射；基准模板页和执行版页均可派生下一周期执行版并进入发布确认页，发布后旧执行版进入历史版记录；发布影响卡展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜岗位与聘期要求映射.png` | `frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue` | `/admin/ability-list/execution/requirement-mapping` | 默认页，左侧对象树、中间映射表、右侧详情 | 已映射；新增、编辑、删除、确认配置均已接入 `abilityListStore.requirementMappings`；要求对象分组展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜岗位与聘期要求映射编辑抽屉.png` | `frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue` | `/admin/ability-list/execution/requirement-mapping` | 点击“编辑映射”或行内“编辑”触发 `editingMapping`，展示 `edit-drawer-overlay` | 已映射为同页抽屉状态；保存会更新 `abilityListStore.requirementMappings` |

### 逐图台账：成长档案

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜档案处理.png` | `frontend/src/pages/admin/archive/ArchiveProcessingPage.vue` | `/admin/archive/processing` | 默认页，左侧统计和筛选，中间处理记录列表，右侧记录详情 | 已映射；处理记录读取 `archiveStore.processingRecords`，确认入档、退回、异常、补充说明均已改为本地状态动作；来源选项和记录详情生成已迁入 `frontend/src/services/mock/archive.ts` |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入部门资料｜上传资料页.png` | `frontend/src/pages/admin/archive/ArchiveImportUploadPage.vue` | `/admin/archive/import` | 上传资料页，点击“开始识别”创建导入批次并进入批次详情 | 已映射；上传文件接入 `archiveStore.uploadedFiles` |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入批次详情｜识别中.png` | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue` | `/admin/archive/import/:batchId` | 批次 `status='recognizing'`；展示识别中、结果占位、刷新状态按钮 | 已映射；刷新调用 `completeArchiveBatchRecognition()`；取消调用 `cancelArchiveImportBatch()` 并形成 `cancelled` 状态 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜导入批次详情｜识别完成.png` | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue` | `/admin/archive/import/:batchId` | 批次 `status='recognized'` 或 `confirmed`；展示识别结果、查看上传文件、确认识别结果 | 已映射；确认调用 `confirmArchiveBatchRecognition()` 并生成处理记录 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜教师档案查阅.png` | `frontend/src/pages/admin/archive/ArchiveQueryPage.vue` | `/admin/archive/query` | 默认查询页，`viewMode='card'`，教师卡片列表 | 已映射；教师卡片、统计和筛选选项已迁入 `frontend/src/services/mock/archive.ts`，页面仅保留搜索、筛选和视图切换状态 |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜阅读档案详情.png` | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | `/admin/archive/teacher/:teacherId` | 从档案查阅页 `viewTeacherDetail()` 进入；档案阅读详情 | 已映射；读取 `archiveStore.teacherArchiveFacts` 展示已入档事实，打印/导出为前端模拟动作；教师名映射已迁入 `frontend/src/services/mock/archive.ts` |
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜来源详情.png` | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | `/admin/archive/teacher/:teacherId` | 点击档案详情内来源入口触发 `drawerOpen`，展示“来源记录”抽屉 | 已映射为同页抽屉状态；栏目入口按当前栏目合并 `archiveStore` 中已入档事实，已入档事实卡片入口按当前点击事实精确过滤来源记录；默认来源记录已迁入 `frontend/src/services/mock/archive.ts` |

### 逐图台账：培训管理

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜资源库.png` | `frontend/src/pages/admin/training/TrainingResourcePage.vue` | `/admin/training/resources` | 默认资源库页，资源列表、右侧资源摘要、筛选和新增本地状态 | 已映射；资源读取 `trainingStore.resources`，新增资源草稿写入共享状态 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜需求管理.png` | `frontend/src/pages/admin/training/TrainingDemandPage.vue` | `/admin/training/demands` | 默认需求管理页，需求表格、右侧需求摘要、待匹配筛选 | 已映射；新增需求、匹配资源已接入 `trainingStore.demands` |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜申请处理.png` | `frontend/src/pages/admin/training/TrainingApplicationPage.vue` | `/admin/training/applications` | 默认申请处理页，申请表格、右侧申请摘要、同意和退回处理 | 已映射；同意/退回接入 `trainingStore.applications` 并同步计划详情参与名单 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜记录总览.png` | `frontend/src/pages/admin/training/TrainingRecordPage.vue` | `/admin/training/records` | 默认记录总览页，记录表格、材料状态筛选 | 已映射；记录读取 `trainingStore.records`，详情上传证书后可同步材料状态 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训记录详情.png` | `frontend/src/pages/admin/training/TrainingRecordDetailPage.vue` | `/admin/training/records/:recordId` | 从记录总览 `viewDetail()` 进入；记录详情、总结和证书材料 | 已映射；上传证书写入 `trainingStore.records`，并生成成长档案待确认处理记录；学习记录、总结和相关记录展示数据已迁入 `frontend/src/services/mock/training.ts` |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训计划｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanPage.vue` | `/admin/training/plans` | 默认计划管理页，计划表格、提醒、相关计划筛选 | 已映射；计划读取 `trainingStore.plans`，页面名为计划管理，效果图称“培训计划｜附属流程”；筛选选项、提醒和新建计划选项已迁入 `frontend/src/services/mock/training.ts` |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜新建培训计划｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanPage.vue` | `/admin/training/plans` | 点击“新建培训计划”触发 `showDrawer`，展示 `DetailSheet md` 新建计划抽屉 | 已映射为同页抽屉状态；保存草稿/发布会插入 `trainingStore.plans` |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训计划详情｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanDetailPage.vue` | `/admin/training/plans/:planId` | 从计划管理 `viewDetail()` 进入；计划基本信息、关联需求、安排、参与教师 | 已映射；计划详情读取同一计划数据，申请处理状态可同步参与教师；日程、材料要求、关联需求和进度节点展示数据已迁入 `frontend/src/services/mock/training.ts` |

### 逐图台账：教学反思

| 效果图/页面 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| 教学反思总览 | `frontend/src/pages/admin/reflection/ReflectionOverviewPage.vue` | `/admin/reflection` | 反思记录列表、筛选、共性观察、相关记录过滤 | 已映射；支持接收 `keyword` query 并按共性问题过滤 |
| 教学反思详情 | `frontend/src/pages/admin/reflection/ReflectionDetailPage.vue` | `/admin/reflection/:reflectionId` | 反思内容、来源数据、相关反思、记录去向 | 已映射；来源数据页面内反馈，相关反思和更多相关记录均已闭环到详情或列表 |

### 逐图台账：企业实践

| 效果图/页面 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| 年度实践跟踪 | `frontend/src/pages/admin/practice/PracticeTrackingPage.vue` | `/admin/practice/tracking` | 年度完成情况、当前办理情况、教师实践跟踪列表 | 已映射；读取 `practiceStore.trackings`，申请同意和归档会同步跟踪状态 |
| 申请处理 | `frontend/src/pages/admin/practice/PracticeApplicationPage.vue` | `/admin/practice/applications` | 实践申请列表、筛选、同意、退回 | 已映射；申请同意/退回写入 `practiceStore.applications` 并同步跟踪和记录 |
| 记录总览 | `frontend/src/pages/admin/practice/PracticeRecordPage.vue` | `/admin/practice/records` | 实践记录列表、材料状态、确认归档 | 已映射；确认归档写入 `practiceStore.records`，并生成成长档案待确认处理记录 |

### 逐图台账：虚拟教研

| 效果图/页面 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| 虚拟教研室列表 | `frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue` | `/admin/virtual-lab` | 教研室统计、筛选、卡片/表格视图、查看详情 | 已映射；读取 `virtualLabStore.rooms`，新增教研室草稿写入共享状态 |
| 虚拟教研室详情 | `frontend/src/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue` | `/admin/virtual-lab/rooms/:roomId` | 教研室基本信息、成员、近期活动、已形成记录 | 已映射；按 `roomId` 读取成员、活动、记录，邀请教师/移出成员/新建活动均写入 `virtualLabStore` |
| 教研活动详情 | `frontend/src/pages/admin/virtual-lab/VirtualLabActivityDetailPage.vue` | `/admin/virtual-lab/activities/:activityId` | 活动信息、会议参与、活动资料、已形成记录、时间线 | 已映射；按 `activityId` 读取活动，未形成记录时可生成教研记录并进入记录详情；会议参与和时间线展示数据已迁入 `frontend/src/services/mock/virtual-lab.ts` |
| 教研记录详情 | `frontend/src/pages/admin/virtual-lab/VirtualLabRecordDetailPage.vue` | `/admin/virtual-lab/records/:recordId` | 记录正文、参与记录、来源资料、来源活动 | 已映射；按 `recordId` 读取记录，来源活动真实跳转，生成档案待确认会写入 `archiveStore.processingRecords`；记录正文和参与记录展示数据已迁入 `frontend/src/services/mock/virtual-lab.ts` |

### 逐图台账：分析报告

| 效果图/页面 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| 分析报告中心 | `frontend/src/pages/admin/reports/ReportCenterPage.vue` | `/admin/reports` | 报告卡片、筛选、详情面板、AI 分析会话 | 已映射；读取 `reportStore.reports`，对象/周期/状态/搜索筛选均绑定报告数据，查看/查看大屏/查看原因打开同页面板，导出/更新/重新生成/继续分析/继续追问/AI 助手均写入共享状态 |

### 已处理问题

| 日期 | 问题 | 位置 | 处理 |
| --- | --- | --- | --- |
| 2026-07-02 | `/admin/archive/import` 路由重复 | `frontend/src/router/admin.routes.ts` | 删除无菜单入口、无效果图对应的“教师档案总览”占位路由，保留导入上传页 |
| 2026-07-02 | 能力清单执行版编辑、派生、发布仅页面局部状态 | `frontend/src/pages/admin/ability-list/*` | 新增 `frontend/src/stores/admin/abilityListStore.ts`，执行版指标编辑、下一周期派生、发布确认共享本地业务状态 |
| 2026-07-02 | 优化建议采纳后不能应用到基准模板 | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue`、`AbilityListBasePage.vue` | 优化建议改为共享业务状态，采纳后进入待应用集合，应用后写入基准模板指标 |
| 2026-07-02 | 基准模板编辑、版本记录和要求映射仍有局部状态 | `frontend/src/pages/admin/ability-list/*` | 基准模板编辑、版本记录、历史版、要求映射均已接入 `abilityListStore`，并补充 store 单测 |
| 2026-07-03 | 优化基准模板页“上传制度文件 / 重新分析 / 查看版本记录”仍只是提示 | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue`、`frontend/src/stores/admin/abilityListStore.ts` | 上传制度文件和重新分析已写入 `abilityListStore.optimizationSuggestions`，查看版本记录跳转基准模板并打开版本记录抽屉；已补 store 单测 |
| 2026-07-02 | 成长档案上传识别、确认结果、处理动作没有跨页面业务状态 | `frontend/src/pages/admin/archive/*` | 新增 `frontend/src/stores/admin/archiveStore.ts`，上传文件、导入批次、识别结果、处理记录、入档事实均接入本地业务状态 |
| 2026-07-02 | 导入批次“取消本次任务”只返回档案处理页，未形成取消状态 | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue`、`frontend/src/stores/admin/archiveStore.ts` | 新增 `cancelled` 批次状态和 `cancelArchiveImportBatch()`，取消后文件状态改为“已取消”，不生成处理记录 |
| 2026-07-02 | 教师档案详情不读取处理页确认入档事实 | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | 档案详情读取 `archiveStore.teacherArchiveFacts`，来源抽屉支持栏目合并来源，也支持从已入档事实卡片按当前点击事实过滤对应来源 |
| 2026-07-03 | 成长档案 B 项闭环复核需要对齐台账顶部结论 | `frontend/src/stores/admin/archiveStore.ts`、`frontend/src/pages/admin/archive/*`、`docs/page-coverage-ledger.md` | 已复核 `archiveStore` 上传文件、导入批次、识别结果、处理记录、教师档案事实和来源记录链路；`npm run test -- archiveStore` 1 个测试文件 / 7 个用例通过 |
| 2026-07-03 | 成长档案来源详情需要按当前点击事实精确过滤，不只按栏目合并来源 | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`docs/business-logic-map.md` | 已补 B20；资料来源与更正记录中的已入档事实卡片可直接打开该事实来源记录，抽屉按 `fact.id` 过滤 `archiveStore` 来源；`npm run test` 24 个测试文件 / 207 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-02 | 培训管理资源、需求、计划、申请、记录材料均为页面局部状态 | `frontend/src/pages/admin/training/*` | 新增 `frontend/src/stores/admin/trainingStore.ts`，资源草稿、需求匹配、计划草稿/发布、申请处理、记录材料和成长档案沉淀均接入共享状态 |
| 2026-07-03 | 培训管理 C 项闭环复核需要同步当前验证结果 | `frontend/src/stores/admin/trainingStore.ts`、`frontend/src/pages/admin/training/*`、`docs/business-logic-map.md` | 已复核 `trainingStore` 资源、需求、计划、申请、记录材料和成长档案待确认处理记录链路；`npm run test -- trainingStore` 1 个测试文件 / 6 个用例通过；业务地图已移除过期的“后续拆 store”表述 |
| 2026-07-03 | 培训记录完整后生成成长档案待确认记录的口径需要在操作反馈中可见 | `frontend/src/stores/admin/training/actions.ts`、`frontend/src/pages/admin/training/TrainingRecordDetailPage.vue`、`frontend/src/stores/admin/trainingStore.test.ts`、`docs/business-logic-map.md` | 已补 C23；上传培训证书后，记录状态变为完整，生成 `archiveStore.processingRecords` 待确认记录，页面反馈通过 `trainingStore.operationMessage` 明确提示“成长档案待确认记录”；`npm run test` 24 个测试文件 / 207 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 分析报告中心“周期”筛选只有控件，没有绑定报告业务数据 | `frontend/src/domain/admin/report.ts`、`frontend/src/stores/admin/report/initialData.ts`、`frontend/src/pages/admin/reports/ReportCenterPage.vue` | 已补 D10-D11；`ReportCard` 增加 `period`，报告中心周期筛选和详情展示读取该字段，补 store 与页面 guardrail 测试 |
| 2026-07-02 | 能力画像群体页存在 `console.log` 空动作 | `frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue` | “查看完整建议”跳教师画像重点支持筛选；教师对象跳画像详情；院系/专业对象给出页面内降级提示 |
| 2026-07-03 | 能力画像 D1-D3 需要复核业务地图、数据关系和按钮动作 | `frontend/src/pages/admin/ability-profile/*`、`frontend/src/services/mock/ability-profile.ts`、`docs/business-logic-map.md` | 已复核群体画像、教师画像列表、教师画像详情三层关系；按钮 `console.log` 命中 0；教师对象真实跳转，院系/专业为明确降级提示；展示数据已迁入 mock service，业务类型已迁入 domain |
| 2026-07-03 | 教师画像列表分页总数和页码仍为硬编码展示 | `frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`docs/business-logic-map.md` | 已补 D1-D3 分页闭环；总数、页码和当前页数据全部绑定 `filteredTeachers`，筛选后重置页码，上一页/下一页/页码按钮均有明确状态动作；`npm run test -- src/pages/admin/adminVisualActions.test.ts` 1 个测试文件 / 54 个用例通过 |
| 2026-07-02 | 教学反思详情“查看更多相关记录”跳列表但列表不读取问题关键词 | `frontend/src/pages/admin/reflection/*` | 反思总览读取 `keyword` query，并显示当前问题定位提示；共性观察筛选和详情更多相关记录形成闭环 |
| 2026-07-03 | 教学反思 D4-D5 需要复核列表、详情、来源数据和相关记录闭环 | `frontend/src/pages/admin/reflection/*`、`frontend/src/domain/admin/reflection.ts`、`frontend/src/services/mock/reflection.ts`、`docs/business-logic-map.md` | 已复核列表筛选、详情跳转、来源数据页面内反馈、相关详情跳转和更多相关记录 keyword 回流；按钮 `console.log` 命中 0；展示数据已迁入 mock service，业务类型已迁入 domain |
| 2026-07-03 | 教学反思详情显示“已进入成长档案”但未写入档案处理记录 | `frontend/src/stores/admin/reflectionStore.ts`、`frontend/src/pages/admin/reflection/ReflectionDetailPage.vue`、`frontend/src/stores/admin/reflectionStore.test.ts`、`docs/business-logic-map.md` | 已补 D5 反思沉淀闭环；详情页改为生成成长档案待确认记录，调用 `sendReflectionToArchive()` 写入 `archiveStore.processingRecords`，不直接入档；`npm run test -- src/stores/admin/reflectionStore.test.ts` 1 个测试文件 / 1 个用例通过 |
| 2026-07-02 | 企业实践申请、跟踪、记录归档为页面局部状态 | `frontend/src/pages/admin/practice/*` | 新增 `frontend/src/stores/admin/practiceStore.ts`，申请同意/退回、年度跟踪、记录归档和成长档案待确认记录均接入共享状态 |
| 2026-07-03 | 企业实践“查看记录/查看档案”仍停留在当前表格定位 | `frontend/src/pages/admin/practice/*`、`frontend/src/pages/admin/archive/ArchiveProcessingPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`docs/business-logic-map.md` | 已补 D6-D7 跨页闭环；已同意申请和年度跟踪可跳实践记录总览指定记录，已归档记录可跳成长档案处理页指定 `practice-*` 待确认记录；`npm run test -- src/pages/admin/adminVisualActions.test.ts` 1 个测试文件 / 54 个用例通过 |
| 2026-07-02 | 虚拟教研室、活动、记录和档案沉淀为页面局部状态 | `frontend/src/pages/admin/virtual-lab/*` | 新增 `frontend/src/stores/admin/virtualLabStore.ts`，教研室、成员、活动、记录和成长档案待确认记录均接入共享状态 |
| 2026-07-03 | 虚拟教研记录生成档案待确认后仍停留在记录详情页 | `frontend/src/pages/admin/virtual-lab/VirtualLabRecordDetailPage.vue`、`frontend/src/pages/admin/archive/ArchiveProcessingPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`docs/business-logic-map.md` | 已补 D8-D9 档案沉淀跨页闭环；记录详情生成 `virtual-lab-*` 待确认记录后跳成长档案处理页并选中该记录；`npm run test -- src/pages/admin/adminVisualActions.test.ts` 1 个测试文件 / 54 个用例通过 |
| 2026-07-02 | 分析报告按钮只写页面提示，导出、查看、生成、AI 助手行为不明确 | `frontend/src/pages/admin/reports/ReportCenterPage.vue` | 新增 `frontend/src/stores/admin/reportStore.ts`，报告详情、导出状态、重新生成/更新、AI 分析会话均接入共享状态 |
| 2026-07-02 | `/admin/system` 只有占位页且无管理端效果图对应 | `frontend/src/router/admin.routes.ts`、`frontend/src/components/layout/AdminSidebar.vue` | 删除系统管理占位路由、侧边栏入口和 `AdminPlaceholderPage.vue` |
| 2026-07-02 | 培训资源存在未挂路由页面 | `frontend/src/pages/admin/training/ResourceLibraryPage.vue` | 保留已映射效果图的 `TrainingResourcePage.vue`，删除未挂路由旧页面 |
| 2026-07-02 | 手机端待办页面数量已对应效果图，但证书确认、修改、移出和入档结果缺少业务地图 | `teacher-mobile/src/pages/todo/*` | 已补 `docs/business-logic-map.md` 第 11 节，明确对象、状态、主流程、页面动作和未闭环点 |
| 2026-07-02 | 手机端档案 54 张效果图只有 2 个档案主体页面，且跨模块入档结果未回到统一档案事实 | `teacher-mobile/src/pages/archive/*`、`teacher-mobile/src/pages/activity/*`、`teacher-mobile/src/pages/todo/*` | 已补 `docs/business-logic-map.md` 第 12 节，明确档案信息架构、状态口径、页面动作和入档口径缺口 |
| 2026-07-02 | 手机端培训活动页面已覆盖，但申请、总结、归档和需求未与管理端培训管理、成长档案状态对齐 | `teacher-mobile/src/pages/activity/training*` | 已补 `docs/business-logic-map.md` 第 13 节，明确培训对象、状态、主流程、页面动作和跨端对齐口径 |
| 2026-07-02 | 手机端教学反思页面已覆盖，但开始方式、依据选择、草稿和确认记录缺少统一状态 | `teacher-mobile/src/pages/activity/reflection*` | 已补 `docs/business-logic-map.md` 第 14 节，明确反思对象、状态、主流程、页面动作和管理端对齐口径 |
| 2026-07-02 | 手机端企业实践页面已覆盖，但计划、日志、补充材料、归档和入档结果缺少统一状态 | `teacher-mobile/src/pages/activity/enterprise*` | 已补 `docs/business-logic-map.md` 第 15 节，明确企业实践对象、状态口径、主流程、页面动作和管理端 `practiceStore` / `archiveStore` 对齐关系 |
| 2026-07-03 | 手机端虚拟教研页面已覆盖，但邀请、活动、贡献确认、阶段材料、归档和档案沉淀缺少统一状态 | `teacher-mobile/src/pages/activity/virtual-research*` | 已补 `docs/business-logic-map.md` 第 16 节，明确虚拟教研对象、状态口径、主流程、页面动作和管理端 `virtualLabStore` / `archiveStore` 对齐关系 |
| 2026-07-03 | 手机端各模块“提交成功 / 归档成功 / 已入档”口径不一致 | `docs/business-logic-map.md` | 已补第 17 节，统一待办、档案、培训、反思、企业实践、虚拟教研到管理端对象映射、材料提交、审批结果和入档结果口径 |
| 2026-07-03 | 手机端档案首页和待办证书结果页仍有入口停留在 toast 或无动作 | `teacher-mobile/src/pages/archive/*`、`teacher-mobile/src/pages/todo/certificate-*` | 档案首页搜索进入查询页，分类进入分类概览，最近入档和查看全部进入记录详情 / 列表；档案查询页支持本页清空和分类筛选；证书详情确认 / 移出分别进入入档成功和已移出结果页；入档成功“查看个人发展”按 `recordId` 进入详情页 |
| 2026-07-03 | 手机端档案记录详情缺少统一承接页，导致查询结果和个人发展入档结果只能停在查询页 | `teacher-mobile/src/pages/archive/record-detail/index.vue`、`teacher-mobile/src/pages.json` | 已新增 `pages/archive/record-detail/index` 并注册路由；档案查询记录点击、待办证书入档成功和活动归档结果页均按 `recordId` 进入详情页；新增 `npm run test:archive-detail` 守卫路由、入口和同源记录 |
| 2026-07-03 | 手机端培训、企业实践、虚拟教研结果页仍没有统一档案详情入口 | `teacher-mobile/src/pages/activity/*archive*`、`teacher-mobile/src/pages/archive/record-detail/index.vue` | 培训归档结果、企业实践已入档、虚拟教研归档结果和 V1 归档结果均已接入 `pages/archive/record-detail/index`；详情页支持 `pending-verify` 归档确认中状态；`test:archive-detail` 已纳入这些入口守卫 |
| 2026-07-03 | 手机端档案 54 张效果图缺少逐图补页、合并和移出判定 | `效果图/教师手机端/1档案`、`teacher-mobile/src/pages/archive/*` | 已补 M-01 档案 54 张效果图补页清单，明确 2 张保留已有、18 张合并状态、27 张补页、7 张移出教师端 |
| 2026-07-03 | 手机端档案 27 个补页项如果逐图建页会造成页面膨胀 | `docs/page-coverage-ledger.md` | 已补 M-02 档案统一路由命名草案，将 27 个补页项收敛为 12 个新增路由和 2 个保留路由 |
| 2026-07-03 | 手机端档案 12 个新增路由如果直接按页面写会复制分类卡、记录卡、详情块和更正材料结构 | `docs/page-coverage-ledger.md`、`teacher-mobile/src/pages/archive/*` | 已补 M-03 档案统一组件边界，后续补页按 5 个语义组件拆分 |
| 2026-07-03 | 手机端“我的能力画像”只有我的主页摘要卡和按钮文案，未形成独立画像详情页面 | `效果图/教师手机端/3我的`、`teacher-mobile/src/pages/profile/index.vue` | 已补 M-04 我的能力画像页面策略，判定新增 `pages/profile/ability-profile/index` |
| 2026-07-03 | 手机端“画像用到的记录”有独立效果图，但不能和档案记录列表职责混在一起 | `效果图/教师手机端/3我的`、`docs/page-coverage-ledger.md` | 已补 M-05 画像用到的记录页面策略，判定新增 `pages/profile/ability-profile/records/index`，详情仍回到档案记录详情 |
| 2026-07-03 | 手机端“个人发展报告”只有我的主页报告摘要，未形成教师个人报告详情页 | `效果图/教师手机端/3我的`、`teacher-mobile/src/pages/profile/index.vue` | 已补 M-06 个人发展报告页面策略，判定新增 `pages/profile/development-report/index` |
| 2026-07-03 | 手机端“目标岗位对照”未见独立路由，且不能只作为能力画像详情的一个分段 | `效果图/教师手机端/3我的`、`docs/business-logic-map.md` | 已补 M-07 目标岗位对照页面策略，判定新增 `pages/profile/target-position/index` |
| 2026-07-03 | 手机端“聘期要求对照”未见独立路由，且和目标岗位对照的时间口径不同 | `效果图/教师手机端/3我的`、`docs/business-logic-map.md` | 已补 M-08 聘期要求对照页面策略，判定新增 `pages/profile/tenure-requirement/index` |
| 2026-07-03 | 手机端 AI 助手有底部一级入口和独立效果图，但 TabBar 当前错误指向活动首页 | `效果图/教师手机端/4AI助手`、`teacher-mobile/src/components/MobileTabBar.vue` | 已补 M-09 AI 助手一级入口策略，判定保留独立 tab 并新增 `pages/assistant/index` |
| 2026-07-03 | 手机端 AI 助手 TabBar 仍指向活动首页，一级入口无法进入真实 AI 助手页面 | `teacher-mobile/src/components/MobileTabBar.vue`、`teacher-mobile/src/pages.json`、`teacher-mobile/src/pages/assistant/index.vue` | 已补 M-10，新增 AI 助手首页、注册 `pages/assistant/index`，并将 TabBar 指向 `/pages/assistant/index` |
| 2026-07-03 | 手机端 AI 助手“补充档案”效果图未对应独立页面 | `效果图/教师手机端/4AI助手`、`teacher-mobile/src/pages/assistant/archive-supplement/index.vue` | 已补 M-11，新增补充档案页面，提交后进入待核验结果页，不直接生成正式档案事实 |
| 2026-07-03 | 手机端 AI 助手“补充档案已提交”效果图未对应结果页 | `效果图/教师手机端/4AI助手`、`teacher-mobile/src/pages/assistant/archive-supplement-submitted/index.vue` | 已补 M-12，新增提交结果页，明确“待核验 / 档案待确认”口径，并提供返回档案和 AI 助手入口 |
| 2026-07-03 | 手机端补页后注册数量和页面文件数量需要重新校验 | `teacher-mobile/src/pages.json`、`teacher-mobile/src/pages/**/*` | 已补 V-01，当前注册页面 86 个、页面文件 86 个，无注册缺失文件、无未注册页面文件 |
| 2026-07-03 | 手机端新增 AI 助手页面需要确认从现有入口可达 | `teacher-mobile/src/components/MobileTabBar.vue`、`teacher-mobile/src/pages/assistant/*` | 已补 V-02，TabBar 可进入 AI 助手首页，首页可进入补充档案，提交后可进入结果页，结果页可返回档案或 AI 助手 |
| 2026-07-03 | 手机端补页后需要重新执行类型检查 | `teacher-mobile` | 已补 V-03，`npm run typecheck` 通过 |
| 2026-07-03 | 手机端补页后需要重新执行 H5 构建 | `teacher-mobile` | 已补 V-04，`npm run build:h5` 通过；仍存在既有 npm `disturl` 和 Sass deprecation warning |
| 2026-07-03 | 手机端补页后需要重新执行微信小程序构建 | `teacher-mobile` | 已补 V-05，`npm run build:mp-weixin` 通过；仍存在既有 npm `disturl` 和 Sass deprecation warning |
| 2026-07-03 | 手机端补页、注册、入口和验证结果需要回写台账 | `docs/page-coverage-ledger.md` | 已补 V-06，台账已同步 86 个注册页面、AI 助手页面状态、V-01 至 V-05 验证结果 |
| 2026-07-03 | 手机端培训归档结果页只进入静态详情，提交动作未显式生成待核验记录 | `teacher-mobile/src/domain/archive.ts`、`teacher-mobile/src/pages/activity/training-summary/index.vue`、`teacher-mobile/src/pages/activity/training-archive-result/index.vue` | 已补 G9-04；提交归档调用 `createTrainingArchiveRecord()` 生成 / 定位 `pending-verify` 档案记录，结果页可进入记录详情和档案待确认列表；新增 `npm run test:training-archive` |
| 2026-07-03 | 手机端企业实践归档等待确认和补充已提交停留在提示或静态结果 | `teacher-mobile/src/domain/archive.ts`、`teacher-mobile/src/pages/activity/enterprise-archive-result/index.vue`、`teacher-mobile/src/pages/activity/enterprise-supplement-submitted/index.vue` | 已补 G11-05；等待确认和补充提交结果调用 `createEnterprisePracticeArchiveRecord()` 生成 / 定位 `pending-verify` 档案记录，可进入记录详情和档案待确认列表；新增 `npm run test:enterprise-archive` |
| 2026-07-03 | 管理端剩余页面需复扫 `console.log` 空动作 | `frontend/src/pages/admin/**/*.vue` | 已补 D-01，当前管理端页面源码 `console.log` 命中数为 0 |
| 2026-07-03 | 管理端剩余 `operationMessage` 需要区分真实动作和降级提示 | `frontend/src/pages/admin/**/*.vue`、`docs/page-coverage-ledger.md` | 已补 D-02，当前管理端页面源码 `operationMessage.set/fromStore` 共 46 处，已按真实状态、页面选择筛选、真实跳转、降级提示分类 |
| 2026-07-03 | 管理端需复扫未挂路由页面，避免废弃页面干扰台账 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/router/admin.routes.ts` | 已补 D-03，当前管理端页面文件 30 个、路由动态导入 30 个，无未挂路由页面、无路由缺失文件；`ability-profile/components/SimpleRadarChart.vue` 为组件不计页面 |
| 2026-07-03 | 管理端需复扫占位路由，避免无效果图入口残留 | `frontend/src/router/admin.routes.ts`、`frontend/src/pages/admin` | 已补 D-04，当前未发现 `/admin/system`、`AdminPlaceholderPage`、`ResourceLibraryPage.vue` 等占位/废弃页面或路由残留 |
| 2026-07-03 | 管理端需复扫页面内业务 `interface/type`，避免业务模型继续散落页面 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/domain/admin/*` | 已补 D-05，当前仅 `SimpleRadarChart.vue` 保留 2 个组件 props 类型；页面业务类型均已迁入 domain 或从 store/domain 导入 |
| 2026-07-03 | 管理端需复扫页面内大段 mock 数组，避免页面继续承载展示数据源 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/services/mock/*` | 已补 D-06，当前页面内仅 4 个 1 行 UI 选项数组，无超过 5 行的大段 mock 数组；稳定展示 mock 已迁入 services/mock |
| 2026-07-03 | 管理端需复扫状态文案和状态样式映射，避免页面局部口径发散 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/domain/admin/*`、`frontend/src/components/common/StatusBadge.vue` | 已补 D-07，当前管理端页面状态相关命中 20 个文件、46 处；稳定业务状态由 domain helper 或 `<StatusBadge />` 承接，页面剩余 `classMap` 等为等级、步骤、分布条等展示型样式 |
| 2026-07-03 | 业务地图重构前置结论需要同步 D-01 至 D-07 最新审计结果 | `docs/business-logic-map.md` | 已补 D-08，当前落点已同步 store、domain types、mock service、路由、operationMessage、状态映射和状态徽章现状 |
| 2026-07-03 | 页面覆盖台账风险表需要把已处理扫描项和仍待处理风险分开 | `docs/page-coverage-ledger.md` | 已补 D-09，管理端待处理问题仅保留真实未闭环风险，D-01 至 D-08 的扫描项转为已处理审计记录 |
| 2026-07-03 | 管理端收尾后需要执行最终验证 | `frontend` | 已补 D-10，`npm run test` 18 个测试文件 / 118 个用例通过，`npm run typecheck` 通过，`npm run build` 通过；仍有既有 npm `disturl` warning |
| 2026-07-03 | 管理端表格空状态重复分散，适合作为组件收敛低风险试点 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/components/common/EmptyState.vue` | 已补 E15-01 至 E15-03，扫描空状态命中 35 处；新增 `EmptyState` 并迁移培训、企业实践、能力清单、反思概览、报告中心、虚拟教研室共 14 个空状态点，筛选和业务状态不变；`npm run test` 19 个测试文件 / 123 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 管理端视觉态按钮需要统一处理，避免无动作按钮被误判为业务闭环 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E16-01 至 E16-03；能力清单执行版基准版、档案处理当前筛选改为只读 `span`；档案查阅搜索按钮接入真实过滤；能力画像“查看更多对象”改为明确降级提示；新增 `adminVisualActions.test.ts` 约束空按钮不回归；`npm run test` 20 个测试文件 / 125 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 管理端静态分页占位仍使用可点击按钮，容易被误判为已接入翻页闭环 | `frontend/src/pages/admin/training/TrainingResourcePage.vue`、`frontend/src/pages/admin/training/TrainingApplicationPage.vue`、`frontend/src/pages/admin/training/TrainingRecordPage.vue`、`frontend/src/pages/admin/practice/PracticeApplicationPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E16-04；培训资源、培训申请、培训记录、企业实践申请的静态分页页码和上一页/下一页占位改为只读 `span`，当前页增加 `aria-current="page"`；未新增分页业务逻辑，避免把视觉分页标记为业务闭环 |
| 2026-07-03 | 管理端顶栏范围、年度和消息数尚未接入切换或消息中心，不应伪装成可点击控件 | `frontend/src/components/layout/AdminTopbar.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 E16-05；顶栏“全校”“2026 年度”和消息数改为只读 `span`，消息数使用 `role="status"` 和明确 `aria-label`；未新增全局筛选或消息中心业务，后续若接入真实交互需补状态和路由闭环 |
| 2026-07-03 | 虚拟教研室详情页三处 disabled 分页按钮仍会造成“已有分页控件”的误判 | `frontend/src/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 E16-06；成员、近期教研活动、已形成记录三处分页占位改为只读 `span`，当前页增加 `aria-current="page"`；保留总数和每页展示文案，不新增真实翻页逻辑 |
| 2026-07-03 | 视觉态按钮治理需要从逐点约束升级为全局防回归，避免新增页面重新引入无动作原生按钮 | `frontend/src/pages/admin/adminVisualActions.test.ts`、`frontend/src/pages/admin/**/*.vue`、`frontend/src/components/**/*.vue`、`frontend/docs/admin-design-system-guide.md` | 已补 E16-07；新增 `adminVisualSources` 跨页面/关键组件 guardrail，扫描原生 `<button>` 必须具备 `@click`、禁用态或表单提交语义；当前覆盖管理端 29 个页面和 6 个关键组件，`adminVisualActions.test.ts` 59 个用例通过 |
| 2026-07-03 | 管理端需要建立模块级测试约定，避免 store、domain、页面源码测试职责混乱 | `frontend/docs/admin-design-system-guide.md`、`docs/business-logic-map.md`、`frontend/src/**/*test.ts` | 已补 E17-01 至 E17-03；当前管理端共有 20 个测试文件，能力清单、成长档案、培训、企业实践、分析报告、虚拟教研均有 store 行为测试；practice/report/virtual-lab 已补 structure 测试；新增公共组件 `EmptyState` 已有 props/事件测试；页面 raw guardrail 用于路由、空状态、视觉态按钮，不替代 store 行为测试 |
| 2026-07-03 | 拆分后的 admin store structure test 覆盖不完整，需要防止只拆文件不补注入式测试 | `frontend/src/stores/admin/adminStoreStructure.test.ts`、`frontend/src/stores/admin/abilityListStore.structure.test.ts`、`frontend/src/stores/admin/archiveStore.structure.test.ts`、`frontend/src/stores/admin/trainingStore.structure.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 E17-04；能力清单、成长档案、培训管理已补 structure 测试，当前六个拆分 store 均覆盖 `initialData/actions` 注入 state 行为；新增 `adminStoreStructure.test.ts` 扫描所有拆分 store，防止后续漏补结构测试 |
| 2026-07-03 | Store 行为需要有独立 Vitest 脚本入口，方便业务闭环重构阶段快速验证 | `frontend/package.json`、`frontend/src/stores/admin/**/*test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 E18；新增 `npm run test:stores`，专门执行 `vitest run src/stores/admin`；E19 的 `npm run test` 和 E20 的 AGENTS 管理端验证命令已存在；`npm run test:stores` 9 个测试文件 / 47 个用例通过，`npm run test` 20 个测试文件 / 125 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 管理端设计系统重构前需要先扫描重复颜色、阴影、圆角和间距 | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/docs/admin-design-system-guide.md` | 已补 F1/F2；当前扫描 50 个 `.vue/.css` 文件，颜色高频项为 `#1268f6` 147 次、`#17233d` 108 次、`#0f5eef` 78 次、`#dce6f5` 64 次；阴影高频项为卡片弱阴影 21/16/11 次；圆角高频项为 `8px` 95 次、`6px` 92 次；间距高频项为 `16px` 71 次、`12px` 65 次、`8px` 63 次 |
| 2026-07-03 | 第一批 CSS variables 需要先落地，作为后续替换硬编码的稳定入口 | `frontend/src/styles/tokens.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-01；新增管理端高频色值、阴影和间距 token，当前只建立变量不替换页面硬编码；新增 `tokens.test.ts` 约束第一批 token 不回退；`npm run test` 21 个测试文件 / 127 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 高频主色硬编码需要先替换为 CSS variable，降低后续主题维护成本 | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts` | 已补 F3-02；页面和组件样式中的 `#1268f6` 147 处已替换为 `var(--color-admin-primary)`；`tokens.test.ts` 已增加扫描防回退；辅助主色 `#0f5eef` 已在 F3-08 替换；`npm run test` 21 个测试文件 / 128 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 高频文本色硬编码需要先替换为 CSS variable，降低后续文字层级维护成本 | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts` | 已补 F3-03；页面和组件样式中的 `#17233d` 108 处、`#172b55` 46 处、`#66758f` 30 处已分别替换为 `var(--color-admin-text-strong)`、`var(--color-admin-text-title)`、`var(--color-admin-text-muted)`；`tokens.test.ts` 已增加扫描防回退；辅助文本色 `#405985` 已在 F3-08 替换；`npm run test` 21 个测试文件 / 131 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 高频边框和分割线色硬编码需要替换为 CSS variable，降低卡片、表格和抽屉层级维护成本 | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts` | 已补 F3-04；页面和组件样式中的 `#dce6f5` 65 处、`#d9e5f7` 44 处、`#e5edf8` 25 处已分别替换为 `var(--color-admin-border)`、`var(--color-admin-border-muted)`、`var(--color-admin-divider)`；`tokens.test.ts` 已增加扫描防回退；`npm run test` 21 个测试文件 / 134 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 高频背景色硬编码需要替换为 CSS variable，降低页面底色、弱卡片底色和渐变色阶维护成本 | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts` | 已补 F3-05；页面和全局样式中的 `#f6f9ff` 27 处、`#f8fbff` 19 处已分别替换为 `var(--color-admin-bg)`、`var(--color-admin-bg-soft)`；`tokens.test.ts` 已增加扫描防回退；`npm run test` 21 个测试文件 / 136 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 胶囊标签圆角硬编码需要替换为 CSS variable，先收敛低风险圆角形态 | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts` | 已补 F3-06；页面、组件和覆盖样式中的 `border-radius: 999px` 14 处已替换为 `border-radius: var(--radius-full)`；`tokens.test.ts` 已增加扫描防回退；头像、插画、响应式 `clamp(...)` 和特殊装饰圆角保留局部口径；`npm run test` 21 个测试文件 / 141 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 高频卡片弱阴影和主按钮强调阴影需要替换为 CSS variable，降低页面层级维护成本 | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts` | 已补 F3-07；页面样式中的卡片弱阴影 22/17/12 处和主按钮强调阴影 6 处已分别替换为 `var(--shadow-admin-card-soft)`、`var(--shadow-admin-card-subtle)`、`var(--shadow-admin-card-faint)`、`var(--shadow-admin-primary-action)`；`tokens.test.ts` 已增加扫描防回退；`npm run test` 21 个测试文件 / 140 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 辅助主色和辅助文本色仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-08；页面样式中的 `#0f5eef` 和 `#405985` 已分别替换为 `var(--color-admin-primary-hover)`、`var(--color-admin-text-subtle)`；`tokens.test.ts` 已增加扫描防回退；`npm run test` 24 个测试文件 / 198 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 小控件圆角仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-09；页面样式中的 `border-radius: 6px` 已替换为 `border-radius: var(--radius-sm)`；`tokens.test.ts` 已增加扫描防回退；`npm run test` 24 个测试文件 / 199 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 大卡片和浮层圆角仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-10；页面样式中的 `border-radius: 12px` 已替换为 `border-radius: var(--radius-lg)`，顶部复合圆角改为 `var(--radius-lg) var(--radius-lg) 0 0`；`tokens.test.ts` 已增加扫描防回退；`npm run test` 24 个测试文件 / 200 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 中等面板圆角仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-11；页面样式中的 `border-radius: 10px` 已替换为 `border-radius: var(--radius-md)`，复合圆角保留原角位关系；`tokens.test.ts` 已增加扫描防回退；`npm run test` 24 个测试文件 / 201 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 管理端默认面板圆角仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/styles/tokens.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-12；新增 `--radius-admin-panel: 8px`，页面样式中的普通和复合 `8px` 面板圆角已替换为 `var(--radius-admin-panel)`；响应式 `clamp(...)` 和特殊装饰圆角不纳入本批；`npm run test` 24 个测试文件 / 202 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 紧凑内联 `gap: 8px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-13；页面和组件样式中的 `gap: 8px` 已替换为 `gap: var(--space-admin-xs)`，`!important` 覆盖样式保留原优先级；`npm run test` 24 个测试文件 / 203 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 小型内联 `gap: 10px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-14；页面和组件样式中的普通和双值 `gap: 10px` 已替换为 `gap: var(--space-admin-sm)`，双值 `gap` 保留第二轴间距；`npm run test` 24 个测试文件 / 204 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 中型内联 `gap: 12px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-15；页面和组件样式中的普通和双值 `gap: 12px` 已替换为 `gap: var(--space-admin-md)`，双值 `gap` 保留第二轴间距，响应式 `clamp(...)` 和 `column-gap` 不纳入本批；`npm run test` 24 个测试文件 / 205 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 大型内联 `gap: 16px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-16；页面和组件样式中的显式 `gap: 16px` 已替换为 `gap: var(--space-admin-lg)`，响应式 `clamp(...)`、`column-gap` 和 padding/margin 不纳入本批；`npm run test` 24 个测试文件 / 206 个用例通过，`npm run typecheck` 通过，`npm run build` 通过 |
| 2026-07-03 | 卡片 / 区块常用 `gap: 18px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-17；新增 `--space-admin-card-gap`，页面和组件样式中的显式 `gap: 18px` 已替换为 `gap: var(--space-admin-card-gap)`，响应式 `clamp(...)` 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 27 个用例通过 |
| 2026-07-03 | 超大区块 `gap: 20px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-18；页面和组件样式中的显式 `gap: 20px` 已替换为 `gap: var(--space-admin-xl)`，padding/margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 28 个用例通过 |
| 2026-07-03 | 双倍超大区块 `gap: 24px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-19；页面和组件样式中的显式 `gap: 24px` 已替换为 `gap: var(--space-admin-2xl)`，padding/margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 29 个用例通过 |
| 2026-07-03 | 超大单值 `padding: 20px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-20；页面和组件样式中的单值 `padding: 20px` 已替换为 `padding: var(--space-admin-xl)`，双值、四值和响应式 padding 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 30 个用例通过 |
| 2026-07-03 | 双倍超大单值 `padding: 24px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-21；页面和组件样式中的单值 `padding: 24px` 已替换为 `padding: var(--space-admin-2xl)`，双值、四值和响应式 padding 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 31 个用例通过 |
| 2026-07-03 | 卡片单值 `padding: 18px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-22；页面和组件样式中的单值 `padding: 18px` 已替换为 `padding: var(--space-admin-card-gap)`，双值、四值和响应式 padding 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 32 个用例通过 |
| 2026-07-03 | 大型单值 `padding: 16px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-23；页面和组件样式中的单值 `padding: 16px` 已替换为 `padding: var(--space-admin-lg)`，双值、四值和响应式 padding 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 33 个用例通过 |
| 2026-07-03 | 中型单值 `padding: 12px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-24；页面和组件样式中的单值 `padding: 12px` 已替换为 `padding: var(--space-admin-md)`，双值、四值和响应式 padding 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 34 个用例通过 |
| 2026-07-03 | 超大单值 `margin: 20px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-25；页面和组件样式中的单值 `margin: 20px` 已替换为 `margin: var(--space-admin-xl)`，方向性、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 35 个用例通过 |
| 2026-07-03 | 紧凑方向性 `margin-*: 8px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-26；页面和组件样式中的方向性 `margin-*: 8px` 已替换为 `margin-*: var(--space-admin-xs)`，单值、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 36 个用例通过 |
| 2026-07-03 | 小型方向性 `margin-*: 10px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-27；页面和组件样式中的方向性 `margin-*: 10px` 已替换为 `margin-*: var(--space-admin-sm)`，单值、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 37 个用例通过 |
| 2026-07-03 | 大型方向性 `margin-*: 16px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-28；页面和组件样式中的方向性 `margin-*: 16px` 已替换为 `margin-*: var(--space-admin-lg)`，单值、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 38 个用例通过 |
| 2026-07-03 | 中型方向性 `margin-*: 12px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-29；页面和组件样式中的方向性 `margin-*: 12px` 已替换为 `margin-*: var(--space-admin-md)`，单值、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 39 个用例通过 |
| 2026-07-03 | 超大方向性 `margin-*: 20px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-30；页面和组件样式中的方向性 `margin-*: 20px` 已替换为 `margin-*: var(--space-admin-xl)`，单值、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 40 个用例通过 |
| 2026-07-03 | 双倍超大方向性 `margin-*: 24px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-31；页面和组件样式中的方向性 `margin-*: 24px` 已替换为 `margin-*: var(--space-admin-2xl)`，单值、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 41 个用例通过 |
| 2026-07-03 | 卡片方向性 `margin-*: 18px` 仍有页面硬编码，需要继续收敛到 CSS variable | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/src/styles/tokens.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-32；页面和组件样式中的方向性 `margin-*: 18px` 已替换为 `margin-*: var(--space-admin-card-gap)`，单值、多值和响应式 margin 不纳入本批；`npm run test -- src/styles/tokens.test.ts` 1 个测试文件 / 42 个用例通过 |
| 2026-07-03 | 方向性 margin 常用 token 档位收敛后，需要判断剩余硬编码是否继续新增 token | `frontend/src/**/*.vue`、`frontend/src/**/*.css`、`frontend/docs/admin-design-system-guide.md` | 已补 F3-33；当前剩余方向性 `margin-*` 已无 `8/10/12/16/18/20/24px` 常用 token 档位硬编码；`2/3/4/5/6/7/9/11/13px` 归为局部微调，`22/28/30/34/48/54px` 归为单页版式特例，暂不新增 token；`14px` 高频但不在现有体系内，后续结合目标效果图页面级复核 |
| 2026-07-03 | 管理端按钮等级需要先形成规则，再逐页迁移局部 `.btn-*` | `frontend/src/components/ui/button.ts`、`frontend/src/pages/admin/**/*.vue`、`frontend/docs/admin-design-system-guide.md` | 已补 F4-01/F4-44；公共 `Button` 已有 `default`、`secondary`、`outline`、`ghost`、`danger` variant；第一轮扫描高频项为 `.btn-primary` 27 处、`.btn-secondary` 22 处、`.btn-view` 18 处、`.btn-link` 16 处、`.btn-reset` 11 处、`.btn-source` 10 处；能力清单三处编辑抽屉底部、基准模板页顶部优化/版本/派生入口、基准模板优化建议页上传/分析/应用/版本/建议处理动作、执行版页顶部派生/历史版本入口、发布确认页返回/确认发布动作、要求映射页新增/编辑/删除/确认配置动作、能力画像群体页查看完整建议和查看画像动作、培训计划新建抽屉底部、培训计划主入口、右侧筛选动作、筛选重置和表格行内查看、培训计划详情参与教师查看/处理、培训记录筛选重置、行内查看、详情页上传材料/相关记录查看和侧栏主动作、培训资源行内查看和侧栏筛选入口及筛选重置、培训需求行内查看和匹配资源及侧栏筛选入口和筛选重置、培训申请行内查看和处理、培训申请筛选重置和右侧处理提醒动作、培训资源/需求/申请筛选区查询、培训资源/需求新增动作、档案处理详情确认入档/退回/异常/补充说明动作、导入资料上传页选择文件/从文件夹导入/删除/取消/开始识别动作、导入批次详情底部批次状态动作、档案查阅搜索/重置/查看档案动作、教师档案详情返回/打印/导出/关闭/来源/记录详情动作、教师档案详情结构类去 `btn-*` 前缀、教学反思/培训计划详情返回入口、虚拟教研室列表筛选重置和查看详情入口、虚拟教研室详情页主次动作和行内查看/移出动作、虚拟教研活动详情页查看/形成记录动作、虚拟教研记录详情页来源/入档动作、企业实践申请/跟踪/记录筛选重置和查询、企业实践记录/跟踪导出动作、企业实践三页状态动作、报告中心卡片动作和培训计划新建入口、教学反思总览隐藏重置、详情来源数据、总览/详情查看类动作、分析报告中心查询和重置、企业实践三页查看类动作已迁移到公共 `Button`，并补 `adminVisualActions.test.ts` guardrail；当前 `frontend/src/pages/admin/**/*.vue` 已无 `btn-*` 页面级按钮类 |
| 2026-07-03 | 管理端状态徽章需要把 `StatusBadge` 的 tone、文案和业务状态边界写清楚 | `frontend/src/components/common/StatusBadge.vue`、`frontend/src/domain/admin/domainTypes.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 F5-01；扫描 `StatusBadge` 的 `success`、`warning`、`danger`、`info`、`neutral`、`purple` 六类 tone、管理端/教师端文案映射和页面源码 guardrail 后，已在设计规则文档明确状态 tone 语义、典型状态、覆盖规则和展示型 tone 边界；本轮仅更新文档，不改页面代码 |
| 2026-07-03 | 管理端表格密度需要先形成三档规则，再逐页抽组件 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/components/**/*.vue`、`frontend/docs/admin-design-system-guide.md` | 已补 F6-01；当前表格相关源码命中约 437 处，现状可归为紧凑关联表、标准业务列表、宽信息列表三档；已在设计规则文档明确表头高度、数据行高度、字号、单元格 padding、操作列和空状态口径；本轮仅更新文档，不改页面代码 |
| 2026-07-03 | 管理端详情页布局需要区分独立详情页、右侧详情面板和抽屉职责 | `frontend/src/pages/admin/**/*DetailPage.vue`、`frontend/src/pages/admin/archive/*`、`frontend/docs/admin-design-system-guide.md` | 已补 F7-01；扫描独立详情页、列表工作台右侧详情面板和来源/记录抽屉后，已在设计规则文档明确返回/面包屑、标题区、摘要区、主内容区、侧栏区、来源/相关记录的职责；本轮仅更新文档，不改页面代码 |
| 2026-07-03 | 管理端抽屉宽度和结构需要区分编辑表单、版本记录、来源记录和轻量详情 | `frontend/src/components/common/DetailSheet.vue`、`frontend/src/pages/admin/ability-list/*`、`frontend/src/pages/admin/training/TrainingPlanPage.vue`、`frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue`、`frontend/docs/admin-design-system-guide.md` | 已补 F8-01；扫描 `DetailSheet` 360/480/640/760px 分档、能力清单 540px 编辑抽屉和 620px 版本抽屉、要求映射 660px 复杂编辑抽屉、培训计划 484px 新建抽屉、档案来源记录 540px 阅读型抽屉后，已在设计规则文档明确六类抽屉宽度、结构、底部操作和响应式口径；E12-02/E12-07 后 `DetailSheet` 已覆盖基准模板编辑、基准模板版本、执行版编辑、执行版历史版本、成长档案来源记录和培训计划新建抽屉 |
| 2026-07-03 | 管理端设计规则文档需要和当前组件、测试入口、验收命令保持一致 | `frontend/docs/admin-design-system-guide.md`、`frontend/src/components/common/*`、`frontend/src/components/ui/button.ts`、`frontend/src/components/layout/FloatingAIAssistant.vue`、`frontend/src/components/business/training/TrainingResourceDetailSheet.vue` | 已补 F9-01；已核对设计文档中的 `Button`、`StatusBadge`、`EmptyState`、`DetailSheet`、`FilterBar`、`PageHeader`、`FloatingAIAssistant`、`TrainingResourceDetailSheet`、`tokens.test.ts`、`adminVisualActions.test.ts`、`domainTypes.test.ts` 均有当前工程对应文件，并确认验收命令仍为 `npm run test`、`npm run typecheck`、`npm run build`；本轮仅更新文档，不改页面代码 |
| 2026-07-03 | F4-44 后设计规则文档仍残留局部 `.btn-*` 作为现行样板的表述 | `frontend/docs/admin-design-system-guide.md`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 F9-02；按钮等级表已改为只以公共 `Button` variant 为准，F6 表格操作列不再建议 `.btn-view/.btn-link` 逐步迁移；新增 `adminVisualActions.test.ts` guardrail 防止设计规则再次把已收尾的页面级 `.btn-*` 当作现行做法 |
| 2026-07-03 | 管理端抽组件后需要有固定结构自检口径，避免公共组件迁移破坏效果图区域关系和页面密度 | `frontend/docs/admin-design-system-guide.md`、`docs/page-coverage-ledger.md`、`效果图/管理PC端/*` | 已补 F10-01；已在管理端设计规则文档新增抽组件结构自检清单，要求每次结构性重构记录目标效果图、区域结构、比例与密度、业务入口、响应式和验证命令；本轮仅更新文档，不改页面代码 |
| 2026-07-03 | 第一批详情抽屉组件迁移需要选择低风险编辑表单并保留效果图结构 | `frontend/src/components/common/DetailSheet.vue`、`frontend/src/components/common/DetailSheet.test.ts`、`frontend/src/pages/admin/ability-list/AbilityListBasePage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E12-01/E12-02；第一批只迁移能力清单基准模板编辑指标抽屉，不迁移版本记录、要求映射和成长档案来源记录；新增 `DetailSheet form` 540px 分档，基准模板编辑抽屉改用 `DetailSheet`，保留原字段、保存行为和底部按钮；F10 自检：目标效果图为 `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版查看页.png`，区域结构不变，抽屉宽度仍为 540px，业务入口和保存动作不变 |
| 2026-07-03 | 能力清单基准模板版本记录抽屉适合迁入 `DetailSheet`，但必须保留 620px 宽度和版本追溯字段 | `frontend/src/components/common/DetailSheet.vue`、`frontend/src/components/common/DetailSheet.test.ts`、`frontend/src/pages/admin/ability-list/AbilityListBasePage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E12-03；新增 `DetailSheet history` 620px 分档和 `showFooter=false` 只读抽屉模式，基准模板版本记录抽屉改用 `DetailSheet`，保留版本号、状态、发布时间、来源、操作人五项字段；F10 自检：目标效果图为 `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版查看页.png` 的版本记录状态，区域结构不变，抽屉宽度仍为 620px，业务入口和关闭动作不变 |
| 2026-07-03 | 成长档案教师详情来源记录抽屉适合迁入 `DetailSheet`，但必须保留阅读型顶部偏移和来源筛选 | `frontend/src/components/common/DetailSheet.vue`、`frontend/src/components/common/DetailSheet.test.ts`、`frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E12-04；新增 `DetailSheet source` 540px 分档和 `placement="reader"` 阅读型偏移，成长档案教师详情来源记录抽屉改用 `DetailSheet`，保留全部/已确认入档/待说明筛选、计数、来源、状态、入档时间、正文对应内容和记录详情反馈；F10 自检：目标效果图为 `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜来源详情.png`，抽屉宽度仍为 540px，顶部仍下沉保留正文上下文，业务入口和关闭动作不变 |
| 2026-07-03 | 抽屉组件规则需要明确适用、慎用和禁用边界，避免后续把独立详情页或主列表误迁入抽屉 | `frontend/docs/admin-design-system-guide.md`、`docs/page-coverage-ledger.md` | 已补 E12-05；管理端设计规则已明确 `DetailSheet` 适用于局部编辑、版本记录、来源记录、轻量只读详情和确认动作；字段分组过多、复杂横向表格、跨模块导航需慎用；禁止替代独立详情页、承载主列表筛选分页、伪装不可用动作或抽屉套同级抽屉 |
| 2026-07-03 | 培训计划新建抽屉适合迁入 `DetailSheet md`，但必须保留轻量新建表单和三按钮底部动作 | `frontend/src/pages/admin/training/TrainingPlanPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 E12-06；培训计划新建抽屉改用 `DetailSheet title="新建培训计划" width="md"`，保留计划名称、培训方向、关联需求、关联资源、面向对象、培训时间、参与方式、申请处理、计划名额、材料要求、计划说明字段，以及取消、保存草稿、保存并发布三个底部动作；F10 自检：目标效果图为 `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜新建培训计划｜附属流程.png`，业务入口和保存行为不变 |
| 2026-07-03 | 能力清单执行版编辑和历史版本抽屉适合迁入 `DetailSheet`，但必须保留保存行为和版本追溯字段 | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 E12-07；执行版编辑指标抽屉改用 `DetailSheet title="编辑指标" width="form" mode="edit"`，保留指标名称、四级标准、计算规则和 `saveEdit()` 写入 `abilityListStore.executionIndicators`；执行版历史版本抽屉改用 `DetailSheet title="执行版历史版本" width="history" :show-footer="false"`，保留版本号、状态、发布时间、来源、操作人；F10 自检：目标效果图为执行版查看页和执行版指标编辑抽屉，业务入口和保存行为不变 |
| 2026-07-03 | 右侧摘要面板需要先区分列表工作台辅助判断、详情面板和独立详情页侧栏，避免过早抽象 | `frontend/src/pages/admin/training/*`、`frontend/src/pages/admin/archive/ArchiveProcessingPage.vue`、`frontend/src/pages/admin/reports/ReportCenterPage.vue`、`frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue`、`frontend/docs/admin-design-system-guide.md` | 已补 E13-01；第一批候选限定为培训需求“资源匹配建议”和培训申请“处理提醒”，第二批候选为培训资源“资源概览”；档案处理记录详情、报告中心详情面板、能力清单优化建议详情暂不迁移；独立详情页侧栏禁止纳入第一批摘要组件 |
| 2026-07-03 | 右侧摘要面板组件接口需要先保持轻量，避免把业务数据、筛选或详情字段塞进公共组件 | `frontend/docs/admin-design-system-guide.md`、`docs/page-coverage-ledger.md` | 已补 E13-02；推荐组件为 `frontend/src/components/common/InsightSidebar.vue`，只提供标题、items、selected、action 三个插槽和卡片外壳；页面继续负责业务状态、选中对象、跳转和降级提示；测试边界限定为插槽渲染和试点页 guardrail |
| 2026-07-03 | 右侧摘要面板第一批试点需要选择低风险页面，验证公共外壳不破坏效果图密度和业务入口 | `frontend/src/components/common/InsightSidebar.vue`、`frontend/src/components/common/InsightSidebar.test.ts`、`frontend/src/pages/admin/training/TrainingDemandPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E13-03；新增 `InsightSidebar` 轻量外壳并迁移培训需求页右侧“资源匹配建议”，保留三条建议文案、当前查看需求摘要和“查看待匹配需求”动作；F10 自检：目标效果图为 `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜需求管理.png`，右侧卡片结构、密度和业务入口不变 |
| 2026-07-03 | 右侧摘要面板后续批次需要保留处理动作和资源分布信息，不把业务内容塞进公共组件 | `frontend/src/pages/admin/training/TrainingApplicationPage.vue`、`frontend/src/pages/admin/training/TrainingResourcePage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E13-04；培训申请页右侧“处理提醒”和培训资源页右侧“资源概览”已迁移到 `InsightSidebar`，保留申请页三条提醒、当前查看申请、退回申请和查看待处理申请入口，保留资源页三组分布、当前查看资源和查看待完善资源入口；F10 自检：目标效果图为培训管理申请管理和资源管理对应管理端效果图，右侧区域职责和业务入口不变 |
| 2026-07-03 | 培训计划页右侧执行提醒适合迁入摘要面板，但不能改变“查看相关计划”的筛选闭环 | `frontend/src/pages/admin/training/TrainingPlanPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts`、`frontend/docs/admin-design-system-guide.md` | 已补 E13-05/F4-07；培训计划页右侧“执行提醒”已迁移到 `InsightSidebar`，保留提醒列表和设置 `selectedStatus = '报名中'` 的查看相关计划入口；“新建培训计划”和侧栏动作已迁移到公共 `Button`；F10 自检：目标效果图为培训管理培训计划对应管理端效果图，右侧提醒职责和新建抽屉入口不变 |
| 2026-07-03 | 管理端筛选栏需要先区分横向紧凑筛选、左侧筛选面板、tab 工具区和高视觉权重搜索区，避免误迁 | `frontend/src/pages/admin/training/*`、`frontend/src/pages/admin/archive/*`、`frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue`、`frontend/src/pages/admin/reports/ReportCenterPage.vue`、`frontend/docs/admin-design-system-guide.md` | 已补 E14-01；第一批候选为培训资源、培训需求、培训申请，均为 4 个 select + 搜索 + 重置 / 查询动作；第二批候选为培训计划、培训记录、虚拟教研室列表；档案查阅页暂不迁移；档案处理左侧筛选面板、报告中心 tab 工具区、能力清单优化建议来源侧栏禁止纳入第一批筛选栏组件 |
| 2026-07-03 | 筛选栏组件接口需要保留页面业务控制权，只收敛布局外壳，避免公共组件理解所有字段枚举 | `frontend/docs/admin-design-system-guide.md`、`docs/page-coverage-ledger.md` | 已补 E14-02；保留现有 `FilterBar`，第一批建议新增 `CompactFilterBar`，只提供 fields、search、actions、message 四个插槽；页面继续负责字段值、筛选函数、store 写入、按钮文案和操作反馈 |
| 2026-07-03 | 筛选栏第一批试点需要验证筛选行为和布局不退化，且不把字段枚举塞进公共组件 | `frontend/src/components/common/CompactFilterBar.vue`、`frontend/src/components/common/CompactFilterBar.test.ts`、`frontend/src/pages/admin/training/TrainingResourcePage.vue`、`frontend/src/pages/admin/training/TrainingDemandPage.vue`、`frontend/src/pages/admin/training/TrainingApplicationPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E14-03；新增 `CompactFilterBar` 并迁移培训资源、培训需求、培训申请筛选区，保留三页各自四个筛选字段、搜索、重置、查询、操作反馈和资源页新增资源入口；F10 自检：目标效果图为 `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜资源管理.png`、`效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜需求管理.png`、`效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜申请管理.png`，筛选区字段、密度和业务入口不变 |
| 2026-07-03 | 筛选栏第二批迁移需要保留各页差异，不为了统一组件新增无业务必要动作 | `frontend/src/pages/admin/training/TrainingPlanPage.vue`、`frontend/src/pages/admin/training/TrainingRecordPage.vue`、`frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E14-04；培训计划、培训记录、虚拟教研室列表筛选区已迁移到 `CompactFilterBar`；计划和记录页保留输入即过滤和重置入口，不新增查询按钮；虚拟教研室保留搜索回车、重置、查询、操作反馈和卡片/表格视图切换；禁迁边界仍为档案处理左侧筛选面板、报告中心 tab 工具区、能力清单来源侧栏 |
| 2026-07-03 | 企业实践三页筛选区仍使用局部 `filter-section`，需要纳入紧凑筛选栏第三批 | `frontend/src/pages/admin/practice/PracticeApplicationPage.vue`、`frontend/src/pages/admin/practice/PracticeTrackingPage.vue`、`frontend/src/pages/admin/practice/PracticeRecordPage.vue`、`frontend/src/pages/admin/adminVisualActions.test.ts` | 已补 E14-05；实践申请、实践跟踪、实践记录筛选区已迁移到 `CompactFilterBar`，保留年度/院系/状态/完成情况/计入天数/搜索字段、重置/查询动作和操作反馈；实践跟踪、实践记录的导出动作仍保留在列表标题区；F10 自检：目标效果图为企业实践申请/跟踪/记录对应管理端效果图，筛选字段、列表密度和业务入口不变 |

### 待处理问题

| 优先级 | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| P1 | 档案详情导出仍是降级提示 | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | 保留为降级提示，不标记导出闭环；后续接真实文件导出 |
| P1 | 能力画像院系 / 专业群体画像仍是降级提示 | `frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue` | 教师画像已能跳转，院系 / 专业后续补独立画像页或移除按钮 |
| P1 | 虚拟教研查看全部、复制会议号、定位资料仍是降级提示 | `frontend/src/pages/admin/virtual-lab/*` | 主业务链已接 store，辅助动作后续补真实成员全量列表、复制能力或资料定位 |

### 管理端风险表

视觉还原已在转化阶段验收过，下一阶段不重复做大规模截图验收，优先审计业务闭环。D-09 后，管理端已处理扫描项和仍待处理风险分开记录；`console.log`、路由、占位页、页面业务类型、大段 mock、状态映射类风险已作为已处理审计项保留，未闭环项仅保留在上方“待处理问题”。

| 模块 | 风险点 | 位置 | 建议处理 |
| --- | --- | --- | --- |
| 管理端整体 | `console.log` 空动作 | `frontend/src/pages/admin/**/*.vue` | D-01 已复扫，当前命中 0 |
| 能力清单 | 筛选、选中、采纳、暂缓、弃用、应用、上传制度文件、重新分析、版本记录 | `frontend/src/pages/admin/ability-list/*` | 已分类为页面选择筛选、store 状态动作或真实跳转 |
| 成长档案 | 导出档案、来源详情过滤 | `ArchiveTeacherDetailPage.vue` | 来源详情为真实过滤；导出仍为降级提示，后续接真实文件导出时再闭环 |
| 能力画像 | 院系 / 专业群体查看画像 | `AbilityProfileGroupPage.vue` | 教师对象真实跳转；院系 / 专业保留降级提示，不标记独立画像页完成 |
| 培训管理 | 计划保存 / 发布、申请同意、证书上传 | `frontend/src/pages/admin/training/*` | 已接入 `trainingStore` 或同页状态，属于真实状态动作 |
| 分析报告 | 筛选、重置、查看 / 导出 / 生成 / AI 分析 | `ReportCenterPage.vue` | 筛选为页面状态，业务动作通过 `reportStore` 反馈 |
| 虚拟教研 | 创建、筛选、校对、成员 / 资料定位、生成档案待确认 | `frontend/src/pages/admin/virtual-lab/*` | 主链接入 `virtualLabStore`；查看全部、复制会议号、定位资料为页面内降级提示 |
| 管理端按钮 | 无动作视觉态按钮 | `AbilityListExecutionPage.vue`、`ArchiveProcessingPage.vue`、`ArchiveQueryPage.vue`、`AbilityProfileGroupPage.vue` | E16 已处理；只读值不再使用按钮，搜索接真实过滤，暂不补完整列表的入口改为明确降级提示并有测试约束 |
| 管理端路由 | 未挂路由页面 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/router/admin.routes.ts` | D-03 已复扫，30 个页面文件与 30 个路由动态导入一一对应；组件目录不计页面 |
| 管理端路由 | 占位路由 / 废弃页面 | `frontend/src/router/admin.routes.ts`、`frontend/src/pages/admin` | D-04 已复扫，未发现 `/admin/system`、`AdminPlaceholderPage`、`ResourceLibraryPage.vue` 残留 |
| 管理端页面 | 页面内业务 `interface/type` | `frontend/src/pages/admin/**/*.vue` | D-05 已复扫，仅 `SimpleRadarChart.vue` 保留组件 props 类型；业务类型不再由页面定义 |
| 管理端页面 | 页面内大段 mock 数组 | `frontend/src/pages/admin/**/*.vue` | D-06 已复扫，仅保留 tabs、steps、tone class 等 1 行 UI 选项数组；无大段业务 mock 数组 |
| 管理端状态 | 状态文案 / 状态样式映射 | `frontend/src/pages/admin/**/*.vue`、`frontend/src/domain/admin/*`、`StatusBadge.vue` | D-07 已复扫，稳定业务状态由 domain helper 或 `<StatusBadge />` 承接；页面局部 `classMap` 等仅用于等级、步骤、分布条等展示型样式 |
| 管理端文档 | 业务地图当前落点 | `docs/business-logic-map.md` | D-08 已同步 D-01 至 D-07 的工程重构落点，后续按此进入组件和设计系统收敛 |

### 当前管理端源码页面

```txt
frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue
frontend/src/pages/admin/ability-list/AbilityListBasePage.vue
frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue
frontend/src/pages/admin/ability-list/AbilityListPublishConfirmPage.vue
frontend/src/pages/admin/ability-list/AbilityListRequirementMappingPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherDetailPage.vue
frontend/src/pages/admin/ability-profile/AbilityProfileTeacherPage.vue
frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue
frontend/src/pages/admin/archive/ArchiveImportUploadPage.vue
frontend/src/pages/admin/archive/ArchiveProcessingPage.vue
frontend/src/pages/admin/archive/ArchiveQueryPage.vue
frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue
frontend/src/pages/admin/practice/PracticeApplicationPage.vue
frontend/src/pages/admin/practice/PracticeRecordPage.vue
frontend/src/pages/admin/practice/PracticeTrackingPage.vue
frontend/src/pages/admin/reflection/ReflectionDetailPage.vue
frontend/src/pages/admin/reflection/ReflectionOverviewPage.vue
frontend/src/pages/admin/reports/ReportCenterPage.vue
frontend/src/pages/admin/training/TrainingApplicationPage.vue
frontend/src/pages/admin/training/TrainingDemandPage.vue
frontend/src/pages/admin/training/TrainingPlanDetailPage.vue
frontend/src/pages/admin/training/TrainingPlanPage.vue
frontend/src/pages/admin/training/TrainingRecordDetailPage.vue
frontend/src/pages/admin/training/TrainingRecordPage.vue
frontend/src/pages/admin/training/TrainingResourcePage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabActivityDetailPage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabRecordDetailPage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabRoomDetailPage.vue
frontend/src/pages/admin/virtual-lab/VirtualLabRoomPage.vue
```

说明：`ability-profile/components/SimpleRadarChart.vue` 是组件，不计入效果图页面。

## 教师手机端

### 模块覆盖概览

| 模块 | 效果图数 | 当前页面状态 | 结论 |
| --- | ---: | --- | --- |
| 待办 | 9 | 待办首页、全部待办、动态、证书详情/编辑/提交结果页面数量与效果图基本一致；证书主链已接入 `teacher-mobile/src/stores/todoStore.ts` | 已建立第一版逐图分组映射；证书确认、修改待核验、入档和移出待确认已形成本地状态闭环，后续扩展其它待办类型和动态联动 |
| 档案 | 54 | `pages/archive/index`、`pages/archive/record-query` 已注册；部分企业实践、培训证书、虚拟教研入档结果由活动/待办页面承接 | 高风险；已建立第一版逐图缺口判断，档案主体详情页明显不足 |
| 活动 | 71 | 教学反思、培训进修、企业实践、虚拟教研和活动首页页面数量与效果图分组基本一致 | 已建立第一版逐图分组映射；缺页风险低，下一步重点审计业务流闭环 |
| 我的 | 6 | 当前仅有 `pages/profile/index` 综合页 | 高风险；我的主页可覆盖，能力画像、用到的记录、发展报告、岗位/聘期对照缺独立页面 |
| AI 助手 | 2 | 已注册 `pages/assistant/index`、`pages/assistant/archive-supplement/index`、`pages/assistant/archive-supplement-submitted/index`；TabBar 已指向 AI 助手首页 | 已补一级入口、补充档案和提交结果页；后续重点接入真实 AI 会话和档案待核验数据 |

### 已确认注册状态

`teacher-mobile/src/pages.json` 中 `86` 个页面均存在对应 `index.vue` 文件，无未注册页面、无注册缺失文件。

### 逐图台账：档案模块

档案效果图共 54 张，当前 `teacher-mobile/src/pages/archive` 只有 2 个注册页面：

```txt
teacher-mobile/src/pages/archive/index.vue
teacher-mobile/src/pages/archive/record-query/index.vue
```

按效果图目录拆分：

| 分组 | 效果图数 | 当前源码/路由状态 | 当前判定 |
| --- | ---: | --- | --- |
| 根目录档案通用页 | 17 | `pages/archive/index` 可覆盖“教师端手机｜档案｜档案首页”；`pages/archive/record-query` 可覆盖“教师端手机｜档案｜档案记录查询”；搜索无结果、个人成长记录、档案草稿、职称聘用详情、发展计划编辑、分类/访问/角色/会话/绩效/反馈/活动管理等未见独立档案路由 | 仅入口和查询页已明确映射；其余多为缺页或未注册管理类页面 |
| 基本信息 | 4 | `pages/archive/index` 只展示“基本信息”分类卡片；未见基本信息档案页、详情页、教育背景详情页独立路由 | 缺页 |
| 教学工作 | 6 | `pages/archive/record-query` 有教学工作搜索结果；未见教学工作概览、列表、教学评价记录详情独立路由 | 查询结果局部覆盖；概览/列表/详情缺页 |
| 教研科研 | 6 | `pages/archive/record-query` 有教研科研搜索结果；虚拟教研活动页有“成长档案 · 教研科研”归档结果，但不属于档案模块路由 | 查询结果和活动归档结果局部承接；档案概览/分类/详情缺页 |
| 企业实践 | 4 | `pages/archive/index` 有企业实践分类卡片；企业实践活动页覆盖计划、补充、归档结果等流程 | 活动流程承接入档结果；档案首页/概览/列表/详情缺页 |
| 成果荣誉 | 4 | `pages/archive/index` 有成果荣誉分类和最近入档；未见成果荣誉概览、列表、教学成果奖详情独立路由 | 缺页 |
| 个人发展 | 3 | `pages/archive/index` 有个人发展分类和最近入档；待办培训证书入档成功页提示可查看个人发展 | 待办结果页局部承接；个人发展档案页、最近入档详情缺页 |
| 职称聘用 | 8 | 更正申请、提交结果、进度页和结果页已有第一版；补充材料、详情仍未见独立路由 | 高风险缺页 |
| 社会服务 | 1 | `pages/archive/index` 有社会服务分类卡片 | 仅分类入口，详情缺页 |
| 考核评价 | 1 | `pages/archive/index` 有考核评价分类卡片 | 仅分类入口，详情缺页 |

第一版结论：

- 54 张档案效果图不是简单的一页多状态；当前只有 2 个档案模块页面，无法覆盖档案详情、分类概览、记录列表、记录详情、职称更正和补充材料等主体流程。
- 企业实践、虚拟教研、培训证书的部分“提交 / 归档 / 入档结果”已散落在 `pages/activity/*` 和 `pages/todo/*`，应在后续手机端业务地图中明确它们与档案模块的边界。
- 下一步优先补档案信息架构：先确定档案首页、分类概览、记录列表、记录详情、更正/补充材料是否需要统一路由模板，再决定补页面还是合并为一页多状态。

#### M-01 档案 54 张效果图补页清单

判定口径：

- 保留已有：当前已有注册页面可直接承接。
- 合并状态：不新增独立页面，作为已有页或后续统一模板的一个状态。
- 补页：需要新增手机端页面或统一模板路由承接。
- 移出教师端：效果图更像后台配置或系统管理，不作为教师手机端档案优先补页。

| 分组 | 效果图 | 判定 | 承接建议 |
| --- | --- | --- | --- |
| 根目录 | `教师端手机｜档案｜档案首页.png` | 保留已有 | `pages/archive/index` |
| 根目录 | `教师端手机｜档案｜档案记录查询.png` | 保留已有 | `pages/archive/record-query/index` |
| 根目录 | `教师端手机｜档案｜搜索无结果页.png` | 合并状态 | `pages/archive/record-query/index` 的无结果状态 |
| 根目录 | `个人成长记录.png` | 补页 | 统一档案记录详情页承接 |
| 根目录 | `成长档案-档案草稿.png` | 补页 | 档案草稿 / 待确认记录列表承接 |
| 根目录 | `成长档案-职称聘用详情.png` | 补页 | 职称聘用记录详情承接 |
| 根目录 | `发展计划编辑.png` | 补页 | 个人发展计划编辑页承接 |
| 根目录 | `基本信息.png` | 合并状态 | 基本信息分类概览或详情页承接 |
| 根目录 | `记录列表页面.png` | 合并状态 | 统一分类记录列表模板承接 |
| 根目录 | `活动详情页面.png` | 合并状态 | 活动类来源详情或统一记录详情承接 |
| 根目录 | `分类管理页面.png` | 移出教师端 | 更像后台分类配置，不作为教师端档案页 |
| 根目录 | `访问权限页面.png` | 移出教师端 | 更像后台权限配置，不作为教师端档案页 |
| 根目录 | `角色权限管理.png` | 移出教师端 | 更像后台角色配置，不作为教师端档案页 |
| 根目录 | `会话管理页面.png` | 移出教师端 | 更像系统/AI 会话管理，不作为档案主流程 |
| 根目录 | `绩效管理页面.png` | 移出教师端 | 更像管理端绩效配置，不作为教师端档案页 |
| 根目录 | `活动项目管理.png` | 移出教师端 | 更像后台活动项目配置，不作为教师端档案页 |
| 根目录 | `反馈建议页面.png` | 移出教师端 | 更像通用反馈入口，不归入档案补页优先级 |
| 基本信息 | `教师端手机｜档案｜基本信息档案页.png` | 补页 | 基本信息分类概览页 |
| 基本信息 | `教师端手机｜档案｜基本信息详情页.png` | 补页 | 基本信息详情页 |
| 基本信息 | `基本信息档案详情.png` | 合并状态 | 基本信息详情页的详情状态 |
| 基本信息 | `教育背景.png` | 合并状态 | 基本信息详情页的教育背景分段 |
| 教学工作 | `教师端手机｜档案｜教学工作档案概览.png` | 补页 | 教学工作分类概览页 |
| 教学工作 | `教学工作档案概览-版本一.png` | 合并状态 | 教学工作概览页候选状态，不单独建页 |
| 教学工作 | `教师端手机｜档案｜教学工作记录列表.png` | 补页 | 统一分类记录列表，`category=teaching` |
| 教学工作 | `教学工作档案列表-版本一.png` | 合并状态 | 教学工作记录列表候选状态 |
| 教学工作 | `教学工作档案列表-版本二.png` | 合并状态 | 教学工作记录列表候选状态 |
| 教学工作 | `教师端手机｜档案｜教学评价记录详情.png` | 补页 | 统一档案记录详情，`type=teaching-evaluation` |
| 教研科研 | `教师端手机｜档案｜教研科研档案概览.png` | 补页 | 教研科研分类概览页 |
| 教研科研 | `教研科研档案分类.png` | 合并状态 | 教研科研概览页的分类筛选状态 |
| 教研科研 | `教师端手机｜档案｜教研科研记录列表.png` | 补页 | 统一分类记录列表，`category=research` |
| 教研科研 | `教师端手机｜档案｜教研记录详情.png` | 补页 | 统一档案记录详情，`type=research-record` |
| 教研科研 | `教研记录详情-归档信息.png` | 合并状态 | 教研记录详情的归档信息分段 |
| 教研科研 | `教研记录详情-活动记录.png` | 合并状态 | 教研记录详情的活动记录分段 |
| 企业实践 | `教师端手机｜档案｜企业实践档案首页.png` | 补页 | 企业实践分类首页 |
| 企业实践 | `教师端手机｜档案｜企业实践档案概览.png` | 合并状态 | 企业实践分类首页 / 概览状态 |
| 企业实践 | `教师端手机｜档案｜企业实践记录列表.png` | 补页 | 统一分类记录列表，`category=enterprise-practice` |
| 企业实践 | `教师端手机｜档案｜企业实践记录详情.png` | 补页 | 统一档案记录详情，`type=enterprise-practice` |
| 成果荣誉 | `成果荣誉档案.png` | 补页 | 成果荣誉分类首页 |
| 成果荣誉 | `教师端手机｜档案｜成果荣誉档案概览.png` | 合并状态 | 成果荣誉分类首页 / 概览状态 |
| 成果荣誉 | `教师端手机｜档案｜成果荣誉记录列表.png` | 补页 | 统一分类记录列表，`category=honor` |
| 成果荣誉 | `教师端手机｜档案｜教学成果奖记录详情.png` | 补页 | 统一档案记录详情，`type=teaching-award` |
| 个人发展 | `档案首页.png` | 合并状态 | `pages/archive/index` 或个人发展分类入口 |
| 个人发展 | `教师端手机｜档案｜个人发展档案页.png` | 补页 | 个人发展分类首页 |
| 个人发展 | `最近入档.png` | 合并状态 | 个人发展分类首页的最近入档状态 |
| 社会服务 | `教师端手机｜档案｜社会服务档案页.png` | 补页 | 社会服务分类首页，可先用统一分类模板 |
| 考核评价 | `教师端手机｜档案｜考核评价档案页.png` | 补页 | 考核评价分类首页，可先用统一分类模板 |
| 职称聘用 | `教师端手机｜档案｜职称聘用更正申请.png` | 补页 | 职称聘用更正申请页 |
| 职称聘用 | `教师端手机｜档案｜更正申请已提交.png` | 补页 | 更正申请提交结果页 |
| 职称聘用 | `教师端手机｜档案｜更正申请详情.png` | 补页 | 更正申请详情页 |
| 职称聘用 | `教师端手机｜档案｜更正进度｜待核验.png` | 补页 | 更正进度页的待核验状态 |
| 职称聘用 | `教师端手机｜档案｜更正进度｜已补充.png` | 合并状态 | 更正进度页的已补充状态 |
| 职称聘用 | `教师端手机｜档案｜职称聘用更正结果.png` | 补页 | 更正结果页 |
| 职称聘用 | `教师端手机｜档案｜补充材料填写.png` | 补页 | 更正补充材料填写页 |
| 职称聘用 | `职称聘用补充材料-列表版.png` | 合并状态 | 更正补充材料页的材料列表状态 |

M-01 结论：

- 保留已有 2 张：档案首页、档案记录查询。
- 合并状态 18 张：无结果、概览版本、列表版本、详情分段、最近入档等不单独建路由。
- 需要补页 27 张：集中在分类首页、统一记录列表、统一记录详情、职称聘用更正链路。
- 移出教师端 7 张：分类管理、访问权限、角色权限、会话管理、绩效管理、活动项目管理、反馈建议。
- 下一步 `M-02` 应把补页项收敛为少量统一路由，而不是按 27 张图逐个建页面。

#### M-02 档案统一路由命名草案

路由设计原则：

- 不按效果图逐张建页面，优先使用分类、记录类型、状态参数承接。
- `pages/archive/index` 和 `pages/archive/record-query/index` 保留。
- 分类页、列表页、详情页先做统一模板；只有职称聘用更正链路单独成组。
- 所有“已入档 / 可查看档案详情”入口最终都应落到 `record-detail`，并能追溯来源。

| 路由 | 页面职责 | 参数建议 | 承接 M-01 效果图 |
| --- | --- | --- | --- |
| `pages/archive/index` | 档案首页、分类入口、最近入档 | 无 | `教师端手机｜档案｜档案首页.png`、个人发展 `档案首页.png` |
| `pages/archive/record-query/index` | 跨分类搜索和查询结果 | `keyword`、`category`、`empty=1` | `教师端手机｜档案｜档案记录查询.png`、`教师端手机｜档案｜搜索无结果页.png` |
| `pages/archive/category/index` | 统一分类首页 / 概览 | `category=basic-info|teaching|research|enterprise-practice|honor|personal-development|social-service|assessment` | 基本信息档案页、教学工作概览、教研科研概览、企业实践首页/概览、成果荣誉档案/概览、个人发展档案页、社会服务档案页、考核评价档案页 |
| `pages/archive/record-list/index` | 统一分类记录列表 | `category`、`recordType`、`filter` | 教学工作记录列表、教研科研记录列表、企业实践记录列表、成果荣誉记录列表、根目录 `记录列表页面.png` |
| `pages/archive/record-detail/index` | 统一档案记录详情；第一版已新增并承接查询结果和待办证书入档结果 | `recordId`、`recordTitle`、`category`、`recordType`、`section` | 个人成长记录、活动详情页面、教学评价记录详情、教研记录详情、教研记录详情归档信息/活动记录、企业实践记录详情、教学成果奖记录详情 |
| `pages/archive/basic-info-detail/index` | 基本信息专属详情 | `section=profile|education|employment` | 基本信息详情页、基本信息档案详情、教育背景、根目录 `基本信息.png` |
| `pages/archive/draft-list/index` | 档案草稿 / 待确认记录列表；第一版已新增并承接 `pending-verify` 记录 | `status=draft|pending-confirm|pending-verify` | `成长档案-档案草稿.png` |
| `pages/archive/development-plan-edit/index` | 个人发展计划编辑 | `planId`、`mode=edit|create` | `发展计划编辑.png` |
| `pages/archive/correction/apply/index` | 职称聘用更正申请 | `recordId`、`category=title-employment` | `教师端手机｜档案｜职称聘用更正申请.png` |
| `pages/archive/correction/submitted/index` | 更正申请提交结果 | `requestId` | `教师端手机｜档案｜更正申请已提交.png` |
| `pages/archive/correction/detail/index` | 更正申请详情 | `requestId` | `教师端手机｜档案｜更正申请详情.png` |
| `pages/archive/correction/progress/index` | 更正进度 | `requestId`、`status=pending-verify|supplemented` | `教师端手机｜档案｜更正进度｜待核验.png`、`教师端手机｜档案｜更正进度｜已补充.png` |
| `pages/archive/correction/result/index` | 更正结果 | `requestId`、`result=approved|rejected` | `教师端手机｜档案｜职称聘用更正结果.png` |
| `pages/archive/correction/supplement/index` | 更正补充材料填写 / 材料列表 | `requestId`、`mode=form|list` | `教师端手机｜档案｜补充材料填写.png`、`职称聘用补充材料-列表版.png` |

M-02 收敛结果：

- 保留现有路由 2 个：`archive/index`、`archive/record-query/index`。
- 新增统一档案路由 6 个：`category`、`record-list`、`record-detail`、`basic-info-detail`、`draft-list`、`development-plan-edit`；其中 `record-detail` 第一版已落地。
- 新增更正链路路由 6 个：`correction/apply`、`correction/submitted`、`correction/detail`、`correction/progress`、`correction/result`、`correction/supplement`。
- 27 个补页项收敛为 12 个新增路由；18 个合并状态通过参数或页面分段承接；7 个管理类效果图不进入教师端补页。
- 后续 `M-03` 应按这些路由定义统一组件边界：分类卡、记录卡、详情块、来源记录、更正材料块。

#### M-03 档案统一组件边界

组件拆分原则：

- 按档案业务语义拆，不按效果图逐张拆。
- 组件只承接稳定结构，页面负责路由参数、页面标题、顶部导航和具体动作编排。
- 先服务 M-02 的 12 个新增路由；不为已移出教师端的后台配置类效果图建立组件。
- 不做万能卡片，避免分类、记录、详情、更正材料互相污染。

| 组件 | 主要职责 | 适用路由 | 不承接内容 |
| --- | --- | --- | --- |
| `ArchiveCategoryCard` | 展示档案分类入口、记录数、最近入档、待确认数量和分类状态提示 | `pages/archive/index`、`pages/archive/category/index` | 不承接分类管理、权限配置、角色配置等后台管理功能 |
| `ArchiveRecordCard` | 展示一条档案记录、草稿记录或待确认记录的标题、分类、来源、时间、状态和主操作入口 | `pages/archive/record-query/index`、`pages/archive/record-list/index`、`pages/archive/draft-list/index` | 不承接完整详情字段、不承接编辑表单 |
| `ArchiveDetailSection` | 展示详情页内的字段分组、材料分组、归档信息分组和活动来源分组 | `pages/archive/record-detail/index`、`pages/archive/basic-info-detail/index` | 不承接更正申请表单、不承接发展计划编辑表单 |
| `ArchiveSourceBlock` | 展示来源业务、来源页面、来源材料、处理历史、确认时间和追溯入口 | `pages/archive/record-detail/index`、`pages/archive/basic-info-detail/index` | 不承接列表卡片状态、不承接管理端处理队列操作 |
| `ArchiveCorrectionMaterialBlock` | 展示职称聘用更正原因、补充材料、审核进度、审核结果和再次补充状态 | `pages/archive/correction/apply/index`、`pages/archive/correction/detail/index`、`pages/archive/correction/progress/index`、`pages/archive/correction/result/index`、`pages/archive/correction/supplement/index` | 不承接普通档案详情、不承接个人发展计划编辑 |

M-03 组件到路由关系：

| 路由 | 建议组件组合 | 页面保留职责 |
| --- | --- | --- |
| `pages/archive/category/index` | `ArchiveCategoryCard`、`ArchiveRecordCard` | 读取 `category` 参数，组织分类概览、最近记录和跳转 |
| `pages/archive/record-list/index` | `ArchiveRecordCard` | 读取筛选参数，组织列表筛选、空状态和记录详情跳转 |
| `pages/archive/record-detail/index` | `ArchiveDetailSection`、`ArchiveSourceBlock` | 读取 `recordId`、`category`、`recordType`、`section`，组织详情分段和来源追溯 |
| `pages/archive/basic-info-detail/index` | `ArchiveDetailSection`、`ArchiveSourceBlock` | 读取 `section`，组织个人基础信息、教育背景、任职信息 |
| `pages/archive/draft-list/index` | `ArchiveRecordCard` | 读取 `status`，组织草稿、待确认、待核验列表 |
| `pages/archive/development-plan-edit/index` | 暂不抽公共组件 | 页面内承接发展计划编辑表单，避免过早泛化 |
| `pages/archive/correction/apply/index` | `ArchiveCorrectionMaterialBlock` | 组织更正申请表单、材料选择和提交动作 |
| `pages/archive/correction/submitted/index` | 暂不抽公共组件 | 结果页只承接提交反馈、返回档案和查看更正进度 |
| `pages/archive/correction/detail/index` | `ArchiveCorrectionMaterialBlock`、`ArchiveSourceBlock` | 组织更正详情、来源记录和处理进度入口 |
| `pages/archive/correction/progress/index` | `ArchiveCorrectionMaterialBlock` | 组织待核验、已补充等进度状态 |
| `pages/archive/correction/result/index` | `ArchiveCorrectionMaterialBlock` | 组织通过、退回、需补充等结果状态 |
| `pages/archive/correction/supplement/index` | `ArchiveCorrectionMaterialBlock` | 组织补充材料填写和材料列表状态 |

M-03 后续实现顺序：

1. 先新增 `teacher-mobile/src/pages/archive/components/ArchiveCategoryCard.vue` 和 `ArchiveRecordCard.vue`，用于分类页、列表页和草稿列表。
2. 再新增 `ArchiveDetailSection.vue` 和 `ArchiveSourceBlock.vue`，用于统一记录详情和基本信息详情。
3. 最后新增 `ArchiveCorrectionMaterialBlock.vue`，用于职称聘用更正链路。
4. 每补一个路由，同步 `teacher-mobile/src/pages.json`、本台账和 `docs/business-logic-map.md` 的待业务闭环状态。

#### M-13 档案分类和记录列表第一版

- 新增 `teacher-mobile/src/domain/archive.ts`，集中定义手机端档案分类、档案记录、状态文案、详情字段、材料、引用用途和来源步骤。
- 新增 `teacher-mobile/src/pages/archive/category/index.vue`，承接 8 类档案的分类概览、重点内容、近期记录、空近期记录状态和进入列表动作。
- 新增 `teacher-mobile/src/pages/archive/record-list/index.vue`，承接 `category=all` 和单分类记录列表、状态标签、搜索入口、空状态和进入统一详情动作。
- 新增 `teacher-mobile/src/pages/archive/draft-list/index.vue`，承接 `pending-verify` 待确认 / 待核验记录、空状态和确认进度下钻。
- `teacher-mobile/src/pages.json` 已注册 `pages/archive/category/index`、`pages/archive/record-list/index` 和 `pages/archive/draft-list/index`。
- `teacher-mobile/src/pages/archive/index.vue` 的分类卡片已进入分类概览页，“待确认”进入待确认列表，“查看全部”进入记录列表，最近入档按 `recordId` 直达 `pages/archive/record-detail/index`。
- 查询页、分类页、记录列表页、待确认列表、详情页和活动归档结果入口已读取或定位同一个 `domain/archive.ts` 本地记录源；本轮仍不标记为管理端 / 后端真实档案事实闭环，后续需要对齐 `archiveStore`、分类数量回写、待补充 / 已移出状态和更正链路。

#### M-14 档案更正申请和提交结果第一版

- 新增 `teacher-mobile/src/pages/archive/correction/apply/index.vue`，承接统一档案详情页的“申请更正”入口。
- 新增 `teacher-mobile/src/pages/archive/correction/submitted/index.vue`，承接更正申请提交后的“待核验”结果态。
- `teacher-mobile/src/pages.json` 已注册 `pages/archive/correction/apply/index` 和 `pages/archive/correction/submitted/index`。
- `teacher-mobile/src/pages/archive/record-detail/index.vue` 的“申请更正”已按当前档案 `recordId` 跳转更正申请页。
- 更正申请页读取 `teacher-mobile/src/domain/archive.ts` 的同源档案记录，展示原档案状态、分类、来源、原材料、原因选项和补充说明；提交后带 `recordId` 和更正原因进入 `correction/submitted`。
- 提交结果页展示“待核验”口径，可按 `recordId` 回到统一记录详情页，也可进入 `pages/archive/correction/progress/index` 查看进度。
- 当前仍不生成真实更正记录、不回写档案状态；进度和结果链路见 M-15/M-16，后续仍需补 `correction/supplement` 和真实申请集合。

#### M-15 档案更正进度第一版

- 新增 `teacher-mobile/src/pages/archive/correction/progress/index.vue`，承接“更正进度｜待核验”和“更正进度｜已补充”两个状态。
- `teacher-mobile/src/pages.json` 已注册 `pages/archive/correction/progress/index`。
- `teacher-mobile/src/pages/archive/correction/submitted/index.vue` 的“查看进度”已按 `recordId`、`status` 和 `reason` 进入进度页。
- `teacher-mobile/src/pages/profile/index.vue` 的“信息更正进度”已进入 `pages/archive/correction/progress/index` 第一版，不再只是文案入口。
- 更正进度页读取 `teacher-mobile/src/domain/archive.ts` 的同源档案记录，展示申请信息、待核验 / 已补充进度和回原档案入口。
- 当前仍不生成真实更正记录列表、不回写档案状态；结果链路见 M-16，后续仍需补 `correction/supplement` 和真实申请集合。

#### M-16 档案更正结果第一版

- 新增 `teacher-mobile/src/pages/archive/correction/result/index.vue`，承接更正处理结果第一版。
- `teacher-mobile/src/pages.json` 已注册 `pages/archive/correction/result/index`。
- `teacher-mobile/src/pages/archive/correction/progress/index.vue` 的“查看处理结果”已按 `recordId`、`reason` 和 `result=need-supplement` 进入结果页；当前默认使用“需补充”状态，避免伪造已通过。
- 更正结果页读取 `teacher-mobile/src/domain/archive.ts` 的同源档案记录，支持 `result=approved|rejected|need-supplement` 三种展示口径，并保留回原档案和回进度页入口。
- 当前仍不生成真实更正记录、不回写档案状态；补充材料链路见 M-17，后续仍需接真实申请集合。

#### M-17 档案更正补充材料第一版

- 新增 `teacher-mobile/src/pages/archive/correction/supplement/index.vue`，承接更正结果页的“需补充”状态。
- `teacher-mobile/src/pages.json` 已注册 `pages/archive/correction/supplement/index`。
- `teacher-mobile/src/pages/archive/correction/result/index.vue` 的“补充材料”已按 `recordId` 和 `reason` 进入补充材料页。
- 补充材料页读取 `teacher-mobile/src/domain/archive.ts` 的同源档案记录，展示更正原因、补充说明输入、材料占位和原档案入口。
- “提交补充”进入 `pages/archive/correction/progress/index?status=supplemented`，形成需补充到已补充进度的前端闭环。
- 当前仍不生成真实更正记录、不回写档案状态、不执行真实附件上传；后续需要接真实申请集合、附件上传状态和管理端审核结果。

### 逐图台账：活动模块

活动效果图共 71 张，当前 `teacher-mobile/src/pages/activity` 注册页面也为 71 个。按效果图目录和页面命名拆分后，第一版判断如下：

| 分组 | 效果图数 | 当前源码/路由状态 | 当前判定 |
| --- | ---: | --- | --- |
| 活动首页 | 2 | `pages/activity/index`、`pages/activity/room-entry-state` | 已有活动首页和教研室入口状态页；后续需审计入口跳转是否指向对应活动流程 |
| 教学反思 | 9 | `reflection-start`、`reflection-course`、`reflection-evidence`、`reflection-scope`、`reflection-self`、`reflection-guide-chat`、`reflection-ai-chat`、`reflection-draft`、`reflection-success` | 数量和命名均基本对应；覆盖开始方式、课程选择、依据选择、反思范围、自主反思、AI 对话、草稿编辑、确认成功 |
| 培训进修 | 9 | `training`、`training-list`、`training-application`、`training-summary`、`training-archive-result`、`training-demand`、`training-found`、`training-demand-result`、`training-need-result` | 数量和命名均基本对应；覆盖培训首页/列表、申请、总结、归档结果、培训需求两类提交结果 |
| 企业实践 | 25 | `enterprise-overview`、`enterprise-list`、`enterprise-plan-submit`、`enterprise-plan-confirm`、`enterprise-plan-approved`、`enterprise-plan-rejected`、`enterprise-plan-edit`、`enterprise-progress-detail`、`enterprise-log-record`、`enterprise-log-list`、`enterprise-archive-success`、`enterprise-proof-upload`、`enterprise-proof-supplement`、`enterprise-supplement-submitted`、`enterprise-resupplement`、`enterprise-supplement-needed`、`enterprise-history-supplement`、`enterprise-history-supplement-needed`、`enterprise-history-confirmed`、`enterprise-archive-result`、`enterprise-archive-edit`、`enterprise-import-export`、`enterprise-workflow-config`、`enterprise-login-history`、`enterprise-advanced-search` | 数量和命名均基本对应；覆盖年度概览/列表、计划提交/确认/通过/退回/修改、进行中详情、日志、证明上传/补充、历史补充、归档和管理类页面 |
| 虚拟教研 | 26 | `virtual-research-room`、`virtual-research-invitation`、`virtual-research-activity-list`、`virtual-research-activity-detail-ongoing`、`virtual-research-activity-detail-confirm`、`virtual-research-activity-detail-supplement-submitted`、`virtual-research-confirm-contribution`、`virtual-research-contribution-detail`、`virtual-research-contribution-confirm`、`virtual-research-contribution-submitted`、`virtual-research-supplement-material`、`virtual-research-stage-submitted`、`virtual-research-archive-result`、`virtual-research-archive-result-v1`、`virtual-research-archived-confirmed`、`virtual-research-resubmitted`、`virtual-research-profile-complete`、`virtual-research-basic-info-edit`、`virtual-research-profile-intro-edit`、`virtual-research-teacher-archive-detail`、`virtual-research-position-management`、`virtual-research-work-experience-management`、`virtual-research-skill-management`、`virtual-research-award-management`、`virtual-research-role-assignment`、`virtual-research-advanced-settings` | 数量和命名均基本对应；覆盖我的教研室、邀请、活动列表/详情、贡献确认、补充材料、阶段材料、归档结果、个人资料/岗位/经历/技能/获奖/角色/高级设置等状态 |

第一版结论：

- 活动模块不是当前主要缺页风险点；71 张效果图与 71 个活动页面在数量和命名上高度一致。
- 后续重点不应再做“是否转成页面”的大规模核查，而应进入 G9-G12 手机端活动业务地图：确认教学反思、培训、企业实践、虚拟教研的提交、审批、归档、入档提示是否能形成闭环。
- 活动模块中部分页面属于“档案入档结果”或“个人资料管理”状态，后续需和手机端档案业务地图明确边界，避免同一事实在活动页和档案页重复定义。

### 逐图台账：待办模块

待办效果图共 9 张，当前 `teacher-mobile/src/pages/todo` 注册页面也为 9 个。第一版判断如下：

| 效果图/状态 | 当前源码/路由状态 | 当前判定 |
| --- | --- | --- |
| 待办首页 | `pages/todo/index` | 已映射；包含待办列表、最近动态和培训证书确认入口 |
| 全部待办 | `pages/todo/all` | 已映射 |
| 全部动态 | `pages/todo/dynamics` | 已映射 |
| 全部动态筛选 | `pages/todo/dynamics-filter` | 已映射 |
| 待确认记录详情｜培训证书 | `pages/todo/certificate-detail` | 已映射 |
| 编辑待确认记录 | `pages/todo/certificate-edit` | 已映射 |
| 修改已提交｜培训证书 | `pages/todo/certificate-submit` | 已映射 |
| 入档成功｜培训证书 | `pages/todo/certificate-archive-success` | 已映射 |
| 已移出待确认页 | `pages/todo/certificate-removed` | 已映射 |

第一版结论：

- 待办模块缺页风险低，9 张效果图与 9 个注册页面数量和命名基本一致。
- 后续重点进入 G7 手机端待办业务地图：确认“证书详情 -> 编辑/确认/移出 -> 提交核验/入档成功”的状态流是否闭环，并明确入档成功后与档案个人发展维度的关系。

### 逐图台账：我的模块

我的效果图共 6 张，当前只有 1 个注册页面：

```txt
teacher-mobile/src/pages/profile/index.vue
```

| 效果图/状态 | 当前源码/路由状态 | 当前判定 |
| --- | --- | --- |
| 我的主页 | `pages/profile/index` | 已映射为综合页 |
| 我的能力画像 | `pages/profile/index` 仅有能力画像摘要和“查看画像”按钮文案 | 缺独立页面或详情态 |
| 画像用到的记录 | 未见独立路由 | 缺页 |
| 个人发展报告 | `pages/profile/index` 仅有发展报告卡片和“查看报告”按钮文案 | 缺独立页面或详情态 |
| 目标岗位对照 | 未见独立路由 | 缺页 |
| 聘期要求对照 | 未见独立路由 | 缺页 |

第一版结论：

- 我的模块不是一页多状态已完整覆盖；当前综合页只覆盖“我的主页”和部分摘要入口。
- 后续应先决定能力画像、发展报告、目标岗位对照、聘期要求对照是新建 `profile/*` 页面，还是复用活动/档案里的既有页面。

#### M-04 我的能力画像页面策略

判定结果：新增 `pages/profile/ability-profile/index`，不复用 `pages/profile/index`。

选择理由：

- 效果图中“我的能力画像”是独立页面，不只是我的主页里的摘要卡片。
- 当前 `pages/profile/index.vue` 已承接“我的主页”，页面职责是个人入口、画像摘要、报告摘要和服务菜单，不适合继续承接完整画像详情。
- 能力画像后续需要引用能力清单执行版、成长档案事实、培训/反思/企业实践/教研等记录来源，和单纯个人资料页边界不同。
- 管理端已有能力画像业务地图，教师端应保留独立页面，方便后续与管理端能力画像、个人发展报告、岗位/聘期对照统一口径。

页面职责建议：

| 页面 | 路由 | 职责 |
| --- | --- | --- |
| 我的主页 | `pages/profile/index` | 保留教师信息、能力画像摘要、发展报告摘要、档案记录入口和系统服务入口 |
| 我的能力画像 | `pages/profile/ability-profile/index` | 展示发展指数、能力维度得分、短板提示、提升建议、引用记录入口 |

能力画像页面建议承接内容：

| 区域 | 内容 | 数据口径 |
| --- | --- | --- |
| 总览 | 发展指数、等级、周期、更新时间 | 后续对齐能力清单执行版和教师档案事实 |
| 维度分布 | 教学、教研、实践、服务等能力维度 | 后续对齐管理端能力画像维度 |
| 短板提示 | 待补记录、待提升能力项、推荐方向 | 后续对齐培训需求和发展建议 |
| 引用记录 | 画像用到的记录入口 | 后续进入 M-05，判定独立记录页或复用档案记录列表 |
| 后续行动 | 查看目标岗位对照、查看聘期要求、生成/查看发展报告 | 分别进入 M-06、M-07、M-08 判定 |

M-04 后续实现边界：

- `pages/profile/index` 的“查看画像”按钮后续应跳转 `pages/profile/ability-profile/index`。
- `pages/profile/ability-profile/index` 先做只读详情，不在本页编辑档案事实或能力清单。
- “画像用到的记录”不放在画像页内做复杂列表，进入 M-05 单独判定。
- 目标岗位对照和聘期要求对照不混入画像详情主体，进入 M-07、M-08 单独判定。

#### M-05 画像用到的记录页面策略

判定结果：新增 `pages/profile/ability-profile/records/index`，不直接复用 `pages/archive/record-list/index` 作为入口页。

选择理由：

- 效果图中“画像用到的记录”是“我的”模块下的独立页面，需要解释哪些档案事实被用于能力画像，而不是单纯按档案分类浏览记录。
- `pages/archive/record-list/index` 的主职责是档案分类记录列表，适合展示档案事实本身；画像记录页的主职责是展示“引用关系”和“计算依据”。
- 两者可以复用 `ArchiveRecordCard` 的记录卡片视觉，但页面路由和业务语义应分开。
- 画像记录页点击单条记录时，应回到 `pages/archive/record-detail/index` 查看档案事实详情，避免复制档案详情页。

页面职责建议：

| 页面 | 路由 | 职责 |
| --- | --- | --- |
| 画像详情 | `pages/profile/ability-profile/index` | 展示画像总览和引用记录入口 |
| 画像用到的记录 | `pages/profile/ability-profile/records/index` | 展示被画像引用的档案记录、引用维度、引用原因、证据强度 |
| 档案记录详情 | `pages/archive/record-detail/index` | 展示记录事实、材料、来源和处理历史 |

画像记录页建议参数：

| 参数 | 用途 |
| --- | --- |
| `dimension` | 按教学、教研、实践、服务等能力维度筛选引用记录 |
| `evidenceLevel` | 按强证据、一般证据、待补证据筛选 |
| `sourceCategory` | 按档案分类筛选来源记录 |
| `from=ability-profile` | 标记从能力画像进入，便于返回画像详情 |

画像记录页建议展示字段：

| 字段 | 说明 |
| --- | --- |
| 记录标题 | 档案记录或业务材料名称 |
| 引用维度 | 该记录支撑的能力维度 |
| 引用原因 | 为什么纳入画像计算 |
| 证据强度 | 强证据、一般证据、待补证据 |
| 来源分类 | 教学工作、教研科研、企业实践、成果荣誉、个人发展等 |
| 记录状态 | 已入档、待确认、待补充等 |
| 查看详情 | 跳转 `pages/archive/record-detail/index` |

M-05 后续实现边界：

- 可复用 M-03 定义的 `ArchiveRecordCard`，但需要扩展“引用维度 / 引用原因 / 证据强度”展示位。
- 不在画像记录页做档案更正、补充材料、确认入档等动作；这些动作仍由档案详情或档案更正链路承接。
- 如果后续 `pages/archive/record-list/index` 已具备 `usage=ability-profile` 参数，也只能作为底层列表模板，不替代 `pages/profile/ability-profile/records/index` 的业务路由。

#### M-06 个人发展报告页面策略

判定结果：新增 `pages/profile/development-report/index`，不复用 `pages/profile/index`，也不复用管理端 `/admin/reports`。

选择理由：

- 效果图中“个人发展报告”是“我的”模块下的独立页面，不只是我的主页里的报告摘要卡片。
- `pages/profile/index.vue` 的报告卡片只承接入口和最新报告状态，不适合承接完整报告阅读、依据说明和后续行动。
- 管理端 `/admin/reports` 是组织侧分析报告中心，教师端个人发展报告是个人侧成长建议，不应混用同一路由语义。
- 个人发展报告需要引用能力画像、档案事实、岗位/聘期要求和培训建议，后续会成为“我的”模块的汇总页。

页面职责建议：

| 页面 | 路由 | 职责 |
| --- | --- | --- |
| 我的主页 | `pages/profile/index` | 保留最新报告摘要和“查看报告”入口 |
| 个人发展报告 | `pages/profile/development-report/index` | 展示个人报告正文、发展结论、依据记录、建议行动和报告状态 |
| 画像用到的记录 | `pages/profile/ability-profile/records/index` | 提供报告依据记录的下钻入口 |

个人发展报告建议承接内容：

| 区域 | 内容 | 数据口径 |
| --- | --- | --- |
| 报告状态 | 草稿已生成、待确认、已确认、需补充记录 | 后续对齐教师端确认动作和管理端报告状态 |
| 发展结论 | 本周期优势、短板、风险提示 | 来源于能力画像和档案事实 |
| 依据摘要 | 被引用的档案记录、画像维度、岗位/聘期要求 | 下钻到画像记录页或档案记录详情 |
| 建议行动 | 推荐培训、补充档案、企业实践、教研活动等建议 | 后续对齐培训、档案、企业实践、虚拟教研业务对象 |
| 报告操作 | 确认已读、查看依据、重新生成说明、导出占位 | 先定义口径，代码实现时避免空点击 |

M-06 后续实现边界：

- `pages/profile/index` 的“查看报告”按钮后续应跳转 `pages/profile/development-report/index`。
- 个人发展报告页面只读展示为主，不在本页直接修改档案事实、能力画像或岗位/聘期映射。
- “查看依据记录”应优先跳转 `pages/profile/ability-profile/records/index` 或 `pages/archive/record-detail/index`，不在报告页复制完整记录列表。
- 导出、重新生成、AI 解读等动作若暂未实现，必须标记为视觉态或降级提示，不能表现成已闭环。

#### M-07 目标岗位对照页面策略

判定结果：新增 `pages/profile/target-position/index`，不归入 `pages/profile/ability-profile/index` 的普通分段。

选择理由：

- 效果图中“目标岗位对照”是“我的”模块下的独立页面，和“我的能力画像”并列，而不是画像详情的附属状态。
- 目标岗位对照的核心是“目标岗位要求 vs 当前能力画像 / 档案证据”的差距比较，页面结构和画像总览不同。
- 管理端能力清单已有岗位/聘期要求映射，教师端应只读展示当前教师与目标岗位的差距，不在本页编辑映射规则。
- 独立路由便于后续从能力画像、个人发展报告、培训推荐等多个入口进入同一个目标岗位对照结果。

页面职责建议：

| 页面 | 路由 | 职责 |
| --- | --- | --- |
| 我的能力画像 | `pages/profile/ability-profile/index` | 展示当前能力画像和进入目标岗位对照的入口 |
| 目标岗位对照 | `pages/profile/target-position/index` | 展示目标岗位要求、当前达成情况、差距项、建议行动 |
| 画像用到的记录 | `pages/profile/ability-profile/records/index` | 展示支撑某个差距项的档案记录和证据 |

目标岗位对照建议参数：

| 参数 | 用途 |
| --- | --- |
| `targetRole` | 指定目标岗位，如讲师、副教授、专业带头人等 |
| `from=ability-profile` | 从能力画像进入时返回画像详情 |
| `from=development-report` | 从发展报告进入时返回报告页 |

目标岗位对照建议承接内容：

| 区域 | 内容 | 数据口径 |
| --- | --- | --- |
| 目标岗位 | 岗位名称、适用周期、岗位要求摘要 | 后续对齐管理端岗位/聘期要求映射 |
| 当前达成 | 当前画像等级、关键维度得分、已满足项 | 来源于能力画像和档案事实 |
| 差距项 | 未满足要求、待补记录、待提升能力项 | 来源于要求映射和画像计算结果 |
| 证据入口 | 查看支撑或缺失证据的记录 | 下钻到画像记录页或档案记录详情 |
| 建议行动 | 推荐培训、实践、教研、补充档案 | 后续对齐培训、企业实践、虚拟教研和档案补充 |

M-07 后续实现边界：

- `pages/profile/target-position/index` 只读展示目标岗位对照结果，不允许教师端编辑岗位要求或能力清单映射。
- 如果未选择目标岗位，页面可展示默认推荐岗位或目标岗位选择态，但不新增独立选择页。
- 岗位要求规则以后端 / 管理端能力清单配置为准，教师端只做消费展示。
- 差距项的“查看依据”不复制完整档案详情，跳转 `pages/profile/ability-profile/records/index` 或 `pages/archive/record-detail/index`。

#### M-08 聘期要求对照页面策略

判定结果：新增 `pages/profile/tenure-requirement/index`，不归入 `pages/profile/target-position/index`，也不直接展示管理端能力清单映射配置页。

选择理由：

- 效果图中“聘期要求对照”是“我的”模块下的独立页面，和“目标岗位对照”并列。
- 目标岗位对照关注未来岗位目标；聘期要求对照关注当前聘期履职要求、已完成项和剩余风险，两者时间口径不同。
- 管理端能力清单的岗位/聘期要求映射是规则配置；教师端聘期要求对照是个人只读履职进度，不应暴露配置编辑语义。
- 独立路由便于从我的主页、能力画像、个人发展报告进入当前聘期履职进度。

页面职责建议：

| 页面 | 路由 | 职责 |
| --- | --- | --- |
| 目标岗位对照 | `pages/profile/target-position/index` | 展示未来目标岗位的能力差距 |
| 聘期要求对照 | `pages/profile/tenure-requirement/index` | 展示当前聘期要求、完成进度、缺口记录和风险提示 |
| 画像用到的记录 | `pages/profile/ability-profile/records/index` | 展示支撑聘期要求完成情况的档案记录和证据 |

聘期要求对照建议参数：

| 参数 | 用途 |
| --- | --- |
| `period` | 指定聘期或发展周期，如 `2026`、`2026-2028` |
| `requirementType` | 按教学、科研、实践、服务等要求类型筛选 |
| `from=profile` | 从我的主页进入时返回我的主页 |
| `from=development-report` | 从发展报告进入时返回报告页 |

聘期要求对照建议承接内容：

| 区域 | 内容 | 数据口径 |
| --- | --- | --- |
| 聘期概览 | 当前聘期、聘期第几年、总体完成度、风险数量 | 后续对齐管理端聘期要求映射和教师档案事实 |
| 要求清单 | 聘期履职要求、对应能力指标、完成状态 | 来源于 `abilityListStore.requirementMappings` 的只读结果 |
| 完成证据 | 已入档记录、待确认记录、缺失记录 | 下钻到画像记录页或档案记录详情 |
| 风险提示 | 临近截止、证据不足、待补材料 | 后续对齐待办和档案补充 |
| 建议行动 | 补充档案、参加培训、提交实践/教研材料 | 后续对齐对应业务入口 |

M-08 后续实现边界：

- `pages/profile/tenure-requirement/index` 只读展示个人聘期达成情况，不允许教师端编辑聘期要求映射。
- 聘期要求规则以后端 / 管理端能力清单配置为准，教师端只消费结果。
- “查看证据”优先跳转 `pages/profile/ability-profile/records/index` 或 `pages/archive/record-detail/index`。
- “补充材料 / 去完成”若暂未接入真实业务入口，必须标记为待业务闭环或降级提示，不能表现成已完成。

### 逐图台账：AI 助手

AI 助手效果图共 2 张，已补 AI 助手首页、补充档案页和提交结果页。`teacher-mobile/src/components/MobileTabBar.vue` 中 AI 助手入口已在 M-10 修正为：

```txt
{ key: 'assistant', text: 'AI 助手', path: '/pages/assistant/index' }
```

| 效果图/状态 | 当前源码/路由状态 | 当前判定 |
| --- | --- | --- |
| 补充档案 | `pages/assistant/archive-supplement/index` 已注册，AI 助手首页可进入 | 已补；提交时调用 `createArchiveSupplementRecord()` 生成 `pending-verify` 档案记录 |
| 补充档案已提交 | `pages/assistant/archive-supplement-submitted/index` 已注册 | 已补；读取 `recordId`，可进入待核验记录详情、档案待确认列表或返回 AI 助手 |

当前结论：

- AI 助手缺页风险已由 M-10 到 M-12 补齐；底部导航、页面注册和补充档案提交结果已形成最小闭环。
- AI 助手补充档案会生成 `domain/archive.ts` 中的待核验 / 待确认记录，不直接写正式档案事实。
- 后续重点从缺页转为跨端同步：AI 会话、管理端确认结果和真实附件上传需要接入统一接口。

#### M-09 AI 助手一级入口策略

判定结果：保留 AI 助手独立一级 tab，新增 `pages/assistant/index`，不降级为档案或待办里的局部会话入口。

选择理由：

- `MobileTabBar.vue` 已有 `assistant` 一级 tab 和中心按钮样式，说明产品结构上已经把 AI 助手作为一级入口处理。
- 效果图目录 `效果图/教师手机端/4AI助手` 独立于档案、活动、待办和我的，且包含“补充档案”和“补充档案已提交”两张图。
- 当前 AI 助手 tab 指向 `/pages/activity/index` 是入口错误，不应继续让一级导航进入活动首页。
- AI 助手后续可承接补充档案、解释画像/报告、引导待办处理等跨模块能力，独立入口更符合后续扩展边界。

AI 助手路由策略：

| 页面 | 路由 | 职责 |
| --- | --- | --- |
| AI 助手首页 | `pages/assistant/index` | 承接底部 TabBar 的 AI 助手一级入口，展示可发起的 AI 场景和最近会话 |
| 补充档案 | `pages/assistant/archive-supplement/index` | 承接“补充档案”效果图，引导教师补充档案事实或材料 |
| 补充档案已提交 | `pages/assistant/archive-supplement-submitted/index` | 承接提交结果，返回对应档案、待办或 AI 助手首页 |

AI 助手首页建议承接场景：

| 场景 | 入口去向 | 状态口径 |
| --- | --- | --- |
| 补充档案 | `pages/assistant/archive-supplement/index` | 提交后进入待确认或待核验，不直接写正式档案事实 |
| 解读能力画像 | `pages/profile/ability-profile/index` 或后续 AI 会话态 | 只读解释，不修改画像计算结果 |
| 解读发展报告 | `pages/profile/development-report/index` 或后续 AI 会话态 | 只读解释，不替代报告确认 |
| 处理待办 | `pages/todo/index` 或具体待办详情 | 保持待办原业务状态流 |

M-09 后续实现边界：

- M-10 代码实现时，应把 `MobileTabBar.vue` 中 `assistant` 路由从 `/pages/activity/index` 改为 `/pages/assistant/index`。
- M-11、M-12 分别补 `archive-supplement` 和 `archive-supplement-submitted`，不把两张效果图塞进活动模块。
- AI 助手提交的档案补充不直接入档，应沿用第 17 节统一口径：先形成待确认 / 待核验记录，再由管理端或档案流程确认。
- 若首页暂不实现完整聊天能力，也必须提供真实可进入的补充档案入口，不能只做空按钮或 toast。

#### M-10 AI 助手 TabBar 入口修正

实现结果：

- 新增 `teacher-mobile/src/pages/assistant/index.vue`，作为 AI 助手一级 tab 首页。
- `teacher-mobile/src/pages.json` 已注册 `pages/assistant/index`。
- `teacher-mobile/src/components/MobileTabBar.vue` 已将 `assistant` 路由从 `/pages/activity/index` 改为 `/pages/assistant/index`。
- AI 助手首页提供“补充档案”“解读能力画像”“查看待办建议”三个入口，其中“补充档案”已进入 M-11 页面，“查看待办建议”跳转待办首页，“解读能力画像”暂为待补齐提示。

M-10 验证：

- 已用静态检查验证 `pages/assistant/index.vue` 存在、`pages.json` 已注册、TabBar 指向 `/pages/assistant/index`。
- 已执行 `cd teacher-mobile && npm run typecheck`。
- 已执行 `cd teacher-mobile && npm run build:h5`。
- 已执行 `cd teacher-mobile && npm run build:mp-weixin`。
- H5 和微信小程序构建均通过；仍存在既有 Sass deprecation warning，和本次入口修正无关。

#### M-11 AI 助手补充档案页面

实现结果：

- 新增 `teacher-mobile/src/pages/assistant/archive-supplement/index.vue`，承接“补充档案”效果图。
- `teacher-mobile/src/pages.json` 已注册 `pages/assistant/archive-supplement/index`。
- AI 助手首页“补充档案”入口已跳转到该页面。
- 页面提交后跳转 `pages/assistant/archive-supplement-submitted/index`。
- 页面文案明确补充材料进入待核验，不直接进入正式档案。

M-11 验证：

- 已用静态检查验证页面文件存在、`pages.json` 已注册、AI 助手首页入口可达。
- 已执行 `cd teacher-mobile && npm run typecheck`。
- 已执行 `cd teacher-mobile && npm run build:h5`。
- 已执行 `cd teacher-mobile && npm run build:mp-weixin`。

#### M-12 AI 助手补充档案已提交页面

实现结果：

- 新增 `teacher-mobile/src/pages/assistant/archive-supplement-submitted/index.vue`，承接“补充档案已提交”效果图。
- `teacher-mobile/src/pages.json` 已注册 `pages/assistant/archive-supplement-submitted/index`。
- 结果页展示“待核验”和“档案待确认”状态，不把提交结果标记为已入档。
- 结果页提供“查看档案”和“返回 AI 助手”入口，分别跳转 `pages/archive/index` 和 `pages/assistant/index`。

M-12 验证：

- 已用静态检查验证页面文件存在、`pages.json` 已注册、提交页可跳转结果页。
- 已执行 `cd teacher-mobile && npm run typecheck`。
- 已执行 `cd teacher-mobile && npm run build:h5`。
- 已执行 `cd teacher-mobile && npm run build:mp-weixin`。
- H5 和微信小程序构建均通过；仍存在既有 Sass deprecation warning，和本次新增页面无关。

### 已发现问题

| 优先级 | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| P0 | 手机端效果图 142 张，但注册页面 86 个 | `teacher-mobile/src/pages` | 逐图判断“一页多状态”还是未覆盖 |
| P0 | 档案模块效果图 54 张，当前已有 11 个档案模块注册页面，分类概览、记录列表、待确认列表、统一详情、更正申请、更正已提交、更正进度、更正结果和补充材料已有第一版，但大量基础信息详情、草稿编辑仍未见独立路由 | `效果图/教师手机端/1档案`、`teacher-mobile/src/pages/archive` | 继续补真实档案记录模型和剩余独立详情页，避免重复补分类 / 列表模板 |
| P1 | 活动模块页面数量与效果图基本一致，但业务流是否跨页闭环尚未审计 | `teacher-mobile/src/pages/activity` | 下一步建立教学反思、培训、企业实践、虚拟教研手机端业务地图 |
| P1 | 我的模块 6 张效果图当前只有 1 个综合页承接 | `效果图/教师手机端/3我的`、`teacher-mobile/src/pages/profile/index.vue` | 明确能力画像、发展报告、岗位/聘期对照是否补独立页面 |
| P1 | AI 助手缺页已补，补充档案可生成本地待核验记录，但仍缺真实 AI 会话和管理端同步 | `teacher-mobile/src/pages/assistant/*`、`teacher-mobile/src/domain/archive.ts`、`docs/business-logic-map.md` | 后续从本地数据闭环转入接口、附件上传和管理端确认结果同步 |
| P1 | 待办证书主链已补本地状态，但其它待办类型仍是提示态 | `teacher-mobile/src/stores/todoStore.ts`、`teacher-mobile/src/pages/todo/*` | 后续把企业实践补充、培训证书补充、教学反思草稿等动作接入同一 store 或真实接口 |
| P2 | 构建有大量 Sass deprecation warning | `teacher-mobile/src/**/*.vue`、`wot-design-uni` | 暂不阻塞，后续统一处理 |

## 细粒度推进任务池

本任务池用于后续 AI / Codex 继续推进时直接领取任务。任务完成标准以 `docs/business-logic-map.md` 的业务闭环、本文档的页面覆盖判定和对应端的构建命令为准。

### P0：手机端业务地图优先任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| G7-01 | 梳理待办首页到培训证书详情的入口 | `docs/business-logic-map.md` 记录入口页面、跳转方式和待确认记录对象 |
| G7-02 | 梳理培训证书详情的确认入档动作 | 明确确认后记录状态、结果页和档案个人发展维度关系 |
| G7-03 | 梳理培训证书详情的编辑动作 | 明确详情页、编辑页、提交页之间的数据流 |
| G7-04 | 梳理培训证书提交核验后的状态 | 明确提交后是否仍为待确认、待核验或已入档 |
| G7-05 | 梳理培训证书移出待确认动作 | 明确移出后的记录去向、是否可恢复和是否影响档案 |
| G7-06 | 梳理待办动态列表和业务对象关系 | 明确动态是只读时间线还是可反向进入对应记录 |
| G7-07 | 补待办业务对象表 | 至少包含待办记录、动态、待确认档案记录、证书材料 |
| G7-08 | 补待办状态口径表 | 至少包含待确认、待核验、已入档、已移出、修改已提交 |
| G7-09 | 补待办主流程文本 | 覆盖“详情 -> 编辑/确认/移出 -> 结果 -> 档案”的完整路径 |
| G7-10 | 标记待办待实现代码点 | 在业务地图中区分已闭环、仅视觉态、缺状态共享 |
| G8-01 | 设计手机端档案信息架构 | 明确首页、分类概览、记录列表、记录详情、更正/补充材料的层级 |
| G8-02 | 判断档案首页是否保留当前综合页 | 明确 `pages/archive/index` 承接范围 |
| G8-03 | 判断档案分类页是否使用统一模板 | 给出分类路由建议和可复用字段 |
| G8-04 | 判断档案记录列表是否使用统一模板 | 给出列表筛选、空状态、记录卡片字段 |
| G8-05 | 判断档案记录详情是否使用统一模板 | 给出详情基本信息、来源、状态、操作区字段 |
| G8-06 | 梳理基本信息档案缺页 | 明确 4 张效果图对应补页或合并状态 |
| G8-07 | 梳理教学工作档案缺页 | 明确概览、列表、评价详情的页面承接 |
| G8-08 | 梳理教研科研档案缺页 | 明确活动归档结果与档案详情的边界 |
| G8-09 | 梳理企业实践档案缺页 | 明确活动流程页和档案记录页的边界 |
| G8-10 | 梳理成果荣誉档案缺页 | 明确概览、列表、教学成果奖详情承接方式 |
| G8-11 | 梳理个人发展档案缺页 | 明确培训证书入档结果与个人发展记录关系 |
| G8-12 | 梳理职称聘用更正链路 | 明确更正申请、进度、结果、补充材料、详情页面 |
| G8-13 | 梳理社会服务和考核评价详情缺口 | 明确是否只保留分类入口或补详情页 |
| G8-14 | 更新档案缺页优先级 | 在本文档风险表中标明先补哪些页面 |
| G9-01 | 梳理培训活动首页到培训列表入口 | 记录页面、路由和培训对象 |
| G9-02 | 梳理培训申请提交链路 | 明确申请状态和管理端培训申请关系 |
| G9-03 | 梳理培训总结提交链路 | 明确总结是否进入培训记录材料 |
| G9-04 | 梳理培训归档结果链路 | 已补：提交归档生成 / 定位 `pending-verify` 档案记录，结果页进入记录详情和档案待确认列表 |
| G9-05 | 梳理培训需求提交链路 | 明确需求对象是否对应管理端培训需求 |
| G9-06 | 梳理培训推荐命中结果链路 | 明确推荐结果是否可进入申请或需求 |
| G10-01 | 梳理教学反思开始方式 | 明确自主反思、AI 引导、草稿的入口差异 |
| G10-02 | 梳理课程选择和依据选择 | 明确课程、证据材料和反思记录关系 |
| G10-03 | 梳理反思范围和自主反思内容 | 明确保存草稿和提交成功的状态 |
| G10-04 | 梳理 AI 对话反思链路 | 明确 AI 会话是否生成反思草稿 |
| G10-05 | 对齐管理端教学反思列表 | 明确手机端提交后管理端如何展示 |
| G11-01 | 梳理企业实践年度概览入口 | 明确年度实践对象和状态 |
| G11-02 | 梳理企业实践计划提交链路 | 明确提交、确认、通过、退回、修改状态 |
| G11-03 | 梳理企业实践进行中记录链路 | 明确日志、证明上传和进度详情关系 |
| G11-04 | 梳理企业实践补充材料链路 | 明确补充、再次补充、历史补充状态 |
| G11-05 | 梳理企业实践归档链路 | 已补：等待确认和补充提交结果生成 / 定位 `pending-verify` 档案记录，结果页进入记录详情和档案待确认列表 |
| G11-06 | 对齐管理端企业实践 store | 明确手机端状态与管理端申请、跟踪、记录的映射 |
| G12-01 | 梳理虚拟教研室入口 | 明确我的教研室、邀请和活动列表关系 |
| G12-02 | 梳理虚拟教研活动详情链路 | 明确进行中、确认、补充提交状态 |
| G12-03 | 梳理贡献确认链路 | 明确贡献详情、确认、提交结果状态 |
| G12-04 | 梳理阶段材料补充链路 | 明确补充材料和阶段提交结果 |
| G12-05 | 梳理虚拟教研归档链路 | 明确归档结果、已确认、再次提交状态 |
| G12-06 | 对齐管理端虚拟教研 store | 明确手机端教研室、活动、记录、档案沉淀映射 |
| G13-01 | 建立手机端到管理端对象映射表 | 至少覆盖待办、档案、培训、反思、企业实践、虚拟教研 |
| G13-02 | 建立手机端提交材料统一口径 | 明确提交后是待核验、待确认还是直接入档 |
| G13-03 | 建立审批结果统一口径 | 明确通过、退回、补充、移出的跨端状态 |
| G13-04 | 建立入档结果统一口径 | 明确所有“入档成功/归档成功”是否仍需管理端确认 |

### P0：手机端缺页和入口修正任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| M-01 | 明确档案 54 张效果图的补页清单 | 本文档每个档案分组都有“补页/合并/废弃”判定 |
| M-02 | 明确档案统一路由命名 | 给出 `pages/archive/*` 路由草案 |
| M-03 | 明确档案统一组件边界 | 给出分类卡、记录卡、详情块、来源记录的复用判断 |
| M-04 | 明确我的能力画像页面策略 | 判定新建 `pages/profile/ability-profile` 或复用已有页面 |
| M-05 | 明确画像用到的记录页面策略 | 判定新建页面或归入档案记录列表 |
| M-06 | 明确个人发展报告页面策略 | 判定新建 `pages/profile/development-report` 或复用报告页 |
| M-07 | 明确目标岗位对照页面策略 | 判定新建页面或归入能力画像详情 |
| M-08 | 明确聘期要求对照页面策略 | 判定新建页面或归入能力清单映射展示 |
| M-09 | 明确 AI 助手一级入口策略 | 判定独立 tab 页面或降级为档案/待办会话入口 |
| M-10 | 修正 AI 助手 TabBar 入口 | 若确定独立页面，则 `MobileTabBar.vue` 不再指向 `/pages/activity/index` |
| M-11 | 补 AI 助手“补充档案”页面 | 路由、页面和状态与效果图对应 |
| M-12 | 补 AI 助手“补充档案已提交”页面 | 结果页能返回对应档案或待办上下文 |
| M-13 | 补待办证书共享状态 | `todoStore` 串起首页、全部待办、证书详情、编辑、提交结果、入档成功和移出结果 |
| M-14 | 补 AI 助手补充档案待核验记录 | `createArchiveSupplementRecord()` 生成 `pending-verify`，结果页进入记录详情和档案待确认列表 |

### P1：管理端工程重构任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| E12-01 | 确认详情抽屉组件迁移范围 | 第一批只迁移能力清单基准模板编辑指标抽屉；版本记录、要求映射和成长档案来源记录保留后续批次，避免误迁右侧摘要面板 |
| E12-02 | 迁移能力清单基准模板编辑指标抽屉 | 已新增 `DetailSheet form` 540px 分档并迁移基准模板编辑指标抽屉；字段、保存行为、底部按钮和目标效果图结构保持不变 |
| E12-03 | 迁移能力清单基准模板版本记录抽屉 | 已新增 `DetailSheet history` 620px 分档和无 footer 模式，基准模板版本记录抽屉已迁移且版本号、状态、发布时间、来源、操作人仍完整展示 |
| E12-04 | 迁移成长档案教师详情来源记录抽屉 | 已新增 `DetailSheet source` 540px 分档和 `placement="reader"` 阅读型偏移，来源过滤、计数、关闭、内容展示和详情反馈行为不变 |
| E12-05 | 补抽屉组件使用规则 | 已在 `frontend/docs/admin-design-system-guide.md` 记录 `DetailSheet` 适用、慎用和禁用场景 |
| E12-06 | 迁移培训计划新建抽屉 | 已迁移到 `DetailSheet md`，保留新建计划字段、保存草稿、保存并发布和取消动作 |
| E12-07 | 迁移能力清单执行版抽屉 | 已迁移执行版编辑指标和历史版本抽屉到 `DetailSheet form/history`，保留保存行为和版本追溯字段 |
| E13-01 | 扫描右侧摘要面板重复结构 | 已输出候选页面和不迁移理由；第一批候选为培训需求页、培训申请页，培训资源页作为第二批，档案处理/报告中心/能力清单优化建议详情暂不迁移 |
| E13-02 | 定义右侧摘要面板组件接口 | 已定义 `InsightSidebar` 轻量接口，只覆盖标题、洞察/提醒列表、当前选中对象摘要和底部动作插槽 |
| E13-03 | 迁移一个低风险摘要面板试点 | 已新增 `InsightSidebar` 并迁移培训需求页右侧“资源匹配建议”，保留原建议文案、当前需求摘要和查看待匹配需求动作 |
| E13-04 | 迁移后续摘要面板批次 | 已迁移培训申请页“处理提醒”和培训资源页“资源概览”，保留提醒/分布内容、当前选中对象摘要和底部动作入口 |
| E13-05 | 迁移培训计划执行提醒摘要面板 | 已迁移到 `InsightSidebar`，保留提醒列表和“查看相关计划”筛选入口 |
| E14-01 | 扫描管理端筛选栏重复结构 | 已输出候选页面、字段类型和差异点；第一批候选为培训资源、培训需求、培训申请，第二批为培训计划、培训记录、虚拟教研室列表 |
| E14-02 | 定义筛选栏组件边界 | 已明确 `CompactFilterBar` 只收敛布局插槽，档案处理左侧筛选面板、报告中心 tab 工具区、能力清单来源侧栏不纳入第一批 |
| E14-03 | 迁移第一批低风险筛选栏 | 已新增 `CompactFilterBar` 并迁移培训资源、培训需求、培训申请筛选区，保留各自四个筛选字段、搜索、重置、查询、操作反馈和必要业务动作入口 |
| E14-04 | 迁移第二批紧凑筛选栏 | 已迁移培训计划、培训记录、虚拟教研室列表筛选区；保留计划/记录页输入即过滤，保留虚拟教研室显式查询和视图切换 |
| E14-05 | 迁移企业实践筛选栏 | 已迁移实践申请、实践跟踪、实践记录筛选区；保留各自筛选字段、搜索、重置、查询和操作反馈，导出动作仍留在列表标题区 |
| E15-01 | 扫描表格空状态 | 已输出页面内空状态文案和结构差异，当前管理端空状态命中 35 处 |
| E15-02 | 定义表格空状态组件 | 已新增 `frontend/src/components/common/EmptyState.vue`，支持标题、说明、主操作和无操作态 |
| E15-03 | 迁移一个低风险空状态试点 | 已迁移培训、企业实践、能力清单、反思概览、报告中心、虚拟教研室共 14 个空状态点；页面空数据时展示一致且不改变业务逻辑 |
| E16-01 | 扫描视觉态按钮 | 已输出无动作按钮和降级提示清单，管理端空按钮优先处理 |
| E16-02 | 分类视觉态按钮处理规则 | 已按只读展示、真实过滤、真实跳转、降级提示分类；只读值不能用 `button`，暂未闭环必须给降级提示 |
| E16-03 | 更新台账风险表 | 已更新管理端风险表，并新增 `adminVisualActions.test.ts` 防止空按钮回归 |
| E16-04 | 处理静态分页视觉按钮 | 已将培训资源、培训申请、培训记录、企业实践申请的静态分页占位从 button 改为只读 span；真实分页另行接状态和点击处理 |
| E16-05 | 处理顶栏只读上下文按钮 | 已将顶栏范围、年度和消息数从无动作 button 改为只读 span；消息数保留状态语义，真实消息中心后续另行接路由闭环 |
| E16-06 | 处理详情页 disabled 分页按钮 | 已将虚拟教研室详情成员、活动、记录三处 disabled 分页按钮改为只读 span；真实分页后续需接状态和点击处理 |
| E16-07 | 建立无动作原生按钮全局 guardrail | 已在 `adminVisualActions.test.ts` 扫描管理端页面和关键组件，要求原生 button 必须有动作、禁用态或表单语义 |
| E17-01 | 建立模块级测试约定 | 已在 `frontend/docs/admin-design-system-guide.md` 说明 domain、store、structure、mock service、component、page raw guardrail 分别测什么 |
| E17-02 | 扫描 store 行为测试缺口 | 已确认能力清单、成长档案、培训、企业实践、分析报告、虚拟教研均有 store 行为测试；practice/report/virtual-lab 另有 structure 测试 |
| E17-03 | 为新增重构组件补最小测试 | 已确认新增公共组件 `EmptyState` 覆盖 props、渲染形态和 action 事件；后续新增公共组件按同一规则补测试 |
| E17-04 | 补齐拆分 store 结构测试 | 已补 ability-list/archive/training structure tests，并新增 `adminStoreStructure.test.ts` 防止拆分 store 漏结构测试 |
| E18 | 给 store 行为补 Vitest 脚本入口 | 已新增 `npm run test:stores`，执行 `vitest run src/stores/admin` |
| E19 | 在 package.json 增加 test 脚本 | 已存在 `npm run test`，执行完整 `vitest run` |
| E20 | 更新 AGENTS 里的验证命令 | 已存在管理端 `npm run test`、`npm run typecheck`、`npm run build` 验证命令 |

### P1：管理端设计系统收敛任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| F1 | 扫描管理端重复颜色值 | 已扫描 50 个 `.vue/.css` 文件，输出高频颜色候选到 `frontend/docs/admin-design-system-guide.md` |
| F2 | 扫描重复阴影、圆角、间距 | 已扫描高频 `box-shadow`、`border-radius`、padding/margin/gap 候选，输出到 `frontend/docs/admin-design-system-guide.md` |
| F3-01 | 定义第一批 CSS variables | 已在 `frontend/src/styles/tokens.css` 定义第一批高频主色、文本色、边框色、背景色、阴影和间距 token，并补 `tokens.test.ts` |
| F3-02 | 替换高频主色硬编码 | 已将页面和组件样式中的 `#1268f6` 147 处替换为 `var(--color-admin-primary)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-03 | 替换高频文本色硬编码 | 已替换 `#17233d`、`#172b55`、`#66758f` 为对应管理端文本色 token，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-04 | 替换高频边框色硬编码 | 已替换 `#dce6f5`、`#d9e5f7`、`#e5edf8` 为对应管理端边框/分割线 token，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-05 | 替换高频背景色硬编码 | 已替换 `#f6f9ff`、`#f8fbff` 为对应管理端背景色 token，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-06 | 替换高频圆角硬编码 | 已先替换 `border-radius: 999px` 为 `var(--radius-full)`，并补扫描测试防回退；其余卡片和控件圆角分后续批次处理；测试、类型检查和构建均通过 |
| F3-07 | 替换高频阴影硬编码 | 已替换卡片弱阴影和主按钮强调阴影为对应管理端 shadow token，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-08 | 替换辅助主色和辅助文本色硬编码 | 已替换 `#0f5eef`、`#405985` 为对应管理端 token，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-09 | 替换小控件圆角硬编码 | 已替换 `border-radius: 6px` 为 `var(--radius-sm)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-10 | 替换大卡片和浮层圆角硬编码 | 已替换 `border-radius: 12px` 为 `var(--radius-lg)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-11 | 替换中等面板圆角硬编码 | 已替换 `border-radius: 10px` 为 `var(--radius-md)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-12 | 替换管理端默认面板圆角硬编码 | 已新增 `--radius-admin-panel` 并替换普通和复合 `8px` 面板圆角；测试、类型检查和构建均通过 |
| F3-13 | 替换紧凑内联 gap 硬编码 | 已替换 `gap: 8px` 为 `var(--space-admin-xs)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-14 | 替换小型内联 gap 硬编码 | 已替换 `gap: 10px` 为 `var(--space-admin-sm)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-15 | 替换中型内联 gap 硬编码 | 已替换 `gap: 12px` 为 `var(--space-admin-md)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-16 | 替换大型内联 gap 硬编码 | 已替换显式 `gap: 16px` 为 `var(--space-admin-lg)`，并补扫描测试防回退；测试、类型检查和构建均通过 |
| F3-17 | 替换卡片 / 区块常用 gap 硬编码 | 已新增 `--space-admin-card-gap` 并替换显式 `gap: 18px`，补扫描测试防回退；响应式 `clamp(...)` 不纳入本批 |
| F3-18 | 替换超大区块 gap 硬编码 | 已替换显式 `gap: 20px` 为 `var(--space-admin-xl)`，补扫描测试防回退；padding/margin 不纳入本批 |
| F3-19 | 替换双倍超大区块 gap 硬编码 | 已替换显式 `gap: 24px` 为 `var(--space-admin-2xl)`，补扫描测试防回退；padding/margin 不纳入本批 |
| F3-20 | 替换超大单值 padding 硬编码 | 已替换单值 `padding: 20px` 为 `var(--space-admin-xl)`，补扫描测试防回退；双值、四值和响应式 padding 不纳入本批 |
| F3-21 | 替换双倍超大单值 padding 硬编码 | 已替换单值 `padding: 24px` 为 `var(--space-admin-2xl)`，补扫描测试防回退；双值、四值和响应式 padding 不纳入本批 |
| F3-22 | 替换卡片单值 padding 硬编码 | 已替换单值 `padding: 18px` 为 `var(--space-admin-card-gap)`，补扫描测试防回退；双值、四值和响应式 padding 不纳入本批 |
| F3-23 | 替换大型单值 padding 硬编码 | 已替换单值 `padding: 16px` 为 `var(--space-admin-lg)`，补扫描测试防回退；双值、四值和响应式 padding 不纳入本批 |
| F3-24 | 替换中型单值 padding 硬编码 | 已替换单值 `padding: 12px` 为 `var(--space-admin-md)`，补扫描测试防回退；双值、四值和响应式 padding 不纳入本批 |
| F3-25 | 替换超大单值 margin 硬编码 | 已替换单值 `margin: 20px` 为 `var(--space-admin-xl)`，补扫描测试防回退；方向性、多值和响应式 margin 不纳入本批 |
| F3-26 | 替换紧凑方向性 margin 硬编码 | 已替换方向性 `margin-*: 8px` 为对应 `var(--space-admin-xs)`，补扫描测试防回退；单值、多值和响应式 margin 不纳入本批 |
| F3-27 | 替换小型方向性 margin 硬编码 | 已替换方向性 `margin-*: 10px` 为对应 `var(--space-admin-sm)`，补扫描测试防回退；单值、多值和响应式 margin 不纳入本批 |
| F3-28 | 替换大型方向性 margin 硬编码 | 已替换方向性 `margin-*: 16px` 为对应 `var(--space-admin-lg)`，补扫描测试防回退；单值、多值和响应式 margin 不纳入本批 |
| F3-29 | 替换中型方向性 margin 硬编码 | 已替换方向性 `margin-*: 12px` 为对应 `var(--space-admin-md)`，补扫描测试防回退；单值、多值和响应式 margin 不纳入本批 |
| F3-30 | 替换超大方向性 margin 硬编码 | 已替换方向性 `margin-*: 20px` 为对应 `var(--space-admin-xl)`，补扫描测试防回退；单值、多值和响应式 margin 不纳入本批 |
| F3-31 | 替换双倍超大方向性 margin 硬编码 | 已替换方向性 `margin-*: 24px` 为对应 `var(--space-admin-2xl)`，补扫描测试防回退；单值、多值和响应式 margin 不纳入本批 |
| F3-32 | 替换卡片方向性 margin 硬编码 | 已替换方向性 `margin-*: 18px` 为对应 `var(--space-admin-card-gap)`，补扫描测试防回退；单值、多值和响应式 margin 不纳入本批 |
| F3-33 | 审计剩余方向性 margin | 已确认常用 token 档位方向性 margin 无残留；剩余微调值和版式特例暂不新增 token，`14px` 留待页面级视觉复核 |
| F4-01 | 整理按钮等级规则 | 已在 `frontend/docs/admin-design-system-guide.md` 明确主按钮、次按钮、轮廓按钮、文本按钮、危险按钮和图标按钮使用场景 |
| F4-02 | 扫描按钮等级混用 | 已完成第一轮扫描，输出公共 `Button` variant 现状和局部 `.btn-*` 高频类；后续按低风险区域逐页迁移 |
| F4-03 | 迁移能力清单抽屉底部按钮试点 | 已将能力清单基准模板、执行版、要求映射三个编辑抽屉底部按钮迁移到公共 `Button`，并补源码 guardrail |
| F4-04 | 迁移培训计划抽屉底部按钮试点 | 已将培训计划新建抽屉的取消、保存草稿、保存并发布迁移到公共 `Button`，并延续等宽底部操作结构 |
| F4-05 | 迁移培训筛选和新增按钮试点 | 已将培训资源、培训需求、培训申请筛选区查询动作和培训资源/需求新增动作迁移到公共 `Button`，并保留页面结构类承载局部布局 |
| F4-06 | 迁移培训记录侧栏主动作 | 已将培训记录页“查看材料待完善记录”迁移到公共 `Button`，并保留满宽结构类 |
| F4-07 | 迁移培训计划主入口和侧栏动作 | 已将培训计划页“新建培训计划”和“查看相关计划”迁移到公共 `Button`，保留原打开抽屉和筛选状态动作 |
| F4-08 | 迁移培训计划表格行内动作 | 已将培训计划页行内“查看”迁移到 `Button variant="ghost" size="sm"`，保留跳转计划详情动作 |
| F4-09 | 迁移培训记录表格行内动作 | 已将培训记录总览页行内“查看”迁移到 `Button variant="ghost" size="sm"`，保留跳转记录详情动作 |
| F4-10 | 迁移培训资源表格行内动作 | 已将培训资源页行内“查看”迁移到 `Button variant="ghost" size="sm"`，保留右侧资源摘要更新动作 |
| F4-11 | 迁移培训需求表格行内动作 | 已将培训需求页行内“查看”迁移到 `Button variant="ghost" size="sm"`，将“匹配资源”迁移到 `Button variant="secondary" size="sm"`，保留匹配状态更新动作 |
| F4-12 | 迁移培训申请表格行内动作 | 已将培训申请页行内“查看”迁移到 `Button variant="ghost" size="sm"`，将“处理”迁移到 `Button variant="secondary" size="sm"`，保留申请处理状态同步 |
| F4-13 | 迁移培训申请筛选和侧栏动作 | 已将培训申请筛选重置迁移到 `Button variant="outline"`，退回申请迁移到 `danger`，待处理筛选入口迁移到 `outline` |
| F4-14 | 迁移培训资源和需求侧栏筛选入口 | 已将培训资源“查看待完善资源”和培训需求“查看待匹配需求”迁移到 `Button variant="outline"`，保留页面筛选状态切换 |
| F4-15 | 迁移培训资源和需求筛选重置 | 已将培训资源页和培训需求页筛选区“重置”迁移到 `Button variant="outline"`，不改变查询和新增动作 |
| F4-16 | 迁移培训计划和记录筛选重置 | 已将培训计划页和培训记录页筛选区“重置”迁移到 `Button variant="outline"`，不改变筛选行为和侧栏动作 |
| F4-17 | 迁移虚拟教研室筛选重置 | 已将虚拟教研室列表筛选区“重置”迁移到 `Button variant="outline"`，保留显式查询、回车查询和视图切换 |
| F4-18 | 迁移企业实践筛选动作 | 已将企业实践申请、年度实践跟踪、实践记录三页筛选区“重置”和“查询”迁移到公共 `Button`，保留筛选状态、回车查询和操作消息 |
| F4-19 | 迁移反思和报告筛选动作 | 已将教学反思总览隐藏重置、分析报告中心查询图标和重置迁移到公共 `Button`；报告中心仍不迁入 `CompactFilterBar` |
| F4-20 | 迁移教学反思查看类动作 | 已将教学反思总览/详情的行内查看、查看相关记录和查看更多相关记录迁移到公共 `Button`，保留原跳转和关键词过滤 |
| F4-21 | 迁移企业实践查看类动作 | 已将企业实践申请、年度实践跟踪、实践记录三页查看/定位类动作迁移到公共 `Button`，状态变更动作留后续批次 |
| F4-22 | 迁移虚拟教研室查看详情入口 | 已将虚拟教研室列表卡片和表格的查看详情入口迁移到公共 `Button`，保留卡片主操作权重、表格 ghost 行内动作和详情路由 |
| F4-23 | 迁移虚拟教研室详情页动作 | 已将虚拟教研室详情页标题区、成员表、活动表和记录列表动作迁移到公共 `Button`，保留邀请、移出、新建活动和查看跳转行为 |
| F4-24 | 迁移虚拟教研活动详情页动作 | 已将虚拟教研活动详情页标题区、参与区、资料表和记录区动作迁移到公共 `Button`，保留会议记录定位、资料查看和形成记录闭环 |
| F4-25 | 迁移虚拟教研记录详情页动作 | 已将虚拟教研记录详情页来源活动、来源资料、生成档案待确认、参与查看和资料查看迁移到公共 `Button`，保留跨成长档案待确认闭环 |
| F4-26 | 迁移培训计划详情参与教师动作 | 已将培训计划详情页参与教师表“查看 / 处理”迁移到公共 `Button`，保留查看教师档案和同意申请同步参与名单行为 |
| F4-27 | 迁移培训记录详情材料动作 | 已将培训记录详情页“上传材料”和相关培训记录“查看”迁移到公共 `Button`，保留上传证书同步材料完整状态和相关记录跳转行为 |
| F4-28 | 迁移档案处理详情动作 | 已将档案处理页详情面板“确认入档 / 再次退回 / 标记异常 / 查看补充说明”迁移到公共 `Button`，保留档案处理状态流转和处理历史行为 |
| F4-29 | 迁移导入批次详情底部动作 | 已将导入批次详情页“返回档案处理 / 取消本次任务 / 刷新状态 / 查看上传文件 / 确认识别结果”迁移到公共 `Button`，保留批次识别状态流转和生成处理记录行为 |
| F4-30 | 迁移档案查阅筛选和查看动作 | 已将档案查阅页“搜索 / 重置 / 查看成长档案”迁移到公共 `Button`，保留筛选状态提交、重置和教师档案详情跳转行为 |
| F4-31 | 迁移导入资料上传页动作 | 已将导入部门资料上传页“选择文件 / 从本地文件夹导入 / 删除 / 取消 / 开始识别资料”迁移到公共 `Button`，保留文件选择、删除、返回和创建导入批次行为 |
| F4-32 | 迁移教师档案详情动作 | 已将教师档案详情页“返回档案查询 / 打印 / 导出 PDF / 关闭 / 查看来源记录 / 查看记录详情”迁移到公共 `Button`，保留路由、打印、导出降级示例和来源过滤反馈行为 |
| F4-33 | 迁移能力清单基准模板顶部动作 | 已将基准模板页“优化基准模板 / 查看版本记录 / 派生执行版”迁移到公共 `Button`，保留优化建议跳转、版本记录抽屉和派生执行版行为 |
| F4-34 | 迁移能力清单执行版顶部动作 | 已将执行版页“派生下一周期执行版 / 历史版本”迁移到公共 `Button`，保留派生执行版跳转和历史版本抽屉行为 |
| F4-35 | 迁移能力清单发布确认动作 | 已将发布确认页“返回修改 / 确认发布”迁移到公共 `Button`，保留返回执行版和发布执行版状态流转行为 |
| F4-36 | 迁移能力清单要求映射动作 | 已将要求映射页“新增要求项 / 编辑 / 删除 / 编辑映射 / 确认配置”迁移到公共 `Button`，保留新增、编辑、删除和确认配置的 `abilityListStore` 行为 |
| F4-37 | 迁移能力清单优化建议动作 | 已将基准模板优化建议页“上传制度文件 / 重新分析运行反馈 / 应用到基准模板 / 查看版本记录 / 查看详情 / 采纳 / 暂缓 / 弃用 / 应用”迁移到公共 `Button`，保留上传制度来源、重新分析、应用建议、版本记录跳转和建议状态流转行为 |
| F4-38 | 迁移能力画像群体页动作 | 已将群体画像页“查看完整建议”和表格行内“查看画像”迁移到公共 `Button`，保留重点支持筛选跳转、教师详情跳转和院系/专业降级提示行为 |
| F4-39 | 迁移企业实践导出动作 | 已将实践记录页“导出记录”和年度实践跟踪页“导出名单”迁移到公共 `Button`，保留按当前筛选结果生成导出准备反馈的行为 |
| F4-40 | 迁移教学反思详情来源动作 | 已将教学反思详情页“查看来源数据”迁移到公共 `Button`，保留展示关联课堂、评价和画像数据反馈的行为 |
| F4-41 | 清理档案详情按钮结构类命名 | 已将教师档案详情页共享 `Button` 上残留的 `btn-*` 结构类改为语义化结构类，并移除档案处理页未使用的 `.btn-icon` 样式 |
| F4-42 | 迁移详情页返回入口 | 已将教学反思详情页和培训计划详情页“返回列表”迁移到公共 `Button`，并删除培训记录详情页未使用的 `.btn-back` 样式 |
| F4-43 | 迁移企业实践状态动作 | 已将企业实践申请页“同意 / 退回修改”、实践记录页“提醒补材料 / 确认归档”、年度实践跟踪页“提醒申请”迁移到公共 `Button`，并用 `row-action-group` 承接行内操作列布局 |
| F4-44 | 收尾页面级 `btn-*` 按钮类 | 已将报告中心卡片动作迁移到公共 `Button variant="outline"`，并将培训计划新建入口结构类改为 `create-plan-action`；当前管理端页面源码已无 `btn-*` 页面级按钮类 |
| F5-01 | 整理状态徽章等级规则 | 已在 `frontend/docs/admin-design-system-guide.md` 明确 `success`、`warning`、`danger`、`info`、`neutral`、`purple` 六类 tone 的语义、典型状态、覆盖规则和展示型 tone 边界 |
| F6-01 | 整理表格密度规则 | 已在 `frontend/docs/admin-design-system-guide.md` 明确紧凑关联表、标准业务列表、宽信息列表三档密度，覆盖行高、字号、单元格 padding、操作列和空状态口径 |
| F7-01 | 整理详情页布局规则 | 已在 `frontend/docs/admin-design-system-guide.md` 明确独立详情页、页面内右侧详情面板和抽屉边界，并定义标题区、摘要区、主内容区、侧栏区、来源/相关记录职责 |
| F8-01 | 整理抽屉宽度和结构规则 | 已在 `frontend/docs/admin-design-system-guide.md` 明确轻量详情/确认、轻量新建、标准编辑、复杂编辑、版本/历史、来源记录六类抽屉宽度、结构、底部操作和响应式口径 |
| F9-01 | 更新管理端设计规则文档 | 已核对 `frontend/docs/admin-design-system-guide.md` 中的核心组件、源码 guardrail 和验收命令引用均能对应当前工程文件 |
| F9-02 | 对齐按钮规则文档与 F4 收尾事实 | 已移除设计规则中把页面级 `.btn-*` 作为现行样板的表述，并补 `adminVisualActions.test.ts` guardrail |
| F10-01 | 每次抽组件后做效果图结构自检 | 已在 `frontend/docs/admin-design-system-guide.md` 明确目标效果图、区域结构、比例与密度、业务入口、响应式和验证命令六项自检，并要求回写台账 |

### P2：管理端剩余审计和收尾任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| D-01 | 复扫管理端 `console.log` | 无业务按钮直接写 `console.log` 空动作 |
| D-02 | 复扫管理端 `operationMessage` | 每个消息动作都标记真实状态、跳转或降级提示 |
| D-03 | 复扫未挂路由页面 | 无废弃页面继续干扰台账判断 |
| D-04 | 复扫占位路由 | 无无效果图、无业务定义的管理端占位入口 |
| D-05 | 复扫页面内业务 interface | 稳定业务类型已迁到 `frontend/src/domain/admin/*` |
| D-06 | 复扫页面内大段 mock 数组 | 稳定 mock 已迁到 `frontend/src/services/mock/*` |
| D-07 | 复扫状态文案映射 | 稳定业务状态由 domain 或 `StatusBadge` 统一承接 |
| D-08 | 更新业务地图重构落点 | `docs/business-logic-map.md` 的“当前落点”反映最新状态 |
| D-09 | 更新页面覆盖台账风险表 | 已处理风险移入“已处理问题”，未处理风险保留优先级 |
| D-10 | 管理端最终验证 | 执行 `cd frontend && npm run test && npm run typecheck && npm run build` |

### P2：手机端实现验证任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| V-01 | 手机端页面补齐后验证注册关系 | `teacher-mobile/src/pages.json` 与页面文件一一对应 |
| V-02 | 手机端业务地图更新后自检入口 | 每个新增页面都能从现有入口进入或明确为待接入口 |
| V-02a | 手机端档案入口守卫 | 执行 `cd teacher-mobile && npm run test:archive-detail`，验证分类页、记录列表、待确认列表、记录详情、更正申请、更正已提交、更正进度、更正结果、补充材料路由、页面和入口存在 |
| V-03 | 手机端类型检查 | 执行 `cd teacher-mobile && npm run typecheck` |
| V-04 | 手机端 H5 构建 | 执行 `cd teacher-mobile && npm run build:h5` |
| V-05 | 手机端微信小程序构建 | 执行 `cd teacher-mobile && npm run build:mp-weixin` |
| V-06 | 台账收尾 | 本文档同步标记新增页面、合并状态和仍缺页面 |

### 已完成任务编号

```txt
G1, G2, G3, G4, G5, G6
G7-01, G7-02, G7-03, G7-04, G7-05, G7-06, G7-07, G7-08, G7-09, G7-10
G8-01, G8-02, G8-03, G8-04, G8-05, G8-06, G8-07, G8-08, G8-09, G8-10, G8-11, G8-12, G8-13, G8-14
G9-01, G9-02, G9-03, G9-04, G9-05, G9-06
G10-01, G10-02, G10-03, G10-04, G10-05
G11-01, G11-02, G11-03, G11-04, G11-05, G11-06
G12-01, G12-02, G12-03, G12-04, G12-05, G12-06
G13-01, G13-02, G13-03, G13-04
D-01
D-02
D-03
D-04
D-05
D-06
D-07
D-08
D-09
D-10
E15-01
E15-02
E15-03
E16-01
E16-02
E16-03
E16-04
E16-05
E16-06
E16-07
E17-01
E17-02
E17-03
E17-04
E18
E19
E20
F1
F2
F3-01
F3-02
F3-03
F3-04
F3-05
F3-06
F3-07
F3-08
F3-09
F3-10
F3-11
F3-12
F3-13
F3-14
F3-15
F3-16
F3-17
F3-18
F3-19
F3-20
F3-21
F3-22
F3-23
F3-24
F3-25
F3-26
F3-27
F3-28
F3-29
F3-30
F3-31
F3-32
F3-33
F4-01
F4-02
F4-03
F4-04
F4-05
F4-06
F5-01
F6-01
F7-01
F8-01
F9-01
F9-02
F10-01
E12-01
E12-02
E12-03
E12-04
E12-05
E12-06
E12-07
E13-01
E13-02
E13-03
E14-01
E14-02
E14-03
E14-04
E14-05
M-01
M-02
M-03
M-04
M-05
M-06
M-07
M-08
M-09
M-10
M-11
M-12
V-01
V-02
V-03
V-04
V-05
V-06
```
