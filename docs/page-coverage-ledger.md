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
| 待办 | 9 | 已有待办首页、全部待办、动态、证书详情/编辑/提交结果等页面 | 基本可注册，需补动态筛选等逐图确认 |
| 档案 | 54 | 当前只有档案首页、记录查询、我的主页等少量入口类页面 | 高风险，需优先逐图核对缺口 |
| 活动 | 71 | 教学反思、培训、企业实践、虚拟教研大量页面已注册 | 已转化最多，但仍需业务流审计 |
| 我的 | 6 | 当前有 `profile/index.vue` | 多个效果图可能未逐图覆盖 |
| AI 助手 | 2 | 目前未发现独立 AI 助手页面 | 高风险，需确认是否暂挂活动页或未实现 |

### 已确认注册状态

`teacher-mobile/src/pages.json` 中 `83` 个页面均存在对应 `index.vue` 文件，无未注册页面、无注册缺失文件。

### 已发现问题

| 优先级 | 问题 | 位置 | 建议 |
| --- | --- | --- | --- |
| P0 | 手机端效果图 142 张，但注册页面 83 个 | `teacher-mobile/src/pages` | 逐图判断“一页多状态”还是未覆盖 |
| P0 | 档案模块效果图 54 张，当前页面数量明显不足 | `效果图/教师手机端/1档案` | 下一轮优先建立档案模块逐图台账 |
| P1 | AI 助手效果图存在，但当前未见独立页面 | `效果图/教师手机端/4AI助手` | 明确是否新建 AI 助手入口页 |
| P2 | 构建有大量 Sass deprecation warning | `teacher-mobile/src/**/*.vue`、`wot-design-uni` | 暂不阻塞，后续统一处理 |

## 下一步推进计划

1. 继续扫描并迁移其它页面内大段 mock 数组到 mock service。
2. 继续迁移页面内仍保留的业务 interface 到 domain types。
3. 统一 operationMessage、状态枚举和状态文案映射。
4. 管理端工程重构稳定后，再进入设计系统重构。
5. 管理端重构阶段完成后，建立手机端逐图台账，优先档案、AI 助手、我的。
