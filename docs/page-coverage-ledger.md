# 页面覆盖台账

更新时间：2026-07-02

本台账用于对齐“效果图是否已转为可运行页面”和“业务逻辑是否已闭环”。当前结论先按工程扫描建立，后续每个模块修正时逐图细化。

业务对象、状态流转和跨页面闭环统一记录在 `docs/business-logic-map.md`。本文件只保留逐图覆盖、页面映射和推进优先级。

## 总览

```txt
效果图总数：178
管理端 PC 效果图：36
教师手机端效果图：142
管理端 Vue 文件：31
教师手机端 UniApp 页面：83
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
| 成长档案 | 7 | 已有档案处理、导入、查阅、详情页面 | 已完成逐图源码/路由映射；上传识别到处理记录主链已接入本地业务状态，教师详情事实读取待补 |
| 能力画像 | 4 | 已有群体画像、教师画像、教师详情页面 | 已确认群体画像、教师画像列表、教师详情的数据关系；按钮空动作已处理 |
| 发展活动 | 17 | 教学反思、培训、企业实践、虚拟教研均有页面 | 培训管理已完成逐图源码/路由映射和本地闭环；教学反思已完成列表-详情-问题定位审计；企业实践已完成申请-跟踪-归档主链；虚拟教研已完成教研室-活动-记录-档案沉淀主链 |
| 分析报告 | 1 | 已有报告卡片页 | 已完成报告查看、导出、重新生成、更新、AI 分析助手的本地行为闭环 |

### 逐图台账：能力清单

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版查看页.png` | `frontend/src/pages/admin/ability-list/AbilityListBasePage.vue` | `/admin/ability-list/base` | 默认页，`active-key="ability-list-base"` | 已映射；编辑指标、查看版本记录、派生执行版均已接入本地业务状态；能力树展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜基准模版优化建议.png` | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue` | `/admin/ability-list/base/optimization` | 从基准模板页 `goToOptimization()` 进入；支持建议筛选、采纳、暂缓、弃用、应用到基准模板的本地状态 | 已映射；已接入优化建议到基准模板的本地闭环；建议来源和问题筛选展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版查看页.png` | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | `/admin/ability-list/execution` | 默认页，`active-key="ability-list-execution"` | 已映射；当前基准页；执行版能力树展示数据已迁入 `frontend/src/services/mock/ability-list.ts` |
| `效果图/管理PC端/1能力清单/管理端PC｜能力清单｜执行版指标编辑抽屉.png` | `frontend/src/pages/admin/ability-list/AbilityListExecutionPage.vue` | `/admin/ability-list/execution` | 点击指标行编辑触发 `editingIndicator`，展示 `edit-drawer-overlay` | 已映射为同页抽屉状态；保存会更新 `abilityListStore.executionIndicators` 并标记为草稿调整 |
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
| `效果图/管理PC端/2成长档案/管理端PC｜成长档案｜来源详情.png` | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | `/admin/archive/teacher/:teacherId` | 点击档案详情内来源入口触发 `drawerOpen`，展示“来源记录”抽屉 | 已映射为同页抽屉状态；来源记录按当前栏目合并 `archiveStore` 中已入档事实；默认来源记录已迁入 `frontend/src/services/mock/archive.ts` |

### 逐图台账：培训管理

| 效果图 | 源码 | 路由 | 页面状态 | 当前判定 |
| --- | --- | --- | --- | --- |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜资源库.png` | `frontend/src/pages/admin/training/TrainingResourcePage.vue` | `/admin/training/resources` | 默认资源库页，资源列表、右侧资源摘要、筛选和新增本地状态 | 已映射；资源读取 `trainingStore.resources`，新增资源草稿写入共享状态 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜需求管理.png` | `frontend/src/pages/admin/training/TrainingDemandPage.vue` | `/admin/training/demands` | 默认需求管理页，需求表格、右侧需求摘要、待匹配筛选 | 已映射；新增需求、匹配资源已接入 `trainingStore.demands` |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜申请处理.png` | `frontend/src/pages/admin/training/TrainingApplicationPage.vue` | `/admin/training/applications` | 默认申请处理页，申请表格、右侧申请摘要、同意和退回处理 | 已映射；同意/退回接入 `trainingStore.applications` 并同步计划详情参与名单 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜记录总览.png` | `frontend/src/pages/admin/training/TrainingRecordPage.vue` | `/admin/training/records` | 默认记录总览页，记录表格、材料状态筛选 | 已映射；记录读取 `trainingStore.records`，详情上传证书后可同步材料状态 |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训记录详情.png` | `frontend/src/pages/admin/training/TrainingRecordDetailPage.vue` | `/admin/training/records/:recordId` | 从记录总览 `viewDetail()` 进入；记录详情、总结和证书材料 | 已映射；上传证书写入 `trainingStore.records`，并生成成长档案待确认处理记录；学习记录、总结和相关记录展示数据已迁入 `frontend/src/services/mock/training.ts` |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜培训计划｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanPage.vue` | `/admin/training/plans` | 默认计划管理页，计划表格、提醒、相关计划筛选 | 已映射；计划读取 `trainingStore.plans`，页面名为计划管理，效果图称“培训计划｜附属流程”；筛选选项、提醒和新建计划选项已迁入 `frontend/src/services/mock/training.ts` |
| `效果图/管理PC端/4发展活动/2培训管理/管理端PC｜培训管理｜新建培训计划｜附属流程.png` | `frontend/src/pages/admin/training/TrainingPlanPage.vue` | `/admin/training/plans` | 点击“新建培训计划”触发 `showDrawer`，展示新建计划抽屉 | 已映射为同页抽屉状态；保存草稿/发布会插入 `trainingStore.plans` |
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
| 分析报告中心 | `frontend/src/pages/admin/reports/ReportCenterPage.vue` | `/admin/reports` | 报告卡片、筛选、详情面板、AI 分析会话 | 已映射；读取 `reportStore.reports`，查看/查看大屏/查看原因打开同页面板，导出/更新/重新生成/继续分析/继续追问/AI 助手均写入共享状态 |

### 已处理问题

| 日期 | 问题 | 位置 | 处理 |
| --- | --- | --- | --- |
| 2026-07-02 | `/admin/archive/import` 路由重复 | `frontend/src/router/admin.routes.ts` | 删除无菜单入口、无效果图对应的“教师档案总览”占位路由，保留导入上传页 |
| 2026-07-02 | 能力清单执行版编辑、派生、发布仅页面局部状态 | `frontend/src/pages/admin/ability-list/*` | 新增 `frontend/src/stores/admin/abilityListStore.ts`，执行版指标编辑、下一周期派生、发布确认共享本地业务状态 |
| 2026-07-02 | 优化建议采纳后不能应用到基准模板 | `frontend/src/pages/admin/ability-list/AbilityListBaseOptimizationPage.vue`、`AbilityListBasePage.vue` | 优化建议改为共享业务状态，采纳后进入待应用集合，应用后写入基准模板指标 |
| 2026-07-02 | 基准模板编辑、版本记录和要求映射仍有局部状态 | `frontend/src/pages/admin/ability-list/*` | 基准模板编辑、版本记录、历史版、要求映射均已接入 `abilityListStore`，并补充 store 单测 |
| 2026-07-02 | 成长档案上传识别、确认结果、处理动作没有跨页面业务状态 | `frontend/src/pages/admin/archive/*` | 新增 `frontend/src/stores/admin/archiveStore.ts`，上传文件、导入批次、识别结果、处理记录、入档事实均接入本地业务状态 |
| 2026-07-02 | 导入批次“取消本次任务”只返回档案处理页，未形成取消状态 | `frontend/src/pages/admin/archive/ArchiveImportBatchPage.vue`、`frontend/src/stores/admin/archiveStore.ts` | 新增 `cancelled` 批次状态和 `cancelArchiveImportBatch()`，取消后文件状态改为“已取消”，不生成处理记录 |
| 2026-07-02 | 教师档案详情不读取处理页确认入档事实 | `frontend/src/pages/admin/archive/ArchiveTeacherDetailPage.vue` | 档案详情读取 `archiveStore.teacherArchiveFacts`，来源抽屉按栏目合并对应事实来源 |
| 2026-07-02 | 培训管理资源、需求、计划、申请、记录材料均为页面局部状态 | `frontend/src/pages/admin/training/*` | 新增 `frontend/src/stores/admin/trainingStore.ts`，资源草稿、需求匹配、计划草稿/发布、申请处理、记录材料和成长档案沉淀均接入共享状态 |
| 2026-07-02 | 能力画像群体页存在 `console.log` 空动作 | `frontend/src/pages/admin/ability-profile/AbilityProfileGroupPage.vue` | “查看完整建议”跳教师画像重点支持筛选；教师对象跳画像详情；院系/专业对象给出页面内降级提示 |
| 2026-07-02 | 教学反思详情“查看更多相关记录”跳列表但列表不读取问题关键词 | `frontend/src/pages/admin/reflection/*` | 反思总览读取 `keyword` query，并显示当前问题定位提示；共性观察筛选和详情更多相关记录形成闭环 |
| 2026-07-02 | 企业实践申请、跟踪、记录归档为页面局部状态 | `frontend/src/pages/admin/practice/*` | 新增 `frontend/src/stores/admin/practiceStore.ts`，申请同意/退回、年度跟踪、记录归档和成长档案待确认记录均接入共享状态 |
| 2026-07-02 | 虚拟教研室、活动、记录和档案沉淀为页面局部状态 | `frontend/src/pages/admin/virtual-lab/*` | 新增 `frontend/src/stores/admin/virtualLabStore.ts`，教研室、成员、活动、记录和成长档案待确认记录均接入共享状态 |
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
| 2026-07-03 | 手机端档案 54 张效果图缺少逐图补页、合并和移出判定 | `效果图/教师手机端/1档案`、`teacher-mobile/src/pages/archive/*` | 已补 M-01 档案 54 张效果图补页清单，明确 2 张保留已有、18 张合并状态、27 张补页、7 张移出教师端 |
| 2026-07-03 | 手机端档案 27 个补页项如果逐图建页会造成页面膨胀 | `docs/page-coverage-ledger.md` | 已补 M-02 档案统一路由命名草案，将 27 个补页项收敛为 12 个新增路由和 2 个保留路由 |
| 2026-07-03 | 手机端档案 12 个新增路由如果直接按页面写会复制分类卡、记录卡、详情块和更正材料结构 | `docs/page-coverage-ledger.md`、`teacher-mobile/src/pages/archive/*` | 已补 M-03 档案统一组件边界，后续补页按 5 个语义组件拆分 |

### 待处理问题

| 优先级 | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| P1 | 多个按钮仅写 `operationMessage` 或 `console.log` | 管理端多页面 | 模块审计时区分视觉态与业务闭环 |

### 业务逻辑审计起点

视觉还原已在转化阶段验收过，下一阶段不重复做大规模截图验收，优先审计业务闭环。第一批能力清单、成长档案、培训管理风险点已处理，后续继续按模块扫描剩余 `operationMessage` / `console.log` 类动作。

| 模块 | 风险点 | 位置 | 建议处理 |
| --- | --- | --- | --- |
| 暂无 | 第一批三组模块暂无未处理 P1 风险点 | - | 继续推进管理端剩余模块审计和通用消息模式收敛 |

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
| 待办 | 9 | 待办首页、全部待办、动态、证书详情/编辑/提交结果页面数量与效果图基本一致 | 已建立第一版逐图分组映射；后续重点审计证书确认、修改、入档和移出待确认的业务闭环 |
| 档案 | 54 | `pages/archive/index`、`pages/archive/record-query` 已注册；部分企业实践、培训证书、虚拟教研入档结果由活动/待办页面承接 | 高风险；已建立第一版逐图缺口判断，档案主体详情页明显不足 |
| 活动 | 71 | 教学反思、培训进修、企业实践、虚拟教研和活动首页页面数量与效果图分组基本一致 | 已建立第一版逐图分组映射；缺页风险低，下一步重点审计业务流闭环 |
| 我的 | 6 | 当前仅有 `pages/profile/index` 综合页 | 高风险；我的主页可覆盖，能力画像、用到的记录、发展报告、岗位/聘期对照缺独立页面 |
| AI 助手 | 2 | 未发现独立 AI 助手页面；TabBar 的 AI 助手入口当前指向 `/pages/activity/index` | 高风险；补充档案和补充档案已提交缺页 |

### 已确认注册状态

`teacher-mobile/src/pages.json` 中 `83` 个页面均存在对应 `index.vue` 文件，无未注册页面、无注册缺失文件。

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
| 职称聘用 | 8 | `profile/index` 只有“信息更正进度”入口文案；未见职称聘用更正申请、进度、结果、补充材料、详情独立路由 | 高风险缺页 |
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
| `pages/archive/record-detail/index` | 统一档案记录详情 | `recordId`、`category`、`recordType`、`section` | 个人成长记录、活动详情页面、教学评价记录详情、教研记录详情、教研记录详情归档信息/活动记录、企业实践记录详情、教学成果奖记录详情 |
| `pages/archive/basic-info-detail/index` | 基本信息专属详情 | `section=profile|education|employment` | 基本信息详情页、基本信息档案详情、教育背景、根目录 `基本信息.png` |
| `pages/archive/draft-list/index` | 档案草稿 / 待确认记录列表 | `status=draft|pending-confirm|pending-verify` | `成长档案-档案草稿.png` |
| `pages/archive/development-plan-edit/index` | 个人发展计划编辑 | `planId`、`mode=edit|create` | `发展计划编辑.png` |
| `pages/archive/correction/apply/index` | 职称聘用更正申请 | `recordId`、`category=title-employment` | `教师端手机｜档案｜职称聘用更正申请.png` |
| `pages/archive/correction/submitted/index` | 更正申请提交结果 | `requestId` | `教师端手机｜档案｜更正申请已提交.png` |
| `pages/archive/correction/detail/index` | 更正申请详情 | `requestId` | `教师端手机｜档案｜更正申请详情.png` |
| `pages/archive/correction/progress/index` | 更正进度 | `requestId`、`status=pending-verify|supplemented` | `教师端手机｜档案｜更正进度｜待核验.png`、`教师端手机｜档案｜更正进度｜已补充.png` |
| `pages/archive/correction/result/index` | 更正结果 | `requestId`、`result=approved|rejected` | `教师端手机｜档案｜职称聘用更正结果.png` |
| `pages/archive/correction/supplement/index` | 更正补充材料填写 / 材料列表 | `requestId`、`mode=form|list` | `教师端手机｜档案｜补充材料填写.png`、`职称聘用补充材料-列表版.png` |

M-02 收敛结果：

- 保留现有路由 2 个：`archive/index`、`archive/record-query/index`。
- 新增统一档案路由 6 个：`category`、`record-list`、`record-detail`、`basic-info-detail`、`draft-list`、`development-plan-edit`。
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
| `pages/archive/correction/submitted/index` | 暂不抽公共组件 | 结果页只承接提交反馈、返回档案和查看进度 |
| `pages/archive/correction/detail/index` | `ArchiveCorrectionMaterialBlock`、`ArchiveSourceBlock` | 组织更正详情、来源记录和处理进度入口 |
| `pages/archive/correction/progress/index` | `ArchiveCorrectionMaterialBlock` | 组织待核验、已补充等进度状态 |
| `pages/archive/correction/result/index` | `ArchiveCorrectionMaterialBlock` | 组织通过、退回、需补充等结果状态 |
| `pages/archive/correction/supplement/index` | `ArchiveCorrectionMaterialBlock` | 组织补充材料填写和材料列表状态 |

M-03 后续实现顺序：

1. 先新增 `teacher-mobile/src/pages/archive/components/ArchiveCategoryCard.vue` 和 `ArchiveRecordCard.vue`，用于分类页、列表页和草稿列表。
2. 再新增 `ArchiveDetailSection.vue` 和 `ArchiveSourceBlock.vue`，用于统一记录详情和基本信息详情。
3. 最后新增 `ArchiveCorrectionMaterialBlock.vue`，用于职称聘用更正链路。
4. 每补一个路由，同步 `teacher-mobile/src/pages.json`、本台账和 `docs/business-logic-map.md` 的待业务闭环状态。

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

### 逐图台账：AI 助手

AI 助手效果图共 2 张，目前未发现独立注册页面。`teacher-mobile/src/components/MobileTabBar.vue` 中 AI 助手入口配置为：

```txt
{ key: 'assistant', text: 'AI 助手', path: '/pages/activity/index' }
```

| 效果图/状态 | 当前源码/路由状态 | 当前判定 |
| --- | --- | --- |
| 补充档案 | 未见独立路由；仅在活动和待办页面出现“补充档案/补充材料”相关文案 | 缺页 |
| 补充档案已提交 | 未见独立路由 | 缺页 |

第一版结论：

- AI 助手是明确缺口：底部导航有入口，但当前指向活动首页。
- 后续应先补 AI 助手信息架构：确定它是独立一级 tab 页面，还是只作为档案/待办里的补充档案会话入口。

### 已发现问题

| 优先级 | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| P0 | 手机端效果图 142 张，但注册页面 83 个 | `teacher-mobile/src/pages` | 逐图判断“一页多状态”还是未覆盖 |
| P0 | 档案模块效果图 54 张，当前只有 2 个档案模块注册页面，且大量分类/详情/更正页未见独立路由 | `效果图/教师手机端/1档案`、`teacher-mobile/src/pages/archive` | 先建立档案信息架构和路由模板，再补缺页 |
| P1 | 活动模块页面数量与效果图基本一致，但业务流是否跨页闭环尚未审计 | `teacher-mobile/src/pages/activity` | 下一步建立教学反思、培训、企业实践、虚拟教研手机端业务地图 |
| P1 | 我的模块 6 张效果图当前只有 1 个综合页承接 | `效果图/教师手机端/3我的`、`teacher-mobile/src/pages/profile/index.vue` | 明确能力画像、发展报告、岗位/聘期对照是否补独立页面 |
| P1 | AI 助手效果图存在，但当前未见独立页面，底部 TabBar AI 助手入口指向活动首页 | `效果图/教师手机端/4AI助手`、`teacher-mobile/src/components/MobileTabBar.vue` | 明确是否新建 AI 助手一级入口页 |
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
| G9-04 | 梳理培训归档结果链路 | 明确结果页是否生成档案待确认记录 |
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
| G11-05 | 梳理企业实践归档链路 | 明确归档成功、归档结果、档案待确认关系 |
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

### P1：管理端工程重构任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| E12-01 | 确认详情抽屉组件迁移范围 | 明确第一批只迁移哪些抽屉，避免误迁右侧摘要面板 |
| E12-02 | 迁移能力清单基准模板编辑指标抽屉 | 页面使用统一 `DetailSheet`，行为和视觉不退化 |
| E12-03 | 迁移能力清单基准模板版本记录抽屉 | 版本号、状态、发布时间、来源、操作人仍完整展示 |
| E12-04 | 迁移成长档案教师详情来源记录抽屉 | 来源过滤、关闭、内容展示行为不变 |
| E12-05 | 补抽屉组件使用规则 | `frontend/docs/admin-design-system-guide.md` 记录适用和禁用场景 |
| E13-01 | 扫描右侧摘要面板重复结构 | 输出候选页面和不迁移理由 |
| E13-02 | 定义右侧摘要面板组件接口 | 只覆盖稳定标题、说明、指标、操作区 |
| E13-03 | 迁移一个低风险摘要面板试点 | 验证不破坏页面密度和效果图结构 |
| E14-01 | 扫描管理端筛选栏重复结构 | 输出候选页面、字段类型和差异点 |
| E14-02 | 定义筛选栏组件边界 | 明确哪些筛选仍保留页面内实现 |
| E14-03 | 迁移一个低风险筛选栏试点 | 验证筛选行为和布局不退化 |
| E15-01 | 扫描表格空状态 | 输出页面内空状态文案和结构差异 |
| E15-02 | 定义表格空状态组件 | 支持标题、说明、主操作和无操作态 |
| E15-03 | 迁移一个低风险空状态试点 | 页面空数据时展示一致且不改变业务逻辑 |
| E16-01 | 扫描视觉态按钮 | 输出只提示、不改状态、不跳转的按钮清单 |
| E16-02 | 分类视觉态按钮处理规则 | 标记为真实动作、降级提示或移除 |
| E16-03 | 更新台账风险表 | 每个视觉态按钮都有后续处理结论 |
| E17-01 | 建立模块级测试约定 | 说明 domain、store、页面行为分别测什么 |
| E17-02 | 扫描 store 行为测试缺口 | 输出已测和未测 action 清单 |
| E17-03 | 为新增重构组件补最小测试 | 覆盖 props、状态展示和关键交互 |

### P1：管理端设计系统收敛任务

| 编号 | 任务 | 完成标准 |
| --- | --- | --- |
| F3-01 | 定义第一批 CSS variables | 覆盖高频主色、文本色、边框色、背景色、圆角和阴影 |
| F3-02 | 替换高频主色硬编码 | 页面视觉不变，硬编码数量下降 |
| F3-03 | 替换高频文本色硬编码 | 页面视觉不变，语义变量可读 |
| F3-04 | 替换高频边框色硬编码 | 页面视觉不变，边框层级一致 |
| F3-05 | 替换高频背景色硬编码 | 页面视觉不变，背景层级一致 |
| F3-06 | 替换高频圆角硬编码 | 卡片、按钮、标签圆角规则一致 |
| F3-07 | 替换高频阴影硬编码 | 卡片和浮层阴影层级一致 |
| F4-01 | 整理按钮等级规则 | 文档明确主按钮、次按钮、文本按钮、危险按钮使用场景 |
| F4-02 | 扫描按钮等级混用 | 输出页面和建议处理 |
| F5-01 | 整理状态徽章等级规则 | 与 `StatusBadge` 类型和颜色语义一致 |
| F6-01 | 整理表格密度规则 | 明确行高、字号、操作按钮密度 |
| F7-01 | 整理详情页布局规则 | 明确标题区、摘要区、详情区、侧栏区结构 |
| F8-01 | 整理抽屉宽度和结构规则 | 明确普通详情、编辑表单、版本记录的宽度和底部操作 |
| F9-01 | 更新管理端设计规则文档 | `frontend/docs/admin-design-system-guide.md` 与实际组件一致 |
| F10-01 | 每次抽组件后做效果图结构自检 | 台账记录是否影响结构、比例、密度 |

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
M-01
M-02
M-03
```
